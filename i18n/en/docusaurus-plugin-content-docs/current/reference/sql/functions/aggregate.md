---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Aggregate Functions

Aggregate functions are commonly used functions in databases for aggregating calculations and summaries.They take a set of values as input and return a single aggregated result.Aggregate functions can be used to perform various operations, such as calculating totals, averages, maximums, minimums, etc.

## General

### avg

Returns the average of the values in the specified column.

```sql
avg(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>avg</code> Example</summary>

```sql {1}
SELECT station, avg(temperature) FROM air group by station;
+-------------+----------------------+
| station     | AVG(air.temperature) |
+-------------+----------------------+
| XiaoMaiDao  | 64.93894989583701    |
| LianYunGang | 65.12753786942551    |
+-------------+----------------------+
```

</details>

### count

Returns the number of rows in the specified column.

```sql
count(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>count</code> Example</summary>

```sql {1}
SELECT station, count(temperature) FROM air group by station;
+-------------+------------------------+
| station     | COUNT(air.temperature) |
+-------------+------------------------+
| LianYunGang | 28321                  |
| XiaoMaiDao  | 28321                  |
+-------------+------------------------+
```

</details>

### max

Returns the number of rows in the specified column.

```sql
max(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>max</code> Example</summary>

```sql {1}
SELECT station, max(temperature) FROM air group by station;

+-------------+----------------------+
| station     | MAX(air.temperature) |
+-------------+----------------------+
| LianYunGang | 80.0                 |
| XiaoMaiDao  | 80.0                 |
+-------------+----------------------+
```

</details>

### mean

Alias for [`avg`](#avg).

### median

返回指定列中的中值。

```sql
median(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>median</code> Example</summary>

```sql {1}
SELECT  median(temperature) FROM air;
+-------------------------+
| MEDIAN(air.temperature) |
+-------------------------+
| 65.0                    |
+-------------------------+
```

</details>

### min

Returns the minimum value in the specified column.

```sql
min(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>min</code> Example</summary>

```sql {1}
SELECT  min(temperature) FROM air;
+----------------------+
| MIN(air.temperature) |
+----------------------+
| 50.0                 |
+----------------------+
```

</details>

### sum

Returns the sum of all values in the specified column.

```sql
sum(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>sum</code> Example</summary>

```sql {1}
SELECT  sum(temperature) FROM air;
+----------------------+
| SUM(air.temperature) |
+----------------------+
| 3683613.0            |
+----------------------+
Query took 0.035 seconds.
```

</details>

### array_agg

Returns an array created from expression elements.If sorting requirements are given, insert elements in the order required for sorting.

```sql
array_agg(expression [ORDER BY expression])
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>array_agg</code> Example</summary>

Assume the content in the table is as follows:

```sql {1}
SELECT time,temperature FROM air ORDER BY time limit 10;
+---------------------+-------------+
| time                | temperature |
+---------------------+-------------+
| 2023-01-14T16:00:00 | 78.0        |
| 2023-01-14T16:00:00 | 80.0        |
| 2023-01-14T16:03:00 | 54.0        |
| 2023-01-14T16:03:00 | 64.0        |
| 2023-01-14T16:06:00 | 54.0        |
| 2023-01-14T16:06:00 | 79.0        |
| 2023-01-14T16:09:00 | 75.0        |
| 2023-01-14T16:09:00 | 55.0        |
| 2023-01-14T16:12:00 | 50.0        |
| 2023-01-14T16:12:00 | 74.0        |
+---------------------+-------------+
```

Run the following SQL:

```sql {1,2}
WITH  sample AS (SELECT time,temperature FROM air ORDER BY time limit 10)
SELECT array_agg(temperature) from sample;
```

The result will be:

```sql
+--------------------------------------------------------------+
| ARRAY_AGG(sample.temperature)                                |
+--------------------------------------------------------------+
| [78.0, 80.0, 54.0, 64.0, 54.0, 79.0, 75.0, 55.0, 50.0, 74.0] |
+--------------------------------------------------------------+
```

This result is an array containing the temperature values of all rows in the table.

`array_agg` can also be used in conjunction with the `ORDER BY` clause to determine the order of values in the array. If we want the resulting array of `temperature` to be sorted in ascending order, we can write it like this:

```sql {1,2}
WITH  sample AS (SELECT time,temperature FROM air ORDER BY time limit 10)
SELECT array_agg(temperature ORDER BY temperature ASC) from sample;
```

This will return

```sql
+--------------------------------------------------------------+
| ARRAY_AGG(sample.temperature)                                |
+--------------------------------------------------------------+
| [50.0, 54.0, 54.0, 55.0, 64.0, 74.0, 75.0, 78.0, 79.0, 80.0] |
+--------------------------------------------------------------+
```

</details>

### first_value

Return the first element in the aggregate group in the order of the request.If no order is specified, returns an arbitrary element from the group.

```sql
first_value(expression [ORDER BY expression])
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>first_value</code> Example</summary>

```sql {1}
SELECT station, first_value(temperature ORDER BY time) FROM air GROUP BY station;
+-------------+------------------------------+
| station     | FIRST_VALUE(air.temperature) |
+-------------+------------------------------+
| LianYunGang | 78.0                         |
| XiaoMaiDao  | 80.0                         |
+-------------+------------------------------+
```

</details>

### first

Return the first record sorted by time.

```sql
first(time_expression, expression)
```

| Parameters        | Description                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expression` | Must be for the `time` column.                                                                                                |
| `expression`      | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>first</code> Example</summary>

```sql {1}
SELECT first(time, temperature) FROM air;
+---------------------------------+
| first(air.time,air.temperature) |
+---------------------------------+
| 80.0                            |
+---------------------------------+
```

</details>

### last_value

Return the first element in the aggregate group in the order of the request.If no order is specified, returns an arbitrary element from the group.

```sql
last_value(expression [ORDER BY expression])
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>last_value</code> Example</summary>

```sql {1}
SELECT station, last_value(temperature ORDER BY time) FROM air GROUP BY station;
+-------------+-----------------------------+
| station     | LAST_VALUE(air.temperature) |
+-------------+-----------------------------+
| XiaoMaiDao  | 55.0                        |
| LianYunGang | 50.0                        |
+-------------+-----------------------------+
```

</details>

### last

Return the last record sorted by time.

```sql
last(expression_x, expression_y)
```

| Parameters        | Description                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expression` | Must be for the `time` column.                                                                                                |
| `expression`      | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>last</code> Example</summary>

```sql {1}

SELECT last(time, temperature) FROM air;
+--------------------------------+
| last(air.time,air.temperature) |
+--------------------------------+
| 50.0                           |
+--------------------------------+
```

</details>

### mode

Calculate the most frequently occurring value in a set of data.

```sql
mode(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>mode</code> Example</summary>

```sql {1}
SELECT mode(temperature) FROM air;
+-----------------------+
| mode(air.temperature) |
+-----------------------+
| 80.0                  |
+-----------------------+
```

</details>

### increase

Calculate the increment of the time series in the range vector, similar to the [increase](https://prometheus.io/docs/prometheus/latest/querying/functions/#increase) function in Prometheus.

```sql
increase(time_expression, expression ORDER BY time_expression)
```

| Parameters        | Description                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expression` | Must be for the `time` column.                                                                                                |
| `expression`      | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>mode</code> Example</summary>

```sql {1}
SELECT station, INCREASE(time, temperature ORDER BY time) FROM air GROUP BY station ORDER BY station;
+-------------+------------------------------------+
| station     | increase(air.time,air.temperature) |
+-------------+------------------------------------+
| LianYunGang | 964366.0                           |
| XiaoMaiDao  | 961627.0                           |
+-------------+------------------------------------+
```

</details>

## Statistics

### corr

Calculate the Pearson correlation coefficient between two columns, which is a method of measuring the degree of linear correlation between two variables.The value of Pearson correlation coefficient ranges between -1 and 1, where 1 indicates perfect positive correlation, -1 indicates perfect negative correlation, and 0 indicates no linear correlation.

```sql
corr(expression1, expression2)
```

| Parameters    | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression1` | The first expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators.  |
| `expression1` | The second expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>corr</code> Example</summary>

```sql {1}
SELECT corr(temperature, pressure) FROM air;
+-------------------------------------------+
| CORRELATION(air.temperature,air.pressure) |
+-------------------------------------------+
| 0.003247570100691381                      |
+-------------------------------------------+
```

</details>

### covar

Return a set of covariance of number pairs.

```sql
covar(expression1, expression2)
```

| Parameters    | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression1` | The first expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators.  |
| `expression1` | The second expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>covar</code> Example</summary>

```sql {1}
SELECT covar(temperature, pressure) FROM air;
+------------------------------------------+
| COVARIANCE(air.temperature,air.pressure) |
+------------------------------------------+
| 0.2589293257928204                       |
+------------------------------------------+
```

</details>

### covar_pop

Return the total covariance of a set of number pairs.

```sql
covar_pop(expression1, expression2)
```

| Parameters    | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression1` | The first expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators.  |
| `expression1` | The second expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>covar_pop</code> Example</summary>

```sql {1}
SELECT covar_pop(temperature, pressure) FROM air;
+----------------------------------------------+
| COVARIANCE_POP(air.temperature,air.pressure) |
+----------------------------------------------+
| 0.25892475446190355                          |
+----------------------------------------------+
```

</details>

### covar_samp

Return a set of sample covariance of number pairs.

```sql
covar_samp(expression1, expression2)
```

| Parameters    | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression1` | The first expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators.  |
| `expression1` | The second expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>covar_samp</code> Example</summary>

```sql {1}
SELECT covar_samp(temperature, pressure) FROM air;
+------------------------------------------+
| COVARIANCE(air.temperature,air.pressure) |
+------------------------------------------+
| 0.2589293257928204                       |
+------------------------------------------+
```

</details>

### stddev

Returns the standard deviation of a set of numbers.

```sql
stddev(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>stddev</code> Example</summary>

```sql {1}
SELECT stddev(temperature) FROM air;
+-------------------------+
| STDDEV(air.temperature) |
+-------------------------+
| 8.938534326752999       |
+-------------------------+
```

</details>

### stddev_pop

Returns the overall standard deviation of a set of numbers.

```sql
stddev_pop(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>stddev_pop</code> Example</summary>

```sql {1}
SELECT stddev_pop(temperature) FROM air;
+-----------------------------+
| STDDEV_POP(air.temperature) |
+-----------------------------+
| 8.938455422637864           |
+-----------------------------+
```

</details>

### stddev_samp

Returns the sample standard deviation of a set of numbers.

```sql
stddev_samp(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>stddev_samp</code> Example</summary>

```sql {1}
SELECT stddev_samp(temperature) FROM air;
+-------------------------+
| STDDEV(air.temperature) |
+-------------------------+
| 8.938534326752999       |
+-------------------------+
```

</details>

### var

Return a set of statistical variances for a set of numbers.

```sql
var(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>var</code> Example</summary>

```sql {1}
SELECT var(temperature) FROM air;
+---------------------------+
| VARIANCE(air.temperature) |
+---------------------------+
| 79.89739591054169         |
+---------------------------+
```

</details>

### var_pop

Return the total population variance of a set of numbers.

```sql
var_pop(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>var_pop</code> Example</summary>

```sql {1}
SELECT var_pop(temperature) FROM air;
+-------------------------------+
| VARIANCE_POP(air.temperature) |
+-------------------------------+
| 79.89598534248422             |
+-------------------------------+
```

</details>

### var_samp

Returns the statistical sample variance of a set of numbers.

```sql
var_samp(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>var_samp</code> Example</summary>

```sql {1}
SELECT var_samp(temperature) FROM air;
+---------------------------+
| VARIANCE(air.temperature) |
+---------------------------+
| 79.89739591054169         |
+---------------------------+
```

</details>

## Approx

### approx_distinct

Returns the approximate number of distinct input values calculated using the HyperLogLog algorithm.

```sql
approx_distinct(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>asap_smooth</code> Example</summary>

This SQL query uses the `approx_distinct` function to estimate the number of unique values in the `station` column of the `air` table.The function of `approx_distinct(station)` is to calculate approximately how many different `station` values exist in the `air` table.The query result shows that the `approx_unique_station` value is 2, which means that according to the estimate of the `approx_distinct` function, there are approximately 2 different meteorological stations in the `air` table (i.e. the number of unique values in the `station` column is approximately 2).

```sql {1}
SELECT approx_distinct(station) AS approx_unique_station FROM air;
+-----------------------+
| approx_unique_station |
+-----------------------+
| 2                     |
+-----------------------+
```

</details>

### approx_median

Returns the approximate median of the input values (the 50th percentile).It is an alias for `approx_percentile_cont(x, 0.5)`.

```sql
approx_median(expression)
```

| Parameters   | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>approx_median</code> Example</summary>

```sql {1}
SELECT approx_median(temperature) as approx_median_temperature FROM air;
+---------------------------+
| approx_median_temperature |
+---------------------------+
| 64.91965582214088         |
+---------------------------+
```

</details>

### approx_percentile_cont

Returns the weighted approximate percentile of the input values using the t-digest algorithm.

```sql
approx_percentile_cont(expression, percentile, centroids)
```

| Parameters   | Description                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.  |
| `percentile` | The percentile to be calculated.Must be a floating point value between 0 and 1 (inclusive). |
| `centroids`  | Optional, the centroid number used in the t-digest algorithm.Default value is 100.                             |

:::tip
If there are this number or fewer unique values, exact results can be expected.The more centroids there are, the more accurate the approximate value, but more memory is needed for calculation.
:::

<details>
  <summary>View <code>approx_percentile_cont</code> Example</summary>

```sql {1}
SELECT approx_percentile_cont(temperature, 0.1,100) FROM air;
+-----------------------------------------------------------------+
| APPROX_PERCENTILE_CONT(air.temperature,Float64(0.1),Int64(100)) |
+-----------------------------------------------------------------+
| 53.0                                                            |
+-----------------------------------------------------------------+
```

</details>

### approx_percentile_cont_with_weight

Returns the weighted approximate percentile of the input values using the t-digest algorithm.

```sql
approx_percentile_cont_with_weight(expression, weight, percentile)
```

| Parameters   | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.    |
| `weight`     | Expression used as a weight.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `percentile` | The percentile to be calculated.Must be a floating point value between 0 and 1 (inclusive).   |

:::tip
If there are this number or fewer unique values, exact results can be expected.The more centroids there are, the more accurate the approximate value, but more memory is needed for calculation.
:::

<details>
  <summary>View <code>approx_percentile_cont_with_weight</code> Example</summary>

```sql {1}
SELECT approx_percentile_cont_with_weight(temperature, 0.1,0.5) FROM air;
+-------------------------------------------------------------------------------+
| APPROX_PERCENTILE_CONT_WITH_WEIGHT(air.temperature,Float64(0.1),Float64(0.5)) |
+-------------------------------------------------------------------------------+
| 80.0                                                                          |
+-------------------------------------------------------------------------------+
```

</details>

### sample

Select n random records from the given column.

```sql
sample(expression, n)
```

| Parameters   | Description                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Must be a column in the table. |
| `n`          | Number of records to be returned.                                       |

<details>
  <summary>View <code>sample</code> Example</summary>

```sql {1}
SELECT sample(temperature, 5) FROM air;
+--------------------------------------+
| sample(air.temperature,Int64(5))     |
+--------------------------------------+
| [74.0, 76.0, 53.0, 56.0, 65.0, 58.0] |
+--------------------------------------+
```

</details>

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### asap_smooth

The `asap_smooth` function is used for smoothing time series data. The ASAP (As Smooth As Possible) smoothing algorithm aims to quickly smooth time series data while preserving key trends and patterns in the data, making the visualization of the data clearer without losing important information due to excessive smoothing.

```sql
asap_smooth(time, value, resolution ORDER BY time)
```

| Parameters   | Description                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `time`       | Timestamp of each data point.                                                                            |
| `value`      | The value of each timestamp.                                                                             |
| `resolution` | Approximate points to return.Determine the horizontal resolution of the resulting image. |

<details>
  <summary>View <code>asap_smooth</code> Example</summary>

```sql {1}
SELECT asap_smooth(time, pressure, 10) FROM air GROUP BY date_trunc('month', time);
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| asap_smooth(air.time,air.pressure,Int64(10))                                                                                                                                                                                                                                                                                                                                                                                                   |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {time: [2023-01-14T16:00:00, 2023-01-16T14:13:00, 2023-01-18T12:26:00, 2023-01-20T10:39:00, 2023-01-22T08:52:00, 2023-01-24T07:05:00, 2023-01-26T05:18:00, 2023-01-28T03:31:00, 2023-01-30T01:44:00, 2023-01-31T23:57:00], value: [64.79507211538461, 65.31009615384616, 65.25841346153847, 64.8485576923077, 65.09495192307692, 65.02524038461539, 64.8389423076923, 65.2421875, 65.02103365384616, 65.1141826923077], resolution: 10}        |
| {time: [2023-02-01T00:00:00, 2023-02-04T02:39:40, 2023-02-07T05:19:20, 2023-02-10T07:59:00, 2023-02-13T10:38:40, 2023-02-16T13:18:20, 2023-02-19T15:58:00, 2023-02-22T18:37:40, 2023-02-25T21:17:20, 2023-02-28T23:57:00], value: [65.20982142857143, 64.90625, 64.94828869047619, 64.97916666666667, 64.88504464285714, 64.8203125, 64.64434523809524, 64.88802083333333, 65.0, 64.76004464285714], resolution: 10}                           |
| {time: [2023-03-01T00:00:00, 2023-03-02T12:26:40, 2023-03-04T00:53:20, 2023-03-05T13:20:00, 2023-03-07T01:46:40, 2023-03-08T14:13:20, 2023-03-10T02:40:00, 2023-03-11T15:06:40, 2023-03-13T03:33:20, 2023-03-14T16:00:00], value: [65.29115853658537, 64.58307926829268, 64.7530487804878, 64.76753048780488, 65.14405487804878, 65.4298780487805, 65.1920731707317, 65.10365853658537, 64.86356707317073, 64.83841463414635], resolution: 10} |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

</TabItem>

</Tabs>
