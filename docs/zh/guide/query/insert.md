---
title: 插入数据
order: 4
---

CnosDB支持两种数据写入的方法，一种是使用`INSERT INTO`语句，另一种是使用HTTP API的[write](../application/api.md)接口，写入Line Protocol格式数据。

本页面只展示`INSERT`相关的语法
## INSERT

语法：

```sql
INSERT [INTO] tb_name VALUES (TIME, ...) [, ...]
```

说明：
CnosDB 要求插入的数据必须要有时间戳，且VALUES列表必须为[常量](data_type.md/#常量)。

如果VALUES列表需要表达式，请使用INSERT SELECT 语法


## 插入一条记录

TIME 列的数据既可以是时间字符串，也可以是BIGINT类型的时间戳

```
INSERT INTO cpu (TIME, host, machine, power, temperature) VALUES
(1666165200290401000, 'localhost', 'macbook', 25.7, 67.2);
```

## 插入多条记录

`VALUES`关键字后面可以跟多个列表，用`,`分隔开

```
INSERT INTO cpu (TIME, host, machine, power, temperature) VALUES
(1666165200290401000, '127.0.0.1', 'macbook', 25.7, 67.2),
('2022-10-20 08:35:44.525229', '255.255.255.255', 'linux', 30.1, 70.6);
```

## 插入查询结果(INSERT SELECT)

你还可以使用 `INSERT table SELECT`语法，来插入查询的数据

示例：

如下是两个表

```sql
CREATE TABLE cpu (
    power DOUBLE,
    temperature DOUBLE,
    TAGS(host, machine)
);

CREATE TABLE cpu_power (
    power DOUBLE,
    TAGS(host, machine)
);
```

您可以使用如下语法，把查询结果写入到一个表中

```sql
INSERT INTO cpu_power(TIME, host, machine, power)
SELECT TIME, host, machine, power
FROM cpu;
```