---
sidebar_position: 5
---

# DQL

Used to retrieve data from the database.

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

The `WITH` clause allows you to provide names for queries and reference them by name.

The `WITH` clause is used to create a temporary named result set, also known as a Common Table Expression ([CTE](https://learnsql.com/blog/what-is-common-table-expression/)).

By using the `WITH` keyword, you can define a temporary result set in an SQL query and assign it a name.This temporary result set can be referenced in other parts of the query, making the query clearer, more readable, and avoiding repetitive subqueries.

```sql
WITH x AS (SELECT a, MAX(b) AS b FROM t GROUP BY a)
SELECT a, b FROM x;
```

<details>
  <summary>View the <code>WITH</code> example</summary>

```sql
WITH x AS (SELECT station, avg(temperature) AS avg_temperature FROM air GROUP BY station)
SELECT station, avg_temperature FROM x;
```

</details>

## `SELECT`

The `SELECT` clause is used to retrieve data from a database.

In SQL queries, the `SELECT` statement is used to specify the columns to be returned and the `table` from which to retrieve data.By using the `SELECT` keyword, you can select specific columns or all columns and retrieve data from them.

You can add `DISTINCT` to return all distinct rows, default is `ALL`.

<details>
  <summary>View examples of <code>DISTINCT</code> and <code>ALL</code></summary>

**`DISTINCT` and `ALL` have no effect on columns of type `TAG`.**

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

Whether `DISTINCT` is used or not, columns of type `TAG` will actively deduplicate.

**`DISTINCT` and `ALL` have no effect on columns of type `FIELD`.**

There are multiple records with the same value in the 'temperature' column below.

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

If you use `DISTINCT` to deduplicate the records in the `temperature` column, only one record will be returned.

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

The `FROM` clause is used to specify the `table` or `table` expression from which to retrieve data.Select the `table` from which to choose data.By specifying the name of the `table` in the `FROM` clause, you can tell the database system where to retrieve data from.

Specify the `table` name.\*\*

<details>
  <summary>View example</summary>

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

**Build a temporary table using `VALUE`.**

<details>
  <summary>View example</summary>

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

The `WHERE` clause is used to filter rows that meet the specified conditions.

When using the `SELECT` statement to retrieve data from the database, you can specify conditions with the `WHERE` clause to only return rows that meet the conditions.This allows for filtering data, selecting only data rows that meet specific conditions.

The `WHERE` clause is typically used with [comparison operators](reference.md#comparison-operators) and [logical operators](reference.md#logical-operators) to construct complex filtering criteria.

<details>
  <summary>View example</summary>

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

The `JOIN` clause can join data from multiple tables.Support the following join:

`INNER JOIN`, `LEFT OUTER JOIN`， `RIGHT OUTER JOIN`， `FULL OUTER JOIN`

<details>
  <summary>View<code>INNER JOIN</code>Example</summary>

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
  <summary>View<code>LEFT JOIN</code>Example</summary>

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
  <summary>View<code>RIGHT JOIN</code>Example</summary>

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
  <summary>View<code>FULL JOIN</code>Example</summary>

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

Used to group query results by specified columns.By using the `GROUP BY` clause, you can group the query results and typically use it with aggregate functions (such as `count`, `sum`, `avg`, etc.) to perform aggregation operations on each group.

When using the `GROUP BY` clause, the query results will be grouped based on the specified column values, and each group will have the same value.This allows you to apply aggregate functions on each group to obtain summary information for each group.

<details>
  <summary>View example</summary>

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

The `HAVING` clause is usually used together with the `GROUP BY` clause to filter groups based on the results of aggregate functions.

When using the `GROUP BY` clause to group the query results, the `HAVING` clause allows further filtering of data on the grouped result set.It is similar to the `WHERE` clause, but the `WHERE` clause is used to filter rows, while the `HAVING` clause is used to filter groups.

<details>
  <summary>View example</summary>

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

`ROLLUP` is an operator used to generate multidimensional aggregate data that includes super-aggregate rows.

In SQL, `ROLLUP` is used to perform multi-level aggregation on columns in the `GROUP BY` clause.It will generate results containing the total rows of each level.`ROLLUP` starts from the rightmost column and gradually adds columns to the left for summarization until a total row containing all rows is generated.

<details>
  <summary>View <code>CUBE</code> Example</summary>

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

`CUBE` is an operator used to generate multidimensional aggregated data for all possible combinations.

In SQL, `CUBE` is used to perform multi-dimensional aggregation on columns in the `GROUP BY` clause, generating all possible combinations.It will generate results containing total rows for each column, from a single column to combinations of all columns.

Using `CUBE` can generate more summary data than `ROLLUP`, as it considers all possible combinations, not just adding columns from right to left for summary.

<details>
  <summary>View <code>CUBE</code> Example</summary>

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

The `UNION` clause is used to combine the result sets of two or more `SELECT` statements and remove duplicate rows.

By using the `UNION` keyword, you can combine the result sets of multiple `SELECT` queries into one result set.It should be noted that when using `UNION`, each `SELECT` query is required to return the same number and type of columns in order to merge the result sets correctly.

In addition to `UNION`, there is also `UNION ALL`, which is used to combine result sets without removing duplicate rows.`UNION ALL` is faster than `UNION` because it does not perform deduplication operations.

<details>
  <summary>View <code>UNION ALL</code> Example</summary>

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
  <summary>View <code>UNION</code> Example</summary>

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

The ORDER BY clause is used to sort the query results by the specified column.

By using the `ORDER BY` clause, you can sort the query results by the value of one or more columns, and specify the ascending (`ASC`) or descending (`DESC`) order of arrangement.By default, the `ORDER BY` clause sorts in ascending order.

<details>
  <summary>View example</summary>

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

`LIMIT` clause, used to restrict the number of rows returned in the query result.

In SQL queries, the `LIMIT` clause is used to specify the number of rows to return, thus controlling the size of the query result set.By using `LIMIT`, you can limit the number of rows returned to only retrieve the data rows you need.

<details>
  <summary>View example</summary>

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

The `OFFSET` clause is usually used in conjunction with `LIMIT` to specify how many rows to skip before returning data from the query result

In SQL queries, `OFFSET` is used to specify the number of rows to skip, while `LIMIT` is used to specify the number of rows to return.By combining `OFFSET` and `LIMIT`, pagination functionality can be achieved to retrieve data within a specified range from query results.

<details>
  <summary>View example</summary>

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

`SHOW` is not a standard SQL command, but a command provided by CnosDB for displaying database objects or metadata information.

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

| Options   | Description                                   |
| --------- | --------------------------------------------- |
| `ANALYZE` | Execute query.                |
| `VERBOSE` | Display detailed information. |

**Detailed execution plan and metrics for the return statement.**

```sql
EXPLAIN SELECT station,avg(temperature) FROM air GROUP BY station;
```

<details>
  <summary>View <code>EXPLAIN</code> Back to Results</summary>

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

**Detailed execution plan and metrics for the return statement.**

```sql
EXPLAIN ANALYZE SELECT station,avg(temperature) FROM air GROUP BY station;
```

<details>
  <summary>View the <code>EXPLAIN ANALYZE</code> query results</summary>

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

**Detailed execution plan and metrics for the return statement.**

```sql
EXPLAIN ANALYZE VERBOSE SELECT station,avg(temperature) FROM air GROUP BY station;
```

<details>
  <summary>View the <code>EXPLAIN ANALYZE VERBOSE</code> query results</summary>

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

Describe the parameters of the database and the schema of the table.

```sql
DESCRIBE {DATABASE db_name | TABLE tb_name};
```

<details>
  <summary>View the <code>DESCRIBE</code> example</summary>

```sql
DESCRIBE DATABASE public;
```

```sql
DESCRIBE TABLE air;
```

</details>
