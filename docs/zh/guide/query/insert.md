---
title: 插入数据
order: 4
---

CnosDB支持两种数据写入的方法，一种是使用`INSERT INTO`语句，另一种是使用HTTP API的[write](../application/api.md)接口，写入Line Protocol格式数据。

本页面只展示`INSERT`相关的语法
## INSERT

语法：

```sql
INSERT [INTO] tb_name [ ( column_name [, ...] ) ] VALUES (  const [, ...] ) [, ...] | query 
```

**说明**：
CnosDB 要求插入的数据列必须要有时间戳，且VALUES列表必须为[常量](data_type.md/#常量)。

时间列不能为`NULL`，Tag列和Field列可以为`NULL`

如果 VALUES 列表需要表达式，请使用[INSERT SELECT](#%E6%8F%92%E5%85%A5%E6%9F%A5%E8%AF%A2%E7%BB%93%E6%9E%9C-insert-select)语法


## 插入一条记录

TIME 列的数据既可以用时间字符串表示，也可以用数字类型的时间戳表示

**示例**：
```
INSERT INTO cpu (TIME, host, machine, power, temperature) VALUES
(1666165200290401000, 'localhost', 'macbook', 25.7, 67.2);

INSERT INTO cpu (TIME, host, machine, power, temperature) VALUES
('2022-10-20 08:35:44.525229', '255.255.255.255', 'linux', 30.1, 70.6);
```

## 插入多条记录

`VALUES`关键字后面可以跟多个列表，用`,`分隔开

```
INSERT INTO cpu (TIME, host, machine, power, temperature) VALUES
(1666165200290401000, '127.0.0.1', 'macbook', 25.7, 67.2),
('2022-10-20 08:35:44.525229', '255.255.255.255', 'linux', 30.1, 70.6);
```

## 插入查询结果(INSERT SELECT)

你还可以使用 `INSERT SELECT`语法，来插入查询的数据

**示例**：

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