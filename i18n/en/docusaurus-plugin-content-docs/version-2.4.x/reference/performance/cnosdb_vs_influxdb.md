---
sidebar_position: 4
---

# CnosDB vs InfluxDB

## CnosDB 2.4.1 vs InfluxDB 1.8.10

Comparative performance testing between [CnosDB 2.4.1](https://github.com/cnosdb/cnosdb) and [InfluxDB 1.8.10](https://github.com/influxdata/influxdb) has been conducted, below are the test conclusions and test details.

### Conclusion

Under the same data conditions, test results show that the query performance of CnosDB and InfluxDB have their own advantages and disadvantages.

### 测试前期

#### 1. Test Environment Preparedness

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

Memory: 256 GB

Disk: SSD NVMe Protocol

#### 2. Test case preparation

1. 提前安装好对应机器的db环境，go环境等，确保可以正常连接。

2. Install CnosDB:

   Refer to the deployment document: [Install CnosDB](../start/install.md)

3. Test InfluxDB writes

   Reference: [InfluxDB 1.8.10] (https://github.com/influxdata/influxdb)

#### 3) Configuration Check & Modify

```
 CnosDB和InfluxDB均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。
```

#### 4. Dataset preparation

| Usage | Determine the PRNG-seed | Number of devices to generate | Start timestamp                                      | End timestamp                                        | Interval between readings per device | Target database | Data Size | Rows        |
| ----- | ----------------------- | ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ | --------------- | --------- | ----------- |
| iot   | 123                     | 100                           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                 | CnosDB/InfluxDB | 201G      | 450,721,871 |

### Test Results

| SQL                                                                                                                                                                          | CnosDB 2.4.1 | InfluxDB 1.8.10 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| Count: select count(elevation) from readings                                                                                              | 2.88s                        | 2.09s                           |
| Aggregate: select count(latitude), max(latitude), min(latitude) from readings                       | 3.2s                         | 4.95s                           |
| Tag filter: select count(latitude), max(latitude), min(latitude) from readings where fleet = 'East' | 1.75s                        | 2.67s                           |
| Tag group: select count(latitude), max(latitude), min(latitude)  from readings group by driver      | 6.11s                        | 6.15s                           |
