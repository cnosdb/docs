---
sidebar_position: 4
---

# Configuration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

本章节介绍配置 CnosDB 配置的方法。

The configuration adopts TOML syntax.

> TOML Syntax Reference: [https://toml.io](https://toml.io/cn/v1.0.0)

Use the `cnosdb config` command to create default configuration files, For example:

```shell
cnosdb run config > ./config.toml
```

Use the `cnosdb check server-config <path>` command to check if the configuration file is legal, for example:

```shell
cnosdb check server-config ./config.toml
```

Use the `cnosdb` command to specify the configuration file to start:

> If not specified by the user, the program looks for the configuration first in `/etc/cnosdb/cnosdb.conf`, `$HOME/cnosdb/cnosdb.conf`, and if it does not find it, the default configuration is used.

```
cnosdb --config ./cnosdb.conf
```

Configuration in CnosDB is prioritized as follows: specified parameters > environment variables > specified configuration files > `/etc/cnosdb/cnosdb.conf` > `$HOME/cnosdb/cnosdb.conf` > default configuration

## Environment Variables

All settings in the configuration file can be set or overridden using environment variables.If both exist in the file and environment variables, the environment variable will take precedence, and the value in the configuration file will be ignored.

To make these configuration settings available for CnosDB to use via environment variables, they must be in the following format:

```shell
CNOSDB_REPORTING_DISABLED=false
```

## Description

This section introduces the configuration method and usage of each configuration.

### Global

```mdx-code-block
<APITable>
```

| Parameters      | Default       | Environment Variables  | Description                                                                                          |
| --------------- | ------------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `node_id`       | `1001`        | `CNOSDB_NODE_ID`       | Node ID                                                                                              |
| `host`          | `localhost`   | `CNOSDB_HOST`          | Used to communicate with other nodes.                                                |
| `cluster_name`  | `cluster_xxx` | `CNOSDB_CLUSTER_NAME`  | Cluster Name                                                                                         |
| `store_metrics` | `true`        | `CNOSDB_STORE_METRICS` | Whether to track the usage of this node and store it in the `usage_schema` database. |

```mdx-code-block
</APITable>
```

### `[deployment]`

```mdx-code-block
<APITable>
```

| Parameters | Default                    | Environment Variables      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | -------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `query_tskv`               | `CNOSDB_DEPLOYMENT_MODE`   | Deployment mode, Optional:  `tskv`, `query`, `query_tskv`, `singleton`.  `tskv`: Deploying only tskv engine requires specifying a meta address. `query`: Only deploy the `query` engine, a meta address needs to be specified. `query_tskv`: `query` and `tskv` engines are both deployed, a meta address needs to be specified. `singleton`: Deploying a standalone version without specifying a meta address. |
| `cpu`      | Equivalent Node Core Count | `CNOSDB_DEPLOYMENT_CPU`    | Number of CPU cores used by the node to run                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `memory`   | 等同节点CPU数                   | `CNOSDB_DEPLOYMENT_MEMORY` | Maximum memory used by the node during operation, unit: (G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

```mdx-code-block
</APITable>
```

### `[meta]`

```mdx-code-block
<APITable>
```

| Parameters             | Default              | Environment Variables              | Description                                                                                                                                           |
| ---------------------- | -------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service_addr`         | `["127.0.0.1:8901"]` | `CNOSDB_META_SERVICE_ADDR`         | Remote `meta` Service port                                                                                                                            |
| `report_time_interval` | `30s`                | `CNOSDB_META_REPORT_TIME_INTERVAL` | Time interval between reporting heart, disk balance and other information on this node to `meta` service in: seconds. |

```mdx-code-block
</APITable>
```

### `[query]`

```mdx-code-block
<APITable>
```

| Parameters               | Default     | Environment Variables                 | Description                                                                                                                                        |
| ------------------------ | ----------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `max_server_connections` | `10240`     | `CNOSDB_QUERY_MAX_SERVER_CONNECTIONS` | Maximum number of concurrent connection requests.                                                                                  |
| `query_sql_limit`        | `16777216`  | `CNOSDB_QUERY_QUERY_SQL_LIMIT`        | Maximum number of bytes per SQL query request, unit: Bytes                                                                         |
| `write_sql_limit`        | `167772160` | `CNOSDB_QUERY_WRITE_SQL_LIMIT`        | Maximum number of bytes per Line Protocol to write to the request, unit: Bytes                                                     |
| `auth_enabled`           | `false`     | `CNOSDB_QUERY_AUTH_ENABLED`           | Whether to start checking user permissions.                                                                                        |
| `read_timeout`           | `3000ms`    | `CNOSDB_QUERY_READ_TIMEOUT`           | `query` visits the timeout of `tskv` in units: `ms`                                                                                |
| `write_timeout`          | `3000ms`    | `CNOSDB_QUERY_WRITE_TIMEOUT`          | Timeout for writing to `tskv` in unit: `ms`                                                                                        |
| `stream_trigger_cpu`     | `1`         | `CNOSDB_QUERY_STREAM_TRIGGER_CPU`     | Number of CPUs to prepare stream calculation tasks                                                                                                 |
| `stream_executor_cpu`    | `2`         | `CNOSDB_QUERY_STREAM_EXECUTOR_CPU`    | Number of CPUs to execute stream calculation tasks                                                                                                 |
| `sql_record_timeout`     | `10s`       | `CNOSDB_QUERY_SQL_RECORD_TIMEOUT`     | The lowest execution time of the sql is recorded in the cluster_schema.sql_history table |

```mdx-code-block
</APITable>
```

### `[storage]`

```mdx-code-block
<APITable>
```

| Parameters                      | Default                   | Environment Variables                          | Description                                                                            |
| ------------------------------- | ------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | `CNOSDB_STORAGE_PATH`                          | Data storage directory.                                                |
| `max_summary_size`              | `128M`                    | `CNOSDB_STORAGE_MAX_SUMMARY_SIZE`              | Maximum size of a single Summary log.                                  |
| `base_file_size`                | `16M`                     | `CNOSDB_STORAGE_BASE_FILE_SIZE`                | Single file data size.                                                 |
| `flush_req_channel_cap`         | `16`                      | `CNOSDB_STORAGE_FLUSH_REQ_CHANNEL_CAP`         | 累积的 flush 任务上限。                                                                        |
| `max_cache_readers`             | `32`                      | `CNOSDB_STORAGE_MAX_CACHE_READERS`             | 每个 vnode 中打开的文件句柄（用于查询）的最大计数。                                                          |
| `max_level`                     | `4`                       | `CNOSDB_STORAGE_MAX_LEVEL`                     | The maximum number of layers of the LSM, in the range 0-4.             |
| `compact_trigger_file_num`      | `4`                       | `CNOSDB_STORAGE_COMPACT_TRIGGER_FILE_NUM`      | 触发 compaction 所需的文件数量。                                                                 |
| `compact_trigger_cold_duration` | `1h`                      | `CNOSDB_STORAGE_COMPACT_TRIGGER_COLD_DURATION` | 时间段内未操作，则触发 compaction。                                                                |
| `max_compact_size`              | `2G`                      | `CNOSDB_STORAGE_MAX_COMPACT_SIZE`              | compaction 最多选择的文件大小。                                                                  |
| `max_concurrent_compaction`     | `4`                       | `CNOSDB_STORAGE_MAX_CONCURRENT_COMPACTION`     | 最多同时进行的 compaction 任务数量。                                                               |
| `strict_write`                  | `false`                   | `CNOSDB_STORAGE_STRICT_WRITE`                  | 是否开启严格写入。                                                                              |
| `reserve_space`                 | `0`                       | `CNOSDB_STORAGE_RESERVE_SPACE`                 | 系统的保留空间大小。                                                                             |
| `copyinto_trigger_flush_size`   | `128M`                    | `CNOSDB_STORAGE_COPYINTO_TRIGGER_FLUSH_SIZE`   | `COPY INTO`导出时触发落盘的内存大小 。支持版本：>2.3.4.3 |
| `max_datablock_size`            | `100KB`                   | `CNOSDB_STORAGE_MAX_DATABLOCK_SIZE`            | compaction时datablock的最大大小。                                                             |

```mdx-code-block
</APITable>
```

### `[wal]`

```mdx-code-block
<APITable>
```

| Parameters                      | Default               | Environment Variables                      | Description                                       |
| ------------------------------- | --------------------- | ------------------------------------------ | ------------------------------------------------- |
| `enabled`                       | `true`                | `CNOSDB_WAL_ENABLED`                       | 是否启用 WAL。                                         |
| `path`                          | `/var/lib/cnosdb/wal` | `CNOSDB_WAL_PATH`                          | WAL 存储目录。                                         |
| `wal_req_channel_cap`           | `64`                  | `CNOSDB_WAL_WAL_REQ_CHANNEL_CAP`           | 累积的写 WAL 任务上限。                                    |
| `max_file_size`                 | `1G`                  | `CNOSDB_WAL_MAX_FILE_SIZE`                 | 单个 WAL 的最大大小。                                     |
| `flush_trigger_total_file_size` | `2G`                  | `CNOSDB_WAL_FLUSH_TRIGGER_TOTAL_FILE_SIZE` | 所有 WAL 的大小达到该数值时，触发 flush。                        |
| `sync`                          | `false`               | `CNOSDB_WAL_SYNC`                          | 是否为每次写入进行同步。                                      |
| `sync_interval`                 | `0`                   | `CNOSDB_WAL_SYNC_INTERVAL`                 | 同步 WAL 的时间间隔，即不主动同步，单位：`h`、`m`、`s`、`ms`、`us`、`ns` |

```mdx-code-block
</APITable>
```

### `[cache]`

```mdx-code-block
<APITable>
```

| Parameters        | Default | Environment Variables          | Description                   |
| ----------------- | ------- | ------------------------------ | ----------------------------- |
| `max_buffer_size` | `128M`  | `CNOSDB_CACHE_MAX_BUFFER_SIZE` | 最大的活跃缓存大小。                    |
| `partition`       | 等同CPU数量 | `CNOSDB_CACHE_PARTITION`       | memcache 缓存的分区数量，默认值等于 CPU 数量 |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| Parameters       | Default           | Environment Variables       | Description                              |
| ---------------- | ----------------- | --------------------------- | ---------------------------------------- |
| `level`          | `info`            | `CNOSDB_LOG_LEVEL`          | 日志等级（debug、info、error、warn）。             |
| `path`           | `/var/log/cnosdb` | `CNOSDB_LOG_PATH`           | 日志存储目录。                                  |
| `max_file_count` | 无限制               | `CNOSDB_LOG_MAX_FILE_COUNT` | 最多保留日志文件数。                               |
| `file_rotation`  | `daily`           | `CNOSDB_LOG_FILE_ROTATION`  | 日志文件切分时间间隔（daily、hourly、minutely、never）。 |

```mdx-code-block
</APITable>
```

### `[security.tls_config]`

```mdx-code-block
<APITable>
```

| Parameters    | Default | Environment Variables                    | Description |
| ------------- | ------- | ---------------------------------------- | ----------- |
| `certificate` | 无       | `CNOSDB_SECURITY_TLS_CONFIG_CERTIFICATE` | TLS 服务的证书   |
| `private_key` | 无       | `CNOSDB_SECURITY_TLS_CONFIG_PRIVATE_KEY` | TLS 服务的私钥   |

```mdx-code-block
</APITable>
```

### `[service]`

```mdx-code-block
<APITable>
```

| Parameters               | Default | Environment Variables                   | Description                                                                                                                 |
| ------------------------ | ------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `http_listen_port`       | `8902`  | `CNOSDB_SERVICE_HTTP_LISTEN_PORT`       | HTTP 服务监听端口。                                                                                                                |
| `grpc_listen_port`       | `8903`  | `CNOSDB_SERVICE_GRPC_LISTEN_PORT`       | GRPC 服务监听端口。                                                                                                                |
| `grpc_enable_gzip`       | `false` | `CNOSDB_SERVICE_GRPC_ENABLE_GZIP`       | meta服务的接口数据传输，是否启用压缩                                                                                                        |
| `flight_rpc_listen_port` | `8904`  | `CNOSDB_SERVICE_FLIGHT_RPC_LISTEN_PORT` | Flight RPC 服务监听端口。                                                                                                          |
| `tcp_listen_port`        | `8905`  | `CNOSDB_SERVICE_TCP_LISTEN_PORT`        | TCP 服务监听端口。                                                                                                                 |
| `vector_listen_port`     | `8906`  | `CNOSDB_SERVICE_VECTOR_LISTEN_PORT`     | 用于监听 [Vector](https://vector.dev/) 写入的数据                                                                                    |
| `enable_report`          | `true`  | `CNOSDB_SERVICE_ENABLE_REPORT`          | 是否开启 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |

```mdx-code-block
</APITable>
```

### `[cluster]`

```mdx-code-block
<APITable>
```

| Parameters                    | Default       | Environment Variables                        | Description                      |
| ----------------------------- | ------------- | -------------------------------------------- | -------------------------------- |
| `raft_logs_to_keep`           | `5000`        | `CNOSDB_CLUSTER_RAFT_LOGS_TO_KEEP`           | Raft日志保留条数，且每隔这些次数写入做一次snapshot。 |
| `snapshot_holding_time`       | `3600s`       | `CNOSDB_CLUSTER_SNAPSHOT_HOLDING_TIME`       | Raft快照保留时间。                      |
| `trigger_snapshot_interval`   | `600s`        | `CNOSDB_CLUSTER_TRIGGER_SNAPSHOT_INTERVAL`   | Raft触发快照时间间隔。                    |
| `lmdb_max_map_size`           | `1024000000B` | `CNOSDB_CLUSTER_LMDB_MAX_MAP_SIZE`           | 用于配置存储Raft状态数据大小。                |
| `heartbeat_interval`          | `3000ms`      | `CNOSDB_CLUSTER_HEARTBEAT_INTERVAL`          | Raft复制算法心跳间隔。                    |
| `send_append_entries_timeout` | `5000ms`      | `CNOSDB_CLUSTER_SEND_APPEND_ENTRIES_TIMEOUT` | Raft节点间发送日志超时时间。                 |
| `install_snapshot_timeout`    | `3600000ms`   | `CNOSDB_CLUSTER_INSTALL_SNAPSHOT_TIMEOUT`    | Raft节点之间复制快照超时时间。                |

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

| Parameters    | Default | Environment Variables | Description     |
| ------------- | ------- | --------------------- | --------------- |
| `cache`       | `1024`  | `CNOSDB_CACHE`        | 处理转发请求的通道大小。    |
| `concurrency` | `8`     | `CNOSDB_CONCURRENCY`  | 处理转发请求的并发数。     |
| `timeout`     | `1000`  | `CNOSDB_TIMEOUT`      | 转发请求的超时时间，单位：秒。 |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>

### `[trace]`

```mdx-code-block
<APITable>
```

| Parameters               | Default | Environment Variables                 | Description                                                                     |
| ------------------------ | ------- | ------------------------------------- | ------------------------------------------------------------------------------- |
| `auto_generate_span`     | `false` | `CNOSDB_TRACE_AUTO_GENERATE_SPAN`     | 是否自动生成root span，当客户端未携带span context时有效。                                         |
| `max_spans_per_trace`    | 无       | `CNOSDB_TRACE_MAX_SPANS_PER_TRACE`    | trace中span和event总数的软限制。                                                         |
| `batch_report_interval`  | `500ms` | `CNOSDB_TRACE_BATCH_REPORT_INTERVAL`  | 两个batch report之间的时间间隔。                                                          |
| `batch_report_max_spans` | 无       | `CNOSDB_TRACE_BATCH_REPORT_MAX_SPANS` | batch report中span最大数量的软限制。                                                      |
| `otlp_endpoint`          | 无       | `CNOSDB_TRACE_OTLP_ENDPOINT`          | OTLP collector的GRPC地址。例如：http://localhost:4317。 |

```mdx-code-block
</APITable>
```

## `meta` 文件描述

### Global

```mdx-code-block
<APITable>
```

| Parameters                                                 | Default                | Environment Variables                     | Description            |
| ---------------------------------------------------------- | ---------------------- | ----------------------------------------- | ---------------------- |
| id                                                         | `1`                    | `CNOSDB_META_ID`                          | `meta`节点的`id`，要求集群内唯一  |
| host                                                       | `127.0.0.1`            | `CNOSDB_META_HOST`                        | 用于和其他节点通信的 `host`      |
| port                                                       | `8901`                 | `CNOSDB_META_PORT`                        | 用于和其他节点通信的 `port`      |
| data_path                             | `/var/lib/cnosdb/meta` | `CNOSDB_META_DATA_PATH`                   | `meta`数据的存储路径          |
| grpc_enable_gzip | `false`                | `CNOSDB_META_GRPC_ENABLE_GZIP`            | `meta`服务的接口数据传输，是否启用压缩 |
| `raft_logs_to_keep`                                        | `10000`                | `CNOSDB_META_RAFT_LOGS_TO_KEEP`           | Raft触发快照的日志数量。         |
| `lmdb_max_map_size`                                        | `1024000000B`          | `CNOSDB_META_LMDB_MAX_MAP_SIZE`           | 用于配置存储Raft状态数据大小。      |
| `heartbeat_interval`                                       | `3000ms`               | `CNOSDB_META_HEARTBEAT_INTERVAL`          | Raft复制算法心跳间隔。          |
| `send_append_entries_timeout`                              | `5000ms`               | `CNOSDB_META_SEND_APPEND_ENTRIES_TIMEOUT` | Raft节点间发送日志超时时间。       |
| `install_snapshot_timeout`                                 | `3600000ms`            | `CNOSDB_META_INSTALL_SNAPSHOT_TIMEOUT`    | Raft节点之间复制快照超时时间。      |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| Parameters       | Default           | Environment Variables            | Description                              |
| ---------------- | ----------------- | -------------------------------- | ---------------------------------------- |
| `level`          | `info`            | `CNOSDB_META_LOG_LEVEL`          | 日志等级（debug、info、error、warn）。             |
| `path`           | `/var/log/cnosdb` | `CNOSDB_META_LOG_PATH`           | 日志存储目录。                                  |
| `max_file_count` | 无限制               | `CNOSDB_META_LOG_MAX_FILE_COUNT` | 最多保留日志文件数。                               |
| `file_rotation`  | `daily`           | `CNOSDB_META_LOG_FILE_ROTATION`  | 日志文件切分时间间隔（daily、hourly、minutely、never）。 |

```mdx-code-block
</APITable>
```

### `[meta_init]`

```mdx-code-block
<APITable>
```

| Parameters         | Default                     | Environment Variables                    | Description  |
| ------------------ | --------------------------- | ---------------------------------------- | ------------ |
| `cluster_name`     | `cluster_xxx`               | `CNOSDB_META_META_INIT_CLUSTER_NAME`     | Cluster Name |
| `admin_user`       | `root`                      | `CNOSDB_META_META_INIT_ADMIN_USER`       | 系统管理员用户名     |
| `system_tenant`    | `cnosdb`                    | `CNOSDB_META_META_INIT_SYSTEM_TENANT`    | 系统默认租户名字     |
| `default_database` | `["public","usage_schema"]` | `CNOSDB_META_META_INIT_DEFAULT_DATABASE` | 默认创建的数据库     |

```mdx-code-block
</APITable>
```

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| Parameters                   | Default |                                                    | Description               |
| ---------------------------- | ------- | -------------------------------------------------- | ------------------------- |
| `heartbeat_recheck_interval` | 300     | `CNOSDB_META_HEARTBEAT_HEARTBEAT_RECHECK_INTERVAL` | 多久检查一次CnosDB节点的状态，单位：秒。   |
| `heartbeat_expired_interval` | 300     | `CNOSDB_META_HEARTBEAT_HEARTBEAT_EXPIRED_INTERVAL` | CnosDB节点多久未上报心跳认定异常，单位：秒。 |

```mdx-code-block
</APITable>
```
