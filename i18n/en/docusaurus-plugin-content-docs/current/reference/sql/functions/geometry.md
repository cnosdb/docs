---
sidebar_position: 9
---

import APITable from '@site/src/components/APITable';

# Geospatial Functions

Geospatial functions are a collection of functions used to handle and manipulate three-dimensional spatial data.

CnosDB uses [WKT (Well-known text)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) to support **geospatial type ([Geometry](https://en.wikipedia.org/wiki/Geometry))** data queries.

Please refer to [Geospatial Types](../data_type.md#Geospatial_Types) for supported types

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

| Geometry types       | image                                            | Example                                                                                                                    |
| -------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `Point`              | ![](/img/sql/SFA_Point.svg.png)                  | `POINT (30 10)`                                                                                                            |
| `LineString`         | ![](/img/sql/102px-SFA_LineString.svg.png)       | `LINESTRING (30 10, 10 30, 40 40)`                                                                                         |
| `Polygon`            | ![](/img/sql/SFA_Polygon.svg.png)                | `POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))`                                                                            |
|                      | ![](/img/sql/SFA_Polygon_with_hole.svg.png)      | `POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))`                                              |
| `MultiPoint`         | ![](/img/sql/SFA_MultiPoint.svg.png)             | `MULTIPOINT ((10 40), (40 30), (20 20), (30 10))`                                                                          |
|                      |                                                  | `MULTIPOINT (10 40, 40 30, 20 20, 30 10)`                                                                                  |
| `MultiLineString`    | ![](/img/sql/102px-SFA_MultiLineString.svg.png)  | `MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))`                                                    |
| `MultiPolygon`       | ![](/img/sql/SFA_MultiPolygon.svg.png)           | `MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))`                                        |
|                      | ![](/img/sql/SFA_MultiPolygon_with_hole.svg.png) | `MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20)))` |
| `GeometryCollection` | ![](/img/sql/SFA_GeometryCollection.svg.png)     | ` GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))`            |

```mdx-code-block
</APITable>
```

## ST_AsBinary

Return the spatial geometry object Geometry in [WKB](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary) format.

```sql
ST_AsBinary(geometry)
```

<details>
  <summary>View <code>ST_AsBinary</code> Example</summary>

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

Convert Well-known Binary (WKB) format binary to Geometry type

```sql
ST_GeomFromWKB(wkb)
```

<details>
  <summary>View <code>ST_GeomFromWKB</code> Example</summary>

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

Returns the minimum Euclidean distance between the 2D projections of two geometric shapes.

```sql
ST_Distance(geometry1, gemometry2)
```

<details>
  <summary>View <code>ST_Distance</code> Example</summary>

**Calculate the distance between two points.**

```sql {1}
SELECT ST_Distance('POINT(0 0)', 'LINESTRING (30 10, 10 30, 40 40)');
+--------------------------------------------------------------------------+
| ST_Distance(Utf8("POINT(0 0)"),Utf8("LINESTRING (30 10, 10 30, 40 40)")) |
+--------------------------------------------------------------------------+
| 28.284271247461902                                                       |
+--------------------------------------------------------------------------+
```

Calculate the straight-line distance from a point to a line.\*\*

```sql {1}
SELECT ST_Distance('POINT(0 0)', 'LINESTRING (30 10, 10 30, 40 40)');
+--------------------------------------------------------------------------+
| st_distance(Utf8("POINT(0 0)"),Utf8("LINESTRING (30 10, 10 30, 40 40)")) |
+--------------------------------------------------------------------------+
| 28.284271247461902                                                       |
+--------------------------------------------------------------------------+
```

**Calculate the distance between planes.**

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

Returns the Cartesian area of the 2D projection of the geometric object.The unit of area is the same as the unit used to represent the coordinates of the input geometry. For `Point`, `LineString`, `MultiPoint`, and `MultiLineString, Line`, this function returns 0. For a collection of geometric shapes, it returns the sum of the areas of the shapes in the collection.

:::tip
Some geometric shapes do not support area calculation, calculating the area of these geometric objects will return 0, such as: `Point`, `MultiPoint`, `LineString`, `MultiLineString, Line`. If the parameter content format is invalid, the return value is `NULL`.
:::

```sql
ST_Area(geometry)
```

<details>
  <summary>View <code>ST_Area</code> Example</summary>

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

Compare two geometric shapes, if two geometric shapes are exactly the same, return `true`.

:::tip
`ST_Equals(A, B)` is equivalent to `ST_Within(A, B)` && `ST_Within(B, A)`
:::

```sql
ST_Equals(A, B)
```

<details>
  <summary>View <code>ST_Area</code> Example</summary>

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

If geometric object A contains geometric object B, return `true`.

```sql
ST_Contains(A, B)
```

<details>
  <summary>View <code>ST_Contains</code> Example</summary>

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

If two geometric objects intersect, return `true`.

`ST_Intersects(A, B)`

<details>
  <summary>View <code>ST_Intersects</code> Example</summary>

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

If two geometric objects do not intersect, return `true`.

`ST_Disjoint(A, B)`

<details>
  <summary>View <code>ST_Disjoint</code> Example</summary>

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

Returns `true` if the given Geometry object A is completely inside object B.

```sql
ST_Within(A, B)
```

<details>
  <summary>View <code>ST_Within</code> Example</summary>

```sql {1}
select ST_Within('POLYGON((1 1, 1 2, 2 2, 2 1, 1 1))', 'POLYGON((0 0, 0 3, 3 3, 3 0, 0 0))');
+--------------------------------------------------------------------------------------------------+
| ST_Within(Utf8("POLYGON((1 1, 1 2, 2 2, 2 1, 1 1))"),Utf8("POLYGON((0 0, 0 3, 3 3, 3 0, 0 0))")) |
+--------------------------------------------------------------------------------------------------+
| true                                                                                             |
+--------------------------------------------------------------------------------------------------+
```

</details>
