---
sidebar_position: 2
---

# CnosDB vs OpenTSDB

## CnosDB 2.3.4.4 vs OpenTSDB 2.4.1

在[CnosDB 2.3.4.4](https://github.com/cnosdb/cnosdb) 和 [OpenTSDB 2.4.1](https://github.com/OpenTSDB/opentsdb) 之间做了写入、查询和压缩比性能测试的对比，下面是测试结论和测试细节信息。

### Conclusion

在写入、查询和压缩比方面，CnosDB均更优于OpenTSDB

### 测试前期

#### 1. Test Environment Preparedness

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

Memory: 256 GB

Disk: SSD NVMe Protocol

#### 2. Test case preparation

1. The db environment of the corresponding machine is installed in advance to ensure proper connectivity.

2. Install CnosDB:

   Refer to the deployment document: [Install CnosDB](../start/install.md)

3. 安装 OpenTSDB

   首先，安装HBase，参照官网：[HBase](https://hbase.apache.org/book.html#quickstart)

   其次，下载并安装[OpenTSDB 2.4.1](https://github.com/OpenTSDB/opentsdb/releases)

#### 3) Configuration Check & Modify

```
 CnosDB和OpenTSDB均修改了存储文件夹路径，并要求CPU使用核数为8，Memory使用大小为32G/64G。
```

#### 4. Dataset preparation

1. 50GB，约 110 billion 测点数据
2. 时间跨度：2018/01-2018/06
3. 数据分布：平均分布

### Test medium term

[测试工具](https://github.com/influxdata/influxdb-comparisons)

生成数据种子：654147269

1. Start CnosDB

```shell
nohup ./target/release/cnosdb run --config ./config/config_8902.toml -M singleton &
```

2. 启动OpenTSDB

```shell
在HBase创建OpenTSDB表：env COMPRESSION=NONE /usr/share/opentsdb/tools/create_table.sh
启动OpenTSDB：/usr/shard/opentsdb/bin/tsdb tsd
```

### 写入测试结果

| CPU/Memory | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 |
| ---------- | -------------------------------------------------------------- | ---------------------------------------------- |
| 8C32G      | 20w                                                            | 2w                                             |
| 8C64G      | 25w                                                            | 2.2w                           |

### 查询测试结果

| SQL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| 5个月每分钟的最大usage_user值: select date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00'), max(usage_user) from cpu where hostname = 'host_0' and time >= '2018-01-01T00:00:00Z' and time <= '2018-06-01T00:00:00Z' group by date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00') limit 10; | 19ms                                                           | 1845ms                                         |
| 2个月每分钟的最大usage_user值: select date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00'), max(usage_user) from cpu where hostname = 'host_0' and time >= '2018-01-01T00:00:00Z' and time <= '2018-03-01T00:00:00Z' group by date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00') limit 10; | 17ms                                                           | 269ms                                          |

### 压缩比测试结果

|         | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 |
| ------- | -------------------------------------------------------------- | ---------------------------------------------- |
| 原始数据    | 50G                                                            | 50G                                            |
| 写入后落盘数据 | 4.8G                                           | 26G                                            |
| 压缩比     | 10.4                                           | 1.9                            |
