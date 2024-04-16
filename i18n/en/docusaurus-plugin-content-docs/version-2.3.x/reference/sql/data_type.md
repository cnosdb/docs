---
sidebar_position: 1
---

# Data Type

CnosDB's SQL is implemented using Apache Arrow DataFusion, DataFusion uses Arrow types to execute queries, and the data types stored in CnosDB are mapped to SQL data types when queried.

You can see the corresponding Arrow type for any SQL expression using the arrow_typeof function. For example:

```sql {1}
SELECT arrow_typeof('Hello CnosDB!');
+-------------------------------------+
| arrow_typeof(Utf8("Hello CnosDB!")) |
+-------------------------------------+
| Utf8                                |
+-------------------------------------+
```

You can also convert the content in the SQL expression to a specified Arrow type, such as converting `Timestamp` type to `Date32`:

```sql {1}
SELECT arrow_cast(now(), 'Date32');
+------------+
| now()      |
+------------+
| 2024-03-05 |
+------------+
```

CnosDB can only store partial data types, for detailed information please refer to [`CREATE DATABASE`](ddl#create-database).

## Character Types

| SQL Data Types | Arrow Data Type |
| -------------- | --------------- |
| `CHAR`         | `Utf8`          |
| `VARCHAR`      | `Utf8`          |
| `TEXT`         | `Utf8`          |
| `STRING`       | `Utf8`          |

## Numeric Types

| SQL Data Types                      | Arrow Data Type |
| ----------------------------------- | --------------- |
| `TINYINT`                           | `Int8`          |
| `SMALLINT`                          | `Int16`         |
| `INT` 或 `INTEGER`                   | `Int32`         |
| `BIGINT`                            | `Int64`         |
| `TINYINT UNSIGNED`                  | `UInt8`         |
| `SMALLINT UNSIGNED`                 | `UInt16`        |
| `INT UNSIGNED` 或 `INTEGER UNSIGNED` | `UInt32`        |
| `BIGINT UNSIGNED`                   | `UInt64`        |
| `FLOAT`                             | `Float32`       |
| `REAL`                              | `Float32`       |
| `DOUBLE`                            | `Float64`       |

## 日期和时间

| SQL Data Types | Arrow Data Type               |
| -------------- | ----------------------------- |
| `DATE`         | `Date32`                      |
| `TIME`         | `Time64(Nanosecond)`          |
| `TIMESTAMP`    | `Timestamp(Nanosecond, None)` |
| `INTERVAL`     | `Interval(MonthDayNano)`      |

## 布尔类型

| SQL Data Types | Arrow Data Type |
| -------------- | --------------- |
| `BOOLEAN`      | `Boolean`       |

## 二进制类型

| SQL Data Types | Arrow Data Type |
| -------------- | --------------- |
| `BYTEA`        | `Binary`        |

## 不支持的 SQL 类型

| SQL Data Types | Arrow Data Type |
| -------------- | --------------- |
| `UUID`         | Unsupported     |
| `BLOB`         | Unsupported     |
| `CLOB`         | Unsupported     |
| `BINARY`       | Unsupported     |
| `VARBINARY`    | Unsupported     |
| `REGCLASS`     | Unsupported     |
| `NVARCHAR`     | Unsupported     |
| `CUSTOM`       | Unsupported     |
| `ARRAY`        | Unsupported     |
| `ENUM`         | Unsupported     |
| `SET`          | Unsupported     |
| `DATETIME`     | Unsupported     |

## 支持的 Arrow 类型

> The following types are supported by the `ARROW_TYPEOF` function:

| Arrow 类型                                                                                                 |
| -------------------------------------------------------------------------------------------------------- |
| `Null`                                                                                                   |
| `Boolean`                                                                                                |
| `Int8`                                                                                                   |
| `Int16`                                                                                                  |
| `Int32`                                                                                                  |
| `Int64`                                                                                                  |
| `UInt8`                                                                                                  |
| `UInt16`                                                                                                 |
| `UInt32`                                                                                                 |
| `UInt64`                                                                                                 |
| `Float16`                                                                                                |
| `Float32`                                                                                                |
| `Float64`                                                                                                |
| `Utf8`                                                                                                   |
| `LargeUtf8`                                                                                              |
| `Binary`                                                                                                 |
| `Timestamp(Second, None)`                                                                                |
| `Timestamp(Millisecond, None)`                                                                           |
| `Timestamp(Microsecond, None)`                                                                           |
| `Timestamp(Nanosecond, None)`                                                                            |
| `Time32`                                                                                                 |
| `Time64`                                                                                                 |
| `Duration(Second)`                                                                                       |
| `Duration(Millisecond)`                                                                                  |
| `Duration(Microsecond)`                                                                                  |
| `Duration(Nanosecond)`                                                                                   |
| `Interval(YearMonth)`                                                                                    |
| `Interval(DayTime)`                                                                                      |
| `Interval(MonthDayNano)`                                                                                 |
| `FixedSizeBinary(<len>)` (e.g. `FixedSizeBinary(16)`) |
| `Decimal128(<precision>, <scale>)` e.g. `Decimal128(3, 10)`              |
| `Decimal256(<precision>, <scale>)` e.g. `Decimal256(3, 10)`              |
