---
sidebar_position: 4
---

# Sampling

Data writing cycles typically focus on the actual tabular writing frequency, which is usually associated with data collection equipment, which may sometimes require processing of a large number of data points per second and the long processing of so many data may result in survival storage.A more natural solution would be to lower data samples.

In the time series database, the down-sampling refers to the frequency with which time series data are downgraded and the data from the original gradient are obtained with more crude particles, thus saving storage costs and the data from the down-sampling will retain only some of the statistical characteristics of the original data.This chapter describes how to use CnosDB for automated data sampling.

### Definitions

Stream Query：is a special query in CnosDB to process streaming data calculations, which requires \`\`\`\`SELECT`to include`GROUP time()\`\`.

> Note：This article does not describe how to create syntax for streaming queries. For more details, click[流查询](../reference/sql#stream queries) to jump to the corresponding interface.

### Data Sample

We take the example of the airsheet in the oceanic_station library as：

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

### Objective

Assuming that the airtable data is written at 1 min, we would like to know only the changes for each indicator in every 1h, such as maximum stress, mean temperature, sum of temperature, number of data lines within the specified time window\.then create the corresponding sql after：

```sql
INSERT INTO air_down_sampling_1hour(time, station, max_pressure, avg_temperature, sum_temperature, count_pressure) 
SELECT 
	date_bin (INTERVAL 1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00) time, 
	station, 
	MAX(pressure) max_pressure, 
	AVG(temperature) avg_temperature, 
	SUM(temperature) sum_temperature, 
	COUNT(pressure) count_pressure 
FROM air_stream 
GROUP BY date_bin (INTERVAL '1' HOUR, time, TIMESTAMP '2023-01-14T16:00:00'), station;
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
