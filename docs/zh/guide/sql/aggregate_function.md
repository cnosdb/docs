---
title: 聚合函数
icon: config
order: 8
---

## **一般聚合函数**

### **Count**

    COUNT(x)

**功能**：返回选定元素中检索过的行的数目。

**参数类型**：任意

**返回类型**：BIGINT

----------------

### **Sum**

    SUM(NUMERIC)

**功能**： 返回从选定元素计算出的总和值。

**参数类型**：数值类型

**返回类型**：与参数类型相同

----------------

### **Min**

    MIN(STRING | NUMERICS | TIMESTAMP | DATES)

**功能**： 返回选定元素中最小值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

----------------

### **Max**

    MAX(STRINGS | NUMERICS | TIMESTAMPS | DATES)

**功能**： 返回选定元素中最大值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

----------------

### **Avg**
    AVG(NUMERICS)

**功能**： 返回选定元素的平均值。

**参数类型**：数值类型

**返回类型**：数值类型

----------------

### **Array_Agg**

**功能**： 返回一个数组，该数组由选定元素的所有值组成，元素类型必须相同

**参数类型**：任意

## **统计聚合函数**

### **Var**
    VAR(NUMERICS)

**功能**： 计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### Var_Samp

    VAR_SAMP(NUMERICS) -> [same as input type]

**功能**： 计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **Var_Pop**

    Var_Pop(NUMERICS)

**功能**： 返回从组的值计算出的总体方差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **Stddev**

    STDDEV(NUMERICS)

**功能**： 返回从组中的值计算出的样本标准偏差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **Stddev_Samp**

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

### **Covar_Pop**
    COVAR_POP(NUMERICS, NUMERICS)

**功能**： 返回组中数字对的总体协方差。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **Corr**
    Corr**(NUMERICS, NUMERICS)

**功能**： 返回表示一组数字对之间的关联情况的皮尔逊系数。

**参数类型**：数值类型

**返回类型**：DOUBLE

## **近似聚合函数**

### **Approx_Distinct**
    approx_distinct(x) -> 
**功能**： uint64返回不同输入值的近似值(HyperLogLog)。

**参数类型**：数值类型

**返回类型**：BIGINT

----------------

### **Approx_Percentile_Cont**
    approx_percentile_cont(x, p)  
**功能**： x返回输入值的近似百分位(TDigest)，其中p是0到1(包括)之间的浮点64。

**参数类型**：x为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

----------------

### **Approx_Percentile_Cont_With_Weight**
    approx_percentile_cont_with_weight(x, w, p)  
**功能**： x返回带权重的输入值的近似百分比(TDigest)，其中w是权重列表达式，p是0到1(包括)之间的浮点64。

**参数类型**：x,w为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

----------------

### **Approx_Median**(NUMERICS)
    APPROX_MEDIAN(NUMERICS)
**功能**： 返回输入值的近似中值。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **Grouping**(x)
    GROUPING(x)

**功能**： 函数采用单个参数，该参数必须是 GROUP BY 子句的 ROLLUP、CUBE 或 GROUPING SETS 扩展的表达式列表中指定的维度列的表达式。

**参数类型**：数值类型

**返回类型** BIGINT
