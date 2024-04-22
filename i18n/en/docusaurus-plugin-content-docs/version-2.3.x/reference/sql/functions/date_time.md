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

| Parameters         | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `interval`         |                                                                                            |
| `expression`       | The time expression to operate.可以是常量、列或函数。                                 |
| `origin-timestamp` | Optional.用于确定 bin 边界的起点。如果未指定，则默认为 `1970-01-01T00:00:00Z`（UTC 中的 UNIX 纪元）。 |

支持的 `interval` 时间单位请参考 [持续时间单位](../reference.md#持续时间单位)

<details>
  <summary>查看 <code>date_bin</code> 示例</summary>

**如果您将数据分箱为 15 分钟间隔，则输入时间戳 `2024-01-01T18:18:18Z` 将更新为其所在 15 分钟分箱的开始时间：`2024-01-01T18:15:00Z` 。**

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

将时间戳值截断为指定的精度。

```sql
date_trunc(precision, expression)
```

| Parameters   | Description                                                                        |
| ------------ | ---------------------------------------------------------------------------------- |
| `precision`  | 截断到的时间精度。支持：`year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`。 |
| `expression` | The time expression to operate.可以是常量、列或函数。                         |

别名：`datetrunc`

<details>
  <summary>查看 <code>date_trunc</code> 示例</summary>

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

以整数形式返回日期的指定部分。

```sql
date_part(part, expression)
```

| Options      | Description                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `part`       | 要返回的日期的一部分。支持：支持：`year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`, `dow`, `doy`, `epoch`。 |
| `expression` | The time expression to operate.可以是常量、列或函数。                                                                                                 |

别名：`datepart`

<details>
  <summary>查看 <code>date_part</code> 示例</summary>

**从日期中提取月份。**

```sql
SELECT date_part('month', '2024-05-13') AS month;
```

</details>

## extract

以整数形式从时间值返回子字段。与 [`date_part`](#date_part)类似，但参数不同。

```sql
extract(field FROM source)
```

| Options  | Description                                                                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `field`  | 要返回的日期的一部分。支持：支持：`year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`, `dow`, `doy`, `epoch`。 |
| `source` | The time expression to operate.可以是常量、列或函数。                                                                                                 |

<details>
  <summary>查看 <code>extract</code> 示例</summary>

**从日期中提取月份。**

```sql
SELECT extract(month FROM  '2024-05-13') AS month;
```

</details>

## to_timestamp

将值转换为时间戳（`YYYY-MM-DDT00:00:00Z`）。支持字符串、整数、无符号整数和双精度浮点数类型作为输入。如果没有提供[Chrono格式]，字符串将按照RFC3339（例如`2023-07-20T05:44:00`）解析。整数、无符号整数和双精度浮点数被解释为自Unix纪元（`1970-01-01T00:00:00Z`）以来的秒数。返回相应的时间戳。

:::tip
`to_timestamp`返回时间戳（纳秒）。整数输入支持的范围在`-9223372037`到`9223372036`之间。字符串输入支持的范围在`1677-09-21T00:12:44.0`到`2262-04-11T23:47:16.0`之间。请对超出支持范围的输入使用 `to_timestamp_seconds`。
:::

```sql
to_timestamp(expression[, ..., format_n])
```

| Options      | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `expression` | Expression to operate on.可以是常量、列或函数，以及算术运算符的任意组合。             |
| `format_n`   | 可选的 Chrono 格式字符串，用于解析表达式。将按照格式出现的顺序尝试格式，并返回第一个成功的格式。如果没有任何格式能够成功解析表达式，则会返回错误。 |

<details>
  <summary>查看 <code>to_timestamp</code> 示例</summary>

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

将值转换为时间戳（`YYYY-MM-DDT00:00:00.000Z`）。支持字符串、整数和无符号整数类型作为输入。如果没有提供Chrono格式，字符串将按照RFC3339（例如`2023-07-20T05:44:00`）解析。整数和无符号整数被解释为自Unix纪元（`1970-01-01T00:00:00Z`）以来的毫秒数。返回相应的时间戳。

```sql
to_timestamp_millis(expression[, ..., format_n])
```

| Options      | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `expression` | Expression to operate on.可以是常量、列或函数，以及算术运算符的任意组合。             |
| `format_n`   | 可选的 Chrono 格式字符串，用于解析表达式。将按照格式出现的顺序尝试格式，并返回第一个成功的格式。如果没有任何格式能够成功解析表达式，则会返回错误。 |

<details>
  <summary>查看 <code>to_timestamp_millis</code> 示例</summary>

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

将值转换为时间戳（`YYYY-MM-DDT00:00:00.000000Z`）。支持字符串、整数和无符号整数类型作为输入。如果没有提供Chrono格式，字符串将按照RFC3339（例如`2023-07-20T05:44:00`）解析。整数和无符号整数被解释为自Unix纪元（`1970-01-01T00:00:00Z`）以来的微秒数。返回相应的时间戳。

```sql
to_timestamp_micros(expression[, ..., format_n])
```

| Options      | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `expression` | Expression to operate on.可以是常量、列或函数，以及算术运算符的任意组合。             |
| `format_n`   | 可选的 Chrono 格式字符串，用于解析表达式。将按照格式出现的顺序尝试格式，并返回第一个成功的格式。如果没有任何格式能够成功解析表达式，则会返回错误。 |

<details>
  <summary>查看 <code>to_timestamp_micros</code> 示例</summary>

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

将值转换为时间戳（`YYYY-MM-DDT00:00:00.000Z`）。支持字符串、整数和无符号整数类型作为输入。如果没有提供Chrono格式，字符串将按照RFC3339（例如`2023-07-20T05:44:00`）解析。整数和无符号整数被解释为自Unix纪元（`1970-01-01T00:00:00Z`）以来的秒数。返回相应的时间戳。

```sql
to_timestamp_seconds(expression[, ..., format_n])
```

| Options      | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `expression` | Expression to operate on.可以是常量、列或函数，以及算术运算符的任意组合。             |
| `format_n`   | 可选的 Chrono 格式字符串，用于解析表达式。将按照格式出现的顺序尝试格式，并返回第一个成功的格式。如果没有任何格式能够成功解析表达式，则会返回错误。 |

<details>
  <summary>查看 <code>to_timestamp_seconds</code> 示例</summary>

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

将整数转换为RFC3339时间戳格式（`YYYY-MM-DDT00:00:00.000000000Z`）。整数和无符号整数被解释为自Unix纪元（`1970-01-01T00:00:00Z`）以来的秒数，返回相应的时间戳。

```sql
from_unixtime(expression)
```

| Options      | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| `expression` | Expression to operate on.可以是常量、列或函数，以及算术运算符的任意组合。 |

```sql {1}
SELECT from_unixtime(1672531200);
+----------------------------------+
| from_unixtime(Int64(1672531200)) |
+----------------------------------+
| 2023-01-01T00:00:00              |
+----------------------------------+
```
