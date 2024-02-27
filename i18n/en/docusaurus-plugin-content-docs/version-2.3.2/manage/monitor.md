---
title: Monitor
order: 8
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

### HTTP_DATA_IN

#### Name

http_data_in

#### Category

Count

#### Description

Data traffic written over http, excluding SQL.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| VALUE                        | The total write traffic in Bytes    |

### HTTP_DATA_OUT

#### Name

http_data_out

#### Category

Count

#### Description

The size of the Http return data

#### Tag

| Field                        | Description                                 |
| ---------------------------- | ------------------------------------------- |
| TIME                         | Time of record                              |
| DATABASE                     | Database name                               |
| NODE_ID | ID of data node                             |
| ENANT                        | Tenant name the database belongs to         |
| Database                     | DatabaseName                                |
| User                         | DatabaseName                                |
| VALUE                        | The total size of the read traffic in Bytes |

### HTTP_QUERIES

#### Name

http_queries

#### Category

Count

#### Description

This metric keeps track of the number of Http queries a user makes.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| VALUE                        | Query times                         |

### HTTP_WRITES

#### Name

http_writes

#### Category

Count

#### Description

This metric records the number of times a user writes via Http.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| VALUE                        | Number of times the user wrote      |

### HTTP_QUERY_DURATION

#### Name

http_query_duration

#### Category

Histogram

#### Description

Time spent querying through the Http interface.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| LE                           | Less than this time, in ms          |
| VALUE                        | Times                               |

### HTTP_WRITE_DURATION

#### Name

http_write_duration

#### Category

Histogram

#### Description

Time taken to write through the Http interface.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| LE                           | Less than this time, in ms          |
| VALUE                        | Times                               |

### COORD_DATA_IN

#### Name

coord_data_in

#### Category

Count

#### Description

Total size of the data accepted by the Coordinator when the data is written to the database.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| VALUE                        | Data size in bytes                  |

### COORD_DATA_OUT

#### Name

coord_data_out

#### Category

Count

#### Description

Total size of the data sent by the Coordinator when the data is read out of the database.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| VALUE                        | Data size in bytes                  |

### COORD_QUERIES

#### Name

coord_queries

#### Category

Count

#### Description

The number of times the data passes through the Coordinator during the query.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| VALUE                        | Times                               |

### COORD_WRITES

#### Name

coord_writes

#### Category

Count

#### Description

The number of times the data passes through the Coordinator during writing.

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| VALUE                        | Times                               |

### SQL_DATA_IN

#### Name

sql_data_in

#### Category

Count

#### Description

The size of the data written via sql, including INSERT, COPY statements

#### Tag

| Field                        | Description                         |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| ENANT                        | Tenant name the database belongs to |
| VALUE                        | Data size in bytes                  |

## Prometheus Monitor

Just add Job at the Prometheus configuration file.

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'cnosdb'
    static_configs:
      - targets: ['127.0.0.1:8902']
```

#### Parameter Description

`targets` is the adderss of CnosDB Http.

## Store to CnosDB

Change the `store_metrics` in [config](./cluster_expansion.md#configuration-cluster) to `true`.
