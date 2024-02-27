---
title: Configuration
order: 6
---

Import Tabs from '@theme/Tabs';
import tab from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

This section describes how to set up the CnosDB configuration.

CSDB configuration file is in TOML format.

> TOML syntax reference：[https://toml.io](https://toml.io/cn/v1.0.0)

Use the `cnosdb config` command to create default configuration files, such as：

```shell
cnosdb run config > ./cnosdb.conf
```

Use the \`cnosdb check server-config <path>command to check if configuration file is valid, such as：

```shell
cnosdb check server-config ./cnosdb.conf
```

Use the `cnosdb` command to specify the configuration file to start：

```
cnosdb --config ./cnosdb.conf
```

## File Description

### Global Configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| 参数                   | Default     | Description                                                                                                                                                                                                                                                                                                                                   |
| -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled` | `false`     | Turn off CnosDB to automatically report telemetric data and track usage rates of CnosDB versions for the continued development of CnosDB.Report data every 24 hours, each field contains：instance time, operating system type, database version, location of instance operation (only to provincial or continental level). |
| `host`               | `localhost` | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                         |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| 参数                   | Default                    | Description                                                                                                                                                                                                                                                                                                                                   |
| -------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reporting_disabled` | `false`                    | Turn off CnosDB to automatically report telemetric data and track usage rates of CnosDB versions for the continued development of CnosDB.Report data every 24 hours, each field contains：instance time, operating system type, database version, location of instance operation (only to provincial or continental level). |
| `host`               | `localhost`                | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                         |
| `license_file`       | `/etc/cnosdb/license.json` | Use to specify the location of the `License` file.                                                                                                                                                                                                                                                                                            |

</TabItem>

</Tabs>

### `[deployment]`

| 参数       | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                     |
| -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`   | `query_tskv` | Deployment mode, optional： `tskv`, `query`, `query_tskv`, `singleton`.  `tskv`: Only the `tskv` engine, requires a Meta service address. `query`: Only the `query` engine, requires a `meta` service address. The `query_tskv`: `query` and `tskv` engines are deployed and require a `meta` service address. `singleton`: Deploy single version without specifying the `meta` service address. |
| `cpu`    | `10`         | Number of cpu nucleus to run                                                                                                                                                                                                                                                                                                                                                                    |
| `memory` | `16`         | Maximum memory used for running node, unit：(G)                                                                                                                                                                                                                                                                                                                               |

### `[query]`

| 参数                       | Default     | Description                                                                   |
| ------------------------ | ----------- | ----------------------------------------------------------------------------- |
| `max_server_connections` | `10240`     | Maximum number of concurrent connection requests.                             |
| `query_sql_limit`        | `16777216`  | Maximum number of bytes per SQL query request, unit：Bytes                     |
| `write_sql_limit`        | `167772160` | Maximum number of bytes per Line Protocol to write to the request, unit：Bytes |
| `auth_enabled`           | `false`     | Whether to check the permissions of the user.                                 |
| `read_timeout_ms`        | `3000`      | `query` visits the timeout of `tskv` in units：`ms`                            |
| `write_timeout_ms`       | `3000`      | Timeout for writing to `tskv` in unit：`ms`.                                   |
| `stream_trigger_cpu`     | `1`         | Number of CPUs to prepare streams for computing tasks                         |
| `stream_executor_cpu`    | `2`         | Number of CPUs to perform streaming tasks                                     |

### `[storage]`

| 参数                              | Default                   | Description                                                                           |
| ------------------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | Datastore directory.                                                                  |
| `max_summary_size`              | `128M`                    | Maximum size of a single Summary log.                                                 |
| `base_file_size`                | `16M`                     | Single file data size.                                                                |
| `flush_req_channel_cap`         | `16`                      | Cumulative flush task ceiling.                                                        |
| `max_cached_readers`            | `32`                      | Maximum number of file handles opened in each vnode (for queries). |
| `max_level`                     | `4`                       | Maximum number of LSM, range 0-4.                                                     |
| `compact_trigger_file_num`      | `4`                       | Number of files to trigger compaction.                                                |
| `compact_trigger_cold_duration` | `1h`                      | Compatibility is triggered.                                                           |
| `max_compact_size`              | `2G`                      | The maximum selected file size for compaction.                                        |
| `max_concurrent_compact`        | `4`                       | Maximum number of compaction tasks to be performed simultaneously.                    |
| `strict_write`                  | `false`                   | Whether to enable strict writing.                                                     |
| `copyinto_trigger_flush_size`   | `128M`                    | `COPY INTO` Export triggers the memory size of the disk.                              |

### `[wal]`

| 参数                              | Default               | Description                                                |
| ------------------------------- | --------------------- | ---------------------------------------------------------- |
| `enabled`                       | `true`                | Whether to enable WAL.                                     |
| `path`                          | `/var/lib/cnosdb/wal` | WAL Storage Directory.                                     |
| `wal_req_channel_cap`           | `64`                  | Cumulative write WAL task ceiling.                         |
| `max_file_size`                 | `1G`                  | Maximum size of a single WAL.                              |
| `flush_trigger_total_file_size` | `2G`                  | Flash when all WAL sizes reach this value.                 |
| `sync`                          | `false`               | Whether to sync for each writing.                          |
| `sync_interval`                 | `0`                   | Synchronize WAL time intervals, units：h, m, s, ms, uss, ns |

### `[cache]`

| 参数                     | Default                    | Description                            |
| ---------------------- | -------------------------- | -------------------------------------- |
| `max_buff_size`        | `128M`                     | Maximum active cache size.             |
| `max_immutable_number` | `4`                        | Maximum number of inactive cache.      |
| `partition`            | Equivalent to system `CPU` | number of partitions to memcache cache |

### `[log]`

| 参数            | Default                       | Description                                              |
| ------------- | ----------------------------- | -------------------------------------------------------- |
| `level`       | `info`                        | Log level (debug, info, error, warn). |
| `path`        | `/var/log/cnosdb`             | Log storage directory.                                   |
| `tokio_trace` | `6 addr = "127.0.0.1:6669" }` | Tokio tracking, by default.                              |

### `[security]`

| 参数           | Default | Description       |
| ------------ | ------- | ----------------- |
| `tls_config` | None    | TLS Configuration |

### `[security.tls_config]`(optional)

| 参数            | Default | Description                 |
| ------------- | ------- | --------------------------- |
| `certificate` | None    | Certificate for TLS Service |
| `private_key` | None    | Private key for TLS service |

### `[cluster]`

| 参数                       | Default          | Description                                                       |
| ------------------------ | ---------------- | ----------------------------------------------------------------- |
| `name`                   | `cluster_xxx`    | Node name.                                                        |
| `meta_service_addr`      | `127.0.0.1:8901` | Remote `meta` service address.                                    |
| `http_listen_port`       | `8902`           | HTTP service listener port.                                       |
| `grpc_listen_port`       | `8903`           | GRPC service listener port.                                       |
| `flight_rpc_listen_port` | `8904`           | Flight RPC service listen port.                                   |
| `tcp_listen_port`        | `8905`           | TCP service listener port.                                        |
| `vector_listen_port`     | `8906`           | Used to listen for data written by [Vector](https://vector.dev/). |

### `[hintedoff]`

| 参数        | Default             | Description                                                |
| --------- | ------------------- | ---------------------------------------------------------- |
| `enable`  | `true`              | Whether to enable the HIntedOff service.                   |
| `path`    | `/var/lib/cnosdb/h` | HintedOff storage directory.                               |
| `threads` | `3`                 | Number of conjunctions to process the Hinted handoff data. |

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### `[subscription]`

| 参数             | Default | Description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| `cache`        | `1024`  | Size of cache, unit：bits write before sending forward    |
| `Conciliation` | `8`     | Number of parallel requests to process forward requests. |
| `timeout`      | `1000`  | Timeout for forward request, unit：seconds.               |

</TabItem>

</Tabs>

### `[heartbeat]`

| 参数                         | Default | Description                                                                                                          |
| -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `report_time_interval_sec` | `30`    | Time interval between reporting heart, disk balance and other information on this node to `meta` service in：seconds. |

### `[node_basic]`

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

| 参数                 | Default | Description                                                                          |
| ------------------ | ------- | ------------------------------------------------------------------------------------ |
| `node_id`          | `1001`  | Node ID.                                                                             |
| `cold_data_server` | `false` | Whether to stop creating Vnode on this node.                                         |
| `store_metrics`    | `true`  | Whether to track the usage of this node and store it in the `usage_schema` database. |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| 参数                 | Default   | Description                                                                          |
| ------------------ | --------- | ------------------------------------------------------------------------------------ |
| `node_id`          | `1001`    | Node ID.                                                                             |
| `cold_data_server` | `false`   | Whether to stop creating Vnode on this node.                                         |
| `store_metrics`    | `true`    | Whether to track the usage of this node and store it in the `usage_schema` database. |
| `location`         | `default` | Define instance deployment location.                                                 |




### `[trace]`

| 参数                   | Default | Description                                                                      |
| -------------------- | ------- | -------------------------------------------------------------------------------- |
| `auto_generate_span` | `false` | Whether to generate root automatically if the client does not carry span context |

### `[trace.log]` (optional)

| 参数     | Default | Description         |
| ------ | ------- | ------------------- |
| `path` | None    | Trace Log File Path |

### `[trace.jaeger]` (optional)

| 参数                       | Default | Note                                                                |
| ------------------------ | ------- | ------------------------------------------------------------------- |
| `jaeger_agent_endpoint`  | None    | The Jaeger agent endpoint.e.g.：http\://localhost:14268/api/traces   |
| `max_concilient_exports` | 2       | The parallelism of the reporter on trace.Default value is 2         |
| `max_queue_size`         | 4096    | Span Buffer max queue size.If the queue is full, it will drop span. |

## `meta` file description

### Global Configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| 参数                                                            | Default                         | Description                               |
| ------------------------------------------------------------- | ------------------------------- | ----------------------------------------- |
| Id                                                            | `1`                             | `meta` node's `id`, requires unique group |
| Post                                                          | `127.0.0.1`                     | `host` for communication with other nodes |
| Ports                                                         | `8901`                          | `port` for communicating with other nodes |
| snapshot_path                            | `/var/lib/cnosdb/meta/snapshot` |                                           |
| journal_path                             | `/var/lib/cnosdb/meta/journal`  |                                           |
| snapshot_per_events | `500`                           |                                           |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| 参数                             | Default                         | Description                                        |
| ------------------------------ | ------------------------------- | -------------------------------------------------- |
| `id`                           | `1`                             | `meta` node's `id`, requires unique group          |
| `host`                         | `127.0.0.1`                     | `host` for communication with other nodes          |
| `port`                         | `8901`                          | `port` for communicating with other nodes          |
| `license_file`                 | `/etc/cnosdb/license.json`      | Use to specify the location of the `License` file. |
| `snapshot_path`                | `/var/lib/cnosdb/meta/snapshot` |                                                    |
| `journal_path`                 | `/var/lib/cnosdb/meta/journal`  |                                                    |
| `snapshot_per_events`          | `500`                           |                                                    |
| `auto_migrate_vnodes_duration` | `0`                             |                                                    |

</TabItem>

</Tabs>

### `[log]`

| 参数      | Default           | Description                                              |
| ------- | ----------------- | -------------------------------------------------------- |
| `level` | `info`            | Log level (debug, info, error, warn). |
| `path`  | `/var/log/cnosdb` | Log storage directory.                                   |

### `[meta_init]`

| 参数                 | Default                      | Description                   |
| ------------------ | ---------------------------- | ----------------------------- |
| `cluster_name`     | `cluster_xxx`                | Cluster name                  |
| `admin_user`       | `root`                       | System Administrator Username |
| `system_tenant`    | `cnosdb`                     | Default Tenant Name           |
| `default_database` | `["public", "usage_schema"]` | Database created by default   |

### `[heartbeat]`

| 参数                           | Default | Description                                                         |
| ---------------------------- | ------- | ------------------------------------------------------------------- |
| `heartbeat_recheck_interval` | 300     | How often to check the state of the CnosDB node in：seconds.         |
| `heartbeat_expired_interval` | 300     | How long is the CnosDB node not reporting an anomaly, unit：seconds. |
