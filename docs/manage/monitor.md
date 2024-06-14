---
sidebar_position: 10
---

# 监控指标

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

### HTTP_DATA_IN

#### 名称

http_data_in

#### 种类

Count

#### 描述

通过http协议写入的数据流量，不包括SQL

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 写入流量的总大小,单位Byte  |

### HTTP_DATA_OUT

#### 名称

http_data_out

#### 种类

Count

#### 描述

Http返回数据的大小

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| Database | Database 名称      |
| User     | 用户名称             |
| VALUE    | 返回数据的总大小，单位Byte  |

### HTTP_QUERIES

#### 名称

http_queries

#### 种类

Count

#### 描述

该指标记录用户通过Http查询的次数。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| USER     | 用户名称             |
| VALUE    | 查询次数             |

### HTTP_WRITES

#### 名称

http_writes

#### 种类

Count

#### 描述

该指标记录用户通过Http写入的次数。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| USER     | 用户名称             |
| VALUE    | 用户写入次数           |

### HTTP_QUERY_DURATION

#### 名称

http_query_duration

#### 种类

Histogram

#### 描述

通过Http接口查询的耗时

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| USER     | 用户名称             |
| LE       | 小于此时间,单位ms       |
| VALUE    | 次数               |

### HTTP_WRITE_DURATION

#### 名称

http_write_duration

#### 种类

Histogram

#### 描述

通过Http接口写入的耗时

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| USER     | 用户名称             |
| LE       | 小于此时间,单位ms       |
| VALUE    | 次数               |

### COORD_DATA_IN

#### 名称

coord_data_in

#### 种类

Count

#### 描述

数据写入到数据库时，Coordinator接受的数据总大小。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 数据大小,单位Byte      |

### COORD_DATA_OUT

#### 名称

coord_data_out

#### 种类

Count

#### 描述

数据读出数据库时，Coordinator输送的数据总大小。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 数据大小，单位Byte      |

### COORD_QUERIES

#### 名称

coord_queries

#### 种类

Count

#### 描述

查询时数据经过Coordinator的次数。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 次数               |

### COORD_WRITES

#### 名称

coord_writes

#### 种类

Count

#### 描述

写入时数据经过Coordinator的次数。

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 次数               |

### SQL_DATA_IN

#### 名称

sql_data_in

#### 种类

Count

#### 描述

通过sql写入的数据大小，包括INSERT，COPY 语句

#### 标签

| 字段       | 描述               |
|----------|------------------|
| TIME     | 记录的时间            |
| DATABASE | Database名称       |
| NODE_ID  | Data节点的 ID       |
| TENANT   | Database 所属的租户名称 |
| VALUE    | 数据的总大小,单位Byte    |


主从延迟
raft_replication_delay
tenant, database,replica_id,vnode_id
Gauge
Follower跟Leader延迟的消息条数

Raft状态机应用进度
raft_applied_index
tenant, database,replica_id,vnode_id
Gauge
每个节点的raft状态机应用最新的index

快照状态
raft_snapshot_index
tenant, database,replica_id,vnode_id
Gauge
每个节点快照基于哪条index创建的

flushed状态
raft_flushed_index
tenant, database,replica_id,vnode_id
Gauge
每个节点最新的flush是基于哪个index做的

wal index最小值
raft_wal_index_min
tenant, database,replica_id,vnode_id
Gauge
每个节点最老的wal对应的index

wal index最大值
raft_wal_index_max
tenant, database,replica_id,vnode_id
Gauge
每个节点最新的wal对应的index

### RAFT_APPLIED_INDEX

#### 名称

raft_applied_index

#### 种类

Gauge

#### 描述

每个节点的raft状态机应用最新的index

#### 标签

| 字段         | 描述                    |
|-------------|------------------------|
| TIME        | 记录的时间               |
| DATABASE    | Database名称            |
| NODE_ID     | Data节点的 ID           |
| TENANT      | Database 所属的租户名称   |
| REPLICA_ID  | 复制组的ID               |
| VNODE_ID    | 所代表Raft节点ID         |
| VALUE       | 对应Entry的Index        |


### RAFT_FLUSHED_INDEX

#### 名称

raft_flushed_index

#### 种类

Gauge

#### 描述

每个节点的数据已经刷到磁盘所对应的index

#### 标签

| 字段         | 描述                    |
|-------------|------------------------|
| TIME        | 记录的时间               |
| DATABASE    | Database名称            |
| NODE_ID     | Data节点的 ID           |
| TENANT      | Database 所属的租户名称   |
| REPLICA_ID  | 复制组的ID               |
| VNODE_ID    | 所代表Raft节点ID         |
| VALUE       | 对应Entry的Index        |


### RAFT_RAPLICATION_DELAY

#### 名称

raft_replication_delay

#### 种类

Gauge

#### 描述

每个节点同步数据与Leader的差距

#### 标签

| 字段         | 描述                    |
|-------------|------------------------|
| TIME        | 记录的时间               |
| DATABASE    | Database名称            |
| NODE_ID     | Data节点的 ID           |
| TENANT      | Database 所属的租户名称   |
| REPLICA_ID  | 复制组的ID               |
| VNODE_ID    | 所代表Raft节点ID         |
| VALUE       | 跟Leader差距条数         |


### RAFT_SNAPSHOT_INDEX

#### 名称

raft_snapshot_index

#### 种类

Gauge

#### 描述

每个Raft节点最新的snapshot对应的Index

#### 标签

| 字段         | 描述                    |
|-------------|------------------------|
| TIME        | 记录的时间               |
| DATABASE    | Database名称            |
| NODE_ID     | Data节点的 ID           |
| TENANT      | Database 所属的租户名称   |
| REPLICA_ID  | 复制组的ID               |
| VNODE_ID    | 所代表Raft节点ID         |
| VALUE       | snapshot对应的Index     |

### RAFT_WAL_INDEX_MAX

#### 名称

raft_wal_index_max

#### 种类

Gauge

#### 描述

每个Raft节点当前wal的最大Index

#### 标签

| 字段         | 描述                    |
|-------------|------------------------|
| TIME        | 记录的时间               |
| DATABASE    | Database名称            |
| NODE_ID     | Data节点的 ID           |
| TENANT      | Database 所属的租户名称   |
| REPLICA_ID  | 复制组的ID               |
| VNODE_ID    | 所代表Raft节点ID         |
| VALUE       | Wal当前最大Index        |

### RAFT_WAL_INDEX_MIN

#### 名称

raft_wal_index_min

#### 种类

Gauge

#### 描述

每个Raft节点当前wal的最小Index

#### 标签

| 字段         | 描述                    |
|-------------|------------------------|
| TIME        | 记录的时间               |
| DATABASE    | Database名称            |
| NODE_ID     | Data节点的 ID           |
| TENANT      | Database 所属的租户名称   |
| REPLICA_ID  | 复制组的ID               |
| VNODE_ID    | 所代表Raft节点ID         |
| VALUE       | Wal当前最小Index        |


## Prometheus 采集

只需要在Prometheus配置文件处加上Job。

```yaml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'cnosdb'
    static_configs:
      - targets: [ '127.0.0.1:8902' ]
```

#### 参数说明

`targets` 填入CnosDB Http 服务地址。

## 存储到 CnosDB 上

在[配置文件](../reference/config.md#node-basic)中修改`store_metrics`参数为 `true` （默认为true）

