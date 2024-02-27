---
title: SQL Syntax Reference
order: 5
---

# SQL Syntax Reference

## **Database operations**

### **Data Type**

| Type            | Description           | Size    |
| --------------- | --------------------- | ------- |
| BIGINT          | Integer               | 8 Bytes |
| BIGINT UNCIGNED | Unsigned integer      | 8 Bytes |
| BOOLEN          | Boolean Type          | 1byte   |
| TIMESTAMP       | Timestamp             | 8 Bytes |
| STRING          | UTF-8 encoded string  | ***     |
| DOUBLE          | Double-accuracy float | 8 Bytes |

#### Other data types

The following data type cannot be stored directly, but will appear in SQL expression

| Type     | Description                                                   | Remarks                                                                         |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| BINARY   | Binary data can be converted to STRING using the Castsentence | The return value of sha224, sha256, sha384, sha512 functions of this type       |
| INTERVAL | Time interval                                                 | Time plus offset and date_bin function parameters required |
| ARRAY    | Array Type                                                    | The converse function array_agg returns this type          |

#### constant

| Type            | Syntax                                                        | Note                                                                                                            |
| --------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| BIGINT          | [{+-}]123 | Value Type                                                                                                      |
| BIGINT UNCIGNED | [+]123    | Value Type                                                                                                      |
| DOUBLE          | 123.45                                                        | Numeric type, scientific notation is currently not supported                                                    |
| BOOLEN          | {true \| false \| t \| f}                                     |                                                                                                                 |
| STRING          | 'abc'                                                         | Double quotation format is not supported. Two consecutive '' in quotation numbers are converted to value        |
| TIMESTAMP       | TIMESTAMP '1900-01-01T12:00Z'                                 | Timestamp,TIMESTAMP keyword indicates that the string constant after needs to be interpreted as TIMESTAMP type. |
| Geometry        | [点击跳转](#geometry)                                             | Geometry                                                                                                        |
| --              | NULL                                                          | Empty value                                                                                                     |

#### TIMESTAMP constant syntax

Timestamp is by RFC3339 Standard

T intervals, only spaces can be used instead

Z for zero timezone

+08:00 for Sector 8

The following：

- `1997-01-31T09:26:56.123Z` # Standard RFC 3339 UTC timezone
- `1997-01-31T09:26:56.123+08:00` # Standard RFC 3339 East Region
- `1997-01-31 09:26:56.123+08:00` # close to RFC 3339, replacing T with spaces
- `1997-01-31T09:26:56.123` # close to RFC 3339, no time zone specified, default UTC
- `1997-01-31 09:26:56.123` # close to RFC 3339, replace T with spaces and no time zone specified
- `1997-01-31 09:26:56` # close to RFC 3339, accuracy in seconds.

**Note**：`CAST (BIGINT AS TAMEESTAMP)` is time stamp converted to nanoss, as follows:：

```sql
SELECT CAST (1 AS TIMESTAMP);
```

```
+-------------------------------+
| Int64(1)                      |
+-------------------------------+
| 1970-01-01T00:00:00.000000001 |
+-------------------------------+
```

#### INTERVAL constant

#### Example

1. \`INTERVAL 1' for one second
2. \`INTERVAL '1 SECONDE' for one second
3. \`INTERVAL '1 MILLISED' in one milliseconds
4. \`INTERVAL '1 MINUTE' for a minute
5. \`INTERVAL '0.5 MINUTE' for half a minute
6. \`INTERVAL '1 HOUR' for one hour
7. \`INTERVAL '1 DAY' for one day
8. \`INTERVAL '1 DAY 1'
9. \`INTERVAL '1 WEEK' week
10. \`INTERVAL '1 MONTH' month (30 days)
11. \`INTERVAL '0.5 MONTH' half-month (15 days)
12. \`INTERVAL '1 YEAR' year (12 months)
13. `INTERVAL '1 YEAR 1 DAY 1 HOUR 1 MINUTE' `One year and one hour one day and one hour one hour one year
14. \`INTERVAL '1 DECADES' for one decade

**Note：**

INTERVAL '1 YEAR' is not 365 or 366 days, but 12 months.
INTERVAL '1 MONTH' is not 28 or 29 or 31 days, but 30 days.

#### Geometry

#### WKT

The WKT format is a text format that describes the spatial characteristics of two-dimensional and three-dimensional geometric objects.
WKT is the acronym “Well-Known Text”, an open international standard.
The WKT format includes some basic geometry objects such as dots, lines, polygons and circulars, as well as some composite objects such as polygons and geometry.

#### Syntax

```
<geometry tag> <wkt data>

<geometry tag> ::= POINT | LINESTRING | POLYGON | MULTIPOINT | 
                   MULTILINESTRING | MULTIPOLYGON | GEOMETRYCOLLECTION
                   
<wkt data> ::= <point> | <linestring> | <polygon> | <multipoint> | 
               <multilinestring> | <multipolygon> | <geometrycollection>
```

| Geometry            | Syntax description                                                                 |
| ------------------- | ---------------------------------------------------------------------------------- |
| dot                 | `POINT (<x1> <y1>)`                                                                |
| Lines               | `LINESTRING (<x1> <y1> <x2> <y2>, ..)`                                             |
| Polygon             | `POLYGON (<x1> <y1> <x2> <y2>, ...)`                                               |
| Multipoint          | `MULTIPINT (<x1> <y1> <x2> <y2>, ...)`                                             |
| Multiline           | `MULTILINESTRING ((<x1> <y1> <x2> <y2>, ...), (<x1> <y1>, <x2> <y2>, ..)`          |
| Polygon             | `MULTIPOLYGON ((<x1> <y1> <x2> <y2>, ...),((<x1> <y1>, <x2> <y2>, ..)))`           |
| Geometry collection | `GEOMETRYCOLLETION (<geometry tag1> <wkt data1> <geometry tag2> <wkt data2>, ...)` |

#### Example

| Geometry            | Picture                                          | Example                                                                                                                                                                                |
| ------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dot                 | ![](/img/sql/SFA_Point.svg.png)                  | POINT (30 10)                                                                                                                                                       |
| Lines               | ![](/img/sql/102px-SFA_LineString.svg.png)       | LINESTRING (30 10, 10 30, 40 40)                                                                                                                                    |
| Polygon             | ![](/img/sql/SFA_Polygon.svg.png)                | POLYGON (3010, 40 40, 20 40, 10 20, 30 10))                                                                                                                         |
|                     | ![](/img/sql/SFA_Polygon_with_hole.svg.png)      | POLYGON (35 10, 45 45, 15 40, 10 20, 35 10), (2030, 35 35, 30 20, 20 30)                                                                         |
| Multipoint          | ![](/img/sql/SFA_MultiPoint.svg.png)             | MULTIPINT (10 40), (40 30), (20 20), (30 10))                                                              |
|                     |                                                  | MULTIPINT (10 40, 40 30, 20 20, 30 10)                                                                                                                              |
| Multiline           | ![](/img/sql/102px-SFA_MultiLineString.svg.png)  | MULTILINESTING (10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))                                                                              |
| Multidimensional    | ![](/img/sql/SFA_MultiPolygon.svg.png)           | MULTIPOLYGON ((3020, 45 40, 10 40, 30 20)), (155, 40 10, 10 20, 5 10, 15 5))                                                  |
|                     | ![](/img/sql/SFA_MultiPolygon_with_hole.svg.png) | MULTIPOLYGON (40 40, 20 45, 45 30, 40 40)), (2035, 10 30, 10 , 30 5, 45 20, 20 35), (30 20, 20, 15, 20 25, 30 20))            |
| Geometry collection | ![](/img/sql/SFA_GeometryCollection.svg.png)     | GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON (40 40, 20 45, 45 30, 40 40)) |

### **Create Database**

#### Syntax

```sql
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options];

db_options:
    db_option...

db_option: LO
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```

#### Parameter Description

1. TTL：indicates the time of data file saving, default limitless, expressed in unit data, supported days (d), hours (h), minutes (m), such as TTL 10d,TTL 50h,TTL
   100m, defaults to days when not in unit, such as TTL 30.
2. SHARD：means the number of data fragments, default is 1.
3. VNODE_DURATION：indicates the time range of data in shard, by default it is 365 days, using unit data as well, the significance of the data is consistent with TTL value.
4. REPLICA：means the number of copies of the data in the cluster, default is 1 (number of copies is not greater than the number of distributed data nodes).
5. The timestamp accuracy of PRECISON：Database,ms denotes milliseconds,us means microseconds,ns and by default.

#### Example

```sql
> CREATE DATABASE oceanic_station;
Query took 0.062 seconds.
```

### **View database**

#### Syntax

```sql
SHOW DATABASES;
```

#### Example

```
+-------- +
| database_name |
+-------+
| oceanic_station|
| public |
+---+ +
```

### **Using Database**

If you use the database using the [HTTP API](./res_api.md),
you can specify parameters db=database_name in url.

In CnosDB-Cli, the following command can be used to switch database：

```sql
\c dbname
```

```
Public employee \c oceanic_station
oceanic_stage leader
```

### **Delete database**

#### Syntax

```sql
DROP DATABASE [IF EXISTS] db_name [AFTER '7d'];
```

Removing the database will delete all tables and metadata specified for the database.

Delete without AFTER

In case of delay deletion, delete will be deleted after the specified time, supported by days (d), hours (h), minutes (m), such as 10d,50h,100m, default is day when unit is not involved.The database is not visible and unavailable during the delay deletion.

#### Syntax

```sql
RECOVER DATABASE [IF EXISTS] db_name;
```

Cancel Delay Deletion and Database Revert

**NOTE**：works only if you have a resource that is deleted late and if you do a RECOVER.

#### Example

```sql
DROP DATABASE oceanic_station AFTER '7d';

RECVER DATABASE oceanic_station;

DROP DATABASE oceanic_station;
```

### **Modify database parameters**

#### Syntax

```sql
ALTER DATABASE db_name [alter_db_options]

alter_db_options:
    SET db_option

db_option: LO
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
}
```

#### Example

```sql
ALTER DATABASE oceanic_station SET TTL '30d';
```

### **View database parameters**

#### Syntax

```sql
DESCRIBE DATABASE dbname;
```

#### Example

```sql
DESCRIBE DATABASE oceanic_station;
```

```
+-----+-------+----------------+---------+-----------+
| ttl | shard | vnode_duration | replica | precision |
+-----+-------+----------------+---------+-----------+
| INF | 1     | 365 Days       | 1       | NS        |
+-----+-------+----------------+---------+-----------+
```

## **Table Operations**

### **Create table**

Table can be created using `CREATE TABLE`.

CnosDB supports the creation of regular and external tables.

### **Create Normal (TSKV)**

#### Syntax

```sql
CREATE TABLE [IF NOT EXISTS] tb_name
(field_definition [, field_definition]... [, TAGS(tg_name [, tg_name]... ]);

field_definition:
    column_name data_type [field_codec_type]
    
field_codec_type:
    CODEC(code_type)
```

#### Use Instructions

1. There is no need to create a timestamp, the system automatically adds a timestamped column called "time".
2. The names in each column need to be different.
3. The default compression algorithm will be used when creating tables if no compression algorithm is specified.
4. The compression algorithms currently supported by various types are as follows, the first to be specified by default for each type, and NULL indicates that compression algorithms are not used.

- BIGINT/BIGINT UNSIGNED: DELTA, QUANTILE, SDT, DEADBAND, NULL
- DOUBLE: GORILLA, QUANTILE, SDT, DEADBAND, NULL
- STRING: SNPY, ZSTD, GZIP, BZIP, ZLIB, NULL
- BOOLEAN: BITPACK, NULL

See[压缩算法详情](/concept_design/compress.md# algorithms) for more about compression algorithms.

#### Example

```sql
CREATE TABair (
   vision DOUBLE,
   temperature DOUBLE,
   pressure DOUBLE,
   TAGS (station)
);
```

```
Query took 0.033 seconds.
```

### **Create External Tabs**

#### Syntax

```sql
-- Column definitions can not be specified for PARQUET files

CREATE EXTERNAL AULE [ IF NOT EXISTS ] tb_name 
    (field_definition [, Field_definition] ... ) tb_option;

field_definition:
    column_name data_type [ NULL ]

tb_option: LO
      STORED AS { PARQUET | NDJSON | CSV | AVRO }
    | [ WITH HEADER ROW]
    | [ DELIMITER 'a_single_char']
    | [ PARTITER BY ( column_name, [. ]]
    | LOCATON '/path/to/file'
}
```

#### Use Instructions

1. The external table does not exist in the database but uses an operating system file as a general database for access.
2. Data are read-only, cannot perform DML operations and cannot be indexed.

#### Parameter Description

1. STORED AS：indicates the format in which the file is stored, currently supports PARQUET, NDJSON, CSV, AVRO.
2. WITH HEADER ROW：only takes effect in csv file format and means having csv header
3. DELIMITER：takes effect only in csv format, representing the delimiter of the column data.
4. PARTICITIONED BY：uses the column specified when creating the table to partition.
5. LOCAN：indicates the location of the associated file.

#### Example

```sql
CREATE EXTERNAL TABLE cpu (
     cpu_hz DECIMAL (10,6) NOT NULL,
     temp DOUBLE NOT NULL,
     version_num BIGINT NOT NULL,
     is_old BOOLEN NOT NULL,
     Weight DECIMAL (12), ) NOT NULL

STORED AS CSV
WITH HEADER ROW
LOCATON 'tests/data/csv/cpu. sv';
```

```
Query took 0.031 seconds.
```

### **Delete table**

#### Syntax

```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

#### Example

```sql
DROP TABLE IF EXISTS air;
```

```
Query took 0.033 seconds.
```

### **Show all tables in the current database**

#### Syntax

```sql
SHOW TABLES;
```

#### Example

```sql
SHOW TABLES;
```

```
+---+
| table_name |
+---------
| air |
| sea |
| wind |
+---+ +
```

### **View table mode**

Both external and normal tables can be viewed using this statement.

#### Syntax

```sql
DESCRIBE DATABASE table_name;
```

#### Example

```sql
DESCREIBE TABLE air;
```

```
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| station     | STRING                | TAG         | DEFAULT           |
| pressure    | DOUBLE                | FIELD       | DEFAULT           |
| temperature | DOUBLE                | FIELD       | DEFAULT           |
| visibility  | DOUBLE                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### **Modify the table**

**Description**

We currently support the revision of the regular table.

1. Add column：to add field,tag columns.
2. Delete column：delete field column. When deleting column leading to the deletion of the last field value of a line, we don't think this line has any value, SELECT will show this line.
3. Modify column：to change column definitions. Changes to column and column compression algorithms are currently supported.

#### Syntax

```sql
ALTER TABLE tb_name alter_table_option;

alter_table_option: LO
      ADD TAG col_name
    | ADD FIELD col_name [data_type] [CODEC(code_type]
    | ALTER col_name SET CODEC(code_type)
    | DROP col_name
    | RENAMAMAMAME COUMN col_name TO new_col_name
}
```

> Modifying the `time` column name is not supported.
> Avoiding writing operations while executing rename tag column, may cause series conflict.

#### Example

```sql
ALTER TABLE air ADD TAG height;
ALTER TABLE air ADD FIELD humidity DOUBLE CODEC(DEFAULT);
ALTER TABLE air ALTER humidity SET CODEC(QUANTILE);
ALTER TABLE air DROP humidity;
ALTER TABLE air RENAME COLUMN height to height_v2;
```

## **Insert Data**

CnosDB supports two data writing methods, one using `INSERT INTO` and the other using the HTTP API[write](./rest_api.md) interface, writing data in the Line
Protocol.

This page shows only the syntax associated with `INSERT`.

### **INSERT**

#### Syntax

```sql
INSERT [INTO] tb_name [ ( column_name [, ...]) ] VALUES ( const [, ...]) [, ...] | query; 
```

**Description**

CnosDB requires a time stamp to insert data column and VALUES list must be[常量](#constants).
If the column is not checked, the value is `NULL`.

**Note**

Time column cannot be `NULL`, Tag, and Field column can be `NULL`.

e.g. `INSERT INTO air (TIME, station, visibility) VALUES(166613280000000000000, NULL, NUL)`

If the VALUES list requires an expression, use the [INSERT SELECT](./sql.md# insert the search result insert-select).

### **Insert a record**

Data in the TIME column can be expressed both in time string and in digital type timestamps. Note that

#### Example

```sql
CREATE TABair (
    vision DOUBLE,
    temperature DOUBLE,
    pressure DOUBLE,
    TAGS (station)
);
```

```
Query took 0.027 seconds.
```

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                (1666165200290401000, 'XiaoMaiDao', 56, 69, 77);
```

```
+---+
| rows |
+---+
| 1|
+---+
Query took 0.044 seconds.
```

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 06:40:00', 'XiaoMaiDao', 55, 68, 76);
```

```
+---+
| rows |
+---+
| 1|
+---+
Query took 0.032 seconds.
```

```sql
SELECT * FROM air;
```

```
+----------------------------+------------+------------+-------------+-----------+
| time                       | station    | visibility | temperature | pressure |
+----------------------------+------------+------------+-------------+-----------+
| 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
| 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
+----------------------------+------------+------------+-------------+-----------+
```

**Note**

For time zone indications, refer to[Timestamp](#timestamp-constant syntax).

### **Insert multiple records**

The `VALUES` keywords can be followed by multiple lists, separated by `,`

#### Example

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 05:40:00', 'XiaoMaiDao', 55, 68, 76), 
                ('2022-10-19 04:40:00', 'XiaoMaiDao', 55, 68, 76);
```

```
+---+
| rows |
+---+
| 2 |
+---+
Query took 0.037 seconds.
```

```sql
SELECT * FROM air;
```

```
+----------------------------+------------+------------+-------------+-----------+
| time                       | station    | visibility | temperature | pressure |
+----------------------------+------------+------------+-------------+-----------+
| 2022-10-18 20:40:00        | XiaoMaiDao | 55         | 68          | 76        |
| 2022-10-18 21:40:00        | XiaoMaiDao | 55         | 68          | 76        |
| 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
| 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
+----------------------------+------------+------------+-------------+-----------+
```

### **Insert query result (INSERT SELECT)**

You can also insert queried data into the table using the `INSERT SELECT` syntax.

#### Example

```sql
CREATE TABLE air_vision (
    visual DOUBLE,
    TAGS (station
);
```

```
Query took 0.027 seconds.
```

```sql
INSERT air_vision (TIME, station, visibility) 
    SELECT TIME, station, visibility FROM air;
```

```
+---+
| rows |
+---+
| 4 |
+---+
Query took 0.045 seconds.
```

```sql
SELECT * FROM air_visibility;
```

```
+----------------------------+------------+------------+
| time                       | station    | visibility |
+----------------------------+------------+------------+
| 2022-10-18 20:40:00        | XiaoMaiDao | 55         |
| 2022-10-18 21:40:00        | XiaoMaiDao | 55         |
| 2022-10-18 22:40:00        | XiaoMaiDao | 55         |
| 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         |
+----------------------------+------------+------------+
```

### **Insert duplicate data**

[//]: # "2.3"

The storage engine of CnosDB can be seen as a KV storage, in which Timestamp and Tags constitute KEY, and Fields form a range of values.

```
CREATE TABair (
    vision DOUBLE,
    temperature DOUBLE,
    pressure DOUBLE,
    TAGS(station)
;
INSERT INTO air (TIME, station, visibility, temperature) VALUES
(166616520029040000, 'XiaoMaiDao', 56, 69);
```

The above statement is equivalent to inserting k-v pairs：

| Key                                                   | visibility-value | Temperature-value | Pressure-value |
| ----------------------------------------------------- | ---------------- | ----------------- | -------------- |
| (166616520029040100, 'XiaoMaiDao') | 56               |                   |                |
| (166616520029040100, 'XiaoMaiDao') |                  | 69                |                |

Result is

```
select * from air;
----
+----------------------------+------------+------------+-------------+----------+
| time                       | station    | visibility | temperature | pressure |
+----------------------------+------------+------------+-------------+----------+
| 2022-10-19T07:40:00.290401 | XiaoMaiDao | 56.0       | 69.0        |          |
+----------------------------+------------+------------+-------------+----------+
```

Overwrite occurs when k-v is repeated in the same field field.

```sql
INSERT INTO air (TIME, station, visibility) VALUES
(166616520029040100, 'XiaoMaiDao', 66);
```

Equivalent to insert

| Key                                                   | visibility-value | Temperature-value | Pressure-value |
| ----------------------------------------------------- | ---------------- | ----------------- | -------------- |
| (166616520029040100, 'XiaoMaiDao') | 66               |                   |                |

Visibility-value with key (1666165200290401000, 'XiaoMaiDao') changed to 66.

```
select * from air;
----
+----------------------------+------------+------------+-------------+----------+
| time                       | station    | visibility | temperature | pressure |
+----------------------------+------------+------------+-------------+----------+
| 2022-10-19T07:40:00.290401 | XiaoMaiDao | 66.0       | 69.0        |          |
+----------------------------+------------+------------+-------------+----------+
```

```sql
INSERT INTO air (TIME, station, pressure) VALUES
(166616520029040000, 'XiaoMaiDao', 77);
```

Equivalent to insert

| Key                                                   | visibility-value | Temperature-value | Pressure-value |
| ----------------------------------------------------- | ---------------- | ----------------- | -------------- |
| (166616520029040100, 'XiaoMaiDao') |                  |                   | 77             |

```
select * from air;
----
+----------------------------+------------+------------+-------------+----------+
| time                       | station    | visibility | temperature | pressure |
+----------------------------+------------+------------+-------------+----------+
| 2022-10-19T07:40:00.290401 | XiaoMaiDao | 66.0       | 69.0        | 77.0     |
+----------------------------+------------+------------+-------------+----------+
```

## **Update Data**

### **Update tag column**

#### Syntax

```
UPDATE table_name SET ( assignment_clause [, ...]) where_clause

assignment clause:
    tag_name = value_expression
```

#### Use Instructions

1. CnosDB supports the updating of individual or multiple tag columns, not both tag and field columns.
2. CnosDB supports updating tag column values to NULL.
3. `value_expression` can only be used to determine values for the compilation period, such as：'constant', '1 + 2', 'CAST('1999-12-31 00:00:00.00.000' as timestamp)', etc.
4. `where_clause` cannot contain a field column or a time column and cannot be empty. If you want to update all data in the table, use 'where
   true', which represents your acceptance of performance problems when the table is larger.
5. Modifications to series are not supported (all tag column composition series).
6. Avoid updating tag actions while writing data may cause series.

#### Example

```sql
Update air set station = 'ShangHai' where station = 'LianYunGang';
```

### **Update Field Column**

#### Syntax

```sql
UPDATE table_name SET ( assignment_clause [, ...]) where_clause

assignment clause:
    field_name = value_expression
```

#### Use Instructions

1. CnosDB supports the updating of individual or multiple field values and does not support both tag and field columns.

#### Example

```sql
Update air set pressure = pressure + 100 where pressure = 68 and time < '2023-01-14T16:03:00';
```

## **Deleted Data**

[//]: # "2.4"

Filter and delete data by tag and time.

#### Syntax

```
DELETE FROM table_name where_clause
```

#### Use Instructions

1. The `where_clause` can only contain tag and time columns, field columns.

#### Example

```sql
delete from air where station = 'LianYunGang' and time < '2023-01-14T16:03:00';
```

## **Query data**

CnosDB SQL inspired by [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction)
We support most of DataFusion's SQL syntax.

**NOTE**：for more efficient query, no sorted queries specified, not necessarily in the same order per line, please see `ORDER BY` for field sorting.

### Sample Data

In order to learn more about CnosDB, this section will provide sample data for you to download and teach you how to import data into the database.The data sources cited in the subsequent sections are derived from this sample data.

### Download data

If in cnosdb-cli, type `\q` to exit

Executing the following command in shell will generate a local data file in the form of Line Protocol: oceanic_station

```shell
curl -o oceanic_station.txt https://dl.cnosdb.com/sample/oceanic_station.txt
```

### Import Data

- **Launch CLI**
  ```shell
  cnosdb-cli
  ```
- **Create Database**
  ```shell
  Create database oceanic_station;
  ```
- **Switch to specified database**
  ```shell
  \c oceanic_station
  ```
- **Import Data**

  Execute the \w instruction,\w after the data file is an absolute path or work path relative to cnosdb-cli.

  ```shell
  \w oceanic_station.txt
  ```

## SQL syntax

#### Syntax

```sql
[ WITH with_query [, ...]
SELECT [ ALL | DISTINCT ] select_expression [, . .]
    [ FROM from_item[, . ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element[, ... ]
    [ HAVING condition ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT] select]
    [ ORDER BY expression [ ASC | DESC ] [, , . ]
    [ OFFSET count ]
    [ LIMIT { count | ALL } ];

-- from_item
-- 1.
    tb_name [ AS ] alias [ ( column_alias [, ...]] ]
-2.
    from_item_join_type from_item_item_
    ) }

-- join_type
    [ INNER ] JOIN
    LEFT [ OUTE] JOIN
    RIGHT [ OUTE] JOIN
    FULL [ OUTE] JOIN
    CROSS JOIN

-- grouping_element
()
```

### SELECT Subsentence

### SELECT \*

Wildcard \* can be used to refer to all columns.

#### Example

```
SELECT * FROM air;
```

```
+---------------------+-------------+------------+-------------+----------+
| time                | station     | visibility | temperature | pressure |
+---------------------+-------------+------------+-------------+----------+
| 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
| 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
| 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
| 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
| 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
| 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
| 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
| 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
| 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
+---------------------+-------------+------------+-------------+----------+
```

### ALL/DISTINCT

#### Syntax

```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...];
```

After the `SELECT` key you can use `DISTINCT` to remove the duplicate field and return only the value after the reaction.
Use `ALL` to return all duplicated values in the field.When this option is not specified, the default value is `ALL`.

#### Example

```sql
SELECT DISTINCT station, visibility FROM air;
```

```
+-------------+------------+
| station     | visibility |
+-------------+------------+
| XiaoMaiDao  | 56         |
| XiaoMaiDao  | 50         |
| XiaoMaiDao  | 67         |
| XiaoMaiDao  | 65         |
| XiaoMaiDao  | 53         |
| XiaoMaiDao  | 74         |
| XiaoMaiDao  | 71         |
| LianYunGang | 78         |
| LianYunGang | 79         |
| LianYunGang | 59         |
| LianYunGang | 67         |
| LianYunGang | 80         |
+-------------+------------+
```

```sql
SELECT, visibility FROM air;
```

```
+-------------+------------+
| station     | visibility |
+-------------+------------+
| XiaoMaiDao  | 56         |
| XiaoMaiDao  | 50         |
| XiaoMaiDao  | 67         |
| XiaoMaiDao  | 65         |
| XiaoMaiDao  | 53         |
| XiaoMaiDao  | 74         |
| XiaoMaiDao  | 71         |
| LianYunGang | 78         |
| LianYunGang | 79         |
| LianYunGang | 59         |
| LianYunGang | 67         |
| LianYunGang | 80         |
| LianYunGang | 59         |
+-------------+------------+
```

### **Aliases**

You can use the `AS` keywords as column expression or table alias.

### Pick alias for column expression

#### Syntax

```sql
Express [ AS ] column_alias ]
```

#### Example

```sql
SELECT stations, visibility AS v FROM air;
```

```
+-------------+----+
| s           | v  |
+-------------+----+
| XiaoMaiDao  | 56 |
| XiaoMaiDao  | 50 |
| XiaoMaiDao  | 67 |
| XiaoMaiDao  | 65 |
| XiaoMaiDao  | 53 |
| XiaoMaiDao  | 74 |
| XiaoMaiDao  | 71 |
| LianYunGang | 78 |
| LianYunGang | 79 |
| LianYunGang | 59 |
| LianYunGang | 67 |
| LianYunGang | 80 |
| LianYunGang | 59 |
+-------------+----+
```

### Alias for table

You can also use the keyword `AS` for alias.

#### Syntax

```sql
FROM tb_name [AS] alias_name
```

#### Example

```sql
SELECT a.visibility, s.temperature
FROM air AS a JOIN sea ON a.temperature = s.temperature limit 10;
```

```
+------------+-------------+
| visibility | temperature |
+------------+-------------+
| 67         | 62          |
| 50         | 78          |
| 50         | 78          |
| 65         | 79          |
+------------+-------------+
```

### **SELECT limits**

- If SELECT only contains Tags columns, equivalent to SELECT DISTINCT Tag.

  #### Example

  ```sql
  -- Station is Tag, temperature is field column
  SELECT station, temperature ROM Fair;
  ```

  ```
  +-------------+-------------+
  | station     | temperature |
  +-------------+-------------+
  | XiaoMaiDao  | 69          |
  | XiaoMaiDao  | 78          |
  | XiaoMaiDao  | 62          |
  | XiaoMaiDao  | 79          |
  | XiaoMaiDao  | 53          |
  | XiaoMaiDao  | 72          |
  | XiaoMaiDao  | 71          |
  | LianYunGang | 69          |
  | LianYunGang | 80          |
  | LianYunGang | 74          |
  | LianYunGang | 70          |
  | LianYunGang | 70          |
  | LianYunGang | 70          |
  +-------------+-------------+
  ```

  ```sql
  -- Station is Tagcolumn
  SELECT station FROM air;
  ```

  ```
  +---+
  | Station |
  +------
  | XiaoMaiDao |
  | LianYunGang |
  +---+ 
  ```

### **LIMIT sics**

#### Syntax

```sql
LIMIT n
```

Limit the number of rows to return the resultset to n,n must not be negative.

#### Example

```sql
SELECT *
FROM air LIMIT 10;
```

```
+---------------------+-------------+------------+-------------+----------+
| time                | station     | visibility | temperature | pressure |
+---------------------+-------------+------------+-------------+----------+
| 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
| 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
| 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
| 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
| 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
| 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
| 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
| 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
| 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
+---------------------+-------------+------------+-------------+----------+
```

### **OFFSET sub sents**

#### Syntax

```sql
OFFSET m
```

Returns the resultset skipping m records, default m=0.

#### Example

```sql
SELECT *
FROM air OFFSET 10;
```

```
+---------------------+-------------+------------+-------------+----------+
| time                | station     | visibility | temperature | pressure |
+---------------------+-------------+------------+-------------+----------+
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
+---------------------+-------------+------------+-------------+----------+
```

`OFFSET` can be used in conjunction with the `LIMIT` phrase, which specifies the number of lines to be skipped in the format `LIMIT OFFSET m`.
where：`LIMIT n` controls output mm line data, `OFFSET m` indicates the number of lines that were skipped before starting to return data.
OFFSET 0 has the same effect as omitting OFFSET sentences.

#### Example

```sql
SELECT *
FROM air LIMIT 3 OFFSET 3;
```

```
+---------------------+------------+------------+-------------+----------+
| time                | station    | visibility | temperature | pressure |
+---------------------+------------+------------+-------------+----------+
| 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       |
| 2022-01-28 13:33:00 | XiaoMaiDao | 53         | 53          | 68       |
| 2022-01-28 13:36:00 | XiaoMaiDao | 74         | 72          | 68       |
+---------------------+------------+------------+-------------+----------+
```

### **WITH sub sentences**

#### Syntax

```sql
WITH cte AS cte_query_definiton [, ..] query
```

Optional.The WTH sentence contains one or more commonly used expressions CTE (Common Table Expression).
CTE serves as a temporary table in the current operating environment, which you can refer to in subsequent queries.The following rules for use by CTE are：

- The CTE in the same WTH sentence must have a unique name.
- The CTE defined in the WITH sentence is only available for other CTEs in the same WTH sentence as later defined.
  Assume A is the first CTE, B is the second CTE：

#### Example

```sql
SELECT, avg 
FROM ( SELECT station, AVG(visibility) AS avg 
        FROM air 
        GROUP station) AS x;
```

```
+-----+-------------------- +
| station | avg |
+---------------------------
| XiaoMaiDao | 62.2857142857147142872872885 |
| LianYunGang | 70.33333333333333333 |
+------+ ---+
```

```sql
WITH x AS 
    (SLECT, AVG(visibility) AS avg FROM air GROUP BY station)
SELECT, avg
FROM x;
```

```
+-----+-------------------- +
| station | avg |
+---------------------------
| XiaoMaiDao | 62.2857142857147142872872885 |
| LianYunGang | 70.33333333333333333 |
+------+ ---+
```

### **UNON sub sentences**

UNON subsentence is used to merge analysis results of multiple SELECT statements.

#### Syntax

```
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

`UNION` weights the merged resultset.
`UNON ALL` reserves the combined results for the same data set.
`EXCEPT` makes a difference between two results; returns all non-duplicate values not found in the right query from the left query.
`INTERSECT` returns the intersection of the two resultsets (i.e. all non-duplicate values returned by both queries).

**Note**

Each SELECT sentence within UNON must have the same number of columns, the same data type for each column.

#### Example

- **UNION ALL**

  ```sql
  SELECT visibility FROM air WHERE temperature < 60
  UNION ALL
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```

  ```
  +---+
  | visible |
  +--------
  | 53 |
  | 56 |
  | 50 |
  | 67 |
  | 65 |
  | 53 |
  74 |
  | 71 |
  | 78 |
  | 79 |
  +--+
  ```

- **UNION**

  ```sql
  SELECT vision FROM air WHERE temperature < 60
  UNION
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```

  ```
  +---+
  | visibility |
  +--------
  | 53 |
  | 56 |
  | 50 |
  | 67 |
  | 65 |
  | 74 |
  | 71 |
  | 78 |
  | 79 |
  | 59 |
  +-+
  ```

- **EXCEPT**

  ```sql
  SELECT visibility FROM air
  EXCEPT
  SELECT visibility FROM air WHERE temperature < 50 LIMIT 10;
  ```

  ```
  +---+
  | visitity |
  +---+
  | 56 |
  | 50 |
  | 67 |
  | 65 |
  | 53 |
  | 74 |
  | 71 |
  | 78 |
  | 79 |
  | 59 |
  +--+
  ```

- **INTERSECT**

  ```sql
  SELECT visibility FROM air
  INTERSECT
  SELECT visibility ROM ROM air WHERE temperature > 50 LIMIT 10;
  ```

  ```
  +---+
  | visitity |
  +---+
  | 56 |
  | 50 |
  | 67 |
  | 65 |
  | 53 |
  | 74 |
  | 71 |
  | 78 |
  | 79 |
  | 59 |
  +--+
  ```

### **ORDER BY sentence**

Sort results by referenced expression.Default usage ascending (ASC).Sort by adding DESC in descending order after ORDER BY expression.

#### Example

```sql
SELECT * FROM air ORDER BY temperature;
```

```
+---------------------+-------------+------------+-------------+----------+
| time                | station     | visibility | temperature | pressure |
+---------------------+-------------+------------+-------------+----------+
| 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
| 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
| 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
| 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
| 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
| 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
| 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
| 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
| 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
+---------------------+-------------+------------+-------------+----------+
```

```sql
SELECT * FROM air ORDER BY temperature DESC;
```

```
+---------------------+-------------+------------+-------------+----------+
| time                | station     | visibility | temperature | pressure |
+---------------------+-------------+------------+-------------+----------+
| 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
| 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
| 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
| 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
| 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
| 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
| 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
| 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
| 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
+---------------------+-------------+------------+-------------+----------+
```

```sql
SELECT * FROM air ORDER BY station, temperature;
```

```
+---------------------+-------------+------------+-------------+----------+
| time                | station     | visibility | temperature | pressure |
+---------------------+-------------+------------+-------------+----------+
| 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
| 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
| 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
| 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
| 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
| 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
| 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
| 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
| 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
+---------------------+-------------+------------+-------------+----------+
```

## **Expression**

Expressions are a combination of symbols and operators, and CnosDB will process the combination to get a single data value.
Simple expression can be a constant, variable, column or number function.
Two or more simple expressions can be connected to complex expressions with an operator.

#### Syntax

```sql
<expresion> :: = { 
    constant 
    | [ table_name. ] column   
    | scalar_function 
    | ( expression ) 
    | expression { binary_operator } expression   
    | case_when_expression
    | window_function | aggregate_function  
}
```

#### constant

Symbol representing a specific data value.
See[常量](#constants) for details.

#### Example

```sql
Select 1;
```

```
+---+
| Int64(1) |
+---+
| 1 |
+---+ +
```

#### Tag Functions

See[函数](#function) for details

#### Single Operator

| Operator    | Note                                                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| NOT         | If a subexpression is true, then the whole expression is false, and if the whole expression is false, the whole expression is true |
| IS NULL     | If a subexpression is null, the whole expression is true                                                                           |
| IS NOT NULL | If subexpression is null, the whole expression is false                                                                            |

#### Binary Operator

A binary operator is combined with two expressions to form a new expression.

Supported binary operators are:

| Operator       | Note                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| -              | Addition of an expression of number type                                                                               |
| *              | Digital type expression subtract                                                                                       |
| -              | Digital Type Expression Multiply                                                                                       |
| /              | Digital Type Expression Divide                                                                                         |
| %              | Integer type expression is available                                                                                   |
| \|\&#124       | String Type Expression Spelling                                                                                        |
| =              | Compare the equation                                                                                                   |
| !=, <\&gt      | Compare expression not equal                                                                                           |
| <              | Compare the expression less than                                                                                       |
| <=             | Compare whether expression is less than or equal to                                                                    |
| &gt;      | Compare expression greater than                                                                                        |
| > =            | Compare expression is greater than or equal to                                                                         |
| ND             | The value of the left expression is true if the value is true, the value of the right expression is calculated as true |
| Other business | The value of the first left-expression is false if false, the value of the right expression is false                   |
| LIKE           | Determines whether the left expression matches the right expression mode                                               |

### **`BETWEEN AND` expression**

#### Syntax

```sql
expr BEETWEEN expr and expr
```

#### Example

```sql
SELECT DISTINCT PRESSURE FROM FROM AIR WHERE PRESSURE BETWEEN 50 and 60;
```

```
+---+
| pressure |
+------+
| 52 |
| 54 |
| 57 |
| 50 |
| 6 |
| 51 |
| 56
| 58 |
| 59 |
| 53 |
| 55 |
+---+
```

Note that：`BETWEEN x AND y` lists the numbers between x and y, including x and y

### **IN\` expression**

IN Operator determines if there is a value equal to the expression in the list.

#### Example

```sql
SELECT position, temperature, vision FROM air WHERE temperature IN (68, 69);
```

```
+-------------+-------------+------------+
| station     | temperature | visibility |
+-------------+-------------+------------+
| XiaoMaiDao  | 69          | 56         |
| LianYunGang | 69          | 78         |
+-------------+-------------+------------+
```

**Note**：

The IN list is only constant temporarily.

### **`CASE WHEN` expression**

Use the `CASE WHEN` expression when the expression requires different values according to different circumstances.

#### Syntax

```sql
CASE
    ( WHEN expression THEN result1 [, ...])
    ELSE result
END;
```

#### Example

```sql
SELECT DISTINCT 
    CASE WHEN PRESSURE >= 60 THEN 50 
         ELSE PRESSURE 
    END PRESSURE 
FROM AIR;
```

```
+----------+
| pressure |
+----------+
| 52       |
| 54       |
| 57       |
| 50       |
| 51       |
| 56       |
| 58       |
| 59       |
| 53       |
| 55       |
+----------+
```

### **Operator Priority**

If a complex expression has multiple operators, the operator priority will determine the operation sequence. The order of implementation may have a clear impact on the value of results.

The priority level of the operator is shown in the table below. The higher level operator is valued before the lower level operator. In the table below, 1 represents the highest level and 8 the lowest level.

| Level | Operator                                                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | \*(multiply), /(division), % (mode)                                                           |
| 2     | +(positive), -(negative), +(plus), +(string), -(subtry) |
| 3     | =,\&gt=,<=,<\&gt,!=,\&gt,<(comparative operator)                                                                                    |
| 4     | NOT                                                                                                                                                    |
| 5     | ND                                                                                                                                                     |
| 6     | BETWEEN, IN, LIKE, OR                                                                                                                                  |

### **SHOW**

#### Syntax

```sql
SHOW {DATABASES | TABLES | QUERIES}
```

Show all databases, or show all tables, or SQL in progress.

#### Example

```sql
SHOW DATABASES;
```

```
+------+
| database_name |
+--+
| public |
+-----+ +
```

```sql
SHOW TABLES;
```

```
+---+
| table_name |
+---------
| air |
| sea |
| wind |
+---+ +
```

```sql
SHOW QUERIES;
```

```
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
| query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
| 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
```

Detailed information on SHOW QUERIES statements is available at [System Table QUERIES](#show-queries).

#### SHOW SERIES

Returns the series of the specified table

#### Syntax

```sql
SHOW SERIES [ON database_name] FROM table_name [WHERE expr] [order_by_clause] [limit_clause] 
```

#### Example

```sql
SHOW SERIES FROM air WHERE station = 'XiaoMaiDao' ORDER BY key LIMIT 1;
```

```
+-------- +
| key |
+--------------------
| air,station=XiaoMaiDao |
+--+ + +
```

**Note**

The expression column in the WEHER sentence can only be either a tag column or a time column. The expression of ORDER BY sentence can only be a key

#### SHOW TAG VALUES

#### Syntax

```sql
SHOW TAG VALUES [ON database_name] FROM table_name WITH KEY [<operator> "<tag_key>| [[NOT] IN ("<tag_key1>", . )]] [WHERE expr] [order_by_clause] [limit_clause];
```

operator includes `=`, `!=`.

#### Example

```sql
SHOW TAG VALUES FROM air WITH KEY = "station" WHERE station = 'XiaoMaiDao' ORDER BY key, value LIMIT 1;
```

```
+---------+------------+
| key     | value      |
+---------+------------+
| station | XiaoMaiDao |
+---------+------------+
```

```sql
SHOW TAG VALUES FROM FROM air WITH KEY NOT IN ("station1");
```

```
+---------+-------------+
| key     | value       |
+---------+-------------+
| station | XiaoMaiDao  |
| station | LianYunGang |
+---------+-------------+
```

### **EXPLAIN**

#### Syntax

```sql
EXPLIN [ ANALYZE ] [ VERBOSE ] <statement>;
```

**Description**

The `EXPLAIN` statement is only used to show the query implementation plan without executing the query.

`EXPLIN ANALYZE` executes the query and shows the query implementation plan.

`EXPLIN ANALYZE VERBOSE` executes queries and shows a more detailed implementation plan, including the number of lines readed.

#### Example

```sql
EXPLIN SELECT station, temperature, vision FROM air;
```

```
+---------------+-----------------------------------------------------------------------------------------------------------------------------+
| plan_type     | plan                                                                                                                        |
+---------------+-----------------------------------------------------------------------------------------------------------------------------+
| logical_plan  | Projection: #air.station, #air.temperature, #air.visibility                                                                 |
|               |   TableScan: air projection=[station, visibility, temperature]                                                              |
| physical_plan | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility]                       |
|               |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature] |
|               |                                                                                                                             |
+---------------+-----------------------------------------------------------------------------------------------------------------------------+
```

```sql
EXPLIN ANALYZE SELECT station, temperature, vision FROM air;
```

```
+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| plan_type         | plan                                                                                                                                                                                                                                                                                                                                    |
+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Plan with Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=20.375µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                   |
|                   |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=15.929624ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_series_scan=1.698791ms, elapsed_point_to_record_batch=4.572954ms, elapsed_field_scan=5.119076ms] |
|                   |                                                                                                                                                                                                                                                                                                                                         |
+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

```sql
EXPLIN ANALYZE SELECT station, temperature, vision FROM air;
```

```
+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| plan_type         | plan                                                                                                                                                                                                                                                                                                                                    |
+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Plan with Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=20.375µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                   |
|                   |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=15.929624ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_series_scan=1.698791ms, elapsed_point_to_record_batch=4.572954ms, elapsed_field_scan=5.119076ms] |
|                   |                                                                                                                                                                                                                                                                                                                                         |
+-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

```sql
EXPLAIN ANALYZE VERBOSE SELECT position, temperature, visibility FROM air;
```

```
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| plan_type              | plan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Plan with Metrics      | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=26.75µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                                                                                                                                                                                                                                                    |
|                        |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=13.225875ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_point_to_record_batch=3.918163ms, elapsed_field_scan=3.992161ms, elapsed_series_scan=1.657416ms]                                                                                                                                                                                                                                 |
|                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Plan with Full Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[start_timestamp{partition=0}=2022-10-25 03:00:14.865034 UTC, end_timestamp{partition=0}=2022-10-25 03:00:14.879596 UTC, elapsed_compute{partition=0}=26.75µs, spill_count{partition=0}=0, spilled_bytes{partition=0}=0, mem_used{partition=0}=0, output_rows{partition=0}=13]                                                                                                                                                                           |
|                        |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[start_timestamp{partition=0}=2022-10-25 03:00:14.864225 UTC, end_timestamp{partition=0}=2022-10-25 03:00:14.879596 UTC, elapsed_compute{partition=0}=13.225875ms, spill_count{partition=0}=0, spilled_bytes{partition=0}=0, mem_used{partition=0}=0, output_rows{partition=0}=13, elapsed_point_to_record_batch{partition=0}=3.918163ms, elapsed_field_scan{partition=0}=3.992161ms, elapsed_series_scan{partition=0}=1.657416ms] |
|                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Output Rows            | 13                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Duration               | 13.307708ms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
+------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

### **DESCRIBE**

#### Syntax

```sql
DESCREIBE {DATABASE db_name | TABLE tb_name};
```

Describe the parameters of the database, describing the pattern of the table.

#### Example

```sql
DESCREIBE TABLE air;
```

```
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| station     | STRING                | TAG         | DEFAULT           |
| pressure    | DOUBLE                | FIELD       | DEFAULT           |
| temperature | DOUBLE                | FIELD       | DEFAULT           |
| visibility  | DOUBLE                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

```sql
DESCRIBE DATABASE public;
```

```
+-----+-------+----------------+---------+-----------+
| ttl | shard | vnode_duration | replica | precision |
+-----+-------+----------------+---------+-----------+
| INF | 1     | 365 Days       | 1       | NS        |
+-----+-------+----------------+---------+-----------+
```

[//]: # "## **EXISTS**"

[//]: # "EXISTS conditions test if a row exists in a subquery and return true when a subquery returns at least one line.If NOT is specified, this condition returns true if the subquery returns any line."

[//]: # "示例："

[//]: # "``sql"

[//]: # "SELECT id FROM date"

[//]: # "WHERE EXISTS (SECLECT 1 FROM shop"

[//]: # "WHERE date.id = shop.id)"

[//]: # "ORDER BY id;"

[//]: # "```"

[//]: # "# **DCL (none)**"

[//]: # "``sql"

[//]: # "DESCRIBE table_name"

[//]: # "```"

[//]: # "TODO SHOW"

[//]: # "# **SHOW**"

[//]: # "## **SHOW VARIABLE**"

[//]: # "``sql"

[//]: # "-- only support shows tables"

[//]: # "-- SHOW TABLES is not supported unless information_schema is enabled"

[//]: # "SHOW TABLES"

[//]: # "```"

[//]: # "## **SHOW COLUMNS**"

[//]: #

[//]: # "``sql"

[//]: # "-- SHOW COLUMNS with WHERE or LIKE is not supported"

[//]: # "-- SHOW COLUMNS is not supported unless information_schema is enabled"

[//]: # "- treat both FULL and EXTENDED as the same"

[//]: # "SHOW [ EXTENDED ] [ FULL ]"

[//]: # "{ COLUMNS | FIELDS }"

[//]: # "{ FROM | IN }"

[//]: # "table_name"

[//]: # "```"

[//]: # "## **SHOW CREATE TABLE**"

[//]: # "``sql"

[//]: # "SHOW CREATE TABLE table_name"

[//]: # "```"

### **Join subsents**

CnosDB supports `INNER JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, `FULL OUTER JOIN`.

`CROSS JOIN` is not supported yet.

### INNER JOIN

The keyword `JOIN` or `INNER JOIN` defines a connection that displays only the matching lines in the two tables.

#### Example

```sql
SELECT * FROM air INNER JOIN Sea ON air.temperature = sea.temperature;
```

```
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
| time                | station    | visibility | temperature | pressure | time                | station     | temperature |
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
| 2022-01-28 13:27:00 | XiaoMaiDao | 67         | 62          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |
| 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
```

### LEFT JOIN

Defines a left connection using the keyword `LEFT JOIN` or `LEFT OVERJOIN`.This connection includes all lines in the left table, and if the right table does not match the line, the value of the connection is empty on the right side.

#### Example

```sql
SELECT * FROM air LEFT JOIN Sea ON air.temperature = sea.temperature;
```

```
+---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+
| time                | station     | visibility | temperature | pressure | time                | station     | temperature |
+---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+
| 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |
| 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |                     |             |             |
| 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |                     |             |             |
| 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |                     |             |             |
| 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |                     |             |             |
| 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |                     |             |             |
| 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |                     |             |             |
| 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |                     |             |             |
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |                     |             |             |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |                     |             |             |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |                     |             |             |
+---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+
```

### HIGHT JOIN

Defines a right connection using the keyword `RIGHT JOIN` or `RigHT OUTER JOIN`.The connection includes all lines in the right table, and if the left table does not match the line, the link is empty on the left side.

#### Example

```sql
SELECT * FROM air HIGHT JOIN Sea ON air.temperature = sea.temperature;
```

```
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
| time                | station    | visibility | temperature | pressure | time                | station     | temperature |
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
| 2022-01-28 13:27:00 | XiaoMaiDao | 67         | 62          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |
|                     |            |            |             |          | 2022-01-28 13:21:00 | LianYunGang | 63          |
|                     |            |            |             |          | 2022-01-28 13:24:00 | LianYunGang | 77          |
|                     |            |            |             |          | 2022-01-28 13:27:00 | LianYunGang | 54          |
|                     |            |            |             |          | 2022-01-28 13:30:00 | LianYunGang | 55          |
|                     |            |            |             |          | 2022-01-28 13:33:00 | LianYunGang | 64          |
|                     |            |            |             |          | 2022-01-28 13:36:00 | LianYunGang | 56          |
|                     |            |            |             |          | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |
|                     |            |            |             |          | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |
|                     |            |            |             |          | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |
| 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |
|                     |            |            |             |          | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |
| 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
```

### FULL JOIN

The keyword `FULL JOIN` or `FULL OUTER JOIN` defines a full connection that is actually a combination of LEFT OUTER JOIN and RIGHT OUTER JOIN.
It will display all lines that connect to the left and right and will create empty values where no match exists on either side of the connection.

#### Example

```sql
SELECT * FROM air FULL JOIN Sea ON air.temperature = sea.temperature;
```

```
+---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+
| time                | station     | visibility | temperature | pressure | time                | station     | temperature |
+---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+
| 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |
|                     |             |            |             |          | 2022-01-28 13:21:00 | LianYunGang | 63          |
|                     |             |            |             |          | 2022-01-28 13:24:00 | LianYunGang | 77          |
|                     |             |            |             |          | 2022-01-28 13:27:00 | LianYunGang | 54          |
|                     |             |            |             |          | 2022-01-28 13:30:00 | LianYunGang | 55          |
|                     |             |            |             |          | 2022-01-28 13:33:00 | LianYunGang | 64          |
|                     |             |            |             |          | 2022-01-28 13:36:00 | LianYunGang | 56          |
|                     |             |            |             |          | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |
|                     |             |            |             |          | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |
|                     |             |            |             |          | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |
|                     |             |            |             |          | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |
| 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |
| 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |                     |             |             |
| 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |                     |             |             |
| 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |                     |             |             |
| 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |                     |             |             |
| 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |                     |             |             |
| 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |                     |             |             |
| 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |                     |             |             |
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |                     |             |             |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |                     |             |             |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |                     |             |             |
+---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+
```

[//]: # "### CROSS JOIN"

[//]: #

[//]: # "Cross-connecting produces a cartex that matches each row on the left with each row connected to the right."

[//]: #

[//]: # "``sql"

[//]: # "SELECT * FROM air CROSS JOIN sea;"

[//]: # "```"

[//]: # "    +---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+"

[//]: # "    | time | station | visibility | temperature | pressure | time | station | temperature |"

[//]: # "    +---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:21:00 | XiaoMaiDao | 56 | 77 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:24:00 | XiaoMaiDao | 50 | 78 | 66 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:27:00 | XiaoMaiDao | 67 | 62 | 59 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:30:00 | XiaoMaiDao | 65 | 79 | 77 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:33:00 | XiaoMaiDao | 53 | 53 | 68 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:36:00 | XiaoMaiDao | 74 | 72 | 68 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 71 | 80 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 71 | 80 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 71 | 80 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:39:00 | XiaoMaiDao | 71 | 81 | 80 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:21:00 | LianYunGang | 78 | 69 | 71 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:24:00 | LianYunGang | 79 | 80 | 51 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59| 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59| 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59| 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 59| 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:27:00 | LianYunGang | 59 | 59 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:30:00 | LianYunGang | 67 | 70 | 72 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:33:00 | LianYunGang | 80 | 70 | 68 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:18:00 | LianYunGang | 62 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:21:00 | LianYunGang | 63 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:24:00 | LianYunGang | 77 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:27:00 | LianYunGang | 54 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:30:00 | LianYunGang | 55 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:33:00 | LianYunGang | 64 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:36:00 | LianYunGang | 56 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:21:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:24:00 | XiaoMaiDao | 64 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:27:00 | XiaoMaiDao | 51 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59| 70 | 2022-01-28 13:30:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:33:00 | XiaoMaiDao | 78 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59 | 70 | 54 | 2022-01-28 13:36:00 | XiaoMaiDao | 57 |"

[//]: # "    | 2022-01-28 13:36:00 | LianYunGang | 59| 70 | 2022-01-28 13:39:00 | XiaoMaiDao | 79 |"

[//]: # "    +---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+"

### **GROUP BY sentence**

GROUP BY sentence must be after WHERE subsentence (if any), before ORDER BY sentence (if any).

#### Example

```sql
SELECT, AVG(temperature) 
FROM air 
GROUP BY station;
```

```
+---+-------------------- ----- ----- -- -- -- -- -- -- -- +
| AVG(air.temperature) |
+---+
| XiaoMaiDao | 69.1428571428285714714 |
| LianYunGang | 72.1666666667 |
+---+ + + +
```

### **HAVING sub sents**

#### Syntax

```sql
group_by_clause 
[ HAVING condition ];
```

In the SELECT query, HAVING subsentence must be close to GROUP BY sentence and appear before ORDER BY sentence (if any).

**HAVING differs from WHERE**

HAVING after GROUP BY sentence allows you to specify filters to control which groups of query results can appear in final results.

WHERE imposes conditions on the selected column before the GROUP BY sentence and HAVING sentence on the group generated by the GROUP BY sentence.

#### Example

```sql
SELECT position, AVG(temperature) AS avg_t 
FROM air 
GROUP BY station 
HAVING avg_t > 70;
```

```
+-------------------------------- +
| station | avg_t |
+--------------+
| LianYunGang | 72.16666666666666666666667 |
+-------+ + +
```

### **Complex group operations**

CnosDB provides complex group operations such as `ROLLUP`, `CUBE`, which allows you to search results in different ways.

[//]: # "### **GROUPING SETS**"

[//]: # "GROUPING SETS is a group or group of columns that can be grouped together."

[//]: # "You can simply use GROUPING SETS, instead of writing multiple queries and combining results with UNION"

[//]: # "GROUPING SETS in CnosDB can be considered an extension of GROUP BY sentences. It allows you to define multiple groups in the same query."

[//]: # "Let's see the example below of how it equates to GROUP BY with multiple UNION ALL sentences."

[//]: # "``sql"

[//]: # "SELECT * FROM shipping;"

[//]: # "-- origin_state | origin_zip | destination_state | destination_zip | package_weight"

[//]: # "-- --------------+------------+-------------------+-----------------+----------------"

[//]: # "-- California | 94131 | New Jersey | 8648 | 13"

[//]: # "-- California | 94131 | New Jersey | 8540 | 42"

[//]: # "-- New Jersey | 7081 | Connecticut | 6708 | 225"

[//]: # "-- California | 90210 | Connecticut | 6927 | 1337"

[//]: # "-- California | 94131 | Colorado | 80302 | 5"

[//]: # "-- New York | 10002 | New Jersey | 8540 | 3"

[//]: # "-- (6 rows)"

[//]: # "```"

[//]: # "The following query demonstrates GROUPING SETS:"

[//]: # "``sql"

[//]: # "SELECT origin_state, origin_zip, destination_state, sum (package_weight)"

[//]: # "FROM shipping"

[//]: # "GROUP BY GROUPING SETS ( (origin_state),"

[//]: # "(origin_state, origin_zip),"

[//]: # "(destination_state);"

[//]: # "-- origin_state | origin_zip | destination_state | _col0"

[//]: # "--  --------------+------------+-------------------+-------"

[//]: # "- New Jersey | NULL | NULL | 225"

[//]: # "- California | NULL | NULL | 1397"

[//]: # "--- New York | NULL | NULL | 3"

[//]: # "- California | 90210 | NULL | 1337"

[//]: # "- California | 94131 | NULL | 60"

[//]: # "-- New Jersey | 7081 | NULL | 225"

[//]: # "-- New York | 10002 | NULL | 3"

[//]: # "--- NULL | NULL | Colorado | 5"

[//]: # "--- NULL | NULL | New Jersey | 58"

[//]: # "--- NULL | NULL | Connecticut | 1562"

[//]: # "-- (10 rows)"

[//]: # "```"

[//]: # "The above query is equal to the"

[//]: # "``sql"

[//]: # "SELECT origin_state, NULL, NULL, sum (package_weight)"

[//]: # "FROM shipping GROUP BY origin_state"

[//]: # "UNION ALL"

[//]: # "SELECT origin_state, origin_zip, NULL, sum (package_weight)"

[//]: # "FROM shipping GROUP BY origin_state, origin_zip"

[//]: # "UNION ALL"

[//]: # "SELECT NULL, NULL, destination_state, sum (package_weight)"

[//]: # "FROM shipping GROUP BY destination_state;"

[//]: # "```"

### **ROLLUP**

[//]: # "Similar to GROUPING SETS ,"

You can generate multiple clusters using ROLLUP options in a single query.

ROLLUP assumes a hierarchy between input columns.

If your group by child is：

#### Syntax

```sql
SELECT ...
FROM ...
GROUP BY ROLLUP (column_1,column_2);
```

It is equivalent to the following statement：

#### Syntax

```sql
SELECT ...
FROM ...


UNION ALL

SELECT ...
FROM FROM ...
GROUP BY
column_1

UNION ALL

SELECT ...
FROM ...
GROUP BY
column_1, column2;
```

[//]: # "GROUP BY GROUPING SETS("

[//]: # "    (column_1, column_2),"

[//]: # "    (column_1),"

[//]: # "    ()"

[//]: # ")"

ROLLUP generates all meaningful clusters in this hierarchy. Each value of column_1 will generate a miniature line;

Therefore, we often use ROLLUP in our reports to generate subtotals and totals. The sequence in ROLLUP is important.

#### Example

```sql
SELECT, visibility, avg(temperature) 
FROM air 
GROUP BY ROLLUP (station, visibility);
```

```
+-------------+------------+----------------------+
| station     | visibility | AVG(air.temperature) |
+-------------+------------+----------------------+
|             |            | 70.53846153846153    |
| XiaoMaiDao  |            | 69.14285714285714    |
| LianYunGang |            | 72.16666666666667    |
| XiaoMaiDao  | 56         | 69                   |
| XiaoMaiDao  | 50         | 78                   |
| XiaoMaiDao  | 67         | 62                   |
| XiaoMaiDao  | 65         | 79                   |
| XiaoMaiDao  | 53         | 53                   |
| XiaoMaiDao  | 74         | 72                   |
| XiaoMaiDao  | 71         | 71                   |
| LianYunGang | 78         | 69                   |
| LianYunGang | 79         | 80                   |
| LianYunGang | 59         | 72                   |
| LianYunGang | 67         | 70                   |
| LianYunGang | 80         | 70                   |
+-------------+------------+----------------------+
```

### **CUBE**

Like ROLLUP, CUBE is an extension of GROUP BY sentences. It allows you to generate subtotals for all groups specified in GROUP BY sentences.

[//]: # "CUBE is like a combination of GROUPING SETS and ROLLUP."

CUBE creates clusters for each possible combination of the specified expression set.The group will start with (A, B, C)

The tables were then followed by (A, B), (A, C), (A), (B), (B), (C), (C), and finally group by group.

```sql
SELECT ... 
FROM ...
GROUP BY CUBE (column1, column2);
```

Equivalent to：

```sql
SELECT ...
FROM ...
GROUP BY column1

UNION ALL

SELECT.
FROM ...
GROUP BY column2

UNION ALL

SELECT.
FROM ...
GROUP BY column1, column2

UNION ALL

SELECT ...
FROM ...
;
```

#### Example

```sql
SELECT, visibility, avg(temperature) 
FROM air 
GROUP BY CUBE (station, visibility);
```

```
+-------------+------------+----------------------+
| station     | visibility | AVG(air.temperature) |
+-------------+------------+----------------------+
| XiaoMaiDao  | 56         | 69                   |
| XiaoMaiDao  | 50         | 78                   |
| XiaoMaiDao  | 67         | 62                   |
| XiaoMaiDao  | 65         | 79                   |
| XiaoMaiDao  | 53         | 53                   |
| XiaoMaiDao  | 74         | 72                   |
| XiaoMaiDao  | 71         | 71                   |
| LianYunGang | 78         | 69                   |
| LianYunGang | 79         | 80                   |
| LianYunGang | 59         | 72                   |
| LianYunGang | 67         | 70                   |
| LianYunGang | 80         | 70                   |
|             | 56         | 69                   |
|             | 50         | 78                   |
|             | 67         | 66                   |
|             | 65         | 79                   |
|             | 53         | 53                   |
|             | 74         | 72                   |
|             | 71         | 71                   |
|             | 78         | 69                   |
|             | 79         | 80                   |
|             | 59         | 72                   |
|             | 80         | 70                   |
| XiaoMaiDao  |            | 69.14285714285714    |
| LianYunGang |            | 72.16666666666667    |
|             |            | 70.53846153846153    |
+-------------+------------+----------------------+
```

[//]: # "### **GROUPING**"

[//]: # "    GROUPING(column_expression)"

[//]: # "**Description**：GROUPING's function can only be used for expressions with GROUP BY sentences"

[//]: # "When `GROUP BY` is specified, GROUPING can only be used in SELECT lists, HAVING and ORDER BY sentences."

[//]: # "**Parameters**： can only be an expression in GROUP BY sentence"

[//]: # "``sql"

[//]: # "SELECT origin_state,"

[//]: # "origin_zip,"

[//]: # "destination_state,"

[//]: # "sum(package_weight),"

[//]: # "grouping(origin_state, origin_zip, destination_state)"

[//]: # "FROM shipping"

[//]: # "GROUP BY GROUPING SETS ("

[//]: # "    (origin_state),"

[//]: # "    (origin_state, origin_zip),"

[//]: # "    (destination_state)"

[//]: # ");"

[//]: # "-- origin_state | origin_zip | destination_state | _col3 | _col4"

[//]: # "-- --------------+------------+-------------------+-------+-------"

[//]: # "--- California | NULL | NULL | 1397 | 3"

[//]: # "-- New Jersey | NULL | NULL | 225 | 3"

[//]: # "-- New York | NULL | NULL | 3 | 3 | 3"

[//]: # "-- California | 94131 | NULL | 60 | 1"

[//]: # "-- New Jersey | 7081 | NULL | 225 | 1"

[//]: # "-- California | 90210 | NULL | 1337 | 1"

[//]: # "-- New York | 10002 | NULL | 3 | 1"

[//]: # "--- NULL | NULL | New Jersey | 58 | 6"

[//]: # "--- NULL | NULL | Connecticut | 1562 | 6"

[//]: # "-- NULL | NULL | Colorado | 5 | 6"

[//]: # "-- (10 rows)"

[//]: # "```"

[//]: # "**NOTE**： GROUPING is used to distinguish between ROLLUP, CUBE or GROUPING SETS returned empty values and standard empty values."

[//]: # "NULL returned as a result of ROLLUP, CUBE or GROUPING SETS operations is a special use of NULL."

[//]: # "This acts as the column holder of the concentration of results, indicating the total number of cases."

## **polymeric functions**

### **Generic polymers**

### COUNT

#### Syntax

```
COUNT(x)
```

**Function**：returns the number of lines retrieved in the selected element.

Include DISTINCTs keywords and count results after going to reset them.

> COUNT(\*) and COUNT (bilateral value) are equal, and sql will be rewritten to COUNT(time) if the sql projection contains only `*/lateral value`.

> COUNT(tag) equal to COUNT (DISTINCT tag).

> COUNT(field) returns the number of non-NULL values.

**Parameter Type**：any

**Return Type**：BIGINT

#### Example

```sql
SELECT COUNT(*) FROM air;
```

```
+-----+
| COUNT (UInt8(1)) |
+---+
| 13 |
+---------+ +
```

```sql
SELECT COUNT(temperature) FROM air;
```

```
+------------------------+
| COUNT(air.temperature) |
+------------------------+
| 13                     |
+------------------------+
```

```sql
SELECT COUNT (DISTINCT temperature) FROM air;
```

```
+-------- +
| COUNT (DISTINCT air.temperature) |
+---, -+
| 10 |
+------------- + A+ + + +
```

***

### SUM

#### Syntax

```
SUM(NUERICS)
```

**Function**：returns the sum of the values calculated from the selected element.

**Parameter type**：Value type.

**Return Type**：is the same as the parameter type.

#### Example

```sql
SELECT SUM(temperature) FROM air;
```

```
+------- +
| SUM(air.temperature)|
+---------+
| 917 |
+______
```

***

### MIN

#### Syntax

```
MIN(SSTRING | NUMERICS | TIMESTAMP)
```

**Function**：returns the minimum of the selected element.

**Parameter Type**：Value Type or STRING, or TIMESTAMP.

**Return Type**：is the same as the parameter type.

#### Example

```sql
 SELECT MIN(time), MIN(station), MIN(temperature) FROM air;
```

```
+---+
| MIN(Air.time) | MIN(Air.time) | MIN(Air.station) | MIN(Air.temperature) | MIN(Air.temperature) | MIN(air.temperature) |
+------------++-+
| 2022-01-28T13:21:00 | LianYunGang | 53
+------------+++ + + +
```

***

### MAX

#### Syntax

```
MAX (STRINGS | NUMERICS | TIMESTAMP)
```

**Function**：returns the maximum value of the selected element.

**Parameter Type**：Value Type or STRING, or TIMESTAMP.

**Return Type**：is the same as the parameter type.

#### Example

```sql
SELECT MAX(time), MAX(station), MAX(temperature) FROM air;
```

```
+---------------------+------------------+----------------------+
| MAX(air.time)       | MAX(air.station) | MAX(air.temperature) |
+---------------------+------------------+----------------------+
| 2022-01-28T13:39:00 | XiaoMaiDao       | 80                   |
+---------------------+------------------+----------------------+
```

***

### AVG

#### Syntax

```
AVG (NUMERICS)
```

**Function**：returns the average of the selected element.

**Parameter type**：Value type.

**Return Type**：Value Type.

#### Example

```sql
SELECT AVG(temperature) FROM air;
```

```
+----- +
| AVG(air.temperature)|
+-----------+
| 70.53846153846153 |
+----------+ +
```

***

### ARRAY_AGG

#### Syntax

```
ARRAY_AGG(expr)
```

**Function**：returns an array consisting of all values of the selected element. The element type must be the same.

**Parameter Type**：is arbitrary.

**Return Type** of：parameter type.

#### Example

```sql
SELECT ARRAY_AGG (temperature) from air;
```

```
+------------------------------------------------------+
| ARRAYAGG(air.temperature)                            |
+------------------------------------------------------+
| [69, 78, 62, 79, 53, 72, 71, 69, 80, 74, 70, 70, 70] |
+------------------------------------------------------+
```

**NOTE**：this polygon function result cannot be returned in CSV format.

### FIRST

```
first (time, value)
```

Gets the first value in one column in another column.

**Parameters**:

- time: Timestamp

- value: any

**Returns value**: Same as value type

#### Example

```sql
Select first (time, pressure) from air;
```

```
+------------------------------+
| first(air.time,air.pressure) |
+------------------------------+
| 63.0                         |
+------------------------------+
```

### LAST

```
last(time, value)
```

Gets the last value in one column in another column.

**Parameters**:

- time: Timestamp

- value: any

**Returns value**: Same as value type

#### Example

```sql
Select last(time, pressure) from air;
```

```
+-----------------------------+
| last(air.time,air.pressure) |
+-----------------------------+
| 55.0                        |
+-----------------------------+
```

### MODE

```
Mode(value)
```

Calculate the number of numbers in one column.

**Parameters**: value: any

**Returns value**: Same as value type

#### Example

```sql
Select mode (pressure) from air;
```

```
+----- +
| mode(air.pressure) |
+---------------
| 69.0 |
+-------+ + +
```

### INCREASE

```
increase (time, value order by time)
```

Calculate the increment in the time series

**Parameters**: value number type

**Returns value**: Same as value type

**Example**：

```sql
CREATE DATABASE IF NOT EXISTS TEST_INCREASE;
ALTER DATABASE TEST_INCREASE SET TTL '100000D';
CREATE TABLE IF NOT EXISTS test_increase.test_increase(f0 BIGINT, TAGS(t0));
INSERT INTO test_increase.test_increase(time, t0, f0)
VALUES
    ('1999-12-31 00:00:00.000', 'a', 1),
    ('1999-12-31 00:00:00.005', 'a', 2),
    ('1999-12-31 00:00:00.010', 'a', 3),
    ('1999-12-31 00:00:00.015', 'a', 4),
    ('1999-12-31 00:00:00.020', 'a', 5),
    ('1999-12-31 00:00:00.025', 'a', 6),
    ('1999-12-31 00:00:00.030', 'a', 7),
    ('1999-12-31 00:00:00.035', 'a', 8),
    ('1999-12-31 00:00:00.000', 'b', 1),
    ('1999-12-31 00:00:00.005', 'b', 2),
    ('1999-12-31 00:00:00.010', 'b', 3),
    ('1999-12-31 00:00:00.015', 'b', 4),
    ('1999-12-31 00:00:00.020', 'b', 1),
    ('1999-12-31 00:00:00.025', 'b', 2),
    ('1999-12-31 00:00:00.030', 'b', 3),
    ('1999-12-31 00:00:00.035', 'b', 4);
SELECT t0, INCREASE(time, f0 ORDER BY time) AS increase
FROM test_increase.test_increase GROUP BY t0 ORDER BY t0;
```

```
+----+----------+
| t0 | increase |
+----+----------+
| a  | 7        |
| b  | 7        |
+----+----------+
```

### Statistics aggregator

### VAR | VAR_SAMP

#### Syntax

```
VAR (NUMERICS)
```

**Function**：calculates the difference between the given sample

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT VAR(temperature) FROM air;
```

```
+---------------------------+
| VARIANCE(air.temperature) |
+---------------------------+
| 51.43589743589741         |
+---------------------------+
```

***

### VAR_POP

#### Syntax

```
VAR_POPUP(NUMERICS)
```

**Function**：calculates the overall variance

**Parameter type**：Value type.

**Return Type**：DOUBLE

#### Example

```
SELECT VAR_POP(temperature) FROM air;
```

```
+------------------------------+
| VARIANCEPOP(air.temperature) |
+------------------------------+
| 47.47928994082838            |
+------------------------------+
```

***

### STDDEV | STDDEV_SAMP

```
STDDEV (NUMERICS)
```

**Function**：calculates the standard deviation of the sample.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT STDDEV(temperature) FROM air;
```

```
+-------------------------+
| STDDEV(air.temperature) |
+-------------------------+
| 7.1718824192744135      |
+-------------------------+
```

***

### PARTY_NOTIFICATION_TITLE

#### Syntax

```
STDEN_POPUP_POPUP_TITLE
```

**Function**：calculates the overall standard difference.

**Parameter type**：Value type.

**Return Type**：DOUBLE

#### Example

```sql
SELECT STDDEV_POP(temperature) FROM air;
```

```
+----------------------------+
| STDDEVPOP(air.temperature) |
+----------------------------+
| 6.890521746633442          |
+----------------------------+
```

***

### COVAR | COVAR_SAMP

#### Syntax

```
COVAR (NUMERICS, NUMERICS)
```

**Feature**：returns the sample's composition.

**Parameter type**：Value type.

**Return Type**：DOUBLE

#### Example

```sql
SELECT COVAR(temperature, pressure) FROM air;
```

```
+----- +
| COVARIANCE (air.temperature,air.pressure) |
+----------+
| 5.121794871794841 |
+---------+ + + +
```

***

### COVAR_POP

#### Syntax

```
COVAR_POPUP_(NUMERICS, NUMERICS)
```

**Feature**：returns the overall difference in the number pair in the group.

**Parameter type**：Value type.

**Return Type**：DOUBLE

#### Example

```sql
SELECT COVAR_POP(temperature, pressure) FROM air;
```

```
+---------------------------------------------+
| COVARIANCEPOP(air.temperature,air.pressure) |
+---------------------------------------------+
| -4.727810650887546                          |
+---------------------------------------------+
```

***

### CORR

#### Syntax

```
COR** (NUMERICS, NUMERICS)
```

**Feature**：returns a Pearson coefficient representing a set of numbers to link between them.

**Parameter type**：Value type.

**Return Type**：DOUBLE

#### Example

```sql
SELECT CORR (temperature, pressure) FROM air;
```

```
+----- +
| CORRELATION(air.temperature,air.pressure) |
+------------+
| 0.075576766017 |
+---+ + +
```

### **Close aggregation functions**

### PLAYLIST_NOTIFICATION_TITLE

#### Syntax

```
APPROX_DISTINCT(x)
```

**Function**：returns the approximation of different input values (HyperLogLogLogLog).

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT APPROX_DISTINCT(station) FROM air;
```

```
+---------- +
| APPROXDISTINCT(air.station) |
+------------
| 2 |
+-------------
```

***

### APPROX_PERCENTILE_CONT

#### Syntax

```
APPROX_PERCENTILE_CONT(x, p.  
```

**Function**：returns the approximate percentage of input value x (TDigest), p. percent, the 64-bit floating point between 0 and 1 (including 1).

**Parameter type**：x numeric type, p DOUBLE type.

**Return Type**：DOUBLE

#### Example

```sql
SELECT APPROX_PERCENTILE_CONT(temperature, 0.1) FROM ;
```

```
+---------------------------+
| APPROXPERCENTILECONTILET(air.temperature, Float64(0.1)) |
+----------+
| 60.4 |
+-------------
```

***

### APPROX_PERCENTILE_CONT_WITH_PLAYLIST

#### Syntax

```
APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, w, p)  
```

**Feature**：x returns the approximate percentage of input value with weight (TDigest), where w is a recount expression, p. 64 floats between 0 and 1 (inclusive).

APPROX_PERCENTILE_CONT(x, p) equivalent to APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, 1, p).

**Parameter Type**：x,w Number Type, p DOUBLE.

**Return Type**：DOUBLE

#### Example

```sql
SELECT APPROX_PERCENTILE_CONT_WITH_WEIGHT (temperature,2, 0.1) FROM air;
```

```
+-----------------------------------------------------------------------+
| APPROXPERCENTILECONTWITHWEIGHT(air.temperature,Int64(2),Float64(0.1)) |
+-----------------------------------------------------------------------+
| 54.35                                                                 |
+-----------------------------------------------------------------------+
```

***

### APPROX_MEDIAN (NUMERICS)

#### Syntax

```
APPROX_MEDIAN (NUMERICS)
```

**Function**：returns the approximate median value of the input value.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT APPROX_MEDIAN(temperature) FROM air;
```

```
+-------- +
| APPROXMEDIAN(air.temperature) |
+------------
| 70 |
+---------------------------------------------
```

[//]: # "----------------"

[//]: # "### **GROUPING**(x)"

[//]: # "    GROUPING(x)"

[//]: # "**Function** The：function uses a single parameter that must be an expression of the dimension column specified in GROUP BY sentence ROLLUP, CUBE, or GROUPING SETS extension."

[//]: # "**Parameter Type**：Value Type"

[//]: # "**Return Type**"

### SAMPLE

#### Syntax

```
SAMPLE(<column_key>, <N>
```

**feature**：randomly select N from the given column column_key.

**Parameter Type**：

- column_key：any type

- N：integer type

**Return Type**：array

#### Example

```sql
Select sample(visibility, 5) from air;
```

```
+--------------------------------------+
| sample(air.visibility,Int64(5))      |
+--------------------------------------+
| [65.0, 74.0, 76.0, 77.0, 72.0, 77.0] |
+--------------------------------------+
```

### USA_SMOTH

```
asap_smooth(time, value, resolution order by time)
```

The ASP smoothing algorithm is designed to create human readable graphics and to preserve rough shapes and larger trends of input data, while minimizing localized differences between points.
Use (Timestamp,value) pairs to rate them as target intervals, and return ASAP smoooth values.

**Parameter：**

- time: Timestamp

- value: Double

- resolve: Bigint, approximate number of points to return (Timestap, value) to determine the horizontal resolution of the results map.

**Return value：** TimeVector

```
Struct LO
  time: List[Timestamp], -- milliseconds
  value: List[Double],
  resolve: Int unsigned,
}
```

#### Example

```sql
Select asap_smooth(time, pressure, 10) from air group by date_trunc('month', time);
```

```
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| asap_smooth(air.time,air.pressure,Int64(10))                                                                                                                                                                                                                                                                                                                                                                                                   |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {time: [2023-01-14T16:00:00, 2023-01-16T14:13:00, 2023-01-18T12:26:00, 2023-01-20T10:39:00, 2023-01-22T08:52:00, 2023-01-24T07:05:00, 2023-01-26T05:18:00, 2023-01-28T03:31:00, 2023-01-30T01:44:00, 2023-01-31T23:57:00], value: [64.79507211538461, 65.31009615384616, 65.25841346153847, 64.8485576923077, 65.09495192307692, 65.02524038461539, 64.8389423076923, 65.2421875, 65.02103365384616, 65.1141826923077], resolution: 10}        |
| {time: [2023-02-01T00:00:00, 2023-02-04T02:39:40, 2023-02-07T05:19:20, 2023-02-10T07:59:00, 2023-02-13T10:38:40, 2023-02-16T13:18:20, 2023-02-19T15:58:00, 2023-02-22T18:37:40, 2023-02-25T21:17:20, 2023-02-28T23:57:00], value: [65.20982142857143, 64.90625, 64.94828869047619, 64.97916666666667, 64.88504464285714, 64.8203125, 64.64434523809524, 64.88802083333333, 65.0, 64.76004464285714], resolution: 10}                           |
| {time: [2023-03-01T00:00:00, 2023-03-02T12:26:40, 2023-03-04T00:53:20, 2023-03-05T13:20:00, 2023-03-07T01:46:40, 2023-03-08T14:13:20, 2023-03-10T02:40:00, 2023-03-11T15:06:40, 2023-03-13T03:33:20, 2023-03-14T16:00:00], value: [65.29115853658537, 64.58307926829268, 64.7530487804878, 64.76753048780488, 65.14405487804878, 65.4298780487805, 65.1920731707317, 65.10365853658537, 64.86356707317073, 64.83841463414635], resolution: 10} |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

## **Two-stage polymerization functions**

### stats_agg

Implement linear regression analysis for two-dimensional data, such as calculation of relevant coefficients and composites.
Common statistical data for each dimension can also be calculated separately, such as averages and standard deviations.
stats_agg offers the same functionality as sum, count, corr, covar_pop and more.
applies to a SQL scenario that contains multiple analytic functions.

**Caution**： does not include NULL in both columns.

#### stats_agg

```
stats_agg(y, x)
```

**Function**：for statistical aggregation.

**Parameter Type**：

- y: double type
- x: double type

**Return Type**：Structure Type

```
LO 
  n: bigt, --count 
  sx: double, -- sum(x)- sum(x)
  sx2: double, -sum((x-sx/n)^2) (sum of square)
  sx3: double, -- sum((x-sx/n)^3)
  sx4: double, -- sum((x-sx/n)^4)
  sy: double, -sum(y)
  sy2: double, --sum((y-sy/n)^2) (sum of square)
  sy3: double, --sum((y-sy/n)^3)
  sy4: double, -- sum((y-sy/n)^4)
  sxy: double, -- sum((x-sx/n)*(y-sy/n)) (sum of products) 
}
```

#### Example

```sql
create table if not exist test_stats(x bigt, y bigint);
alter database public set '100000d';
insert into test_stats(time, x, y) values
(1),
(2),
(3, 1, 3),
(4, 1, 1), 4),
(5, 1, 5),
(6, 2, 1),
(7, 2, 2),
(8, 2, 3),
(9, 2, 4),
(10,2, 5);
```

```sql
select stats_agg(y, x) from test_stats;
```

```
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stats_agg(test_stats.y,test_stats.x)                                                                                                                       |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {n: 10, sx: 15.0, sx2: 2.5, sx3: -2.7755575615628914e-16, sx4: 0.6249999999999999, sy: 30.0, sy2: 20.0, sy3: -1.7763568394002505e-15, sy4: 68.0, sxy: 0.0} |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### num_vals

Calculate the number of rows of data after the two-dimensional statistical aggregation.

**Return Type**：BIGINT UNCIGNED

```sql
Select num_vals(stats_agg(y, x)) from test_stats;
```

```
+------------------------------------------------+
| num_vals(stats_agg(test_stats.y,test_stats.x)) |
+------------------------------------------------+
| 10                                             |
+------------------------------------------------+
```

#### average_y, average_x

Calculate the average of the two-dimensional statistical aggregation for the specified dimension.

**Return Type**：DOUBLE

```sql
Select average_x (stats_agg(y, x)) from test_stats;
```

```
+----- -------- +
| average_x (stats_agg(test_stats.y,test_stats.x)) |
+------------- +
| 1.5 |
+-------------
```

#### sum_y, sum_x

Calculate the sum of the two-dimensional statistical aggregation in a way that is population.

**Return Type**：DOUBLE

```sql
select sum_x (stats_agg(y, x)) from test_stats;
```

```
+-------- +
| sum_x (stats_agg(test_stats.y,test_stats.x)) |
+------------- +
| 15.0 |
+------+ + + + + +
```

#### stddev_samp_y, stddev_samp_x

The standard difference for the specified dimension after calculating a two-dimensional statistical aggregation is sample.

**Return Type**：DOUBLE

```sql
Select stddev_samp_x(stats_agg(y, x)) from test_stats;
```

```
+------------------------------------ +
| stddev_sam_x (stats_agg(test_stats_stats.y,test_stats.x)) |
+------------------+
| 0.5270462766947299 |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+ 0.527627694729|
 +--------------------------+
```

#### stddev_pop_y, stddev_pop_x

The standard difference for the specified dimensions after calculating a two-dimensional statistical aggregation is population.

**Return Type**：DOUBLE

```sql
Select stddev_pop_x (stats_agg(y, x)) from test_stats;
```

```
+---------------------------- +
| stddev_pop_x (stats_agg(test_stats_stats.y,test_stats.x)) |
+----------+
| 0.5 |
+------------------------------------------------------------------------------------------------------------
```

#### var_sam_y, var_samp_x

The difference between the specified dimensions after calculating a two-dimensional statistical aggregation is sample.

**Return Type**：DOUBLE

```sql
Select var_samp_x(stats_agg(y, x)) from test_stats;
```

```
+----- ----- +
| var_samp_x (stats_agg(test_stats.y,test_stats.x)) |
+------------- +
| 0.2777777777777778 |
+---------, -----
```

#### var_pop_y, var_pop_x

Calculate the difference between the specified dimensions after the two-dimensional statistical aggregation, as population.

**Return Type**：DOUBLE

```sql
Select var_pop_x (stats_agg(y, x)) from test_stats;
```

```
+----- -------- +
| var_pop_x (stats_agg(test_stats.y,test_stats.x)) |
+------------- +
| 0.25 |
+---------------------
```

#### Skewness_sam_y, kewness_sam_x

Calculate the two-dimensional aggregation by specifying the dimension value in the form sample.

**Return Type**：DOUBLE

```sql
Select stewness_samp_x(stats_agg(y, x)) from test_stats;
```

```
+----------------------------- +
| kewness_samp_x (stats_agg(test_stats.y,test_stats.y)|
+--------------------------+
| -2.106000811460203e-16 |
+---------------------------------------------------------------------------------------------------------------
```

#### Skewness_pop_y, kewness_pop_x

Calculate the 2D polymer and specify the dimension as the population.

**Return Type**：DOUBLE

```sql
Select stewness_pop_x (stats_agg(y, x)) from test_stats;
```

```
+---------------------------- +
| kewness_pop_x (stats_agg(test_stats.y,test_stats.x)) |
+----------+
| -2.220446049250313e-16 |
+-----------------------------------------------------------------------------------------------------+
```

#### kurtosis_sam_y, kurtosis_samp_x

Calculate the peak of the two-dimensional aggregation in the form of sample.

**Return Type**：DOUBLE

```sql
Select kurtosis_samp_x(stats_agg(y, x)) from test_stats;
```

```
+----------------------------- +
| kurtosis_samp_x (stats_agg(test_stats.y,test_stats.y)|
+----------+
| 0.8999999999999999|
+-------------+ +
```

#### kurtosis_pop_y, kurtosis_pop_x

Calculate the peak of the two-dimensional aggregation and specify the dimension in a way that is population.

**Return Type**：DOUBLE

```sql
Select kurtosis_pop_x (stats_agg(y, x)) from test_stats;
```

```
+----------------------------- +
| kurtosis_pop_x (stats_agg(test_stats.y,test_stats.x)) |
+------------------+
| 0.999999999999999998|
+------------------------------------------------------------------------------------------------------------------+
```

#### Correlation

Calculate the link after the two-dimensional statistical aggregation.

**Return Type**：DOUBLE

```sql
Select correlation(stats_agg(y, x)) from test_stats;
```

```
+----------------------------- +
| correlation(stats_agg(test_stats.y,test_stats.x)) |
+----------------------------------------------------------------------------------+
| 0.0 |
+-------------------------------------------+
```

#### covariance_samp, covariance_pop

Calculate the syntax difference after the two-dimensional statistical aggregation.

**Return Type**：DOUBLE

```sql
Select covariance_Samp (stats_agg(y, x)) from test_stats;
```

```
+-------------------------------------------------------+
| covariance_samp(stats_agg(test_stats.y,test_stats.x)) |
+-------------------------------------------------------+
| 0.0                                                   |
+-------------------------------------------------------+
```

```sql
Select covariance_pop(stats_agg(y, x)) from test_stats;
```

```
+----------------------------- +
| covariance_pop(stats_agg(test_stats.y,test_stats.x)) |
+--------------------------+
| 0.0 |
+---------------------
```

#### determination_coeff

Decision coefficient for the calculation of two-dimensional statistical aggregation.

**Return Type**：DOUBLE

```sql
Select determination_coeff(stats_agg(y, x)) from test_stats;
```

```
+-----------------------------------------------------------+
| determination_coeff(stats_agg(test_stats.y,test_stats.x)) |
+-----------------------------------------------------------+
| 0.0                                                       |
+-----------------------------------------------------------+
```

#### slope

Based on a two-dimensional statistical aggregation, the slope of the linear proposed line is calculated.

**Return Type**：DOUBLE

```sql
Select slope(stats_agg(y, x)) from test_stats;
```

```
+---------------------------------------------+
| slope(stats_agg(test_stats.y,test_stats.x)) |
+---------------------------------------------+
| 0.0                                         |
+---------------------------------------------+
```

#### intercept

Calculate the interception distance of y after two-dimensional statistical aggregation.

**Return Type**：DOUBLE

```sql
Select intercept(stats_agg(y, x)) from test_stats;
```

```
+-------------------------------------------------+
| intercept(stats_agg(test_stats.y,test_stats.x)) |
+-------------------------------------------------+
| 3.0                                             |
+-------------------------------------------------+
```

#### x_intercept

Calculates the interval between x after 2D statistical aggregation.

**Return Type**：DOUBLE

```sql
select x_intercept(stats_agg(y, x)) from test_stats;
```

```
+---------------------------------------------------+
| x_intercept(stats_agg(test_stats.y,test_stats.x)) |
+---------------------------------------------------+
| -inf                                              |
+---------------------------------------------------+
```

### gage_agg

Analyze Gauge data.Unlike the Counter, Gauge can be reduced or increased.

#### gage_agg

```
gage_agg(time, value)
```

This is the first step in analysing the Gauge data.Create intermediate aggregation data using gauge_agg,
to calculate other functions using intermediate aggregation data.

**Parameters**：

- time: Timestamp

- Value: DOUBLE

**Return value**：

```
Struct LO
  first: Struct { 
    ts: Timestamp,
    value: Double
  },
  second: Struct { 
    ts: Timestamp,
    value: Double
  }, 
  penultimate: Struct {
    ts: Timestamp, 
    val: Double
  }, 
  last: Struct {
    ts: Timestamp, 
    val: Double
  }, 
  num_elements: Bigint Unsingled 
}
```

#### 示例：

```sql
Select gauge_agg(time, pressure) from air group by date_trunc('month', time);
```

```
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| gauge_agg(air.time,air.pressure)                                                                                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {first: {ts: 2023-03-01T00:00:00, val: 54.0}, second: {ts: 2023-03-01T00:00:00, val: 59.0}, penultimate: {ts: 2023-03-14T16:00:00, val: 55.0}, last: {ts: 2023-03-14T16:00:00, val: 80.0}, num_elements: 13122} |
| {first: {ts: 2023-01-14T16:00:00, val: 63.0}, second: {ts: 2023-01-14T16:00:00, val: 68.0}, penultimate: {ts: 2023-01-31T23:57:00, val: 77.0}, last: {ts: 2023-01-31T23:57:00, val: 54.0}, num_elements: 16640} |
| {first: {ts: 2023-02-01T00:00:00, val: 54.0}, second: {ts: 2023-02-01T00:00:00, val: 60.0}, penultimate: {ts: 2023-02-28T23:57:00, val: 74.0}, last: {ts: 2023-02-28T23:57:00, val: 59.0}, num_elements: 26880} |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### delta

Get changes to Gauge over time.This is a simple increment, calculated by subtracting the last seen value from the first value.

**Return value:** Double

```sql
select delta (gauge_agg(time, pressure)) from air group by date_trunc('month', time);
```

```
+-----------------------------------------+
| delta(gauge_agg(air.time,air.pressure)) |
+-----------------------------------------+
| 26.0                                    |
| -9.0                                    |
| 5.0                                     |
+-----------------------------------------+
```

#### time_delta

Get duration, the last Gauge time minus the first Gauge time.

**Return value**： INTERVAL

```sql
select time_delta(gauge_agg(time, pressure)) from air group by date_trunc('month', time);
```

```
+----------------------------------------------------------+
| time_delta(gauge_agg(air.time,air.pressure))             |
+----------------------------------------------------------+
| 0 years 0 mons 13 days 16 hours 0 mins 0.000000000 secs  |
| 0 years 0 mons 17 days 7 hours 57 mins 0.000000000 secs  |
| 0 years 0 mons 27 days 23 hours 57 mins 0.000000000 secs |
+----------------------------------------------------------+
```

#### Rate

Calculate the ratio between Gauge changes and time changes.

**Return value**: Double

Unit：

When the time unit is ns, the ratio unit is /ns,

Rates per m: /ms when time unit

When the time unit is s, the ratio unit is /s

```sql
select rate(gauge_agg(time, pressure)) from air group by date_trunc('month', time);
```

```
+-------- +
| rate(gauge_agg(air.time,air.pressure)|
+------+
| 2.2018970189701897e-14 |
| 9.349414325974008e-15 |
| 4.13905465848807e-16 |
+--------+ + + + + +
```

#### first_time

Get the smallest timestamp on Gauge

**Return Type**: TIMESTAMP

```
Select first_time (gauge_agg(time, pressure)) from air;
```

```
+-------- +
| first_time (gauge_agg(air.time,air.pressure)) |
+-----------+
| 2023-01-14T16:00:00 |
+----------+ +
```

#### last_time

Get the largest timestamp on Gauge

**Return Type**: TIMESTAMP

```sql
Select last_time (gauge_agg(time, pressure)) from air;
```

```
+----- +
| last_time (gauge_agg(air.time,air.pressure)) |
+-----------+
| 2023-03-14T16:00:00 |
+----------+ +
```

#### first_val

Get the minimum timestamp value for Gauge

**Return Type**: type of column specified in gauge_agg

```sql
Select first_val(gauge_agg(time, pressure)) from air;
```

```
+---------------------------------------------+
| first_val(gauge_agg(air.time,air.pressure)) |
+---------------------------------------------+
| 68.0                                        |
+---------------------------------------------+
```

#### last_val

Get the maximum timestamp value for Gauge

**Return Type**: type of column specified in gauge_agg

```sql
Select last_val(gauge_agg(time, pressure)) from air;
```

```
+--------------------------------------------+
| last_val(gauge_agg(air.time,air.pressure)) |
+--------------------------------------------+
| 80.0                                       |
+--------------------------------------------+
```

#### idelta_left

Calculate the earliest transient changes in Gauge.This is equal to the second value minus the first value.

**Return Type**：the type of column specified in the gauge_agg

```sql
 select time, station, pressure from air where station = 'XiaoMaiDao' order by time limit 4;
```

```
+----- +
| time | station | pressure |
+-----------+
| 2023-01-14T16:00:00 | XiaoMaiDao | 63. |
| 2023-01-14T16:03:00 | XiaoMaiDao | 58.0 |
| 2023-01-14T16:06:00 | XiaoMaiDao | 65. |
| 2023-01-14T16:09:00 | XiaoMaiiDao | 52.0 |
+---______
```

```sql
Select idelta_left(gauge_agg(time, pressure)) from air where station = 'XiaoMaiDao';
```

```
+----- +
| ideelta_left(gauge_agg(air.time,air.pressure)) |
+----------+
| 5.0 |
+-----
```

#### idelta_right

Calculate the latest transient changes for Gauge.This is equal to the last value minus the second last value.

**Return Type**：the type of column specified in the gauge_agg

```sql
select time, station, pressure from air where station = 'XiaoMaiDao' order by time desc limit 4;
```

```
+----- +
| time | station | pressure |
+-----------+
| 2023-03-14T16:00:00 | XiaoMaiDao | 5. |
| 2023-03-14T15:57:00 | XiaoMaiDao | 62.0 |
| 2023-03-14T15:54:00 | XiaoMaiDao | 75. |
| 2023-03-14T15:51:00 | XiaoMaiiDao | 61.0 |
+---______
```

```sql
Select idelta_right (gauge_agg(time, pressure)) from air where station = 'XiaoMaiDao';
```

```
+------------------------------------------------+
| idelta_right(gauge_agg(air.time,air.pressure)) |
+------------------------------------------------+
| -7.0                                           |
+------------------------------------------------+
```

### compact_state_agg

given a system or value to switch between discrete states,

Aggregate the time spent on each state.

For example, you can track the system using compact_state_agg functions

Time in error, running, or starting.

compact_state_agg is designed to handle relatively few states.It may not perform well on excessive data sets between them.

If you need to track the time to enter and exit each state, use state_agg functions.

If you need to track the activity of the system according to the heart signal, consider using the heartbeat_agg function.

#### compact_state_agg

```
compact_state_agg(ts, state)
```

Stats the time spent on each state and aggregate State AggDatatype

**Parameters**： ts is timestamped, state is any

**Return value**： StateAggData Type

```
Struct {
    state_duration: List[
        Struct{
          state: any,
          interval: duration
        },
        ...
    ]
    state_periods: List[
        Struct(
            state: any,
            periods: List[
                Struct {
                  start_time: timestamp, 
                  end_time: timestamp
                },
                ...
            ]
        ),
        ......
    ]
}

```

#### 示例：

```sql
alter database public set ttl '100000d';

create table if not exist states (state STRING);

insert into states values
('2020-01-01 10:00:00', 'starting'),
('2020-01-01 10:30:', 'running'),
('2020-01-03 16:00:00', 'error'),
('2020-01-03 18:30:00', 'starting'),
('2020-01-03 19:30', 'running'),
('2020-01-05 12:00:00', 'stopping');
```

```sql
select compact_state_agg(time, state) from states;
```

```
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| compact_state_agg(states.time,states.state)                                                                                                                                                                                                                                                                                                                                          |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {state_duration: [{state: running, duration: 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs}, {state: error, duration: 0 years 0 mons 0 days 2 hours 30 mins 0.000000000 secs}, {state: starting, duration: 0 years 0 mons 0 days 1 hours 30 mins 0.000000000 secs}, {state: stopping, duration: 0 years 0 mons 0 days 0 hours 0 mins 0.000000000 secs}], state_periods: []} |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### duration_in

```
duration_in (state_agg_data, state [,begin_time, interval_time]) 
```

Statistics the duration of a state or the duration of a state within a certain time period.

**Parameters**：

state_agg_data: StateAggData

state: any state type same as compact_state_agg.

begin_time: optional, specify start time within the specified time period.

interval_time: Optional, the duration of the specified time period, when not specified, the time period is infinite.

**Return value**： INTERVAL type

#### 示例：

```sql
select duration_in (compact_state_agg(time, state), 'running') from states;
```

```
+----------------- +
| duration_in(compact_state_agg(states.time,states.state), Utf8("running")) |
+---------------------------+
| 0 years 3 days 3 days 22 hours 0 mins 0.00000000000secs |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 0 years | 0 ms 3 days
```

### state_agg

Give a system or value to switch between discrete states, track the transformation between state.

#### state_agg

```
state_agg(ts, state)
```

Stats the time spent on each state, and aggregates the State AggData type.

```sql
alter database public set ttl '100000d';

create table if not exist states (state STRING);

insert into states values
('2020-01-01 10:00:00', 'starting'),
('2020-01-01 10:30:', 'running'),
('2020-01-03 16:00:00', 'error'),
('2020-01-03 18:30:00', 'starting'),
('2020-01-03 19:30', 'running'),
('2020-01-05 12:00:00', 'stopping');
```

```sql
Select state_agg(time, state) from states;
```

```
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| state_agg(states.time,states.state)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {state_duration: [{state: starting, duration: 0 years 0 mons 0 days 1 hours 30 mins 0.000000000 secs}, {state: running, duration: 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs}, {state: stopping, duration: 0 years 0 mons 0 days 0 hours 0 mins 0.000000000 secs}, {state: error, duration: 0 years 0 mons 0 days 2 hours 30 mins 0.000000000 secs}], state_periods: [{state: starting, periods: [{start_time: 2020-01-01T10:00:00, end_time: 2020-01-01T10:30:00}, {start_time: 2020-01-03T18:30:00, end_time: 2020-01-03T19:30:00}]}, {state: error, periods: [{start_time: 2020-01-03T16:00:00, end_time: 2020-01-03T18:30:00}]}, {state: running, periods: [{start_time: 2020-01-01T10:30:00, end_time: 2020-01-03T16:00:00}, {start_time: 2020-01-03T19:30:00, end_time: 2020-01-05T12:00:00}]}]} |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### duration_in

```
duration_in (state_agg_data, state [,begin_time, interval_time]) 
```

Statistics the duration of a state or the duration of a state within a certain time period.

**Parameters**：

state_agg_data: StateAggData

state: any state type same as compact_state_agg.

begin_time: optional, specify start time within the specified time period.

interval_time: Optional, the duration of the specified time period, when not specified, the time period is infinite.

**Return value**： INTERVAL type

#### 示例：

The duration of the 'running' state.

```sql
select duration_in (state_agg(time, state), 'running') from states;
```

```
+----- +
| duration_in (state_agg(states.time,states.state), Utf8("running")|
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| 0 years 0 ms 3 day 22 hours 0 min s 0.00000000000secs |
+---------------------------+ +
```

The duration of the 'running' state starting from 2020-01-01 11:00:00.

```sql
Select duration_in (state_agg(time, state), 'running', Timestap '2020-01-01 11:00') 
from states;
```

```
+----------------------------------------------------------------------------------------------+
| duration_in(state_agg(states.time,states.state),Utf8("running"),Utf8("2020-01-01 11:00:00")) |
+----------------------------------------------------------------------------------------------+
| 0 years 0 mons 3 days 21 hours 30 mins 0.000000000 secs                                      |
+----------------------------------------------------------------------------------------------+
```

The duration of the 'running' state in four days starting from 2020-01-01 11:00.

```sql
select duration_in (state_agg(time, state), 'running', Timestap '2020-01-01 11:00', interval '4 day')
from states;
```

```
+-------------------------------------------------------------------------------------------------------------------------------------------+
| duration_in(state_agg(states.time,states.state),Utf8("running"),Utf8("2020-01-01 11:00:00"),IntervalMonthDayNano("73786976294838206464")) |
+-------------------------------------------------------------------------------------------------------------------------------------------+
| 0 years 0 mons 3 days 20 hours 30 mins 0.000000000 secs                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------+
```

#### state_at

```
state_at (state_agg_data, ts)
```

Stay at a certain moment.

**Parameters**：

- state_agg_data: StateAggData

- ts: Timestamp

**Return value**： any type, the same status type as state_agg_data statistics.

```sql
Select state_at (state_agg(time, state), Timestap '2020-01-01 10:30:00) from states;
```

```
+---------------------------------------------------------------------------+
| state_at(state_agg(states.time,states.state),Utf8("2020-01-01 10:30:00")) |
+---------------------------------------------------------------------------+
| running                                                                   |
+---------------------------------------------------------------------------+
```

### andlestick_agg

Carry out analysis of financial asset data.This functionality makes it easier to prepare financial analysis queries related to candlestick.

Candlestick_agg receives the price of the stock at the opening and closing prices and when the price is higher.

andlestick_agg to generate CandleStackData from the original quotation data,

Then you can use the access and aggregation functions for this intermediate aggregation.

#### andlestick_agg

```
andlestick_agg(time, price, volume)
```

Generate intermediate aggregation data CandleStackData from original quotations.

**Parameter：**

- time: Timestamp

- price: double price

- volume: Double volume

**Return value：** CandleStackData

```
Struct {
  open: Struct {
    ts:  Timestamp,
    val: Double, 
  },
  close: Struct {
    ts: Timestamp,
    val: Double,
  },   
  high: Struct {
    ts: Timestamp,
    val: Double,
  },
  low: Struct {
    ts: Timestamp,
    val: Double
  },
  volume: Struct {
    vol: Double,
    vwap: Double,
  }
}
```

#### Example

```sql
alter database public set ttl '100000d';
create table if not existers tick (price bigt, volume bigint);
insert tick(time, price, volume)
values
    ('1999-12-31 00:00:00. 00', 111, 444),
    ('1999-12-31 00:00:00.005', 222, 444),
    ('1999-12-31 00:00:00. 10', 333, 222),
    ('1999-12-31 00:00:10.015', 444, 111),
    ('1999-12-31 00:00:10. 20', 222, 555),
    ('1999-12-31 00:10:00. 25', 333, 555),
    ('1999-12-31 00:10.030', 444, 333),
    ('1999-12-31 01:00.035', 555, 222);
```

```sql
Select andlestick_agg(time, price, volume) from tick;
```

```
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| candlestick_agg(tick.time,tick.price,tick.volume)                                                                                                                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {open: {ts: 1999-12-31T00:00:00, val: 111.0}, close: {ts: 1999-12-31T01:00:00.035, val: 555.0}, low: {ts: 1999-12-31T00:00:00, val: 111.0}, high: {ts: 1999-12-31T01:00:00.035, val: 555.0}, volume: {vol: 2886.0, vwap: 850149.0}} |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### Close

```
close(candlestick_agg_data)
```

Get the price of the bill.

**Return value：** DOUBLE

#### Example

```sql
Select close(candlestick_agg(time, price, volume)) from tick;
```

```
+--------------------------------------------- +
| closing (candlestick_agg(tick.time,tick.price,tick.volume)) |
+------------------------------------------+
| 55.0 |
+------------------------------------------------------------------------------------------------------------------------------------------------------------ + 
 | 55.0 | 
 +--------------------------------------------------------------------------------------------------------------------------------------------------+
```

#### close_time

```
close_time (candlestick_agg_data)
```

Retrieving billing time.

**Return value：** Timestamp

#### Example

```sql
Select close_time (candlestick_agg(time, price, volume)) from tick;
```

```
+----------------- +
| close_time (candlestick_agg(tick.time,tick.price,tick.volume)) |
+--------------------------+
| 1999-12-31T01:00:00:0005 |
+-----------------+ +
```

#### High

```
high (candlestick_agg_data)
```

Get the highest price.

**Return value：** DOUBLE

#### Example

```
Select high (candlestick_agg(time, price, volume)) from tick;
```

```
+----------------------------- +
| high(andlestick_agg(tick.time,tick.price,tick.volume)) |
+------------------------------------------+
| 555.0 |
+------------- format@@3 +----------+
```

#### High_time

```
High_time (candlestick_agg_data)
```

Time to get the highest price.

**Return value：** DOUBLE

#### Example

```sql
Select high_time (candlestick_agg(time, price, price, volume)) from tick;
```

```
+-------------------------- +
| high_time(andlestick_agg(tick.time,tick.price,tick.volume)) |
+------------- +
| 1999-12-31T01:00:00:005 |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 1999-12-3T01:00
```

#### low

```
low(candlestick_agg_data)
```

Get the lowest price.

**Return value：** DOUBLE

#### Example

```sql
Select low(candlestick_agg(time, price, volume)) from tick;
```

```
+----------------------------- +
| low(andlestick_agg(tick.time,tick.price,tick.volume)) |
+----------------------------------+
| 11.0 |
+----------+ + +
```

#### low_time

```
low_time(candlestick_agg_data)
```

Time to get the lowest price.

**Return value：** Timestamp

#### Example

```sql
Select low_time (candlestick_agg(time, price, volume)) from tick;
```

```
+-------------------------------------------------------------+
| low_time(candlestick_agg(tick.time,tick.price,tick.volume)) |
+-------------------------------------------------------------+
| 1999-12-31T00:00:00                                         |
+-------------------------------------------------------------+
```

#### open

```
open(andlestick_agg_data)
```

Get the lowest price.

**Return value：** DOUBLE

#### Example

```sql
Select open (candlestick_agg(time, price, volume)) from tick;
```

```
+----------------------------- +
| open(andlestick_agg(tick.time,tick.price,tick.volume)) |
+----------+
| 111.0 |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

#### open_time

```
open_time(candlestick_agg_data)
```

Time to get the lowest price.

**Return value：** Timestamp

#### Example

```sql
Select open_time (candlestick_agg(time, price, price, volume)) from tick;
```

```
+---------------------- +
| open_time (candlestick_agg(tick.time,tick.price,tick.volume)) |
+------------- +
| 1999-12-31T00:00:00 |
+-------------+ +
```

#### volume

```
volume(candlestick_agg_data)
```

Get total transaction volume.

**Return value：** DOUBLE

#### Example

```sql
Select volume(candlestick_agg(time, price, volume)) from tick;
```

```
+-------------------------- -------- +
| volume(andlestick_agg(tick.time,tick.price,tick.volume)) |
+------------------------------+
| 2886.0 |
+--------------
```

#### vwap

```
vwap(candlestick_agg_data)
```

Get the weighted average price of the volume.

**Return value：** DOUBLE

#### Example

```sql
Select vwap(candlestick_agg(time, price, volume)) from tick;
```

```
+----------------------------- +
| vwap(andlestick_agg(tick.time,tick.price,tick.volume)) |
+----------+
| 294.5769230769231 |
+---------+
```

## Function

### **Math functions**

### **abs(x)**

**Function**：returns the absolute value of x.

**Parameter Type**：Value Type

**Return Type**：matches the function parameter type

#### Example

```sql
SELECT abs(-1);
```

```
+-----+
| abs (Int64(-1)) |
+---+
| 1 |
+--------+ + +
```

***

### **acos(x)**

**Function**：returns the inverse chord of x.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT acos(3);
```

```
+----- +
| acos (Int64(3)) |
+---+
| NaN |
+----------+ + +
```

```sql
SELECT acos (0.5);
```

```
+----- +
| acos (Float64(0.5)) |
+-----------+
| 1.0471975511965976 |
+----------+ + +
```

***

### **asin(x)**

**Function**：returns the inverse chord of x.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT asin (0.5);
```

```
+----- +
| asin (Float64(0.5)) |
+-----------+
| 0.5235987755982988 |
+----------+ +
```

```sql
SELECT asin(5);
```

```
+------+
| asin (Int64(5)) |
+---+
| NaN |
+----------+ + +
```

***

### **atan(x)**

**Function**：returns the inverse tangent value of x.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT atan(5);
```

```
+----- +
| atan (Int64(5)) |
+--------+
| 1.373400766945016 |
+---+ + + +
```

***

### **atan2(y,x)**

**Function**：returns the reverse tangent value of y/x.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT atan2(10,2);
```

```
+-------------- +
| atan2(Int64(10),Int64(2)) |
+--------------------+
| 1.3340000 |
+------------------------------------------+ + +
```

***

### **ceil(x)**

**Feature**：

**Parameter Type**：Value Type

**Return Type**：BIGINT

#### Example

```sql
SELECT ceil (1.6);
```

```
+----- +
| ceil (Float64(1.6)) |
+-----------
| 2 |
+---+ -+ -+ + +
```

***

### **floor(x)**

**Function**：rounded down

**Parameter Type**：Value Type

**Return Type**：BIGINT

#### Example

```sql
SELECT loor (-3.1);
```

```
+----------------------+
| floor(Float64(-3.1)) |
+----------------------+
| -4                   |
+----------------------+
```

***

### **cos(x)**

**Function**：returns the chord of x.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT cos(1);
```

```
+----- +
| cos(Int64(1)) |
+---------------
| 0.5403023058681398 |
+---+ + +
```

***

### **sin(x)**

**Function**：x sine

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT sin(5);
```

```
+------- +
| sin(Int64(5)) |
+---------------
| -0.9589242746631385 |
+-------- + +
```

***

### **exp(x)**

**Feature**：returns the x square.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT exp(1);
```

```
+---+
| exp (Int64(1)) |
+--------------
| 2.71828182845905 |
+---+ + +
```

***

### **ln(x)**

**Function**：Natural logarithm

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT ln (2.718281828459045);
```

```
+---------+
| ln (Float64 (2.7182818281828459045)) |
+--+
| 1|
+---+ + + + + + + + + +
```

***

### **log(x) | log10(x)**

**Function**：logarithm based on 10

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT log(10);
```

```
+------+
| logo (Int64(10)) |
+---+
| 1 |
+----------+ +
```

```sql
SELECT log10(10);
```

```
+------+
| logo (Int64(10)) |
+---+
| 1 |
+----------+ +
```

***

### **log2(x)**

**Function**：logarithm based on 2

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT log2(4);
```

```
+----- +
| log2 (Int64(4)) |
+---+
| 2 |
+----------+ + +
```

***

### **power(x,y) | power (x,y)**

**Features**：x submarines

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT power (2,3);
```

```
+----------- +
| power (Int64(2), Int64(3)) |
+--------------------+
| 8|
+-----------------------------------------------------------+ +
```

***

### **round(x)**

**Function**：rounded to the nearest integer

**Parameter Type**：Value Type

**Return Type**：BIGINT

#### Example

```sql
SELECT round (3.5);
```

```
+----- +
| round (Float64(3.5)) |
+---, -+
| 4 |
+----+ + -+ + -+ + +
```

***

### **sign(x)**

**Features**：Parameters (-1, 0, +1)

**Parameter Type**：Value Type

**Return Type**：BIGINT

#### Example

```sql
SELECT signum (-3);
```

```
+----- +
| signum (Int64(-3)) |
+-------+
| -1 |
+-----------+ -+ +
```

***

### **sqrt(x)**

**Function**：x square root

**Parameter Type**：Value Type

**Return Type**：matches the function parameter type

#### Example

```sql
SELECT sqrt(4);
```

```
+------+
| sqrt (Int64(4)) |
+------+
| 2 |
+--------+ +
```

***

### **tan(x)**

**Function**：x positive tangent

**Parameter Type**：Value Type

**Return Type**：DOUBLE

#### Example

```sql
SELECT tan(1) ;
```

```
+----- +
| tans (Int64(1))|
+--------------+
| 1.55740772465400002 |
+--+ +
```

***

### **trunc(x)**

**Function**：o’clock zero

**Parameter Type**：Value Type

**Return Type**：BIGINT

#### Example

```sql
SELECT trunc(-3.9);
```

```
+----------------------+
| trunc(Float64(-3.9)) |
+----------------------+
| -3                   |
+----------------------+
```

***

### **struct**

#### Syntax

```
struct(expr1 [, ...]) 
```

**Function**：creates a STRUCT, with a specified field value.

**Parameter Type**：Value Type

**Note**：structure function is currently not working

***

### **Conditional functions**

### **coalesce**

#### Syntax

```
coalesce (expr[,..exp])
```

**Function**：returns its first non-empty argument.Null returns only if all arguments are nullWhen retrieving data for display it is commonly used to replace default values with empty values.

**Parameter Type**：any

**Return Type**：First non-null's parameter type

#### Example

```sql
SELECT coalesce(temperature, null, station) FROM air;
```

```
+--------------------------------------------+
| coalesce(air.temperature,NULL,air.station) |
+--------------------------------------------+
| 69.0                                       |
| 78.0                                       |
| 62.0                                       |
| 79.0                                       |
| 53.0                                       |
| 72.0                                       |
| 71.0                                       |
| 69.0                                       |
| 80.0                                       |
| 74.0                                       |
| 70.0                                       |
| 70.0                                       |
| 70.0                                       |
+--------------------------------------------+
```

***

### **nullif**

#### Syntax

```
nullif (expr1, expr2) 
```

**Function**：returns NULL if expr1 equals expr2; otherwise returns expr1.

**Parameter Type**：expr1,expr2 numerical type with column value

**Return Type**：expr1 or NULL

#### Example

```sql
SELECT nullif(temperature, 70) FROM air;
```

```
+-----------------------------------+
| nullif(air.temperature,Int64(70)) |
+-----------------------------------+
| 69                                |
| 78                                |
| 62                                |
| 79                                |
| 53                                |
| 72                                |
| 71                                |
| 69                                |
| 80                                |
| 74                                |
|                                   |
|                                   |
|                                   |
+-----------------------------------+
```

***

### **String functions**

[//]: # "### **Array**"

[//]: # "    Create array"

### **ascii**

#### Syntax

```
ascii(str) 
```

**Feature**: Convert the first character in str to its ASCII code and return it.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT ascii ('abc');
```

```
+------+
| ascii (Utf8("a") |
+---, --+
| 97 |
+----------+ -+ +
```

```sql
SELECT ascii ('a');
```

```
+------+
| ascii (Utf8("a") |
+---, --+
| 97 |
+----------+ -+ +
```

***

### **bit_length**

#### Syntax

```
bit_length(str) 
```

**Function**：returns the binary length of the string data or the number of binary data.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT bit_length('abc');
```

```
+------------------------+
| bitlength(Utf8("abc")) |
+------------------------+
| 24                     |
+------------------------+
```

***

### **btrim**

#### Syntax

```
btrim (string [, matching_string]) 
```

**Feature** the：function crop the string by deleting guided spaces and trailing spaces or deleting characters that match the optional string.

**Parameter type**：STRING

**Return Type**: STRING

#### Example

```sql
SELECT btrim('abc ');
```

```
+------------------------------------- +
| btrim (Utf8(" abc') |
+-----------------+
|
+-------------------------+
```

```sql
SELECT btrim ('111abc111', '1');
```

```
+-------- ----- +
| btrim (Utf8("111abc111"), Utf8("1")) |
+---+
| abc |
+-----------------------+ 
 | format@@3 +-------+ + + +
```

***

### **trim**

#### Syntax

```
trim(str) 
```

**Function**：delete blank characters at the end of the string.

**Parameter type**：STRING

**Return Type**：STRING

***

### **char_length | charter_length**

#### Syntax

```
char@@_length(expr) 
```

**Function**：returns the length of the specified string in number form.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT char_length('hello');
```

```
+-------------------------------+
| characterlength(Utf8("你好"))  |
+-------------------------------+
| 2                             |
+-------------------------------+
```

***

### **chr**

#### Syntax

```
chr(expr) 
```

**Function**：returns the character in the provided UTF-16 code.

**Parameter Type**: BIGINT

**Return Type**: STRING

#### Example

```sql
SELECT chr (20005);
```

```
+---+
| chr (Int64(2000)) |
+-----------
|
+-------+ -+ + + +
```

***

### **conciliate**

#### Syntax

```
Contraat (expr1, expr2 [, ...exp]) 
```

**Function**：connects two or more expressions and returns the generated expression.

**Parameter type**：STRING

**Return Type**: STRING

#### Example

```sql
SELECT consent ('a', 'b', 'c');
```

```
+---------------------------------------+
| concat(Utf8("a"),Utf8("b"),Utf8("c")) |
+---------------------------------------+
| abc                                   |
+---------------------------------------+
```

***

### **concili_ws**

#### Syntax

```
Concat_ws(sep, expr1 [, ...]) 
```

**Function**：returns a string separated by sep.

**Parameter type**：STRING

**Return Type**：STRING

#### Example

```sql
SELECT Concat_ws('', 'a', 'b', 'c');
```

```
+-------- ----------- +
| concrete parator (Utf8(" "), Utf8("a"), Utf8("b"), Utf8("c"), Utf8("),Utf8("c") |
+----------------------------------+
| a b c |
+---, format@@3 +--------
```

***

### **initcap**

#### Syntax

```
initcap(expr) 
```

**Function**：uppercase each word in the argument.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT initcap('hello world');
```

```
+------------------------------+
| initcap(Utf8("hello world")) |
+------------------------------+
| Hello World                  |
+------------------------------+
```

***

### **left**

#### Syntax

```
left(str, len) 
```

**Function**：returns the leftiest len character of Str stack.

**Parameter Type**：str, STRING, len BIGINT

**Return Type**：STRING

#### Example

```sql
SELECT left('abcde', 3);
```

```
+-------- +
| left(Utf8("abcde"), Int64(3)) |
+---+
| abc |
+______
```

***

### **lpad**

#### Syntax

```
lpad(expr, len [, pad] 
```

**Function**：returns expr-filled pads on the left, filled with length len.

**Parameter type**：expr, pad type STRING, len type BIGINT

**Return Type**：BIGINT

When len is negative, len shows 0,when len is too big, function execution failed

#### Example

```sql
SELECT lpad('abc', 10, '1');
```

```
+-------- +
| lpad (Utf8("abc"), Int64(10),Utf8("1"))|
+---+
| 1111111abc |
+----+ + --+ + +
```

***

### **rpad**

#### Syntax

```
rpad(expr, len [, pad] 
```

**Function**：returns the exprs of the pad packed on the right side and the length of the whole character is len.

**Parameter type**：expr, pad type STRING, len type BIGINT

**Return Type**：STRING

#### Example

```sql
SELECT rpad ('aaaa', 10, 'b');
```

```
+---------- +
| rpad (Utf8("aaa"), Int64(10),Utf8("b"))|
+----------+
| aabbbbbbb |
+---+ + + + + +
```

***

### **lower**

#### Syntax

```
lower(expr) 
```

**Function**：returns lowercase.

**Parameter type**：STRING

**Return Type**：STRING

#### Example

```sql
SELECT lower('ABC');
```

```
+----- +
| lower(Utf8("ABC") |
+---------+
| abc |
+---------+ + -+ + +
```

***

### **upper**

#### Syntax

```
upper(expr)
```

**Function**：returns the result of changing all characters from expr to upper case.

**Parameter type**：STRING

**Return Type**：STRING

***

### **ltrim**

#### Syntax

```
ltrim(str[, trimstr]) 
```

**Function**：returns str, which removes the lead characters in trimmStr.Default trimester is empty

**Parameter type**：STRING

**Return Type**：STRING

#### Example

```sql
SELECT ltrim('abc');
```

```
+-----------------------+
| ltrim(Utf8("   abc")) |
+-----------------------+
| abc                   |
+-----------------------+
```

***

### **md5**

#### Syntax

```
md5 (expr) 
```

**Function**：returns MD5128 bits sum in hexadecimal string.

**Parameter type**：STRING

**Return Type**：STRING

#### Example

```sql
SELECT md5 ('abc');
```

```
+----------------------------------+
| md5(Utf8("abc"))                 |
+----------------------------------+
| 900150983cd24fb0d6963f7d28e17f72 |
+----------------------------------+
```

***

### **octet_length**

#### Syntax

```
octet_length(expr) 
```

**Function**：returns the byte length of string data.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT octet_length('hello');
```

```
+-------- +
| octetlength (Utf8("hello") |
+------------+
| 6 |
+---------------------------------------------------------------------------------------------------+ +
```

***

### **random**

#### Syntax

```
random ( [seed] 
```

**Function**：returns random values between 0 and 1.

**Parameter type**：none

**Return Type**：DOUBLE

#### Example

```sql
SELECT random();
```

```
+---------------------+
| random()            |
+---------------------+
| 0.37577771377596325 |
+---------------------+
```

[//]: # "### **Regexp_Replace**"

[//]: # "    regexp_replace(str, regexp, rep [, position] ) "

[//]: # "**Function**：substitutes all substrings matching regexp with rep."

[//]: # "**Parameter type**：STRING"

[//]: # "**Return Type**：BIGINT"

***

### **repeat**

#### Syntax

```
repeat(expr, n) 
```

**Function**：returns duplicate expr, n seconds.

**Parameter type**：exprs type STRING, n type BIGINT

**Return Type**：BIGINT

#### Example

```sql
SELECT recpeat('a', 5);
```

```
+-------- +
| repeat(Utf8("a"), Int64(5))|
+------------+
| aaaaaaaa |
+-------------------------------------
```

***

### **replace**

#### Syntax

```
place(str, search, replace) 
```

**Function**：Replace all search items with replacement.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT place ('aaa', 'a', 'b');
```

```
+-------- +
| replacement (Utf8("aaa"), Utf8("a"), Utf8("a"), Utf8("a"), Utf8("b")) |
+------------+
| bbb |
+----------+ + + +
```

***

### **reverse**

#### Syntax

```
reverse (expr) 
```

**Function**：returns an reverse string or an array of arrays containing inverse elements.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT reverse('hello');
```

```
+-----------------------+
| reverse(Utf8("你好")) |
+-----------------------+
| 好你                  |
+-----------------------+
```

***

### **right**

#### Syntax

```
right (str, len) 
```

**Function**：returns the longest len character on the right of the string stack.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
 SELECT rights ('aabbb', 3);
```

```
+-------- +
| right (Utf8("aaabb"), Int64(3)) |
+---+
| bbb |
+---+ + + + + + +
```

***

### **digest**

#### Syntax

```
digest(expr, algorithm)
```

**Function**：calculates hash values using the expression to a given algorithm.

**Parameter Type**：expr, algorithm is STRING,

algorithm specifies the algorithm for calculating hash and supports only md5, sha224, sha256, sha384, sha512, blake 2, blak2b, bllake3

**Return Type**：BINARY

#### Example

```sql
SELECT digest ('abc', 'md5');
```

```
+-------------------- -+
| digest(Utf8("abc"), Utf8("m5")) |
+---+
| 900150983cd24fb0d6963f7d28e17f72 |
+---+ +
```

***

### **rtrim**

#### Syntax

```
rtrim ( str [, trimstr]) 
```

**Feature**：returns deleting the strings of the tailed character trimstr,trimstr's default is empty characters.

**Parameter type**：STRING

**Return Type**：STRING

#### Example

```sql
SELECT rtrim ('aabbb', 'b');
```

```
+----------- +
| rtrim (Utf8("aabb"),Utf8("b"))|
+---+
| aaaa |
+---------+ + + + + +
```

***

### **sha224**

#### Syntax

```
sha224(str)
```

**Function**：calculates the sha224 hash of a string

**Return Type**：BINARY

**Parameter type**：STRING

#### Example

```sql
 SELECT sha224 ('abc');
```

```
+----- +
| sha224 (Utf8("abc")) |
+-----------+
| 23097d223405d82a477bda2a2aadbce4bda0b3f7e3f7e36c9da7 |
+------------------------------------------------------------
```

***

### **sha256**

#### Syntax

```
sha256(str)
```

**Function**：calculates the sha256 hash of a string

**Return Type**：BINARY

**Parameter type**：STRING

#### Example

```sql
SELECT sha256('abc');
```

```
+------------------------------------------------------------------+
| sha256(Utf8("abc"))                                              |
+------------------------------------------------------------------+
| ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad |
+------------------------------------------------------------------+
```

***

### **sha384**

#### Syntax

```
sha384(str)
```

**Function**：calculates the sha384 hash of a string

**Return Type**：BINARY

**Parameter type**：STRING

#### Example

```sql
SELECT sha384 ('abc');
```

```
+--------------------------------------------------------------------------------------------------+
| sha384(Utf8("abc"))                                                                              |
+--------------------------------------------------------------------------------------------------+
| cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7 |
+--------------------------------------------------------------------------------------------------+
```

***

### **sha512**

#### Syntax

```
sha512(str)
```

**Function**：calculates the sha512 hash of a string

**Return Type**：BINARY

**Parameter type**：STRING

***

### **split_part**

#### Syntax

```
split_part(str, delim, n) 
```

**Function**：split str by delimit, returning part n.

**Parameter type**：str,deim type STRING, partNum type BIGINT

**Return Type**：STRING

#### Example

```sql
SELECT split_part('abc|def|ghi', '|', 2);
```

```
+-------- +
| splitpart(Utf8("abc|def|ghi"), Utf8("|"|"), Int64(2)) |
+------------- +
| def |
+-------------
```

***

### **starts_with**

#### Syntax

```
starts_with(expr, startExpr) 
```

**Function**：returns true if expr starts with startExpm.

**Parameter type**：STRING

**Return Type**：BOOLEN

#### Example

```sql
SELECT starts_with('abcdefg', 'abc');
```

```
+-----------------------------------------+
| startswith(Utf8("abcdefg"),Utf8("abc")) |
+-----------------------------------------+
| true                                    |
+-----------------------------------------+
```

***

### **strpos**

#### Syntax

```
strpos(str, subst) 
```

**Function**：returns the child string in the specified string.

**Parameter type**：STRING

**Return Type**：BIGINT

#### Example

```sql
SELECT strpos('abcdef', 'def');
```

```
+----------------- +
| strpos(Utf8("abcdef"), Utf8("def") |
+----+
| 4 |
+-------------+ + +
```

***

### **substr**

#### Syntax

```
substr(expr, pos [, len]) 
```

**Function**：returns expr substring (from pos and length).

**Parameter type**：expr type STRING,pos,len type BIGINT

**Return Type**：STRING

#### Example

```sql
SELECT substr('abcdef', 4, 3);
```

```
+---------+
| substr(Utf8("abcdef"), Int64(4), Int64(3)) |
+------+
| de|
+----------+ +
```

***

### **to_hex**

#### Syntax

```
to_hex(value)
```

**Function**：Converts decimal numbers to hexadecimal expressions.

**Parameter Type**：BIGINT

**Return Type**：STRING

#### Example

```sql
SELECT to_hex(100);
```

```
+-------- +
| tzm (Int64(100)) |
+-----------+
| 64 |
+-------------+ + +
```

***

### **translate**

#### Syntax

```
translate(expr, from,to) 
```

**Function**：returns an expr, where all characters from are replaced with characters to be in place.

**Parameter type**：STRING

**Return Type**：STRING

#### Example

```sql
SELECT translate('aabbb', 'bbb', 'cc');
```

```
+-------- +
| translate(Utf8("aabb"), Utf8("bbb"), Utf8("bbb"), Utf8("cc")) |
+----------------------------------+
| aaccc |
+----------------------------------------------------------------------------------------------------------------------------------+ 

```

***

### **Time Functions**

### **date_part**

#### Syntax

```
date_part(field, expr) 
```

**Function**：extracted some dates, timestamps, or intervals.

**Parameter Type**：

Field type is STRING, and can only be one of (\`year', 'quarter', 'month', 'week', 'day', 'doy', 'doy', 'doow', 'hour', 'minute', '
second').

expr type TIMESTAMP

**Return Type**：BIGINT

#### Example

```sql
SELECT date_part('hour', TIMESTAMP '2022-11-21T09:18:17');
```

```
+-------------- +
| datepart(Utf8("hour"), Utf8("2022-11-21T09:18:17") |
+----------------------------------------------------------+
| 9 |
+---------------------------------------------------------------------
```

***

### **date_trunc**

#### Syntax

```
date_trunc(field, expr) 
```

**Function**：returns the value of units truncated to the field.

**Parameter type**：Field type is STRING, and can only be one of ('year', 'quarter', 'month', 'month', 'week', 'day', 'doy', 'doow', 'hour', 'minute', ' , '
second').

expr type is TIMESTAMP

#### Example

```sql
SELECT date_trunc('month', TIMESTAMP '2022-11-21T09:18:17');
```

```
+----------- +
| datecrunc(Utf8("month"), Utf8("2022-11-21T09:18:17") |
+-------------+
| 20-11-01T00:00:00 |
+-------------+
```

***

### **date_bin**

#### Syntax

```
date_bin(interval, source, origin)
```

**Feature**：compartments interval bucket, matching original, returns the timestamped in the bucket where source is located.

**Parameter Type**：

interval is STRING type, will be parsed as time interval,

source, origin is the TIMESTAMP type.

**Return Type**：TIMESTAMP

#### Example

```sql
SELECT date_bin (INTERVAL '1' DAY, TIMESTAMP '2022-11-21T09:10:24', TIMESTAMP '2022-11-01T00:00:00');
```

```
+------------------------------------------------------------------------------------------------+
| datebin(IntervalDayTime("4294967296"),Utf8("2022-11-21T09:10:24"),Utf8("2022-11-01T00:00:00")) |
+------------------------------------------------------------------------------------------------+
| 2022-11-21T00:00:00                                                                            |
+------------------------------------------------------------------------------------------------+
```

***

### **to_timestamp**

#### Syntax

```
to_timestamp(expr) 
```

**Function**：returns exprs that use optional format to force conversion to a certain timestamp.

**Parameter Type**：STRING, or BIGINT

**Return Type**：TIMESTAMP type, accuracy determined by parameters, BIGINT type, returned by nansecs TIMESTAMP

#### Example

```sql
SELECT to_timestamp('1970-01-01T00:00:00');
```

```
+---------+
| totimestamp(Utf8("1970-01-01T00:00:00")) |
+-----------+
| 1970-01-01T00:00:00 | format@@3 +---+ + 
 | 1970-01-01T00:00:00 |
+-----------+
```

```sql
SELECT to_timestamp(1);
```

```
+-------------------------------+
| totimestamp(Int64(1))         |
+-------------------------------+
| 1970-01-01T00:00:00.000000001 |
+-------------------------------+
```

***

### **to_timestamp_millennium**

#### Syntax

```
to_timestamp_millis(expr) 
```

**Function**：is converted to milligrams in milliseconds

**Parameter Type**：BIGINT or STRING

**Return Type**：m2 TIMESTAMP

#### Example

```sql
SELECT to_timestamp_millis ('1970-01-01T00:00:00.00301');
```

```
+------------------------------------------------------+
| totimestampmillis(Utf8("1970-01-01T00:00:00.00301")) |
+------------------------------------------------------+
| 1970-01-01T00:00:00.003                              |
+------------------------------------------------------+
```

```sql
SELECT to_timestamp_millis(1) ;
```

```
+-----------------------------+
| totimestampmillis(Int64(1)) |
+-----------------------------+
| 1970-01-01T00:00:00.001     |
+-----------------------------+
```

***

### **to_timestamp_micros**

#### Syntax

```
to_timestamp_micro(expr) 
```

**Function**：turns to timestamp of microseconds.

**Parameters**：BIGINT or STRING

**Return Type**： microseconds\* TIMESTAMP

#### Example

```sql
SELECT to_timestamp_micros(1)
```

```
+-----------------------------+
| totimestampmicros(Int64(1)) |
+-----------------------------+
| 1970-01-01T00:00:00.000001  |
+-----------------------------+
```

***

### **to_timestamp_seconds**

#### Syntax

```
to_timestamp_seconds(expr) 
```

**Function**：turns to second-level timestamps

**Parameters**：BIGINT or STRING

**Return Type**：seconds of accuracy of TIMESTAMP

#### Example

```
SELECT to_timestamp_seconds(1);
```

```
+------------------------------+
| totimestampseconds(Int64(1)) |
+------------------------------+
| 1970-01-01T00:00:01          |
+------------------------------+
```

***

### **from_unixtime**

#### Syntax

```
from_unixtime (unixTime) 
```

**Function**：returns unixTime.

**Parameters**： BIGINT

**Return Type**： unix time, second

#### Example

```
SELECT from_unixtime(1);
```

```
+------------------------+
| fromunixtime(Int64(1)) |
+------------------------+
| 1970-01-01T00:00:01    |
+------------------------+
```

***

### **now**

#### Syntax

```
now()
```

**Function**：returns current timestamp

**Return Type**：TIMESTAMP

#### Example

```
SELECT now();
```

```
+----------------------------------+
| now()                            |
+----------------------------------+
| 2022-11-21T04:44:19.742107+00:00 |
+----------------------------------+
```

### **time_window**

#### Syntax

```sql
time_window(time_expr, window_duration[, slide_duration])
```

time_column for Timestamp type

window_duration is INTERVAL, specifies the window size of the time window

Slide_duration is an INTERVAL, specifies the size of the time window sliding and does not specify this parameter, sliding size to time window, turning to scroll window

time_window(time, window_duration, slide_duration) generated window with：

```sql
start, end
time, time_column + window_duration
time - slide_duration, time + window_duration - slide_duration
time - 2 * slide_duration, time + window_duration - 2 * slide_duration
.
time - n * slide_duration, time + window_duration - n * slide_duration
```

and window meets start <= time < end

#### Example

```sql
CREATE TABLE test(a BIGINT, TAGS(b));
INSERT INTO test(time, a, b) VALUES ('2023-04-23T00:00:00.0000Z', 1, 'b');
SELECT time FROM test;
```

```
+---------------------+
| time                |
+---------------------+
| 2023-04-23T00:00:00 |
+---------------------+
```

```sql
SELECT time_window(time, interval '3 day') FROM test;
```

```
+---------------------------------------------------------------------+
| TIME_WINDOW(test.time,IntervalMonthDayNano("55340232221128654848")) |
+---------------------------------------------------------------------+
| {start: 2023-04-23T00:00:00, end: 2023-04-26T00:00:00}              |
+---------------------------------------------------------------------+
```

```sql
SELECT time_window(time, interval '5 day', interval '3 day') FROM test;
```

```
+------------------------------------------------------------------------------------------------------------------+
| TIME_WINDOW(test.time,IntervalMonthDayNano("92233720368547758080"),IntervalMonthDayNano("55340232221128654848")) |
+------------------------------------------------------------------------------------------------------------------+
| {start: 2023-04-23T00:00:00, end: 2023-04-28T00:00:00}                                                           |
| {start: 2023-04-20T00:00:00, end: 2023-04-25T00:00:00}                                                           |
+------------------------------------------------------------------------------------------------------------------+
```

### Space Functions

CnosDB provides space functions for the ST_Geometry SQL series. For Geometry type, see section[Geometry](#geometry) data type.

#### ST_AsBinary

```
ST_AsBinary(geometry)
```

**Function**：returns geometry of space objects in OGC/ISO Well-Known Binary (WKB).

**Parameter Type**：Geometry

**Return Type**: Binary

\*\*Example \*\*:

```sql
SELECT ST_AsBinary('POINT(0 3)');
```

```
+-------------------- --------
| st_AsBinary(Utf8("POINT(0 3)") |
+---------------+
| 01000000000000000000000000000000000000000000000000000000000000000000000000040 |
+----------+
```

#### ST_GeomFromWKB

```
ST_GeomFromWKB(wkb)
```

**Function**：Converts WKB binary to Geometry type

**Parameter Type**：Binary

**Return Type**: Geometry

**Example**：

```sql
SELECT ST_GeomFromWKB (ST_AsBinary('POINT(0 3)'))
```

```
+-------- +
| st_GeomFromWB(st_AsBinary(Utf8("POINT(0 3)")))|
+----------+
| POINT(0 3) |
+----------+
```

#### ST_Distance

```
ST_Distance (geometry1, gemometry2)
```

**Function**： ST_Distance returns the smallest Europ distance between 2D projectors in two geometry.

**Parameter Type**：Binary

**Return Type**： Double

**Example**：

Distance between two dots

```sql
SELECT ST_Distance('POINT(0 0)', 'LINESTRING (30 10, 10 30, 40 40)');
```

```
+----- ----- +
| st_distance(Utf8("POINT(1)")"), Utf8("POINT(0)")") |
+-----------+
| 1.0 |
+-----------------
```

Distance by point to line

```sql
SELECT ST_Distance('POINT(0 0)', 'LINESTRING (30 10, 10 30, 40 40)');
```

```
+--------------------------------------------------------------------------+
| st_distance(Utf8("POINT(0 0)"),Utf8("LINESTRING (30 10, 10 30, 40 40)")) |
+--------------------------------------------------------------------------+
| 28.284271247461902                                                       |
+--------------------------------------------------------------------------+
```

Distance between plane and face

```sql
SELECT ST_Distance('POLYGON (0 2, 1 1-0 -1 2)'), 'POLYGON (-1 - 3, 2 - 1 - 3 - 1 - 3)');
```

```
+----- +
| st_distance(Utf8("POLYGOT(0 2,1,1-0 2)"), Utf8("POLYGON(-1 -3, 2-1, 0 -3, 1-1 -3 -3)") |
+---------------------------------------------------------------------------- +
| 1.4213562373051 |
+----------+ +
```

#### ST_Area

```
ST_Area(geometry)
```

**Function**：returns the cartex area of geometric 2D projections.The area unit is the same as the unit used to represent input into geometric coordinates.
This function returns 0 for point, line, multi-point and multi-line string.
For geometrical collections, it returns the sum of geometry in the collection.

**Parameter Type** Geometry

**Return Type**: Double

**Example**：

```sql
SELECT ST_Area('POLYGON (40 40, 20 45, 45 30, 40 40)');
```

+-------- -------- +
\| st_Area(Utf8("POLYGON (40 40, 20 45, 45 30, 40 40))") |
+-------------------------------------+
\| 87.5 |
+--------------------------------------------------------------------------------------------------------------------------------------------------+
\| 87.5 |
+--------------------------------------------

> Partial geometrical graphics do not support computing area. These geometrical fields return 0, such as：Point, MultiPoint, LineString, MultiLine, Line.
> Returns value to NULL if the parameter content format is invalid.

#### ST_Equals

```
ST_Equals (A,B)
```

**Function**：compares two geometry and returns true if two geometry are identical

ST_Equals(A, B) Equivalent to ST_Within (A, B) && ST_Within (B,A)

**Parameter Type**： Geometry

**Return Type**： Boolian

**Example**：

```sql
Select ST_Equals (
    'LINESTRING(0, 10 10)', 
    'LINESTRING(0, 5 5, 10 10)'
st_equals;
```

```
+---+
| st_equals |
+----
| true |
+---+ -+
```

#### ST_Contins

```
ST_Contains (A,B)
```

**Function**：returns True if geometry A contains geometry objects

ST_Contains(A, B) => ST_Within (B,A)

**Parameters**：Geometry

**Return Type**：Boolian

**Example**：

```sql
Select ST_Contains (
    'POLYGON(0 0,0 3,3 0,0 0))', 
    'POLYGON(0 0,0 1,1 0,0 0)'
st_contains;
```

```
+---+
| st_contains |
+-------
| true |
+---+ +
```

#### ST_Intersects

```
ST_Intersects(A,B)
```

**Function**：returns True if two geometry objects

**Parameters**: Geometry

**Return Type**： Boolian

**Example**：

```sql
Select ST_Intersects (
    'LINESTRING(3 2, 7 6)',
    'LINESTRING(3 4, 8 4)'
st_intersects;
```

```
+-------- +
| st_intersects |
+----------+
| true |
+----+ +
```

#### ST_Disjoint

```
ST_Disjoint(A, B)
```

**Feature**： returns True if two geometry objects are missing.

**Parameters**： Geometry

**Return Type**：Boolian

**Example**：

```sql
Select ST_Disjoint(
    'LINESTRING(0 0-3 -3)', 
    'LINESTRING(0 1,1 0)'
);
```

```
+-----+
| st_disjoint |
+------
| true |
+---+ +
```

#### ST_Within

```
ST_Within (A,B)
```

**Function**：returns True if the given geometry object A is exclusively within object B

**Parameters**：Geometry

**Return Type**：Boolian

**Example**：

```sql
Select ST_Within (
    'POLYGON (1 1, 1 2, 2 2, 2 1, 1 1))',
    'POLYGON(0, 0 3, 3, 3, 0, 0 0)'
);
```

```
+---+
| st_within |
+----
| true |
+---+ + +
```

### **Window Functions**

#### Syntax

```sql
function([...expr] ) OVER ([PARTITION BY expr] [ORDER BY expr] [window_frame]);

function: {aggregate_function | analytic_function}

window_frame: { frame_mode frame_start |
                frame_mode BETWEEN frame_start AND frame_end } }
frame_mode: {RANGE | ROWS}

frame_start: {UNBOUNDED PRECEDING | offset_start PRECEDING | CURRENT ROW | offset_start FOLLOWING }

frame_end: {offset_stop PRECEDING | CURRENT ROW | offset_stop FOLLOWING | UNBOUNDED FOLLOWING}

```

#### **Function Type**

#### Ranking Functions

| Function Name                                                                                    |
| ------------------------------------------------------------------------------------------------ |
| PLAYLIST_NOTIFICATION_POPUP_TITLE |
| PERCENT_RANK                                                                |
| RANK                                                                                             |
| ROW_NUMBER                                                                  |

`DENSE_RANK` | `PERCENT_RANK` requires ORDER BY

`RANK`, `DENSE_RANK`, `ROW_NUMBER` specifies window_frame that is invalid

#### Aggregate Functions

See[聚合函数](./sql.md#polymer)

#### Analyze Window Functions

| Function Name                       |
| ----------------------------------- |
| PLAYLIST_TITLE |
| LAG                                 |
| LEAD                                |
| NTH_VALUE      |

#### **PARITON BY sub sents**

One or more expressions, which are used to specify a line partition, and if there are no such sentences, the division is composed of all lines

#### **ORDER BY sentence**

Specify the order of lines in partitions

#### **window_frame sents**

fame is a subset of the current partition, further splitting windows within the partition

Specify ROWS, where the window calculates the offset by action unit

Specify RANG, then ORDER BY children must be specified, and the window must be calculated in the value of ORDER BY expression

- `UNBOUND PRECEDING` ROWS mode first line of partition and the first value of partition ORDER BY expression in RANGE mode
- `offset PRECEDING` ROWS mode for the current line of the previous offset, RANGE mode for the current value
- \`\`CURRENT ROW\` ROWS mode is current line, RANGE mode is current
- `offset FOLLOWING` ROWS mode for the current line reoffset,RANGE for the current value after offset
- `UNBOUN FOLLOWING` ROWS mode for the last row of the partition, and RANGE for the last value of ORDER BY expression

#### Use Limit

- Window functions can only appear in SELECT.
- Window and polymering functions cannot be nested in window functions.

## **Window Function List**

Include[聚合函数](./sql.md#polymer)

### **ROW_NUMBER**

#### Syntax

```
ROW_NUMBER() OVER([partition_clause] [orderby_clause])
```

**Function**：assigns a unique order number (starting from 1) for each row based on the sequence of lines in the window partition.

**Parameter type**：none

**Return Type**：BIGINT

#### Example

```sql
SELECT temperature, station, 
       ROW_NUMBER() OVER (PARITON BY station) 
FROM air;
```

```
+-------------+-------------+--------------+
| temperature | station     | ROW_NUMBER() |
+-------------+-------------+--------------+
| 69          | LianYunGang | 1            |
| 80          | LianYunGang | 2            |
| 74          | LianYunGang | 3            |
| 70          | LianYunGang | 4            |
| 70          | LianYunGang | 5            |
| 70          | LianYunGang | 6            |
| 69          | XiaoMaiDao  | 1            |
| 78          | XiaoMaiDao  | 2            |
| 62          | XiaoMaiDao  | 3            |
| 79          | XiaoMaiDao  | 4            |
| 53          | XiaoMaiDao  | 5            |
| 72          | XiaoMaiDao  | 6            |
| 71          | XiaoMaiDao  | 7            |
+-------------+-------------+--------------+
```

***

### **RANK**

#### Syntax

```
RANK() OVER([partition_clause] [orderby_clause]
```

**Function**：returns a value relative to all values in partitions (jump).

**Parameter type**：none

**Return Type**：BIGINT

#### Example

```sql
SELECT position, temperature, 
       RAK() OVER (PARITION BY station ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+--------+
| station     | temperature | RANK() |
+-------------+-------------+--------+
| LianYunGang | 69          | 1      |
| LianYunGang | 70          | 2      |
| LianYunGang | 70          | 2      |
| LianYunGang | 70          | 2      |
| LianYunGang | 74          | 5      |
| LianYunGang | 80          | 6      |
| XiaoMaiDao  | 53          | 1      |
| XiaoMaiDao  | 62          | 2      |
| XiaoMaiDao  | 69          | 3      |
| XiaoMaiDao  | 71          | 4      |
| XiaoMaiDao  | 72          | 5      |
| XiaoMaiDao  | 78          | 6      |
| XiaoMaiDao  | 79          | 7      |
+-------------+-------------+--------+
```

***

### **DENSE_RANK**

#### Syntax

```
DENSE_RANK() OVER([partition_clause] [orderby_clause]
```

**Function**：returns the ranking of a value relative to all values in the partition (series rank).

**Parameter type**：none

**Return Type**：BIGINT

#### Example

```sql
SELECT position, temperature, 
       DENSE_RANK() OVER (PARITON BY ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+--------------+
| station     | temperature | DENSE_RANK() |
+-------------+-------------+--------------+
| LianYunGang | 69          | 1            |
| LianYunGang | 70          | 2            |
| LianYunGang | 70          | 2            |
| LianYunGang | 70          | 2            |
| LianYunGang | 74          | 3            |
| LianYunGang | 80          | 4            |
| XiaoMaiDao  | 53          | 1            |
| XiaoMaiDao  | 62          | 2            |
| XiaoMaiDao  | 69          | 3            |
| XiaoMaiDao  | 71          | 4            |
| XiaoMaiDao  | 72          | 5            |
| XiaoMaiDao  | 78          | 6            |
| XiaoMaiDao  | 79          | 7            |
+-------------+-------------+--------------+
```

***

### **PERCENT_RANK**

#### Syntax

```
PERCENT_RANK() OVER([partition_clause] [orderby_clause])
```

**Function**：calculates the percentage ranking of a value in partition.

**Parameter type**：none

**Return Type**：DOUBLE

#### Example

```sql
 SELECT, temperature, 
        PERCENT_RANK() OVER (PARITIAN BY ORDER BY temperature) 
 FROM air;
```

```
+-------------+-------------+---------------------+
| station     | temperature | PERCENT_RANK()      |
+-------------+-------------+---------------------+
| LianYunGang | 69          | 0                   |
| LianYunGang | 70          | 0.2                 |
| LianYunGang | 70          | 0.2                 |
| LianYunGang | 70          | 0.2                 |
| LianYunGang | 74          | 0.8                 |
| LianYunGang | 80          | 1                   |
| XiaoMaiDao  | 53          | 0                   |
| XiaoMaiDao  | 62          | 0.16666666666666666 |
| XiaoMaiDao  | 69          | 0.3333333333333333  |
| XiaoMaiDao  | 71          | 0.5                 |
| XiaoMaiDao  | 72          | 0.6666666666666666  |
| XiaoMaiDao  | 78          | 0.8333333333333334  |
| XiaoMaiDao  | 79          | 1                   |
+-------------+-------------+---------------------+
```

***

### **CUME_DIST**

#### Syntax

```
CUME_DIST() OVER ([partition_clause] [orderby_clause]
```

**Function**：returns the position of a value relative to all values in the partition.

**Parameter type**：none

**Return Type**：DOUBLE

#### Example

```sql
SELECT position, temperature, 
       CUME_DIST() OVER(PARTITION BY station ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+---------------------+
| station     | temperature | CUME_DIST()         |
+-------------+-------------+---------------------+
| LianYunGang | 69          | 0.16666666666666666 |
| LianYunGang | 70          | 0.6666666666666666  |
| LianYunGang | 70          | 0.6666666666666666  |
| LianYunGang | 70          | 0.6666666666666666  |
| LianYunGang | 74          | 0.8333333333333334  |
| LianYunGang | 80          | 1                   |
| XiaoMaiDao  | 53          | 0.14285714285714285 |
| XiaoMaiDao  | 62          | 0.2857142857142857  |
| XiaoMaiDao  | 69          | 0.42857142857142855 |
| XiaoMaiDao  | 71          | 0.5714285714285714  |
| XiaoMaiDao  | 72          | 0.7142857142857143  |
| XiaoMaiDao  | 78          | 0.8571428571428571  |
| XiaoMaiDao  | 79          | 1                   |
+-------------+-------------+---------------------+
```

[//]: # "----------------"

[//]: #

[//]: # "### **NTILE**"

[//]: #

[//]: # "    ntile(n) over([partition_clause] [order_by_clause]"

[//]: #

[//]: # "**Function**：assigns the ordered dataset to nbb and the drum number to each line."

[//]: #

[//]: # "**Parameter Type**：BIGINT"

[//]: #

[//]: # "**Return Type**：BIGINT"

***

### **LAG**

#### Syntax

```
lag( expr [, offset [, default]) OVER([partition_clause] orderby_clause)
```

**Function**：returns the expr's value of the current line of offset in partition.

**Parameter Type**：exprs are of any type,

Offset returns value from offset line in partition, default is 1 when negative

Default requires the same data type as expr, default is NULL

**Return Type**：same type as expr.

#### Example

```sql
SELECT position, temperature, 
       LAG (temperature, 2) OVER (PARITION BY station ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+-------------------------------+
| station     | temperature | LAG(air.temperature,Int64(2)) |
+-------------+-------------+-------------------------------+
| LianYunGang | 69          |                               |
| LianYunGang | 70          |                               |
| LianYunGang | 70          | 69                            |
| LianYunGang | 70          | 70                            |
| LianYunGang | 74          | 70                            |
| LianYunGang | 80          | 70                            |
| XiaoMaiDao  | 53          |                               |
| XiaoMaiDao  | 62          |                               |
| XiaoMaiDao  | 69          | 53                            |
| XiaoMaiDao  | 71          | 62                            |
| XiaoMaiDao  | 72          | 69                            |
| XiaoMaiDao  | 78          | 71                            |
| XiaoMaiDao  | 79          | 72                            |
+-------------+-------------+-------------------------------+
```

***

### **LEAD**

#### Syntax

```
lead(expr [, offset [, default]) OVER ([partition_clause] orderby_clause)
```

**Function**：returns the expr's value of the current line after offset in the partition.

**Parameter Type**：exprs are of any type,

Offset is BIGINT and returns value from the previous offset line in partition, default is 1

Default needs to be the same as expr, default is NULL

**Return Type**：Same as expr.

#### Example

```sql
SELECT position, temperature, 
       LEAD (temperature, 2) OVER (PARITON BY station ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+--------------------------------+
| station     | temperature | LEAD(air.temperature,Int64(2)) |
+-------------+-------------+--------------------------------+
| LianYunGang | 69          | 70                             |
| LianYunGang | 70          | 70                             |
| LianYunGang | 70          | 74                             |
| LianYunGang | 70          | 80                             |
| LianYunGang | 74          |                                |
| LianYunGang | 80          |                                |
| XiaoMaiDao  | 53          | 69                             |
| XiaoMaiDao  | 62          | 71                             |
| XiaoMaiDao  | 69          | 72                             |
| XiaoMaiDao  | 71          | 78                             |
| XiaoMaiDao  | 72          | 79                             |
| XiaoMaiDao  | 78          |                                |
| XiaoMaiDao  | 79          |                                |
+-------------+-------------+--------------------------------+
```

***

### **FIRST_VALUE**

#### Syntax

```
FIRST_VALUE(expr) OVER ([partition_clause] [orderby_clause]
```

**Function**：returns the first value in a set of values (this group is usually an orderly assembly).

**Parameter Type**：exprs are any of the types,igne_nulls are the BOOLEN type, default is false

**Return Type**：Same as expr.

#### Example

```sql
SELECT position, temperature, 
       FIRST_VALUE (temperature) OVER (PARITION BY station ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+------------------------------+
| station     | temperature | FIRST_VALUE(air.temperature) |
+-------------+-------------+------------------------------+
| LianYunGang | 69          | 69                           |
| LianYunGang | 70          | 69                           |
| LianYunGang | 70          | 69                           |
| LianYunGang | 70          | 69                           |
| LianYunGang | 74          | 69                           |
| LianYunGang | 80          | 69                           |
| XiaoMaiDao  | 53          | 53                           |
| XiaoMaiDao  | 62          | 53                           |
| XiaoMaiDao  | 69          | 53                           |
| XiaoMaiDao  | 71          | 53                           |
| XiaoMaiDao  | 72          | 53                           |
| XiaoMaiDao  | 78          | 53                           |
| XiaoMaiDao  | 79          | 53                           |
+-------------+-------------+------------------------------+
```

***

### **LAST_VALUE**

#### Syntax

```
LAST_VALUE(expr) OVER ([partition_clause] [orderby_clause]
```

**Function**：returns the last value in the current window.

**Parameter Type**：exprs are any of the types,igne_nulls are the BOOLEN type, default is false

**Return Type**：Same as expr.

#### Example

```sql
SELECT position, temperature, 
       LAST_VALUE (temperature) OVER (PARITION BY station ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+-----------------------------+
| station     | temperature | LAST_VALUE(air.temperature) |
+-------------+-------------+-----------------------------+
| LianYunGang | 69          | 69                          |
| LianYunGang | 70          | 70                          |
| LianYunGang | 70          | 70                          |
| LianYunGang | 70          | 70                          |
| LianYunGang | 74          | 74                          |
| LianYunGang | 80          | 80                          |
| XiaoMaiDao  | 53          | 53                          |
| XiaoMaiDao  | 62          | 62                          |
| XiaoMaiDao  | 69          | 69                          |
| XiaoMaiDao  | 71          | 71                          |
| XiaoMaiDao  | 72          | 72                          |
| XiaoMaiDao  | 78          | 78                          |
| XiaoMaiDao  | 79          | 79                          |
+-------------+-------------+-----------------------------+
```

***

### **NTH_VALUE**

#### Syntax

```
NTH_VALUE(expr, number@@0) OVER ([partition_clause] [orderby_clause]
```

**Function**：returns the expression value of the specified line of the window frame in the first line of the window.

**Parameter Type**：exprs are of any type, number@@0 BIGINT

**Return Type**：Same as expr.

#### Example

```sql
SELECT position, temperature, 
       NTH_VALUE (temperature, 2) OVER (PARITON BY ORDER BY temperature) 
FROM air;
```

```
+-------------+-------------+-------------------------------------+
| station     | temperature | NTH_VALUE(air.temperature,Int64(2)) |
+-------------+-------------+-------------------------------------+
| LianYunGang | 69          |                                     |
| LianYunGang | 70          | 70                                  |
| LianYunGang | 70          | 70                                  |
| LianYunGang | 70          | 70                                  |
| LianYunGang | 74          | 70                                  |
| LianYunGang | 80          | 70                                  |
| XiaoMaiDao  | 53          |                                     |
| XiaoMaiDao  | 62          | 62                                  |
| XiaoMaiDao  | 69          | 62                                  |
| XiaoMaiDao  | 71          | 62                                  |
| XiaoMaiDao  | 72          | 62                                  |
| XiaoMaiDao  | 78          | 62                                  |
| XiaoMaiDao  | 79          | 62                                  |
+-------------+-------------+-------------------------------------+
```

## **Advanced functions**

### **Interpolate functions**

In the database, the interpolation is the technology used to process missing values in the data.When missing values exist in the data, these technologies can help us to estimate or speculate these missing values and thus fill the gaps in the data.

### **time_window_gapfill**

time_window_gapfill is similar to time_window, but has the function of filling missing data.Interpolate and locf must be used with time_window_gapfill
to control how to handle missing values.

time_window_gapfill must be used as a top level expression in a query or a subquery.For example, a time_window_gapfill cannot be nested in another function, such as sum (
time_window_gapfill(...)).

#### Syntax

- time_window_gapfill

```sql
time_window_gapFill (<time column> <window interval>[, <sliding interval>[, <start time>]): <time window struct>
```

#### Policy

- interpolate

The central idea of linear interpolation is to assume that the relationship between known data points is linear and then to estimate the value of unknown data points based on linear relationships between known data points.Specifically, linear interpolation values are extrapolated to unknown data points by using linear variation rates between the longitudinal coordinates of known data points.

Linear interpolation can be used for estimation of consecutive variables, such as filling missing values in time series or interpolating values in spatial data.However, the accuracy and applicability of linear interpolation values depend on the characteristics and actual circumstances of the data.In some cases, data may have non-linear relationships or other more appropriate interpolation methods.Therefore, before applying linear interpolation, careful consideration needs to be given to the nature of the data and the purpose of the interpolation to ensure that the interpolation results are reasonable and accurate.

```sql
interpolate (<expr>)
```

- locf

This function is used to fill missing values within the time window (Gap filling) and to fill missing values using "Last Observation Carved Forward" (LOCF).

"Last Observation Carried Forward" (LOCF) is a method used to fill missing values using the latest observable value to fill.Specific treatment as follows:：

1. The last non-missing value before the missing value was found.
2. Copy the value of this non-missing value to the position where the missing value is located.
3. Continue backward until next non-missing value is encountered.
4. If the next non-missing value is encountered, repeat steps 1 and 2, copy the value of the non-missing value to the missing value.
5. If there is still a missing value at the end of the data series, the last non-missing value will be copied until all missing values are filled.

In short, the LOCF method fills the missing value by copying the most recent observable value to the missing position, allowing data to remain continuous over time.This method assumes that the data after the missing values are the same or very close to the last observed values.

It should be noted that LOCF may introduce some deviations, especially when data change dramatically after missing values.Therefore, in using LOCF
to fill in missing values, careful consideration needs to be given to the characteristics of the data and the purpose of the analysis to ensure that the values filled are reasonably reflective of the actual situation.

```sql
locf(<expr>
```

#### Example

```sql
---- Prepare Data
DROPP DATABASE IF EXISTS gapfill_db;
CREATE DATABASE gapill_db WITH TTL '100000d';
CREATE TABLE gapfill_db. 2(f0 BIGINT, f1 DOUBLE, TAGS(t0, t1, t2));

INSERT gapfill_db. 2(TIME, f0, f1, t0, t1)
VALUES
    ('1999-12-31 00:00:00. 00', 111, 444, 'tag11', 'tag21'),
    ('1999-12-31 00:00.005', 222, 333, 'tag12', 'tag22'),
    ('1999-12-31 00:00:00. 10', 333, 222, 'tag13', 'tag23'),
    ('1999-12-31 00:00:00.015', 444, 111, 'tag14', 'tag24'),
    ('1999-12-31 00:00:00. 20', 222, 555, 'tag11', 'tag21'),
    ('1999-12-31 00:00:00. 25', 333, 444, 'tag12', 'tag22'),
    ('1999-12-31 00:00:00. 30', 444, 333, 'tag13', 'tag23'),
    ('1999-12-31 00:00:00.035', 555, 222, 'tag14', 'tag24');
```

```sql
---- interpolate
SELECT
  t0,
  time_window_gapfill(time, interval '10 milliseconds') as minute,
  interpolate(avg(f1))
from gapill_db. 2
where time between timestamp '1999-12-31T00:00:00.000Z' and timestamp '1999-12-31T00:00:00.055Z'
group by t0, minute;
```

```
+-------+-------------------------+-----------------------+
| t0    | minute                  | AVG(gapfill_db.m2.f1) |
+-------+-------------------------+-----------------------+
| tag11 | 1999-12-31T00:00:00     | 444.0                 |
| tag11 | 1999-12-31T00:00:00.010 | 499.5                 |
| tag11 | 1999-12-31T00:00:00.020 | 555.0                 |
| tag11 | 1999-12-31T00:00:00.030 |                       |
| tag11 | 1999-12-31T00:00:00.040 |                       |
| tag11 | 1999-12-31T00:00:00.050 |                       |
| tag12 | 1999-12-31T00:00:00     | 333.0                 |
| tag12 | 1999-12-31T00:00:00.010 | 388.5                 |
| tag12 | 1999-12-31T00:00:00.020 | 444.0                 |
| tag12 | 1999-12-31T00:00:00.030 |                       |
| tag12 | 1999-12-31T00:00:00.040 |                       |
| tag12 | 1999-12-31T00:00:00.050 |                       |
| tag13 | 1999-12-31T00:00:00     |                       |
| tag13 | 1999-12-31T00:00:00.010 | 222.0                 |
| tag13 | 1999-12-31T00:00:00.020 | 277.5                 |
| tag13 | 1999-12-31T00:00:00.030 | 333.0                 |
| tag13 | 1999-12-31T00:00:00.040 |                       |
| tag13 | 1999-12-31T00:00:00.050 |                       |
| tag14 | 1999-12-31T00:00:00     |                       |
| tag14 | 1999-12-31T00:00:00.010 | 111.0                 |
| tag14 | 1999-12-31T00:00:00.020 | 166.5                 |
| tag14 | 1999-12-31T00:00:00.030 | 222.0                 |
| tag14 | 1999-12-31T00:00:00.040 |                       |
| tag14 | 1999-12-31T00:00:00.050 |                       |
+-------+-------------------------+-----------------------+
```

```sql
---- locf
SELECT
  t0,
  time_window_gapfill(time, interval '10 milliseconds') as minute,
  locf(avg(f1))
from gapill_db. 2
where time between timestamp '1999-12-31T00:00:00.000Z' and timestamp '1999-12-31T00:00:00.055Z'
group by t0, minute;
```

```
+-------+-------------------------+-----------------------+
| t0    | minute                  | AVG(gapfill_db.m2.f1) |
+-------+-------------------------+-----------------------+
| tag11 | 1999-12-31T00:00:00     | 444.0                 |
| tag11 | 1999-12-31T00:00:00.010 | 444.0                 |
| tag11 | 1999-12-31T00:00:00.020 | 555.0                 |
| tag11 | 1999-12-31T00:00:00.030 | 555.0                 |
| tag11 | 1999-12-31T00:00:00.040 | 555.0                 |
| tag11 | 1999-12-31T00:00:00.050 | 555.0                 |
| tag12 | 1999-12-31T00:00:00     | 333.0                 |
| tag12 | 1999-12-31T00:00:00.010 | 333.0                 |
| tag12 | 1999-12-31T00:00:00.020 | 444.0                 |
| tag12 | 1999-12-31T00:00:00.030 | 444.0                 |
| tag12 | 1999-12-31T00:00:00.040 | 444.0                 |
| tag12 | 1999-12-31T00:00:00.050 | 444.0                 |
| tag13 | 1999-12-31T00:00:00     |                       |
| tag13 | 1999-12-31T00:00:00.010 | 222.0                 |
| tag13 | 1999-12-31T00:00:00.020 | 222.0                 |
| tag13 | 1999-12-31T00:00:00.030 | 333.0                 |
| tag13 | 1999-12-31T00:00:00.040 | 333.0                 |
| tag13 | 1999-12-31T00:00:00.050 | 333.0                 |
| tag14 | 1999-12-31T00:00:00     |                       |
| tag14 | 1999-12-31T00:00:00.010 | 111.0                 |
| tag14 | 1999-12-31T00:00:00.020 | 111.0                 |
| tag14 | 1999-12-31T00:00:00.030 | 222.0                 |
| tag14 | 1999-12-31T00:00:00.040 | 222.0                 |
| tag14 | 1999-12-31T00:00:00.050 | 222.0                 |
+-------+-------------------------+-----------------------+
```

## **System Views**

CnosDB provides a system view to view cluster status and cluster schema information.

There are two special databases that store these views in：

- CLUSER_SCHEMA on Database Cluster
- INFORMATION_SCHEMA Information on Tenants

### **CLUSER_SCHEMA**

This database belongs to the entire cluster, which can only be accessed by administrators.

The database contains metadata information on clusters, such as tenant information, user information.

### **TENANTS**

This view can be used to retrieve all tenant information for the entire cluster.

#### View Definition

| 字段                                                             | Data Type | Description                      |
| -------------------------------------------------------------- | --------- | -------------------------------- |
| ENANT_NAME                                | STRING    | Tenant Name                      |
| TREAT_PLAYLIST_TITLE | STRING    | Tenant configuration,json string |

#### Example

```sql
SELECT * FROM cluster_schema.tenants;
```

```
+----- +
| tenant_name | tenant_options |
+------------------+
| cnosdb | {"comment": "system tenant", "limiter_config":n} |
+---+ + +
```

### **USERS**

#### View Definition

This view can search for all user information for the entire cluster.

| 字段                                                             | Data Type | Description                          |
| -------------------------------------------------------------- | --------- | ------------------------------------ |
| USER_NAME                                 | STRING    | 用户名称                                 |
| IS_ADMIN                                  | BOOLEN    | Whether to be a system administrator |
| USER_OPTION_PLAYLIST | STRING    | User configuration,JSON string       |

#### Example

```sql
SELECT * FROM cluster_schema.users;
```

```
+-----------+----------+-------------------------------------------------------------------------------------------------+
| user_name | is_admin | user_options                                                                                    |
+-----------+----------+-------------------------------------------------------------------------------------------------+
| root      | true     | {"password":"*****","must_change_password":true,"rsa_public_key":null,"comment":"system admin"} |
+-----------+----------+-------------------------------------------------------------------------------------------------+
```

### **INFORMATION_SCHEMA**

The database belongs to a tenant who automatically creates the DB when Tenant is created and is visible to all members of the tenant.

### DATABASES

This view stores information about the renters under the database.

#### View Definition

| Field name                          | Data Type       | Description                                     |
| ----------------------------------- | --------------- | ----------------------------------------------- |
| ENANT_NAME     | STRING          | Tenant name for database                        |
| DATABASSE_NAME | STRING          | Database name                                   |
| TTL                                 | STRING          | Represents the time when the data file is saved |
| SHARD                               | BIGINT UNCIGNED | Number of data fragments                        |
| VNODE_DURATION | STRING          | Represents the time range of data in SHARD      |
| PREPLICA                            | BIGINT UNCIGNED | Number of copies of data in cluster             |
| PERCISON                            | STRING          | Represents the time accuracy of the database    |

#### Example

```sql
SELECT * FROM information_schema.databases;
```

```
+-------------+---------------+----------+-------+----------------+---------+-----------+
| tenant_name | database_name | ttl      | shard | vnode_duration | replica | percision |
+-------------+---------------+----------+-------+----------------+---------+-----------+
| cnosdb      | public        | 365 Days | 1     | 365 Days       | 1       | NS        |
+-------------+---------------+----------+-------+----------------+---------+-----------+
```

### TABLES

This view contains information about all tables under the tenant.

#### View Definition

| Field name                                                         | Data Type | Description                                                                     |
| ------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------- |
| TABLE_TEXT                                    | STRING    | Tenants attached to table                                                       |
| TABLE_DATABASE                                | STRING    | Database to which table belongs                                                 |
| TABLE_NAME                                    | STRING    | Table Name                                                                      |
| TABLE_TYPE                                    | STRING    | Whether table is base table or view                                             |
| TABLE_NOTIFICATION_TITLE | STRING    | Table storage engine, currently supported for external and internal tskv tables |
| TABLE_OPTIONS                                 | STRING    | Content is JSON string, all parameters of the record table                      |

#### Example

```sql
SELECT * FROM information_schema.tables;
```

```
+--------------+----------------+------------+------------+--------------+---------------+
| table_tenant | table_database | table_name | table_type | table_engine | table_options |
+--------------+----------------+------------+------------+--------------+---------------+
| cnosdb       | public         | wind       | BASE TABLE | TSKV         | TODO          |
| cnosdb       | public         | air        | BASE TABLE | TSKV         | TODO          |
| cnosdb       | public         | sea        | BASE TABLE | TSKV         | TODO          |
+--------------+----------------+------------+------------+--------------+---------------+
```

### COLUMNS

This view contains all the definitions listed under the tenant.

#### View Definition

| Field name                                                                                    | Data Type | Description                                                                           |
| --------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------- |
| TABLE_TEXT                                                               | STRING    | Tenants attached to table                                                             |
| TABLE_DATABASE                                                           | STRING    | Database to which table belongs                                                       |
| TABLE_NAME                                                               | STRING    | Table name                                                                            |
| COLUMN_NAME                                                              | STRING    | Listing                                                                               |
| NOTIF_NOTIFICATION_POPUP_TITLE | STRING    | Sort position listed in table                                                         |
| COLUMN_TYPE                                                              | STRING    | Column types, tskv table unique to support TIME, TAG, FIELD, usually fields are FIELD |
| IS_NULLABLE                                                              | STRING    | If column may contain NULL, then "YES" or "NO"                                        |
| DATA_TYPE                                                                | STRING    | Column data type                                                                      |
| COMPRESSON_DEC                                                           | STRING    | Compression algorithm used for column                                                 |

#### Example

```sql
SELECT * FROM information_schema.columns;
```

```
+-------------+---------------+------------+-------------+-------------+------------------+----------------+-------------+-----------+-------------------+
| tenant_name | database_name | table_name | column_name | column_type | ordinal_position | column_default | is_nullable | data_type | compression_codec |
+-------------+---------------+------------+-------------+-------------+------------------+----------------+-------------+-----------+-------------------+
| cnosdb      | public        | wind       | time        | TIME        | 0                | NULL           | false       | TIMESTAMP | DEFAULT           |
| cnosdb      | public        | wind       | station     | TAG         | 1                | NULL           | true        | STRING    | DEFAULT           |
| cnosdb      | public        | wind       | speed       | FIELD       | 2                | NULL           | true        | DOUBLE    | DEFAULT           |
| cnosdb      | public        | wind       | direction   | FIELD       | 3                | NULL           | true        | DOUBLE    | DEFAULT           |
| cnosdb      | public        | air        | time        | TIME        | 0                | NULL           | false       | TIMESTAMP | DEFAULT           |
| cnosdb      | public        | air        | station     | TAG         | 1                | NULL           | true        | STRING    | DEFAULT           |
| cnosdb      | public        | air        | visibility  | FIELD       | 2                | NULL           | true        | DOUBLE    | DEFAULT           |
| cnosdb      | public        | air        | temperature | FIELD       | 3                | NULL           | true        | DOUBLE    | DEFAULT           |
| cnosdb      | public        | air        | pressure    | FIELD       | 4                | NULL           | true        | DOUBLE    | DEFAULT           |
| cnosdb      | public        | sea        | time        | TIME        | 0                | NULL           | false       | TIMESTAMP | DEFAULT           |
| cnosdb      | public        | sea        | station     | TAG         | 1                | NULL           | true        | STRING    | DEFAULT           |
| cnosdb      | public        | sea        | temperature | FIELD       | 2                | NULL           | true        | DOUBLE    | DEFAULT           |
+-------------+---------------+------------+-------------+-------------+------------------+----------------+-------------+-----------+-------------------+
```

### ENABLED_ROLES

This view shows the current user's role information under the current tenant.

#### View Definition

| 字段                             | Data Type | Description |
| ------------------------------ | --------- | ----------- |
| ROLE_NAME | STRING    | Role Name   |

#### Example

```sql
SELECT * FROM information_schema.enabled_roles;
```

```
+---+
| role_name |
+------
| owner |
+---+ +
```

### ROLES

This view shows all the roles available under the current tenant (including system and custom roles).
This view is visible only to the current tenant Owner.

#### View Definition

| 字段                                | Data Type | Description                                                   |
| --------------------------------- | --------- | ------------------------------------------------------------- |
| ROLE_NAME    | STRING    | Role Name under Tenant                                        |
| ROLE_TYPE    | STRING    | Role Type, Custom Roles or System Roles                       |
| INHERIT_ROLE | STRING    | Custom role name for role inheritance and NULL if system role |

#### Example

```sql
SELECT * FROM information_schema.roles;
```

```
+-----------+-----------+--------------+
| role_name | role_type | inherit_role |
+-----------+-----------+--------------+
| owner     | system    |              |
| member    | system    |              |
+-----------+-----------+--------------+
```

### DATABASE_PRIVILEGES

#### View Definition

This view shows all the permissions given to the given role on db under the tenant.
All records of this view are visible to the current tenant Owner.
For non-Owner members, show records of corresponding roles only.

| 字段                                  | Data Type | Description                                                                 |
| ----------------------------------- | --------- | --------------------------------------------------------------------------- |
| ENANT_NAME     | STRING    | Name of tenant in the database to which the granted permissions are granted |
| DATABASSE_NAME | STRING    | Name of the database that has been granted permissions                      |
| PRIVILEGE_TYPE | STRING    | Type of permissions granted, READ/WRITE/ALL                                 |
| ROLE_NAME      | STRING    | Name of the role that has been granted permission                           |

#### Example

```sql
CREATE ROLE rrr INHERIT member;
GRANT READ ON DATABASE air TO ROLE rrrrr;
SELECT * FROM information_schema.database_privileges;
```

```
+-------- +------------------+-
| tenant_name | database_name | privilege_type | role_name | role_name |
+--------------+
| cnosdb | air | Read | rr |
+-----------------
```

### MEMBERS

This view shows the membership information under the tenant.

All records of this view are visible to all members of the current tenant.

#### View Definition

| 字段                             | Data Type | Description                   |
| ------------------------------ | --------- | ----------------------------- |
| USER_NAME | STRING    | Username of user under tenant |
| ROLE_NAME | STRING    | Member's role name            |

#### Example

```sql
SELECT * FROM information_schema.members;
```

```
+-------------- +
| user_name | role_name |
+-----------------------
| root | owner |
+----+ + + +
```

### QUERIES (INFORMATION_SCHEMA)

This view shows SQL statements in real time snapshots used to monitor SQL jobs in real time.

All records for this view are visible to the current tenant owner.

For non-Owner members, only display SQL submissions from current members.

#### View Definition

| 字段                                | Data Type       | Description                                                                     |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------- |
| QUERY_ID     | STRING          | SQL statement ID                                                                |
| REQUERY_TEXT | STRING          | Content of SQL statements                                                       |
| USER_ID      | STRING          | UserID for submission of SQL                                                    |
| USER_NAME    | STRING          | Name of user who submitted SQL                                                  |
| ENANT_ID     | STRING          | Tenant ID                                                                       |
| ENANT_NAME   | STRING          | Tenant Name                                                                     |
| STATE                             | STRING          | Status of statements in ACCEPTING, DISPATCHING, ANALYZING, OPTMIZING, SCHEDUING |
| DURATION                          | BIGINT UNCIGNED | Time when statements are running                                                |

#### Example

```sql
SELECT * FROM information_schema.queries;
```

```
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
| query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
| 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
```

#### SHOW QUERIES

You can also use the `SHOW QUERIES` statement to view the SQL statement in progress, which is a wrapper for the QUERIES view.

#### Example

```sql
SHOW QUERIES;
```

```
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
| query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
| 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
+----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
```

## **USAGE_SCHEMA**

The database, belonging to a tenant, automatically created the DB when Tenant was created and is visible to all members of the tenant.

For normal users, only the table in USAGE_SCHEMA can be seen as part of the current user's tenant,

For system administrators, see all the tables in USAGE_SCHEMA.

### VNODE_DISK_STORAGE

This view records the size of the disk space in the cluster of vnode, in Byte.

#### View Definition

| 字段                            | Data Type       | Description   |
| ----------------------------- | --------------- | ------------- |
| TIME                          | TIMESTAMP       | Record Time   |
| DATABASE                      | STRING          | vnode 所属的数据库  |
| NODE_ID  | STRING          | data节点的ID     |
| TENANT                        | STRING          | vnode 所属的租户名称 |
| VNODE_ID | STRING          | vnode 的 ID    |
| VALUE                         | BIGINT UNCIGNED | vnode size    |

Normal users can only access the tenant information of the current user.

### HTTP_DATA_IN

This view records the body's size of HTTP requests

#### View Definition

| 字段                           | Data Type       | Description                 |
| ---------------------------- | --------------- | --------------------------- |
| TIME                         | TIMESTAMP       | Record Time                 |
| DATABASE                     | STRING          | Database名称                  |
| NODE_ID | STRING          | Data节点的 ID                  |
| TENANT                       | STRING          | Database 所属的租户名称            |
| USER                         | STRING          | 用户名称                        |
| HOST                         | STRING          | Service Port                |
| API                          | STRING          | Http's API                  |
| VALUE                        | BIGINT UNCIGNED | Total size of write traffic |

Normal users can only access the tenant information of the current user.

## HTTP_DATA_OUT

This view records the total size of the body's response to HTTP

#### View Definition

| 字段                           | Data Type       | Description                |
| ---------------------------- | --------------- | -------------------------- |
| TIME                         | TIMESTAMP       | Record Time                |
| DATABASE                     | STRING          | Database名称                 |
| NODE_ID | STRING          | Data节点的 ID                 |
| TENANT                       | STRING          | Database 所属的租户名称           |
| USER                         | STRING          | 用户名称                       |
| API                          | STRING          | Http's API                 |
| HOST                         | STRING          | Service Port               |
| VALUE                        | BIGINT UNCIGNED | Total size of read traffic |

Normal users can only access the tenant information of the current user.

### HTTP_QUERIES

This view records how many times users query DB.

#### View Definition

| 字段                           | Data Type       | Description            |
| ---------------------------- | --------------- | ---------------------- |
| TIME                         | TIMESTAMP       | Record Time            |
| DATABASE                     | STRING          | Database名称             |
| NODE_ID | STRING          | Data节点的 ID             |
| TENANT                       | STRING          | Database 所属的租户名称       |
| USER                         | STRING          | 用户名称                   |
| API                          | STRING          | Http's API             |
| HOST                         | STRING          | Service Port           |
| VALUE                        | BIGINT UNCIGNED | Number of user queries |

Normal users can only access the tenant information of the current user.

### HTTP_WRITES

This view records how many times users write to DB via HTTP.

Note,INSERT statement is recorded (#ht)

#### View Definition

| 字段                           | Data Type       | Description      |
| ---------------------------- | --------------- | ---------------- |
| TIME                         | TIMESTAMP       | Record Time      |
| DATABASE                     | STRING          | Database名称       |
| NODE_ID | STRING          | Data节点的 ID       |
| TENANT                       | STRING          | Database 所属的租户名称 |
| USER                         | STRING          | 用户名称             |
| HOST                         | STRING          | Service Port     |
| API                          | STRING          | Http's API       |
| VALUE                        | BIGINT UNCIGNED | 用户写入次数           |

Normal users can only access the tenant information of the current user.

### COORD_DATA_IN

Record accepted data size by coordinator

#### View Definition

| 字段                           | Type            | Description       |
| ---------------------------- | --------------- | ----------------- |
| time                         | TIMESTAMP       | Record Time       |
| Database database            | STRING          | Database名称        |
| node_id | STRING          | Data节点的 ID        |
| tenant                       | STRING          | Database 所属的租户名称  |
| Value                        | BIGINT UNCIGNED | Measurement value |

Normal users can only access the tenant information of the current user.

### COORD_DATA_OUT

Log output data size by coordinator

#### View Definition

| 字段                           | Type            | Description       |
| ---------------------------- | --------------- | ----------------- |
| time                         | TIMESTAMP       | Record Time       |
| Database database            | STRING          | Database名称        |
| node_id | STRING          | Data节点的 ID        |
| tenant                       | STRING          | Database 所属的租户名称  |
| Value                        | BIGINT UNCIGNED | Measurement value |

Normal users can only access the tenant information of the current user.

### COORD_QUERIES

Log accepted data by coordinator

#### View Definition

| 字段                           | Type            | Description       |
| ---------------------------- | --------------- | ----------------- |
| time                         | TIMESTAMP       | Record Time       |
| Database database            | STRING          | Database名称        |
| node_id | STRING          | Data节点的 ID        |
| tenant                       | STRING          | Database 所属的租户名称  |
| Value                        | BIGINT UNCIGNED | Measurement value |

Normal users can only access the tenant information of the current user.

### COORD_WRITES

Log output data by coordinator

#### View Definition

| 字段                           | Type            | Description       |
| ---------------------------- | --------------- | ----------------- |
| time                         | TIMESTAMP       | Record Time       |
| Database database            | STRING          | Database名称        |
| node_id | STRING          | Data节点的 ID        |
| tenant                       | STRING          | Database 所属的租户名称  |
| Value                        | BIGINT UNCIGNED | Measurement value |

Normal users can only access the tenant information of the current user.

### Example

```sql
SELECT * FROM usage_schema.http_data_in ORDER BY time DESC LIMIT 2;
```

```
+----------------------------+--------------+--------------+---------+--------+------+-------+-----------+
| time                       | api          | host         | node_id | tenant | user | value | database  |
+----------------------------+--------------+--------------+---------+--------+------+-------+-----------+
| 2023-10-18T08:41:09.948999 | api/v1/write | 0.0.0.0:8902 | 1001    | cnosdb | root | 144   | sqlancer2 |
| 2023-10-18T08:41:09.948995 | api/v1/write | 0.0.0.0:8902 | 1001    | cnosdb | root | 251   | sqlancer1 |
+----------------------------+--------------+--------------+---------+--------+------+-------+-----------+
```

## **Stream**

### Create Stream Table

Create stream table, a table is required as source, stream table is not supported for ALTER

#### Syntax

```sql
CREATE STREAM TABLE [IF NOT EXISTS] table_name (field_definition [, field_definition]...
    WITH (db = 'db_name', table = 'table_name', event_time_column = 'time_column')
    engine = tskv;

field_definition: 
    column_name data_type
```

db and table parameters, specify source table

event_time_column specified event time column. The column data type must be TIMESTAMP type

Only the regular table is supported for source. The field name and field type defined for the stream field must belong to the source table and be the same as the source table definition.

#### Example

Create source table

```sql
CREATE DATABASE oceanic_station;
```

```
\c oceanic_station
```

```
CREATE TABLE air(pressure DOUBLE, temperature DOUBLE, visibility DOUBLE, TAGS (staff));
```

Create Stream Table

```sql
CREATE STREAM TABLE air_stream_stream(time TIMESTAMP, station STRING, pressure DOUBLE, temperature DOUBLE, visibility DOUBLE) 
    WITH (db = 'oceanic_station', table = 'air', event_time_column = 'time')
    engine = tskv;
```

### Remove Stream

> Same as delete normal expression reference to[删除表](#delete table)

### Stream Query

Stream queries only support INSELECT statements, FROM subsentence in SELECT is a stream table inserted into the target table.

Trigger stream queries when writing data to the source table.

The SELECT sentence of the current query does not support JOIN.

Fluid querying statements are running persistently and unexecuted by [KILL QUERY](#kill-query)

#### Example

Sample in streaming sample scenario, sourcetable time interval of one minute and sample time range of one hour

Target table for creating stream queries

```sql
CREATE TABLE air_down_sampling_1hour (max_pressure DOUBLE, avg_temperature DOUBLE, sum_temperature DOUBLE, count_pressure BIGINT, TAGS(staff));
```

Create Flow Query Statement

```sql
INSERT INTO air_down_sampling_1hour(time, station, max_pressure, avg_temperature, sum_temperature, count_pressure) 
SELECT 
	date_bin (INTERVAL 1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00) time, 
	station, 
	MAX(pressure) max_pressure, 
	AVG(temperature) avg_temperature, 
	SUM(temperature) sum_temperature, 
	COUNT(pressure) count_pressure 
FROM air_stream 
GROUP BY date_bin (INTERVAL '1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00'), station;
```

Trigger query statement when writing data

[数据来源](#sample data)

```sql
\w oceanic_station.txt
```

View target table results

```sql
SELECT * FROM air_down_sampling_1our LIMIT 10;
```

```
+---------------------+------------+--------------+-----------------+-----------------+----------------+
| time                | station    | max_pressure | avg_temperature | sum_temperature | count_pressure |
+---------------------+------------+--------------+-----------------+-----------------+----------------+
| 2023-01-14T16:00:00 | XiaoMaiDao | 80.0         | 68.05           | 1361.0          | 20             |
| 2023-01-14T17:00:00 | XiaoMaiDao | 79.0         | 63.75           | 1275.0          | 20             |
| 2023-01-14T18:00:00 | XiaoMaiDao | 79.0         | 66.35           | 1327.0          | 20             |
| 2023-01-14T19:00:00 | XiaoMaiDao | 78.0         | 68.05           | 1361.0          | 20             |
| 2023-01-14T20:00:00 | XiaoMaiDao | 80.0         | 64.35           | 1287.0          | 20             |
| 2023-01-14T21:00:00 | XiaoMaiDao | 77.0         | 61.05           | 1221.0          | 20             |
| 2023-01-14T22:00:00 | XiaoMaiDao | 80.0         | 64.8            | 1296.0          | 20             |
| 2023-01-14T23:00:00 | XiaoMaiDao | 80.0         | 66.35           | 1327.0          | 20             |
| 2023-01-15T00:00:00 | XiaoMaiDao | 80.0         | 65.15           | 1303.0          | 20             |
| 2023-01-15T01:00:00 | XiaoMaiDao | 80.0         | 69.55           | 1391.0          | 20             |
+---------------------+------------+--------------+-----------------+-----------------+----------------+
```

## **KILL QUERY**

### Syntax

```sql
KILL [QUERY] query_id;
```

Get `query_id` first by [`SHOW QUERIES`](./sql.md#show-queries).

## Example

```sql
SHOW QUERIES;
```

```
+----------+------+------------------------------------------------------------------+------------+----------+
| query_id | user | query                                                            | state      | duration |
+----------+------+------------------------------------------------------------------+------------+----------+
| 4        | root | select * from air join sea on air.temperature = sea.temperature; | SCHEDULING | 2703     |
| 5        | root | show queries;                                                    | SCHEDULING | 0        |
+----------+------+------------------------------------------------------------------+------------+----------+
```

```sql
KILL 4;
```

```
Query took 0.016 seconds.
```
