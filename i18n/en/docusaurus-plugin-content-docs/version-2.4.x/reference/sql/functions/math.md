---
sidebar_position: 1
---

# Math Functions

Math functions are a collection of functions used to perform various mathematical operations and calculations.They include basic arithmetic functions (such as addition, subtraction, multiplication, division), trigonometric functions (such as sin, cos, tan), exponential functions, logarithmic functions, etc.These functions can help you perform numerical calculations, solve mathematical problems, and create mathematical models.

## abs

Returns the absolute value of a number.

```sql
abs(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>abs</code> Example</summary>

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

Return the inverse cosine of a number.

```
acos(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>acos</code> Example</summary>

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

Returns the hyperbolic cosine or hyperbolic cosecant of a number.

```sql
acosh(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>acosh</code> Example</summary>

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

Returns the arcsine of a number.

```sql
asin(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>asin</code> Example</summary>

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

Returns the area hyperbolic sine or inverse hyperbolic sine of a number.

```sql
asinh(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>asinh</code> Example</summary>

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

Returns the arctangent of a number.

```sql
atan(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>atan</code> Example</summary>

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

Returns the hyperbolic tangent or inverse hyperbolic tangent of a number.

```sql
atanh(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>atanh</code> Example</summary>

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

Return the arctangent of `expression_y / expression_x`

```sql
atan2(expression_y, expression_x)
```

| Parameters     | Description                                                                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression_y` | The first numerical expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators.  |
| `expression_x` | The second numerical expression to operate.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>atan2</code> Example</summary>

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

Return the cube root of a number.

```sql
cbrt(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>cbrt</code> Example</summary>

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

Round up.

```
ceil(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>ceil</code> Example</summary>

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

Returns the cosine of a number.

```
cos(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>cos</code> Example</summary>

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

Returns the hyperbolic cosine of a number.

```
cosh(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>cosh</code> Example</summary>

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

Returns the exponential of a number with base e.

```
exp(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>exp</code> Example</summary>

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

Factorial.If the value is less than 2, return 1.

```sql
factorial(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>factorial</code> Example</summary>

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

Floor.

```sql
floor(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>floor</code> Example</summary>

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

Returns the greatest common divisor of `expression_x` and `expression_y`.If both inputs are zero, return 0.

```sql
gcd(expression_x, expression_y)
```

| Parameters     | Description                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `expression_x` | Can be a constant, column, or function, and any combination of arithmetic operators. |
| `expression_y` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>gcd</code> Example</summary>

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

Returns the least common multiple of `expression_x` and `expression_y`.If any input value is zero, return 0.

```sql
lcm(expression_x, expression_y)
```

| Parameters     | Description                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `expression_x` | Can be a constant, column, or function, and any combination of arithmetic operators. |
| `expression_y` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>lcm</code> Example</summary>

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

Returns the natural logarithm of a number.

```sql
ln(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>ln</code> Example</summary>

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

Returns the base x logarithm of a number.Can provide a specified radix, or if omitted, defaults to a radix of 10.

```sql
log(base, numeric_expression)
log(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`               | Cardinality: Can be a constant, column, or function, and any combination of arithmetic operators.             |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>log</code> Example</summary>

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

Returns the base 10 logarithm of a number.

```sql {1}
log10(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>log10</code> Example</summary>

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

Return the base 2 logarithm of a number.

```sql
log2(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>log2</code> Example</summary>

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

Return the approximate value of π.

```sql
pi()
```

<details>
  <summary>View <code>pi</code> Example</summary>

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

Returns the exponentiation of a base expression.

```sql
power(base, exponent)
```

| Parameters | Description                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `base`     | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators.                                  |
| `exponent` | The numerical expression of the exponent to be calculated.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>power</code> Example</summary>

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

Alias for [power](#power)

## radians

Converts degrees to radians.

```sql
radians(numeric_expression)
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>radians</code> Example</summary>

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

Returns a random floating-point value within the range of 0 to -1.The random seed is unique for each row.

```sql
random()
```

<details>
  <summary>View <code>random</code> Example</summary>

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

Round the number to the nearest integer.

```
round(numeric_expression[, decimal_places])
```

| Parameters           | Description                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Expression to operate on.Can be a constant, column, or function, and any combination of arithmetic operators. |
| `decimal_places`     | Decimal places: Optional.Number of decimal places to round to.Default is 0.   |

<details>
  <summary>View <code>round</code> Example</summary>

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

Return the sign of a number.Negative numbers return `-1`.Zero and positive number return `1`.

```sql
signum(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>signum</code> Example</summary>

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

Return the sine value of a number.

```sql
sin(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>sin</code> Example</summary>

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

Returns the hyperbolic sine of a number.

```sql
sinh(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>sinh</code> Example</summary>

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

Return the square root of a number.

```sql
sqrt(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>sqrt</code> Example</summary>

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

Returns the tangent value of a number.

```sql
tan(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>tan</code> Example</summary>

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

Return the hyperbolic tangent value of a number.

```sql
tanh(numeric_expression)
```

| Parameters           | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>tanh</code> Example</summary>

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

Truncate a number to an integer or truncate to the specified number of decimal places.

```sql
trunc(numeric_expression[, decimal_places])
```

| Parameters           | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `numeric_expression` | Can be a constant, column, or function, and any combination of arithmetic operators.                                                                                                                                                                                                                                                                                                                             |
| `decimal_places`     | Decimal places: Optional.The number of decimal places to truncate to.Default is 0 (truncated to an integer).If `decimal_places` is a positive integer, truncate digits to the right of the decimal point.If `decimal_places` is a negative integer, replace digits to the left of the decimal point with `0`. |

<details>
  <summary>View <code>trunc</code> Example</summary>

```sql {1}
SELECT trunc(3.1415926, 2);
```

</details>
