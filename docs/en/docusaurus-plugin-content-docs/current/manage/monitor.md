---
sidebar_position: 6
---

# Monitor

Currently, CnosDB metrics can be collected by Prometheus or stored on CnosDB.

If you would like to see more metrics supported by CnosDB, please send an ISSUE to the [repository](https://github.com/cnosdb).

## **Data Node Monitor Metrics**

### DISK_STORAGE

#### Name

disk_storage

#### Type

Gauge

#### Discription

The disk that the Vnode occupies.

#### Tag

| Field    | Discription                   |
|----------|-------------------------------|
| DATABASE | Database vnode belongs to     |
| NODE_ID  | ID of data node               |
| TENANT   | tenant vnode belongs to       |
| VNODE_ID | ID of Vnode                   |
| VALUE    | Disk that the Vnode occupies. |


### DATA_IN

#### Name

data_in

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


### DATA_OUT

#### Name

data_out

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

### QUERIES

#### Name

queries

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

### WRITES

#### Name

writes

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


## **Prometheus Monitor**

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


## **Store to CnosDB**

[//]: # (TODO: Add the description of how to store the metrics to CnosDB.)

在[配置文件](./cluster_expansion)中修改`store_metrics`参数为 `true` （默认为true）

