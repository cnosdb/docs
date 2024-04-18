---
sidebar_position: 4
---

# DML

Is used to manipulate data stored in a database.

## `INSERT`

:::tip

CnosDB requires the inserted data columns to have a timestamp and the `VALUES` list must be [constant](reference.md#constants). If a column is not selected, the value is `NULL`.

The time column cannot be `NULL`, `TAG` column and `FIELD` column can be `NULL`.

For example, `INSERT INTO air (TIME, station, visibility) VALUES(1666132800000000000, NULL, NULL)`

If the `VALUES` list needs an expression, use the `INSERT SELECT` syntax.

:::

```sql
INSERT [INTO] tb_name [ ( column_name [, ...] ) ] VALUES (  const [, ...] ) [, ...] | select_statment;
```

<details>
  <summary>View the <code>INSERT</code> example</summary>

**Insert a record.**

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES(new(), 'XiaoMaiDao', 56, 69, 77);
```

**Insert multiple records.**

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 05:40:00', 'XiaoMaiDao', 55, 68, 76), 
                ('2022-10-19 04:40:00', 'XiaoMaiDao', 55, 68, 76);
```

**Insert records based on query results.**

1. Create a new table.

```sql
CREATE TABLE air_visibility (
    visibility DOUBLE,
    TAGS(station)
);
```

2. Insert records into `air_visibility` based on query results.

```sql
INSERT air_visibility (TIME, station, visibility) SELECT TIME, station, visibility FROM air;
```

</details>
