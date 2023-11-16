---
title: 版本发布
order: 2
---

# 版本发布历史

## v2.3.3 Antlia

发布日期：2023年9月28日

### 功能优化
- 优化了读取性能 [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 优化了 DataType 的 Ord 实现 [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 添加了  data block reader [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 移除了字段扫描定时器 [#1467](https://github.com/cnosdb/cnosdb/pull/1467)

### 问题修复：
- 修复了允许修改 usage_schema 数据库的问题 [1421](https://github.com/cnosdb/cnosdb/pull/1421)
- 修复了多个元数据节点上用户和租户的不一致性问题  [1417](https://github.com/cnosdb/cnosdb/pull/1417)
- 修复了删除租户时不删除数据的问题 [1418](https://github.com/cnosdb/cnosdb/pull/1418)
- 修复了生成没有选项的 TLS lv-2 证书的问题  [1441](https://github.com/cnosdb/cnosdb/pull/1441)
- 修复了创建 TSF 时数据丢失的问题  [1478](https://github.com/cnosdb/cnosdb/pull/1478)
- 修复了在 Tskv 上取消查询任务 [1488](https://github.com/cnosdb/cnosdb/pull/1488)
- 修复了在更新表冲突后重试  [1503](https://github.com/cnosdb/cnosdb/pull/1503)
- 修复了更改数据库的问题  [1504](https://github.com/cnosdb/cnosdb/pull/1504)
- 修复了 Arrow Flight SQL JDBC API 的 getCatalogs、getSchemas 和 getTables 的问题 [1520](https://github.com/cnosdb/cnosdb/pull/1520)
- 修复了 Arrow Flight SQL 的 getTables API    [1528](https://github.com/cnosdb/cnosdb/pull/1528)
- 修复了未及时报告 NodeMetrics 的问题    [1541](https://github.com/cnosdb/cnosdb/pull/1541)
- 更新表格导致数据丢失的问题    [1542](https://github.com/cnosdb/cnosdb/pull/1542)
- 修复了解析 Line Protocol 时出现的错误    [1539](https://github.com/cnosdb/cnosdb/pull/1539)

## v2.3.2

发布日期：2023年8月2日

### 新增特性
- 增加监控指标 'http_data_out' [#1304](https://github.com/cnosdb/cnosdb/pull/1304)
- client 中添加 chunked 模式 [#1357](https://github.com/cnosdb/cnosdb/pull/1357)
- WAL 增加日志种类：DROP VNODE 和 DROP TABLE [#1340](https://github.com/cnosdb/cnosdb/pull/1340)
### 功能优化
- 改进 flight-sql 实现, 增加其中 do_put_prepared_statement_update 接口的实现 [#1329](https://github.com/cnosdb/cnosdb/pull/1329)
- 改进 meta watch 并且优化查询之间的交互过程 [#1314](https://github.com/cnosdb/cnosdb/pull/1314)
- 升级 datafusion 版本到 27.0.0 [#1323](https://github.com/cnosdb/cnosdb/pull/1323)
- 为 flatbuffers  模型添加一些额外的方法 [#1361](https://github.com/cnosdb/cnosdb/pull/1361)
### 问题修复
- 修复生成重复 series id 的问题 [#1301](https://github.com/cnosdb/cnosdb/pull/1301)
- 修复 sample 函数返回错误的问题 [#1296](https://github.com/cnosdb/cnosdb/pull/1296)
- 修复写入 binlog 时出现 panic 的问题 [#1309](https://github.com/cnosdb/cnosdb/pull/1309)
- 修复逻辑计划错误的 schema [#1332](https://github.com/cnosdb/cnosdb/pull/1332)
- 修复 CREATE TABLE 解析错误的问题 [#1318](https://github.com/cnosdb/cnosdb/pull/1318)
- 修复 raft_bucket json 反序列化问题 [#1347](https://github.com/cnosdb/cnosdb/pull/1347)
- 修复 arrow-flight-sql odbc 握手失败的问题 [#1336](https://github.com/cnosdb/cnosdb/pull/1336)
- 修复导入 Line Prototol 数据时提示内存不足的问题  [#1319](https://github.com/cnosdb/cnosdb/pull/1319)
- 修复 data 节点健康检查有错误的问题 [#1352](https://github.com/cnosdb/cnosdb/pull/1352)
- 修复删除表时意外删除无关列的问题 [#1363](https://github.com/cnosdb/cnosdb/pull/1363)
- 修复 client 不能通过 ca.crt 连接到 server 的问题 [#1369](https://github.com/cnosdb/cnosdb/pull/1369)
- 修复 tokio trace 过滤 [#1372](https://github.com/cnosdb/cnosdb/pull/1372)
- 修复插入 line protocol 的错误 [#1366](https://github.com/cnosdb/cnosdb/pull/1366)
### 行为变更
- 配置变更 [#1372](https://github.com/cnosdb/cnosdb/pull/1372)
- 创建数据库时默认 TTL 设置为无限长 [#1354](https://github.com/cnosdb/cnosdb/pull/1354)

## v2.3.1

发布日期：2023年6月21日

### 新增特性
- 新增trace [#1272](https://github.com/cnosdb/cnosdb/issues/1272)
- 支持滑动窗口的gap fill [#1171](https://github.com/cnosdb/cnosdb/pull/1171)
- 支持flight sql的元数据api [#1173](https://github.com/cnosdb/cnosdb/pull/1173)
- 支持授予admin权限 [#1929](https://github.com/cnosdb/cnosdb/pull/1219)
- 实现了sample函数 [#1228](https://github.com/cnosdb/cnosdb/pull/1228)
- client端支持https链接 [#1225](https://github.com/cnosdb/cnosdb/pull/1225)
### 功能优化
- 提前释放缓存分区的rwlock [#1181](https://github.com/cnosdb/cnosdb/pull/1181)
- 系统表实现查看库表功能 [#1212](https://github.com/cnosdb/cnosdb/pull/1212)
- grpc server端去掉TLS协议链接的支持 [#1216](https://github.com/cnosdb/cnosdb/pull/1216)
- 修改bucket起始时间精度为ms [#1215](https://github.com/cnosdb/cnosdb/pull/1215)
- 支持多线程写hinted handoff [#1230](https://github.com/cnosdb/cnosdb/pull/1230)
- TskvExec分区读取策略 [#1200](https://github.com/cnosdb/cnosdb/pull/1200)
- 新增修复损坏的索引文件工具 [#1238](https://github.com/cnosdb/cnosdb/pull/1238)
- Compaction消耗过多内存 [#1237](https://github.com/cnosdb/cnosdb/pull/1237)
- 在查询metrics加入host信息 [#1202](https://github.com/cnosdb/cnosdb/pull/1202)
- 添加write_data_in和sql_data_in的metrics信息 [#1241](https://github.com/cnosdb/cnosdb/pull/1241)
- 过期的WAL文件有时不会被自动删除 [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- 当某些Vnode较“冷”(很少进行写入)时，过期的WAL文件不会被自动删除 [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- 当Cache刷入磁盘时，检查WAL是否过期并删除过期的WAL [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- 优化FileManager中的一些方法 [#1268](https://github.com/cnosdb/cnosdb/pull/1268)
### 问题修复
- 迁移Vnode时复制目标Vnode导致数据丢失 [#1151](https://github.com/cnosdb/cnosdb/issues/1151)
- 元数据验证失败导致写数据失败 [#1184](https://github.com/cnosdb/cnosdb/issues/1184)
- 删除不存在的表返回状态不符合预期 [#1218](https://github.com/cnosdb/cnosdb/issues/1218)
- VNODE_DISK_STORAGE和VNODE_CACHE_SIZE监控指标统计不准确 [#1197](https://github.com/cnosdb/cnosdb/issues/1197)
- 系统表查询不到正在执行的sql [#1188](https://github.com/cnosdb/cnosdb/issues/1188)
- 导出数据时生成许多只有列名信息的空文件 [#1211](https://github.com/cnosdb/cnosdb/issues/1211)
- 更新表时未检查列编码 [#1148](https://github.com/cnosdb/cnosdb/issues/1148)
- Vnode损坏导致数据查询结果不一致 [#1192](https://github.com/cnosdb/cnosdb/issues/1192)
- 数据写入失败返回结果为success [#1084](https://github.com/cnosdb/cnosdb/issues/1084)
- 写数据时，大量标记为已删除的文件句柄，导致磁盘空间持续增长 [#1242](https://github.com/cnosdb/cnosdb/issues/1242)
- 写数据时，连接建立过多 [#1251](https://github.com/cnosdb/cnosdb/issues/1251)
- 在Docker环境中编译CnosDB元组件时发生错误 [#1266](https://github.com/cnosdb/cnosdb/issues/1266)
- 修复prom remote_read 没有返回数据的问题 [#1273](https://github.com/cnosdb/cnosdb/issues/1273)
- 导出数据时内存耗尽 [#955](https://github.com/cnosdb/cnosdb/issues/955)
- 查询数据结果不一致、结果不准确 [#1283](https://github.com/cnosdb/cnosdb/pull/1283)
- 升级版本后，DB recovery非常慢 [#1180](https://github.com/cnosdb/cnosdb/issues/1180)
- describle tables/databases 语法解析错误 [#1160](https://github.com/cnosdb/cnosdb/issues/1160)
- 数据导入内存占用过高导致OOM，最终数据写入失败 [#1141](https://github.com/cnosdb/cnosdb/issues/1141)
- 移动Vnode时，设置了错误的seq_no参数 [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- sql执行报"Not a field name" [#1033](https://github.com/cnosdb/cnosdb/issues/1033)
- 外部表数据导入进来会覆盖原表数据 [#1131](https://github.com/cnosdb/cnosdb/issues/1131)
### 行为变更
- show tables结果显示的Table变更为table_name [#1212](https://github.com/cnosdb/cnosdb/pull/1212)
## v2.3.0

2023年05月09日，CnosDB 发布 V2.3.0 版。该版本主要增加了流计算能力以及一些企业版功能。这个版本的主要修改还包括：

- 增强了查询功能，现在支持滚动窗口、滑动窗口以及流式计算。
- 对查询迭代器进行了并行化处理，从而极大提升了查询性能。
- 新增了一些问题定位的工具，包括使用 CPU/Memory pprof和异步调用堆栈打印。
- 进一步完善了测试用例系统，包括完善门禁测试用例和增加对SQLLogicTest 的支持。
- 支持 OpenTSDB 写入协议。
- HTTP请求现在支持流式处理方式，有效减少了数据库的内存占用。
- 在企业版本中，增加了订阅和分级存储的支持。欢迎与我们联系。

此外，还修复了一些 bug。

## v2.2.0

2023年03月01日，CnosDB 发布 V2.2.0 版。该版本主要增加了存算分离模式并对分布式的性能和稳定性进一步增强，并继续保持开源。这个版本的主要修改还包括：

- 支持Prometheus Remote Read/Write API。
- 提高性能：增加索引和文件索引的缓存。
- 重构coodinator和watch的代码，提高性能并增强稳定性。
- 支持多种启动模式： 存算一体、分离和单机模式启动。
- 完善监控metric并增加内存限制以防止oom。
- 完善运维功能，增加copy/move/drop vnode的功能。
- 增加count下推，优化count(*)，大幅提升了count的性能。
- 增加多线程flush，减少写入时内存copy，优化一些锁的使用，提高了写入性能。

此外，还有一系列bug修复。


## v2.1.0

2023年01月10日，CnosDB 发布 V2.1.0 版。该版本发布了CnosDB2.0分布式集群版本，并继续保持开源。这个版本的主要修改还包括：

- 新增了支持分布式集群的元数据服务和协调者服务。
- 引入了RBAC权限系统，通过SQL支持用户管理、角色管理和权限管理。
- 重构了倒排索引，解决了索引放大的问题。
- 查询上新增了展示正在执行的query和停掉正在执行的query的功能。
- 统一了对用户的错误码返回，使其更加清晰、简洁。
- 新增了针对多租户场景下的quota支持。

此外，还包括一系列metric指标和性能优化，以及bug修复等。

## V2.0.1

2022年11月08日，CnosDB 发布 V2.0.1 版。该版本修复了CnosDB部分重点错误，并且更新了一些必要的新功能，更新细节如下：

**Bug修复：**

- 修复表和数据库对象名称错误的问题。
- 修复WAL中断时文件损坏的错误。
- 修复TableWriteExec只能写入一个分区。
- 修复Schema使用错误，当将数据刷新到磁盘导致查询混乱。
- 增加TskvScan的投影有效性检查并优化列修剪。
- 修复写入的行协议中field可以为空的问题。
- 修复解析包含逗号或等号的请求字符串时失败的问题。
- 增加对写入point进行field和tag异常检查。
- 修复compaction时导致的写入挂起的问题。
- 修复SELECT语句中仅包含tag列时不返回数据的Bug。
- 在全局上下文添加tsfid。
- 禁用cross join。

**新功能：**

- 限制查询连接数和查询内容的大小。

**其他：**
- 使用HashMap的Key更清晰。
- 升级DataFusion版本到13.0.0。
- 解决依赖冲突的问题。
- 添加log_err macro。
- 检查输入的point格式。
- 性能优化。
- 添加收集信息。
- 结构体命名修改，将Point::table改为tab，将Points::database 改为 db.

## V2.0.0

2022年10月24日，CnosDB 发布 V2.0.0 版本。
这次的版本发布是一个新的开始，我们基于Rust重新构建了CnosDB时序数据库，提升了CnosDB的性能，增强了CnosDB的易用性，也使CnosDB更加适应云生态的要求。

**特色功能：**
- 专为时序数据设计的存储引擎，优化写操作，支持删除和更新操作；
- 压缩算法由用户灵活指定，压缩比可调；
- 基于Apache Arrow及Datafusion 实现了查询引擎；
- 支持标准SQL，支持Schemaless 写入；
- 多索引优化了查询效率；
- 生态友好，支持RESTful接口，支持Telegraf、Grafana等通用第三方生态组件。