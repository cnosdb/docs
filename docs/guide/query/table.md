---
title: 表
order: 3
---
## **创建表**

可以使用 `CREATE TABLE` 创建表

CnosDB 支持创建普通表和外部表

### **创建普通表**
**语法**：
```sql
CREATE TABLE [IF NOT EXISTS] tb_name
(field_definition [, field_definition] ...TAGS(tg_name [, tg_name] ...));

field_definition:
    column_name data_type [field_codec_type]
    
field_codec_type:
    CODEC(code_type)
```

#### 使用说明：

1. 创建表时无需创建timestamp列，系统自动添加名为"time"的timestamp列
2. 各列的名字需要互不相同
3. 创建表时如果不指定压缩算法，则使用系统默认的压缩算法
4. 目前各种类型支持的压缩算法如下，每种类型第一个为默认指定的算法，NULL表示不使用压缩算法

    * BIGINT/BIGINT UNSIGNED：DELTA，QUANTILE，NULL
    * DOUBLE：GORILLA，QUANTILE，NULL
    * STRING：SNAPPY，ZSTD，GZIP，BZIP，ZLIB，NULL
    * BOOLEAN：BIPACK，NULL

想了解更多有关压缩算法的内容可以看[压缩算法详情](../design/compress.md)

**示例**：
```sql
CREATE TABLE air (
   visibility DOUBLE,
   temperature DOUBLE,
   presssure DOUBLE,
   TAGS(station)
);
```

    Query took 0.033 seconds.

### **创建外部表**
**语法**：
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
#### 使用说明
1. 外部表并不存在数据库中，而是将一个操作系统文件当作数据库普通表来访问
2. 数据均是只读的，不能执行 DML 操作，也不能建索引

#### 参数说明

1. STORE AS：表示文件以什么格式储存，目前支持 PARQUET，NDJSON，CSV，AVRO格式
2. WITH HEADER ROW：仅在csv文件格式下生效，表示带有csv表头
3. DELIMITER：仅在csv格式下生效，表示列数据的分隔符
4. PARTITIONED BY：使用创建表时指定的列来进行分区
5. LOCATION：表示关联的文件的位置

**示例**：
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

## **删除表**
**语法**：
```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

**示例**：
```sql
DROP TABLE IF EXISTS air;
```
    Query took 0.033 seconds.

## **显示当前数据库所有表**
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

[//]: # (## **修改表**)
[//]: # (```sql)
[//]: # (todo)
[//]: # (!&#40;&#41;)
[//]: # (```)