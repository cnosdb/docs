# Release Notes

## v2.3.4.4

Release date：027 024

### Feature optimization

- Add memory buffers to `FileCursor`.[#1927](https://github.com/cnosdb/cnosdb/pull/1927)
- Add profile item `file_buffer_size`.[#1960] (https\://github.com/cnosdb/cnosdb/pull/1960)
- Add the configuration item `copyinto_trigger_flush_size`.[#1944](https://github.com/cnosdb/cnosdb/pull/1944)

### Bug fixes

- Repair the `COPY INTO` error caused by the widget.[#1924](https://github.com/cnosdb/cnosdb/pull/1924)
- Update version `version_set` before refreshing.[#1926](https://github.com/cnosdb/cnosdb/pull/1926)
- Fixed `ScalarValueForkDF` to delete.[#1938](https://github.com/cnosdb/cnosdb/pul/1938)
- Do not perform the delete column data operation on the bottom layer when the table does not have data.[#1950](https://github.com/cnosdb/cnosdb/pul/1950)
- Repair the unserialized flow statement failed when restarting.[#1953](https://github.com/cnosdb/cnosdb/pull/1953)
- The `grant_admin` parameter of the root user is not allowed.[#1954] (https\://github.com/cnosdb/cnosdb/pull/1954)

## v2.3.4.3

Release date：09 024

### Issue Fix

- Repair tskv iterator sometimes reverses more data than expected.[#1895](https://github.com/cnosdb/cnosdb/pull/1895)

## v2.3.4.2

Release date：03 024

### Feature optimization

- Retrieving utility and irrelevant content in e2e_test[#1882](https://github.com/cnosdb/cnosdb/pull/1882)

### Issue Fix

- Fix errors related to merger.[#1889](https://github.com/cnosdb/cnosdb/pull/1889)

## v2.3.4.1

Publication date：2024

### Feature optimization

- Delete `cold_data_server` and `NodeAttribute` modules.[#1859] (https\://github.com/cnosdb/cnosdb/pull/1859)
- Add a `setkv` and `delete` interface to the `meta` service.[#1835](https://github.com/cnosdb/cnosdb/pull/1835)
- Hide password on client startup.[#1881](https://github.com/cnosdb/cnosdb/pull/1881)

### Issue Fix

- Fixed `duup_by_front` to delete error element. [#1815](https://github.com/cnosdb/cnosdb/pull/1815)
- Fix errors caused by asynchronous LruCache [#1820](https://github.com/cnosdb/cnosdb/pull/1820)
- Fix empty snapshot created by the `meta` service. [#1835](https://github.com/cnosdb/cnosdb/pull/1835)

## v2.3.4 Apus

Published：2023 November 24

### Add Feature

- Match [Vector](https://vector.dev/) [#1628](https://github.com/cnosdb/cnosdb/pull/1628)
- Add increment function, http_limiter and metrics [#1629](https://github.com/cnosdb/cnosdb/pull/1629)
- Both write requests and SQL requests are routed to the query server [#1760](https://github.com/cnosdb/cnosdb/pull/1760)
- HTTP compression [#1762](https://github.com/cnosdb/cnosdb/pull/1762)
- Export support for DDL [#1782](https://github.com/cnosdb/cnosdb/pull/1782)
- Launch service [#1789](https://github.com/cnosdb/cnosdb/pull/1789)

### Feature optimization

- Implementing desc table/database by reading system tables and fixing some word errors [#1692] (https\://github.com/cnosdb/cnosdb/pull/1692)
- Remove debug log [#1793](https://github.com/cnosdb/cnosdb/pull/1793)

### Issue Fix

- Delete tenant and not delete member error [#1632] (https\://github.com/cnosdb/cnosdb/pull/1632)
- Failed to generate interpolation function with alias [#1777](https://github.com/cnosdb/cnosdb/pull/1777)
- Check [#1744] (https\://github.com/cnosdb/cnosdb/pull/1744) for `event_time_column` parameter `stream table`
- Missing database information for current operations on reboot [#1734](https://github.com/cnosdb/cnosdb/pull/1734)
- Disable creating streams with the same name column [#1733](https://github.com/cnosdb/cnosdb/pull/173))
- Optimize direct selection of stream table error messages [#1732](https://github.com/cnosdb/cnosdb/pull/1732)
- Error fetching system memory [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- No error message [#1739](https://github.com/cnosdb/cnosdb/pull/1739) was shown when the CLI wrote the line protocol
- Delete users [#1739] (https\://github.com/cnosdb/cnosdb/pull/1739)
- Tenant returned HTTP status code 500 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- Repair gRPC size limit [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- Error creating table name [#1739](https://github.com/cnosdb/cnosdb/pull/1739)

## v2.3.4 Apus

Published：2023 November 24

### Add Feature

- Match [Vector](https://vector.dev/) [#1628](https://github.com/cnosdb/cnosdb/pull/1628)
- Add increment function, http_limiter and metrics [#1629](https://github.com/cnosdb/cnosdb/pull/1629)
- Both write requests and SQL requests are routed to the query server [#1760](https://github.com/cnosdb/cnosdb/pull/1760)
- HTTP compression [#1762](https://github.com/cnosdb/cnosdb/pull/1762)
- Export support for DDL [#1782](https://github.com/cnosdb/cnosdb/pull/1782)
- Launch service [#1789](https://github.com/cnosdb/cnosdb/pull/1789)

### Feature optimization

- Implementing desc table/database by reading system tables and fixing some word errors [#1692] (https\://github.com/cnosdb/cnosdb/pull/1692)
- Remove debug log [#1793](https://github.com/cnosdb/cnosdb/pull/1793)

### Issue Fix

- Delete tenant and not delete member error [#1632] (https\://github.com/cnosdb/cnosdb/pull/1632)
- Failed to generate interpolation function with alias [#1777](https://github.com/cnosdb/cnosdb/pull/1777)
- Check [#1744] (https\://github.com/cnosdb/cnosdb/pull/1744) for `event_time_column` parameter `stream table`
- Missing database information for current operations on reboot [#1734](https://github.com/cnosdb/cnosdb/pull/1734)
- Disable creating streams with the same name column [#1733](https://github.com/cnosdb/cnosdb/pull/173))
- Optimize direct selection of stream table error messages [#1732](https://github.com/cnosdb/cnosdb/pull/1732)
- Error fetching system memory [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- No error message [#1739](https://github.com/cnosdb/cnosdb/pull/1739) was shown when the CLI wrote the line protocol
- Delete users [#1739] (https\://github.com/cnosdb/cnosdb/pull/1739)
- Tenant returned HTTP status code 500 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- Repair gRPC size limit [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- Error creating table name [#1739](https://github.com/cnosdb/cnosdb/pull/1739)

## v2.4.0 Milky Way

Release date：on October 24th, 2023

### Add Feature

📈 Data aggregation is no longer monolithic, new aggregation function!

- compact_state_agg [#1359](https://github.com/cnosdb/cnosdb/pull/1359)
- gauge_agg [#1370](https://github.com/cnosdb/cnosdb/pull/1370)
- first [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- last [#1413](https://github.com/cnosdb/cnosdb/pull/1413)
- mode [#1440](https://github.com/cnosdb/cnosdb/pull/1440)
- Increase [#1476](https://github.com/cnosdb/cnosdb/pull/1476)
- delta [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- time_delta [#1405](https://github.com/cnosdb/cnosdb/pull/1405)
- rate [#1405](https://github.com/cnosdb/cnosdb/pull/1405)

🌐 GIS function collector [#1465](https://github.com/cnosdb/cnosdb/pull/1465)

- ST_AsBinary
- ST_GeomFromWKB
- ST_Distanc
- ST_Area

💼 System table overhaul [#1461] (https\://github.com/cnosdb/cnosdb/pull/1461)

- All are lower, the system field is normalized and everything takes care of.

:countclkwise_arrows_button: modify the data explosion crack, change the data so easy, you want to change![#1484](https://github.com/cnosdb/cnosdb/pull/1484) [#1517](https://github.com/cnosdb/cnosdb/pull/1517) [#1623](https://github.com/cnosdb/cnosdb/pull/1623) [#1590] (https\://github.com/cnosdb/cnosdb/pull/159)

```sql
UPDATE table_name SET ( assignment_clause [, ...]) where_clause
assignment clause:
    tag_name = value_expression
```

```sql
UPDATE table_name SET ( assignment_clause [, ...]) where_clause
assignment clause:
    field_name = value_expression
ALTER TABLE tb_name alter_table_option;
```

```sql
alter_table_option: LO
      ADD TAG col_name
    | ADD FIELD col_name [CODEC(code_type]
    |
    | ALOR col_name CODEC(code_type)
    | DROP col_name 
 | RENAME COLUMN col_name TO new_col_name
}
```

```sql
DELETE FROM table_name where_clause
```

Other weighting features are as follows:：

- Match Vector.[#1380](https://github.com/cnosdb/cnosdb/pull/1380)
- Add Geometry type.[#1463](https://github.com/cnosdb/cnosdb/pull/1463)
- Add Histogram Export[#1472](https://github.com/cnosdb/cnosdb/pull/1472)
- Support duration_in function [#1423](https://github.com/cnosdb/cnosdb/pull/1423) [#1408](https://github.com/cnosdb/cnosdb/pull/1408)
- Add support for grpc compression [#1631](https://github.com/cnosdb/cnosdb/pull/1631)
- Add cluster data import tool [#1635](https://github.com/cnosdb/cnosdb/pull/1635)
- New database delay deletion.[#1510](https://github.com/cnosdb/cnosdb/pull/1510)

```sql
DROP DATABASE [IF EXISTS] <db_name> [AFTER <time_interval>]
```

### Feature optimization

Memory usage has been reduced efficiently, TSKV has been optimized more efficiently, and Flatbuffers, indexing and so on.In addition to this, detailed optimization such as cache reconfiguration and reduced clone operations increases overall performance.

- Supported twe\<!=> Compare operator to data source.[#1469](https://github.com/cnosdb/cnosdb/pull/1469)
- Split WAL by vnode.[#1454](https://github.com/cnosdb/cnosdb/pull/1454)
- Optimize TSKV to reduce memory usage. [#1199](https://github.com/cnosdb/cnosdb/pull/1199)
- Redesign DESC TABLES / DESC DATABASES.[#1397](https://github.com/cnosdb/cnosdb/pull/1397)
- Add a new resource management feature, data delete changes to monitor and failed to retry.[#1616](https://github.com/cnosdb/cnosdb/pull/1616)
- Improve the Meta Watch model.[#1586](https://github.com/cnosdb/cnosdb/pull/1586)
- Rebuild the iterator and optimize performance.[#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Change the big dependency 'models' to 'error_code'.[#1470](https://github.com/cnosdb/cnosdb/pull/1470)
- Optimize the build index.[#1468](https://github.com/cnosdb/cnosdb/pull/1468)
- Optimize Flatbuffers.[#1435](https://github.com/cnosdb/cnosdb/pull/1435)
- Rewrite record_file and codec, in TSKV.[#1439](https://github.com/cnosdb/cnosdb/pull/1439)
- Vector type array mapped into string.[#1450](https://github.com/cnosdb/cnosdb/pull/1450)
- Reload usage_schema.[#1479](https://github.com/cnosdb/cnosdb/pull/1479)
- Rename coordinator limiter.[#1482](https://github.com/cnosdb/cnosdb/pull/1482)
- Add limiter manager.[#1494](https://github.com/cnosdb/cnosdb/pull/1494)
- Clean useless code VnodeStatusListener.[#1487](https://github.com/cnosdb/cnosdb/pull/1487)
- Reduce cloning.[#1582](https://github.com/cnosdb/cnosdb/pull/1582)
- Fix the number of bid function parameters not checked in BUG.[#1597](https://github.com/cnosdb/cnosdb/pull/1597)
- Find location before indexing reads.[#1618](https://github.com/cnosdb/cnosdb/pull/1618)
- Extend the Rafah write interface.[#1620](https://github.com/cnosdb/cnosdb/pull/1620)
- Restart cache.[#1560](https://github.com/cnosdb/cnosdb/pull/1560)
- When deleting the table, the data will be deleted.[#1553] (https\://github.com/cnosdb/cnosdb/pull/1553)
- Disable restrictions on tenant cnosdb.[#1617](https://github.com/cnosdb/cnosdb/pull/1617)
- Leader copied, multiple Raft copygroups.[#1534](https://github.com/cnosdb/cnosdb/pull/1534)
- Adds test examples about functions, DDL, DML etc.[#1588](https://github.com/cnosdb/cnosdb/pull/1588)
- Restructuring the method of scanning data in tag plan [#1634](https://github.com/cnosdb/cnosdb/pull/1634)

### Issue Fix

- Repair check_writes error. [#1383](https://github.com/cnosdb/cnosdb/pull/1383)
- Error fixing protocol parser \`\n'.[#1426](https://github.com/cnosdb/cnosdb/pull/1426)
- Modify cases to achieve repetition.[#1451](https://github.com/cnosdb/cnosdb/pull/1451)
- Fix HTTP indicator field error in order.[#1506](https://github.com/cnosdb/cnosdb/pull/1506)
- Fix TSM damaged, but query does not attempt to read questions.[#1453](https://github.com/cnosdb/cnosdb/pull/1453)
- Repair the stream plan does not perform filter push issues.[#1515](https://github.com/cnosdb/cnosdb/pull/1515)
- Fix the CLI array for cross-border access.[#1531](https://github.com/cnosdb/cnosdb/pull/1531)
- Fix missing data on restart.[#1471](https://github.com/cnosdb/cnosdb/pull/1471)
- Delete database in Raft Copy mode.[#1556] (https\://github.com/cnosdb/cnosdb/pull/1556)
- Fix unexpectedly deleted WAL test directory.[#1558] (https\://github.com/cnosdb/cnosdb/pull/1558)
- Failed to fix password validation.[#1583](https://github.com/cnosdb/cnosdb/pull/1583)
- Repair time_windoww function cannot handle constant transformation expressions.[#1578](https://github.com/cnosdb/cnosdb/pull/1578)
- Repair the drum filling rate.[#1563](https://github.com/cnosdb/cnosdb/pull/1563)
- Fix confused error messages.[#1595](https://github.com/cnosdb/cnosdb/pull/1595)
- Fix the problem of restoring invalid data on reboot.[#1570](https://github.com/cnosdb/cnosdb/pull/1570)
- Remove root user.[#1598](https://github.com/cnosdb/cnosdb/pull/1598)
- Fix the problem of deleting columns in TSKV and fetching empty databases.[#1581](https://github.com/cnosdb/cnosdb/pull/1581)
- Fix /cluster/users/user changes without notifying the server.[#1599](https://github.com/cnosdb/cnosdb/pull/1999)
- Fix Meta to create duplicate data versions.[#1605](https://github.com/cnosdb/cnosdb/pull/1605)
- Add a label function to check parameters.[#1615](https://github.com/cnosdb/cnosdb/pull/1615)
- Fix the problem of creating the system database usage_schema.[#1606](https://github.com/cnosdb/cnosdb/pull/1606)
- Do not delete member errors while deleting tenants.[#1626](https://github.com/cnosdb/cnosdb/pull/1626)
- Fixing the tskv iterator sometimes returns an issue that exceeds the expected data. [#1638](https://github.com/cnosdb/cnosdb/pull/1638)
- Make tskv node restart free from resource hidding. [#1636](https://github.com/cnosdb/cnosdb/pull/1636)
- Stop the data compaction task in the background when deleting it. [#1643](https://github.com/cnosdb/cnosdb/pull/1643)

## v2.3.3 Antlia

Release date：28.05.2023

### Feature optimization

- Optimized read performance [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Optimized Ord Implementation of DataType [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Added data block reader [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- Removed field scanner timer [#1467](https://github.com/cnosdb/cnosdb/pull/1467)

### Problem fixing：

- Fixed question [1421]to allow modification of usage_schema database (https\://github.com/cnosdb/cnosdb/pull/1421)
- Fix user and tenant inconsistencies on multiple metadata nodes  [1417](https://github.com/cnosdb/cnosdb/pull/1417)
- Fix the problem [1418]without deleting data when the tenant is removed (https\://github.com/cnosdb/cnosdb/pull/1418)
- Fixed issue of generating an optional TLS lv-2 certificate  [1441](https://github.com/cnosdb/cnosdb/pull/141)
- Fixed problem  [1478]for missing data when creating TSF (https\://github.com/cnosdb/cnosdb/pull/1478)
- Unquit Query Task [1488]on Tskv (https\://github.com/cnosdb/cnosdb/pull/1488)
- Repair  [1503]to try again after updating table conflict (https\://github.com/cnosdb/cnosdb/pull/1503)
- Fix database change question  [1504](https://github.com/cnosdb/cnosdb/pull/1504)
- Repair the getCatalogs, getSchemas and getTables of Arrow Flight SQL JDBC API Questions [1520](https://github.com/cnosdb/cnosdb/pull/1520)
- Repair Arrow Flight SQL getTables API    [1528](https://github.com/cnosdb/cnosdb/pull/1528)
- Repair NodeMetrics Questions    [1541](https://github.com/cnosdb/cnosdb/pull/1541)
- Update form to cause data loss question    [1542](https://github.com/cnosdb/cnosdb/pull/1542)
- Fixed error    [1539]when parsing Line Protocol (https\://github.com/cnosdb/cnosdb/pull/1539)

## v2.3.2

Publication date：2 August 2023

### Add Feature

- Add monitoring indicator 'http_data_out' [#1304](https://github.com/cnosdb/cnosdb/pull/1304)
- Add chunked mode [#1357](https://github.com/cnosdb/cnosdb/pull/1357)
- WAL increases log types：DROP VNODE and DROP TABLE [#1340](https://github.com/cnosdb/cnosdb/pull/1340)

### Feature optimization

- Improve the implementation of flight-sql implementation with do_put_prepared_statement_update interface [#1329](https://github.com/cnosdb/cnosdb/pull/1329)
- Improve meta watch and optimize interplay between queries [#1314](https://github.com/cnosdb/cnosdb/pull/1314)
- Upgrade data version to 27.0.0 [#1323](https://github.com/cnosdb/cnosdb/pull/1323)
- Add some additional methods for flatbuffers [#1361] (https\://github.com/cnosdb/cnosdb/pull/1361)

### Issue Fix

- Fix the issue of generating duplicate series id [#1301](https://github.com/cnosdb/cnosdb/pull/1301)
- Repair sample function returns wrong question [#1296](https://github.com/cnosdb/cnosdb/pull/1296)
- Fix panic issues [#1309] when writing binlog (https\://github.com/cnosdb/cnosdb/pull/1309)
- Fix schema [#1332](https://github.com/cnosdb/cnosdb/pull/1332)
- Repair CREATE TABLE parsing errors [#1318](https://github.com/cnosdb/cnosdb/pull/1318)
- Fix the deceleration problem [#1347](https://github.com/cnosdb/cnosdb/pull/1347)
- Repair arrow-flight-sql odbc failure [#1336] (https\://github.com/cnosdb/cnosdb/pull/1336)
- Fix memory deficiencies when importing Line Protol data [#1319](https://github.com/cnosdb/cnosdb/pull/1319)
- Error repairing data node health check [#1352](https://github.com/cnosdb/cnosdb/pull/132)
- Unexpected deletion of the list [#1363] (https\://github.com/cnosdb/cnosdb/pull/1363)
- Fix problems that customers cannot connect to server via ca.crt [#1369](https://github.com/cnosdb/cnosdb/pull/1369)
- Repair tokio trace filtering [#1372](https://github.com/cnosdb/cnosdb/pull/1372)
- Fix error inserting line protocol [#1366](https://github.com/cnosdb/cnosdb/pull/1366)

### Behavior Change

- Configure changes [#1372](https://github.com/cnosdb/cnosdb/pull/1372)
- Set default TTL as unlimited [#1354] when creating database (https\://github.com/cnosdb/cnosdb/pull/1354)

## v2.3.1

Published：21.06.2023

### Add Feature

- Add trace [#1272] (https\://github.com/cnosdb/cnosdb/issues/1272)
- Gap fill [#1171] for sliding windows (https\://github.com/cnosdb/cnosdb/pull/1171)
- Metadata api [#1173] for flight sql (https\://github.com/cnosdb/cnosdb/pull/1173)
- Support granting admin[#1929](https://github.com/cnosdb/cnosdb/pull/1219)
- implemented sample function [#1228](https://github.com/cnosdb/cnosdb/pull/1228)
- Client[#1225](https://github.com/cnosdb/cnosdb/pull/1225)

### Feature optimization

- Pre-release rwlock [#1181] of cached partitions (https\://github.com/cnosdb/cnosdb/pull/1181)
- System tables perform library view function [#1212](https://github.com/cnosdb/cnosdb/pull/1212)
- grpc server delete TLS link support [#1216](https://github.com/cnosdb/cnosdb/pull/1216)
- Change bucket start time accuracy to ms [#1215](https://github.com/cnosdb/cnosdb/pull/1215)
- Multi-threaded handoff [#1230] is supported (https\://github.com/cnosdb/cnosdb/pull/1230)
- TskvExecuc partition read policy [#1200](https://github.com/cnosdb/cnosdb/pull/1200)
- Add new index tool [#1238] to fix corrupted files (https\://github.com/cnosdb/cnosdb/pull/1238)
- Compaction consumes too much memory [#1237](https://github.com/cnosdb/cnosdb/pull/1237)
- Add host information [#1202] to query metrics (https\://github.com/cnosdb/cnosdb/pull/1202)
- Add merite_data_in and sql_data_data information [#1241] (https\://github.com/cnosdb/cnosdb/pull/1241)
- Expired WAL files are sometimes not automatically deleted [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- Expired WAL files are not automatically deleted [#1175] (https\://github.com/cnosdb/cnosdb/pull/1175) when some Vnode is more cold (rarely written).
- When Cache flushes to disk, check if WAL is expired and delete expired WAL [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- Optimize some methods in FileManager [#1268](https://github.com/cnosdb/cnosdb/pull/1268)

### Issue Fix

- Copy target Vnode when migrating to Vnode results in data loss [#1151](https://github.com/cnosdb/cnosdb/issues/1151)
- Metadata validation failed to write data [#1184](https://github.com/cnosdb/cnosdb/issues/1184)
- Deleting a non-existing table return state does not meet expectations [#1218](https://github.com/cnosdb/cnosdb/issues/1218)
- VNODE_DISK_STORAGE and VNODE_CACHE_SIZE Monitoring Indicators are inaccurate [#1197] (https\://github.com/cnosdb/cnosdb/issues/1197)
- No sql [#1188](https://github.com/cnosdb/cnosdb/issues/1188) is available for sql [#1188](https://github.com/cnosdb/cnosdb/issues/1188)
- Generate many empty files with only listed information when exporting data [#1211] (https\://github.com/cnosdb/cnosdb/issues/1211)
- No column encoding [#1148](https://github.com/cnosdb/cnosdb/issues/1148) was checked when updating table
- Vnode damage results in inconsistent data queries [#1192](https://github.com/cnosdb/cnosdb/issues/1192)
- Data writing failed to return results to success [#1084](https://github.com/cnosdb/cnosdb/issues/1084)
- When writing data, large numbers of deleted file handles, resulting in sustained disk space [#1242] (https\://github.com/cnosdb/cnosdb/issues/1242)
- Too many connections [#1251] when writing data (https\://github.com/cnosdb/cnosdb/issues/1251)
- Error compiling the CnosDB component in Docker environment [#1266](https://github.com/cnosdb/cnosdb/issues/1266)
- Fixed problem of prom remote_read not returning data [#1273](https://github.com/cnosdb/cnosdb/issues/1273)
- Out of data exhausted [#955](https://github.com/cnosdb/cnosdb/issues/955)
- Query data results are inconsistent, inaccurate [#1283] (https\://github.com/cnosdb/cnosdb/pull/1283)
- DB recovery is slow [#1180] after upgrade (https\://github.com/cnosdb/cnosdb/issues/1180)
- descriptive tables/data abases syntax parse error [#160](https://github.com/cnosdb/cnosdb/issues/1160)
- Excess data import memory results in OOM, final data entry failed [#1141] (https\://github.com/cnosdb/cnosdb/issues/1141)
- Wrong seq_no parameter [#1175](https://github.com/cnosdb/cnosdb/pull/1175) when moving Vnode.
- sql Execute Report "Not a Field Name" [#1033](https://github.com/cnosdb/cnosdb/issues/1033)
- External table data import will overwrite original table data [#1131](https://github.com/cnosdb/cnosdb/issues/1131)

### Behavior Change

- Table_name [#1212] shown in show tables results (https\://github.com/cnosdb/cnosdb/pull/1212)

## v2.3.0

Version V2.3.0 of CnosDB was released on 09 May 2023.This version mainly increases current computing capabilities and some enterprise version features.The main changes to this version also include：

- Query features have been enhanced, and scroll windows, sliding windows and streaming calculations are now supported.
- The search iterator has been treated in parallel and has greatly improved its query.
- Adds tools to locate some issues, including CPU/Memory pprof and asynchronous stack printing.
- The test case system was further refined, including improved gate test cases and increased support for SQLLOgicTest.
- Support OpenTSDB writing protocol.
- HTTP requests now support streaming, effectively reducing the memory usage of the database.
- In enterprise version, support for subscription and rating storage has been added.We are welcome to be in touch with us.

In addition, some bugs were repaired.

## v2.2.0

Version V2.2.0 was released by CnosDB on 01 March 2023.The version primarily increases the separation of deposits mode and further increases the performance and stability of distributions and continues to maintain open sources.The main changes to this version also include：

- Prometheus Remote Remote API is supported.
- Increases performance：increases the cache of indexes and files.
- Restructuring coodinator and watch's code, improving performance and enhancing stability.
- Support for multiple boot mode： to save one, separate, and single-machine mode.
- Improve control metrics and increase memory limits to prevent oom.
- Finish the app to add copy/move/dropvnode.
- Increase down count, optimize count(\*) and significantly improve count.
- Increases writing performance by adding multiple threads, reducing memory copy, optimizing usage of some locks.

In addition, a series of bugs was repaired.

## v2.1.0

Version V2.1.0 of CnosDB was released on 10 January 2023.The version released the CnosDB2.0 distributed cluster version and continues to maintain open sources.The main changes to this version also include：

- New metadata services and coordinator services to support distributed clusters have been added.
- The RBAC permission system has been introduced, which supports user management, role management and permissions management through SQL.
- Restructuring the invert index to solve the problem of magnifying the index.
- Adds a new feature to the query that shows query that is running and pauses the performing query.
- Bad returns to users have been harmonized to make them clearer and simple.
- New quota support has been added for multi-tenant scenarios.

In addition, it includes a series of metric indicators and performance optimization, as well as bug repairs.

## V2.0.1

Version V2.0.1 of CnosDB was released on 08 November 2022.This version fixes some of the CnosDB focus errors, and updates some of the required new features as follows：

**Bugfixing：**

- Fixed problem with table and database object name error.
- Fix a file corrupted error when WAL interrupted.
- Fixed TableWriteExecuc can only write to one partition.
- Fix Schema using error, when refreshing data to disk leads to troubleshooting.
- Increases TskvScan's projective validity check and optimizes column clip.
- Fix the field in the write line protocol to be empty.
- Fixed failed problem parsing request string with comma or equivalent.
- Add extra field and tag checks for write points.
- Retrieving the write pending issues when the Compatibility is fixed.
- Fix the Bugs that do not return data when the SELECT statement contains only tag columns.
- Add tsfid to the global context.
- Disable cross join.

**New feature：**

- Limit the number of connections to queries and the size of queries.

**Other：**

- Keys with HashMap are clearer.
- Upgrade DataFusion to 13.0.0.
- Resolving the problem of reliance on conflict.
- Add log_err macro.
- Check the input point format.
- Performance optimization.
- Add collection information.
- Structural name modifications, change Point::table to tab, change Points::database to db.

## V2.0.0

Version V2.0.0 was released by CnosDB on October 24, 2022.
This release is a new beginning, and we rebuilt the CnosDB Time-series database based on Rust, upgraded CnosDB's performance, enhanced CnosDB's ease of use and made CnosDB more responsive to cloud ecologies.

**Featured：**

- Storage engine dedicated to sequential data design, optimize writing actions, support deletions and updates;
- Compression algorithms are specified by the user flexibility and compression comparison is comparable;
- Query engine implemented based on Apache Arrow and Datafusion;
- Support standard SQL, support schemaless writing;
- Multiindex optimizes query efficiency;
- Ecological friendship, support for the RESTful interface, and support for generic third-party ecosystem components such as Telegraf, Grafana and others.
