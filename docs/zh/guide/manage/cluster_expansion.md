---

title: 集群扩容
order: 4

---

# 集群扩容

## 概述

在 CnosDB 集群版中，单个运行实例被称作 Node，每个 Node 分为 Meta 和 Data 两种角色。

### Meta

Meta 维护集群的元数据，如 Table Schema、Node 存活心跳与负载数据、Vnode 与 Node 的映射关系等。

元数据频繁被每个 Node 所访问，CnosDB 选择维护一个强一致性的 Meta Node 集群，Node 订阅 Meta Node 来拉取感兴趣的信息，所有的元数据信息的更新都通过 Meta Node 集群进行。

<img src="../../../source/_static/img/cluster_metas.jpg" style="width:50% "/>

### Data

提供 TCP Service 承接 Coodinator 分发过来的查询和写入请求，查询和写入与单机版本类似。

### 数据流

![](../../../source/_static/img/cluster_data_flow.jpg)

## 配置

### Data

以下介绍 CnosDB 集群版的配置文件。

```toml

#reporting_disabled = false
host = "localhost"

[deployment]
#mode = 'singleton'
#cpu = 4
#memory = 16

[query]
max_server_connections = 10240
query_sql_limit = 16777216   # 16 * 1024 * 1024
write_sql_limit = 167772160   # 160 * 1024 * 1024
auth_enabled = false

[storage]
# Directory for summary: $path/summary/
# Directory for index: $path/index/$database/
# Directory for tsm: $path/data/$database/tsm/
# Directory for delta: $path/data/$database/delta/
path = '/tmp/cnosdb/1001/db'
max_summary_size = "128M" # 134217728
base_file_size = "16M" # 16777216
flush_req_channel_cap = 16
compact_trigger_file_num = 4
compact_trigger_cold_duration = "1h"
max_compact_size = "2G" # 2147483648
max_concurrent_compaction = 4
strict_write = false

[wal]
enabled = true
path = '/tmp/cnosdb/1001/wal'
wal_req_channel_cap = 64
max_file_size = "1G" # 1073741824
flush_trigger_total_file_size = "2G" # 2147483648
sync = false
sync_interval = "0"

[cache]
max_buffer_size = "128M" # 134217728
max_immutable_number = 4

[log]
level = 'info'
path = '/tmp/cnosdb/1001/log'

[security]
# [security.tls_config]
# certificate = "./config/tls/server.crt"
# private_key = "./config/tls/server.key"

[cluster]
name = 'cluster_xxx'
meta_service_addr = ["127.0.0.1:8901"]

http_listen_port = 8902
grpc_listen_port = 8903
flight_rpc_listen_port = 8904
tcp_listen_port = 8905

[node_basic]
node_id = 1001 
cold_data_server = false
store_metrics = true

[heartbeat]
report_time_interval_secs = 30

[hinted_off]
enable = true
path = '/tmp/cnosdb/1001/hh'
```

#### 配置项 query

| 配置项                 | 默认值   | 说明                                                                                      |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| max_server_connections | 10240    | 最大同时执行的 SQL 数量                                                                   |
| query_sql_limit        | 16777216 | SQL 的最大长度（字节）                                                                    |
| auth_enabled           | false    | 是否检查每个查询请求的身份信息，当设置为 true 时，执行 SQL 时会检查用户是否拥有对应权限。 |

#### 配置项 storage

| 配置项           | 默认值     | 说明                                                                                              |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| path             | data/db    | 数据库文件存放路径                                                                                |
| max_summary_size | 134217728  | 单个数据库概要文件的最大大小（字节），达到大小时，创建新的概要文件                                |
| max_level        | 4          | 数据库文件的最大层级                                                                              |
| base_file_size   | 16777216   | 数据库文件大小（字节）                                                                            |
| compact_trigger  | 4          | 当层级 0 的文件达到数量时，开启压缩任务，将文件合入更高层级                                       |
| max_compact_size | 2147483648 | 每次压实任务中，最大选择的文件总大小（字节）                                                      |
| strict_write     | false      | 是否确保每个写入请求能够严格符合 Table 的 Schema，当设置为 true 时，不检查写入请求是否符合 Schema |

#### 配置项 wal

| 配置项  | 默认值   | 说明                                                                     |
| ------- | -------- | ------------------------------------------------------------------------ |
| enabled | true     | 是否开启 WAL 以获得容灾支持，当设置为 ture 时，写请求会先写入到 WAL 文件 |
| path    | data/wal | WAL 文件目录                                                             |
| sync    | false    | 是否确保每个 WAL 的写请求都刷入磁盘                                      |

#### 配置项 cache

| 配置项               | 默认值    | 说明                                                                    |
| -------------------- | --------- | ----------------------------------------------------------------------- |
| max_buffer_size      | 134217728 | 单个 Vnode 中，每个活跃缓存最大可写入的大小（字节）                     |
| max_immutable_number | 4         | 单个 Vnode 中，最大的不活跃缓存数量，当达到数量时，将不活跃缓存写入磁盘 |

#### 配置项 log

| 配置项 | 默认值   | 说明                                                       |
| ------ | -------- | ---------------------------------------------------------- |
| level  | info     | 日志级别，可选项为 trace \| debug \| info \| warn \| error |
| path   | data/log | 日志文件目录                                               |

#### 配置项 security

**security.tls_confg**

| 配置项      | 默认值              | 说明             |
| ----------- | ------------------- | ---------------- |
| certificate | data/tls/server.crt | TLS 证书文件路径 |
| private_key | data/tls/server.key | TLS 私钥文件路径 |

#### 配置项 cluster

| 配置项               | 默认值             | 说明                  |
|-------------------|-----------------|---------------------|
| name              | cluster_xxx     | Data 节点名称           |
| meta              | 127.0.0.1:8901 | Meta 节点地址           |
| flight_rpc_listen_port | 8902 | Flight RPC 服务监听端口   |
| http_listen_port       | 8903 | HTTP 服务监听端口        |
| grpc_listen_port       | 8904 | GRPC 服务监听端口         |
| tcp_listen_port        | 8905 | TCP 服务监听端口          |
| store_metrics     | true            | 是否存储metrics在CnosDB中 |

#### 配置项 node_basic

| 配置项               | 默认值             | 说明                  |
|-------------------|-----------------|---------------------|
| node_id           | 100             | Data 节点 ID          |
| cold_data_server  | true            | 是否在分配vnode的时候使用该节点        |
| store_metrics     | true            | 是否存储metrics在CnosDB中 |

#### 配置项 heartbeat

| 配置项               | 默认值             | 说明                  |
|-------------------|-----------------|---------------------|
| report_time_interval_secs | 30             | Data 节点上报时间戳,磁盘剩余量等信息的频率         |


#### 配置项 hintedoff

| 配置项 | 默认值  | 说明                                                                                                         |
| ------ | ------- | ------------------------------------------------------------------------------------------------------------ |
| enable | true    | 是否开启 Hinted Off 以获取一致性支持，当设置为 true 时，失败的写入请求将会自动进入 hinted-off 队列并自动重试 |
| path   | data/hh | Hinted Off 持久化目录                                                                                        |

## 安装CnosDB

参考 [安装CnosDB#源码安装](../install_cnosdb.md#源码安装)。

## 启动CnosDB集群

可通过以下命令来体验集群版功能。Meta 集群是由多个 cnos-meta 通过 Raft 协议组成的一个 Raft Group。Meta Node 也支持单节点启动。

### 单节点启动流程

```sh
./target/debug/cnosdb-meta --id 1 --http-addr 127.0.0.1:21001
curl http://127.0.0.1:21001/init -d '{}'
curl http://127.0.0.1:21001/metrics
./target/debug/cnosdb run --config ./config/config_8902.toml
```

### 集群启动流程

- #### Meta 集群启动流程

  **启动 meta-1**

    ```sh
    ./target/debug/cnosdb-meta --id 1 --http-addr 127.0.0.1:21001
    ```

  **启动 meta-2**

    ```sh
    ./target/debug/cnosdb-meta --id 2 --http-addr 127.0.0.1:21002
    ```

  **启动 meta-3**

    ```sh
    ./target/debug/cnosdb-meta --id 3 --http-addr 127.0.0.1:21003
    ```

  **初始化 meta**

    ```sh
    curl http://127.0.0.1:21001/init -d '{}'
    curl http://127.0.0.1:21001/add-learner -H "Content-Type: application/json" -d '[2, "127.0.0.1:21002"]'
    curl http://127.0.0.1:21001/add-learner -H "Content-Type: application/json" -d '[3, "127.0.0.1:21003"]'
    curl http://127.0.0.1:21001/change-membership -H "Content-Type: application/json" -d '[1, 2, 3]'
    ```

  **查看 meta 集群状态**

    ```sh
    curl http://127.0.0.1:21001/metrics
    curl http://127.0.0.1:21002/metrics
    curl http://127.0.0.1:21003/metrics
    ```

- #### Data 集群启动流程

  **启动 data-1**

    ```sh
    ./target/debug/cnosdb run --config ./config/config_8902.toml
    ```

  **启动 data-2**

    ```sh
    ./target/debug/cnosdb run --config ./config/config_32001.toml
    ```

## 运维指南

### 集群维护（即将上线）

**转移 Vnode**

```
MOVE VNODE [vnode_id] TO NODE [node_id]
```

**复制 Vnode**

```
COPY VNODE [vnode_id] TO NODE [node_id]
```

**删除 Vnode**

```
DROP VNODE <vnode_id>
```

**压缩 Vnode**

```
COMPACT VNODE <vnode_id>[ <vnode_id>[ ...]]
```

**检查 Group 数据一致性**

```
CHECKSUM GROUP <replication_set_id>
```
