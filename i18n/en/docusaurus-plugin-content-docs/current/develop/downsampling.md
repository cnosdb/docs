---
title: Downsampling
order: 4
---
## Downsampling

The data write cycle is generally based on the actual table write frequency, which is usually related to the device that collects the data, sometimes it may need to process a large number of data points per second, and processing so much data for a long time may cause storage problems. A more natural solution is to reduce the data sample.
 
Downsampling refers to the frequency reduction of timeseries data in the time-series databases, and coarse-grained data is obtained after the frequency reduction of originally fine-grained data, so as to save storage costs. The data after downsampling only retains some statistical features of the original data. This chapter describes how to automate data sampling with CnosDB.

### Definition

Stream Query:is a special query in CnosDB for processing stream data calculation, the stream query requires that the SELECT function must contain the GROUP BY time() phrase.

>Note: This article does not describe the syntax of how to create a stream query in detail, for more details, please click [Stream](../../latest/reference/sql.md#stream) query to jump to the corresponding interface. 

### Data Samples

Let's take the air table in the oceanic station library as an example:

```sql
select * from air limit 5;
+---------------------+------------+----------+-------------+------------+
| time                | station    | pressure | temperature | visibility |
+---------------------+------------+----------+-------------+------------+
| 2023-01-14T16:00:00 | XiaoMaiDao | 63.0     | 80.0        | 79.0       |
| 2023-01-14T16:03:00 | XiaoMaiDao | 58.0     | 64.0        | 78.0       |
| 2023-01-14T16:06:00 | XiaoMaiDao | 65.0     | 79.0        | 67.0       |
| 2023-01-14T16:09:00 | XiaoMaiDao | 52.0     | 55.0        | 73.0       |
| 2023-01-14T16:12:00 | XiaoMaiDao | 59.0     | 74.0        | 64.0       |
+---------------------+------------+----------+-------------+------------+
Query took 0.028 seconds.
```

### Goal

Assume that the data write frequency of the air table is 1min, but we only want to know the changes of various indicators every 1h, such as the maximum pressure, the average temperature, the sum of temperatures, and the number of data rows in the specified time window. The corresponding sql is created as follows:

```sql
INSERT INTO air_down_sampling_1hour(time, station, max_pressure, avg_temperature, sum_temperature, count_pressure) 
SELECT 
	date_bin(INTERVAL '1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00') time, 
	station, 
	MAX(pressure) max_pressure, 
	AVG(temperature) avg_temperature, 
	SUM(temperature) sum_temperature, 
	COUNT(pressure) count_pressure 
FROM air_stream 
GROUP BY date_bin(INTERVAL '1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00'), station;
```

### Results

```sql
SELECT * FROM air_down_sampling_1hour LIMIT 10;

    +---------------------+------------+--------------+-----------------+-----------------+----------------+
    | time                | station    | max_pressure | avg_temperature | sum_temperature | count_pressure |
    +---------------------+------------+--------------+-----------------+-----------------+----------------+
    | 2023-01-14T16:00:00 | XiaoMaiDao | 80.0         | 68.05           | 1361.0          | 20             |
    | 2023-01-14T17:00:00 | XiaoMaiDao | 79.0         | 63.75           | 1275.0          | 20             |
    | 2023-01-14T18:00:00 | XiaoMaiDao | 79.0         | 66.35           | 1327.0          | 20             |
    | 2023-01-14T19:00:00 | XiaoMaiDao | 78.0         | 68.05           | 1361.0          | 20             |
    | 2023-01-14T20:00:00 | XiaoMaiDao | 80.0         | 64.35           | 1287.0          | 20             |
    | 2023-01-14T21:00:00 | XiaoMaiDao | 77.0         | 61.05           | 1221.0          | 20             |
    | 2023-01-14T22:00:00 | XiaoMaiDao | 80.0         | 64.8            | 1296.0          | 20             |
    | 2023-01-14T23:00:00 | XiaoMaiDao | 80.0         | 66.35           | 1327.0          | 20             |
    | 2023-01-15T00:00:00 | XiaoMaiDao | 80.0         | 65.15           | 1303.0          | 20             |
    | 2023-01-15T01:00:00 | XiaoMaiDao | 80.0         | 69.55           | 1391.0          | 20             |
    +---------------------+------------+--------------+-----------------+-----------------+----------------+
```