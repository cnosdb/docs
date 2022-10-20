---
title: 查询数据
icon: config
order: 5
---

CnosDB SQL 的灵感来自于 [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction.html)，我们支持DataFusion的大部分SQL语法。

## **SELECT**
语法：
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
    table_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
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

通配符 * 可以用于代指全部列。

```
SELECT * FROM cpu;
```

可以用`DISTINCT`进行结果去重

```sql
SELECT DISTINCT host FROM cpu;
```

## **WITH 子句**

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

## **SELECT 子句**

```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...]
```

### **Select expressions**

```sql
expression [ [ AS ] column_alias ]
```
```sql
row_expression.* [ AS ( column_alias [, ...] ) ]
```
```sql
relation.*
```
```sql
*
```


## **WINDOW 子句**

```sql
select c1, first_value(c1) over (partition by c2)
from aggregate_test_100
```

## **Set operations**

### **UNION 子句**

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

#### ORDER BY 子句

按引用的表达式对结果进行排序。默认情况使用升序 (ASC)。通过在 order by 的表达式后添加 DESC 按降序排序。

```sql
SELECT age, person
FROM table
ORDER BY age;
SELECT age, person FROM table ORDER BY age DESC;
SELECT age, person FROM table ORDER BY age, person DESC;
```

### LIMIT 子句

限制行数为count，count必须非负

例子：

```sql
SELECT age, person
FROM table LIMIT 10
```

## **OFFSET clause**

### **Qualifying column names**



## **Subqueries**

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

### **Scalar subquery**



# **DCL (无)**



# **EXPLAIN**

EXPLAIN 语句仅用于显示查询的执行计划，而不执行查询。

```sql
{ EXPLAIN | DESCRIBE } [ ANALYZE ] [ VERBOSE ] <statement>
    ```



    # **DESCRIBE**

    ```sql
    DESCRIBE table_name
    ```



    # **SHOW**

    ## **SHOW VARIABLE**

    ```sql
    -- only support show tables
    -- SHOW TABLES is not supported unless information_schema is enabled
    SHOW TABLES
    ```

    ## **SHOW COLUMNS**

    ```sql
    -- SHOW COLUMNS with WHERE or LIKE is not supported
    -- SHOW COLUMNS is not supported unless information_schema is enabled
    -- treat both FULL and EXTENDED as the same
    SHOW [ EXTENDED ] [ FULL ]
    { COLUMNS | FIELDS }
    { FROM | IN }
    table_name
    ```

    ## **SHOW CREATE TABLE**

    ```sql
    SHOW CREATE TABLE table_name
    ```
