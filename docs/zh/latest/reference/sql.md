---
title: SQL语法参考手册
order: 5
---

# SQL语法参考手册

## **数据库操作**

### **数据类型**

| 类型              | 描述          | 大小    |
|-----------------|-------------|-------|
| BIGINT          | 整型          | 8字节   |
| BIGINT UNSIGNED | 无符号整型       | 8字节   |
| BOOLEAN         | 布尔类型        | 1字节   |
| TIMESTAMP       | 时间戳         | 8字节   |
| STRING          | UTF-8编码的字符串 | ----- |
| DOUBLE          | 双精度浮点型      | 8字节   |

#### 其他数据类型

以下数据类型无法直接存储，但会在SQL表达式中出现

| 类型       | 描述                        | 备注                                         |
|----------|---------------------------|--------------------------------------------|
| BINARY   | 二进制数据，可以使用Cast子句转换成STRING | sha224, sha256, sha384, sha512函数的返回值均属于此类型 |
| INTERVAL | 时间间隔                      | 时间加减运算和date_bin函数参数需要                      |
| ARRAY    | 数组类型                      | 聚合函数array_agg返回类型为此                        |

#### 常量

| 类型              | 语法                                    | 说明                                              |
|-----------------|---------------------------------------|-------------------------------------------------|
| BIGINT          | \[{+\-}\]123                          | 数值类型                                            |
| BIGINT UNSIGNED | \[+]123                               | 数值类型                                            |
| DOUBLE          | 123.45                                | 数值类型，目前暂不支持科学记数法                                |
| BOOLEAN         | {true &#124; false &#124; t &#124; f} |                                                 |
| STRING          | 'abc'                                 | 不支持双引号格式，引号中连续两个''转义成‘                          |
| TIMESTAMP       | TIMESTAMP '1900-01-01T12:00:00Z'      | 时间戳，TIMESTAMP 关键字表示后面的字符串常量需要被解释为 TIMESTAMP 类型。 |
| Geometry        | [点击跳转](#Geometry)                     | 几何类型                                            |
| --              | NULL                                  | 空值                                              |

#### TIMESTAMP 常量语法

时间戳是按RFC3339标准

T代表间隔，仅可以用空格代替

Z代表零时区

+08:00 代表东八区

如下：

- `1997-01-31T09:26:56.123Z` # 标准RFC3339 UTC 时区
- `1997-01-31T09:26:56.123+08:00` # 标准RFC3339 东八区
- `1997-01-31 09:26:56.123+08:00` # 接近RFC3339, 只是用空格代替T
- `1997-01-31T09:26:56.123` # 接近RFC3339, 没有指定时区，默认UTC
- `1997-01-31 09:26:56.123` # 接近RFC3339, 用空格代替T， 且没有指定时区
- `1997-01-31 09:26:56`     # 接近RFC3339, 精确度是秒级

**注意**：`CAST (BIGINT AS TIMESTAMP)` 是转化为纳秒级的时间戳，如下：

```sql
SELECT CAST (1 AS TIMESTAMP);
```

    +-------------------------------+
    | Int64(1)                      |
    +-------------------------------+
    | 1970-01-01T00:00:00.000000001 |
    +-------------------------------+

#### INTERVAL 常量

#### 示例

1. `INTERVAL '1'` 一秒
2. `INTERVAL '1 SECONDE'` 一秒
3. `INTERVAL '1 MILLISECONDS'` 一毫秒
4. `INTERVAL '1 MINUTE'` 一分钟
5. `INTERVAL '0.5 MINUTE'` 半分钟
6. `INTERVAL '1 HOUR'` 一小时
7. `INTERVAL '1 DAY'` 一天
8. `INTERVAL '1 DAY 1'` 一天零一秒
9. `INTERVAL '1 WEEK'` 一周
10. `INTERVAL '1 MONTH'` 一月(30天)
11. `INTERVAL '0.5 MONTH'` 半月(15天)
12. `INTERVAL '1 YEAR'` 一年（12个月）
13. `INTERVAL '1 YEAR 1 DAY 1 HOUR 1 MINUTE'` 一年零一天零一小时一分
14. `INTERVAL '1 DECADES' ` 一个十年

**注意：**

INTERVAL '1 YEAR' 并不是365天或366天，而是12个月。
INTERVAL '1 MONTH' 并不是28天或29天或31天，而是30天。

#### Geometry

#### WKT

WKT格式是一种文本格式，用于描述二维和三维几何对象的空间特征。
WKT是“Well-Known Text”的缩写，是一种开放的国际标准。
WKT格式包括一些基本的几何对象，例如点、线、多边形和圆形，以及一些复合对象，例如多边形集合和几何对象集合。

#### 语法

```
<geometry tag> <wkt data>

<geometry tag> ::= POINT | LINESTRING | POLYGON | MULTIPOINT | 
                   MULTILINESTRING | MULTIPOLYGON | GEOMETRYCOLLECTION
                   
<wkt data> ::= <point> | <linestring> | <polygon> | <multipoint> | 
               <multilinestring> | <multipolygon> | <geometrycollection>
```

| 几何对象   | 语法描述                                                                                 | 
|--------|--------------------------------------------------------------------------------------|
| 点      | `POINT (<x1> <y1>)`                                                                  |
| 线      | `LINESTRING (<x1> <y1>, <x2> <y2>, ...)`                                             |
| 多边形    | `POLYGON ((<x1> <y1>, <x2> <y2>, ...))`                                              |
| 多点     | `MULTIPOINT (<x1> <y1>, <x2> <y2>, ...)`                                             |
| 多线     | `MULTILINESTRING ((<x1> <y1>, <x2> <y2>, ...), (<x1> <y1>, <x2> <y2>, ...))`         |
| 多多边形   | `MULTIPOLYGON (((<x1> <y1>, <x2> <y2>, ...)), ((<x1> <y1>, <x2> <y2>, ...)))`        |
| 几何对象几何 | `GEOMETRYCOLLECTION (<geometry tag1> <wkt data1>, <geometry tag2> <wkt data2>, ...)` |

#### 示例

| 几何对象  | 图片                                                       | 示例                                                                                                                       | 
|-------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| 点     | ![](/_static/img/sql/SFA_Point.svg.png)                  | POINT (30 10)                                                                                                            |
| 线     | ![](/_static/img/sql/102px-SFA_LineString.svg.png)       | LINESTRING (30 10, 10 30, 40 40)                                                                                         |
| 多边形   | ![](/_static/img/sql/SFA_Polygon.svg.png)                | POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))                                                                            |
|       | ![](/_static/img/sql/SFA_Polygon_with_hole.svg.png)      | POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))                                              |
| 多点    | ![](/_static/img/sql/SFA_MultiPoint.svg.png)             | MULTIPOINT ((10 40), (40 30), (20 20), (30 10))                                                                          |
|       |                                                          | MULTIPOINT (10 40, 40 30, 20 20, 30 10)                                                                                  |
| 多线    | ![](/_static/img/sql/102px-SFA_MultiLineString.svg.png)  | MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))                                                    |
| 多面    | ![](/_static/img/sql/SFA_MultiPolygon.svg.png)           | MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))                                        |
|       | ![](/_static/img/sql/SFA_MultiPolygon_with_hole.svg.png) | MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20))) |
| 几何对集合 | ![](/_static/img/sql/SFA_GeometryCollection.svg.png)     | GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))             |

### **创建数据库**

#### 语法

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

#### 参数说明

1. TTL：表示数据文件保存的时间，默认无限，用带单位的数据表示，支持天（d），小时（h），分钟（m），如TTL 10d，TTL 50h，TTL
   100m，当不带单位时，默认为天，如TTL 30。
2. SHARD：表示数据分片个数，默认为1。
3. VNODE_DURATION：表示数据在shard中的时间范围，默认为365天，同样使用带单位的数据来表示，数据意义与TTL的value一致。
4. REPLICA：表示数据在集群中的副本数，默认为1（副本数不大于分布式数据节点的数量）。
5. PRECISION：数据库的时间戳精度，ms 表示毫秒，us 表示微秒，ns 表示纳秒，默认为ns纳秒。

#### 示例

```sql
> CREATE DATABASE oceanic_station;
Query took 0.062 seconds.
```

### **查看数据库**

#### 语法

```sql
SHOW DATABASES;
```

#### 示例

    +-----------------+
    | Database        |
    +-----------------+
    | oceanic_station |
    | public          |
    +-----------------+

### **使用数据库**

如果你通过[HTTP API](./rest_api.md)来使用数据库，
你可以在url中指定参数 db=database_name 来使用数据库。

在 CnosDB-Cli 中，可以使用如下命令切换数据库：

```sql
\c dbname
```

    public ❯ \c oceanic_station
    oceanic_station ❯

### **删除数据库**

#### 语法

```sql
DROP DATABASE [IF EXISTS] db_name;
```

删除数据库会将指定database的所有table数据及元数据全部删除。

#### 示例

```sql
DROP DATABASE oceanic_station;
```

    Query took 0.030 seconds.

### **修改数据库参数**

#### 语法

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

#### 示例

```sql
ALTER DATABASE oceanic_station SET TTL '30d';
```

### **查看数据库参数**

#### 语法

```sql
DESCRIBE DATABASE dbname;
```

#### 示例

```sql
DESCRIBE DATABASE oceanic_station;
```

    +----------+-------+----------------+---------+-----------+
    | TTL      | SHARD | VNODE_DURATION | REPLICA | PRECISION |
    +----------+-------+----------------+---------+-----------+
    | 365 Days | 1     | 365 Days       | 1       | NS        |
    +----------+-------+----------------+---------+-----------+

## **表操作**

### **创建表**

可以使用 `CREATE TABLE` 创建表。

CnosDB 支持创建普通表和外部表。

### **创建普通(TSKV)表**

#### 语法

```sql
CREATE TABLE [IF NOT EXISTS] tb_name
(field_definition [, field_definition ] ... [, TAGS(tg_name [, tg_name] ...)]);

field_definition:
    column_name data_type [field_codec_type]
    
field_codec_type:
    CODEC(code_type)
```

#### 使用说明

1. 创建表时无需创建timestamp列，系统自动添加名为"time"的timestamp列。
2. 各列的名字需要互不相同。
3. 创建表时如果不指定压缩算法，则使用系统默认的压缩算法。
4. 目前各种类型支持的压缩算法如下，每种类型第一个为默认指定的算法，NULL表示不使用压缩算法。

    * BIGINT/BIGINT UNSIGNED：DELTA，QUANTILE，NULL
    * DOUBLE：GORILLA，QUANTILE，NULL
    * STRING：SNAPPY，ZSTD，GZIP，BZIP，ZLIB，NULL
    * BOOLEAN：BITPACK，NULL

想了解更多有关压缩算法的内容可以看[压缩算法详情](./concept_design/compress.md#压缩算法)。

#### 示例

```sql
CREATE TABLE air (
   visibility DOUBLE,
   temperature DOUBLE,
   pressure DOUBLE,
   TAGS(station)
);
```

    Query took 0.033 seconds.

### **创建外部表**

#### 语法

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

1. 外部表并不存在数据库中，而是将一个操作系统文件当作数据库普通表来访问。
2. 数据均是只读的，不能执行 DML 操作，也不能建索引。

#### 参数说明

1. STORED AS：表示文件以什么格式储存，目前支持 PARQUET，NDJSON，CSV，AVRO格式。
2. WITH HEADER ROW：仅在csv文件格式下生效，表示带有csv表头。
3. DELIMITER：仅在csv格式下生效，表示列数据的分隔符。
4. PARTITIONED BY：使用创建表时指定的列来进行分区。
5. LOCATION：表示关联的文件的位置。

#### 示例

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

### **删除表**

#### 语法

```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

#### 示例

```sql
DROP TABLE IF EXISTS air;
```

    Query took 0.033 seconds.

### **显示当前数据库所有表**

#### 语法

```sql
SHOW TABLES;
```

#### 示例

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

### **查看表的模式**

外部表和普通表的模式都可以使用该语句查看。

#### 语法

```sql
DESCRIBE DATABASE table_name;
```

#### 示例

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

### **修改表**

**说明**

目前我们支持修改普通表。

1. 添加列：添加 field，tag 列。
2. 删除列：删除 field 列，当删除列导致删除某一行的最后一个 field 值时，我们认为这一行没有值，SELECT 时将不显示这一行。
3. 修改列：修改列定义，目前支持修改列的压缩算法。

#### 语法

```sql
ALTER TABLE tb_name alter_table_option;

alter_table_option: {
      ADD TAG col_name
    | ADD FIELD col_name [CODEC(code_type)]
    | ALTER col_name SET CODEC(code_type)
    | DROP col_name
}
```

#### 示例

```sql
ALTER TABLE air ADD TAG height;
ALTER TABLE air ADD FIELD humidity DOUBLE CODEC(DEFAULT);
ALTER TABLE air ALTER humidity SET CODEC(QUANTILE);
ALTER TABLE air DROP humidity;
```

## **插入数据**

CnosDB支持两种数据写入的方法，一种是使用`INSERT INTO`语句，另一种是使用HTTP API的[write](./rest_api.md)接口，写入Line
Protocol格式数据。

本页面只展示`INSERT`相关的语法。

### **INSERT**

#### 语法

```sql
INSERT [INTO] tb_name [ ( column_name [, ...] ) ] VALUES (  const [, ...] ) [, ...] | query; 
```

**说明**

CnosDB 要求插入的数据列必须要有时间戳，且VALUES列表必须为[常量](#常量)。
如果有列没有被选中，那么值为`NULL`。

**注意**

时间列不能为`NULL`，Tag列和Field列可以为`NULL`。

例如`INSERT INTO air (TIME, station, visibility) VALUES(1666132800000000000, NULL, NULL)`

如果 VALUES 列表需要表达式，请使用[INSERT SELECT](./sql.md#插入查询结果insert-select)语法。

### **插入一条记录**

TIME 列的数据既可以用时间字符串表示，也可以用数字类型的时间戳表示，请注意。

#### 示例

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

**注意**

关于时区表示，请参考[Timestamp](#timestamp-常量语法)。

### **插入多条记录**

`VALUES`关键字后面可以跟多个列表，用`,`分隔开。

#### 例子

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

### **插入查询结果(INSERT SELECT)**

你还可以使用 `INSERT SELECT`语法，向表中插入查询的数据。

#### 示例

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

### **插入重复数据**

[//]: # (2.3)

CnosDB的存储引擎可以看成一种KV存储，其中Timestamp 和 Tags 构成了 KEY，Fields 构成了一系列Value。

```
CREATE TABLE air (
    visibility DOUBLE,
    temperature DOUBLE,
    pressure DOUBLE,
    TAGS(station)
);
INSERT INTO air (TIME, station, visibility, temperature) VALUES
(1666165200290401000, 'XiaoMaiDao', 56, 69);
```

上面语句相当于插入了如下k-v对：

| key                                 | visibility-value | temperature-value | pressure-value |
|-------------------------------------|------------------|-------------------|----------------|
| (1666165200290401000, 'XiaoMaiDao') | 56               |                   |                |
| (1666165200290401000, 'XiaoMaiDao') |                  | 69                |                |

结果为

    select * from air;
    ----
    +----------------------------+------------+------------+-------------+----------+
    | time                       | station    | visibility | temperature | pressure |
    +----------------------------+------------+------------+-------------+----------+
    | 2022-10-19T07:40:00.290401 | XiaoMaiDao | 56.0       | 69.0        |          |
    +----------------------------+------------+------------+-------------+----------+

当同一field字段出现重复的k-v 对时，会发生覆盖。

```sql
INSERT INTO air (TIME, station, visibility) VALUES
(1666165200290401000, 'XiaoMaiDao', 66);
```

相当于插入

| key                                 | visibility-value | temperature-value | pressure-value |
|-------------------------------------|------------------|-------------------|----------------|
| (1666165200290401000, 'XiaoMaiDao') | 66               |                   |                |

key 为 (1666165200290401000, 'XiaoMaiDao') 的 visibility-value 发生变化，变为 66。

    select * from air;
    ----
    +----------------------------+------------+------------+-------------+----------+
    | time                       | station    | visibility | temperature | pressure |
    +----------------------------+------------+------------+-------------+----------+
    | 2022-10-19T07:40:00.290401 | XiaoMaiDao | 66.0       | 69.0        |          |
    +----------------------------+------------+------------+-------------+----------+

```sql
INSERT INTO air (TIME, station, pressure) VALUES
(1666165200290401000, 'XiaoMaiDao', 77);
```

相当于插入

| key                                 | visibility-value | temperature-value | pressure-value |
|-------------------------------------|------------------|-------------------|----------------|
| (1666165200290401000, 'XiaoMaiDao') |                  |                   | 77             |

    select * from air;
    ----
    +----------------------------+------------+------------+-------------+----------+
    | time                       | station    | visibility | temperature | pressure |
    +----------------------------+------------+------------+-------------+----------+
    | 2022-10-19T07:40:00.290401 | XiaoMaiDao | 66.0       | 69.0        | 77.0     |
    +----------------------------+------------+------------+-------------+----------+

## **查询数据**

CnosDB SQL 的灵感来自于 [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction.html)
，我们支持DataFusion的大部分SQL语法。

**注意**：为了查询能更高效，没有指定排序的查询，每次行顺序都不一定相同，如果需要按字段排序的话，请参看`ORDER BY`子句。

### 示例数据

为了进一步学习CnosDB，本节将提供示例数据供您下载，并教您如何将数据导入数据库。后面章节中引用的数据源都来自此示例数据。

### 下载数据

如果在 cnosdb-cli 中，请输入`\q`退出

在shell中执行以下命令将在本地生成一个名称为oceanic_station的Line Protocol格式的数据文件

```shell
curl -o oceanic_station.txt https://dl.cnosdb.com/sample/oceanic_station.txt
```

### 导入数据

- **启动CLI**
    ```shell
    cnosdb-cli
    ```
- **创建数据库**
    ```shell
    create database oceanic_station;
    ```
- **切换到指定数据库**
    ```shell
    \c oceanic_station
    ```
- **导入数据**

  执行\w指令，\w后面为数据文件的绝对路径或相对cnosdb-cli的工作路径。
    ```shell
    \w oceanic_station.txt
    ```

## SQL 语法

#### 语法

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

### SELECT 子句

### SELECT \*

通配符 * 可以用于代指全部列。

#### 示例

```
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

#### 语法

```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...];
```

在`SELECT`关键字后可以使用`DISTINCT`去掉重复字段，只返回去重后的值。
使用`ALL`会返回字段中所有重复的值。不指定此选项时，默认值为`ALL`。

#### 示例

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

### **别名**

可以用 `AS` 关键字为列表达式或表取别名。

### 为列表达式取别名

#### 语法

```sql
expression [ [ AS ] column_alias ]
```

#### 示例

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

### 为表取别名

你也可以用关键字`AS`为表取别名。

#### 语法

```sql
FROM tb_name [AS] alias_name
```

#### 示例

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

### **SELECT限制**

- 如果SELECT子句仅包含Tag列，相当于 SELECT DISTINCT Tag列

  #### 示例

  ```sql
  -- station是Tag列，temperature是Field列
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
  -- station 是Tag列
  SELECT station FROM air;
  ``` 
      +-------------+
      | station     |
      +-------------+
      | XiaoMaiDao  |
      | LianYunGang |
      +-------------+ 

### **LIMIT 子句**

#### 语法

```sql
LIMIT n
```

限制返回结果集的行数为n，n必须非负。

#### 示例

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

### **OFFSET 子句**

#### 语法

```sql
OFFSET m
```

返回的结果集跳过 m 条记录, 默认 m=0。

#### 示例

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

`OFFSET`可以和`LIMIT`语句配合使用，用于指定跳过的行数，格式为`LIMIT n OFFSET m`。
其中：`LIMIT n`控制输出m行数据，`OFFSET m`表示在开始返回数据之前跳过的行数。
OFFSET 0与省略OFFSET子句效果相同。

#### 示例

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

### **WITH 子句**

#### 语法

```sql
WITH cte AS cte_query_definiton [, ...] query
```

可选。WITH子句包含一个或多个常用的表达式CTE(Common Table Expression)。
CTE充当当前运行环境中的临时表，您可以在之后的查询中引用该表。CTE使用规则如下：

- 在同一WITH子句中的CTE必须具有唯一的名字。
- 在WITH子句中定义的CTE仅对在其后定义的同一WITH子句中的其他CTE可以使用。
  假设A是子句中的第一个CTE，B是子句中的第二个CTE：

#### 示例

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

### **UNION 子句**

UNION 子句用于合并多个 SELECT 语句的分析结果。

#### 语法

```
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

`UNION` 会对合并的结果集去重。
`UNION ALL` 保留合并的结果集中相同的数据。
`EXCEPT` 会作两个结果集的差，从左查询中返回右查询没有找到的所有非重复值。
`INTERSECT` 返回两个结果集的交集（即两个查询都返回的所有非重复值）。

**注意**

UNION 内每个 SELECT 子句必须拥有相同数量的列，对应列的数据类型相同。

#### 示例

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

### **ORDER BY 子句**

按引用的表达式对结果进行排序。默认情况使用升序 (ASC)。通过在 ORDER BY 的表达式后添加 DESC 按降序排序。

#### 示例

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

## **表达式**

表达式是符号和运算符的一种组合，CnosDB 将处理该组合以获得单个数据值。
简单表达式可以是一个常量、变量、列或标量函数。
可以用运算符将两个或更多的简单表达式联接起来组成复杂表达式。

#### 语法

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

#### 常量

表示单个特定数据值的符号。
详细内容请阅览[常量](#常量)。

#### 示例

```sql
select 1;
```

    +----------+
    | Int64(1) |
    +----------+
    | 1        |
    +----------+

#### 标量函数

详细内容请阅览[函数](#函数)

#### 单目运算符

| 运算符         | 说明                                                |
|-------------|---------------------------------------------------|
| NOT         | 如果子表达式为true，则整个表达式false，如果整个表达式为false，则整个表达式为true |
| IS NULL     | 如果子表达式为null，则整个表达式为true                           |
| IS NOT NULL | 如果子表达式为null，则整个表达式为false                          |

#### 二元运算符

二元运算符和两个表达式组合在一起，形成一个新的表达式。

支持的二元运算符有:

| 运算符          | 说明                                       |
|--------------|------------------------------------------|
| +            | 数字类型表达式相加                                |
| -            | 数字类型表达式相减                                |
| *            | 数字类型表达式相乘                                |
| /            | 数字类型表达式相除                                |
| %            | 整数类型表达式取余                                |
| &#124;&#124; | 字符串类型表达式拼接                               |
| =            | 比较表达式是否相等                                |
| !=、 <>       | 比较表达式是否不相等                               |
| <            | 比较表达式是否小于                                |
| <=           | 比较表达式是否小于等于                              |
| &gt;         | 比较表达式是否大于                                |
| >=           | 比较表达式是否大于等于                              |
| AND          | 先求左表达式的值，如果为true，计算右表达式的值，都为true为true    | 
| OR           | 先求左表达式的值，如果为false，计算右表达式的值，都为false为false |
| LIKE         | 判断左表达式是否符合右表达式的模式                        |

### **`BETWEEN AND` 表达式**

#### 语法

```sql
expr BETWEEN expr AND expr
```

#### 示例

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

注意：`BETWEEN x AND y` 会列出x和y之间的数，包括x和y

### **`IN` 表达式**

IN 操作符判断列表中是否有值与表达式相等。

#### 示例

```sql
SELECT station, temperature, visibility FROM air WHERE temperature  IN (68, 69);
```

    +-------------+-------------+------------+
    | station     | temperature | visibility |
    +-------------+-------------+------------+
    | XiaoMaiDao  | 69          | 56         |
    | LianYunGang | 69          | 78         |
    +-------------+-------------+------------+

**注意**：

IN 列表暂时只支持常量

### **`CASE WHEN` 表达式**

当表达式需要按照不同情况得不同的值时，可以使用 `CASE WHEN` 表达式。

#### 语法

```sql
CASE
    ( WHEN expression THEN result1 [, ...] )
    ELSE result
END;
```

#### 示例

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

### **运算符优先级**

如果一个复杂表达式有多个运算符，则运算符优先级将确定操作序列。 执行顺序可能对结果值有明显的影响。

运算符的优先级别如下表中所示。 在较低级别的运算符之前先对较高级别的运算符进行求值。 在下表中，1 代表最高级别，8 代表最低级别。

| 级别 | 运算符                       |
|----|---------------------------|
| 1  | *（乘）、/（除）、%（取模）           |
| 2  | +（正）、-（负）、+（加）、+（串联）、-（减） |
| 3  | =、>=、<=、<>、!=、>、<（比较运算符）  |
| 4  | NOT                       |
| 5  | AND                       |
| 6  | BETWEEN、IN、LIKE、OR        |

### **SHOW**

#### 语法

```sql
SHOW {DATABASES | TABLES | QUERIES}
```

显示所有数据库，或显示所有表, 或正在执行的SQL。

#### 示例

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

关于 SHOW QUERIES 语句的详细信息，可以在[系统表 QUERIES](#show-queries) 查看。

#### SHOW SERIES

返回指定表的series

#### 语法

```sql
SHOW SERIES [ON database_name] FROM table_name [WHERE expr] [order_by_clause] [limit_clause] 
```

#### 示例

```sql
SHOW SERIES FROM air WHERE station = 'XiaoMaiDao' ORDER BY key LIMIT 1;
```

    +------------------------+
    | key                    |
    +------------------------+
    | air,station=XiaoMaiDao |
    +------------------------+

**注意**

WEHER子句中的表达式列，只能是tag列或time列，ORDER BY 子句的表达式只能是 key

#### SHOW TAG VALUES

#### 语法

```sql
SHOW TAG VALUES [ON database_name] FROM table_name WITH KEY [<operator> "<tag_key>" | [[NOT] IN ("<tag_key1>", ..)]] [WHERE expr] [order_by_clause] [limit_clause];
```

operator 包括 `=`, `!=`。

#### 示例

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

#### 语法

```sql
EXPLAIN [ ANALYZE ] [ VERBOSE ] <statement>;
```

**说明**

`EXPLAIN` 语句仅用于显示查询的执行计划，而不执行查询。

`EXPLAIN ANALYZE` 执行查询，并显示查询的执行计划。

`EXPLAIN ANALYZE VERBOSE` 执行查询，并显示更详细的执行计划，包括读取的行数等。

#### 示例

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

#### 语法

```sql
DESCRIBE {DATABASE db_name | TABLE tb_name};
```

描述数据库的参数，描述表的模式。

#### 示例

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

[//]: # (示例：)

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

### **Join 子句**

CnosDB支持 `INNER JOIN`、`LEFT OUTER JOIN`、`RIGHT OUTER JOIN`、`FULL OUTER JOIN`。

目前暂不支持 `CROSS JOIN`。

### INNER JOIN

关键字 `JOIN` 或 `INNER JOIN` 定义了一个只显示两个表中匹配的行的连接。

#### 示例

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

用关键字 `LEFT JOIN` 或 `LEFT OUTER JOIN` 定义一个左连接。该连接包括左表中的所有行，如果右表没有匹配行，则连接的右侧为空值。

#### 示例

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

用关键字 `RIGHT JOIN` 或 `RIGHT OUTER JOIN` 定义一个右连接。该连接包括右表中的所有行，如果左表没有匹配行，则连接的左侧为空值。

#### 示例

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

关键字 `FULL JOIN` 或 `FULL OUTER JOIN` 定义了一个全连接，实际上它是 LEFT OUTER JOIN 和 RIGHT OUTER JOIN 的联合。
它会显示连接左侧和右侧的所有行，并将在连接的任一侧不匹配的地方产生空值。

#### 示例

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

### **GROUP BY 子句**

GROUP BY 子句必须在 WHERE 子句（如果有的话）的条件之后，ORDER BY 子句（如果有的话）之前。

#### 示例

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

### **HAVING 子句**

#### 语法

```sql
group_by_clause 
[ HAVING condition ];
```

在 SELECT 查询中，HAVING 子句必须紧随 GROUP BY 子句，并出现在 ORDER BY 子句（如果有的话）之前。

**HAVING 与 WHERE 的区别**

HAVING 在 GROUP BY 子句之后使你能够指定过滤条件，从而控制查询结果中哪些组可以出现在最终结果里面。

WHERE 在 GROUP BY 子句之前对被选择的列施加条件，而 HAVING 子句则对 GROUP BY 子句所产生的组施加条件。

#### 示例

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

### **复杂的分组操作**

CnosDB 提供了 `ROLLUP`，`CUBE` 等复杂分组操作，使您能以不同的方式操作查询结果

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
您可以在单个查询中使用 ROLLUP 选项来生成多个分组集。

ROLLUP 假定输入列之间存在层次结构。

如果你的group by 子句是：

#### 语法

```sql
SELECT ...
FROM ...
GROUP BY ROLLUP(column_1,column_2);
```

它与如下的语句等同：

#### 语法

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

ROLLUP 生成在此层次结构中有意义的所有分组集。 每次 column_1 的值发生变化时，它都会生成一个小计行；

因此，我们经常在报告中使用 ROLLUP 来生成小计和总计。 ROLLUP 中列的顺序非常重要。

#### 示例

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

与 ROLLUP 类似，CUBE 是 GROUP BY 子句的扩展。 它允许您为 GROUP BY 子句中指定的分组列的所有组合生成小计。

[//]: # (CUBE 就像结合了 GROUPING SETS 和 ROLLUP。)
CUBE为指定表达式集的每个可能组合创建分组集。首先会对(A、B、C)进行group by，

然后依次是(A、B)，(A、C)，(A)，(B、C)，(B)，(C)，最后对全表进行group by操作。

```sql
SELECT ... 
FROM ...
GROUP BY CUBE (column1, column2);
```

等价于：

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

#### 示例

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

## **聚合函数**

### **一般聚合函数**

### COUNT

#### 语法

    COUNT(x)

**功能**：返回选定元素中检索过的行的数目。

包含DISTINCT关键字，会对去重后的结果计数。

> COUNT(*) 和 COUNT(literal value) 是等价的，如果sql的投影中仅含有 `*/literal value`，则sql会被重写为 COUNT(time)。

> COUNT(tag) 等价于 COUNT(DISTINCT tag)。

> COUNT(field) 返回非NULL值的个数。

**参数类型**：任意

**返回类型**：BIGINT

#### 示例

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

### SUM

#### 语法

    SUM(NUMERICS)

**功能**：返回从选定元素计算出的总和值。

**参数类型**：数值类型。

**返回类型**：与参数类型相同。

#### 示例

```sql
SELECT SUM(temperature) FROM air;
```

    +----------------------+
    | SUM(air.temperature) |
    +----------------------+
    | 917                  |
    +----------------------+

----------------

### MIN

#### 语法

    MIN(STRING | NUMERICS | TIMESTAMP)

**功能**：返回选定元素中最小值。

**参数类型**：数值类型或STRING或TIMESTAMP。

**返回类型**：与参数类型相同。

#### 示例

```sql
 SELECT MIN(time), MIN(station), MIN(temperature) FROM air;
```

    +---------------------+------------------+----------------------+
    | MIN(air.time)       | MIN(air.station) | MIN(air.temperature) |
    +---------------------+------------------+----------------------+
    | 2022-01-28T13:21:00 | LianYunGang      | 53                   |
    +---------------------+------------------+----------------------+

----------------

### MAX

#### 语法

    MAX(STRINGS | NUMERICS | TIMESTAMPS)

**功能**：返回选定元素中最大值。

**参数类型**：数值类型或STRING或TIMESTAMP。

**返回类型**：与参数类型相同。

#### 示例

```sql
SELECT MAX(time), MAX(station), MAX(temperature) FROM air;
```

    +---------------------+------------------+----------------------+
    | MAX(air.time)       | MAX(air.station) | MAX(air.temperature) |
    +---------------------+------------------+----------------------+
    | 2022-01-28T13:39:00 | XiaoMaiDao       | 80                   |
    +---------------------+------------------+----------------------+

----------------

### AVG

#### 语法

    AVG(NUMERICS)

**功能**：返回选定元素的平均值。

**参数类型**：数值类型。

**返回类型**：数值类型。

#### 示例

```sql
SELECT AVG(temperature) FROM air;
```

    +----------------------+
    | AVG(air.temperature) |
    +----------------------+
    | 70.53846153846153    |
    +----------------------+

----------------

### ARRAY_AGG

#### 语法

    ARRAY_AGG(expr)

**功能**：返回一个数组，该数组由选定元素的所有值组成，元素类型必须相同。

**参数类型**：任意。

**返回类型**：参数类型的数组。

#### 示例

```sql
SELECT ARRAY_AGG(temperature) from air;
```

    +------------------------------------------------------+
    | ARRAYAGG(air.temperature)                            |
    +------------------------------------------------------+
    | [69, 78, 62, 79, 53, 72, 71, 69, 80, 74, 70, 70, 70] |
    +------------------------------------------------------+

**注意**：该聚合函数结果，无法以CSV格式返回。

### FIRST

    first(time,  value)

获取一列按另一列排序的第一个值。

**参数**:

- time: Timestamp

- value: any

**返回值**: 同value类型相同

#### 示例

```sql
select first(time, pressure) from air;
```

    +------------------------------+
    | first(air.time,air.pressure) |
    +------------------------------+
    | 63.0                         |
    +------------------------------+

### LAST

    last(time,  value)

获取一列按另一列排序的最后一个值。

**参数**:

- time: Timestamp

- value: any

**返回值**: 同value类型相同

#### 示例

```sql
select last(time, pressure) from air;
```

    +-----------------------------+
    | last(air.time,air.pressure) |
    +-----------------------------+
    | 55.0                        |
    +-----------------------------+

### MODE

    mode(value)

计算一列的众数。

**参数**: value: any

**返回值**: 同value类型相同

#### 示例

```sql
select mode(pressure) from air;
```

    +--------------------+
    | mode(air.pressure) |
    +--------------------+
    | 69.0               |
    +--------------------+

### INCREASE

    increase(time, value order by time)

计算 value 在时间序列中的增量

**参数**: value 数字类型

**返回值**: 同value类型相同

**示例**：

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

    +----+----------+
    | t0 | increase |
    +----+----------+
    | a  | 7        |
    | b  | 7        |
    +----+----------+

### 统计聚合函数

### VAR | VAR_SAMP

#### 语法

    VAR(NUMERICS)

**功能**：计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

```sql
SELECT VAR(temperature) FROM air;
```

    +---------------------------+
    | VARIANCE(air.temperature) |
    +---------------------------+
    | 51.43589743589741         |
    +---------------------------+

----------------

### VAR_POP

#### 语法

    VAR_POP(NUMERICS)

**功能**：计算总体方差。

**参数类型**：数值类型。

**返回类型**：DOUBLE

#### 示例

```
SELECT VAR_POP(temperature) FROM air;
```

    +------------------------------+
    | VARIANCEPOP(air.temperature) |
    +------------------------------+
    | 47.47928994082838            |
    +------------------------------+

----------------

### STDDEV | STDDEV_SAMP

    STDDEV(NUMERICS)

**功能**：计算样本标准差。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

```sql
SELECT STDDEV(temperature) FROM air;
```

    +-------------------------+
    | STDDEV(air.temperature) |
    +-------------------------+
    | 7.1718824192744135      |
    +-------------------------+

----------------

### STDDEV_POP

#### 语法

    STDDEV_POP(NUMERICS)

**功能**：计算出的总体标准差。

**参数类型**：数值类型。

**返回类型**：DOUBLE

#### 示例

```sql
SELECT STDDEV_POP(temperature) FROM air;
```

    +----------------------------+
    | STDDEVPOP(air.temperature) |
    +----------------------------+
    | 6.890521746633442          |
    +----------------------------+

----------------

### COVAR | COVAR_SAMP

#### 语法

    COVAR(NUMERICS, NUMERICS)

**功能**：返回样本的协方差。

**参数类型**：数值类型。

**返回类型**：DOUBLE

#### 示例

```sql
SELECT COVAR(temperature, pressure) FROM air;
```

    +------------------------------------------+
    | COVARIANCE(air.temperature,air.pressure) |
    +------------------------------------------+
    | -5.121794871794841                       |
    +------------------------------------------+

----------------

### COVAR_POP

#### 语法

    COVAR_POP(NUMERICS, NUMERICS)

**功能**：返回组中数字对的总体协方差。

**参数类型**：数值类型。

**返回类型**：DOUBLE

#### 示例

```sql
SELECT COVAR_POP(temperature, pressure) FROM air;
```

    +---------------------------------------------+
    | COVARIANCEPOP(air.temperature,air.pressure) |
    +---------------------------------------------+
    | -4.727810650887546                          |
    +---------------------------------------------+

----------------

### CORR

#### 语法

    CORR**(NUMERICS, NUMERICS)

**功能**：返回表示一组数字对之间的关联情况的皮尔逊系数。

**参数类型**：数值类型。

**返回类型**：DOUBLE

#### 示例

```sql
SELECT CORR(temperature, pressure) FROM air;
```

    +-------------------------------------------+
    | CORRELATION(air.temperature,air.pressure) |
    +-------------------------------------------+
    | -0.07955796767766017                      |
    +-------------------------------------------+

### **近似聚合函数**

### APPROX_DISTINCT

#### 语法

    APPROX_DISTINCT(x)

**功能**：返回不同输入值的近似值(HyperLogLog)。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

```sql
SELECT APPROX_DISTINCT(station) FROM air;
```

    +-----------------------------+
    | APPROXDISTINCT(air.station) |
    +-----------------------------+
    | 2                           |
    +-----------------------------+

----------------

### APPROX_PERCENTILE_CONT

#### 语法

    APPROX_PERCENTILE_CONT(x, p)  

**功能**：返回输入值x的近似百分位(TDigest)，p是百分位，是0到1(包括1)之间的64位浮点数。

**参数类型**：x为数值类型，p为DOUBLE类型。

**返回类型**：DOUBLE

#### 示例

```sql
SELECT APPROX_PERCENTILE_CONT(temperature, 0.1) FROM air;
```

    +----------------------------------------------------+
    | APPROXPERCENTILECONT(air.temperature,Float64(0.1)) |
    +----------------------------------------------------+
    | 60.4                                               |
    +----------------------------------------------------+

----------------

### APPROX_PERCENTILE_CONT_WITH_WEIGHT

#### 语法

    APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, w, p)  

**功能**：x返回带权重的输入值的近似百分比(TDigest)，其中w是权重列表达式，p是0到1(包括)之间的浮点64。

APPROX_PERCENTILE_CONT(x, p) 相当于 APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, 1, p)。

**参数类型**：x,w为数值类型，p为DOUBLE类型。

**返回类型**：DOUBLE

#### 示例

```sql
SELECT APPROX_PERCENTILE_CONT_WITH_WEIGHT(temperature,2, 0.1) FROM air;
```

    +-----------------------------------------------------------------------+
    | APPROXPERCENTILECONTWITHWEIGHT(air.temperature,Int64(2),Float64(0.1)) |
    +-----------------------------------------------------------------------+
    | 54.35                                                                 |
    +-----------------------------------------------------------------------+

----------------

### APPROX_MEDIAN(NUMERICS)

#### 语法

    APPROX_MEDIAN(NUMERICS)

**功能**：返回输入值的近似中值。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

[//]: # (**功能**：函数采用单个参数，该参数必须是 GROUP BY 子句的 ROLLUP、CUBE 或 GROUPING SETS 扩展的表达式列表中指定的维度列的表达式。)

[//]: # (**参数类型**：数值类型)

[//]: # (**返回类型** BIGINT)

### SAMPLE

#### 语法

    SAMPLE(<column_key>, <N>)

**功能**：从给定的列 column_key 中随机选择 N 条记录。

**参数类型**：

- column_key：任意类型

- N：整数类型

**返回类型**：数组

#### 示例

```sql
select sample(visibility, 5) from air;
```

    +--------------------------------------+
    | sample(air.visibility,Int64(5))      |
    +--------------------------------------+
    | [65.0, 74.0, 76.0, 77.0, 72.0, 77.0] |
    +--------------------------------------+

### ASAP_SMOOTH

    asap_smooth(time, value, resolution order by time)

ASAP smoothing算法旨在创建人类可读的图形，保留输入数据的粗糙形状和较大趋势，同时最小化点之间的局部方差。
采用 (Timestamp，value）对，将它们标准化为目标时间间隔，并返回 ASAP smooth 值。

**参数：**

- time: Timestamp

- value: Double

- resolution: Bigint ，要返回的大概点数（ (Timestamp, value) 对），确定结果图的水平分辨率。

**返回值：** TimeVector

```
Struct {
  time: List[Timestamp], -- 毫秒级
  value: List[Double],
  resolution: Int Unsigned,
}
```

#### 示例

```sql
select asap_smooth(time, pressure, 10) from air group by date_trunc('month', time);
```

    +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | asap_smooth(air.time,air.pressure,Int64(10))                                                                                                                                                                                                                                                                                                                                                                                                   |
    +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | {time: [2023-01-14T16:00:00, 2023-01-16T14:13:00, 2023-01-18T12:26:00, 2023-01-20T10:39:00, 2023-01-22T08:52:00, 2023-01-24T07:05:00, 2023-01-26T05:18:00, 2023-01-28T03:31:00, 2023-01-30T01:44:00, 2023-01-31T23:57:00], value: [64.79507211538461, 65.31009615384616, 65.25841346153847, 64.8485576923077, 65.09495192307692, 65.02524038461539, 64.8389423076923, 65.2421875, 65.02103365384616, 65.1141826923077], resolution: 10}        |
    | {time: [2023-02-01T00:00:00, 2023-02-04T02:39:40, 2023-02-07T05:19:20, 2023-02-10T07:59:00, 2023-02-13T10:38:40, 2023-02-16T13:18:20, 2023-02-19T15:58:00, 2023-02-22T18:37:40, 2023-02-25T21:17:20, 2023-02-28T23:57:00], value: [65.20982142857143, 64.90625, 64.94828869047619, 64.97916666666667, 64.88504464285714, 64.8203125, 64.64434523809524, 64.88802083333333, 65.0, 64.76004464285714], resolution: 10}                           |
    | {time: [2023-03-01T00:00:00, 2023-03-02T12:26:40, 2023-03-04T00:53:20, 2023-03-05T13:20:00, 2023-03-07T01:46:40, 2023-03-08T14:13:20, 2023-03-10T02:40:00, 2023-03-11T15:06:40, 2023-03-13T03:33:20, 2023-03-14T16:00:00], value: [65.29115853658537, 64.58307926829268, 64.7530487804878, 64.76753048780488, 65.14405487804878, 65.4298780487805, 65.1920731707317, 65.10365853658537, 64.86356707317073, 64.83841463414635], resolution: 10} |
    +------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

## **两阶段聚合函数**

### stats_agg

对二维数据执行线性回归分析，例如计算相关系数和协方差。
并且还可以分别计算每个维度的常见统计数据，例如平均值和标准差。
stats_agg 提供了与sum, count, corr, covar_pop 等聚合函数相同的功能，
适用于一条SQL中，包含多个分析函数的场景。

**注意**： 两列都不为NULL时才纳入聚合。

#### stats_agg

    stats_agg(y, x)

**功能**：进行统计聚合。

**参数类型**：

- y: double 类型
- x: double 类型

**返回类型**：结构体类型

```
{ 
  n: bigint,   -- count 
  sx: double,  -- sum(x)- sum(x)
  sx2: double, -- sum((x-sx/n)^2) (sum of squares)
  sx3: double, -- sum((x-sx/n)^3)
  sx4: double, -- sum((x-sx/n)^4)
  sy: double,  -- sum(y)
  sy2: double, -- sum((y-sy/n)^2) (sum of squares)
  sy3: double, -- sum((y-sy/n)^3)
  sy4: double, -- sum((y-sy/n)^4)
  sxy: double, -- sum((x-sx/n)*(y-sy/n)) (sum of products) 
}
```

#### 示例

```sql
create table if not exists test_stats(x bigint, y bigint);
alter database public set ttl '1000000d';
insert into test_stats(time, x, y) values
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 2, 1),
(7, 2, 2),
(8, 2, 3),
(9, 2, 4),
(10, 2, 5);
```

```sql
select stats_agg(y, x) from test_stats;
```

    +------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | stats_agg(test_stats.y,test_stats.x)                                                                                                                       |
    +------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | {n: 10, sx: 15.0, sx2: 2.5, sx3: -2.7755575615628914e-16, sx4: 0.6249999999999999, sy: 30.0, sy2: 20.0, sy3: -1.7763568394002505e-15, sy4: 68.0, sxy: 0.0} |
    +------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### num_vals

计算二维统计聚合后的数据行数。

**返回类型**：BIGINT UNSIGNED

```sql
select num_vals(stats_agg(y, x)) from test_stats;
```

    +------------------------------------------------+
    | num_vals(stats_agg(test_stats.y,test_stats.x)) |
    +------------------------------------------------+
    | 10                                             |
    +------------------------------------------------+

#### average_y, average_x

计算二维统计聚合后指定维度的平均值。

**返回类型**：DOUBLE

```sql
select average_x(stats_agg(y, x)) from test_stats;
```

    +-------------------------------------------------+
    | average_x(stats_agg(test_stats.y,test_stats.x)) |
    +-------------------------------------------------+
    | 1.5                                             |
    +-------------------------------------------------+

#### sum_y, sum_x

计算二维统计聚合后指定维度的和，方式为 population。

**返回类型**：DOUBLE

```sql
select sum_x(stats_agg(y, x)) from test_stats;
```

    +---------------------------------------------+
    | sum_x(stats_agg(test_stats.y,test_stats.x)) |
    +---------------------------------------------+
    | 15.0                                        |
    +---------------------------------------------+

#### stddev_samp_y, stddev_samp_x

计算二维统计聚合后指定维度的标准差，方式为 sample。

**返回类型**：DOUBLE

```sql
select stddev_samp_x(stats_agg(y, x)) from test_stats;
```

    +-----------------------------------------------------+
    | stddev_samp_x(stats_agg(test_stats.y,test_stats.x)) |
    +-----------------------------------------------------+
    | 0.5270462766947299                                  |
    +-----------------------------------------------------+

#### stddev_pop_y, stddev_pop_x

计算二维统计聚合后指定维度的标准差，方式为 population。

**返回类型**：DOUBLE

```sql
select stddev_pop_x(stats_agg(y, x)) from test_stats;
```

    +----------------------------------------------------+
    | stddev_pop_x(stats_agg(test_stats.y,test_stats.x)) |
    +----------------------------------------------------+
    | 0.5                                                |
    +----------------------------------------------------+

#### var_samp_y, var_samp_x

计算二维统计聚合后指定维度的方差，方式为 sample。

**返回类型**：DOUBLE

```sql
select var_samp_x(stats_agg(y, x)) from test_stats;
```

    +--------------------------------------------------+
    | var_samp_x(stats_agg(test_stats.y,test_stats.x)) |
    +--------------------------------------------------+
    | 0.2777777777777778                               |
    +--------------------------------------------------+

#### var_pop_y, var_pop_x

计算二维统计聚合后指定维度的方差，方式为 population。

**返回类型**：DOUBLE

```sql
select var_pop_x(stats_agg(y, x)) from test_stats;
```

    +-------------------------------------------------+
    | var_pop_x(stats_agg(test_stats.y,test_stats.x)) |
    +-------------------------------------------------+
    | 0.25                                            |
    +-------------------------------------------------+

#### skewness_samp_y, skewness_samp_x

计算二维统计聚合后指定维度的偏度值，方式为 sample。

**返回类型**：DOUBLE

```sql
select skewness_samp_x(stats_agg(y, x)) from test_stats;
```

    +-------------------------------------------------------+
    | skewness_samp_x(stats_agg(test_stats.y,test_stats.x)) |
    +-------------------------------------------------------+
    | -2.1065000811460203e-16                               |
    +-------------------------------------------------------+

#### skewness_pop_y, skewness_pop_x

计算二维统计聚合后指定维度的偏度值，方式为 population。

**返回类型**：DOUBLE

```sql
select skewness_pop_x(stats_agg(y, x)) from test_stats;
```

    +------------------------------------------------------+
    | skewness_pop_x(stats_agg(test_stats.y,test_stats.x)) |
    +------------------------------------------------------+
    | -2.220446049250313e-16                               |
    +------------------------------------------------------+

#### kurtosis_samp_y, kurtosis_samp_x

计算二维统计聚合后指定维度的峰度值，方式为 sample。

**返回类型**：DOUBLE

```sql
select kurtosis_samp_x(stats_agg(y, x)) from test_stats;
```

    +-------------------------------------------------------+
    | kurtosis_samp_x(stats_agg(test_stats.y,test_stats.x)) |
    +-------------------------------------------------------+
    | 0.8999999999999998                                    |
    +-------------------------------------------------------+

#### kurtosis_pop_y, kurtosis_pop_x

计算二维统计聚合后指定维度的峰度值，方式为 population。

**返回类型**：DOUBLE

```sql
select kurtosis_pop_x(stats_agg(y, x)) from test_stats;
```

    +------------------------------------------------------+
    | kurtosis_pop_x(stats_agg(test_stats.y,test_stats.x)) |
    +------------------------------------------------------+
    | 0.9999999999999998                                   |
    +------------------------------------------------------+

#### correlation

计算二维统计聚合后的相关。

**返回类型**：DOUBLE

```sql
select correlation(stats_agg(y, x)) from test_stats;
```

    +---------------------------------------------------+
    | correlation(stats_agg(test_stats.y,test_stats.x)) |
    +---------------------------------------------------+
    | 0.0                                               |
    +---------------------------------------------------+

#### covariance_samp, covariance_pop

计算二维统计聚合后的协方差。

**返回类型**：DOUBLE

```sql
select covariance_samp(stats_agg(y, x)) from test_stats;
```

    +-------------------------------------------------------+
    | covariance_samp(stats_agg(test_stats.y,test_stats.x)) |
    +-------------------------------------------------------+
    | 0.0                                                   |
    +-------------------------------------------------------+

```sql
select covariance_pop(stats_agg(y, x)) from test_stats;
```

    +------------------------------------------------------+
    | covariance_pop(stats_agg(test_stats.y,test_stats.x)) |
    +------------------------------------------------------+
    | 0.0                                                  |
    +------------------------------------------------------+

#### determination_coeff

计算二维统计聚合后的决定系数。

**返回类型**：DOUBLE

```sql
select determination_coeff(stats_agg(y, x)) from test_stats;
```

    +-----------------------------------------------------------+
    | determination_coeff(stats_agg(test_stats.y,test_stats.x)) |
    +-----------------------------------------------------------+
    | 0.0                                                       |
    +-----------------------------------------------------------+

#### slope

根据二维统计聚合，计算线性拟合线的斜率。

**返回类型**：DOUBLE

```sql
select slope(stats_agg(y, x)) from test_stats;
```

    +---------------------------------------------+
    | slope(stats_agg(test_stats.y,test_stats.x)) |
    +---------------------------------------------+
    | 0.0                                         |
    +---------------------------------------------+

#### intercept

计算二维统计聚合后y的截距。

**返回类型**：DOUBLE

```sql
select intercept(stats_agg(y, x)) from test_stats;
```

    +-------------------------------------------------+
    | intercept(stats_agg(test_stats.y,test_stats.x)) |
    +-------------------------------------------------+
    | 3.0                                             |
    +-------------------------------------------------+

#### x_intercept

计算二维统计聚合后x的截距。

**返回类型**：DOUBLE

```sql
select x_intercept(stats_agg(y, x)) from test_stats;
```

    +---------------------------------------------------+
    | x_intercept(stats_agg(test_stats.y,test_stats.x)) |
    +---------------------------------------------------+
    | -inf                                              |
    +---------------------------------------------------+

### gauge_agg

分析Gauge数据。与Counter不同，Gauge可以减少也可以增加。

#### gauge_agg

    gauge_agg(time, value)

这是分析 Gauge 数据的第一步。使用 gauge_agg 创建中间聚合数据，
接下来其他函数使用中间聚合数据进行计算。

**参数**：

- time: Timestamp

- value: DOUBLE

**返回值**：

```
Struct {
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
  num_elements: Bigint Unsingned 
}
```

#### 示例：

```sql
select gauge_agg(time, pressure) from air group by date_trunc('month', time);
```

    +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | gauge_agg(air.time,air.pressure)                                                                                                                                                                                |
    +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | {first: {ts: 2023-03-01T00:00:00, val: 54.0}, second: {ts: 2023-03-01T00:00:00, val: 59.0}, penultimate: {ts: 2023-03-14T16:00:00, val: 55.0}, last: {ts: 2023-03-14T16:00:00, val: 80.0}, num_elements: 13122} |
    | {first: {ts: 2023-01-14T16:00:00, val: 63.0}, second: {ts: 2023-01-14T16:00:00, val: 68.0}, penultimate: {ts: 2023-01-31T23:57:00, val: 77.0}, last: {ts: 2023-01-31T23:57:00, val: 54.0}, num_elements: 16640} |
    | {first: {ts: 2023-02-01T00:00:00, val: 54.0}, second: {ts: 2023-02-01T00:00:00, val: 60.0}, penultimate: {ts: 2023-02-28T23:57:00, val: 74.0}, last: {ts: 2023-02-28T23:57:00, val: 59.0}, num_elements: 26880} |
    +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### delta

获取一段时间内Gauge的变化。这是简单的增量，通过从第一个值减去最后一个看到的值来计算。

**返回值:** Double

```sql
select delta(gauge_agg(time, pressure)) from air group by date_trunc('month', time);
```

    +-----------------------------------------+
    | delta(gauge_agg(air.time,air.pressure)) |
    +-----------------------------------------+
    | 26.0                                    |
    | -9.0                                    |
    | 5.0                                     |
    +-----------------------------------------+

#### time_delta

获取持续时间，最后一个Gauge的时间减去第一个Gauge的时间。

**返回值**： INTERVAL

```sql
select time_delta(gauge_agg(time, pressure)) from air group by date_trunc('month', time);
```

    +----------------------------------------------------------+
    | time_delta(gauge_agg(air.time,air.pressure))             |
    +----------------------------------------------------------+
    | 0 years 0 mons 13 days 16 hours 0 mins 0.000000000 secs  |
    | 0 years 0 mons 17 days 7 hours 57 mins 0.000000000 secs  |
    | 0 years 0 mons 27 days 23 hours 57 mins 0.000000000 secs |
    +----------------------------------------------------------+

#### rate

计算Gauge变化和时间变化的比率。

**返回值**: Double

单位：

时间单位是ns时，比率单位是 /ns，

时间单位是ms时，比率单位就是 /ms

时间单位是s时，比率单位就是 /s

```sql
select rate(gauge_agg(time, pressure)) from air group by date_trunc('month', time);
```

    +----------------------------------------+
    | rate(gauge_agg(air.time,air.pressure)) |
    +----------------------------------------+
    | 2.2018970189701897e-14                 |
    | 9.349414325974008e-15                  |
    | -4.133905465849807e-16                 |
    +----------------------------------------+

### compact_state_agg

给定一个在离散状态之间切换的系统或值，

汇总每个状态所花费的时间。

例如，您可以使用compact_state_agg函数来跟踪系统

处于错误、运行或启动状态的时间。

compact_state_agg 设计用于处理相对较少的状态。它可能在行之间状态过多的数据集上表现不佳。

如果您需要跟踪进入和退出每个状态的时间，请使用 state_agg 函数。

如果您需要根据心跳信号跟踪系统的活跃度，请考虑使用 heartbeat_agg 函数。

#### compact_state_agg

    compact_state_agg(ts, state)

统计每个状态所花费的时间，并聚合成StateAggData类型

**参数**： ts 为时间戳类型，state为任意类型

**返回值**： StateAggData 类型

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
alter database public set ttl '1000000d';

create table if not exists states(state STRING);

insert into states values
('2020-01-01 10:00:00', 'starting'),
('2020-01-01 10:30:00', 'running'),
('2020-01-03 16:00:00', 'error'),
('2020-01-03 18:30:00', 'starting'),
('2020-01-03 19:30:00', 'running'),
('2020-01-05 12:00:00', 'stopping');
```

```sql
select compact_state_agg(time, state) from states;
```

    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | compact_state_agg(states.time,states.state)                                                                                                                                                                                                                                                                                                                                          |
    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | {state_duration: [{state: running, duration: 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs}, {state: error, duration: 0 years 0 mons 0 days 2 hours 30 mins 0.000000000 secs}, {state: starting, duration: 0 years 0 mons 0 days 1 hours 30 mins 0.000000000 secs}, {state: stopping, duration: 0 years 0 mons 0 days 0 hours 0 mins 0.000000000 secs}], state_periods: []} |
    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### duration_in

    duration_in(state_agg_data, state [,begin_time, interval_time]) 

统计某个状态的持续时间，或统计某个状态在某个时间段内的持续时间。

**参数**：

state_agg_data: StateAggData

state: any 与compact_state_agg 的state类型相同。

begin_time: 可选，指定时间段内的开始时间。

interval_time: 可选，指定时间段的持续时间，不指定时，时间段为无穷大。

**返回值**： INTERVAL 类型

#### 示例：

```sql
select duration_in(compact_state_agg(time, state), 'running') from states;
```

    +--------------------------------------------------------------------------+
    | duration_in(compact_state_agg(states.time,states.state),Utf8("running")) |
    +--------------------------------------------------------------------------+
    | 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs                   |
    +--------------------------------------------------------------------------+

### state_agg

给定一个在离散状态之间切换的系统或值，跟踪状态之间的转换。

#### state_agg

    state_agg(ts, state)

统计每个状态所花费的时间，，并聚合成StateAggData类型。

```sql
alter database public set ttl '1000000d';

create table if not exists states(state STRING);

insert into states values
('2020-01-01 10:00:00', 'starting'),
('2020-01-01 10:30:00', 'running'),
('2020-01-03 16:00:00', 'error'),
('2020-01-03 18:30:00', 'starting'),
('2020-01-03 19:30:00', 'running'),
('2020-01-05 12:00:00', 'stopping');
```

```sql
select state_agg(time, state) from states;
```

    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | state_agg(states.time,states.state)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | {state_duration: [{state: starting, duration: 0 years 0 mons 0 days 1 hours 30 mins 0.000000000 secs}, {state: running, duration: 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs}, {state: stopping, duration: 0 years 0 mons 0 days 0 hours 0 mins 0.000000000 secs}, {state: error, duration: 0 years 0 mons 0 days 2 hours 30 mins 0.000000000 secs}], state_periods: [{state: starting, periods: [{start_time: 2020-01-01T10:00:00, end_time: 2020-01-01T10:30:00}, {start_time: 2020-01-03T18:30:00, end_time: 2020-01-03T19:30:00}]}, {state: error, periods: [{start_time: 2020-01-03T16:00:00, end_time: 2020-01-03T18:30:00}]}, {state: running, periods: [{start_time: 2020-01-01T10:30:00, end_time: 2020-01-03T16:00:00}, {start_time: 2020-01-03T19:30:00, end_time: 2020-01-05T12:00:00}]}]} |
    +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### duration_in

    duration_in(state_agg_data, state [,begin_time, interval_time]) 

统计某个状态的持续时间，或统计某个状态在某个时间段内的持续时间。

**参数**：

state_agg_data: StateAggData

state: any 与compact_state_agg 的state类型相同。

begin_time: 可选，指定时间段内的开始时间。

interval_time: 可选，指定时间段的持续时间，不指定时，时间段为无穷大。

**返回值**： INTERVAL 类型

#### 示例：

统计 'running' 状态的持续时间。

```sql
select duration_in(state_agg(time, state), 'running') from states;
```

    +------------------------------------------------------------------+
    | duration_in(state_agg(states.time,states.state),Utf8("running")) |
    +------------------------------------------------------------------+
    | 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs           |
    +------------------------------------------------------------------+

统计 从2020-01-01 11:00:00 开始 'running' 状态的持续时间。

```sql
select duration_in(state_agg(time, state), 'running', Timestamp '2020-01-01 11:00:00') 
from states;
```

    +----------------------------------------------------------------------------------------------+
    | duration_in(state_agg(states.time,states.state),Utf8("running"),Utf8("2020-01-01 11:00:00")) |
    +----------------------------------------------------------------------------------------------+
    | 0 years 0 mons 3 days 21 hours 30 mins 0.000000000 secs                                      |
    +----------------------------------------------------------------------------------------------+

统计 从2020-01-01 11:00:00 开始的四天内 'running' 状态的持续时间。

```sql
select duration_in(state_agg(time, state), 'running', Timestamp '2020-01-01 11:00:00', interval '4 day')
from states;
```

    +-------------------------------------------------------------------------------------------------------------------------------------------+
    | duration_in(state_agg(states.time,states.state),Utf8("running"),Utf8("2020-01-01 11:00:00"),IntervalMonthDayNano("73786976294838206464")) |
    +-------------------------------------------------------------------------------------------------------------------------------------------+
    | 0 years 0 mons 3 days 20 hours 30 mins 0.000000000 secs                                                                                   |
    +-------------------------------------------------------------------------------------------------------------------------------------------+

#### state_at

    state_at(state_agg_data, ts)

统计某一时刻所处的状态。

**参数**：

- state_agg_data: StateAggData

- ts: Timestamp

**返回值**： any 类型，与state_agg_data 统计的状态类型相同。

```sql
select state_at(state_agg(time, state), Timestamp '2020-01-01 10:30:00') from states;
```

    +---------------------------------------------------------------------------+
    | state_at(state_agg(states.time,states.state),Utf8("2020-01-01 10:30:00")) |
    +---------------------------------------------------------------------------+
    | running                                                                   |
    +---------------------------------------------------------------------------+

### candlestick_agg

进行金融资产数据分析。该功能使编写涉及 candlestick 财务分析查询变得更容易。

candlestick_agg 能得到股票的开盘价和收盘价，何时最高价。

candlestick_agg 从原始报价数据生成中间聚合数据CandleStackData ，

然后可以对此中间聚合数据使用访问函数和汇总函数。

#### candlestick_agg

    candlestick_agg(time, price, volume)

从原始报价查询生成中间聚合数据 CandleStackData 。

**参数：**

- time: Timestamp

- price: Double 价格

- volume: Double 交易量

**返回值：** CandleStackData

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

#### 示例

```sql
alter database public set ttl '1000000d';
create table if not exists tick(price bigint ,volume bigint);
insert tick(time, price, volume)
values
    ('1999-12-31 00:00:00.000', 111, 444),
    ('1999-12-31 00:00:00.005', 222, 444),
    ('1999-12-31 00:00:00.010', 333, 222),
    ('1999-12-31 00:00:10.015', 444, 111),
    ('1999-12-31 00:00:10.020', 222, 555),
    ('1999-12-31 00:10:00.025', 333, 555),
    ('1999-12-31 00:10:00.030', 444, 333),
    ('1999-12-31 01:00:00.035', 555, 222);
```

```sql
select candlestick_agg(time, price, volume) from tick;
```

    +-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | candlestick_agg(tick.time,tick.price,tick.volume)                                                                                                                                                                                   |
    +-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | {open: {ts: 1999-12-31T00:00:00, val: 111.0}, close: {ts: 1999-12-31T01:00:00.035, val: 555.0}, low: {ts: 1999-12-31T00:00:00, val: 111.0}, high: {ts: 1999-12-31T01:00:00.035, val: 555.0}, volume: {vol: 2886.0, vwap: 850149.0}} |
    +-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

#### close

    close(candlestick_agg_data)

获取收盘价。

**返回值：** DOUBLE

#### 示例

```sql
select close(candlestick_agg(time, price, volume)) from tick;
```

    +----------------------------------------------------------+
    | close(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +----------------------------------------------------------+
    | 555.0                                                    |
    +----------------------------------------------------------+

#### close_time

    close_time(candlestick_agg_data)

获取收盘时间。

**返回值：** Timestamp

#### 示例

```sql
select close_time(candlestick_agg(time, price, volume)) from tick;
```

    +---------------------------------------------------------------+
    | close_time(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +---------------------------------------------------------------+
    | 1999-12-31T01:00:00.035                                       |
    +---------------------------------------------------------------+

#### high

    high(candlestick_agg_data)

获取最高价。

**返回值：** DOUBLE

#### 示例

```
select high(candlestick_agg(time, price, volume)) from tick;
```

    +---------------------------------------------------------+
    | high(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +---------------------------------------------------------+
    | 555.0                                                   |
    +---------------------------------------------------------+

#### high_time

    high_time(candlestick_agg_data)

获取最高价所在的时间。

**返回值：** DOUBLE

#### 示例

```sql
select high_time(candlestick_agg(time, price, volume)) from tick;
```

    +--------------------------------------------------------------+
    | high_time(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +--------------------------------------------------------------+
    | 1999-12-31T01:00:00.035                                      |
    +--------------------------------------------------------------+

#### low

    low(candlestick_agg_data)

获取最低价。

**返回值：** DOUBLE

#### 示例

```sql
select low(candlestick_agg(time, price, volume)) from tick;
```

    +--------------------------------------------------------+
    | low(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +--------------------------------------------------------+
    | 111.0                                                  |
    +--------------------------------------------------------+

#### low_time

    low_time(candlestick_agg_data)

获取最低价所在的时间。

**返回值：** Timestamp

#### 示例

```sql
select low_time(candlestick_agg(time, price, volume)) from tick;
```

    +-------------------------------------------------------------+
    | low_time(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +-------------------------------------------------------------+
    | 1999-12-31T00:00:00                                         |
    +-------------------------------------------------------------+

#### open

    open(candlestick_agg_data)

获取最低价。

**返回值：** DOUBLE

#### 示例

```sql
select open(candlestick_agg(time, price, volume)) from tick;
```

    +---------------------------------------------------------+
    | open(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +---------------------------------------------------------+
    | 111.0                                                   |
    +---------------------------------------------------------+

#### open_time

    open_time(candlestick_agg_data)

获取最低价所在的时间。

**返回值：** Timestamp

#### 示例

```sql
select open_time(candlestick_agg(time, price, volume)) from tick;
```

    +--------------------------------------------------------------+
    | open_time(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +--------------------------------------------------------------+
    | 1999-12-31T00:00:00                                          |
    +--------------------------------------------------------------+

#### volume

    volume(candlestick_agg_data)

获取总共交易量。

**返回值：** DOUBLE

#### 示例

```sql
select volume(candlestick_agg(time, price, volume)) from tick;
```

    +-----------------------------------------------------------+
    | volume(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +-----------------------------------------------------------+
    | 2886.0                                                    |
    +-----------------------------------------------------------+

#### vwap

    vwap(candlestick_agg_data)

获取成交量加权平均价格。

**返回值：** DOUBLE

#### 示例

```sql
select vwap(candlestick_agg(time, price, volume)) from tick;
```

    +---------------------------------------------------------+
    | vwap(candlestick_agg(tick.time,tick.price,tick.volume)) |
    +---------------------------------------------------------+
    | 294.5769230769231                                       |
    +---------------------------------------------------------+

## 函数

### **数学函数**

### **abs(x)**

**功能**：返回x的绝对值。

**参数类型**：数值类型

**返回类型**：与函数参数类型一致

#### 示例

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

**功能**：返回x的反余弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：返回x的反正弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：返回x的反正切值。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：返回y/x的反正切值。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：向上取整。

**参数类型**：数值类型

**返回类型**：BIGINT

#### 示例

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

**功能**：向下取整

**参数类型**：数值类型

**返回类型**：BIGINT

#### 示例

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

**功能**：返回x的余弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：x的正弦值

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：返回e的x次方。

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：自然对数

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：以10为底的对数

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：以 2 为底的对数

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：x的y次方

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：四舍五入到最接近的整数

**参数类型**：数值类型

**返回类型**：BIGINT

#### 示例

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

**功能**：参数的符号 (-1, 0, +1)

**参数类型**：数值类型

**返回类型**：BIGINT

#### 示例

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

**功能**：x的平方根

**参数类型**：数值类型

**返回类型**：与函数参数类型一致

#### 示例

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

**功能**：x的正切值

**参数类型**：数值类型

**返回类型**：DOUBLE

#### 示例

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

**功能**：向零取整

**参数类型**：数值类型

**返回类型**：BIGINT

#### 示例

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

#### 语法

    struct(expr1 [, ...] ) 

**功能**：创建一个具有指定字段值的 STRUCT。

**参数类型**：数值类型

**注意**：struct函数目前功能并不完善

--------------------------

### **条件函数**

### **coalesce**

#### 语法

    coalesce(expr[,...exp])

**功能**：返回其第一个不为空的参数。只有当所有参数都为 null 时才返回 Null。当检索数据以进行显示时，它通常用于将默认值替换为空值。

**参数类型**：任意

**返回类型**：第一个不为null的参数类型

#### 示例

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

#### 语法

    nullif(expr1, expr2) 

**功能**：如果 expr1 等于 expr2，则返回 NULL；否则返回 expr1。

**参数类型**：expr1，expr2为数值类型，且为带列值的表达式

**返回类型**：expr1的类型或NULL

#### 示例

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

### **字符串函数**

[//]: # (### **Array**)

[//]: # (    创建数组)

### **ascii**

#### 语法

    ascii(str) 

**功能**: 将 str 中的第一个字符转换成其ASCII 码后返回。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    bit_length(str) 

**功能**：返回字符串数据的位长度或二进制数据的位数。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    btrim(string [, matching_string ] ) 

**功能**：函数通过删除前导空格和尾随空格或删除与可选的指定字符串匹配的字符来剪裁字符串。

**参数类型**：STRING

**返回类型**: STRING

#### 示例

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

#### 语法

    trim(str) 

**功能**：删除str首尾的空白字符

**参数类型**：STRING

**返回类型**：STRING

---------------------

### **char_length | character_length**

#### 语法

    char_length(expr) 

**功能**：以字符数形式返回指定字符串的长度。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    chr(expr) 

**功能**：返回位于提供的 UTF-16 码位的字符。

**参数类型**: BIGINT

**返回类型**: STRING

#### 示例

```sql
SELECT chr(20005);
```

    +-------------------+
    | chr(Int64(20005)) |
    +-------------------+
    | 严                |
    +-------------------+

----------------

### **concat**

#### 语法

    concat(expr1, expr2 [, ...exp] ) 

**功能**：联接两个或两个以上表达式并返回生成的表达式。

**参数类型**：STRING

**返回类型**: STRING

#### 示例

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

#### 语法

    concat_ws(sep , expr1 [, ...] ) 

**功能**：返回由 sep 分隔的串联字符串。

**参数类型**：STRING

**返回类型**：STRING

#### 示例

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

#### 语法

    initcap(expr) 

**功能**：将参数中每个单词的首字母大写。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    left(str, len) 

**功能**：返回 str 中最左边的 len 个字符。

**参数类型**：str为STRING类型，len为BIGINT类型

**返回类型**：STRING

#### 示例

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

#### 语法

    lpad(expr, len [, pad] ) 

**功能**：返回 expr左侧填充了 pad，填充后长度为 len。

**参数类型**：expr, pad 类型为 STRING， len类型为BIGINT

**返回类型**：BIGINT

当len为负数时，len表现为0，当len过大，函数执行失败

#### 示例

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

#### 语法

    rpad(expr, len [, pad] ) 

**功能**：返回右侧填充了 pad 的 expr，填充后整个字符的长度为 len。

**参数类型**：expr, pad 类型为 STRING， len类型为BIGINT

**返回类型**：STRING

#### 示例

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

#### 语法

    lower(expr) 

**功能**：返回字母小写。

**参数类型**：STRING

**返回类型**：STRING

#### 示例

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

#### 语法

    upper(expr)

**功能**：返回将 expr 的所有字符均更改为大写后的结果。

**参数类型**：STRING

**返回类型**：STRING

-----------

### **ltrim**

#### 语法

    ltrim(str[, trimstr] ) 

**功能**：返回 str，其中删除了 trimStr 内的前导字符。默认trimestr为空白符

**参数类型**：STRING

**返回类型**：STRING

#### 示例

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

#### 语法

    md5(expr) 

**功能**：以十六进制字符串形式返回 expr 的 MD5 128 位校验和。

**参数类型**：STRING

**返回类型**：STRING

#### 示例

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

#### 语法

    octet_length(expr) 

**功能**：返回字符串数据的字节长度。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    random( [seed] ) 

**功能**：返回介于 0 和 1 之间的随机值。

**参数类型**：无

**返回类型**：DOUBLE

#### 示例

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

[//]: # (**功能**：将 str 中与 regexp 匹配的所有子字符串都替换为 rep。)

[//]: # (**参数类型**：STRING)

[//]: # (**返回类型**：BIGINT)

----------------

### **repeat**

#### 语法

    repeat(expr, n) 

**功能**：返回重复 expr, n 次的字符串。

**参数类型**：expr类型为STRING，n类型为BIGINT

**返回类型**：BIGINT

#### 示例

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

#### 语法

    replace(str, search, replace ) 

**功能**：将所有 search 项都替换为 replace。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    reverse(expr) 

**功能**：返回一个反向字符串或一个包含逆序的元素的数组。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    right(str, len) 

**功能**：返回字符串 str 中最右边的 len 个字符。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    digest(expr, algorithm)

**功能**：把表达式用给定算法计算散列值

**参数类型**：expr, algorithm都为STRING类型

algorithm指定计算散列的算法，仅支持 md5, sha224, sha256, sha384, sha512, blake2s, blake2b, blake3

**返回类型**：BINARY

#### 示例

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

#### 语法

    rtrim( str [, trimstr] ) 

**功能**：返回删除了尾随字符trimstr的str，trimstr默认是空白字符。

**参数类型**：STRING

**返回类型**：STRING

#### 示例

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

#### 语法

    sha224(str)

**功能**：计算字符串的 sha224 散列值

**返回类型**：BINARY

**参数类型**：STRING

#### 示例

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

#### 语法

    sha256(str)

**功能**：计算字符串的 sha256 散列值

**返回类型**：BINARY

**参数类型**：STRING

#### 示例

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

#### 语法

    sha384(str)

**功能**：计算字符串的 sha384 散列值

**返回类型**：BINARY

**参数类型**：STRING

#### 示例

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

#### 语法

    sha512(str)

**功能**：计算字符串的 sha512 散列值

**返回类型**：BINARY

**参数类型**：STRING

----------------

### **split_part**

#### 语法

    split_part(str, delim, n) 

**功能**：将 str 按照 delim 做拆分，返回第n部分。

**参数类型**：str，delim类型为STRING，partNum类型为BIGINT

**返回类型**：STRING

#### 示例

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

#### 语法

    starts_with(expr, startExpr) 

**功能**：如果 expr 以 startExpr 开头，则返回 true。

**参数类型**：STRING

**返回类型**：BOOLEAN

#### 示例

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

#### 语法

    strpos(str, substr ) 

**功能**：返回子字符串在指定字符串中的位置。

**参数类型**：STRING

**返回类型**：BIGINT

#### 示例

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

#### 语法

    substr(expr, pos [, len] ) 

**功能**：返回 expr 的子字符串（从 pos 开始，长度为 len）。

**参数类型**：expr 类型为STRING，pos，len类型为BIGINT

**返回类型**：STRING

#### 示例

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

#### 语法

    to_hex(value)

**功能**：将十进制数字转换为十六进制表示形式。

**参数类型**：BIGINT

**返回类型**：STRING

#### 示例

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

#### 语法

    translate(expr, from, to) 

**功能**：返回一个 expr，其中 from 中的所有字符都替换为 to 中的字符。

**参数类型**：STRING

**返回类型**：STRING

#### 示例

```sql
SELECT translate('aaabbb', 'bbb', 'ccc');
```

    +---------------------------------------------------+
    | translate(Utf8("aaabbb"),Utf8("bbb"),Utf8("ccc")) |
    +---------------------------------------------------+
    | aaaccc                                            |
    +---------------------------------------------------+

----------------

### **时间函数**

### **date_part**

#### 语法

    date_part(field, expr) 

**功能**：提取部分日期、时间戳或间隔。

**参数类型**：

field 类型为STRING，且只能是('year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', '
second')中的一种。

expr 类型为 TIMESTAMP

**返回类型**：BIGINT

#### 示例

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

#### 语法

    date_trunc(field, expr) 

**功能**：返回已截断到 field 中指定的单位的值。

**参数类型**：field 类型为STRING，且只能是('year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', '
second')中的一种。

expr 类型为TIMESTAMP

#### 示例

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

#### 语法

    date_bin(interval, source, origin)

**功能**：从origin开始，按interval切分bucket，返回source所在的bucket timestamp

**参数类型**：

interval 是 STRING 类型，会解析成时间间隔，

source, origin 是 TIMESTAMP 类型。

**返回类型**：TIMESTAMP

#### 示例

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

#### 语法

    to_timestamp(expr) 

**功能**：返回使用可选格式设置强制转换为某个时间戳的 expr。

**参数类型**：STRING或BIGINT

**返回类型**：TIMESTAMP类型，精度随参数确定，BIGINT类型的参数，返回的是纳秒级的TIMESTAMP

#### 示例

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

#### 语法

    to_timestamp_millis(expr) 

**功能**：转化为毫秒级的时间戳

**参数类型**：BIGINT 或 STRING

**返回类型**：毫秒级的TIMESTAMP

#### 示例

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

#### 语法

    to_timestamp_micros(expr) 

**功能**：转为微秒精度的时间戳。

**参数**：BIGINT 或 STRING

**返回类型**： 微秒精度的TIMESTAMP

#### 示例

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

#### 语法

    to_timestamp_seconds(expr) 

**功能**：转为秒级的时间戳

**参数**：BIGINT 或 STRING

**返回类型**：秒精度的TIMESTAMP

#### 示例

```
SELECT to_timestamp_seconds(1);
```

    +------------------------------+
    | totimestampseconds(Int64(1)) |
    +------------------------------+
    | 1970-01-01T00:00:01          |
    +------------------------------+

----------------

### **from_unixtime**

#### 语法

    from_unixtime(unixTime) 

**功能**：返回 unixTime。

**参数**： BIGINT

**返回类型**： unix时间，秒级

#### 示例

```
SELECT from_unixtime(1);
```

    +------------------------+
    | fromunixtime(Int64(1)) |
    +------------------------+
    | 1970-01-01T00:00:01    |
    +------------------------+

----------------

### **now**

#### 语法

    now()

**功能**：返回当前时间戳

**返回类型**：TIMESTAMP

#### 示例

```
SELECT now();
```

    +----------------------------------+
    | now()                            |
    +----------------------------------+
    | 2022-11-21T04:44:19.742107+00:00 |
    +----------------------------------+

### **time_window**

#### 语法

```sql
time_window(time_expr, window_duration [, slide_duration])
```

time_column 为 Timestamp 类型

window_duration 为INTERVAL类型，指定时间窗口的窗口大小

slide_duration 为INTERVAL类型，指定时间窗口滑动的大小，不指定此参数时，滑动大小为时间窗口大小，变成滚动窗口

time_window(time, window_duration, slide_duration) 生成的窗口为：

```sql
start, end
time, time_column + window_duration
time - slide_duration, time + window_duration - slide_duration
time - 2 * slide_duration, time + window_duration - 2 * slide_duration
...
time - n * slide_duration, time + window_duration - n * slide_duration
```

且窗口满足 start <= time < end

#### 示例

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
SELECT time_window(time, interval '3 day') FROM test;
```

    +---------------------------------------------------------------------+
    | TIME_WINDOW(test.time,IntervalMonthDayNano("55340232221128654848")) |
    +---------------------------------------------------------------------+
    | {start: 2023-04-23T00:00:00, end: 2023-04-26T00:00:00}              |
    +---------------------------------------------------------------------+

```sql
SELECT time_window(time, interval '5 day', interval '3 day') FROM test;
```

    +------------------------------------------------------------------------------------------------------------------+
    | TIME_WINDOW(test.time,IntervalMonthDayNano("92233720368547758080"),IntervalMonthDayNano("55340232221128654848")) |
    +------------------------------------------------------------------------------------------------------------------+
    | {start: 2023-04-23T00:00:00, end: 2023-04-28T00:00:00}                                                           |
    | {start: 2023-04-20T00:00:00, end: 2023-04-25T00:00:00}                                                           |
    +------------------------------------------------------------------------------------------------------------------+

### **窗口函数**

#### 语法

```sql
function([...expr] ) OVER ([PARTITION BY expr] [ORDER BY expr] [window_frame]);

function: {aggregate_function | analytic_function}

window_frame: { frame_mode frame_start |
                frame_mode BETWEEN frame_start AND frame_end } }
frame_mode: {RANGE | ROWS}

frame_start: {UNBOUNDED PRECEDING | offset_start PRECEDING | CURRENT ROW | offset_start FOLLOWING }

frame_end: {offset_stop PRECEDING | CURRENT ROW | offset_stop FOLLOWING | UNBOUNDED FOLLOWING}

```

#### **函数类型**

#### 排名函数

| 函数名          |
|--------------|
| DENSE_RANK   |
| PERCENT_RANK |
| RANK         |
| ROW_NUMBER   |

其中`DENSE_RANK` | `RANK` | `PERCENT_RANK` 需要 ORDER BY 子句

其中 `RANK`, `DENSE_RANK`, `ROW_NUMBER` 指定window_frame 无效

#### 聚合函数

详见[聚合函数](./sql.md#聚合函数)

#### 分析窗口函数

| 函数名       | 
|-----------|
| CUME_DIST |
| LAG       |
| LEAD      |
| NTH_VALUE |

#### **PARTITION BY 子句**

一个或多个表达式，用于指定一个行分区，如果没有该子句，则分区由所有行组成

#### **ORDER BY 子句**

指定行在分区中的顺序

#### **window_frame 子句**

frame 是当前分区的一个子集，在分区里进一步细分窗口

指定ROWS，则窗口以行为单位算偏移量

指定RANGE，则必须指定 ORDER BY 子句，窗口以ORDER BY 表达式的值为单位算偏移量

- `UNBOUND PRECEDING` ROWS 模式下为分区的第一行，RANGE模式下为分区ORDER BY表达式的第一个值
- `offset PRECEDING` ROWS 模式下为当前行的前offset行，RANGE 模式下为当前值的前offset值
- `CURRENT ROW` ROWS 模式下为当前行，RANGE模式下为当前值
- `offset FOLLOWING` ROWS 模式下为当前行的后offset行，RANGE 模式下为当前值的后offset值
- `UNBOUND FOLLOWING` ROWS 模式下为分区的最后一行，RANGE模式下为ORDER BY表达式的最后一个值

#### 使用限制

- 窗口函数只能出现在SELECT语句中。
- 窗口函数中不能嵌套使用窗口函数和聚合函数。

## **窗口函数列表**

包括[聚合函数](./sql.md#聚合函数)

### **ROW_NUMBER**

#### 语法

    ROW_NUMBER() OVER([partition_clause] [orderby_clause])

**功能**：根据窗口分区中的行顺序，为每一行分配唯一的顺序编号（从 1 开始）。

**参数类型**：无

**返回类型**：BIGINT

#### 示例

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

#### 语法

    RANK() OVER([partition_clause] [orderby_clause])

**功能**：返回某个值相对于分区中所有值的排名（跳跃排名）。

**参数类型**：无

**返回类型**：BIGINT

#### 示例

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

#### 语法

    DENSE_RANK() OVER([partition_clause] [orderby_clause])

**功能**：返回某个值相对于分区中所有值的排名（连续排名）。

**参数类型**：无

**返回类型**：BIGINT

#### 示例

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

#### 语法

    PERCENT_RANK() OVER([partition_clause] [orderby_clause])

**功能**：计算分区中某个值的百分比排名。

**参数类型**：无

**返回类型**：DOUBLE

#### 示例

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

#### 语法

    CUME_DIST() OVER ([partition_clause] [orderby_clause])

**功能**：返回某个值相对于分区中的所有值的位置。

**参数类型**：无

**返回类型**：DOUBLE

#### 示例

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

[//]: # ()

[//]: # (### **NTILE**)

[//]: # ()

[//]: # (    ntile&#40;n&#41; over&#40;[partition_clause] [order_by_clause]&#41;)

[//]: # ()

[//]: # (**功能**：把有序的数据集合平均分配到n个桶中,将桶号分配给每一行。)

[//]: # ()

[//]: # (**参数类型**：BIGINT)

[//]: # ()

[//]: # (**返回类型**：BIGINT)

----------------

### **LAG**

#### 语法

    lag( expr [, offset [, default] ] ) OVER([partition_clause] orderby_clause)

**功能**：返回分区中当前行前offset行的expr的值。

**参数类型**：expr为任意类型，

offset为BIGINT，为负数时，从分区中后offset行返回值，默认为1

default 需要与expr对应的数据类型相同,默认为NULL

**返回类型**：与expr相同的类型

#### 示例

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

#### 语法

    lead(expr [, offset [, default] ] ) OVER ([partition_clause] orderby_clause)

**功能**：返回分区中当前行后offset行的expr的值。

**参数类型**：expr为任意类型，

offset为BIGINT，为负数时，从分区中前offset行返回值，默认为1

default需要与expr类型相同，默认是NULL

**返回类型**：与expr类型相同

#### 示例

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

#### 语法

    FIRST_VALUE(expr) OVER ([partition_clause] [orderby_clause])

**功能**：返回一组值(该组通常是有序集合)中的第一个值。

**参数类型**：expr为任意类型，ignore_nulls为BOOLEAN类型，默认值为false

**返回类型**：与expr类型相同

#### 示例

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

#### 语法

    LAST_VALUE(expr) OVER ([partition_clause] [orderby_clause])

**功能**：返回当前窗口中的最后一个值。

**参数类型**：expr为任意类型，ignore_nulls为BOOLEAN类型，默认值为false

**返回类型**：与expr类型相同

#### 示例

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

#### 语法

    NTH_VALUE(expr, number) OVER ([partition_clause] [orderby_clause])

**功能**：返回相对于窗口的第一行的窗口框架的指定行的表达式值。

**参数类型**：expr为任意类型，number为BIGINT

**返回类型**：与expr类型相同

#### 示例

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

## **高级函数**

### **插值函数**

在数据库中，插值是用于处理数据中缺失值的技术。当数据中存在缺失值时，这些技术可以帮助我们估计或推测这些缺失值，从而填补数据的空白部分。

### **time_window_gapfill**

time_window_gapfill 与 time_window 类似，但具有填补缺失数据的功能。interpolate 和 locf 必须与 time_window_gapfill
一起使用，它们控制如何处理缺失值。

time_window_gapfill 必须作为查询或子查询中的顶级表达式使用。例如，不能将 time_window_gapfill 嵌套在另一个函数中，如sum(
time_window_gapfill(...))。

#### 语法

- time_window_gapfill

```sql
time_window_gapfill(<time column>, <window interval>[, <sliding interval>[, <start time>]]): <time window struct>
```

#### 策略

- interpolate

线性插值的核心思想是假设已知数据点之间的关系是线性的，然后根据已知数据点之间的线性关系来估算未知数据点的值。具体地，线性插值通过使用已知数据点的纵坐标之间的线性变化率来推断未知数据点的纵坐标。

线性插值适用于连续变量的估算，例如在时间序列中填补缺失值或在空间数据中进行插值。然而，线性插值的准确性和适用性取决于数据的特性和实际情况。在某些情况下，数据可能具有非线性关系，或存在其他更适合的插值方法。因此，在应用线性插值之前，需要仔细考虑数据的性质和插值的目的，以确保插值结果合理和准确。

```sql
interpolate(<expr>)
```

- locf

该函数用于在时间窗口内进行缺失值填补（Gap filling），并使用 "Last Observation Carried Forward"（LOCF）操作来填充缺失值。

"Last Observation Carried Forward"（LOCF）是一种用于填充缺失值的方法，它使用最近的可观察值来进行填充。具体处理方式如下：

1. 找到缺失值之前的最近一个非缺失值。
2. 将该非缺失值的值复制到缺失值所在的位置。
3. 继续向后遍历，直到遇到下一个非缺失值。
4. 如果遇到下一个非缺失值，则重复步骤1和2，将该非缺失值的值复制到缺失值位置。
5. 如果在数据序列的末尾仍有缺失值，则最后一个非缺失值将一直被复制，直到填充完所有缺失值。

简而言之，LOCF 方法通过将最近的可观察值复制到缺失值位置来填充缺失值，使得数据在时间上保持连续性。这种方法假设缺失值之后的数据与最后观察到的值相同或非常接近。

需要注意的是，LOCF 方法可能会引入一定的偏差，特别是当缺失值之后的数据发生剧烈变化时。因此，在使用 LOCF
进行缺失值填充时，需要谨慎考虑数据的特点和分析的目的，以确保填补的值能够合理反映实际情况。

```sql
locf(<expr>)
```

#### 示例

```sql
---- 准备数据
DROP DATABASE IF EXISTS gapfill_db;
CREATE DATABASE gapfill_db WITH TTL '1000000d';
CREATE TABLE gapfill_db.m2(f0 BIGINT, f1 DOUBLE, TAGS(t0, t1, t2));

INSERT gapfill_db.m2(TIME, f0, f1, t0, t1)
VALUES
    ('1999-12-31 00:00:00.000', 111, 444, 'tag11', 'tag21'),
    ('1999-12-31 00:00:00.005', 222, 333, 'tag12', 'tag22'),
    ('1999-12-31 00:00:00.010', 333, 222, 'tag13', 'tag23'),
    ('1999-12-31 00:00:00.015', 444, 111, 'tag14', 'tag24'),
    ('1999-12-31 00:00:00.020', 222, 555, 'tag11', 'tag21'),
    ('1999-12-31 00:00:00.025', 333, 444, 'tag12', 'tag22'),
    ('1999-12-31 00:00:00.030', 444, 333, 'tag13', 'tag23'),
    ('1999-12-31 00:00:00.035', 555, 222, 'tag14', 'tag24');
```

```sql
---- interpolate
SELECT
  t0,
  time_window_gapfill(time, interval '10 milliseconds') as minute,
  interpolate(avg(f1))
from gapfill_db.m2
where time between timestamp '1999-12-31T00:00:00.000Z' and timestamp '1999-12-31T00:00:00.055Z'
group by t0, minute;
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

```sql
---- locf
SELECT
  t0,
  time_window_gapfill(time, interval '10 milliseconds') as minute,
  locf(avg(f1))
from gapfill_db.m2
where time between timestamp '1999-12-31T00:00:00.000Z' and timestamp '1999-12-31T00:00:00.055Z'
group by t0, minute;
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

## **系统视图**

CnosDB 提供了系统视图用来查看集群状态和集群Schema信息。

有两个特殊的数据库存放这些视图：

- CLUSTER_SCHEMA 关于数据库集群
- INFORMATION_SCHEMA 关于租户信息

### **CLUSTER_SCHEMA**

该数据库属于整个集群，只有管理员可以访问。

数据库中包含有关集群的元数据信息，例如租户信息，用户信息。

### **TENANTS**

该视图可用于查询整个集群的所有租户信息。

#### 视图定义

| 字段             | 数据类型   | 描述              |
|----------------|--------|-----------------|
| TENANT_NAME    | STRING | 租户名称            |
| TENANT_OPTIONS | STRING | 租户配置，json形式的字符串 |

#### 示例

```sql
SELECT * FROM cluster_schema.tenants;
```

    +-------------+---------------------------------------------------+
    | tenant_name | tenant_options                                    |
    +-------------+---------------------------------------------------+
    | cnosdb      | {"comment":"system tenant","limiter_config":null} |
    +-------------+---------------------------------------------------+

### **USERS**

#### 视图定义

该视图可以查询整个集群的所有用户信息。

| 字段           | 数据类型    | 描述              |
|--------------|---------|-----------------|
| USER_NAME    | STRING  | 用户名称            |
| IS_ADMIN     | BOOLEAN | 是否为系统管理员        |
| USER_OPTIONS | STRING  | 用户配置，JSON形式的字符串 |

#### 示例

```sql
SELECT * FROM cluster_schema.users;
```

    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | user_name | is_admin | user_options                                                                                    |
    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | root      | true     | {"password":"*****","must_change_password":true,"rsa_public_key":null,"comment":"system admin"} |
    +-----------+----------+-------------------------------------------------------------------------------------------------+

### **INFORMATION_SCHEMA**

该数据库属于某个租户，在创建Tenant时，自动创建该DB，对租户下的所有成员可见。

### DATABASES

该视图存放租户下数据库的信息。

#### 视图定义

| 字段名称           | 数据类型            | 描述               |
|----------------|-----------------|------------------|
| TENANT_NAME    | STRING          | 数据库所属的租户名        |
| DATABASE_NAME  | STRING          | 数据库名称            |
| TTL            | STRING          | 表示数据文件保存的时间      |
| SHARD          | BIGINT UNSIGNED | 表示数据分片个数         |
| VNODE_DURATION | STRING          | 表示数据在SHARD中的时间范围 |
| PREPLICA       | BIGINT UNSIGNED | 表示数据在集群中的副本数     |
| PERCISION      | STRING          | 表示数据库的时间精度       |

#### 示例

```sql
SELECT * FROM information_schema.databases;
```

    +-------------+---------------+----------+-------+----------------+---------+-----------+
    | tenant_name | database_name | ttl      | shard | vnode_duration | replica | percision |
    +-------------+---------------+----------+-------+----------------+---------+-----------+
    | cnosdb      | public        | 365 Days | 1     | 365 Days       | 1       | NS        |
    +-------------+---------------+----------+-------+----------------+---------+-----------+

### TABLES

该视图存放租户下所有表的信息。

#### 视图定义

| 字段名称           | 数据类型   | 描述                    |
|----------------|--------|-----------------------|
| TABLE_TENANT   | STRING | 表所属的租户                |
| TABLE_DATABASE | STRING | 表所属的数据库               |
| TABLE_NAME     | STRING | 表名                    |
| TABLE_TYPE     | STRING | 表是基础表，还是视图            |
| TABLE_ENGINE   | STRING | 表存储引擎，目前支持外部表和内部tskv表 |
| TABLE_OPTION   | STRING | 内容为JSON字符串，记录表的所有参数   |

#### 示例

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

该视图存放租户下所有列的定义。

#### 视图定义

| 字段名称              | 数据类型   | 描述                                           |
|-------------------|--------|----------------------------------------------|
| TABLE_TENANT      | STRING | 表所属的租户                                       |
| TABLE_DATABASE    | STRING | 表所属的数据库                                      |
| TABLE_NAME        | STRING | 表所属的表名                                       |
| COLUMN_NAME       | STRING | 列名                                           |
| ORDINAL_POSITION  | STRING | 列在表中的顺序位置                                    |
| COLUMN_TYPE       | STRING | 列的类型，tskv表独有的，支持 TIME、TAG、FIELD，通常字段为FIELD类型 |
| IS_NULLABLE       | STRING | 如果列可能包含NULL，则为"YES"，否则为"NO"                  |
| DATA_TYPE         | STRING | 列的数据类型                                       |
| COMPRESSION_CODEC | STRING | 列使用的压缩算法                                     |

#### 示例

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

此视图展示当前用户在当前租户下的角色信息。

#### 视图定义

| 字段        | 数据类型   | 描述   |
|-----------|--------|------|
| ROLE_NAME | STRING | 角色名称 |

#### 示例

```sql
SELECT * FROM information_schema.enabled_roles;
```

    +-----------+
    | role_name |
    +-----------+
    | owner     |
    +-----------+

### ROLES

此视图展示当前租户下所有可用的角色（包含系统角色和自定义角色）。
此视图只对当前租户的Owner可见。

#### 视图定义

| 字段           | 数据类型   | 描述                           |
|--------------|--------|------------------------------|
| ROLE_NAME    | STRING | 租户下的角色名称                     |
| ROLE_TYPE    | STRING | 角色类型，自定义角色或系统角色              |
| INHERIT_ROLE | STRING | 自定义角色继承的系统角色名称，如果是系统角色则为NULL |

#### 示例

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

#### 视图定义

此视图展示所在租户下所有已被授予给指定角色的作用在db上的权限。
此视图的所有记录对当前租户的Owner可见。
对于非Owner成员，只展示对应角色的记录。

| 字段             | 数据类型   | 描述                      |
|----------------|--------|-------------------------|
| TENANT_NAME    | STRING | 被授予权限的数据库所属的租户名称        |
| DATABASE_NAME  | STRING | 被授予权限的数据库名称             |
| PRIVILEGE_TYPE | STRING | 被授予的权限类型，READ/WRITE/ALL |
| ROLE_NAME      | STRING | 被授予权限的角色名称              |

#### 示例

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

此视图展示所在租户下的成员信息。

此视图的所有记录对当前租户的所有成员可见。

#### 视图定义

| 字段        | 数据类型   | 描述         |
|-----------|--------|------------|
| USER_NAME | STRING | 租户下的用户成员名称 |
| ROLE_NAME | STRING | 成员的角色名称    |

#### 示例

```sql
SELECT * FROM information_schema.members;
```

    +-----------+-----------+
    | user_name | role_name |
    +-----------+-----------+
    | root      | owner     |
    +-----------+-----------+

### QUERIES(INFORMATION_SCHEMA)

此视图展示SQL语句实时快照，用于实时监控SQL作业。

此视图的所有记录对当前租户的owner可见。

对于非Owner成员，只展示当前成员提交的SQL。

#### 视图定义

| 字段          | 数据类型            | 描述                                                             |
|-------------|-----------------|----------------------------------------------------------------|
| QUERY_ID    | STRING          | SQL语句的ID                                                       |
| QUERY_TEXT  | STRING          | SQL语句的内容                                                       |
| USER_ID     | STRING          | 提交SQL的用户ID                                                     |
| USER_NAME   | STRING          | 提交SQL的用户名称                                                     |
| TENANT_ID   | STRING          | 租户ID                                                           |
| TENANT_NAME | STRING          | 租户名称                                                           |
| STATE       | STRING          | 语句的运行状态，分为ACCEPTING，DISPATCHING，ANALYZING，OPTMIZING，SCHEDULING |
| DURATION    | BIGINT UNSIGNED | 语句持续运行的时间                                                      |

#### 示例

```sql
SELECT * FROM information_schema.queries;
```

    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+

#### SHOW QUERIES

你还可以使用 `SHOW QUERIES` 语句来查看正在执行的SQL语句, 该语句这是对QUERIES视图的包装。

#### 示例

```sql
SHOW QUERIES;
```

    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+

## **USAGE_SCHEMA**

该数据库，属于某个租户，在创建Tenant时，自动创建该DB，对租户下的所有成员可见。

对于普通用户，只能看到 USAGE_SCHEMA 中的表中属于当前用户租户的一部分，

对于系统管理员，能看到 USAGE_SCHEMA 中表的全部。

### DISK_STORAGE

该视图记录集群中各个 vnode 所占磁盘空间大小，单位Byte。

#### 视图定义

管理员看到的视图定义：

| 字段       | 数据类型            | 描述                |
|----------|-----------------|-------------------|
| TIME     | TIMESTAMP       | 统计disk_storage的时间 |
| DATABASE | STRING          | vnode 所属的数据库      |
| NODE_ID  | STRING          | data节点的ID         |
| TENANT   | STRING          | vnode 所属的租户名称     |
| VNODE_ID | STRING          | vnode 的 ID        |
| VALUE    | BIGINT UNSIGNED | vnode 所占磁盘大小      |

普通用户看到的视图定义，只能访问当前会话所在的租户信息：

| 字段       | 数据类型            | 描述                |
|----------|-----------------|-------------------|
| TIME     | TIMESTAMP       | 统计disk_storage的时间 |
| DATABASE | STRING          | vnode 所属的数据库      |
| NODE_ID  | STRING          | data节点的ID         |
| TENANT   | STRING          | vnode 所属的租户名称     |
| VNODE_ID | STRING          | vnode 的 ID        |
| VALUE    | BIGINT UNSIGNED | vnode 所占磁盘大小      |

#### 示例

管理员用户

```sql
select * from usage_schmea.disk_storage order by time desc limit 2;
```

    +----------------------------+--------------+---------+--------+----------+-------+
    | time                       | database     | node_id | tenant | vnode_id | value |
    +----------------------------+--------------+---------+--------+----------+-------+
    | 2023-02-23T03:57:52.566487 | usage_schema | 1001    | cnosdb | 3        | 0     |
    | 2023-02-23T03:57:42.566642 | usage_schema | 1001    | cnosdb | 3        | 0     |
    +----------------------------+--------------+---------+--------+----------+-------+

普通用户

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

该视图记录数据写入到DB时，写入流量的总大小。

#### 视图定义

管理员看到的视图定义：

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计data_in的时间     |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| VALUE    | BIGINT UNSIGNED | 写入流量的总大小         |

普通用户看到的视图定义，只能访问当前会话所在的租户信息：

| 字段       | 数据类型            | 描述           |
|----------|-----------------|--------------|
| TIME     | TIMESTAMP       | 统计data_in的时间 |
| DATABASE | STRING          | Database名称   |
| NODE_ID  | STRING          | Data节点的 ID   |
| VALUE    | BIGINT UNSIGNED | 写入流量的总大小     |

#### 示例

管理员用户

```sql
select * from usage_schema.data_in order by time desc limit 2;
```

    +----------------------------+--------------+---------+--------+--------+
    | time                       | database     | node_id | tenant | value  |
    +----------------------------+--------------+---------+--------+--------+
    | 2023-02-23T06:50:36.578641 | usage_schema | 1001    | cnosdb | 741552 |
    | 2023-02-23T06:50:26.577544 | usage_schema | 1001    | cnosdb | 739612 |
    +----------------------------+--------------+---------+--------+--------+

普通用户

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

该视图记录数据从DB中查询出来时，读取流量的大致总大小。

#### 视图定义

管理员看到的视图定义：

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计data_out的时间    |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| VALUE    | BIGINT UNSIGNED | 读取流量的总大小         |

普通用户看到的视图定义，只能访问当前会话所在的租户信息。

| 字段       | 数据类型            | 描述            |
|----------|-----------------|---------------|
| TIME     | TIMESTAMP       | 统计data_out的时间 |
| DATABASE | STRING          | Database名称    |
| NODE_ID  | STRING          | Data节点的 ID    |
| VALUE    | BIGINT UNSIGNED | 读取流量的总大小      |

#### 示例

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

该视图记录用户查询DB的次数。

#### 视图定义

管理员看到的视图定义：

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计queries的时间     |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| USER     | STRING          | 用户名称             |
| VALUE    | BIGINT UNSIGNED | 用户查询次数           |

普通用户看到的视图定义，只能访问当前会话所在的租户信息。

| 字段       | 数据类型            | 描述           |
|----------|-----------------|--------------|
| TIME     | TIMESTAMP       | 统计queries的时间 |
| DATABASE | STRING          | Database名称   |
| NODE_ID  | STRING          | Data节点的 ID   |
| USER     | STRING          | 用户名称         |
| VALUE    | BIGINT UNSIGNED | 用户查询次数       |

#### 示例

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

该视图记录用户写入DB的次数。

注意，该视图目前只会在通过[line protocol](./rest_api.md#接口列表)/[prometheus remote write](../versatility/collect/prometheus#remote-write)
接口写入成功时创建。

#### 视图定义

管理员看到的视图定义：

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计writes的时间      |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| USER     | STRING          | 用户名称             |
| VALUE    | BIGINT UNSIGNED | 用户写入次数           |

普通用户看到的视图定义，只能访问当前会话所在的租户信息。

| 字段       | 数据类型            | 描述          |
|----------|-----------------|-------------|
| TIME     | TIMESTAMP       | 统计writes的时间 |
| DATABASE | STRING          | Database名称  |
| NODE_ID  | STRING          | Data节点的 ID  |
| USER     | STRING          | 用户名称        |
| VALUE    | BIGINT UNSIGNED | 用户写入次数      |

#### 示例

管理员用户

```sql
select * from usage_schema.writes order by time desc limit 2;
```

    +----------------------------+----------+---------+--------+------+-------+
    | time                       | database | node_id | tenant | user | value |
    +----------------------------+----------+---------+--------+------+-------+
    | 2023-02-23T07:05:56.549282 | public   | 1001    | cnosdb | root | 2     |
    | 2023-02-23T07:05:46.549188 | public   | 1001    | cnosdb | root | 2     |
    +----------------------------+----------+---------+--------+------+-------+

普通用户

```sql
select * from usage_schema.writes order by time desc limit 2;
```

    +----------------------------+----------+---------+------+-------+
    | time                       | database | node_id | user | value |
    +----------------------------+----------+---------+------+-------+
    | 2023-02-23T07:06:56.547905 | public   | 1001    | root | 2     |
    | 2023-02-23T07:06:46.547673 | public   | 1001    | root | 2     |
    +----------------------------+----------+---------+------+-------+

## **流**

### 创建流表

创建流表，需要一个表作为source表，流表暂不支持 ALTER

#### 语法

```sql
CREATE STREAM TABLE [IF NOT EXISTS] table_name(field_definition [, field_definition] ...)
    WITH (db = 'db_name', table = 'table_name', event_time_column = 'time_column')
    engine = tskv;

field_definition: 
    column_name data_type
```

db和table参数，指定源表

event_time_column 指定事件时间列，该列数据类型必须是 TIMESTAMP 类型

目前仅支持普通表为source表，流表字段定义的字段名和字段类型必须是属于source表，且与source表定义相同

#### 示例

创建 source 表

```sql
CREATE DATABASE oceanic_station;
```

```
\c oceanic_station
```

```
CREATE TABLE air(pressure DOUBLE, temperature DOUBLE, visibility DOUBLE, TAGS(station));
```

创建流表

```sql
CREATE STREAM TABLE air_stream(time TIMESTAMP, station STRING, pressure DOUBLE, temperature DOUBLE, visibility DOUBLE) 
    WITH (db = 'oceanic_station', table = 'air', event_time_column = 'time')
    engine = tskv;
```

### 删除流表

> 与删除普通表语法相同，请参考[删除表](#删除表)

### 流查询

流查询只支持 INSERT SELECT 语句，SELECT 语句中 FROM 子句是流表，插入到目标表。

写入数据到源表时，触发流式查询。

流查询的 SELECT 子句不支持 JOIN。

流查询的语句会持久化运行，通过[KILL QUERY](#kill-query) 取消执行

#### 示例

以流式降采样场景为示例，source表时间间隔为一分钟，降采样时间区间为1小时

创建流查询的目标表

```sql
CREATE TABLE air_down_sampling_1hour(max_pressure DOUBLE, avg_temperature DOUBLE, sum_temperature DOUBLE, count_pressure BIGINT, TAGS(station));
```

创建流查询语句

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

写入数据时触发流查询语句

[数据来源](#示例数据)

```sql
\w oceanic_station.txt
```

查看目标表结果

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

## **KILL QUERY**

### 语法

```sql
KILL [QUERY] query_id;
```

先通过 [`SHOW QUERIES`](./sql.md#show-queries) 获取 `query_id`。

## 示例

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
