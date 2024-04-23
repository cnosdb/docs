---
sidebar_position: 9
---

# Quality functions

Used to assess the quality of time series data

## Sample Data

<details>
  <summary>View example</summary>

```sql {1-3}
CREATE TABLE wzz(value double);
INSERT wzz VALUES (1,  12.34), (3, 34.54 ), (4, 1.43), (6, 14.03), (10, 12.30), (13, 11.54), (14,  112.20), (16, 14.44), (18,  134.02), (19, 116.34), (22, 1234.45),  (24,10.36), (26, 124.21),  (31, 6.34), (33, acos(12345));
SELECT * FROM wzz;
+-------------------------------+---------+
| time                          | value   |
+-------------------------------+---------+
| 1970-01-01T00:00:00.000000001 | 12.34   |
| 1970-01-01T00:00:00.000000003 | 34.54   |
| 1970-01-01T00:00:00.000000004 | 1.43    |
| 1970-01-01T00:00:00.000000006 | 14.03   |
| 1970-01-01T00:00:00.000000010 | 12.3    |
| 1970-01-01T00:00:00.000000013 | 11.54   |
| 1970-01-01T00:00:00.000000014 | 112.2   |
| 1970-01-01T00:00:00.000000016 | 14.44   |
| 1970-01-01T00:00:00.000000018 | 134.02  |
| 1970-01-01T00:00:00.000000019 | 116.34  |
| 1970-01-01T00:00:00.000000022 | 1234.45 |
| 1970-01-01T00:00:00.000000024 | 10.36   |
| 1970-01-01T00:00:00.000000026 | 124.21  |
| 1970-01-01T00:00:00.000000031 | 6.34    |
| 1970-01-01T00:00:00.000000033 | NaN     |
+-------------------------------+---------+
```

</details>

## completeness

Used to calculate the integrity of time series, which measures the proportion of data that is not missing.

:::tip

The function `completeness` first counts the number of rows of data, cnt.Then consider the possibility of NaN and Inf in the data column, perform linear smoothing on them, and count the special values specialcnt.Then scan the data to calculate the missing count misscnt.The formula for calculating completeness is

$$
1 - \frac{misscnt + specialcnt} {cnt + misscnt}
$$

:::

```sql
completeness(time_expresion, numeric_expression)
```

| Options              | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expresion`     | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.       |

<details>
  <summary>View example</summary>

The following example uses the [example data](#example-data) that starts this document.

**Querying the integrity of time series data:**

```sql {1}
SELECT completeness(time, value) FROM wzz;
+----------------------------------+
| completeness(wzz.time,wzz.value) |
+----------------------------------+
| 0.8235294117647058               |
+----------------------------------+
```

</details>

## consistency

Calculate the consistency of time series, which measures the proportion of sparsely redundant evenly distributed time series data.

```sql
consistency(time_expresion, numeric_expression)
```

| Options              | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expresion`     | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.       |

:::tip

With the same function `completeness`, after missing value filling, redundancy is calculated by scanning the data for redundant counts.The calculation formula for consistency consistency is:

$$
1 - \frac{redundancycnt} {cnt}
$$

:::

<details>
  <summary>View example</summary>

The following example uses the [example data](#example-data) that starts this document.

```sql {1}
SELECT consistency(time, value) FROM wzz;
+---------------------------------+
| consistency(wzz.time,wzz.value) |
+---------------------------------+
| 0.8666666666666667              |
+---------------------------------+
```

</details>

## timeliness

Used to calculate the timeliness of time series, which measures the proportion of timely arrival of time series data without delay.

```sql
timeliness(time_expresion, numeric_expression)
```

| Options              | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expresion`     | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.       |

:::tip

With the same function `completeness`, after missing value filling, latecnt is calculated by scanning the data for redundant counts.The calculation formula for timeliness `timeliness`:

$$
1 - \frac{latecnt}{cnt}
$$

:::

<details>
  <summary>View example</summary>

The following example uses the [example data](#example-data) that starts this document.

```sql {1}
SELECT timeliness(time, value) FROM wzz;
+--------------------------------+
| timeliness(wzz.time,wzz.value) |
+--------------------------------+
| 0.9333333333333333             |
+--------------------------------+
```

</details>

## validity

Used to calculate the effectiveness of time series, which measures the proportion of data satisfying the constraints.

```sql
validity(time_expresion, numeric_expression)
```

| Options              | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time_expresion`     | The time expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.       |

:::tip
首先统计数据的行数 cnt 。然后进行缺失值填充，去除其中的 NaN 和 Inf 。然后通过自定义计算方法得到计数 valuecnt、variationcnt、speedcnt、speedchangecnt 。则有效性 validity 的计算公式：

$$
1 - \frac{0.25 * (valuecnt + variationcnt + speedcnt + speedchangecnt)}{cnt}
$$

:::

<details>
  <summary>View example</summary>

The following example uses the [example data](#example-data) that starts this document.

```sql {1}
SELECT validity(time, value) FROM wzz;
+------------------------------+
| validity(wzz.time,wzz.value) |
+------------------------------+
| 0.8                          |
+------------------------------+
```

</details>
