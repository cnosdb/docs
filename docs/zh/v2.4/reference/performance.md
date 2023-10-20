---
title: 性能测试
order: 9
---

# 性能测试

为了更直观的呈现 CnosDB 的性能，我们使用 [tsdb-comparisons](https://github.com/cnosdb/tsdb-comparisons) 测试工具，在[CnosDB 2.3.0](https://github.com/cnosdb/cnosdb) 和 [InfluxDB 1.8.10](https://github.com/influxdata/influxdb) 之间做了写入性能测试的对比，下面是测试结论和测试细节信息。
## 测试结论

在保持同等batch-size大小，提高导入并发（至30）；保持同等导入并发，提高batch-size大小（至2w）；两种测试条件下，测试结果显示CnosDB的导入性能均要略优于InfluxDB。

## 测试前期
### 1.测试环境准备
|            | CnosDB                                        | InfluxDB                                     |
| ---------- | --------------------------------------------- | -------------------------------------------- |
| 版本        | 2.3.0                                         |   1.8.10                                     |
| 机器        | 1台                                           |  1台                                         |             
| 内核版本    | 3.10.0-1160.81.1.el7.x86_64                   | 3.10.0-1160.81.1.el7.x86_64                  | 
| 操作系统版本 | CentOS Linux release 7.9.2009 (Core)          | CentOS Linux release 7.9.2009 (Core)         | 
| CPU        | 32核 Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz | 32核 Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz | 
| 内存        | 256G                                         |  256G                                         | 
| 磁盘        | 1块SSD盘(1T)                                  |  1块SSD盘(1T)                                  | 
>注：CnosDB和InfluxDB均为容器内部署，CPU核数为8，内存限制为32G。

### 2.测试实例准备

1. 提前安装好对应机器的db环境，go环境等，确保可以正常连接。

2. 安装 CnosDB

   参照部署文档：[Docker安装CnosDB](../../latest/start/install.md)

3. 安装 InfluxDB

   参照官网：[InfluxDB 1.8.10](https://github.com/influxdata/influxdb) 

### 3.配置项检查及修改

     CnosDB和InfluxDB均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。

### 4.数据集准备

| 用例 | 确定性生成的PRNG种子 | 要生成的设备数量 | 开始时间戳             | 结束时间戳             | 每台设备每次读数时间间隔 | 目标数据库 | 数据量大小  | 数据行数    |
| --- | ------------------ | ------------- | -------------------- | -------------------- | -------------------- |---------- | --------- | ---------- |
| iot | 123                | 100           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                  | CnosDB    | 8G        | 37,342,964 |
| iot | 123                | 100           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                  | InfluxDB  | 8G        | 37,342,964 |

### 5.测试方案

此次测试方案主要从两个角度考量：保持同等batch-size下，测试导入并发；保持同等导入并发大小，测试batch-size。

| batch-size | workers |
| ---------  |  ------ |
| 1000       |  30     |
| 3000       |  30     |
| 3000       |  10     |
| 5000       |  8      |
| 20000      |  8      |

## 测试中期

1. 生成CnosDB数据集
```shell
generate_data --use-case="iot" --seed=123 --scale=4000 --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2022-02-01T00:00:00Z" --log-interval="10s" --format="cnosdb" ｜ gzip > /tmp/cnosdb-data.gz
```
2. 生成InfluxDB数据集
```shell
generate_data --use-case="iot" --seed=123 --scale=4000 --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2022-02-01T00:00:00Z" --log-interval="10s" --format="influxdb" ｜ gzip > /tmp/influxdb-data.gz
```
3. 启动CnosDB
```shell
docker run --name cnosdb -p 8902:8902 -d --cpus=8 --memory=32g cnosdb/cnosdb:community-latest cnosdb run -M singleton
```
4. 启动InfluxDB
```shell
docker run --name influxdb -p 8086:8086 -d --cpus=8 --memory=32g influxdb
```
5. 执行load到CnosDB：
```shell
cd tsdb-comparisons/cmd/load_cnosdb
go build
./load_cnosdb --do-abort-on-exist=false --do-create-db=false --gzip=false        --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:8902"   --batch-size=<batch_size_num> --workers=<workers_num>
```
6. 执行load到InfluxDB：
```shell
cd tsdb-comparisons/cmd/load_cnosdb
go build
./load_influx --do-abort-on-exist=false --do-create-db=false --gzip=false        --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:8086"   --batch-size=<batch_size_num> --workers=<workers_num>
```

## 测试结果

|            |         | CnosDB        |                  | InfluxDB      |                  | 性能倍数| 
| ---------- | ------- |-------------- | ---------------- | ------------- | ---------------- | ------ |
| batch-size | workers |overall row/s  | overall metric/s | overall row/s | overall metric/s |        |
| 1000       | 30      | 102089.67     | 807526.66        | 93781.54      | 741809.55        |  1.08  |
| 3000       | 30      | 137468.17     | 1087369.62       | 106206.98     | 840094.40        |  1.29  |
| 3000       | 10      | 211845.94     | 1675695.81       | 158378.11     | 1252766.68       |  1.33  |
| 5000       | 8       | 176883.43     | 1399143.30      | 162338.48     | 1284093.14        |  1.08  |
| 20000      | 8       | 174757.78     | 1382329.47       | 160626.45     | 1270551.00       |  1.08  |
