---
title: 元数据集群
order: 2
---

## Meta 集群

通过 raft 去维护一个强一致性的 meta 集群。meta 集群 api 的方式对外进行服务，同时 node 也会对 meta 信息的更新进行订阅。所有的元数据信息的更新都通过 meta 集群进行更新。

![meta——server](/img/raft.jpg)

> 1.  数据库 catalog 信息，DDL 操作。
> 2.  节点探活/节点注册，以及节点负载信息统计，作为 coordinator 进行选择的 read 和 write 的依据。
> 3.  租户以及子用户信息以及权限相关。
> 4.  数据路由信息，tenant/db/bucket/replicaset 对应的 vnodeList 的路由信息。
> 5.  提供分布式锁和 watch 变更通知的功能。

我们采用强一致性 meta 集群并实现了相应优化。具体原因如下：

> - 实际在工程实践中我们集群中元数据通常控制在较小的规模，无扩展性需求。
> - 工程实践相对简单，有利于快速实施迭代。
> - 对访问频繁的数据进行 cache 和 本地化存储，进行优化。
    >   - schema 信息 在本地存储后，订阅来自 meta 集群的 schema version 变更，缓解 meta 集群读压力。
    >   - meta 集群分担 leader 压力，提供 Follower/Read 方案。读性能得以优化。
