---
title: 分组操作
order: 7
---

## GROUP BY 子句
GROUP BY 子句必须在 WHERE 子句的条件之后，ORDER BY 子句（如果有的话）之前。

示例：

```sql
SELECT NAME, SUM(SALARY)
FROM CUSTOMERS
GROUP BY NAME;
```

## **复杂的分组操作**

CnosDB 提供了 `GROUPING SET`， `ROLLUP`， `CUBE`等复杂分组操作，使您能以不同的方式操作查询结果

### **GROUPING SETS**

GROUPING SETS 是可以将行分组在一起的一组或一组列。

您可以简单地使用 GROUPING SETS，而不是编写多个查询并将结果与 UNION 组合。

CnosDB 中的 GROUPING SETS 可以被认为是 GROUP BY 子句的扩展。 它允许您在同一查询中定义多个分组集。

让我们看看如下用例，看它如何等同于具有多个 UNION ALL 子句的 GROUP BY。

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

如下查询演示了GROUPING SETS的语义

```sql
SELECT origin_state, origin_zip, destination_state, sum(package_weight)
FROM shipping
GROUP BY GROUPING SETS ( (origin_state),
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

上述查询等价于

```sql
SELECT origin_state, NULL, NULL, sum(package_weight)
FROM shipping GROUP BY origin_state

UNION ALL

SELECT origin_state, origin_zip, NULL, sum(package_weight)
FROM shipping GROUP BY origin_state, origin_zip

UNION ALL

SELECT NULL, NULL, destination_state, sum(package_weight)
FROM shipping GROUP BY destination_state;
```

### **ROLLUP**

与 GROUPING SETS 类似，您可以在单个查询中使用 ROLLUP 选项来生成多个分组集。

ROLLUP 假定输入列之间存在层次结构。

如果你的group by 子句是

```sql
GROUP BY ROLLUP(column_1,column_2)
```

它与如下的GROUPING SETS 等同

```sql
GROUP BY GROUPING SETS(
    (column_1, column_2)
    (column_1)
    ()
)
```

ROLLUP 生成在此层次结构中有意义的所有分组集。 每次 column_1 的值发生变化时，它都会生成一个小计行；

因此，我们经常在报告中使用 ROLLUP 来生成小计和总计。 ROLLUP 中列的顺序非常重要。


```sql
SELECT origin_state, origin_zip, sum(package_weight)
FROM shipping
GROUP BY ROLLUP (origin_state, origin_zip);
SELECT origin_state, origin_zip, sum(package_weight)
FROM shipping
GROUP BY GROUPING SETS ((origin_state, origin_zip), (origin_state), ());
```

### **CUBE**
与 ROLLUP 类似，CUBE 是 GROUP BY 子句的扩展。 它允许您为 GROUP BY 子句中指定的分组列的所有组合生成小计。

CUBE 就像结合了 GROUPING SETS 和 ROLLUP。

CUBE为指定表达式集的每个可能组合创建分组集。首先会对(A、B、C)进行group by，

然后依次是(A、B)，(A、C)，(A)，(B、C)，(B)，(C)，最后对全表进行group by操作。
```sql
SELECT origin_state, destination_state, sum(package_weight)
FROM shipping
GROUP BY CUBE (origin_state, destination_state);
```

上述语句等价于

```sql
SELECT origin_state, destination_state, sum(package_weight)
FROM shipping
GROUP BY GROUPING SETS (
    (origin_state, destination_state),
    (origin_state),
    (destination_state),
    ()
    );
```


### **组合多个分组表达式**

```sql
-- grouping set、cube、rollup可以在同一个sql中出现多次
```

### **GROUPING**
    GROUPING(column_expression)

**说明**：GROUPING函数只能用于有GROUP BY 子句的表达式

当指定`GROUP BY`时，只能在 SELECT 列表、HAVING 和 ORDER BY 子句中使用 GROUPING。

**参数**： 只能是GROUP BY 子句中的表达式

```sql
SELECT origin_state,
origin_zip,
destination_state,
sum(package_weight),
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

**注意**： GROUPING 用于区分 ROLLUP、CUBE 或 GROUPING SETS 返回的空值与标准空值。

作为 ROLLUP、CUBE 或 GROUPING SETS 操作的结果返回的 NULL 是 NULL 的一种特殊用途。

这充当结果集中的列占位符，表示全部。

## **HAVING 子句**

```sql
SELECT count(*),
mktsegment,
nationkey,
CAST(sum(acctbal) AS bigint) AS totalbal
FROM customer
GROUP BY mktsegment, nationkey
HAVING sum(acctbal) > 5700000
ORDER BY totalbal DESC;
```