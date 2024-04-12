---
sidebar_position: 5
---

# 数据查询语言

用来从数据库中检索数据。

```sql
[ WITH with_query [, ...] ]
SELECT [ ALL | DISTINCT ] select_expression [, ...]
    [ FROM from_item [, ...] ]
    [ JOIN join_item [, ...] ]
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
-- grouping_element
    ()
```

### `WITH`

`WITH` 子句允许为查询提供名称并按名称引用它们。

`WITH` 子句用于创建临时命名的结果集，也称为 公共表表达式（[CTE](https://learnsql.com/blog/what-is-common-table-expression/)）。

通过使用 `WITH` 关键字，可以在 SQL 查询中定义一个临时的结果集，并为其指定一个名称。这个临时结果集可以在查询的其他部分中被引用，从而使查询更清晰、可读性更高，并且可以避免重复性的子查询。

```sql
WITH x AS (SELECT a, MAX(b) AS b FROM t GROUP BY a)
SELECT a, b FROM x;
```

<details>
  <summary>查看 <code>WITH</code> 示例</summary>

```sql
WITH x AS (SELECT station, avg(temperature) AS avg_temperature FROM air GROUP BY station)
SELECT station, avg_temperature FROM x;
```

</details>

## `SELECT`

`SELECT` 子句用于从数据库中检索数据。

在 SQL 查询中，`SELECT` 语句用于指定要返回的列，以及要从中检索数据的 `table`。通过使用 `SELECT` 关键字，可以选择特定列或所有列，并从中检索数据。

可以添加 `DISTINCT` 返回所有不同的行，默认为 `ALL`。

<details>
  <summary>查看 <code>DISTINCT</code> 和 <code>ALL</code> 示例</summary>

\*\*`DISTINCT` 和 `ALL` 对于 `TAG` 类型的列没有效果。**Example**

```sql {1}
SELECT DISTINCT station FROM air;
+-------------+
| station     |
+-------------+
| XiaoMaiDao  |
| LianYunGang |
+-------------+
```

```sql {1}
SELECT station FROM air;
+-------------+
| station     |
+-------------+
| XiaoMaiDao  |
| LianYunGang |
+-------------+
```

无论是否使用 `DISTINCT`，`TAG` 类型的列都会主动去重复。

\*\*`DISTINCT` 和 `ALL` 只对 `FIELD` 类型的列有效果。**Example**

以下的  `temperature` 列有多条相同的记录。

```sql {1}
SELECT temperature FROM air WHERE temperature = 50;
+-------------+
| temperature |
+-------------+
| 50.0        |
| 50.0        |
| 50.0        |
| 50.0        |
| 50.0        |
| 50.0        |
| 50.0        |
| 50.0        |
| 50.0        |
| ... ...     |
+-------------+
```

如果使用 `DISTINCT` 对 `temperature` 列中的记录去重，则只会返回一条记录。

```sql {1}
SELECT DISTINCT temperature FROM air WHERE temperature = 50;
+-------------+
| temperature |
+-------------+
| 50.0        |
+-------------+
```

</details>

## `FROM`

`FROM` 子句用于指定要从中检索数据的 `table` 或 `table` 表达式。即要从中选择数据的 `table`。通过在 `FROM` 子句中指定 `table` 的名称，可以告诉数据库系统从哪里获取数据。

\*\*指定 `table` 名称。**Example**

<details>
  <summary>查看示例</summary>

```sql {1}
SELECT * FROM air;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-01-14T16:00:00 | LianYunGang | 68.0     | 78.0        | 52.0       |
| 2023-01-14T16:03:00 | LianYunGang | 69.0     | 54.0        | 72.0       |
| 2023-01-14T16:06:00 | LianYunGang | 65.0     | 54.0        | 78.0       |
| 2023-01-14T16:09:00 | LianYunGang | 51.0     | 75.0        | 64.0       |
| ... ...      |
+---------------------+-------------+----------+-------------+------------+
Query took 0.069 seconds.
```

</details>

\*\*使用 `VALUE` 构建临时表。**Example**

<details>
  <summary>查看示例</summary>

```sql
SELECT *
FROM
  (VALUES ('2023-01-01 12:00:00'::TIMESTAMP, 1.23, 4.56),
          ('2023-01-01 13:00:00'::TIMESTAMP, 2.46, 8.1),
          ('2023-01-01 13:00:00'::TIMESTAMP, 4.81, 16.2)
  ) AS data(time, f1, f2);
```

</details>

## `WHERE`

`WHERE` 子句用于筛选满足指定条件的行数据。

当使用 `SELECT` 语句从数据库中检索数据时，可以通过 `WHERE` 子句指定条件，以便只返回满足条件的行。这样可以对数据进行过滤，只选择符合特定条件的数据行。

`WHERE` 子句通常与 [比较运算符](reference.md#比较运算符) 和 [逻辑运算符](reference.md#逻辑运算符) 一起使用，以构建复杂的筛选条件。

<details>
  <summary>查看示例</summary>

```sql {1}
SELECT * FROM air WHERE temperature > 60;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-01-14T16:00:00 | LianYunGang | 68.0     | 78.0        | 52.0       |
| 2023-01-14T16:09:00 | LianYunGang | 51.0     | 75.0        | 64.0       |
| 2023-01-14T16:15:00 | LianYunGang | 79.0     | 68.0        | 67.0       |
| 2023-01-14T16:18:00 | LianYunGang | 70.0     | 77.0        | 57.0       |
| ... ...       														  |
+---------------------+-------------+----------+-------------+------------+
```

</details>

## `JOIN`

`JOIN` 子句可以连接多个表的数据。支持以下连接：

`INNER JOIN`, `LEFT OUTER JOIN`， `RIGHT OUTER JOIN`， `FULL OUTER JOIN`

<details>
  <summary>查看<code>INNER JOIN</code>示例</summary>

```sql {1}
SELECT * FROM air INNER JOIN sea ON air.temperature = sea.temperature;
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
| time                | station    | visibility | temperature | pressure | time                | station     | temperature |
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
| 2022-01-28 13:27:00 | XiaoMaiDao | 67         | 62          | 59       | 2022-01-28 13:18:00 | LianYunGang | 62          |
| 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:30:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:24:00 | XiaoMaiDao | 50         | 78          | 66       | 2022-01-28 13:33:00 | XiaoMaiDao  | 78          |
| 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       | 2022-01-28 13:39:00 | XiaoMaiDao  | 79          |
+---------------------+------------+------------+-------------+----------+---------------------+-------------+-------------+
```

</details>

<details>
  <summary>查看<code>LEFT JOIN</code>示例</summary>

```sql {1}
SELECT * FROM air LEFT JOIN sea ON air.temperature = sea.temperature;
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

</details>

<details>
  <summary>查看<code>RIGHT JOIN</code>示例</summary>

```sql {1}
SELECT * FROM air RIGHT JOIN sea ON air.temperature = sea.temperature;
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

</details>

<details>
  <summary>查看<code>FULL JOIN</code>示例</summary>

```sql {1}
SELECT * FROM air FULL JOIN sea ON air.temperature = sea.temperature;
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

</details>

## `GROUP BY`

用于将查询结果按指定列进行分组。通过使用 `GROUP BY` 子句，可以对查询结果进行分组，并且通常与聚合函数（如 `count`、`sum`、`avg` 等）一起使用，以便在每个组上执行聚合操作。

在使用 `GROUP BY` 子句时，查询结果将根据指定的列值进行分组，并且每个组将具有相同的值。这使得可以在每个组上应用聚合函数，以便获取每个组的汇总信息。

<details>
  <summary>查看示例</summary>

```sql {1}
SELECT station, avg(temperature) FROM air GROUP BY station;
+-------------+----------------------+
| station     | AVG(air.temperature) |
+-------------+----------------------+
| LianYunGang | 65.12753786942551    |
| XiaoMaiDao  | 64.93894989583701    |
+-------------+----------------------+
```

</details>

## `HAVING`

`HAVING` 子句通常与 `GROUP BY` 子句一起使用，用于过滤基于聚合函数计算结果的组。

当使用 `GROUP BY` 子句对查询结果进行分组后，`HAVING` 子句允许在分组后的结果集上进一步筛选数据。它类似于` WHERE` 子句，但 `WHERE` 子句用于筛选行，而 `HAVING` 子句用于筛选组。

<details>
  <summary>查看示例</summary>

```sql {1}
SELECT station, avg(temperature)  AS avg_t FROM air GROUP BY station HAVING avg_t > 65;
+-------------+-------------------+
| station     | avg_t             |
+-------------+-------------------+
| LianYunGang | 65.12753786942551 |
+-------------+-------------------+
```

</details>

## `ROLLUP`

`ROLLUP`  用于生成包含超级聚合行的多维聚合数据的操作符。

在 SQL 中，`ROLLUP` 用于对 `GROUP BY` 子句中的列进行多层次的汇总。它会生成包含每个层次的合计行的结果。`ROLLUP` 从最右边的列开始，逐渐向左侧添加列进行汇总，直到生成一个包含所有行的总计行。

<details>
  <summary>查看 <code>CUBE</code> 示例</summary>

```sql
SELECT station, visibility, avg(temperature) FROM air GROUP BY ROLLUP (station, visibility);
+-------------+------------+----------------------+
| station     | visibility | AVG(air.temperature) |
+-------------+------------+----------------------+
| XiaoMaiDao  | 60.0       | 64.96266968325791    |
| XiaoMaiDao  | 58.0       | 64.9239250275634     |
| XiaoMaiDao  | 68.0       | 64.9284876905041     |
| LianYunGang | 52.0       | 66.01172707889125    |
| ... ...    |
+-------------+------------+----------------------+
```

</details>

## `CUBE`

`CUBE` 用于生成所有可能的组合的多维聚合数据的操作符。

在 SQL 中，`CUBE` 用于对 `GROUP BY` 子句中的列进行多维聚合，生成所有可能的组合。它会生成包含每个列的合计行的结果，从单个列到所有列的组合。

使用 `CUBE` 可以生成比 `ROLLUP` 更多的汇总数据，因为它会考虑所有可能的组合，而不仅仅是从右向左逐渐添加列进行汇总。

<details>
  <summary>查看 <code>CUBE</code> 示例</summary>

```sql {1}
SELECT station, visibility, avg(temperature)
FROM air
GROUP BY CUBE (station, visibility);
+-------------+------------+----------------------+
| station     | visibility | AVG(air.temperature) |
+-------------+------------+----------------------+
| LianYunGang | 61.0       | 65.32092004381161    |
| LianYunGang | 73.0       | 65.2793614595211     |
| LianYunGang | 62.0       | 64.81818181818181    |
|             | 72.0       | 65.20739968733716    |
|             | 64.0       | 65.02692307692308    |
|             | 57.0       | 64.69567690557452    |
|             | 55.0       | 65.103579175705      |
|             | 77.0       | 64.8709497206704     |
| XiaoMaiDao  | 78.0       | 64.73741794310722    |
| ... ...     |
```

</details>

## `UNION`

`UNION` 子句用于合并两个或多个 `SELECT` 语句的结果集并去除重复的行。

通过使用 `UNION` 关键字，可以将多个 `SELECT` 查询的结果集合并为一个结果集。需要注意的是，使用 `UNION` 时，要求每个 `SELECT` 查询返回相同数量和类型的列，以便能够正确地合并结果集。

除了 `UNION` 还有 `UNION ALL`，它也用于合并结果集，但不会去除重复的行。`UNION ALL` 比 `UNION` 更快，因为它不执行去重操作。

<details>
  <summary>查看 <code>UNION ALL</code> 示例</summary>

```sql {1-3}
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

</details>

<details>
  <summary>查看 <code>UNION</code> 示例</summary>

```sql {1-3}
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

</details>

## `ORDER BY`

ORDER BY 子句用于对查询结果按指定列进行排序。

通过使用 `ORDER BY` 子句，可以对查询结果按一个或多个列的值进行排序，可以指定升序（`ASC`）或降序（`DESC`）排列顺序。默认情况下，`ORDER BY` 子句按升序排列。

<details>
  <summary>查看示例</summary>

```sql {1}
SELECT * FROM air ORDER BY temperature DESC limit 10;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-02-13T05:42:00 | LianYunGang | 64.0     | 80.0        | 51.0       |
| 2023-02-15T08:06:00 | LianYunGang | 51.0     | 80.0        | 69.0       |
| 2023-02-26T23:18:00 | LianYunGang | 79.0     | 80.0        | 77.0       |
| 2023-02-03T06:36:00 | LianYunGang | 72.0     | 80.0        | 68.0       |
| ... ...       |
+---------------------+-------------+----------+-------------+------------+
```

</details>

## `LIMIT`

`LIMIT` 子句，用于限制查询结果返回的行数。

在 SQL 查询中，`LIMIT` 子句用于指定要返回的行数，从而控制查询结果集的大小。通过使用 `LIMIT`，可以限制返回的行数，以便只获取需要的数据行。

<details>
  <summary>查看示例</summary>

```sql {1}
SELECT * FROM air LIMIT 10;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-01-14T16:00:00 | LianYunGang | 68.0     | 78.0        | 52.0       |
| 2023-01-14T16:03:00 | LianYunGang | 69.0     | 54.0        | 72.0       |
| 2023-01-14T16:06:00 | LianYunGang | 65.0     | 54.0        | 78.0       |
| 2023-01-14T16:09:00 | LianYunGang | 51.0     | 75.0        | 64.0       |
| 2023-01-14T16:12:00 | LianYunGang | 60.0     | 50.0        | 67.0       |
| 2023-01-14T16:15:00 | LianYunGang | 79.0     | 68.0        | 67.0       |
| 2023-01-14T16:18:00 | LianYunGang | 70.0     | 77.0        | 57.0       |
| 2023-01-14T16:21:00 | LianYunGang | 50.0     | 62.0        | 61.0       |
| 2023-01-14T16:24:00 | LianYunGang | 53.0     | 69.0        | 51.0       |
| 2023-01-14T16:27:00 | LianYunGang | 69.0     | 76.0        | 63.0       |
+---------------------+-------------+----------+-------------+------------+
```

</details>

## `OFFSET`

`OFFSET` 子句通常与 `LIMIT` 结合使用，用于指定从查询结果中跳过多少行开始返回数据

在 SQL 查询中，`OFFSET` 用于指定要跳过的行数，而 `LIMIT` 用于指定要返回的行数。通过结合使用 `OFFSET` 和 `LIMIT`，可以实现分页功能，从查询结果中获取指定范围的数据。

<details>
  <summary>查看示例</summary>

```sql {1}
SELECT * FROM air LIMIT 3 OFFSET 3;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-01-14T16:09:00 | LianYunGang | 51.0     | 75.0        | 64.0       |
| 2023-01-14T16:12:00 | LianYunGang | 60.0     | 50.0        | 67.0       |
| ... ...       |
+---------------------+-------------+----------+-------------+------------+
```

</details>

## `SHOW`

`SHOW` 不是标准 SQL 命令，而是 CnosDB 提供的指令，用于显示数据库对象或元数据信息。

```sql
SHOW {DATABASES | TABLES | QUERIES}
```

## `SHOW SERIES`

返回指定 `table` 的 `series` 列表。

```sql
SHOW SERIES [ON database_name] FROM table_name [WHERE expr] [order_by_clause] [limit_clause] 
```

## `SHOW TAG VALUES`

根据条件过滤 `TAG` 类型列中的数据。

```sql
SHOW TAG VALUES [ON database_name] FROM table_name WITH KEY [<operator> "<tag_key>" | [[NOT] IN ("<tag_key1>", ..)]] [WHERE expr] [order_by_clause] [limit_clause];
```

## `SHOW QUERIES`

获取当前正在运行的 SQL 任务。

```sql
SHOW QUERIES;
```

如果您想查看更详细的信息，可以运行 `SELECT * FROM information_schema.queries`

## `EXPLAIN`

返回指定 SQL 语句的逻辑和物理执行计划。

```sql
EXPLAIN [ ANALYZE ] [ VERBOSE ] <statement>;
```

| Options   | Description |
| --------- | ----------- |
| `ANALYZE` | 执行查询。       |
| `VERBOSE` | 显示详细信息。     |

\*\*返回语句的执行计划。**Example**

```sql
EXPLAIN SELECT station,avg(temperature) FROM air GROUP BY station;
```

<details>
  <summary>查看 <code>EXPLAIN</code> 返回结果</summary>

```
+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| plan_type     | plan                                                                                                                                                      |
+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| logical_plan  | Aggregate: groupBy=[[air.station]], aggr=[[AVG(air.temperature)]]                                                                                         |
|               |   Projection: air.station, air.temperature                                                                                                                |
|               |     TableScan: air projection=[time, station, temperature]                                                                                                |
| physical_plan | AggregateExec: mode=FinalPartitioned, gby=[station@0 as station], aggr=[AVG(air.temperature)]                                                             |
|               |   CoalesceBatchesExec: target_batch_size=8192                                                                                                             |
|               |     RepartitionExec: partitioning=Hash([station@0], 8), input_partitions=8                                                                                |
|               |       AggregateExec: mode=Partial, gby=[station@0 as station], aggr=[AVG(air.temperature)]                                                                |
|               |         RepartitionExec: partitioning=RoundRobinBatch(8), input_partitions=1                                                                              |
|               |           ProjectionExec: expr=[station@1 as station, temperature@2 as temperature]                                                                       |
|               |             TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, filter=None, split_num=1, projection=[time,station,temperature] |
|               |                                                                                                                                                           |
+---------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

\*\*返回语句的执行计划和指标。**Example**

```sql
EXPLAIN ANALYZE SELECT station,avg(temperature) FROM air GROUP BY station;
```

<details>
  <summary>查看 <code>EXPLAIN ANALYZE</code> 返回结果</summary>

```
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| plan_type         | plan                                                                                                                                                                                                                |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Plan with Metrics | AggregateExec: mode=FinalPartitioned, gby=[station@0 as station], aggr=[AVG(air.temperature)], metrics=[output_rows=2, elapsed_compute=108.585µs]                                                                   |
|                   |   CoalesceBatchesExec: target_batch_size=8192, metrics=[output_rows=2, elapsed_compute=10.423µs]                                                                                                                    |
|                   |     RepartitionExec: partitioning=Hash([station@0], 8), input_partitions=8, metrics=[send_time=11.672µs, repart_time=81.914µs, fetch_time=398.991706ms]                                                             |
|                   |       AggregateExec: mode=Partial, gby=[station@0 as station], aggr=[AVG(air.temperature)], metrics=[output_rows=2, elapsed_compute=4.400582ms]                                                                     |
|                   |         RepartitionExec: partitioning=RoundRobinBatch(8), input_partitions=1, metrics=[send_time=9.25µs, repart_time=1ns, fetch_time=49.235835ms]                                                                   |
|                   |           ProjectionExec: expr=[station@1 as station, temperature@2 as temperature], metrics=[output_rows=56642, elapsed_compute=3.876µs]                                                                           |
|                   |             TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, filter=None, split_num=1, projection=[time,station,temperature], metrics=[output_rows=56642, elapsed_compute=48.692167ms] |
|                   |                                                                                                                                                                                                                     |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

\*\*返回语句的详细执行计划和指标。**Example**

```sql
EXPLAIN ANALYZE VERBOSE SELECT station,avg(temperature) FROM air GROUP BY station;
```

<details>
  <summary>查看 <code>EXPLAIN ANALYZE VERBOSE</code> 返回结果</summary>

```
+------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| plan_type              | plan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
+------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Plan with Metrics      | AggregateExec: mode=FinalPartitioned, gby=[station@0 as station], aggr=[AVG(air.temperature)], metrics=[output_rows=2, elapsed_compute=118.33µs]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                        |   CoalesceBatchesExec: target_batch_size=8192, metrics=[output_rows=2, elapsed_compute=8.715µs]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                        |     RepartitionExec: partitioning=Hash([station@0], 8), input_partitions=8, metrics=[send_time=13.839µs, repart_time=74.373µs, fetch_time=422.859584ms]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|                        |       AggregateExec: mode=Partial, gby=[station@0 as station], aggr=[AVG(air.temperature)], metrics=[output_rows=2, elapsed_compute=5.234127ms]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                        |         RepartitionExec: partitioning=RoundRobinBatch(8), input_partitions=1, metrics=[send_time=7.584µs, repart_time=1ns, fetch_time=52.201667ms]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|                        |           ProjectionExec: expr=[station@1 as station, temperature@2 as temperature], metrics=[output_rows=56642, elapsed_compute=3.041µs]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                        |             TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, filter=None, split_num=1, projection=[time,station,temperature], metrics=[output_rows=56642, elapsed_compute=51.542627ms]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Plan with Full Metrics | AggregateExec: mode=FinalPartitioned, gby=[station@0 as station], aggr=[AVG(air.temperature)], metrics=[start_timestamp{partition=2}=2024-03-12 10:42:07.441447336 UTC, end_timestamp{partition=2}=2024-03-12 10:42:07.496184752 UTC, elapsed_compute{partition=2}=19.208µs, output_rows{partition=2}=1, start_timestamp{partition=7}=2024-03-12 10:42:07.441470669 UTC, end_timestamp{partition=7}=2024-03-12 10:42:07.496191419 UTC, elapsed_compute{partition=7}=10.208µs, output_rows{partition=7}=0, start_timestamp{partition=3}=2024-03-12 10:42:07.441519711 UTC, end_timestamp{partition=3}=2024-03-12 10:42:07.496168044 UTC, elapsed_compute{partition=3}=10.333µs, output_rows{partition=3}=0, start_timestamp{partition=4}=2024-03-12 10:42:07.441547544 UTC, end_timestamp{partition=4}=2024-03-12 10:42:07.496138711 UTC, elapsed_compute{partition=4}=11.25µs, output_rows{partition=4}=0, start_timestamp{partition=0}=2024-03-12 10:42:07.441572086 UTC, end_timestamp{partition=0}=2024-03-12 10:42:07.496200086 UTC, elapsed_compute{partition=0}=8.749µs, output_rows{partition=0}=0, start_timestamp{partition=5}=2024-03-12 10:42:07.441587627 UTC, end_timestamp{partition=5}=2024-03-12 10:42:07.496196377 UTC, elapsed_compute{partition=5}=9.333µs, output_rows{partition=5}=0, start_timestamp{partition=6}=2024-03-12 10:42:07.441590377 UTC, end_timestamp{partition=6}=2024-03-12 10:42:07.496188544 UTC, elapsed_compute{partition=6}=38.792µs, output_rows{partition=6}=1, start_timestamp{partition=1}=2024-03-12 10:42:07.441649669 UTC, end_timestamp{partition=1}=2024-03-12 10:42:07.496194502 UTC, elapsed_compute{partition=1}=10.457µs, output_rows{partition=1}=0] |
|                        |   CoalesceBatchesExec: target_batch_size=8192, metrics=[start_timestamp{partition=2}=2024-03-12 10:42:07.441445794 UTC, end_timestamp{partition=2}=2024-03-12 10:42:07.496178502 UTC, elapsed_compute{partition=2}=2.293µs, output_rows{partition=2}=1, start_timestamp{partition=7}=2024-03-12 10:42:07.441469544 UTC, end_timestamp{partition=7}=2024-03-12 10:42:07.496187877 UTC, elapsed_compute{partition=7}=209ns, output_rows{partition=7}=0, start_timestamp{partition=3}=2024-03-12 10:42:07.441518586 UTC, end_timestamp{partition=3}=2024-03-12 10:42:07.496165252 UTC, elapsed_compute{partition=3}=128ns, output_rows{partition=3}=0, start_timestamp{partition=4}=2024-03-12 10:42:07.441545877 UTC, end_timestamp{partition=4}=2024-03-12 10:42:07.496132627 UTC, elapsed_compute{partition=4}=540ns, output_rows{partition=4}=0, start_timestamp{partition=0}=2024-03-12 10:42:07.441566294 UTC, end_timestamp{partition=0}=2024-03-12 10:42:07.496196461 UTC, elapsed_compute{partition=0}=126ns, output_rows{partition=0}=0, start_timestamp{partition=5}=2024-03-12 10:42:07.441586502 UTC, end_timestamp{partition=5}=2024-03-12 10:42:07.496193336 UTC, elapsed_compute{partition=5}=251ns, output_rows{partition=5}=0, start_timestamp{partition=6}=2024-03-12 10:42:07.441589252 UTC, end_timestamp{partition=6}=2024-03-12 10:42:07.496174461 UTC, elapsed_compute{partition=6}=4.835µs, output_rows{partition=6}=1, start_timestamp{partition=1}=2024-03-12 10:42:07.441644752 UTC, end_timestamp{partition=1}=2024-03-12 10:42:07.496186669 UTC, elapsed_compute{partition=1}=333ns, output_rows{partition=1}=0]                                                                  |
|                        |     RepartitionExec: partitioning=Hash([station@0], 8), input_partitions=8, metrics=[fetch_time{partition=0, inputPartition=2}=54.694834ms, repart_time{partition=0, inputPartition=2}=20.625µs, send_time{partition=0, inputPartition=2}=12.291µs, fetch_time{partition=1, inputPartition=2}=54.557625ms, repart_time{partition=1, inputPartition=2}=15.25µs, send_time{partition=1, inputPartition=2}=1.542µs, fetch_time{partition=2, inputPartition=2}=52.288208ms, repart_time{partition=2, inputPartition=2}=3.041µs, send_time{partition=2, inputPartition=2}=NOT RECORDED, fetch_time{partition=3, inputPartition=2}=52.256125ms, repart_time{partition=3, inputPartition=2}=3.375µs, send_time{partition=3, inputPartition=2}=NOT RECORDED, fetch_time{partition=4, inputPartition=2}=52.216958ms, repart_time{partition=4, inputPartition=2}=14.291µs, send_time{partition=4, inputPartition=2}=NOT RECORDED, fetch_time{partition=5, inputPartition=2}=52.335667ms, repart_time{partition=5, inputPartition=2}=7.708µs, send_time{partition=5, inputPartition=2}=NOT RECORDED, fetch_time{partition=6, inputPartition=2}=52.241542ms, repart_time{partition=6, inputPartition=2}=7.083µs, send_time{partition=6, inputPartition=2}=NOT RECORDED, fetch_time{partition=7, inputPartition=2}=52.268625ms, repart_time{partition=7, inputPartition=2}=3µs, send_time{partition=7, inputPartition=2}=NOT RECORDED]                                                                                                                                                                                                                                                                                    |
|                        |       AggregateExec: mode=Partial, gby=[station@0 as station], aggr=[AVG(air.temperature)], metrics=[start_timestamp{partition=0}=2024-03-12 10:42:07.441433961 UTC, end_timestamp{partition=0}=2024-03-12 10:42:07.496125836 UTC, elapsed_compute{partition=0}=2.874918ms, output_rows{partition=0}=1, start_timestamp{partition=1}=2024-03-12 10:42:07.441461919 UTC, end_timestamp{partition=1}=2024-03-12 10:42:07.496036044 UTC, elapsed_compute{partition=1}=2.260458ms, output_rows{partition=1}=1, start_timestamp{partition=2}=2024-03-12 10:42:07.441470711 UTC, end_timestamp{partition=2}=2024-03-12 10:42:07.493764669 UTC, elapsed_compute{partition=2}=16.5µs, output_rows{partition=2}=0, start_timestamp{partition=3}=2024-03-12 10:42:07.441487794 UTC, end_timestamp{partition=3}=2024-03-12 10:42:07.493746836 UTC, elapsed_compute{partition=3}=9.667µs, output_rows{partition=3}=0, start_timestamp{partition=5}=2024-03-12 10:42:07.441491586 UTC, end_timestamp{partition=5}=2024-03-12 10:42:07.493837711 UTC, elapsed_compute{partition=5}=40.251µs, output_rows{partition=5}=0, start_timestamp{partition=6}=2024-03-12 10:42:07.441499169 UTC, start_timestamp{partition=4}=2024-03-12 10:42:07.441499252 UTC, end_timestamp{partition=4}=2024-03-12 10:42:07.493736586 UTC, end_timestamp{partition=6}=2024-03-12 10:42:07.493750669 UTC, elapsed_compute{partition=6}=9.167µs, output_rows{partition=6}=0, elapsed_compute{partition=4}=15.125µs, output_rows{partition=4}=0, start_timestamp{partition=7}=2024-03-12 10:42:07.441504586 UTC, end_timestamp{partition=7}=2024-03-12 10:42:07.493783294 UTC, elapsed_compute{partition=7}=8.041µs, output_rows{partition=7}=0]  |
|                        |         RepartitionExec: partitioning=RoundRobinBatch(8), input_partitions=1, metrics=[fetch_time{partition=0, inputPartition=0}=52.201667ms, repart_time{partition=0, inputPartition=0}=NOT RECORDED, send_time{partition=0, inputPartition=0}=7.584µs]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|                        |           ProjectionExec: expr=[station@1 as station, temperature@2 as temperature], metrics=[start_timestamp{partition=0}=2024-03-12 10:42:07.441478377 UTC, end_timestamp{partition=0}=2024-03-12 10:42:07.493667461 UTC, elapsed_compute{partition=0}=3.041µs, output_rows{partition=0}=56642]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|                        |             TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, filter=None, split_num=1, projection=[time,station,temperature], metrics=[start_timestamp{partition=0}=2024-03-12 10:42:07.441458252 UTC, end_timestamp{partition=0}=2024-03-12 10:42:07.493667252 UTC, elapsed_compute{partition=0}=51.542627ms, output_rows{partition=0}=56642]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Output Rows            | 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Duration               | 55.106375ms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

## `DESCRIBE`

描述数据库的参数以及表的 schema。

```sql
DESCRIBE {DATABASE db_name | TABLE tb_name};
```

<details>
  <summary>查看 <code>DESCRIBE</code> 示例</summary>

```sql
DESCRIBE DATABASE public;
```

```sql
DESCRIBE TABLE air;
```

</details>
