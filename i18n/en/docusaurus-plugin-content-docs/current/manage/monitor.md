---
sidebar_position: 7
---

# Monitor

Currently, CnosDB metrics can be collected by Prometheus or stored on CnosDB.

If you would like to see more metrics supported by CnosDB, please send an ISSUE to the [repository](https://github.com/cnosdb).

## Data Node Monitor Metrics

### VNODE_DISK_STORAGE

#### 名称

vnode_disk_storage

#### Category

Gauge

#### 描述

The disk that the Vnode occupies.

#### Tag

| Field                         | 描述                                    |
| ----------------------------- | ------------------------------------- |
| DATABASE                      | Database vnode belongs to             |
| NODE_ID  | ID of data node                       |
| TENANT                        | tenant vnode belongs to               |
| VNODE_ID | ID of Vnode                           |
| VALUE                         | Disk that the Vnode occupies in bytes |

### VNODE_CACHE_SIZE

#### 名称

vnode_cache_size

#### Category

Gauge

#### 描述

The cache size that vnode occupies in bytes.

#### Tag

| Field                         | 描述                                     |
| ----------------------------- | -------------------------------------- |
| DATABASE                      | Database vnode belongs to              |
| NODE_ID  | ID of data node                        |
| TENANT                        | tenant vnode belongs to                |
| VNODE_ID | ID of Vnode                            |
| VALUE                         | Cache that the Vnode occupies in bytes |

### HTTP_DATA_IN

#### 名称

http_data_in

#### Category

Count

#### 描述

Data traffic written over http, excluding SQL.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| VALUE                        | The total write traffic in Bytes    |

### HTTP_DATA_OUT

#### 名称

http_data_out

#### Category

Count

#### 描述

The size of the Http return data

#### Tag

| Field                        | 描述                                          |
| ---------------------------- | ------------------------------------------- |
| TIME                         | Time of record                              |
| DATABASE                     | Database name                               |
| NODE_ID | ID of data node                             |
| TENANT                       | Tenant name the database belongs to         |
| Database                     | DatabaseName                                |
| User                         | User name                                   |
| VALUE                        | The total size of the read traffic in Bytes |

### HTTP_QUERIES

#### 名称

http_queries

#### Category

Count

#### 描述

This metric keeps track of the number of Http queries a user makes.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| USER                         | User name                           |
| VALUE                        | Query times                         |

### HTTP_WRITES

#### 名称

http_writes

#### Category

Count

#### 描述

This metric records the number of times a user writes via Http.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| USER                         | User name                           |
| VALUE                        | 用户写入次数                              |

### HTTP_QUERY_DURATION

#### 名称

http_query_duration

#### Category

Histogram

#### 描述

Time spent querying through the Http interface.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| USER                         | User name                           |
| LE                           | Less than this time, in ms          |
| VALUE                        | Times                               |

### HTTP_WRITE_DURATION

#### 名称

http_write_duration

#### Category

Histogram

#### 描述

Time taken to write through the Http interface.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| USER                         | User name                           |
| LE                           | Less than this time, in ms          |
| VALUE                        | Times                               |

### COORD_DATA_IN

#### 名称

coord_data_in

#### Category

Count

#### 描述

Total size of the data accepted by the Coordinator when the data is written to the database.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| VALUE                        | Data size in bytes                  |

### COORD_DATA_OUT

#### 名称

coord_data_out

#### Category

Count

#### 描述

Total size of the data sent by the Coordinator when the data is read out of the database.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| VALUE                        | Data size in bytes                  |

### COORD_QUERIES

#### 名称

coord_queries

#### Category

Count

#### 描述

The number of times the data passes through the Coordinator during the query.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| VALUE                        | Times                               |

### COORD_WRITES

#### 名称

coord_writes

#### Category

Count

#### 描述

The number of times the data passes through the Coordinator during writing.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| VALUE                        | Times                               |

### SQL_DATA_IN

#### 名称

sql_data_in

#### Category

Count

#### 描述

The size of the data written via sql, including INSERT, COPY statements

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of record                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
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

#### 参数说明

`targets` is the adderss of CnosDB Http.

## Store to CnosDB

Change the `store_metrics` in [config](./cluster_expansion.md#configuration-cluster) to `true`.
