---
sidebar_position: 8
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

Return cumulative distribution, that is, (the number of rows before or equal to the current row)/(total number of rows in the partition).The value range is from 1/N to 1.

```sql
cume_dist()
```

### percent_rank

Returns the relative ranking of the current row, i.e. (rank - 1) / (total number of partition rows - 1).Therefore, the value range is from 0 to 1 (inclusive).

```sql
percent_rank()
```

### lag

Return the value of the offset rows before the current row in the partition; if there is no such row, return default (must be compatible with the value type). Both offset and default are evaluated against the current row. If omitted, offset defaults to 1, default to NULL.

```sql
lag(expression, offset, default)
```

### lead

Return the value of the offset rows after the current row in the partition; if there is no such row, return default (must be compatible with the value type). Both offset and default are evaluated against the current row. If omitted, offset defaults to 1, default to NULL.

```sql
lead(expression, offset, default)
```

### first_value

Returns the value obtained in the first row of the window frame.

```sql
first_value(expression)
```

### last_value

Returns the value obtained in the last row of the window frame.

```sql
last_value(expression)
```

### nth_value

Returns the value obtained in the nth row in the window frame (counting from 1); if there is no such row, returns NULL.

```sql
nth_value(expression, n)
```

## Time Windows

### time_window

Used for analyzing, aggregating, or processing data in a continuous data stream.The `time_window` function defines a fixed-size window, then slides this window along the data stream, processing the data within the window sequentially.

```sql
time_window(time_expression, window_duration [, slide_duration])
```

| Options           | Description                                                                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `time_expression` | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators.                                                                      |
| `window_duration` | Set the length of the time window.Please refer to [Duration Units](../reference#duration-units).                                                                                         |
| `slide_duration`  | Set the length of the window slide. If this parameter is not specified, it will become a scrolling window.Please refer to [Duration Units](../reference#duration-units). |

:::tip

The rule generated by the window is:

```sql
start, end
time, time_column + window_duration
time - slide_duration, time + window_duration - slide_duration
time - 2 * slide_duration, time + window_duration - 2 * slide_duration
...
time - n * slide_duration, time + window_duration - n * slide_duration
```

And meet the condition start <= time > end

:::

<details>
  <summary>View example</summary>

**Create Sample Data.**

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

**Example 1:**

```sql {1}
SELECT time_window(time, INTERVAL '5 day', INTERVAL '3 day') FROM test;
+------------------------------------------------------------------------------------------------------------------+
| TIME_WINDOW(test.time,IntervalMonthDayNano("92233720368547758080"),IntervalMonthDayNano("55340232221128654848")) |
+------------------------------------------------------------------------------------------------------------------+
| {start: 2023-04-23T00:00:00, end: 2023-04-28T00:00:00}                                                           |
| {start: 2023-04-20T00:00:00, end: 2023-04-25T00:00:00}                                                           |
+------------------------------------------------------------------------------------------------------------------+
```

**Example 2:**

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

Similar to `time_window`, fill in missing values for time series data based on sliding windows.

```sql
time_window_gapfill(<time column>, <window_duration>[, <sliding_duration>[, <start time>]]): <time window struct>
```

:::tip

`time_window_gapfill` must be used as a top-level expression in a query or subquery.For example, `time_window_gapfill` cannot be nested within another function, such as `sum( time_window_gapfill(...))`.

:::

`time_window_gapfill` supports two types of missing value filling strategies.

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

The core idea of linear interpolation is to assume that the relationship between known data points is linear, and then estimate the value of unknown data points based on the linear relationship between known data points.Specifically, linear interpolation infers the ordinate of unknown data points by using the linear rate of change between the ordinate of known data points.

Linear interpolation is suitable for estimating continuous variables, such as filling missing values in time series or interpolating in spatial data.However, the accuracy and applicability of linear interpolation depend on the characteristics of the data and the actual situation.In some cases, the data may have a non-linear relationship, or there may be other interpolation methods that are more suitable.Therefore, before applying linear interpolation, it is necessary to carefully consider the nature of the data and the purpose of interpolation to ensure that the interpolation results are reasonable and accurate.

```sql
interpolate(<expression>)
```

<details>
  <summary>View example</summary>

The following example uses this [example data](#example-data)

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

This function is used to perform missing value imputation within a time window, and fills missing values using the "Last Observation Carried Forward" (LOCF) operation.

"Last Observation Carried Forward" (LOCF) is a method used to fill in missing values, which uses the most recent observable value for filling.The specific processing method is as follows:

1. Find the nearest non-missing value before the missing value.
2. Copy the value of the non-missing value to the location of the missing value.
3. Continue to traverse backwards until the next non-missing value is encountered.
4. If the next non-missing value is encountered, repeat steps 1 and 2, copying the value of this non-missing value to the missing value position.
5. If there are still missing values at the end of the data sequence, the last non-missing value will be continuously copied until all missing values are filled.

In short, the LOCF method fills in missing values by copying the most recent observable value to the missing value location, ensuring data continuity over time.This method assumes that the data after missing values are the same as or very close to the last observed value.

It should be noted that the LOCF method may introduce some bias, especially when the data after missing values changes dramatically.Therefore, when using LOCF to fill in missing values, it is necessary to carefully consider the characteristics of the data and the purpose of the analysis to ensure that the filled values can reasonably reflect the actual situation.

```sql
locf(<expression>)
```

<details>
  <summary>View example</summary>

The following example uses this [example data](#example-data)

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
