---
title: Configuration
order: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

CnosDB Meta Configuration

The configuration adopts TOML syntax.

> TOML Syntax Reference: [https://toml.io](https://toml.io/cn/v1.0.0)

You can use the `cnosdb config` command to create a default configuration file, for example:

```shell
cnosdb config > /tmp/config.toml
```

Use the `cnosdb check server-config <path>` command to check if the configuration file is valid, for example:

```shell
cnosdb check server-config /tmp/config.toml
```

Start the configuration file using the `cnosdb` command:

```
cnosdb --config ./cnosdb.conf
```

## The detailed configuration file description is as follows:

### Configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters               | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled`     | `false`     | Whether to turn off the automatic reporting of telemetry data by CnosDB, mainly to track the usage rates of different versions of CnosDB, which is beneficial for the continuous development of CnosDB.Data is reported every 24 hours, each record includes: instance running time, operating system type, database version, geographical location of the instance (up to provincial or continental level). |
| `raft_logs_to_keep`      | `5000`      | Raft log retention count, and take a snapshot every these times written.                                                                                                                                                                                                                                                                                                                                                                                        |
| `using_raft_replication` | `false`     | Whether to enable the Raft replication algorithm                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `host`                   | `localhost` | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                                                                                                                                           |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters               | Default                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled`     | `false`                    | Whether to turn off the automatic reporting of telemetry data by CnosDB, mainly to track the usage rates of different versions of CnosDB, which is beneficial for the continuous development of CnosDB.Data is reported every 24 hours, each record includes: instance running time, operating system type, database version, geographical location of the instance (up to provincial or continental level). |
| `raft_logs_to_keep`      | `5000`                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `using_raft_replication` | `false`                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `host`                   | `localhost`                | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `license_file`           | `/etc/cnosdb/license.json` | 用于指定 `License` 文件位置。                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

</TabItem>

</Tabs>

## `[deployment]`

| Parameters | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `query_tskv` | Deployment mode, optional: `tskv`, `query`, `query_tskv`, `singleton`.  `tskv`: Deploying only the `tskv` engine requires specifying a Meta service address. `query` : Deploying only the query engine requires specifying a meta address. `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified. `singleton` : Deploying a standalone version without specifying a meta address. |
| `cpu`      | `10`         | Number of CPU cores used by the node to run                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `memory`   | `16`         | Maximum memory used by the node during operation, unit: (G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

### `[query]`

| Parameters                                                       | Default     | Description                                                                                    |
| ---------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| max_server_connections | `10240`     | Maximum number of concurrent connection requests.                              |
| `query_sql_limit`                                                | `16777216`  | Maximum number of bytes per SQL query request, unit: Bytes                     |
| `write_sql_limit`                                                | `167772160` | Maximum number of bytes per Line Protocol to write to the request, unit: Bytes |
| `auth_enabled`                                                   | `false`     | Whether to start checking user permissions, default is false.                  |
| `read_timeout_ms`                                                | `3000`      | `query` visits the timeout of `tskv` in units: `ms`                            |
| `write_timeout_ms`                                               | `3000`      | 向 `tskv` 写入数据时的超时时间，单位：`ms`.                                                   |
| `stream_trigger_cpu`                                             | `1`         | Number of CPUs to prepare streams for computing tasks                                          |
| `stream_executor_cpu`                                            | `2`         | Number of CPUs to perform stream calculation tasks                                             |

### `[storage]`

| Parameters                                             | Default                   | Description                                                                                              |
| ------------------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `path`                                                 | `/etc/cnosdb/cnosdb.conf` | Data storage location                                                                                    |
| `max_summary_size`                                     | `128M`                    | Maximum size of a single Summary log.                                                    |
| `base_file_size`                                       | `16M`                     | Single file data size, default: 16M                                                      |
| `flush_req_channel_cap`                                | `16`                      | Cumulative flush task ceiling.                                                           |
| Maximum cache size, default: 134217728 | `32`                      | 每个 vnode 中打开的文件句柄（用于查询）的最大计数。                                                                            |
| `max_level`                                            | `4`                       | LSM&amp;apos;s maximum number of layers, value range 0-4, default: 4 |
| `compact_trigger_file_num`                             | `4`                       | Number of files to trigger compaction.                                                   |
| `compact_trigger_cold_duration`                        | `1h`                      | Compatibility is triggered when no action is taken during the time period.               |
| `max_compact_size`                                     | `2G`                      | Maximum selected file size for compaction.                                               |
| `max_concurrent_compaction`                            | `4`                       | Maximum number of compaction tasks to be performed simultaneously.                       |
| `strict_write`                                         | `false`                   | Whether to enable strict writing.                                                        |

### `[wal]`

| Parameters                                                                         | Default               | Description                                                                                                                          |
| ---------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`                                                                          | `true`                | Whether to enable WAL.                                                                                               |
| `path`                                                                             | `/var/lib/cnosdb/wal` | WAL storage directory.                                                                                               |
| `wal_req_channel_cap`                                                              | `64`                  | Cumulative write WAL task ceiling.                                                                                   |
| `max_file_size`                                                                    | `1G`                  | The maximum size of a single WAL, default: 1G                                                                        |
| The number of files required to trigger the compaction, default: 4 | `2G`                  | Flash when all WAL sizes reach this value.                                                                           |
| `sync`                                                                             | `false`               | Whether to sync for each writing.                                                                                    |
| `sync_interval`                                                                    | `0`                   | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

### `[cache]`

| Parameters             | Default                                                                                | Description                                                               |
| ---------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `max_buffer_size`      | `128M`                                                                                 | Maximum active cache size.                                |
| `max_immutable_number` | `4`                                                                                    | Maximum number of inactive cache.                         |
| `partition`            | Specify the number of CPU cores required for the instance, default: 10 | number of partitions to memcache cache, default value equals CPU quantity |

### `[log]`

| Parameters    | Default                       | Description                                                    |
| ------------- | ----------------------------- | -------------------------------------------------------------- |
| `level`       | `info`                        | Log level（debug、info、error、warn, default: info |
| `path`        | `/var/log/cnosdb`             | Remote log path                                                |
| `tokio_trace` | `{ addr = "127.0.0.1:6669" }` | Tokio 跟踪，默认处于关闭状态。                                             |

### `[security]`

| Parameters   | Default | Description       |
| ------------ | ------- | ----------------- |
| `tls_config` | None    | TLS Configuration |

### `[security.tls_config]` (optional)

| Parameters    | Default | Description             |
| ------------- | ------- | ----------------------- |
| `certificate` | None    | TLS service certificate |
| `private_key` | None    | TLS service private key |

### `[cluster]`

| Parameters               | Default          | Description                                                  |
| ------------------------ | ---------------- | ------------------------------------------------------------ |
| `name`                   | `cluster_xxx`    | Node name                                                    |
| `meta_service_addr`      | `127.0.0.1:8901` | Remote `meta` Service port                                   |
| `http_listen_port`       | `8902`           | HTTP service listening port                                  |
| `grpc_listen_port`       | `8903`           | GRPC service listening port                                  |
| `flight_rpc_listen_port` | `8904`           | Flight RPC service listening port                            |
| `tcp_listen_port`        | `8905`           | TCP service listening port                                   |
| `vector_listen_port`     | `8906`           | Use to listen for [Vector](https://vector.dev/) written data |

### `[hintedoff]`

| Parameters | Default              | Description                                                                |
| ---------- | -------------------- | -------------------------------------------------------------------------- |
| `enable`   | `true`               | Is the HIntedOff service enabled, default: true            |
| `path`     | `/var/lib/cnosdb/hh` | HintedOff storage directory.                               |
| `threads`  | `3`                  | Number of conjunctions to process the Hinted handoff data. |

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### `[subscription]`

| Parameters    | Default | Description                                                                                      |
| ------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `cache`       | `1024`  | cache size (bit) before sending and forwarding, default: 1028 |
| `concurrency` | `8`     | Number of parallel requests to process forward requests.                         |
| `timeout`     | `300`   | Timeout for forward request, unit: `s`.                          |

</TabItem>

</Tabs>

### `[heartbeat]`

| Parameters                 | Default | Description                                                                                                                                           |
| -------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `report_time_interval_sec` | `30`    | Time interval between reporting heart, disk balance and other information on this node to `meta` service in: seconds. |

### `[node_basic]`

| Parameters         | Default | Description                                                                                          |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `node_id`          | `1001`  | Interval for checking the heartbeat status of a node                                                 |
| `cold_data_server` | `false` | Whether to stop creating Vnode on this node.                                         |
| `store_metrics`    | `true`  | Whether to track the usage of this node and store it in the `usage_schema` database. |

### `[trace]`

| Parameters           | Default | Description                                                                                                                          |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `auto_generate_span` | `false` | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

### `[trace.log]` (optional)

| Parameters | Default           | Description         |
| ---------- | ----------------- | ------------------- |
| `path`     | `/var/log/cnosdb` | trace log file path |

### `[trace.jaeger]` (optional)

| Parameters               | Default                                    | Description                                                                                                                                                                   |
| ------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jaeger_agent_endpoint`  | `[trace]` fFull link tracing configuration | the Jaeger agent endpoint。eg: http://localhost:14268/api/traces                                                               |
| `max_concurrent_exports` | 2                                          | The parallelism of the reporter on trace.Default value is 2                                                                                                   |
| `max_queue_size`         | 4096                                       | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096If the queue is full, it will drop span. |

## `meta` file description

### Configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters                     | Default                | Description                                                                     |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------- |
| id                             | `1`                    | `id` : id of Meta node, the value must be unique in the cluster |
| host                           | `127.0.0.1`            | `host` for communication with other nodes                                       |
| port                           | `8901`                 | `port` for communicating with other nodes                                       |
| data_path | `/var/lib/cnosdb/meta` | `journal_path`: journal storage path of Meta node               |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters                                                  | Default                | Description                                                                     |
| ----------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| id                                                          | `1`                    | `id` : id of Meta node, the value must be unique in the cluster |
| host                                                        | `127.0.0.1`            | `host` for communication with other nodes                                       |
| port                                                        | `8901`                 | `port` for communicating with other nodes                                       |
| data_path                              | `/var/lib/cnosdb/meta` | `journal_path`: journal storage path of Meta node               |
| meta_service_port | `0`                    |                                                                                 |

</TabItem>

</Tabs>

### `[log]`

| Parameters | Default           | Description                                                    |
| ---------- | ----------------- | -------------------------------------------------------------- |
| `level`    | `info`            | Log level（debug、info、error、warn, default: info |
| `path`     | `/var/log/cnosdb` | Remote log path                                                |

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
