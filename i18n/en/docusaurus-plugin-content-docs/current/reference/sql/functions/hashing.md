---
sidebar_position: 4
---

# Hash Functions

Hash function is an important tool for achieving data consistency and quick retrieval.Hash functions help the database to manage and query data efficiently by mapping the input data into a fixed length hash.

## digest

Computes the binary hash of an expression using the specified algorithm.

```sql
digest(expression, algorithm)
```

| Parameters   | Description                                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | String expression to operate on.Can be a constant, column, or function, and any combination of string operators.     |
| `algorithm`  | String expression specifying algorithm to be used: `md5`,  `sha224`, `sha256`,  `sha384`,  `sha512`, `blake2s`, `blake2b`,  `blake3` |

<details>
  <summary>View <code>digest</code> Example</summary>

```sql {1}
SELECT digest('Hello CnosDB', 'md5');
+------------------------------------------+
| digest(Utf8("Hello CnosDB"),Utf8("md5")) |
+------------------------------------------+
| 0daa6f74dbedeab58db254f19990ab80         |
+------------------------------------------+
```

This is equal to:

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

Computes an MD5 128-bit checksum for a string expression.

```sql
md5(expression)
```

| Parameters   | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>md5</code> Example</summary>

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

Computes the SHA-224 hash of a binary string.

```sql
sha224(expression)
```

| Parameters   | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>sha224</code> Example</summary>

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

Computes the SHA-256 hash of a binary string.

```sql
sha256(expression)
```

| Parameters   | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>sha256</code> Example</summary>

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

Computes the SHA-384 hash of a binary string.

```sql
sha384(expression)
```

| Parameters   | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>sha384</code> Example</summary>

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

Computes the SHA-512 hash of a binary string.

```sql
sha512(expression)
```

| Parameters   | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expression` | String expression to operate on.Can be a constant, column, or function, and any combination of string operators. |

<details>
  <summary>View <code>sha512</code> Example</summary>

```sql {1}
SELECT sha512('Hello CnosDB');
+----------------------------------------------------------------------------------------------------------------------------------+
| sha512(Utf8("Hello CnosDB"))                                                                                                     |
+----------------------------------------------------------------------------------------------------------------------------------+
| 23236d44057dfc15069a35caaf9ba551a4b9c16d0af0b68964721dbb1c343b38b863ab4090d8cb331947c72b558dcd77f40baa492d130bd0d6d826fee67d5542 |
+----------------------------------------------------------------------------------------------------------------------------------+
```

</details>
