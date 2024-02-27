---
title: Overall Architecture
order: 2
---

# Overall Architecture

The CnosDB architecture consists mainly of two types of processes：CnosDB and CnosDB meta, named cnosdb and cnosdb-meta, respectively.CnosDB supports online horizontal extension of nodes; supports metadata and data backups to ensure cluster stability; supports most SQL syntax, and uses a custom cnosdb-cli client to quickly and easily connect to CnosDB for search and import.

## Overall Architecture

![整体架构](/img/archi.png)

### CnosDB meta

**CnosDB meta**, corresponding program named cnosdb-meta to maintain the consistency of the cluster.It stores metadata in the cluster, including information on the crowd topography structure, distribution of copies and distribution of data.

**cnosdb-meta** have two roles： cnosdb-meta leader and cnosdb-meta follower, internal to a cnosdb-meta that elects the lead role through the Draft consistency protocol.The leader requires more than half of the follower nodes to survive, so normally in a distributed cluster service, it is recommended to deploy **2n+1** a cnosdb-meta service to ensure high cluster availability.

CnosDB has made some optimization in meta cluster：

1. Use cache and localization storage for frequently accessed data.
2. Schema information is stored locally, subscribe to schema version changes from the meta cluster, and mitigates meta group reading pressures.
3. meta cluster sharing lead pressures, providing Follower/Read Programs and optimizing readability.

### CnosDB

**CnosDB**, corresponding program named cnosdb to query and store data.cnosdb is internally divided into two services：query and tskv storage services, which are at the core of cnosdb.

**Query**：Query Service, mainly responsible for client connections, query planning, sql parsing and more.

**Tskv**：Storage Service, mainly responsible for data storage and the execution of sql Physical Plan.

## Data management

The management of data in Cnosdb is the **DB+Time_range** partition rule, set the decimal number by specifying the number of buckets at[建库](../reference/sql.md#Create database) and using the own attributes of the time-series data (timeline), cutting the time data to Vnode at the specified intervals, and eventually placing each Vnode in the bucket for storage, as shown below.

![数据分片](/img/buket.jpg)

**Bucket**：bucket is a logical cell, specified when building the library, each bucket contains the following main attributes ：< db, shardid,time_range, create_time, end_time, List< Vnode > .

**Vnode**：Vnode is a logical unit distributed to a specific Node that is also the smallest unit to copy data.

**Replicaset(Replicate)**：data is maintained through data replicaset and has multiple copy groups per db, which indicates the number of copies of the data. A set of Vnode in the same bucket composes a replicaset, a replicaset in Vnode with the same data and invert indexing information.
