---
title: 插入数据
icon: config
order: 4
---

## 写入数据

CnosDB支持两种数据写入的方法，一种是使用INSERT INTO 语句，另一种是使用Http write 接口，写入lineprotocol格式数据。

语法：
```sql
INSERT INTO table_item VALUES (TIME, ...) [, ...]
```
说明：
CnosDB 要求插入的数据必须要有时间戳，且Value列表必须为字面量。


## 插入一条记录

TIME 列的数据既可以是时间字符串，也可以是时间戳

```
INSERT INTO cpu (TIME, host, machine, power, temperature) VALUES
(1666165200290401000, 'localhost', 'macbook', 25.7, 67.2);
```

## 插入多条记录

```sql
INSERT INTO cpu (TIME, host, machine, power, temperature) VALUES
(1666165200290401000, '127.0.0.1', 'macbook', 25.7, 67.2),
('2022-10-20 08:35:44.525229', '255.255.255.255', 'linux', 30.1, 70.6);
```


```sql

```
