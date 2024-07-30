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

### HTTP_FLOW

#### 名称

http_flow

#### 种类

Count

#### 描述

通过http协议访问的request body和response body之和

#### 标签

| 字段     | 描述               |
|---------|--------------------|
| time    | 记录的时间           |
| api     | api名称             |
| host    | 节点的ip地址         |
| node_id | 节点的id            |
| value   | 数据的总大小,单位Byte |

### HTTP_RESPONSE_TIME

#### 名称

http_response_time

#### 种类

Histogram

#### 描述

通过http协议访问的耗时

#### 标签

| 字段     | 描述               |
|---------|--------------------|
| time    | 记录的时间           |
| api     | api名称             |
| host    | 节点的ip地址         |
| le      | 小于此时间,单位ms     |
| node_id | 节点的id            |
| value   | 次数                |

## Meta节点监控指标

### READ_META_COUNT

#### 名称

read_meta_count

#### 种类

Count

#### 描述

读取meta的次数

#### 标签

| 字段     | 描述            |
|---------|-----------------|
| time    | 记录的时间       |
| addr    | meta服务地址     |
| node_id | 访问meta的节点id |
| value   | 读取次数         |

### READ_META_RESPONSE_TIME

#### 名称

read_meta_response_time

#### 种类

Histogram

#### 描述

读取meta的耗时

#### 标签

| 字段     | 描述            |
|---------|---------------- |
| time    | 记录的时间       |
| addr    | meta服务地址     |
| node_id | 访问meta的节点id |
| le      | 小于此时间,单位ms |
| value   | 次数             |

### WRITE_META_COUNT

#### 名称

write_meta_count

#### 种类

Count

#### 描述

写入meta的次数

#### 标签

| 字段     | 描述            |
|---------|-----------------|
| time    | 记录的时间       |
| addr    | meta服务地址     |
| node_id | 访问meta的节点id |
| value   | 写入次数         |

### WRITE_META_RESPONSE_TIME

#### 名称

write_meta_response_time

#### 种类

Histogram

#### 描述

写入meta的耗时

#### 标签

| 字段     | 描述            |
|---------|---------------- |
| time    | 记录的时间       |
| addr    | meta服务地址     |
| node_id | 访问meta的节点id |
| le      | 小于此时间,单位ms |
| value   | 次数             |

### WATCH_META_COUNT

#### 名称

watch_meta_count

#### 种类

Count

#### 描述

访问meta的次数

#### 标签

| 字段     | 描述            |
|---------|-----------------|
| time    | 记录的时间       |
| addr    | meta服务地址     |
| node_id | 访问meta的节点id |
| value   | 访问次数         |

### WATCH_META_RESPONSE_TIME

#### 名称

watch_meta_response_time

#### 种类

Histogram

#### 描述

访问meta的耗时

#### 标签

| 字段     | 描述            |
|---------|---------------- |
| time    | 记录的时间       |
| addr    | meta服务地址     |
| node_id | 访问meta的节点id |
| le      | 小于此时间,单位ms |
| value   | 次数             |

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

## Jaeger

### 在 CnosDB 中启用 Jaeger 支持

取消 [trace]配置注释开启 Jaeger 跟踪功能。
> 提示：如需使配置生效需要重启服务。

```toml
[trace]
auto_generate_span = true
otlp_endpoint = 'http://localhost:4317'
```

### 安装并启动 Jaeger
> 其他部署方式，请参考 [Jaeger 部署文档](https://www.jaegertracing.io/docs/deployment/)。

```bash
docker run -d --name jaeger \
-p 4317:4317 \
-p 16686:16686 \
jaegertracing/all-in-one:latest
```

成功启动后，使用浏览器访问 [http://127.0.0.1:16686](http://127.0.0.1:16686)。

![jaeger](/img/jaeger_setup.png)

### 跟踪 CnosDB 中的事件

1. 在请求中添加 `span context`。

> 可以设置配置文件中的 `auto_generate_span = true` 自动生成，如果需要分析特定的语句，请在请求中自定义 `cnosdb-trace-ctx` 值，格式如下所示（`cnosdb-trace-ctx: {trace-id}:{span-id}`）。

```bash
cnosdb-trace-ctx: 3a3a43:432e345
```

示例：

> 示例中的数据来源请参考：https://docs.cnosdb.com/zh/latest/start/quick_start \
> 查询数据库 `oceanic_station` 中 `air` 表中的数据，并且按时间倒序排序，返回前 5 条数据 。

```bash
curl -i -u "root:" -H "Accept: application/json" -H "cnosdb-trace-ctx: 3a3a43:432e345" -XPOST "http://127.0.0.1:8902/api/v1/sql?db=oceanic_station&pretty=true" -d "select * from air order by time desc limit 5;"
```

### 使用仪表盘进行分析

![jaeger_dashboard](/img/jaeger_dashboard.png)

1. 记录 Span：

当客户端应用程序发送查询或写入请求到 CnosDB 数据库时，CnosDB 会将产生的 Span 记录发送给Jaeger 。每个 span 表示了请求的一个阶段，包括了处理时间、操作名称和其他相关信息。

2. 选择 Service：

在 Jaeger 用户界面的 Service 下拉框中，选择与 CnosDB 相关的服务（例如：cnosdb_singleton_1001）。

3. 查找 Traces：

在界面上，点击 "Find Traces" 按钮，系统将检索与选择的服务相关的所有 traces（追踪）。这将显示一系列的请求和对应的 spans。

4. 分析 Trace 详情：

点击所感兴趣的 trace，进入详细视图。在这个视图中，你将看到整个请求的流程，以及每个 span 执行的时间。这些时间信息将帮助你了解查询的每个步骤在处理时所花费的时间。

5. 优化查询和系统：

利用详细的时间记录，你可以精确地分析查询语句的性能。在正式的生产环境中，这将成为优化查询语句和改进系统性能的宝贵工具。通过分析每个 span 的执行时间，你可以找到可能导致延迟的步骤，从而采取针对性的优化措施。

除此之外，Jaeger 还可以跟踪 CnosDB 的其他事件，请查看：[ISSUE 1272](https://github.com/cnosdb/cnosdb/issues/1272)