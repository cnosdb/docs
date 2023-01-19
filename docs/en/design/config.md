---
title: Configuration
order: 2
---

The configuration adopts TOML syntax.

- query query interface configuration
- storage storage configuration
- wal write pre-log configuration
- cache cache configuration
- log runs log configuration
- security configuration

## [query]

| Parameter                     | Description                           |
|------------------------|------------------------------|
| max_server_connections | Maximum concurrent connection request                   |
| query_sql_limit        | The maximum SQL accounting when the request is requested              |
| write_sql_limit        | When writing a request on LINE_PROTOCOL, request  the maximum number of bytes |

## [storage]

| Parameter                 | Description                                                                              |
| -------------------- |------------------------------------------------------------------------------------------|
| path                 | Data storage location                                                                    |
| max_summary_size     | The largest summary log size is used to restore data in the database, default: 134217728 |
| max_level            | LSM&apos;s maximum number of layers, value range 0-4, default: 4                         |
| base_file_size       | Single file data size, default: 16777216                                                 |
| compact_trigger      | Trigger the number of files file, default: 4                                             |
| max_compact_size     | Maximum compression size, default: 2147483648                                            |
| dio_max_resident     | Document IO&apos;s maximum resident Page, default: 1024                                  |
| dio_max_non_resident     | Document IO Maximum Non-residing Page Quantity, Default: 1024                            |
| dio_page_len_scale     | File IO Page Zoom ratio, default: 1                                                                     |
| strict_write     | Whether it is strictly written, default is False                                                                          |

## [wal]

| Parameter    | Description |
| ------- | ---- |
| enabled | Whether to enable Wal, default: false   |
| path    | Remote log path     |
| sync    | Synchronous Write WAL Remote Log, Default False     |

## [cache]

| Parameter                 | Description |
| -------------------- | ---- |
| max_buffer_size      |  Maximum cache size, default: 134217728    |
| max_immutable_number |  ImmemTable maximum, default: 4    |

## [log]

| Parameter  | Description |
| ----- | ---- |
| level |  Log Level (Debug, Info, Error, Warn), Default: Info   |
| path  |  Log storage location    |

## [security]
| Parameter | Description       |
| ---  |----------|
| tls_config | Optional, TLS configuration |

### [security.tls_config]
|Parameter | Description       |
|---|----------|
|certificate| TLS service certificate |
|private_key| TLS service private key |

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
