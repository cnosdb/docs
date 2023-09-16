---
title: Change List
order: 2
---

# Change List


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
