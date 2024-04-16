---
sidebar_position: 4
---

# 数据操纵语言

是用来操纵数据库中存储的数据。

## `INSERT`

:::tip

CnosDB 要求插入的数据列必须要有时间戳，且 `VALUES` 列表必须为[常量](reference.md#常量)。 如果有列没有被选中，那么值为`NULL`。

时间列不能为`NULL`，`TAG` 列和 `FIELD` 列可以为`NULL`。

例如`INSERT INTO air (TIME, station, visibility) VALUES(1666132800000000000, NULL, NULL)`

如果 `VALUES` 列表需要表达式，请使用 `INSERT SELECT` 语法。

:::

```sql
INSERT [INTO] tb_name [ ( column_name [, ...] ) ] VALUES (  const [, ...] ) [, ...] | select_statment;
```

<details>
  <summary>查看 <code>INSERT</code> 示例</summary>

**插入一条记录。**

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES(new(), 'XiaoMaiDao', 56, 69, 77);
```

**插入多条记录。**

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 05:40:00', 'XiaoMaiDao', 55, 68, 76), 
                ('2022-10-19 04:40:00', 'XiaoMaiDao', 55, 68, 76);
```

**根据查询结果插入记录。**

1. 创建一个新表。

```sql
CREATE TABLE air_visibility (
    visibility DOUBLE,
    TAGS(station)
);
```

2. 根据查询结果将记录插入 `air_visibility` 中。

```sql
INSERT air_visibility (TIME, station, visibility) SELECT TIME, station, visibility FROM air;
```

</details>

## `UPDATE`

:::tip

不能同时更新 `TAG` 列和 `FIELD` 列

CnosDB支持更新 `TAG` 列值为 NULL。

`value_expression` 只能为编译期能确定值的表达式，如：'常量'、'1 + 2'、'CAST('1999-12-31 00:00:00.000' as timestamp)' 等。

`where_clause` 中不能包含 field 列或 time 列，且不能为空，如果想更新表中所有数据，需要使用 'where true'，这代表你接受在表数据量比较大时带来的性能问题。

不支持修改成已经存在 series（所有的 `TAG` 列值构成 series）。

避免在写入数据时执行更新 `TAG` 操作，可能会引起 series 冲突。

:::

```sql
UPDATE table_name SET ( assignment_clause [, ...] ) where_clause

assignment clause :
    tag_name = value_expression
```

<details>
  <summary>查看 <code>UPDATE</code> 示例</summary>

**更新 `air` 表中的 `TAG` 列的数据，将符合条件 `station = 'LianYunGang'` 的记录修改成 `station = 'ShangHai'`。**

```sql
UPDATE air SET station = 'ShangHai' where station = 'LianYunGang';
```

**按时间和数值范围更新数据**

```sql
UPDATE air SET pressure = pressure + 100 where pressure = 68 and time < '2023-01-14T16:03:00';
```

</details>

## `DELETE`

:::tip

不能删除以 `FIELD` 类型列为条件的数据。

:::

```sql
DELETE FROM table_name where_clause
```

<details>
  <summary>查看 <code>DELETE</code> 示例</summary>

**以 `TAG` 类型列和时间作为条件**

```sql
DELETE FROM air WHERE station = 'LianYunGang' and time < '2023-01-14T16:03:00';
```

**以 `FILED` 类型列作为条件**

```sql
DELETE FROM air WHERE temperature > 0;
```

将返回以下结果：

```json
422 Unprocessable Entity, details: {"error_code":"010005","error_message":"This feature is not implemented: Filtering on the field column on the tskv table in delete statement"}
```

</details>
