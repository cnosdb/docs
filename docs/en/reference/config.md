---
title: Configuration
order: 6
---

# Configuration

## Introduction

The configuration adopts TOML syntax.

- deployment CnosDB startup configuration (v2.2.0)
- query query interface configuration
- storage storage configuration
- wal write pre-log configuration
- cache cache configuration
- log runs log configuration
- security configuration
- cluster Cluster configuration
- hintedoff HintedOff Configuration

## [deployment] (v2.2.0)

| Parameter    | Description                                                                   |
|--------------|-------------------------------------------------------------------------------|
| mode         | Deployment mode, select from ['tskv ',' query ',' query_tskv ',' singleton '] |
| cpu          | Specify the number of CPU cores required for the instance                     |
| memory       | line_protocol request, the maximum number of bytes in the request body        |

### [deployment.mode]
- tskv: Deploying only tskv engine requires specifying a meta address
- query: Deploying only the query engine requires specifying a meta address
- query_tskv: Both query and tskv engines are deployed, and a meta address needs to be specified
- singleton: Deploying a standalone version without specifying a meta address


## [query]

| Parameter              | Description                                                                   |
|------------------------|-------------------------------------------------------------------------------|
| max_server_connections | Maximum concurrent connection request                                         |
| query_sql_limit        | The maximum SQL accounting when the request is requested                      |
| write_sql_limit        | When writing a request on LINE_PROTOCOL, request  the maximum number of bytes |
| auth_enabled           | Whether to start checking user permissions                                    |


## [storage]

| Parameter                     | Description                                                                                  |
|-------------------------------|----------------------------------------------------------------------------------------------|
| path                          | Data storage location                                                                        |
| max_summary_size              | The largest summary log size is used to restore data in the database, default: 128M     |
| base_file_size                | Single file data size, default: 16M                                                          |
| flush_req_channel_cap         | Cumulative upper limit of persistence tasks, default: 16                                     |
| max_level                     | LSM&apos;s maximum number of layers, value range 0-4, default: 4                                  |
| compact_trigger_file_num      | The number of files required to trigger the compaction, default: 4                           |
| compact_trigger_cold_duration | If there is no operation within the time period, a compaction will be triggered, default: 1h |
| max_compact_size              | Maximum compression size, default: 2G                                                        |
| max_concurrent_compaction     | The maximum number of concurrent compaction tasks, default: 4                                |
| strict_write                  | Whether it is strictly written, default: false                                               |

## [wal]

| Parameter | Description                                     |
|-----------|-------------------------------------------------|
| wal_req_channel_cap | Maximum accumulated write WAL tasks, default: 64 |
| enabled   | Whether to enable Wal, default: false           |
| path      | Remote log path                                 |
| max_file_size | The maximum size of a single WAL, default: 1G |
| sync      | Synchronous Write WAL Remote Log, Default False |
| sync_interval | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

## [cache]

| Parameter            | Description                            |
|----------------------|----------------------------------------|
| max_buffer_size      | Maximum cache size, default: 134217728 |
| max_immutable_number | ImmemTable maximum, default: 4         |

## [log]

| Parameter | Description                                         |
|-----------|-----------------------------------------------------|
| level     | Log Level (Debug, Info, Error, Warn), Default: Info |
| path      | Log storage location                                |

## [security]
| Parameter  | Description                 |
|------------|-----------------------------|
| tls_config | Optional, TLS configuration |

### [security.tls_config]
| Parameter   | Description             |
|-------------|-------------------------|
| certificate | TLS service certificate |
| private_key | TLS service private key |

## [cluster]

| Parameter                     | Description               |
|------------------------|------------------|
| node_id                | Node ID             |
| name                   | Node Name             |
| meta_service_addr      | Remote Meta Service Address       |
| http_listen_addr       | HTTP service listening address       |
| grpc_listen_addr       | GRPC service listening address       |
| tcp_listen_addr        | TCP service listening address        |
| flight_rpc_listen_addr | Flight RPC service listening address |

## [hintedoff]

| Parameter     | Description              |
|--------|-----------------|
| enable | Is the HIntedOff service enabled|
| path   | HintedOff storage directory     |

## reporting_disabled

**Note**：If close information collection

The CnosDB collects information to better improve the product

We do not collect user data, we only collect

- Database instance running time
- Operating system type and architecture run by database instance.
- Database version
- Areas run by database instances, only at the provincial level, state level

You can set this as True to shut down information collection at the top of the configuration file.
```
reporting_disabled = true
```
