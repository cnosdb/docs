---
sidebar_position: 3
---

# String Functions

String functions are a collection of functions used to handle and manipulate text strings.They include operations such as string concatenation, string splitting, string searching and replacing, and string length calculation.String functions can help you manipulate and transform text data, perform string matching and processing.

## ascii

Returns the ASCII value of the first character in a string.

```sql
ascii(str)
```

| Parameters | Description                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `str`      | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>ascii</code> Example</summary>

```sql {1}
SELECT ascii('abc');
+--------------------+
| ascii(Utf8("abc")) |
+--------------------+
| 97                 |
+--------------------+
```

</details>

**Related functions**: [chr](#chr)

## bit_length

Returns the bit length of a string.

```sql
bit_length(str)
```

| Parameters | Description                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `str`      | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>bit_length</code> Example</summary>

```sql {1}
SELECT bit_length('abc');
+-------------------------+
| bit_length(Utf8("abc")) |
+-------------------------+
| 24                      |
+-------------------------+
```

</details>

**Related functions**: [length](#length), [octet_length](#octet_length)

## btrim

Trims the specified trim string from the start and end of a string.If no trim string is provided, all whitespace is removed from the start and end of the input string.

```sql
btrim(str[, trim_str])
```

| Parameters | Description                                                                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`      | String expression to operate on.Can be a constant, column, or function, and any combination of string operators.                                                                                               |
| `trim_str` | String expression to trim from the beginning and end of the input string.Can be a constant, column, or function, and any combination of arithmetic operators.Default is whitespace characters. |

<details>
  <summary>View <code>btrim</code> Example</summary>

```sql {1}
SELECT btrim('111abc111','1');
+------------------------------------+
| btrim(Utf8("111abc111"),Utf8("1")) |
+------------------------------------+
| abc                                |
+------------------------------------+
```

</details>

**Related functions**: [ltrim](#ltrim), [rtrim](#rtrim), [trim](#trim)

## char_length

Alias of [length](#length)

## character_length

Alias of [length](#length)

## concat

Concatenates multiple strings together.

```sql
concat(separator, str[, ..., str_n])
```

| Parameters  | Description                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `separator` | Separator used to insert between concatenated strings.                                                                            |
| `str`       | String expression to concatenate.Can be a constant, column, or function, and any combination of string operators. |
| `str_n`     | Subsequent string column or literal string to concatenate.                                                                        |

<details>
  <summary>View <code>concat</code> Example</summary>

```sql {1}
SELECT concat('a', 'b', 'c');
+---------------------------------------+
| concat(Utf8("a"),Utf8("b"),Utf8("c")) |
+---------------------------------------+
| abc                                   |
+---------------------------------------+
```

</details>

**Related functions**: [concat_ws](#concat_ws)

## concat_ws

Concatenates multiple strings together with the specified separator.

```sql
concat_ws(separator, str[, ..., str_n])
```

| Parameters  | Description                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `separator` | Separator used to insert between concatenated strings.                                                                            |
| `str`       | String expression to concatenate.Can be a constant, column, or function, and any combination of string operators. |
| `str_n`     | Subsequent string column or literal string to concatenate.                                                                        |

<details>
  <summary>View <code>concat_ws</code> Example</summary>

```sql {1}
SELECT concat_ws(' ', 'a', 'b', 'c');
+----------------------------------------------------+
| concat_ws(Utf8(" "),Utf8("a"),Utf8("b"),Utf8("c")) |
+----------------------------------------------------+
| a b c                                              |
+----------------------------------------------------+
```

</details>

**Related functions**: [concat](#concat)

## chr

Returns the character with the specified ASCII or Unicode code value.

```sql
chr(expression)
```

| Parameters   | Description                                                                                                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | Expression containing the ASCII or Unicode code values to operate on.Can be a constant, column, or function, and any combination of arithmetic or string operators. |

<details>
  <summary>View <code>chr</code> Example</summary>

```sql {1}
SELECT chr(20005);
+-------------------+
| chr(Int64(20005)) |
+-------------------+
| 严                |
+-------------------+
```

</details>

**Related functions**: [ascii](#ascii)

## initcap

Capitalize the first character of each word in the input string.Words are separated by non-alphanumeric characters.

```sql
initcap(str)
```

| Parameters | Description                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `str`      | Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>initcap</code> Example</summary>

```sql {1}
SELECT initcap('hello world');


+------------------------------+
| initcap(Utf8("hello world")) |
+------------------------------+
| Hello World                  |
+------------------------------+
```

</details>

**Related functions:**[lower](#lower)，[upper](#upper)

## instr

Alias of [strpos](#strpos).

## left

Returns a specified number of characters starting from the left side of the string.

```sql
left(str, n)
```

| Parameters | Description                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`      | String expression to concatenate.Can be a constant, column, or function, and any combination of string operators. |
| `n`        | Number of characters to return.                                                                                                   |

<details>
  <summary>View <code>left</code> Example</summary>

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

Returns the number of characters in a string.

```sql
length(str)
```

<details>
  <summary>View <code>length</code> Example</summary>

```sql
SELECT length('Hello CnosDB!');
+-----------------------------------------+
| character_length(Utf8("Hello CnosDB!")) |
+-----------------------------------------+
| 13                                      |
+-----------------------------------------+
```

</details>

**Related functions**: [bit_length](#bit_length),[octet_length](#octet_length)

## lower

Convert string to lower-case.

```sql
lower(str)
```

<details>
  <summary>View <code>lower</code> Example</summary>

```sql
SELECT lower('CNOSDB');
+-----------------------+
| lower(Utf8("CNOSDB")) |
+-----------------------+
| cnosdb                |
+-----------------------+
```

</details>

**Related functions:**[initcap](#initcap),[upper](#upper)

## lpad

Pads the left side of a string with another string to a specified string length.

```sql
lpad(str, n[, padding_str])
```

| Parameters    | Description                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`         | String expression to concatenate.Can be a constant, column, or function, and any combination of string operators.                                 |
| `n`           | String length to pad to.                                                                                                                                          |
| `padding_str` | String expression to pad with.Can be a constant, column, or function, and any combination of string operators.Default is a space. |

<details>
  <summary>View <code>lpad</code> Example</summary>

```sql {1}
SELECT lpad('abc', 10, '1');
+---------------------------------------+
| lpad(Utf8("abc"),Int64(10),Utf8("1")) |
+---------------------------------------+
| 1111111abc                            |
+---------------------------------------+
```

</details>

**Related functions:**[rpad](#rpad)

## ltrim

Remove the spaces on the left side of the string.

```
ltrim(str[, trim_str])
```

| Parameters | Description                                                                                                                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`      | String expression to operate on.Can be a constant, column, or function, and any combination of string operators.                                                                                       |
| `trim_str` | String expression to trim from the beginning of the input string.Can be a constant, column, or function, and any combination of arithmetic operators.Default is whitespace characters. |

<details>
  <summary>View <code>ltrim</code> Example</summary>

```sql {1}
SELECT ltrim('   abc');
+-----------------------+
| ltrim(Utf8("   abc")) |
+-----------------------+
| abc                   |
+-----------------------+
```

</details>

**Related functions**: [btrim](#btrim),[rtrim](#btrim),[trim](#trim)

## octet_length

Returns the length of a string (in bytes).

```sql
octet_length(str)
```

<details>
  <summary>View <code>octet_length</code> Example</summary>

```sql {1}
SELECT octet_length('Hello');
+-----------------------------+
| octet_length(Utf8("Hello")) |
+-----------------------------+
| 5                           |
+-----------------------------+
```

</details>

**Related functions**: [bit_length](#bit_length),[length](#bit_length)

## repeat

Returns a string with an input string repeated a specified number.

```
repeat(str, n)
```

| Parameters | Description                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`      | String expression to repeat.Can be a constant, column, or function, and any combination of string operators. |
| `n`        | Number of times to repeat the input string.                                                                                  |

<details>
  <summary>View <code>repeat</code> Example</summary>

```sql {1}
SELECT repeat('a', 5);
+----------------------------+
| repeat(Utf8("a"),Int64(5)) |
+----------------------------+
| aaaaa                      |
+----------------------------+
```

</details>

## replace

Replaces all occurrences of a specified substring in a string with a new substring.

```
replace(str, substr, replacement)
```

| Parameters    | Description                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`         | String expression to repeat.Can be a constant, column, or function, and any combination of string operators.                         |
| `substr`      | Substring expression to replace in the input string.Can be a constant, column, or function, and any combination of string operators. |
| `replacement` | Replacement substring expression.Can be a constant, column, or function, and any combination of string operators.                    |

<details>
  <summary>View <code>replace</code> Example</summary>

```sql {1}
SELECT replace('aaa', 'a', 'b');
+------------------------------------------+
| replace(Utf8("aaa"),Utf8("a"),Utf8("b")) |
+------------------------------------------+
| bbb                                      |
+------------------------------------------+
```

</details>

## reverse

Reverse the order of characters in the string.

```sql
reverse(str)
```

<details>
  <summary>View <code>reverse</code> Example</summary>

```sql {1}
SELECT reverse('hello');
+------------------------+
| reverse(Utf8("hello")) |
+------------------------+
| olleh                  |
+------------------------+
```

</details>

## right

Returns a specified number of characters from the right side of a string.

```sql
right(str, n)
```

| Parameters | Description                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`      | String expression to repeat.Can be a constant, column, or function, and any combination of string operators. |
| `n`        | Number of characters to return.                                                                                              |

<details>
  <summary>View <code>repeat</code> Example</summary>

```sql {1}
SELECT right('aaabbb', 3);
+--------------------------------+
| right(Utf8("aaabbb"),Int64(3)) |
+--------------------------------+
| bbb                            |
+--------------------------------+
```

</details>

**Related functions:**[left](#left)

## rpad

Pads the right side of a string with another string to a specified string length.

```sql
rpad(str, n[, padding_str])
```

| Parameters    | Description                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`         | String expression to repeat.Can be a constant, column, or function, and any combination of string operators.                                      |
| `n`           | String length to pad to.                                                                                                                                          |
| `padding_str` | String expression to pad with.Can be a constant, column, or function, and any combination of string operators.Default is a space. |

<details>
  <summary>View <code>rpad</code> Example</summary>

```sql {1}
SELECT rpad('aaa', 10, 'b');
+---------------------------------------+
| rpad(Utf8("aaa"),Int64(10),Utf8("b")) |
+---------------------------------------+
| aaabbbbbbb                            |
+---------------------------------------+
```

</details>

**Related functions:**[lpad](#lpad)

## rtrim

Remove trailing spaces from a string.

```sql
rtrim(str)
```

<details>
  <summary>View <code>rtrim</code> Example</summary>

```sql {1}
SELECT rtrim('aaabbb', 'b');
+---------------------------------+
| rtrim(Utf8("aaabbb"),Utf8("b")) |
+---------------------------------+
| aaa                             |
+---------------------------------+
```

</details>

**Related functions**: [btrim](#btrim), [ltrim](#ltrim), [trim](#trim)

## split_part

Splits a string based on a specified delimiter and returns the substring in the specified position.

```sql
split_part(str, delimiter, pos)
```

| Parameters  | Description                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`       | String expression to repeat.Can be a constant, column, or function, and any combination of string operators. |
| `delimiter` | String or character to split on.                                                                                             |
| `pos`       | Position of the part to return.                                                                                              |

<details>
  <summary>View <code>split_part</code> Example</summary>

```sql {1}
SELECT split_part('abc|def|ghi', '|', 2);
+----------------------------------------------------+
| split_part(Utf8("abc|def|ghi"),Utf8("|"),Int64(2)) |
+----------------------------------------------------+
| def                                                |
+----------------------------------------------------+
```

</details>

## starts_with

Tests if a string starts with a substring.

```sql
starts_with(str, substr)
```

<details>
  <summary>View <code>split_part</code> Example</summary>

```sql
SELECT starts_with('abcdefg', 'abc');
+------------------------------------------+
| starts_with(Utf8("abcdefg"),Utf8("abc")) |
+------------------------------------------+
| true                                     |
+------------------------------------------+
```

</details>

## strpos

Returns the starting position of a specified substring in a string.Positions begin at 1.If the substring does not exist in the string, the function returns 0.

```sql
strpos(str, substr)
```

Equivalent to [instr](#instr)

<details>
  <summary>View <code>strpos</code> Example</summary>

```sql {1}
SELECT strpos('abcdef', 'def');
+------------------------------------+
| strpos(Utf8("abcdef"),Utf8("def")) |
+------------------------------------+
| 4                                  |
+------------------------------------+
```

</details>

## substr

Extracts a substring of a specified number of characters from a specific starting position in a string.

```sql
substr(str, start_pos[, length])
```

| Parameters  | Description                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `str`       | String expression to repeat.Can be a constant, column, or function, and any combination of string operators. |
| `start_pos` | Character position to start the substring at.The first character in the string has a position of 1.          |
| `length`    | Number of characters to extract.If not specified, returns the rest of the string after the start position.   |

<details>
  <summary>View <code>substr</code> Example</summary>

```sql {1}
SELECT substr('abcdef', 4, 3);
+------------------------------------------+
| substr(Utf8("abcdef"),Int64(4),Int64(3)) |
+------------------------------------------+
| def                                      |
+------------------------------------------+
```

</details>

## to_hex

Converts an integer to a hexadecimal string.

```sql
to_hex(int)
```

| Parameters | Description                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int`      | Integer expression to convert.Can be a constant, column, or function, and any combination of arithmetic operators. |

<details>
  <summary>View <code>to_hex</code> Example</summary>

```sql {1}
SELECT to_hex(100);
+--------------------+
| to_hex(Int64(100)) |
+--------------------+
| 64                 |
+--------------------+
```

</details>

## translate

Translates characters in a string to specified translation characters.

```sql
translate(str, chars, translation)
```

| Parameters    | Description                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `str`         | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |
| `char`        | Characters to translate.                                                                                                         |
| `translation` | Translation characters.Translation characters replace only characters at the same position in the chars string.  |

<details>
  <summary>View <code>translate</code> Example</summary>

```sql {1}
SELECT translate('aaabbb', 'bbb', 'ccc');
+---------------------------------------------------+
| translate(Utf8("aaabbb"),Utf8("bbb"),Utf8("ccc")) |
+---------------------------------------------------+
| aaaccc                                            |
+---------------------------------------------------+
```

</details>

## trim

The function removes the string consisting of the specified string from the beginning, end or both ends of the specified string.

```sql
trim( [ BOTH | LEADING | TRAILING ] [trim_chars FROM ] str )
```

| Parameters   | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `str`        | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |
| `trim_chars` | Specify the characters to remove.                                                                                                |
| `BOTH`       | Optional, means removing specified characters from both ends of the string.                                                      |
| `LEADING`    | Optional, means removing only the specified characters on the left side of the string.                                           |
| `TRAILING`   | Optional, means removing only the specified characters on the right side of the string.                                          |

<details>
  <summary>View <code>trim</code> Example</summary>

**Remove characters from both sides.**

```sql {1}
SELECT trim(BOTH 'x' FROM 'xxxHello CnosDBxxx');
+---------------------------------------------+
| btrim(Utf8("xxxHello CnosDBxxx"),Utf8("x")) |
+---------------------------------------------+
| Hello CnosDB                                |
+---------------------------------------------+
```

**Remove characters from the left.**

```sql {1}
SELECT trim(LEADING 'x' FROM 'xxxHello CnosDBxxx');
+---------------------------------------------+
| ltrim(Utf8("xxxHello CnosDBxxx"),Utf8("x")) |
+---------------------------------------------+
| Hello CnosDBxxx                             |
+---------------------------------------------+
```

**Remove characters from the right.**

```sql {1}
SELECT trim(TRAILING 'x' FROM 'xxxHello CnosDBxxx');
+---------------------------------------------+
| rtrim(Utf8("xxxHello CnosDBxxx"),Utf8("x")) |
+---------------------------------------------+
| xxxHello CnosDB                             |
+---------------------------------------------+
```

**Remove spaces directly.**

```sql {1}
SELECT trim('   Hello CnosDB   ');
+----------------------------------+
| trim(Utf8("   Hello CnosDB   ")) |
+----------------------------------+
| Hello CnosDB                     |
+----------------------------------+
```

</details>

**Related functions**: [btrim](#btrim), [ltrim](#ltrim), [rtrim](#rtrim)

## upper

Converts a string to upper-case.

```sql
upper(str)
```

| Parameters | Description                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `str`      | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>substr</code> Example</summary>

```sql {1}
SELECT upper('cnosdb');
+-----------------------+
| upper(Utf8("cnosdb")) |
+-----------------------+
| CNOSDB                |
+-----------------------+
```

</details>

Related functions:\*\*[initcap](#initcap), [lower](#lower)

## uuid

Returns UUID v4 string value which is unique per row.

```sql
uuid()
```

<details>
  <summary>View <code>uuid</code> Example</summary>

```sql {1}
SELECT uuid();
+--------------------------------------+
| uuid()                               |
+--------------------------------------+
| cdc025fe-99c0-40ec-892e-dee3eb23019c |
+--------------------------------------+
```

</details>
