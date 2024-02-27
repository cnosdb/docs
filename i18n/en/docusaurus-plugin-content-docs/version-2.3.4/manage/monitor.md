---
sidebar_position: 10
---

# 监控指标

目前 CnosDB的监控指标可以通过Prometheus采集，也可以存储到CnosDB上。

如果期待CnosDB支持更多的指标，请在[仓库](https://github.com/cnosdb)上发送ISSUE。

## Data节点监控指标

### VNODE_DISK_STORAGE

#### Name

vnode_disk_storage

#### 种类

Gauge

#### Description

vnode 占据的磁盘大小。

#### 标签

| 字段                            | Description         |
| ----------------------------- | ------------------- |
| DATABASE                      | vnode 所属的数据库        |
| NODE_ID  | data节点的ID           |
| TENANT                        | vnode 所属的租户名称       |
| VNODE_ID | vnode 的 ID          |
| VALUE                         | vnode 所占磁盘大小，单位Byte |

### VNODE_CACHE_SIZE

#### Name

vnode_cache_size

#### 种类

Gauge

#### Description

vnode 占据的内存大小。

#### 标签

| 字段                            | Description         |
| ----------------------------- | ------------------- |
| DATABASE                      | vnode 所属的数据库        |
| NODE_ID  | data节点的ID           |
| TENANT                        | vnode 所属的租户名称       |
| VNODE_ID | vnode 的 ID          |
| VALUE                         | vnode 所占内存大小，单位Byte |

### WRITE_DATA_IN

#### Name

write_data_in

#### 种类

Count

#### Description

通过http协议写入的数据流量，不包括SQL

#### 标签

| 字段                           | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| TIME                         | Time of statistical data_in |
| DATABASE                     | Database名称                                       |
| NODE_ID | Data节点的 ID                                       |
| TENANT                       | Database 所属的租户名称                                 |
| VALUE                        | 写入流量的总大小,单位Byte                                  |

### SQL_DATA_IN

#### Name

sql_data_in

#### 种类

Count

#### Description

Data write by sql, including INSERT, COPY statements

#### 标签

| 字段                           | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| TIME                         | Time of statistical data_in |
| DATABASE                     | Database名称                                       |
| NODE_ID | Data节点的 ID                                       |
| TENANT                       | Database 所属的租户名称                                 |
| VALUE                        | 写入流量的总大小,单位Byte                                  |

### COORD_DATA_IN

#### Name

coord_data_in

#### 种类

Count

#### Description

The total size of the traffic is written when the data is written to the database.

#### 标签

| 字段                           | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| TIME                         | Time of statistical data_in |
| DATABASE                     | Database名称                                       |
| NODE_ID | Data节点的 ID                                       |
| TENANT                       | Database 所属的租户名称                                 |
| VALUE                        | 写入流量的总大小,单位Byte                                  |

### COORD_DATA_OUT

#### Name

coord_data_out

#### 种类

Count

#### Description

Total outflow of data read from database.

#### 标签

| 字段                           | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| TIME                         | Time of statistical data_out |
| DATABASE                     | Database名称                                        |
| NODE_ID | Data节点的 ID                                        |
| TENANT                       | Database 所属的租户名称                                  |
| VALUE                        | Total size of traffic fetched, Byte               |

### HTTP_DATA_OUT

#### Name

http_data_out

#### 种类

Count

#### Description

Http返回数据的大小

#### 标签

| 字段                           | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| TIME                         | Time of statistics http_data_out |
| DATABASE                     | Database名称                                                                 |
| NODE_ID | Data节点的 ID                                                                 |
| TENANT                       | Database 所属的租户名称                                                           |
| Database                     | Database 名称                                                                |
| User                         | 用户名称                                                                       |
| VALUE                        | Total size of traffic fetched, Byte                                        |

### USER_QUERIES

#### Name

user_queries

#### 种类

Count

#### Description

This indicator records how many times users query DB.

#### 标签

| 字段                           | Description            |
| ---------------------------- | ---------------------- |
| TIME                         | Time of statistics     |
| DATABASE                     | Database名称             |
| NODE_ID | Data节点的 ID             |
| TENANT                       | Database 所属的租户名称       |
| USER                         | 用户名称                   |
| VALUE                        | Number of user queries |

### USER_WRITES

#### Name

user_writes

#### 种类

Count

#### Description

This indicator records how many times users write to DB.

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | Time of stats    |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| USER                         | 用户名称             |
| VALUE                        | 用户写入次数           |

## Prometheus 采集

只需要在Prometheus配置文件处加上Job。

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any time series scattered from this configuration.
  - job_name: 'cnosdb'
    static_configs:
      - targets: ['127.0.0.1:8902']
```

#### Parameter Description

`targets` 填入CnosDB Http 服务地址。

## 存储到 CnosDB 上

在[配置文件](../reference/config.md#node-basic)中修改`store_metrics`参数为 `true` （默认为true）
