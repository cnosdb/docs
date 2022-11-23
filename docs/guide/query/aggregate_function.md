---
title: 聚合函数
order: 8
---

## **一般聚合函数**

### **COUNT**

    COUNT(x)

**功能**： 返回选定元素中检索过的行的数目。

包含DISTINCT关键字，会对去重后的结果计数

**参数类型**：任意

**返回类型**：BIGINT

**示例**：
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

**功能**： 返回从选定元素计算出的总和值。

**参数类型**：数值类型

**返回类型**：与参数类型相同

**示例**：
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

**功能**： 返回选定元素中最小值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

**示例**：
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

**功能**： 返回选定元素中最大值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

**示例**：
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

**功能**： 返回选定元素的平均值。

**参数类型**：数值类型

**返回类型**：数值类型

**示例**：
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

**功能**： 返回一个数组，该数组由选定元素的所有值组成，元素类型必须相同

**参数类型**：任意

**返回类型**：参数类型的数组

**示例**：

```sql
SELECT ARRAY_AGG(temperature) from air;
```
    +------------------------------------------------------+
    | ARRAYAGG(air.temperature)                            |
    +------------------------------------------------------+
    | [69, 78, 62, 79, 53, 72, 71, 69, 80, 74, 70, 70, 70] |
    +------------------------------------------------------+
**注意**：该聚合函数结果，无法以CSV格式返回

## **统计聚合函数**

### **VAR | VAR_SAMP**
    VAR(NUMERICS)

**功能**： 计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
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

**功能**： 计算总体方差。

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
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

**功能**： 计算样本标准差。

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
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
**功能**： 计算出的总体标准差。

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
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

**功能**： 返回样本的协方差

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
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

**功能**： 返回组中数字对的总体协方差。

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
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

**功能**： 返回表示一组数字对之间的关联情况的皮尔逊系数。

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
```sql
SELECT CORR(temperature, pressure) FROM air;
```
    +-------------------------------------------+
    | CORRELATION(air.temperature,air.pressure) |
    +-------------------------------------------+
    | -0.07955796767766017                      |
    +-------------------------------------------+

## **近似聚合函数**

### **APPROX_DISTINCT**
    APPROX_DISTINCT(x)
**功能**： 返回不同输入值的近似值(HyperLogLog)。

**参数类型**：STRING

**返回类型**：BIGINT

**示例**：
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
**功能**： 返回输入值x的近似百分位(TDigest)，p是百分位，是0到1(包括1)之间的64位浮点数。

**参数类型**：x为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

**示例**：
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
**功能**： x返回带权重的输入值的近似百分比(TDigest)，其中w是权重列表达式，p是0到1(包括)之间的浮点64。

APPROX_PERCENTILE_CONT(x, p) 相当于 APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, 1, p)
**参数类型**：x,w为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

**示例**：
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
**功能**： 返回输入值的近似中值。

**参数类型**：数值类型

**返回类型**：DOUBLE

**示例**：
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
