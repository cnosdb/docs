---
title: KILL QUERY
order: 16
---

## 语法
```sql
KILL [QUERY] query_id;
```
先通过 [`SHOW QUERIES`](./system_table.md#show-queries) 获取 query_id

## 示例

```sql
SHOW QUERIES;
```
    +----------+------+------------------------------------------------------------------+------------+----------+
    | query_id | user | query                                                            | state      | duration |
    +----------+------+------------------------------------------------------------------+------------+----------+
    | 4        | root | select * from air join sea on air.temperature = sea.temperature; | SCHEDULING | 2703     |
    | 5        | root | show queries;                                                    | SCHEDULING | 0        |
    +----------+------+------------------------------------------------------------------+------------+----------+

```sql
KILL 4;
```
Query took 0.016 seconds.


