---
title: 函数
icon: config
---

## **选择函数**
### **数学函数**
#### **abs(x)**
**功能**：   返回x的绝对值。

**参数类型**：数值类型

**返回类型**：与函数参数类型一致

#### **acos(x)**
**功能**：   返回x的反余弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **asin(x)**
**功能**：   返回x的反正弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **atan(x)**
**功能**：   返回x的反正切值。

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **atan2(y,x)**
**功能**：   返回y/x的反正切值。

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **ceil(x)**
**功能**：   向下取整。

**参数类型**：数值类型

**返回类型**：BIGINT
    
#### **cos(x)**
**功能**：   返回x的余弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **exp(x)**
**功能**：   返回e的x次方。

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **floor(x)**
**功能**：   小于或等于参数的最接近整数

**参数类型**：数值类型

**返回类型**：BIGINT
    
#### **ln(x)**
**功能**：   自然对数

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **log(x)**
**功能**：   以10为底的对数

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **log10(x)**
**功能**：   以10为底的对数

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **log2(x)**
**功能**：   以 2 为底的对数

**参数类型**：数值类型

**返回类型**：DOUBLE
    
    
#### **power(x,y)**
**功能**：   x的y次方

**参数类型**：数值类型

**返回类型**：DOUBLE
    

#### **pow(x,y)**
同 power

#### **round(x)**
**功能**：   四舍五入到最接近的整数

**参数类型**：数值类型

**返回类型**：BIGINT
    
#### **signum(x)**
**功能**：   参数的符号 (-1, 0, +1)

**参数类型**：数值类型

**返回类型**：BIGINT
    
#### **sin(x)**
**功能**：   x的正弦值

**参数类型**：数值类型

**返回类型**：DOUBLE
    
#### **sqrt(x)**
**功能**：   x的平方根

**参数类型**：数值类型

**返回类型**：与函数参数类型一致
    
#### **tan(x)**
**功能**：    x的正切值

**参数类型**：数值类型

**返回类型**： DOUBLE

#### **trunc(x)**
**功能**：向零截断，返回大小不大于x的最大整数值

**参数类型**：数值类型

**返回类型**：BIGINT
    

### **条件函数**
###### **Coalesce**
    coalesce(expr[,...exp])
**功能**：返回其第一个不为空的参数。只有当所有参数都为 null 时才返回 Null。当检索数据以进行显示时，它通常用于将默认值替换为空值。

**参数类型**：任意

**返回类型**：第一个不为null的参数类型

###### **NullIf**
    nullif(expr1, expr2) 

**功能**：如果 expr1 等于 expr2，则返回 NULL；否则返回 expr1。

**参数类型**：expr1,expr2为数值类型，且为带列值的表达式

**返回类型**：expr1的类型或NULL

### **字符串函数**

[//]: # (###### **Array**)
[//]: # (    创建数组)

###### **Ascii**

    ascii(str) 

**功能**: 将 str 中的第一个字符转换成其ASCII 码后返回。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Bit_Length**

    bit_length(str) 

**功能**：返回字符串数据的位长度或二进制数据的位数。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Btrim**

    btrim(string [, matching_string ] ) 

**功能**：函数通过删除前导空格和尾随空格或删除与可选的指定字符串匹配的字符来剪裁字符串。

**参数类型**：STRING

**返回类型**: STRING

###### **Char_Length | Character_Length**

    character_length(expr) 

**功能**：以字符数形式返回指定字符串的长度。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Chr**

    chr(expr) 

**功能**：返回位于提供的 UTF-16 码位的字符。

**参数类型**: BIGINT

**返回类型**: STRING

###### **Concat**

    concat(expr1, expr2 [, ...exp] ) 

**功能**：将联接两个表达式并返回生成的表达式。

**参数类型**：STRING

**返回类型**: STRING

###### **Concat_WS**

    concat_ws(sep , expr1 [, ...] ) 

**功能**：返回由 sep 分隔的串联字符串。

**参数类型**：STRING

**返回类型**：STRING


**返回类型**：BIGINT

###### **InitCap**

    initcap(expr) 

**功能**：将参数中每个单词的首字母大写。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Left**

    left(str, len) 

**功能**：返回 str 中最左边的 len 个字符。

**参数类型**：str为STRING类型，len为BIGINT类型

**返回类型**：STRING

###### **Lpad**

    lpad(expr, len [, pad] ) 

**功能**：返回 expr，左侧填充了 pad，填充后长度为 len。

**参数类型**：expr, pad 类型为 STRING， len类型为BIGINT

**返回类型**：BIGINT

当len为负数时，len表现为0，当len过大，函数执行失败

###### **Lower**

    lower(expr) 

**功能**：返回将参数中所有字符均更改为小写后的结果。

**参数类型**：STRING

**返回类型**：STRING

###### **Ltrim**

    ltrim(str[, trimstr] ) 

**功能**：返回 str，其中删除了 trimStr 内的前导字符。默认timeStr为' '

**参数类型**：STRING

**返回类型**：STRING

###### **MD5**

    md5(expr) 

**功能**：以十六进制字符串形式返回 expr 的 MD5 128 位校验和。

**参数类型**：STRING

**返回类型**：STRING

###### **Octet_Length**

    octet_length(expr) 

**功能**：返回字符串数据的字节长度或二进制数据的字节数。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Random**

    random( [seed] ) 

**功能**：返回介于 0 和 1 之间的随机值。

**参数类型**：无

**返回类型**：DOUBLE

[//]: # (###### **Regexp_Replace**)

[//]: # ()
[//]: # (    regexp_replace&#40;str, regexp, rep [, position] &#41; )

[//]: # ()
[//]: # (**功能**：将 str 中与 regexp 匹配的所有子字符串都替换为 rep。)

[//]: # ()
[//]: # (**参数类型**：STRING)

[//]: # ()
[//]: # (**返回类型**：BIGINT)

###### **Repeat**

    repeat(expr, n) 

**功能**：返回重复 expr, n 次的字符串。

**参数类型**：expr类型为STRING，n类型为BIGINT

**返回类型**：BIGINT

###### **Replace**

    replace(str, search [, replace] ) 

**功能**：将所有 search 项都替换为 replace。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Reverse**

    reverse(expr) 

**功能**：返回一个反向字符串或一个包含逆序的元素的数组。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Right**

    right(str, len) 

**功能**：返回字符串 str 中最右边的 len 个字符。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Rpad**

    rpad(expr, len [, pad] ) 

**功能**：返回右侧填充了 pad 的 expr，填充后整个字符的长度为 len。

**参数类型**：expr, pad 类型为 STRING， len类型为BIGINT

**返回类型**：STRING

###### **digest**

    digest(x)

**功能**：用于加密算法

**参数类型**：STRING

**返回类型**：BIGINT

###### **Rtrim**

    rtrim( str [, trimStr] ) 

**功能**：返回删除了尾随字符的 str。

**参数类型**：STRING

**返回类型**：STRING

###### **SHA224**
    sha224(str)

**功能**：计算字符串的 sha224 散列值

**返回类型**：STRING

**参数类型**：STRING

###### **SHA256**
    sha256(str)
**功能**：    计算字符串的 sha256 散列值

**返回类型**：STRING

**参数类型**：STRING

###### **SHA384**
    sha256(str)
**功能**：   计算字符串的 sha384 散列值

**返回类型**：STRING

**参数类型**：STRING

###### **SHA512**

    sha512(str)

**功能**： 计算字符串的 sha512 散列值

**返回类型**：STRING

**参数类型**：STRING

###### **Split_Part**

    split_part(str, delim, n) 

**功能**： 将 str 按照 delim 做拆分，返回第n部分。

**参数类型**：str，delim类型为STRING，partNum类型为BIGINT

**返回类型**：STRING

###### **Starts_With**

    starts_with(expr, startExpr) 

**功能**： 如果 expr 以 startExpr 开头，则返回 true。

**参数类型**：STRING

**返回类型**：BOOLEAN

###### **Strpos**

    strpos(str, substr ) 

**功能**：返回子字符串在指定字符串中的位置。

**参数类型**：STRING

**返回类型**：BIGINT

###### **Substr**

    substr(expr, pos [, len] ) 

**功能**： 返回 expr 的子字符串（从 pos 开始，长度为 len）。

**参数类型**：expr 类型为STRING，pos，len类型为BIGINT

**返回类型**：STRING

###### **To_Hex**

    to_hex(value)

**功能**： 将数字或二进制值转换为十六进制表示形式。

**参数类型**：STRING

**返回类型**：STRING

###### **Translate**

    translate(expr, from, to) 

**功能**： 返回一个 expr，其中 from 中的所有字符都替换为 to 中的字符。

**参数类型**：STRING

**返回类型**：STRING

###### **Trim**

    trim(str) 

**功能**：删除str首尾的空白字符

**参数类型**：STRING

**返回类型**：STRING

###### **Upper**

    upper(expr)

返回将 expr 的所有字符均更改为大写后的结果。

### 时间函数

###### **Date_Part**

    date_part(field, expr) 

**功能**：提取部分日期、时间戳或间隔。

**参数类型**：field 类型为STRING，且只能是('year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', '
second')中的一种

expr 类型为 TIMESTAMP

**返回类型**：BIGINT

###### **Date_Trunc**

    date_trunc(field, expr) 

**功能**：返回已截断到 field 中指定的单位的值。

**参数类型**：field 类型为STRING，且只能是('year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', '
second')中的一种

expr 类型为TIMESTAMP

###### **To_Timestamp**

    to_timestamp(expr [, fmt] ) 

返回使用可选格式设置强制转换为某个时间戳的 expr。

###### **To_Timestamp_Millis**

    to_timestamp_millis(expr [, fmt] ) 

返回使用可选格式设置强制转换为Timestamp(Millisseconds, None)格式。

###### **To_Timestamp_Micros**

    to_timestamp_micros(expr [, fmt] ) 
返回使用可选格式设置强制转换为Timestamp(Microseconds, None)格式。
###### **To_Timestamp_Seconds**
    to_timestamp_seconds(expr [, fmt] ) 
返回使用可选格式设置强制转换为Timestamp(Seconds, None)格式。
###### **From_Unixtime**
    from_unixtime(unixTime [, fmt]) 
在 fmt 中返回 unixTime。
###### **Now**
    以 Timestamp(Nanoseconds, UTC) 
格式返回当前时间戳

[//]: # (###### **Regexp_Match**)

[//]: # (    返回与正则表达式匹配的项)

###### **Struct**

    struct(expr1 [, ...] ) 

创建一个具有指定字段值的 STRUCT。

## **聚合函数**

### **一般聚合函数**

###### **Count**

    COUNT(x)

**功能**：返回选定元素中检索过的行的数目。

**参数类型**：任意

**返回类型**：BIGINT

###### **Sum**

    SUM(NUMERIC)

**功能**： 返回从选定元素计算出的总和值。

**参数类型**：数值类型

**返回类型**：与参数类型相同

###### **Min**

    MIN(STRING | NUMERICS | TIMESTAMP | DATES)

**功能**： 返回选定元素中最小值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

###### **Max**

    MAX(STRINGS | NUMERICS | TIMESTAMPS | DATES)

**功能**： 返回选定元素中最大值。

**参数类型**：数值类型或STRING或TIMESTAMP

**返回类型**：与参数类型相同

###### **Avg**
    AVG(NUMERICS)

**功能**： 返回选定元素的平均值。

**参数类型**：数值类型

**返回类型**：数值类型

###### **Array_Agg**

**功能**： 返回一个数组，该数组由选定元素的所有值组成，元素类型必须相同

**参数类型**：任意

### **统计聚合函数**

###### **Var**(NUMERICS) | Var_Samp(NUMERICS) -> [same as input type]
    VAR(NUMERICS)

**功能**： 计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

###### Var_Samp
    VAR_SAMP(NUMERICS) -> [same as input type]

**功能**： 计算给定样本的方差

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **Var_Pop**(NUMERICS) -> [same as input type]
    Var_Pop(NUMERICS) -> [same as input type]

**功能**： 返回从组的值计算出的总体方差。

**参数类型**：数值类型

**返回类型**：DOUBLE


###### **Stddev**

**功能**： 返回从组中的值计算出的样本标准偏差。

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **Stddev_Samp**
    STDDEV_SAMP(NUMERICS)
**功能**： 返回从组中的值计算出的样本标准偏差。

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **STDDEV_POP**(NUMERICS)
    STDDEV_POP(NUMERICS)
**功能**： 返回从组的值计算出的总体标准偏差。

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **COVAR**
    COVAR(NUMERICS, NUMERICS)

**功能**： 返回样本的协方差

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **COVAR_SAMP**
    COVAR_SAMP(NUMERICS, NUMERICS)

**功能**： 返回样本的协方差

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **Covar_Pop**
    COVAR_POP(NUMERICS, NUMERICS)

**功能**： 返回组中数字对的总体协方差。

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **Corr**
    Corr**(NUMERICS, NUMERICS)

**功能**： 返回表示一组数字对之间的关联情况的皮尔逊系数。

**参数类型**：数值类型

**返回类型**：DOUBLE

### **近似聚合函数**

###### **Approx_Distinct**
    approx_distinct(x) -> 
**功能**： uint64返回不同输入值的近似值(HyperLogLog)。

**参数类型**：数值类型

**返回类型**：BIGINT

###### **Approx_Percentile_Cont**
    approx_percentile_cont(x, p)  
**功能**： x返回输入值的近似百分位(TDigest)，其中p是0到1(包括)之间的浮点64。

**参数类型**：x为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

###### **Approx_Percentile_Cont_With_Weight**
    approx_percentile_cont_with_weight(x, w, p)  
**功能**： x返回带权重的输入值的近似百分比(TDigest)，其中w是权重列表达式，p是0到1(包括)之间的浮点64。

**参数类型**：x,w为数值类型，p为DOUBLE类型

**返回类型**：DOUBLE

###### **Approx_Median**(NUMERICS) 
    APPROX_MEDIAN(NUMERICS)
**功能**： 返回输入值的近似中值。

**参数类型**：数值类型

**返回类型**：DOUBLE

###### **Grouping**(x) -> Int32
    GROUPING(x)
**功能**： 函数采用单个参数，该参数必须是 GROUP BY 子句的 ROLLUP、CUBE 或 GROUPING SETS 扩展的表达式列表中指定的维度列的表达式。

**参数类型**：数值类型

**返回类型** BIGINT


## **窗口函数**

###### **ROW_NUMBER**
    根据窗口分区中的行顺序，为每一行分配唯一的顺序编号（从 1 开始）。
###### **RANK**
    返回某个值相对于分区中所有值的排名（跳跃排名）。
###### **DENSE_RANK**
    返回某个值相对于分区中所有值的排名（连续排名）。
###### **PERCENT_RANK**
    计算分区中某个值的百分比排名。
###### **CUME_DIST**
    返回某个值相对于分区中的所有值的位置。
###### **NTILE**
    ntile(expr) over([partition_clause] order_by_clause) 把有序的数据集合平均分配到expr指定的数量的桶中,将桶号分配给每一行。
###### **LAG**
    lag( expr [, offset [, default] ] ) 从分区中的前一行返回 expr 的值。
###### **LEAD**
    lead(expr [, offset [, default] ] ) 从分区中的后续行返回值 expr。
###### **FIRST_VALUE**
     返回一组值(该组通常是有序集合)中的第一个值。
###### **LAST_VALUE**
     返回一组值(该组通常是有序集合)中的最后一个值。
###### **NTH_VALUE**
    返回相对于窗口的第一行的窗口框架的指定行的表达式值。