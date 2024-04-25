---
sidebar_position: 4
---

# 自动降采样

The data write cycle is generally based on the actual table write frequency, which is usually related to the device that collects the data, sometimes it may need to process a large number of data points per second, and processing so much data for a long time may cause storage problems.A more natural solution would be to lower data samples.

Downsampling in the timing database refers to the downsampling of timing data, the original fine-grained data downsampling to get the coarser-grained data, in order to save storage costs, downsampling data will only retain some statistical characteristics of the original data.This chapter describes how to use CnosDB for automated data sampling.

Stream Query:is a special query in CnosDB for processing stream data calculation, the stream query requires that the SELECT function must contain the GROUP BY time() phrase.

启用流查询之前需要创建一个流表视图，语法请参考 [`CREATE STREAM TABLE`](../reference/sql/ddl#create-stream-table) ，以下是一个以 `air` 表为原表的示例：

```sql
CREATE STREAM TABLE air_stream(time TIMESTAMP, station STRING, pressure DOUBLE, temperature DOUBLE, visibility DOUBLE) 
    WITH (db = 'oceanic_station', table = 'air', event_time_column = 'time')
    engine = tskv;
```

### Data Samples

以 oceanic_station 库中的 air 表为例。

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

假设 air 表数据写入频率为1min，但我们只想知道每1h的各项指标变化，如压力的最大值、温度的平均值、温度的总和、指定时间窗口内的数据行数。

需要先创建一个接收流查询结果的表：

```sql
CREATE TABLE air_down_sampling_1hour(max_pressure DOUBLE, avg_temperature DOUBLE, sum_temperature DOUBLE, count_pressure BIGINT, TAGS(station));
```

通过在流表视图中查询并将下采样的结果写入目标表。

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

执行 `\w oceanic_station.txt` 向 `air` 表中写入数据（示例数据请参考 [快速开始](../start/quick_start#下载数据)）流查询任务会实时将数据写入到目标表 `air_down_sampling_1hour`。

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
