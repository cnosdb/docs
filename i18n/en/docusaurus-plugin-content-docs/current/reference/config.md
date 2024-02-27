---
title: Configuration
order: 6
---

Import Tabs from '@theme/Tabs';
import tab from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

This section describes how to configure the CnosDB configuration.

CSDB configuration file is in TOML format.

> TOML syntax reference：[https://toml.io](https://toml.io/cn/v1.0.0)

Use the `cnosdb config` command to create default configuration files, such as：

```shell
cnosdb run config > ./config.toml
```

Use the \`cnosdb check server-config <path>command to check if configuration file is valid, such as：

```shell
cnosdb check server-config ./config.toml
```

Use the `cnosdb` command to specify the configuration file to start：

> 如果用户未指定，则程序在 `/etc/cnosdb/cnosdb.conf`，`$HOME/cnosdb/cnosdb.conf`位置先寻找配置，没有找到则使用默认配置

```
cnosdb --config ./cnosdb.conf
```

CnosDB 中的配置优先级为：指定参数 > 环境变量 > 指定配置文件 > `/etc/cnosdb/cnosdb.conf` > `$HOME/cnosdb/cnosdb.conf` > 默认配置

## Environment Variables

All settings in the configuration file can be set or overridden using environment variables.If present in both file and environment variables, environmental variables will prevail and the values in the configuration file will be ignored.

To make these settings available for CnosDB using environment variables, they must use the following format：

```shell
NOSDB_REPORTING_DISABLED=false
```

## File Description

This section describes how each configuration is configured and how it is used.

### Global Configuration

```mdx-code-block
<APITable>
```

| 参数                        | Default                    | Environment Variables                                                                          | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled`      | `false`                    | `CNOSDB_REPORTING_DISABLED`                                                                    | Turn off CnosDB to automatically report telemetric data and track usage rates of CnosDB versions for the continued development of CnosDB.Report data every 24 hours, each field contains：instance time, operating system type, database version, location of instance operation (only to provincial or continental level). |
| `raft_logs_to_keep`       | `5000`                     | `CNOSDB_RAFT_LOGS_TO_KEEP`                                                                     | The number of entries left in the Rafah log and write to snapshot every time                                                                                                                                                                                                                                                                  |
| `using_draft_replication` | `false`                    | "CNOSDB_USING_RAFT_REPLICATION" | Enable Rafah Copy Algorithm                                                                                                                                                                                                                                                                                                                   |
| `host`                    | `localhost`                | `CNOSDB_HOST`                                                                                  | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                         |
| `license_file`            | `/etc/cnosdb/license.json` | `CNOSDB_LICENSE_FILE`                                                                          | Enterprise version configuration, used to specify the location of the `License` file.                                                                                                                                                                                                                                                         |

```mdx-code-block
</APITable>
```

### `[deployment]`

```mdx-code-block
<APITable>
```

| 参数       | Default              | Environment Variables | Note                                                                                                                                                                                                                                                                                                                                                                                            |
| -------- | -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`   | `query_tskv`         | `CNOSDB_MODE`         | Deployment mode, optional： `tskv`, `query`, `query_tskv`, `singleton`.  `tskv`: Only the `tskv` engine, requires a Meta service address. `query`: Only the `query` engine, requires a `meta` service address. The `query_tskv`: `query` and `tskv` engines are deployed and require a `meta` service address. `singleton`: Deploy single version without specifying the `meta` service address. |
| `cpu`    | Equivalent Node Core | `CNOSDB_CPU`          | Number of cpu nucleus to run                                                                                                                                                                                                                                                                                                                                                                    |
| `memory` | Equivalent nodes CPU | `CNOSDB_MEMORY`       | Maximum memory used for running node, unit：(G)                                                                                                                                                                                                                                                                                                                               |

```mdx-code-block
</APITable>
```

### `[query]`

```mdx-code-block
<APITable>
```

| 参数                       | Default     | Environment Variables           | Description                                                                   |
| ------------------------ | ----------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `max_server_connections` | `10240`     | `CNOSDB_MAX_SERVER_CONNECTIONS` | Maximum number of concurrent connection requests.                             |
| `query_sql_limit`        | `16777216`  | `CNOSSDB_QUERY_SQL_LIMIT`       | Maximum number of bytes per SQL query request, unit：Bytes                     |
| `write_sql_limit`        | `167772160` | `CNOSSDB_WRITE_SQL_LIMIT`       | Maximum number of bytes per Line Protocol to write to the request, unit：Bytes |
| `auth_enabled`           | `false`     | `CNOSDB_AUTH_ENABLED`           | Whether to check the permissions of the user.                                 |
| `read_timeout_ms`        | `3000`      | `CNOSDB_READ_TIMEOUT_MS`        | `query` visits the timeout of `tskv` in units：`ms`                            |
| `write_timeout_ms`       | `3000`      | `CNOSDB_WRITE_TIMEOUT_MS`       | Timeout for writing to `tskv` in unit：`ms`                                    |
| `stream_trigger_cpu`     | `1`         | `CNOSDB_STREAM_TRIGGER_PU`      | Number of CPUs to prepare streams for computing tasks                         |
| `stream_executor_cpu`    | `2`         | `CNOSDB_STREAM_EXECUTOR_CPU`    | Number of CPUs to perform streaming tasks                                     |

```mdx-code-block
</APITable>
```

### `[storage]`

```mdx-code-block
<APITable>
```

| 参数                              | Default                   | Environment Variables                 | Description                                                              |
| ------------------------------- | ------------------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | `CNOSDB_PATH`                         | Datastore directory.                                                     |
| `max_summary_size`              | `128M`                    | `CNOSDB_MAX_SUMMARY_SIZE`             | Maximum size of a single Summary log.                                    |
| `base_file_size`                | `16M`                     | `CNOSDB_BASE_FILE_SIZE`               | Single file data size.                                                   |
| `flush_req_channel_cap`         | `16`                      | `CNOSDB_FLUSH_REQ_CHANNEL_CAP`        | Cumulative flush task ceiling.                                           |
| `max_level`                     | `4`                       | `CNOSDB_MAX_LEVEL`                    | Maximum number of LSM, range 0-4.                                        |
| `compact_trigger_file_num`      | `4`                       | `CNOSSDB_COMPACT_TRIGGER_FILE_NUM`    | Number of files to trigger compaction.                                   |
| `compact_trigger_cold_duration` | `1h`                      | `CNOSDB_COMPAT_TRIGGER_COLD_DURATION` | Compatibility is triggered.                                              |
| `max_compact_size`              | `2G`                      | `CNOSDB_MAX_COMPACT_SIZE`             | The maximum selected file size for compaction.                           |
| `max_concurrent_compact`        | `4`                       | `CNOSDB_MAX_CONCURRENT_COMPACTION`    | Maximum number of compaction tasks to be performed simultaneously.       |
| `strict_write`                  | `false`                   | `CNOSDB_STRICT_WRITE`                 | Whether to enable strict writing.                                        |
| `Reserve_space`                 | `0`                       | `CNOSDB_RESERVE_SPACE`                | The size of the retained space of the system.                            |
| `copyinto_trigger_flush_size`   | `128M`                    | `COPYINTO_TRIGGER_FLUSH_SIZE`         | `COPY INTO` Export triggers the memory size of the disk.Version：>2.3.4.3 |

```mdx-code-block
</APITable>
```

### `[wal]`

```mdx-code-block
<APITable>
```

| 参数                              | Default               | Environment Variables                                                                                                                           | Description                                                                     |
| ------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `enabled`                       | `true`                | `CNOSDB_ENABLED`                                                                                                                                | Whether to enable WAL.                                                          |
| `path`                          | `/var/lib/cnosdb/wal` | `CNOSDB_PATH`                                                                                                                                   | WAL Storage Directory.                                                          |
| `wal_req_channel_cap`           | `64`                  | `CNOSDB_WAL_REQ_CHANNEL_CAP`                                                                                                                    | Cumulative write WAL task ceiling.                                              |
| `max_file_size`                 | `1G`                  | `CNOSDB_MAX_FILE_SIZE`                                                                                                                          | Maximum size of a single WAL.                                                   |
| `flush_trigger_total_file_size` | `2G`                  | "CNOSDB_FLUSH_TRIGGER_TOTAL_FILE_SIZE" | Flash when all WAL sizes reach this value.                                      |
| `sync`                          | `false`               | `CNOSSDB_SYNC`                                                                                                                                  | Whether to sync for each writing.                                               |
| `sync_interval`                 | `0`                   | `CNOSDB_SYNCC_INTERVAL`                                                                                                                         | Synchronize WAL interval without active sync in：`h`, `m`, `s`, `ms`, `us`, `ns` |

```mdx-code-block
</APITable>
```

### `[cache]`

```mdx-code-block
<APITable>
```

| 参数                     | Default                 | Environment Variables         | Description                                                               |
| ---------------------- | ----------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `max_buff_size`        | `128M`                  | `CNOSDB_MAX_BUFER_SIZE`       | Maximum active cache size.                                                |
| `max_immutable_number` | `4`                     | `CNOSDB_MAX_IMMUTABLE_NUMBER` | Maximum number of inactive cache.                                         |
| `partition`            | Equivalent CPU quantity | `CNOSSDB_PARTITION`           | number of partitions to memcache cache, default value equals CPU quantity |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| 参数      | Default           | Environment Variables | Description                                              |
| ------- | ----------------- | --------------------- | -------------------------------------------------------- |
| `level` | `info`            | `CNOSDB_LEVEL`        | Log level (debug, info, error, warn). |
| `path`  | `/var/log/cnosdb` | `CNOSDB_PATH`         | Log storage directory.                                   |

```mdx-code-block
</APITable>
```

### `[security]`

```mdx-code-block
<APITable>
```

| 参数           | Default | Environment Variables | Description       |
| ------------ | ------- | --------------------- | ----------------- |
| `tls_config` | None    | `CNOSSDB_TLS_CONFIG`  | TLS Configuration |

```mdx-code-block
</APITable>
```

### `[security.tls_config]`(optional)

```mdx-code-block
<APITable>
```

| 参数            | Default | Environment Variables | Description                 |
| ------------- | ------- | --------------------- | --------------------------- |
| `certificate` | None    | `CNOSDB_CERTIFICATE`  | Certificate for TLS Service |
| `private_key` | None    | `CNOSDB_PRIVATE_KEY`  | Private key for TLS service |

```mdx-code-block
</APITable>
```

### `[cluster]`

```mdx-code-block
<APITable>
```

| 参数                       | Default          | Environment Variables                                         | Description                                                  |
| ------------------------ | ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| `name`                   | `cluster_xxx`    | `CNOSDB_NAME`                                                 | Node name.                                                   |
| `meta_service_addr`      | `127.0.0.1:8901` | `CNOSDB_META_SERVICE_ADDR`                                    | Remote `meta` service address.                               |
| `http_listen_port`       | `8902`           | `CNOSSDB_HTTP_LISTEN_PORT`                                    | HTTP service listener port.                                  |
| `grpc_listen_port`       | `8903`           | `CNOSDB_GRPC_LISTEN_PORT`                                     | GRPC service listener port.                                  |
| `flight_rpc_listen_port` | `8904`           | `CNOSSDB_FLIGHT_RPC_LIST`                                     | Flight RPC service listen port.                              |
| `tcp_listen_port`        | `8905`           | "CNOSDB_TCP_LIST"   | TCP service listener port.                                   |
| `vector_listen_port`     | `8906`           | "CNOSDB_VCTOR_LIST" | Use to listen for [Vector](https://vector.dev/) written data |

```mdx-code-block
</APITable>
```

### `[hintedoff]`

```mdx-code-block
<APITable>
```

| 参数        | Default             | Environment Variables | Description                                                |
| --------- | ------------------- | --------------------- | ---------------------------------------------------------- |
| `enable`  | `true`              | `CNOSDB_ENABLE`       | Whether to enable the HIntedOff service.                   |
| `path`    | `/var/lib/cnosdb/h` | `CNOSDB_PATH`         | HintedOff storage directory.                               |
| `threads` | `3`                 | `CNOSDB_THREADS`      | Number of conjunctions to process the Hinted handoff data. |

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

| 参数             | Default | Environment Variables | Description                                              |
| -------------- | ------- | --------------------- | -------------------------------------------------------- |
| `cache`        | `1024`  | `CNOSDB_CACHE`        | Size of cache, unit：bits write before sending forward    |
| `Conciliation` | `8`     | `CNOSDB_CONCURRENCY`  | Number of parallel requests to process forward requests. |
| `timeout`      | `1000`  | `CNOSDB_TIMEOUT`      | Timeout for forward request, unit：seconds.               |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| 参数                         | Default | Environment Variables              | Description                                                                                                          |
| -------------------------- | ------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `report_time_interval_sec` | `30`    | `CNOSSDB_REPORT_TIME_INTERVAL_SEC` | Time interval between reporting heart, disk balance and other information on this node to `meta` service in：seconds. |

```mdx-code-block
</APITable>
```

### `[node_basic]`

```mdx-code-block
<APITable>
```

| 参数                 | Default | Environment Variables     | Description                                                                          |
| ------------------ | ------- | ------------------------- | ------------------------------------------------------------------------------------ |
| `node_id`          | `1001`  | `CNOSDB_NODE_ID`          | Node ID.                                                                             |
| `cold_data_server` | `false` | `CNOSDB_COLD_DATA_SERVER` | Whether to stop creating Vnode on this node.                                         |
| `store_metrics`    | `true`  | `CNOSDB_STORE_METRICTS`   | Whether to track the usage of this node and store it in the `usage_schema` database. |

```mdx-code-block
</APITable>
```

### `[trace]`

```mdx-code-block
<APITable>
```

| 参数                   | Default | Environment Variables       | Description                                                                      |
| -------------------- | ------- | --------------------------- | -------------------------------------------------------------------------------- |
| `auto_generate_span` | `false` | `CNOSDB_AUTO_GENERATE_SPAN` | Whether to generate root automatically if the client does not carry span context |

```mdx-code-block
</APITable>
```

### `[trace.log]` (optional)

```mdx-code-block
<APITable>
```

| 参数     | Default | Environment Variables | Description         |
| ------ | ------- | --------------------- | ------------------- |
| `path` | None    | `CNOSDB_PATH`         | Trace Log File Path |

```mdx-code-block
</APITable>
```

### `[trace.jaeger]` (optional)

```mdx-code-block
<APITable>
```

| 参数                       | Default | Environment Variables           | Description                                                         |
| ------------------------ | ------- | ------------------------------- | ------------------------------------------------------------------- |
| `jaeger_agent_endpoint`  | None    | `CNOSDB_JAEGER_AGENT_ENDPOINT`  | The Jaeger agent endpoint.e.g.：http\://localhost:14268/api/traces   |
| `max_concilient_exports` | 2       | `CNOSDB_MAX_CONCURRENT_EXPORTS` | The parallelism of the reporter on trace.Default value is 2         |
| `max_queue_size`         | 4096    | `CNOSDB_MAX_QUEUE_SIZE`         | Span Buffer max queue size.If the queue is full, it will drop span. |

```mdx-code-block
</APITable>
```

## `meta` file description

### Global Configuration

```mdx-code-block
<APITable>
```

| 参数                                                         | Default                | Environment Variables      | Description                                                               |
| ---------------------------------------------------------- | ---------------------- | -------------------------- | ------------------------------------------------------------------------- |
| Id                                                         | `1`                    | `CNOSSDB_ID`               | `meta` node's `id`, requires unique group                                 |
| Post                                                       | `127.0.0.1`            | `CNOSDB_HOST`              | `host` for communication with other nodes                                 |
| Ports                                                      | `8901`                 | `CNOSDB_PORT`              | `port` for communicating with other nodes                                 |
| data_path                             | `/var/lib/cnosdb/meta` | `CNOSDB_DATA_PATH`         | Path to the `meta` data store                                             |
| grpc_enable_gzip | `false`                | `CNOSSDB_GRPC_ENABLE_GZIP` | Interface data transfer for the `meta` service, if compression is enabled |

```mdx-code-block
</APITable>
```

### `[log]`

```mdx-code-block
<APITable>
```

| 参数      | Default           | Environment Variables | Description                                              |
| ------- | ----------------- | --------------------- | -------------------------------------------------------- |
| `level` | `info`            | `CNOSDB_LEVEL`        | Log level (debug, info, error, warn). |
| `path`  | `/var/log/cnosdb` | `CNOSDB_PATH`         | Log storage directory.                                   |

```mdx-code-block
</APITable>
```

### `[meta_init]`

```mdx-code-block
<APITable>
```

| 参数                 | Default                      | Environment Variables     | Description                   |
| ------------------ | ---------------------------- | ------------------------- | ----------------------------- |
| `cluster_name`     | `cluster_xxx`                | `CNOSDB_CLUSTER_NAME`     | Cluster name                  |
| `admin_user`       | `root`                       | `CNOSSDB_ADMIN_USER`      | System Administrator Username |
| `system_tenant`    | `cnosdb`                     | `CNOSSDB_SYSTEM_TENANT`   | Default Tenant Name           |
| `default_database` | `["public", "usage_schema"]` | `CNOSDB_DEFAULT_DATABASE` | Database created by default   |

```mdx-code-block
</APITable>
```

### `[heartbeat]`

```mdx-code-block
<APITable>
```

| 参数                           | Default |                                                                                                    | Description                                                         |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `heartbeat_recheck_interval` | 300     | "CNOSDB_HEARTBEAT_RECHECK_INTERVAL" | How often to check the state of the CnosDB node in：seconds.         |
| `heartbeat_expired_interval` | 300     | "CNOSDB_HEARTBEAT_EXPIRED_INTERVAL" | How long is the CnosDB node not reporting an anomaly, unit：seconds. |

```mdx-code-block
</APITable>
```
