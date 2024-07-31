---
sidebar_position: 1
---

# Concepts

Before we can learn more about CnosDB, we need to become familiar with some basic concepts in CnosDB, which will help us follow up on learning and better use of CnosDB.In order to help better understand these concepts, the present article will provide an example of how the elements work together in CnosDB and include a list of concepts in the final section.

## Sample data

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

This data is obtained from the air table in the `oceanic_stations` open dataset as an example. It can be seen that the table consists of five columns: The `time`, `station`, `pressure`, `tempreture`, and `visibility` columns will be analyzed in detail.

1. First, we can make it clear that in this example the database is `oceanic_stations` and the table is `air`.CnosDB is a time series database, so for CnosDB everything it starts is - time.

2. In the above data, the first column is named `time`. This column has a column in all the databases in CnosDB.The timestamp of `time` follows [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) standards.

3. The next `station` is listed as a tag that denotes an entity that represents the `id` source of data.This example shows that we collected data from `XiaoMaiDao` this `station`.Tags are stored as strings by `key` and `value` and are recorded in metadata.For example: `key` is `station`, `value` is `XiaoMaiDao` and `LianYunGang`.

In the example above, the tag group is a different set of keys and values for each group, and there are two tag groups in the sample data:

```text
station = XiaoMaiDao
station = LianYunGang
```

4. The last three columns, `pressure`, `temperature`, and `visibility`, are field columns, which also consist of a key and a value column, in this case the `key` is `pressure`, `temperature`, and `visibility`, which are strings, and they store metadata.value means data and can be a string type or other type.In this case, the following:

```text
63.0      80.0        79.0       
58.0      64.0        78.0       
65.0      79.0        67.0       
51.0      75.0        64.0       
60.0      50.0        67.0       
```

In the example above, the field group is the set of keys and values for each group, and there are five field groups in the sample data:

```text
pressure = 63.0    temperature = 80.0    visibility = 79.0       
pressure = 58.0    temperature = 64.0    visibility = 78.0       
pressure = 65.0    temperature = 79.0    visibility = 67.0       
pressure = 51.0    temperature = 75.0    visibility = 64.0       
pressure = 60.0    temperature = 50.0    visibility = 67.0       
```

> Note: tag column is different from the field column, the tag is indexed and this means that the tag is queried faster and the field is not indexed.If the field value is used as a filter then the other condition must be scanned for all the values that match.Story tags are the best option to store commonly used data.

## Key concepts

### TimeSeries

In the time series database, **Time series** refers to data point sequences in chronological order.In a time series database, a time series is a sequence of data points arranged in chronological order. It contains time stamps and corresponding values or events for recording and analyzing data over time.

### Database

**Database** is composed of multiple tables, which are similar to the relationship database.Each table stores data of different structures.Users can use SQL to manipulate different tables in the database or make links to the tables.

### Table

**Table** organizes data lines with the same tags, fields.This is very similar to the concept of the table in the relational database.Timestamp,Tag,Fields correspond to the list of tables in the relationship database.

### Timestamp

The time series database requires each data to be written with **timestamp** representing the moment the data is collected.CnosDB supports setting the accuracy of time.

### Tag key

In the application scenes of the time series database, some data do not vary over time, such as the location of the Internet collection equipment, the name of the equipment and the owner of the equipment.These data are called **Tag** and use strings (STRING) to store Tags.

### Tag value

The value of the tag key.

### Tag set

A tag group typically consists of one or more tags, each of which is a key-value pair that describes a feature or attribute of the data.

### Field key

In the application scenes of the time-series database, some data vary over time, such as those collected by the Internet collection device.For equipment to detect the environment, it collects information on room temperature, humidity, etc., which we call **fields**.

### Field value

The value of the field key.

### Field set

A field group usually consists of one or more fields, each of which stores a specific data value.

### Row

The **rows** in CnosDB are timestamps, tags, and data lines formed by fields.A timestamp, a set of tags, a set of fields form a data row that can also be called **point**.A data row must contain a timestamp, at least one tag and one field.

### Time To Live

CnosDB supports setting up different storage policies for a database, data time to live, number of data fragments, shard setting policies, time accuracy, etc.
