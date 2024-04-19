---
sidebar_position: 2
---

# Reference

The usage of identifiers, literals, and arithmetic operators in CnosDB, as well as some commonly used operators in SQL.Also introduces the precedence of operators and some other related content.

## Identifiers

Used to name database objects, such as `table` and `column` names.

## Quoting

Use double quotes on [identifiers](#identifiers) to treat them as case-sensitive. Use single quotes on string literals.

Identifiers without quotation marks are not case-sensitive in CnosDB.

## Literals

A literal is an explicit value not represented by an [identifier](#identifiers).

#### String literals

String literals are surrounded by single quotes.

```sql
'station'
'temperature'
'H2o'
'avg temperature'
```

#### Numeric Literals

Number literals are positive or negative numbers that are either exact numbers or floats.

```sql
-- Integers
10
+10
-10

-- Unsigned integers
10::BIGINT UNSIGNED
+10::BIGINT UNSIGNED

-- Floats
10.78654
-100.56
```

#### Date/Time Types Literals

The following date and time literals are supported:

```sql
'2022-01-31T06:30:30.123Z'     -- RFC3339
'2022-01-31T06:30:30.123'      -- RFC3339-like
'2022-01-31 06:30:30.123'      -- RFC3339-like
'2022-01-31 06:30:30'          -- RFC3339-like, no fractional seconds
1643610630123000000            -- Unix epoch nanosecond cast to a timestamp
```

#### Boolean literals

Boolean literals are either `true` or `false`.

#### Duration units

Interval literals specify a length or unit of time.

```sql
INTERVAL '6 minute'
INTERVAL '12 day 6 hour 30 minute'
```

The following units of time are supported:

- nanoseconds
- microseconds
- milliseconds
- second
- minute
- hour
- day
- week
- month
- year
- decade
- century

## Operators

### Arithmetic operators

#### -

Addition.

```sql {1}
SELECT 1 + 2;
+---------------------+
| Int64(1) + Int64(2) |
+---------------------+
| 3                   |
+---------------------+
```

**-**

Subtraction.

```sql {1}
SELECT 4 - 3;
+---------------------+
| Int64(4) - Int64(3) |
+---------------------+
| 1                   |
+---------------------+
```

**\***

Multiplication.

```sql {1}
SELECT 2 * 3;
+---------------------+
| Int64(2) * Int64(3) |
+---------------------+
| 6                   |
+---------------------+
```

**/**

Division.

```sql {1}
SELECT 8 / 4;
+---------------------+
| Int64(8) / Int64(4) |
+---------------------+
| 2                   |
+---------------------+
```

**%**

Modulus.

```sql {1}
SELECT 7 % 3;
+---------------------+
| Int64(7) % Int64(3) |
+---------------------+
| 1                   |
+---------------------+
```

### Comparison Operators

**=**

Equal to.

```sql {1}
SELECT 1 = 1;
+---------------------+
| Int64(1) = Int64(1) |
+---------------------+
| true                |
```

**!=**

Not equal to.

```sql {1}
SELECT 1 != 2;
+----------------------+
| Int64(1) != Int64(2) |
+----------------------+
| true                 |
+----------------------+
```

**<**

Less than.

```sql {1}
SELECT 3 < 4;
+---------------------+
| Int64(3) < Int64(4) |
+---------------------+
| true                |
+---------------------+
```

**<=**

Less than or equal to.

```sql {1}
SELECT 3 <= 3;
+----------------------+
| Int64(3) <= Int64(3) |
+----------------------+
| true                 |
+----------------------+
```

**>**

Greater than.

```sql {1}
SELECT 6 > 5;
+---------------------+
| Int64(6) > Int64(5) |
+---------------------+
| true                |
+---------------------+
```

**>=**

Less than or equal to.

```sql {1}
SELECT 5 >= 5;
+----------------------+
| Int64(5) >= Int64(5) |
+----------------------+
| true                 |
+----------------------+
```

**IS DISTINCT FROM**

Ensure that the comparison result is `true` or `false` and not an empty set.

```sql {1}
SELECT 0 IS DISTINCT FROM NULL;
+--------------------------------+
| Int64(0) IS DISTINCT FROM NULL |
+--------------------------------+
| true                           |
+--------------------------------+
```

**IS NOT DISTINCT FROM**

Negation condition of `IS DISTINCT FROM`.

```sql {1}
SELECT NULL IS NOT DISTINCT FROM NULL;
+--------------------------------+
| NULL IS NOT DISTINCT FROM NULL |
+--------------------------------+
| true                           |
+--------------------------------+
```

**~**

Matches a regular expression.

```sql {1}
SELECT 'cnosdb' ~ '^cnosdb(-cli)*';
+-----------------------------------------+
| Utf8("cnosdb") ~ Utf8("^cnosdb(-cli)*") |
+-----------------------------------------+
| true                                    |
+-----------------------------------------+
```

**~**\*

Matches a regular expression (case-insensitive).

```sql {1}
SELECT 'cnosdb' ~* '^CNOSDB(-cli)*';
+------------------------------------------+
| Utf8("cnosdb") ~* Utf8("^CNOSDB(-cli)*") |
+------------------------------------------+
| true                                     |
+------------------------------------------+
```

**!~**

In contrast to **～**.

```sql {1}
SELECT 'cnosdb' !~ '^CNOSDB(-cli)*';
+------------------------------------------+
| Utf8("cnosdb") !~ Utf8("^CNOSDB(-cli)*") |
+------------------------------------------+
| true                                     |
+------------------------------------------+
```

**!~**\*

In contrast to **～**\*.

```sql {1}
SELECT 'cnosdb' !~* '^CNOSDB(-cli)+';
+-------------------------------------------+
| Utf8("cnosdb") !~* Utf8("^CNOSDB(-cli)+") |
+-------------------------------------------+
| true                                      |
+-------------------------------------------+
```

### Logical operators

**AND**

```sql {1}
SELECT true AND true;
+---------------------------------+
| Boolean(true) AND Boolean(true) |
+---------------------------------+
| true                            |
+---------------------------------+
```

**OR**

```sql {1}
SELECT false OR true;
+---------------------------------+
| Boolean(false) OR Boolean(true) |
+---------------------------------+
| true                            |
+---------------------------------+
```

### Bitwise operators

**&**

Bitwise and

```sql {1}
SELECT 5 & 3;
+---------------------+
| Int64(5) & Int64(3) |
+---------------------+
| 1                   |
+---------------------+
```

**｜**

Bitwise or

```sql {1}
SELECT 5 | 3;
+---------------------+
| Int64(5) | Int64(3) |
+---------------------+
| 7                   |
+---------------------+
```

### Other Operators

**||**

String concatenation.

```sql {1}
SELECT 'Hello, ' || 'CnosDB!';
+------------------------------------+
| Utf8("Hello, ") || Utf8("CnosDB!") |
+------------------------------------+
| Hello, CnosDB!                     |
+------------------------------------+
```

### 运算符优先级

If a complex expression has multiple operators, the operator precedence will determine the sequence of operations. The execution order may have a significant impact on the result value.

The priority of operators is shown in the table below. Evaluate higher-level operators before lower-level operators. In the table below, 1 represents the highest level, and 8 represents the lowest level.

| Level | Operators                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | - (multiply), / (divide), % (modulo)                                                                |
| 2     | * (positive), - (negative), + (add), + (series), - (subtract) |
| 3     | =、>=、<=、&lt>、!=、>、<（比较运算符）                                                                                                               |
| 4     | NOT                                                                                                                                                          |
| 5     | AND                                                                                                                                                          |
| 6     | BETWEEN、IN、LIKE、OR                                                                                                                                           |

## Reserved words

## Expression

An expression is a combination of symbols and operators that CnosDB processes to obtain a single data value. A simple expression can be a constant, variable, column, or scalar function. You can use operators to combine two or more simple expressions into a complex expression.

```sql
<expresion> :: = { 
    constant 
    | [ table_name. ] column   
    | scalar_function 
    | ( expression ) 
    | expression { binary_operator } expression   
    | case_when_expression
    | window_function | aggregate_function  
}
```

#### Constant

Symbol representing a specific data value.详细内容请参考 [字面量](#字面量)

#### Scalar function

请参考 [函数](./functions)

#### 单目运算符

| Operators     | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `NOT`         | 如果子表达式为 `true`，则整个表达式 `false`，如果整个表达式为 `false`，则整个表达式为`true`。 |
| `IS NULL`     | 如果子表达式为 `null`，则整个表达式为 `true`。                                |
| `IS NOT NULL` | 如果子表达式为 `null`，则整个表达式为 `false`。                               |

#### Binary Operators

Binary operators combine two expressions to form a new expression.

Supported binary operators are:

| Operators                     | Description                                                                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `+`                           | Add numerical type expressions.                                                                                                                 |
| `-`                           | Subtract numerical type expressions.                                                                                                            |
| `*`                           | Multiply numerical type expressions.                                                                                                            |
| `/`                           | Divide numerical type expressions.                                                                                                              |
| `%`                           | Integer type expression takes remainder.                                                                                                        |
| \|&#124   | String type expression splicing.                                                                                                                |
| `=`                           | Compare if the expressions are equal.                                                                                                           |
| `!=`、&lt> | Compare if the expressions are not equal.                                                                                                       |
| `<`                           | Compare if the expression is less than.                                                                                                         |
| `<=`                          | Compare if the expression is less than or equal to.                                                                                             |
| `>`                           | Compare if the expressions are greater than.                                                                                                    |
| `>=`                          | Compare if the expressions are greater than or equal to.                                                                                        |
| `AND`                         | First, evaluate the left expression, if it is `true`, calculate the value of the right expression, if both are `true`, the result is `true`.    |
| `OR`                          | First, evaluate the left expression, if it is `false`, calculate the value of the right expression, if both are `false`, the result is `false`. |
| `LIKE`                        | Determine if the left expression matches the pattern of the right expression.                                                                   |

#### `BETWEEN AND`

Equivalent to `WHERE >= expr AND WHERE <= expr`

```sql
expr BETWEEN expr AND expr
```

**Return records in the `air` table where the `pressure` field is between 50 - 60.**

```sql
SELECT DISTINCT perssure FROM air WHERE perssure BETWEEN 50 AND 60;
```

#### `IN`

Determine if there is a value in the list that is equal to the expression.

:::tip

The `IN` list currently only supports constants.

:::

**Determine if the value of the `temperature` field in the `air` table is contained within `(68, 69)`.**

```sql
SELECT station, temperature, visibility FROM air WHERE temperature  IN (68, 69);
```

#### `CASE WHEN`

When the expression needs to obtain different values according to different situations, you can use the `CASE WHEN` expression.

```sql
CASE
    ( WHEN expression THEN result1 [, ...] )
    ELSE result
END;
```

**View example.**

```sql
SELECT DISTINCT 
    CASE WHEN PRESSURE >= 60 THEN 50 
         ELSE PRESSURE 
    END PRESSURE 
FROM AIR;
```

## Comments

- Single-line comments use double hyphen `--` symbol.Single-line comments end with a newline character.
- Multi-line comments start with `/*` and end with `*/`.

```sql
-- Single-line comment

/* 
 * Multi-line comment
 */
```
