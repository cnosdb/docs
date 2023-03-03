---
title: Functions
order: 9
---

## **Mathematical Functions**
### **abs(x)**
**Function**：   Return the absolute value of x.

**Parameter Type**：Numeric type

**Return Type**：Consistent with function parameter type.

**Example**：
```sql
SELECT abs(-1);
```

    +----------------+
    | abs(Int64(-1)) |
    +----------------+
    | 1              |
    +----------------+

----------------

### **acos(x)**
**Function**：   Return the arccosine of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：

```sql
SELECT acos(3);
```

    +----------------+
    | acos(Int64(3)) |
    +----------------+
    | NaN            |
    +----------------+

```sql
SELECT acos(0.5);
```

    +--------------------+
    | acos(Float64(0.5)) |
    +--------------------+
    | 1.0471975511965976 |
    +--------------------+

----------------

### **asin(x)**
**Function：**：   Return the arcsine of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT asin(0.5);
```
    +--------------------+
    | asin(Float64(0.5)) |
    +--------------------+
    | 0.5235987755982988 |
    +--------------------+

```sql
SELECT asin(5);
```
    +----------------+
    | asin(Int64(5)) |
    +----------------+
    | NaN            |
    +----------------+

----------------

### **atan(x)**
**Function**：   Return the arctangent of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT atan(5);
```

    +-------------------+
    | atan(Int64(5))    |
    +-------------------+
    | 1.373400766945016 |
    +-------------------+

----------------

### **atan2(y,x)**
**Function**：   Return the arctangent of y/x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT atan2(10, 2);
```

    +---------------------------+
    | atan2(Int64(10),Int64(2)) |
    +---------------------------+
    | 1.3734008                 |
    +---------------------------+

----------------

### **ceil(x)**
**Function**： Round up.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**：
```sql
SELECT ceil(1.6);
```
    +--------------------+
    | ceil(Float64(1.6)) |
    +--------------------+
    | 2                  |
    +--------------------+

----------------


### **floor(x)**
**Function**：  Round down.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**：
```sql
SELECT floor(-3.1);
```
    +----------------------+
    | floor(Float64(-3.1)) |
    +----------------------+
    | -4                   |
    +----------------------+

----------------

### **cos(x)**
**Function**：   Return the cosine of x.

**参Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT cos(1);
```
    +--------------------+
    | cos(Int64(1))      |
    +--------------------+
    | 0.5403023058681398 |
    +--------------------+

--------------------
### **sin(x)**
**Function**：   Return the sine of x.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT sin(5);
```
    +---------------------+
    | sin(Int64(5))       |
    +---------------------+
    | -0.9589242746631385 |
    +---------------------+
----------------

### **exp(x)**
**Function**：  Return e to the x power.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT exp(1);
```
    +-------------------+
    | exp(Int64(1))     |
    +-------------------+
    | 2.718281828459045 |
    +-------------------+

----------------

### **ln(x)**
**Function**：   Natural logarithm.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT ln(2.718281828459045);
```
    +--------------------------------+
    | ln(Float64(2.718281828459045)) |
    +--------------------------------+
    | 1                              |
    +--------------------------------+

----------------



### **log(x) | log10(x)**
**Function**：   Base 10 logarithm.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT log(10);
```
    +----------------+
    | log(Int64(10)) |
    +----------------+
    | 1              |
    +----------------+

```sql
SELECT log10(10);
```

    +----------------+
    | log(Int64(10)) |
    +----------------+
    | 1              |
    +----------------+

----------------

### **log2(x)**
**Function**：  Base 2 logarithm.

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT log2(4);
```

    +----------------+
    | log2(Int64(4)) |
    +----------------+
    | 2              |
    +----------------+
----------------

### **power(x,y) | pow(x,y)**
****：   x的y次方

**Parameter Type**：Numeric type

**Return Type**：DOUBLE

**Example**：
```sql
SELECT power(2, 3);
```
    +--------------------------+
    | power(Int64(2),Int64(3)) |
    +--------------------------+
    | 8                        |
    +--------------------------+
----------------

### **round(x)**
**Function**：   Rounded to the nearest whole number.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**：
```sql
SELECT round(3.5);
```
    +---------------------+
    | round(Float64(3.5)) |
    +---------------------+
    | 4                   |
    +---------------------+

----------------

### **signum(x)**
**Function**：   Signs of parameter (-1,0,+1).

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**：
```sql
SELECT signum(-3);
```

    +-------------------+
    | signum(Int64(-3)) |
    +-------------------+
    | -1                |
    +-------------------+

----------------

### **sqrt(x)**
**Function**：   Square root of x.

**Parameter Type**：Numeric type

**Return Type**：Consistent with function parameter type.

**Example**：
```sql
SELECT sqrt(4);
```
    +----------------+
    | sqrt(Int64(4)) |
    +----------------+
    | 2              |
    +----------------+

----------------

### **tan(x)**
**Function**：    Tangent value of x.

**Parameter Type**：Numeric type

**Return Type**： DOUBLE

**Example**：
```sql
SELECT tan(1);
```
    +-------------------+
    | tan(Int64(1))     |
    +-------------------+
    | 1.557407724654902 |
    +-------------------+

----------------

### **trunc(x)**
**Function**：Round to zero.

**Parameter Type**：Numeric type

**Return Type**：BIGINT

**Example**：
```sql
SELECT trunc(-3.9);
```
    +----------------------+
    | trunc(Float64(-3.9)) |
    +----------------------+
    | -3                   |
    +----------------------+

----------------

### **struct**

    struct(expr1 [, ...] ) 

**Function**：Create a STRUCT with the specified field value.

**Parameter Type**：Numeric type

**Note**：Function struct is not perfect at present.

--------------------------

## **Note**

### **coalesce**
    coalesce(expr[,...exp])
**Function**：Return its first non null parameter. Null is returned only when all parameters are null. When retrieving data for display, it is often used to replace the default value with a null value.

**Parameter Type**：Any type

**Return Type**：First non null parameter type

**Example**：
```sql
SELECT coalesce(temperature, null, station) FROM air;
```
    +--------------------------------------------+
    | coalesce(air.temperature,NULL,air.station) |
    +--------------------------------------------+
    | 69.0                                       |
    | 78.0                                       |
    | 62.0                                       |
    | 79.0                                       |
    | 53.0                                       |
    | 72.0                                       |
    | 71.0                                       |
    | 69.0                                       |
    | 80.0                                       |
    | 74.0                                       |
    | 70.0                                       |
    | 70.0                                       |
    | 70.0                                       |
    +--------------------------------------------+
----------------

### **nullif**
    nullif(expr1, expr2) 

**Function**：If expr1 is equal to expr2, NULL is returned; Otherwise, expr1 is returned.

**Parameter Type**：expr1 and expr2 are numeric expressions with column values

**Return Type**：The type of expr1 or NULL

**Example**：
```sql
SELECT nullif(temperature, 70) FROM air;
```
    +-----------------------------------+
    | nullif(air.temperature,Int64(70)) |
    +-----------------------------------+
    | 69                                |
    | 78                                |
    | 62                                |
    | 79                                |
    | 53                                |
    | 72                                |
    | 71                                |
    | 69                                |
    | 80                                |
    | 74                                |
    |                                   |
    |                                   |
    |                                   |
    +-----------------------------------+

----------------

## **String Functions**

[//]: # (### **Array**)
[//]: # (    创建数组)

### **ascii**

    ascii(str) 

**Function**: Convert the first character in str to its ASCII code and return it.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT ascii('abc');
```
    +------------------+
    | ascii(Utf8("a")) |
    +------------------+
    | 97               |
    +------------------+

```sql
SELECT ascii('a');
```

    +------------------+
    | ascii(Utf8("a")) |
    +------------------+
    | 97               |
    +------------------+

----------------

### **bit_length**

    bit_length(str) 

**Function**：Returns the bit length of string data or the bit size of binary data.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT bit_length('abc');
```
    +------------------------+
    | bitlength(Utf8("abc")) |
    +------------------------+
    | 24                     |
    +------------------------+
----------------

### **btrim**

    btrim(string [, matching_string ] ) 

**Function**：The function trims a string by removing leading and trailing spaces or by removing characters that match an optional specified string.

**Parameter Type**：STRING

**Return Type**: STRING

**Example**：
```sql
SELECT btrim('     abc                  ');
```
    +-------------------------------------------+
    | btrim(Utf8("     abc                  ")) |
    +-------------------------------------------+
    | abc                                       |
    +-------------------------------------------+

```sql
SELECT btrim('111abc111','1');
```
    +------------------------------------+
    | btrim(Utf8("111abc111"),Utf8("1")) |
    +------------------------------------+
    | abc                                |
    +------------------------------------+

----------------

### **trim**

    trim(str) 

**Function**：Remove blank characters at the begin and end of str.

**Parameter Type**：STRING

**Return Type**：STRING

---------------------

### **char_length | character_length**

    char_length(expr) 

**Function**：Return the length of the specified string in characters.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT char_length('你好');
```
    +-------------------------------+
    | characterlength(Utf8("你好"))  |
    +-------------------------------+
    | 2                             |
    +-------------------------------+

----------------

### **chr**

    chr(expr) 

**Function**：Return the character at the provided UTF-16 code.

**Parameter Type**: BIGINT

**Return Type**: STRING

**Example**：
```sql
SELECT chr(20005);
```
    +-------------------+
    | chr(Int64(20005)) |
    +-------------------+
    | 严                |
    +-------------------+

----------------

### **con``cat**

    concat(expr1, expr2 [, ...exp] ) 

**Function**：Joins two or more expressions and returns the generated expression.

**Parameter Type**：STRING

**Return Type**: STRING

**Example**：
```sql
SELECT concat('a', 'b', 'c');
```

    +---------------------------------------+
    | concat(Utf8("a"),Utf8("b"),Utf8("c")) |
    +---------------------------------------+
    | abc                                   |
    +---------------------------------------+

----------------

### **concat_ws**

    concat_ws(sep , expr1 [, ...] ) 

**Function**：Return a concatenated string separated by sep.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**：
```sql
SELECT concat_ws(' ', 'a', 'b', 'c');
```
    +--------------------------------------------------------------+
    | concatwithseparator(Utf8(" "),Utf8("a"),Utf8("b"),Utf8("c")) |
    +--------------------------------------------------------------+
    | a b c                                                        |
    +--------------------------------------------------------------+

----------------

### **initcap**

    initcap(expr) 

**Function**：Capitalize the first letter of each word in the parameter.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT initcap('hello world');
```
    +------------------------------+
    | initcap(Utf8("hello world")) |
    +------------------------------+
    | Hello World                  |
    +------------------------------+

----------------

### **left**

    left(str, len) 

**Function**：Return the leftmost len characters in str.

**Parameter Type**：str is STRING type, len is BIGINT type

**Return Type**：STRING

**Example**：
```sql
SELECT left('abcde', 3);
```
    +------------------------------+
    | left(Utf8("abcde"),Int64(3)) |
    +------------------------------+
    | abc                          |
    +------------------------------+

----------------

### **lpad**

    lpad(expr, len [, pad] ) 

**Function**：Return expr filled with pad on the left. After filling, the length of the whole string is len.

**Parameter Type**：expr, pad type is STRING, len type is BIGINT

**Return Type**：BIGINT

When len is a negative number, len represents 0. When len is too large, function execution fails.

**Example**：
```sql
SELECT lpad('abc', 10, '1');
```
    +---------------------------------------+
    | lpad(Utf8("abc"),Int64(10),Utf8("1")) |
    +---------------------------------------+
    | 1111111abc                            |
    +---------------------------------------+

----------------

### **rpad**

    rpad(expr, len [, pad] ) 

**Function**：Return expr filled with pad on the right. After filling, the length of the whole string is len.

**Parameter Type**：expr, pad is STRING type, len is BIGINT type.

**Return Type**：STRING

**Example**：
```sql
SELECT rpad('aaa', 10, 'b');
```
    +---------------------------------------+
    | rpad(Utf8("aaa"),Int64(10),Utf8("b")) |
    +---------------------------------------+
    | aaabbbbbbb                            |
    +---------------------------------------+

----------------

### **lower**

    lower(expr) 

**Function**：Return lowercase string.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**：
```sql
SELECT lower('ABC');
```

    +--------------------+
    | lower(Utf8("ABC")) |
    +--------------------+
    | abc                |
    +--------------------+
----------------
### **upper**

    upper(expr)

**Function**：Return uppercase string.

**Parameter Type**：STRING

**Return Type**：STRING

-----------

### **ltrim**

    ltrim(str[, trimstr] ) 

**Function**：Returns str, in which the leading characters in trimstr are deleted. The default trimestr is blank character.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**：
```sql
SELECT ltrim('   abc');
```
    +-----------------------+
    | ltrim(Utf8("   abc")) |
    +-----------------------+
    | abc                   |
    +-----------------------+


----------------

### **md5**

    md5(expr) 

**Function**：Return the MD5 128 bit checksum of expr as a hexadecimal string.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**：
```sql
SELECT md5('abc');
```
    +----------------------------------+
    | md5(Utf8("abc"))                 |
    +----------------------------------+
    | 900150983cd24fb0d6963f7d28e17f72 |
    +----------------------------------+
----------------

### **octet_length**

    octet_length(expr) 

**Function**：Return the byte length of string data.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT octet_length('你好');
```
    +---------------------------+
    | octetlength(Utf8("你好")) |
    +---------------------------+
    | 6                         |
    +---------------------------+

----------------

### **random**

    random( [seed] ) 

**Function**：Return a random value between 0 and 1.

**Parameter Type**：None

**Return Type**：DOUBLE

**Example**：
```sql
SELECT random();
```
    +---------------------+
    | random()            |
    +---------------------+
    | 0.37577771377596325 |
    +---------------------+

[//]: # (### **Regexp_Replace**)
[//]: # (    regexp_replace&#40;str, regexp, rep [, position] &#41; )
[//]: # (**Function**：将 str 中与 regexp 匹配的所有子字符串都替换为 rep。)
[//]: # (**Parameter Type**：STRING)
[//]: # (**Return Type**：BIGINT)

----------------

### **repeat**

    repeat(expr, n) 

**Function**：Return a string that repeats expr n times.

**Parameter Type**：Expr type is STRING, n type is BIGINT.

**Return Type**：BIGINT

**Example**：
```sql
SELECT repeat('a', 5);
```
    +----------------------------+
    | repeat(Utf8("a"),Int64(5)) |
    +----------------------------+
    | aaaaa                      |
    +----------------------------+

----------------

### **replace**

    replace(str, search, replace ) 

**Function**：Replace all search items with replace.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT replace('aaa', 'a', 'b');
```
    +------------------------------------------+
    | replace(Utf8("aaa"),Utf8("a"),Utf8("b")) |
    +------------------------------------------+
    | bbb                                      |
    +------------------------------------------+

----------------

### **reverse**

    reverse(expr) 

**Function**：Return an inverted string or an array containing elements in reverse order.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT reverse('你好');
```
    +-----------------------+
    | reverse(Utf8("你好")) |
    +-----------------------+
    | 好你                  |
    +-----------------------+
----------------

### **right**

    right(str, len) 

**Function**：Return the rightmost len characters in the string str.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
 SELECT right('aaabbb', 3);
```
    +--------------------------------+
    | right(Utf8("aaabbb"),Int64(3)) |
    +--------------------------------+
    | bbb                            |
    +--------------------------------+


----------------

### **digest**

    digest(expr, algorithm)

**Function**：Return the rightmost len characters in the string str.

**Parameter Type**：expr and algorithm are both STRING

algorithm specifies the algorithm for computing hash. Only md5, sha224, sha256, sha384, sha512, blake2s, blake2b, blake3 are supported.

**Return Type**：BINARY

**Example**：
```sql
SELECT digest('abc', 'md5');
```
    +----------------------------------+
    | digest(Utf8("abc"),Utf8("md5"))  |
    +----------------------------------+
    | 900150983cd24fb0d6963f7d28e17f72 |
    +----------------------------------+

----------------

### **rtrim**

    rtrim( str [, trimstr] ) 

**Function**：Return the str with the trailing character trimstr deleted. trimstr is a blank character by default.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**：
```sql
SELECT rtrim('aaabbb', 'b');
```
    +---------------------------------+
    | rtrim(Utf8("aaabbb"),Utf8("b")) |
    +---------------------------------+
    | aaa                             |
    +---------------------------------+

----------------

### **sha224**
    sha224(str)

**Function**：Calculate sha224 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

**Example**：
```sql
 SELECT sha224('abc');
```
    +----------------------------------------------------------+
    | sha224(Utf8("abc"))                                      |
    +----------------------------------------------------------+
    | 23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7 |
    +----------------------------------------------------------+

----------------

### **sha256**
    sha256(str)
**Function**：    Calculate sha256 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

**Example**：
```sql
SELECT sha256('abc');
```
    +------------------------------------------------------------------+
    | sha256(Utf8("abc"))                                              |
    +------------------------------------------------------------------+
    | ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad |
    +------------------------------------------------------------------+

----------------

### **sha384**
    sha384(str)
**Function**：   Calculate sha384 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

**Example**：
```sql
SELECT sha384('abc');
```
    +--------------------------------------------------------------------------------------------------+
    | sha384(Utf8("abc"))                                                                              |
    +--------------------------------------------------------------------------------------------------+
    | cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7 |
    +--------------------------------------------------------------------------------------------------+

----------------

### **sha512**

    sha512(str)

**Function**： Calculate sha384 hash value of the string str.

**Return Type**：BINARY

**Parameter Type**：STRING

----------------

### **split_part**

    split_part(str, delim, n) 

**Function**： Split str according to delim, and return the nth part.

**Parameter Type**：str, delim type is STRING, partNum type is BIGINT

**Return Type**：STRING

**Example**：
```sql
SELECT split_part('abc|def|ghi', '|', 2);
```

    +---------------------------------------------------+
    | splitpart(Utf8("abc|def|ghi"),Utf8("|"),Int64(2)) |
    +---------------------------------------------------+
    | def                                               |
    +---------------------------------------------------+

----------------

### **starts_with**

    starts_with(expr, startExpr) 

**Function**： If expr starts with startExpr, it returns true.

**Parameter Type**：STRING

**Return Type**：BOOLEAN

**Example**：
```sql
SELECT starts_with('abcdefg', 'abc');
```
    +-----------------------------------------+
    | startswith(Utf8("abcdefg"),Utf8("abc")) |
    +-----------------------------------------+
    | true                                    |
    +-----------------------------------------+
----------------

### **strpos**

    strpos(str, substr ) 

**Function**：Return the position of a substring in a specified string.

**Parameter Type**：STRING

**Return Type**：BIGINT

**Example**：
```sql
SELECT strpos('abcdef', 'def');
```
    +------------------------------------+
    | strpos(Utf8("abcdef"),Utf8("def")) |
    +------------------------------------+
    | 4                                  |
    +------------------------------------+

----------------

### **substr**

    substr(expr, pos [, len] ) 

**Function**： Return the substring of expr (starting from pos, length len).

**Parameter Type**：expr type is STRING, pos, len type is BIGINT

**Return Type**：STRING

**Example**：
```sql
SELECT substr('abcdef', 4, 3);
```
    +------------------------------------------+
    | substr(Utf8("abcdef"),Int64(4),Int64(3)) |
    +------------------------------------------+
    | def                                      |
    +------------------------------------------+
----------------

### **to_hex**

    to_hex(value)

**Function**： Convert a decimal number to a hexadecimal representation.

**Parameter Type**：BIGINT

**Return Type**：STRING

**Example**：
```sql
SELECT to_hex(100);
```
    +-------------------+
    | tohex(Int64(100)) |
    +-------------------+
    | 64                |
    +-------------------+

----------------

### **translate**

    translate(expr, from, to) 

**Function**： Return an expr, where all characters in from are replaced by characters in to.

**Parameter Type**：STRING

**Return Type**：STRING

**Example**：
```sql
SELECT translate('aaabbb', 'bbb', 'ccc');
```
    +---------------------------------------------------+
    | translate(Utf8("aaabbb"),Utf8("bbb"),Utf8("ccc")) |
    +---------------------------------------------------+
    | aaaccc                                            |
    +---------------------------------------------------+


----------------



## Time Functions

### **date_part**

    date_part(field, expr) 

**Function**：Extract partial dates from timestamps or intervals.

**Parameter Type**：

field type is STRING, only one of （'year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', 'second'）

expr type is TIMESTAMP

**Return Type**：BIGINT

**Example**：
```sql
SELECT date_part('hour', TIMESTAMP '2022-11-21T09:18:17');
```
    +----------------------------------------------------+
    | datepart(Utf8("hour"),Utf8("2022-11-21T09:18:17")) |
    +----------------------------------------------------+
    | 9                                                  |
    +----------------------------------------------------+

----------------

### **date_trunc**

    date_trunc(field, expr) 

**Function**：Return a value truncated to the unit specified in field.

**Parameter Type**：field type is STRING, only one of （'year', 'quarter', 'month', 'week', 'day', 'doy', 'dow', 'hour', 'minute', 'second'）

expr type is TIMESTAMP.

**Example**：
```sql
SELECT date_trunc('month', TIMESTAMP '2022-11-21T09:18:17');
```
    +------------------------------------------------------+
    | datetrunc(Utf8("month"),Utf8("2022-11-21T09:18:17")) |
    +------------------------------------------------------+
    | 2022-11-01T00:00:00                                  |
    +------------------------------------------------------+
----------------

### **date_bin**
    date_bin(interval, source, origin)
**Function**： Starting from the origin, the bucket is split by interval, and the bucket timestamp of the source is returned.

**Parameter Type**：

Interval type is STRING, which will be resolved to time interval.

source and origin type are TIMESTAMP.

**Return Type**：TIMESTAMP

```sql
SELECT date_bin(INTERVAL '1' DAY, TIMESTAMP '2022-11-21T09:10:24', TIMESTAMP '2022-11-01T00:00:00');
```
    +------------------------------------------------------------------------------------------------+
    | datebin(IntervalDayTime("4294967296"),Utf8("2022-11-21T09:10:24"),Utf8("2022-11-01T00:00:00")) |
    +------------------------------------------------------------------------------------------------+
    | 2022-11-21T00:00:00                                                                            |
    +------------------------------------------------------------------------------------------------+

----------------

### **to_timestamp**

    to_timestamp(expr) 

**Function**：Return expr cast to a timestamp in a optional format.

**Parameter Type**：STRING or BIGINT

**Return Type**：TIMESTAMP. The precision depends on the parameter. If parameter type is BIGINT, it returns a nanosecond TIMESTAMP.

**Example**：
```sql
SELECT to_timestamp('1970-01-01T00:00:00');
```
    +------------------------------------------+
    | totimestamp(Utf8("1970-01-01T00:00:00")) |
    +------------------------------------------+
    | 1970-01-01T00:00:00                      |
    +------------------------------------------+
```sql
SELECT to_timestamp(1);
```
    +-------------------------------+
    | totimestamp(Int64(1))         |
    +-------------------------------+
    | 1970-01-01T00:00:00.000000001 |
    +-------------------------------+

----------------

### **to_timestamp_millis**

    to_timestamp_millis(expr) 

**Function**：Convert to a millisecond-level timestamp.

**Parameter Type**：BIGINT or STRING

**Return Type**：Millisecond-level TIMESTAMP

**Example**：
```sql
SELECT to_timestamp_millis('1970-01-01T00:00:00.00301');
```
    +------------------------------------------------------+
    | totimestampmillis(Utf8("1970-01-01T00:00:00.00301")) |
    +------------------------------------------------------+
    | 1970-01-01T00:00:00.003                              |
    +------------------------------------------------------+
```sql
SELECT to_timestamp_millis(1);
```
    +-----------------------------+
    | totimestampmillis(Int64(1)) |
    +-----------------------------+
    | 1970-01-01T00:00:00.001     |
    +-----------------------------+

----------------

### **to_timestamp_micros**

    to_timestamp_micros(expr) 
**Function**：Convert to a microsecond-level timestamp.

**Parameter**：BIGINT or STRING

**Return Type**： Microsecond-level TIMESTAMP

**Example**：
```sql
SELECT to_timestamp_micros(1)
```
    +-----------------------------+
    | totimestampmicros(Int64(1)) |
    +-----------------------------+
    | 1970-01-01T00:00:00.000001  |
    +-----------------------------+

---------

### **to_timestamp_seconds**
    to_timestamp_seconds(expr) 
**Function**：Convert to a second-level timestamp.

**Parameter Type**：BIGINT or STRING

**Return Type**：Second-level TIMESTAMP

```
SELECT to_timestamp_seconds(1);
```

    +------------------------------+
    | totimestampseconds(Int64(1)) |
    +------------------------------+
    | 1970-01-01T00:00:01          |
    +------------------------------+
----------------

### **from_unixtime**
    from_unixtime(unixTime) 

**Function**：Return unixTime.

**Parameter Type**： BIGINT

**Return Type**： Unix time in second-level.
```
SELECT from_unixtime(1);
```
    +------------------------+
    | fromunixtime(Int64(1)) |
    +------------------------+
    | 1970-01-01T00:00:01    |
    +------------------------+
----------------

### **now**
    now()


**Function**：Return the current timestamp.

**Return Type**：TIMESTAMP

```
SELECT now();
```
    +----------------------------------+
    | now()                            |
    +----------------------------------+
    | 2022-11-21T04:44:19.742107+00:00 |
    +----------------------------------+



[//]: # (### **Regexp_Match**)
[//]: # (    返回与正则表达式匹配的项)
