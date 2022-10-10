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
    小于或等于参数的最接近整数
###### **ln(x)**
    自然对数
###### **log(x)**
    自然对数
###### **log10(x)**
    以 10 为底的对数
###### **log2(x)**
    以 2 为底的对数
###### **pow(x,y)**
    x的y次方
###### **power(x,y)**
    x的y次方
###### **round(x)**
    四舍五入到最接近的整数
###### **signum(x)**
    参数的符号 (-1, 0, +1)
###### **sin(x)**
    x的正弦值
###### **sqrt(x)**
    x的平方根
###### **tan(x)**
    x的正切值
###### **trunc(x)**
    向零截断，返回大小不大于x的最大整数值

### **条件函数**
###### **Coalesce**
    返回其第一个不为空的参数。只有当所有参数都为 null 时才返回 Null。当检索数据以进行显示时，它通常用于将默认值替换为空值。
### **字符串函数**
###### **Array**
    创建数组
###### **Ascii**
    ascii(str) 将 str 中的第一个字符转换成其ASCII 码后返回。
###### **Bit_Length**
    bit_length(expr) 返回字符串数据的位长度或二进制数据的位数。
###### **Btrim**
    btrim(string [, matching_string ] ) 函数通过删除前导空格和尾随空格或删除与可选的指定字符串匹配的字符来剪裁字符串。
###### **Char_Length | Character_Length**
    character_length(expr) 以字符数形式返回指定字符串的长度。
###### **Chr**
    chr(expr) 返回位于提供的 UTF-16 码位的字符。
###### **Concat**
    concat(expr1, expr2 [, ...] ) 将联接两个表达式并返回生成的表达式。
###### **Concat_WS**
    concat_ws(sep [, expr1 [, ...] ]) 返回由 sep 分隔的串联字符串。
###### **Date_Part**
    date_part(field, expr) 提取部分日期、时间戳或间隔。
###### **Date_Trunc**
    date_trunc(field, expr) 返回已截断到 field 中指定的单位的时间戳。
###### **InitCap**
    initcap(expr) 将参数中每个单词的首字母大写。
###### **Left**
    left(str, len) 返回 str 中最左边的 len 个字符。
###### **Lpad**
    lpad(expr, len [, pad] ), 返回 expr，左侧填充了 pad，填充后长度为 len。
###### **Lower**
    lower(expr) 返回将参数中所有字符均更改为小写后的结果。
###### **Ltrim**
    ltrim( [trimstr ,] str)，返回 str，其中删除了 trimStr 内的前导字符。
###### **MD5**
    md5(expr) 以十六进制字符串形式返回 expr 的 MD5 128 位校验和。
###### **NullIf**
    nullif(expr1, expr2) 如果 expr1 等于 expr2，则返回 NULL；否则返回 expr1。
###### **Octet_Length**
    octet_length(expr) 返回字符串数据的字节长度或二进制数据的字节数。
###### **Random**
    random( [seed] ) 返回介于 0 和 1 之间的随机值。
###### **Regexp_Replace**
    regexp_replace(str, regexp, rep [, position] ) 将 str 中与 regexp 匹配的所有子字符串都替换为 rep。
###### **Repeat**
    repeat(expr, n) 返回重复 exprn 次的字符串。
###### **Replace**
    replace(str, search [, replace] ) 将所有 search 项都替换为 replace。
###### **Reverse**
    reverse(expr) 返回一个反向字符串或一个包含逆序的元素的数组。
###### **Right**
    right(str, len) 返回字符串 str 中最右边的 len 个字符。
###### **Rpad**
    rpad(expr, len [, pad] ) 返回右侧填充了 pad 的 expr，填充后整个字符的长度为 len。
###### **digest**
    用于加密算法
###### **Rtrim**
    rtrim( [trimStr ,] str) 返回删除了尾随字符的 str。
###### **SHA224**
    计算字符串的 sha224 散列值
###### **SHA256**
    计算字符串的 sha256 散列值
###### **SHA384**
    计算字符串的 sha384 散列值
###### **SHA512**
    计算字符串的 sha512 散列值
###### **Split_Part**
    split_part(str, delim, partNum) 将 str 围绕 delim 的次数拆分，并返回 partNum 部分。
###### **Starts_With**
    starts_with(expr, startExpr) 如果 expr 以 startExpr 开头，则返回 true。
###### **Strpos**
    strpos(string, substring ) 返回子字符串在指定字符串中的位置。
###### **Substr**
    substr(expr, pos [, len] ) 返回 expr 的子字符串（从 pos 开始，长度为 len）。
###### **To_Hex**
    to_hex(value) 将数字或二进制值转换为十六进制表示形式。
###### **To_Timestamp**
    to_timestamp(expr [, fmt] ) 返回使用可选格式设置强制转换为某个时间戳的 expr。
###### **To_Timestamp_Millis**
    to_timestamp_millis(expr [, fmt] ) 返回使用可选格式设置强制转换为Timestamp(Millisseconds, None)格式。
###### **To_Timestamp_Micros**
    to_timestamp_micros(expr [, fmt] ) 返回使用可选格式设置强制转换为Timestamp(Microseconds, None)格式。
###### **To_Timestamp_Seconds**
    to_timestamp_seconds(expr [, fmt] ) 返回使用可选格式设置强制转换为Timestamp(Seconds, None)格式。
###### **From_Unixtime**
    from_unixtime(unixTime [, fmt]) 在 fmt 中返回 unixTime。
###### **Now**
    以 Timestamp(Nanoseconds, UTC) 格式返回当前时间戳
###### **Translate**
    translate(expr, from, to) 返回一个 expr，其中 from 中的所有字符都替换为 to 中的字符。
###### **Trim**
    trim(str) 从 str 中删除指定字符
###### **Upper**
    upper(expr) 返回将 expr 的所有字符均更改为大写后的结果。
###### **Regexp_Match**
    返回与正则表达式匹配的项
###### **Struct**
    struct(expr1 [, ...] ) 创建一个具有指定字段值的 STRUCT。

## **聚合函数**
### **一般聚合函数**

###### **Count**(x) -> Int64
    返回选定元素中检索过的行的数目。
###### **Sum**(NUMERICS) -> [same as input type]
    返回从选定元素计算出的总和值。
###### **Min**(STRINGS | NUMERICS | TIMESTAMPS | DATES) -> [same as input type]
    返回选定元素中最小值。
###### **Max**(STRINGS | NUMERICS | TIMESTAMPS | DATES) -> [same as input type]
    返回选定元素中最大值。
###### **Avg**(NUMERICS) -> [same as input type]
    返回选定元素的平均值。
###### **Array_Agg**(x) -> [same as input type]
    返回一个数组，该数组由选定元素的所有值组成。
### **统计聚合函数**
###### **Var**(NUMERICS) |  Var_Samp(NUMERICS) -> [same as input type]
    计算给定样本的方差
###### **Var_Pop**(NUMERICS) -> [same as input type]
    返回从组的值计算出的总体方差。
###### **Stddev**(NUMERICS) | Stddev_Samp(NUMERICS) -> [same as input type]
    返回从组中的值计算出的样本标准偏差。
###### **Stddev_Pop**(NUMERICS) -> [same as input type]
    返回从组的值计算出的总体标准偏差。
###### **Covar**(NUMERICS, NUMERICS) | Covar_Samp(NUMERICS, NUMERICS) -> [same as first input type]
    返回样本的协方差
###### **Covar_Pop**(NUMERICS, NUMERICS) -> [same as first input type]
    返回组中数字对的总体协方差。
###### **Corr**(NUMERICS, NUMERICS) -> [same as first input type]
    返回表示一组数字对之间的关联情况的皮尔逊系数。

### **近似聚合函数**

###### **Approx_Distinct**(x) -> Int64
    approx_distinct(x) -> uint64返回不同输入值的近似值(HyperLogLog)。
###### **Approx_Percentile_Cont**(NUMERICS, Float64) -> [same as first input type]
    approx_percentile_cont(x, p) -> x返回输入值的近似百分位(TDigest)，其中p是0到1(包括)之间的浮点64。
###### **Approx_Percentile_Cont_With_Weight**(NUMERICS, [same as first type], Float64) ->
    approx_percentile_cont_with_weight(x, w, p) -> x返回带权重的输入值的近似百分比(TDigest)，其中w是权重列表达式，p是0到1(包括)之间的浮点64。
###### **Approx_Median**(NUMERICS) -> [same as input type]
    返回输入值的近似中值。
###### **Grouping**(x) -> Int32
    GROUPING 函数采用单个参数，该参数必须是 GROUP BY 子句的 ROLLUP、CUBE 或 GROUPING SETS 扩展的表达式列表中指定的维度列的表达式。

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