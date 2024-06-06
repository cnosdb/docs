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
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES(now(), 'XiaoMaiDao', 56, 69, 77);
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
