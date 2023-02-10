---
title: Data Types
order: 1
---

## Data Types

| Type             | Description              | Size  |
|-----------------| ----------------- | ----- |
| BIGINT          | Integer             | 8 Bytes |
| BIGINT UNSIGNED | Unsigned Integer        | 8 Bytes |
| BOOLEAN         | Boolean Type          | 1 Byte |
| TIMESTAMP       | Time Stamp           | 8 Bytes |
| STRING          | UTF-8 Encoded String | ----- |
| DOUBLE          | Double Precision Floating Point      | 8 Bytes |

## Other Data Types

The following data types can't be stored directly, but can appear in SQL expressions.

| Type | Description | Remarks                                         |
|----------|-------------|--------------------------------------------|
| BINARY | Binary data,can be converted to STRING using Cast clause. | The return values of functions sha224, sha256, sha384, sha512 belong to this type. |
| INTERVAL | Time Interval | Required by time addition or subtraction and function data_bin's parameters.                      |
|ARRAY | Array Type | Aggregate function array_agg's return type .                        |

## Constant

| Type             | Syntax                                    | Description                                                                               |
|-----------------|---------------------------------------|-----------------------------------------------------------------------------------|
| BIGINT          | \[{+\-}\]123                          |                                                                                   |     Numeric type                |
| BIGINT UNSIGNED | \[+]123                               | Numeric type                                                                              |
| DOUBLE          | 123.45                                | Numerical type, scientific notation is not supported at present.                                                                  |
| BOOLEAN         | {true &#124; false &#124; t &#124; f} |                                                                                   |
| STRING          | 'abc'                                 | The double quotation mark format is not supported. Two consecutive '' in                                                             |
| TIMESTAMP       | TIMESTAMP '1900-01-01T12:00:00Z'      | Timestamp, the keyword TIMESTAMP indicates that the following string constant need to be interpreted as TIMESTAMP type.|
| --              | NULL                                  | Null Value                                                                                |

### TIMESTAMP constant syntax
The time stamp is based on RCF3339 standard.

T represents interval, which can only be replaced by space

Z represents zero time zone

+08:00 represents the East 8th District

as follows：
- `1997-01-31T09:26:56.123Z` # Standard RCF3339, UTC time zone
- `1997-01-31T09:26:56.123+08:00` # Standard RCF3339, East 8th District
- `1997-01-31 09:26:56.123+08:00` # Close to RCF3339, just replace T by space 
- `1997-01-31T09:26:56.123` # Close to RCF3339, no time zone is specified, defaults to UTC
- `1997-01-31 09:26:56.123` # Close to RCF3339, replace T by space, and no time zone is specified 
- `1997-01-31 09:26:56`     # Close to RCF3339, replace T by space, and no time zone is specified

**Note**：`CAST (BIGINT AS TIMESTAMP)`is a timestamp converted to nanosecond, as follows

```sql
SELECT CAST (1 AS TIMESTAMP);
```
    +-------------------------------+
    | Int64(1)                      |
    +-------------------------------+
    | 1970-01-01T00:00:00.000000001 |
    +-------------------------------+

### INTERVAL Constant Syntax

1. `INTERVAL '1' DAY` One day
2. `INTERVAL '1' MONTH` One month
3. `INTERVAL '1' HOUR` One hour
4. `INTERVAL '1' MINS` One minute
5. `INTERVAL '1' YEAR` One year
6. `INTERVAL '1' SECS` One second
