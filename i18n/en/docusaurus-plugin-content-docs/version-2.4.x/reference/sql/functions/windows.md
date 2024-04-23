---
sidebar_position: 7
---

# Window Functions

A window function performs a calculation across a set of table rows that are somehow related to the current row.This is comparable to the type of calculation that can be done with an aggregate function.However, window functions do not cause rows to become grouped into a single output row like non-window aggregate calls would.Instead, the rows retain their separate identities.Behind the scenes, the window function is able to access more than just the current row of the query result

The following example demonstrates how to compare each temperature value with the average temperature of the region:

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

A window function call always contains an `OVER` clause directly following the window function’s name and argument(s).This is what syntactically distinguishes it from a normal function or non-window aggregate.The OVER clause determines exactly how the rows of the query are split up for processing by the window function.The PARTITION BY clause within OVER divides the rows into groups, or partitions, that share the same values of the PARTITION BY expression(s).For each row, the window function is computed across the rows that fall into the same partition as the current row.The previous example showed how to count the average of a column per partition.

You can also control the order in which rows are processed by window functions using `ORDER BY` within `OVER`.(The window ORDER BY does not even have to match the order in which the rows are output.) Here is an example:

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

There is another important concept associated with window functions: for each row, there is a set of rows within its partition called its window frame.Some window functions act only on the rows of the window frame, rather than of the whole partition.Here is an example of using window frames in queries:

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

When a query involves multiple window functions, it is possible to write out each one with a separate `OVER` clause, but this is duplicative and error-prone if the same windowing behavior is wanted for several functions.Instead, each windowing behavior can be named in a `WINDOW` clause and then referenced in `OVER`.For example:

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

## Syntax

The syntax of the OVER clause is

```sql
function([expression])
  OVER(
    [PARTITION BY expression[, …]]
    [ORDER BY expression [ ASC | DESC ][, …]]
    [ frame_clause ]
    )
```

Where `frame_clause` is one of the following:

```sql
  { RANGE | ROWS | GROUPS } frame_start
  { RANGE | ROWS | GROUPS } BETWEEN frame_start AND frame_end
```

And `frame_start` and `frame_end` can be one of them

```sql
UNBOUNDED PRECEDING
offset PRECEDING
CURRENT ROW
offset FOLLOWING
UNBOUNDED FOLLOWING
```

Where `offset` is a non-negative integer.

RANGE and GROUPS modes require an ORDER BY clause (for RANGE, ORDER BY must specify exactly one column).

## Aggregate Functions

All [aggregate functions](./aggregate.md) can be used as window functions.

## Ranking Functions

### row_number

Number of the current row within its partition, counting from 1.

```sql
row_number()
```

### rank

Rank of the current row with gaps; same as row_number of its first peer.

```sql
rank()
```

### dense_rank

Rank of the current row without gaps; this function counts peer groups.

```sql
dense_rank()
```

### ntile

Integer ranging from 1 to the argument value, dividing the partition as equally as possible.

```sql
ntile(expression)
```

## Analytical functions

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

| Options           | Description                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expression` | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `window_duration` | 设置时间窗口的长度。请参考 [持续时间单位](../reference#持续时间单位)。                                                                                                        |
| `slide_duration`  | 设置窗口滑动的长度，不指定此参数时，将变为滚动窗口。请参考 [持续时间单位](../reference#持续时间单位)。                                                                                        |

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
  <summary>View example</summary>

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

#### Sample Data

<details>
  <summary>View example</summary>

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
  <summary>View example</summary>

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
  <summary>View example</summary>

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
