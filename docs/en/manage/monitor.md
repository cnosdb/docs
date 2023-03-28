---
title: Monitor
order: 7
---

# Monitor

Currently, CnosDB metrics can be collected by Prometheus or stored on CnosDB.

If you would like to see more metrics supported by CnosDB, please send an ISSUE to the [repository](https://github.com/cnosdb).

## Data Node Monitor Metrics

### VNODE_DISK_STORAGE

#### Name

vnode_disk_storage

#### Type

Gauge

#### Discription

The disk that the Vnode occupies.

#### Tag

| Field    | Discription                           |
|----------|---------------------------------------|
| DATABASE | Database vnode belongs to             |
| NODE_ID  | ID of data node                       |
| TENANT   | tenant vnode belongs to               |
| VNODE_ID | ID of Vnode                           |
| VALUE    | Disk that the Vnode occupies in bytes |


### VNODE_CACHE_SIZE

#### Name

vnode_cache_size

#### Type

Gauge

#### Description

The cache size that vnode occupies in bytes.

#### Tag

| Field    | Discription                            |
|----------|----------------------------------------|
| DATABASE | Database vnode belongs to              |
| NODE_ID  | ID of data node                        |
| TENANT   | tenant vnode belongs to                |
| VNODE_ID | ID of Vnode                            |
| VALUE    | Cache that the Vnode occupies in bytes |

### COORD_DATA_IN

#### Name

coord_data_in

#### Type

Count

#### Discription

The total size of the written traffic when data is written to the database.

#### Tag

| Field    | Discription                                  |
|----------|----------------------------------------------|
| TIME     | Time of data_in                              |
| DATABASE | DatabaseName                                 |
| NODE_ID  | ID of data node                              |
| TENANT   | Tenant name the database belongs to          |
| VALUE    | The total size of the write traffic in Bytes |


### COORD_DATA_OUT

#### Name

coord_data_out

#### Type

Count

#### Discription

Total outflow traffic for reading data from the database.

#### Tag

| Field    | Discription                                 |
|----------|---------------------------------------------|
| TIME     | Time of data out                            |
| DATABASE | Database name                               |
| NODE_ID  | ID of data node                             |
| TENANT   | Tenant name the database belongs to         |
| VALUE    | The total size of the read traffic in Bytes |

### USER_QUERIES

#### Name

user_queries

#### Type

Count

#### Discription

The times the user queries from the database.

#### Tag

| Field    | Discription                                   |
|----------|-----------------------------------------------|
| TIME     | Time of queries                               |
| DATABASE | Database name                                 |
| NODE_ID  | ID of data node                               |
| TENANT   | Tenant name the database belongs to           |
| USER     | User name                                     |
| VALUE    | The times the user queries from the database. |

### USER_WRITES

#### Name

user_writes

#### Type

Count

#### Discription

The times the user writes to the database.

#### Tag

| Field    | Discription                                |
|----------|--------------------------------------------|
| TIME     | Time of writes                             |
| DATABASE | Database name                              |
| NODE_ID  | ID of data node                            |
| TENANT   | Tenant name the database belongs to        |
| USER     | User name                                  |
| VALUE    | The times the user writes to the database. |


## Prometheus Monitor

Just add Job at the Prometheus configuration file.

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'cnosdb'
    static_configs:
      - targets: ['127.0.0.1:31001']
```
**Params**

`targets` is the adderss of CnosDB Http.

## Store to CnosDB 

Change the `store_metrics` in [config](./cluster_expansion.md#configuration-cluster) to `true`.

