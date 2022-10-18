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

| 类型            | 描述              | 大小  |
| --------------- | ----------------- | ----- |
| BIGINT          | 整型              | 8字节 |
| BIGINT UNSIGNED | 无符号整型        | 8字节 |
| BOOLEAN         | 布尔类型          | 1字节 |
| TIMESTAMP       | 时间戳            | 8字节 |
| STRING          | UTF-8编码的字符串 | ----- |
| DOUBLE          | 双精度浮点型      | 8字节 |

## 常量

| 类型              | 语法                            | 说明                                   |
|-----------------| ------------------------------- |--------------------------------------|
| BIGINT          | [{+\| -}]123                               |      数值类型                                                 |
| BIGINT UNSIGNED | [+]123                          | 数值类型                                 |
| DOUBLE          | 123.45                          | 数值类型，目前暂不支持科学记数法                     |
| BOOLEAN         | {true\| false\                               |t\|f}             |                                                       |
| STRING          | 'abc'                           | 不支持双引号格式，引号中连续两个''转义成‘               |
| TIMESTAMP       | TIMESTAMP '1900-01-01 12:00:00' | 时间戳，也可以使用cast把BIGINT强制转换成TIMESTAMP类型 |
| --              | NULL                            | 空值                                   |


## 存储引擎

TSKV(Time series key value)是存储引擎的核心部分，具有写入，读取，持久化和故障恢复的功能。

由以下部分组成：

### WAL

wal 为写前日志，将操作具体应用到内存前 append 到磁盘中的 wal 文件里，数据库在崩溃后恢复时，这个日志将被用来使内存恢复到一致的状态。

tskv 创建时 spawn 了一个线程 wal-job，在此之前会创建 wal-task-sender 和 wal-task-receiver，tskv 自己的成员为 wal-task-sender，wa-taskl-rceiver 交给负责处理任务的 wal-job。线程主要负责循环等待 receiver 接收到的 task 并处理。每当有一个写入时，会调用 tskv 的 write 方法，首先会组装一个 wal-task，由 tskv 的 wal-sender 发送一个 task 交给负责 wal-job 的线程来处理。wal-job 线程中会起一个 wal-manager，wal-manager 真正向 wal 文件写入内容。当接收到 task 后，分析 task 类型，假设当前为写入一个 batch 时的情况，task 类型为 write，wal-manager 调用 write 方法：首先会检查当前 wal 文件是否已满，如果满了就新建一个；然后开始按照一定格式将内容写入文件中，同时生成一个 seq-no。seq-no 为一个 u64，每一个 batch 单独对应一个 seq-no，**seq-no 递增，每次加一**，用来记录开机以来有多少 batch 已经被写入。wal-job 线程会将这个 seq-no 传回主线程，同一 batch 的每个 point 都有相同的 seq-no，写入内存或 flush 成 tsm 时都会针对 seq-no 进行一定的处理。

### TimeSeriesFamily

TimeSeriesFamily 是储存的基本单元，保存着对应的内存中的数据和对应的磁盘中的数据的元数据，一般简写为 tsfamily，我们在写入数据前，会根据数据的 tag 和 field 生成 seriesid 和 fieldid。tskv 根据写入数据的 seriesid 来决定从 version-set 中拿到哪个 tsfamily 并写入。写入时会获取 superversion，将写入的 point 转化为 seriesdata，seriesdata 为时间戳和一行数据，所有的数据**按行存储**在 tsfamily 的 memcache 中，当 memcache 的容量达到配置的大小会转化为 immutable，当 immutable memcache 的数量达到配置的大小，会开始进行 flush。将所有的 immutable memcache 封装成 flushreq，通过通道发送出去。

### Flush

tskv 创建时 spawn 了一个线程 flush-job，在此之前会创建 flush-task-sender 和 flush-task-receiver，tskv 自己的成员为 flush-task-sender，flush-task-rceiver 交给负责处理任务的 flush-job。当处理 flush 请求的线程接收到 flushreq 时，会通过一系列操作将其中的 memcache 转化为 datablock（一个 datablock 为储存时间戳和值的两个 vector），另外根据 memcache 中存的数据的时间戳与当前磁盘中 tsm 的最大时间戳比较，将转化而成的 datablock 分为 delta datablock 与正常的 tsm datablock，通过压缩编码，最终写成 delta 文件或 tsm 文件（均为按列存储的 columnfile），delta 文件储存在 tsm tree 第 0 层，tsm 文件储存在 tsm tree 第 1-4 层，将磁盘中文件的元数据储存在 tsfamily 中 version 的 levelInfo 中，执行完毕后，生成 versionedit 发送给处理 summary 的线程

### Summary

概要文件（如 summary-000000）记录了系统的状态变更记录（versionedit），如 tsfamily、columnfile 的增加与删除以及此时对应 WAL 文件中的 seq_no， 在系统启动时，只要扫描概要文件中的全部 versionedit，便能得知系统目前的文件状态，以及 WAL 中的哪些数据没有被 flush 到 columnFile 中，这些数据将被读取至 memcache 用来进行查询以及下一次的 Flush。

### Compaction

tskv 创建时 spawn 了一个线程 compact-job，在此之前会创建 compact-task-sender 和 compact-task-receiver，tskv 自己的成员为 compact-task-sender，compact-task-rceiver 交给负责处理任务的 compact-job，内存数据 (memCache) 持久化任务 (flush)后，开始执行 compaction 任务。执行时先选取文件，遍历 (第 1 ～ 4 层) 层级文件状态 (levelInfo)，对 Level 1-4 进行评分，并选择分数最高的 Level 选取文件并进行合并。从该 Level 中时间段最早的文件开始进行选择，直到文件大小超过配置值。抛弃尾部时间段重叠的文件，因为合并会造成各 Level 的时间段重叠。从 Level 0 中选择时间段重叠的文件，直到文件大小超过配置值。通过一系列转化，将 datablock 合并为 compactingblock，写入 tsm 文件，同时将产生的 VersionEdit 发送至系统状态概要 (Summary) 更新任务。

## 索引

索引结构有两种设计，分别对应两种不同的用途，`SeriesKey与SeriesID`互查、`Tag`查询条件过滤。
其中`SeriesKey`与`SeriesID`互查的结构为`HashID->List<(SeriesKey、 SeriesID)>`，这种结构可以使用`SeriesKey`查找`SeriesID`，即`Hash(SeriesKey)->HashID`，根据`HashID从HashList`中得到`List<SeriesKey、SeriesID>`，然后遍历`List`获取`SeriesID`。同时也可以反向查找，根据`SeriesID`查找`SeriesKey`，取`SeriesID`的高 24 位为`HashID`，后面的过程如同前者。
使用`TagValue -> List<SeriesID>`实现对 Tag 的索引功能，根据`TagValue`获得`SeriesID`列表，进一步获取`FieldID`从 TSM 文件加载数据。多个查询条件中，还可能需要对多个`List<SeriesID>`进行并、交操作。

## 查询引擎
