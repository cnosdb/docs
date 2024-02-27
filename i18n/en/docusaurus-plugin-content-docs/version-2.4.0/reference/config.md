---
title: Configuration
order: 5
---

Import Tabs from '@theme/Tabs';
import tab from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

CnosDB Meta Configuration

The configuration adopts TOML syntax.

> TOML Syntax Reference: [https://toml.io](https://toml.io/cn/v1.0.0)

You can use `cnosdb config` command to create a default config file (v2.2.0), for example:

```shell
cnosdb config > /tmp/config.toml
```

You can use `cnosdb check server-config <path>` command to check a config file (v2.2.0), for example:

```shell
cnosdb check server-config /tmp/config.toml
```

Whether to enable Wal, default: false

```
`[deployment]` CnosDB startup configuration (v2.2.0)
```

## The detailed configuration file description is as follows:

### `[trace]` fFull link tracing configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters                                                                                                                                     | Default                   | Description                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled                                                                                                        | `false`                   | Turn off CnosDB to automatically report telemetric data and track usage rates of CnosDB versions for the continued development of CnosDB.Report data every 24 hours, each field contains： instance time, operating system type, database version, location of instance operation (only to provincial or continental level). |
| `raft_logs_to_keep` When using raft protocol for replication; How many raft logs each replication group keeps and how often to take snapshots. | `5000`                    | The number of entries left in the Raft log and write to snapshot every time these are checked.                                                                                                                                                                                                                                                 |
| `using_draft_replication`                                                                                                                      | `false`                   | Enable Rafah Copy Algorithm                                                                                                                                                                                                                                                                                                                    |
| `host` Node host.                                                                                                                              | `host`: host of Meta node | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                          |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters                                                                                                                                     | Default                    | Description                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled                                                                                                        | `false`                    | Turn off CnosDB to automatically report telemetric data and track usage rates of CnosDB versions for the continued development of CnosDB.Report data every 24 hours, each field contains：instance time, operating system type, database version, location of instance operation (only to provincial or continental level). |
| `raft_logs_to_keep` When using raft protocol for replication; How many raft logs each replication group keeps and how often to take snapshots. | `5000`                     |                                                                                                                                                                                                                                                                                                                                               |
| `using_draft_replication`                                                                                                                      | `false`                    |                                                                                                                                                                                                                                                                                                                                               |
| `host` Node host.                                                                                                                              | `host`: host of Meta node  | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                         |
| `license_file`                                                                                                                                 | `/etc/cnosdb/license.json` | Use to specify the location of the `License` file.                                                                                                                                                                                                                                                                                            |

</TabItem>

</Tabs>

## [deployment]

| Parameters | Default                                 | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode       | `[query]` query interface configuration | Deployment mode, select from [`tskv`,`query`, `query_tskv`, `singleton`], default: `query_tskv`  `tskv` : Deploying only tskv engine requires specifying a meta address. `query` : Deploying only the query engine requires specifying a meta address. `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified. `singleton` : Deploying a standalone version without specifying a meta address. |
| cpu        | `7`                                     | Number of cpu nucleus to run                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| memory     | `16`                                    | Maximum memory used for running node, unit：(G)                                                                                                                                                                                                                                                                                                                                                                                                                             |

### [query]

| Parameters                                                       | Default     | Description                                                                                              |
| ---------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| max_server_connections | `10240`     | Maximum number of concurrent connection requests.                                                        |
| query_sql_limit        | `16777216`  | Maximum number of bytes per SQL query request, unit：Bytes                                                |
| write_sql_limit        | `167772160` | line_protocol request, the maximum number of bytes in the request body, default: 16 |
| auth_enabled                                | `false`     | Whether to start checking user permissions, default is false.                                            |
| `read_timeout_ms`                                                | `2500`      | `query` visits the timeout of `tskv` in units：`ms`                                                       |
| `write_timeout_ms`                                               | `2500`      | Timeout for writing to `tskv` in unit：`ms`.                                                              |
| `[wal]` write pre-log configuration                              | `1`         | Number of CPUs to prepare streams for computing tasks                                                    |
| `[log]` runs log configuration                                   | `2`         | Number of CPUs to perform streaming tasks                                                                |

### [storage]

| Parameters                                                                                   | Default                                                | Description                                                                           |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| path                                                                                         | HintedOff storage directory, default: `/tmp/cnosdb/hh` | Data storage location                                                                 |
| max_summary_size                                   | `128M`                                                 | Maximum size of a single Summary log.                                                 |
| base_file_size                                     | `16M`                                                  | Single file data size, default: 16M                                                   |
| flush_req_channel_cap         | `16`                                                   | Cumulative flush task ceiling.                                                        |
| Maximum cache size, default: 134217728                                                       | `32`                                                   | Maximum number of file handles opened in each vnode (for queries). |
| max_level                                                               | `4`                                                    | LSM&apos;s maximum number of layers, value range 0-4, default: 4                 |
| compact_trigger_file_num      | `4`                                                    | Number of files to trigger compaction.                                                |
| compact_trigger_cold_duration | `1h`                                                   | Compatibility is triggered.                                                           |
| max_compact_size                                   | `2G`                                                   | The maximum selected file size for compaction.                                        |
| max_concurrent_compaction                          | `4`                                                    | Maximum number of compaction tasks to be performed simultaneously.                    |
| strict_write                                                            | `false`                                                | Whether to enable strict writing.                                                     |

### [wal]

| Parameters                                                                         | Default               | Description                                                                          |
| ---------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------ |
| enabled                                                                            | `true`                | Whether to enable WAL.                                                               |
| path                                                                               | `/var/lib/cnosdb/wal` | WAL Storage Directory.                                                               |
| wal_req_channel_cap | `64`                  | Cumulative write WAL task ceiling.                                                   |
| max_file_size                            | `1G`                  | The maximum size of a single WAL, default: 1G                                        |
| The number of files required to trigger the compaction, default: 4                 | `2G`                  | Flash when all WAL sizes reach this value.                                           |
| sync                                                                               | `false`               | Whether to sync for each writing.                                                    |
| sync_interval                                                 | `0`                   | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

### [cache]

| Parameters                                                     | Default                                                                | Description                                                               |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| max_buffer_size      | `128M`                                                                 | Maximum active cache size.                                                |
| max_immutable_number | `4`                                                                    | Maximum number of inactive cache.                                         |
| `partition`                                                    | Specify the number of CPU cores required for the instance, default: 10 | number of partitions to memcache cache, default value equals CPU quantity |

### [log]

| Parameters    | Default                             | Description                                    |
| ------------- | ----------------------------------- | ---------------------------------------------- |
| level         | `info`                              | Log level（debug、info、error、warn, default: info |
| path          | log storage path,default:`data/log` | Remote log path                                |
| `tokio_trace` | `6 addr = "127.0.0.1:6669" }`       | Tokio tracking, by default.                    |

### [security]

| Parameters                      | Default | Description                 |
| ------------------------------- | ------- | --------------------------- |
| tls_config | None    | Optional, TLS configuration |

### [security.tls_config]

| Parameters                       | Default | Description             |
| -------------------------------- | ------- | ----------------------- |
| certificate                      | None    | TLS service certificate |
| private_key | None    | TLS service private key |

### [cluster]

| Parameters                                                                            | Default          | Description                                                  |
| ------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------ |
| `name`                                                                                | ClusterName      | name                                                         |
| `[meta_init]`: example initializes related configuration information of Meta node     | `127.0.0.1:8901` | Remote Meta Service port                                     |
| http_listen_port                            | `8902`           | HTTP service listening port                                  |
| grpc_listen_port                            | `8903`           | GRPC service listening port                                  |
| flight_rpc_listen_port | `8904`           | Flight RPC service listening port                            |
| tcp_listen_port                             | `8905`           | TCP service listening port                                   |
| meta_service_port                           | `8906`           | Use to listen for [Vector](https://vector.dev/) written data |

### [hintedoff]

| Parameters | Default             | Description                                                |
| ---------- | ------------------- | ---------------------------------------------------------- |
| `enable`   | `true`              | Is the HIntedOff service enabled, default: true            |
| path       | `/var/lib/cnosdb/h` | HintedOff storage directory.                               |
| threads    | `3`                 | Number of conjunctions to process the Hinted handoff data. |

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### [subscription]

| Parameters  | Default | Description                                                                      |
| ----------- | ------- | -------------------------------------------------------------------------------- |
| cache       | `1024`  | cache size (bit) before sending and forwarding, default: 1028 |
| concurrency | `8`     | Number of parallel requests to process forward requests.                         |
| timeout     | `300`   | Timeout of forward request, unit：`s`.                                            |

</TabItem>

</Tabs>

### [heartbeat]

| Parameters                                                                               | Default | Description                                                                                                             |
| ---------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| report_time_interval_secs | `49`    | Time interval between reporting heart, disk balance and other information on this node to the `meta` service, unit：`s`. |

### [node_basic]

| Parameters                                                 | Default | Description                                                                          |
| ---------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| node_id                               | `1001`  | Interval for checking the heartbeat status of a node                                 |
| cold_data_server | `false` | Whether to stop creating Vnode on this node.                                         |
| store_metrics                         | `true`  | Whether to track the usage of this node and store it in the `usage_schema` database. |

### [trace]

| Parameters                                                   | Default | Description                                                                                                          |
| ------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------- |
| auto_generate_span | `false` | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

### [trace.log] (optional)

| Parameters | Default                             | Description         |
| ---------- | ----------------------------------- | ------------------- |
| path       | log storage path,default:`data/log` | trace log file path |

### [trace.jaeger] (optional)

| Parameters                                                       | Default                                    | Description                                                                                                                                   |
| ---------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| jaeger_agent_endpoint  | `[trace]` fFull link tracing configuration | the Jaeger agent endpoint.eg: http\://localhost:14268/api/tracese.g.：http\://localhost:14268/api/traces                                       |
| max_concurrent_exports | 2                                          | The parallelism of the reporter on trace.Default value is 2                                                                                   |
| max_queue_size         | 4096                                       | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096If the queue is full, it will drop span. |

## `meta` file description

### `[trace]` fFull link tracing configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters                     | Default                | Description                                                     |
| ------------------------------ | ---------------------- | --------------------------------------------------------------- |
| Node ID                        | `1`                    | `id` : id of Meta node, the value must be unique in the cluster |
| Post                           | `127.0.0.1`            | `host` for communication with other nodes                       |
| Ports                          | `8901`                 | `port` for communicating with other nodes                       |
| data_path | `/var/lib/cnosdb/meta` | `journal_path`: journal storage path of Meta node               |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters                                                  | Default                | Description                                                     |
| ----------------------------------------------------------- | ---------------------- | --------------------------------------------------------------- |
| Node ID                                                     | `1`                    | `id` : id of Meta node, the value must be unique in the cluster |
| Post                                                        | `127.0.0.1`            | `host` for communication with other nodes                       |
| Ports                                                       | `8901`                 | `port` for communicating with other nodes                       |
| data_path                              | `/var/lib/cnosdb/meta` | `journal_path`: journal storage path of Meta node               |
| meta_service_port | `0`                    |                                                                 |

</TabItem>

</Tabs>

### [log]

| Parameters | Default                             | Description                                    |
| ---------- | ----------------------------------- | ---------------------------------------------- |
| level      | `info`                              | Log level（debug、info、error、warn, default: info |
| path       | log storage path,default:`data/log` | Remote log path                                |

### [meta_init]

| Parameters                            | Default                      | Description                           |
| ------------------------------------- | ---------------------------- | ------------------------------------- |
| cluster_name     | ClusterName                  | Cluster Name                          |
| admin_user       | `root`                       | User name of the system administrator |
| system_tenant    | `cnosdb`                     | Name of the default tenant            |
| default_database | `["public", "usage_schema"]` | Default database created              |

### [heartbeat]

| Parameters                                                           | Default | Description                                                         |
| -------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| heartbeat_recheck_interval | 300     | How often to check the state of the CnosDB node in：seconds.         |
| heartbeat_expired_interval | 300     | How long is the CnosDB node not reporting an anomaly, unit：seconds. |
