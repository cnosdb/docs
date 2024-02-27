---
title: SQL Syntax Reference
order: 5
---

# SQL Syntax Reference

## This schema is only visible to the Owner of the current tenant.

### Data Type

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

| Type            | Syntax                                                        | Note                                                                                                            |            |
| --------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------- |
| BIGINT          | [{+-}]123 |                                                                                                                 | Value Type |
| BIGINT UNCIGNED | [+]123    | Value Type                                                                                                      |            |
| DOUBLE          | 123.45                                                        | Numeric type, scientific notation is currently not supported                                                    |            |
| BOOLEN          | {true \| false \| t \| f}                                     |                                                                                                                 |            |
| STRING          | 'abc'                                                         | Double quotation format is not supported. Two consecutive '' in quotation numbers are converted to value        |            |
| TIMESTAMP       | TIMESTAMP '1900-01-01T12:00Z'                                 | Timestamp,TIMESTAMP keyword indicates that the string constant after needs to be interpreted as TIMESTAMP type. |            |
| --              | NULL                                                          | Empty value                                                                                                     |            |

#### TIMESTAMP constant syntax

If the VALUES list requires an expression, please use the [INSERT SELECT](./sql.md#insert-query-results--insert-select-) syntax.

T intervals, only spaces can be used instead

Z for zero timezone

+08:00 for Sector 8

The following：

- The keyword VALUES can be followed by multiple lists separated by ’,’.
- Instruction
- Download Data
- This schema allows you to query information about all users in the cluster.
- Drop Database
- `1997-01-31 09:26:56` # close to RCF 3339, accuracy in seconds.

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

Specify the order of rows in the partition.

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

The time of UTC time zone will be output when outputting.

Aggregate function array_agg's return type .

### This function is used to perform Gap filling within the time window and to fillin the missing values using the "Last Observation Carried Forward" (LOCF) operation.

**Syntax**

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

1. Precedence
2. Grammar
3. Examples
4. Window_frame Clause
5. Join Operation

**Example**

```sql
> CREATE DATABASE oceanic_station;
Query took 0.062 seconds.
```

### Interval type is STRING, which will be resolved to time interval.

**Syntax**

```sql
SHOW DATABASES;
```

```
+-----------------+
| Database        |
+-----------------+
| oceanic_station |
| public          |
+-----------------+
```

### **Function**： Return the Pearson coefficient representing the association between a set of number pairs.

Comparing expressions for inequality

In CnosDB-Cli, the following command can be used to switch database：

```sql
\c dbname
```

```
Public employee \c oceanic_station
oceanic_stage leader
```

### `window_duration` is a STRING, parsed as an interval, specifying the window size of the time window.

**Syntax**

```sql
DROP DATABASE [IF EXISTS] db_name;
```

Removing the database will delete all tables and metadata specified for the database.

**Example**

```sql
DROPP DATABASE oceanic_station;
```

```
Query took 0.030 seconds.
```

### Modify database parameters

**Syntax**

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

**Example**

```sql
ALTER DATABASE oceanic_station SET TTL '30d';
```

### View database parameters

**Syntax**

```sql
DESCRIBE DATABASE dbname;
```

**Example**

```sql
DESCRIBE DATABASE oceanic_station;
```

```
+---+---------+-------+-------+-
| TTL | SHARD | VNODE_DURATION | REPLICA | PRECISION |
+------+---------------+
| 365 Days | 1 365 Days | 1 | NS |
+---------------------------+----+
```

## Copies the value of the non-missing value to the location of the missing value.

### Last Observation Carried Forward (LOCF) is a method for filling in missing values using the most recent observable values. The specific treatment is as follows:

Table can be created using `CREATE TABLE`.

CnosDB supports the creation of regular and external tables.

### **Function**：The function trims a string by removing leading and trailing spaces or by removing characters that match an optional specified string.

**Syntax**

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

   - BIGINT/BIGINT UNSIGNED：DELTA, QUANTILE, NULL
   - DOUBLE：GORILLA,QUANTILE, NULL
   - STRING：SNAPPY,ZSTD,GZIP,BZIP,ZIB,NULL
   - BOOLA：BITPACK, NULL

See[压缩算法详情](/concept_design/compress.md# algorithms) for more about compression algorithms.

**Example**

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

### Common users can access only the tenant information of the current session.

**Syntax**

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

**Example**

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

### Common users can access only the tenant information of the current session.

**Syntax**

```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

**Example**

```sql
DROP TABLE IF EXISTS air;
```

```
Query took 0.033 seconds.
```

### APPROX_PERCENTILE_CONT(x, p) is equivalent to APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, 1, p)&#xA;**Parameter Type**：x. w is numeric type, p is DOUBLE type.

**Syntax**

```sql
SHOW TABLES;
```

**Example**

```sql
SHOW TABLES;
```

```
+--+
| Table |
+---+
| sea |
| air |
| wind |
+---+ +
```

### View table mode

Both external and normal tables can be viewed using this statement.

**Syntax**

```sql
DESCRIBE DATABASE table_name;
```

**Example**

```sql
DESCREIBE TABLE air;
```

```
+-------------+-----------+-------+-------------+
| FIELDNAME   | TYPE      | ISTAG | COMPRESSION |
+-------------+-----------+-------+-------------+
| time        | TIMESTAMP | false | Default     |
| station     | STRING    | true  | Default     |
| visibility  | DOUBLE    | false | Default     |
| temperature | DOUBLE    | false | Default     |
| pressure    | DOUBLE    | false | Default     |
+-------------+-----------+-------+-------------+
```

### **Modify the table**

**Description**

We currently support the revision of the regular table.

1. Add column：to add field,tag columns.
2. Delete column：delete field column. When deleting column leading to the deletion of the last field value of a line, we don't think this line has any value, SELECT will show this line.
3. +08:00 represents the East 8th District

**Syntax**

```sql
Show the result
```

**Example**

```sql
ALTER TABLE air ADD TAG height;
ALTER TABLE air ADD FIELD humidity DOUBLE CODEFAULT);
ALTER TABLE air ALTER humidity SET CODEC (QUANTILE);
ALTER TABLE air DROP humidity;
```

## For regular users, only the part of the table in USAGE_SCHEMA that belongs to the current user tenant will be visible.

Find the most recent non-missing value before the missing value.

If the next non-missing value is encountered, steps 1 and 2 are repeated to copy the value of that non-missing value to the missing value location.

### INSERT

#### Syntax

```sql
INSERT [INTO] tb_name [ ( column_name [, ...]) ] VALUES ( const [, ...]) [, ...] | query; 
```

**Description**

CnosDB requires a time stamp to insert data column and VALUES list must be[常量](#constants).
If the column is not checked, the value is `NULL`.

**Notice**

Time column cannot be `NULL`, Tag, and Field column can be `NULL`.

e.g. `INSERT INTO air (TIME, station, visibility) VALUES(166613280000000000000, NULL, NUL)`

The time stamp is based on RCF3339 standard.

### If the compression algorithm is not specified when creating a table, the system default compression algorithm is used.

Data in the TIME column can be expressed both in time string and in digital type timestamps. Note that

**Example**

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

**Notice**

See [Aggregate Function](#aggregate-function).

Alias Table

### The time represented by the string is considered as the local time zone and will be converted to the timestamp of UTC time zone.

The `VALUES` keywords can be followed by multiple lists, separated by `,`

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

### This schema displays information about the role of the current user under the current tenant.

You can also insert queried data into the table using the `INSERT SELECT` syntax.

**Example**

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

## Query Data

CnosDBSQL is inspired by [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction), We support most of the SQL syntax of DataFusion.

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

## SQL syntax

### SELECT Subsentence

### SELECT \*

Wildcard \* can be used to refer to all columns.

**Example**

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

### Alias

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

**Syntax**

```sql
FROM tb_name [AS] alias_name
```

**Example**

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

### SELECT Limitation

- If SELECT only contains Tags columns, equivalent to SELECT DISTINCT Tag.

  **Example**

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

### LIMIT Clause

**Syntax**

```sql
LIMIT n
```

All records of this schema are visible to the Owner of the current tenant.

**Example**

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

### OFFSET Subsentence

**Syntax**

```sql
OFFSET m
```

Returns the resultset skipping m records, default m=0.

**Example**

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
Alias
OFFSET 0 has the same effect as omitting OFFSET sentences.

**Example**

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

### WITH Subsentence

**Syntax**

```sql
WITH cte AS cte_query_definiton [, ..] query
```

Optional.The WTH sentence contains one or more commonly used expressions CTE (Common Table Expression).
CTE serves as a temporary table in the current operating environment, which you can refer to in subsequent queries.The following rules for use by CTE are：

- The CTE in the same WTH sentence must have a unique name.
- The CTE defined in the WITH sentence is only available for other CTEs in the same WTH sentence as later defined.
  Assume A is the first CTE, B is the second CTE：

**Example**

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

### UNION clause

UNON subsentence is used to merge analysis results of multiple SELECT statements.

**Syntax**

```
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

`UNION` will de-duplicate the merged result set.
`UNION ALL` will retain the same data in the merged result set.
`EXCEPT` will make the difference between the two result sets, return all non-duplicate values not found in the right query from the left query.
`INTERSECT` returns the intersection of the two result sets (that means, all non-duplicate values are returned by both queries).

**Notice**

Each SELECT sentence within UNON must have the same number of columns, the same data type for each column.

**Example**

**UNION ALL**

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

**UNION**

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

**EXCEPT**

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

**INTERSECT**

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

### ORDER BY Clause

Sort results by referenced expression.Default usage ascending (ASC).Sort by adding DESC in descending order after ORDER BY expression.

**Example**

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

## REPLICA：represents the number of replicas of data in the cluster，defaults to 1 (the number of replicas is not larger than the number of distributed data nodes).

Expressions are a combination of symbols and operators, and CnosDB will process the combination to get a single data value.
Simple expression can be a constant, variable, column or number function.
Two or more simple expressions can be connected to complex expressions with an operator.

**Syntax**

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

**Example**

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

### This schema can be used to query information about all tenants in the cluster.

**Syntax**

```sql
expr BEETWEEN expr and expr
```

**Example**

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

The CLUSTER_SCHEMA database belongs to the cluster, only the administrator users have the access to the database.

### `IN` expression

IN Operator determines if there is a value equal to the expression in the list.

**Example**

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

### All records of this schema are visible to the owner of the current tenant.

All records of this schema are visible to all members of the current tenant.

This schema shows the membership information under the tenant.

```sql
CASE
    ( WHEN expression THEN result1 [, ...])
    ELSE result
END;
```

**Example**：

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

### Notice: The schema will only be created when we write in [lineprotocol](./rest_api.md)/[Prometheus remote write](../eco/prometheus#remote-write) successfully.

If a complex expression has multiple operators, the operator priority will determine the operation sequence. The order of implementation may have a clear impact on the value of results.

The priority level of the operator is shown in the table below. The higher level operator is valued before the lower level operator. In the table below, 1 represents the highest level and 8 the lowest level.

| Level | Operator                                                                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | \*(multiply), /(division), % (mode)                                                           |
| 2     | +(positive), -(negative), +(plus), +(string), -(subtry) |
| 3     | =,\&gt=,<=,<\&gt,!=,\&gt,<(comparative operator)                                                                                    |
| 4     | NOT                                                                                                                                                    |
| 5     | ND                                                                                                                                                     |
| 5     | BETWEEN, IN, LIKE, OR                                                                                                                                  |

### Alter Column: alter the column definition. Currently, the compression algorithm for altering columns is supported.

**Syntax**

```sql
SHOW {DATABASES | TABLES | QUERIES}
```

Show all databases, or show all tables, or SQL in progress.

**Example**

```sql
SHOW DATABASES;
```

```
+----------+
| Database |
+----------+
| public   |
+----------+
```

```sql
SHOW TABLES;
```

```
+--+
| Table |
+---+
| sea |
| air |
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

**Syntax**

```sql
SHOW SERIES [ON database_name] FROM table_name [WHERE expr] [order_by_clause] [limit_clause] 
```

**Example**

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

Size

#### SHOW TAG VALUES

**Syntax**

```sql
SHOW TAG VALUES [ON database_name] FROM table_name WITH KEY [<operator> "<tag_key>| [[NOT] IN ("<tag_key1>", . )]] [WHERE expr] [order_by_clause] [limit_clause];
```

Common users can access only the tenant information of the current session.

**Example**

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

### Common users can access only the tenant information of the current session.

**Syntax**

```sql
EXPLIN [ ANALYZE ] [ VERBOSE ] <statement>;
```

**Description**

The `EXPLAIN` statement is only used to show the query implementation plan without executing the query.

`EXPLIN ANALYZE` executes the query and shows the query implementation plan.

`EXPLIN ANALYZE VERBOSE` executes queries and shows a more detailed implementation plan, including the number of lines readed.

**Example**

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

### **Function**：Returns the rank (consecutive rank) of a value relative to all values in the partition.

**Syntax**

```sql
DESCREIBE {DATABASE db_name | TABLE tb_name};
```

Describe the parameters of the database, describing the pattern of the table.

**Example**

```sql
DESCREIBE TABLE air;
```

```
+-------------+-----------+-------+-------------+
| FIELDNAME   | TYPE      | ISTAG | COMPRESSION |
+-------------+-----------+-------+-------------+
| time        | TIMESTAMP | false | Default     |
| station     | STRING    | true  | Default     |
| visibility  | DOUBLE    | false | Default     |
| temperature | DOUBLE    | false | Default     |
| pressure    | DOUBLE    | false | Default     |
+-------------+-----------+-------+-------------+
```

```sql
DESCRIBE DATABASE public;
```

```
+---+---------+-------+-------+-
| TTL | SHARD | VNODE_DURATION | REPLICA | PRECISION |
+------+---------------+
| 365 Days | 1 365 Days | 1 | NS |
+---------------------------+----+
```

[//]: # "## **EXISTS**"

[//]: # "EXISTS conditions test if a row exists in a subquery and return true when a subquery returns at least one line.If NOT is specified, this condition returns true if the subquery returns any line."

[//]: # "Example:"

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

### Join clause

Alias

This schema records the approximate total volume of read traffic when data is written to the DB.

### INNER JOIN

Time Stamp

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

1 ByteThis connection includes all lines in the left table, and if the right table does not match the line, the value of the connection is empty on the right side.

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

Sample DataThe connection includes all lines in the right table, and if the left table does not match the line, the link is empty on the left side.

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

[Data Source](#sample-data) It will display all lines that connect to the left and right and will create empty values where no match exists on either side of the connection.

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

### `1997-01-31 09:26:56`     # Close to RCF3339, replace T by space, and no time zone is specified

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

### HAVING clause

**Syntax**

```sql
group_by_clause 
[ HAVING condition ];
```

In the SELECT query, HAVING subsentence must be close to GROUP BY sentence and appear before ORDER BY sentence (if any).

**HAVING differs from WHERE**

HAVING after GROUP BY sentence allows you to specify filters to control which groups of query results can appear in final results.

WHERE imposes conditions on the selected column before the GROUP BY sentence and HAVING sentence on the group generated by the GROUP BY sentence.

**Example**

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

### This schema shows all permissions on db that have been granted to the specified role under the tenant.

Tenant name

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

```sql
SELECT ...
FROM ...
GROUP BY ROLLUP (column_1,column_2);
```

It is equivalent to the following statement：

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

**Example**

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

**Example**

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

## Aggregate Functions

### General aggregation function

### COUNT

#### Syntax

```
COUNT(x)
```

Instructions

Include DISTINCTs keywords and count results after going to reset them.

> COUNT(\*) and COUNT (bilateral value) are equal, and sql will be rewritten to COUNT(time) if the sql projection contains only `*/lateral value`. External tables do not exist in the database, but an operating system file is accessed as a common database table. Stream

**Parameter Type**：any

**Return Type**：BIGINT

**Example**

```
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

Executing the following command in the shell will generate a local data file named oceanic_station in Line Protocol format.

**Parameter type**：Value type.

**Return Type**：is the same as the parameter type.

**Example**

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

You can also see the executing SQL statements using the 'SHOW QUERIES' statement, which is a wrapper around the QUERIES schema.

**Parameter Type**：Value Type or STRING, or TIMESTAMP.

**Return Type**：is the same as the parameter type.

**Example**

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

Tenant ID

**Parameter Type**：Value Type or STRING, or TIMESTAMP.

**Return Type**：is the same as the parameter type.

**Example**

```
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

Tenant name

**Parameter type**：Value type.

**Return Type**：Value Type.

**Example**

```
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

ID of user which commit the SQL

**Parameter Type**：is arbitrary.

**Return Type** of：parameter type.

**Example**

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

User name

### Statistics aggregator

### VAR | VAR_SAMP

#### Syntax

```
VAR (NUMERICS)
```

This schema shows a real-time snapshot of SQL statements, which is used to monitor SQL jobs in real time.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

In the SELECT query, the HAVING clause must follow the GROUP BY clause and appear before the ORDER BY clause (if any).

**Parameter type**：Value type.

**Return Type**：DOUBLE

**Example**

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

The keyword`FULL JOIN`or`FULL OUTER JOIN`defines a full connection, which is actually the union of LEFT OUTER JOIN and RIGHT OUTER JOIN. It will display all the rows on the left and right of the join, and will generate null values where either side of the join does not match.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

```
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

You can also use INSERT SELECT to insert query data into the table.

**Parameter type**：Value type.

**Return Type**：DOUBLE

**Example**

```
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

### **COVAR | COVAR_SAMP**

#### Syntax

```
COVAR (NUMERICS, NUMERICS)
```

If dropping database, all table data and metadata of the specified database will be removed.

**Parameter type**：Value type.

**Return Type**：DOUBLE

**Example**

```
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

### **COVAR_POP**

#### Syntax

```
COVAR_POPUP_(NUMERICS, NUMERICS)
```

User name

**Parameter type**：Value type.

**Return Type**：DOUBLE

**Example**

```
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

### **CORR**

#### Syntax

```
COR** (NUMERICS, NUMERICS)
```

Whether administrator

**Parameter type**：Value type.

**Return Type**：DOUBLE

**Example**

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

### **APPROX_DISTINCT**

#### Syntax

```
APPROX_DISTINCT(x)
```

PARTITION BY Clause

**Parameter type**：STRING

**Return Type**：BIGINT

**Example**

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

### **APPROX_PERCENTILE_CONT**

#### Syntax

```
APPROX_PERCENTILE_CONT(x, p.  
```

Name of user which commit the SQL

**Parameter type**：x numeric type, p DOUBLE type.

**Return Type**：DOUBLE

**Example**

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

### **APPROX_PERCENTILE_CONT_WITH_WEIGHT**

#### Syntax

```
APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, w, p)  
```

common users:

APPROX_PERCENTILE_CONT(x, p) equivalent to APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, 1, p).
**Parameter Type**：x,w Number Type, p DOUBLE.

**Return Type**：DOUBLE

**Example**

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

### **APPROX_MEDIAN** (NUMERICS)

#### Syntax

```
APPROX_MEDIAN (NUMERICS)
```

This database, which belongs to a Tenant, is automatically created when a tenant is created and is visible to all members under the tenant.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

[//]: # "Nmuber of shards"

[//]: # "**Parameter Type**：Value Type"

[//]: # "**Return Type**"

### **SAMPLE**

#### Syntax

```
SAMPLE(<column_key>, <N>
```

Expression

**Parameter Type**：

- column_key：any type
- N：integer type

**Return Type**：array

**Example**

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

## Function

### **Math functions**

### **abs(x)**

To further study CnosDB, this section will provide sample data for you to download and teach you how to import data into the database. The data sources referenced in the following chapters are all from this sample data.

**Parameter Type**：Value Type

**Return Type**：matches the function parameter type

**Example**

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

WHERE sets conditions on the selected column before the GROUP BY clause, while HAVING clause sets conditions on the group generated by the GROUP BY clause.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

This schema records the approximate total volume of read traffic when data is queried from the DB.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

Therefore, we often use ROLLUP in reports to generate subtotals and totals. The order of columns in ROLLUP is very important.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

CnosDB provides the system to check the status and information of CnosDB clusters. The system schema is a read-only schema. You can query the system schema using the SQL statement.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

Each SELECT clause in the UNION must have the same number of columns, and the corresponding columns have the same data type.

**Parameter Type**：Value Type

**Return Type**：BIGINT

**Example**

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

Timestamp, the keyword TIMESTAMP indicates that the following string constant need to be interpreted as TIMESTAMP type.

**Parameter Type**：Value Type

**Return Type**：BIGINT

**Example**

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

The GROUP BY clause must be after the condition of the WHERE clause and before the ORDER BY clause (if any).

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

Frame is a subset of the current partition, which further subdivides windows in the partition.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

The database contains metadata information about the cluster, such as tenant information and user information.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

CnosDB supports two data inserting methods: one is to use the`INSERT INTO`statement, and the other is to use the HTTP API [write](./rest_api.md) interface to insert Line Protocol format data.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

`EXPLAIN ANALYZE VERBOSE` executes the query and displays a more detailed execution plan, including the number of rows read.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

Stream queries support only `INSERT SELECT` statements, where the FROM clause is the stream table and is inserted into the target table.

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

CnosDB requires that the inserted data column must have a timestamp, and the VALUES list must be a [constant](#constant).
If a column is not selected, the value is`NULL`。

**Parameter Type**：Value Type

**Return Type**：DOUBLE

**Example**

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

If you use the database through [HTTP API](./rest_api.md), you can specify the parameter db=database_ name in the url to use the database.

**Parameter Type**：Value Type

**Return Type**：BIGINT

**Example**

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

Contain the DISTINCT keyword, which counts the results after deduplication.

**Parameter Type**：Value Type

**Return Type**：BIGINT

**Example**

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

A stream query statement is triggered when data is written.

**Parameter Type**：Value Type

**Return Type**：matches the function parameter type

**Example**

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

When data is written to the source table, the streaming query is triggered.

**Parameter Type**：Value Type

The database belongs to a tenant. When a tenant is created, the database is automatically created and visible to all members under the tenant.

**Example**

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

**Example**

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

**Example**

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

You can also use the keyword AS to alias the table.

**Return Type**：expr1 or NULL

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

If you GRUOP BY Clause is as follows,

**Return Type**：BINARY

**Parameter type**：STRING

**Example**

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

GROUP BY Clause

**Return Type**：BINARY

**Parameter type**：STRING

**Example**

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

INTERVAL '1 YEAR' is not 365 days or 366 days, but 12-months.
INTERVAL '1 MONTH' is not 30 days or 31 days, but 1-month.

**Return Type**：BINARY

**Parameter type**：STRING

***

### **split_part**

#### Syntax

```
split_part(str, delim, n) 
```

Show all databases or all tables.

**Parameter type**：str,deim type STRING, partNum type BIGINT

**Return Type**：STRING

**Example**

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

This schema records the amount of disk space, in bytes, occupied by each vnode in the cluster.

**Parameter type**：STRING

**Return Type**：BOOLEN

**Example**

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

**Example**

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

Currently, only common tables can be source tables. Field names and field types defined in flow table fields must belong to the source table and be the same as those defined in the source table.

**Parameter type**：expr type STRING,pos,len type BIGINT

**Return Type**：STRING

**Example**

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

The UNION clause is used to combine the analysis results of multiple SELECT statements.

**Parameter Type**：BIGINT

**Return Type**：STRING

**Example**

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

Count the disk storage time

**Parameter type**：STRING

**Return Type**：STRING

**Example**

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

### Similar to ROLLUP, CUBE is an extension of the GROUP BY clause. It allows you to generate subtotals for all combinations of grouping columns specified in the GROUP BY clause.

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

**Example**

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

**Example**

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

HAVING Clause

**Parameter Type**：

interval is STRING type, will be parsed as time interval,

source, origin is the TIMESTAMP type.

**Return Type**：TIMESTAMP

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

**Example**

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

Number of replica

Remarks

todo

| -- station is a Tag column&#xA;SELECT station FROM air; | Linear interpolation is suitable for estimation of continuous variables, such as filling in missing values in time series or interpolating in spatial data. However, the accuracy and applicability of linear interpolation depends on the characteristics of the data and the actual situation. In some cases, the data may have non-linear relationships, or other interpolation methods may be more suitable. Therefore, before applying linear interpolation, it is necessary to carefully consider the nature of the data and the purpose of the interpolation to ensure that the interpolation results are reasonable and accurate. | Example |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 'd'                                                     | Day                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | '10d'   |
| 'h'                                                     | This schema stores tenant database information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | '10h'   |
| 'm'                                                     | Describe the parameters of the database and the pattern of the table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | '10m'   |
| 's'                                                     | Window functions and aggregate functions cannot be nested in window functions.。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | '10s'   |
| 'ms'                                                    | You can use `CREATE TABLE`  to create tables                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | '10ms'  |

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

Specify the order of rows in the partition.

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
SELECT time_window(time, '3d') FROM test;
```

```
+----------------------------- +
| TIME_WINDOW(test.time,Utf8("3d")) |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {start: 2023-04-23T00:00:00, end: 2023-04-26T00:00:00} |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 2 | {start: 2023-04-23T00:00:00, end: 2023-04-26T00:00:00} | 
 +--------------------------------------------------------------------------+
```

```sql
SELECT time_window(time, '5d', '3d') FROM test;
```

```
+-------------- +
| TIME_WINDOW(test.time,Utf8("5d"), Utf8("3d") |
+-------------+
| {start: 2023-04-23T00:00:00, end: 2023-04-28T00:00:00} |
| {start: 2023-04-20T00:00:00, end: 2023-04-25T00:00:00} |
+-------------+ + 
```

### `INTERVAL '1 YEAR 1 DAY 1 HOUR 1 MINUTE'` One year, one day, one hour, one minute

### Syntax

```
`INTERVAL '1 DAY 1'` One day and one second
```

### `INTERVAL '1 YEAR'` One year(12 months)

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

### This schema shows all available roles (including system and custom roles) under the current tenant.

One or more expressions, which are used to specify a line partition, and if there are no such sentences, the division is composed of all lines

### ORDER BY Clause

Specify the order of lines in partitions

### For more information about the compression algorithm, see the details of the [compression algorithm](./concept_design/compress.md#compression-algorithm).

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

### `1997-01-31T09:26:56.123+08:00` # Standard RCF3339, East 8th District

Include[聚合函数](./sql.md#polymer)

### **ROW_NUMBER**

#### Syntax

```
ROW_NUMBER() OVER([partition_clause] [orderby_clause])
```

**Function**：assigns a unique order number (starting from 1) for each row based on the sequence of lines in the window partition.

**Parameter type**：none

**Return Type**：BIGINT

**Example**

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

**Example**

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

**Example**

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

Grammar

**Parameter type**：none

**Return Type**：DOUBLE

**Example**

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

**Example**

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

**Example**

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

**Example**

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

User name

**Parameter Type**：exprs are any of the types,igne_nulls are the BOOLEN type, default is false

**Return Type**：Same as expr.

**Example**

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

Create Database

**Parameter Type**：exprs are any of the types,igne_nulls are the BOOLEN type, default is false

**Return Type**：Same as expr.

**Example**

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

Z represents zero time zone

**Parameter Type**：exprs are of any type, number@@0 BIGINT

**Return Type**：Same as expr.

**Example**

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

## Stream QUERY statements are persisted and are cancelled by [KILL QUERY](#kill-query).

### For non-owner members, only the SQL submitted by the current member is displayed.

In the database, the interpolation is the technology used to process missing values in the data.When missing values exist in the data, these technologies can help us to estimate or speculate these missing values and thus fill the gaps in the data.

### **time_window_gapfill**

time_window_gapfill is similar to time_window, but has the function of filling missing data.Tenant name of the table

time_window_gapfill must be used as a top level expression in a query or a subquery.Data Query

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

It should be noted that LOCF may introduce some deviations, especially when data change dramatically after missing values.-- station is a Tag column, temperature is a Field Namecolumn.
SELECT station, temperature FROM air;

```sql
locf(<expr>
```

Specify the order of rows in the partition.

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

## **Function**：Return expr cast to a timestamp in a optional format.

CnosDB provides a system view to view cluster status and cluster schema information.

There are two special databases that store these views in：

- CLUSER_SCHEMA on Database Cluster
- INFORMATION_SCHEMA Information on Tenants

### PLAYLIST_NOTIFICATION_SHEMA

This database belongs to the entire cluster, which can only be accessed by administrators.

The database contains metadata information on clusters, such as tenant information, user information.

### ENANTS

This view can be used to retrieve all tenant information for the entire cluster.

#### View Definition

| Field                                                          | Data Type | Description                      |
| -------------------------------------------------------------- | --------- | -------------------------------- |
| ENANT_NAME                                | STRING    | Tenant Name                      |
| TREAT_PLAYLIST_TITLE | STRING    | Tenant configuration,json string |

**Example**

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

### USERS

#### View Definition

This view can search for all user information for the entire cluster.

| Field                                                          | Data Type | Description                          |
| -------------------------------------------------------------- | --------- | ------------------------------------ |
| USER_NAME                                 | STRING    | DatabaseName                         |
| IS_ADMIN                                  | BOOLEN    | Whether to be a system administrator |
| USER_OPTION_PLAYLIST | STRING    | User configuration,JSON string       |

**Example**

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

### INFORMATION_SHEMA

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

**Example**

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

**Example**

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

**Example**

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

| Field                          | Data Type | Description |
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

| Field                             | Data Type | Description                                                   |
| --------------------------------- | --------- | ------------------------------------------------------------- |
| ROLE_NAME    | STRING    | Role Name under Tenant                                        |
| ROLE_TYPE    | STRING    | Role Type, Custom Roles or System Roles                       |
| INHERIT_ROLE | STRING    | Custom role name for role inheritance and NULL if system role |

**Example**

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

| Field                               | Data Type | Description                                                                 |
| ----------------------------------- | --------- | --------------------------------------------------------------------------- |
| ENANT_NAME     | STRING    | Name of tenant in the database to which the granted permissions are granted |
| DATABASSE_NAME | STRING    | Name of the database that has been granted permissions                      |
| PRIVILEGE_TYPE | STRING    | Type of permissions granted, READ/WRITE/ALL                                 |
| ROLE_NAME      | STRING    | Name of the role that has been granted permission                           |

**Example**

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

| Field                          | Data Type | Description                   |
| ------------------------------ | --------- | ----------------------------- |
| USER_NAME | STRING    | Username of user under tenant |
| ROLE_NAME | STRING    | Member's role name            |

**Example**

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

### QUERIES

This view shows SQL statements in real time snapshots used to monitor SQL jobs in real time.

All records for this view are visible to the current tenant owner.

For non-Owner members, only display SQL submissions from current members.

#### View Definition

| Field                             | Data Type       | Description                                                                     |
| --------------------------------- | --------------- | ------------------------------------------------------------------------------- |
| QUERY_ID     | STRING          | SQL statement ID                                                                |
| REQUERY_TEXT | STRING          | Content of SQL statements                                                       |
| USER_ID      | STRING          | UserID for submission of SQL                                                    |
| USER_NAME    | STRING          | Name of user who submitted SQL                                                  |
| ENANT_ID     | STRING          | Tenant ID                                                                       |
| ENANT_NAME   | STRING          | Tenant Name                                                                     |
| STATE                             | STRING          | Status of statements in ACCEPTING, DISPATCHING, ANALYZING, OPTMIZING, SCHEDUING |
| DURATION                          | BIGINT UNCIGNED | Time when statements are running                                                |

**Example**

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

Time of writes

**Example**

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

## USAGE_SCHEMA

The database, belonging to a tenant, automatically created the DB when Tenant was created and is visible to all members of the tenant.

For normal users, only the table in USAGE_SCHEMA can be seen as part of the current user's tenant,

For system administrators, see all the tables in USAGE_SCHEMA.

### PLAYLIST_NOTIFICATION_TITLE

This view records the size of the disk space in the cluster of vnode, in Byte.

#### View Definition

Insert One Record

| Field                         | Data Type       | Description                                                                                                                                                                                |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TIME                          | TIMESTAMP       | If a complex expression has more than one operator, operator precedence determines the sequence of operations. The order of execution may have a noticeable effect on the resulting value. |
| DATABASE                      | STRING          | Database vnode belongs to                                                                                                                                                                  |
| NODE_ID  | STRING          | ID of data node                                                                                                                                                                            |
| ENANT                         | STRING          | tenant vnode belongs to                                                                                                                                                                    |
| VNODE_ID | STRING          | ID of Vnode                                                                                                                                                                                |
| VALUE                         | BIGINT UNCIGNED | vnode size                                                                                                                                                                                 |

Insert Multiple Records

| Field                         | Data Type       | Description                                                                                                                                                                                |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TIME                          | TIMESTAMP       | If a complex expression has more than one operator, operator precedence determines the sequence of operations. The order of execution may have a noticeable effect on the resulting value. |
| DATABASE                      | STRING          | Database vnode belongs to                                                                                                                                                                  |
| NODE_ID  | STRING          | ID of data node                                                                                                                                                                            |
| ENANT                         | STRING          | tenant vnode belongs to                                                                                                                                                                    |
| VNODE_ID | STRING          | ID of Vnode                                                                                                                                                                                |
| VALUE                         | BIGINT UNCIGNED | vnode size                                                                                                                                                                                 |

#### Example

Return the series in the specified table.

```sql
`EXPLAIN ANALYZE` executes the query and displays the execution plan of the query.
```

```
+----------------------------+--------+
| time | database | node_id | tenant | vnode_id | value |
+----------------------------------------------------+
| 2023-02-23T03:57:52. 66487 | usage_schema | 1001 | cnosdb | 3 | 0 |
| 2023-02-23T03:57:42. 66642 | usage_schema | 1001 | cnosdb | 3 | 0 |
+---------------------+ +
```

For more information about SHOW QUERIES, you can reference to [SHOW QUERIES](#show-queries).

```sql
Select * from usage_schema.disk_storage order by time desc limit 2;
```

```
+----------------------------+--------------+---------+----------+-------+
| time                       | database     | node_id | vnode_id | value |
+----------------------------+--------------+---------+----------+-------+
| 2023-02-23T06:34:36.578458 | usage_schema | 1001    | 3        | 0     |
| 2023-02-23T06:34:26.577871 | usage_schema | 1001    | 3        | 0     |
+----------------------------+--------------+---------+----------+-------+
```

### DATA_IN

**OFFSET Clause**

#### View Definition

Insert One Record

| Field                        | Data Type       | Description                          |
| ---------------------------- | --------------- | ------------------------------------ |
| TIME                         | TIMESTAMP       | Time of data_in |
| DATABASE                     | STRING          | Database name                        |
| NODE_ID | STRING          | ID of data node                      |
| ENANT                        | STRING          | Tenant name the database belongs to  |
| VALUE                        | BIGINT UNCIGNED | Total size of write traffic          |

Insert Multiple Records

| Field                        | Data Type       | Description                          |
| ---------------------------- | --------------- | ------------------------------------ |
| TIME                         | TIMESTAMP       | Time of data_in |
| DATABASE                     | STRING          | Database name                        |
| NODE_ID | STRING          | ID of data node                      |
| VALUE                        | BIGINT UNCIGNED | Total size of write traffic          |

#### Example

Return the series in the specified table.

```sql
Select * from usage_schema.data_in order by time desc limit 2;
```

```
+-------------------------+-----
| time | database | node_id | tenant | value |
+-------------------------------
| 2023-02-23T06:50:36. 78641 | usage_schema | 1001 | cnosdb | 741552 |
| 2023-02-23T06:50:26. 77544 | usage_schema | 1001 | cnosdb | 7396|
+------------------------------------------+
```

For more information about SHOW QUERIES, you can reference to [SHOW QUERIES](#show-queries).

```sql
Select * from usage_schema.data_in order by time desc limit 2;
```

```
+----------------------------+--------------+---------+--------+
| time                       | database     | node_id | value  |
+----------------------------+--------------+---------+--------+
| 2023-02-23T06:43:46.587023 | usage_schema | 1001    | 662012 |
| 2023-02-23T06:43:36.586154 | usage_schema | 1001    | 660072 |
+----------------------------+--------------+---------+--------+
```

### DATA_OUT

**Mathematical Functions**

#### View Definition

Insert One Record

| Field                        | Data Type       | Description                         |
| ---------------------------- | --------------- | ----------------------------------- |
| TIME                         | TIMESTAMP       | Time of data out                    |
| DATABASE                     | STRING          | Database name                       |
| NODE_ID | STRING          | ID of data node                     |
| ENANT                        | STRING          | Tenant name the database belongs to |
| VALUE                        | BIGINT UNCIGNED | Total size of read traffic          |

The names of the columns need to be different.

| Field                        | Data Type       | Description                |
| ---------------------------- | --------------- | -------------------------- |
| TIME                         | TIMESTAMP       | Time of data out           |
| DATABASE                     | STRING          | Database name              |
| NODE_ID | STRING          | ID of data node            |
| VALUE                        | BIGINT UNCIGNED | Total size of read traffic |

#### Example

```sql
Select * from usage_schema.data_out order by time desc limit 2;
```

```
+----------------------------+--------------+---------+--------+----------+
| time                       | database     | node_id | tenant | value    |
+----------------------------+--------------+---------+--------+----------+
| 2023-02-23T06:51:16.577110 | usage_schema | 1001    | cnosdb | 15156112 |
| 2023-02-23T06:51:06.577132 | usage_schema | 1001    | cnosdb | 15156112 |
+----------------------------+--------------+---------+--------+----------+
```

```sql
Select * from usage_schema.data_out order by time desc limit 2;
```

```
+-----------------------+-
| time | database | node_id | value |
+------------------------------------------------
| 2023-02-23T06:51:46. 76451 | usage_schema | 1001 | 16173128 |
| 2023-02-23T06:51:36. 76904 | usage_schema | 1001 | 16173128 |
+------------------------------------------------------------------+
```

### QUERIES (USAGE_SCHEMA)

This view records how many times users query DB.

#### View Definition

Insert One Record

| Field                        | Data Type       | Description                         |
| ---------------------------- | --------------- | ----------------------------------- |
| TIME                         | TIMESTAMP       | Time of queries                     |
| DATABASE                     | STRING          | Database name                       |
| NODE_ID | STRING          | ID of data node                     |
| ENANT                        | STRING          | Tenant name the database belongs to |
| USER                         | STRING          | DatabaseName                        |
| VALUE                        | BIGINT UNCIGNED | Number of user queries              |

The names of the columns need to be different.

| Field                        | Data Type       | Description            |
| ---------------------------- | --------------- | ---------------------- |
| TIME                         | TIMESTAMP       | Time of queries        |
| DATABASE                     | STRING          | Database name          |
| NODE_ID | STRING          | ID of data node        |
| USER                         | STRING          | DatabaseName           |
| VALUE                        | BIGINT UNCIGNED | Number of user queries |

#### Example

```sql
Select * from usage_schema.queries order by time desc limit 2;
```

```
+--------------------------+
| time | database | node_id | tenant | user | value |
+-----------------------------------------------------------------------------------
| 2023-02-23T06:53:16. 75193 | usage_schema | 1001 | cnosdb | usage | 9 |
| 2023-02-23T06:53:16. 75193 | usage_schema | 1001 | cnosdb | root | 17 |
+--------------------------------------------------+
```

```sql
Select * from usage_schema.queries order by time desc limit 2;
```

```
+----------------------+------------ ---- --+
| time | database | node_id | user | value |
+---------------------------------
| 2023-02-23T06:52:36. 76098 | usage_schema | 1001 | use | 9 |
| 2023-02-23T06:52:36. 76097 | usage_schema | 10001 | root | 17|
+----------------------------- +
```

### WRITES

This view records how many times users write to DB.

Double Precision Floating Point

#### View Definition

Insert One Record

| Field                        | Data Type       | Description                         |
| ---------------------------- | --------------- | ----------------------------------- |
| TIME                         | TIMESTAMP       | Time of writes                      |
| DATABASE                     | STRING          | Database name                       |
| NODE_ID | STRING          | ID of data node                     |
| ENANT                        | STRING          | Tenant name the database belongs to |
| USER                         | STRING          | DatabaseName                        |
| VALUE                        | BIGINT UNCIGNED | Number of times the user wrote      |

The names of the columns need to be different.

| Field                        | Data Type       | Description                    |
| ---------------------------- | --------------- | ------------------------------ |
| TIME                         | TIMESTAMP       | Time of writes                 |
| DATABASE                     | STRING          | Database name                  |
| NODE_ID | STRING          | ID of data node                |
| USER                         | STRING          | DatabaseName                   |
| VALUE                        | BIGINT UNCIGNED | Number of times the user wrote |

#### Example

Return the series in the specified table.

```sql
Select * from usage_schema.writes order by time desc limit 2;
```

```
+----------------------------+----------+---------+--------+------+-------+
| time                       | database | node_id | tenant | user | value |
+----------------------------+----------+---------+--------+------+-------+
| 2023-02-23T07:05:56.549282 | public   | 1001    | cnosdb | root | 2     |
| 2023-02-23T07:05:46.549188 | public   | 1001    | cnosdb | root | 2     |
+----------------------------+----------+---------+--------+------+-------+
```

For more information about SHOW QUERIES, you can reference to [SHOW QUERIES](#show-queries).

```sql
Select * from usage_schema.writes order by time desc limit 2;
```

```
+------------+------------+---+-
| time | database | node_id | user | value |
+------------------------------
| 2023-02-23T07:06:56. 47905 | public | 1001 | root | 2 |
| 2023-02-23T07:06:46. 47673 | public | 1001 | root | 2 |
+---------------- +------+
```

## COUNT(field) Returns the number of non-null values.

### Create Stream Table

Create stream table, a table is required as source, stream table is not supported for ALTER

Name of the system role that the custom role inherits from, or NULL if it is a system role

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

The next offset line of the current line in the`offset FOLLOWING` ROWS mode. The next offset value of the current value in the RANGE mode.

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

The core idea of linear interpolation is to assume that the relationship between the known data points is linear, and then estimate the value of the unknown data points according to the linear relationship between the known data points. Specifically, linear interpolation deduces the ordinates of unknown data points by using the linear rate of change between the ordinates of known data points.

Fluid querying statements are running persistently and unexecuted by [KILL QUERY](#kill-query)

If there are still missing values at the end of the data series, the last non-missing value is copied until all missing values are filled in.

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

## KILL QUERY

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

Query took 0.016 seconds.
