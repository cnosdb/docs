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

### HTTP_DATA_IN

#### Name

http_data_in

#### 种类

Count

#### Description

通过http协议写入的数据流量，不包括SQL

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| VALUE                        | 写入流量的总大小,单位Byte  |

### HTTP_DATA_OUT

#### Name

http_data_out

#### 种类

Count

#### Description

Http返回数据的大小

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| Database                     | Database 名称      |
| User                         | 用户名称             |
| VALUE                        | 返回数据的总大小，单位Byte  |

### HTTP_QUERIES

#### Name

http_queries

#### 种类

Count

#### Description

该指标记录用户通过Http查询的次数。

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间间           |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| USER                         | 用户名称             |
| VALUE                        | 查询次数             |

### HTTP_WRITES

#### Name

http_writes

#### 种类

Count

#### Description

该指标记录用户通过Http写入的次数。

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| USER                         | 用户名称             |
| VALUE                        | 用户写入次数           |

### HTTP_QUERY_DURATION

#### Name

http_query_duration

#### 种类

Histogram

#### Description

通过Http接口查询的耗时

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| USER                         | 用户名称             |
| LE                           | 小于此时间,单位ms       |
| VALUE                        | 次数               |

### HTTP_WRITE_DURATION

#### Name

http_write_duration

#### 种类

Histogram

#### Description

通过Http接口写入的耗时

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| USER                         | 用户名称             |
| LE                           | 小于此时间,单位ms       |
| VALUE                        | 次数               |

### COORD_DATA_IN

#### Name

coord_data_in

#### 种类

Count

#### Description

数据写入到数据库时，Coordinator接受的数据总大小。

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| VALUE                        | 数据大小,单位Byte      |

### COORD_DATA_OUT

#### Name

coord_data_out

#### 种类

Count

#### Description

数据读出数据库时，Coordinator输送的数据总大小。

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| VALUE                        | 数据大小，单位Byte      |

### COORD_QUERIES

#### 种类

Count

#### Description

查询时数据经过Coordinator的次数。

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| VALUE                        | 次数               |

### COORD_WRITES

#### 种类

Count

#### Description

写入时数据经过Coordinator的次数。

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| VALUE                        | 次数               |

### SQL_DATA_IN

#### Name

sql_data_in

#### 种类

Count

#### Description

通过sql写入的数据大小，包括INSERT，COPY 语句

#### 标签

| 字段                           | Description      |
| ---------------------------- | ---------------- |
| TIME                         | 记录的时间            |
| DATABASE                     | Database名称       |
| NODE_ID | Data节点的 ID       |
| TENANT                       | Database 所属的租户名称 |
| VALUE                        | 数据的总大小,单位Byte    |

## Prometheus 采集

只需要在Prometheus配置文件处加上Job。

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'cnosdb'
    static_configs:
      - targets: [ '127.0.0.1:8902' ]
```

#### Parameter Description

`targets` 填入CnosDB Http 服务地址。

## 存储到 CnosDB 上

在[配置文件](../reference/config.md#node-basic)中修改`store_metrics`参数为 `true` （默认为true）
