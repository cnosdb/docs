---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Two-step aggregation

First, create an intermediate aggregation by using aggregate functions instead of calculating the final result in one step.Then, calculate the final result using analytic functions.

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### stats_agg

Perform linear regression analysis on two-dimensional data, such as calculating correlation coefficients and covariance. And you can also separately calculate the common statistical data of each dimension, aggregate the data into an intermediate statistical aggregation form for further calculation.

:::tip

Aggregation will only occur when both `x` and `y` are not empty.

:::

```sql
stats_agg(y, x)
```

| Options | Description                                                                           |
| ------- | ------------------------------------------------------------------------------------- |
| `y`     | The `y` values in the dataset to be used for statistical aggregation. |
| `x`     | The `x` values in the dataset to be used for statistical aggregation. |

<details>
  <summary>View <code>stats_agg</code> Example</summary>

**Sample Data.**

```sql {1}
SELECT * FROM test_stats;
+-------------------------------+---+---+
| time                          | x | y |
+-------------------------------+---+---+
| 1970-01-01T00:00:00.000000001 | 1 | 1 |
| 1970-01-01T00:00:00.000000002 | 1 | 2 |
| 1970-01-01T00:00:00.000000003 | 1 | 3 |
| 1970-01-01T00:00:00.000000004 | 1 | 4 |
| 1970-01-01T00:00:00.000000005 | 1 | 5 |
| 1970-01-01T00:00:00.000000006 | 2 | 1 |
| 1970-01-01T00:00:00.000000007 | 2 | 2 |
| 1970-01-01T00:00:00.000000008 | 2 | 3 |
| 1970-01-01T00:00:00.000000009 | 2 | 4 |
| 1970-01-01T00:00:00.000000010 | 2 | 5 |
+-------------------------------+---+---+
```

**Use `stats_agg` to aggregate results.**

```sql {1}
SELECT stats_agg(y, x) FROM test_stats;
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stats_agg(test_stats.y,test_stats.x)                                                                                                                       |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {n: 10, sx: 15.0, sx2: 2.5, sx3: -2.7755575615628914e-16, sx4: 0.6249999999999999, sy: 30.0, sy2: 20.0, sy3: -1.7763568394002505e-15, sy4: 68.0, sxy: 0.0} |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

**The above results returned a result set, with explanations for each return value respectively:**

```sql
{ 
  n:   bigint, -- count 
  sx:  double, -- sum(x)- sum(x)
  sx2: double, -- sum((x-sx/n)^2) (sum of squares)
  sx3: double, -- sum((x-sx/n)^3)
  sx4: double, -- sum((x-sx/n)^4)
  sy:  double, -- sum(y)
  sy2: double, -- sum((y-sy/n)^2) (sum of squares)
  sy3: double, -- sum((y-sy/n)^3)
  sy4: double, -- sum((y-sy/n)^4)
  sxy: double, -- sum((x-sx/n)*(y-sy/n)) (sum of products) 
}
```

</details>

**`stats_agg` supports the following functions for two-step aggregation**

| Function                             | Description                                                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `num_vals`                           | Calculate the number of values in a two-dimensional statistical aggregate.                                                               |
| `average_y`, `average_x`             | Calculate the average from a two-dimensional statistical aggregate for the dimension specified.                                          |
| `sum_y`,` sum_x`                     | Calculate the sum from a two-dimensional statistical aggregate for the dimension specified.                                              |
| `stddev_samp_y`, `stddev_samp_x`     | Calculate the standard deviation of the specified dimension after two-dimensional statistical aggregation, with the method being sample. |
| `stddev_pop_y`, `stddev_pop_x`       | Calculate the standard deviation from a two-dimensional statistical aggregate for the dimension specified, method is population.         |
| `var_samp_y`,` var_samp_x`           | Calculate the variance of the specified dimension after two-dimensional statistical aggregation, with the method being sample.           |
| `var_pop_y`,` var_pop_x`             | Calculate the variance from a two-dimensional statistical aggregate for the dimension specified, method is population.                   |
| `skewness_samp_y`, `skewness_samp_x` | Calculate the skewness value of the specified dimension after two-dimensional statistical aggregation, with the method being sample.     |
| `skewness_pop_y`, `skewness_pop_x`   | Calculate the skewness value of the specified dimension after two-dimensional statistical aggregation, method is population.             |
| `kurtosis_samp_y`,` kurtosis_samp_x` | Calculate the kurtosis value of the specified dimension after two-dimensional statistical aggregation, with the method being sample.     |
| `kurtosis_pop_y`, `kurtosis_pop_x`   | Calculate the kurtosis value of the specified dimension after aggregating two-dimensional statistics, method is population.              |
| `correlation`                        | Calculate the correlation after two-dimensional statistical aggregation.                                                                 |
| `covariance_samp`, `covariance_pop`  | Calculate the covariance after two-dimensional statistical aggregation.                                                                  |
| `determination_coeff`                | Calculate the determination coefficient after two-dimensional statistical aggregation.                                                   |
| `slope`                              | Calculate the slope of the linear regression line based on two-dimensional statistical aggregation.                                      |
| `intercept`                          | Calculate the intercept of y after two-dimensional statistical aggregation.                                                              |
| `x_intercept`                        | Calculate the intercept of x after two-dimensional statistical aggregation.                                                              |

<details>
  <summary>View Sample</summary>

```sql {1}
SELECT stddev_samp_x(stats_agg(y, x)) FROM test_stats;
+-----------------------------------------------------+
| stddev_samp_x(stats_agg(test_stats.y,test_stats.x)) |
+-----------------------------------------------------+
| 0.5270462766947299                                  |
+-----------------------------------------------------+
```

</details>

</TabItem>

</Tabs>

### gauge_agg

Analyze Gauge data.Unlike Counter, Gauge can decrease as well as increase.

```sql
gauge_agg(time, numeric_expression)
```

| Options              | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>gauge_agg</code> Example</summary>

```sql {1}
SELECT gauge_agg(time, pressure) FROM air GROUP BY date_trunc('month', time);
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| gauge_agg(air.time,air.pressure)                                                                                                                                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {first: {ts: 2023-03-01T00:00:00, val: 54.0}, second: {ts: 2023-03-01T00:00:00, val: 59.0}, penultimate: {ts: 2023-03-14T16:00:00, val: 55.0}, last: {ts: 2023-03-14T16:00:00, val: 80.0}, num_elements: 13122} |
| {first: {ts: 2023-02-01T00:00:00, val: 60.0}, second: {ts: 2023-02-01T00:00:00, val: 54.0}, penultimate: {ts: 2023-02-28T23:57:00, val: 74.0}, last: {ts: 2023-02-28T23:57:00, val: 59.0}, num_elements: 26880} |
| {first: {ts: 2023-01-14T16:00:00, val: 63.0}, second: {ts: 2023-01-14T16:00:00, val: 68.0}, penultimate: {ts: 2023-01-31T23:57:00, val: 54.0}, last: {ts: 2023-01-31T23:57:00, val: 77.0}, num_elements: 16640} |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

**`gauge_agg` supports the following functions for two-step aggregation**

| Function       | Description                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `delta`        | 获取一段时间内Gauge的变化。这是简单的增量，通过从第一个值减去最后一个看到的值来计算。                                                                                                   |
| `time_delta`   | 获取持续时间，最后一个 Gauge 的时间减去第一个 Gauge 的时间。                                                                                                           |
| `rate`         | 计算 Gauge 变化和时间变化的比率。                                                                                                                            |
| `first_time`   | Get the minimum timestamp in the Gauge.                                                                                         |
| `last_time`    | Get the maximum timestamp in the Gauge.                                                                                         |
| `first_val`    | Get the value corresponding to the minimum timestamp in the Gauge.                                                              |
| `last_val`     | Get the value corresponding to the maximum timestamp in the Gauge.                                                              |
| `idelta_left`  | Calculate the earliest instantaneous change of Gauge.This is equal to the second value minus the first value.   |
| `idelta_right` | Calculate the latest instantaneous change of Gauge.This is equal to the last value minus the penultimate value. |

### compact_state_agg

Given a system or value that switches between discrete states, summarize the time spent in each state.For example, you can use the `compact_state_agg` function to track the time the system spends in `error`, `running`, or `starting` states.

```sql
compact_state_agg(time_expression, state)
```

| Options           | Description                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expression` | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>compact_state_agg</code> Example</summary>

**The example dataset is as follows:**

```sql {1,2,3}
CREATE TABLE states(state STRING);
INSERT INTO states VALUES ('2020-01-01 10:00:00', 'starting'),('2020-01-01 10:30:00', 'running'),('2020-01-03 16:00:00', 'error'),('2020-01-03 18:30:00', 'starting'),('2020-01-03 19:30:00', 'running'),('2020-01-05 12:00:00', 'stopping');
SELECT * FROM states;
+---------------------+----------+
| time                | state    |
+---------------------+----------+
| 2020-01-01T10:00:00 | starting |
| 2020-01-01T10:30:00 | running  |
| 2020-01-03T16:00:00 | error    |
| 2020-01-03T18:30:00 | starting |
| 2020-01-03T19:30:00 | running  |
| 2020-01-05T12:00:00 | stopping |
+---------------------+----------+
```

**Aggregate using the `compact_state_agg` function:**

```sql {1}
SELECT compact_state_agg(time, state) FROM states;
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| compact_state_agg(states.time,states.state)                                                                                                                                                                                                                                                                                                                                          |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {state_duration: [{state: error, duration: 0 years 0 mons 0 days 2 hours 30 mins 0.000000000 secs}, {state: starting, duration: 0 years 0 mons 0 days 1 hours 30 mins 0.000000000 secs}, {state: stopping, duration: 0 years 0 mons 0 days 0 hours 0 mins 0.000000000 secs}, {state: running, duration: 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs}], state_periods: []} |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

**The above example aggregates the state data together for further analysis, `compact_state_agg` supports the following two-step aggregation functions:**

| Function                      | Description                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`duration_in`](#duration_in) | Calculate the duration of a certain state, or calculate the duration of a certain state within a specific time period. |

#### duration_in

```sql
duration_in(state_agg_data, state [,begin_time, interval_time]) 
```

| Options          | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `state_agg_data` | Result set returned by the `state_agg_data` function.                                                 |
| `state`          | The state type of any is the same as compact_state_agg.     |
| `begin_time`     | Optional, specifies the start time within the specified time period.                                  |
| `interval_time`  | Optional, specifies the duration of the time period, when not specified, the time period is infinite. |

<details>
  <summary>View <code>duration_in</code> Example</summary>

```sql {1}
SELECT duration_in(compact_state_agg(time, state), 'running') FROM states;
+--------------------------------------------------------------------------+
| duration_in(compact_state_agg(states.time,states.state),Utf8("running")) |
+--------------------------------------------------------------------------+
| 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs                   |
+--------------------------------------------------------------------------+
```

</details>

### state_agg

Given a system or value that switches between discrete states, track transitions between states.

```sql
state_agg(time_expression, state)
```

Calculate the time spent in each state.

<details>
  <summary>View <code>state_agg</code> Example</summary>

**The example dataset is as follows:**

```sql {1,2,3}
CREATE TABLE states(state STRING);
INSERT INTO states VALUES('2020-01-01 10:00:00', 'starting'),('2020-01-01 10:30:00', 'running'),('2020-01-03 16:00:00', 'error'),('2020-01-03 18:30:00', 'starting'),('2020-01-03 19:30:00', 'running'),('2020-01-05 12:00:00', 'stopping');
SELECT * FROM states;
+---------------------+----------+
| time                | state    |
+---------------------+----------+
| 2020-01-01T10:00:00 | starting |
| 2020-01-01T10:30:00 | running  |
| 2020-01-03T16:00:00 | error    |
| 2020-01-03T18:30:00 | starting |
| 2020-01-03T19:30:00 | running  |
| 2020-01-05T12:00:00 | stopping |
+---------------------+----------+
```

**Use `state_agg` function to aggregate:**

```sql {1}
SELECT state_agg(time, state) FROM states;
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| state_agg(states.time,states.state)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {state_duration: [{state: running, duration: 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs}, {state: error, duration: 0 years 0 mons 0 days 2 hours 30 mins 0.000000000 secs}, {state: stopping, duration: 0 years 0 mons 0 days 0 hours 0 mins 0.000000000 secs}, {state: starting, duration: 0 years 0 mons 0 days 1 hours 30 mins 0.000000000 secs}], state_periods: [{state: running, periods: [{start_time: 2020-01-01T10:30:00, end_time: 2020-01-03T16:00:00}, {start_time: 2020-01-03T19:30:00, end_time: 2020-01-05T12:00:00}]}, {state: starting, periods: [{start_time: 2020-01-01T10:00:00, end_time: 2020-01-01T10:30:00}, {start_time: 2020-01-03T18:30:00, end_time: 2020-01-03T19:30:00}]}, {state: error, periods: [{start_time: 2020-01-03T16:00:00, end_time: 2020-01-03T18:30:00}]}]} |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

**The above example aggregates the state data together for further analysis, `state_agg` supports the following two-step aggregation functions:**

| Function                                   | Description                                                                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`duration_in`](#duration_in-1)            | Calculate the duration of a certain state, or calculate the duration of a certain state within a specific time period. |
| [state_at](#state_at) | Statistics are in a state of affairs at a time.                                                                        |

#### duration_in

```sql
duration_in(state_agg_data, state [,begin_time, interval_time]) 
```

| Options          | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `state_agg_data` | Result set returned by the `state_agg` function.                                                      |
| `state`          | The state type of `any` is the same as `compact_state_agg`.                                           |
| `begin_time`     | Optional, specifies the start time within the specified time period.                                  |
| `interval_time`  | Optional, specifies the duration of the time period, when not specified, the time period is infinite. |

<details>
  <summary>View <code>duration_in</code> Example</summary>

\*\*Calculate the duration of the 'running' status.

```sql {1}
SELECT duration_in(state_agg(time, state), 'running') FROM states;
+------------------------------------------------------------------+
| duration_in(state_agg(states.time,states.state),Utf8("running")) |
+------------------------------------------------------------------+
| 0 years 0 mons 3 days 22 hours 0 mins 0.000000000 secs           |
+------------------------------------------------------------------+
```

**Calculate the duration of the 'running' state starting from '2020-01-01 11:00:00'.**

```sql {1}
SELECT duration_in(state_agg(time, state), 'running', Timestamp '2020-01-01 11:00:00') FROM states;
+----------------------------------------------------------------------------------------------+
| duration_in(state_agg(states.time,states.state),Utf8("running"),Utf8("2020-01-01 11:00:00")) |
+----------------------------------------------------------------------------------------------+
| 0 years 0 mons 3 days 21 hours 30 mins 0.000000000 secs                                      |
+----------------------------------------------------------------------------------------------+
```

**Calculate the duration of the 'running' state starting from 2020-01-01 11:00:00 within four days.**

```sql {1}
SELECT duration_in(state_agg(time, state), 'running', Timestamp '2020-01-01 11:00:00', interval '4 day') FROM states;
+-------------------------------------------------------------------------------------------------------------------------------------------+
| duration_in(state_agg(states.time,states.state),Utf8("running"),Utf8("2020-01-01 11:00:00"),IntervalMonthDayNano("73786976294838206464")) |
+-------------------------------------------------------------------------------------------------------------------------------------------+
| 0 years 0 mons 3 days 20 hours 30 mins 0.000000000 secs                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

#### state_at

```
state_at(state_agg_data, time_expression)
```

| Options           | Description                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state_agg_data`  | Result set returned by the `state_agg` function.                                                                                    |
| `time_expression` | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>state_at</code> Example</summary>

```sql {1}
SELECT state_at(state_agg(time, state), Timestamp '2020-01-01 10:30:00') FROM states;
+---------------------------------------------------------------------------+
| state_at(state_agg(states.time,states.state),Utf8("2020-01-01 10:30:00")) |
+---------------------------------------------------------------------------+
| running                                                                   |
+---------------------------------------------------------------------------+
```

</details>

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### candlestick_agg

Conduct financial asset data analysis, can obtain the opening and closing prices of stocks, as well as the lowest and highest prices.

```sql
candlestick_agg(time, price, volume)
```

<details>
  <summary>View <code>candlestick_agg</code> Example</summary>

**The example dataset is as follows:**

```sql {1-3}
CREATE TABLE IF NOT EXISTS tick(price bigint ,volume bigint);
INSERT tick(time, price, volume) VALUES('1999-12-31 00:00:00.000', 111, 444),('1999-12-31 00:00:00.005', 222, 444),('1999-12-31 00:00:00.010', 333, 222),('1999-12-31 00:00:10.015', 444, 111),('1999-12-31 00:00:10.020', 222, 555),('1999-12-31 00:10:00.025', 333, 555),('1999-12-31 00:10:00.030', 444, 333),('1999-12-31 01:00:00.035', 555, 222);
SELECT * FROM tick;
+-------------------------+-------+--------+
| time                    | price | volume |
+-------------------------+-------+--------+
| 1999-12-31T00:00:00     | 111   | 444    |
| 1999-12-31T00:00:00.005 | 222   | 444    |
| 1999-12-31T00:00:00.010 | 333   | 222    |
| 1999-12-31T00:00:10.015 | 444   | 111    |
| 1999-12-31T00:00:10.020 | 222   | 555    |
| 1999-12-31T00:10:00.025 | 333   | 555    |
| 1999-12-31T00:10:00.030 | 444   | 333    |
| 1999-12-31T01:00:00.035 | 555   | 222    |
+-------------------------+-------+--------+
```

**Use `candlestick_agg` for aggregation.**

```sql {1}
SELECT candlestick_agg(time, price, volume) FROM tick;
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| candlestick_agg(tick.time,tick.price,tick.volume)                                                                                                                                                                                   |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| {open: {ts: 1999-12-31T00:00:00, val: 111.0}, close: {ts: 1999-12-31T01:00:00.035, val: 555.0}, low: {ts: 1999-12-31T00:00:00, val: 111.0}, high: {ts: 1999-12-31T01:00:00.035, val: 555.0}, volume: {vol: 2886.0, vwap: 850149.0}} |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

</details>

**You can extract the opening price, closing price, etc. separately in the above example.Supported functions include:**

| Function     | Description                                    |
| ------------ | ---------------------------------------------- |
| `close`      | Closing price.                 |
| `close_time` | Closing time.                  |
| `high`       | High price.                    |
| `high_time`  | High price time.               |
| `low`        | Low price.                     |
| `low_time`   | Low price time.                |
| `open`       | Opening price.                 |
| `open_time`  | Opening time.                  |
| `volume`     | Total cumulative.              |
| `vwap`       | Volume Weighted Average Price. |

<details>
  <summary>View example</summary>

```sql {1}
SELECT close(candlestick_agg(time,price,volume)) AS close_price FROM tick;
+-------------+
| close_price |
+-------------+
| 555.0       |
+-------------+
```

</details>

</TabItem>

</Tabs>
