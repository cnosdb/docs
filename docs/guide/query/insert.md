---
title: 插入数据
order: 4
---

CnosDB支持两种数据写入的方法，一种是使用`INSERT INTO`语句，另一种是使用HTTP API的[write](../application/api.md)接口，写入Line Protocol格式数据。

本页面只展示`INSERT`相关的语法
## INSERT

语法：

```sql
INSERT [INTO] tb_name [ ( column_name [, ...] ) ] VALUES (  const [, ...] ) [, ...] | query; 
```

**说明**：

CnosDB 要求插入的数据列必须要有时间戳，且VALUES列表必须为[常量](data_type.md/#常量)，
如果有列没有被选中，那么值为`NULL`。

**注意**：

时间列不能为`NULL`，Tag列和Field列可以为`NULL`。

例如`INSERT INTO air (TIME, station, visibility) VALUES(1666132800000000000, NULL, NULL)`

如果 VALUES 列表需要表达式，请使用[INSERT SELECT](#%E6%8F%92%E5%85%A5%E6%9F%A5%E8%AF%A2%E7%BB%93%E6%9E%9C-insert-select)语法


## 插入一条记录

TIME 列的数据既可以用时间字符串表示，也可以用数字类型的时间戳表示，请注意

**示例**：
```sql
CREATE TABLE air (
    visibility DOUBLE,
    temperature DOUBLE,
    presssure DOUBLE,
    TAGS(station)
);
```
    Query took 0.027 seconds.

```sql
INSERT INTO air (TIME, station, visibility, temperature, presssure) VALUES
                (1666165200290401000, 'XiaoMaiDao', 56, 69, 77);
```

    +------+
    | rows |
    +------+
    | 1    |
    +------+
    Query took 0.044 seconds.

```sql
INSERT INTO air (TIME, station, visibility, temperature, presssure) VALUES
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
    | time                       | station    | visibility | temperature | presssure |
    +----------------------------+------------+------------+-------------+-----------+
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
    +----------------------------+------------+------------+-------------+-----------+

**注意**：

字符串表示的时间被认为是本地时区，会转换成UTC时区的时间戳。

输出时输出UTC时区的时间


## 插入多条记录

`VALUES`关键字后面可以跟多个列表，用`,`分隔开

```sql
INSERT INTO air (TIME, station, visibility, temperature, presssure) VALUES
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
    | time                       | station    | visibility | temperature | presssure |
    +----------------------------+------------+------------+-------------+-----------+
    | 2022-10-18 20:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-18 21:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-18 22:40:00        | XiaoMaiDao | 55         | 68          | 76        |
    | 2022-10-19 07:40:00.290401 | XiaoMaiDao | 56         | 69          | 77        |
    +----------------------------+------------+------------+-------------+-----------+

## 插入查询结果(INSERT SELECT)

你还可以使用 `INSERT SELECT`语法，向表中插入查询的数据

**示例**：

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