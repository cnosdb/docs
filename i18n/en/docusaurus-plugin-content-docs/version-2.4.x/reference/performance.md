---
title: Benchmark
order: 9
---

# Benchmark

To present CnosDB performance more intuitively, we do performance test of CnosDB and InfluxDB of the same time series database by using [tsdb-comparisons](https://github.com/cnosdb/tsdb-comparisons).

## Conclusion

When the batch-size is set to 20,000, InfluxDB returns an error on the client: `{"error":"engine: cache-max-memory-size exceeded: (1074767264/1073741824)"}`, So we did not test the performance of InfluxDB in this case, but you can see that CnosDB is better than InfluxDB in most scenarios.

## Test CnosDB writes

### Testing Environment

|               | CnosDB                                                                                                                                                                                                      | InfluxDB                                                                                                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version       | 2.0.1                                                                                                                                                                       | 1.8.10                                                                                                                                                                      |
| 机器            | 1                                                                                                                                                                                                           | 1                                                                                                                                                                                                           |
| Configuration | 3.10.0-1160.81.1.el7.x86_64                                                            | 3.10.0-1160.81.1.el7.x86_64                                                            |
| 操作系统版本        | CentOS Linux release 7.9.2009 (Core)                                                                                                                     | CentOS Linux release 7.9.2009 (Core)                                                                                                                     |
| CPU           | Service side server:32 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz（memory:255.65 GB） | Service side server:32 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz（memory:255.65 GB） |
| 内存            | 480                                                                                                                                                                                                         | 480                                                                                                                                                                                                         |
| 磁盘            | 1块SSD盘(1T)                                                                                                                                                                               | 1块SSD盘(1T)                                                                                                                                                                               |

> 注：CnosDB和InfluxDB均为容器内部署，CPU核数为8，内存限制为32G。

### 2.测试实例准备

1. Install the db environment, go environment, etc. of the corresponding machine in advance, and ensure normal connection.

2. Install CnosDB:

   参照部署文档：[Docker安装CnosDB](../deploy)

3. Test InfluxDB writes

   wget https://dl.influxdata.com/influxdb/releases/influxdb-1.8.10_linux_amd64.tar.gz
   tar xvfz influxdb-1.8.10_linux_amd64.tar.gz
   ./influxd run -config ../../etc/influxdb/influxdb.conf

### 3.配置项检查及修改

```
 CnosDB和InfluxDB均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。
```

### 4.数据集准备

| 用例  | 确定性生成的PRNG种子 | 要生成的设备数量 | 开始时间戳                                                | 结束时间戳                                                | 每台设备每次读数时间间隔 | 目标数据库    | 数据量大小 | 数据行数       |
| --- | ------------ | -------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------ | -------- | ----- | ---------- |
| iot | 67           | 75       | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 57           | CnosDB   | 8G    | 37,342,964 |
| iot | 67           | 75       | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 57           | InfluxDB | 8G    | 37,342,964 |

### 5.测试方案

此次测试方案主要从两个角度考量：保持同等batch-size下，测试导入并发；保持同等导入并发大小，测试batch-size。

| batch-size | workers |
| ---------- | ------- |
| 1000       | 49      |
| 2500       | 49      |
| 2500       | 10      |
| 5000       | 3       |
| 20000      | 3       |

## 测试中期

1. Tsdb-comparisons generate data

```shell
git clone https://github.com/cnosdb/cnosdb.git
```

2. 生成InfluxDB数据集

```shell
cd tsdb-comparisons/cmd/generate_data
   	go build
   	./generate_data --use-case="iot" --seed=123 --scale=100          --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2023-01-01T00:00:00Z" --log-interval="50s" --format="influx"   > <file_path>/data.txt
```

3. www.cnosdb.com

```shell
docker run --name cnosdb -p 8902:8902 -d --cpus=8 --memory=32g cnosdb/cnosdb:community-latest cnosdb run -M singleton
```

4. InfluxDB is the default configuration except [data] and [meta]

```shell
docker run --name influxdb -p 8086:8086 -d --cpus=8 --memory=32g influxdb
```

5. The configuration of the CosDB is as follows:

```shell
cd tsdb-comparisons/cmd/load_cnosdb
go build
./load_cnosdb --do-abort-on-exist=false --do-create-db=false --gzip=false        --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:8902"   --batch-size=<batch_size_num> --workers=<workers_num>
```

6. Download InfluxDB, modify configurations in `etc/influxdb/influxdb.conf`, run

```shell
cd tsdb-comparisons/cmd/load_influx
go build
./load_influx --do-abort-on-exist=false --do-create-db=true --gzip=false --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:8086"  --batch-size=<batch_size_num> --workers=<workers_num>
```

## Test Results

|            |         | CnosDB                    |                            | InfluxDB                  |                            | With the increase of concurrent numbers, performance in some scenarios will also be improved, and CnosDB performance has a higher ceiling. |
| ---------- | ------- | ------------------------- | -------------------------- | ------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| batch-size | workers | overall row/s             | overall metric/s           | overall row/s             | overall metric/s           |                                                                                                                                                            |
| 1000       | 49      | 102089.67 | 807526.66  | 93781.54  | 741809.55  | 518                                                                                                                                                        |
| 2500       | 49      | 137468.17 | 607 463 382                | 106206.98 | 840094.40  | 330                                                                                                                                                        |
| 2500       | 10      | 211845.94 | 1675695.81 | 158378.11 | 1252766.68 | 43                                                                                                                                                         |
| 5000       | 3       | 176883.43 | 1399143.30 | 162338.48 | 1284093.14 | 518                                                                                                                                                        |
| 20000      | 3       | 174757.78 | 1382329.47 | 604 68 420                | 1270551.00 | 518                                                                                                                                                        |
