---
sidebar_position: 4
---

# 配置

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

本章节介绍配置 CnosDB 配置的方法。

CnosDB 的配置文件为 TOML 格式。

> TOML 语法参考：[https://toml.io](https://toml.io/cn/v1.0.0)

使用 `cnosdb config` 命令来创建默认的配置文件，如：

```shell
cnosdb config > ./config.toml
```

使用 `cnosdb check server-config <path>` 命令来检查配置文件是否合法，如：

```shell
cnosdb check server-config ./config.toml
```

使用 `cnosdb` 命令指定配置文件启动：

> 如果用户未指定，则程序在 `/etc/cnosdb/cnosdb.conf`，`$HOME/cnosdb/cnosdb.conf`位置先寻找配置，没有找到则使用默认配置

```
cnosdb run --config ./cnosdb.conf
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

| 参数                     | 默认                       | 环境变量                    | 描述                                                         |
| ------------------------ | -------------------------- | --------------------------- | ------------------------------------------------------------ |
| `node_id`     | `1001`                    | `CNOSDB_GLOBAL_NODE_ID` | 节点 ID |
| `host`      | `localhost`                     | `CNOSDB_GLOBAL_HOST`  | 用来和其他节点通信。         |
| `cluster_name` | `cluster_xxx`                    |  `CNOSDB_GLOBAL_CLUSTER_NAME`| 集群名字                                       |
| `store_metrics`                   | `true`                | `CNOSDB_GLOBAL_STORE_METRICS` | 是否统计此节点的使用情况并存储到`usage_schema`数据库。                                         |
| `pre_create_bucket`     | `false`                    | `CNOSDB_GLOBAL_PRE_CREATE_BUCKET` | 预创建 `bucket` |

```mdx-code-block
</APITable>
```

### `[deployment]`

```mdx-code-block
<APITable>
```

| 参数     | 默认           | 环境变量        | 说明                                                         |
| -------- | -------------- | --------------- | ------------------------------------------------------------ |
| `mode`   | `query_tskv`   | `CNOSDB_DEPLOYMENT_MODE`   | 部署模式，可选项为： `tskv`, `query`, `query_tskv`, `singleton`。  `tskv`: 只部署 `tskv` 引擎，需要指定 Meta 服务地址。 `query`: 只部署 `query` 引擎，需要指定 `meta` 服务地址。 `query_tskv`: `query` 和 `tskv` 引擎都部署，需要指定 `meta` 服务地址。 `singleton`: 部署单机版，无需指定 `meta` 服务地址。 |
| `cpu`    | 等同节点核心数 | `CNOSDB_DEPLOYMENT_CPU`    | 节点运行所使用的 cpu 核数                                    |
| `memory` | 等同节点CPU数  | `CNOSDB_DEPLOYMENT_MEMORY` | 节点运行所使用的最大内存，单位：（G）                         |



```mdx-code-block
</APITable>
```

### `[meta]`

```mdx-code-block
<APITable>
```

| 参数     | 默认           | 环境变量        | 说明                                                         |
| -------- | -------------- | --------------- | ------------------------------------------------------------ |
| `service_addr`   | `["127.0.0.1:8901"]`   | `CNOSDB_META_SERVICE_ADDR`   | 远程 meta 服务地址。 |
| `report_time_interval`    | `30s` | `CNOSDB_META_REPORT_TIME_INTERVAL`    | 此节点上报心跳、磁盘余量等信息到 meta 服务的时间间隔，单位：秒。                                    |



```mdx-code-block
</APITable>
```

### `[query]`

```mdx-code-block
<APITable>
```

| 参数                     | 默认        | 环境变量                        | 描述                                                 |
| ------------------------ | ----------- | ------------------------------- | ---------------------------------------------------- |
| `max_server_connections` | `10240`     | `CNOSDB_QUERY_MAX_SERVER_CONNECTIONS` | 最大并发连接请求数。                                 |
| `query_sql_limit`        | `16777216`  | `CNOSDB_QUERY_QUERY_SQL_LIMIT`        | 每个 SQL 查询请求的最大字节数，单位：Bytes           |
| `write_sql_limit`        | `167772160` | `CNOSDB_QUERY_WRITE_SQL_LIMIT`        | 每个 Line Protocol 写入请求的最大字节数，单位：Bytes |
| `auth_enabled`           | `false`     | `CNOSDB_QUERY_AUTH_ENABLED`           | 是否检查用户的权限。                                 |
| `read_timeout`        | `3000ms`      | `CNOSDB_QUERY_READ_TIMEOUT`        | `query` 访问 `tskv` 的超时时间，单位：`ms`           |
| `write_timeout`       | `3000ms`      | `CNOSDB_QUERY_WRITE_TIMEOUT`       | 向 `tskv` 写入数据时的超时时间，单位：`ms`           |
| `stream_trigger_cpu`     | `1`         | `CNOSDB_QUERY_STREAM_TRIGGER_CPU`     | 准备流计算任务的 CPU 数量                            |
| `stream_executor_cpu`    | `2`         | `CNOSDB_QUERY_STREAM_EXECUTOR_CPU`    | 执行流计算任务的 CPU 数量                            |
| `sql_record_timeout`    | `10s`         | `CNOSDB_QUERY_SQL_RECORD_TIMEOUT`    | sql被记录到cluster_schema.sql_history表的最低执行时间      |

```mdx-code-block
</APITable>
```

### `[storage]`

```mdx-code-block
<APITable>
```

| 参数                            | 默认                      | 环境变量 | 描述                                 |
| ------------------------------- | ------------------------- | -------- | ------------------------------------ |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | `CNOSDB_STORAGE_PATH` | 数据存储目录。                       |
| `max_summary_size`              | `128M`                    | `CNOSDB_STORAGE_MAX_SUMMARY_SIZE` | 单个 Summary 日志的最大大小。        |
| `base_file_size`                | `16M`                     | `CNOSDB_STORAGE_BASE_FILE_SIZE` | 单个文件数据大小。                   |
| `flush_req_channel_cap`         | `16`                      | `CNOSDB_STORAGE_FLUSH_REQ_CHANNEL_CAP` | 累积的 flush 任务上限。              |
| `max_cache_readers`                     | `32`                       | `CNOSDB_STORAGE_MAX_CACHE_READERS` | 每个 vnode 中打开的文件句柄（用于查询）的最大计数。       |
| `max_level`                     | `4`                       | `CNOSDB_STORAGE_MAX_LEVEL` | LSM 的最大层数，取值范围 0-4。       |
| `compact_trigger_file_num`      | `4`                       | `CNOSDB_STORAGE_COMPACT_TRIGGER_FILE_NUM` | 触发 compaction 所需的文件数量。     |
| `compact_trigger_cold_duration` | `1h`                      | `CNOSDB_STORAGE_COMPACT_TRIGGER_COLD_DURATION` | 时间段内未操作，则触发 compaction。  |
| `max_compact_size`              | `2G`                      | `CNOSDB_STORAGE_MAX_COMPACT_SIZE` | compaction 最多选择的文件大小。      |
| `max_concurrent_compaction`     | `4`                       | `CNOSDB_STORAGE_MAX_CONCURRENT_COMPACTION` | 最多同时进行的 compaction 任务数量。 |
| `strict_write`                  | `false`                   | `CNOSDB_STORAGE_STRICT_WRITE` | 是否开启严格写入。                   |
| `reserve_space`                 | `0`                       | `CNOSDB_STORAGE_RESERVE_SPACE` | 系统的保留空间大小。                   |
| `copyinto_trigger_flush_size` | `128M` | `CNOSDB_STORAGE_COPYINTO_TRIGGER_FLUSH_SIZE` | `COPY INTO`导出时触发落盘的内存大小 。支持版本：>2.3.4.3 |
| `max_datablock_size` | `100KB` | `CNOSDB_STORAGE_MAX_DATABLOCK_SIZE` | compaction时datablock的最大大小。 |
| `index_cache_capacity` | `100000` | `CNOSDB_STORAGE_INDEX_CACHE_CAPACITY` | index缓存容量 |



```mdx-code-block
</APITable>
```

### `[wal]`

```mdx-code-block
<APITable>
```

| 参数                            | 默认                  | 环境变量 | 描述                                      |
| ------------------------------- | --------------------- | -------- | ----------------------------------------- |
| `enabled`                       | `true`               | `CNOSDB_WAL_ENABLED` | 是否启用 WAL。                            |
| `path`                          | `/var/lib/cnosdb/wal` | `CNOSDB_WAL_PATH` | WAL 存储目录。                            |
| `wal_req_channel_cap`           | `64`                  | `CNOSDB_WAL_WAL_REQ_CHANNEL_CAP` | 累积的写 WAL 任务上限。                   |
| `max_file_size`                 | `1G`                  | `CNOSDB_WAL_MAX_FILE_SIZE` | 单个 WAL 的最大大小。                     |
| `flush_trigger_total_file_size` | `2G`                  | `CNOSDB_WAL_FLUSH_TRIGGER_TOTAL_FILE_SIZE` | 所有 WAL 的大小达到该数值时，触发 flush。 |
| `sync`                          | `false`               | `CNOSDB_WAL_SYNC` | 是否为每次写入进行同步。                  |
| `sync_interval`                 | `0`                   | `CNOSDB_WAL_SYNC_INTERVAL` | 同步 WAL 的时间间隔，即不主动同步，单位：`h`、`m`、`s`、`ms`、`us`、`ns` |
| `compress`                 | `zstd`                   | `CNOSDB_WAL_COMPRESS` | wal压缩算法，支持：`gzip`、`bzip`、`snappy`、`zlib`、`zstd` |

```mdx-code-block
</APITable>
```

### `[cache]`

```mdx-code-block
<APITable>
```

| 参数                   | 默认   | 环境变量 | 描述                   |
| ---------------------- | ------ | -------- | ---------------------- |
| `max_buffer_size`      | `128M` | `CNOSDB_CACHE_MAX_BUFFER_SIZE` | 最大的活跃缓存大小。   |
| `partition`            | 等同CPU数量| `CNOSDB_CACHE_PARTITION` | memcache 缓存的分区数量，默认值等于 CPU 数量  |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| 参数    | 默认              | 环境变量       | 描述                                   |
| ------- | ----------------- | -------------- | -------------------------------------- |
| `level` | `info`            | `CNOSDB_LOG_LEVEL` | 日志等级（debug、info、error、warn）。 |
| `path`  | `/var/log/cnosdb` | `CNOSDB_LOG_PATH`  | 日志存储目录。                         |
| `max_file_count`  | 无限制 | `CNOSDB_LOG_MAX_FILE_COUNT`  | 最多保留日志文件数。                         |
| `file_rotation`  | `daily` | `CNOSDB_LOG_FILE_ROTATION`  | 日志文件切分时间间隔（daily、hourly、minutely、never）。                         |

```mdx-code-block
</APITable>
```


### `[security.tls_config]`

```mdx-code-block
<APITable>
```

| 参数          | 默认 | 环境变量             | 描述           |
| ------------- | ---- | -------------------- | -------------- |
| `certificate` | 无   | `CNOSDB_SECURITY_TLS_CONFIG_CERTIFICATE` | TLS 服务的证书 |
| `private_key` | 无   | `CNOSDB_SECURITY_TLS_CONFIG_PRIVATE_KEY` | TLS 服务的私钥 |

```mdx-code-block
</APITable>
```

### `[service]`

```mdx-code-block
<APITable>
```

| 参数          | 默认 | 环境变量             | 描述           |
| ------------- | ---- | -------------------- | -------------- |
| `http_listen_port`       | `8902`           | `CNOSDB_SERVICE_HTTP_LISTEN_PORT`       | HTTP 服务监听端口。                               |
| `grpc_listen_port`       | `8903`           | `CNOSDB_SERVICE_GRPC_LISTEN_PORT`       | GRPC 服务监听端口。                               |
| `grpc_enable_gzip`       | `false`           | `CNOSDB_SERVICE_GRPC_ENABLE_GZIP`       | meta服务的接口数据传输，是否启用压缩                               |
| `flight_rpc_listen_port` | `8904`           | `CNOSDB_SERVICE_FLIGHT_RPC_LISTEN_PORT` | Flight RPC 服务监听端口。                         |
| `tcp_listen_port`        | `8905`           | `CNOSDB_SERVICE_TCP_LISTEN_PORT`        | TCP 服务监听端口。                                |
| `enable_report`       | `true`           | `CNOSDB_SERVICE_ENABLE_REPORT`       | 是否开启 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。                               |

```mdx-code-block
</APITable>
```

### `[cluster]`

```mdx-code-block
<APITable>
```

| 参数                     | 默认             | 环境变量                        | 描述                                              |
| ------------------------ | ---------------- | ------------------------------- | ------------------------------------------------- |
| `raft_logs_to_keep`                   | `5000`    | `CNOSDB_CLUSTER_RAFT_LOGS_TO_KEEP`                   | Raft日志保留条数，且每隔这些次数写入做一次snapshot。                                        |
| `snapshot_holding_time`      | `3600s` | `CNOSDB_CLUSTER_SNAPSHOT_HOLDING_TIME`      | Raft快照保留时间。                            |
| `trigger_snapshot_interval`       | `600s`           | `CNOSDB_CLUSTER_TRIGGER_SNAPSHOT_INTERVAL`       | Raft触发快照时间间隔。                               |
| `lmdb_max_map_size`       | `1024000000B`           | `CNOSDB_CLUSTER_LMDB_MAX_MAP_SIZE`       | 用于配置存储Raft状态数据大小。                               |
| `heartbeat_interval` | `3000ms`           | `CNOSDB_CLUSTER_HEARTBEAT_INTERVAL` | Raft复制算法心跳间隔。                         |
| `send_append_entries_timeout`        | `5000ms`           | `CNOSDB_CLUSTER_SEND_APPEND_ENTRIES_TIMEOUT`        | Raft节点间发送日志超时时间。                                |
| `install_snapshot_timeout`     | `3600000ms`           | `CNOSDB_CLUSTER_INSTALL_SNAPSHOT_TIMEOUT`     | Raft节点之间复制快照超时时间。 |

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

| 参数          | 默认   | 环境变量             | 描述                                  |
| ------------- | ------ | -------------------- | ------------------------------------- |
| `cache`       | `1024` | `CNOSDB_CACHE`       | 处理转发请求的通道大小。 |
| `concurrency` | `8`    | `CNOSDB_CONCURRENCY` | 处理转发请求的并发数。                |
| `timeout`     | `1000` | `CNOSDB_TIMEOUT`     | 转发请求的超时时间，单位：秒。        |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>


### `[trace]`

```mdx-code-block
<APITable>
```

| 参数                | 默认              | 环境变量            | 描述                                             |
|--------------------|---------------------------------------------------|---------------------------------------------------|---------------------------------------------------|
| `auto_generate_span` | `false` | `CNOSDB_TRACE_AUTO_GENERATE_SPAN` | 是否自动生成root span，当客户端未携带span context时有效。 |
| `max_spans_per_trace` |无 | `CNOSDB_TRACE_MAX_SPANS_PER_TRACE` | trace中span和event总数的软限制。 |
| `batch_report_interval` | `500ms` | `CNOSDB_TRACE_BATCH_REPORT_INTERVAL` | 两个batch report之间的时间间隔。 |
| `batch_report_max_spans` | 无 | `CNOSDB_TRACE_BATCH_REPORT_MAX_SPANS` | batch report中span最大数量的软限制。 |
| `otlp_endpoint` | 无 | `CNOSDB_TRACE_OTLP_ENDPOINT` | OTLP collector的GRPC地址。例如：http://localhost:4317。 |

```mdx-code-block
</APITable>
```


## `meta` 文件描述

### 全局配置

```mdx-code-block
<APITable>
```

| 参数                         | 默认                 | 环境变量                                  | 描述                                           |
| --------------------------- | -------------------- | --------------------------------------- | ---------------------------------------------- |
| id                          | 1                    | CNOSDB_META_GLOBAL_NODE_ID                          | meta节点的id，要求集群内唯一                       |
| host                        | 127.0.0.1            | CNOSDB_META_GLOBAL_RAFT_NODE_HOST                        | 用于和其他节点通信的host                           |
| port                        | 8901                 | CNOSDB_META_GLOBAL_LISTEN_PORT                       | 用于和其他节点通信的port                           |
| data_path                   | /var/lib/cnosdb/meta | CNOSDB_META_GLOBAL_DATA_PATH                   | meta数据的存储路径                                |
| cluster_name                | cluster_xxx          | CNOSDB_META_GLOBAL_CLUSTER_NAME      | 集群名字                                         |
| grpc_enable_gzip            | false                | CNOSDB_META_GLOBAL_GRPC_ENABLE_GZIP            | meta服务的接口数据传输，是否启用压缩                 |
| lmdb_max_map_size           | false                | CNOSDB_META_CLUSTER_LMDB_MAX_MAP_SIZE           | lmdb存储引擎使用空间最大值，存储meta数据和raft相关状态 |
| heartbeat_interval          | 3000ms               | CNOSDB_META_CLUSTER_HEARTBEAT_INTERVAL          | Raft复制算法心跳间隔。                             |
| raft_logs_to_keep           | 10000                | CNOSDB_META_CLUSTER_RAFT_LOGS_TO_KEEP           | Raft触发快照的日志数量。                           |
| install_snapshot_timeout    | 3600000ms            | CNOSDB_META_CLUSTER_INSTALL_SNAPSHOT_TIMEOUT    | Raft节点之间复制快照超时时间。                      |
| send_append_entries_timeout | 5000ms               | CNOSDB_META_CLUSTER_SEND_APPEND_ENTRIES_TIMEOUT | Raft节点间发送日志超时时间。                        |
| usage_schema_cache_size     | 2097152              | CNOSDB_META_SYS_CONFIG_USAGE_SCHEMA_CACHE_SIZE     | usage_schema的最大内存缓存。                       |
| cluster_schema_cache_size   | 2097152              | CNOSDB_META_SYS_CONFIG_CLUSTER_SCHEMA_CACHE_SIZE   | cluster_schema的最大内存缓存。                     |
| system_database_replica     | 1                    | CNOSDB_META_SYS_CONFIG_SYSTEM_DATABASE_REPLICA     | 系统数据库的replica。                              |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| 参数    | 默认              | 环境变量       | 描述                                   |
| ------- | ----------------- | -------------- | -------------------------------------- |
| `level` | `info`            | `CNOSDB_META_LOG_LEVEL` | 日志等级（debug、info、error、warn）。 |
| `path`  | `/var/log/cnosdb` | `CNOSDB_META_LOG_PATH`  | 日志存储目录。                         |

```mdx-code-block
</APITable>
```

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| 参数                       | 默认                   |                        | 描述                                   |
|--------------------------|----------------------------------------|----------------------------------------|----------------------------------------|
| `heartbeat_recheck_interval` | 300 | `CNOSDB_META_HEARTBEAT_HEARTBEAT_RECHECK_INTERVAL` | 多久检查一次CnosDB节点的状态，单位：秒。 |
| `heartbeat_expired_interval` | 300 | `CNOSDB_META_HEARTBEAT_HEARTBEAT_EXPIRED_INTERVAL` | CnosDB节点多久未上报心跳认定异常，单位：秒。 |

```mdx-code-block
</APITable>
```
