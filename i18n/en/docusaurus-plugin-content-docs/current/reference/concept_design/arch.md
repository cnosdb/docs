---
title: Architecture
order: 2
---

## 特点

Consdb2.0 is developed in Rust language, based on its security, high performance and community influence, provides users with an excellent time series database and forms a complete DBaas solution.

>

1. Extensive: Theoretically supported time series has no limit, completely solves the problem of time series expansion, and supports cross-river expansion.
2. Calculate storage separation: Calculating nodes and storage nodes, can expand and shrink capacity independently and on a second scale.
3. Storage performance and cost: High performance storage stack, supporting hierarchical storage using cloud discs and object storage.
4. Query engine supports vectorized queries, providing a rich set of time series calculation functions.
5. Supports multiple time series protocols to write and query, providing external component import data.
6. Cloud side synergizes to provide the ability to fuse side ends with public clouds.
7. Native support for multi-tenancy, limiting tenant resource usage through quotas.
8. Support cloud native, support the full use of cloud infrastructure to integrate into cloud native ecology.

# Architecture

ArchitectureThe CnosDB architecture mainly includes two types of processes: CnosDB and CnosDB meta, named cnosdb and cnosdb-meta respectively. CnosDB supports online horizontal expansion of nodes. Supports metadata and data backup to ensure cluster stability. Support for most SQL syntax, using the built-in cnosdb-cli client can quickly and easily connect to CnosDB for query and import.**Replicaset** : The high availability of data is maintained by the Data replicaset. Each db has multiple replication groups, which represent the number of replicas of data. A group of Vnodes in a bucket form a replicaset. All Vnodes in a replicaset have the same data and inverted index information. 同一个 bucket 内的一组 Vnode 组成一个 replicaset， 一个 replicaset 内的 Vnode 具有相同的数据和倒排索引信息。

整体架构图

### CnosDB

**Vnode** : A Vnode is a logical computing unit distributed to a specific Node, and it is also the smallest unit for data replication.The following figure shows the architecture of CnosDB.**CnosDB**, the corresponding program named cnosdb, is used to query and store data. cnosdb is internally divided into two services: query service and tskv storage service, which are the core of cnosdb.

**Query** : Query service, mainly responsible for client connection, query planning, sql analysis and other work.
**Tskv** : Storage service, mainly responsible for the storage of data and the execution of sql physical plans.Users can flexibly configure whether the Query node starts in stream processing mode, and can flexibly configure the processing mode of the Query node according to their own business needs.

**Tskv**: The storage service is mainly responsible for storing and retrieving index data and time series data. Tskv can be configured as cold data nodes and hot data nodes. Data will automatically migrate from hot data nodes to cold data nodes based on cooling time to balance storage performance and cost. See [Tiered Storage](/docs/manage/tiered_storage.md) for details.

### ConsDB Meta

**CnosDB meta** ,the corresponding program named cnosdb-meta, the role is to maintain the consistency of the cluster. It stores metadata in the cluster, including information about the topology of the cluster, the distribution of replicas, and the distribution of data.它存储了集群中的元数据，其中包括集群的拓扑结构、副本的分布以及数据的分布等信息。It stores metadata in the cluster, including information on tenants, user role information, topology, replica distribution, and data distribution within the cluster.
**cnosdb-meta** ,there are two roles: the cnosdb-meta leader and the cnosdb-meta follower, in which one cnosdb-meta is elected to be the leader through raft consistency protocol. The leader election requires more than half of the follower nodes to survive. Therefore, in a distributed cluster service, it is recommended to deploy **2n+1** cnosdb-meta services to ensure the high availability of the cluster.leader 的选举需要半数以上的 follower 节点存活，所以通常在一个分布式集群服务中，建议部署 **2n+1** 个 cnosdb-meta 服务，这样可以保证集群的高可用性。

CnosDB makes the following optimizations in the meta cluster:

>

1. Cache and localize frequently accessed data.
2. After the schema information is stored locally, subscribe to the schema version changes from the meta cluster to relieve the read pressure on the meta cluster.
3. The meta cluster shares the leader pressure and provides a Follower/Read solution to optimize the read performance.

### Data management

>

1. In Cnosdb, the data management adopts the **DB+Time_range** shard rule. The number of shards is set by specifying the number of buckets when [creating the database](../../reference/sql.md#create-database), and the time data is cut into Vnodes according to the set interval using the timeline property. Finally, each Vnode is dropped into a bucket for storage, as shown below.
2. **Bucket** : A bucket is a logical unit, specified when the library is created. Each bucket contains the following main properties: < db, shardid, time_range, create_time, end_time, List< Vnode > >.
3. Grafana is an open-source data visualization tool that supports multiple data sources. CnosDB provides a Grafana plugin, allowing users to connect to CnosDB for data visualization display.
4. CnosDB supports data query through JDBC connection, users can query data in CnosDB through JDBC connection.
5. CnosDB provides a complete set of Restful API interfaces, users can query and write data through Restful API.
6. CnosDB provides a python SDK that allows users to integrate with machine learning systems through the python connector.
7. CnosDB supports writing multiple agents such as telegraf, vector, filebeat, etc., users can write data into CnosDB through configuring agents.
8. CnosDB Admin is an enterprise version tool that provides visual monitoring and management of clusters, offering cluster monitoring, alerts, log viewing, cluster configuration, cluster scaling, and other functions, making it easier for enterprise users to manage and operate multiple clusters.

The ecosystem tools of CnosDB are still being further enhanced. See [CnosDB Ecosystem Tools](/docs/reference/tools.md)

![Ecology](/img/app_arch.png)

### Deployment Mode

CnosDB supports multiple deployment modes: standalone, distributed, storage-compute separation, storage-compute integration. These flexible deployment modes can meet the deployment needs of users in various complex scenarios.

```
cnosdb run -M singleton
cnosdb run -M query
cnosdb run -M tskv
cnosdb run -M query_tskv
```

### Data separation

- #### query layer

  In DataFusion, the isolation relationship of catalog is divided into `catalog/schema/table`.We use this isolation relationship to split the isolation relationship between tenants into `tenant (namespace)/database/table`.

  - Table corresponds to a specific table in a specific database that provides a specific table schema definition implementation TableProvider

  - Database corresponds to a database, which manages multiple tables under a specific database.

  - Namespace corresponds to Catalog. Each tenant occupies only one catalog, and the db seen in different tenants is different, and different tenants can use the same Database name. When the user logs in, the TenantID is obtained from the session by default, and the user will see the namespace they belong to. In this sense, the namespace has a soft isolation effect.

  - #### tskv layer

  The directory splitting strategy mentioned above: `/tenant/db/vnode_id`.
  tskv is an instance on each Node node.Save information of all Vnode on the current Node.Each Vnode stores data in a separate directory.According to the configured db retention policy, clean up the data.At the same time, we can easily carry out size statistics of the data directory and bill the tenant.
