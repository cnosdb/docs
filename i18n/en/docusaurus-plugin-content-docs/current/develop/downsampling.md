---
sidebar_position: 4
---

# Automatic Downsampling

The data write cycle is generally based on the actual table write frequency, which is usually related to the device that collects the data, sometimes it may need to process a large number of data points per second, and processing so much data for a long time may cause storage problems.A more natural solution would be to lower data samples.A more natural solution would be to lower data samples.

Downsampling in the timing database refers to the downsampling of timing data, the original fine-grained data downsampling to get the coarser-grained data, in order to save storage costs, downsampling data will only retain some statistical characteristics of the original data.This chapter describes how to use CnosDB for automated data sampling.

流查询（流计算）：是CnosDB中一种用于处理流式数据计算的特殊查询，流查询要求`SELECT`函数中必须包含`GROUP BY time()`字句。

Before enabling the flow query, you need to create a flow table view. For syntax, please refer to [`CREATE STREAM TABLE`](../reference/sql/ddl#create-stream-table). The following is an example using the `air` table as the source table:

```sql
CREATE STREAM TABLE air_stream(time TIMESTAMP, station STRING, pressure DOUBLE, temperature DOUBLE, visibility DOUBLE) 
    WITH (db = 'oceanic_station', table = 'air', event_time_column = 'time')
    engine = tskv;
```

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

### Targets

Assuming that the frequency of air meter data writing is 1min, but we only want to know the change of each index every 1h, such as the maximum value of the pressure, the average value of the temperature, the sum of the temperature, and the number of data rows in the specified time window.Then the corresponding sql is created as follows:

You need to first create a table to receive the query results:

```sql
CREATE TABLE air_down_sampling_1hour(max_pressure DOUBLE, avg_temperature DOUBLE, sum_temperature DOUBLE, count_pressure BIGINT, TAGS(station));
```

Query in the flow table view and write the down sampled results to the target table.

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

Execute `\w oceanic_station.txt` to write data to the `air` table (please refer to [Quick Start](../start/quick_start#download_data) for sample data). The streaming task will write data to the target table `air_down_sampling_1hour` in real time.

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
