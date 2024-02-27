---
title: 配置
order: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

本章节介绍配置 CnosDB 配置的方法。

CnosDB 的配置文件为 TOML 格式。

> TOML 语法参考：[https://toml.io](https://toml.io/cn/v1.0.0)

使用 `cnosdb config` 命令来创建默认的配置文件，如：

```shell
cnosdb run config > ./config.toml
```

使用 `cnosdb check server-config <path>` 命令来检查配置文件是否合法，如：

```shell
cnosdb check server-config ./config.toml
```

使用 `cnosdb` 命令指定配置文件启动：

> 如果用户未指定，则程序在 `/etc/cnosdb/cnosdb.conf`，`$HOME/cnosdb/cnosdb.conf`位置先寻找配置，没有找到则使用默认配置

```
cnosdb --config ./cnosdb.conf
```

CnosDB 中的配置优先级为：指定参数 > 环境变量 > 指定配置文件 > `/etc/cnosdb/cnosdb.conf` > `$HOME/cnosdb/cnosdb.conf` > 默认配置

## 环境变量

配置文件中的所有设置都可以使用环境变量进行设置或覆盖。如果在文件和环境变量中同时存在，则环境变量将优先，并且配置文件中的值将被忽略。

要通过环境变量使这些配置设置可供 CnosDB 使用，它们必须采用以下格式：

```shell
CNOSDB_REPORTING_DISABLED=false
```

## 文件描述

本节介绍每个配置的配置方式以及用途。

### 全局配置

```mdx-code-block
<APITable>
```

| 参数                       | 默认                         | 环境变量                            | 描述                                                                                                                          |
| ------------------------ | -------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled`     | `false`                    | `CNOSDB_REPORTING_DISABLED`     | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |
| `raft_logs_to_keep`      | `5000`                     | `CNOSDB_RAFT_LOGS_TO_KEEP`      | Raft 日志保留条数，且每隔这些次数写入做一次 snapshot                                                                                           |
| `using_raft_replication` | `false`                    | `CNOSDB_USING_RAFT_REPLICATION` | 是否启用 Raft 复制算法                                                                                                              |
| `host`                   | `localhost`                | `CNOSDB_HOST`                   | 用来和其他节点通信。                                                                                                                  |
| `license_file`           | `/etc/cnosdb/license.json` | `CNOSDB_LICENSE_FILE`           | 企业版配置，用于指定 `License` 文件位置。                                                                                                  |

```mdx-code-block
</APITable>
```

### `[deployment]`

```mdx-code-block
<APITable>
```

| 参数       | 默认           | 环境变量            | 说明                                                                                                                                                                                                                                  |
| -------- | ------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`   | `query_tskv` | `CNOSDB_MODE`   | 部署模式，可选项为： `tskv`, `query`, `query_tskv`, `singleton`。  `tskv`: 只部署 `tskv` 引擎，需要指定 Meta 服务地址。 `query`: 只部署 `query` 引擎，需要指定 `meta` 服务地址。 `query_tskv`: `query` 和 `tskv` 引擎都部署，需要指定 `meta` 服务地址。 `singleton`: 部署单机版，无需指定 `meta` 服务地址。 |
| `cpu`    | 等同节点核心数      | `CNOSDB_CPU`    | 节点运行所使用的 cpu 核数                                                                                                                                                                                                                     |
| `memory` | 等同节点CPU数     | `CNOSDB_MEMORY` | 节点运行所使用的最大内存，单位：（G)                                                                                                                                                                                                                 |

```mdx-code-block
</APITable>
```

### `[query]`

```mdx-code-block
<APITable>
```

| 参数                       | 默认          | 环境变量                            | 描述                                   |
| ------------------------ | ----------- | ------------------------------- | ------------------------------------ |
| `max_server_connections` | `10240`     | `CNOSDB_MAX_SERVER_CONNECTIONS` | 最大并发连接请求数。                           |
| `query_sql_limit`        | `16777216`  | `CNOSDB_QUERY_SQL_LIMIT`        | 每个 SQL 查询请求的最大字节数，单位：Bytes           |
| `write_sql_limit`        | `167772160` | `CNOSDB_WRITE_SQL_LIMIT`        | 每个 Line Protocol 写入请求的最大字节数，单位：Bytes |
| `auth_enabled`           | `false`     | `CNOSDB_AUTH_ENABLED`           | 是否检查用户的权限。                           |
| `read_timeout_ms`        | `3000`      | `CNOSDB_READ_TIMEOUT_MS`        | `query` 访问 `tskv` 的超时时间，单位：`ms`      |
| `write_timeout_ms`       | `3000`      | `CNOSDB_WRITE_TIMEOUT_MS`       | 向 `tskv` 写入数据时的超时时间，单位：`ms`          |
| `stream_trigger_cpu`     | `1`         | `CNOSDB_STREAM_TRIGGER_CPU`     | 准备流计算任务的 CPU 数量                      |
| `stream_executor_cpu`    | `2`         | `CNOSDB_STREAM_EXECUTOR_CPU`    | 执行流计算任务的 CPU 数量                      |

```mdx-code-block
</APITable>
```

### `[storage]`

```mdx-code-block
<APITable>
```

| 参数                              | 默认                        | 环境变量                                   | 描述                                     |
| ------------------------------- | ------------------------- | -------------------------------------- | -------------------------------------- |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | `CNOSDB_PATH`                          | 数据存储目录。                                |
| `max_summary_size`              | `128M`                    | `CNOSDB_MAX_SUMMARY_SIZE`              | 单个 Summary 日志的最大大小。                    |
| `base_file_size`                | `16M`                     | `CNOSDB_BASE_FILE_SIZE`                | 单个文件数据大小。                              |
| `flush_req_channel_cap`         | `16`                      | `CNOSDB_FLUSH_REQ_CHANNEL_CAP`         | 累积的 flush 任务上限。                        |
| `max_level`                     | `4`                       | `CNOSDB_MAX_LEVEL`                     | LSM 的最大层数，取值范围 0-4。                    |
| `compact_trigger_file_num`      | `4`                       | `CNOSDB_COMPACT_TRIGGER_FILE_NUM`      | 触发 compaction 所需的文件数量。                 |
| `compact_trigger_cold_duration` | `1h`                      | `CNOSDB_COMPACT_TRIGGER_COLD_DURATION` | 时间段内未操作，则触发 compaction。                |
| `max_compact_size`              | `2G`                      | `CNOSDB_MAX_COMPACT_SIZE`              | compaction 最多选择的文件大小。                  |
| `max_concurrent_compaction`     | `4`                       | `CNOSDB_MAX_CONCURRENT_COMPACTION`     | 最多同时进行的 compaction 任务数量。               |
| `strict_write`                  | `false`                   | `CNOSDB_STRICT_WRITE`                  | 是否开启严格写入。                              |
| `reserve_space`                 | `0`                       | `CNOSDB_RESERVE_SPACE`                 | 系统的保留空间大小。                             |
| `copyinto_trigger_flush_size`   | `128M`                    | `COPYINTO_TRIGGER_FLUSH_SIZE`          | `COPY INTO`导出时触发落盘的内存大小 。支持版本：>2.3.4.3 |

```mdx-code-block
</APITable>
```

### `[wal]`

```mdx-code-block
<APITable>
```

| 参数                              | 默认                    | 环境变量                                   | 描述                                                |
| ------------------------------- | --------------------- | -------------------------------------- | ------------------------------------------------- |
| `enabled`                       | `true`                | `CNOSDB_ENABLED`                       | 是否启用 WAL。                                         |
| `path`                          | `/var/lib/cnosdb/wal` | `CNOSDB_PATH`                          | WAL 存储目录。                                         |
| `wal_req_channel_cap`           | `64`                  | `CNOSDB_WAL_REQ_CHANNEL_CAP`           | 累积的写 WAL 任务上限。                                    |
| `max_file_size`                 | `1G`                  | `CNOSDB_MAX_FILE_SIZE`                 | 单个 WAL 的最大大小。                                     |
| `flush_trigger_total_file_size` | `2G`                  | `CNOSDB_FLUSH_TRIGGER_TOTAL_FILE_SIZE` | 所有 WAL 的大小达到该数值时，触发 flush。                        |
| `sync`                          | `false`               | `CNOSDB_SYNC`                          | 是否为每次写入进行同步。                                      |
| `sync_interval`                 | `0`                   | `CNOSDB_SYNC_INTERVAL`                 | 同步 WAL 的时间间隔，即不主动同步，单位：`h`、`m`、`s`、`ms`、`us`、`ns` |

```mdx-code-block
</APITable>
```

### `[cache]`

```mdx-code-block
<APITable>
```

| 参数                     | 默认      | 环境变量                          | 描述                            |
| ---------------------- | ------- | ----------------------------- | ----------------------------- |
| `max_buffer_size`      | `128M`  | `CNOSDB_MAX_BUFFER_SIZE`      | 最大的活跃缓存大小。                    |
| `max_immutable_number` | `4`     | `CNOSDB_MAX_IMMUTABLE_NUMBER` | 最大的非活跃缓存数量。                   |
| `partition`            | 等同CPU数量 | `CNOSDB_PARTITION`            | memcache 缓存的分区数量，默认值等于 CPU 数量 |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| 参数      | 默认                | 环境变量           | 描述                           |
| ------- | ----------------- | -------------- | ---------------------------- |
| `level` | `info`            | `CNOSDB_LEVEL` | 日志等级（debug、info、error、warn）。 |
| `path`  | `/var/log/cnosdb` | `CNOSDB_PATH`  | 日志存储目录。                      |

```mdx-code-block
</APITable>
```

### `[security]`

```mdx-code-block
<APITable>
```

| 参数           | 默认 | 环境变量                | 描述     |
| ------------ | -- | ------------------- | ------ |
| `tls_config` | 无  | `CNOSDB_TLS_CONFIG` | TLS 配置 |

```mdx-code-block
</APITable>
```

### `[security.tls_config]`（可选）

```mdx-code-block
<APITable>
```

| 参数            | 默认 | 环境变量                 | 描述        |
| ------------- | -- | -------------------- | --------- |
| `certificate` | 无  | `CNOSDB_CERTIFICATE` | TLS 服务的证书 |
| `private_key` | 无  | `CNOSDB_PRIVATE_KEY` | TLS 服务的私钥 |

```mdx-code-block
</APITable>
```

### `[cluster]`

```mdx-code-block
<APITable>
```

| 参数                       | 默认               | 环境变量                            | 描述                                       |
| ------------------------ | ---------------- | ------------------------------- | ---------------------------------------- |
| `name`                   | `cluster_xxx`    | `CNOSDB_NAME`                   | 节点名称。                                    |
| `meta_service_addr`      | `127.0.0.1:8901` | `CNOSDB_META_SERVICE_ADDR`      | 远程 `meta` 服务地址。                          |
| `http_listen_port`       | `8902`           | `CNOSDB_HTTP_LISTEN_PORT`       | HTTP 服务监听端口。                             |
| `grpc_listen_port`       | `8903`           | `CNOSDB_GRPC_LISTEN_PORT`       | GRPC 服务监听端口。                             |
| `flight_rpc_listen_port` | `8904`           | `CNOSDB_FLIGHT_RPC_LISTEN_PORT` | Flight RPC 服务监听端口。                       |
| `tcp_listen_port`        | `8905`           | `CNOSDB_TCP_LISTEN_PORT`        | TCP 服务监听端口。                              |
| `vector_listen_port`     | `8906`           | `CNOSDB_VECTOR_LISTEN_PORT`     | 用于监听 [Vector](https://vector.dev/) 写入的数据 |

```mdx-code-block
</APITable>
```

### `[hintedoff]`

```mdx-code-block
<APITable>
```

| 参数        | 默认                   | 环境变量             | 描述                      |
| --------- | -------------------- | ---------------- | ----------------------- |
| `enable`  | `true`               | `CNOSDB_ENABLE`  | 是否开启 HIntedOff 服务。      |
| `path`    | `/var/lib/cnosdb/hh` | `CNOSDB_PATH`    | HintedOff 存储目录。         |
| `threads` | `3`                  | `CNOSDB_THREADS` | 处理hinted handoff数据的并发数。 |

```mdx-code-block
</APITable>
```

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### `[subscription]`

```mdx-code-block
<APITable>
```

| 参数            | 默认     | 环境变量                 | 描述                      |
| ------------- | ------ | -------------------- | ----------------------- |
| `cache`       | `1024` | `CNOSDB_CACHE`       | 发送转发前写入cache的大小，单位：bits |
| `concurrency` | `8`    | `CNOSDB_CONCURRENCY` | 处理转发请求的并发数。             |
| `timeout`     | `1000` | `CNOSDB_TIMEOUT`     | 转发请求的超时时间，单位：秒。         |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| 参数                         | 默认   | 环境变量                              | 描述                                    |
| -------------------------- | ---- | --------------------------------- | ------------------------------------- |
| `report_time_interval_sec` | `30` | `CNOSDB_REPORT_TIME_INTERVAL_SEC` | 此节点上报心跳、磁盘余量等信息到 `meta` 服务的时间间隔，单位：秒。 |

```mdx-code-block
</APITable>
```

### `[node_basic]`

```mdx-code-block
<APITable>
```

| 参数                 | 默认      | 环境变量                      | 描述                                   |
| ------------------ | ------- | ------------------------- | ------------------------------------ |
| `node_id`          | `1001`  | `CNOSDB_NODE_ID`          | 节点 ID。                               |
| `cold_data_server` | `false` | `CNOSDB_COLD_DATA_SERVER` | 是否停止在此节点上创建 Vnode。                   |
| `store_metrics`    | `true`  | `CNOSDB_STORE_METRICS`    | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。 |

```mdx-code-block
</APITable>
```

### `[trace]`

```mdx-code-block
<APITable>
```

| 参数                   | 默认      | 环境变量                        | 描述                                     |
| -------------------- | ------- | --------------------------- | -------------------------------------- |
| `auto_generate_span` | `false` | `CNOSDB_AUTO_GENERATE_SPAN` | 是否自动生成root span，当客户端未携带span context时有效 |

```mdx-code-block
</APITable>
```

### `[trace.log]` (可选)

```mdx-code-block
<APITable>
```

| 参数     | 默认 | 环境变量          | 描述           |
| ------ | -- | ------------- | ------------ |
| `path` | 无  | `CNOSDB_PATH` | trace 日志文件路径 |

```mdx-code-block
</APITable>
```

### `[trace.jaeger]` (可选)

```mdx-code-block
<APITable>
```

| 参数                       | 默认   | 环境变量                            | 描述                                                              |
| ------------------------ | ---- | ------------------------------- | --------------------------------------------------------------- |
| `jaeger_agent_endpoint`  | 无    | `CNOSDB_JAEGER_AGENT_ENDPOINT`  | the Jaeger agent endpoint。例如：http\://localhost:14268/api/traces |
| `max_concurrent_exports` | 2    | `CNOSDB_MAX_CONCURRENT_EXPORTS` | trace 上报器的并行度。默认值为 2                                            |
| `max_queue_size`         | 4096 | `CNOSDB_MAX_QUEUE_SIZE`         | span 缓冲区最大队列大小。如果队列已满，它会丢弃 span。                                |

```mdx-code-block
</APITable>
```

## `meta` 文件描述

### 全局配置

```mdx-code-block
<APITable>
```

| 参数                                                         | 默认                     | 环境变量                      | 描述                     |
| ---------------------------------------------------------- | ---------------------- | ------------------------- | ---------------------- |
| id                                                         | `1`                    | `CNOSDB_ID`               | `meta`节点的`id`，要求集群内唯一  |
| host                                                       | `127.0.0.1`            | `CNOSDB_HOST`             | 用于和其他节点通信的 `host`      |
| port                                                       | `8901`                 | `CNOSDB_PORT`             | 用于和其他节点通信的 `port`      |
| data_path                             | `/var/lib/cnosdb/meta` | `CNOSDB_DATA_PATH`        | `meta`数据的存储路径          |
| grpc_enable_gzip | `false`                | `CNOSDB_GRPC_ENABLE_GZIP` | `meta`服务的接口数据传输，是否启用压缩 |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| 参数      | 默认                | 环境变量           | 描述                           |
| ------- | ----------------- | -------------- | ---------------------------- |
| `level` | `info`            | `CNOSDB_LEVEL` | 日志等级（debug、info、error、warn）。 |
| `path`  | `/var/log/cnosdb` | `CNOSDB_PATH`  | 日志存储目录。                      |

```mdx-code-block
</APITable>
```

### `[meta_init]`

```mdx-code-block
<APITable>
```

| 参数                 | 默认                          | 环境变量                      | 描述       |
| ------------------ | --------------------------- | ------------------------- | -------- |
| `cluster_name`     | `cluster_xxx`               | `CNOSDB_CLUSTER_NAME`     | 集群名字     |
| `admin_user`       | `root`                      | `CNOSDB_ADMIN_USER`       | 系统管理员用户名 |
| `system_tenant`    | `cnosdb`                    | `CNOSDB_SYSTEM_TENANT`    | 系统默认租户名字 |
| `default_database` | `["public","usage_schema"]` | `CNOSDB_DEFAULT_DATABASE` | 默认创建的数据库 |

```mdx-code-block
</APITable>
```

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| 参数                           | 默认  |                                     | 描述                        |
| ---------------------------- | --- | ----------------------------------- | ------------------------- |
| `heartbeat_recheck_interval` | 300 | `CNOSDB_HEARTBEAT_RECHECK_INTERVAL` | 多久检查一次CnosDB节点的状态，单位：秒。   |
| `heartbeat_expired_interval` | 300 | `CNOSDB_HEARTBEAT_EXPIRED_INTERVAL` | CnosDB节点多久未上报心跳认定异常，单位：秒。 |

```mdx-code-block
</APITable>
```
