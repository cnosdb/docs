---
title: 函数
icon: config
---

## **选择函数**
### **数学函数**
###### **abs(x)**
    返回x的绝对值。
###### **acos(x)**
    返回x的反余弦值。
###### **asin(x)**
    返回x的反正弦值。
###### **atan(x)**
    返回x的反正切值。
###### **atan2(y,x)**
    返回y/x的反正切值。
###### **ceil(x)**
    向下取整。
###### **cos(x)**
    返回x的余弦值。
###### **exp(x)**
    返回x的指数。
###### **floor(x)**
###### **ln(x)**
###### **log(x)**
###### **log10(x)**
###### **log2(x)**
###### **pow(x,y)**
###### **power(x,y)**
###### **round(x)**
###### **signum(x)**
###### **sin(x)**
###### **sqrt(x)**
###### **tan(x)**
###### **trunc(x)**


### **条件函数**
###### **Coalesce**
### **字符串函数**
###### **Array**
###### **Ascii**
###### **Bit_Length**
###### **Btrim**
###### **Char_Length | Character_Length**
###### **Chr**
###### **Concat**
###### **Concat_WS**
###### **Date_Part**
###### **Date_Trunc**
###### **InitCap**
###### **Left**
###### **Lpad**
###### **Lower**
###### **Ltrim**
###### **MD5**
###### **NullIf**
###### **Octet_Length**
###### **Random**
###### **Regexp_Replace**
###### **Repeat**
###### **Replace**
###### **Reverse**
###### **Right**
###### **Rpad**
###### **digest**
###### **Rtrim**
###### **SHA224**
###### **SHA256**
###### **SHA384**
###### **SHA512**
###### **Split_Part**
###### **Starts_With**
###### **Strpos**
###### **Substr**
###### **To_Hex**
###### **To_Timestamp**
###### **To_Timestamp_Millis**
###### **To_Timestamp_Micros**
###### **To_Timestamp_Seconds**
###### **From_Unixtime**
###### **Now**
###### **Translate**
###### **Trim**
###### **Upper**
###### **Regexp_Match**
###### **Struct**

## **聚合函数**
### **一般聚合函数**

###### **Count**(x) -> Int64
###### **Sum**(NUMERICS) -> [same as input type]
###### **Min**(STRINGS | NUMERICS | TIMESTAMPS | DATES) -> [same as input type]
###### **Max**(STRINGS | NUMERICS | TIMESTAMPS | DATES) -> [same as input type]
###### **Avg**(NUMERICS) -> [same as input type]
###### **Array_Agg**(x) -> [same as input type]

### **统计聚合函数**
###### **Var**(NUMERICS) |  Var_Samp(NUMERICS) -> [same as input type]
###### **Var_Pop**(NUMERICS) -> [same as input type]
###### **Stddev**(NUMERICS) | Stddev_Samp(NUMERICS) -> [same as input type]
###### **Stddev_Pop**(NUMERICS) -> [same as input type]
###### **Covar**(NUMERICS, NUMERICS) | Covar_Samp(NUMERICS, NUMERICS) -> [same as first input type]
###### **Covar_Pop**(NUMERICS, NUMERICS) -> [same as first input type]
###### **Corr**(NUMERICS, NUMERICS) -> [same as first input type]
### **近似聚合函数**

###### **Approx_Distinct**(x) -> Int64
###### **Approx_Percentile_Cont**(NUMERICS, Float64) -> [same as first input type]
###### **Approx_Percentile_Cont_With_Weight**(NUMERICS, [same as first type], Float64) ->
###### **Approx_Median**(NUMERICS) -> [same as input type]
###### **Grouping**(x) -> Int32

## **窗口函数**

###### **ROW_NUMBER**
###### **RANK**
###### **DENSE_RANK**
###### **PERCENT_RANK**
###### **CUME_DIST**
###### **NTILE**
###### **LAG**
###### **LEAD**
###### **FIRST_VALUE**
###### **LAST_VALUE**
###### **NTH_VALUE**