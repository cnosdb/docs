---
title: 窗口函数
icon: config
order: 10
---

### **ROW_NUMBER**

    ROW_NUMBER() OVER([partition_clause] [orderby_clause])

**功能**：根据窗口分区中的行顺序，为每一行分配唯一的顺序编号（从 1 开始）。

**参数类型**：无

**返回类型**：BIGINT

----------------

### **RANK**

    RANK() OVER([partition_clause] [orderby_clause])

**功能**：返回某个值相对于分区中所有值的排名（跳跃排名）。

**参数类型**：无

**返回类型**：BIGINT

----------------

### **DENSE_RANK**

    DENSE_RANK() OVER([partition_clause] [orderby_clause])

**功能**：返回某个值相对于分区中所有值的排名（连续排名）。

**参数类型**：无

**返回类型**：BIGINT

----------------

### **PERCENT_RANK**

    PERCEN_RANK() OVER([partition_clause] [orderby_clause])

**功能**： 计算分区中某个值的百分比排名。

**参数类型**：无

**返回类型**：DOUBLE

----------------

### **CUME_DIST**

    CUME_DIST() OVER ([partition_clause] [orderby_clause])

**功能**：返回某个值相对于分区中的所有值的位置。

**参数类型**：无

**返回类型**：DOUBLE

----------------

### **NTILE**

    ntile(n) over([partition_clause] [order_by_clause])

**功能**：把有序的数据集合平均分配到expr指定的数量的桶中,将桶号分配给每一行。

**参数类型**：BIGINT

**返回类型**：BIGINT

----------------

### **LAG**

    lag( expr [, offset [, default] ] ) OVER([partition_clause] orderby_clause)

**功能**：从分区中的前一行返回 expr 的值。

**参数类型**：expr为任意类型，offset为BIGINT，default 需要与expr对应的数据类型相同,默认为NULL

**返回类型**：与expr相同的类型

----------------

### **LEAD**

    lead(expr [, offset [, default] ] ) OVER ([partition_clause] orderby_clause)

**功能**：从分区中的后续行返回值 expr。

**参数类型**：expr为任意类型，offset为BIGINT，default需要与expr类型相同，默认是NULL

**返回类型**：与expr类型相同

----------------

### **FIRST_VALUE**

    FIRST_VALUE(expr, [, ignore_nulls) OVER ([partition_clause] [orderby_clause])

**功能**： 返回一组值(该组通常是有序集合)中的第一个值。

**参数类型**：expr为任意类型，ignore_nulls为BOOLEAN类型，默认值为false

**返回类型**：与expr类型相同

----------------

### **LAST_VALUE**

    LAST_VALUE(expr, [, ignore_nulls) OVER ([partition_clause] [orderby_clause])

**功能**： 返回一组值(该组通常是有序集合)中的最后一个值。

**参数类型**：expr为任意类型，ignore_nulls为BOOLEAN类型，默认值为false

**返回类型**：与expr类型相同

----------------

### **NTH_VALUE**

    NTH_VALUE(expr, number [, ignore_nulls) OVER ([partition_clause] [orderby_clause])

**功能**： 返回相对于窗口的第一行的窗口框架的指定行的表达式值。

**参数类型**：expr为任意类型，number为BIGINT，ignore_nulls为BOOLEAN类型，默认值为false

**返回类型**：与expr类型相同

    