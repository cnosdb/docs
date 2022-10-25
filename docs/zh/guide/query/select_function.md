---
title: 函数
order: 9
---

## **数学函数**
### **abs(x)**
**功能**：   返回x的绝对值。

**参数类型**：数值类型

**返回类型**：与函数参数类型一致

----------------

### **acos(x)**
**功能**：   返回x的反余弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **asin(x)**
**功能**：   返回x的反正弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE


----------------

### **atan(x)**
**功能**：   返回x的反正切值。

**参数类型**：数值类型

**返回类型**：DOUBLE


----------------

### **atan2(y,x)**
**功能**：   返回y/x的反正切值。

**参数类型**：数值类型

**返回类型**：DOUBLE


----------------

### **ceil(x)**
**功能**：   向下取整。

**参数类型**：数值类型

**返回类型**：BIGINT


----------------

### **cos(x)**
**功能**：   返回x的余弦值。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **exp(x)**
**功能**：   返回e的x次方。

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **floor(x)**
**功能**：   小于或等于参数的最接近整数

**参数类型**：数值类型

**返回类型**：BIGINT

----------------

### **ln(x)**
**功能**：   自然对数

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------



### **log(x) | log10(x)**
**功能**：   以10为底的对数

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **log2(x)**
**功能**：   以 2 为底的对数

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **power(x,y) | pow(x,y)**
**功能**：   x的y次方

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **round(x)**
**功能**：   四舍五入到最接近的整数

**参数类型**：数值类型

**返回类型**：BIGINT

----------------

### **signum(x)**
**功能**：   参数的符号 (-1, 0, +1)

**参数类型**：数值类型

**返回类型**：BIGINT

----------------

### **sin(x)**
**功能**：   x的正弦值

**参数类型**：数值类型

**返回类型**：DOUBLE

----------------

### **sqrt(x)**
**功能**：   x的平方根

**参数类型**：数值类型

**返回类型**：与函数参数类型一致

----------------

### **tan(x)**
**功能**：    x的正切值

**参数类型**：数值类型

**返回类型**： DOUBLE

----------------

### **trunc(x)**
**功能**：向零截断，返回大小不大于x的最大整数值

**参数类型**：数值类型

**返回类型**：BIGINT

----------------

## **条件函数**

### **coalesce**
    coalesce(expr[,...exp])
**功能**：返回其第一个不为空的参数。只有当所有参数都为 null 时才返回 Null。当检索数据以进行显示时，它通常用于将默认值替换为空值。

**参数类型**：任意

**返回类型**：第一个不为null的参数类型

----------------

### **nullif**
    nullif(expr1, expr2) 

**功能**：如果 expr1 等于 expr2，则返回 NULL；否则返回 expr1。

**参数类型**：expr1,expr2为数值类型，且为带列值的表达式

**返回类型**：expr1的类型或NULL

----------------

## **字符串函数**

[//]: # (### **Array**)
[//]: # (    创建数组)

### **ascii**

    ascii(str) 

**功能**: 将 str 中的第一个字符转换成其ASCII 码后返回。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **bit_length**

    bit_length(str) 

**功能**：返回字符串数据的位长度或二进制数据的位数。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **btrim**

    btrim(string [, matching_string ] ) 

**功能**：函数通过删除前导空格和尾随空格或删除与可选的指定字符串匹配的字符来剪裁字符串。

**参数类型**：STRING

**返回类型**: STRING

----------------

### **char_length**

    char_length(expr) 

**功能**：以字符数形式返回指定字符串的长度。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **character_length**

    character_length(expr)

同char_length

----------------

### **chr**

    chr(expr) 

**功能**：返回位于提供的 UTF-16 码位的字符。

**参数类型**: BIGINT

**返回类型**: STRING

----------------

### **concat**

    concat(expr1, expr2 [, ...exp] ) 

**功能**：将联接两个表达式并返回生成的表达式。

**参数类型**：STRING

**返回类型**: STRING

----------------

### **concat_ws**

    concat_ws(sep , expr1 [, ...] ) 

**功能**：返回由 sep 分隔的串联字符串。

**参数类型**：STRING

**返回类型**：STRING

----------------

### **initcap**

    initcap(expr) 

**功能**：将参数中每个单词的首字母大写。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **left**

    left(str, len) 

**功能**：返回 str 中最左边的 len 个字符。

**参数类型**：str为STRING类型，len为BIGINT类型

**返回类型**：STRING

----------------

### **lpad**

    lpad(expr, len [, pad] ) 

**功能**：返回 expr，左侧填充了 pad，填充后长度为 len。

**参数类型**：expr, pad 类型为 STRING， len类型为BIGINT

**返回类型**：BIGINT

当len为负数时，len表现为0，当len过大，函数执行失败


----------------

### **lower**

    lower(expr) 

**功能**：返回将参数中所有字符均更改为小写后的结果。

**参数类型**：STRING

**返回类型**：STRING

----------------

### **ltrim**

    ltrim(str[, trimstr] ) 

**功能**：返回 str，其中删除了 trimStr 内的前导字符。默认timeStr为' '

**参数类型**：STRING

**返回类型**：STRING

----------------

### **md5**

    md5(expr) 

**功能**：以十六进制字符串形式返回 expr 的 MD5 128 位校验和。

**参数类型**：STRING

**返回类型**：STRING

----------------

### **octet_length**

    octet_length(expr) 

**功能**：返回字符串数据的字节长度或二进制数据的字节数。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **random**

    random( [seed] ) 

**功能**：返回介于 0 和 1 之间的随机值。

**参数类型**：无

**返回类型**：DOUBLE

[//]: # (### **Regexp_Replace**)
[//]: # (    regexp_replace&#40;str, regexp, rep [, position] &#41; )
[//]: # (**功能**：将 str 中与 regexp 匹配的所有子字符串都替换为 rep。)
[//]: # (**参数类型**：STRING)
[//]: # (**返回类型**：BIGINT)

----------------

### **repeat**

    repeat(expr, n) 

**功能**：返回重复 expr, n 次的字符串。

**参数类型**：expr类型为STRING，n类型为BIGINT

**返回类型**：BIGINT

----------------

### **replace**

    replace(str, search [, replace] ) 

**功能**：将所有 search 项都替换为 replace。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **reverse**

    reverse(expr) 

**功能**：返回一个反向字符串或一个包含逆序的元素的数组。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **right**

    right(str, len) 

**功能**：返回字符串 str 中最右边的 len 个字符。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **rpad**

    rpad(expr, len [, pad] ) 

**功能**：返回右侧填充了 pad 的 expr，填充后整个字符的长度为 len。

**参数类型**：expr, pad 类型为 STRING， len类型为BIGINT

**返回类型**：STRING

----------------

### **digest**

    digest(x)

**功能**：用于加密算法

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **rtrim**

    rtrim( str [, trimStr] ) 

**功能**：返回删除了尾随字符的 str。

**参数类型**：STRING

**返回类型**：STRING

----------------

### **sha224**
    sha224(str)

**功能**：计算字符串的 sha224 散列值

**返回类型**：STRING

**参数类型**：STRING

----------------

### **sha256**
    sha256(str)
**功能**：    计算字符串的 sha256 散列值

**返回类型**：STRING

**参数类型**：STRING

----------------

### **sha384**
    sha256(str)
**功能**：   计算字符串的 sha384 散列值

**返回类型**：STRING

**参数类型**：STRING

----------------

### **sha512**

    sha512(str)

**功能**： 计算字符串的 sha512 散列值

**返回类型**：STRING

**参数类型**：STRING

----------------

### **split_part**

    split_part(str, delim, n) 

**功能**： 将 str 按照 delim 做拆分，返回第n部分。

**参数类型**：str，delim类型为STRING，partNum类型为BIGINT

**返回类型**：STRING

----------------

### **starts_with**

    starts_with(expr, startExpr) 

**功能**： 如果 expr 以 startExpr 开头，则返回 true。

**参数类型**：STRING

**返回类型**：BOOLEAN

----------------

### **strpos**

    strpos(str, substr ) 

**功能**：返回子字符串在指定字符串中的位置。

**参数类型**：STRING

**返回类型**：BIGINT

----------------

### **substr**

    substr(expr, pos [, len] ) 

**功能**： 返回 expr 的子字符串（从 pos 开始，长度为 len）。

**参数类型**：expr 类型为STRING，pos，len类型为BIGINT

**返回类型**：STRING

----------------

### **to_hex**

    to_hex(value)

**功能**： 将数字或二进制值转换为十六进制表示形式。

**参数类型**：STRING

**返回类型**：STRING

----------------

### **translate**

    translate(expr, from, to) 

**功能**： 返回一个 expr，其中 from 中的所有字符都替换为 to 中的字符。

**参数类型**：STRING

**返回类型**：STRING

----------------

### **trim**

    trim(str) 

**功能**：删除str首尾的空白字符

**参数类型**：STRING

**返回类型**：STRING

----------------

### **upper**

    upper(expr)

返回将 expr 的所有字符均更改为大写后的结果。

## 时间函数

### **date_part**

    date_part(field, expr) 

**功能**：提取部分日期、时间戳或间隔。

**参数类型**：field 类型为STRING，且只能是('year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', '
second')中的一种

expr 类型为 TIMESTAMP

**返回类型**：BIGINT

----------------

### **date_trunc**

    date_trunc(field, expr) 

**功能**：返回已截断到 field 中指定的单位的值。

**参数类型**：field 类型为STRING，且只能是('year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', '
second')中的一种

expr 类型为TIMESTAMP

----------------

### **date_bin**
    date_bin(stride, source, origin)

----------------

### **to_timestamp**

    to_timestamp(expr [, fmt] ) 

返回使用可选格式设置强制转换为某个时间戳的 expr。

----------------

### **to_timestamp_millis**

    to_timestamp_millis(expr [, fmt] ) 

返回使用可选格式设置强制转换为Timestamp(Millisseconds, None)格式。

----------------

### **to_timestamp_micros**

    to_timestamp_micros(expr [, fmt] ) 
返回使用可选格式设置强制转换为Timestamp(Microseconds, None)格式。
### **to_timestamp_seconds**
    to_timestamp_seconds(expr [, fmt] ) 
返回使用可选格式设置强制转换为Timestamp(Seconds, None)格式。


----------------

### **from_unixtime**
    from_unixtime(unixTime [, fmt]) 
在 fmt 中返回 unixTime。

----------------

### **now**
    以 Timestamp(Nanoseconds, UTC) 
格式返回当前时间戳

[//]: # (### **Regexp_Match**)
[//]: # (    返回与正则表达式匹配的项)

----------------

### **struct**

    struct(expr1 [, ...] ) 

创建一个具有指定字段值的 STRUCT。
