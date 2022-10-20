---
title: JOIN 子句
icon: config
order: 6
---

## **Join子句**

CnosDB支持`INNER JOIN`、`LEFT OUTER JOIN`、`RIGHT OUTER JOIN`、`FULL OUTER JOIN`和`CROSS JOIN`。



示例：

以下是基表x,y

```sql
select * from x;
+----------+----------+
| column_1 | column_2 |
+----------+----------+
| 1        | 2        |
+----------+----------+

select * from y;
+----------+----------+
| column_1 | column_2 |
+----------+----------+
| 1        | 2        |
+----------+----------+
```
#### INNER JOIN

关键字`JOIN`或`INNER JOIN`定义了一个只显示两个表中匹配的行的连接。

```sql
select * from x inner join x y ON x.column_1 = y.column_1;
+----------+----------+----------+----------+
| column_1 | column_2 | column_1 | column_2 |
+----------+----------+----------+----------+
| 1        | 2        | 1        | 2        |
+----------+----------+----------+----------+
```

#### LEFT JOIN

用关键字`LEFT JOIN`或`LEFT OUTER JOIN`定义一个右连接。该连接包括左表中的所有行，如果右表没有匹配行，则连接的右侧为空值。

```sql
select * from x left join x y ON x.column_1 = y.column_2;
+----------+----------+----------+----------+
| column_1 | column_2 | column_1 | column_2 |
+----------+----------+----------+----------+
| 1        | 2        |          |          |
+----------+----------+----------+----------+
```

#### RIGHT JOIN

用关键字`RIGHT JOIN`或`RIGHT OUTER JOIN`定义一个右连接。该连接包括右表中的所有行，如果左表没有匹配行，则连接的左侧为空值。

```sql
select * from x full outer join x y ON x.column_1 = y.column_2;
+----------+----------+----------+----------+
| column_1 | column_2 | column_1 | column_2 |
+----------+----------+----------+----------+
| 1        | 2        |          |          |
|          |          | 1        | 2        |
+----------+----------+----------+----------+
```

#### FULL JOIN

关键字`FULL JOIN`或`FULL OUTER JOIN`定义了一个全连接，实际上它是 LEFT OUTER JOIN 和 RIGHT OUTER JOIN 的联合。 它会显示连接左侧和右侧的所有行，并将在连接的任一侧不匹配的地方产生空值。

```sql
select * from x full outer join x y ON x.column_1 = y.column_2;
+----------+----------+----------+----------+
| column_1 | column_2 | column_1 | column_2 |
+----------+----------+----------+----------+
| 1        | 2        |          |          |
|          |          | 1        | 2        |
+----------+----------+----------+----------+
```

#### CROSS JOIN

交叉连接产生一个笛卡尔积，它将连接左侧的每一行与连接右侧的每一行相匹配。

```sql
select * from x cross join x y;
+----------+----------+----------+----------+
| column_1 | column_2 | column_1 | column_2 |
+----------+----------+----------+----------+
| 1        | 2        | 1        | 2        |
+----------+----------+----------+----------+
```
