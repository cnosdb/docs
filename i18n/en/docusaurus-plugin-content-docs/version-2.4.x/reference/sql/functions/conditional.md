---
sidebar_position: 2
---

# Conditional Functions

Conditional functions are a collection of functions used to perform different operations based on specific conditions.They include conditional statements, which can help you choose to execute different code logic based on different situations.Conditional functions are very useful for implementing program flow control and decision making.

## coalesce

Returns its first non-null argument.If all parameters are `null`, then return `null`.This function is typically used to replace default values with `null` values.

```sql
coalesce(expression1[, ..., expression_n])
```

| Parameters                       | Description                                                                                                                                                                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression1`,    `expression_n` | If the previous expression is `null`, then use the expression.Can be a constant, column, or function, and any combination of arithmetic operators.Pass as many expression parameters as needed. |

<details>
  <summary>View <code>coalesce</code> Example</summary>

```sql {1}
SELECT coalesce(temperature, null, station) FROM air;
+--------------------------------------------+
| coalesce(air.temperature,NULL,air.station) |
+--------------------------------------------+
| 69.0                                       |
| 78.0                                       |
| 62.0                                       |
| 79.0                                       |
| 53.0                                       |
| 72.0                                       |
| 71.0                                       |
| 69.0                                       |
| 80.0                                       |
| 74.0                                       |
| 70.0                                       |
| 70.0                                       |
| 70.0                                       |
+--------------------------------------------+
```

</details>

## nullif

If `expression1` is equal to `expression2`, it returns `null`; otherwise, it will return `expression1`.The inverse operation that can be used to perform `coalesce`.

```sql
nullif(expression1, expression2)
```

| Parameters    | Description                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression1` | If equal to `expression2`, the expression to be compared and returned.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `expression2` | The expression to compare with `expression1`.Can be a constant, column, or function, and any combination of arithmetic operators.                          |

<details>
  <summary>View <code>nullif</code> Example</summary>

```sql {1}
SELECT nullif(temperature, 70) FROM air;
+-----------------------------------+
| nullif(air.temperature,Int64(70)) |
+-----------------------------------+
| 69                                |
| 78                                |
| 62                                |
| 79                                |
| 53                                |
| 72                                |
| 71                                |
| 69                                |
| 80                                |
| 74                                |
|                                   |
|                                   |
|                                   |
+-----------------------------------+
```

</details>
