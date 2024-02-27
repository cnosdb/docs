---
title: 整体架构
order: 2
---

# 整体架构

CnosDB 架构中主要包括了两类进程：CnosDB 和 CnosDB meta，分别命名为 cnosdb、cnosdb-meta。CnosDB 支持节点在线水平扩展；支持元数据和数据备份,保障集群稳定性；支持大部分 SQL 语法，使用自带的 cnosdb-cli 客户端可快速轻松连接 CnosDB 进行查询和导入。

## 整体架构图

![整体架构](/img/arch.png)

### CnosDB meta

**CnosDB meta**，对应程序命名为 cnosdb-meta ，作用是维护集群的一致性。它存储了集群中的元数据，其中包括集群的拓扑结构、副本的分布以及数据的分布等信息。

**cnosdb-meta** 共有两种角色： cnosdb-meta leader 和 cnosdb-meta follower ，其内部是通过 raft 一致性协议来选举出负责 leader 角色的一个 cnosdb-meta 。leader 的选举需要半数以上的 follower 节点存活，所以通常在一个分布式集群服务中，建议部署 **2n+1** 个 cnosdb-meta 服务，这样可以保证集群的高可用性。

CnosDB 在 meta 集群中做了如下的一些优化：

1. 对访问频繁的数据进行 cache 和本地化存储。
2. schema 信息在本地存储后，订阅来自 meta 集群的 schema version 变更，缓解 meta 集群读压力。
3. meta 集群分担 leader 压力，提供 Follower/Read 方案，读性能得以优化。

### CnosDB

**CnosDB**，对应程序命名为 cnosdb ，作用是查询和存储数据。cnosdb 内部划分成两个服务：query 查询服务和tskv 存储服务 ，这两类服务是 cnosdb 的核心。

**Query**：查询服务，主要负责客户端连接、查询规划、sql 解析等工作。

**Tskv**：存储服务，主要负责数据的存储和 sql 物理计划的执行。

## 数据管理

Cnosdb 中对于数据的管理采用的是 **DB+Time_range** 分片规则，通过在[建库](../../reference/sql.md#创建数据库)的时候指定 bucket 数量来设置分片数，并利用时序数据的自身属性（timeline），按照设定的间隔将时间数据切割成 Vnode ，最后将每个 Vnode 落入到 bucket 当中进行存储，图示如下。

![数据分片](/img/buket.jpg)

**Bucket**：bucket 是一个逻辑单元，建库时指定，每个 bucket 都包含以下主要的属性 ：< db , shardid，time_range, create_time,  end_time,  List< Vnode > >。

**Vnode**：Vnode 是一个逻辑计算单元，分布到一个具体的 Node 上面，它也是数据复制的最小单元。

**Replicaset（复制组）**：数据的高可用是通过数据 replicaset 维护的，每个 db 有多个复制组，它表示数据的副本数。 同一个 bucket 内的一组 Vnode 组成一个 replicaset， 一个 replicaset 内的 Vnode 具有相同的数据和倒排索引信息。
