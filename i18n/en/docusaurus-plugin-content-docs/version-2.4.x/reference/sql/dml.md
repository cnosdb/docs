---
sidebar_position: 4
---

# Data Manipulation Language

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

## `UPDATE`

:::tip

Cannot update `TAG` column and `FIELD` column simultaneously.

CnosDB supports updating `TAG` column values to NULL.

`value_expression` can only be an expression with a value that can be determined at compile time, such as: 'constant', '1 + 2', 'CAST('1999-12-31 00:00:00.000' as timestamp)' etc.

`where_clause` cannot contain field column or time column, must not be empty, if you want to update all data in the table, use 'where true', which means you accept the performance issues when the table data is large.

Cannot modify to an existing series (all `TAG` column values form a series).

Avoid performing `TAG` operations when writing data, as it may cause series conflicts.

:::

```sql
UPDATE table_name SET ( assignment_clause [, ...] ) where_clause

assignment clause :
    tag_name = value_expression
```

<details>
  <summary>View the <code>UPDATE</code> example</summary>

**Update the data in the `TAG` column of the `air` table, changing records that meet the condition `station = 'LianYunGang'` to `station = 'ShangHai'`.**

```sql
UPDATE air SET station = 'ShangHai' where station = 'LianYunGang';
```

**Update Data by Time and Numerical Range**

```sql
UPDATE air SET pressure = pressure + 100 where pressure = 68 and time < '2023-01-14T16:03:00';
```

</details>

## `DELETE`

:::tip

Cannot delete data with `FIELD` type columns as conditions.

:::

```sql
DELETE FROM table_name where_clause
```

<details>
  <summary>View the <code>DELETE</code> example</summary>

**Using `TAG` type columns and time as conditions**

```sql
DELETE FROM air WHERE station = 'LianYunGang' and time < '2023-01-14T16:03:00';
```

**Using `FIELD` type columns as conditions**

```sql
DELETE FROM air WHERE temperature > 0;
```

The following results will be returned:

```json
422 Unprocessable Entity, details: {"error_code":"010005","error_message":"This feature is not implemented: Filtering on the field column on the tskv table in delete statement"}
```

</details>
