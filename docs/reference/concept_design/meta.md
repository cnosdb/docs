---
sidebar_position: 3
---

# 元数据集群

 元数据集群指的的 Meta 集群服务。Meta 服务是 CnosDB 分布式数据库系统中的核心组件之一，负责整个集群的元数据存储、管理相关工作。Meta 集群是通过 Raft 一致性协议实现的。Meta 集群通过 RESTful API 的方式对外提供服务，同时 node 也会对 Meta 信息的更新进行订阅。所有的元数据信息的更新都通过 Meta 集群进行。

![meta——server](/img/raft.jpg)

## Meta集群功能
- 元数据存储
- 集群管理
- 变更通知
- 元数据的备份与还原

### 元数据存储
数据的存储内容主要包括如下几点：
1. 数据库 catalog 信息
2. DDL操作资源管理
3. 租户、用户信息与权限
4. 数据分片与分布
5. 集群节点信息

### 集群管理
1. 节点探活
2. 节点注册
3. 分布式锁

### 变更通知
Meta 存储信息的变更会异步通知到每个 CnosDB 节点，这是靠 Meta 集群提供的强大的Watch机制实现的。每个 CnosDB 节点都会订阅 Meta 数据的变更，并存储到自己的本地缓存；CnosDB 节点在使用时会优先使用本地缓存数据，对于一致性要求较高的请求会透传到 Meta 集群请求一次数据。

### 元数据备份与还原
Meta 服务提供了所存储数据的备份与还原功能

1. 数据的备份

`cnosdb-cli` 可以导出 Meta 存储的元数据；导出数据是以DDL方式呈现。
```sql
cnosdb-cli dump-ddl
```

2. 数据的还原

`cnosdb-cli` 还可以恢复元数据到 Meta 集群。
```sql
cnosdb-cli restore-dump-ddl
```