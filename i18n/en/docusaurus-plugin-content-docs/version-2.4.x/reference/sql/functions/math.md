---
sidebar_position: 1
---

# 数学函数

数学函数是用于执行各种数学运算和计算的函数集合。它们包括基本的算术运算函数（如加法、减法、乘法、除法），三角函数（如正弦、余弦、正切）、指数函数、对数函数等。这些函数可以帮助你进行数值计算、解决数学问题和创建数学模型。

## abs

返回数值的绝对值。

```sql
abs(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>abs</code> 示例</summary>

```sql {1}
SELECT abs(-10);
+-----------------+
| abs(Int64(-10)) |
+-----------------+
| 10.0            |
+-----------------+
```

</details>

## acos

返回数值反余弦。

```
acos(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>acos</code> 示例</summary>

```sql {1}
SELECT acos(0.5);
+--------------------+
| acos(Float64(0.5)) |
+--------------------+
| 1.0471975511965979 |
+--------------------+
```

</details>

## acosh

返回数字的面积双曲余弦或反双曲余弦。

```sql
acosh(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>acosh</code> 示例</summary>

```sql {1}
SELECT acosh(10);
+-------------------+
| acosh(Int64(10))  |
+-------------------+
| 2.993222846126381 |
+-------------------+
```

</details>

## asin

返回数字的反正弦。

```sql
asin(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>asin</code> 示例</summary>

```sql {1}
SELECT asin(1);
+--------------------+
| asin(Int64(1))     |
+--------------------+
| 1.5707963267948966 |
+--------------------+
```

</details>

## asinh

返回数字的面积双曲正弦或反双曲正弦。

```sql
asinh(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>asinh</code> 示例</summary>

```sql {1}
SELECT asinh(1);
+-------------------+
| asinh(Int64(1))   |
+-------------------+
| 0.881373587019543 |
+-------------------+
```

</details>

## atan

返回数字的反正切。

```sql
atan(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>atan</code> 示例</summary>

```sql {1}
SELECT atan(1);
+--------------------+
| atan(Int64(1))     |
+--------------------+
| 0.7853981633974483 |
+--------------------+
```

</details>

## atanh

返回数字的面积双曲正切或反双曲正切。

```sql
atanh(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>atanh</code> 示例</summary>

```sql {1}
SELECT atanh(0.3);
+---------------------+
| atanh(Float64(0.3)) |
+---------------------+
| 0.30951960420311175 |
+---------------------+
```

</details>

## atan2

返回 `expression_y / expression_x` 的反正切

```sql
atan2(expression_y, expression_x)
```

| Parameters     | Description                           |
| -------------- | ------------------------------------- |
| `expression_y` | 要操作的第一个数值表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |
| `expression_x` | 要操作的第二个数值表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>atan2</code> 示例</summary>

```sql {1}
SELECT atan2(10, 2);
+---------------------------+
| atan2(Int64(10),Int64(2)) |
+---------------------------+
| 1.3734008                 |
+---------------------------+
```

</details>

## cbrt

返回数字的立方根。

```sql
cbrt(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>cbrt</code> 示例</summary>

```sql {1}
SELECT cbrt(8);
+----------------+
| cbrt(Int64(8)) |
+----------------+
| 2.0            |
+----------------+
```

</details>

## ceil

向上取整。

```
ceil(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>ceil</code> 示例</summary>

```sql {1}
SELECT ceil(1.6);
+--------------------+
| ceil(Float64(1.6)) |
+--------------------+
| 2.0                |
+--------------------+
```

</details>

## cos

返回数值的余弦。

```
cos(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>cos</code> 示例</summary>

```sql {1}
SELECT cos(1);
+--------------------+
| cos(Int64(1))      |
+--------------------+
| 0.5403023058681398 |
+--------------------+
```

</details>

## cosh

返回数值的双曲余弦。

```
cosh(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>cosh</code> 示例</summary>

```sql {1}
SELECT cosh(2);
+--------------------+
| cosh(Int64(2))     |
+--------------------+
| 3.7621956910836314 |
+--------------------+
```

</details>

## exp

返回数字的以 e 为底的指数。

```
exp(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>exp</code> 示例</summary>

```sql {1}
SELECT exp(1);
+-------------------+
| exp(Int64(1))     |
+-------------------+
| 2.718281828459045 |
+-------------------+
```

</details>

## factorial

阶乘。如果值小于 2，则返回 1。

```sql
factorial(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>factorial</code> 示例</summary>

```sql {1}
SELECT factorial(5);
+---------------------+
| factorial(Int64(5)) |
+---------------------+
| 120                 |
+---------------------+
```

</details>

## floor

向下取整。

```sql
floor(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>floor</code> 示例</summary>

```sql {1}
SELECT floor(-3.1);
+----------------------+
| floor(Float64(-3.1)) |
+----------------------+
| -4.0                 |
+----------------------+
```

</details>

## gcd

返回 `expression_x` 和 `expression_y` 的最大公约数。如果两个输入均为零，则返回 0。

```sql
gcd(expression_x, expression_y)
```

| Parameters     | Description                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `expression_x` | Can be a constant, column, or function, and any combination of arithmetic operators. |
| `expression_y` | 可以是常数、列或函数，也可以是算术运算符的任意组合。                                                                           |

<details>
  <summary>查看 <code>gcd</code> 示例</summary>

```sql {1}
SELECT gcd(24,36);
+--------------------------+
| gcd(Int64(24),Int64(36)) |
+--------------------------+
| 12                       |
+--------------------------+
```

</details>

## lcm

返回 `expression_x` 和 `expression_y` 的最小公倍数。如果任一输入值为零，则返回 0。

```sql
lcm(expression_x, expression_y)
```

| Parameters     | Description                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `expression_x` | Can be a constant, column, or function, and any combination of arithmetic operators. |
| `expression_y` | 可以是常数、列或函数，也可以是算术运算符的任意组合。                                                                           |

<details>
  <summary>查看 <code>lcm</code> 示例</summary>

```sql {1}
SELECT lcm(4, 7);
+------------------------+
| lcm(Int64(4),Int64(7)) |
+------------------------+
| 28                     |
+------------------------+
```

</details>

## ln

返回数字的自然对数。

```sql
ln(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>ln</code> 示例</summary>

```sql {1}
SELECT ln(5);
+--------------------+
| ln(Int64(5))       |
+--------------------+
| 1.6094379124341003 |
+--------------------+
```

</details>

## log

返回数字的 x 底对数。可以提供指定的基数，或者如果省略，则采用数字的基数 10。

```sql
log(base, numeric_expression)
log(numeric_expression)
```

| Parameters           | Description                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `base`               | 基数：可以是常数、列或函数，也可以是算术运算符的任意组合。                                                                                  |
| `numeric_expression` | 要操作的数字表达式。Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>log</code> 示例</summary>

```sql {1}
SELECT log(10, 2);
+-------------------------+
| log(Int64(10),Int64(2)) |
+-------------------------+
| 0.30102998              |
+-------------------------+
```

</details>

## log10

返回数字的以 10 为底的对数。

```sql {1}
log10(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>log10</code> 示例</summary>

```sql {1}
SELECT log10(2);
+--------------------+
| log10(Int64(2))    |
+--------------------+
| 0.3010299956639812 |
+--------------------+
```

</details>

## log2

返回一个数字的基 2 对数。

```sql
log2(numeric_expression)
```

| Parameters           | Description                        |
| -------------------- | ---------------------------------- |
| `numeric_expression` | 要操作的数字表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>log2</code> 示例</summary>

```sql {1}
SELECT log2(2);
+----------------+
| log2(Int64(2)) |
+----------------+
| 1.0            |
+----------------+
```

</details>

## pi

返回 π 的近似值。

```sql
pi()
```

<details>
  <summary>查看 <code>pi</code> 示例</summary>

```sql {1}
SELECT pi();
+-------------------+
| pi()              |
+-------------------+
| 3.141592653589793 |
+-------------------+
```

</details>

## power

返回基数表达式的指数幂。

```sql
power(base, exponent)
```

| Parameters | Description                          |
| ---------- | ------------------------------------ |
| `base`     | 要操作的数值表达式。可以是常量、列或函数，以及算术运算符的任意组合。   |
| `exponent` | 要运算的指数数值表达式。可以是常量、列或函数，以及算术运算符的任意组合。 |

<details>
  <summary>查看 <code>power</code> 示例</summary>

```sql {1}
SELECT power(10, 2);
+---------------------------+
| power(Int64(10),Int64(2)) |
+---------------------------+
| 100                       |
+---------------------------+
```

</details>

## pow

[power](#power) 的别名

## radians

将度数转换为弧度。

```sql
radians(numeric_expression)
```

| Parameters           | Description                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | 要操作的数字表达式。Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>radians</code> 示例</summary>

```sql {1}
SELECT radians(10);
+---------------------+
| radians(Int64(10))  |
+---------------------+
| 0.17453292519943295 |
+---------------------+
```

</details>

## random

返回 0 -1 范围内的随机浮点值。随机种子对于每一行都是唯一的。

```sql
random()
```

<details>
  <summary>查看 <code>random</code> 示例</summary>

```sql {1}
SELECT random();
+--------------------+
| random()           |
+--------------------+
| 0.9232278829675913 |
+--------------------+
```

</details>

## round

将数字四舍五入为最接近的整数。

```
round(numeric_expression[, decimal_places])
```

| Parameters           | Description                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | 要操作的数字表达式。Can be a constant, column, or function, and any combination of arithmetic operators. |
| `decimal_places`     | 小数位：可选。要舍入的小数位数。默认为 0。                                                                                         |

<details>
  <summary>查看 <code>round</code> 示例</summary>

```sql {1}
SELECT round(2.3);
+---------------------+
| round(Float64(2.3)) |
+---------------------+
| 2.0                 |
+---------------------+
```

</details>

## signum

返回数字的符号。负数返回 `-1`。零和正数返回 `1`。

```sql
signum(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>signum</code> 示例</summary>

```sql {1}
SELECT signum(10);
+-------------------+
| signum(Int64(10)) |
+-------------------+
| 1.0               |
+-------------------+
```

</details>

## sin

返回一个数字的正弦值。

```sql
sin(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>sin</code> 示例</summary>

```sql {1}
SELECT sin(5);

+---------------------+
| sin(Int64(5))       |
+---------------------+
| -0.9589242746631385 |
+---------------------+
```

</details>

## sinh

返回一个数字的双曲正弦值。

```sql
sinh(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>sinh</code> 示例</summary>

```sql {1}
SELECT sinh(2);
+-------------------+
| sinh(Int64(2))    |
+-------------------+
| 3.626860407847019 |
+-------------------+
```

</details>

## sqrt

返回一个数字的平方根。

```sql
sqrt(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>sqrt</code> 示例</summary>

```sql {1}
SELECT sqrt(25);
+-----------------+
| sqrt(Int64(25)) |
+-----------------+
| 5.0             |
+-----------------+
```

</details>

## tan

返回一个数字的正切值。

```sql
tan(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>tan</code> 示例</summary>

```sql {1}
SELECT tan(10);
+--------------------+
| tan(Int64(10))     |
+--------------------+
| 0.6483608274590866 |
+--------------------+
```

</details>

## tanh

返回一个数字的双曲正切值。

```sql
tanh(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>查看 <code>tanh</code> 示例</summary>

```sql {1}
SELECT tanh(10);
+--------------------+
| tanh(Int64(10))    |
+--------------------+
| 0.9999999958776927 |
+--------------------+
```

</details>

## trunc

将数字截断为整数或截断至指定的小数位。

```sql
trunc(numeric_expression[, decimal_places])
```

| Parameters           | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators.     |
| `decimal_places`     | 小数位：可选。要截断到的小数位数。默认为 0（截断为整数）。如果`decimal_places`是正整数，则截断小数点右侧的数字。如果`decimal_places`是负整数，则用`0`替换小数点左边的数字。 |

<details>
  <summary>查看 <code>trunc</code> 示例</summary>

```sql {1}
SELECT trunc(3.1415926, 2);
```

</details>
