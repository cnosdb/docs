---
title: Basic concepts
order: 1
---

# Basic concepts

## Preface

Before we can learn more about CnosDB, we need to become familiar with some basic concepts in CnosDB, which will help us follow up on learning and better use of CnosDB.In order to help better understand these concepts, the present article will provide an example of how the elements work together in CnosDB and include a list of concepts in the final section.

## Sample Data：

```sql
test ❯ select * from air limit 5;
+---------------------+-------------+----------+-------------+------------+
| time                | station     | pressure | temperature | visibility |
+---------------------+-------------+----------+-------------+------------+
| 2023-01-14T16:00:00 | XiaoMaiDao  | 63.0     | 80.0        | 79.0       |
| 2023-01-14T16:03:00 | XiaoMaiDao  | 58.0     | 64.0        | 78.0       |
| 2023-01-14T16:06:00 | XiaoMaiDao  | 65.0     | 79.0        | 67.0       |
| 2023-01-14T16:09:00 | LianYunGang | 51.0     | 75.0        | 64.0       |
| 2023-01-14T16:12:00 | LianYunGang | 60.0     | 50.0        | 67.0       |
+---------------------+-------------+----------+-------------+------------+
Query took 0.027 seconds.
```

The 5 data obtained from the \`\`oceanic_stations`open data collection table as an example can be seen in the 5 columns comprising：columns,`time`columns,`station`columns,`pressure`columns,`template`columns, and`visibility\` columns. We will analyze these data in detail.

1. First, we can make it clear that in this example the library is `oceanic_stations` and the table is `air`.CnosDB is a time series database, so for CnosDB everything it starts is - time.

2. In the above data, the first column is named `time`. This column has a column in all the databases in CnosDB.The timestamp of `time` follows [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) standards.

3. The next `station` is listed as a label that denotes an entity that represents the `id` source of data.This example shows that we collected data from `XiaoMaiDao` this `station`.Tags are stored as strings by `key` and `value` and are recorded in metadata.For example：`key` is `station`, `value` is `XiaoMaiDaao` and `LianYunGang`.

In the above example, the tag group is a collection of different groups of `key` and `value`. There are two tag groups in the sample data in total：

```text
Station = XiaoMaiDao
station = LianYunGang
```

4. The last three columns of `pressure`, `temperature`, `visibility` are fields columns. They also consist of key and value columns, where `key` is `pressure`, `temperature`, `visibility`, are strings that store metadata.Value means data and can be a string type or other type.In this case, the following：

```text
63.0 80.0 79.0       
58.0 64.0 78.0       
65.0 79.0 67.0       
51.0 75.0 64.0 64.0       
60.0 50.0 67.0       
```

在上述示例中，字段组就是每组的 `key` 和 `value` 的集合，示例数据中一共有五个字段组：

```text
Pressure = 63.0 temperature = 80. Visibility = 79.0       
press = 58. Temperature = 64.0 visibility = 78.       
pressure = 65.0 temperature = 79. Visibility = 67.0       
press = 51. Temperature = 75.0 visibility = 64.       
pressure = 60. temperature = 50.0 visibility = 67.0       
```

> Note that the：tag column is different from the field column, the tag is indexed and this means that the tag is queried faster and the field is not indexed.If the field value is used as a filter then the other condition must be scanned for all the values that match.Story tags are the best option to store commonly used data.

## Key concepts

### Time series

In the time series database, **Time series** refers to data point sequences in chronological order.It contains timestamps and corresponding values or events that are used to record and analyse data over time.

### Library

**Database** is composed of multiple tables, which are similar to the relationship database.Each table stores data of different structures.Users can use SQL to manipulate different tables in the database or make links to the tables.

### Table

**Table** organizes data lines with the same label, fields.This is very similar to the concept of the table in the relational database.Timestamp,Label,Fields correspond to the list of tables in the relationship database.

### Timestamp

The time series database requires each data to be written with **timestamp** representing the moment the data is collected.CnosDB supports setting the accuracy of time.

### Tab Column

In the application scenes of the time series database, some data do not vary over time, such as the location of the Internet collection equipment, the name of the equipment and the owner of the equipment.These data are called **Label** and use strings (STRING) to store Tags.

### Label value

The corresponding value for the tag.

### Tab Group

**Tag Group** is usually composed of one or more tabs, each of which is a key pair that describes the characteristics or attributes of the data.

### Field column

In the application scenes of the time-series database, some data vary over time, such as those collected by the Internet collection device.For equipment to detect the environment, it collects information on room temperature, humidity, etc., which we call **fields**.

### Field value

The value corresponding to the field.

### Field Group

**Field group** usually consists of one or more fields, each of which stores a specific value of data.

### Lines

The **rows** in CnosDB are timestamps, tags, and data lines formed by fields.A timestamp, a set of tags, a set of fields form a data row that can also be called **point**.A data row must contain a timestamp, at least one tag and one field.

### Storage Policy

CnosDB supports setting up a different storage policy for a database, data retention time, data fragmentation, fragmentation, time accuracy etc.
