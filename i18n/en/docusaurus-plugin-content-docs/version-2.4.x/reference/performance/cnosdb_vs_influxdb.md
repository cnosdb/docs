---
sidebar_position: 4
---

# CnosDB vs InfluxDB

## CnosDB 2.4.1 vs InfluxDB 1.8.10

在[CnosDB 2.4.1](https://github.com/cnosdb/cnosdb) 和 [InfluxDB 1.8.10](https://github.com/influxdata/influxdb) 之间做了查询性能测试的对比，下面是测试结论和测试细节信息。

### Conclusion

相同数据情况下，测试结果显示CnosDB的查询性能与InfluxDB互有优劣。

### Test CnosDB writes

#### Testing Environment

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

内存：256 GB

硬盘：SSD NVMe 协议

#### 2. Test case preparation

1. Install the db environment, go environment, etc. of the corresponding machine in advance, and ensure normal connection.

2. Install CnosDB:

   参照部署文档：[安装CnosDB](../start/install.md)

3. Test InfluxDB writes

   wget https://dl.influxdata.com/influxdb/releases/influxdb-1.8.10_linux_amd64.tar.gz
   tar xvfz influxdb-1.8.10_linux_amd64.tar.gz
   ./influxd run -config ../../etc/influxdb/influxdb.conf

#### 3) Configuration Check & Modify

```
CnosDB and InfluxDB only modified the storage folder paths for Data, Wall, and Meta, while keeping the rest as default. This will not be repeated here.
```

#### 4. Dataset preparation

| Usage | Determine the PRNG-seed | Number of devices to generate | Start timestamp                                      | End timestamp                                        | Interval between readings per device | Target database | Data Size | Rows        |
| ----- | ----------------------- | ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ | --------------- | --------- | ----------- |
| iot   | 123                     | 100                           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                 | CnosDB/InfluxDB | 201G      | 450,721,871 |

### Test Results

| SQL                                                                                                                                                                    | CnosDB 2.4.1 | InfluxDB 1.8.10 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| 计数count: select count(elevation) from readings                                                                                      | 2.88s                        | 2.09s                           |
| 聚合: select count(latitude), max(latitude), min(latitude) from readings                        | 3.2s                         | 4.95s                           |
| 标签过滤: select count(latitude), max(latitude), min(latitude) from readings where fleet = 'East' | 1.75s                        | 2.67s                           |
| 标签分组: select count(latitude), max(latitude), min(latitude)  from readings group by driver     | 6.11s                        | 6.15s                           |
