---
title: Aggregate Function
order: 8
---

## **Common Aggregate Functions**

### **COUNT**

    COUNT(x)

**Function**： Return the number of rows retrieved in the selected element.

Contain the DISTINCT keyword, which counts the results after deduplication.

**Parameter Type**：any type

**Return Type**：BIGINT

**Example**：
```
SELECT COUNT(*) FROM air;
```
    +-----------------+
    | COUNT(UInt8(1)) |
    +-----------------+
    | 13              |
    +-----------------+

```sql
SELECT COUNT(temperature) FROM air;
```
    +------------------------+
    | COUNT(air.temperature) |
    +------------------------+
    | 13                     |
    +------------------------+

```sql
SELECT COUNT(DISTINCT temperature) FROM air;
```
    +---------------------------------+
    | COUNT(DISTINCT air.temperature) |
    +---------------------------------+
    | 10                              |
    +---------------------------------+

----------------

### **SUM**

    SUM(NUMERICS)

**Function**： Return the sum calculated from the selected element

**Parameter Type**：Numeric type

**Return Type**：Consistent with parameter type.

**Example**：
```sql
SELECT SUM(temperature) FROM air;
```
    +----------------------+
    | SUM(air.temperature) |
    +----------------------+
    | 917                  |
    +----------------------+
----------------

### **MIN**

    MIN(STRING | NUMERICS | TIMESTAMP)

**Function**： Return the minimum value of the selected element.

**Parameter Type**：Numeric type or STRING or TIMESTAMP

**Return Type**：Consistent with parameter type.

**Example**：
```sql
 SELECT MIN(time), MIN(station), MIN(temperature) FROM air;
```
    +---------------------+------------------+----------------------+
    | MIN(air.time)       | MIN(air.station) | MIN(air.temperature) |
    +---------------------+------------------+----------------------+
    | 2022-01-28T13:21:00 | LianYunGang      | 53                   |
    +---------------------+------------------+----------------------+

----------------

### **MAX**

    MAX(STRINGS | NUMERICS | TIMESTAMPS)

**Function**： Return the maximum value in the selected element.

**Parameter Type**：Numeric type or STRING or TIMESTAMP.

**Return Type**：Consistent with parameter type.

**Example**：
```
SELECT MAX(time), MAX(station), MAX(temperature) FROM air;
```
    +---------------------+------------------+----------------------+
    | MAX(air.time)       | MAX(air.station) | MAX(air.temperature) |
    +---------------------+------------------+----------------------+
    | 2022-01-28T13:39:00 | XiaoMaiDao       | 80                   |
    +---------------------+------------------+----------------------+
----------------

### **AVG**
    AVG(NUMERICS)

**Function**： Return the average value of the selected element.

**Parameter Type**：Numeric type

**Return Type：**：Numeric type

**Example**：
```
SELECT AVG(temperature) FROM air;
```
    +----------------------+
    | AVG(air.temperature) |
    +----------------------+
    | 70.53846153846153    |
    +----------------------+
----------------

### **ARRAY_AGG**

    ARRAY_AGG(expr)

**Function**： Return an array consisting of all the values of the selected element. The element types must be the same.

**Parameter Type**：any type

**Return Type**：Array of parameter type

**Example**：

```sql
SELECT ARRAY_AGG(temperature) from air;
```
    +------------------------------------------------------+
    | ARRAYAGG(air.temperature)                            |
    +------------------------------------------------------+
    | [69, 78, 62, 79, 53, 72, 71, 69, 80, 74, 70, 70, 70] |
    +------------------------------------------------------+
**Note**：The aggregate function result cannot be returned in CSV format

## **Statistical Aggregate Functions**

### **VAR | VAR_SAMP**
    VAR(NUMERICS)

**Function**： Calculate the variance of a given sample

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT VAR(temperature) FROM air;
```
    +---------------------------+
    | VARIANCE(air.temperature) |
    +---------------------------+
    | 51.43589743589741         |
    +---------------------------+
----------------

### **VAR_POP**

    VAR_POP(NUMERICS)

**Function**： Calculate the variance of population.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```
SELECT VAR_POP(temperature) FROM air;
```
    +------------------------------+
    | VARIANCEPOP(air.temperature) |
    +------------------------------+
    | 47.47928994082838            |
    +------------------------------+
----------------

### **STDDEV | STDDEV_SAMP**

    STDDEV(NUMERICS)

**Function**： Calculate the standard deviation of the sample.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```
SELECT STDDEV(temperature) FROM air;
```
    +-------------------------+
    | STDDEV(air.temperature) |
    +-------------------------+
    | 7.1718824192744135      |
    +-------------------------+

----------------

### **STDDEV_POP**
    STDDEV_POP(NUMERICS)
**Function**： Calculate the standard deviation of population.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```
SELECT STDDEV_POP(temperature) FROM air;
```
    +----------------------------+
    | STDDEVPOP(air.temperature) |
    +----------------------------+
    | 6.890521746633442          |
    +----------------------------+
----------------

### **COVAR | COVAR_SAMP**
    COVAR(NUMERICS, NUMERICS)

**Function**： Return the covariance of the sample.

**Parameter Type**：Numeric type

**Numeric type**：DOUBLE

**Example**：
```
SELECT COVAR(temperature, pressure) FROM air;
```
    +------------------------------------------+
    | COVARIANCE(air.temperature,air.pressure) |
    +------------------------------------------+
    | -5.121794871794841                       |
    +------------------------------------------+


----------------


### **COVAR_POP**
    COVAR_POP(NUMERICS, NUMERICS)

**Function**： Return the overall covariance of number pairs in a group.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```
SELECT COVAR_POP(temperature, pressure) FROM air;
```
    +---------------------------------------------+
    | COVARIANCEPOP(air.temperature,air.pressure) |
    +---------------------------------------------+
    | -4.727810650887546                          |
    +---------------------------------------------+

----------------

### **CORR**
    CORR**(NUMERICS, NUMERICS)

**Function**： Return the Pearson coefficient representing the association between a set of number pairs.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT CORR(temperature, pressure) FROM air;
```
    +-------------------------------------------+
    | CORRELATION(air.temperature,air.pressure) |
    +-------------------------------------------+
    | -0.07955796767766017                      |
    +-------------------------------------------+

## **Approximate Aggregate Functions**

### **APPROX_DISTINCT**
    APPROX_DISTINCT(x)
**Function**： Return approximations of different input values (HyperLogLog).

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT APPROX_DISTINCT(station) FROM air;
```
    +-----------------------------+
    | APPROXDISTINCT(air.station) |
    +-----------------------------+
    | 2                           |
    +-----------------------------+
----------------

### **APPROX_PERCENTILE_CONT**
    APPROX_PERCENTILE_CONT(x, p)  
**Function**： Returns the approximate percentile (TDigest) of the input value x, where p is the percentile and is a 64 bit floating point number between 0 and 1 (including 1).

**Parameter Type**：x is numeric type, p is DOUBLE type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT APPROX_PERCENTILE_CONT(temperature, 0.1) FROM air;
```
    +----------------------------------------------------+
    | APPROXPERCENTILECONT(air.temperature,Float64(0.1)) |
    +----------------------------------------------------+
    | 60.4                                               |
    +----------------------------------------------------+

----------------

### **APPROX_PERCENTILE_CONT_WITH_WEIGHT**
    APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, w, p)  
**Function**： x returns the approximate percentage (TDigest) of the weighted input value, where w is the weight column expression and p is a floating point 64 between 0 and 1 inclusive.

APPROX_PERCENTILE_CONT(x, p) is equivalent to APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, 1, p)
**Parameter Type**：x. w is numeric type, p is DOUBLE type.

**Return Type**：DOUBLE

**Example**：
```sql
SELECT APPROX_PERCENTILE_CONT_WITH_WEIGHT(temperature,2, 0.1) FROM air;
```
    +-----------------------------------------------------------------------+
    | APPROXPERCENTILECONTWITHWEIGHT(air.temperature,Int64(2),Float64(0.1)) |
    +-----------------------------------------------------------------------+
    | 54.35                                                                 |
    +-----------------------------------------------------------------------+
----------------

### **APPROX_MEDIAN**(NUMERICS)
    APPROX_MEDIAN(NUMERICS)
**Function**： Return the approximate median of the input value.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT APPROX_MEDIAN(temperature) FROM air;
```
    +-------------------------------+
    | APPROXMEDIAN(air.temperature) |
    +-------------------------------+
    | 70                            |
    +-------------------------------+

[//]: # (----------------)
[//]: # (### **GROUPING**&#40;x&#41;)
[//]: # (    GROUPING&#40;x&#41;)
[//]: # (**功能**： 函数采用单个参数，该参数必须是 GROUP BY 子句的 ROLLUP、CUBE 或 GROUPING SETS 扩展的表达式列表中指定的维度列的表达式。)
[//]: # (**参数类型**：数值类型)
[//]: # (**返回类型** BIGINT)
