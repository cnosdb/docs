---
title: Change List
icon: type
order: 2
---

# Change List


## v2.2.0

On March 01, 2023, CnosDB released version V2.2.0. This version mainly adds the storage and computation separation mode and further enhances the performance and stability of distributed, and continues to be open source. The major changes in this release also include:

- Support for the Prometheus Remote Read/Write API.

- Improved performance: added caching for index and file index.

- Refactor the code of Coodinator and Watch to improve performance and enhance stability.

- Support multiple startup modes: storage and computing integration, separation and stand-alone mode start.

- Improved monitoring metrics and added memory limits to prevent OOM.

- Improved the O&M functions, adding copy/move/drop vnode capabilities.

- Added count pushdown, optimized count(*) and significantly improving count performance.

- Add multi-threaded flush, reduce memory copy during writes, optimize the use of some locks and improve write performance.

addition, there are a series of bug fixes.

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