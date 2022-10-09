---
title: 概念
icon: config
order: 4
---

## 数据类型

- TIMESTAMP 
- BIGINT
- BIGINT UNSIGNED
- DOUBLE
- STRING
- BOOLEAN


## 存储引擎

TSKV(Time series key value)是存储引擎的核心部分，具有写入，读取，持久化和故障恢复的功能。

由以下部分组成：

### WAL

wal为写前日志，将操作具体应用到内存前append到磁盘中的wal文件里，数据库在崩溃后恢复时，这个日志将被用来使内存恢复到一致的状态。

tskv创建时spawn了一个线程wal-job，在此之前会创建wal-task-sender和wal-task-receiver，tskv自己的成员为wal-task-sender，wa-taskl-rceiver交给负责处理任务的wal-job。线程主要负责循环等待receiver接收到的task并处理。每当有一个写入时，会调用tskv的write方法，首先会组装一个wal-task，由tskv的wal-sender发送一个task交给负责wal-job的线程来处理。wal-job线程中会起一个wal-manager，wal-manager真正向wal文件写入内容。当接收到task后，分析task类型，假设当前为写入一个batch时的情况，task类型为write，wal-manager调用write方法：首先会检查当前wal文件是否已满，如果满了就新建一个；然后开始按照一定格式将内容写入文件中，同时生成一个seq-no。seq-no为一个u64，每一个batch单独对应一个seq-no，**seq-no递增，每次加一**，用来记录开机以来有多少batch已经被写入。wal-job线程会将这个seq-no传回主线程，同一batch的每个point都有相同的seq-no，写入内存或flush成tsm时都会针对seq-no进行一定的处理。

### TimeSeriesFamily

TimeSeriesFamily是储存的基本单元，保存着对应的内存中的数据和对应的磁盘中的数据的元数据，一般简写为tsfamily，我们在写入数据前，会根据数据的tag和field生成seriesid和fieldid。tskv根据写入数据的seriesid来决定从version-set中拿到哪个tsfamily并写入。写入时会获取superversion，将写入的point转化为seriesdata，seriesdata为时间戳和一行数据，所有的数据**按行存储**在tsfamily的memcache中，当memcache的容量达到配置的大小会转化为immutable，当immutable memcache的数量达到配置的大小，会开始进行flush。将所有的immutable memcache封装成flushreq，通过通道发送出去。

### Flush

tskv创建时spawn了一个线程flush-job，在此之前会创建flush-task-sender和flush-task-receiver，tskv自己的成员为flush-task-sender，flush-task-rceiver交给负责处理任务的flush-job。当处理flush请求的线程接收到flushreq时，会通过一系列操作将其中的memcache转化为datablock（一个datablock为储存时间戳和值的两个vector），另外根据memcache中存的数据的时间戳与当前磁盘中tsm的最大时间戳比较，将转化而成的datablock分为delta datablock与正常的tsm datablock，通过压缩编码，最终写成delta文件或tsm文件（均为按列存储的columnfile），delta文件储存在tsm tree第0层，tsm文件储存在tsm tree第1-4层，将磁盘中文件的元数据储存在tsfamily中version的levelInfo中，执行完毕后，生成versionedit发送给处理summary的线程

### Summary

概要文件（如 summary-000000）记录了系统的状态变更记录（versionedit），如 tsfamily、columnfile 的增加与删除以及此时对应 WAL 文件中的 seq_no， 在系统启动时，只要扫描概要文件中的全部 versionedit，便能得知系统目前的文件状态，以及 WAL 中的哪些数据没有被 flush 到 columnFile 中，这些数据将被读取至 memcache 用来进行查询以及下一次的 Flush。

### Compaction

tskv创建时spawn了一个线程compact-job，在此之前会创建compact-task-sender和compact-task-receiver，tskv自己的成员为compact-task-sender，compact-task-rceiver交给负责处理任务的compact-job，内存数据 (memCache) 持久化任务 (flush)后，开始执行 compaction 任务。执行时先选取文件，遍历 (第 1～4 层) 层级文件状态 (levelInfo)，对 Level 1-4 进行评分，并选择分数最高的 Level 选取文件并进行合并。从该 Level 中时间段最早的文件开始进行选择，直到文件大小超过配置值。抛弃尾部时间段重叠的文件，因为合并会造成各 Level 的时间段重叠。从 Level 0 中选择时间段重叠的文件，直到文件大小超过配置值。通过一系列转化，将datablock合并为compactingblock，写入tsm文件，同时将产生的 VersionEdit 发送至系统状态概要 (Summary) 更新任务。

## 索引

索引结构有两种设计，分别对应两种不同的用途，`SeriesKey与SeriesID`互查、`Tag`查询条件过滤。
其中`SeriesKey`与`SeriesID`互查的结构为`HashID->List<(SeriesKey、 SeriesID)>`，这种结构可以使用`SeriesKey`查找`SeriesID`，即`Hash(SeriesKey)->HashID`，根据`HashID从HashList`中得到`List<SeriesKey、SeriesID>`，然后遍历`List`获取`SeriesID`。同时也可以反向查找，根据`SeriesID`查找`SeriesKey`，取`SeriesID`的高24位为`HashID`，后面的过程如同前者。
使用`TagValue -> List<SeriesID>`实现对Tag的索引功能，根据`TagValue`获得`SeriesID`列表，进一步获取`FieldID`从TSM文件加载数据。多个查询条件中，还可能需要对多个`List<SeriesID>`进行并、交操作。

## 查询引擎