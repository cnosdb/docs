---
title: SQL Reference
order: 5
---

# SQL Reference

## Database

### Data Types

| Type            | Description                     | Size    |
|-----------------|---------------------------------|---------|
| BIGINT          | Integer                         | 8 Bytes |
| BIGINT UNSIGNED | Unsigned Integer                | 8 Bytes |
| BOOLEAN         | Boolean Type                    | 1 Byte  |
| TIMESTAMP       | Time Stamp                      | 8 Bytes |
| STRING          | UTF-8 Encoded String            | -----   |
| DOUBLE          | Double Precision Floating Point | 8 Bytes |

#### Other Data Types

The following data types can't be stored directly, but can appear in SQL expressions.

| Type | Description | Remarks                                         |
|----------|-------------|--------------------------------------------|
| BINARY | Binary data,can be converted to STRING using Cast clause. | The return values of functions sha224, sha256, sha384, sha512 belong to this type. |
| INTERVAL | Time Interval | Required by time addition or subtraction and function data_bin's parameters.                      |
|ARRAY | Array Type | Aggregate function array_agg's return type .                        |

#### Constant

| Type            | Syntax                                | Description                                                                                                             |
|-----------------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| BIGINT          | \[{+\-}\]123                          |                                                                                                                         |     Numeric type                |
| BIGINT UNSIGNED | \[+]123                               | Numeric type                                                                                                            |
| DOUBLE          | 123.45                                | Numerical type, scientific notation is not supported at present.                                                        |
| BOOLEAN         | {true &#124; false &#124; t &#124; f} |                                                                                                                         |
| STRING          | 'abc'                                 | The double quotation mark format is not supported. Two consecutive '' in                                                |
| TIMESTAMP       | TIMESTAMP '1900-01-01T12:00:00Z'      | Timestamp, the keyword TIMESTAMP indicates that the following string constant need to be interpreted as TIMESTAMP type. |
| --              | NULL                                  | Null Value                                                                                                              |

#### TIMESTAMP constant syntax

The time stamp is based on RCF3339 standard.

T represents interval, which can only be replaced by space

Z represents zero time zone

+08:00 represents the East 8th District

as follows：
- `1997-01-31T09:26:56.123Z` # Standard RCF3339, UTC time zone
- `1997-01-31T09:26:56.123+08:00` # Standard RCF3339, East 8th District
- `1997-01-31 09:26:56.123+08:00` # Close to RCF3339, just replace T by space
- `1997-01-31T09:26:56.123` # Close to RCF3339, no time zone is specified, defaults to UTC
- `1997-01-31 09:26:56.123` # Close to RCF3339, replace T by space, and no time zone is specified
- `1997-01-31 09:26:56`     # Close to RCF3339, replace T by space, and no time zone is specified

**Note**：`CAST (BIGINT AS TIMESTAMP)`is a timestamp converted to nanosecond, as follows

```sql
SELECT CAST (1 AS TIMESTAMP);
```
    +-------------------------------+
    | Int64(1)                      |
    +-------------------------------+
    | 1970-01-01T00:00:00.000000001 |
    +-------------------------------+

#### INTERVAL Constant Syntax


**Example：**

1. `INTERVAL '1'` One second
2. `INTERVAL '1 SECONDE'` One second
3. `INTERVAL '1 MILLISECONDS'` One millisecond
4. `INTERVAL '1 MINUTE'` One minute
5. `INTERVAL '0.5 MINUTE'` Half a minute
6. `INTERVAL '1 HOUR'` One hour
7. `INTERVAL '1 DAY'` One day
8. `INTERVAL '1 DAY 1'` One day and one second
9. `INTERVAL '1 WEEK'` One week
10. `INTERVAL '1 MONTH'` One month(30 days)
11. `INTERVAL '0.5 MONTH'` Half a month(15 days)
12. `INTERVAL '1 YEAR'` One year(12 months)
13. `INTERVAL '1 YEAR 1 DAY 1 HOUR 1 MINUTE'` One year, one day, one hour, one minute
14. `INTERVAL '1 DECADES' ` One decade(10 years)

**Notice:**

INTERVAL '1 YEAR' is not 365 days or 366 days, but 12-months.
INTERVAL '1 MONTH' is not 30 days or 31 days, but 1-month.

### Create Database

**Syntax**

```sql
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options];

db_options:
    db_option ...

db_option: {
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```

#### Parameters Description

1. TTL： represents the saving time of the data file, defaults to 365 days, expressed in data with units. It supports day（d），hour（h），minute（m），such as TTL 10d，TTL 50h，TTL 100m.When no unit, the default is day, such as TTL 30.
2. SHARD：represents the number of data partitions，defaults to 1.
3. VNODE_DURATION：represents the time range of data in the shard，defaults to 365 days，and also expressed by data with units.Its data meaning is consistent with the value of TTL.
4. REPLICA：represents the number of replicas of data in the cluster，defaults to 1 (the number of replicas is not larger than the number of distributed data nodes).
5. PRECISION：The timestamp accuracy of the database. ms represents milliseconds, us represents microseconds, ns represents nanoseconds,defaults to ns.

**Example**

```sql
> CREATE DATABASE oceanic_station;
Query took 0.062 seconds.
```

### Show All Databases

**Example**

```sql
SHOW DATABASES;
```
    +-----------------+
    | Database        |
    +-----------------+
    | oceanic_station |
    | public          |
    +-----------------+

### **Use Database**

If you use the database through [HTTP API](./rest_api.md), you can specify the parameter db=database_ name in the url to use the database.

```sql
\c dbname
```
    public ❯ \c oceanic_station
    oceanic_station ❯

###  Drop Database

**Syntax**
```sql
DROP DATABASE [IF EXISTS] db_name;
```
If dropping database, all table data and metadata of the specified database will be removed.

**Example**
```sql
DROP DATABASE oceanic_station;
```
    Query took 0.030 seconds.

### **Alter Database Parameters**

**Syntax**
```sql
ALTER DATABASE db_name [alter_db_options]

alter_db_options:
    SET db_option

db_option: {
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
### **Describe Database Parameters**

**Syntax**
```sql
DESCRIBE DATABASE dbname;
```

**Example**
```sql
DESCRIBE DATABASE oceanic_station;
```

    +----------+-------+----------------+---------+-----------+
    | TTL      | SHARD | VNODE_DURATION | REPLICA | PRECISION |
    +----------+-------+----------------+---------+-----------+
    | 365 Days | 1     | 365 Days       | 1       | NS        |
    +----------+-------+----------------+---------+-----------+


## Table

###  Create Table

You can use `CREATE TABLE`  to create tables

CnosDB supports the creation of common tables and external tables

###  Create Common (TSKV) Table

**Syntax**

```sql
CREATE TABLE [IF NOT EXISTS] tb_name
(field_definition [, field_definition ] ... [, TAGS(tg_name [, tg_name] ...)]);

field_definition:
    column_name data_type [field_codec_type]
    
field_codec_type:
    CODEC(code_type)
```

#### Instructions

1. There is no need to create a timestamp column when creating a table. The system automatically adds a timestamp column named "time".
2. The names of the columns need to be different.
3. If the compression algorithm is not specified when creating a table, the system default compression algorithm is used.
4. At present, the compression algorithms supported by various types are as follows. The first one of each type is the default specified algorithm. NULL means no compression algorithm is used.

  * BIGINT/BIGINT UNSIGNED：DELTA，QUANTILE，NULL
  * DOUBLE：GORILLA，QUANTILE，NULL
  * STRING：SNAPPY，ZSTD，GZIP，BZIP，ZLIB，NULL
  * BOOLEAN：BITPACK，NULL

For more information about the compression algorithm, see the details of the [compression algorithm](./concept_design/compress.md#compression-algorithm).

**Example**

```sql
CREATE TABLE air (
   visibility DOUBLE,
   temperature DOUBLE,
   pressure DOUBLE,
   TAGS(station)
);
```

    Query took 0.033 seconds.

### **Create External Table**

**Syntax**
```sql
-- Column definitions can not be specified for PARQUET files

CREATE EXTERNAL TABLE [ IF NOT EXISTS ] tb_name 
    ( field_definition [, field_definition] ... ) tb_option;

field_definition:
    column_name data_type [ NULL ]

tb_option: {
      STORED AS { PARQUET | JSON | CSV | AVRO }
    | [ WITH HEADER ROW ]
    | [ DELIMITER 'a_single_char' ]
    | [ PARTITIONED BY ( column_name, [, ... ] ) ]
    | LOCATION '/path/to/file'
}
```
#### Instruction

1. External tables do not exist in the database, but an operating system file is accessed as a common database table.
2. The data is read-only and cannot be DML operated or indexed.

#### Parameter Description

1. STORED AS：represents the format in which the file is stored. Currently, PARQUET, JSON, CSV and AVRO formats are supported.
2. WITH HEADER ROW：Effective only in csv file format, representing with csv header.
3. DELIMITER：only effective in csv format, representing the delimiter of column data.
4. PARTITIONED BY：use the column specified when creating the table to partition.
5. LOCATION：represents the location of the associated file

**Example**

```sql
CREATE EXTERNAL TABLE cpu (
     cpu_hz  DECIMAL(10,6) NOT NULL,
     temp  DOUBLE NOT NULL,
     version_num  BIGINT NOT NULL,
     is_old  BOOLEAN NOT NULL,
     weight  DECIMAL(12,7) NOT NULL
)
STORED AS CSV
WITH HEADER ROW
LOCATION 'tests/data/csv/cpu.csv';
```
    Query took 0.031 seconds.

### **Drop Table**

**Syntax**
```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

**Example**

```sql
DROP TABLE IF EXISTS air;
```
    Query took 0.033 seconds.

### **Show Tables of Current Database**

**Syntax**

```sql
SHOW TABLES;
```
    +-------+
    | Table |
    +-------+
    | sea   |
    | air   |
    | wind  |
    +-------+

### Describe Table

You can use `DESCRIBE TABLE` to view the table structure.

**Syntax**

```sql
DESCRIBE DATABASE table_name;
```

**Example**

```sql
DESCRIBE TABLE air;
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

### **Alter Table**

**Explanation** 
At present, we support altering common tables.
1. Add Column: add field and tag columns.
2. Drop Column: drop the field column. When dropping a column results in dropping the last field value of a row, we think that this row has no value, and this row will not be showed in SELECT.
3. Alter Column: alter the column definition. Currently, the compression algorithm for altering columns is supported.

**Syntax**

```sql
ALTER TABLE tb_name alter_table_option;

alter_table_option: {
      ADD TAG col_name
    | ADD FIELD col_name [CODEC(code_type)]
    | ALTER col_name SET CODEC(code_type)
    | DROP col_name
}
```

**Example**
```sql
ALTER TABLE air ADD TAG height;
ALTER TABLE air ADD FIELD humidity DOUBLE CODEC(DEFAULT);
ALTER TABLE air ALTER humidity SET CODEC(QUANTILE);
ALTER TABLE air DROP humidity;
```
[//]: # (```sql)
[//]: # (todo)
[//]: # (!&#40;&#41;)
[//]: # (```)


## INSERT

CnosDB supports two data inserting methods: one is to use the`INSERT INTO`statement, and the other is to use the HTTP API [write](./rest_api.md) interface to insert Line Protocol format data.

This page only shows`INSERT`related syntax

**Syntax**

```sql
INSERT [INTO] tb_name [ ( column_name [, ...] ) ] VALUES (  const [, ...] ) [, ...] | query; 
```

**Explanation**

CnosDB requires that the inserted data column must have a timestamp, and the VALUES list must be a [constant](#constant).
If a column is not selected, the value is`NULL`。

**Note**

The time column cannot be`NULL`，and the Tag column and Field Namecolumn can be `NULL`。

Example`INSERT INTO air (TIME, station, visibility) VALUES(1666132800000000000, NULL, NULL)`

If the VALUES list requires an expression, please use the [INSERT SELECT](./sql.md#insert-query-results--insert-select-) syntax.


###  Insert One Record

Please note that data in the TIME column can be represented by either a time string or a numeric timestamp.

**Example**

```sql
CREATE TABLE air (
    visibility DOUBLE,
    temperature DOUBLE,
    pressure DOUBLE,
    TAGS(station)
);
```
    Query took 0.027 seconds.

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                (1666165200290401000, 'XiaoMaiDao', 56, 69, 77);
```

    +------+
    | rows |
    +------+
    | 1    |
    +------+
    Query took 0.044 seconds.

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 06:40:00', 'XiaoMaiDao', 55, 68, 76);
```
    +------+
    | rows |
    +------+
    | 1    |
    +------+
    Query took 0.032 seconds.

```sql
SELECT * FROM air;
```
    +----------------------------+------------+------------+-------------+-----------+
    | time                       | station    | visibility | temperature | pressure |
    +----------------------------+------------+------------+-------------+-----------+
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
    +----------------------------+------------+------------+-------------+-----------+

**Note：**

The time represented by the string is considered as the local time zone and will be converted to the timestamp of UTC time zone.

The time of UTC time zone will be output when outputting.


### Insert Multiple Records

The keyword VALUES can be followed by multiple lists separated by ’,’.

**Example**

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 05:40:00', 'XiaoMaiDao', 55, 68, 76), 
                ('2022-10-19 04:40:00', 'XiaoMaiDao', 55, 68, 76);
```
    +------+
    | rows |
    +------+
    | 2    |
    +------+
    Query took 0.037 seconds.

```sql
SELECT * FROM air;
```
    +----------------------------+------------+------------+-------------+-----------+
    | time                       | station    | visibility | temperature | pressure |
    +----------------------------+------------+------------+-------------+-----------+
    | 2022-10-18 20:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-18 21:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
    +----------------------------+------------+------------+-------------+-----------+

### Insert Query Results (INSERT SELECT)

You can also use INSERT SELECT to insert query data into the table.

**Example**

```sql
CREATE TABLE air_visibility (
                              visibility DOUBLE,
                              TAGS(station)
);
```
    Query took 0.027 seconds.

```sql
INSERT air_visibility (TIME, station, visibility)
SELECT TIME, station, visibility FROM air;
```
    +------+
    | rows |
    +------+
    | 4    |
    +------+
    Query took 0.045 seconds.

```sql
SELECT * FROM air_visibility;
```
    +----------------------------+------------+------------+
    | time                       | station    | visibility |
    +----------------------------+------------+------------+
    | 2022-10-18 20:40:00        | XiaoMaiDao | 55         |
    | 2022-10-18 21:40:00        | XiaoMaiDao | 55         |
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         |
    +----------------------------+------------+------------+

## Data Query

CnosDBSQL is inspired by [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction.html)，We support most of the SQL syntax of DataFusion.

**Note**：In order to query more efficiently, the order of each row may not be the same for queries without specified sorting

### Sample Data
To further study CnosDB, this section will provide sample data for you to download and teach you how to import data into the database. The data sources referenced in the following chapters are all from this sample data.

### Download Data

If in cnosdb cli, enter`\q`to exit.

Executing the following command in the shell will generate a local data file named oceanic_station in Line Protocol format.

```shell
curl -o oceanic_station.txt https://dl.cnosdb.com/sample/oceanic_station.txt
```

### Import Data

- **Start the CLI**
    ```shell
    cnosdb-cli
    ```
- **Create the database**
-
```shell
create database oceanic_station;
```
- **Switch to the specified database**

    ```shell
    \c oceanic_station
    ```
- **Import data**

  Execute the \w command, followed by the absolute path of the data file or the working path relative to cnosdb-cli.

  ```shell
  \w oceanic_station.txt
  ```

## **SQL Syntax**

```sql
[ WITH with_query [, ...] ]
SELECT [ ALL | DISTINCT ] select_expression [, ...]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC ] [, ...] ]
    [ OFFSET count ]
    [ LIMIT { count | ALL } ];

-- from_item
-- 1.
    tb_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
-- 2.
    from_item join_type from_item
    { ON join_condition | USING ( join_column [, ...] ) }

-- join_type
    [ INNER ] JOIN
    LEFT [ OUTER ] JOIN
    RIGHT [ OUTER ] JOIN
    FULL [ OUTER ] JOIN
    CROSS JOIN

-- grouping_element
    ()
```
### **SELECT Clause**

### SELECT \*
The wildcard * can be used to refer to all columns.

**Example**

```sql
SELECT * FROM air;
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

### ALL/DISTINCT

**Syntax**
```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...];
```
After the keyword `SELECT`, you can use `DISTINCT`to remove duplicate fields and return only the values after duplicate removal. Using ALL returns all duplicate values in the field. When this option is not specified, the default value is `ALL`。

**Example**
```sql
SELECT DISTINCT station, visibility FROM air;
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

```sql
SELECT station, visibility FROM air;
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


### Alias

You can use the keyword `AS` to alias a column expression or table.

### Alias Column Expression

**Syntax**
```sql
expression [ [ AS ] column_alias ]
```

**Example**
```sql
SELECT station s, visibility AS v FROM air;
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

### Alias Table
You can also use the keyword AS to alias the table.

**Syntax**
```sql
FROM tb_name [AS] alias_name
```

**Example**

```sql
SELECT a.visibility, s.temperature
FROM air AS a JOIN sea s ON a.temperature = s.temperature limit 10;
```
    +------------+-------------+
    | visibility | temperature |
    +------------+-------------+
    | 67         | 62          |
    | 50         | 78          |
    | 50         | 78          |
    | 65         | 79          |
    +------------+-------------+

### SELECT Limitation

- If the SELECT clause contains a Time column, it must contain at least one Field Namecolumn.

  **Example**
  ```sql
  -- Only the time column cannot be queried
  SELECT time FROM air;
  ```
  ERROR：

      "{\"error_code\":\"0100000\",\"error_message\":\"Error executiong query: Failed to do execute statement, err:Failed to do physical plan. err: External error: Invalid schema: If the projection contains the time column, it must contain the field column.\"}"

  <br>

  ```sql
  -- temperature is a field column，time column accompanied by at least one field can be queried.
  SELECT time, temperature FROM air;
  ```
      +---------------------+-------------+
      | time                | temperature |
      +---------------------+-------------+
      | 2022-01-28T13:21:00 | 69          |
      | 2022-01-28T13:24:00 | 78          |
      | 2022-01-28T13:27:00 | 62          |
      | 2022-01-28T13:30:00 | 79          |
      | 2022-01-28T13:33:00 | 53          |
      | 2022-01-28T13:36:00 | 72          |
      | 2022-01-28T13:39:00 | 71          |
      | 2022-01-28T13:21:00 | 69          |
      | 2022-01-28T13:24:00 | 80          |
      | 2022-01-28T13:27:00 | 74          |
      | 2022-01-28T13:30:00 | 70          |
      | 2022-01-28T13:33:00 | 70          |
      | 2022-01-28T13:36:00 | 70          |
      +---------------------+-------------+

- If the SELECT clause contains only the Tag column, it is equivalent to the SELECT DISTINCT Tag column.

  **Example**
  ```sql
  -- station is a Tag column，temperature is a Field Namecolumn.
  SELECT station, temperature FROM air;
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

   ```sql
  -- station is a Tag column
  SELECT station FROM air;
  ``` 
      +-------------+
      | station     |
      +-------------+
      | XiaoMaiDao  |
      | LianYunGang |
      +-------------+ 

###  LIMIT Clause

**Syntax**

```sql
LIMIT n
```
Limit the number of rows returned from the result set to n, and n must be non-negative.

**Example**
```sql
SELECT *
FROM air LIMIT 10;
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

### **OFFSET Clause**

**Syntax**
```sql
OFFSET m
```

The returned result set skips m records. default m=0.

**Example**
```sql
SELECT *
FROM air OFFSET 10;
```
    +---------------------+-------------+------------+-------------+----------+
    | time                | station     | visibility | temperature | pressure |
    +---------------------+-------------+------------+-------------+----------+
    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
    +---------------------+-------------+------------+-------------+----------+

`OFFSET`can be used with the`LIMIT`statement to specify the number of lines to skip.The format is `LIMIT n OFFSET m`，or it can be abbreviated as LIMIT n, m. LIMIT n controls the output of n rows of data, and OFFSET m indicates the number of rows skipped before starting to return data. OFFSET 0 has the same effect as omitting the OFFSET clause.

**Example**

```sql
SELECT *
FROM air LIMIT 3 OFFSET 3;
```
    +---------------------+------------+------------+-------------+----------+
    | time                | station    | visibility | temperature | pressure |
    +---------------------+------------+------------+-------------+----------+
    | 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       |
    | 2022-01-28 13:33:00 | XiaoMaiDao | 53         | 53          | 68       |
    | 2022-01-28 13:36:00 | XiaoMaiDao | 74         | 72          | 68       |
    +---------------------+------------+------------+-------------+----------+

### **WITH Clause**

**Syntax**

```sql
WITH cte AS cte_query_definiton [, ...] query
```

Optional. The WITH clause contains one or more commonly used expressions CTE (Common Table Expression). CTE acts as a temporary table in the current running environment, which you can refer to in subsequent queries.The rules for using CTE are as follows：
- CTE in the same WITH clause must have a unique name.
- The CTE defined in the WITH clause can only be used for other CTEs in the same WITH clause defined later. Suppose A is the first CTE in the clause and B is the second CTE in the clause：

**Example**

```sql
SELECT station, avg 
FROM (  SELECT station, AVG(visibility) AS avg 
        FROM air 
        GROUP BY station) AS x;
```
    +-------------+--------------------+
    | station     | avg                |
    +-------------+--------------------+
    | XiaoMaiDao  | 62.285714285714285 |
    | LianYunGang | 70.33333333333333  |
    +-------------+--------------------+

```sql
WITH x AS 
    (SELECT station, AVG(visibility) AS avg FROM air GROUP BY station)
SELECT station, avg
FROM x;
```
    +-------------+--------------------+
    | station     | avg                |
    +-------------+--------------------+
    | XiaoMaiDao  | 62.285714285714285 |
    | LianYunGang | 70.33333333333333  |
    +-------------+--------------------+


### **UNION Clause**

The UNION clause is used to combine the analysis results of multiple SELECT statements.

**Syntax**

```sql
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

`UNION`will de-duplicate the merged result set.
`UNION ALL`will retain the same data in the merged result set.
`EXCEPT` will make the difference between the two result sets, return all non-duplicate values not found in the right query from the left query.
`INTERSECT` returns the intersection of the two result sets (that means, all non-duplicate values are returned by both queries).

**Note**

Each SELECT clause in the UNION must have the same number of columns, and the corresponding columns have the same data type.

**Examples**

- **UNION ALL**
  ```sql
  SELECT visibility FROM air WHERE temperature < 60
  UNION ALL
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```
      +------------+
      | visibility |
      +------------+
      | 53         |
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 53         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      +------------+

- **UNION**

  ```sql
  SELECT visibility FROM air WHERE temperature < 60
  UNION
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```
      +------------+
      | visibility |
      +------------+
      | 53         |
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      | 59         |
      +------------+
- **EXCEPT**

  ```sql
  SELECT visibility FROM air
  EXCEPT
  SELECT visibility FROM air WHERE temperature < 50 LIMIT 10;
  ```
      +------------+
      | visibility |
      +------------+
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 53         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      | 59         |
      +------------+

- **INTERSECT**

  ```sql
  SELECT visibility FROM air
  INTERSECT
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```
      +------------+
      | visibility |
      +------------+
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 53         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      | 59         |
      +------------+

### ORDER BY Clause

Sort the results by the referenced expression. Ascending (ASC) is used by default. Sort in descending order by adding DESC after the expression of ORDER BY.

**Example**

```sql
SELECT * FROM air ORDER BY temperature;
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


```sql
SELECT * FROM air ORDER BY temperature DESC;
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

```sql
SELECT * FROM air ORDER BY station, temperature;
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

## Expression

An expression is a kind of combination of symbols and operators that CnosDB will process to obtain a single data value.
A simple expression can be a constant, variable, column, or scalar function.
Complex expressions can be formed by concatenating two or more simple expressions with operators.

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

#### Constant

A symbol representing a single specific data value.
You can refer to [constant](#constant).

**Example**

```sql
select 1;
```
    +----------+
    | Int64(1) |
    +----------+
    | 1        |
    +----------+

#### Functions

You can refer to [function](#functions).

#### Unary Operator

| Operator    | Description                                                                                                                     |
|-------------|---------------------------------------------------------------------------------------------------------------------------------|
| NOT         | If the subexpression is true, the whole expression is false, and if the whole expression is false, the whole expression is true |
| IS NULL     | If the subexpression is null, the whole expression is true                                                                      |
| IS NOT NULL | If the subexpression is null, the whole expression is false                                                                     |

#### Binary Operator

Binary operators and two expressions are combined to form a new expression.

Binary operators supported now:

| Operator     | Description                                                                                                 |
|--------------|-------------------------------------------------------------------------------------------------------------|
| +            | Numeric type expressions add                                                                                |
| -            | Number type expressions are subtracted                                                                      |
| *            | Number type expressions multiply                                                                            |
| /            | Number type expressions divide                                                                              |
| %            | Integer type expressions are modulo                                                                         |
| &#124;&#124; | String type expression concatenation                                                                        |
| =            | Comparing expressions for equality                                                                          |
| !=、 <>       | Comparing expressions for inequality                                                                        |
| <            | Compare expressions to see if they are less than                                                            |
| <=           | Comparing expressions to see if they are less than or equal to                                              |
| &gt;         | Compare expressions for greater than                                                                        |
| >=           | Compares expressions for greater than or equal to                                                           |
| AND          | Evaluate the left expression first, and if it's true, evaluate the right expression, both true and true     | 
| OR           | First evaluate the left expression, and if it is false, evaluate the right expression, both false and false |
| LIKE         | Determines whether the left expression matches the pattern of the right expression                          |

### `BETWEEN AND` Expression

**Syntax**

```sql
expr BETWEEN expr AND expr
```

**Example**
```sql
SELECT DISTINCT PRESSURE FROM AIR WHERE PRESSURE BETWEEN 50 AND 60;
```
    +----------+
    | pressure |
    +----------+
    | 52       |
    | 54       |
    | 57       |
    | 50       |
    | 60       |
    | 51       |
    | 56       |
    | 58       |
    | 59       |
    | 53       |
    | 55       |
    +----------+

Note: `BETWEEN x AND y` lists the numbers between x and y, including x and y

### `IN` 表达式

The IN operator determines whether any value in the list is equal to the expression.

**Example**

```sql
SELECT station, temperature, visibility FROM air WHERE temperature  IN (68, 69);
```
    +-------------+-------------+------------+
    | station     | temperature | visibility |
    +-------------+-------------+------------+
    | XiaoMaiDao  | 69          | 56         |
    | LianYunGang | 69          | 78         |
    +-------------+-------------+------------+

**Note**：

IN only supports a list of constants, not a list of expressions.

### `CASE WHEN` Expression

The `CASE WHEN` expression is used when the expression needs different values depending on the situation.

**Syntax**
```sql
CASE
    ( WHEN expression THEN result1 [, ...] )
    ELSE result
END;
```

**Example**

```sql
SELECT DISTINCT 
    CASE WHEN PRESSURE >= 60 THEN 50 
         ELSE PRESSURE 
    END PRESSURE 
FROM AIR;
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

### Window Functions

You can refer to [Window Functions](#window-functions)

### Aggregate Functions

You can refer to [Aggregate Functions](#aggregate-function)

### Operator Precedence

If a complex expression has more than one operator, operator precedence determines the sequence of operations. The order of execution may have a noticeable effect on the resulting value.

The precedence levels of the operators are given in the following table. Operators at higher levels are evaluated before operators at lower levels. In the following table, 1 represents the highest level and 8 represents the lowest level.


| Precedence | Operator                                                    |
|------------|-------------------------------------------------------------|
| 1          | *（plus）、/（division）、%（modular）                              |
| 2          | + (positive), - (negative), + (plus), + (series), - (minus) |
| 3          | =、>=、<=、<>、!=、>、<（Comparison operator)                      |
| 4          | NOT                                                         |
| 5          | AND                                                         |
| 6          | BETWEEN、IN、LIKE、OR                                          |


### **SHOW**

**Syntax**

```sql
SHOW {DATABASES | TABLES}
```
Show all databases or all tables.

**Example**

```sql
SHOW DATABASES;
```
    +----------+
    | Database |
    +----------+
    | public   |
    +----------+

```sql
SHOW TABLES;
```
    +-------+
    | Table |
    +-------+
    | sea   |
    | air   |
    | wind  |
    +-------+

```sql
SHOW QUERIES;
```
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+

For more information about SHOW QUERIES, you can reference to [SHOW QUERIES](#show-queries).


#### SHOW SERIES

Return the series in the specified table.

**Syntax**

```sql
SHOW SERIES [ON database_name] FROM table_name [WHERE expr] [order_by_clause] [limit_clause] 
```

**Example**

```sql
SHOW SERIES FROM air WHERE station = 'XiaoMaiDao' ORDER BY key LIMIT 1;
```
    +------------------------+
    | key                    |
    +------------------------+
    | air,station=XiaoMaiDao |
    +------------------------+

**Notice**

The expression column in the WEHER clause can only be the tag column or the time column, and the expression in the ORDER BY clause can only be the key.

#### SHOW TAG VALUES

**Syntax**

```sql
SHOW TAG VALUES [ON database_name] FROM table_name WITH KEY [<operator> "<tag_key>" | [[NOT] IN ("<tag_key1>", ..)]] [WHERE expr] [order_by_clause] [limit_clause];
```
operator include `=`, `!=`.

**Example**

```sql
SHOW TAG VALUES FROM air WITH KEY = "station" WHERE station = 'XiaoMaiDao' ORDER BY key, value LIMIT 1;
```
    +---------+------------+
    | key     | value      |
    +---------+------------+
    | station | XiaoMaiDao |
    +---------+------------+

```sql
SHOW TAG VALUES FROM air WITH KEY NOT IN ("station1");
```
    +---------+-------------+
    | key     | value       |
    +---------+-------------+
    | station | XiaoMaiDao  |
    | station | LianYunGang |
    +---------+-------------+

### **EXPLAIN**

**Syntax**

```sql
EXPLAIN [ ANALYZE ] [ VERBOSE ] <statement>;
```
**Explanation**

`EXPLAIN` is only used to display the execution plan of a query, and does not execute the query.

`EXPLAIN ANALYZE` executes the query and displays the execution plan of the query.

`EXPLAIN ANALYZE VERBOSE` executes the query and displays a more detailed execution plan, including the number of rows read.

**Example**
```sql
EXPLAIN SELECT station, temperature, visibility FROM air;
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

```sql
EXPLAIN ANALYZE SELECT station, temperature, visibility FROM air;
```
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | plan_type         | plan                                                                                                                                                                                                                                                                                                                                    |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Plan with Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=20.375µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                   |
    |                   |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=15.929624ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_series_scan=1.698791ms, elapsed_point_to_record_batch=4.572954ms, elapsed_field_scan=5.119076ms] |
    |                   |                                                                                                                                                                                                                                                                                                                                         |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

```sql
EXPLAIN ANALYZE SELECT station, temperature, visibility FROM air;
```
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | plan_type         | plan                                                                                                                                                                                                                                                                                                                                    |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Plan with Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=20.375µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                   |
    |                   |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=15.929624ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_series_scan=1.698791ms, elapsed_point_to_record_batch=4.572954ms, elapsed_field_scan=5.119076ms] |
    |                   |                                                                                                                                                                                                                                                                                                                                         |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

```sql
EXPLAIN ANALYZE VERBOSE SELECT station, temperature, visibility FROM air;
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

### **DESCRIBE**

**Syntax**
```sql
DESCRIBE {DATABASE db_name | TABLE tb_name};
```
Describe the parameters of the database and the pattern of the table.

**Example**
```sql
DESCRIBE TABLE air;
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

```sql
DESCRIBE DATABASE public;
```
    +----------+-------+----------------+---------+-----------+
    | TTL      | SHARD | VNODE_DURATION | REPLICA | PRECISION |
    +----------+-------+----------------+---------+-----------+
    | 365 Days | 1     | 365 Days       | 1       | NS        |
    +----------+-------+----------------+---------+-----------+

[//]: # (## **EXISTS**)
[//]: # (EXISTS 条件测试子查询中是否存在行，并在子查询返回至少一个行时返回 true。如果指定 NOT，此条件将在子查询未返回任何行时返回 true。)
[//]: # (Example：)
[//]: # (```sql)
[//]: # (SELECT id  FROM date)
[//]: # (WHERE EXISTS &#40;SELECT 1 FROM shop)
[//]: # (WHERE date.id = shop.id&#41;)
[//]: # (ORDER BY id;)
[//]: # (```)
[//]: # (# **DCL &#40;无&#41;**)
[//]: # (```sql)
[//]: # (DESCRIBE table_name)
[//]: # (```)
[//]: # (TODO SHOW)
[//]: # (# **SHOW**)
[//]: # (## **SHOW VARIABLE**)
[//]: # (```sql)
[//]: # (-- only support show tables)
[//]: # (-- SHOW TABLES is not supported unless information_schema is enabled)
[//]: # (SHOW TABLES)
[//]: # (```)
[//]: # (## **SHOW COLUMNS**)
[//]: # ()
[//]: # (```sql)
[//]: # (-- SHOW COLUMNS with WHERE or LIKE is not supported)
[//]: # (-- SHOW COLUMNS is not supported unless information_schema is enabled)
[//]: # (-- treat both FULL and EXTENDED as the same)
[//]: # (SHOW [ EXTENDED ] [ FULL ])
[//]: # ({ COLUMNS | FIELDS })
[//]: # ({ FROM | IN })
[//]: # (table_name)
[//]: # (```)
[//]: # (## **SHOW CREATE TABLE**)
[//]: # (```sql)
[//]: # (SHOW CREATE TABLE table_name)
[//]: # (```)

### **Join Clause**

### Join Operation

CnosDB supports`INNER JOIN`、`LEFT OUTER JOIN`、`RIGHT OUTER JOIN`、`FULL OUTER JOIN`。

`CROSS JOIN`is not supported currently.

### INNER JOIN

The keyword`JOIN`or`INNER JOIN`defines a join that only displays matching rows in two tables.

**Example**

```sql
SELECT * FROM air INNER JOIN sea ON air.temperature = sea.temperature;
```
    +---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
    | time                | station    | visibility | temperature | pressure | time                | station     | temperature |
    +---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
    | 2022-01-28 13:27:00 | XiaoMaiDao | 67         | 62          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |
    | 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |
    | 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |
    | 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |
    +---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+

### LEFT JOIN

Define a left join with the keyword`LEFT JOIN`or`LEFT OUTER JOIN`.This join includes all the rows in the left table. If there are no matching rows in the right table, the right side of the join is null.

**Example**

```sql
SELECT * FROM air LEFT JOIN sea ON air.temperature = sea.temperature;
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

### RIGHT JOIN

Define a right join with the keyword `RIGHT JOIN`or`RIGHT OUTER JOIN`. This join includes all the rows in the right table. If there are no matching rows in the left table, the left side of the join is null.

**Example**

```sql
SELECT * FROM air RIGHT JOIN sea ON air.temperature = sea.temperature;
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

### FULL JOIN

The keyword`FULL JOIN`or`FULL OUTER JOIN`defines a full connection, which is actually the union of LEFT OUTER JOIN and RIGHT OUTER JOIN. It will display all the rows on the left and right of the join, and will generate null values where either side of the join does not match.

**Example**

```sql
SELECT * FROM air FULL JOIN sea ON air.temperature = sea.temperature;
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

[//]: # (### CROSS JOIN)

[//]: # ()
[//]: # (交叉连接产生一个笛卡尔积，它将连接左侧的每一行与连接右侧的每一行相匹配。)

[//]: # ()
[//]: # (```sql)

[//]: # (SELECT * FROM air CROSS JOIN sea;)

[//]: # (```)

[//]: # (    +---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+)

[//]: # (    | time                | station     | visibility | temperature | pressure | time                | station     | temperature |)

[//]: # (    +---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:18:00 | LianYunGang | 62          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:21:00 | LianYunGang | 63          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:24:00 | LianYunGang | 77          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:27:00 | LianYunGang | 54          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:30:00 | LianYunGang | 55          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:33:00 | LianYunGang | 64          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:36:00 | LianYunGang | 56          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:21:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:24:00 | XiaoMaiDao  | 64          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:27:00 | XiaoMaiDao  | 51          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:36:00 | XiaoMaiDao  | 57          |)

[//]: # (    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |)

[//]: # (    +---------------------+-------------+------------+-------------+----------+---------------------+-------------+-------------+)

### GROUP BY Clause

The GROUP BY clause must be after the condition of the WHERE clause and before the ORDER BY clause (if any).

**Example**

```sql
SELECT station, AVG(temperature) 
FROM air 
GROUP BY station;
```
    +-------------+----------------------+
    | station     | AVG(air.temperature) |
    +-------------+----------------------+
    | XiaoMaiDao  | 69.14285714285714    |
    | LianYunGang | 72.16666666666667    |
    +-------------+----------------------+

###  HAVING Clause

**Syntax**

```sql
group_by_clause 
[ HAVING condition ];
```
In the SELECT query, the HAVING clause must follow the GROUP BY clause and appear before the ORDER BY clause (if any).

**Differences between HAVING and WHERE**：

HAVING enables you to specify filter conditions after the GROUP BY clause, so as to control which groups in the query results can appear in the final results.

WHERE sets conditions on the selected column before the GROUP BY clause, while HAVING clause sets conditions on the group generated by the GROUP BY clause.

**Example**

```sql
SELECT station, AVG(temperature)  AS avg_t 
FROM air 
GROUP BY station 
HAVING avg_t > 70;
```
    +-------------+-------------------+
    | station     | avg_t             |
    +-------------+-------------------+
    | LianYunGang | 72.16666666666667 |
    +-------------+-------------------+

## **Complex Grouping Operation**

CnosDB provides `ROLLUP`，`CUBE`and other complex grouping operations, enabling you to operate query results in different ways.

[//]: # (### **GROUPING SETS**)
[//]: # (GROUPING SETS 是可以将行分组在一起的一组或一组列。)
[//]: # (您可以简单地使用 GROUPING SETS，而不是编写多个查询并将结果与 UNION 组合。)
[//]: # (CnosDB 中的 GROUPING SETS 可以被认为是 GROUP BY 子句的扩展。 它允许您在同一查询中定义多个分组集。)
[//]: # (让我们看看如下用例，看它如何等同于具有多个 UNION ALL 子句的 GROUP BY。)
[//]: # (```sql)
[//]: # (SELECT * FROM shipping;)
[//]: # (--  origin_state | origin_zip | destination_state | destination_zip | package_weight)
[//]: # (-- --------------+------------+-------------------+-----------------+----------------)
[//]: # (--  California   |      94131 | New Jersey        |            8648 |             13)
[//]: # (--  California   |      94131 | New Jersey        |            8540 |             42)
[//]: # (--  New Jersey   |       7081 | Connecticut       |            6708 |            225)
[//]: # (--  California   |      90210 | Connecticut       |            6927 |           1337)
[//]: # (--  California   |      94131 | Colorado          |           80302 |              5)
[//]: # (--  New York     |      10002 | New Jersey        |            8540 |              3)
[//]: # (-- &#40;6 rows&#41;)
[//]: # (```)
[//]: # (如下查询演示了GROUPING SETS的语义)
[//]: # (```sql)
[//]: # (SELECT origin_state, origin_zip, destination_state, sum&#40;package_weight&#41;)
[//]: # (FROM shipping)
[//]: # (GROUP BY GROUPING SETS &#40; &#40;origin_state&#41;,)
[//]: # (&#40;origin_state, origin_zip&#41;,)
[//]: # (&#40;destination_state&#41;&#41;;)
[//]: # (--  origin_state | origin_zip | destination_state | _col0)
[//]: # (--  --------------+------------+-------------------+-------)
[//]: # (--   New Jersey   | NULL       | NULL              |   225)
[//]: # (--   California   | NULL       | NULL              |  1397)
[//]: # (--   New York     | NULL       | NULL              |     3)
[//]: # (--   California   |      90210 | NULL              |  1337)
[//]: # (--   California   |      94131 | NULL              |    60)
[//]: # (--   New Jersey   |       7081 | NULL              |   225)
[//]: # (--   New York     |      10002 | NULL              |     3)
[//]: # (--   NULL         | NULL       | Colorado          |     5)
[//]: # (--   NULL         | NULL       | New Jersey        |    58)
[//]: # (--   NULL         | NULL       | Connecticut       |  1562)
[//]: # (--  &#40;10 rows&#41;)
[//]: # (```)
[//]: # (上述查询等价于)
[//]: # (```sql)
[//]: # (SELECT origin_state, NULL, NULL, sum&#40;package_weight&#41;)
[//]: # (FROM shipping GROUP BY origin_state)
[//]: # (UNION ALL)
[//]: # (SELECT origin_state, origin_zip, NULL, sum&#40;package_weight&#41;)
[//]: # (FROM shipping GROUP BY origin_state, origin_zip)
[//]: # (UNION ALL)
[//]: # (SELECT NULL, NULL, destination_state, sum&#40;package_weight&#41;)
[//]: # (FROM shipping GROUP BY destination_state;)
[//]: # (```)

### **ROLLUP**

[//]: # (与 GROUPING SETS 类似，)
You can use the ROLLUP option in a single query to generate multiple group sets.

ROLLUP assumes a hierarchy between input columns.

If you GRUOP BY Clause is as follows,

**Syntax**

```sql
SELECT ...
FROM ...
GROUP BY ROLLUP(column_1,column_2);
```

t is equivalent to the following statement.

**Syntax**

```sql
SELECT ...
FROM ...


UNION ALL

SELECT ...
FROM ...
GROUP BY
column_1

UNION ALL

SELECT ...
FROM ...
GROUP BY
column_1, column2;
```

[//]: # (GROUP BY GROUPING SETS&#40;)
[//]: # (    &#40;column_1, column_2&#41;,)
[//]: # (    &#40;column_1&#41;,)
[//]: # (    &#40;&#41;)
[//]: # (&#41;)

ROLLUP generates all grouping sets that are meaningful in this hierarchy. Whenever the value of column_1 changes，it will generate a subtotal line；

Therefore, we often use ROLLUP in reports to generate subtotals and totals. The order of columns in ROLLUP is very important.

**Example**

```sql
SELECT station, visibility, avg(temperature) 
FROM air 
GROUP BY ROLLUP (station, visibility);
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

### **CUBE**
Similar to ROLLUP, CUBE is an extension of the GROUP BY clause. It allows you to generate subtotals for all combinations of grouping columns specified in the GROUP BY clause.

[//]: # (CUBE 就像结合了 GROUPING SETS 和 ROLLUP。)
CUBE creates a grouping set for each possible combination of the specified expression set. First, GROUP BY (A, B, C), then (A, B), (A, C), (A), (B, C), (B), (C), and finally GROUP BY the entire table.

**Syntax**

```sql
SELECT ... 
FROM ...
GROUP BY CUBE (column1, column2);
```

Equivalent to

```sql
SELECT ...
FROM ...
GROUP BY column1

UNION ALL

SELECT ...
FROM ...
GROUP BY column2

UNION ALL

SELECT ...
FROM ...
GROUP BY column1, column2

UNION ALL

SELECT ...
FROM ...
;
```

**Example**
```sql
SELECT station, visibility, avg(temperature) 
FROM air 
GROUP BY CUBE (station, visibility);
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


[//]: # (### **GROUPING**)
[//]: # (    GROUPING&#40;column_expression&#41;)
[//]: # (**说明**：GROUPING函数只能用于有GROUP BY 子句的表达式)
[//]: # (当指定`GROUP BY`时，只能在 SELECT 列表、HAVING 和 ORDER BY 子句中使用 GROUPING。)
[//]: # (**参数**： 只能是GROUP BY 子句中的表达式)
[//]: # (```sql)
[//]: # (SELECT origin_state,)
[//]: # (origin_zip,)
[//]: # (destination_state,)
[//]: # (sum&#40;package_weight&#41;,)
[//]: # (grouping&#40;origin_state, origin_zip, destination_state&#41;)
[//]: # (FROM shipping)
[//]: # (GROUP BY GROUPING SETS &#40;)
[//]: # (    &#40;origin_state&#41;,)
[//]: # (    &#40;origin_state, origin_zip&#41;,)
[//]: # (    &#40;destination_state&#41;)
[//]: # (&#41;;)
[//]: # (-- origin_state | origin_zip | destination_state | _col3 | _col4)
[//]: # (-- --------------+------------+-------------------+-------+-------)
[//]: # (-- California   | NULL       | NULL              |  1397 |     3)
[//]: # (-- New Jersey   | NULL       | NULL              |   225 |     3)
[//]: # (-- New York     | NULL       | NULL              |     3 |     3)
[//]: # (-- California   |      94131 | NULL              |    60 |     1)
[//]: # (-- New Jersey   |       7081 | NULL              |   225 |     1)
[//]: # (-- California   |      90210 | NULL              |  1337 |     1)
[//]: # (-- New York     |      10002 | NULL              |     3 |     1)
[//]: # (-- NULL         | NULL       | New Jersey        |    58 |     6)
[//]: # (-- NULL         | NULL       | Connecticut       |  1562 |     6)
[//]: # (-- NULL         | NULL       | Colorado          |     5 |     6)
[//]: # (-- &#40;10 rows&#41;)
[//]: # (```)
[//]: # (**注意**： GROUPING 用于区分 ROLLUP、CUBE 或 GROUPING SETS 返回的空值与标准空值。)
[//]: # (作为 ROLLUP、CUBE 或 GROUPING SETS 操作的结果返回的 NULL 是 NULL 的一种特殊用途。)
[//]: # (这充当结果集中的列占位符，表示全部。)

## Aggregate Function

### **Common Aggregate Functions**

### **COUNT**

**Syntax**

    COUNT(x)

**Function**： Return the number of rows retrieved in the selected element.

Contain the DISTINCT keyword, which counts the results after deduplication.

**Parameter Type**：any type

**Return Type**：BIGINT

**Example**

```sql
SELECT COUNT(*) FROM air;
```
    +-----------------+
    | COUNT(UInt8(1)) |
    +-----------------+
    | 13              |
    +-----------------+

```sql
SELECT COUNT(temperature) FROM air;
```
    +------------------------+
    | COUNT(air.temperature) |
    +------------------------+
    | 13                     |
    +------------------------+

```sql
SELECT COUNT(DISTINCT temperature) FROM air;
```
    +---------------------------------+
    | COUNT(DISTINCT air.temperature) |
    +---------------------------------+
    | 10                              |
    +---------------------------------+

----------------

### **SUM**

**Syntax**

    SUM(NUMERICS)

**Function**： Return the sum calculated from the selected element

**Parameter Type**：Numeric type

**Return Type**：Consistent with parameter type.

**Example**

```sql
SELECT SUM(temperature) FROM air;
```
    +----------------------+
    | SUM(air.temperature) |
    +----------------------+
    | 917                  |
    +----------------------+
----------------

### **MIN**

**Syntax**

    MIN(STRING | NUMERICS | TIMESTAMP)

**Function**： Return the minimum value of the selected element.

**Parameter Type**：Numeric type or STRING or TIMESTAMP

**Return Type**：Consistent with parameter type.

**Example**

```sql
 SELECT MIN(time), MIN(station), MIN(temperature) FROM air;
```
    +---------------------+------------------+----------------------+
    | MIN(air.time)       | MIN(air.station) | MIN(air.temperature) |
    +---------------------+------------------+----------------------+
    | 2022-01-28T13:21:00 | LianYunGang      | 53                   |
    +---------------------+------------------+----------------------+

----------------

### **MAX**

**Syntax**

    MAX(STRINGS | NUMERICS | TIMESTAMPS)

**Function**： Return the maximum value in the selected element.

**Parameter Type**：Numeric type or STRING or TIMESTAMP.

**Return Type**：Consistent with parameter type.

**Example**

```sql
SELECT MAX(time), MAX(station), MAX(temperature) FROM air;
```
    +---------------------+------------------+----------------------+
    | MAX(air.time)       | MAX(air.station) | MAX(air.temperature) |
    +---------------------+------------------+----------------------+
    | 2022-01-28T13:39:00 | XiaoMaiDao       | 80                   |
    +---------------------+------------------+----------------------+
----------------

### **AVG**

**Syntax**

    AVG(NUMERICS)

**Function**： Return the average value of the selected element.

**Parameter Type**：Numeric type

**Return Type：**：Numeric type

**Example**

```sql
SELECT AVG(temperature) FROM air;
```
    +----------------------+
    | AVG(air.temperature) |
    +----------------------+
    | 70.53846153846153    |
    +----------------------+
----------------

### **ARRAY_AGG**

**Syntax**

    ARRAY_AGG(expr)

**Function**： Return an array consisting of all the values of the selected element. The element types must be the same.

**Parameter Type**：any type

**Return Type**：Array of parameter type

**Example**

```sql
SELECT ARRAY_AGG(temperature) from air;
```
    +------------------------------------------------------+
    | ARRAYAGG(air.temperature)                            |
    +------------------------------------------------------+
    | [69, 78, 62, 79, 53, 72, 71, 69, 80, 74, 70, 70, 70] |
    +------------------------------------------------------+
**Note**：The aggregate function result cannot be returned in CSV format

----------------

### **Statistical Aggregate Functions**

### **VAR | VAR_SAMP**

**Syntax**

    VAR(NUMERICS)

**Function**： Calculate the variance of a given sample

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT VAR(temperature) FROM air;
```
    +---------------------------+
    | VARIANCE(air.temperature) |
    +---------------------------+
    | 51.43589743589741         |
    +---------------------------+
----------------

### **VAR_POP**

**Syntax**

    VAR_POP(NUMERICS)

**Function**： Calculate the variance of population.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT VAR_POP(temperature) FROM air;
```
    +------------------------------+
    | VARIANCEPOP(air.temperature) |
    +------------------------------+
    | 47.47928994082838            |
    +------------------------------+
----------------

### **STDDEV | STDDEV_SAMP**

**Syntax**

    STDDEV(NUMERICS)

**Function**： Calculate the standard deviation of the sample.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT STDDEV(temperature) FROM air;
```
    +-------------------------+
    | STDDEV(air.temperature) |
    +-------------------------+
    | 7.1718824192744135      |
    +-------------------------+

----------------

### **STDDEV_POP**

**Syntax**

    STDDEV_POP(NUMERICS)
**Function**： Calculate the standard deviation of population.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT STDDEV_POP(temperature) FROM air;
```
    +----------------------------+
    | STDDEVPOP(air.temperature) |
    +----------------------------+
    | 6.890521746633442          |
    +----------------------------+
----------------

### **COVAR | COVAR_SAMP**

**Syntax**

    COVAR(NUMERICS, NUMERICS)

**Function**： Return the covariance of the sample.

**Parameter Type**：Numeric type

**Numeric type**：DOUBLE

**Example**

```sql
SELECT COVAR(temperature, pressure) FROM air;
```
    +------------------------------------------+
    | COVARIANCE(air.temperature,air.pressure) |
    +------------------------------------------+
    | -5.121794871794841                       |
    +------------------------------------------+


----------------


### **COVAR_POP**

**Syntax**

    COVAR_POP(NUMERICS, NUMERICS)

**Function**： Return the overall covariance of number pairs in a group.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT COVAR_POP(temperature, pressure) FROM air;
```
    +---------------------------------------------+
    | COVARIANCEPOP(air.temperature,air.pressure) |
    +---------------------------------------------+
    | -4.727810650887546                          |
    +---------------------------------------------+

----------------

### **CORR**

**Syntax**

    CORR**(NUMERICS, NUMERICS)

**Function**： Return the Pearson coefficient representing the association between a set of number pairs.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT CORR(temperature, pressure) FROM air;
```
    +-------------------------------------------+
    | CORRELATION(air.temperature,air.pressure) |
    +-------------------------------------------+
    | -0.07955796767766017                      |
    +-------------------------------------------+

----------------

## **Approximate Aggregate Functions**

### **APPROX_DISTINCT**

**Syntax**

    APPROX_DISTINCT(x)

**Function**： Return approximations of different input values (HyperLogLog).

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT APPROX_DISTINCT(station) FROM air;
```
    +-----------------------------+
    | APPROXDISTINCT(air.station) |
    +-----------------------------+
    | 2                           |
    +-----------------------------+
----------------

### **APPROX_PERCENTILE_CONT**

**Syntax**

    APPROX_PERCENTILE_CONT(x, p)  

**Function**： Returns the approximate percentile (TDigest) of the input value x, where p is the percentile and is a 64 bit floating point number between 0 and 1 (including 1).

**Parameter Type**：x is numeric type, p is DOUBLE type

**Return Type**：DOUBLE

**Example**

```sql
SELECT APPROX_PERCENTILE_CONT(temperature, 0.1) FROM air;
```
    +----------------------------------------------------+
    | APPROXPERCENTILECONT(air.temperature,Float64(0.1)) |
    +----------------------------------------------------+
    | 60.4                                               |
    +----------------------------------------------------+

----------------

### **APPROX_PERCENTILE_CONT_WITH_WEIGHT**

**Syntax**

    APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, w, p)  

**Function**： x returns the approximate percentage (TDigest) of the weighted input value, where w is the weight column expression and p is a floating point 64 between 0 and 1 inclusive.

APPROX_PERCENTILE_CONT(x, p) is equivalent to APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, 1, p)
**Parameter Type**：x. w is numeric type, p is DOUBLE type.

**Return Type**：DOUBLE

**Example**

```sql
SELECT APPROX_PERCENTILE_CONT_WITH_WEIGHT(temperature,2, 0.1) FROM air;
```
    +-----------------------------------------------------------------------+
    | APPROXPERCENTILECONTWITHWEIGHT(air.temperature,Int64(2),Float64(0.1)) |
    +-----------------------------------------------------------------------+
    | 54.35                                                                 |
    +-----------------------------------------------------------------------+
----------------

### **APPROX_MEDIAN**(NUMERICS)

**Syntax**

    APPROX_MEDIAN(NUMERICS)
**Function**： Return the approximate median of the input value.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT APPROX_MEDIAN(temperature) FROM air;
```
    +-------------------------------+
    | APPROXMEDIAN(air.temperature) |
    +-------------------------------+
    | 70                            |
    +-------------------------------+

[//]: # (----------------)
[//]: # (### **GROUPING**&#40;x&#41;)
[//]: # (    GROUPING&#40;x&#41;)
[//]: # (**功能**： 函数采用单个参数，该参数必须是 GROUP BY 子句的 ROLLUP、CUBE 或 GROUPING SETS 扩展的表达式列表中指定的维度列的表达式。)
[//]: # (**参数类型**：数值类型)
[//]: # (**返回类型** BIGINT)

## Functions

### **Mathematical Functions**

### **abs(x)**

**Function**：Return the absolute value of x.

**Parameter Type**：Numeric type.

**Return Type**：Consistent with function parameter type.

**Example**

```sql
SELECT abs(-1);
```

    +----------------+
    | abs(Int64(-1)) |
    +----------------+
    | 1              |
    +----------------+

----------------

### **acos(x)**

**Function**：Return the arccosine of x.

**Parameter Type**：Numeric type.

**Return Type**：DOUBLE.

**Example**

```sql
SELECT acos(3);
```

    +----------------+
    | acos(Int64(3)) |
    +----------------+
    | NaN            |
    +----------------+

```sql
SELECT acos(0.5);
```

    +--------------------+
    | acos(Float64(0.5)) |
    +--------------------+
    | 1.0471975511965976 |
    +--------------------+

----------------

### **asin(x)**

**Function**:  Return the arcsine of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT asin(0.5);
```
    +--------------------+
    | asin(Float64(0.5)) |
    +--------------------+
    | 0.5235987755982988 |
    +--------------------+

```sql
SELECT asin(5);
```
    +----------------+
    | asin(Int64(5)) |
    +----------------+
    | NaN            |
    +----------------+

----------------

### **atan(x)**

**Function**：Return the arctangent of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT atan(5);
```

    +-------------------+
    | atan(Int64(5))    |
    +-------------------+
    | 1.373400766945016 |
    +-------------------+

----------------

### **atan2(y,x)**

**Function**：Return the arctangent of y/x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT atan2(10, 2);
```

    +---------------------------+
    | atan2(Int64(10),Int64(2)) |
    +---------------------------+
    | 1.3734008                 |
    +---------------------------+

----------------

### **ceil(x)**

**Function**： Round up.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**

```sql
SELECT ceil(1.6);
```
    +--------------------+
    | ceil(Float64(1.6)) |
    +--------------------+
    | 2                  |
    +--------------------+

----------------


### **floor(x)**

**Function**: Round down.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**

```sql
SELECT floor(-3.1);
```
    +----------------------+
    | floor(Float64(-3.1)) |
    +----------------------+
    | -4                   |
    +----------------------+

----------------

### **cos(x)**

**Function**:  Return the cosine of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT cos(1);
```
    +--------------------+
    | cos(Int64(1))      |
    +--------------------+
    | 0.5403023058681398 |
    +--------------------+

--------------------

### **sin(x)**

**Function**:  Return the sine of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT sin(5);
```
    +---------------------+
    | sin(Int64(5))       |
    +---------------------+
    | -0.9589242746631385 |
    +---------------------+
----------------

### **exp(x)**

**Function**: Return e to the x power.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT exp(1);
```
    +-------------------+
    | exp(Int64(1))     |
    +-------------------+
    | 2.718281828459045 |
    +-------------------+

----------------

### **ln(x)**

**Function**:  Natural logarithm.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT ln(2.718281828459045);
```
    +--------------------------------+
    | ln(Float64(2.718281828459045)) |
    +--------------------------------+
    | 1                              |
    +--------------------------------+

----------------



### **log(x) | log10(x)**

**Function**: Base 10 logarithm.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT log(10);
```
    +----------------+
    | log(Int64(10)) |
    +----------------+
    | 1              |
    +----------------+

```sql
SELECT log10(10);
```

    +----------------+
    | log(Int64(10)) |
    +----------------+
    | 1              |
    +----------------+

----------------

### **log2(x)**

**Function**: Base 2 logarithm.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT log2(4);
```

    +----------------+
    | log2(Int64(4)) |
    +----------------+
    | 2              |
    +----------------+
----------------

### **power(x,y) | pow(x,y)**

**Function**: x to the y power.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**

```sql
SELECT power(2, 3);
```
    +--------------------------+
    | power(Int64(2),Int64(3)) |
    +--------------------------+
    | 8                        |
    +--------------------------+
----------------

### **round(x)**

**Function**:  Rounded to the nearest whole number.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**

```sql
SELECT round(3.5);
```
    +---------------------+
    | round(Float64(3.5)) |
    +---------------------+
    | 4                   |
    +---------------------+

----------------

### **signum(x)**

**Function**:  Signs of parameter (-1,0,+1).

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**

```sql
SELECT signum(-3);
```

    +-------------------+
    | signum(Int64(-3)) |
    +-------------------+
    | -1                |
    +-------------------+

----------------

### **sqrt(x)**

**Function**:  Square root of x.

**Parameter Type**：Numeric type

**Return Type**：Consistent with function parameter type.

**Example**

```sql
SELECT sqrt(4);
```
    +----------------+
    | sqrt(Int64(4)) |
    +----------------+
    | 2              |
    +----------------+

----------------

### **tan(x)**

**Function**:   Tangent value of x.

**Parameter Type**：Numeric type

**Return Type**： DOUBLE

**Example**

```sql
SELECT tan(1);
```
    +-------------------+
    | tan(Int64(1))     |
    +-------------------+
    | 1.557407724654902 |
    +-------------------+

----------------

### **trunc(x)**

**Function**：Round to zero.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**

```sql
SELECT trunc(-3.9);
```
    +----------------------+
    | trunc(Float64(-3.9)) |
    +----------------------+
    | -3                   |
    +----------------------+

----------------

### **struct**

**Syntax**

    struct(expr1 [, ...] ) 

**Function**：Create a STRUCT with the specified field value.

**Parameter Type**：Numeric type

**Note**：Function struct is not perfect at present.

--------------------------

### **Conditional Functions**

### **coalesce**

**Syntax**

    coalesce(expr[,...exp])

**Function**：Return its first non null parameter. Null is returned only when all parameters are null. When retrieving data for display, it is often used to replace the default value with a null value.

**Parameter Type**：Any type

**Return Type**：First non null parameter type

**Example**

```sql
SELECT coalesce(temperature, null, station) FROM air;
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
----------------

### **nullif**

**Syntax**

    nullif(expr1, expr2) 

**Function**：If expr1 is equal to expr2, NULL is returned; Otherwise, expr1 is returned.

**Parameter Type**：expr1 and expr2 are numeric expressions with column values

**Return Type**：The type of expr1 or NULL

**Example**

```sql
SELECT nullif(temperature, 70) FROM air;
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

----------------

### **String Functions**

[//]: # (### **Array**)
[//]: # (    创建数组)

### **ascii**

**Syntax**

    ascii(str) 

**Function**:  Convert the first character in str to its ASCII code and return it.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT ascii('abc');
```
    +------------------+
    | ascii(Utf8("a")) |
    +------------------+
    | 97               |
    +------------------+

```sql
SELECT ascii('a');
```

    +------------------+
    | ascii(Utf8("a")) |
    +------------------+
    | 97               |
    +------------------+

----------------

### **bit_length**

**Syntax**

    bit_length(str) 

**Function**：Returns the bit length of string data or the bit size of binary data.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT bit_length('abc');
```
    +------------------------+
    | bitlength(Utf8("abc")) |
    +------------------------+
    | 24                     |
    +------------------------+
----------------

### **btrim**

**Syntax**

    btrim(string [, matching_string ] ) 

**Function**：The function trims a string by removing leading and trailing spaces or by removing characters that match an optional specified string.

**Parameter Type**：STRING

**Return Type**: STRING

**Example**

```sql
SELECT btrim('     abc                  ');
```
    +-------------------------------------------+
    | btrim(Utf8("     abc                  ")) |
    +-------------------------------------------+
    | abc                                       |
    +-------------------------------------------+

```sql
SELECT btrim('111abc111','1');
```
    +------------------------------------+
    | btrim(Utf8("111abc111"),Utf8("1")) |
    +------------------------------------+
    | abc                                |
    +------------------------------------+

----------------

### **trim**

**Syntax**

    trim(str) 

**Function**：Remove blank characters at the begin and end of str.

**Parameter Type**：STRING

**Return Type**：STRING

---------------------

### **char_length | character_length**

**Syntax**

    char_length(expr) 

**Function**：Return the length of the specified string in characters.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT char_length('你好');
```
    +-------------------------------+
    | characterlength(Utf8("你好"))  |
    +-------------------------------+
    | 2                             |
    +-------------------------------+

----------------

### **chr**

**Syntax**

    chr(expr) 

**Function**：Return the character at the provided UTF-16 code.

**Parameter Type**: BIGINT

**Return Type**: STRING

**Example**

```sql
SELECT chr(20005);
```
    +-------------------+
    | chr(Int64(20005)) |
    +-------------------+
    | 严                |
    +-------------------+

----------------

### **con``cat**

**Syntax**

    concat(expr1, expr2 [, ...exp] ) 

**Function**：Joins two or more expressions and returns the generated expression.

**Parameter Type**：STRING

**Return Type**: STRING

**Example**

```sql
SELECT concat('a', 'b', 'c');
```

    +---------------------------------------+
    | concat(Utf8("a"),Utf8("b"),Utf8("c")) |
    +---------------------------------------+
    | abc                                   |
    +---------------------------------------+

----------------

### **concat_ws**

**Syntax**

    concat_ws(sep , expr1 [, ...] ) 

**Function**：Return a concatenated string separated by sep.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**

```sql
SELECT concat_ws(' ', 'a', 'b', 'c');
```
    +--------------------------------------------------------------+
    | concatwithseparator(Utf8(" "),Utf8("a"),Utf8("b"),Utf8("c")) |
    +--------------------------------------------------------------+
    | a b c                                                        |
    +--------------------------------------------------------------+

----------------

### **initcap**

**Syntax**

    initcap(expr) 

**Function**：Capitalize the first letter of each word in the parameter.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT initcap('hello world');
```
    +------------------------------+
    | initcap(Utf8("hello world")) |
    +------------------------------+
    | Hello World                  |
    +------------------------------+

----------------

### **left**

**Syntax**

    left(str, len) 

**Function**：Return the leftmost len characters in str.

**Parameter Type**：str is STRING type, len is BIGINT type

**Return Type**：STRING

**Example**

```sql
SELECT left('abcde', 3);
```
    +------------------------------+
    | left(Utf8("abcde"),Int64(3)) |
    +------------------------------+
    | abc                          |
    +------------------------------+

----------------

### **lpad**

**Syntax**

    lpad(expr, len [, pad] ) 

**Function**：Return expr filled with pad on the left. After filling, the length of the whole string is len.

**Parameter Type**：expr, pad type is STRING, len type is BIGINT

**Return Type**：BIGINT

When len is a negative number, len represents 0. When len is too large, function execution fails.

**Example**

```sql
SELECT lpad('abc', 10, '1');
```
    +---------------------------------------+
    | lpad(Utf8("abc"),Int64(10),Utf8("1")) |
    +---------------------------------------+
    | 1111111abc                            |
    +---------------------------------------+

----------------

### **rpad**

**Syntax**

    rpad(expr, len [, pad] ) 

**Function**：Return expr filled with pad on the right. After filling, the length of the whole string is len.

**Parameter Type**：expr, pad is STRING type, len is BIGINT type.

**Return Type**：STRING

**Example**

```sql
SELECT rpad('aaa', 10, 'b');
```
    +---------------------------------------+
    | rpad(Utf8("aaa"),Int64(10),Utf8("b")) |
    +---------------------------------------+
    | aaabbbbbbb                            |
    +---------------------------------------+

----------------

### **lower**

**Syntax**

    lower(expr) 

**Function**：Return lowercase string.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**

```sql
SELECT lower('ABC');
```

    +--------------------+
    | lower(Utf8("ABC")) |
    +--------------------+
    | abc                |
    +--------------------+
----------------

### **upper**

**Syntax**

    upper(expr)

**Function**：Return uppercase string.

**Parameter Type**：STRING

**Return Type**：STRING

-----------

### **ltrim**

**Syntax**

    ltrim(str[, trimstr] ) 

**Function**：Returns str, in which the leading characters in trimstr are deleted. The default trimestr is blank character.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**

```sql
SELECT ltrim('   abc');
```
    +-----------------------+
    | ltrim(Utf8("   abc")) |
    +-----------------------+
    | abc                   |
    +-----------------------+


----------------

### **md5**

**Syntax**

    md5(expr) 

**Function**：Return the MD5 128 bit checksum of expr as a hexadecimal string.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**

```sql
SELECT md5('abc');
```
    +----------------------------------+
    | md5(Utf8("abc"))                 |
    +----------------------------------+
    | 900150983cd24fb0d6963f7d28e17f72 |
    +----------------------------------+
----------------

### **octet_length**

**Syntax**

    octet_length(expr) 

**Function**：Return the byte length of string data.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT octet_length('你好');
```
    +---------------------------+
    | octetlength(Utf8("你好")) |
    +---------------------------+
    | 6                         |
    +---------------------------+

----------------

### **random**

**Syntax**

    random( [seed] ) 

**Function**：Return a random value between 0 and 1.

**Parameter Type**：None

**Return Type**：DOUBLE

**Example**

```sql
SELECT random();
```
    +---------------------+
    | random()            |
    +---------------------+
    | 0.37577771377596325 |
    +---------------------+

[//]: # (### **Regexp_Replace**)
[//]: # (    regexp_replace&#40;str, regexp, rep [, position] &#41; )
[//]: # (**Function**：将 str 中与 regexp 匹配的所有子字符串都替换为 rep。)
[//]: # (**Parameter Type**：STRING)
[//]: # (**Return Type**：BIGINT)

----------------

### **repeat**

**Syntax**

    repeat(expr, n) 

**Function**：Return a string that repeats expr n times.

**Parameter Type**：Expr type is STRING, n type is BIGINT.

**Return Type**：BIGINT

**Example**

```sql
SELECT repeat('a', 5);
```
    +----------------------------+
    | repeat(Utf8("a"),Int64(5)) |
    +----------------------------+
    | aaaaa                      |
    +----------------------------+

----------------

### **replace**

**Syntax**

    replace(str, search, replace ) 

**Function**：Replace all search items with replace.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT replace('aaa', 'a', 'b');
```
    +------------------------------------------+
    | replace(Utf8("aaa"),Utf8("a"),Utf8("b")) |
    +------------------------------------------+
    | bbb                                      |
    +------------------------------------------+

----------------

### **reverse**

**Syntax**

    reverse(expr) 

**Function**：Return an inverted string or an array containing elements in reverse order.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT reverse('你好');
```
    +-----------------------+
    | reverse(Utf8("你好")) |
    +-----------------------+
    | 好你                  |
    +-----------------------+
----------------

### **right**

**Syntax**

    right(str, len) 

**Function**：Return the rightmost len characters in the string str.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
 SELECT right('aaabbb', 3);
```
    +--------------------------------+
    | right(Utf8("aaabbb"),Int64(3)) |
    +--------------------------------+
    | bbb                            |
    +--------------------------------+


----------------

### **digest**

**Syntax**

    digest(expr, algorithm)

**Function**：Return the rightmost len characters in the string str.

**Parameter Type**：expr and algorithm are both STRING

algorithm specifies the algorithm for computing hash. Only md5, sha224, sha256, sha384, sha512, blake2s, blake2b, blake3 are supported.

**Return Type**：BINARY

**Example**

```sql
SELECT digest('abc', 'md5');
```
    +----------------------------------+
    | digest(Utf8("abc"),Utf8("md5"))  |
    +----------------------------------+
    | 900150983cd24fb0d6963f7d28e17f72 |
    +----------------------------------+

----------------

### **rtrim**

**Syntax**

    rtrim( str [, trimstr] ) 

**Function**：Return the str with the trailing character trimstr deleted. trimstr is a blank character by default.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**

```sql
SELECT rtrim('aaabbb', 'b');
```
    +---------------------------------+
    | rtrim(Utf8("aaabbb"),Utf8("b")) |
    +---------------------------------+
    | aaa                             |
    +---------------------------------+

----------------

### **sha224**

**Syntax**

    sha224(str)

**Function**：Calculate sha224 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

**Example**

```sql
 SELECT sha224('abc');
```
    +----------------------------------------------------------+
    | sha224(Utf8("abc"))                                      |
    +----------------------------------------------------------+
    | 23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7 |
    +----------------------------------------------------------+

----------------

### **sha256**

**Syntax**

    sha256(str)
**Function**:   Calculate sha256 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

**Example**

```sql
SELECT sha256('abc');
```
    +------------------------------------------------------------------+
    | sha256(Utf8("abc"))                                              |
    +------------------------------------------------------------------+
    | ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad |
    +------------------------------------------------------------------+

----------------

### **sha384**

**Syntax**

    sha384(str)
**Function**:  Calculate sha384 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

**Example**

```sql
SELECT sha384('abc');
```
    +--------------------------------------------------------------------------------------------------+
    | sha384(Utf8("abc"))                                                                              |
    +--------------------------------------------------------------------------------------------------+
    | cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7 |
    +--------------------------------------------------------------------------------------------------+

----------------

### **sha512**

**Syntax**

    sha512(str)

**Function**： Calculate sha384 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

----------------

### **split_part**

**Syntax**

    split_part(str, delim, n) 

**Function**： Split str according to delim, and return the nth part.

**Parameter Type**：str, delim type is STRING, partNum type is BIGINT

**Return Type**：STRING

**Example**

```sql
SELECT split_part('abc|def|ghi', '|', 2);
```

    +---------------------------------------------------+
    | splitpart(Utf8("abc|def|ghi"),Utf8("|"),Int64(2)) |
    +---------------------------------------------------+
    | def                                               |
    +---------------------------------------------------+

----------------

### **starts_with**

**Syntax**

    starts_with(expr, startExpr) 

**Function**： If expr starts with startExpr, it returns true.

**Parameter Type**：STRING

**Return Type**：BOOLEAN

**Example**

```sql
SELECT starts_with('abcdefg', 'abc');
```
    +-----------------------------------------+
    | startswith(Utf8("abcdefg"),Utf8("abc")) |
    +-----------------------------------------+
    | true                                    |
    +-----------------------------------------+
----------------

### **strpos**

**Syntax**

    strpos(str, substr ) 

**Function**：Return the position of a substring in a specified string.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**

```sql
SELECT strpos('abcdef', 'def');
```
    +------------------------------------+
    | strpos(Utf8("abcdef"),Utf8("def")) |
    +------------------------------------+
    | 4                                  |
    +------------------------------------+

----------------

### **substr**

**Syntax**

    substr(expr, pos [, len] ) 

**Function**： Return the substring of expr (starting from pos, length len).

**Parameter Type**：expr type is STRING, pos, len type is BIGINT

**Return Type**：STRING

**Example**

```sql
SELECT substr('abcdef', 4, 3);
```
    +------------------------------------------+
    | substr(Utf8("abcdef"),Int64(4),Int64(3)) |
    +------------------------------------------+
    | def                                      |
    +------------------------------------------+
----------------

### **to_hex**

**Syntax**

    to_hex(value)

**Function**： Convert a decimal number to a hexadecimal representation.

**Parameter Type**：BIGINT

**Return Type**：STRING

**Example**

```sql
SELECT to_hex(100);
```
    +-------------------+
    | tohex(Int64(100)) |
    +-------------------+
    | 64                |
    +-------------------+

----------------

### **translate**

**Syntax**

    translate(expr, from, to) 

**Function**： Return an expr, where all characters in from are replaced by characters in to.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**

```sql
SELECT translate('aaabbb', 'bbb', 'ccc');
```
    +---------------------------------------------------+
    | translate(Utf8("aaabbb"),Utf8("bbb"),Utf8("ccc")) |
    +---------------------------------------------------+
    | aaaccc                                            |
    +---------------------------------------------------+


----------------


### Time Functions

### **date_part**

**Syntax**

    date_part(field, expr) 

**Function**：Extract partial dates from timestamps or intervals.

**Parameter Type**：

field type is STRING, only one of （'year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', 'second'）

expr type is TIMESTAMP

**Return Type**：BIGINT

**Example**

```sql
SELECT date_part('hour', TIMESTAMP '2022-11-21T09:18:17');
```
    +----------------------------------------------------+
    | datepart(Utf8("hour"),Utf8("2022-11-21T09:18:17")) |
    +----------------------------------------------------+
    | 9                                                  |
    +----------------------------------------------------+

----------------

### **date_trunc**

**Syntax**

    date_trunc(field, expr) 

**Function**：Return a value truncated to the unit specified in field.

**Parameter Type**：field type is STRING, only one of （'year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', 'second'）

expr type is TIMESTAMP.

**Example**

```sql
SELECT date_trunc('month', TIMESTAMP '2022-11-21T09:18:17');
```
    +------------------------------------------------------+
    | datetrunc(Utf8("month"),Utf8("2022-11-21T09:18:17")) |
    +------------------------------------------------------+
    | 2022-11-01T00:00:00                                  |
    +------------------------------------------------------+
----------------

### **date_bin**

**Syntax**

    date_bin(interval, source, origin)
**Function**： Starting from the origin, the bucket is split by interval, and the bucket timestamp of the source is returned.

**Parameter Type**：

Interval type is STRING, which will be resolved to time interval.

source and origin type are TIMESTAMP.

**Return Type**：TIMESTAMP

**Example**

```sql
SELECT date_bin(INTERVAL '1' DAY, TIMESTAMP '2022-11-21T09:10:24', TIMESTAMP '2022-11-01T00:00:00');
```
    +------------------------------------------------------------------------------------------------+
    | datebin(IntervalDayTime("4294967296"),Utf8("2022-11-21T09:10:24"),Utf8("2022-11-01T00:00:00")) |
    +------------------------------------------------------------------------------------------------+
    | 2022-11-21T00:00:00                                                                            |
    +------------------------------------------------------------------------------------------------+

----------------

### **to_timestamp**

**Syntax**

    to_timestamp(expr) 

**Function**：Return expr cast to a timestamp in a optional format.

**Parameter Type**：STRING or BIGINT

**Return Type**：TIMESTAMP. The precision depends on the parameter. If parameter type is BIGINT, it returns a nanosecond TIMESTAMP.

**Example**

```sql
SELECT to_timestamp('1970-01-01T00:00:00');
```
    +------------------------------------------+
    | totimestamp(Utf8("1970-01-01T00:00:00")) |
    +------------------------------------------+
    | 1970-01-01T00:00:00                      |
    +------------------------------------------+
```sql
SELECT to_timestamp(1);
```
    +-------------------------------+
    | totimestamp(Int64(1))         |
    +-------------------------------+
    | 1970-01-01T00:00:00.000000001 |
    +-------------------------------+

----------------

### **to_timestamp_millis**

**Syntax**

    to_timestamp_millis(expr) 

**Function**：Convert to a millisecond-level timestamp.

**Parameter Type**：BIGINT or STRING

**Return Type**：Millisecond-level TIMESTAMP

**Example**

```sql
SELECT to_timestamp_millis('1970-01-01T00:00:00.00301');
```
    +------------------------------------------------------+
    | totimestampmillis(Utf8("1970-01-01T00:00:00.00301")) |
    +------------------------------------------------------+
    | 1970-01-01T00:00:00.003                              |
    +------------------------------------------------------+
```sql
SELECT to_timestamp_millis(1);
```
    +-----------------------------+
    | totimestampmillis(Int64(1)) |
    +-----------------------------+
    | 1970-01-01T00:00:00.001     |
    +-----------------------------+

----------------

### **to_timestamp_micros**

**Syntax**

    to_timestamp_micros(expr) 
**Function**：Convert to a microsecond-level timestamp.

**Parameter**：BIGINT or STRING

**Return Type**： Microsecond-level TIMESTAMP

**Example**

```sql
SELECT to_timestamp_micros(1)
```
    +-----------------------------+
    | totimestampmicros(Int64(1)) |
    +-----------------------------+
    | 1970-01-01T00:00:00.000001  |
    +-----------------------------+

---------

### **to_timestamp_seconds**

**Syntax**

    to_timestamp_seconds(expr) 
**Function**：Convert to a second-level timestamp.

**Parameter Type**：BIGINT or STRING

**Return Type**：Second-level TIMESTAMP

**Example**

```sql
SELECT to_timestamp_seconds(1);
```

    +------------------------------+
    | totimestampseconds(Int64(1)) |
    +------------------------------+
    | 1970-01-01T00:00:01          |
    +------------------------------+
----------------

### **from_unixtime**

**Syntax**

    from_unixtime(unixTime) 

**Function**：Return unixTime.

**Parameter Type**： BIGINT

**Return Type**： Unix time in second-level.

**Example**
```sql
SELECT from_unixtime(1);
```
    +------------------------+
    | fromunixtime(Int64(1)) |
    +------------------------+
    | 1970-01-01T00:00:01    |
    +------------------------+
----------------

### **now**

**Syntax**

    now()

**Function**：Return the current timestamp.

**Return Type**：TIMESTAMP

**Example**

```sql
SELECT now();
```
    +----------------------------------+
    | now()                            |
    +----------------------------------+
    | 2022-11-21T04:44:19.742107+00:00 |
    +----------------------------------+



[//]: # (### **Regexp_Match**)
[//]: # (    返回与正则表达式匹配的项)


### **time_window**

#### Syntax

```sql
time_window(time_expr, window_duration [, slide_duration])
```
`time_column` is Timestamp.

`window_duration` is a STRING, parsed as an interval, specifying the window size of the time window.

`slide_duration` is a STRING, which is resolved as an interval and specifies the sliding size of the time window. If this parameter is not specified, slide_duration is the sliding size of the time window and becomes a rolling window.

The expression of time interval:

| Format | Description | Example |
|--------|-------------|---------|
| 'd'    | day         | '10d'   |
| 'h'    | hour        | '10h'   |
| 'm'    | minute      | '10m'   |
| 's'    | second      | '10s'   |
| 'ms'   | millisecond | '10ms'  |

time_window(time, window_duration, slide_duration) the window is:

```sql
start, end
time, time_column + window_duration
time - slide_duration, time + window_duration - slide_duration
time - 2 * slide_duration, time + window_duration - 2 * slide_duration
...
time - n * slide_duration, time + window_duration - n * slide_duration
```
The window satisfies that: start <= time < end

**Example**

```sql
CREATE TABLE test(a BIGINT, TAGS(b));
INSERT INTO test(time, a, b) VALUES ('2023-04-23T00:00:00.000000Z', 1, 'b');
SELECT time FROM test;
```
    +---------------------+
    | time                |
    +---------------------+
    | 2023-04-23T00:00:00 |
    +---------------------+

```sql
SELECT time_window(time, '3d') FROM test;
```
    +--------------------------------------------------------+
    | TIME_WINDOW(test.time,Utf8("3d"))                      |
    +--------------------------------------------------------+
    | {start: 2023-04-23T00:00:00, end: 2023-04-26T00:00:00} |
    +--------------------------------------------------------+

```sql
SELECT time_window(time, '5d', '3d') FROM test;
```

    +--------------------------------------------------------+
    | TIME_WINDOW(test.time,Utf8("5d"),Utf8("3d"))           |
    +--------------------------------------------------------+
    | {start: 2023-04-23T00:00:00, end: 2023-04-28T00:00:00} |
    | {start: 2023-04-20T00:00:00, end: 2023-04-25T00:00:00} |
    +--------------------------------------------------------+ 

### Window Functions

You can use window functions (analysis functions) in CnosDB to flexibly analyze and process data of specified window columns. The command formats, parameter descriptions and examples of window functions supported by CnosDB are shown below to guide you to use window functions to complete development.

### Syntax

```sql
function([...expr] ) OVER ([PARTITION BY expr] [ORDER BY expr] [window_frame]);

function: {aggregate_function | analytic_function| aggregate_function}

window_frame: { frame_mode frame_start |
                frame_mode BETWEEN frame_start AND frame_end } }
frame_mode: {RANGE | ROWS}

frame_start: {UNBOUNDED PRECEDING | offset_start PRECEDING | CURRENT ROW | offset_start FOLLOWING }

frame_end: {offset_stop PRECEDING | CURRENT ROW | offset_stop FOLLOWING | UNBOUNDED FOLLOWING}

```
###  Function Types

#### Rank Functions

| Function Names |
|--------------|
| DENSE_RANK   |
| PERCENT_RANK |
| RANK         |
| ROW_NUMBER   |

`DENSE_RANK` | `RANK` | `PERCENT_RANK` need ORDER BY Clause.

`RANK`, `DENSE_RANK`, `ROW_NUMBER` need ORDER BY Clause.

#### Aggregate Function

See [Aggregate Function](#aggregate-function).

#### Analysis Window Functions

| Function Names        | 
|-----------------------|
| CUME_DIST |
| LAG                   |
| LEAD                  |
| NTH_VALUE             |

### PARTITION BY Clause
One or more expressions used to specify a row partition. If there is no such clause, the partition is composed of all rows.

### ORDER BY Clause
Specify the order of rows in the partition.

###  Window_frame Clause
Frame is a subset of the current partition, which further subdivides windows in the partition.

If ROWS is specified, the window will calculate the offset in row units.

If RANGE is specified, the ORDER BY clause must be specified. The window calculates the offset in the unit of the value of the ORDER BY expression.

- The first row of the partition in `UNBOUND PRECEDING`ROWS mode. The first value of the partition ORDER BY expression in RANGE mode.
- The first offset line of the current line in the offset`offset PRECEDING` ROWS mode. The first offset value of the current value in the RANGE mode.
- Current row in`CURRENT ROW` ROWS  mode.Current value in RANGE mode.
- The next offset line of the current line in the`offset FOLLOWING` ROWS mode. The next offset value of the current value in the RANGE mode.
- The last row of partition in`UNBOUND FOLLOWING` ROWS mode.The last value of ORDER BY expression in RANGE mode.

### Restrictions on Usage
- Window functions can only appear in SELECT statements.
- Window functions and aggregate functions cannot be nested in window functions.。

## Window Function List

Include [Aggregate functions](#aggregate-function).

### **ROW_NUMBER**

**Syntax**

    ROW_NUMBER() OVER([partition_clause] [orderby_clause])

**Function**：Assign a unique sequence number (starting from 1) to each row according to the row order in the window partition.

**Parameter Type**：None

**Return Type**：BIGINT

**Example**

```sql
SELECT temperature, station, 
       ROW_NUMBER() OVER (PARTITION BY station) 
FROM air;
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


----------------

### **RANK**

**Syntax**

    RANK() OVER([partition_clause] [orderby_clause])

**Function**：Returns the rank (jump rank) of a value relative to all values in the partition.

**Parameter Type**：None

**Return Type**：BIGINT

**Example**

```sql
SELECT station, temperature, 
       RANK() OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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

----------------

### **DENSE_RANK**

**Syntax**

    DENSE_RANK() OVER([partition_clause] [orderby_clause])

**Function**：Returns the rank (consecutive rank) of a value relative to all values in the partition.

**Parameter Type**：None

**Return Type**：BIGINT

**Example**

```sql
SELECT station, temperature, 
       DENSE_RANK() OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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

----------------

### **PERCENT_RANK**

**Syntax**

    PERCENT_RANK() OVER([partition_clause] [orderby_clause])

**Function**： Calculate the percentage ranking of a value in the partition.

**Parameter Type**：None

**Return Type**：DOUBLE

**Example**

```sql
 SELECT station, temperature, 
        PERCENT_RANK() OVER (PARTITION BY station ORDER BY temperature) 
 FROM air;
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
----------------

### **CUME_DIST**

**Syntax**

    CUME_DIST() OVER ([partition_clause] [orderby_clause])

**Function**：Returns the position of a value relative to all values in the partition.

**Parameter Type**：None

**Return Type**：DOUBLE

**Example**

```sql
SELECT station, temperature, 
       CUME_DIST() OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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

[//]: # (----------------)

[//]: #
[//]: # (### **NTILE**)

[//]: #
[//]: # (    ntile&#40;n&#41; over&#40;[partition_clause] [order_by_clause]&#41;)

[//]: #
[//]: # (**Function**：把有序的数据集合平均分配到n个桶中,将桶号分配给每一行。)

[//]: #
[//]: # (**Parameter Type**：BIGINT)

[//]: #
[//]: # (**Return Type**：BIGINT)

----------------

### **LAG**

**Syntax**

    lag( expr [, offset [, default] ] ) OVER([partition_clause] orderby_clause)

**Function**：Returns the expr values of the offset rows before the current row in the partition.

**Parameter Type**：expr type is any type.

offset type is BIGINT. When offset is negative, the values are returned from the last offset lines, defaults to 1.

The type of default should be the consistent with that of expr, defaults to NULL.

**Return Type**：Consistent with expr.

**Example**

```sql
SELECT station, temperature, 
       LAG(temperature, 2) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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
----------------

### **LEAD**

**Syntax**

    lead(expr [, offset [, default] ] ) OVER ([partition_clause] orderby_clause)

**Function**：Returns the expr values of the offset rows after the current row in the partition.

**Parameter Type**：expr type is any type.

offset type is BIGINT. When offset is negative, the values are returned from the first offset lines, defaults to 1.

The type of default should be the consistent with that of expr, defaults to NULL.

**Return Type**：Consistent with expr.

**Example**

```sql
SELECT station, temperature, 
       LEAD(temperature, 2) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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

----------------

### **FIRST_VALUE**

**Syntax**

    FIRST_VALUE(expr) OVER ([partition_clause] [orderby_clause])

**Function**： Returns the first value in a set of values, usually an ordered set.

**Parameter Type**：expr type is any type, ignore_ nulls type is BOOLEAN, defaults to false.

**Return Type**：Consistent with expr.

**Example**

```sql
SELECT station, temperature, 
       FIRST_VALUE(temperature) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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
----------------

### **LAST_VALUE**

**Syntax**

    LAST_VALUE(expr) OVER ([partition_clause] [orderby_clause])

**Function**： Returns the last value in the current window.

**Parameter Type**：expr type is any type, ignore_ nulls type is BOOLEAN, defaults to false.

**Return Type**：Consistent with expr.

**Example**

```sql
SELECT station, temperature, 
       LAST_VALUE(temperature) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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

----------------

### **NTH_VALUE**

**Syntax**

    NTH_VALUE(expr, number) OVER ([partition_clause] [orderby_clause])

**Function**： Returns the expression value of the specified row of the window frame relative to the first row of the window.

**Parameter Type**：expr type is any type, number type is BIGINT.

**Return Type**：Consistent with expr.

**Example**

```sql
SELECT station, temperature, 
       NTH_VALUE(temperature, 2) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
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

----------------

## System Schema

CnosDB provides the system to check the status and information of CnosDB clusters. The system schema is a read-only schema. You can query the system schema using the SQL statement.

CnosDB store the shema information in two specific databases：

- CLUSTER_SCHEMA : The information of the cluster.
- INFORMATION_SCHEMA : The information of the tenant.

### CLUSTER_SCHEMA

The CLUSTER_SCHEMA database belongs to the cluster, only the administrator users have the access to the database.

The database contains metadata information about the cluster, such as tenant information and user information.


### TENANTS

This schema can be used to query information about all tenants in the cluster.

#### Schema Definition

| Field Name     | Data Type | Description                 |
|----------------|-----------|-----------------------------|
| TENANT_NAME    | STRING    | tenant name                 |
| TENANT_OPTIONS | STRING    | Configure of tenant in json |

**Example**

```sql
SELECT * FROM cluster_schema.tenants;
```

    +-------------+---------------------------------------------------+
    | tenant_name | tenant_options                                    |
    +-------------+---------------------------------------------------+
    | cnosdb      | {"comment":"system tenant","limiter_config":null} |
    +-------------+---------------------------------------------------+

### USERS

#### Schema Definition

This schema allows you to query information about all users in the cluster.

| Field Name   | Data Type | Description                |
|--------------|-----------|----------------------------|
| USER_NAME    | STRING    | User name                  |
| IS_ADMIN     | BOOLEAN   | Whether administrator      |
| USER_OPTIONS | STRING    | Configure of users in json |

**Example**

```sql
SELECT * FROM cluster_schema.users;
```

    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | user_name | is_admin | user_options                                                                                    |
    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | root      | true     | {"password":"*****","must_change_password":true,"rsa_public_key":null,"comment":"system admin"} |
    +-----------+----------+-------------------------------------------------------------------------------------------------+

### INFORMATION_SCHEMA

The database belongs to a tenant. When a tenant is created, the database is automatically created and visible to all members under the tenant.

### DATABASES

This schema stores tenant database information.

#### Schema Definition

| Field Name     | Data Type       | Description                 |
|----------------|-----------------|-----------------------------|
| TENANT_NAME    | STRING          | Tenant name                 |
| DATABASE_NAME  | STRING          | Database name               |
| TTL            | STRING          | Time the data file saved    |
| SHARD          | BIGINT UNSIGNED | Nmuber of shards            |
| VNODE_DURATION | STRING          | Time range of data in shard |
| PREPLICA       | BIGINT UNSIGNED | Number of replica           |
| PERCISION      | STRING          | Percision of database       |

**Example**

```sql
SELECT * FROM information_schema.databases;
```

    +-------------+---------------+----------+-------+----------------+---------+-----------+
    | tenant_name | database_name | ttl      | shard | vnode_duration | replica | percision |
    +-------------+---------------+----------+-------+----------------+---------+-----------+
    | cnosdb      | public        | 365 Days | 1     | 365 Days       | 1       | NS        |
    +-------------+---------------+----------+-------+----------------+---------+-----------+

### TABLES

This schema stores information about all tables under the tenant.

#### Schema Definition

| Field Name     | Data Type | Description                                                           |
|----------------|-----------|-----------------------------------------------------------------------|
| TABLE_TENANT   | STRING    | Tenant name of the table                                              |
| TABLE_DATABASE | STRING    | Database name of the table                                            |
| TABLE_NAME     | STRING    | Table name                                                            |
| TABLE_TYPE     | STRING    | Table type                                                            |
| TABLE_ENGINE   | STRING    | Table storage engine. External and internal tskv tables supported now |
| TABLE_OPTION   | STRING    | A JSON string that records all parameters of the table                |

**Example**

```sql
SELECT * FROM information_schema.tables;
```

    +--------------+----------------+------------+------------+--------------+---------------+
    | table_tenant | table_database | table_name | table_type | table_engine | table_options |
    +--------------+----------------+------------+------------+--------------+---------------+
    | cnosdb       | public         | wind       | BASE TABLE | TSKV         | TODO          |
    | cnosdb       | public         | air        | BASE TABLE | TSKV         | TODO          |
    | cnosdb       | public         | sea        | BASE TABLE | TSKV         | TODO          |
    +--------------+----------------+------------+------------+--------------+---------------+

### COLUMNS

This schema stores the definitions of all columns under the tenant.

#### Schema Definition

| Field Name        | Data Type | Description                                                                         |
|-------------------|-----------|-------------------------------------------------------------------------------------|
| TABLE_TENANT      | STRING    | Tenant name of the table                                                            |
| TABLE_DATABASE    | STRING    | Database name of the table                                                          |
| TABLE_NAME        | STRING    | Table name                                                                          |
| COLUMN_NAME       | STRING    | Column name                                                                         |
| ORDINAL_POSITION  | STRING    | Order of the column in table                                                        |
| COLUMN_TYPE       | STRING    | Column type, unique to the tskv table, supports TIME, TAG, FIELD, and usually Field |
| IS_NULLABLE       | STRING    | "YES" if the column may contain NULL, "NO" otherwise                                |
| DATA_TYPE         | STRING    | Data type of the column                                                             |
| COMPRESSION_CODEC | STRING    | Compression algorithm that the column uses                                          |

**Example**

```sql
SELECT * FROM information_schema.columns;
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

### ENABLED_ROLES

This schema displays information about the role of the current user under the current tenant.

#### Schema Definition

| Field Name | Data Type | Description |
|------------|-----------|-------------|
| ROLE_NAME  | STRING    | Role name   |

#### Example

```sql
SELECT * FROM information_schema.enabled_roles;
```

    +-----------+
    | role_name |
    +-----------+
    | owner     |
    +-----------+

### ROLES

This schema shows all available roles (including system and custom roles) under the current tenant.

This schema is only visible to the Owner of the current tenant.

#### Schema Definition

| Field Name   | Data Type | Description                                                                                |
|--------------|-----------|--------------------------------------------------------------------------------------------|
| ROLE_NAME    | STRING    | Role name under the tenant                                                                 |
| ROLE_TYPE    | STRING    | Role type, custom role or system role                                                      |
| INHERIT_ROLE | STRING    | Name of the system role that the custom role inherits from, or NULL if it is a system role |

**Example**

```sql
SELECT * FROM information_schema.roles;
```

    +-----------+-----------+--------------+
    | role_name | role_type | inherit_role |
    +-----------+-----------+--------------+
    | owner     | system    |              |
    | member    | system    |              |
    +-----------+-----------+--------------+

### DATABASE_PRIVILEGES

#### Schema Definition

This schema shows all permissions on db that have been granted to the specified role under the tenant.

All records of this schema are visible to the Owner of the current tenant.

For non-owner elements, only the records for the corresponding role are displayed.

| Field Name     | Data Type | Description                                                    |
|----------------|-----------|----------------------------------------------------------------|
| TENANT_NAME    | STRING    | Tenant name of the database to which the permission is granted |
| DATABASE_NAME  | STRING    | Name of the database to which the permission was granted       |
| PRIVILEGE_TYPE | STRING    | Type of permission granted, READ/WRITE/ALL                     |
| ROLE_NAME      | STRING    | Name of the role granted                                       |

**Example**

```sql
CREATE ROLE rrr INHERIT member;
GRANT READ ON DATABASE air TO ROLE rrr;
SELECT * FROM information_schema.database_privileges;
```

    +-------------+---------------+----------------+-----------+
    | tenant_name | database_name | privilege_type | role_name |
    +-------------+---------------+----------------+-----------+
    | cnosdb      | air           | Read           | rrr       |
    +-------------+---------------+----------------+-----------+

### MEMBERS

This schema shows the membership information under the tenant.

All records of this schema are visible to all members of the current tenant.


#### Schema Definition

| Field Name | Data Type | Description            |
|------------|-----------|------------------------|
| USER_NAME  | STRING    | User name under tenant |
| ROLE_NAME  | STRING    | Role name              |

**Example**

```sql
SELECT * FROM information_schema.members;
```

    +-----------+-----------+
    | user_name | role_name |
    +-----------+-----------+
    | root      | owner     |
    +-----------+-----------+

### QUERIES(INFORMATION_SCHEMA)

This schema shows a real-time snapshot of SQL statements, which is used to monitor SQL jobs in real time.

All records of this schema are visible to the owner of the current tenant.

For non-owner members, only the SQL submitted by the current member is displayed.

#### Schema Definition

| Field Name  | Data Type       | Description                                                                    |
|-------------|-----------------|--------------------------------------------------------------------------------|
| QUERY_ID    | STRING          | ID of SQL                                                                      |
| QUERY_TEXT  | STRING          | Content of SQL                                                                 |
| USER_ID     | STRING          | ID of user which commit the SQL                                                |
| USER_NAME   | STRING          | Name of user which commit the SQL                                              |
| TENANT_ID   | STRING          | Tenant ID                                                                      |
| TENANT_NAME | STRING          | Tenant name                                                                    |
| STATE       | STRING          | Status of SQL, including: ACCEPTING,DISPATCHING,ANALYZING,OPTMIZING,SCHEDULING |
| DURATION    | BIGINT UNSIGNED | Time that SQL costs                                                            |

**Example**

```sql
SELECT * FROM information_schema.queries;
```

    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+

#### SHOW QUERIES

You can also see the executing SQL statements using the 'SHOW QUERIES' statement, which is a wrapper around the QUERIES schema.

**Example**

```sql
SHOW QUERIES;
```

    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+


## USAGE_SCHEMA

This database, which belongs to a Tenant, is automatically created when a tenant is created and is visible to all members under the tenant.

For regular users, only the part of the table in USAGE_SCHEMA that belongs to the current user tenant will be visible.

For system administrators, the entire table in USAGE_SCHEMA is visible.

### DISK_STORAGE

This schema records the amount of disk space, in bytes, occupied by each vnode in the cluster.

#### Schema Definition

The definition of the schema seen by the administrator:

| Field Name | Data Type       | Description                             |
|------------|-----------------|-----------------------------------------|
| TIME       | TIMESTAMP       | Count the disk storage time             |
| DATABASE   | STRING          | The database to which the vnode belongs |
| NODE_ID    | STRING          | ID of data node                         |
| TENANT     | STRING          | The tenant to which the vnode belongs   |
| VNODE_ID   | STRING          | ID of vnode                             |
| VALUE      | BIGINT UNSIGNED | Disk size occupied by the vnode         |


Common users can access only the tenant information of the current session.

| Field Name | Data Type       | Description                             |
|------------|-----------------|-----------------------------------------|
| TIME       | TIMESTAMP       | Count the disk storage time             |
| DATABASE   | STRING          | The database to which the vnode belongs |
| NODE_ID    | STRING          | ID of data node                         |
| TENANT     | STRING          | The tenant to which the vnode belongs   |
| VNODE_ID   | STRING          | ID of vnode                             |
| VALUE      | BIGINT UNSIGNED | Disk size occupied by the vnode         |


#### Example

```sql

administator:

```sql
select * from usage_schmea.disk_storage order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+----------+-------+
    | time                       | database     | node_id | tenant | vnode_id | value |
    +----------------------------+--------------+---------+--------+----------+-------+
    | 2023-02-23T03:57:52.566487 | usage_schema | 1001    | cnosdb | 3        | 0     |
    | 2023-02-23T03:57:42.566642 | usage_schema | 1001    | cnosdb | 3        | 0     |
    +----------------------------+--------------+---------+--------+----------+-------+

common user:

```sql
select * from usage_schema.disk_storage order by time desc limit 2;
```
    +----------------------------+--------------+---------+----------+-------+
    | time                       | database     | node_id | vnode_id | value |
    +----------------------------+--------------+---------+----------+-------+
    | 2023-02-23T06:34:36.578458 | usage_schema | 1001    | 3        | 0     |
    | 2023-02-23T06:34:26.577871 | usage_schema | 1001    | 3        | 0     |
    +----------------------------+--------------+---------+----------+-------+

### DATA_IN

This schema records the approximate total volume of read traffic when data is written to the DB.

#### Schema definition

The definition of the schema seen by the administrator:

| Field Name   | Data Type       | Description                |
|----------|-----------------|----------------------------|
| TIME     | TIMESTAMP       | Time of writes             |
| DATABASE | STRING          | Database name              |
| NODE_ID  | STRING          | ID of data node            |
| TENANT   | STRING          | The tenant of the database |
| USER     | STRING          | User name                  |
| VALUE    | BIGINT UNSIGNED | Total write traffic size   |


Common users can access only the tenant information of the current session.

| Field Name   | Data Type       | Description              |
|----------|-----------------|--------------------------|
| TIME     | TIMESTAMP       | Time of writes           |
| DATABASE | STRING          | Database name            |
| NODE_ID  | STRING          | ID of data node          |
| USER     | STRING          | User name                |
| VALUE    | BIGINT UNSIGNED | Total write traffic size |


#### Example

administrator:

```sql
select * from usage_schema.data_in order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+--------+
    | time                       | database     | node_id | tenant | value  |
    +----------------------------+--------------+---------+--------+--------+
    | 2023-02-23T06:50:36.578641 | usage_schema | 1001    | cnosdb | 741552 |
    | 2023-02-23T06:50:26.577544 | usage_schema | 1001    | cnosdb | 739612 |
    +----------------------------+--------------+---------+--------+--------+

common user:
```sql
select * from usage_schema.data_in order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+
    | time                       | database     | node_id | value  |
    +----------------------------+--------------+---------+--------+
    | 2023-02-23T06:43:46.587023 | usage_schema | 1001    | 662012 |
    | 2023-02-23T06:43:36.586154 | usage_schema | 1001    | 660072 |
    +----------------------------+--------------+---------+--------+

### DATA_OUT

This schema records the approximate total volume of read traffic when data is queried from the DB.

#### Schema definition

The definition of the schema seen by the administrator:

| Field Name   | Data Type       | Description                |
|----------|-----------------|----------------------------|
| TIME     | TIMESTAMP       | Time of writes             |
| DATABASE | STRING          | Database name              |
| NODE_ID  | STRING          | ID of data node            |
| TENANT   | STRING          | The tenant of the database |
| USER     | STRING          | User name                  |
| VALUE    | BIGINT UNSIGNED | Total read traffic size    |


Common users can access only the tenant information of the current session.

| Field Name   | Data Type       | Description             |
|----------|-----------------|-------------------------|
| TIME     | TIMESTAMP       | Time of writes          |
| DATABASE | STRING          | Database name           |
| NODE_ID  | STRING          | ID of data node         |
| USER     | STRING          | User name               |
| VALUE    | BIGINT UNSIGNED | Total read traffic size |

#### Example

```sql
select * from usage_schema.data_out order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+----------+
    | time                       | database     | node_id | tenant | value    |
    +----------------------------+--------------+---------+--------+----------+
    | 2023-02-23T06:51:16.577110 | usage_schema | 1001    | cnosdb | 15156112 |
    | 2023-02-23T06:51:06.577132 | usage_schema | 1001    | cnosdb | 15156112 |
    +----------------------------+--------------+---------+--------+----------+
```sql
select * from usage_schema.data_out order by time desc limit 2;
```
    +----------------------------+--------------+---------+----------+
    | time                       | database     | node_id | value    |
    +----------------------------+--------------+---------+----------+
    | 2023-02-23T06:51:46.576451 | usage_schema | 1001    | 16173128 |
    | 2023-02-23T06:51:36.576904 | usage_schema | 1001    | 16173128 |
    +----------------------------+--------------+---------+----------+

### QUERIES (USAGE_SCHEMA)

This schema records the number of queries to the database.

#### Schema definition

The definition of the schema seen by the administrator:

| Field Name   | Data Type       | Description                |
|----------|-----------------|----------------------------|
| TIME     | TIMESTAMP       | Time of writes             |
| DATABASE | STRING          | Database name              |
| NODE_ID  | STRING          | ID of data node            |
| TENANT   | STRING          | The tenant of the database |
| USER     | STRING          | User name                  |
| VALUE    | BIGINT UNSIGNED | User writes times          |


Common users can access only the tenant information of the current session.

| Field Name   | Data Type       | Description        |
|----------|-----------------|--------------------|
| TIME     | TIMESTAMP       | Time of writes     |
| DATABASE | STRING          | Database name      |
| NODE_ID  | STRING          | ID of data node    |
| USER     | STRING          | User name          |
| VALUE    | BIGINT UNSIGNED | User queries times |


#### Example

```sql
select * from usage_schema.queries order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+-------+-------+
    | time                       | database     | node_id | tenant | user  | value |
    +----------------------------+--------------+---------+--------+-------+-------+
    | 2023-02-23T06:53:16.575193 | usage_schema | 1001    | cnosdb | usage | 9     |
    | 2023-02-23T06:53:16.575193 | usage_schema | 1001    | cnosdb | root  | 17    |
    +----------------------------+--------------+---------+--------+-------+-------+

```sql
select * from usage_schema.queries order by time desc limit 2;
```
    +----------------------------+--------------+---------+-------+-------+
    | time                       | database     | node_id | user  | value |
    +----------------------------+--------------+---------+-------+-------+
    | 2023-02-23T06:52:36.576098 | usage_schema | 1001    | usage | 9     |
    | 2023-02-23T06:52:36.576097 | usage_schema | 1001    | root  | 17    |
    +----------------------------+--------------+---------+-------+-------+

### WRITES

This schema records the number of writes to the database.

Notice: The schema will only be created when we write in [lineprotocol](./rest_api.md)/[Prometheus remote write](../eco/prometheus#remote-write) successfully.


#### Schema definition

The definition of the schema seen by the administrator:

| Field Name   | Data Type       | Description                |
|----------|-----------------|----------------------------|
| TIME     | TIMESTAMP       | Time of writes             |
| DATABASE | STRING          | Database name              |
| NODE_ID  | STRING          | ID of data node            |
| TENANT   | STRING          | The tenant of the database |
| USER     | STRING          | User name                  |
| VALUE    | BIGINT UNSIGNED | User writes times          |


Common users can access only the tenant information of the current session.

| Field Name   | Data Type       | Description       |
|----------|-----------------|-------------------|
| TIME     | TIMESTAMP       | Time of writes    |
| DATABASE | STRING          | Database name     |
| NODE_ID  | STRING          | ID of data node   |
| USER     | STRING          | User name         |
| VALUE    | BIGINT UNSIGNED | User writes times |

#### Example

administrator:

```sql
select * from usage_schema.writes order by time desc limit 2;
```
    +----------------------------+----------+---------+--------+------+-------+
    | time                       | database | node_id | tenant | user | value |
    +----------------------------+----------+---------+--------+------+-------+
    | 2023-02-23T07:05:56.549282 | public   | 1001    | cnosdb | root | 2     |
    | 2023-02-23T07:05:46.549188 | public   | 1001    | cnosdb | root | 2     |
    +----------------------------+----------+---------+--------+------+-------+

common users:

```sql
select * from usage_schema.writes order by time desc limit 2;
```
    +----------------------------+----------+---------+------+-------+
    | time                       | database | node_id | user | value |
    +----------------------------+----------+---------+------+-------+
    | 2023-02-23T07:06:56.547905 | public   | 1001    | root | 2     |
    | 2023-02-23T07:06:46.547673 | public   | 1001    | root | 2     |
    +----------------------------+----------+---------+------+-------+



## Stream 

### CREATE STREAM TABLE

To create a stream table, a source table is required. The stream table does not support `ALTER` now.

**Syntax**

```sql
CREATE STREAM TABLE [IF NOT EXISTS] table_name(field_definition [, field_definition] ...)
    WITH (db = 'db_name', table = 'table_name', event_time_column = 'time_column')
    engine = tskv;
field_definition: 
    column_name data_type
```

The db and table arguments specify the source table.

`event_time_column` Specifies the event time column. The data type of this column must be TIMESTAMP.

Currently, only common tables can be source tables. Field names and field types defined in flow table fields must belong to the source table and be the same as those defined in the source table.

**Example**

Create source table

```sql
CREATE DATABASE oceanic_station;
```
```
\c oceanic_station
```
```
CREATE TABLE air(pressure DOUBLE, temperature DOUBLE, visibility DOUBLE, TAGS(station));
```

Create stream table

```sql
CREATE STREAM TABLE air_stream(time TIMESTAMP, station STRING, pressure DOUBLE, temperature DOUBLE, visibility DOUBLE) 
    WITH (db = 'oceanic_station', table = 'air', event_time_column = 'time')
    engine = tskv;
```


### DROP STREAM TABLE

The syntax is the same as [DROP TABLE](#drop-table)


### INSERT INTO STREAM TABLE

Stream queries support only `INSERT SELECT` statements, where the FROM clause is the stream table and is inserted into the target table.

When data is written to the source table, the streaming query is triggered.

The SELECT clause of a stream query does not support `JOIN`.

Stream QUERY statements are persisted and are cancelled by [KILL QUERY](#kill-query).

**Example**

In the streaming down-sampling scenario, the source table interval is one minute, and the down-sampling interval is one hour

Create source table
```sql
CREATE TABLE air_down_sampling_1hour(max_pressure DOUBLE, avg_temperature DOUBLE, sum_temperature DOUBLE, count_pressure BIGINT, TAGS(station));
```

Create stream query statement

```sql
INSERT INTO air_down_sampling_1hour(time, station, max_pressure, avg_temperature, sum_temperature, count_pressure) 
SELECT 
	date_bin(INTERVAL '1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00') time, 
	station, 
	MAX(pressure) max_pressure, 
	AVG(temperature) avg_temperature, 
	SUM(temperature) sum_temperature, 
	COUNT(pressure) count_pressure 
FROM air_stream 
GROUP BY date_bin(INTERVAL '1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00'), station;
```

A stream query statement is triggered when data is written.

[Data Source](#sample-data)

```sql
\w oceanic_station.txt
```

Show the result

```sql
SELECT * FROM air_down_sampling_1hour LIMIT 10;
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


## KILL QUERY

#### Syntax

```sql
KILL [QUERY] query_id;
``` 
We can get the `query_id` through [`SHOW QUERIES`](#show-queries).

#### Examples

```sql
SHOW QUERIES;
```
    +----------+------+------------------------------------------------------------------+------------+----------+
    | query_id | user | query                                                            | state      | duration |
    +----------+------+------------------------------------------------------------------+------------+----------+
    | 4        | root | select * from air join sea on air.temperature = sea.temperature; | SCHEDULING | 2703     |
    | 5        | root | show queries;                                                    | SCHEDULING | 0        |
    +----------+------+------------------------------------------------------------------+------------+----------+

```sql
KILL 4;
```
    Query took 0.016 seconds.