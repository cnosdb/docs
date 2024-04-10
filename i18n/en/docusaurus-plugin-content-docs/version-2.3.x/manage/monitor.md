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

### WRITE_DATA_IN

#### 名称

write_data_in

#### Category

Count

#### 描述

Data traffic written over http, excluding SQL.

#### Tag

| Field                        | 描述                                   |
| ---------------------------- | ------------------------------------ |
| TIME                         | Time of data_in |
| DATABASE                     | Database name                        |
| NODE_ID | ID of data node                      |
| TENANT                       | Tenant name the database belongs to  |
| VALUE                        | The total write traffic in Bytes     |

### SQL_DATA_IN

#### 名称

sql_data_in

#### Category

Count

#### 描述

Data traffic written by sql, including INSERT, COPY statements.

#### Tag

| Field                        | 描述                                   |
| ---------------------------- | ------------------------------------ |
| TIME                         | Time of data_in |
| DATABASE                     | Database name                        |
| NODE_ID | ID of data node                      |
| TENANT                       | Tenant name the database belongs to  |
| VALUE                        | The total write traffic in Bytes     |

### COORD_DATA_IN

#### 名称

coord_data_in

#### Category

Count

#### 描述

The total size of the written traffic when data is written to the database.

#### Tag

| Field                        | 描述                                   |
| ---------------------------- | ------------------------------------ |
| TIME                         | Time of data_in |
| DATABASE                     | Database name                        |
| NODE_ID | ID of data node                      |
| TENANT                       | Tenant name the database belongs to  |
| VALUE                        | The total write traffic in Bytes     |

### COORD_DATA_OUT

#### 名称

coord_data_out

#### Category

Count

#### 描述

Total outflow traffic for reading data from the database.

#### Tag

| Field                        | 描述                                          |
| ---------------------------- | ------------------------------------------- |
| TIME                         | Time of data out                            |
| DATABASE                     | Database name                               |
| NODE_ID | ID of data node                             |
| TENANT                       | Tenant name the database belongs to         |
| VALUE                        | The total size of the read traffic in Bytes |

### HTTP_DATA_OUT

#### 名称

http_data_out

#### Category

Count

#### 描述

The size of the Http return data

#### Tag

| Field                        | 描述                                                              |
| ---------------------------- | --------------------------------------------------------------- |
| TIME                         | Time of http_data_out |
| DATABASE                     | Database name                                                   |
| NODE_ID | ID of data node                                                 |
| TENANT                       | Tenant name the database belongs to                             |
| Database                     | DatabaseName                                                    |
| User                         | DatabaseName                                                    |
| VALUE                        | The total size of the read traffic in Bytes                     |

### USER_QUERIES

#### 名称

user_queries

#### Category

Count

#### 描述

The times the user queries from the database.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of queries                     |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| VALUE                        | 用户查询次数                              |

### USER_WRITES

#### 名称

user_writes

#### Category

Count

#### 描述

The times the user writes to the database.

#### Tag

| Field                        | 描述                                  |
| ---------------------------- | ----------------------------------- |
| TIME                         | Time of writes                      |
| DATABASE                     | Database name                       |
| NODE_ID | ID of data node                     |
| TENANT                       | Tenant name the database belongs to |
| USER                         | DatabaseName                        |
| VALUE                        | 用户写入次数                              |

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
