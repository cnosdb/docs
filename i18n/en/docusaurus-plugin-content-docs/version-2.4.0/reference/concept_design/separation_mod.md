---
title: Liquidation
order: 3
---

# Liquidation

## Design Goals

CnosDB2.0 is developed in Rust language to provide users with an excellent time-series database based on its security, high performance and community influence, and to form a complete set of DBaas solutions.

> Time series database

1. Expansion：is theoretically unsupported time series without ceiling, addresses the time series expansion problem completely, and supports horizontal/vertical extensions.
2. Compute storage separation：compute and store nodes, which can be scaled up independently, seconds.
3. Storage performance and cost：high performance iostack, supports graded storage using cloud and object storage.
4. The query engine supports vector queries.
5. Support multiple time series protocols for writing and query, providing external component import data.

> Cloud Native

1. Support for clouds and the integration of cloud infrastructure into their native ecology.
2. High availability, second level failure recovery, support clouds, and cross-zone disaster preparedness.
3. Native support for multiple tenants is paid in volume.
4. CDC, logs can be subscribed and distributed to other nodes.
5. More configurable items are provided to users to meet the complex demands of many public cloud users.
6. The cloud side collaborates to provide the ability of the edge to integrate with the publicly owned clouds.
7. Integrate OLAP/CloudAI data ecosystem on clouds.

In redesigning the time-series database, we try to address as much as possible the range of problems facing the current time-series database and to develop a complete set of time-series data solutions in a timely sequential ecosystem that provides DBaas services in the publicly owned clouds.

![整体架构](/img/new_archi.jpg)

> We will elaborate on the following aspects.

- Data reproduction and consensus
- meta cluster
- SQL Engine
- tskv Index & Data Storage

## Data reproduction and consensus

CnosDB 2.0 split rule is based on Time-range.It puts the data into the corresponding Bucket using the DB + Time_range split rule.Bucket is a virtual logical cell.Each Bucket consists of the following main attributes. Bucket creates multiple fragments based on user configuration to split the data (by default Shard Num is 1).

> 'db, shaardd, time_range, create_time, end_time, Lists\<Vnode>

Vnode is a virtual running cell that is distributed to a specific Node.Each Vnode is a separate LSM Tree. Its corresponding tsfamily structure is an independent running unit.

![数据分片](/img/buket.jpg)

### Duplicate Group (replaset)

High data is maintained by data replicase. Each db will have its own copy group.It indicates data redundancy. A set of Vnode in the same bucket forms a copy group with the same data and inverted index information between them.

### Placement rule (place rule)

In order to address the possibility of parallel failures, the meta node when creating bucket may need to ensure that copies of data are located on devices that use different node, shelf, power, controller, and physical locations. Considering that different tenants will have access to data in different regions, Vnode will need to be deployed at the best cost of discharge.

### Data Separation Strategy

Data for different tenants on Node are physically segregated.

`/User/db/bucket/replaset_id/vnode_id`

![数据分割目录存储](/img/data_path.jpg)

### Data consensus based on the Quorum Mechanism

- #### Cnosdb2.0 is a system of ultimate consistency

  We use the Quorum mechanism to make the data consensus module that handles reading or writing requests as coordinator.

  - Metainformation cache, interact with meta nodes

    Get Vnode information according to (user,db, timerange), maintain a cache locally, pull VnodeList in remote locations without hit.Provides a MetaClient trait.
  - connetion management

    Manage connection with different tskv for data read/writing.
  - Proxy actions to read/write/delete data

    Data is supported by user configuration, and many different levels of consistency are supported.

    ```Rust
    pub enum ConsistencyLevel {
        /// allows for hinted handoff， potentially no write happened yet.
        Any，
        /// at least one data node acknowledged a write/read.
        One，
        /// a quorum of data nodes to acknowledge a write/read.
        Quorum，
        /// requires all data nodes to acknowledge a write/read.
        All，
        }
    ```
  - Hinted handoff\
    is added to the scene of temporary failure of the target node, provides the Hinted handoff feature of the conditionator node, the Hinted handoff queue of the node is kept persistently in the node's Hinted handoff queue and copied from the Hinted handoff queue after the copied node failures.

### Data Writing

When a write request is received, the coordinator determines the physical node (node) of the data to be stored according to the partition strategy and the placement rule for db.This writing is considered successful as long as there are at least W nodes returned.

![write](/img/write.jpg)

### Data Reads

When a read request is received, the coordinator determines that the data to be stored in the physical node (node) to request the data corresponding to this key, based on the partition strategy and the placement rule for db (place-rule), currently we do not complete the read repair function and only launch one reading request.In case of late reading, a second reading request is launched.

![read](/img/read.jpg)

### Update Conflict

1. After conflicting data under the time series scenario, consistency hash was replaced with the first copy (replica) as the confirmation point.
2. Use last-write-win tactics with time stamps to resolve conflicts.

## Meta Cluster

Use Draft to maintain a strong meta cluster.The meta cluster api service is performed externally, and node is also subscribed to meta information updates.All metadata updates are updated via meta cluster.

![meta — server](/img/raft.jpg)

> 1. Database catalog info, DDL operation.
> 2. Node exploration/node registration and node load statistics serve as the basis for coordinator selection of readings and writes.
> 3. Tenant and child information related to permissions.
> 4. Routing information for data routing, tenant/db/bucket/replaset corresponding vnodeList.
> 5. Provides distributive lock and watch notification features.

We adopted and optimized the cluster with strong coherence.For specific reasons the following：

> - In practical engineering practices, our cluster metadata are usually controlled on a smaller scale and there is no need for expansion.
> - Engineering practices are relatively simple and facilitate rapid iteration.
> - Optimize cache and localization of frequently accessed data.
>   \> - Schema information is stored locally and subscribed to schema version changes from meta clusters, mitigating the pressure of meta cluster reading.
>   \> - meta cluster sharing lead pressure to provide Follower/Read options.Reading performance is optimized.

## SQL Engine

We use [DataFusion](https://arrow.apache.org/datafusion/), DataFusion is an expanded query implementation framework, written with Rust and using [Apache Arrow](https://arrow.apache.org/) as its memory format.DataFusion supports SQL and DataFrame API to build logical query plans, as well as query optimizers and execution engines that use threads in parallel to partition data sources.Has the following strengths：

1. High performance：has high performance using Rust and Arrow memory models.
2. Extensive：allows expansion at almost any point in its design and can be customized to specific usages.
3. High-quality：DataFusion and Arrow Ecology have been extensively tested for use as production systems.
4. The integration of large data ecology：as part of the Apache Arrow ecosystem (Arrow, Flowt, Parquet) is better integrated with large data ecosystems.

By expanding DataFusion data sources and providing custom SQL statements, we queried the following data in distributed scenarios as：

![query](/img/query_data_path.jpg)

## TSKV Index & Data Storage

tskv primarily undertakes storage of data and indexes, manages all Vnode on node node, and each Vnode is responsible for some of the data in a db.There are mainly 3 blocks comprising WAL, IndexEngine and DataEngineering in Vnode.

![tskv](/img/tskv.jpg)

### Index Engine

The index used to store time-series data is usually a multi-written model that can be used mainly for quick indexing and filtering based on tagkey to filter out suitable series.

Main features are：

1. Store positive indexes.
2. Store inverted indexes.
3. Cache catalog information.

Common query statement：

```sql
SELECT xxx from table where tag1=value1 && tag2=value2 [and time > aaa and time < bbb] [group by\order by\limit ...]
```

The index is primarily designed for where filtering; used to reduce the size of the search for data and to speed up the search for data.

支持以下几种过滤条件：

> 1. equals or not equals ;eg.：tag=value,tag!=value
> 2. is greater than or less than ;eg.：tag < value
> 3. Prefix match;e.g.：tag=aaaa_\*
> 4. Regular expression;e.g.：tag=aaa\*bbbb

The index is built when the data is written.Most of the time series database is indexed to each tag and multiple tag sets to a series key.

Although the time series database is less written, the use of the index when writing the data is more reading than constructed.The time series database is written mostly for the same series at different points of time, so each series' index information needs to be built only for the first time in writing, after which the judgment series exists (read operations) and is no longer indexed.

- #### Storage Structure

  - Calculate `HashID：hash (SeriesKey) -> HashID` on the basis of the hash function (24-bit integer, approximately 16 million); HashID and autoid get SeriesID(uint64)：`HashID << 40 | auto_increase_id -> SeriesID`.
  - FieldID (uint64) is a combination of SeriesID and TableFiledID (field has an inner table with a number as' TableFiledID)：Field ID is high 24 places with TableFiledID and low 40 are low 40 places with SeriesID.

    Condition：

    - The number of HashID is about 16 million, and the single machine series will cause the List to become long tracked after hundreds of millions of people.
    - The height of SeriesID is 24 places for other uses, and only 40 meaningful are about $1 trillion.
      TSM data files are stored with FieldID and corresponding data information.

    SeriesKey information is stored in an index file and below describes how indexing data are organized.

- #### Index Data Structure Design

  - HashList：`HashID -> List<(SeriesKey, SeriesID)>` for cross-checking with SeriesID.
    - SeriesKey lookup SeriesID process：`Hash(SeriesKey) -> HashID`, get `List\<SeriesKey、SeriesID\>` from HashList based on HashID and then traversed List to get SeriesID.
    - SeriesID lookup SeriesKey process, height 24 digits of SeriesID is HashID, followed by the same search process.
  - `TagValue -> List\<SeriesID\> ` implements the indexing of Tags for filter by tag query.
    - Query condition：`where tag=value`, get a list of SeriesID based on TagValue and get further FieldID to load data from the TSM file.
    - Multiple search conditions are or need to interact with multiple `List\<SeriesID\>`.
  - Require TagValue Order Storage to traverse access.Use `show tag values` to query. HashList structure needs to be maintained in memory, inert load.
    `HashID -> List<(SeriesKey, SeriesID)>`and `TagValue -> List`\<SeriesID>to persist.

### Data Engine

Data mainly used to store time-series data are often multi-reading scenarios, using LSM models that allow data to be written quickly while removing expired and deleted data through compact.DataEngine split into： modules

- #### WAL Module

  WAL will use the write action to apply to the WAL file on the disk before the memory is added to it. The database will be used to restore the memory to the same state as before the crash when the database recovers.When you receive a write request, `wal_job` first checks if the current WAL file is full. Create a new one if it is full and then start writing the content into the file in a certain format.Each req corresponds to a single `seq-no`, `seq-no` increment. This is used to record how many batches have been written since the start of the machine. The `wal_job` thread will pass this `seq_no` back to the main thread.Each point in the same batch has the same `seq_no` write memory or write to the TSM process for `seq_no`.

- #### TimeSeriesFamily

  TimeSeriesFamily, time series data storage unit, which keeps metadata from corresponding memory and corresponding disk data, generally written as tsfamily, and we generate SeriesID and FieldID based on the data tag and field before writing the data.ordinator fetches bucket, based on db and time_range, to get TseriesFamilyID data to tsfamily according to `hash(SeriesID)%shaard_nums`.
  tsfamily members are as follows：

  ```
  pub structure TseriesFamily FU
      tf_id: u32,
      delta_mut_cache: Arc<RwLock<MemCache>>,
      delta_immut_cache: Vec<Arc<RwLock<MemCache>>,
      mut_cache: Arc<RwLock<MemCache>>,
      immut_cache: Vec<Arc<RwLock<MemCache>>,
      super_version: Arc<SuperVersion>,
      super_version_id: AtomicU64,
      version: Arc<RwLock<Version>>,
      opts: Arc<TseriesFamOpt>,
      seq_no: u64,
      immut_ts_min: i64,
      mut_ts_max: i64,
  }
  ```

  `tf_id`：tsfamily identifier, each tf_id has a unique tf_id.

  `mut-cache`：for cache recent written data.

  `immut-cache`：when mut-cache is full `immut-chache`,`immut-cache` flush to generate the TSM file.

  `superversion`：snapshot data for `mut-cache` and `immut-cache`.

  `version`：maintains the snapshot of the current disk data.

- #### Recover and Summary

  Summary is a metadata file from TSM file version changes, and summary will store the summary file.The version of the change metadata is stored in the summary file and is used to restore `version_set` metadata.The long running of node will produce large summary files and we will periodically integrate summary documents.Reduce the duration of the delay recovery process.

  tskv executes recover function： first when creating

  - Get the summary structure from the summary file.
  - According to `last_seq` of the summary structure, which batch is known to have been flush into a file.
  - Based on the wal file and `last_seq`, rewrite without flush batch to memory.
  - Restore `version_set` from the summary file.

- #### Flash

  Flush starts when the `immut-cache` capacity reaches a certain level.
  After performing the writing operation, when `immut-cache` is found full, pack the data in it into a `flush_request`, which is received by the `flush_job` thread and then processed.

  - Remove data from `flush-request`, create a `flush_task` based on the data to do so.
  - Create TSM file based on `TseriesFamilyID`,FileID to write data to TSM file.
  - Based on file information, apply metadata to the `levels_info` corresponding to `version`.
  - Generate `version edit` based on changes to `seq-no`, `TseriesFamilyID` and more.
  - Make all generated `version edit` via `summary_task_senter` to the `summary_job` thread created when the tskv was created, and start processing the `version_edit` after receiving the request and writing the `version_edit` to the summary file.

- #### Competence

  We use LSM tree to sort data.Often the data in the time-series database are written in chronological order.But IoT will have a scenario where data will be replenished and will cause timestamp problems. Apart from this, it is difficult to ensure the sequence of writing for all users due to network delays in a public cloud scenario.In the face of many complex writing scenarios, we need to take into account multiple complex scenarios when it comes to data compaction.

  The purpose of compaction is：

  - Generate larger tsm files by aggregating small tsm files.
  - Clear expired or flagged deleted files.
  - Decrease reading magnification and maintain metadata for `level_info` in our current version.

- #### level_range compaction

  ![level\_range](/img/level_range.jpg)

  - Typically, the time series database is written sequentially according to the data of the point of time, and we have added delta files to cope with the disordered data.delta data will flush to the L0 layer.
  - Data from L1 to L3, `LevelInfo` are tiered emissions according to time. Each layer has a fixed time range and does not overlap. Data in memcache has a fixed time range.Each layer has a time horizon for action updates when compaction or flush is made.
  - Every new TSM file written has the latest time range at this level.This is the maximum time range of `TimeRange(ts_min, ts_max)`, `ts_max` for files in filename in the L0 layer.
  - The compact pick process creates a virtual `time_window`.The `time_window` selects the appropriate TSM file in this layer for compaction to the next layer while updating the data on `level_info`.Update TSMin from `level_info` to the maximum timestamp of `time_window`, that is, move forward in this layer of time.The newest TSM file will be placed on the next layer, where `ts_max` will push to the maximum value of `time_window`.
  - Start at L3, by table the TSM file by directory; the same table TSM file will be placed together. Support for generating parquet files is on S3 for hierarchical storage.

- #### time_window_compaction

  ![time\_window](/img/time_range.jpg)

  - Windows based compaction is different from `level_range` and when `immut_cache` flush to disk, different TSM files are generated into window, depending on the TSM time range, and window is created dynamically over time.Every window is responsible for writing over time.

  - Within window, there are some discrete data tsm file blocks that need to be merged, generating larger blocks. Windows internal will maintain a list of metadata about files. Compared to the `level_range` merger, the `time_window` compaction method reduces the size of the writing.

- #### data_engine data stream

  ![data\_flow](/img/data_engine.jpg)

## Other system design

### Tenant segregation

- #### query layer

  In DataFusion, catalog isolation is assigned to `catalog/schema/table`.We use this isolation to separate the tenant(namespace)/database/table\`.

  - Table corresponds to a specific table in a specific database, providing a schema definition with a specific table that implements TableProvider

  - The database corresponds to a database in a specific database and manages multiple tables below.

  - The name goes to Catalog. Each tenant holds a catalog, the db seen in different tenants is different, and different tenants can use the same database name. The user logged in with TenantID by default to see his own namespace, which means that namespace has a soft isolation.

  - #### tskv Layer

  Catalog partition policy： `/User/db/bucket/replaset_id/vnode_id` is mentioned in the above introduction.
  tskv is an example on every Node node.Save all Vnode information on the current Node.Each Vnode keeps data in a separate directory.Cleaning up data according to the configured db return policy.At the same time, we can easily use data catalogues to account for tenants.
