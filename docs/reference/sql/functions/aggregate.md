---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 聚合函数

聚合函数是数据库中常用的函数，用于对数据进行聚合计算和汇总。它们接收一组值作为输入，并返回一个单一的聚合结果。聚合函数可以用于执行各种操作，例如计算总和、平均值、最大值、最小值等。

## 通用
### avg

返回指定列中数值的平均值。

```sql
avg(expression)
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>avg</code> 示例</summary>


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

返回指定列中的行数。

```sql
count(expression)
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>count</code> 示例</summary>


```sql {1}
SELECT station, count(temperature) FROM air group by station;
+-------------+------------------------+
| station     | COUNT(air.temperature) |
+-------------+------------------------+
| LianYunGang | 28321                  |
| XiaoMaiDao  | 28321                  |
+-------------+------------------------+

CREATE TABLE air1(visibility DOUBLE, temperature DOUBLE, pressure DOUBLE, TAGS(station));

// 写入有重复时间戳的数据
INSERT INTO air1 (TIME, station, visibility, temperature, pressure) VALUES
                ('2022-10-19 01:40:00', 'XiaoMaiDao', 55, 68, 71), 
                ('2022-10-19 01:40:00', 'XiaoMaiDao', 55, 68, 72),
                ('2022-10-19 02:40:00', 'XiaoMaiDao', 55, 68, 73),
                ('2022-10-19 03:40:00', 'XiaoMaiDao', 55, 68, 75),
                ('2022-10-19 04:40:00', 'XiaoMaiDao', 55, 68, 77),
                ('2022-10-19 05:40:00', 'XiaoMaiDao', 55, 68, 80);

SELECT count(*) FROM air1; // 会将count(*)下推到tskv层，通过读取底层文件统计信息获取行数，避免了实际数据读取，提升效率。但是可能会有重复时间戳数据导致比实际行数多
+------------------------+
| COUNT(COUNT(UInt8(1))) |
+------------------------+
| 6                      |
+------------------------+

SELECT exact_count_star(null) FROM air1; // 精确count，不会下推count(*)
+------------------------+
| COUNT(COUNT(UInt8(0))) |
+------------------------+
| 5                      |
+------------------------+

```

</details>

### max

返回指定列中的行数。

```sql
max(expression)
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>max</code> 示例</summary>


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

[`avg`](#avg) 的别名。 

### median

返回指定列中的中值。

```sql
median(expression)
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>median</code> 示例</summary>


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

返回指定列中的最小值。

```sql
min(expression)
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>min</code> 示例</summary>


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

返回指定列中所有值的总和。

```sql
sum(expression)
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>sum</code> 示例</summary>

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

返回从表达式元素创建的数组。如果给出了排序要求，则按所需排序的顺序插入元素。

```sql
array_agg(expression [ORDER BY expression])
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>array_agg</code> 示例</summary>

假设表中的内容如下：

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

运行如下 SQL：

```sql {1,2}
WITH  sample AS (SELECT time,temperature FROM air ORDER BY time limit 10)
SELECT array_agg(temperature) from sample;
```

结果将是：

```sql
+--------------------------------------------------------------+
| ARRAY_AGG(sample.temperature)                                |
+--------------------------------------------------------------+
| [78.0, 80.0, 54.0, 64.0, 54.0, 79.0, 75.0, 55.0, 50.0, 74.0] |
+--------------------------------------------------------------+
```

这个结果是一个数组，包含了表中所有行的温度值。

`array_agg` 还可以与 `ORDER BY` 子句结合使用，以确定数组中值的顺序，如果我们想让得到 `temperature` 按升序排列的数组，可以这样写：

```sql {1,2}
WITH  sample AS (SELECT time,temperature FROM air ORDER BY time limit 10)
SELECT array_agg(temperature ORDER BY temperature ASC) from sample;
```

这将返回

```sql
+--------------------------------------------------------------+
| ARRAY_AGG(sample.temperature)                                |
+--------------------------------------------------------------+
| [50.0, 54.0, 54.0, 55.0, 64.0, 74.0, 75.0, 78.0, 79.0, 80.0] |
+--------------------------------------------------------------+
```

</details>

### first_value

根据请求的顺序返回聚合组中的第一个元素。如果未给出排序，则从组中返回任意元素。

```sql
first_value(expression [ORDER BY expression])
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>first_value</code> 示例</summary>

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

返回按时间排序的第一条记录。

```sql
first(time_expression, expression)
```

| 参数              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `time_expression` | 必需为 `time` 列。                                           |
| `expression`      | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>first</code> 示例</summary>


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

根据请求的顺序返回聚合组中的第一个元素。如果未给出排序，则从组中返回任意元素。

```sql
last_value(expression [ORDER BY expression])
```

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>last_value</code> 示例</summary>

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

返回按时间排序的最后一条记录。

```sql
last(expression_x, expression_y)
```

| 参数              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `time_expression` | 必需为 `time` 列。                                           |
| `expression`      | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>last</code> 示例</summary>

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

计算一组数据中出现频率最高的值。

```sql
mode(expression)
```

| 参数           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| `expression` | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>mode</code> 示例</summary>

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

计算范围向量中时间序列的增量，类似 Prometheus 中的 [increase](https://prometheus.io/docs/prometheus/latest/querying/functions/#increase) 函数。

```sql
increase(time_expression, expression ORDER BY time_expression)
```
| 参数              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `time_expression` | 必需为 `time` 列。                                           |
| `expression`      | 要对其进行操作的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>mode</code> 示例</summary>

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



## 统计

### corr

计算两个列之间的皮尔逊相关系数，这是衡量两个变量线性相关程度的一种方法。皮尔逊相关系数的值介于 -1 和 1 之间，其中 1 表示完全正相关，-1 表示完全负相关，0 表示没有线性相关。

```sql
corr(expression1, expression2)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression1` | 要操作的第一个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |
| `expression1` | 要操作的第二个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>corr</code> 示例</summary>

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

返回一组数字对的协方差。

```sql
covar(expression1, expression2)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression1` | 要操作的第一个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |
| `expression1` | 要操作的第二个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>covar</code> 示例</summary>

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

返回一组数字对的总体协方差。

```sql
covar_pop(expression1, expression2)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression1` | 要操作的第一个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |
| `expression1` | 要操作的第二个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>covar_pop</code> 示例</summary>

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

返回一组数对的样本协方差。

```sql
covar_samp(expression1, expression2)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression1` | 要操作的第一个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |
| `expression1` | 要操作的第二个表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |

<details>
  <summary>查看 <code>covar_samp</code> 示例</summary>

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

返回一组数字的标准差。

```sql
stddev(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>stddev</code> 示例</summary>


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

返回一组数字的总体标准差。

```sql
stddev_pop(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>stddev_pop</code> 示例</summary>


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

返回一组数字的样本标准差。

```sql
stddev_samp(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>stddev_samp</code> 示例</summary>


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

返回一组数字的统计方差。

```sql
var(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>var</code> 示例</summary>


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

返回一组数字的统计总体方差。

```sql
var_pop(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>var_pop</code> 示例</summary>


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

返回一组数字的统计样本方差。

```sql
var_samp(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>var_samp</code> 示例</summary>


```sql {1}
SELECT var_samp(temperature) FROM air;
+---------------------------+
| VARIANCE(air.temperature) |
+---------------------------+
| 79.89739591054169         |
+---------------------------+
```

</details>

## 近似

### approx_distinct

返回使用 HyperLogLog 算法计算的不同输入值的近似数量。

```sql
approx_distinct(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>approx_distinct</code> 示例</summary>

这条 SQL 查询语句使用了` approx_distinct` 函数来估计` air` 表中 `station` 列的唯一值数量。`approx_distinct(station)` 的作用是计算大致有多少个不同的 `station` 值存在于 `air` 表中。查询结果显示的 `approx_unique_station` 值为 2，这意味着根据 `approx_distinct` 函数的估计，`air` 表中大约有 2 个不同的气象站（即 `station` 列的唯一值数量大约为 2）。

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

返回输入值的近似中位数（第 50 个百分位）。它是 `approx_percentile_cont(x, 0.5)` 的别名。

```sql
approx_median(expression)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |

<details>
  <summary>查看 <code>approx_median</code> 示例</summary>

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

使用 t-digest 算法返回输入值的近似百分位。

```sql
approx_percentile_cont(expression, percentile, centroids)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |
| `percentile` | 要计算的百分位数。必须是 0 到 1（含）之间的浮点值。 |
| `centroids` | 可选，t-digest 算法中使用的质心数。默认值为 100。 |

:::tip
如果存在此数字或更少的唯一值，则可以期待确切的结果。质心数量越多，近似值就越准确，但需要更多的内存来计算。
:::

<details>
  <summary>查看 <code>approx_percentile_cont</code> 示例</summary>


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

使用t-digest算法返回输入值的加权近似百分位数。

```sql
approx_percentile_cont_with_weight(expression, weight, percentile)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。可以是常量、列或函数，以及算术运算符的任意组合 |
| `weight` | 用作权重的表达式。可以是常量、列或函数，也可以是算术运算符的任意组合。 |
| `percentile` | 要计算的百分位数。必须是介于 0 和 1（含）之间的浮点值。 |

:::tip
如果存在此数字或更少的唯一值，则可以期待确切的结果。质心数量越多，近似值就越准确，但需要更多的内存来计算。
:::

<details>
  <summary>查看 <code>approx_percentile_cont_with_weight</code> 示例</summary>

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

从给定的列中随机选择 n 条记录。

```sql
sample(expression, n)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `expression` | 要操作的表达式。必需是表中的某一列。 |
| `n` | 要返回的记录数量。 |

<details>
  <summary>查看 <code>sample</code> 示例</summary>

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

`asap_smooth` 函数用于时间序列数据的平滑处理，ASAP（As Smooth As Possible）平滑算法旨在快速平滑时间序列数据，同时保持数据中的关键趋势和模式，使得数据的可视化更加清晰，而不会因过度平滑而丢失重要信息。

```sql
asap_smooth(time, value, resolution ORDER BY time)
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `time` | 每个数据点的时间戳。 |
| `value` | 每个时间戳的值。 |
| `resolution` | 要返回的大概点数。确定结果图的水平分辨率。 |

<details>
  <summary>查看 <code>asap_smooth</code> 示例</summary>

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

