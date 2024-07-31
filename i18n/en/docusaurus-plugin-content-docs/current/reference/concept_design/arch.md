---
sidebar_position: 2
---

# Architecture

CnosDB 2.0 采用 [Rust](https://www.rust-lang.org/) 语言开发，凭借其卓越的安全性、高性能以及强大的社区支持，为用户提供了一款出色的时序数据库，构建了一整套完整的 DBaaS 解决方案。

**主要特点如下：**

- Extensive: Theoretically supported time series has no limit, completely solves the problem of time series expansion, and supports cross-river expansion.

- Calculate storage separation: Calculating nodes and storage nodes, can expand and shrink capacity independently and on a second scale.

- Storage performance and cost: High performance storage stack, supporting hierarchical storage using cloud discs and object storage.

- Query engine supports vectorized queries, providing a rich set of time series calculation functions.

- Supports multiple time series protocols to write and query, providing external component import data.

- Cloud side synergizes to provide the ability to fuse side ends with public clouds.

- Native support for multi-tenancy, limiting tenant resource usage through quotas.

- Support cloud native, support the full use of cloud infrastructure to integrate into cloud native ecology.

## Introduction

CnosDB 架构由两类进程组成：cnosdb server（cnosdb）和 cnosdb meta（cnosdb-meta）。支持在线水平扩展，允许动态增加节点，并具备元数据和数据备份功能，确保集群稳定。此外，CnosDB 支持大部分 SQL 语法，用户可以通过 cnosdb-cli 客户端轻松连接进行查询和数据导入。

整体架构图

### CnosDB

**Vnode** : A Vnode is a logical computing unit distributed to a specific Node, and it is also the smallest unit for data replication.cnosdb 内部划分成两个服务：query 查询服务和 tskv 存储服务 ，这两类服务是 cnosdb 的核心。

**Query** : Query service, mainly responsible for client connection, query planning, sql analysis and other work.
**Tskv** : Storage service, mainly responsible for the storage of data and the execution of sql physical plans.Users can flexibly configure whether the Query node starts in stream processing mode, and can flexibly configure the processing mode of the Query node according to their own business needs.

**Tskv**：存储服务主要负责索引数据和时序数据的存储和数据读取过滤，tskv 可以根据配置作为冷数据节点和热数据节点，数据会根据冷却时间自动从热数据节点迁移到冷数据节点平衡存储性能和成本详见 [分级存储](/docs/manage/tiered_storage.md)。

### ConsDB Meta

**CnosDB meta** ,the corresponding program named cnosdb-meta, the role is to maintain the consistency of the cluster. It stores metadata in the cluster, including information about the topology of the cluster, the distribution of replicas, and the distribution of data.它存储了集群中的元数据，其中包括集群的拓扑结构、副本的分布以及数据的分布等信息。It stores metadata in the cluster, including information on tenants, user role information, topology, replica distribution, and data distribution within the cluster.
cnosdb meta 集群是基于 raft 的强一致性共识协议所以通常在一个分布式集群服务中，建议部署 **2n+1** 个 cnosdb-meta 服务，这样可以保证集群的高可用性。

CnosDB makes the following optimizations in the meta cluster:

- Cache and localize frequently accessed data.

- After the schema information is stored locally, subscribe to the schema version changes from the meta cluster to relieve the read pressure on the meta cluster.

- The meta cluster shares the leader pressure and provides a Follower/Read solution to optimize the read performance.

### Data management

- CnosDB Cli 是自带的命令行工具，用于连接 CnosDB 进行 SQL 查询和 line protocol 格式文件的导入。

- CnosDB支持多种写入协议，如：SQL line protocol、opentsdb、prometheus, eslog，未来还会添加 trace 等不同协议使用不同的接口，每种协议可以根据配置启用或者禁用，满足用户不同的需求。

- Grafana 是一个开源的数据可视化工具，支持多种数据源，CnosDB 提供了 [Grafana 插件](https://grafana.com/grafana/plugins/cnos-cnosdb-datasource)，用户可以通过 Grafana 插件连接 CnosDB 进行数据可视化展示及告警。

- CnosDB 支持通过 JDBC 连接，用户可以通过 JDBC 连接 CnosDB 进行数据查询。

- CnosDB provides a complete set of Restful API interfaces, users can query and write data through Restful API.

- CnosDB 提供了python SDK，用户可以通过 python connector 方面的与机器学习系统进行集成。

- CnosDB 支持多种agent的写入 telegraf、vector、filebeat 等，用户可以通过配置 agent 将数据写入到 CnosDB 中。

- CnosDB Admin 是一个企业版工具 提供可视化的 集群的监控和管理，提供集群的监控、告警、日志查看、集群配置、集群扩缩容等功能，方面企业用户对多集群进行管理和运维。

The ecosystem tools of CnosDB are still being further enhanced. See [CnosDB Ecosystem Tools](/docs/reference/tools.md)

![Ecology](/img/app_arch.png)

### Deployment Mode

CnosDB 支持多种部署模式：单机、分布式、存算分离、存算一体 通过这些灵活的部署模式可以满足用户多种复杂场景下的部署需求。

```
cnosdb run -M singleton
cnosdb run -M query
cnosdb run -M tskv
cnosdb run -M query_tskv
```

### Data separation

- #### query layer

  In DataFusion, the isolation relationship of catalog is divided into `catalog/schema/table`.我们利用这种隔离关系， 我们利用这种隔离关系，将租户之间的隔离关系拆分为`tenant/<namespace>/database/table`。

  - **table** 对应于具体数据库中的一个表，提供该表的 schema 定义，并实现 [TableProvider](https://datafusion.apache.org/library-user-guide/custom-table-providers.html)。

  - **database** 对应于具体数据库中的一个数据库，管理多个表。

  - **namespace** 对应于 catalog。每个租户独占一个 catalog，不同租户看到的数据库是不同的，且不同租户可以使用相同的数据库名称。当用户登录时，session 中会获取 TenantID，从而看到自己默认所在的 namespace，实现了软隔离。

- #### tskv layer

  在上面的介绍中提到的目录分割策略为 `/tenant/db/vnode_id`，数据的划分规则请查看 [数据分片与复制](./replica)

  每个 Node 节点上都有一个实例，称为 tskv，负责保存当前 Node 上所有 Vnode 的信息。每个 Vnode 的数据都保存在独立的目录中。根据数据库中的 TTL 参数管理数据的生命周期。此外，这种策略还便于进行数据目录的大小统计，以便对租户进行计费。
