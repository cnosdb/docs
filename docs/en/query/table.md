---
title: Table
order: 3
---
##  Create Table

You can use `CREATE TABLE`  to create tables

CnosDB supports the creation of common tables and external tables

###  Create Common Table
**Syntax**：
```sql
CREATE TABLE [IF NOT EXISTS] tb_name
(field_definition [, field_definition] ...TAGS(tg_name [, tg_name] ...));

field_definition:
    column_name data_type [field_codec_type]
    
field_codec_type:
    CODEC(code_type)
```

#### Instructions：

1. There is no need to create a timestamp column when creating a table. The system automatically adds a timestamp column named "time".
2. The names of the columns need to be different.
3. If the compression algorithm is not specified when creating a table, the system default compression algorithm is used.
4. At present, the compression algorithms supported by various types are as follows. The first one of each type is the default specified algorithm. NULL means no compression algorithm is used.

    * BIGINT/BIGINT UNSIGNED：DELTA，QUANTILE，NULL
    * DOUBLE：GORILLA，QUANTILE，NULL
    * STRING：SNAPPY，ZSTD，GZIP，BZIP，ZLIB，NULL
    * BOOLEAN：BIPACK，NULL

For more information about the compression algorithm, see[the details of the compression algorithm.](../design/compress.md)

**Example**：
```sql
CREATE TABLE air (
   visibility DOUBLE,
   temperature DOUBLE,
   presssure DOUBLE,
   TAGS(station)
);
```

    Query took 0.033 seconds.

### **Create External Table**
**Syntax**：
```sql
-- Column definitions can not be specified for PARQUET files

CREATE EXTERNAL TABLE [ IF NOT EXISTS ] tb_name 
    ( field_definition [, field_definition] ... ) tb_option;

field_definition:
    column_name data_type [ NULL ]

tb_option: {
      STORED AS { PARQUET | NDJSON | CSV | AVRO }
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

1. STORE AS：represents the format in which the file is stored. Currently, PARQUET, NDJSON, CSV and AVRO formats are supported.
2. WITH HEADER ROW：Effective only in csv file format, representing with csv header.
3. DELIMITER：only effective in csv format, representing the delimiter of column data.
4. PARTITIONED BY：use the column specified when creating the table to partition.
5. LOCATION：represents the location of the associated file

**Example**：
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

## **Drop Table**
**Syntax**：
```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

**Example**：
```sql
DROP TABLE IF EXISTS air;
```
    Query took 0.033 seconds.

## **Show Tables of Current Database**
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

## **Alter Table**
**Explanation** At present, we support altering common tables.
1. Add Column: add field and tag columns.
2. Drop Column: drop the field column. When dropping a column results in dropping the last field value of a row, we think that this row has no value, and this row will not be showed in SELECT.
3. Alter Column: alter the column definition. Currently, the compression algorithm for altering columns is supported.
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