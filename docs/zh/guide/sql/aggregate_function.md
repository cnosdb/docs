---
title: 聚合函数
order: 8
---

## **一般聚合函数**

### **COUNT**

    COUNT(x)

**功能**：返回选定元素中检索过的行的数目。

**参数类型**：任意

**返回类型**：BIGINT

----------------

### **SUM**

    SUM(NUMERIC)

**功能**： 返回从选定元素计算出的总和值。

**参数类型**：数值类型

**返回类型**：与参数类型相同

----------------

### **MIN**

    MIN(STRING | NUMERICS | TIMESTAMP | DATES)

**功能**： 返回选定元素中最小值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

----------------

### **MAX**

    MAX(STRINGS | NUMERICS | TIMESTAMPS | DATES)

**功能**： 返回选定元素中最大值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

----------------

### **AVG**
    AVG(NUMERICS)

**功能**： 返回选定元素的平均值。

**参数类型**：数值类型

**返回类型**：数值类型

----------------

### **ARRAY_AGG**

**功能**： 返回一个数组，该数组由选定元素的所有值组成，元素类型必须相同

**参数类型**：任意

## **统计聚合函数**

### **VAR**
    VAR(NUMERICS)

**功能**： 计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### VAR_SAMP

    VAR_SAMP(NUMERICS) -> [same as input type]

**功能**： 计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **VAR_POP**

    Var_Pop(NUMERICS)

**功能**： 返回从组的值计算出的总体方差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **STDDEV**

    STDDEV(NUMERICS)

**功能**： 返回从组中的值计算出的样本标准偏差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **STDDEV_SAMP**

    STDDEV_SAMP(NUMERICS)

**功能**： 返回从组中的值计算出的样本标准偏差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **STDDEV_POP**
    STDDEV_POP(NUMERICS)
**功能**： 返回从组的值计算出的总体标准偏差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **COVAR**
    COVAR(NUMERICS, NUMERICS)

**功能**： 返回样本的协方差

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **COVAR_SAMP**
    COVAR_SAMP(NUMERICS, NUMERICS)

**功能**： 返回样本的协方差

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **COVAR_POP**
    COVAR_POP(NUMERICS, NUMERICS)

**功能**： 返回组中数字对的总体协方差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **CORR**
    CORR**(NUMERICS, NUMERICS)

**功能**： 返回表示一组数字对之间的关联情况的皮尔逊系数。

**参数类型**：数值类型

**返回类型**：DOUBLE

## **近似聚合函数**

### **APPROX_DISTINCT**
    APPROX_DISTINCT(x) -> 
**功能**： uint64返回不同输入值的近似值(HyperLogLog)。

**参数类型**：数值类型

**返回类型**：BIGINT

----------------

### **APPROX_PERCENTILE_CONT**
    APPROX_PERCENTILE_CONT(x, p)  
**功能**： x返回输入值的近似百分位(TDigest)，其中p是0到1(包括)之间的浮点64。

**参数类型**：x为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

----------------

### **APPROX_PERCENTILE_CONT_WITH_WEIGHT**
    APPROX_PERCENTILE_CONT_WITH_WEIGHT(x, w, p)  
**功能**： x返回带权重的输入值的近似百分比(TDigest)，其中w是权重列表达式，p是0到1(包括)之间的浮点64。

**参数类型**：x,w为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

----------------

### **APPROX_MEDIAN**(NUMERICS)
    APPROX_MEDIAN(NUMERICS)
**功能**： 返回输入值的近似中值。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **GROUPING**(x)
    GROUPING(x)

**功能**： 函数采用单个参数，该参数必须是 GROUP BY 子句的 ROLLUP、CUBE 或 GROUPING SETS 扩展的表达式列表中指定的维度列的表达式。

**参数类型**：数值类型

**返回类型** BIGINT
