---
sidebar_position: 1
---

# 数据类型

CnosDB 的 SQL 使用 Apache Arrow DataFusion 实现，DataFusion 使用 Arrow 类型来执行查询，存储在 CnosDB 中的数据类型在查询时会被映射成 SQL 数据类型。

您可以通过 `arrow_typeof` 函数查询字段的 Arrow 数据数据类型，如下所示：

```sql {1}
SELECT arrow_typeof('Hello CnosDB!');
+-------------------------------------+
| arrow_typeof(Utf8("Hello CnosDB!")) |
+-------------------------------------+
| Utf8                                |
+-------------------------------------+
```

也可以将 SQL 表达式中的内容转换为指定的 Arrow 类型，比如将 `Timestamp` 类型转换为 `Date32`：

```sql {1}
SELECT arrow_cast(now(), 'Date32');
+------------+
| now()      |
+------------+
| 2024-03-05 |
+------------+
```

CnosDB 只能存储部分数据类型，详细内容请查看 [`CREATE DATABASE`](ddl#create-database)。

## 字符类型

| SQL 数据类型  | Arrow 数据类型 |
| --------- | ---------- |
| `CHAR`    | `Utf8`     |
| `VARCHAR` | `Utf8`     |
| `TEXT`    | `Utf8`     |
| `STRING`  | `Utf8`     |

## 数值类型

| SQL 数据类型                            | Arrow 数据类型 |
| ----------------------------------- | ---------- |
| `TINYINT`                           | `Int8`     |
| `SMALLINT`                          | `Int16`    |
| `INT` 或 `INTEGER`                   | `Int32`    |
| `BIGINT`                            | `Int64`    |
| `TINYINT UNSIGNED`                  | `UInt8`    |
| `SMALLINT UNSIGNED`                 | `UInt16`   |
| `INT UNSIGNED` 或 `INTEGER UNSIGNED` | `UInt32`   |
| `BIGINT UNSIGNED`                   | `UInt64`   |
| `FLOAT`                             | `Float32`  |
| `REAL`                              | `Float32`  |
| `DOUBLE`                            | `Float64`  |

## 日期和时间

| SQL 数据类型    | Arrow 数据类型                    |
| ----------- | ----------------------------- |
| `DATE`      | `Date32`                      |
| `TIME`      | `Time64(Nanosecond)`          |
| `TIMESTAMP` | `Timestamp(Nanosecond, None)` |
| `INTERVAL`  | `Interval(MonthDayNano)`      |

## 布尔类型

| SQL 数据类型  | Arrow 数据类型 |
| --------- | ---------- |
| `BOOLEAN` | `Boolean`  |

## 二进制类型

| SQL 数据类型 | Arrow 数据类型 |
| -------- | ---------- |
| `BYTEA`  | `Binary`   |

## 地理空间类型

CnosDB 使用 [WKT（Well-known text）](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)支持 \*\*地理空间类型（[Geometry](https://en.wikipedia.org/wiki/Geometry)）\*\*的数据查询。

| 几何类型                 | 语法                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------ |
| `Point`              | `POINT (<x1> <y1>)`                                                                  |
| `LineString`         | `LINESTRING (<x1> <y1>, <x2> <y2>, ...)`                                             |
| `Polygon`            | `POLYGON ((<x1> <y1>, <x2> <y2>, ...))`                                              |
| `MultiPoint`         | `MULTIPOINT (<x1> <y1>, <x2> <y2>, ...)`                                             |
| `MultiLineString`    | `MULTILINESTRING ((<x1> <y1>, <x2> <y2>, ...), (<x1> <y1>, <x2> <y2>, ...))`         |
| `MultiPolygon`       | `MULTIPOLYGON (((<x1> <y1>, <x2> <y2>, ...)), ((<x1> <y1>, <x2> <y2>, ...)))`        |
| `GeometryCollection` | `GEOMETRYCOLLECTION (<geometry tag1> <wkt data1>, <geometry tag2> <wkt data2>, ...)` |

## 不支持的 SQL 类型

| SQL 数据类型    | Arrow 数据类型 |
| ----------- | ---------- |
| `UUID`      | 不支持        |
| `BLOB`      | 不支持        |
| `CLOB`      | 不支持        |
| `BINARY`    | 不支持        |
| `VARBINARY` | 不支持        |
| `REGCLASS`  | 不支持        |
| `NVARCHAR`  | 不支持        |
| `CUSTOM`    | 不支持        |
| `ARRAY`     | 不支持        |
| `ENUM`      | 不支持        |
| `SET`       | 不支持        |
| `DATETIME`  | 不支持        |

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
