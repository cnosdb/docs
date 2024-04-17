---
title: Configuration
order: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

This chapter introduces the method of configuring CnosDB configuration.

The configuration adopts TOML syntax.

> TOML Syntax Reference: [https://toml.io](https://toml.io/cn/v1.0.0)

You can use the `cnosdb config` command to create a default configuration file, for example:

```shell
cnosdb run config > ./config.toml
```

Use the `cnosdb check server-config <path>` command to check if the configuration file is valid, for example:

```shell
cnosdb check server-config ./config.toml
```

Start the configuration file using the `cnosdb` command:

> If the user does not specify, the program first looks for the configuration in `/etc/cnosdb/cnosdb.conf`, `$HOME/cnosdb/cnosdb.conf`, and if not found, uses the default configuration.

```
cnosdb --config ./cnosdb.conf
```

The priority of configurations in CnosDB is: specified parameters > environment variables > specified configuration file > `/etc/cnosdb/cnosdb.conf` > `$HOME/cnosdb/cnosdb.conf` > default configuration

## Environment Variables

All settings in the configuration file can be set or overridden using environment variables.If both exist in the file and environment variables, the environment variable will take precedence, and the value in the configuration file will be ignored.

To make these configuration settings available for CnosDB to use via environment variables, they must be in the following format:

```shell
CNOSDB_REPORTING_DISABLED=false
```

## The detailed configuration file description is as follows:

This section introduces the configuration method and usage of each configuration.

### Configuration

```mdx-code-block
<APITable>
```

| Parameters               | Default                    | Environment Variables           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | -------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled`     | `false`                    | `CNOSDB_REPORTING_DISABLED`     | Whether to turn off the automatic reporting of telemetry data by CnosDB, mainly to track the usage rates of different versions of CnosDB, which is beneficial for the continuous development of CnosDB.Data is reported every 24 hours, each record includes: instance running time, operating system type, database version, geographical location of the instance (up to provincial or continental level). |
| `raft_logs_to_keep`      | `5000`                     | `CNOSDB_RAFT_LOGS_TO_KEEP`      | Raft log retention count, and take a snapshot every these times written                                                                                                                                                                                                                                                                                                                                                                                                         |
| `using_raft_replication` | `false`                    | `CNOSDB_USING_RAFT_REPLICATION` | Whether to enable the Raft replication algorithm                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `host`                   | `localhost`                | `CNOSDB_HOST`                   | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `license_file`           | `/etc/cnosdb/license.json` | `CNOSDB_LICENSE_FILE`           | Enterprise version configuration, used to specify the location of the `License` file.                                                                                                                                                                                                                                                                                                                                                                           |

```mdx-code-block
</APITable>
```

### `[deployment]`

```mdx-code-block
<APITable>
```

| Parameters | Default                    | Environment Variables | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | -------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `query_tskv`               | `CNOSDB_MODE`         | Deployment mode, optional: `tskv`, `query`, `query_tskv`, `singleton`.  `tskv`: Deploying only the `tskv` engine requires specifying a Meta service address. `query` : Deploying only the query engine requires specifying a meta address. `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified. `singleton` : Deploying a standalone version without specifying a meta address. |
| `cpu`      | Equivalent Node Core Count | `CNOSDB_CPU`          | Number of CPU cores used by the node to run                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `memory`   | Equivalent nodes CPU       | `CNOSDB_MEMORY`       | Maximum memory used by the node during operation, unit: (G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

```mdx-code-block
</APITable>
```

### `[query]`

```mdx-code-block
<APITable>
```

| Parameters                                                       | Default     | Environment Variables           | Description                                                                                    |
| ---------------------------------------------------------------- | ----------- | ------------------------------- | ---------------------------------------------------------------------------------------------- |
| max_server_connections | `10240`     | `CNOSDB_MAX_SERVER_CONNECTIONS` | Maximum number of concurrent connection requests.                              |
| `query_sql_limit`                                                | `16777216`  | `CNOSDB_QUERY_SQL_LIMIT`        | Maximum number of bytes per SQL query request, unit: Bytes                     |
| `write_sql_limit`                                                | `167772160` | `CNOSDB_WRITE_SQL_LIMIT`        | Maximum number of bytes per Line Protocol to write to the request, unit: Bytes |
| `auth_enabled`                                                   | `false`     | `CNOSDB_AUTH_ENABLED`           | Whether to start checking user permissions, default is false.                  |
| `read_timeout_ms`                                                | `3000`      | `CNOSDB_READ_TIMEOUT_MS`        | `query` visits the timeout of `tskv` in units: `ms`                            |
| `write_timeout_ms`                                               | `3000`      | `CNOSDB_WRITE_TIMEOUT_MS`       | Timeout for writing to `tskv` in unit: `ms`                                    |
| `stream_trigger_cpu`                                             | `1`         | `CNOSDB_STREAM_TRIGGER_CPU`     | Number of CPUs to prepare streams for computing tasks                                          |
| `stream_executor_cpu`                                            | `2`         | `CNOSDB_STREAM_EXECUTOR_CPU`    | Number of CPUs to perform stream calculation tasks                                             |

```mdx-code-block
</APITable>
```

### `[storage]`

```mdx-code-block
<APITable>
```

| Parameters                      | Default                   | Environment Variables                  | Description                                                                                                                                                         |
| ------------------------------- | ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | `CNOSDB_PATH`                          | Data storage location                                                                                                                                               |
| `max_summary_size`              | `128M`                    | `CNOSDB_MAX_SUMMARY_SIZE`              | Maximum size of a single Summary log.                                                                                                               |
| `base_file_size`                | `16M`                     | `CNOSDB_BASE_FILE_SIZE`                | Single file data size, default: 16M                                                                                                                 |
| `flush_req_channel_cap`         | `16`                      | `CNOSDB_FLUSH_REQ_CHANNEL_CAP`         | Cumulative flush task ceiling.                                                                                                                      |
| `max_level`                     | `4`                       | `CNOSDB_MAX_LEVEL`                     | LSM&amp;apos;s maximum number of layers, value range 0-4, default: 4                                                            |
| `compact_trigger_file_num`      | `4`                       | `CNOSDB_COMPACT_TRIGGER_FILE_NUM`      | Number of files to trigger compaction.                                                                                                              |
| `compact_trigger_cold_duration` | `1h`                      | `CNOSDB_COMPACT_TRIGGER_COLD_DURATION` | Compatibility is triggered when no action is taken during the time period.                                                                          |
| `max_compact_size`              | `2G`                      | `CNOSDB_MAX_COMPACT_SIZE`              | Maximum selected file size for compaction.                                                                                                          |
| `max_concurrent_compaction`     | `4`                       | `CNOSDB_MAX_CONCURRENT_COMPACTION`     | Maximum number of compaction tasks to be performed simultaneously.                                                                                  |
| `strict_write`                  | `false`                   | `CNOSDB_STRICT_WRITE`                  | Whether to enable strict writing.                                                                                                                   |
| `reserve_space`                 | `0`                       | `CNOSDB_RESERVE_SPACE`                 | The size of the retained space of the system.                                                                                                       |
| `copyinto_trigger_flush_size`   | `128M`                    | `COPYINTO_TRIGGER_FLUSH_SIZE`          | `COPY INTO` Export triggers the memory size of the disk.Supported version: >2.3.4.3 |

```mdx-code-block
</APITable>
```

### `[wal]`

```mdx-code-block
<APITable>
```

| Parameters                                                                         | Default               | Environment Variables                  | Description                                                                                                                          |
| ---------------------------------------------------------------------------------- | --------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`                                                                          | `true`                | `CNOSDB_ENABLED`                       | Whether to enable WAL.                                                                                               |
| `path`                                                                             | `/var/lib/cnosdb/wal` | `CNOSDB_PATH`                          | WAL storage directory.                                                                                               |
| `wal_req_channel_cap`                                                              | `64`                  | `CNOSDB_WAL_REQ_CHANNEL_CAP`           | Cumulative write WAL task ceiling.                                                                                   |
| `max_file_size`                                                                    | `1G`                  | `CNOSDB_MAX_FILE_SIZE`                 | The maximum size of a single WAL, default: 1G                                                                        |
| The number of files required to trigger the compaction, default: 4 | `2G`                  | `CNOSDB_FLUSH_TRIGGER_TOTAL_FILE_SIZE` | Flash when all WAL sizes reach this value.                                                                           |
| `sync`                                                                             | `false`               | `CNOSDB_SYNC`                          | Whether to sync for each writing.                                                                                    |
| `sync_interval`                                                                    | `0`                   | `CNOSDB_SYNC_INTERVAL`                 | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

```mdx-code-block
</APITable>
```

### `[cache]`

```mdx-code-block
<APITable>
```

| Parameters             | Default                                                                                | Environment Variables         | Description                                                               |
| ---------------------- | -------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `max_buffer_size`      | `128M`                                                                                 | `CNOSDB_MAX_BUFFER_SIZE`      | Maximum active cache size.                                |
| `max_immutable_number` | `4`                                                                                    | `CNOSDB_MAX_IMMUTABLE_NUMBER` | Maximum number of inactive cache.                         |
| `partition`            | Specify the number of CPU cores required for the instance, default: 10 | `CNOSDB_PARTITION`            | number of partitions to memcache cache, default value equals CPU quantity |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| Parameters | Default           | Environment Variables | Description                                                    |
| ---------- | ----------------- | --------------------- | -------------------------------------------------------------- |
| `level`    | `info`            | `CNOSDB_LEVEL`        | Log level（debug、info、error、warn, default: info |
| `path`     | `/var/log/cnosdb` | `CNOSDB_PATH`         | Remote log path                                                |

```mdx-code-block
</APITable>
```

### `[security]`

```mdx-code-block
<APITable>
```

| Parameters   | Default | Environment Variables | Description       |
| ------------ | ------- | --------------------- | ----------------- |
| `tls_config` | None    | `CNOSDB_TLS_CONFIG`   | TLS Configuration |

```mdx-code-block
</APITable>
```

### `[security.tls_config]` (optional)

```mdx-code-block
<APITable>
```

| Parameters    | Default | Environment Variables | Description             |
| ------------- | ------- | --------------------- | ----------------------- |
| `certificate` | None    | `CNOSDB_CERTIFICATE`  | TLS service certificate |
| `private_key` | None    | `CNOSDB_PRIVATE_KEY`  | TLS service private key |

```mdx-code-block
</APITable>
```

### `[cluster]`

```mdx-code-block
<APITable>
```

| Parameters               | Default          | Environment Variables           | Description                                                  |
| ------------------------ | ---------------- | ------------------------------- | ------------------------------------------------------------ |
| `name`                   | `cluster_xxx`    | `CNOSDB_NAME`                   | name                                                         |
| `meta_service_addr`      | `127.0.0.1:8901` | `CNOSDB_META_SERVICE_ADDR`      | Remote Meta Service port                                     |
| `http_listen_port`       | `8902`           | `CNOSDB_HTTP_LISTEN_PORT`       | HTTP service listening port                                  |
| `grpc_listen_port`       | `8903`           | `CNOSDB_GRPC_LISTEN_PORT`       | GRPC service listening port                                  |
| `flight_rpc_listen_port` | `8904`           | `CNOSDB_FLIGHT_RPC_LISTEN_PORT` | Flight RPC service listening port                            |
| `tcp_listen_port`        | `8905`           | `CNOSDB_TCP_LISTEN_PORT`        | TCP service listening port                                   |
| `vector_listen_port`     | `8906`           | `CNOSDB_VECTOR_LISTEN_PORT`     | Use to listen for [Vector](https://vector.dev/) written data |

```mdx-code-block
</APITable>
```

### `[hintedoff]`

```mdx-code-block
<APITable>
```

| Parameters | Default              | Environment Variables | Description                                                                |
| ---------- | -------------------- | --------------------- | -------------------------------------------------------------------------- |
| `enable`   | `true`               | `CNOSDB_ENABLE`       | Is the HIntedOff service enabled, default: true            |
| `path`     | `/var/lib/cnosdb/hh` | `CNOSDB_PATH`         | HintedOff storage directory.                               |
| `threads`  | `3`                  | `CNOSDB_THREADS`      | Number of conjunctions to process the Hinted handoff data. |

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

| Parameters    | Default | Environment Variables | Description                                                                                      |
| ------------- | ------- | --------------------- | ------------------------------------------------------------------------------------------------ |
| `cache`       | `1024`  | `CNOSDB_CACHE`        | cache size (bit) before sending and forwarding, default: 1028 |
| `concurrency` | `8`     | `CNOSDB_CONCURRENCY`  | Number of parallel requests to process forward requests.                         |
| `timeout`     | `1000`  | `CNOSDB_TIMEOUT`      | Timeout for forward request, unit: seconds.                      |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| Parameters                 | Default | Environment Variables             | Description                                                                                                                                           |
| -------------------------- | ------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `report_time_interval_sec` | `30`    | `CNOSDB_REPORT_TIME_INTERVAL_SEC` | Time interval between reporting heart, disk balance and other information on this node to `meta` service in: seconds. |

```mdx-code-block
</APITable>
```

### `[node_basic]`

```mdx-code-block
<APITable>
```

| Parameters         | Default | Environment Variables     | Description                                                                                          |
| ------------------ | ------- | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `node_id`          | `1001`  | `CNOSDB_NODE_ID`          | Interval for checking the heartbeat status of a node                                                 |
| `cold_data_server` | `false` | `CNOSDB_COLD_DATA_SERVER` | Whether to stop creating Vnode on this node.                                         |
| `store_metrics`    | `true`  | `CNOSDB_STORE_METRICS`    | Whether to track the usage of this node and store it in the `usage_schema` database. |

```mdx-code-block
</APITable>
```

### `[trace]`

```mdx-code-block
<APITable>
```

| Parameters           | Default | Environment Variables       | Description                                                                                                                          |
| -------------------- | ------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `auto_generate_span` | `false` | `CNOSDB_AUTO_GENERATE_SPAN` | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

```mdx-code-block
</APITable>
```

### `[trace.log]` (optional)

```mdx-code-block
<APITable>
```

| Parameters | Default | Environment Variables | Description         |
| ---------- | ------- | --------------------- | ------------------- |
| `path`     | None    | `CNOSDB_PATH`         | trace log file path |

```mdx-code-block
</APITable>
```

### `[trace.jaeger]` (optional)

```mdx-code-block
<APITable>
```

| Parameters               | Default | Environment Variables           | Description                                                                                                                                                                   |
| ------------------------ | ------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jaeger_agent_endpoint`  | None    | `CNOSDB_JAEGER_AGENT_ENDPOINT`  | the Jaeger agent endpoint。eg: http://localhost:14268/api/traces                                                               |
| `max_concurrent_exports` | 2       | `CNOSDB_MAX_CONCURRENT_EXPORTS` | The parallelism of the reporter on trace.Default value is 2                                                                                                   |
| `max_queue_size`         | 4096    | `CNOSDB_MAX_QUEUE_SIZE`         | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096If the queue is full, it will drop span. |

```mdx-code-block
</APITable>
```

## `meta` file description

### Configuration

```mdx-code-block
<APITable>
```

| Parameters                                                 | Default                | Environment Variables     | Description                                                                     |
| ---------------------------------------------------------- | ---------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| id                                                         | `1`                    | `CNOSDB_ID`               | `id` : id of Meta node, the value must be unique in the cluster |
| host                                                       | `127.0.0.1`            | `CNOSDB_HOST`             | `host` for communication with other nodes                                       |
| port                                                       | `8901`                 | `CNOSDB_PORT`             | `port` for communicating with other nodes                                       |
| data_path                             | `/var/lib/cnosdb/meta` | `CNOSDB_DATA_PATH`        | `journal_path`: journal storage path of Meta node               |
| grpc_enable_gzip | `false`                | `CNOSDB_GRPC_ENABLE_GZIP` | Interface data transfer for the `meta` service, if compression is enabled       |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| Parameters | Default           | Environment Variables | Description                                                    |
| ---------- | ----------------- | --------------------- | -------------------------------------------------------------- |
| `level`    | `info`            | `CNOSDB_LEVEL`        | Log level（debug、info、error、warn, default: info |
| `path`     | `/var/log/cnosdb` | `CNOSDB_PATH`         | Remote log path                                                |

```mdx-code-block
</APITable>
```

### `[meta_init]`

```mdx-code-block
<APITable>
```

| Parameters         | Default                     | Environment Variables     | Description                           |
| ------------------ | --------------------------- | ------------------------- | ------------------------------------- |
| `cluster_name`     | `cluster_xxx`               | `CNOSDB_CLUSTER_NAME`     | Cluster Name                          |
| `admin_user`       | `root`                      | `CNOSDB_ADMIN_USER`       | User name of the system administrator |
| `system_tenant`    | `cnosdb`                    | `CNOSDB_SYSTEM_TENANT`    | Name of the default tenant            |
| `default_database` | `["public","usage_schema"]` | `CNOSDB_DEFAULT_DATABASE` | Default database created              |

```mdx-code-block
</APITable>
```

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| Parameters                   | Default |                                     | Description                                                                                                         |
| ---------------------------- | ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `heartbeat_recheck_interval` | 300     | `CNOSDB_HEARTBEAT_RECHECK_INTERVAL` | How often to check the status of CnosDB nodes, in seconds.                                          |
| `heartbeat_expired_interval` | 300     | `CNOSDB_HEARTBEAT_EXPIRED_INTERVAL` | How long has the CnosDB node not reported an abnormal heartbeat determination, measured in seconds. |

```mdx-code-block
</APITable>
```
