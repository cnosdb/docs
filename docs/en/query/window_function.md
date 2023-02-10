---
title: Window Functions
order: 10
---

You can use window functions (analysis functions) in CnosDB to flexibly analyze and process data of specified window columns. The command formats, parameter descriptions and examples of window functions supported by CnosDB are shown below to guide you to use window functions to complete development.

## Syntax

```
function([...expr] ) OVER ([PARTITION BY expr] [ORDER BY expr] [window_frame]);

function: {aggregate_function | analytic_function| aggregate_function}

window_frame: { frame_mode frame_start |
                frame_mode BETWEEN frame_start AND frame_end } }
frame_mode: {RANGE | ROWS}

frame_start: {UNBOUNDED PRECEDING | offset_start PRECEDING | CURRENT ROW | offset_start FOLLOWING }

frame_end: {offset_stop PRECEDING | CURRENT ROW | offset_stop FOLLOWING | UNBOUNDED FOLLOWING}

```
###  Function Types
#### Rank Functions
| Function Names |
|--------------|
| DENSE_RANK   |
| PERCENT_RANK |
| RANK         |
| ROW_NUMBER   |

`DENSE_RANK` | `RANK` | `PERCENT_RANK` need ORDER BY Clause.

 `RANK`, `DENSE_RANK`, `ROW_NUMBER` need ORDER BY Clause.

#### Aggregate Function
See[Aggregate Function](aggregate_function.md)
#### Analysis Window Functions

| Function Names        | 
|-----------------------|
| CUME_DIST |
| LAG                   |
| LEAD                  |
| NTH_VALUE             |

### PARTITION BY Clause
One or more expressions used to specify a row partition. If there is no such clause, the partition is composed of all rows.

### ORDER BY Clause
Specify the order of rows in the partition.

###  window_frame Clause
Frame is a subset of the current partition, which further subdivides windows in the partition.

If ROWS is specified, the window will calculate the offset in row units.

If RANGE is specified, the ORDER BY clause must be specified. The window calculates the offset in the unit of the value of the ORDER BY expression.

- The first row of the partition in `UNBOUND PRECEDING`ROWS mode. The first value of the partition ORDER BY expression in RANGE mode.
- The first offset line of the current line in the offset`offset PRECEDING` ROWS mode. The first offset value of the current value in the RANGE mode.
- Current row in`CURRENT ROW` ROWS  mode.Current value in RANGE mode.
- The next offset line of the current line in the`offset FOLLOWING` ROWS mode. The next offset value of the current value in the RANGE mode.
- The last row of partition in`UNBOUND FOLLOWING` ROWS mode.The last value of ORDER BY expression in RANGE mode.

## Restrictions on Usage
- Window functions can only appear in SELECT statements.
- Window functions and aggregate functions cannot be nested in window functions.。

## Window Function List

Include [aggregate functions ](aggregate_function.md)

### **ROW_NUMBER**

    ROW_NUMBER() OVER([partition_clause] [orderby_clause])

**Function**：Assign a unique sequence number (starting from 1) to each row according to the row order in the window partition.

**Parameter Type**：None

**Return Type**：BIGINT

**Example**：
```sql
SELECT temperature, station, 
       ROW_NUMBER() OVER (PARTITION BY station) 
FROM air;
```
    +-------------+-------------+--------------+
    | temperature | station     | ROW_NUMBER() |
    +-------------+-------------+--------------+
    | 69          | LianYunGang | 1            |
    | 80          | LianYunGang | 2            |
    | 74          | LianYunGang | 3            |
    | 70          | LianYunGang | 4            |
    | 70          | LianYunGang | 5            |
    | 70          | LianYunGang | 6            |
    | 69          | XiaoMaiDao  | 1            |
    | 78          | XiaoMaiDao  | 2            |
    | 62          | XiaoMaiDao  | 3            |
    | 79          | XiaoMaiDao  | 4            |
    | 53          | XiaoMaiDao  | 5            |
    | 72          | XiaoMaiDao  | 6            |
    | 71          | XiaoMaiDao  | 7            |
    +-------------+-------------+--------------+


----------------

### **RANK**

    RANK() OVER([partition_clause] [orderby_clause])

**Function**：Returns the rank (jump rank) of a value relative to all values in the partition.

**Parameter Type**：None

**Return Type**：BIGINT

**Example**：
```sql
SELECT station, temperature, 
       RANK() OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```
    +-------------+-------------+--------+
    | station     | temperature | RANK() |
    +-------------+-------------+--------+
    | LianYunGang | 69          | 1      |
    | LianYunGang | 70          | 2      |
    | LianYunGang | 70          | 2      |
    | LianYunGang | 70          | 2      |
    | LianYunGang | 74          | 5      |
    | LianYunGang | 80          | 6      |
    | XiaoMaiDao  | 53          | 1      |
    | XiaoMaiDao  | 62          | 2      |
    | XiaoMaiDao  | 69          | 3      |
    | XiaoMaiDao  | 71          | 4      |
    | XiaoMaiDao  | 72          | 5      |
    | XiaoMaiDao  | 78          | 6      |
    | XiaoMaiDao  | 79          | 7      |
    +-------------+-------------+--------+

----------------

### **DENSE_RANK**

    DENSE_RANK() OVER([partition_clause] [orderby_clause])

**Function**：Returns the rank (consecutive rank) of a value relative to all values in the partition.

**Parameter Type**：None

**Return Type**：BIGINT

**Example**：
```sql
SELECT station, temperature, 
       DENSE_RANK() OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```

    +-------------+-------------+--------------+
    | station     | temperature | DENSE_RANK() |
    +-------------+-------------+--------------+
    | LianYunGang | 69          | 1            |
    | LianYunGang | 70          | 2            |
    | LianYunGang | 70          | 2            |
    | LianYunGang | 70          | 2            |
    | LianYunGang | 74          | 3            |
    | LianYunGang | 80          | 4            |
    | XiaoMaiDao  | 53          | 1            |
    | XiaoMaiDao  | 62          | 2            |
    | XiaoMaiDao  | 69          | 3            |
    | XiaoMaiDao  | 71          | 4            |
    | XiaoMaiDao  | 72          | 5            |
    | XiaoMaiDao  | 78          | 6            |
    | XiaoMaiDao  | 79          | 7            |
    +-------------+-------------+--------------+

----------------

### **PERCENT_RANK**

    PERCENT_RANK() OVER([partition_clause] [orderby_clause])

**Function**： Calculate the percentage ranking of a value in the partition.

**Parameter Type**：None

**Return Type**：DOUBLE

**Example**：
```sql
 SELECT station, temperature, 
        PERCENT_RANK() OVER (PARTITION BY station ORDER BY temperature) 
 FROM air;
```
    +-------------+-------------+---------------------+
    | station     | temperature | PERCENT_RANK()      |
    +-------------+-------------+---------------------+
    | LianYunGang | 69          | 0                   |
    | LianYunGang | 70          | 0.2                 |
    | LianYunGang | 70          | 0.2                 |
    | LianYunGang | 70          | 0.2                 |
    | LianYunGang | 74          | 0.8                 |
    | LianYunGang | 80          | 1                   |
    | XiaoMaiDao  | 53          | 0                   |
    | XiaoMaiDao  | 62          | 0.16666666666666666 |
    | XiaoMaiDao  | 69          | 0.3333333333333333  |
    | XiaoMaiDao  | 71          | 0.5                 |
    | XiaoMaiDao  | 72          | 0.6666666666666666  |
    | XiaoMaiDao  | 78          | 0.8333333333333334  |
    | XiaoMaiDao  | 79          | 1                   |
    +-------------+-------------+---------------------+
----------------

### **CUME_DIST**

    CUME_DIST() OVER ([partition_clause] [orderby_clause])

**Function**：Returns the position of a value relative to all values in the partition.

**Parameter Type**：None

**Return Type**：DOUBLE

**Example**：
```sql
SELECT station, temperature, 
       CUME_DIST() OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```
    +-------------+-------------+---------------------+
    | station     | temperature | CUME_DIST()         |
    +-------------+-------------+---------------------+
    | LianYunGang | 69          | 0.16666666666666666 |
    | LianYunGang | 70          | 0.6666666666666666  |
    | LianYunGang | 70          | 0.6666666666666666  |
    | LianYunGang | 70          | 0.6666666666666666  |
    | LianYunGang | 74          | 0.8333333333333334  |
    | LianYunGang | 80          | 1                   |
    | XiaoMaiDao  | 53          | 0.14285714285714285 |
    | XiaoMaiDao  | 62          | 0.2857142857142857  |
    | XiaoMaiDao  | 69          | 0.42857142857142855 |
    | XiaoMaiDao  | 71          | 0.5714285714285714  |
    | XiaoMaiDao  | 72          | 0.7142857142857143  |
    | XiaoMaiDao  | 78          | 0.8571428571428571  |
    | XiaoMaiDao  | 79          | 1                   |
    +-------------+-------------+---------------------+

[//]: # (----------------)

[//]: #
[//]: # (### **NTILE**)

[//]: #
[//]: # (    ntile&#40;n&#41; over&#40;[partition_clause] [order_by_clause]&#41;)

[//]: #
[//]: # (**Function**：把有序的数据集合平均分配到n个桶中,将桶号分配给每一行。)

[//]: #
[//]: # (**Parameter Type**：BIGINT)

[//]: #
[//]: # (**Return Type**：BIGINT)

----------------

### **LAG**

    lag( expr [, offset [, default] ] ) OVER([partition_clause] orderby_clause)

**Function**：Returns the expr values of the offset rows before the current row in the partition.

**Parameter Type**：expr type is any type.

offset type is BIGINT. When offset is negative, the values are returned from the last offset lines, defaults to 1.

The type of default should be the consistent with that of expr, defaults to NULL.

**Return Type**：Consistent with expr.

**Example**：
```sql
SELECT station, temperature, 
       LAG(temperature, 2) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```
    +-------------+-------------+-------------------------------+
    | station     | temperature | LAG(air.temperature,Int64(2)) |
    +-------------+-------------+-------------------------------+
    | LianYunGang | 69          |                               |
    | LianYunGang | 70          |                               |
    | LianYunGang | 70          | 69                            |
    | LianYunGang | 70          | 70                            |
    | LianYunGang | 74          | 70                            |
    | LianYunGang | 80          | 70                            |
    | XiaoMaiDao  | 53          |                               |
    | XiaoMaiDao  | 62          |                               |
    | XiaoMaiDao  | 69          | 53                            |
    | XiaoMaiDao  | 71          | 62                            |
    | XiaoMaiDao  | 72          | 69                            |
    | XiaoMaiDao  | 78          | 71                            |
    | XiaoMaiDao  | 79          | 72                            |
    +-------------+-------------+-------------------------------+
----------------

### **LEAD**

    lead(expr [, offset [, default] ] ) OVER ([partition_clause] orderby_clause)

**Function**：Returns the expr values of the offset rows after the current row in the partition.

**Parameter Type**：expr type is any type.

offset type is BIGINT. When offset is negative, the values are returned from the first offset lines, defaults to 1.

The type of default should be the consistent with that of expr, defaults to NULL.

**Return Type**：Consistent with expr.

**Example**：
```sql
SELECT station, temperature, 
       LEAD(temperature, 2) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```
    +-------------+-------------+--------------------------------+
    | station     | temperature | LEAD(air.temperature,Int64(2)) |
    +-------------+-------------+--------------------------------+
    | LianYunGang | 69          | 70                             |
    | LianYunGang | 70          | 70                             |
    | LianYunGang | 70          | 74                             |
    | LianYunGang | 70          | 80                             |
    | LianYunGang | 74          |                                |
    | LianYunGang | 80          |                                |
    | XiaoMaiDao  | 53          | 69                             |
    | XiaoMaiDao  | 62          | 71                             |
    | XiaoMaiDao  | 69          | 72                             |
    | XiaoMaiDao  | 71          | 78                             |
    | XiaoMaiDao  | 72          | 79                             |
    | XiaoMaiDao  | 78          |                                |
    | XiaoMaiDao  | 79          |                                |
    +-------------+-------------+--------------------------------+

----------------

### **FIRST_VALUE**

    FIRST_VALUE(expr) OVER ([partition_clause] [orderby_clause])

**Function**： Returns the first value in a set of values, usually an ordered set.

**Parameter Type**：expr type is any type, ignore_ nulls type is BOOLEAN, defaults to false.

**Return Type**：Consistent with expr.

**Example**：
```sql
SELECT station, temperature, 
       FIRST_VALUE(temperature) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```
    +-------------+-------------+------------------------------+
    | station     | temperature | FIRST_VALUE(air.temperature) |
    +-------------+-------------+------------------------------+
    | LianYunGang | 69          | 69                           |
    | LianYunGang | 70          | 69                           |
    | LianYunGang | 70          | 69                           |
    | LianYunGang | 70          | 69                           |
    | LianYunGang | 74          | 69                           |
    | LianYunGang | 80          | 69                           |
    | XiaoMaiDao  | 53          | 53                           |
    | XiaoMaiDao  | 62          | 53                           |
    | XiaoMaiDao  | 69          | 53                           |
    | XiaoMaiDao  | 71          | 53                           |
    | XiaoMaiDao  | 72          | 53                           |
    | XiaoMaiDao  | 78          | 53                           |
    | XiaoMaiDao  | 79          | 53                           |
    +-------------+-------------+------------------------------+
----------------

### **LAST_VALUE**

    LAST_VALUE(expr) OVER ([partition_clause] [orderby_clause])

**Function**： Returns the last value in the current window.

**Parameter Type**：expr type is any type, ignore_ nulls type is BOOLEAN, defaults to false.

**Return Type**：Consistent with expr.

**Example**：
```sql
SELECT station, temperature, 
       LAST_VALUE(temperature) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```
    +-------------+-------------+-----------------------------+
    | station     | temperature | LAST_VALUE(air.temperature) |
    +-------------+-------------+-----------------------------+
    | LianYunGang | 69          | 69                          |
    | LianYunGang | 70          | 70                          |
    | LianYunGang | 70          | 70                          |
    | LianYunGang | 70          | 70                          |
    | LianYunGang | 74          | 74                          |
    | LianYunGang | 80          | 80                          |
    | XiaoMaiDao  | 53          | 53                          |
    | XiaoMaiDao  | 62          | 62                          |
    | XiaoMaiDao  | 69          | 69                          |
    | XiaoMaiDao  | 71          | 71                          |
    | XiaoMaiDao  | 72          | 72                          |
    | XiaoMaiDao  | 78          | 78                          |
    | XiaoMaiDao  | 79          | 79                          |
    +-------------+-------------+-----------------------------+

----------------

### **NTH_VALUE**

    NTH_VALUE(expr, number) OVER ([partition_clause] [orderby_clause])

**Function**： Returns the expression value of the specified row of the window frame relative to the first row of the window.

**Parameter Type**：expr type is any type, number type is BIGINT.

**Return Type**：Consistent with expr.

**Example**：
```sql
SELECT station, temperature, 
       NTH_VALUE(temperature, 2) OVER (PARTITION BY station ORDER BY temperature) 
FROM air;
```
    +-------------+-------------+-------------------------------------+
    | station     | temperature | NTH_VALUE(air.temperature,Int64(2)) |
    +-------------+-------------+-------------------------------------+
    | LianYunGang | 69          |                                     |
    | LianYunGang | 70          | 70                                  |
    | LianYunGang | 70          | 70                                  |
    | LianYunGang | 70          | 70                                  |
    | LianYunGang | 74          | 70                                  |
    | LianYunGang | 80          | 70                                  |
    | XiaoMaiDao  | 53          |                                     |
    | XiaoMaiDao  | 62          | 62                                  |
    | XiaoMaiDao  | 69          | 62                                  |
    | XiaoMaiDao  | 71          | 62                                  |
    | XiaoMaiDao  | 72          | 62                                  |
    | XiaoMaiDao  | 78          | 62                                  |
    | XiaoMaiDao  | 79          | 62                                  |
    +-------------+-------------+-------------------------------------+


​    