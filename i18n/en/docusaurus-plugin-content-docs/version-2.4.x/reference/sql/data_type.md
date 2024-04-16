---
sidebar_position: 1
---

# Data Types

CnosDB SQL is implemented using Apache Arrow DataFusion, DataFusion uses Arrow types to execute queries, and the data types stored in CnosDB are mapped to SQL data types when queried.

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

| SQL Data Types                       | Arrow Data Type |
| ------------------------------------ | --------------- |
| `TINYINT`                            | `Int8`          |
| `SMALLINT`                           | `Int16`         |
| `INT` or `INTEGER`                   | `Int32`         |
| `BIGINT`                             | `Int64`         |
| `TINYINT UNSIGNED`                   | `UInt8`         |
| `SMALLINT UNSIGNED`                  | `UInt16`        |
| `INT UNSIGNED` or `INTEGER UNSIGNED` | `UInt32`        |
| `BIGINT UNSIGNED`                    | `UInt64`        |
| `FLOAT`                              | `Float32`       |
| `REAL`                               | `Float32`       |
| `DOUBLE`                             | `Float64`       |

## Date/Time Types

| SQL Data Types | Arrow Data Type               |
| -------------- | ----------------------------- |
| `DATE`         | `Date32`                      |
| `TIME`         | `Time64(Nanosecond)`          |
| `TIMESTAMP`    | `Timestamp(Nanosecond, None)` |
| `INTERVAL`     | `Interval(MonthDayNano)`      |

## Boolean Types

| SQL Data Types | Arrow Data Type |
| -------------- | --------------- |
| `BOOLEAN`      | `Boolean`       |

## Binary Types

| SQL Data Types | Arrow Data Type |
| -------------- | --------------- |
| `BYTEA`        | `Binary`        |

## Geo Types

CnosDB uses [WKT (Well-known text)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) to support **geospatial type ([Geometry](https://en.wikipedia.org/wiki/Geometry))** data queries.

| Geometry types       | Syntax                                                                               |
| -------------------- | ------------------------------------------------------------------------------------ |
| `Point`              | `POINT (<x1> <y1>)`                                                                  |
| `LineString`         | `LINESTRING (<x1> <y1>, <x2> <y2>, ...)`                                             |
| `Polygon`            | `POLYGON ((<x1> <y1>, <x2> <y2>, ...))`                                              |
| `MultiPoint`         | `MULTIPOINT (<x1> <y1>, <x2> <y2>, ...)`                                             |
| `MultiLineString`    | `MULTILINESTRING ((<x1> <y1>, <x2> <y2>, ...), (<x1> <y1>, <x2> <y2>, ...))`         |
| `MultiPolygon`       | `MULTIPOLYGON (((<x1> <y1>, <x2> <y2>, ...)), ((<x1> <y1>, <x2> <y2>, ...)))`        |
| `GeometryCollection` | `GEOMETRYCOLLECTION (<geometry tag1> <wkt data1>, <geometry tag2> <wkt data2>, ...)` |

## Unsupported SQL Types

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

## Supported Arrow Types

> The following types are supported by the `ARROW_TYPEOF` function:

| Arrow Types                                                                                              |
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
