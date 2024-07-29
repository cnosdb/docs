---
sidebar_position: 4
---

# Configuration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

This section describes how to configure the CnosDB configuration.

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
| `license_file`           | `/etc/cnosdb/license.json` | Used to specify the location of the `License` file.                                                                                                                                                                                                                                                                                                                                                                                                             |

</TabItem>

</Tabs>

## `[deployment]`

| Parameters | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `query_tskv` | Deployment mode, Optional:  `tskv`, `query`, `query_tskv`, `singleton`.  `tskv`: Deploying only tskv engine requires specifying a meta address. `query`: Only deploy the `query` engine, a meta address needs to be specified. `query_tskv`: `query` and `tskv` engines are both deployed, a meta address needs to be specified. `singleton`: Deploying a standalone version without specifying a meta address. |
| `cpu`      | `10`         | Number of CPU cores used by the node to run                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `memory`   | `16`         | Maximum memory used by the node during operation, unit: (G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### `[query]`

| Parameters               | Default     | Description                                                                                    |
| ------------------------ | ----------- | ---------------------------------------------------------------------------------------------- |
| `max_server_connections` | `10240`     | Maximum number of concurrent connection requests.                              |
| `query_sql_limit`        | `16777216`  | Maximum number of bytes per SQL query request, unit: Bytes                     |
| `write_sql_limit`        | `167772160` | Maximum number of bytes per Line Protocol to write to the request, unit: Bytes |
| `auth_enabled`           | `false`     | Whether to start checking user permissions.                                    |
| `read_timeout_ms`        | `3000`      | `query` visits the timeout of `tskv` in units: `ms`                            |
| `write_timeout_ms`       | `3000`      | Timeout for writing to `tskv` in unit: `ms`.                   |
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

### `[wal]`

| Parameters                      | Default               | Description                                                                                                                                                                            |
| ------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`                       | `true`                | Whether to enable WAL.                                                                                                                                                 |
| `path`                          | `/var/lib/cnosdb/wal` | WAL storage directory.                                                                                                                                                 |
| `wal_req_channel_cap`           | `64`                  | Cumulative write WAL task ceiling.                                                                                                                                     |
| `max_file_size`                 | `1G`                  | Maximum size of a single WAL.                                                                                                                                          |
| `flush_trigger_total_file_size` | `2G`                  | Flash when all WAL sizes reach this value.                                                                                                                             |
| `sync`                          | `false`               | Whether to sync for each writing.                                                                                                                                      |
| `sync_interval`                 | `0`                   | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing, Unit: `h`、`m`、`s`、`ms`、`us`、`ns` |

### `[cache]`

| Parameters             | Default              | Description                                                               |
| ---------------------- | -------------------- | ------------------------------------------------------------------------- |
| `max_buffer_size`      | `128M`               | Maximum active cache size.                                |
| `max_immutable_number` | `4`                  | Maximum number of inactive cache.                         |
| `partition`            | Equivalent nodes CPU | Number of partitions to memcache cache, default value equals CPU quantity |

### `[log]`

| Parameters    | Default                       | Description                                                              |
| ------------- | ----------------------------- | ------------------------------------------------------------------------ |
| `level`       | `info`                        | Log Level (debug, info, error, warn). |
| `path`        | `/var/log/cnosdb`             | Log storage directory.                                   |
| `tokio_trace` | `{ addr = "127.0.0.1:6669" }` | Tokio tracking is off by default.                        |

### `[security]`

| Parameters   | Default | Description       |
| ------------ | ------- | ----------------- |
| `tls_config` | None    | TLS Configuration |

### `[security.tls_config]`(optional)

| Parameters    | Default | Description             |
| ------------- | ------- | ----------------------- |
| `certificate` | None    | TLS service certificate |
| `private_key` | None    | TLS service private key |

### `[cluster]`

| Parameters               | Default          | Description                                                  |
| ------------------------ | ---------------- | ------------------------------------------------------------ |
| `name`                   | `cluster_xxx`    | Node name                                                    |
| `meta_service_addr`      | `127.0.0.1:8901` | Remote `meta` Service port                                   |
| `http_listen_port`       | `8902`           | HTTP service listening port.                 |
| `grpc_listen_port`       | `8903`           | GRPC service listening port.                 |
| `flight_rpc_listen_port` | `8904`           | Flight RPC service listening port.           |
| `tcp_listen_port`        | `8905`           | TCP service listening port.                  |
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

| Parameters    | Default | Description                                                                |
| ------------- | ------- | -------------------------------------------------------------------------- |
| `cache`       | `1024`  | Size of the write cache before sending forward, in bits                    |
| `concurrency` | `8`     | Number of concurrent requests to process forward requests. |
| `timeout`     | `300`   | Timeout for forward request, unit: `s`.    |

</TabItem>

</Tabs>

### `[heartbeat]`

| Parameters                 | Default | Description                                                                                                                                           |
| -------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `report_time_interval_sec` | `30`    | Time interval between reporting heart, disk balance and other information on this node to `meta` service in: seconds. |

### `[node_basic]`

| Parameters         | Default | Description                                                                                          |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| `node_id`          | `1001`  | Node ID.                                                                             |
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

| Parameters               | Default                             | Description                                                                                                                                                                   |
| ------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jaeger_agent_endpoint`  | `http://localhost:14268/api/traces` | the Jaeger agent endpoint。eg: http://localhost:14268/api/traces                                                               |
| `max_concurrent_exports` | 2                                   | The parallelism of the reporter on trace.Default value is 2                                                                                                   |
| `max_queue_size`         | 4096                                | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096If the queue is full, it will drop span. |

## `meta` file description

### Global

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters                     | Default                | Description                                 |
| ------------------------------ | ---------------------- | ------------------------------------------- |
| id                             | `1`                    | `meta` node's `id`, requires unique cluster |
| host                           | `127.0.0.1`            | `host` for communication with other nodes   |
| port                           | `8901`                 | `port` for communicating with other nodes   |
| data_path | `/var/lib/cnosdb/meta` | Path to the `meta` data store               |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters                                                                                  | Default                | Description                                 |
| ------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------- |
| id                                                                                          | `1`                    | `meta` node's `id`, requires unique cluster |
| host                                                                                        | `127.0.0.1`            | `host` for communication with other nodes   |
| port                                                                                        | `8901`                 | `port` for communicating with other nodes   |
| data_path                                                              | `/var/lib/cnosdb/meta` | Path to the `meta` data store               |
| auto_migrate_vnodes_duration | `0`                    |                                             |

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
