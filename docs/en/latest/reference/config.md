---
title: Configuration
order: 6
---

# Configuration

## Introduction

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

The configuration file consists of several TOML key-value pairs and tables, as shown below:

**TOML Key**

- `reporting_disabled` Whether to turn off information collection.
- `host` Node host.

**TOML Value**

- `[deployment]` CnosDB startup configuration (v2.2.0)
- `[query]` query interface configuration
- `[storage]` storage configuration
- `[wal]` write pre-log configuration
- `[cache]` cache configuration
- `[log]` runs log configuration
- `[security]` security configuration
- `[cluster]` cluster configuration
- `[heartbeat]` heartbeat configuration (v2.3.0)
- `[node_basic]` node configuration (v2.3.0)
- `[hintedoff]` hintedOff configuration
- `[trace]` fFull link tracing configuration

The detailed configuration file description is as follows:

## \[deployment]

| Parameter    | Description                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| mode         | Deployment mode, select from [`tskv`,`query`, `query_tskv`, `singleton`], default: `query_tskv` |
| cpu          | Specify the number of CPU cores required for the instance, default: 10                          |
| memory       | line_protocol request, the maximum number of bytes in the request body, default: 16             |

Parameter **mode** can be selected from the following values:

- `tskv` : Deploying only tskv engine requires specifying a meta address.
- `query` : Deploying only the query engine requires specifying a meta address.
- `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified.
- `singleton` : Deploying a standalone version without specifying a meta address.

## reporting_disabled

**Note**: If close information collection

The CnosDB collects information to better improve the product

We do not collect user data, we only collect

- Database instance running time
- Operating system type and architecture run by database instance.
- Database version
- Areas run by database instances, only at the provincial level, state level

You can set this as True to shut down information collection at the top of the configuration file.

```toml
reporting_disabled = true
```

## host

**Description**: node host, used to communicate with other nodes, default: localhost.

## \[query]

| Parameter              | Description                                                                                         |
|------------------------|-----------------------------------------------------------------------------------------------------|
| max_server_connections | Maximum concurrent connection request, default is 10240.                                            |
| query_sql_limit        | The maximum SQL accounting when the request is requested, default is 16777216.                      |
| write_sql_limit        | When writing a request on LINE_PROTOCOL, request  the maximum number of bytes, default is 16777216. |
| auth_enabled           | Whether to start checking user permissions, default is false.                                       |

## \[storage]

| Parameter                     | Description                                                                                  |
|-------------------------------|----------------------------------------------------------------------------------------------|
| path                          | Data storage location                                                                        |
| max_summary_size              | The largest summary log size is used to restore data in the database, default: 128M          |
| base_file_size                | Single file data size, default: 16M                                                          |
| flush_req_channel_cap         | Cumulative upper limit of persistence tasks, default: 16                                     |
| max_level                     | LSM&apos;s maximum number of layers, value range 0-4, default: 4                             |
| compact_trigger_file_num      | The number of files required to trigger the compaction, default: 4                           |
| compact_trigger_cold_duration | If there is no operation within the time period, a compaction will be triggered, default: 1h |
| max_compact_size              | Maximum compression size, default: 2G                                                        |
| max_concurrent_compaction     | The maximum number of concurrent compaction tasks, default: 4                                |
| strict_write                  | Whether it is strictly written, default: false                                               |

## \[wal]


| Parameter           | Description                                                                          |
|---------------------|--------------------------------------------------------------------------------------|
| wal_req_channel_cap | Maximum accumulated write WAL tasks, default: 64                                     |
| enabled             | Whether to enable Wal, default: false                                                |
| path                | Remote log path                                                                      |
| max_file_size       | The maximum size of a single WAL, default: 1G                                        |
| sync                | Synchronous Write WAL Remote Log, Default False                                      |
| sync_interval       | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

## \[cache]

| Parameter            | Description                            |
|----------------------|----------------------------------------|
| max_buffer_size      | Maximum cache size, default: 134217728 |
| max_immutable_number | ImmemTable maximum, default: 4         |

## \[log]

| Parameter | Description                                         |
|-----------|-----------------------------------------------------|
| level     | Log Level (Debug, Info, Error, Warn), Default: Info |
| path      | Log storage location                                |

## \[security]

| Parameter  | Description                 |
|------------|-----------------------------|
| tls_config | Optional, TLS configuration |

### \[security.tls_config]

| Parameter   | Description             |
|-------------|-------------------------|
| certificate | TLS service certificate |
| private_key | TLS service private key |

## \[cluster]

| Parameter              | Description                       |
|------------------------|-----------------------------------|
| name                   | Cluster Name                      |
| meta_service_port      | Remote Meta Service port          |
| http_listen_port       | HTTP service listening port       |
| grpc_listen_port       | GRPC service listening port       |
| tcp_listen_port        | TCP service listening port        |
| flight_rpc_listen_port | Flight RPC service listening port |

## \[node_basic]

| Parameter        | Description                                                                     |
|------------------|---------------------------------------------------------------------------------|
| node_id          | Node ID                                                                         |
| cold_data_server | If this field is true, it means that the node is not used when allocating vnode |
| store_metrics    | If this field is true, it means storing metrics information to db               |

## \[heartbeat]


| Parameter                 | Description                                                                                                                  |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------|
| report_time_interval_secs | This field indicates how often the node reports the time stamp, disk remaining amount and other information to the meta node |

## \[hintedoff]

| Parameter | Description                                            |
|-----------|--------------------------------------------------------|
| enable    | Is the HIntedOff service enabled, default: true        |
| path      | HintedOff storage directory, default: `/tmp/cnosdb/hh` |

## \[subscription]

| Parameter   | Description                                                        |
|-------------|--------------------------------------------------------------------|
| cache       | cache size (bit) before sending and forwarding, default: 1028      |
| concurrency | number of concurrent requests processed for forwarding, default: 8 |
| timeout     | timeout period for forwarding requests (seconds), default: 300     |

## \[trace]

| Parameter          | Description                                                                                                          |
|--------------------|----------------------------------------------------------------------------------------------------------------------|
| auto_generate_span | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

### \[trace.log] (optional)

| Parameter | Description         |
|-----------|---------------------|
| path      | trace log file path |

### \[trace.jaeger] (optional)

| Parameter              | Description                                                                                           |
|------------------------|-------------------------------------------------------------------------------------------------------|
| jaeger_agent_endpoint  | the Jaeger agent endpoint.eg: http://localhost:14268/api/traces                                       |
| max_concurrent_exports | trace parallelism of the reporter, default value is 2                                                 |
| max_queue_size         | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096 |

# CnosDB Meta Configuration

The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows:

**TOML KEY**

- `id` : id of Meta node, the value must be unique in the cluster
- `host`: host of Meta node
- `port`: port of Meta node
- `snapshot_path`: snapshot storage path of Meta node
- `journal_path`: journal storage path of Meta node
- `snapshot_per_events`: The Meta node does a snapshot interval

**TOML TABLE**

- `[log]`: run log configuration
- `[meta_init]`: example initializes related configuration information of Meta node
- `[heartbeat]`:  check CnosDB node status configurations periodically

The detailed configuration file description is as follows:

## \[log]

| Parameter | Description                                    |
|-----------|------------------------------------------------|
| level     | Log level（debug、info、error、warn, default: info |
| path      | log storage path,default:`data/log`            |


## \[meta_init]

| Parameter        | Description                           |
|------------------|---------------------------------------|
| cluster_name     | ClusterName                           |
| admin_user       | User name of the system administrator |
| system_tenant    | Name of the default tenant            |
| default_database | Default database created              |

## \[heartbeat]

| Parameter                  | Description                                          |
|----------------------------|------------------------------------------------------|
| heartbeat_recheck_interval | Interval for checking the heartbeat status of a node |
| heartbeat_expired_interval | Interval for checking whether a node is abnormal     |