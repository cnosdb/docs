---
sidebar_position: 10
---

# 数据查询语言备份

## `SELECT`

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
    FULL [ OUTER ] JOIN
    CROSS JOIN

-- grouping_element
    ()
```

### `SELECT *`

通配符 `*`  可以用于代指全部列。

```sql {1}
SELECT * FROM air limit 10;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-01-14T16:00:00 | LianYunGang | 68.0     | 78.0        | 52.0       |
| 2023-01-14T16:03:00 | LianYunGang | 69.0     | 54.0        | 72.0       |
| 2023-01-14T16:06:00 | LianYunGang | 65.0     | 54.0        | 78.0       |
| 2023-01-14T16:09:00 | LianYunGang | 51.0     | 75.0        | 64.0       |
| ... ...           													  |
+---------------------+-------------+----------+-------------+------------+
```

### `ALL/DISTINCT`

在 `SELECT` 后可以使用 `DISTINCT` 去掉重复字段，只返回去重后的值。 使用 `ALL` 会返回字段中所有重复的值。不指定此选项时，默认值为 `ALL`。

:::tip

CnosDB `Tag` 类型的列会自动去重，`DISTINCT` 的作用域只限于 `Field` 类型的列。

即 `SELECT station FROM air` 等价于 `SELECT DISTINCT station FROM air`。

:::

```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...];
```

**使用 `DISTINCT` 对 `air` 表中的 `temperature` 列进行去重查询。**

```sql {1}
SELECT DISTINCT station,temperature FROM air where temperature = 50;
+-------------+-------------+
| station     | temperature |
+-------------+-------------+
| XiaoMaiDao  | 50.0        |
| LianYunGang | 50.0        |
+-------------+-------------+
```

**默认查询方式。**

```sql {1}
SELECT station,temperature FROM air where temperature = 50;
+-------------+-------------+
| station     | temperature |
+-------------+-------------+
| LianYunGang | 50.0        |
| LianYunGang | 50.0        |
| LianYunGang | 50.0        |
| LianYunGang | 50.0        |
| ... ...			        |
+-------------+-------------+
```

### `AS`

为表达式或 [标识符](./reference.md#标识符) 设置别名。

```sql
expression [ [ AS ] column_alias ]
```

**为列设置别名。**

:::tip

`as` 可以省略。

:::

```sql {1}
SELECT station s, temperature AS t FROM air limit 10;
+-------------+------+
| s           | t    |
+-------------+------+
| LianYunGang | 78.0 |
| LianYunGang | 54.0 |
| LianYunGang | 54.0 |
| LianYunGang | 75.0 |
| ... ...			 |
+-------------+------+
```

### `LIMIT`

限制返回结果集的行数，`n` 必须为大于等于 0 的正整数。

```
LIMIT n
```

**返回结果集中第一条记录。**

```sql {1}
SELECT * FROM air LIMIT 1;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-01-14T16:00:00 | LianYunGang | 68.0     | 78.0        | 52.0       |
+---------------------+-------------+----------+-------------+------------+
```

**`LIMIT` 和 `OFFSET` 可以搭配使用，请查看 `OFFSET` 中的示例。**

### `OFFSET`

返回的结果集跳过 `m` 条记录，默认：`m = 0`。

```
OFFSET m
```

**返回结果集中第 10 条之后的所有记录。**

```sql
SELECT * FROM air OFFSET 10;
```

**`LIMIT` 和 `OFFSET` 可以搭配使用，例如：返回结果集中的第 4 - 5 行记录。**

```sql
SELECT * FROM air LIMIT 3 OFFSET 3;
```

### `WITH`

`WITH` 子句允许为查询指定名称并按名称引用它们。通常与 CTE 一起工作，关于 CTE 的更多信息请参考 [How CTEs Work](https://learnsql.com/blog/how-cte-works/)

```sql
WITH cte AS cte_query_definiton [, ...] query
```

**以下这两个查询示例是等价的。**

```sql
SELECT station, avg_temperature
FROM (  SELECT station, AVG(temperature) AS avg_temperature
        FROM air 
        GROUP BY station) AS x;
```

```sql
WITH x AS 
    (SELECT station, AVG(temperature) AS avg_temperature FROM air GROUP BY station)
SELECT station, avg_temperature
FROM x;
```

### `UNION`

`UNION` 子句用于合并多个 `SELECT` 语句的分析结果。

```sql
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `UNION`     | 会对合并的结果集去重。                                       |
| `UNION ALL` | 保留合并的结果集中相同的数据。                               |
| `EXCEPT`    | 计算两个结果集的差，从左表中返回右表中没有找到的所有非重复值。 |
| `INTERSECT` | 返回两个结果集的交集（即两个查询都返回的所有非重复值）。     |

**使用 `UNION ALL` 合并两个表，并保留结果集中相同的数据。**

```sql
SELECT visibility FROM air WHERE temperature < 60
UNION ALL
SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
```

**使用 `UNION` 合并两个表，并对结果集中相同的数据去重。**

```sql
SELECT visibility FROM air WHERE temperature < 60
UNION
SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
```

**使用 `EXCEPT` 计算两个结果集的差。**

```sql
SELECT visibility FROM air
EXCEPT
SELECT visibility FROM air WHERE temperature < 50 LIMIT 10;
```

**使用 `INTERSECT` 返回两个结果集的交集。**

```sql
SELECT visibility FROM air
INTERSECT
SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
```

### `ORDER BY`

按引用的表达式对结果进行排序。默认情况使用升序 (ASC)。通过在 ORDER BY 的表达式后添加 DESC 按降序排序。

```sql
ORDER BY expression [ ASC | DESC ][, …]
```

**使用 `temperature` 字段按升序进行排序。**

```sql
SELECT * FROM air ORDER BY temperature;
```

**使用 `station` 和 `temperature` 按倒序进行排序。**

```sql
SELECT * FROM air ORDER BY station, temperature DESC;
```



## `SHOW`

## `EXPLAIN`

## `DESCRIBE`

