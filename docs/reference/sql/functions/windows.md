---
sidebar_position: 7
---

# 窗口函数

窗口函数对与当前行以某种方式相关的一组表行执行计算。这与可以使用聚合函数完成的计算类型相当。但是，窗口函数不会像非窗口聚合调用那样导致行分组为单个输出行。相反，行保留其单独的标识。在这些现象背后，窗口函数不仅能够访问查询结果的当前行。

以下示例展示了如何将每个温度值与所在地区平均温度进行比较：

```sql {1}
SELECT station,temperature, avg(temperature) OVER (partition by station) from air;
+-------------+-------------+----------------------+
| station     | temperature | AVG(air.temperature) |
+-------------+-------------+----------------------+
| XiaoMaiDao  | 80.0        | 64.93894989583701    |
| XiaoMaiDao  | 64.0        | 64.93894989583701    |
| XiaoMaiDao  | 79.0        | 64.93894989583701    |
| XiaoMaiDao  | 55.0        | 64.93894989583701    |
| ... ...     |
| LianYunGang | 67.0        | 65.12753786942551    |
| LianYunGang | 76.0        | 65.12753786942551    |
| LianYunGang | 50.0        | 65.12753786942551    |
| LianYunGang | 54.0        | 65.12753786942551    |
| ... ...     |
+------------+-------------+----------------------+
```

窗口函数调用始终包含直接跟在窗口函数名称和参数后面的 `OVER` 子句。这就是它在语法上与普通函数或非窗口聚合的区别。`OVER` 子句准确确定如何分割查询的行以供窗口函数处理。`OVER` 中的 `PARTITION BY` 子句将行划分为组或分区，这些组或分区共享 `PARTITION BY` 表达式的相同值。对于每一行，都会跨与当前行属于同一分区的行计算窗口函数。前面的示例展示了如何计算每个分区的列的平均值。

您还可以使用 `OVER` 中的 `ORDER BY` 来控制窗口函数处理行的顺序。（窗口 `ORDER BY` 甚至不必匹配行的输出顺序。）下面是一个示例：

```sql {1-3}
SELECT station, visibility, temperature,
       rank() OVER (PARTITION BY visibility ORDER BY temperature DESC)
FROM air limit 5;
+-------------+------------+-------------+--------+
| station     | visibility | temperature | RANK() |
+-------------+------------+-------------+--------+
| XiaoMaiDao  | 50.0       | 80.0        | 1      |
| XiaoMaiDao  | 50.0       | 80.0        | 1      |
| LianYunGang | 50.0       | 80.0        | 1      |
| LianYunGang | 50.0       | 80.0        | 1      |
| XiaoMaiDao  | 50.0       | 80.0        | 1      |
+-------------+------------+-------------+--------+
```

还有一个与窗口函数相关的重要概念：对于每一行，其分区内都有一组行，称为窗口框架。某些窗口函数仅作用于窗框的行，而不是整个分区。以下是在查询中使用窗口框架的示例：

```sql {1-5}
SELECT station, visibility, temperature,
    avg(temperature) OVER(ORDER BY temperature ASC ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS avg,
    min(temperature) OVER(ORDER BY visibility ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_min
FROM air
ORDER BY visibility ASC;
+-------------+------------+-------------+------+---------+
| station     | visibility | temperature | avg  | cum_min |
+-------------+------------+-------------+------+---------+
| LianYunGang | 50.0       | 53.0        | 53.0 | 53.0    |
| XiaoMaiDao  | 50.0       | 51.0        | 51.0 | 51.0    |
| XiaoMaiDao  | 50.0       | 51.0        | 51.0 | 51.0    |
| XiaoMaiDao  | 50.0       | 52.0        | 52.0 | 51.0    |
| ... ...    |
+-------------+------------+-------------+------+---------+
```

当查询涉及多个窗口函数时，可以使用单独的 `OVER` 子句写出每个窗口函数，但如果多个函数需要相同的窗口行为，则这是重复的且容易出错。相反，每个窗口行为都可以在 `WINDOW` 子句中命名，然后在 `OVER` 中引用。例如：

```sql {1-3}
SELECT sum(temperature) OVER w, avg(temperature) OVER w
FROM air
WINDOW w AS (PARTITION BY station ORDER BY temperature DESC);
+----------------------+----------------------+
| SUM(air.temperature) | AVG(air.temperature) |
+----------------------+----------------------+
| 77200.0              | 80.0                 |
| 77200.0              | 80.0                 |
| 77200.0              | 80.0                 |
| 77200.0              | 80.0                 |
| ... ...                 |
+----------------------+----------------------+
```

## 语法

OVER 子句的语法是

```sql
function([expression])
  OVER(
    [PARTITION BY expression[, …]]
    [ORDER BY expression [ ASC | DESC ][, …]]
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

所有[聚合函数](./aggregate.md)都可以用作窗口函数。

## 排名函数

### row_number
返回其分区内的当前行数，从1开始计数。

```sql
row_number()
```

### rank

返回当前行的排名，包含间隔;即对等组中第一行的 row_number 。

```sql
rank()
```

### dense_rank

返回当前行的排名，不包括间隔;这个功能有效地计数对等组。

```sql
dense_rank()
```

### ntile

返回一个从1到参数值的整数，并将分区划分为尽可能相等的值。

```sql
ntile(expression)
```


## 分析函数

### cume_dist

返回累积分布，也就是(当前行之前或对等的分区行数)/(总的分区行数)。取值范围为1/N 到 1。

```sql
cume_dist()
```

### percent_rank

返回当前行的相对排名，即(rank - 1) / (总的分区行数 - 1)。因此，该值的范围从0到1(包含在内)。

```sql
percent_rank()
```


### lag

返回分区中在当前行之前offset行的value;如果没有这样的行，则返回default(必须与value相兼容的类型)。 offset和default都是针对当前行求值的。 如果省略，offset默认为1，default为NULL。

```sql
lag(expression, offset, default)
```

### lead

返回分区中在当前行之后offset行的value； 如果没有这样的行，则返回default(必须与value兼容的类型)。 offset和default都是针对当前行求值的。 如果省略，offset默认为1，default为NULL。

```sql
lead(expression, offset, default)
```

### first_value

返回在窗口框架的第一行求得的value。

```sql
first_value(expression)
```

### last_value

返回在窗口框架的最后一行求得的value。

```sql
last_value(expression)
```

### nth_value

返回在窗口框架的第n行求得的value(从1开始计数);如果没有这样的行，则返回NULL。

```sql
nth_value(expression, n)
```

## 时间窗口

### time_window

用于在连续的数据流中对数据进行分析、聚合或处理。`time_window` 函数会定义一个固定大小的窗口，然后在数据流中滑动这个窗口，依次处理窗口中的数据。

```sql
time_window(time_expression, window_duration [, slide_duration])
```

| 选项              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `time_expression` | 要操作的时间表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |
| `window_duration` | 设置时间窗口的长度。请参考 [持续时间单位](../reference#持续时间单位)。 |
| `slide_duration`  | 设置窗口滑动的长度，不指定此参数时，将变为滚动窗口。请参考 [持续时间单位](../reference#持续时间单位)。 |

:::tip

窗口生成的规则为：

```sql
start, end
time, time_column + window_duration
time - slide_duration, time + window_duration - slide_duration
time - 2 * slide_duration, time + window_duration - 2 * slide_duration
...
time - n * slide_duration, time + window_duration - n * slide_duration
```

且满足 start <= time > end

:::

<details>
  <summary>查看示例</summary>

**创建示例数据集。**

```sql {1-3}
CREATE TABLE test(a BIGINT, TAGS(b));
INSERT INTO test(time, a, b) VALUES ('2023-04-23T00:00:00.000000Z', 1, 'b');
SELECT time FROM test;
+---------------------+
| time                |
+---------------------+
| 2023-04-23T00:00:00 |
+---------------------+
```

**示例1：**

```sql {1}
SELECT time_window(time, INTERVAL '5 day', INTERVAL '3 day') FROM test;
+------------------------------------------------------------------------------------------------------------------+
| TIME_WINDOW(test.time,IntervalMonthDayNano("92233720368547758080"),IntervalMonthDayNano("55340232221128654848")) |
+------------------------------------------------------------------------------------------------------------------+
| {start: 2023-04-23T00:00:00, end: 2023-04-28T00:00:00}                                                           |
| {start: 2023-04-20T00:00:00, end: 2023-04-25T00:00:00}                                                           |
+------------------------------------------------------------------------------------------------------------------+
```

**示例2：**

```sql {1}
SELECT time_window(time, INTERVAL '3 day') FROM test;
+---------------------------------------------------------------------+
| TIME_WINDOW(test.time,IntervalMonthDayNano("55340232221128654848")) |
+---------------------------------------------------------------------+
| {start: 2023-04-23T00:00:00, end: 2023-04-26T00:00:00}              |
+---------------------------------------------------------------------+
Query took 0.023 seconds.
```

</details>

### time_window_gapfill

与 `time_window` 类似，在滑动窗口的基础上填充对时间序列数据缺失值。

```sql
time_window_gapfill(<time column>, <window_duration>[, <sliding_duration>[, <start time>]]): <time window struct>
```

:::tip

`time_window_gapfill` 必须作为查询或子查询中的顶级表达式使用。例如，不能将 `time_window_gapfill` 嵌套在另一个函数中，如`sum( time_window_gapfill(...))`。

:::

`time_window_gapfill` 支持两种缺失值填充策略。

- `interpolate`
- `locf`

#### 示例数据集

<details>
  <summary>点击查看</summary>

```sql {1-3}
CREATE TABLE m2(f0 BIGINT, f1 DOUBLE, TAGS(t0, t1, t2));
INSERT m2(TIME, f0, f1, t0, t1) VALUES ('1999-12-31 00:00:00.000', 111, 444, 'tag11', 'tag21'), ('1999-12-31 00:00:00.005', 222, 333, 'tag12', 'tag22'), ('1999-12-31 00:00:00.010', 333, 222, 'tag13', 'tag23'), ('1999-12-31 00:00:00.015', 444, 111, 'tag14', 'tag24'), ('1999-12-31 00:00:00.020', 222, 555, 'tag11', 'tag21'), ('1999-12-31 00:00:00.025', 333, 444, 'tag12', 'tag22'), ('1999-12-31 00:00:00.030', 444, 333, 'tag13', 'tag23'), ('1999-12-31 00:00:00.035', 555, 222, 'tag14', 'tag24');
SELECT * FROM m2;
+-------------------------+-------+-------+----+-----+-------+
| time                    | t0    | t1    | t2 | f0  | f1    |
+-------------------------+-------+-------+----+-----+-------+
| 1999-12-31T00:00:00.015 | tag14 | tag24 |    | 444 | 111.0 |
| 1999-12-31T00:00:00.035 | tag14 | tag24 |    | 555 | 222.0 |
| 1999-12-31T00:00:00.005 | tag12 | tag22 |    | 222 | 333.0 |
| 1999-12-31T00:00:00.025 | tag12 | tag22 |    | 333 | 444.0 |
| 1999-12-31T00:00:00     | tag11 | tag21 |    | 111 | 444.0 |
| 1999-12-31T00:00:00.020 | tag11 | tag21 |    | 222 | 555.0 |
| 1999-12-31T00:00:00.010 | tag13 | tag23 |    | 333 | 222.0 |
| 1999-12-31T00:00:00.030 | tag13 | tag23 |    | 444 | 333.0 |
+-------------------------+-------+-------+----+-----+-------+
```

</details>

#### interpolate

线性插值的核心思想是假设已知数据点之间的关系是线性的，然后根据已知数据点之间的线性关系来估算未知数据点的值。具体地，线性插值通过使用已知数据点的纵坐标之间的线性变化率来推断未知数据点的纵坐标。

线性插值适用于连续变量的估算，例如在时间序列中填补缺失值或在空间数据中进行插值。然而，线性插值的准确性和适用性取决于数据的特性和实际情况。在某些情况下，数据可能具有非线性关系，或存在其他更适合的插值方法。因此，在应用线性插值之前，需要仔细考虑数据的性质和插值的目的，以确保插值结果合理和准确。

```sql
interpolate(<expression>)
```

<details>
  <summary>查看示例</summary>

以下示例使用此 [示例数据集](#示例数据集)

```sql {1-7}
SELECT
  t0,
  time_window_gapfill(time, interval '10 milliseconds') as minute,
  interpolate(avg(f1))
from m2
where time between timestamp '1999-12-31T00:00:00.000Z' and timestamp '1999-12-31T00:00:00.055Z'
group by t0, minute;
+-------+-------------------------+-----------------------+
| t0    | minute                  | AVG(gapfill_db.m2.f1) |
+-------+-------------------------+-----------------------+
| tag11 | 1999-12-31T00:00:00     | 444.0                 |
| tag11 | 1999-12-31T00:00:00.010 | 499.5                 |
| tag11 | 1999-12-31T00:00:00.020 | 555.0                 |
| tag11 | 1999-12-31T00:00:00.030 |                       |
| tag11 | 1999-12-31T00:00:00.040 |                       |
| tag11 | 1999-12-31T00:00:00.050 |                       |
| tag12 | 1999-12-31T00:00:00     | 333.0                 |
| tag12 | 1999-12-31T00:00:00.010 | 388.5                 |
| tag12 | 1999-12-31T00:00:00.020 | 444.0                 |
| tag12 | 1999-12-31T00:00:00.030 |                       |
| tag12 | 1999-12-31T00:00:00.040 |                       |
| tag12 | 1999-12-31T00:00:00.050 |                       |
| tag13 | 1999-12-31T00:00:00     |                       |
| tag13 | 1999-12-31T00:00:00.010 | 222.0                 |
| tag13 | 1999-12-31T00:00:00.020 | 277.5                 |
| tag13 | 1999-12-31T00:00:00.030 | 333.0                 |
| tag13 | 1999-12-31T00:00:00.040 |                       |
| tag13 | 1999-12-31T00:00:00.050 |                       |
| tag14 | 1999-12-31T00:00:00     |                       |
| tag14 | 1999-12-31T00:00:00.010 | 111.0                 |
| tag14 | 1999-12-31T00:00:00.020 | 166.5                 |
| tag14 | 1999-12-31T00:00:00.030 | 222.0                 |
| tag14 | 1999-12-31T00:00:00.040 |                       |
| tag14 | 1999-12-31T00:00:00.050 |                       |
+-------+-------------------------+-----------------------+
```

</details>

#### locf

该函数用于在时间窗口内进行缺失值填补（Gap filling），并使用 "Last Observation Carried Forward"（LOCF）操作来填充缺失值。

"Last Observation Carried Forward"（LOCF）是一种用于填充缺失值的方法，它使用最近的可观察值来进行填充。具体处理方式如下：

1. 找到缺失值之前的最近一个非缺失值。
2. 将该非缺失值的值复制到缺失值所在的位置。
3. 继续向后遍历，直到遇到下一个非缺失值。
4. 如果遇到下一个非缺失值，则重复步骤1和2，将该非缺失值的值复制到缺失值位置。
5. 如果在数据序列的末尾仍有缺失值，则最后一个非缺失值将一直被复制，直到填充完所有缺失值。

简而言之，LOCF 方法通过将最近的可观察值复制到缺失值位置来填充缺失值，使得数据在时间上保持连续性。这种方法假设缺失值之后的数据与最后观察到的值相同或非常接近。

需要注意的是，LOCF 方法可能会引入一定的偏差，特别是当缺失值之后的数据发生剧烈变化时。因此，在使用 LOCF 进行缺失值填充时，需要谨慎考虑数据的特点和分析的目的，以确保填补的值能够合理反映实际情况。

```sql
locf(<expression>)
```

<details>
  <summary>查看示例</summary>

以下示例使用此 [示例数据集](#示例数据集)

```sql {1-7}
SELECT
  t0,
  time_window_gapfill(time, interval '10 milliseconds') as minute,
  locf(avg(f1))
from m2
where time between timestamp '1999-12-31T00:00:00.000Z' and timestamp '1999-12-31T00:00:00.055Z'
group by t0, minute;
+-------+-------------------------+------------------+
| t0    | minute                  | locf(AVG(m2.f1)) |
+-------+-------------------------+------------------+
| tag11 | 1999-12-31T00:00:00     | 444.0            |
| tag11 | 1999-12-31T00:00:00.010 | 444.0            |
| tag11 | 1999-12-31T00:00:00.020 | 555.0            |
| tag11 | 1999-12-31T00:00:00.030 | 555.0            |
| tag11 | 1999-12-31T00:00:00.040 | 555.0            |
| tag11 | 1999-12-31T00:00:00.050 | 555.0            |
| tag12 | 1999-12-31T00:00:00     | 333.0            |
| tag12 | 1999-12-31T00:00:00.010 | 333.0            |
| tag12 | 1999-12-31T00:00:00.020 | 444.0            |
| tag12 | 1999-12-31T00:00:00.030 | 444.0            |
| tag12 | 1999-12-31T00:00:00.040 | 444.0            |
| tag12 | 1999-12-31T00:00:00.050 | 444.0            |
| tag13 | 1999-12-31T00:00:00     |                  |
| tag13 | 1999-12-31T00:00:00.010 | 222.0            |
| tag13 | 1999-12-31T00:00:00.020 | 222.0            |
| tag13 | 1999-12-31T00:00:00.030 | 333.0            |
| tag13 | 1999-12-31T00:00:00.040 | 333.0            |
| tag13 | 1999-12-31T00:00:00.050 | 333.0            |
| tag14 | 1999-12-31T00:00:00     |                  |
| tag14 | 1999-12-31T00:00:00.010 | 111.0            |
| tag14 | 1999-12-31T00:00:00.020 | 111.0            |
| tag14 | 1999-12-31T00:00:00.030 | 222.0            |
| tag14 | 1999-12-31T00:00:00.040 | 222.0            |
| tag14 | 1999-12-31T00:00:00.050 | 222.0            |
+-------+-------------------------+------------------+
```

</details>
