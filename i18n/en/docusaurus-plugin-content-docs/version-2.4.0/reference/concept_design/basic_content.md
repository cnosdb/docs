---
title: Concepts
order: 1
---
# Concepts

## Introduction

Before going deep into CnosDB, we need to be familiar with some basic concepts in CnosDB, which will help us to learn and use CnosDB better in the future. To help you understand these concepts better, this article uses an example to show you how the various elements work together in CnosDB, and lists the meanings of each concept in the final section of the article.

### Sample data

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

The first thing we can make clear in this example is that the library is `oceanic_stations` and the table is `air`. CnosDB is a timing database, so for CnosDB, it starts with just that - time.

In the above data, the first column is named time, which is present in all databases in CnosDB. time stores a timestamp that complies with the `RFC3339` standard.

Next, `station` is listed as a tag column, which represents an entity that represents the id of the data source. In this example, the data we collected was collected from XiaoMaiDao station. Tags are composed of key and value, both of which are stored as strings and recorded in metadata. In this example, the key is station, and the value is XiaoMaiDao and LianYunGang.

In the example above, the tag group is a different set of keys and values for each group, and there are two tag groups in the sample data:

```text

station = XiaoMaiDao
station = LianYunGang

```

Finally, the columns of pressure, temperature, and visibility are field columns, which are also composed of key and value columns. In this example, key is `pressure`, `temperature`, and `visibility`, which are all strings. They store metadata. value simply represents the data, which can be of string type or any other type. In this example, the value is as follows:

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
>Attention: Tag columns differ from field columns in that tags are indexed, which means queries on tags are faster, while fields are not indexed. If a field value is used as a filtering criterion, all values that match other criteria must be scanned. Therefore, labels are the best choice for storing commonly used data.

### Key concepts
#### TimeSeries

In a time series database, a time series is a sequence of data points arranged in chronological order. It contains time stamps and corresponding values or events for recording and analyzing data over time.
#### Database

A database is made up of multiple tables, similar to a relational database. Each table stores a different structure of data. Users can use SQL to manipulate different tables in the database, and can also perform table join queries.
#### Table

A table organizes rows of data with the same labels and fields. This is very similar to the concept of tables in a relational database. Timestamps, labels, and fields are the columns of a table in a relational database.
#### Timestamp
A timing database requires that each piece of data written to be time-stamped, indicating the time at which the piece of data was collected. CnosDB supports the precision of setting time.
#### Tag key

In the application scenario of timing database, some data does not change with time, such as the location of the Internet of Things acquisition device, the name of the device, and the owner of the device. We call this data tags, and use strings to store the tags.
#### Tag value

The value of the tag key.
#### Tag set

A tag group typically consists of one or more tags, each of which is a key-value pair that describes a feature or attribute of the data.
#### Field key

In the application scenario of time series database, some data changes over time, such as the data collected by the Internet of Things acquisition device. For the equipment that detects the environment, the room temperature, humidity and other information it collects changes with time, and these data are called fields.
#### Field value
The value of the field key.
#### Field set
A field group usually consists of one or more fields, each of which stores a specific data value.
#### Row
The rows in CnosDB are data rows made up of timestamps, labels, and fields. A timestamp, a set of labels, and a set of fields make up a row of data, which can also be called a point. A data row must contain a timestamp, at least one label, and one field.
#### Retention policy
CnosDB supports setting up different storage policies for a database, data retention time, number of data fragments, shard setting policies, time accuracy, etc.