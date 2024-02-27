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

> 如果用户未指定，则程序在 `/etc/cnosdb/cnosdb.conf`，`$HOME/cnosdb/cnosdb.conf`位置先寻找配置，没有找到则使用默认配置

```
`[deployment]` CnosDB startup configuration (v2.2.0)
```

You can set this as True to shut down information collection at the top of the configuration file.

## Environment Variables

All settings in the configuration file can be set or overridden using environment variables.If present in both file and environment variables, environmental variables will prevail and the values in the configuration file will be ignored.

To make these settings available for CnosDB using environment variables, they must use the following format：

```shell
NOSDB_REPORTING_DISABLED=false
```

## The detailed configuration file description is as follows:

This section describes how each configuration is configured and how it is used.

### `[trace]` fFull link tracing configuration

```mdx-code-block
<APITable>
```

| Parameters                                                                                                                                     | Default                    | Environment Variables                                                                          | Description                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled                                                                                                        | `false`                    | `CNOSDB_REPORTING_DISABLED`                                                                    | Turn off CnosDB to automatically report telemetric data and track usage rates of CnosDB versions for the continued development of CnosDB.Report data every 24 hours, each field contains：instance time, operating system type, database version, location of instance operation (only to provincial or continental level). |
| `raft_logs_to_keep` When using raft protocol for replication; How many raft logs each replication group keeps and how often to take snapshots. | `5000`                     | `CNOSDB_RAFT_LOGS_TO_KEEP`                                                                     | The number of entries left in the Rafah log and write to snapshot every time                                                                                                                                                                                                                                                                  |
| `using_draft_replication`                                                                                                                      | `false`                    | "CNOSDB_USING_RAFT_REPLICATION" | Enable Rafah Copy Algorithm                                                                                                                                                                                                                                                                                                                   |
| `host` Node host.                                                                                                                              | `host`: host of Meta node  | **Note**: If close information collection                                                      | Used to communicate with other nodes.                                                                                                                                                                                                                                                                                                         |
| `license_file`                                                                                                                                 | `/etc/cnosdb/license.json` | `CNOSDB_LICENSE_FILE`                                                                          | Enterprise version configuration, used to specify the location of the `License` file.                                                                                                                                                                                                                                                         |

```mdx-code-block
</APITable>
```

### [deployment]

```mdx-code-block
<APITable>
```

| Parameters | Default                                 | Environment Variables | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | --------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode       | `[query]` query interface configuration | `CNOSDB_MODE`         | Deployment mode, select from [`tskv`,`query`, `query_tskv`, `singleton`], default: `query_tskv`  `tskv` : Deploying only tskv engine requires specifying a meta address. `query` : Deploying only the query engine requires specifying a meta address. `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified. `singleton` : Deploying a standalone version without specifying a meta address. |
| cpu        | Equivalent Node Core                    | `CNOSDB_CPU`          | Number of cpu nucleus to run                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| memory     | Equivalent nodes CPU                    | **TOML Key**          | Maximum memory used for running node, unit：(G)                                                                                                                                                                                                                                                                                                                                                                                                                             |

```mdx-code-block
</APITable>
```

### [query]

```mdx-code-block
<APITable>
```

| Parameters                                                       | Default     | Environment Variables                                                          | Description                                                                                              |
| ---------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| max_server_connections | `10240`     | Maximum concurrent connection request, default is 10240.                       | Maximum number of concurrent connection requests.                                                        |
| query_sql_limit        | `16777216`  | The maximum SQL accounting when the request is requested, default is 16777216. | Maximum number of bytes per SQL query request, unit：Bytes                                                |
| write_sql_limit        | `167772160` | Cumulative upper limit of persistence tasks, default: 16                       | line_protocol request, the maximum number of bytes in the request body, default: 16 |
| auth_enabled                                | `false`     | reporting_disabled = true                                 | Whether to start checking user permissions, default is false.                                            |
| `read_timeout_ms`                                                | `2500`      | `CNOSDB_READ_TIMEOUT_MS`                                                       | `query` visits the timeout of `tskv` in units：`ms`                                                       |
| `write_timeout_ms`                                               | `2500`      | `CNOSDB_WRITE_TIMEOUT_MS`                                                      | Timeout for writing to `tskv` in unit：`ms`                                                               |
| `[wal]` write pre-log configuration                              | `1`         | `CNOSDB_STREAM_TRIGGER_PU`                                                     | Number of CPUs to prepare streams for computing tasks                                                    |
| `[log]` runs log configuration                                   | `2`         | `CNOSDB_STREAM_EXECUTOR_CPU`                                                   | Number of CPUs to perform streaming tasks                                                                |

```mdx-code-block
</APITable>
```

### [storage]

```mdx-code-block
<APITable>
```

| Parameters                                                                                                                                          | Default                                                | Environment Variables                                                                                                                               | Description                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| path                                                                                                                                                | HintedOff storage directory, default: `/tmp/cnosdb/hh` | The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows: | Data storage location                                                    |
| max_summary_size                                                                                          | `128M`                                                 | Maximum accumulated write WAL tasks, default: 64                                                                                                    | Maximum size of a single Summary log.                                    |
| base_file_size                                                                                            | `16M`                                                  | The largest summary log size is used to restore data in the database, default: 128M                                                                 | Single file data size, default: 16M                                      |
| flush_req_channel_cap                                                                | `16`                                                   | `CNOSDB_FLUSH_REQ_CHANNEL_CAP`                                                                                                                      | Cumulative flush task ceiling.                                           |
| max_level                                                                                                                      | `4`                                                    | Areas run by database instances, only at the provincial level, state level                                                                          | LSM&apos;s maximum number of layers, value range 0-4, default: 4    |
| compact_trigger_file_num                                                             | `4`                                                    | `CNOSSDB_COMPACT_TRIGGER_FILE_NUM`                                                                                                                  | Number of files to trigger compaction.                                   |
| compact_trigger_cold_duration                                                        | `1h`                                                   | `CNOSDB_COMPAT_TRIGGER_COLD_DURATION`                                                                                                               | Compatibility is triggered.                                              |
| max_compact_size                                                                                          | `2G`                                                   | ImmemTable maximum, default: 4                                                                                                                      | The maximum selected file size for compaction.                           |
| max_concurrent_compaction                                                                                 | `4`                                                    | The maximum number of concurrent compaction tasks, default: 4                                                                                       | Maximum number of compaction tasks to be performed simultaneously.       |
| strict_write                                                                                                                   | `false`                                                | `CNOSDB_STRICT_WRITE`                                                                                                                               | Whether to enable strict writing.                                        |
| `Reserve_space`                                                                                                                                     | `0`                                                    | `CNOSDB_RESERVE_SPACE`                                                                                                                              | The size of the retained space of the system.                            |
| `using_raft_replication` Raft protocol is used for replica replication. Note: it is not stable at present, so it is not recommended for online use. | `128M`                                                 | `COPYINTO_TRIGGER_FLUSH_SIZE`                                                                                                                       | `COPY INTO` Export triggers the memory size of the disk.Version：>2.3.4.3 |

```mdx-code-block
</APITable>
```

### [wal]

```mdx-code-block
<APITable>
```

| Parameters                                                                         | Default               | Environment Variables                                                                                                                               | Description                                                                          |
| ---------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| enabled                                                                            | `true`                | **TOML TABLE**                                                                                                                                      | Whether to enable WAL.                                                               |
| path                                                                               | `/var/lib/cnosdb/wal` | The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows: | WAL Storage Directory.                                                               |
| wal_req_channel_cap | `64`                  | Synchronous Write WAL Remote Log, Default False                                                                                                     | Cumulative write WAL task ceiling.                                                   |
| max_file_size                            | `1G`                  | When writing a request on LINE_PROTOCOL, request  the maximum number of bytes, default is 16777216.                            | The maximum size of a single WAL, default: 1G                                        |
| The number of files required to trigger the compaction, default: 4                 | `2G`                  | "CNOSDB_FLUSH_TRIGGER_TOTAL_FILE_SIZE"     | Flash when all WAL sizes reach this value.                                           |
| sync                                                                               | `false`               | `[security]` security configuration                                                                                                                 | Whether to sync for each writing.                                                    |
| sync_interval                                                 | `0`                   | `CNOSDB_SYNCC_INTERVAL`                                                                                                                             | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

```mdx-code-block
</APITable>
```

### [cache]

```mdx-code-block
<APITable>
```

| Parameters                                                     | Default                                                                | Environment Variables                                       | Description                                                               |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| max_buffer_size      | `128M`                                                                 | Maximum cache size, default: 134217728                      | Maximum active cache size.                                                |
| max_immutable_number | `4`                                                                    | Number of concurrent processing of handoff data, default: 3 | Maximum number of inactive cache.                                         |
| `partition`                                                    | Specify the number of CPU cores required for the instance, default: 10 | `CNOSSDB_PARTITION`                                         | number of partitions to memcache cache, default value equals CPU quantity |

```mdx-code-block
</APITable>
```

### [log]

```mdx-code-block
<APITable>
```

| Parameters | Default                             | Environment Variables                                                                                                                               | Description                                    |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| level      | `info`                              | `CNOSDB_LEVEL`                                                                                                                                      | Log level（debug、info、error、warn, default: info |
| path       | log storage path,default:`data/log` | The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows: | Remote log path                                |

```mdx-code-block
</APITable>
```

### [security]

```mdx-code-block
<APITable>
```

| Parameters                      | Default | Environment Variables | Description                 |
| ------------------------------- | ------- | --------------------- | --------------------------- |
| tls_config | None    | `CNOSSDB_TLS_CONFIG`  | Optional, TLS configuration |

```mdx-code-block
</APITable>
```

### [security.tls_config]

```mdx-code-block
<APITable>
```

| Parameters                       | Default | Environment Variables | Description             |
| -------------------------------- | ------- | --------------------- | ----------------------- |
| certificate                      | None    | `CNOSDB_CERTIFICATE`  | TLS service certificate |
| private_key | None    | **TOML KEY**          | TLS service private key |

```mdx-code-block
</APITable>
```

### [cluster]

```mdx-code-block
<APITable>
```

| Parameters                                                                            | Default          | Environment Variables                                                                       | Description                                                  |
| ------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `name`                                                                                | ClusterName      | Operating system type and architecture run by database instance.                            | name                                                         |
| `[meta_init]`: example initializes related configuration information of Meta node     | `127.0.0.1:8901` | `CNOSDB_META_SERVICE_ADDR`                                                                  | Remote Meta Service port                                     |
| http_listen_port                            | `8902`           | The configuration file consists of several TOML key-value pairs and tables, as shown below: | HTTP service listening port                                  |
| grpc_listen_port                            | `8903`           | `[storage]` storage configuration                                                           | GRPC service listening port                                  |
| flight_rpc_listen_port | `8904`           | `[hintedoff]` hintedOff configuration                                                       | Flight RPC service listening port                            |
| tcp_listen_port                             | `8905`           | `port`: port of Meta node                                                                   | TCP service listening port                                   |
| meta_service_port                           | `8906`           | "CNOSDB_VCTOR_LIST"                               | Use to listen for [Vector](https://vector.dev/) written data |

```mdx-code-block
</APITable>
```

### [hintedoff]

```mdx-code-block
<APITable>
```

| Parameters | Default             | Environment Variables                                                                                                                               | Description                                                |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `enable`   | `true`              | **TOML Value**                                                                                                                                      | Is the HIntedOff service enabled, default: true            |
| path       | `/var/lib/cnosdb/h` | The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows: | HintedOff storage directory.                               |
| threads    | `3`                 | `snapshot_per_events`: The Meta node does a snapshot interval                                                                                       | Number of conjunctions to process the Hinted handoff data. |

```mdx-code-block
</APITable>
```

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### [subscription]

```mdx-code-block
<APITable>
```

| Parameters  | Default | Environment Variables         | Description                                                                      |
| ----------- | ------- | ----------------------------- | -------------------------------------------------------------------------------- |
| cache       | `1024`  | `[cache]` cache configuration | cache size (bit) before sending and forwarding, default: 1028 |
| concurrency | `8`     | `CNOSDB_CONCURRENCY`          | Number of parallel requests to process forward requests.                         |
| timeout     | `1000`  | `CNOSDB_TIMEOUT`              | Timeout for forward request, unit：seconds.                                       |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>

### [heartbeat]

```mdx-code-block
<APITable>
```

| Parameters                                                                               | Default | Environment Variables          | Description                                                                                                          |
| ---------------------------------------------------------------------------------------- | ------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| report_time_interval_secs | `49`    | Database instance running time | Time interval between reporting heart, disk balance and other information on this node to `meta` service in：seconds. |

```mdx-code-block
</APITable>
```

### [node_basic]

```mdx-code-block
<APITable>
```

| Parameters                                                 | Default | Environment Variables                            | Description                                                                          |
| ---------------------------------------------------------- | ------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| node_id                               | `1001`  | Interval for checking whether a node is abnormal | Interval for checking the heartbeat status of a node                                 |
| cold_data_server | `false` | `CNOSDB_COLD_DATA_SERVER`                        | Whether to stop creating Vnode on this node.                                         |
| store_metrics                         | `true`  | `CNOSDB_STORE_METRICTS`                          | Whether to track the usage of this node and store it in the `usage_schema` database. |

```mdx-code-block
</APITable>
```

### [trace]

```mdx-code-block
<APITable>
```

| Parameters                                                   | Default | Environment Variables       | Description                                                                                                          |
| ------------------------------------------------------------ | ------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| auto_generate_span | `false` | `CNOSDB_AUTO_GENERATE_SPAN` | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

```mdx-code-block
</APITable>
```

### [trace.log] (optional)

```mdx-code-block
<APITable>
```

| Parameters | Default | Environment Variables                                                                                                                               | Description         |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| path       | None    | The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows: | trace log file path |

```mdx-code-block
</APITable>
```

### [trace.jaeger] (optional)

```mdx-code-block
<APITable>
```

| Parameters                                                       | Default | Environment Variables                                            | Description                                                                                                                                   |
| ---------------------------------------------------------------- | ------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| jaeger_agent_endpoint  | None    | `CNOSDB_JAEGER_AGENT_ENDPOINT`                                   | the Jaeger agent endpoint.eg: http\://localhost:14268/api/tracese.g.：http\://localhost:14268/api/traces                                       |
| max_concurrent_exports | 2       | `reporting_disabled` Whether to turn off information collection. | The parallelism of the reporter on trace.Default value is 2                                                                                   |
| max_queue_size         | 4096    | Maximum compression size, default: 2G                            | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096If the queue is full, it will drop span. |

```mdx-code-block
</APITable>
```

## `meta` file description

### `[trace]` fFull link tracing configuration

```mdx-code-block
<APITable>
```

| Parameters                     | Default                | Environment Variables                                             | Description                                                               |
| ------------------------------ | ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Node ID                        | `1`                    | If this field is true, it means storing metrics information to db | `id` : id of Meta node, the value must be unique in the cluster           |
| Post                           | `127.0.0.1`            | **Note**: If close information collection                         | `host` for communication with other nodes                                 |
| Ports                          | `8901`                 | `CNOSDB_PORT`                                                     | `port` for communicating with other nodes                                 |
| data_path | `/var/lib/cnosdb/meta` | We do not collect user data, we only collect                      | `journal_path`: journal storage path of Meta node                         |
| enable                         | `false`                | `CNOSSDB_GRPC_ENABLE_GZIP`                                        | Interface data transfer for the `meta` service, if compression is enabled |

```mdx-code-block
</APITable>
```

### [log]

```mdx-code-block
<APITable>
```

| Parameters | Default                             | Environment Variables                                                                                                                               | Description                                    |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| level      | `info`                              | `CNOSDB_LEVEL`                                                                                                                                      | Log level（debug、info、error、warn, default: info |
| path       | log storage path,default:`data/log` | The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows: | Remote log path                                |

```mdx-code-block
</APITable>
```

### [meta_init]

```mdx-code-block
<APITable>
```

| Parameters                            | Default                      | Environment Variables                                         | Description                           |
| ------------------------------------- | ---------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| cluster_name     | ClusterName                  | The CnosDB collects information to better improve the product | Cluster Name                          |
| admin_user       | `root`                       | `snapshot_path`: snapshot storage path of Meta node           | User name of the system administrator |
| system_tenant    | `cnosdb`                     | `CNOSSDB_SYSTEM_TENANT`                                       | Name of the default tenant            |
| default_database | `["public", "usage_schema"]` | Database version                                              | Default database created              |

```mdx-code-block
</APITable>
```

### [heartbeat]

```mdx-code-block
<APITable>
```

| Parameters                                                           | Default |                                                                                                    | Description                                                         |
| -------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| heartbeat_recheck_interval | 300     | "CNOSDB_HEARTBEAT_RECHECK_INTERVAL" | How often to check the state of the CnosDB node in：seconds.         |
| heartbeat_expired_interval | 300     | "CNOSDB_HEARTBEAT_EXPIRED_INTERVAL" | How long is the CnosDB node not reporting an anomaly, unit：seconds. |

```mdx-code-block
</APITable>
```
