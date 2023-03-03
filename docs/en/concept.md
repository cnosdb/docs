---
title: concept
icon: creative
order: 4
---

## Background
The twenty-first century we are living in is an era of explosive growth of data information, in which all kinds of data information are expanding, individuals and enterprises are aware of the importance of data information, and with the advent of big data era, we have new challenges and requirements for insight into this data information. Based on the above-mentioned background of massive data, the database field has segmented some data information in specific formats to obtain better storage and retrieval performance.
Our time series data is one of the branches born in this context. This article focuses on the time series database users to carry out a basic concept of pulling together, in order to help us better navigate the time series data.

## Time series (Time Series)

In the ocean, we may monitor a variety of data indicators, used to study the environment, weather and human production, for example, a scenario: Suppose we have a detector that can record the visibility of the ocean air, we can determine whether to produce based on visibility changes. This visibility information is a time series data, in a common sense is a line graph of changes over time.
![Time Series](../source/_static/img/air_vis.png)
So let's make a summary:
Time Series is a line with time on the x-axis and a state index on the y-axis, which is used to describe the state of things over a period of time.

CnosDB is a time series database, whose application is to store data related to time series, providing efficient writing and querying.
Therefore, CnosDB has designed the design model of time series based on the characteristics of time series data.


## Data model
### TimeStamp

A time series database requires that each piece of data written be time-stamped, indicating the moment when the data was collected.

CnosDB supports setting the precision of the time.

### Tag

In the application scenario of temporal database, there are some data that do not change with time, such as the location of the IoT collection device, the name of the device, and the owner of the device.

This data is called**Tag**and we use STRING to store Tag.

In CnosDB a tag data is a key-value pair, consisting of Key and Value, Key is the tag name and Value is the tag value.

Usually, for better classification, multiple Tag pairs are used to tag a time series, i.e. Tags.

### Field

In a time-series database application scenario, some data changes over time, such as the data collected by IoT collection devices.

For a device that detects the environment, it collects information such as room temperature, humidity, etc., which changes over time, and these data we call **Field**.

The collected data is diverse, CnosDB provides `BIGINT`,`BIGINT UNSIGNED`,`DOUBLE`,`STRING`,`BOOLEAN` for storing fields, and also provides compression algorithm to store them efficiently.

### Row

A timestamp, a set of tags, and a set of fields make up a row of data, which many people also call a point.

A data row must contain a timestamp, at least one tag, and at least one field.

### Table

A Table is an organization of rows of data with the same label and fields. This is very similar to the concept of a table in a relational database.

Timestamps, labels, and fields are equivalent to columns of tables in a relational database.

The only difference is that the rows in CnosDB are rows of data consisting of timestamps, labels, and fields.

We can use our familiar SQL to manipulate the tables in CnosDB database that store time series data. INSERT and most SELECT statements in SQL standard are efficiently supported by CnosDB.

**Example**：

The following is a table storing data

| Timestamp   |   NodeID    |   CPU      | Memory    |
| ----------- | ----------- | -----------|-----------|
| time1      | node1     |     15%    | 35%       |
| time2      | node2     |     23%    | 45%       |
| time3      | node1     |     19%    | 50%       |
| time4      | node2     |     80%    | 70%       |

where the Timestamp column is the timestamp, the NodeID column is the label, and CPU and Memory are the fields

### DataBase
A database is made up of multiple tables, which is similar to a relational database. Each table stores data of different structure.

Users can use SQL to manipulate different tables in the database and also perform join queries of tables.

CnosDB supports setting different storage policies for a database, data retention time, number of data slices, slice setting policy, time precision, etc.
