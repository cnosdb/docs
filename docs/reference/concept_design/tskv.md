---
title: 存储引擎
order: 2
---

## TSKV 索引与数据存储

tskv 主要承担数据和索引的存储，对 node 节点上所有 Vnode 进行管理， 每个 Vnode 负责某个 db 里的部分数据。在 Vnode 中主要有 3 个模块组成 WAL，IndexEngine 和 DataEngine。

![tskv](/img/tskv.jpg)

### Index Engine

用来存储时序数据的索引通常来说是读多写少的模型，主要能够进行快速索引和基于 tagkey 进行条件过滤，过滤出合适的 series。

主要功能有：

1. 存储正排索引。
2. 存储倒排索引。
3. 缓存 catalog 信息。

常用查询语句：

```sql
SELECT xxx from table where tag1= value1 && tag2=value2 [and time > aaa and time < bbb] [group by\order by\limit ....]
```

索引的设计主要针对 where 过滤条件；用于降低数据的搜索规模，加快数据的查询效率。

支持以下几种过滤条件：

> 1. 等于、不等于；如：tag=value，tag!=value
> 2. 大于、小于；如：tag < value
> 3. 前缀匹配；如：tag=aaa\_\*
> 4. 正则表达式；如：tag=aaa\*bbb

数据写入的时进行索引的构建。在时序数据库中多是对每个 tag 进行索引，多个 tag 所对应的 value 组合为一个 series key。

虽然时序数据库是写多读少，但是写入数据时对索引的使用更多是读取而不是构建。时序数据库多是对同一个 series 不同时间点采样写入，所以每个 series 的索引信息只在第一次写入时需要构建，后面写入时判断 series 存在（读操作）就不再进行索引构建。

- #### 存储结构

    - 根据 hash 函数计算 `HashID：hash(SeriesKey) -> HashID` (24 位整型，大约 1600 万); HashID 与自增 id 得到 SeriesID(uint64)：`HashID << 40 | auto_increment_id -> SeriesID` 。
    - FieldID（uint64）由 SeriesID 与 TableFiledID 组合而成(field 在 table 内部有一个编号记为 TableFiledID)：FieldID 的高 24 位是 TableFiledID、低 40 位是 SeriesID 的低 40 位。

      限制条件：
        - HashID 数量大约 1600 万，单台机器 Series 规模上亿以后会导致 List 变长拖累查找。
        - SeriesID 的高 24 位有其他用途，只有低 40 位有意义大约是 1 万亿左右。
          TSM 数据文件存放 FieldID 以及对应的 Data 信息。

      SeriesKey 相关信息存放在索引文件，下面讲述索引数据组织方式。

- #### 索引数据结构设计

    - HashList：`HashID -> List<(SeriesKey、SeriesID)>` 用于 SeriesKey 与 SeriesID 互查。
        - SeriesKey 查找 SeriesID 过程：`Hash(SeriesKey) -> HashID`，根据 HashID 从 HashList 中得到 `List\<SeriesKey、SeriesID\>`，然后遍历 List 获取 SeriesID。
        - SeriesID 查找 SeriesKey 过程，取 SeriesID 的高 24 位为 HashID，后面查找过程同上。
    - `TagValue -> List\<SeriesID\> ` 实现对 Tag 的索引功能，用于 tag 查询条件过滤。
        - 查询条件：`where tag=value`，根据 TagValue 得到 SeriesID 列表，进一步获取 FieldID 从 TSM 文件加载数据。
        - 多个查询条件与或需要对多个 `List\<SeriesID\>` 进行交、并操作。
    - 要求 TagValue 顺序存储可遍历访问。用途 `show tag values` 查询。 HashList 结构需要在内存维护一份，惰性加载。
      `HashID -> List<(SeriesKey、SeriesID)>`与  `TagValue -> List\<SeriesID\>` 进行持久化。

### Data Engine

主要是用来存储时序数据的数据通常来说是写多读少的场景，使用 LSM 的模型，主要是能够快速进行数据写入，同时通过 compaction 清除掉过期和被删除的数据。DataEngine 分为如下几个模块进行：

- #### WAL 模块

  WAL 为写前日志，将写入操作具体应用到内存前先增补到磁盘中的WAL文件里，数据库在崩溃后恢复时，这个日志将被用来使内存恢复到与崩溃前一致的状态。当接收到写入请求后，`wal_job` 首先会检查当前WAL 文件是否已满，如果满了就新建一个，然后开始按照一定格式将内容写入文件中。每一个req单独对应一个`seq-no`，`seq-no` 递增，用来记录开机以来有多少批次已经被写入。 `wal_job` 线程会将这个 `seq_no` 传回主线程。同一批次的每个point都有相同的 `seq_no` 写入内存或写入成TSM时都会针对 `seq_no` 进行一定的处理。

- #### TimeSeriesFamily

  TimeSeriesFamily， 时序数据的储存单元，保存着对应的内存中的数据和对应的磁盘中的数据的元数据，一般简写为 tsfamily，我们在写入数据前，会根据数据的 tag 和 field 生成 SeriesID 和 FieldID。coordinator 根据 db 和 time_range，获取 bucket，根据 `hash（SeriesID）% shard_nums` 获取 TseriesFamilyID 向 tsfamily 写数据。
  tsfamily 成员如下：

    ```
    pub struct TseriesFamily {
        tf_id: u32，
        delta_mut_cache: Arc<RwLock<MemCache>>，
        delta_immut_cache: Vec<Arc<RwLock<MemCache>>>，
        mut_cache: Arc<RwLock<MemCache>>，
        immut_cache: Vec<Arc<RwLock<MemCache>>>，
        super_version: Arc<SuperVersion>，
        super_version_id: AtomicU64，
        version: Arc<RwLock<Version>>，
        opts: Arc<TseriesFamOpt>，
        seq_no: u64，
        immut_ts_min: i64，
        mut_ts_max: i64，
    }
    ```

  `tf_id`：tsfamily 的标识符，每个 tsfamily 具有唯一的 tf_id。

  `mut-cache`：用于 cache 最新写入的数据。

  `immut-cache`：当 mut-cache 满了后，转为 `immut-chache`，`immut-cache` flush 到磁盘，生成 TSM 文件。

  `super-version`：当前 tsfamily 的 `mut-cache` 和 `immut-cache` 的快照数据。

  `version`：维护当前 tsfaimily 中磁盘数据的快照。

- #### Recover 和 Summary

  Summary 是 TSM 文件版本变更产生的元数据文件，summary 会对应存储 summary 文件。summary 文件中存储着版本变更元信息 `version_edit`，用于宕机恢复 `version_set` 元数据。node 节点长时间运行会产生较大的 summary 文件，我们会定期将 summary 文件进行整合。减少宕机恢复的时间。

  tskv 在创建时首先会执行 recover 函数：

    - 从 summary 文件中获取得到 summary 结构体。
    - 根据 summary 结构体的 ctx 的 `last_seq`，得知有哪些 batch 已经被 flush 成文件。
    - 根据 wal 文件和 `last_seq`，将没有被 flush 的 batch 重新写入到内存中。
    - 根据 summary 文件恢复出 `version_set`。

- #### Flush

  当 tsfamily 中 `immut-cache` 容量达到一定程度后，就会开始进行 flush。
  在执行完写入操作后，当发现 `immut-cache` 满了后，将其中的数据拿出来打包成一个 `flush_request`，由 `flush_job` 线程接收到请求后开始处理。

    - 将 `flush-request` 中的数据取出，根据数据创建一个 `flush_task`，执行。
    - 根据 `TseriesFamilyID`，FileID 创建 TSM 文件，将数据写入 TSM 文件。
    - 根据文件信息，apply 元数据到 `version` 的 `levels_info` 的对应的 `level_info`。
    - 根据对 `version` 的修改以及 `seq-no`，`TseriesFamilyID` 等，生成 `version edit`。
    - 将所有生成的 `version edit` 通过 tskv 的 `summary_task_sender` 发送给 tskv 创建时一并创建的 `summary_job` 线程，线程接收到请求后开始处理，将 `version_edit` 写入 summary 文件。

- #### compaction

  我们使用类 LSM tree 的方式进行数据整理。通常情况下时序数据库的数据按时间顺序方式写入。但在 IoT 会有补录数据的场景，会导致时间戳陈旧的问题。 除此之外，因网络延迟在公有云的场景下很难保证所有的用户的写入顺序。面对多种复杂的写入场景，我们需要在对数据 compaction 的时候考虑多种复杂的场景。

  compaction 的目的有：

    - 把小的 tsm 文件进行聚合生成较大的 tsm 文件。
    - 清理已过期或被标记删除的文件。
    - 减小读放大，维护我们当前 version 中 `level_info` 的元数据。


- #### level_range compaction

  ![level_range](/img/level_range.jpg)

    - 通常情况下，时间序列数据库是按照时间点的数据进行顺序写入，为了应对乱序数据，我们增加了 delta 文件。delta 的数据会刷到 L0 层。
    - 从 L1 到 L3，`LevelInfo` 中的数据是按照时间进行分层排放的。 每一层都有一个固定的时间范围 且 不会重叠，memcache 中的数据是有一个固定的时间范围。每一层的时间范围都会有在 compaction 或者 flush 的时候进行动态更新。
    - 每次新写入的 TSM 文件都具有本层最新的时间范围。即 L0 层中 filename 中文件 id 最大 TSM 文件所持有的时间范围中 `TimeRange（ts_min， ts_max)`， `ts_max` 是最大的。
    - compact 的 pick 流程会建立一个虚拟的 `time_window`。`time_window` 会选取本层中合适的 TSM 文件 进行 compaction 到下一层，同时更新本层 `level_info` 的数据。将 `level_info` 中 TSMin 更新到 `time_window` 的最大时间戳，即本层的时间范围向前推进。新生成的 TSM 文件会放入到下一层，下一层的 `time_range` 的 `ts_max` 推进到 `time_window` 的最大值。
    - 在 L3 开始，按照 table 把 TSM 文件按照目录进行划分；同一个 table 的 TSM 文件放到一起。 支持生成 parquet 文件 放到 S3 上进行分级存储。

- #### time_window compaction

  ![time_window](/img/time_range.jpg)

    - 基于 window 的 compaction 方式 不同 `level_range` 的 compaction 方式， 从 `immut_cache` flush 到磁盘中时，会根据 TSM 的时间范围生成不同的 TSM 文件放入到对应的 window 中， window 随着时间的推移，会动态创建。每个 window 负责一段时间内的写入。

    - 在 window 内部会有一些离散的数据 tsm 文件块 需要进行合并，生成较大的文件块。 window 内部会维护一个关于文件的元信息一个列表。 相比与 `level_range` 的合并方式， `time_window` 的 compaction 方式会减小写入的放大。

- #### data_engine 数据流

  ![data_flow](/img/data_engine.jpg)