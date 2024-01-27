# 发行说明

## v2.3.4.4

发布日期：2024年01月27日

### 功能优化

- 为 `FileCursor` 添加内存缓冲区。[#1927](https://github.com/cnosdb/cnosdb/pull/1927)
- 添加配置文件项目 `file_buffer_size`。[#1960](https://github.com/cnosdb/cnosdb/pull/1960)
- 添加配置文件项目 `copyinto_trigger_flush_size`。[#1944](https://github.com/cnosdb/cnosdb/pull/1944)

### 错误修复

- 修复宽表导致的 `COPY INTO` 错误。[#1924](https://github.com/cnosdb/cnosdb/pull/1924)
- 在刷新前更新 `version_set` 版本。[#1926](https://github.com/cnosdb/cnosdb/pull/1926)
- 修复删除 `ScalarValueForkDF`。[#1938](https://github.com/cnosdb/cnosdb/pull/1938)
- 当表没有数据时，不执行底层的删除列数据操作。[#1950](https://github.com/cnosdb/cnosdb/pull/1950)
- 修复重新启动时，反序列化流语句失败的问题。[#1953](https://github.com/cnosdb/cnosdb/pull/1953)
- 不允许更改 root 用户的`grant_admin` 参数。[#1954](https://github.com/cnosdb/cnosdb/pull/1954)

## v2.3.4.3

发布日期：2024年01月09日

### 问题修复

- 修复 tskv 迭代器有时会反回比预期更多的数据。[#1895](https://github.com/cnosdb/cnosdb/pull/1895)

## v2.3.4.2

发布日期：2024年01月03日

### 功能优化

- 重构 e2e_test 中的实用程序和不相关内容。[#1882](https://github.com/cnosdb/cnosdb/pull/1882)

### 问题修复

- 修复有关合并的错误。[#1889](https://github.com/cnosdb/cnosdb/pull/1889)

## v2.3.4.1

发布日期：2024年12月29日

### 功能优化

- 删除 `cold_data_server` 和 `NodeAttribute` 模块。[#1859](https://github.com/cnosdb/cnosdb/pull/1859)
- 在 `meta` 服务中添加 `setkv` 和 `delete` 的 http 接口。[#1835](https://github.com/cnosdb/cnosdb/pull/1835)
- 客户端启动时隐藏密码。[#1881](https://github.com/cnosdb/cnosdb/pull/1881)

### 问题修复

- 修复`dedup_by_front` 删除了错误元素的错误。 [#1815](https://github.com/cnosdb/cnosdb/pull/1815)
- 修复异步 LruCache 导致的错误。 [#1820](https://github.com/cnosdb/cnosdb/pull/1820)
- 修复 `meta` 服务创建的快照为空的问题。 [#1835](https://github.com/cnosdb/cnosdb/pull/1835)



## v2.3.4 Apus

发布日期：2023年11月24日

### 新增特性

- 适配 [Vector](https://vector.dev/) [#1628](https://github.com/cnosdb/cnosdb/pull/1628)
- 添加 increase 函数，http_limiter 和 metrics [#1629](https://github.com/cnosdb/cnosdb/pull/1629)
- 将写请求和SQL请求都路由到查询服务器 [#1760](https://github.com/cnosdb/cnosdb/pull/1760)
- 支持HTTP压缩 [#1762](https://github.com/cnosdb/cnosdb/pull/1762)
- 支持导出DDL [#1782](https://github.com/cnosdb/cnosdb/pull/1782)
- 通过配置启动服务 [#1789](https://github.com/cnosdb/cnosdb/pull/1789)

### 功能优化

- 通过读取系统表实现 desc table/database，并修复一些单词错误 [#1692](https://github.com/cnosdb/cnosdb/pull/1692)
- 移除调试日志 [#1793](https://github.com/cnosdb/cnosdb/pull/1793)

### 问题修复

- 删除租户不删除成员的错误 [#1632](https://github.com/cnosdb/cnosdb/pull/1632)
- 生成带别名的插值函数计划失败的问题 [#1777](https://github.com/cnosdb/cnosdb/pull/1777)
- 添加对 `stream table` 的参数 `event_time_column` 的检查 [#1744](https://github.com/cnosdb/cnosdb/pull/1744)
- 在重新启动时流作业丢失数据库信息的问题 [#1734](https://github.com/cnosdb/cnosdb/pull/1734)
- 禁止创建具有相同名称列的流表 [#1733](https://github.com/cnosdb/cnosdb/pull/1733)
- 优化直接选择流表的错误消息 [#1732](https://github.com/cnosdb/cnosdb/pull/1732)
- 获取系统内存单位错误 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- CLI 写入行协议时没有显示错误消息 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 删除用户时不删除租户成员的问题 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 未找到租户返回HTTP状态码500 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 修复 gRPC 大小限制 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 创建外部表时的表名错误 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)

## v2.4.0 Milky Way

发布日期：2023年10月24日

### 新增特性

📈 数据汇总不再单调，新的聚合函数登场！

- compact_state_agg [#1359](https://github.com/cnosdb/cnosdb/pull/1359)
- gauge_agg [#1370](https://github.com/cnosdb/cnosdb/pull/1370)
- first [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- last [#1413](https://github.com/cnosdb/cnosdb/pull/1413)
- mode [#1440](https://github.com/cnosdb/cnosdb/pull/1440)
- increase [#1476](https://github.com/cnosdb/cnosdb/pull/1476)
- delta [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- time_delta [#1405](https://github.com/cnosdb/cnosdb/pull/1405)
- rate [#1405](https://github.com/cnosdb/cnosdb/pull/1405)

🌐 GIS函数集锦 [#1465](https://github.com/cnosdb/cnosdb/pull/1465)

- ST_AsBinary
- ST_GeomFromWKB
- ST_Distanc
- ST_Area

💼 系统表大改造 [#1461](https://github.com/cnosdb/cnosdb/pull/1461)

- 全都小写，系统字段名规范化，一切都走心。

🔄 修改数据炸裂更新，修改数据变得so easy，你想改就改！[#1484](https://github.com/cnosdb/cnosdb/pull/1484) [#1517](https://github.com/cnosdb/cnosdb/pull/1517) [#1623](https://github.com/cnosdb/cnosdb/pull/1623) [#1590](https://github.com/cnosdb/cnosdb/pull/1590)

```sql
UPDATE table_name SET ( assignment_clause [, ...] ) where_clause
assignment clause :
    tag_name = value_expression
```

```sql
UPDATE table_name SET ( assignment_clause [, ...] ) where_clause
assignment clause :
    field_name = value_expression
ALTER TABLE tb_name alter_table_option;
```

```sql
alter_table_option: {
      ADD TAG col_name
    | ADD FIELD col_name [CODEC(code_type)]
    | ALTER col_name SET CODEC(code_type)
    | DROP col_name
    | RENAME COLUMN col_name TO new_col_name
}
```

```sql
DELETE FROM table_name where_clause
```

其他重磅功能如下：

- 适配 Vector。[#1380](https://github.com/cnosdb/cnosdb/pull/1380)
- 新增 Geometry 类型。[#1463](https://github.com/cnosdb/cnosdb/pull/1463)
- 添加直方图导出。[#1472](https://github.com/cnosdb/cnosdb/pull/1472)
- 支持 duration_in 函数 [#1423](https://github.com/cnosdb/cnosdb/pull/1423) [#1408](https://github.com/cnosdb/cnosdb/pull/1408)
- 新增对 grpc 压缩的支持 [#1631](https://github.com/cnosdb/cnosdb/pull/1631)
- 新增集群数据导入导出工具 [#1635](https://github.com/cnosdb/cnosdb/pull/1635)
- 新增数据库延迟删除。[#1510](https://github.com/cnosdb/cnosdb/pull/1510)

```sql
DROP DATABASE [IF EXISTS] <db_name> [AFTER <time_interval>]
```

### 功能优化

内存使用得到有效减少，TSKV经过优化更加高效，而Flatbuffers、构建索引等方面也得到了明显的提升。除此之外，缓存重构和减少克隆操作等细致优化，让整体性能更上一层楼。

- 支持下推 <!=> 比较运算符到数据源。[#1469](https://github.com/cnosdb/cnosdb/pull/1469)
- 按 vnode 拆分 WAL。[#1454](https://github.com/cnosdb/cnosdb/pull/1454)
- 优化 TSKV  以减少内存使用。 [#1199](https://github.com/cnosdb/cnosdb/pull/1199)
- 重构 DESC TABLES / DESC DATABASES。[#1397](https://github.com/cnosdb/cnosdb/pull/1397)
- 新增资源管理功能，数据删改动作进行监控和失败重试。[#1616](https://github.com/cnosdb/cnosdb/pull/1616)
- 改进 Meta Watch 模型。[#1586](https://github.com/cnosdb/cnosdb/pull/1586)
- 重构迭代器并优化性能。[#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 将大依赖 'models' 更改为小依赖 'error_code'。[#1470](https://github.com/cnosdb/cnosdb/pull/1470)
- 优化构建索引。[#1468](https://github.com/cnosdb/cnosdb/pull/1468)
- 优化 Flatbuffers。[#1435](https://github.com/cnosdb/cnosdb/pull/1435)
- 重构 TSKV 中的 record_file 和 codec。[#1439](https://github.com/cnosdb/cnosdb/pull/1439)
- Vector类型数组映射成字符串。[#1450](https://github.com/cnosdb/cnosdb/pull/1450)
- 重构 usage_schema。[#1479](https://github.com/cnosdb/cnosdb/pull/1479)
- 重命名 coordinator limiter。[#1482](https://github.com/cnosdb/cnosdb/pull/1482)
- 添加 limiter manager。[#1494](https://github.com/cnosdb/cnosdb/pull/1494)
- 清理无用代码 VnodeStatusListener。[#1487](https://github.com/cnosdb/cnosdb/pull/1487)
- 减少克隆操作。[#1582](https://github.com/cnosdb/cnosdb/pull/1582)
- 修复标量函数参数数量未见检查的BUG。[#1597](https://github.com/cnosdb/cnosdb/pull/1597)
- 在索引读取之前寻找位置。[#1618](https://github.com/cnosdb/cnosdb/pull/1618)
- 扩展 Raft 写接口。[#1620](https://github.com/cnosdb/cnosdb/pull/1620)
- 重构缓存。[#1560](https://github.com/cnosdb/cnosdb/pull/1560)
- 删除表时，相关数据将被删除。[#1553](https://github.com/cnosdb/cnosdb/pull/1553)
- 禁用对 tenant cnosdb 的限制。[#1617](https://github.com/cnosdb/cnosdb/pull/1617)
- Leader 复制，多 Raft 复制组。[#1534](https://github.com/cnosdb/cnosdb/pull/1534)
- 添加关于函数、DDL、DML 的测试用例。[#1588](https://github.com/cnosdb/cnosdb/pull/1588)
- 重构 tag plan 中扫描数据的方式 [#1634](https://github.com/cnosdb/cnosdb/pull/1634)

### 问题修复

- 修复 check_writes 错误。 [#1383](https://github.com/cnosdb/cnosdb/pull/1383)
- 修复行协议解析器 '\n' 错误。[#1426](https://github.com/cnosdb/cnosdb/pull/1426)
- 修改案例以实现可重复性。[#1451](https://github.com/cnosdb/cnosdb/pull/1451)
- 修复 HTTP 指标字段顺序错误。[#1506](https://github.com/cnosdb/cnosdb/pull/1506)
- 修复 TSM 损坏，但查询不尝试读取的问题。[#1453](https://github.com/cnosdb/cnosdb/pull/1453)
- 修复流计划未执行过滤推送的问题。[#1515](https://github.com/cnosdb/cnosdb/pull/1515)
- 修复 CLI 数组越界访问。[#1531](https://github.com/cnosdb/cnosdb/pull/1531)
- 修复重新启动时数据丢失的问题。[#1471](https://github.com/cnosdb/cnosdb/pull/1471)
- 在 Raft 复制模式中删除数据库。[#1556](https://github.com/cnosdb/cnosdb/pull/1556)
- 修复意外删除了 WAL 测试目录的问题。[#1558](https://github.com/cnosdb/cnosdb/pull/1558)
- 修复密码验证失败问题。[#1583](https://github.com/cnosdb/cnosdb/pull/1583)
- 修复 time_window 函数无法处理常量转换表达式。[#1578](https://github.com/cnosdb/cnosdb/pull/1578)
- 修复桶的填充率。[#1563](https://github.com/cnosdb/cnosdb/pull/1563)
- 修复混淆的错误消息。[#1595](https://github.com/cnosdb/cnosdb/pull/1595)
- 修复重新启动时恢复无效数据的问题。[#1570](https://github.com/cnosdb/cnosdb/pull/1570)
- 禁止删除 root 用户。[#1598](https://github.com/cnosdb/cnosdb/pull/1598)
- 修复在 TSKV 中删除列导致获取空数据库的问题。[#1581](https://github.com/cnosdb/cnosdb/pull/1581)
- 修复 /cluster/users/user 变更不通知服务器的问题。[#1599](https://github.com/cnosdb/cnosdb/pull/1599)
- 修复Meta 创建重复数据版本的问题。[#1605](https://github.com/cnosdb/cnosdb/pull/1605)
- 增加标量函数参数检查。[#1615](https://github.com/cnosdb/cnosdb/pull/1615)
- 修复创建系统数据库 usage_schema 的问题。[#1606](https://github.com/cnosdb/cnosdb/pull/1606)
- 修复删除租户时不删除成员的错误。[#1626](https://github.com/cnosdb/cnosdb/pull/1626)
- 修复 tskv 迭代器有时返回超出预期数据的问题。 [#1638](https://github.com/cnosdb/cnosdb/pull/1638)
- 使 tskv 节点重启不受资源隐藏影响。 [#1636](https://github.com/cnosdb/cnosdb/pull/1636)
- 执行删除时停止后台的数据文件 compaction 任务。 [#1643](https://github.com/cnosdb/cnosdb/pull/1643)

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