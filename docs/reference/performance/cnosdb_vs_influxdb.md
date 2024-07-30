---
sidebar_position: 4
---

# CnosDB vs InfluxDB

## CnosDB 2.4.1 vs InfluxDB 1.8.10

在[CnosDB 2.4.1](https://github.com/cnosdb/cnosdb) 和 [InfluxDB 1.8.10](https://github.com/influxdata/influxdb) 之间做了查询性能测试的对比，下面是测试结论和测试细节信息。

### 测试结论

相同数据情况下，测试结果显示CnosDB的查询性能与InfluxDB互有优劣。

### 测试前期
#### 1.测试环境准备

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

内存：256 GB

硬盘：SSD NVMe 协议

#### 2.测试实例准备

1. 提前安装好对应机器的db环境，go环境等，确保可以正常连接。

2. 安装 CnosDB

   参照部署文档：[安装CnosDB](../../start/install.md)

3. 安装 InfluxDB

   参照官网：[InfluxDB 1.8.10](https://github.com/influxdata/influxdb) 

#### 3.配置项检查及修改

     CnosDB和InfluxDB均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。

#### 4.数据集准备

| 用例 | 确定性生成的PRNG种子 | 要生成的设备数量 | 开始时间戳             | 结束时间戳             | 每台设备每次读数时间间隔 | 目标数据库       | 数据量大小  | 数据行数    |
| --- | ------------------ | ------------- | -------------------- | -------------------- | -------------------- |---------------- | --------- | ---------- |
| iot | 123                | 100           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                 | CnosDB/InfluxDB | 201G      | 450,721,871 |

### 测试结果

| SQL                                                                                             | CnosDB 2.4.1 | InfluxDB 1.8.10 |
| ----------------------------------------------------------------------------------------------- | ------------ |---------------- |
| 计数count: select count(elevation) from readings                                                 | 2.88s        | 2.09s           |
| 聚合: select count(latitude), max(latitude), min(latitude) from readings                         | 3.2s         | 4.95s           |
| 标签过滤: select count(latitude), max(latitude), min(latitude) from readings where fleet = 'East' | 1.75s        | 2.67s           |
| 标签分组: select count(latitude), max(latitude), min(latitude)  from readings group by driver     | 6.11s        | 6.15s           |
