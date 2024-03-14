---
sidebar_position: 8
---

import APITable from '@site/src/components/APITable';

# 地理空间函数

空间函数是用于处理和操作三维空间数据的函数集合。

CnosDB 使用 [WKT（Well-known text）](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)支持 **地理空间类型（[Geometry](https://en.wikipedia.org/wiki/Geometry)）**的数据查询。

支持的类型请参考 [地理空间类型](../data_type.md#地理空间类型)

```sql
<geometry tag> <wkt data>

<geometry tag> ::= POINT | LINESTRING | POLYGON | MULTIPOINT | 
                   MULTILINESTRING | MULTIPOLYGON | GEOMETRYCOLLECTION
                   
<wkt data> ::= <point> | <linestring> | <polygon> | <multipoint> | 
               <multilinestring> | <multipolygon> | <geometrycollection>
```

```mdx-code-block
<APITable>
```

| 几何类型             | 图片                                             | 示例                                                         |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `Point`              | ![](/img/sql/SFA_Point.svg.png)                  | `POINT (30 10)`                                              |
| `LineString`         | ![](/img/sql/102px-SFA_LineString.svg.png)       | `LINESTRING (30 10, 10 30, 40 40)`                           |
| `Polygon`            | ![](/img/sql/SFA_Polygon.svg.png)                | `POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))`              |
|                      | ![](/img/sql/SFA_Polygon_with_hole.svg.png)      | `POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))` |
| `MultiPoint`         | ![](/img/sql/SFA_MultiPoint.svg.png)             | `MULTIPOINT ((10 40), (40 30), (20 20), (30 10))`            |
|                      |                                                  | `MULTIPOINT (10 40, 40 30, 20 20, 30 10)`                    |
| `MultiLineString`    | ![](/img/sql/102px-SFA_MultiLineString.svg.png)  | `MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))` |
| `MultiPolygon`       | ![](/img/sql/SFA_MultiPolygon.svg.png)           | `MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))` |
|                      | ![](/img/sql/SFA_MultiPolygon_with_hole.svg.png) | `MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20)))` |
| `GeometryCollection` | ![](/img/sql/SFA_GeometryCollection.svg.png)     | ` GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))` |

```mdx-code-block
</APITable>
```

## ST_AsBinary

将空间几何对象 Geometry 以 [WKB](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary) 格式返回。

```sql
ST_AsBinary(geometry)
```

<details>
  <summary>查看 <code>ST_AsBinary</code> 示例</summary>

```sql {1}
SELECT ST_AsBinary('POINT(0 3)');
+--------------------------------------------+
| st_AsBinary(Utf8("POINT(0 3)"))            |
+--------------------------------------------+
| 010100000000000000000000000000000000000840 |
+--------------------------------------------+
```

</details>

## ST_GeomFromWKB

把 [WKB](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary) 格式二进制转为 Geometry 类型

```sql
ST_GeomFromWKB(wkb)
```

<details>
  <summary>查看 <code>ST_GeomFromWKB</code> 示例</summary>

```sql {1}
SELECT ST_GeomFromWKB(ST_AsBinary('POINT(0 3)'));
+-------------------------------------------------+
| st_GeomFromWKB(st_AsBinary(Utf8("POINT(0 3)"))) |
+-------------------------------------------------+
| POINT(0 3)                                      |
+-------------------------------------------------+
```

</details>

## ST_Distance

返回两个几何体的 2D 投影之间的最小欧氏距离。

```sql
ST_Distance(geometry1, gemometry2)
```

<details>
  <summary>查看 <code>ST_Distance</code> 示例</summary>

**计算两点之间的距离。**

```sql {1}
SELECT ST_Distance('POINT(0 0)', 'LINESTRING (30 10, 10 30, 40 40)');
+--------------------------------------------------------------------------+
| ST_Distance(Utf8("POINT(0 0)"),Utf8("LINESTRING (30 10, 10 30, 40 40)")) |
+--------------------------------------------------------------------------+
| 28.284271247461902                                                       |
+--------------------------------------------------------------------------+
```

**计算点到线的直线距离。**

```sql {1}
SELECT ST_Distance('POINT(0 0)', 'LINESTRING (30 10, 10 30, 40 40)');
+--------------------------------------------------------------------------+
| st_distance(Utf8("POINT(0 0)"),Utf8("LINESTRING (30 10, 10 30, 40 40)")) |
+--------------------------------------------------------------------------+
| 28.284271247461902                                                       |
+--------------------------------------------------------------------------+
```

**计算平面和平面之间的距离。**

```sql {1}
SELECT ST_Distance('POLYGON((0 2,1 1,0 -1,0 2))', 'POLYGON((-1 -3,-2 -1,0 -3,-1 -3))');
+--------------------------------------------------------------------------------------------+
| st_distance(Utf8("POLYGON((0 2,1 1,0 -1,0 2))"),Utf8("POLYGON((-1 -3,-2 -1,0 -3,-1 -3))")) |
+--------------------------------------------------------------------------------------------+
| 1.4142135623730951                                                                         |
+--------------------------------------------------------------------------------------------+
```

</details>

## ST_Area

返回几何对象 2D 投影的笛卡尔面积。面积单位与用于表示输入几何体坐标的单位相同。 对于 `Point`、`LineString`、`MultiPoint` 和 `MultiLineString、Line`，此函数返回 0。 对于几何体集合，它返回集合中几何体的面积之和。

:::tip
部分几何图形不支持计算面积，对这些几何体计算面积会返回 0，如：`Point`、`MultiPoint`、`LineString`、`MultiLineString、Line`。 如果参数内容格式非法，返回值为 `NULL`。
:::

```sql
ST_Area(geometry)
```

<details>
  <summary>查看 <code>ST_Area</code> 示例</summary>

```sql {1}
SELECT ST_Area('POLYGON ((40 40, 20 45, 45 30, 40 40))');
+---------------------------------------------------------+
| ST_Area(Utf8("POLYGON ((40 40, 20 45, 45 30, 40 40))")) |
+---------------------------------------------------------+
| 87.5                                                    |
+---------------------------------------------------------+
```

</details>

## ST_Equals

比较两个几何体，如果两个几何体完全相同，则返回 `true`。

:::tip
`ST_Equals(A, B)` 等价于 `ST_Within(A, B)` && `ST_Within(B, A)`
:::


```sql
ST_Equals(A, B)
```

<details>
  <summary>查看 <code>ST_Area</code> 示例</summary>

```sql {1}
select ST_Equals('LINESTRING(0 0, 10 10)', 'LINESTRING(0 0, 5 5, 10 10)') st_equals;
+-----------+
| st_equals |
+-----------+
| true      |
+-----------+
```

</details>

## ST_Contains

如果几何对象A包含几何对象B，返回 `true`。

```sql
ST_Contains(A, B)
```

<details>
  <summary>查看 <code>ST_Contains</code> 示例</summary>

```sql {1}
select ST_Contains('POLYGON((0 0,0 3,3 0,0 0))', 'POLYGON((0 0,0 1,1 0,0 0))') st_contains;
+-------------+
| st_contains |
+-------------+
| true        |
+-------------+
```

</details>

## ST_Intersects

如果两个几何对象相交，则返回 `true`。

`ST_Intersects(A, B)`

<details>
  <summary>查看 <code>ST_Intersects</code> 示例</summary>

```sql {1}
select ST_Intersects('LINESTRING(3 2, 7 6)', 'LINESTRING(3 4, 8 4)') st_intersects;
+---------------+
| st_intersects |
+---------------+
| true          |
+---------------+
```

</details>

## ST_Disjoint

如果两个几何对象不相接，返回 `true`。

`ST_Disjoint(A, B)`

<details>
  <summary>查看 <code>ST_Disjoint</code> 示例</summary>

```sql {1}
select ST_Disjoint('LINESTRING(0 0,-3 -3)', 'LINESTRING(0 1,1 0)');
+------------------------------------------------------------------------+
| ST_Disjoint(Utf8("LINESTRING(0 0,-3 -3)"),Utf8("LINESTRING(0 1,1 0)")) |
+------------------------------------------------------------------------+
| true                                                                   |
+------------------------------------------------------------------------+
```

</details>


## ST_Within

如果给定的Geometry对象A完全在对象B之内，则返回 `true`。

```sql
ST_Within(A, B)
```

<details>
  <summary>查看 <code>ST_Within</code> 示例</summary>

```sql {1}
select ST_Within('POLYGON((1 1, 1 2, 2 2, 2 1, 1 1))', 'POLYGON((0 0, 0 3, 3 3, 3 0, 0 0))');
+--------------------------------------------------------------------------------------------------+
| ST_Within(Utf8("POLYGON((1 1, 1 2, 2 2, 2 1, 1 1))"),Utf8("POLYGON((0 0, 0 3, 3 3, 3 0, 0 0))")) |
+--------------------------------------------------------------------------------------------------+
| true                                                                                             |
+--------------------------------------------------------------------------------------------------+
```

</details>
