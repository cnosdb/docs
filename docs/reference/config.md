---
title: 配置
order: 6
---

# CnosDB配置

## 介绍

CnosDB 的配置文件为 TOML 格式。

> TOML 语法参考：[https://toml.io](https://toml.io/cn/v1.0.0)

你可以使用 `cnosdb config` 命令来创建一个默认的配置文件，如：

```shell
cnosdb config > ./config.toml
```

你可以使用 `cnosdb check server-config <path>` 命令来检查一个配置文件，如：

```shell
cnosdb check server-config ./config.toml
```

配置文件由数个 TOML 键值对与表所组成，如下所示：

**TOML 键**

- `reporting_disabled` 是否关闭信息收集。
- `host` 节点的 host。
- `raft_logs_to_keep` 采用raft协议进行副本时使用；每个复制组保留多少条raft日志，以及多久做一次快照。
- `using_raft_replication` 采用raft协议进行副本复制，注意：当前还不太稳定，不建议线上使用。


**TOML 表**

- `[deployment]` 启动配置
- `[query]` 查询接口配置
- `[storage]` 存储配置
- `[wal]` 写前日志配置
- `[cache]` 缓存配置
- `[log]` 运行日志配置
- `[security]` 安全配置
- `[cluster]` 集群配置
- `[heartbeat]` 心跳配置
- `[node_basic]` 节点配置
- `[hintedoff]` HintedOff 配置
- `[trace]` 全链路追踪配置

详细的配置文件说明如下所示：

## \[deployment]

| 参数     | 说明                                                                   |
|--------|----------------------------------------------------------------------|
| mode   | 部署模式，可选项为 `tskv`, `query`, `query_tskv`, `singleton`，默认：`query_tskv` |
| cpu    | 节点运行所使用的 cpu 核数，默认：10                                                |
| memory | 节点运行所使用的最大内存（G），默认：16                                                |

参数 **mode** 的可选项说明：

- `tskv`: 只部署 tskv 引擎，需要指定 Meta 服务地址。
- `query`: 只部署 query 引擎，需要指定 Meta 服务地址。
- `query_tskv`: query 和 tskv 引擎都部署，需要指定 Meta 服务地址。
- `singleton`: 部署单机版，无需指定 Meta 服务地址。

## reporting_disabled

**说明**：是否关闭信息收集，默认为 false。

CnosDB 会收集一些信息，使社区更好地改进产品。

我们不会收集用户的数据，只会收集以下数据：

- 数据库实例运行时间
- 数据库实例运行的操作系统类型和架构
- 数据库版本
- 数据库实例运行的区域，只到省级，或州级

你可以在配置文件中设置此项为 true 来关闭信息收集。

```toml
reporting_disabled = true
```

## host

**说明**：节点 host，用来和其他节点建立通信，默认为 `localhost`。

## \[query]

| 参数                     | 说明                                       |
|------------------------|------------------------------------------|
| max_server_connections | 最大并发连接请求数，默认：10240                       |
| query_sql_limit        | 每个 SQL 查询请求的最大字节数，默认：16777216            |
| write_sql_limit        | 每个 Line Protocol 写入请求的最大字节数，默认：167772160 |
| auth_enabled           | 是否检查用户的权限，默认：false                       |

## \[storage]

| 参数                            | 说明                           |
|-------------------------------|------------------------------|
| path                          | 数据存储目录，默认：`data/db`          |
| max_summary_size              | 单个 Summary 日志的最大大小，默认：128M   |
| base_file_size                | 单个文件数据大小，默认：16M              |
| flush_req_channel_cap         | 累积的 flush 任务上限，默认：16         |
| max_level                     | LSM 的最大层数，取值范围 0-4，默认：4      |
| compact_trigger_file_num      | 触发 compaction 所需的文件数量, 默认：4  |
| compact_trigger_cold_duration | 时间段内未操作，则触发 compaction，默认：1h |
| max_compact_size              | compaction 最多选择的文件大小，默认：2G   |
| max_concurrent_compaction     | 最多同时进行的 compaction 任务数量，默认：4 |
| strict_write                  | 是否开启严格写入，默认：false            |

## \[wal]

| 参数                            | 说明                              |
|-------------------------------|---------------------------------|
| enabled                       | 是否启用 WAL，默认：false               |
| path                          | WAL 存储目录，默认 `data/wal`          |
| wal_req_channel_cap           | 累积的写 WAL 任务上限，默认：64             |
| max_file_size                 | 单个 WAL 的最大大小，默认：1G              |
| flush_trigger_total_file_size | 所有 WAL 的大小达到该数值时，触发 flush，默认：2G |
| sync                          | 是否为每次写入进行同步，默认：false            |
| sync_interval                 | 同步 WAL 的时间间隔，默认：0，即不主动同步        |

## \[cache]

| 参数                   | 说明                |
|----------------------|-------------------|
| max_buffer_size      | 最大的活跃缓存大小，默认：128M |
| max_immutable_number | 最大的非活跃缓存数量, 默认：4  |

## \[log]

| 参数    | 说明                                  |
|-------|-------------------------------------|
| level | 日志等级（debug、info、error、warn），默认：info |
| path  | 日志存储目录，默认：`data/log`                |

## \[security]

| 参数         | 说明        |
|------------|-----------|
| tls_config | 可选，TLS 配置 |

### \[security.tls_config]

| 参数          | 说明        |
|-------------|-----------|
| certificate | TLS 服务的证书 |
| private_key | TLS 服务的私钥 |

## \[cluster]

| 参数                     | 说明                                   |
|------------------------|--------------------------------------|
| name                   | 节点名称，默认：`cluster_xxx`                |
| meta_service_addr      | 远程 Meta 服务地址，默认：`['127.0.0.1:8901']` |
| http_listen_port       | HTTP 服务监听端口，默认：8902                  |
| grpc_listen_port       | GRPC 服务监听端口，默认：8903                  |
| flight_rpc_listen_port | Flight RPC 服务监听端口，默认：8904            |
| tcp_listen_port        | TCP 服务监听端口，默认：8905                   |

## \[node_basic]

| 参数               | 说明                                          |
|------------------|---------------------------------------------|
| node_id          | 节点 ID，默认：1001                               |
| cold_data_server | 是否停止在此节点上创建 Vnode，默认：false                  |
| store_metrics    | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库，默认：true |

## \[heartbeat]

| 参数                       | 说明                                     |
|--------------------------|----------------------------------------|
| report_time_interval_sec | 此节点上报心跳、磁盘余量等信息到 Meta 服务的时间间隔（秒），默认：30 |

## \[hintedoff]

| 参数     | 说明                                 |
|--------|------------------------------------|
| enable | 是否开启 HIntedOff 服务，默认：true          |
| path   | HintedOff 存储目录，默认：`/tmp/cnosdb/hh` |
| threads  |处理hinted handoff数据的并发数，默认：3|

## \[subscription]

| 参数          | 说明                           |
|-------------|------------------------------|
| cache       | 发送转发前写入cache的大小(bit)，默认：1028 |
| concurrency | 处理转发请求的并发数，默认：8              |
| timeout     | 转发请求的超时时间（秒），默认：300          |

## \[trace]

| 参数                | 说明                                               |
|--------------------|---------------------------------------------------|
| auto_generate_span | 是否自动生成root span，当客户端未携带span context时有效 |

### \[trace.log] (可选)

| 参数                | 说明                                               |
|--------------------|---------------------------------------------------|
| path | trace 日志文件路径 |

### \[trace.jaeger] (可选)

| 参数                | 说明                                               |
|--------------------|---------------------------------------------------|
| jaeger_agent_endpoint | the Jaeger agent endpoint。例如：http://localhost:14268/api/traces |
| max_concurrent_exports | trace 上报器的并行度。默认值为 2 |
| max_queue_size | span 缓冲区最大队列大小。如果队列已满，它会丢弃 span。 默认值为 4096 |

# CnosDB Meta配置

Meta节点的配置文件格式同Data节点，由数个 TOML 键值对与表所组成，如下所示：

**TOML 键**

- `id` Meta节点的id，要求集群内唯一
- `host` 节点的 host
- `port` 节点的 port
- `snapshot_path` Meta节点snapshot存储路径
- `journal_path` Meta节点journal存储路径
- `snapshot_per_events` Meta节点多久做一次snapshot

**TOML 表**

- `[log]` 运行日志配置
- `[meta_init]` Meta初始化相关配置信息
- `[heartbeat]` 定时检查CnosDB节点状态相关配置

详细的配置文件说明如下所示：

## \[log]

| 参数    | 说明                                  |
|-------|-------------------------------------|
| level | 日志等级（debug、info、error、warn），默认：info |
| path  | 日志存储目录，默认：`data/log`                |


## \[meta_init]

| 参数    | 说明                                  |
|-------|-------------------------------------|
| cluster_name | 集群名字 |
| admin_user  | 系统管理员用户名               |
| system_tenant  | 系统默认租户名字               |
| default_database  | 默认创建的数据库              |

## \[heartbeat]

| 参数                       | 说明                                     |
|--------------------------|----------------------------------------|
| heartbeat_recheck_interval | 多久检查一次CnosDB节点的状态 |
| heartbeat_expired_interval | CnosDB节点多久未上报心跳认定异常 |

