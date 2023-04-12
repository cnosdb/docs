---
title: 监控指标
order: 7
---

# 监控

目前 CnosDB的监控指标可以通过Prometheus采集，也可以存储到CnosDB上。

如果期待CnosDB支持更多的指标，请在[仓库](https://github.com/cnosdb)上发送ISSUE。

## Data节点监控指标

### VNODE_DISK_STORAGE

#### 名称

vnode_disk_storage

#### 种类

Gauge

#### 描述

vnode 占据的磁盘大小。

#### 标签

| 字段       | 描述                  |
|----------|---------------------|
| DATABASE | vnode 所属的数据库        |
| NODE_ID  | data节点的ID           |
| TENANT   | vnode 所属的租户名称       |
| VNODE_ID | vnode 的 ID          |
| VALUE    | vnode 所占磁盘大小，单位Byte |

### VNODE_CACHE_SIZE

#### 名称

vnode_cache_size

#### 种类

Gauge

#### 描述

vnode 占据的内存大小。

#### 标签

| 字段       | 描述                  |
|----------|---------------------|
| DATABASE | vnode 所属的数据库        |
| NODE_ID  | data节点的ID           |
| TENANT   | vnode 所属的租户名称       |
| VNODE_ID | vnode 的 ID          |
| VALUE    | vnode 所占内存大小，单位Byte |

### COORD_DATA_IN

#### 名称

coord_data_in

#### 种类

Count

#### 描述

数据写入到数据库时，写入流量的总大小。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 统计data_in的时间     |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 写入流量的总大小,单位Byte  |


### COORD_DATA_OUT

#### 名称

coord_data_out

#### 种类

Count

#### 描述

从数据库读取数据的总流出流量。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 统计data_out的时间    |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 读取流量的总大小，单位Byte  |

### USER_QUERIES

#### 名称

user_queries

#### 种类

Count

#### 描述

该指标记录用户查询DB的次数。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 统计queries的时间     |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| USER     | 用户名称             |
| VALUE    | 用户查询次数           |

### USER_WRITES

#### 名称

user_writes

#### 种类

Count

#### 描述

该指标记录用户写入DB的次数。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 统计writes的时间      |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| USER     | 用户名称             |
| VALUE    | 用户写入次数           |

## Prometheus 采集

只需要在Prometheus配置文件处加上Job。

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'cnosdb'
    static_configs:
      - targets: ['127.0.0.1:31001']
```
#### 参数说明

`targets` 填入CnosDB Http 服务地址。


## 存储到 CnosDB 上

在[配置文件](cluster.md#配置项-cluster)中修改`store_metrics`参数为 `true` （默认为true）

