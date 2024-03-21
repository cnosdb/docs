---
sidebar_position: 4
description: 时间和日期函数是用于处理和操作时间和日期数据的函数集合。它们包括获取当前时间、日期格式化、时间比较和计算时间间隔等操作。时间和日期函数可以帮助你处理时间相关的任务，如计算日期差异、定时任务和日历功能等。
---

# 日期和时间函数

## now

返回当前 UTC 时间戳。

```sql
now()
```

<details>
  <summary>查看 <code>now()</code> 示例</summary>

```sql  {1}
SELECT now();
+--------------------------------+
| now()                          |
+--------------------------------+
| 2024-03-11T09:52:26.574620673Z |
+--------------------------------+
```

</details>


## current_date

返回当前 UTC 日期。

```sql
current_date()
```

<details>
  <summary>查看 <code>current_date</code> 示例</summary>

```sql  {1}
SELECT current_date();
+----------------+
| current_date() |
+----------------+
| 2024-03-11     |
+----------------+
```

</details>

## current_time

返回当前 UTC 时间。

```sql
current_time()
```

<details>
  <summary>查看 <code>current_date</code> 示例</summary>

```sql  {1}
SELECT current_time();
+--------------------+
| current_time()     |
+--------------------+
| 11:30:04.708668926 |
+--------------------+
```

</details>

## date_bin

计算时间间隔并返回最接近指定时间戳的间隔的起点。通过将行分组到基于时间的“箱”或“窗口”并应用聚合或选择器函数，使用 `date_bin` 对时间序列数据进行下采样到每个窗口。

```sql
date_bin(interval, expression, origin-timestamp)
```

| 参数               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `interval`         |                                                              |
| `expression`       | 要操作的时间表达式。可以是常量、列或函数。                   |
| `origin-timestamp` | 可选。用于确定 bin 边界的起点。如果未指定，则默认为 `1970-01-01T00:00:00Z`（UTC 中的 UNIX 纪元）。 

支持的 `interval` 时间单位请参考 [持续时间单位](../reference.md#持续时间单位)

<details>
  <summary>查看 <code>date_bin</code> 示例</summary>

**如果您将数据分箱为 15 分钟间隔，则输入时间戳 `2024-01-01T18:18:18Z` 将更新为其所在 15 分钟分箱的开始时间：`2024-01-01T18:15:00Z` 。**

```sql  {1}
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

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `precision`  | 截断到的时间精度。支持：`year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`。 |
| `expression` | 要操作的时间表达式。可以是常量、列或函数。                   |

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

| 选项         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `part`       | 要返回的日期的一部分。支持：支持：`year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`, `dow`, `doy`, `epoch`。 |
| `expression` | 要操作的时间表达式。可以是常量、列或函数。                   |

别名：`datepart`

## extract

以整数形式从时间值返回子字段。与 [`date_part`](#date_part)类似，但参数不同。

```sql
extract(field FROM source)
```

| 选项     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| `field`  | 要返回的日期的一部分。支持：支持：`year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, `nanosecond`, `dow`, `doy`, `epoch`。 |
| `source` | 要操作的时间表达式。可以是常量、列或函数。                   |



## to_timestamp

## to_timestamp_millis

## to_timestamp_micros

## to_timestamp_seconds

## from_unixtime

## time_window
