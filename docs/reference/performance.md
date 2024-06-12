---
sidebar_position: 7
---

# 性能测试

展示CnosDB与其他时序产品的对比

## 产品对比

### CnosDB vs InfluxDB

我们使用 [tsdb-comparisons](https://github.com/cnosdb/tsdb-comparisons) 测试工具，对两个产品进行测试。

#### CnosDB 2.3.0 vs InfluxDB 1.8.10

在[CnosDB 2.3.0](https://github.com/cnosdb/cnosdb) 和 [InfluxDB 1.8.10](https://github.com/influxdata/influxdb) 之间做了写入性能测试的对比，下面是测试结论和测试细节信息。

##### 测试结论

在保持同等batch-size大小，提高导入并发（至30）；保持同等导入并发，提高batch-size大小（至2w）；两种测试条件下，测试结果显示CnosDB的导入性能均要略优于InfluxDB。

##### 测试前期
###### 1.测试环境准备
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

###### 2.测试实例准备

1. 提前安装好对应机器的db环境，go环境等，确保可以正常连接。

2. 安装 CnosDB

   参照部署文档：[Docker安装CnosDB](../start/install.md)

3. 安装 InfluxDB

   参照官网：[InfluxDB 1.8.10](https://github.com/influxdata/influxdb) 

###### 3.配置项检查及修改

     CnosDB和InfluxDB均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。

###### 4.数据集准备

| 用例 | 确定性生成的PRNG种子 | 要生成的设备数量 | 开始时间戳             | 结束时间戳             | 每台设备每次读数时间间隔 | 目标数据库 | 数据量大小  | 数据行数    |
| --- | ------------------ | ------------- | -------------------- | -------------------- | -------------------- |---------- | --------- | ---------- |
| iot | 123                | 100           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                  | CnosDB    | 8G        | 37,342,964 |
| iot | 123                | 100           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                  | InfluxDB  | 8G        | 37,342,964 |

###### 5.测试方案

此次测试方案主要从两个角度考量：保持同等batch-size下，测试导入并发；保持同等导入并发大小，测试batch-size。

| batch-size | workers |
| ---------  |  ------ |
| 1000       |  30     |
| 3000       |  30     |
| 3000       |  10     |
| 5000       |  8      |
| 20000      |  8      |

##### 测试中期

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
docker run --name cnosdb -p 8902:8902 -d --cpus=8 --memory=32g cnosdb/cnosdb:community-latest
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

##### 测试结果

|            |         | CnosDB        |                  | InfluxDB      |                  | 性能倍数| 
| ---------- | ------- |-------------- | ---------------- | ------------- | ---------------- | ------ |
| batch-size | workers |overall row/s  | overall metric/s | overall row/s | overall metric/s |        |
| 1000       | 30      | 102089.67     | 807526.66        | 93781.54      | 741809.55        |  1.08  |
| 3000       | 30      | 137468.17     | 1087369.62       | 106206.98     | 840094.40        |  1.29  |
| 3000       | 10      | 211845.94     | 1675695.81       | 158378.11     | 1252766.68       |  1.33  |
| 5000       | 8       | 176883.43     | 1399143.30      | 162338.48     | 1284093.14        |  1.08  |
| 20000      | 8       | 174757.78     | 1382329.47       | 160626.45     | 1270551.00       |  1.08  |

### CnosDB vs TimeScaleDB

CnosDB支持原生HTTP接口写入Line Protocol协议数据，TimeScaleDB不支持原生HTTP接口写入Line Protocol协议数据，因此采用了不同的数据源

#### CnosDB 2.4.1 vs TimeScaleDB 2.10.1

在[CnosDB 2.4.1](https://github.com/cnosdb/cnosdb) 和 [TimeScaleDB 2.10.1](https://github.com/timescale/timescaledb) 之间做了写入、查询和压缩比性能测试的对比，下面是测试结论和测试细节信息。

##### 测试结论

在写入、查询和压缩比方面，CnosDB均更优于TimeScaleDB

##### 测试前期
###### 1.测试环境准备

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

内存：256 GB

硬盘：SSD NVMe 协议

###### 2.测试实例准备

1. 提前安装好对应机器的db环境，确保可以正常连接。

2. 安装 CnosDB

   参照部署文档：[安装CnosDB](../start/install.md)

3. 安装 TimeScaleDB

   参照官网：[TimeScaleDB 2.10.1](https://docs.timescale.com/self-hosted/latest/install/installation-linux/) 

###### 3.配置项检查及修改

     CnosDB和TimeScaleDB均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。

###### 4.数据集准备

| 用例 | 确定性生成的PRNG种子 | 要生成的设备数量 | 开始时间戳             | 结束时间戳             | 每台设备每次读数时间间隔 | 目标数据库 | 数据量大小  | 数据行数    |
| --- | ------------------ | ------------- | -------------------- | -------------------- | -------------------- |---------- | --------- | ---------- |
| iot | 123                | 100           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                  | CnosDB    | 201G        | 450,721,871 |
| iot | 123                | 100           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                  | TimeScaleDB  | 164G        | 450,729,188 |

##### 测试中期

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

##### 写入测试结果

| CnosDB 2.4.1    | TimeScaleDB 2.10.1  | 性能倍数 |
|---------------- |-------------------- |------- |
| 110w~150w row/s | 60~63w row/s        | 2      |

##### 查询测试结果

| SQL                                      | CnosDB 2.4.1 | TimeScaleDB 2.10.1 | 
|----------------------------------------- |------------- |------------------- |
| select count (*) from readings           | 1.221s       | 4.413s             |
| 1年时间聚合查询（select count(*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2020-01-01 00:00:00.000000' and ts <= '2021-01-01 00:00:00.000000';） | 3.564s      | 12.138s            |

##### 压缩比测试结果

|              | CnosDB 2.4.1 | TimeScaleDB 2.10.1 | 
|------------  |------------- |------------------- |
| 原始数据      | 201G         | 164G               |
| 写入后落盘数据 | 26G          | 22G                |
| 压缩比        | 7.7307       | 7.45               |

### CnosDB vs OpenTSDB

#### CnosDB 2.3.4.4 vs OpenTSDB 2.4.1

在[CnosDB 2.3.4.4](https://github.com/cnosdb/cnosdb) 和 [OpenTSDB 2.4.1](https://github.com/OpenTSDB/opentsdb) 之间做了写入、查询和压缩比性能测试的对比，下面是测试结论和测试细节信息。

##### 测试结论

在写入、查询和压缩比方面，CnosDB均更优于OpenTSDB

##### 测试前期
###### 1.测试环境准备

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

内存：256 GB

硬盘：SSD NVMe 协议

###### 2.测试实例准备

1. 提前安装好对应机器的db环境，确保可以正常连接。

2. 安装 CnosDB

   参照部署文档：[安装CnosDB](../start/install.md)

3. 安装 OpenTSDB

   首先，安装HBase，参照官网：[HBase](https://hbase.apache.org/book.html#quickstart)
   
   其次，下载并安装[OpenTSDB 2.4.1](https://github.com/OpenTSDB/opentsdb/releases)

###### 3.配置项检查及修改

     CnosDB和OpenTSDB均修改了存储文件夹路径，并要求CPU使用核数为8，Memory使用大小为32G/64G。

###### 4.数据集准备

1. 50GB，约 110 billion 测点数据
2. 时间跨度：2018/01-2018/06
3. 数据分布：平均分布

##### 测试中期

[测试工具](https://github.com/influxdata/influxdb-comparisons)

生成数据种子：654147269

1. 启动CnosDB
```shell
nohup ./target/release/cnosdb run --config ./config/config_8902.toml -M singleton &
```
2. 启动OpenTSDB
```shell
在HBase创建OpenTSDB表：env COMPRESSION=NONE /usr/share/opentsdb/tools/create_table.sh
启动OpenTSDB：/usr/shard/opentsdb/bin/tsdb tsd
```

##### 写入测试结果

| CPU/Memory | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 |
|----------- |--------------- |--------------- |
| 8C32G      | 20w            | 2w             |
| 8C64G      | 25w            | 2.2w           |

##### 查询测试结果

| SQL                                      | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 | 
|----------------------------------------- |--------------- |--------------- |
| 5个月每分钟的最大usage_user值: select date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00'), max(usage_user) from cpu where hostname = 'host_0' and time >= '2018-01-01T00:00:00Z' and time <= '2018-06-01T00:00:00Z' group by date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00') limit 10;           | 19ms       | 1845ms             |
| 2个月每分钟的最大usage_user值: select date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00'), max(usage_user) from cpu where hostname = 'host_0' and time >= '2018-01-01T00:00:00Z' and time <= '2018-03-01T00:00:00Z' group by date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00') limit 10;           | 17ms       | 269ms              |

##### 压缩比测试结果

|              | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 | 
|------------  |--------------- |--------------- |
| 原始数据      | 50G            | 50G            |
| 写入后落盘数据 | 4.8G           | 26G            |
| 压缩比        | 10.4           | 1.9            |

### CnosDB vs MySQL

#### CnosDB 2.4 vs MySQL 5.6

在[CnosDB 2.4](https://github.com/cnosdb/cnosdb) 和 [MySQL 5.6](https://github.com/mysql/mysql-server) 之间做了写入、查询和压缩比性能测试的对比，下面是测试结论和测试细节信息。

##### 测试结论

在写入、查询和压缩比方面，CnosDB均更优于MySQL

##### 测试前期
###### 1.测试环境准备
|            | CnosDB                                        | MySQL                                     |
| ---------- | --------------------------------------------- | -------------------------------------------- |
| 版本        | 2.4                                         |   5.6                                     |
| 机器        | 1台                                           |  1台                                         |             
| 内核版本    | 3.10.0-1160.81.1.el7.x86_64                   | 3.10.0-1160.81.1.el7.x86_64                  | 
| 操作系统版本 | CentOS Linux release 7.9.2009 (Core)          | CentOS Linux release 7.9.2009 (Core)         | 
| CPU        | 32核 Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz | 32核 Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz | 
| 内存        | 256G                                         |  256G                                         | 
| 磁盘        | 1块SSD盘(1T)                                  |  1块SSD盘(1T)                                  | 

###### 2.测试实例准备

1. 提前安装好对应机器的db环境，确保可以正常连接。

2. 安装 CnosDB

   参照部署文档：[安装CnosDB](../start/install.md)

3. 安装 MySQL

   参照官网：[MySQL 5.6](https://www.mysql.com/cn/downloads/) 

###### 3.配置项检查及修改

     CnosDB和MySQL均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。

###### 4.数据集准备

1. 数据集行数：410522759
2. 数据集文件格式：csv
3. 数据集大小：39G

测试数据schema

| 字段                     | MySQL类型     | CnosDB类型 |
|------------------------- |--------------|---------- |
| time                     | BIGINT       | TIMESTAMP |
| device_version           | VARCHAR(255) | TAG       |
| driver                   | VARCHAR(255) | TAG       |
| fleet                    | VARCHAR(255) | TAG       |
| model                    | VARCHAR(255) | TAG       |
| elevation                | VARCHAR(255) | TAG       |
| fuel_capacity            | DOUBLE       | DOUBLE    |
| fuel_consumption         | DOUBLE       | DOUBLE    |
| grade                    | DOUBLE       | DOUBLE    |
| heading                  | DOUBLE       | DOUBLE    |
| latitude                 | DOUBLE       | DOUBLE    |
| load_capacity            | DOUBLE       | DOUBLE    |
| longitude                | DOUBLE       | DOUBLE    |
| nominal_fuel_consumption | DOUBLE       | DOUBLE    |
| velocity                 | DOUBLE       | DOUBLE    |

##### 测试中期

1. 向CnosDB写入数据：
```shell
COPY INTO readings FROM '/data/data/csv/cnodb-iot-seed-123-scale-100-2017_csv/cnodb-iot-seed-123-scale-100-2017_readings_no_blank.csv' 
FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
```
2. 向MySQL写入数据：
```shell
load data local infile '/data/data/csv/cnodb-iot-seed-123-scale-100-2017_csv/cnodb-iot-seed-123-scale-100-2017_readings_no_blank.csv' 
into table readings character set utf8  fields terminated by ',' lines terminated by '\n' ignore 1 lines;
```

##### 写入测试结果

|            | CnosDB 2.4 | MySQL 5.6          |
|----------- |----------- |------------------- |
| write time | 11 min 1 s | 1 hour 55 min 20 s |

##### 查询测试结果

| SQL                                                                                         | CnosDB 2.4   | MySQL 5.6       | 
|-------------------------------------------------------------------------------------------- |------------- |---------------- |
| select count(*) from readings                                                               | 1 min 41 sec | 4 min 41 sec    |
| select count(*) from readings where latitude = 100                                          | 3.7 sec      | 3 min 55.75 sec |
| select count(*), max(latitude), min(latitude), avg(latitude) from readings                  | 3.5 sec      | 5 min 46 sec    |
| sselect count(*), max(latitude), min(latitude), avg(latitude) from readings group by driver | 9.4 sec      | 7 min 3.47 sec  |

##### 压缩比测试结果

|              | CnosDB 2.4 | MySQL 5.6 | 
|------------  |----------- |---------- |
| 原始数据      | 39G        | 39G       |
| 写入后落盘数据 | 15G        | 62G       |
| 压缩比        | 2.6        | 0.6       |