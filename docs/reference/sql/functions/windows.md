---
sidebar_position: 6
description: 聚合函数是数据库中常用的函数，用于对数据进行聚合计算和汇总。它们接收一组值作为输入，并返回一个单一的聚合结果。聚合函数可以用于执行各种操作，例如计算总和、平均值、最大值、最小值等。。
---

# 窗口函数

窗口函数对与当前行以某种方式相关的一组表行执行计算。这与可以使用聚合函数完成的计算类型相当。但是，窗口函数不会像非窗口聚合调用那样导致行分组为单个输出行。相反，行保留其单独的标识。在幕后，窗口函数不仅能够访问查询结果的当前行

以下示例展示了如何将每个员工的工资与其部门的平均工资进行比较：

```sql
SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname) FROM empsalary;

+-----------+-------+--------+-------------------+
| depname   | empno | salary | avg               |
+-----------+-------+--------+-------------------+
| personnel | 2     | 3900   | 3700.0            |
| personnel | 5     | 3500   | 3700.0            |
| develop   | 8     | 6000   | 5020.0            |
| develop   | 10    | 5200   | 5020.0            |
| develop   | 11    | 5200   | 5020.0            |
| develop   | 9     | 4500   | 5020.0            |
| develop   | 7     | 4200   | 5020.0            |
| sales     | 1     | 5000   | 4866.666666666667 |
| sales     | 4     | 4800   | 4866.666666666667 |
| sales     | 3     | 4800   | 4866.666666666667 |
+-----------+-------+--------+-------------------+
```

窗口函数调用始终包含直接跟在窗口函数名称和参数后面的 OVER 子句。这就是它在语法上与普通函数或非窗口聚合的区别。OVER 子句准确确定如何分割查询的行以供窗口函数处理。OVER 中的 PARTITION BY 子句将行划分为组或分区，这些组或分区共享 PARTITION BY 表达式的相同值。对于每一行，都会跨与当前行属于同一分区的行计算窗口函数。前面的示例展示了如何计算每个分区的列的平均值。

您还可以使用 OVER 中的 ORDER BY 来控制窗口函数处理行的顺序。（窗口 ORDER BY 甚至不必匹配行的输出顺序。）下面是一个示例：

```sql
SELECT depname, empno, salary,
       rank() OVER (PARTITION BY depname ORDER BY salary DESC)
FROM empsalary;

+-----------+-------+--------+--------+
| depname   | empno | salary | rank   |
+-----------+-------+--------+--------+
| personnel | 2     | 3900   | 1      |
| develop   | 8     | 6000   | 1      |
| develop   | 10    | 5200   | 2      |
| develop   | 11    | 5200   | 2      |
| develop   | 9     | 4500   | 4      |
| develop   | 7     | 4200   | 5      |
| sales     | 1     | 5000   | 1      |
| sales     | 4     | 4800   | 2      |
| personnel | 5     | 3500   | 2      |
| sales     | 3     | 4800   | 2      |
+-----------+-------+--------+--------+
```

还有一个与窗口函数相关的重要概念：对于每一行，其分区内都有一组行，称为窗口框架。某些窗口函数仅作用于窗框的行，而不是整个分区。以下是在查询中使用窗口框架的示例：

```sql
SELECT depname, empno, salary,
    avg(salary) OVER(ORDER BY salary ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS avg,
    min(salary) OVER(ORDER BY empno ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_min
FROM empsalary
ORDER BY empno ASC;

+-----------+-------+--------+--------------------+---------+
| depname   | empno | salary | avg                | cum_min |
+-----------+-------+--------+--------------------+---------+
| sales     | 1     | 5000   | 5000.0             | 5000    |
| personnel | 2     | 3900   | 3866.6666666666665 | 3900    |
| sales     | 3     | 4800   | 4700.0             | 3900    |
| sales     | 4     | 4800   | 4866.666666666667  | 3900    |
| personnel | 5     | 3500   | 3700.0             | 3500    |
| develop   | 7     | 4200   | 4200.0             | 3500    |
| develop   | 8     | 6000   | 5600.0             | 3500    |
| develop   | 9     | 4500   | 4500.0             | 3500    |
| develop   | 10    | 5200   | 5133.333333333333  | 3500    |
| develop   | 11    | 5200   | 5466.666666666667  | 3500    |
+-----------+-------+--------+--------------------+---------+
```

当查询涉及多个窗口函数时，可以使用单独的 OVER 子句写出每个窗口函数，但如果多个函数需要相同的窗口行为，则这是重复的且容易出错。相反，每个窗口行为都可以在 WINDOW 子句中命名，然后在 OVER 中引用。例如：

```sql
SELECT sum(salary) OVER w, avg(salary) OVER w
FROM empsalary
WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);
```

## 语法

OVER 子句的语法是

```sql
function([expr])
  OVER(
    [PARTITION BY expr[, …]]
    [ORDER BY expr [ ASC | DESC ][, …]]
    [ frame_clause ]
    )
```

其中`frame_clause`是以下之一：

```sql
  { RANGE | ROWS | GROUPS } frame_start
  { RANGE | ROWS | GROUPS } BETWEEN frame_start AND frame_end
```

并且`frame_start` 和`frame_end`可以是其中之一

```sql
UNBOUNDED PRECEDING
offset PRECEDING
CURRENT ROW
offset FOLLOWING
UNBOUNDED FOLLOWING
```

其中`offset`是一个非负整数。

RANGE 和 GROUPS 模式需要 ORDER BY 子句（对于 RANGE，ORDER BY 必须恰好指定一列）。

## 聚合函数

## 排名函数

## 分析函数

