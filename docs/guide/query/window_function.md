---
title: 窗口函数
order: 10
---

您可以在 CnosDB 中使用窗口函数（分析函数）对指定开窗列的数据灵活地进行分析处理工作。
下面展示 CnosDB 支持的窗口函数的命令格式、参数说明及示例，指导您使用窗口函数完成开发。

## 语法

```
function([...expr] ) OVER ([PARTITION BY expr] [ORDER BY expr] [window_frame]);

function: {aggregate_function | analytic_function| aggregate_function}

window_frame: { frame_mode frame_start |
                frame_mode BETWEEN frame_start AND frame_end } }
frame_mode: {RANGE | ROWS}

frame_start: {UNBOUNDED PRECEDING | offset_start PRECEDING | CURRENT ROW | offset_start FOLLOWING }

frame_end: {offset_stop PRECEDING | CURRENT ROW | offset_stop FOLLOWING | UNBOUNDED FOLLOWING}

```
### 函数类型
#### 排名函数
| 函数名          |
|--------------|
| DENSE_RANK   |
| PERCENT_RANK |
| RANK         |
| ROW_NUMBER   |

其中`DENSE_RANK` | `RANK` | `PERCENT_RANK` 需要 ORDER BY 子句

其中 `RANK`, `DENSE_RANK`, `ROW_NUMBER` 指定window_frame 无效

#### 聚合函数
详见[聚合函数](aggregate_function.md)
#### 分析窗口函数

| 函数名                   | 
|-----------------------|
| CUME_DIST |
| LAG                   |
| LEAD                  |
| NTH_VALUE             |

### PARTITION BY 子句
一个或多个表达式，用于指定一个行分区，如果没有该子句，则分区由所有行组成

### ORDER BY 子句
指定行在分区中的顺序

### window_frame 子句
frame 是当前分区的一个子集，在分区里进一步细分窗口

指定ROWS，则窗口以行为单位算偏移量

指定RANGE，则必须指定 ORDER BY 子句，窗口以ORDER BY 表达式的值为单位算偏移量

- `UNBOUND PRECEDING` ROWS 模式下为分区的第一行，RANGE模式下为分区ORDER BY表达式的第一个值
- `offset PRECEDING` ROWS 模式下为当前行的前offset行，RANGE 模式下为当前值的前offset值
- `CURRENT ROW` ROWS 模式下为当前行，RANGE模式下为当前值
- `offset FOLLOWING` ROWS 模式下为当前行的后offset行，RANGE 模式下为当前值的后offset值
- `UNBOUND FOLLOWING` ROWS 模式下为分区的最后一行，RANGE模式下为ORDER BY表达式的最后一个值

## 使用限制
- 窗口函数只能出现在SELECT语句中。
- 窗口函数中不能嵌套使用窗口函数和聚合函数。

## 窗口函数列表

包括[聚合函数](aggregate_function.md)

### **ROW_NUMBER**

    ROW_NUMBER() OVER([partition_clause] [orderby_clause])

**功能**：根据窗口分区中的行顺序，为每一行分配唯一的顺序编号（从 1 开始）。

**参数类型**：无

**返回类型**：BIGINT

**示例**：
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

**功能**：返回某个值相对于分区中所有值的排名（跳跃排名）。

**参数类型**：无

**返回类型**：BIGINT

**示例**：
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

**功能**：返回某个值相对于分区中所有值的排名（连续排名）。

**参数类型**：无

**返回类型**：BIGINT

**示例**：
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

**功能**： 计算分区中某个值的百分比排名。

**参数类型**：无

**返回类型**：DOUBLE

**示例**：
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

**功能**：返回某个值相对于分区中的所有值的位置。

**参数类型**：无

**返回类型**：DOUBLE

**示例**：
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

[//]: # ()
[//]: # (### **NTILE**)

[//]: # ()
[//]: # (    ntile&#40;n&#41; over&#40;[partition_clause] [order_by_clause]&#41;)

[//]: # ()
[//]: # (**功能**：把有序的数据集合平均分配到n个桶中,将桶号分配给每一行。)

[//]: # ()
[//]: # (**参数类型**：BIGINT)

[//]: # ()
[//]: # (**返回类型**：BIGINT)

----------------

### **LAG**

    lag( expr [, offset [, default] ] ) OVER([partition_clause] orderby_clause)

**功能**：返回分区中当前行前offset行的expr的值。

**参数类型**：expr为任意类型，

offset为BIGINT，为负数时，从分区中后offset行返回值，默认为1

default 需要与expr对应的数据类型相同,默认为NULL

**返回类型**：与expr相同的类型

**示例**：
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

**功能**：返回分区中当前行后offset行的expr的值。

**参数类型**：expr为任意类型，

offset为BIGINT，为负数时，从分区中前offset行返回值，默认为1

default需要与expr类型相同，默认是NULL

**返回类型**：与expr类型相同

**示例**：
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

**功能**： 返回一组值(该组通常是有序集合)中的第一个值。

**参数类型**：expr为任意类型，ignore_nulls为BOOLEAN类型，默认值为false

**返回类型**：与expr类型相同

**示例**：
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

**功能**： 返回当前窗口中的最后一个值。

**参数类型**：expr为任意类型，ignore_nulls为BOOLEAN类型，默认值为false

**返回类型**：与expr类型相同

**示例**：
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

**功能**： 返回相对于窗口的第一行的窗口框架的指定行的表达式值。

**参数类型**：expr为任意类型，number为BIGINT

**返回类型**：与expr类型相同

**示例**：
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

    