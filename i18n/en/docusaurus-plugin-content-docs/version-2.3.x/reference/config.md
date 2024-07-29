---
sidebar_position: 4
---

# Configuration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

本章节介绍设置 CnosDB 配置的方法。

The configuration adopts TOML syntax.

> TOML Syntax Reference: [https://toml.io](https://toml.io/cn/v1.0.0)

Use the `cnosdb config` command to create default configuration files, For example:

```shell
cnosdb run config > ./cnosdb.conf
```

Use the `cnosdb check server-config <path>` command to check if the configuration file is legal, for example:

```shell
cnosdb check server-config ./cnosdb.conf
```

Use the `cnosdb` command to specify the configuration file to start:

```
cnosdb --config ./cnosdb.conf
```

## Description

### Global

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters           | Default     | Description                                                                                                                                                                                                                                                                                                             |
| -------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled` | `false`     | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。Data is reported every 24 hours, each record includes: instance running time, operating system type, database version, geographical location of the instance (up to provincial or continental level). |
| `host`               | `localhost` | Used to communicate with other nodes.                                                                                                                                                                                                                                                                   |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters           | Default                    | Description                                                                                                                                                                                                                                                                                                             |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled` | `false`                    | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。Data is reported every 24 hours, each record includes: instance running time, operating system type, database version, geographical location of the instance (up to provincial or continental level). |
| `host`               | `localhost`                | Used to communicate with other nodes.                                                                                                                                                                                                                                                                   |
| `license_file`       | `/etc/cnosdb/license.json` | 用于指定 `License` 文件位置。                                                                                                                                                                                                                                                                                                    |

</TabItem>

</Tabs>

### `[deployment]`

| Parameters | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `query_tskv` | Deployment mode, Optional:  `tskv`, `query`, `query_tskv`, `singleton`.  `tskv`: Deploying only tskv engine requires specifying a meta address. `query`: Only deploy the `query` engine, a meta address needs to be specified. `query_tskv`: `query` and `tskv` engines are both deployed, a meta address needs to be specified. `singleton`: Deploying a standalone version without specifying a meta address. |
| `cpu`      | `10`         | Number of CPU cores used by the node to run                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `memory`   | `16`         | 节点运行所使用的最大内存，单位：（G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### `[query]`

| Parameters               | Default     | Description                                                                                    |
| ------------------------ | ----------- | ---------------------------------------------------------------------------------------------- |
| `max_server_connections` | `10240`     | Maximum number of concurrent connection requests.                              |
| `query_sql_limit`        | `16777216`  | Maximum number of bytes per SQL query request, unit: Bytes                     |
| `write_sql_limit`        | `167772160` | Maximum number of bytes per Line Protocol to write to the request, unit: Bytes |
| `auth_enabled`           | `false`     | Whether to start checking user permissions.                                    |
| `read_timeout_ms`        | `3000`      | `query` visits the timeout of `tskv` in units: `ms`                            |
| `write_timeout_ms`       | `3000`      | 向 `tskv` 写入数据时的超时时间，单位：`ms`.                                                   |
| `stream_trigger_cpu`     | `1`         | Number of CPUs to prepare stream calculation tasks                                             |
| `stream_executor_cpu`    | `2`         | Number of CPUs to execute stream calculation tasks                                             |

### `[storage]`

| Parameters                      | Default                   | Description                                                                                               |
| ------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | Data storage directory.                                                                   |
| `max_summary_size`              | `128M`                    | Maximum size of a single Summary log.                                                     |
| `base_file_size`                | `16M`                     | Single file data size.                                                                    |
| `flush_req_channel_cap`         | `16`                      | Cumulative flush task ceiling.                                                            |
| `max_cached_readers`            | `32`                      | The maximum count of file handles (for querying) opened in each vnode. |
| `max_level`                     | `4`                       | The maximum number of layers of the LSM, in the range 0-4.                                |
| `compact_trigger_file_num`      | `4`                       | Number of files to trigger compaction.                                                    |
| `compact_trigger_cold_duration` | `1h`                      | Compaction is triggered when no action is taken during the time period.                   |
| `max_compact_size`              | `2G`                      | Maximum selected file size for compaction.                                                |
| `max_concurrent_compaction`     | `4`                       | Maximum number of compaction tasks to be performed simultaneously.                        |
| `strict_write`                  | `false`                   | Whether to enable strict writing.                                                         |
| `copyinto_trigger_flush_size`   | `128M`                    | `COPY INTO` Export triggers the memory size of the disk.                                  |

### `[wal]`

| Parameters                      | Default               | Description                                                |
| ------------------------------- | --------------------- | ---------------------------------------------------------- |
| `enabled`                       | `true`                | Whether to enable WAL.                     |
| `path`                          | `/var/lib/cnosdb/wal` | WAL storage directory.                     |
| `wal_req_channel_cap`           | `64`                  | Cumulative write WAL task ceiling.         |
| `max_file_size`                 | `1G`                  | Maximum size of a single WAL.              |
| `flush_trigger_total_file_size` | `2G`                  | Flash when all WAL sizes reach this value. |
| `sync`                          | `false`               | Whether to sync for each writing.          |
| `sync_interval`                 | `0`                   | 同步 WAL 的时间间隔，即不主动同步，单位：h、m、s、ms、us、ns                      |

### `[cache]`

| Parameters             | Default    | Description                                |
| ---------------------- | ---------- | ------------------------------------------ |
| `max_buffer_size`      | `128M`     | Maximum active cache size. |
| `max_immutable_number` | `4`        | 最大的非活跃缓存数量。                                |
| `partition`            | 等于系统`CPU`数 | memcache 缓存的分区数量                           |

### `[log]`

| Parameters    | Default                       | Description                                                              |
| ------------- | ----------------------------- | ------------------------------------------------------------------------ |
| `level`       | `info`                        | Log Level (debug, info, error, warn). |
| `path`        | `/var/log/cnosdb`             | Log storage directory.                                   |
| `tokio_trace` | `{ addr = "127.0.0.1:6669" }` | Tokio 跟踪，默认处于关闭状态。                                                       |

### `[security]`

| Parameters   | Default | Description |
| ------------ | ------- | ----------- |
| `tls_config` | None    | TLS 配置      |

### `[security.tls_config]`（可选）

| Parameters    | Default | Description             |
| ------------- | ------- | ----------------------- |
| `certificate` | None    | TLS service certificate |
| `private_key` | None    | TLS service private key |

### `[cluster]`

| Parameters               | Default          | Description                                        |
| ------------------------ | ---------------- | -------------------------------------------------- |
| `name`                   | `cluster_xxx`    | 节点名称。                                              |
| `meta_service_addr`      | `127.0.0.1:8901` | 远程 `meta` 服务地址。                                    |
| `http_listen_port`       | `8902`           | HTTP service listening port.       |
| `grpc_listen_port`       | `8903`           | GRPC service listening port.       |
| `flight_rpc_listen_port` | `8904`           | Flight RPC service listening port. |
| `tcp_listen_port`        | `8905`           | TCP service listening port.        |
| `vector_listen_port`     | `8906`           | 用于监听 [Vector](https://vector.dev/) 写入的数据。          |

### `[hintedoff]`

| Parameters | Default              | Description             |
| ---------- | -------------------- | ----------------------- |
| `enable`   | `true`               | 是否开启 HIntedOff 服务。      |
| `path`     | `/var/lib/cnosdb/hh` | HintedOff 存储目录。         |
| `threads`  | `3`                  | 处理hinted handoff数据的并发数。 |

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### `[subscription]`

| Parameters    | Default | Description                                                                 |
| ------------- | ------- | --------------------------------------------------------------------------- |
| `cache`       | `1024`  | 发送转发前写入cache的大小，单位：bits                                                     |
| `concurrency` | `8`     | Number of concurrent requests to process forward requests.  |
| `timeout`     | `1000`  | Timeout for forward request, unit: seconds. |

</TabItem>

</Tabs>

### `[heartbeat]`

| Parameters                 | Default | Description                           |
| -------------------------- | ------- | ------------------------------------- |
| `report_time_interval_sec` | `30`    | 此节点上报心跳、磁盘余量等信息到 `meta` 服务的时间间隔，单位：秒。 |

### `[node_basic]`

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

| Parameters         | Default | Description                          |
| ------------------ | ------- | ------------------------------------ |
| `node_id`          | `1001`  | 节点 ID。                               |
| `cold_data_server` | `false` | 是否停止在此节点上创建 Vnode。                   |
| `store_metrics`    | `true`  | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。 |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters         | Default   | Description                          |
| ------------------ | --------- | ------------------------------------ |
| `node_id`          | `1001`    | 节点 ID。                               |
| `cold_data_server` | `false`   | 是否停止在此节点上创建 Vnode。                   |
| `store_metrics`    | `true`    | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。 |
| `location`         | `default` | 定义实例部署位置。                            |

</TabItem>

</Tabs>

### `[trace]`

| Parameters           | Default | Description                            |
| -------------------- | ------- | -------------------------------------- |
| `auto_generate_span` | `false` | 是否自动生成root span，当客户端未携带span context时有效 |

### `[trace.log]` (可选)

| Parameters | Default | Description  |
| ---------- | ------- | ------------ |
| `path`     | None    | trace 日志文件路径 |

### `[trace.jaeger]` (可选)

| Parameters               | Default | Description                                                                                    |
| ------------------------ | ------- | ---------------------------------------------------------------------------------------------- |
| `jaeger_agent_endpoint`  | None    | the Jaeger agent endpoint。例如：http://localhost:14268/api/traces |
| `max_concurrent_exports` | 2       | trace 上报器的并行度。默认值为 2                                                                           |
| `max_queue_size`         | 4096    | span 缓冲区最大队列大小。如果队列已满，它会丢弃 span。                                                               |

## `meta` file description

### Global

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters                                                    | Default                         | Description                                 |
| ------------------------------------------------------------- | ------------------------------- | ------------------------------------------- |
| id                                                            | `1`                             | `meta` node's `id`, requires unique cluster |
| host                                                          | `127.0.0.1`                     | `host` for communication with other nodes   |
| port                                                          | `8901`                          | `port` for communicating with other nodes   |
| snapshot_path                            | `/var/lib/cnosdb/meta/snapshot` |                                             |
| journal_path                             | `/var/lib/cnosdb/meta/journal`  |                                             |
| snapshot_per_events | `500`                           |                                             |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters                     | Default                         | Description                                 |
| ------------------------------ | ------------------------------- | ------------------------------------------- |
| `id`                           | `1`                             | `meta` node's `id`, requires unique cluster |
| `host`                         | `127.0.0.1`                     | `host` for communication with other nodes   |
| `port`                         | `8901`                          | `port` for communicating with other nodes   |
| `license_file`                 | `/etc/cnosdb/license.json`      | 用于指定 `License` 文件位置。                        |
| `snapshot_path`                | `/var/lib/cnosdb/meta/snapshot` |                                             |
| `journal_path`                 | `/var/lib/cnosdb/meta/journal`  |                                             |
| `snapshot_per_events`          | `500`                           |                                             |
| `auto_migrate_vnodes_duration` | `0`                             |                                             |

</TabItem>

</Tabs>

### `[log]`

| Parameters | Default           | Description                                                              |
| ---------- | ----------------- | ------------------------------------------------------------------------ |
| `level`    | `info`            | Log Level (debug, info, error, warn). |
| `path`     | `/var/log/cnosdb` | Log storage directory.                                   |

### `[meta_init]`

| Parameters         | Default                     | Description                           |
| ------------------ | --------------------------- | ------------------------------------- |
| `cluster_name`     | `cluster_xxx`               | Cluster Name                          |
| `admin_user`       | `root`                      | User name of the system administrator |
| `system_tenant`    | `cnosdb`                    | Name of the default tenant            |
| `default_database` | `["public","usage_schema"]` | Default database created              |

### `[heartbeat]`

| Parameters                   | Default | Description                                                                                                         |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `heartbeat_recheck_interval` | 300     | How often to check the status of CnosDB nodes, in seconds.                                          |
| `heartbeat_expired_interval` | 300     | How long has the CnosDB node not reported an abnormal heartbeat determination, measured in seconds. |
