---
title: SQL
icon: config
---

CnosDB SQL 的灵感来自于 [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction.html)，我们支持DataFusion的大部分SQL语法。



# **DDL**

## **CREATE DATABASE**

```sql
CREATE DATABASE [ IF NOT EXISTS ] database_name
```

## **CREATE SCHEMA**

```sql
CREATE SCHEMA [ IF NOT EXISTS ] schema_name
```

## **CREATE MEMORY TABLE**

```sql
CREATE [ OR REPLACE ] TABLE [ IF NOT EXISTS ] table_name
AS
{ SELECT | VALUES LIST }

eg.
CREATE TABLE valuetable AS VALUES(1,'HELLO'),(12,'DATAFUSION');

CREATE TABLE memtable as select * from valuetable;
```

## **CREATE EXTERNAL** **TABLE**

```sql
-- Column definitions can not be specified for PARQUET files

CREATE EXTERNAL TABLE [ IF NOT EXISTS ]
table_name (
{ column_name data_type
[ NULL ]
}
[, ...]
)
STORED AS { PARQUET | NDJSON | CSV | AVRO }
[ WITH HEADER ROW ]
[ DELIMITER 'a_single_char' ]
[ PARTITIONED BY (column_name, [, ...]) ]
LOCATION '/path/to/file'
```

## **CREATE VIEW**

```sql
CREATE [ OR REPLACE ] VIEW view_name AS { SELECT | VALUES LIST }
```

## **DROP TABLE**

```sql
-- We don't support cascade and purge for now.
DROP TABLE [ IF EXISTS ] table_name
```



# **DML**
> CnosDB SQL 不支持DML。


# **DQL**

## **SELECT**

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

## **WITH clause**

```sql
-- eg.
SELECT a, b
FROM (
SELECT a, MAX(b) AS b FROM t GROUP BY a
) AS x;

WITH x AS (SELECT a, MAX(b) AS b FROM t GROUP BY a)
SELECT a, b FROM x;
```



## **SELECT clause**

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



## **GROUP BY clause**

### **复杂的分组操作**

### **GROUPING SETS**

```sql
-- 原始数据
SELECT * FROM shipping;
--  origin_state | origin_zip | destination_state | destination_zip | package_weight
-- --------------+------------+-------------------+-----------------+----------------
--  California   |      94131 | New Jersey        |            8648 |             13
--  California   |      94131 | New Jersey        |            8540 |             42
--  New Jersey   |       7081 | Connecticut       |            6708 |            225
--  California   |      90210 | Connecticut       |            6927 |           1337
--  California   |      94131 | Colorado          |           80302 |              5
--  New York     |      10002 | New Jersey        |            8540 |              3
-- (6 rows)
```
```sql
-- 如下查询演示了GROUPING SETS的语义
SELECT origin_state, origin_zip, destination_state, sum(package_weight)
FROM shipping
GROUP BY GROUPING SETS (
(origin_state),
(origin_state, origin_zip),
(destination_state));
--  origin_state | origin_zip | destination_state | _col0
--  --------------+------------+-------------------+-------
--   New Jersey   | NULL       | NULL              |   225
--   California   | NULL       | NULL              |  1397
--   New York     | NULL       | NULL              |     3
--   California   |      90210 | NULL              |  1337
--   California   |      94131 | NULL              |    60
--   New Jersey   |       7081 | NULL              |   225
--   New York     |      10002 | NULL              |     3
--   NULL         | NULL       | Colorado          |     5
--   NULL         | NULL       | New Jersey        |    58
--   NULL         | NULL       | Connecticut       |  1562
--  (10 rows)
```
```sql
-- 上述查询等价于
SELECT origin_state, NULL, NULL, sum(package_weight)
FROM shipping GROUP BY origin_state

UNION ALL

SELECT origin_state, origin_zip, NULL, sum(package_weight)
FROM shipping GROUP BY origin_state, origin_zip

UNION ALL

SELECT NULL, NULL, destination_state, sum(package_weight)
FROM shipping GROUP BY destination_state;
```

### **CUBE**

```sql
SELECT origin_state, destination_state, sum(package_weight)
FROM shipping
GROUP BY CUBE (origin_state, destination_state);
-- 上述语句等价于
SELECT origin_state, destination_state, sum(package_weight)
FROM shipping
GROUP BY GROUPING SETS (
(origin_state, destination_state),
(origin_state),
(destination_state),
()
);
```

### **ROLLUP**

```sql
SELECT origin_state, origin_zip, sum(package_weight)
FROM shipping
GROUP BY ROLLUP (origin_state, origin_zip);
SELECT origin_state, origin_zip, sum(package_weight)
FROM shipping
GROUP BY GROUPING SETS ((origin_state, origin_zip), (origin_state), ());
```

### **组合多个分组表达式**

```sql
-- grouping set、cube、rollup可以在同一个sql中出现多次
```

### **GROUPING operation**

```sql
SELECT origin_state, origin_zip, destination_state, sum(package_weight),
grouping(origin_state, origin_zip, destination_state)
FROM shipping
GROUP BY GROUPING SETS (
(origin_state),
(origin_state, origin_zip),
(destination_state)
);

-- origin_state | origin_zip | destination_state | _col3 | _col4
-- --------------+------------+-------------------+-------+-------
-- California   | NULL       | NULL              |  1397 |     3
-- New Jersey   | NULL       | NULL              |   225 |     3
-- New York     | NULL       | NULL              |     3 |     3
-- California   |      94131 | NULL              |    60 |     1
-- New Jersey   |       7081 | NULL              |   225 |     1
-- California   |      90210 | NULL              |  1337 |     1
-- New York     |      10002 | NULL              |     3 |     1
-- NULL         | NULL       | New Jersey        |    58 |     6
-- NULL         | NULL       | Connecticut       |  1562 |     6
-- NULL         | NULL       | Colorado          |     5 |     6
-- (10 rows)
```



## **HAVING clause**

```sql
SELECT count(*), mktsegment, nationkey,
CAST(sum(acctbal) AS bigint) AS totalbal
FROM customer
GROUP BY mktsegment, nationkey
HAVING sum(acctbal) > 5700000
ORDER BY totalbal DESC;
```



## **WINDOW clause**

```sql
select c1, first_value(c1) over (partition by c2)
from aggregate_test_100
```



## **Set operations**

### **UNION clause**

### **INTERSECT clause**

### **EXCEPT clause**



## **ORDER BY clause**



## **OFFSET clause**



## **Joins**

### **CROSS JOIN**

### **Qualifying column names**



## **Subqueries**

### **EXISTS**

### **IN**

### **Scalar subquery**



# **DCL (无)**



# **EXPLAIN**

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
