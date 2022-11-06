---
title: 查询数据
order: 5
---

CnosDB SQL 的灵感来自于 [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction.html)，我们支持DataFusion的大部分SQL语法。

## 示例数据
为了进一步学习CnosDB，本节将提供示例数据供您下载，并教您如何将数据导入数据库。后面章节中引用的数据源都来自此示例数据。

### 下载数据
执行以下命令将在本地生成一个名称为oceanic_station的Line Protocol格式的数据文件

```shell
wget https://fastdl.cnosdb.com/cpizkpfk/oceanic_station
```

### 导入数据
- 启动CLI
```shell
cnosdb-cli
```
- 导入数据
 
执行`\w`指令，`\w`后面为数据文件的绝对路径或相对cnosdb-cli的工作路径
```sql
> \w oceanic_station
Query took 0.023 seconds.
```

## **语法**

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
    [ LIMIT { count | ALL } ]

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
## **SELECT 子句**

### SELECT \*
通配符 * 可以用于代指全部列。

**示例**：
```
> SELECT * FROM air;
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
语法：
```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...]
```
在`SELECT`关键字后可以使用`DISTINCT`去掉重复字段，只返回去重后的值。
使用`ALL`会返回字段中所有重复的值。不指定此选项时，默认值为`ALL`。

示例:
```sql
SELECT DISTINCT station, visibility FROM air;
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

> SELECT  station, visibility FROM air;
SELECT station, visibility FROM air;
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

## 别名

可以用`AS`关键字为列表达式或表取别名

### 为列表达式取别名
语法：
```sql
expression [ [ AS ] column_alias ]
```
示例
```sql
> SELECT station s, visibility AS v FROM air;
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
### 为表取别名
你也可以用关键字`AS`为表取别名
**语法**：
```sql
FROM tb_name [AS] alias_name
```

**示例**：
```sql
SELECT a.visibility, s.temperature
FROM air AS a, sea s LIMIT 10;
+------------+-------------+
| visibility | temperature |
+------------+-------------+
| 56         | 62          |
| 56         | 63          |
| 56         | 77          |
| 56         | 54          |
| 56         | 55          |
| 56         | 64          |
| 56         | 56          |
| 56         | 57          |
| 56         | 64          |
| 56         | 51          |
+------------+-------------+
```
## LIMIT 子句
**语法**：
```sql
LIMIT n
```
限制返回结果集的行数为n，n必须非负

示例：
```sql
SELECT *
FROM air LIMIT 10;
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

## **OFFSET 子句**
**语法**：
```sql
OFFSET m
```
返回的结果集跳过 m 条记录, 默认 m=0
**示例**：
```sql
SELECT *
FROM air OFFSET 10;
+---------------------+-------------+------------+-------------+----------+
| time                | station     | visibility | temperature | pressure |
+---------------------+-------------+------------+-------------+----------+
| 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
| 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
| 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
+---------------------+-------------+------------+-------------+----------+
```

`OFFSET`可以和`LIMIT`语句配合使用，用于指定跳过的行数，格式为`LIMIT n OFFSET m`，
也可以简写为`LIMIT n, m`。
其中：LIMIT n控制输出m行数据，OFFSET m表示在开始返回数据之前跳过的行数。
OFFSET 0与省略OFFSET子句效果相同。

**示例**：

```sql
SELECT *
FROM air LIMIT 3, 3;
+---------------------+------------+------------+-------------+----------+
| time                | station    | visibility | temperature | pressure |
+---------------------+------------+------------+-------------+----------+
| 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       |
| 2022-01-28 13:33:00 | XiaoMaiDao | 53         | 53          | 68       |
| 2022-01-28 13:36:00 | XiaoMaiDao | 74         | 72          | 68       |
+---------------------+------------+------------+-------------+----------+
```

## **WITH 子句**
**语法**：
```sql
WITH cte AS cte_query_definiton [, ...] query
```
可选。WITH子句包含一个或多个常用的表达式CTE(Common Table Expression)。
CTE充当当前运行环境中的临时表，您可以在之后的查询中引用该表。CTE使用规则如下：
- 在同一WITH子句中的CTE必须具有唯一的名字。
- 在WITH子句中定义的CTE仅对在其后定义的同一WITH子句中的其他CTE可以使用。
假设A是子句中的第一个CTE，B是子句中的第二个CTE：

**示例**：
```sql
-- eg.
> SELECT station, avg 
  FROM (SELECT station, AVG(visibility) AS avg 
        FROM air 
        GROUP BY station) AS x;
+-------------+--------------------+
| station     | avg                |
+-------------+--------------------+
| XiaoMaiDao  | 62.285714285714285 |
| LianYunGang | 70.33333333333333  |
+-------------+--------------------+

> WITH x AS 
      (SELECT station, AVG(visibility) AS avg FROM air GROUP BY station)
  SELECT station, avg
  FROM x;
+-------------+--------------------+
| station     | avg                |
+-------------+--------------------+
| XiaoMaiDao  | 62.285714285714285 |
| LianYunGang | 70.33333333333333  |
+-------------+--------------------+
```


## **UNION 子句**

UNION 子句用于合并多个 SELECT 语句的分析结果。

**语法**：
```
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

`UNION`会对合并的结果集去重，
`UNION ALL`保留合并的结果集中相同的数据
`EXCEPT` 会作两个结果集的差，从左查询中返回右查询没有找到的所有非重复值
`INTERSECT` 返回两个结果集的交集（即两个查询都返回的所有非重复值）。

**注意**：

UNION 内每个 SELECT 子句必须拥有相同数量的列，对应列的数据类型相同。

**示例**：

**UNION ALL**
```sql
SELECT visibility FROM air WHERE temperature < 60
UNION ALL
SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
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
    

```
**UNION**
```sql
SELECT visibility FROM air WHERE temperature < 60
UNION
SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
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
```
**EXCEPT**
```sql
SELECT visibility FROM air
EXCEPT
SELECT visibility FROM air WHERE temperature < 50 LIMIT 10;
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
```
**INTERSECT**
```sql
> SELECT visibility FROM air
  INTERSECT
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
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
```

## ORDER BY 子句

按引用的表达式对结果进行排序。默认情况使用升序 (ASC)。通过在 ORDER BY 的表达式后添加 DESC 按降序排序。

```sql
SELECT age, person
FROM table
ORDER BY age;
SELECT age, person FROM table ORDER BY age DESC;
SELECT age, person FROM table ORDER BY age, person DESC;
```

## **IN**

IN 操作符允许您在 WHERE 子句中规定多个值。

**示例**：
```sql
SELECT station, temperature, visibility FROM air WHERE temperature  IN (68, 69);
+-------------+-------------+------------+
| station     | temperature | visibility |
+-------------+-------------+------------+
| XiaoMaiDao  | 69          | 56         |
| LianYunGang | 69          | 78         |
+-------------+-------------+------------+
```

**注意**：

IN 列表暂不支持表达式，暂时只支持常量


## **SHOW**

**语法**：
```sql
SHOW {DATABASES | TABLES}
```
显示所有数据库，或显示所有表

**示例**：

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
## **EXPLAIN**

**语法**：

```sql
EXPLAIN [ ANALYZE ] [ VERBOSE ] <statement>
```
**说明**：

`EXPLAIN` 语句仅用于显示查询的执行计划，而不执行查询。

`EXPLAIN ANALYZE` 执行查询，并显示查询的执行计划。

`EXPLAIN ANALYZE VERBOSE` 执行查询，并显示更详细的执行计划，包括读取的行数等。

**示例**：
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

## **DESCRIBE**
**语法**：
```sql
DESCRIBE {DATABASE db_name | TABLE tb_name}
```
描述数据库的参数，描述表的模式

**示例**：
```sql
DESCRIBE TABLE air;
+-------------+-----------+-------+-------------+
| FIELDNAME   | TYPE      | ISTAG | COMPRESSION |
+-------------+-----------+-------+-------------+
| time        | TIMESTAMP | false | Default     |
| station     | STRING    | true  | Default     |
| visibility  | DOUBLE    | false | Default     |
| temperature | DOUBLE    | false | Default     |
| pressure    | DOUBLE    | false | Default     |
+-------------+-----------+-------+-------------+

DESCRIBE DATABASE public;
+----------+-------+----------------+---------+-----------+
| TTL      | SHARD | VNODE_DURATION | REPLICA | PRECISION |
+----------+-------+----------------+---------+-----------+
| 365 Days | 1     | 365 Days       | 1       | NS        |
+----------+-------+----------------+---------+-----------+
```

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
