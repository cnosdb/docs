---
sidebar_position: 4
---

# 哈希函数

哈希函数是实现数据一致性和快速检索的重要工具。哈希函数通过将输入数据映射为固定长度的哈希值，帮助数据库高效地管理和查询数据。

## digest

使用指定算法计算表达式的二进制哈希值。

```sql
digest(expression, algorithm)
```

| Parameters   | Description                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| `expression` | 要进行操作的字符串表达式。Can be a constant, column, or function, and any combination of string operators. |
| `algorithm`  | 字符串表达式，指定要使用的算法：`md5`,  `sha224` , `sha256`,  `sha384`,  `sha512` , `blake2s` , `blake2b`,  `blake3`          |

<details>
  <summary>查看 <code>digest</code> 示例</summary>

```sql {1}
SELECT digest('Hello CnosDB', 'md5');
+------------------------------------------+
| digest(Utf8("Hello CnosDB"),Utf8("md5")) |
+------------------------------------------+
| 0daa6f74dbedeab58db254f19990ab80         |
+------------------------------------------+
```

这等价于：

```sql {1}
SELECT md5('Hello CnosDB');
+----------------------------------+
| md5(Utf8("Hello CnosDB"))        |
+----------------------------------+
| 0daa6f74dbedeab58db254f19990ab80 |
+----------------------------------+
```

</details>

## md5

计算字符串表达式的 MD5 128 位校验和。

```sql
md5(expression)
```

| Parameters   | Description                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| `expression` | 要进行操作的字符串表达式。Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>查看 <code>md5</code> 示例</summary>

```sql {1}
SELECT md5('Hello CnosDB');
+----------------------------------+
| md5(Utf8("Hello CnosDB"))        |
+----------------------------------+
| 0daa6f74dbedeab58db254f19990ab80 |
+----------------------------------+
```

</details>

## sha224

计算二进制字符串的 SHA-224 哈希值。

```sql
sha224(expression)
```

| Parameters   | Description                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| `expression` | 要进行操作的字符串表达式。Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>查看 <code>sha224</code> 示例</summary>

```sql {1}
SELECT sha224('Hello CnosDB');
+----------------------------------------------------------+
| sha224(Utf8("Hello CnosDB"))                             |
+----------------------------------------------------------+
| f57778984d974d652f9cb8b732e31d58376e9de05bfea03ba250c04f |
+----------------------------------------------------------+
```

</details>

## sha256

计算二进制字符串的 SHA-256 哈希值。

```sql
sha256(expression)
```

| Parameters   | Description                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| `expression` | 要进行操作的字符串表达式。Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>查看 <code>sha256</code> 示例</summary>

```sql {1}
SELECT sha256('Hello CnosDB');
+------------------------------------------------------------------+
| sha256(Utf8("Hello CnosDB"))                                     |
+------------------------------------------------------------------+
| 98b6cd650208a2abaa20c116933e9b0b596b885ebea62ac3f55278ff5739224c |
+------------------------------------------------------------------+
```

</details>

## sha384

计算二进制字符串的 SHA-384 哈希值。

```sql
sha384(expression)
```

| Parameters   | Description                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| `expression` | 要进行操作的字符串表达式。Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>查看 <code>sha384</code> 示例</summary>

```sql {1}
SELECT sha384('Hello CnosDB');
+--------------------------------------------------------------------------------------------------+
| sha384(Utf8("Hello CnosDB"))                                                                     |
+--------------------------------------------------------------------------------------------------+
| e8ad4ce9de9665b96cb5809f785db4a89197e905573f087cd5ff320ba031d5fa9e09b06d644d94765b8d9a206221d1a1 |
+--------------------------------------------------------------------------------------------------+
```

</details>

## sha512

计算二进制字符串的 SHA-512 哈希值。

```sql
sha512(expression)
```

| Parameters   | Description                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| `expression` | 要进行操作的字符串表达式。Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>查看 <code>sha512</code> 示例</summary>

```sql {1}
SELECT sha512('Hello CnosDB');
+----------------------------------------------------------------------------------------------------------------------------------+
| sha512(Utf8("Hello CnosDB"))                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------+
| 23236d44057dfc15069a35caaf9ba551a4b9c16d0af0b68964721dbb1c343b38b863ab4090d8cb331947c72b558dcd77f40baa492d130bd0d6d826fee67d5542 |
+----------------------------------------------------------------------------------------------------------------------------------+
```

</details>
