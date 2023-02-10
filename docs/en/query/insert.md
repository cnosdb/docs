---
title: Insert Data
order: 4
---

CnosDB supports two data inserting methods: one is to use the`INSERT INTO`statement, and the other is to use the HTTP API[write](../application/api.md)interface to insert Line Protocol format data.

This page only shows`INSERT`related syntax
## INSERT

Syntax：

```sql
INSERT [INTO] tb_name [ ( column_name [, ...] ) ] VALUES (  const [, ...] ) [, ...] | query; 
```

**Explanation**：

CnosDB requires that the inserted data column must have a timestamp, and the VALUES list must be a[constant](data_type.md/#constant)，
If a column is not selected, the value is`NULL`。

**Note**：

The time column cannot be`NULL`，and the Tag column and Field column can be `NULL`。

Example`INSERT INTO air (TIME, station, visibility) VALUES(1666132800000000000, NULL, NULL)`

If the VALUES list requires an expression, please use the[INSERT SELECT](#%E6%8F%92%E5%85%A5%E6%9F%A5%E8%AF%A2%E7%BB%93%E6%9E%9C-insert-select)syntax.


##  Insert one Record

Please note that data in the TIME column can be represented by either a time string or a numeric timestamp. 

**Example**：
```sql
CREATE TABLE air (
    visibility DOUBLE,
    temperature DOUBLE,
    pressure DOUBLE,
    TAGS(station)
);
```
    Query took 0.027 seconds.

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                (1666165200290401000, 'XiaoMaiDao', 56, 69, 77);
```

    +------+
    | rows |
    +------+
    | 1    |
    +------+
    Query took 0.044 seconds.

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 06:40:00', 'XiaoMaiDao', 55, 68, 76);
```
    +------+
    | rows |
    +------+
    | 1    |
    +------+
    Query took 0.032 seconds.

```sql
SELECT * FROM air;
```
    +----------------------------+------------+------------+-------------+-----------+
    | time                       | station    | visibility | temperature | pressure |
    +----------------------------+------------+------------+-------------+-----------+
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
    +----------------------------+------------+------------+-------------+-----------+

**Note：**：

The time represented by the string is considered as the local time zone and will be converted to the timestamp of UTC time zone.

The time of UTC time zone will be output when outputting.


## Insert Multiple Records

The keyword VALUES can be followed by multiple lists separated by’,’.

```sql
INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 05:40:00', 'XiaoMaiDao', 55, 68, 76), 
                ('2022-10-19 04:40:00', 'XiaoMaiDao', 55, 68, 76);
```
    +------+
    | rows |
    +------+
    | 2    |
    +------+
    Query took 0.037 seconds.

```sql
SELECT * FROM air;
```
    +----------------------------+------------+------------+-------------+-----------+
    | time                       | station    | visibility | temperature | pressure |
    +----------------------------+------------+------------+-------------+-----------+
    | 2022-10-18 20:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-18 21:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
    +----------------------------+------------+------------+-------------+-----------+

## Insert Query Results(INSERT SELECT)

You can also use INSERT SELECT to insert query data into the table.

**Example**：

```sql
CREATE TABLE air_visibility (
    visibility DOUBLE,
    TAGS(station)
);
```
    Query took 0.027 seconds.

```sql
INSERT air_visibility (TIME, station, visibility) 
    SELECT TIME, station, visibility FROM air;
```
    +------+
    | rows |
    +------+
    | 4    |
    +------+
    Query took 0.045 seconds.

```sql
SELECT * FROM air_visibility;
```
    +----------------------------+------------+------------+
    | time                       | station    | visibility |
    +----------------------------+------------+------------+
    | 2022-10-18 20:40:00        | XiaoMaiDao | 55         |
    | 2022-10-18 21:40:00        | XiaoMaiDao | 55         |
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         |
    +----------------------------+------------+------------+