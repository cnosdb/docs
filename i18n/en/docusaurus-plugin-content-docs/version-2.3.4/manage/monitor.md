---
sidebar_position: 7
---

# Monitor

Currently, CnosDB metrics can be collected by Prometheus or stored on CnosDB.

If you would like to see more metrics supported by CnosDB, please send an ISSUE to the [repository](https://github.com/cnosdb).

## Data Node Monitor Metrics

### VNODE_DISK_STORAGE

#### Name

vnode_disk_store

#### Category

Gauge

#### Description

The disk that the Vnode occupies.

#### Tag

| Field                         | Description                           |
| ----------------------------- | ------------------------------------- |
| DATABASE                      | Database vnode belongs to             |
| NODE_ID  | ID of data node                       |
| ENANT                         | tenant vnode belongs to               |
| VNODE_ID | ID of Vnode                           |
| VALUE                         | Disk that the Vnode occupies in bytes |

### VNODE_CHE_SIZE

#### Name

vnode_cache_size

#### Category

Gauge

#### Description

The cache size that vnode occupies in bytes.

#### Tag

| Field                         | Description                            |
| ----------------------------- | -------------------------------------- |
| DATABASE                      | Database vnode belongs to              |
| NODE_ID  | ID of data node                        |
| ENANT                         | tenant vnode belongs to                |
| VNODE_ID | ID of Vnode                            |
| VALUE                         | Cache that the Vnode occupies in bytes |

### WRITE_DATA_IN

#### Name

write_data_in

#### Category

Count

#### Description

Data traffic written over http, excluding SQL.

#### Tag

| Field                        | Description                          |
| ---------------------------- | ------------------------------------ |
| TIME                         | Time of data_in |
| DATABASE                     | Database name                        |
| NODE_ID | ID of data node                      |
| ENANT                        | Tenant name the database belongs to  |
| VALUE                        | The total write traffic in Bytes     |

### SQL_DATA_IN

#### Name

sql_data_in

#### Category

Count

#### Description

Data traffic written by sql, including INSERT, COPY statements.

#### Tag

| Field                        | Description                          |
| ---------------------------- | ------------------------------------ |
| TIME                         | Time of data_in |
| DATABASE                     | Database name                        |
| NODE_ID | ID of data node                      |
| ENANT                        | Tenant name the database belongs to  |
| VALUE                        | The total write traffic in Bytes     |

### COORD_DATA_IN

#### Name

coord_data_in

#### Category

Count

#### Description

The total size of the written traffic when data is written to the database.

#### Tag

| Field                        | Description                          |
| ---------------------------- | ------------------------------------ |
| TIME                         | Time of data_in |
| DATABASE                     | Database name                        |
| NODE_ID | ID of data node                      |
| ENANT                        | Tenant name the database belongs to  |
| VALUE                        | The total write traffic in Bytes     |

### COORD_DATA_OUT

#### Name

coord_data_out

#### Category

Count

#### Description

Total outflow traffic for reading data from the database.

#### Tag

| Field                        | Description                                 |
| ---------------------------- | ------------------------------------------- |
| TIME                         | Time of data out                            |
| DATABASE                     | Database name                               |
| NODE_ID | ID of data node                             |
| ENANT                        | Tenant name the database belongs to         |
| VALUE                        | The total size of the read traffic in Bytes |

### HTTP_DATA_OUT

#### Name

http_data_out

#### Category

Count

#### Description

The size of the Http return data

#### Tag

| Field                        | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| TIME                         | Time of http_data_out |
| DATABASE                     | Database name                                                   |
| NODE_ID | ID of data node                                                 |
| ENANT                        | Tenant name the database belongs to                             |
| Database                     | DatabaseName                                                    |
| User                         | DatabaseName                                                    |
| VALUE                        | The total size of the read traffic in Bytes                     |

### USER_QUERIES

#### Name

user_queries

#### Category

Count

#### Description

The times the user queries from the database.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of queries                     |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| VALUE                        | Number of user queries              |

### USER_WRITES

#### Name

user_writes

#### Category

Count

#### Description

The times the user writes to the database.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of writes                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| VALUE                        | Number of times the user wrote      |

## Prometheus Monitor

Just add Job at the Prometheus configuration file.

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any time series scattered from this configuration.
  - job_name: 'cnosdb'
    static_configs:
      - targets: ['127.0.0.1:8902']
```

#### Parameter Description

`targets` is the adderss of CnosDB Http.

## Store to CnosDB

Change the `store_metrics` in [config](./cluster_expansion.md#configuration-cluster) to `true`.
