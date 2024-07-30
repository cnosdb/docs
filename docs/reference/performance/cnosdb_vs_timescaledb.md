---
sidebar_position: 3
---

# CnosDB vs TimeScaleDB

CnosDB支持原生HTTP接口写入Line Protocol协议数据，TimeScaleDB不支持原生HTTP接口写入Line Protocol协议数据，因此采用了不同的数据源

## CnosDB 2.4.1 vs TimeScaleDB 2.10.1

在[CnosDB 2.4.1](https://github.com/cnosdb/cnosdb) 和 [TimeScaleDB 2.10.1](https://github.com/timescale/timescaledb) 之间做了写入、查询和压缩比性能测试的对比，下面是测试结论和测试细节信息。

### 测试结论

在写入、查询和压缩比方面，CnosDB均更优于TimeScaleDB

### 测试前期
#### 1.测试环境准备

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

内存：256 GB

硬盘：SSD NVMe 协议

#### 2.测试实例准备

1. 提前安装好对应机器的db环境，确保可以正常连接。

2. 安装 CnosDB

   参照部署文档：[安装CnosDB](../../start/install.md)

3. 安装 TimeScaleDB

   参照官网：[TimeScaleDB 2.10.1](https://docs.timescale.com/self-hosted/latest/install/installation-linux/) 

#### 3.配置项检查及修改

     CnosDB和TimeScaleDB均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。

#### 4.数据集准备

| 用例 | 确定性生成的PRNG种子 | 要生成的设备数量 | 开始时间戳             | 结束时间戳             | 每台设备每次读数时间间隔 | 目标数据库 | 数据量大小  | 数据行数    |
| --- | ------------------ | ------------- | -------------------- | -------------------- | -------------------- |---------- | --------- | ---------- |
| iot | 123                | 100           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                  | CnosDB    | 201G        | 450,721,871 |
| iot | 123                | 100           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                  | TimeScaleDB  | 164G        | 450,729,188 |

### 测试中期

[TimeScaleDB测试工具](https://github.com/timescale/tsbs)

[CnosDB测试工具](https://github.com/cnosdb/tsdb-comparisons)

1. 生成CnosDB数据集
```shell
generate_data --use-case="iot" --seed=123 --scale=100 --timestamp-start="2020-01-01T00:00:00Z" --timestamp-end="2021-01-07T00:00:00Z" --log-interval="6.3s" --format="cnosdb" | gzip > cnosdb-iot-123-100-2021-data.gz
```
2. 生成TimeScaleDB数据集
```shell
tsbs_generate_data --use-case="iot" --seed=123 --scale=100 --timestamp-start="2020-01-01T00:00:00Z" --timestamp-end="2021-01-01T00:00:00Z" --log-interval="6.3s" --format="timescaledb" | gzip > timescaledb-iot-123-100-2021-data.gz
```
3. 启动CnosDB
```shell
nohup ./target/release/cnosdb run --config ./config/config_8902.toml -M singleton &
```
4. 启动TimeScaleDB
```shell
systemctl start postgresql-14
```
5. 执行load到CnosDB：
```shell
./load_cnosdb --do-abort-on-exist=false --do-create-db=false --gzip=false --file=cnodb-iot-seed-123-scale-100-2021 --db-name=<db_name> --urls="http://<ip>:8902" --batch-size=<batch_size_num> --workers=<workers_num>
```
6. 执行load到TimeScaleDB：
```shell
./bin/tsbs_load_timescaledb --postgres="sslmode=disable" --host="localhost" --port=5432 --pass="password" --user="postgres" --file="./timescaledb-iot-123-100-2021-data" --db-name="benchmark" --batch-size=<batch_size_num> --workers=<workers_num>
```

### 写入测试结果

| CnosDB 2.4.1    | TimeScaleDB 2.10.1  | 性能倍数 |
|---------------- |-------------------- |------- |
| 110w~150w row/s | 60~63w row/s        | 2      |

### 查询测试结果

| SQL                                      | CnosDB 2.4.1 | TimeScaleDB 2.10.1 | 
|----------------------------------------- |------------- |------------------- |
| select count (*) from readings           | 1.221s       | 6.902 s            |
| 1天时间聚合查询（select count(*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2021-01-01 00:00:00.000000' and ts <= '2021-01-02 00:00:00.000000';） | 0.166s      | 0.085 s            |
| 10天时间聚合查询（select count(*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2021-01-01 00:00:00.000000' and ts <= '2021-01-10 00:00:00.000000';） | 0.176s      | 0.707 s            |
| 90天时间聚合查询（select count(*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2020-01-01 00:00:00.000000' and ts <= '2021-01-01 00:00:00.000000';） | 1.352s      | 6.831 s            |
| 180天时间聚合查询（select count(*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2020-01-01 00:00:00.000000' and ts <= '2021-01-01 00:00:00.000000';） | 2.313s      | 13.827 s            |
| 1年时间聚合查询（select count(*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2020-01-01 00:00:00.000000' and ts <= '2021-01-01 00:00:00.000000';） | 3.564s      | 28.063 s            |

### 压缩比测试结果

|              | CnosDB 2.4.1 | TimeScaleDB 2.10.1 | 
|------------  |------------- |------------------- |
| 原始数据      | 201G         | 164G               |
| 写入后落盘数据 | 26G          | 22G                |
| 压缩比        | 7.7307       | 7.45               |