---
title: 查询数据
order: 5
---

CnosDB SQL 的灵感来自于 [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction.html)，我们支持DataFusion的大部分SQL语法。

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

```
SELECT * FROM cpu;
```

### ALL/DISTINCT
语法：
```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...]
```
在选取的列名前可以使用`DISTINCT`去掉重复字段，只返回去重后的值。
使用`ALL`会返回字段中所有重复的值。不指定此选项时，默认值为`ALL`。

示例:
```sql
SELECT DISTINCT host FROM cpu;
SELECT ALL host FROM cpu;
```

### AS

可以用 AS 为列表达式取别名

语法：
```sql
expression [ [ AS ] column_alias ]
```
示例
```sql
SELECT power AS p FROM cpu;
```


## **WITH 子句**
可选。WITH子句包含一个或多个常用的表达式CTE(Common Table Expression)。
CTE充当当前运行环境中的临时表，您可以在之后的查询中引用该表。CTE使用规则如下：
- 在同一WITH子句中的CTE必须具有唯一的名字。
- 在WITH子句中定义的CTE仅对在其后定义的同一WITH子句中的其他CTE可以使用。
假设A是子句中的第一个CTE，B是子句中的第二个CTE：

```sql
-- eg.
SELECT a, b
FROM (SELECT a, MAX(b) AS b
FROM t
GROUP BY a) AS x;

WITH x AS (SELECT a, MAX(b) AS b FROM t GROUP BY a)
SELECT a, b
FROM x;
```


## **UNION 子句**

UNION子句用于合并多个SELECT语句的分析结果。

```
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

注意:UNION内每个SELECT子句必须拥有相同数量的列，对应列的数据类型相同。

示例：

```sql
SELECT 1
UNION ALL
SELECT 2;
```

## ORDER BY 子句

按引用的表达式对结果进行排序。默认情况使用升序 (ASC)。通过在 order by 的表达式后添加 DESC 按降序排序。

```sql
SELECT age, person
FROM table
ORDER BY age;
SELECT age, person FROM table ORDER BY age DESC;
SELECT age, person FROM table ORDER BY age, person DESC;
```

## LIMIT 子句

限制行数为count，count必须非负

例子：

```sql
SELECT age, person
FROM table LIMIT 10
```

## **OFFSET 子句**
`OFFSET`可以和`ORDER BY...LIMIT`语句配合使用，用于指定跳过的行数，格式为`ORDER BY...LIMIT m OFFSET n`，
也可以简写为`ORDER BY...LIMIT n, m`。
其中：LIMIT m控制输出m行数据，OFFSET n表示在开始返回数据之前跳过的行数。
OFFSET 0与省略OFFSET子句效果相同。

## **子查询**

### **EXISTS**

EXISTS 条件测试子查询中是否存在行，并在子查询返回至少一个行时返回 true。如果指定 NOT，此条件将在子查询未返回任何行时返回 true。

示例：

```sql
SELECT id  FROM date
WHERE EXISTS (SELECT 1 FROM shop
WHERE date.id = shop.id)
ORDER BY id;
```

### **IN**

IN 操作符允许您在 WHERE 子句中规定多个值。

示例：

```sql
SELECT host, machine
FROM cpu
WHERE host IN ('127.0.0.1', '0.0.0.0');
```

## **EXPLAIN**

EXPLAIN 语句仅用于显示查询的执行计划，而不执行查询。

```sql
{ EXPLAIN | DESCRIBE } [ ANALYZE ] [ VERBOSE ] <statement>
```

[//]: # (# **DCL &#40;无&#41;**)
[//]: # (# **DESCRIBE**)
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
