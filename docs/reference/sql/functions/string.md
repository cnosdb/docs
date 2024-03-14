---
sidebar_position: 3
description: 字符串函数是用于处理和操作文本字符串的函数集合。它们包括字符串连接、字符串分割、字符串查找和替换、字符串长度计算等操作。字符串函数可以帮助你处理和转换文本数据，进行字符串匹配和处理。
---

# 字符串函数

## ascii

返回字符串中第一个字符的 ASCII 值。

```sql
ascii(str)
```

| 参数  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| `str` | 要操作的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |

<details>
  <summary>查看 <code>ascii</code> 示例</summary>

```sql {1}
SELECT ascii('abc');
+--------------------+
| ascii(Utf8("abc")) |
+--------------------+
| 97                 |
+--------------------+
```

</details>

**相关函数**：[chr](#chr)

## bit_length

返回字符串的位长度。

```sql
bit_length(str)
```

| 参数  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| `str` | 要操作的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |

<details>
  <summary>查看 <code>bit_length</code> 示例</summary>

```sql {1}
SELECT bit_length('abc');
+-------------------------+
| bit_length(Utf8("abc")) |
+-------------------------+
| 24                      |
+-------------------------+
```

</details>

**相关函数**：[length](#length)，[octet_length](#octet_length)

## btrim

从字符串的开头和结尾修剪指定的修剪字符串。如果未提供修剪字符串，则从输入字符串的开头和结尾删除所有空格。

```sql
btrim(str[, trim_str])
```

| 参数       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| `str`      | 要操作的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |
| `trim_str` | 从输入字符串的开头和结尾处修剪的字符串表达式。可以是常量、列或函数，以及算术运算符的任意组合。默认为空白字符。 |

<details>
  <summary>查看 <code>bit_length</code> 示例</summary>


</details>

**相关函数**：[ltrim](#ltrim)，[rtrim](#rtrim)，[trim](#trim)

## char_length

[length](#length) 的别名

## character_length

[length](#length) 的别名

## concat

将多个字符串连接在一起。

```sql
concat(separator, str[, ..., str_n])
```

| 参数        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `separator` | 用于在串联字符串之间插入的分隔符。                           |
| `str`       | 要连接的字符串表达式。可以是常量、列或函数，也可以是字符串运算符的任意组合。 |
| `str_n`     | 要连接的后续字符串列或文本字符串。                           |

<details>
  <summary>查看 <code>concat</code> 示例</summary>


</details>

**相关函数**：[concat_ws](#concat_ws)

## concat_ws

使用指定的分隔符将多个字符串连接在一起。

```sql
concat(separator, str[, ..., str_n])
```

| 参数        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `separator` | 用于在串联字符串之间插入的分隔符。                           |
| `str`       | 要连接的字符串表达式。可以是常量、列或函数，也可以是字符串运算符的任意组合。 |
| `str_n`     | 要连接的后续字符串列或文本字符串。                           |

<details>
  <summary>查看 <code>concat</code> 示例</summary>


</details>

**相关函数**：[concat](#concat)

## chr

返回具有指定 ASCII 或 Unicode 代码值的字符。

```sql
chr(expression)
```

| 参数        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `expression` | 包含要操作的 ASCII 或 Unicode 代码值的表达式。可以是常量、列或函数，也可以是算术或字符串运算符的任意组合。 |

<details>
  <summary>查看 <code>chr</code> 示例</summary>


</details>

**相关函数**：[ascii](#ascii)

## ends_with

测试字符串是否以字符串结束。

```sql
ends_with(str, substr)
```

| 参数        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `str` | 可以是常量、列或函数，也可以是字符串运算符的任意组合。 |
| `subset` | 要测试的子字符串。 |

<details>
  <summary>查看 <code>ends_with</code> 示例</summary>


</details>

## initcap

将输入字符串中每个单词的第一个字符大写。单词由非字母数字字符分隔。

```sql
initcap(str)
```

| 参数        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `str` | 可以是常量、列或函数，也可以是字符串运算符的任意组合。 |

<details>
  <summary>查看 <code>ends_with</code> 示例</summary>


</details>

**相关函数：**[lower](#lower)，[upper](#upper)

## instr

[strpos](#strpos) 的别名。

## left

从字符串左侧开始返回指定数量的字符。

```sql
left(str, n)
```

| 参数  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| `str` | 要连接的字符串表达式。可以是常量、列或函数，也可以是字符串运算符的任意组合。 |
| `n`   | 要返回的字符数。                                             |

<details>
  <summary>查看 <code>left</code> 示例</summary>

```sql {1}
SELECT left('abcde', 3);
+------------------------------+
| left(Utf8("abcde"),Int64(3)) |
+------------------------------+
| abc                          |
+------------------------------+
```

</details>

## length

返回字符串中的长度。

```sql
length(str)
```

<details>
  <summary>查看 <code>length</code> 示例</summary>

```sql
SELECT length('Hello CnosDB!');
+-----------------------------------------+
| character_length(Utf8("Hello CnosDB!")) |
+-----------------------------------------+
| 13                                      |
+-----------------------------------------+
```

</details>

**相关函数：**[bit_length](#bit_length),[octet_length](#octet_length)

## lower

将字符串转换为小写。

```sql
lower(str)
```

<details>
  <summary>查看 <code>lower</code> 示例</summary>

```sql
SELECT lower('CNOSDB');
+-----------------------+
| lower(Utf8("CNOSDB")) |
+-----------------------+
| cnosdb                |
+-----------------------+
```

</details>

**相关函数：**[initcap](#initcap),[upper](#upper)

## lpad

用另一个字符串将字符串的左侧填充到指定的字符串长度。

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `str`         | 要连接的字符串表达式。可以是常量、列或函数，也可以是字符串运算符的任意组合。 |
| `n`           | 要填充的字符串长度。                                         |
| `padding_str` | 要填充的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。默认为空格。 |

<details>
  <summary>查看 <code>lpad</code> 示例</summary>

```sql {1}
SELECT lpad('abc', 10, '1');
+---------------------------------------+
| lpad(Utf8("abc"),Int64(10),Utf8("1")) |
+---------------------------------------+
| 1111111abc                            |
+---------------------------------------+
```

</details>

**相关函数：**[rpad](#rpad)

## ltrim

删除字符串中左边的空格。

<details>
  <summary>查看 <code>ltrim</code> 示例</summary>

</details>

**相关函数：**[btrim](#btrim),[rtrim](#btrim),[trim](#trim)

## octet_length

返回字符串的长度（以字节为单位）。

```sql
octet_length(str)
```

<details>
  <summary>查看 <code>ltrim</code> 示例</summary>

</details>

**相关函数：**[bit_length](#bit_length),[length](#bit_length)

## repeat

返回一个字符串，其中输入字符串重复指定的次数。

| 参数  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| `str` | 要重复的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |
| `n`   | 重复输入字符串的次数。                                       |

<details>
  <summary>查看 <code>repeat</code> 示例</summary>

</details>

## replace

将字符串中所有出现的指定子字符串替换为新的子字符串。

| 参数  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| `str` | 要重复的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |
| `substr`   | 要替换输入字符串的子串表达式。可以是常量、列或函数，也可以是字符串运算符的任意组合。 |
| `replacement` | 替换子字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |

<details>
  <summary>查看 <code>replace</code> 示例</summary>

</details>

## reverse

反转字符串的字符顺序。

```sql
reverse(str)
```

<details>
  <summary>查看 <code>reverse</code> 示例</summary>

</details>

## right

从字符串右侧返回指定数量的字符。

```sql
right(str, n)
```

| 参数  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| `str` | 要重复的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |
| `n`   | 要返回的字符数。 |

<details>
  <summary>查看 <code>right</code> 示例</summary>

</details>

**相关函数：**[left](#left)

## rpad

用另一个字符串将字符串的右侧填充到指定的字符串长度。

```sql
rpad(str, n[, padding_str])
```

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `str`         | 要重复的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |
| `n`           | 要填充的字符串长度。                                         |
| `padding_str` | 要填充的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。默认为空格。 |

<details>
  <summary>查看 <code>rpad</code> 示例</summary>

</details>

**相关函数：**[lpad](#lpad) 

## rtrim

从字符串中删除右侧空格。

```sql
rtrim(str)
```
<details>
  <summary>查看 <code>rpad</code> 示例</summary>

</details>

**相关函数：**[btrim](#btrim), [ltrim](#ltrim), [trim](#trim)

## split_part

根据指定分隔符分割字符串，并返回指定位置的子字符串。

```sql
split_part(str, delimiter, pos)
```

| 参数        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `str`       | 要重复的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |
| `delimiter` | 要分割的字符串或字符。                                       |
| `pos`       | 要返回的部分的位置。                                         |

<details>
  <summary>查看 <code>split_part</code> 示例</summary>

</details>

## starts_with

测试字符串是否以子字符串开头。

```sql
starts_with(str, substr)
```

<details>
  <summary>查看 <code>split_part</code> 示例</summary>

</details>


## strpos

返回字符串中指定子字符串的起始位置。位置从 1 开始。如果字符串中不存在该子字符串，则该函数返回 0。

```sql
strpos(str, substr)
```

等价于 [instr](#instr)

## substr

从字符串中的特定起始位置提取指定数量的字符的子字符串。

```sql
substr(str, start_pos[, length])
```

| 参数        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `str`       | 要重复的字符串表达式。可以是常量、列或函数，以及字符串运算符的任意组合。 |
| `start_pos` | 子字符串开始的字符位置。字符串中第一个字符的位置为 1。       |
| `length`    | 要提取的字符数。如果未指定，则返回起始位置之后的字符串的其余部分。 |

## to_hex
## translate
## trim
## upper
## uuid
## overlay
## levenshtein
## substr_index
## find_in_set
## position
