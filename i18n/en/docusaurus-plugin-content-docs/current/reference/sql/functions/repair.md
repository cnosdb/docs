---
sidebar_position: 10
---

# Repair Function

Repair for time series data

## timestamp_repair

Responsible for repairing timestamp sequences

:::tip

Function timestamp_repair first determines timestamp interval by Mode, Cluster, Median, and custom values, and then uses Linear and Mode methods to determine the start value of the timestamp after fixing.Optimize the repair cost through dynamic programming algorithm, with three operations including insertion, deletion, and remain unchanged, and finally obtain the optimal repair sequence.
:::

```sql
timestamp_repair(time_expresion, numeric_expression, arg_expression)
```

| Options              | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expresion`     | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.       |
| `arg_expression`     | Parameter expression.Must be a string constant, with multiple parameters linked by `&`                                              |

| Parameters   | Description                                                                                                                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `method`     | Method to estimate the standard time interval, taking a value of 'median', 'mode', or 'cluster', only valid when interval is missing.In the default case, the median method will be used for estimation. |
| `interval`   | Standard time interval (in milliseconds), is a positive integer.In the default case, calculations will be based on the specified method.                                              |
| `start_mode` | Calculation method of the start timestamp, taking the value 'linear' or 'mode', with 'mode' being used by default.                                                                                                       |

<details>
  <summary>View example</summary>

```sql {1-3}
CREATE table wzz(value double);
INSERT wzz VALUES ('2024-01-01T00:00:00.000',1),('2024-01-01T00:00:10.000',2),('2024-01-01T00:00:19.000',3),('2024-01-01T00:00:30.000',4),('2024-01-01T00:00:40.000',5),('2024-01-01T00:00:50.000',6),('2024-01-01T00:01:01.000',7),('2024-01-01T00:01:11.000',8),('2024-01-01T00:01:21.000',9),('2024-01-01T00:01:31.000',10);
SELECT timestamp_repair(time, value, 'method=mode&start_mode=linear') FROM wzz;
+-------------------------+------------------------------------------------------------------------------+
| time                    | timestamp_repair(wzz.time, wzz.value, Utf8("method=mode&start_mode=linear")) |
+-------------------------+------------------------------------------------------------------------------+
| 2024-01-01T00:00:00.300 | 1.0                                                                          |
| 2024-01-01T00:00:10.300 | 2.0                                                                          |
| 2024-01-01T00:00:20.300 | 3.0                                                                          |
| 2024-01-01T00:00:30.300 | 4.0                                                                          |
| 2024-01-01T00:00:40.300 | 5.0                                                                          |
| 2024-01-01T00:00:50.300 | 6.0                                                                          |
| 2024-01-01T00:01:00.300 | 7.0                                                                          |
| 2024-01-01T00:01:10.300 | 8.0                                                                          |
| 2024-01-01T00:01:20.300 | 9.0                                                                          |
| 2024-01-01T00:01:30.300 | 10.0                                                                         |
| 2024-01-01T00:01:40.300 | NaN                                                                          |
+-------------------------+------------------------------------------------------------------------------+
```

</details>

## value_fill

Responsible for filling in missing data in the value column

:::tip

The function value_fill determines the method of value filling based on the input parameter Method, with five methods including Mean, Previous, Linear, AR, and MA.
:::

```sql
value_fill(time_expresion, numeric_expression, arg_expression)
```

| Options              | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expresion`     | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.       |
| `arg_expression`     | Parameter expression.Must be a string constant, with multiple parameters linked by `&`                                              |

| Parameters | Description                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `method`   | Method for filling missing values, with values 'mean', 'previous', 'linear', 'ar', 'ma', defaults to 'linear'. |

<details>
  <summary>View example</summary>

```sql {1-3}
CREATE table wzz(value double);
INSERT wzz VALUES ('2024-01-01T00:00:02',acos(3)),('2024-01-01T00:00:03',101.0),('2024-01-01T00:00:04',102.0),('2024-01-01T00:00:06',104.0),('2024-01-01T00:00:08',126.0),('2024-01-01T00:00:10',108.0),('2024-01-01T00:00:14',acos(3)),('2024-01-01T00:00:15',113.0),('2024-01-01T00:00:16',114.0),('2024-01-01T00:00:18',116.0),('2024-01-01T00:00:20',acos(3)),('2024-01-01T00:00:22',acos(3)),('2024-01-01T00:00:26',124.0),('2024-01-01T00:00:28',126.0),('2024-01-01T00:00:30',128.0);
SELECT value_fill(time, value, 'method=mean') FROM wzz;
+---------------------+------------------------------------------------------+
| time                | value_fill(wzz.time, wzz.value, Utf8("method=mean")) |
+---------------------+------------------------------------------------------+
| 2024-01-01T00:00:02 | 114.72727272727273                                   |
| 2024-01-01T00:00:03 | 101.0                                                |
| 2024-01-01T00:00:04 | 102.0                                                |
| 2024-01-01T00:00:06 | 104.0                                                |
| 2024-01-01T00:00:08 | 126.0                                                |
| 2024-01-01T00:00:10 | 108.0                                                |
| 2024-01-01T00:00:14 | 114.72727272727273                                   |
| 2024-01-01T00:00:15 | 113.0                                                |
| 2024-01-01T00:00:16 | 114.0                                                |
| 2024-01-01T00:00:18 | 116.0                                                |
| 2024-01-01T00:00:20 | 114.72727272727273                                   |
| 2024-01-01T00:00:22 | 114.72727272727273                                   |
| 2024-01-01T00:00:26 | 124.0                                                |
| 2024-01-01T00:00:28 | 126.0                                                |
| 2024-01-01T00:00:30 | 128.0                                                |
+---------------------+------------------------------------------------------+
```

</details>

## value_repair

Responsible for repairing the data in the value column

:::tip

The function value_repair uses the Screen algorithm and the LsGreedy algorithm to repair inconsistencies or missing values between timestamps and values.First, the Screen algorithm determines the width of the repair window based on the median of the timestamp intervals, repairing the data while keeping it within a certain range after the repair.The LsGreedy algorithm fixes by calculating the change in velocity and using a greedy strategy.In addition, some auxiliary functions have been implemented to calculate the median, median absolute deviation, and value changes.
:::

```sql
value_repair(time_expresion, numeric_expression, arg_expression)
```

| Options              | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expresion`     | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.       |
| `arg_expression`     | Parameter expression.Must be a string constant, with multiple parameters linked by `&`                                              |

| Parameters  | Description                                                                                                                                                                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `method`    | The method used for repair, with a value of 'Screen' or 'LsGreedy'. By default, the Screen method is used for repair.                                                                                                                                         |
| `min_speed` | This parameter is only valid when using the Screen method.When the speed is less than this value, it will be considered as a numerical outlier and repaired.Subtract three times the absolute median deviation from the median by default.    |
| `max_speed` | This parameter is only valid when using the Screen method.When the speed is greater than this value, it will be considered as a numerical outlier and repaired.Subtract three times the absolute median deviation from the median by default. |
| `center`    | This parameter is only valid when using the LsGreedy method.Center of the Gaussian model established for the speed change distribution.Default to 0 in the absence of a value.                                                                |
| `sigma`     | This parameter is only valid when using the LsGreedy method.The Gaussian model for the distribution of speed changes is not standardized.Absolute median difference in default settings.                                                      |

<details>
  <summary>View example</summary>

```sql {1-3}
CREATE table wzz(value double);
INSERT wzz VALUES ('2024-01-01T00:00:02',100.0),('2024-01-01T00:00:03',101.0),('2024-01-01T00:00:04',102.0),('2024-01-01T00:00:06',104.0),('2024-01-01T00:00:08',126.0),('2024-01-01T00:00:10',108.0),('2024-01-01T00:00:14',112.0),('2024-01-01T00:00:15',113.0),('2024-01-01T00:00:16',114.0),('2024-01-01T00:00:18',116.0),('2024-01-01T00:00:20',118.0),('2024-01-01T00:00:22',100.0),('2024-01-01T00:00:26',124.0),('2024-01-01T00:00:28',126.0),('2024-01-01T00:00:30',acos(3));
SELECT value_repair(time, value, 'method=screen') from wzz;
+---------------------+----------------------------------------------------------+
| time                | value_repair(wzz.time, wzz.value, Utf8("method=screen")) |
+---------------------+----------------------------------------------------------+
| 2024-01-01T00:00:02 | 100.0                                                    |
| 2024-01-01T00:00:03 | 101.0                                                    |
| 2024-01-01T00:00:04 | 102.0                                                    |
| 2024-01-01T00:00:06 | 104.0                                                    |
| 2024-01-01T00:00:08 | 106.0                                                    |
| 2024-01-01T00:00:10 | 108.0                                                    |
| 2024-01-01T00:00:14 | 112.0                                                    |
| 2024-01-01T00:00:15 | 113.0                                                    |
| 2024-01-01T00:00:16 | 114.0                                                    |
| 2024-01-01T00:00:18 | 116.0                                                    |
| 2024-01-01T00:00:20 | 118.0                                                    |
| 2024-01-01T00:00:22 | 120.0                                                    |
| 2024-01-01T00:00:26 | 124.0                                                    |
| 2024-01-01T00:00:28 | 126.0                                                    |
| 2024-01-01T00:00:30 | 128.0                                                    |
+---------------------+----------------------------------------------------------+
```

</details>