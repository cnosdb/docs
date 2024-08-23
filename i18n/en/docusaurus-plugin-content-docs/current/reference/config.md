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

| Parameters          | Default       | Environment Variables      | Description                                                                                          |
| ------------------- | ------------- | -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `node_id`           | `1001`        | `CNOSDB_NODE_ID`           | Node ID                                                                                              |
| `host`              | `localhost`   | `CNOSDB_HOST`              | Used to communicate with other nodes.                                                |
| `cluster_name`      | `cluster_xxx` | `CNOSDB_CLUSTER_NAME`      | Cluster Name                                                                                         |
| `store_metrics`     | `true`        | `CNOSDB_STORE_METRICS`     | Whether to track the usage of this node and store it in the `usage_schema` database. |
| `pre_create_bucket` | `false`       | `CNOSDB_PRE_CREATE_BUCKET` | Pre-create `bucket`                                                                                  |

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
| `memory`   | Equivalent nodes CPU       | `CNOSDB_DEPLOYMENT_MEMORY` | Maximum memory used by the node during operation, unit: (G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

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

| Parameters                      | Default                   | Environment Variables                          | Description                                                                                                                                                         |
| ------------------------------- | ------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | `CNOSDB_STORAGE_PATH`                          | Data storage directory.                                                                                                                             |
| `max_summary_size`              | `128M`                    | `CNOSDB_STORAGE_MAX_SUMMARY_SIZE`              | Maximum size of a single Summary log.                                                                                                               |
| `base_file_size`                | `16M`                     | `CNOSDB_STORAGE_BASE_FILE_SIZE`                | Single file data size.                                                                                                                              |
| `flush_req_channel_cap`         | `16`                      | `CNOSDB_STORAGE_FLUSH_REQ_CHANNEL_CAP`         | Cumulative flush task ceiling.                                                                                                                      |
| `max_cache_readers`             | `32`                      | `CNOSDB_STORAGE_MAX_CACHE_READERS`             | The maximum count of file handles (for querying) opened in each vnode.                                                           |
| `max_level`                     | `4`                       | `CNOSDB_STORAGE_MAX_LEVEL`                     | The maximum number of layers of the LSM, in the range 0-4.                                                                                          |
| `compact_trigger_file_num`      | `4`                       | `CNOSDB_STORAGE_COMPACT_TRIGGER_FILE_NUM`      | Number of files to trigger compaction.                                                                                                              |
| `compact_trigger_cold_duration` | `1h`                      | `CNOSDB_STORAGE_COMPACT_TRIGGER_COLD_DURATION` | Compaction is triggered when no action is taken during the time period.                                                                             |
| `max_compact_size`              | `2G`                      | `CNOSDB_STORAGE_MAX_COMPACT_SIZE`              | Maximum selected file size for compaction.                                                                                                          |
| `max_concurrent_compaction`     | `4`                       | `CNOSDB_STORAGE_MAX_CONCURRENT_COMPACTION`     | Maximum number of compaction tasks to be performed simultaneously.                                                                                  |
| `strict_write`                  | `false`                   | `CNOSDB_STORAGE_STRICT_WRITE`                  | Whether to enable strict writing.                                                                                                                   |
| `reserve_space`                 | `0`                       | `CNOSDB_STORAGE_RESERVE_SPACE`                 | The size of the retained space of the system.                                                                                                       |
| `copyinto_trigger_flush_size`   | `128M`                    | `CNOSDB_STORAGE_COPYINTO_TRIGGER_FLUSH_SIZE`   | `COPY INTO` Export triggers the memory size of the disk.Supported version: >2.3.4.3 |
| `max_datablock_size`            | `100KB`                   | `CNOSDB_STORAGE_MAX_DATABLOCK_SIZE`            | Maximum size of data block at the time it is computed.                                                                                              |
| `index_cache_capacity`          | `100000`                  | `CNOSDB_STORAGE_INDEX_CACHE_CAPACITY`          | Index cache capacity                                                                                                                                                |

```mdx-code-block
</APITable>
```

### `[wal]`

```mdx-code-block
<APITable>
```

| Parameters                      | Default               | Environment Variables                      | Description                                                                                                                                                                            |
| ------------------------------- | --------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`                       | `true`                | `CNOSDB_WAL_ENABLED`                       | Whether to enable WAL.                                                                                                                                                 |
| `path`                          | `/var/lib/cnosdb/wal` | `CNOSDB_WAL_PATH`                          | WAL storage directory.                                                                                                                                                 |
| `wal_req_channel_cap`           | `64`                  | `CNOSDB_WAL_WAL_REQ_CHANNEL_CAP`           | Cumulative write WAL task ceiling.                                                                                                                                     |
| `max_file_size`                 | `1G`                  | `CNOSDB_WAL_MAX_FILE_SIZE`                 | Maximum size of a single WAL.                                                                                                                                          |
| `flush_trigger_total_file_size` | `2G`                  | `CNOSDB_WAL_FLUSH_TRIGGER_TOTAL_FILE_SIZE` | Flash when all WAL sizes reach this value.                                                                                                                             |
| `sync`                          | `false`               | `CNOSDB_WAL_SYNC`                          | Whether to sync for each writing.                                                                                                                                      |
| `sync_interval`                 | `0`                   | `CNOSDB_WAL_SYNC_INTERVAL`                 | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing, Unit: `h`、`m`、`s`、`ms`、`us`、`ns` |

```mdx-code-block
</APITable>
```

### `[cache]`

```mdx-code-block
<APITable>
```

| Parameters        | Default              | Environment Variables          | Description                                                               |
| ----------------- | -------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| `max_buffer_size` | `128M`               | `CNOSDB_CACHE_MAX_BUFFER_SIZE` | Maximum active cache size.                                |
| `partition`       | Equivalent nodes CPU | `CNOSDB_CACHE_PARTITION`       | Number of partitions to memcache cache, default value equals CPU quantity |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| Parameters       | Default           | Environment Variables       | Description                                                                                                     |
| ---------------- | ----------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `level`          | `info`            | `CNOSDB_LOG_LEVEL`          | Log Level (debug, info, error, warn).                                        |
| `path`           | `/var/log/cnosdb` | `CNOSDB_LOG_PATH`           | Log storage directory.                                                                          |
| `max_file_count` | Unlimited         | `CNOSDB_LOG_MAX_FILE_COUNT` | Maximum number of log files to keep.                                                            |
| `file_rotation`  | `daily`           | `CNOSDB_LOG_FILE_ROTATION`  | Log files are split between time intervals (daily, hourly, minutely, never). |

```mdx-code-block
</APITable>
```

### `[security.tls_config]`

```mdx-code-block
<APITable>
```

| Parameters    | Default | Environment Variables                    | Description             |
| ------------- | ------- | ---------------------------------------- | ----------------------- |
| `certificate` | None    | `CNOSDB_SECURITY_TLS_CONFIG_CERTIFICATE` | TLS service certificate |
| `private_key` | None    | `CNOSDB_SECURITY_TLS_CONFIG_PRIVATE_KEY` | TLS service private key |

```mdx-code-block
</APITable>
```

### `[service]`

```mdx-code-block
<APITable>
```

| Parameters               | Default | Environment Variables                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http_listen_port`       | `8902`  | `CNOSDB_SERVICE_HTTP_LISTEN_PORT`       | HTTP service listening port.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `grpc_listen_port`       | `8903`  | `CNOSDB_SERVICE_GRPC_LISTEN_PORT`       | GRPC service listening port.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `grpc_enable_gzip`       | `false` | `CNOSDB_SERVICE_GRPC_ENABLE_GZIP`       | Whether to enable compression for data transmission of the meta service interface                                                                                                                                                                                                                                                                                                                                                                                               |
| `flight_rpc_listen_port` | `8904`  | `CNOSDB_SERVICE_FLIGHT_RPC_LISTEN_PORT` | Flight RPC service listening port.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tcp_listen_port`        | `8905`  | `CNOSDB_SERVICE_TCP_LISTEN_PORT`        | TCP service listening port.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `vector_listen_port`     | `8906`  | `CNOSDB_SERVICE_VECTOR_LISTEN_PORT`     | Use to listen for [Vector](https://vector.dev/) written data                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `enable_report`          | `true`  | `CNOSDB_SERVICE_ENABLE_REPORT`          | Whether to turn off the automatic reporting of telemetry data by CnosDB, mainly to track the usage rates of different versions of CnosDB, which is beneficial for the continuous development of CnosDB.Data is reported every 24 hours, each record includes: instance running time, operating system type, database version, geographical location of the instance (up to provincial or continental level). |

```mdx-code-block
</APITable>
```

### `[cluster]`

```mdx-code-block
<APITable>
```

| Parameters                    | Default       | Environment Variables                        | Description                                                                              |
| ----------------------------- | ------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `raft_logs_to_keep`           | `5000`        | `CNOSDB_CLUSTER_RAFT_LOGS_TO_KEEP`           | Raft log retention count, and take a snapshot every these times written. |
| `snapshot_holding_time`       | `3600s`       | `CNOSDB_CLUSTER_SNAPSHOT_HOLDING_TIME`       | Raft snapshot retention time.                                            |
| `trigger_snapshot_interval`   | `600s`        | `CNOSDB_CLUSTER_TRIGGER_SNAPSHOT_INTERVAL`   | Raft trigger snapshot interval.                                          |
| `lmdb_max_map_size`           | `1024000000B` | `CNOSDB_CLUSTER_LMDB_MAX_MAP_SIZE`           | Used to configure store Raft status data size.                           |
| `heartbeat_interval`          | `3000ms`      | `CNOSDB_CLUSTER_HEARTBEAT_INTERVAL`          | Raft Replica algorithm heartbeat intervals.                              |
| `send_append_entries_timeout` | `5000ms`      | `CNOSDB_CLUSTER_SEND_APPEND_ENTRIES_TIMEOUT` | Send log timeout between Raft nodes.                                     |
| `install_snapshot_timeout`    | `3600000ms`   | `CNOSDB_CLUSTER_INSTALL_SNAPSHOT_TIMEOUT`    | Time to replica snapshot between Raft nodes.                             |

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

| Parameters    | Default | Environment Variables | Description                                                                 |
| ------------- | ------- | --------------------- | --------------------------------------------------------------------------- |
| `cache`       | `1024`  | `CNOSDB_CACHE`        | The size of the channel for processing forward requests.    |
| `concurrency` | `8`     | `CNOSDB_CONCURRENCY`  | Number of concurrent requests to process forward requests.  |
| `timeout`     | `1000`  | `CNOSDB_TIMEOUT`      | Timeout for forward request, unit: seconds. |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>

### `[trace]`

```mdx-code-block
<APITable>
```

| Parameters               | Default | Environment Variables                 | Description                                                                                                                                                |
| ------------------------ | ------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto_generate_span`     | `false` | `CNOSDB_TRACE_AUTO_GENERATE_SPAN`     | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context.      |
| `max_spans_per_trace`    | None    | `CNOSDB_TRACE_MAX_SPANS_PER_TRACE`    | Soft limits on the total number of spans and events in trace.                                                                              |
| `batch_report_interval`  | `500ms` | `CNOSDB_TRACE_BATCH_REPORT_INTERVAL`  | Time interval between two batch reports.                                                                                                   |
| `batch_report_max_spans` | None    | `CNOSDB_TRACE_BATCH_REPORT_MAX_SPANS` | The maximum number of soft limits for span in batch report.                                                                                |
| `otlp_endpoint`          | None    | `CNOSDB_TRACE_OTLP_ENDPOINT`          | GRPC address of OTLP collector.e.g. http://localhost:4317. |

```mdx-code-block
</APITable>
```

## `meta` file description

### Global

```mdx-code-block
<APITable>
```

| Parameters                                                                                 | Default                                                   | Environment Variables                                                                                                                            | Description                                                                                    |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| id                                                                                         | 1                                                         | CNOSDB_META_ID                                                                                         | meta node's ID, unique group                                                                   |
| host                                                                                       | 127.0.0.1 | CNOSDB_META_HOST                                                                                       | Host to communicate with other nodes                                                           |
| port                                                                                       | 8901                                                      | CNOSDB_META_PORT                                                                                       | `port` for communicating with other nodes                                                      |
| data_path                                                             | /var/lib/cnosdb/meta                                      | CNOSDB_META_DATA_PATH                                                             | Path to the `meta` data store                                                                  |
| cluster_name                                                          | cluster_xxx                          | CNOSDB_META_META_INIT_CLUSTER_NAME      | Cluster Name                                                                                   |
| grpc_enable_gzip                                 | false                                                     | CNOSDB_META_GRPC_ENABLE_GZIP                                 | Whether to enable compression for data transmission of the meta service interface              |
| lmdb_max_map_size           | false                                                     | CNOSDB_META_LMDB_MAX_MAP_SIZE           | The lmdb storage engine uses the maximum space value, store meta data and draft-related status |
| heartbeat_interval                                                    | 3000ms                                                    | CNOSDB_META_HEARTBEAT_INTERVAL                                                    | Raft Replica algorithm heartbeat intervals.                                    |
| raft_logs_to_keep           | 10000                                                     | CNOSDB_META_RAFT_LOGS_TO_KEEP           | Number of logs to trigger snapshot in Raft.                                    |
| install_snapshot_timeout                         | 3600000ms                                                 | CNOSDB_META_INSTALL_SNAPSHOT_TIMEOUT                         | Time to replica snapshot between Raft nodes.                                   |
| send_append_entries_timeout | 5000ms                                                    | CNOSDB_META_SEND_APPEND_ENTRIES_TIMEOUT | Send log timeout between Raft nodes.                                           |
| usage_schema_cache_size     | 2097152                                                   | CNOSDB_META_USAGE_SCHEMA_CACHE_SIZE     | Maximum memory cache for usage_schema.                    |
| cluster_schema_cache_size   | 2097152                                                   | CNOSDB_META_CLUSTER_SCHAME_CACHE_SIZE   | Maximum memory cache for cluster_schema.                  |
| system_database_replica                          | 1                                                         | CNOSDB_META_SYSTEM_DATABASE_REPLICA                          | Replica of the system database.                                                |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| Parameters | Default           | Environment Variables   | Description                                                              |
| ---------- | ----------------- | ----------------------- | ------------------------------------------------------------------------ |
| `level`    | `info`            | `CNOSDB_META_LOG_LEVEL` | Log Level (debug, info, error, warn). |
| `path`     | `/var/log/cnosdb` | `CNOSDB_META_LOG_PATH`  | Log storage directory.                                   |

```mdx-code-block
</APITable>
```

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| Parameters                   | Default |                                                    | Description                                                                                                         |
| ---------------------------- | ------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `heartbeat_recheck_interval` | 300     | `CNOSDB_META_HEARTBEAT_HEARTBEAT_RECHECK_INTERVAL` | How often to check the status of CnosDB nodes, in seconds.                                          |
| `heartbeat_expired_interval` | 300     | `CNOSDB_META_HEARTBEAT_HEARTBEAT_EXPIRED_INTERVAL` | How long has the CnosDB node not reported an abnormal heartbeat determination, measured in seconds. |

```mdx-code-block
</APITable>
```
