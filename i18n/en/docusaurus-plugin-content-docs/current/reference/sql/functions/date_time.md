---
sidebar_position: 4
---

# Date/Time Functions

The time and date functions are a collection of functions used to handle and manipulate time and date data.They include operations such as getting the current time, formatting dates, comparing times, and calculating time intervals.Time and date functions can help you handle time-related tasks, such as calculating date differences, scheduling tasks, and calendar functions, etc.

## now

Return the current UTC timestamp.

```sql
now()
```

<details>
  <summary>View <code>now()</code> Example</summary>

```sql {1}
SELECT now();
+--------------------------------+
| now()                          |
+--------------------------------+
| 2024-03-11T09:52:26.574620673Z |
+--------------------------------+
```

</details>

## current_date

Return the current UTC date.

```sql
current_date()
```

<details>
  <summary>View <code>current_date</code> Example</summary>

```sql {1}
SELECT current_date();
+----------------+
| current_date() |
+----------------+
| 2024-03-11     |
+----------------+
```

</details>

## current_time

Return the current UTC time.

```sql
current_time()
```

<details>
  <summary>View <code>current_date</code> Example</summary>

```sql {1}
SELECT current_time();
+--------------------+
| current_time()     |
+--------------------+
| 11:30:04.708668926 |
+--------------------+
```

</details>

## date_bin

Calculate the time interval and return the starting point of the interval closest to the specified timestamp.By grouping rows into time-based 'bins' or 'windows' and applying aggregation or selector functions, downsample time series data to each window using `date_bin`.

```sql
date_bin(interval, expression, origin-timestamp)
```

| Parameters         | Description                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `interval`         |                                                                                                                                                                                                                |
| `expression`       | The time expression to operate.Can be a constant, column, or function.                                                                                                         |
| `origin-timestamp` | Optional.The starting point for determining the bin boundaries.If not specified, it defaults to `1970-01-01T00:00:00Z` (UNIX epoch in UTC). |

Please refer to [duration units](../reference.md#duration-units) for supported `interval` time units

<details>
  <summary>View <code>date_bin</code> Example</summary>

**If you bin the data into 15-minute intervals, entering the timestamp `2024-01-01T18:18:18Z` will be updated to the start time of its 15-minute bin: `2024-01-01T18:15:00Z`.**

```sql {1}
SELECT date_bin(INTERVAL '15' MINUTE, TIMESTAMP '2024-01-01T18:18:18Z');
+-----------------------------------------------------------------------------+
| date_bin(IntervalMonthDayNano("900000000000"),Utf8("2024-01-01T18:18:18Z")) |
+-----------------------------------------------------------------------------+
| 2024-01-01T18:15:00                                                         |
+-----------------------------------------------------------------------------+
```

</details>

## date_trunc

Truncate the timestamp value to the specified precision.

```sql
date_trunc(precision, expression)
```

| Parameters   | Description                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `precision`  | The precision of the truncated time.Support: `year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`. |
| `expression` | The time expression to operate.Can be a constant, column, or function.                                                              |

Alias: `datetrunc`

<details>
  <summary>View <code>date_trunc</code> Example</summary>

```sql {1}
SELECT date_trunc('month', time) AS month, avg(temperature) AS avg_temperature FROM air GROUP BY month;
+---------------------+-------------------+
| month               | avg_temperature   |
+---------------------+-------------------+
| 2023-02-01T00:00:00 | 65.09259672619048 |
| 2023-03-01T00:00:00 | 65.00373418686176 |
| 2023-01-01T00:00:00 | 64.96063701923077 |
+---------------------+-------------------+
```

</details>

## date_part

Returns the specified part of the date in integer form.

```sql
date_part(part, expression)
```

| Options      | Description                                                                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `part`       | A part of the date to be returned.Support:  `year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`, `dow`, `doy`, `epoch`. |
| `expression` | The time expression to operate.Can be a constant, column, or function.                                                                                                                                |

Alias: `datepart`

<details>
  <summary>View <code>date_part</code> Example</summary>

**Extract the month from the date.**

```sql
SELECT date_part('month', '2024-05-13') AS month;
```

</details>

## extract

Return subfields from a time value in integer form.Similar to [`date_part`](#date_part), but with different parameters.

```sql
extract(field FROM source)
```

| Options  | Description                                                                                                                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `field`  | A part of the date to be returned.Support:  `year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`, `dow`, `doy`, `epoch`. |
| `source` | The time expression to operate.Can be a constant, column, or function.                                                                                                                                |

<details>
  <summary>View <code>extract</code> Example</summary>

**Extract the month from the date.**

```sql
SELECT extract(month FROM  '2024-05-13') AS month;
```

</details>

## to_timestamp

Converts the value to a timestamp (`YYYY-MM-DDT00:00:00Z`).Supports string, integer, unsigned integer, and double-precision floating-point number types as input.If [Chrono format] is not provided, the string will be parsed according to RFC3339 (e.g. `2023-07-20T05:44:00`).Integers, unsigned integers, and double-precision floating-point numbers are interpreted as the number of seconds since the Unix epoch (`1970-01-01T00:00:00Z`).Return the corresponding timestamp.

:::tip
`to_timestamp` returns a timestamp (in nanoseconds).The range supported for integer input is between `-9223372037` and `9223372036`.The range supported for string input is between `1677-09-21T00:12:44.0` and `2262-04-11T23:47:16.0`.Please use `to_timestamp_seconds` for inputs that are beyond the supported range.
:::

```sql
to_timestamp(expression[, ..., format_n])
```

| Options      | Description                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.                                                                                                                                  |
| `format_n`   | Optional Chrono format string used to parse the expression.Will attempt formats in the order they appear and return the first successful format.If no format can successfully parse the expression, an error will be returned. |

<details>
  <summary>View <code>to_timestamp</code> Example</summary>

```sql {1}
select to_timestamp('2023-01-31T09:26:56.123456789-05:00');
+-----------------------------------------------------------+
| to_timestamp(Utf8("2023-01-31T09:26:56.123456789-05:00")) |
+-----------------------------------------------------------+
| 2023-01-31T14:26:56.123456789                             |
+-----------------------------------------------------------+
```

</details>

## to_timestamp_millis

Converts the value to a timestamp (`YYYY-MM-DDT00:00:00.000Z`).Supports string, integer, and unsigned integer types as input.If [Chrono format] is not provided, the string will be parsed according to RFC3339 (e.g. `2023-07-20T05:44:00`).Integers and unsigned integers are interpreted as the number of milliseconds since the Unix epoch (`1970-01-01T00:00:00Z`).Return the corresponding timestamp.

```sql
to_timestamp_millis(expression[, ..., format_n])
```

| Options      | Description                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.                                                                                                                                  |
| `format_n`   | Optional Chrono format string used to parse the expression.Will attempt formats in the order they appear and return the first successful format.If no format can successfully parse the expression, an error will be returned. |

<details>
  <summary>View <code>to_timestamp_millis</code> Example</summary>

```sql {1}
select to_timestamp_millis('2023-01-31T09:26:56.123456789-05:00');
+------------------------------------------------------------------+
| to_timestamp_millis(Utf8("2023-01-31T09:26:56.123456789-05:00")) |
+------------------------------------------------------------------+
| 2023-01-31T14:26:56.123                                          |
+------------------------------------------------------------------+
```

</details>

## to_timestamp_micros

Converts the value to a timestamp (`YYYY-MM-DDT00:00:00.000000Z`).Supports string, integer, and unsigned integer types as input.If [Chrono format] is not provided, the string will be parsed according to RFC3339 (e.g. `2023-07-20T05:44:00`).Integers and unsigned integers are interpreted as the number of microseconds since the Unix epoch (`1970-01-01T00:00:00Z`).Return the corresponding timestamp.

```sql
to_timestamp_micros(expression[, ..., format_n])
```

| Options      | Description                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.                                                                                                                                  |
| `format_n`   | Optional Chrono format string used to parse the expression.Will attempt formats in the order they appear and return the first successful format.If no format can successfully parse the expression, an error will be returned. |

<details>
  <summary>View <code>to_timestamp_micros</code> Example</summary>

```sql {1}
select to_timestamp_micros('2023-01-31T09:26:56.123456789-05:00');
+------------------------------------------------------------------+
| to_timestamp_micros(Utf8("2023-01-31T09:26:56.123456789-05:00")) |
+------------------------------------------------------------------+
| 2023-01-31T14:26:56.123456                                       |
+------------------------------------------------------------------+
```

</details>

## to_timestamp_seconds

Converts the value to a timestamp (`YYYY-MM-DDT00:00:00.000Z`).Supports string, integer, and unsigned integer types as input.If [Chrono format] is not provided, the string will be parsed according to RFC3339 (e.g. `2023-07-20T05:44:00`).Integers and unsigned integers are interpreted as the number of seconds since the Unix epoch (`1970-01-01T00:00:00Z`).Return the corresponding timestamp.

```sql
to_timestamp_seconds(expression[, ..., format_n])
```

| Options      | Description                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.                                                                                                                                  |
| `format_n`   | Optional Chrono format string used to parse the expression.Will attempt formats in the order they appear and return the first successful format.If no format can successfully parse the expression, an error will be returned. |

<details>
  <summary>View <code>to_timestamp_seconds</code> Example</summary>

```sql {1}
select to_timestamp_seconds('2023-01-31T09:26:56.123456789-05:00');
+-------------------------------------------------------------------+
| to_timestamp_seconds(Utf8("2023-01-31T09:26:56.123456789-05:00")) |
+-------------------------------------------------------------------+
| 2023-01-31T14:26:56                                               |
+-------------------------------------------------------------------+
```

</details>

## from_unixtime

Converts the integer to RFC3339 timestamp format (`YYYY-MM-DDT00:00:00.000000000Z`).Integers and unsigned integers are interpreted as the number of microseconds since the Unix epoch (`1970-01-01T00:00:00Z`), returning the corresponding timestamp.

```sql
from_unixtime(expression)
```

| Options      | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

```sql {1}
SELECT from_unixtime(1672531200);
+----------------------------------+
| from_unixtime(Int64(1672531200)) |
+----------------------------------+
| 2023-01-01T00:00:00              |
+----------------------------------+
```
