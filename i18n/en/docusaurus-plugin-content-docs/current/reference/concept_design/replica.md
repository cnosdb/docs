---
title: 数据分片与复制
order: 3
---

## 数据分片与复制

CnosDB 按照两个维度对数据进行分片存储：时间分片与Hash分片。

- 时间分片：由于时序数据库本身的特征，按照时间维度进行分片有其天然的优势。CnosDB 每隔一段时间创建一个 Bucket，每个 Bucket 都有起始、结束时间用于存储对应时间段内的数据。每当系统容量不足添加新的存储节点后，在创建新的Bucket时也将优先使用空闲容量最多的新节点，已有数据也不需要移动，这完美地解决了集群扩容与数据存储容量的问题。

- Hash分片：时间分片完美地解决了存储容量的问题；在一个分布式集群环境下，会有多台机器提供服务，如若每个 Bucket 只分布在一台机器节点上，则整个系统的写入性能受限于单台机器。时序数据库还有另外一个概念是 SeriesKey，按 SeriesKey 进行 Hash分片 可以分割成不同的 ReplicaSet（复制组），每个 ReplicaSet 内的一个副本称其为 Vnode，每个 Vnode 分散在不同的存储节点上，一个 ReplicaSet 内的多个 Vnode 搭建一个 Raft 复制组进行副本间数据的同步；CnosDB是以 ReplicaSet 为一组 Raft 复制组的 Multi-Raft 存储方案。Vnode 是 CnosDB 进行数据分片管理的基本单元，采用 Hash分片 的方式解决了系统吞吐量的问题。

![数据分片](/img/buket.jpg)

### Bucket

Bucket 是一个虚拟逻辑单元；Bucket 会根据用户配置创建多个分片，把数据打散（默认情况下数据的分片 Shard Num 是 1）。每个 Bucket 有以下主要的属性：

- 开始时间
- 结束时间
- Database
- ReplicaSet

### Vnode

Vnode 是一个虚拟的运行单元，并被分配到一个具体的 Node 上。每个 Vnode 都是一个 Raft节点，每个 Vnode 是一个单独的LSM Tree，也有对应的独立的 WAL日志。

### 复制组（ReplicaSet）

一个复制组就是一个Raft集群，每个Raft节点对应一个Vnode。

### 放置规则 （place rule）

CnosDB支持感知机房、机架策略，为此我们设计了放置规则相关概念。创建复制组时会根据放置规则将不同副本放置在不同机房、机架。详情参见 [数据分布策略](../../manage/placement_policy.md)

### 数据分隔策略

在 Node 上不同租户的数据是在物理上进行分割的。

`/User/db/bucket/replicaset_id/vnode_id`

![数据分割目录存储](/img/data_path.jpg)

### CnosDB对Raft使用

在CnosDB v2.4版本中引入了Raft复制算法，每个ReplicaSet是一个Raft复制组，整个系统是一个Multi-Raft模式运行。

#### 数据写入

- 根据租户、Database以及时间戳确定写入哪个 Bucket。
- 根据 SeriesKey 进行Hash确定写入哪个 ReplicaSet，也就是哪个Raft复制组。
- 查看接收请求的节点是不是Leader如果是直接写入，否则转发到Leader进行处理。

#### 数据读取

数据读取时为了确保较高的数据一致性优先选择Leader节点读取，如果失败会重试Follower节点。
