---
sidebar_position: 2
---

# Reference

The usage of identifiers, literals, and arithmetic operators in CnosDB, as well as some commonly used operators in SQL.At the same time, it also introduces the priority of operators and some other related content.

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

#### Numeric literals

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

#### Date and time literals

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

如果一个复杂表达式有多个运算符，则运算符优先级将确定操作序列。 执行顺序可能对结果值有明显的影响。

运算符的优先级别如下表中所示。 在较低级别的运算符之前先对较高级别的运算符进行求值。 在下表中，1 代表最高级别，8 代表最低级别。

| 级别 | 运算符                                            |
| -- | ---------------------------------------------- |
| 1  | \*（乘）、/（除）、%（取模）                               |
| 2  | +（正）、-（负）、+（加）、+（串联）、-（减）                      |
| 3  | =、>=、<=、&lt>、!=、>、<（比较运算符） |
| 4  | NOT                                            |
| 5  | AND                                            |
| 6  | BETWEEN、IN、LIKE、OR                             |

## 保留字

## 表达式

表达式是符号和运算符的一种组合，CnosDB 处理该组合以获得单个数据值。 简单表达式可以是一个常量、变量、列或标量函数。 可以用运算符将两个或更多的简单表达式联接起来组成复杂表达式。

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

#### 常量

表示单个特定数据值的符号。详细内容请参考 [文字](#文字)

#### 标量函数

请参考 [函数](./functions)

#### 单目运算符

| 运算符           | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `NOT`         | 如果子表达式为 `true`，则整个表达式 `false`，如果整个表达式为 `false`，则整个表达式为`true`。 |
| `IS NULL`     | 如果子表达式为 `null`，则整个表达式为 `true`。                                |
| `IS NOT NULL` | 如果子表达式为 `null`，则整个表达式为 `false`。                               |

#### 二元运算符

二元运算符和两个表达式组合在一起，可以组成一个新的表达式。

支持的二元运算符有：

| 运算符                           | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| `+`                           | 数字类型表达式相加。                                          |
| `-`                           | 数字类型表达式相减。                                          |
| `*`                           | 数字类型表达式相乘。                                          |
| `/`                           | 数字类型表达式相除。                                          |
| `%`                           | 整数类型表达式取余。                                          |
| \|&#124   | 字符串类型表达式拼接。                                         |
| `=`                           | 比较表达式是否相等。                                          |
| `!=`、&lt> | 比较表达式是否不相等。                                         |
| `<`                           | 比较表达式是否小于。                                          |
| `<=`                          | 比较表达式是否小于等于。                                        |
| `>`                           | 比较表达式是否大于。                                          |
| `>=`                          | 比较表达式是否大于等于。                                        |
| `AND`                         | 先求左表达式的值，如果为 `true`，计算右表达式的值，都为 `true` 为`true`。     |
| `OR`                          | 先求左表达式的值，如果为 `false`，计算右表达式的值，都为 `false` 为 `false`。 |
| `LIKE`                        | 判断左表达式是否符合右表达式的模式。                                  |

#### `BETWEEN AND`

等价于 `WHERE >= expr AND WHERE <= expr`

```sql
expr BETWEEN expr AND expr
```

**返回 `air` 表中 `perssure` 字段在 50 - 60 之间的记录。**

```sql
SELECT DISTINCT perssure FROM air WHERE perssure BETWEEN 50 AND 60;
```

#### `IN`

判断列表中是否有值与表达式相等。

:::tip

`IN` 列表暂时只支持常量。

:::

**判断 `air` 表中 `temperature` 字段的值被  `(68, 69)` 包含。**

```sql
SELECT station, temperature, visibility FROM air WHERE temperature  IN (68, 69);
```

#### `CASE WHEN`

当表达式需要按照不同情况获取不同的值时，可以使用 `CASE WHEN` 表达式。

```sql
CASE
    ( WHEN expression THEN result1 [, ...] )
    ELSE result
END;
```

**查看示例。**

```sql
SELECT DISTINCT 
    CASE WHEN PRESSURE >= 60 THEN 50 
         ELSE PRESSURE 
    END PRESSURE 
FROM AIR;
```

## 注释

- 单行注释使用双连字符 `--` 符号。单行注释以换行符结尾。
- 多行注释以 `/*` 开头，以 `*/` 结尾。

```sql
-- 单行注释

/* 
 * 多行注释
 */
```
