# Releases

## v2.3.5.2

Release Date: April 17, 2024

### Bug Fixes

- Fixed dependbot security issue [#2069](https://github.com/cnosdb/cnosdb/pull/2069)
- Fixed issue that prevented other users from modifying root user information [#2070](https://github.com/cnosdb/cnosdb/pull/2070)
- Fixed issue where indicators could delete vnode info [#2048](https://github.com/cnosdb/cnosdb/pull/2048)
- Fixed issue with serial build of inverted indexes [#2072](https://github.com/cnosdb/cnosdb/pull/2072)
- Fixed issue with loading Bloom filter deadlocks [#2073](https://github.com/cnosdb/cnosdb/pull/2073)

## Version 2.3.5.1

Release Date: April 10, 2024

### Improvements

- Optimized limit to push down to RecordBatch for reading [#2040](https://github.com/cnosdb/cnosdb/pull/2040)
- Added BloomFillter [#2039](https://github.com/cnosdb/cnosdb/pull/2039)
- Improved delta_compactions [#2046](https://github.com/cnosdb/cnosdb/pull/2046)
- Added metrics and some improvements for delta_compactions [#2055](https://github.com/cnosdb/cnosdb/pull/2055)

### Bug Fixes

- Fixed the issue of count(tag) in distributed systems [#2011](https://github.com/cnosdb/cnosdb/pull/2011)
- Fixed the restart failure issue of cnosdb on Windows [#2029](https://github.com/cnosdb/cnosdb/pull/2029)
- Fixed pread and pwrite [#2041](https://github.com/cnosdb/cnosdb/pull/2041)
- Fixed the issue of assigning read and write permissions to roles for non-existent databases [#2047](https://github.com/cnosdb/cnosdb/pull/2047)
- Fixed the data loss issue when indexing during multi-threaded writes [#2057](https://github.com/cnosdb/cnosdb/pull/2057)

## v2.3.5 Aquarius

Release：March 06, 2024

### Improvements

- Add incremental file compression tasks. [#1945](https://github.com/cnosdb/cnosdb/pull/1945)
- Compaction operations on the same Vnode changed to run in a single thread. [#2002](https://github.com/cnosdb/cnosdb/pull/2002)

### Bug Fixes

- Fix LRU cache hit due to queries involving a large number of files. [#1965](https://github.com/cnosdb/cnosdb/pull/1965)
- Fix data loss due to incremental compaction. [#1982](https://github.com/cnosdb/cnosdb/pull/1982)
- Fix pread function that could write wild pointers [#1981](https://github.com/cnosdb/cnosdb/pull/1981)
- Fix compaction operation causing data loss. Tombstone data not excluded as expected when merging multiple data blocks. [#1988](https://github.com/cnosdb/cnosdb/pull/1988)
- Change async_file sync_data() to sync_all(). [#1994](https://github.com/cnosdb/cnosdb/pull/1994)
- Fix some buggy logic in selecting incremental files for incremental compaction, improve efficiency in decreasing the number of incremental files [#1998](https://github.com/cnosdb/cnosdb/pull/1998)
- Fix not adding index_size to TsmWriter::size [#1999](https://github.com/cnosdb/cnosdb/pull/1999)
- Fix add count tag function [#1989](https://github.com/cnosdb/cnosdb/pull/1989)
- Extract function update_max_ts_of_levels [#2004](https://github.com/cnosdb/cnosdb/pull/2004)

## v2.3.4 Apus

Release date: Nov 24, 2023

### New Features

 - adapt vector [#1628](https://github.com/cnosdb/cnosdb/pull/1628)
 - add `increase` function, `http_limiter` and `metrics` [#1629](https://github.com/cnosdb/cnosdb/pull/1629)
 - routing both write requests and SQL requests to query server [#1760](https://github.com/cnosdb/cnosdb/pull/1760)
 - support HTTP compression [#1762](https://github.com/cnosdb/cnosdb/pull/1762)
 - support dump ddl [#1782](https://github.com/cnosdb/cnosdb/pull/1782)
 - start the service through configuration [#1789](https://github.com/cnosdb/cnosdb/pull/1789)

### Improvements

- implement desc tables/databases by reading system tables and fix some word error [#1692](https://github.com/cnosdb/cnosdb/pull/1692)
- remove debug log [#1793](https://github.com/cnosdb/cnosdb/pull/1793)

### Bug Fixes

- drop tenant not drop members bug [#1632](https://github.com/cnosdb/cnosdb/pull/1632)
- failed to generate a plan for interpolation functions with an alias [#1777](https://github.com/cnosdb/cnosdb/pull/1777)
- add check of parameter event_time_column of stream table [#1744](https://github.com/cnosdb/cnosdb/pull/1744)
- stream job lost database info when restart [#1734](https://github.com/cnosdb/cnosdb/pull/1734)
- disable creation of stream table with columns with the same name [#1733](https://github.com/cnosdb/cnosdb/pull/1733)
- optimize the error message for direct select the stream table [#1732](https://github.com/cnosdb/cnosdb/pull/1732)
- get_sys_mem unit error [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- cli write line protocol didn't show error message [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- fix when drop user don't drop tenant member [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- fix Tenant not found return http status code 500 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- fix grpc size limit [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- table name error when creating external table [#1739](https://github.com/cnosdb/cnosdb/pull/1739)


## v2.4.0 Milky Way

Release date: Oct 24, 2023

### New Features

📈 No more monotone data summarization, new aggregation functions!

- compact_state_agg [#1359](https://github.com/cnosdb/cnosdb/pull/1359)
- gauge_agg [#1370](https://github.com/cnosdb/cnosdb/pull/1370)
- first [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- last [#1413](https://github.com/cnosdb/cnosdb/pull/1413)
- mode [#1440](https://github.com/cnosdb/cnosdb/pull/1440)
- increase [#1476](https://github.com/cnosdb/cnosdb/pull/1476)
- delta [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- time_delta [#1405](https://github.com/cnosdb/cnosdb/pull/1405)
- rate [#1405](https://github.com/cnosdb/cnosdb/pull/1405)

🌐 GIS Functions: [#1465](https://github.com/cnosdb/cnosdb/pull/1465)

- ST_AsBinary
- ST_GeomFromWKB
- ST_Distanc
- ST_Area

💼 Change on system schema [#1461](https://github.com/cnosdb/cnosdb/pull/1461)

- All lowercase, system field names are normalized.

🔄 Make it easier to modify data! [#1484](https://github.com/cnosdb/cnosdb/pull/1484) [#1517](https://github.com/cnosdb/cnosdb/pull/1517) [#1623](https://github.com/cnosdb/cnosdb/pull/1623) [#1590](https://github.com/cnosdb/cnosdb/pull/1590)

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

Other new features are as follows:

- Adapt vector. [#1380](https://github.com/cnosdb/cnosdb/pull/1380)
- support Geometry data type. [#1463](https://github.com/cnosdb/cnosdb/pull/1463)
- Add histogram Line Protocol export. [#1472](https://github.com/cnosdb/cnosdb/pull/1472)
- Support duration_in function. [#1423](https://github.com/cnosdb/cnosdb/pull/1423) [#1408](https://github.com/cnosdb/cnosdb/pull/1408)
- Support grpc compression. [#1631](https://github.com/cnosdb/cnosdb/pull/1631)
- Add cluster data export/import/migrate tool. [#1635](https://github.com/cnosdb/cnosdb/pull/1635)
- Added database deferred deletion. [#1510](https://github.com/cnosdb/cnosdb/pull/1510)

```sql
DROP DATABASE [IF EXISTS] <db_name> [AFTER <time_interval>]
```

### Improvements

The memory usage is effectively reduced, TSKV is optimized to be more efficient, and Flatbuffers, index building and other aspects are also significantly improved. In addition, careful optimizations such as cache refactoring and fewer clones have led to even better overall performance.

- Support <!=>  compare operators to data sources. [#1469](https://github.com/cnosdb/cnosdb/pull/1469)
- Split wal by vnode. [#1454](https://github.com/cnosdb/cnosdb/pull/1454)
- TSKV Optimizations to reduce the memory usage. [#1199](https://github.com/cnosdb/cnosdb/pull/1199)
- Refactor DESC TABLES / DESC DATABASES。[#1397](https://github.com/cnosdb/cnosdb/pull/1397)
- New resource management function, data delete action monitoring and failure retry. [#1616](https://github.com/cnosdb/cnosdb/pull/1616)
- Enhance Meta Watch model. [#1586](https://github.com/cnosdb/cnosdb/pull/1586)
- Refactor iterator and optimize performance. [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Change big dependency 'models' to small dependency 'error_code'[#1470](https://github.com/cnosdb/cnosdb/pull/1470)
- Optimize build index. [#1468](https://github.com/cnosdb/cnosdb/pull/1468)
- The password is encrypted and stored to enhance security. [#1419](https://github.com/cnosdb/cnosdb/pull/1419)
- Optomize Flatbuffers. [#1435](https://github.com/cnosdb/cnosdb/pull/1435)
- Refactor record_file and codec in TSKV. [#1439](https://github.com/cnosdb/cnosdb/pull/1439)
- Map vector array to string. [#1450](https://github.com/cnosdb/cnosdb/pull/1450)
- Refactor usage_schema. [#1479](https://github.com/cnosdb/cnosdb/pull/1479)
- Rename coordinator limiter. [#1482](https://github.com/cnosdb/cnosdb/pull/1482)
- Add limiter manager. [#1494](https://github.com/cnosdb/cnosdb/pull/1494)
- Clean no-use VnodeStatusListener。[#1487](https://github.com/cnosdb/cnosdb/pull/1487)
- Decrease clone. [#1582](https://github.com/cnosdb/cnosdb/pull/1582)
- Fixed a BUG where the number of arguments of scalar functions is not checked. [#1597](https://github.com/cnosdb/cnosdb/pull/1597)
- Seek position before index read. [#1618](https://github.com/cnosdb/cnosdb/pull/1618)
- Extend raft write interface. [#1620](https://github.com/cnosdb/cnosdb/pull/1620)
- Refactor cache. [#1560](https://github.com/cnosdb/cnosdb/pull/1560)
- When drop table, the will deleted. [#1553](https://github.com/cnosdb/cnosdb/pull/1553)
- Disable restrictions on Tenant cnosdb. [#1617](https://github.com/cnosdb/cnosdb/pull/1617)
- leader replication, multi raft replication group. [#1534](https://github.com/cnosdb/cnosdb/pull/1534)
- Add testcases about function, DDL, DML. [#1588](https://github.com/cnosdb/cnosdb/pull/1588)
- Refactor the way to scan data in the update tag plan. [#1634](https://github.com/cnosdb/cnosdb/pull/1634)

### Bug Fixes:

- Fix check_writes error. [#1383](https://github.com/cnosdb/cnosdb/pull/1383)
- Fix line protocol parser '\n' error. [#1426](https://github.com/cnosdb/cnosdb/pull/1426)
- Fix modify the cases to be repeatable. [#1451](https://github.com/cnosdb/cnosdb/pull/1451)
- Fix http metrics field order error. [#1506](https://github.com/cnosdb/cnosdb/pull/1506)
- Fix tsm damaged, but query not try read. [#1453](https://github.com/cnosdb/cnosdb/pull/1453)
- Fix stream plan not perform filter pushdown. [#1515](https://github.com/cnosdb/cnosdb/pull/1515)
- Fix cli array out-of-bounds access. [#1531](https://github.com/cnosdb/cnosdb/pull/1531)
- Fix restart lose data. [#1471](https://github.com/cnosdb/cnosdb/pull/1471)
- Drop database in raft replication mode. [#1556](https://github.com/cnosdb/cnosdb/pull/1556)
- Fix unexpectedly deleted the wal test directory. [#1558](https://github.com/cnosdb/cnosdb/pull/1558)
- Fix password verify failed. [#1583](https://github.com/cnosdb/cnosdb/pull/1583)
- Fix time_window function cannot handle constant cast expression. [#1578](https://github.com/cnosdb/cnosdb/pull/1578)
- Fix rate bucket refill. [#1563](https://github.com/cnosdb/cnosdb/pull/1563)
- Fix Confusing error message. [#1595](https://github.com/cnosdb/cnosdb/pull/1595)
- Fix restart recover invalid data. [#1570](https://github.com/cnosdb/cnosdb/pull/1570)
- Forbidden drop root user. [#1598](https://github.com/cnosdb/cnosdb/pull/1598)
- Fix drop column case tskv get empty database. [#1581](https://github.com/cnosdb/cnosdb/pull/1581)
- Fix /cluster/users/user change not notify to serve. [#1599](https://github.com/cnosdb/cnosdb/pull/1599)
- Fix meta create duplicate data version. [#1605](https://github.com/cnosdb/cnosdb/pull/1605)
- Add scalar args check. [#1615](https://github.com/cnosdb/cnosdb/pull/1615)
- Fix create system database usage_schema. [#1606](https://github.com/cnosdb/cnosdb/pull/1606)
- Fix drop tenant not drop members bug. [#1626](https://github.com/cnosdb/cnosdb/pull/1626)
- Fix tskv iterator sometimes returns more data than expected. [#1638](https://github.com/cnosdb/cnosdb/pull/1638)
- Fix restart get actual database schema. [#1636](https://github.com/cnosdb/cnosdb/pull/1636)
- Fix errors in execution of DELETE FROM TABLE. [#1643](https://github.com/cnosdb/cnosdb/pull/1643)

## v2.3.3 Antlia

Release date：Sep 28,2023

### Improvements:
- Optimized read performance [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Improved the Ord implementation of DataType  [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Added data block reader  [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Removed field scan timer  [#1467](https://github.com/cnosdb/cnosdb/pull/1467)

### Bug Fixes:
- Fixed the issue allowing modification of the usage_schema database [#1421](https://github.com/cnosdb/cnosdb/pull/1421)
- Resolved inconsistency issues with users and tenants on multiple metadata nodes [#1417](https://github.com/cnosdb/cnosdb/pull/1417)
- Fixed the problem of not deleting data when deleting a tenant [#1418](https://github.com/cnosdb/cnosdb/pull/1418)
- Resolved the issue of generating TLS lv-2 certificates without options [#1441](https://github.com/cnosdb/cnosdb/pull/1441)
- Fixed the data loss issue when creating TSF [#1478](https://github.com/cnosdb/cnosdb/pull/1478)
- Resolved the cancellation of queries on Tskv [#1488](https://github.com/cnosdb/cnosdb/pull/1488)
- Fixed retry after table update conflict [#1503](https://github.com/cnosdb/cnosdb/pull/1503)
- Fixed database modification issue [#1504](https://github.com/cnosdb/cnosdb/pull/1504)
- Fixed issues with Arrow Flight SQL JDBC API's getCatalogs, getSchemas, and getTables [#1520](https://github.com/cnosdb/cnosdb/pull/1520)
- Fixed the getTables API of Arrow Flight SQL [#1528](https://github.com/cnosdb/cnosdb/pull/1528)
- Resolved the delayed reporting of NodeMetrics [#1541](https://github.com/cnosdb/cnosdb/pull/1541)
- Fixed data loss issue due to table updates [#1542](https://github.com/cnosdb/cnosdb/pull/1542)
- Fixed errors in parsing Line Protocol [#1539](https://github.com/cnosdb/cnosdb/pull/1539)

## v2.3.2 Andromeda

Release date: Aug 02,2023

### New Features:
- Add monitoring metric 'http_data_out' [#1304](https://github.com/cnosdb/cnosdb/issues/1304)
- Added chunked mode in the client [#1357](https://github.com/cnosdb/cnosdb/issues/1357)
- Added new log types to the WAL: DROP VNODE and DROP TABLE [#1340](https://github.com/cnosdb/cnosdb/issues/1340)
### Improvements:
- Improved flight-sql implementation, added implementation for the do_put_prepared_statement_update interface [#1329](https://github.com/cnosdb/cnosdb/issues/1329)
- Enhanced meta watch and optimized interaction between queries [#1314](https://github.com/cnosdb/cnosdb/issues/1314)
- Upgraded datafusion version to 27.0.0 [#1323](https://github.com/cnosdb/cnosdb/issues/1323)
- Added additional methods to the flatbuffers model [#1361](https://github.com/cnosdb/cnosdb/issues/1361)
### Bug Fixes:
- Fixed the issue of generating duplicate series IDs [#1301](https://github.com/cnosdb/cnosdb/issues/1301)
- Fixed the problem with the sample function returning errors [#1296](https://github.com/cnosdb/cnosdb/issues/1296)
- Fixed panic when writing to binlog [#1309](https://github.com/cnosdb/cnosdb/issues/1309)
- Fixed schema error in logical plan [#1332](https://github.com/cnosdb/cnosdb/issues/1332)
- Fixed parsing error in CREATE TABLE [#1318](https://github.com/cnosdb/cnosdb/issues/1318)
- Fixed json deserialization issue in raft_bucket [#1347](https://github.com/cnosdb/cnosdb/issues/1347)
- Fixed handshake failure for arrow-flight-sql odbc [#1336](https://github.com/cnosdb/cnosdb/issues/1336)
- Fixed out-of-memory issue when importing Line Protocol data [#1319](https://github.com/cnosdb/cnosdb/issues/1319)
- Fixed errors in data node health check [#1352](https://github.com/cnosdb/cnosdb/issues/1352)
- Fixed unintended deletion of irrelevant columns when deleting a table [#1363](https://github.com/cnosdb/cnosdb/issues/1363)
- Fixed client connection issue using ca.crt [#1369](https://github.com/cnosdb/cnosdb/issues/1369)
- Fixed tokio trace filtering [#1372](https://github.com/cnosdb/cnosdb/issues/1372)
- Fixed errors in inserting line protocol data [#1366](https://github.com/cnosdb/cnosdb/issues/1366)
### Behavior Change:
- Configuration changes [#1372](https://github.com/cnosdb/cnosdb/issues/1372)
- Default TTL set to infinite when creating a database [#1354](https://github.com/cnosdb/cnosdb/issues/1354)

## v2.3.1

Release date: June 21,2023

### New Features
- Added trace [#1272](https://github.com/cnosdb/cnosdb/issues/1272)
- Support sliding window gap fill [#1171](https://github.com/cnosdb/cnosdb/pull/1171)
- Support metadata API for Flight SQL [#1173](https://github.com/cnosdb/cnosdb/pull/1173)
- Support granting admin privileges [#1929](https://github.com/cnosdb/cnosdb/pull/1219)
- Implemented sample function [#1228](https://github.com/cnosdb/cnosdb/pull/1228)
- Client-side supports HTTPS connection [#1225](https://github.com/cnosdb/cnosdb/pull/1225)
### Improvements
- Early release of rwlock for cached partitions [#1181](https://github.com/cnosdb/cnosdb/pull/1181)
- Implementation of viewing database and table functionality for system tables [#1212](https://github.com/cnosdb/cnosdb/pull/1212)
- Remove support for TLS protocol connection on grpc server side [#1216](https://github.com/cnosdb/cnosdb/pull/1216)
- Modify the starting time precision of buckets to ms [#1215](https://github.com/cnosdb/cnosdb/pull/1215)
- Support multi-threaded write hinted handoff [#1230](https://github.com/cnosdb/cnosdb/pull/1230)
- TskvExec partition read strategy [#1200](https://github.com/cnosdb/cnosdb/pull/1200)
- Added a tool to repair corrupted index files [#1238](https://github.com/cnosdb/cnosdb/pull/1238)
- Compaction consumes too much memory [#1237](https://github.com/cnosdb/cnosdb/pull/1237)
- Add host information when querying metrics [#1202](https://github.com/cnosdb/cnosdb/pull/1202)
- Added metrics information for write_data_in and sql_data_in [#1241](https://github.com/cnosdb/cnosdb/pull/1241)
- Expired WAL files are not always automatically deleted [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- Expired WAL files are not automatically deleted when some Vnodes are "cold" (rarely written to) [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- Check for expired WALs and delete them when the cache is flushed to disk [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- Optimization of some methods in FileManager [#1268](https://github.com/cnosdb/cnosdb/pull/1268)
### Bug Fixes
- Data loss caused by copying the target Vnode during Vnode migration [#1151](https://github.com/cnosdb/cnosdb/issues/1151)
- Failed to write data due to metadata verification failure [#1184](https://github.com/cnosdb/cnosdb/issues/1184)
- Deleting a nonexistent table returns an unexpected status [#1218](https://github.com/cnosdb/cnosdb/issues/1218)
- Inaccurate monitoring indicators for VNODE_DISK_STORAGE and VNODE_CACHE_SIZE [#1197](https://github.com/cnosdb/cnosdb/issues/1197)
- System tables cannot query currently executing SQL statements [#1188](https://github.com/cnosdb/cnosdb/issues/1188)
- Exporting data generates many empty files with only column name information [#1211](https://github.com/cnosdb/cnosdb/issues/1211)
- Column encoding is not checked when updating tables [#1148](https://github.com/cnosdb/cnosdb/issues/1148)
- Inconsistent data query results caused by damaged Vnodes [#1192](https://github.com/cnosdb/cnosdb/issues/1192)
- Writing data fails but still returns success result [#1084](https://github.com/cnosdb/cnosdb/issues/1084)
- When writing data, a large number of file handles marked as deleted cause continuous disk space growth [#1242](https://github.com/cnosdb/cnosdb/issues/1242)
- Multiple connections are established when writing data [#1251](https://github.com/cnosdb/cnosdb/issues/1251)
- Compilation error in CnosDB tuple component in Docker environment [#1266](https://github.com/cnosdb/cnosdb/issues/1266)
- Fix issue where prom remote_read doesn't return data [#1273](https://github.com/cnosdb/cnosdb/issues/1273)
- Memory exhaustion when exporting data [#955](https://github.com/cnosdb/cnosdb/issues/955)
- Inconsistent or inaccurate query results [#1283](https://github.com/cnosdb/cnosdb/pull/1283)
- Slow DB recovery after version upgrade [#1180](https://github.com/cnosdb/cnosdb/issues/1180)
- Syntax parsing error for describe tables and describe databases command [#1160](https://github.com/cnosdb/cnosdb/issues/1160)
- High memory consumption during data import resulting in OOM and failed data writes [#1141](https://github.com/cnosdb/cnosdb/issues/1141)
- Incorrect seq_no parameter set during Vnode movement [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- SQL execution error "Not a field name"  [#1033](https://github.com/cnosdb/cnosdb/issues/1033)
- External table data import overrides original table data [#1131](https://github.com/cnosdb/cnosdb/issues/1131)
### Behavior Change
- Change the "Table" displayed in the result of show tables to "table_name" [#1212](https://github.com/cnosdb/cnosdb/pull/1212)

## V2.3.0

On May 09, 2023, CnosDB released version 2.3.0. This version mainly adds stream computing capabilities and some enterprise features. The main modifications of this version include:

- Enhanced query functionality now supports scrolling windows, sliding windows, and streaming calculations.

- Parallel processing has been applied to query iterators, greatly improving query performance.

- Added some tools for problem localization, including the use of CPU/Memory pprof and asynchronous call stack printing.

- Further improved the test case system, including improving access control test cases and adding support for SQLLogicTest.

- Added support for the OpenTSDB write protocol.

- HTTP requests now support streaming processing, effectively reducing database memory usage.

- In the enterprise version, support for subscription and tiered storage has been added. Please contact us for more information.

Addition, there are a series of bug fixes.

## V2.2.0

On March 01, 2023, CnosDB released version V2.2.0. This version mainly adds the storage and computation separation mode and further enhances the performance and stability of distributed, and continues to be open source. The major changes in this release also include:

- Support for the Prometheus Remote Read/Write API.

- Improved performance: added caching for index and file index.

- Refactor the code of Coodinator and Watch to improve performance and enhance stability.

- Support multiple startup modes: storage and computing integration, separation and stand-alone mode start.

- Improved monitoring metrics and added memory limits to prevent OOM.

- Improved the O&M functions, adding copy/move/drop vnode capabilities.

- Added count pushdown, optimized count(*) and significantly improving count performance.

- Add multi-threaded flush, reduce memory copy during writes, optimize the use of some locks and improve write performance.

Addition, there are a series of bug fixes.

## V2.1.0

On January 10, 2023, CnosDB released version V2.1.0. This version releases the CnosDB 2.0 distributed cluster version and continues to be open source. The major changes in this release also include.

*   Added metadata service and coordinator service to support distributed clusters.

*   Introduced RBAC permission system to support user management, role management and permission management via SQL.

*   Refactored the inverted index to solve the problem of index amplification.

*   Added the function of showing the executing query and stopping the executing query on query.

*   Unified the return of error codes to users to make it clearer and more concise.

*   Added quota support for multi-tenant scenarios.

*   In addition, a series of metric and performance optimizations, as well as bug fixes, are included.


## V2.0.1

On November 8th, 2022, CnosDB released version V2.0.1. This version fixes some of the key bugs in CnosDB and updates some essential new features, the details of the update are as follows:

### Bug Fixes:

*   Fix the wrong names of table and database object.

*   Fix the bug of file corruption when WAL is interrupted.

*   Fix the problem that TableWriteExec can only write to one partition.

*   Fix Schema use error when refreshing data to disk causes query confusion.

*   Add TskvScan's projection validity check and optimize column pruning.

*   Fix the problem that field can be empty in the written row protocol.

*   Fix the failure of parsing request strings containing comma or equal sign.

*   Add field and tag exception checking for write points.

*   Fix the problem of write hang caused by compaction.

*   Fix the bug that no data is returned when only tag column is included in SELECT statement.

*   Add tsfid to the global context.

*   Disable cross join.


### New features:

*   Limit the number of query joins and the size of query contents.


### Others:

*   Clearer Key using HashMap.

*   Upgrade DataFusion version to 13.0.0.

*   Solve the dependency conflict problem.

*   Add log\_err macro.

*   Check input point format.

*   Performance optimization.

*   Add collection information.

*   Structure naming change, change Point::table to tab, change Points::database to db.


## V2.0.0

On October 24th, 2022, CnosDB released version V2.0.0. This release is a new beginning where we have rebuilt CnosDB time series database based on Rust, improved the performance of CnosDB, enhanced the ease of use of CnosDB, and made CnosDB more adaptable to the requirements of cloud ecology.

### Special features:

*   Storage engine specially designed for time series data, write operation optimization, and delete and update operation supporting;

*   Compression algorithm flexibly specified by users, with adjustable compression ratio;

*   Query engine implemented based on Apache Arrow and Datafusion;

*   Support for standard SQL and Schemaless writes;

*   Multiple indexes to optimize query efficiency;

*   Eco-friendly, support for RESTful interface, Telegraf, Grafana and other common third-party ecological components.