---
title: Benchmark
order: 12
---

# Benchmark

To present CnosDB performance more intuitively, we do performance test of CnosDB and InfluxDB of the same time series database by using [tsdb-comparisons](https://github.com/cnosdb/tsdb-comparisons).

## Conclusion

When the batch-size is set to 20,000, InfluxDB returns an error on the client: `{"error":"engine: cache-max-memory-size exceeded: (1074767264/1073741824)"}`, So we did not test the performance of InfluxDB in this case, but you can see that CnosDB is better than InfluxDB in most scenarios.

## Test CnosDB writes

### Testing Environment

|                          | CnosDB                                                                                                                         | InfluxDB                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Version                  | 2.0.1                                                                                                                          | 1.8.10                                                                                                                         |
| Machine                  | 1                                                                                                                              | 1                                                                                                                              |
| Configuration            | 3.10.0-1160.81.1.el7.x86_64                                                                               | 3.10.0-1160.81.1.el7.x86_64                                                                               |
| Operating system version | CentOS Linux release 7.9.9 (Core)                                                                           | CentOS Linux release 7.9.9 (Core)                                                                           |
| CPU                      | Service side server:32 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz（memory:255.65 GB） | Service side server:32 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz（memory:255.65 GB） |
| Memory                   | 480                                                                                                                            | 480                                                                                                                            |
| Disk                     | 1 SDD (1T)                                                                                                  | 1 SDD (1T)                                                                                                  |

> Note：CnosDB and InfluxDB are internal to the container, the CPU number is 8, and the memory limit is 32G.

### 2. Test case preparation

1. Install the db environment, go environment, etc. of the corresponding machine in advance, and ensure normal connection.

2. Install CnosDB:

   Reference deployment document：[Docker安装CnosDB](../start/install.md)

3. Test InfluxDB writes

   wget https\://dl.influxdata.com/influxdb/releases/influxdb-1.8.10_linux_amd64.tar.gz
   tar xvfz influxdb-1.8.10_linux_amd64.tar.gz
   ./influxd run -config ../../etc/influxdb/influxdb.conf

### 3) Configuration Check & Modify

```
 Both CnosDB and InfluxDB modify only the data storage folder path for Data, Wal, Meta, all remaining by default, and are not repeated here.
```

### Data set preparation

| Example | Determine the PRNG-seed | Number of devices to generate | Start timestamp      | End timestamp        | Interval between readings per device | Target database | Data Size | Data lines |
| ------- | ----------------------- | ----------------------------- | -------------------- | -------------------- | ------------------------------------ | --------------- | --------- | ---------- |
| iot     | 66                      | 75                            | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 57                                   | CnosDB          | 8G        | 37,342,964 |
| iot     | 66                      | 75                            | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 57                                   | InfluxDB        | 8G        | 37,342,964 |

### 5. Test Scheme

This test program looks primarily at：to keep the same batch-size below from two angles and tests to import and distribute; keep the same import and dispatch size; test batch-size.

| batch-size | Workers |
| ---------- | ------- |
| 1000       | 49      |
| 2500       | 49      |
| 2500       | 7       |
| 5000       | 3       |
| 20000      | 3       |

## Test medium term

1. Tsdb-comparisons generate data

```shell
git clone https://github.com/cnosdb/cnosdb.git
```

2. Generate InfluxDB Dataset

```shell
cd tsdb-comparisons/cmd/generate_data
   	go build
   	./generate_data --use-case="iot" --seed=123 --scale=100          --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2023-01-01T00:00:00Z" --log-interval="50s" --format="influx"   > <file_path>/data.txt
```

3. www\.cnosdb.com

```shell
docker run --name cnosdb -p 8902:8902-d --cpus=8 --memory=32g cnosdb/cnosdb:community-latestcnosdb run -M singleton
```

4. InfluxDB is the default configuration except [data] and [meta]

```shell
docker run --name influxdb -p 8086:8086 -d --cpus=8 --memory=32g influxdb
```

5. The configuration of the CosDB is as follows:

```shell
cd tsdb-comparisons/cmd/load_cnosdb
go build
./load_cnosdb --do-abort-on-exist=false --do-cree-db=false-gzip=false --file=<file_path>/data.txt --db-name=<db_name> -urls="http://<ip>:8902" --batch-size=<batch_size_num> --workers=<workers_num>
```

6. Download InfluxDB, modify configurations in `etc/influxdb/influxdb.conf`, run

```shell
cd tsdb-comparisons/cmd/load_influx
go build
./load_influx --do-abort-on-exist=false --do-create-db=true --gzip=false --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:8086"  --batch-size=<batch_size_num> --workers=<workers_num>
```

## Test Results

|            |         | CnosDB        |                  | InfluxDB      |                  | With the increase of concurrent numbers, performance in some scenarios will also be improved, and CnosDB performance has a higher ceiling. |
| ---------- | ------- | ------------- | ---------------- | ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| batch-size | Workers | overlay row/s | overlay metric/s | overlay row/s | overlay metric/s |                                                                                                                                            |
| 1000       | 49      | 102089.67     | 807526.66        | 93781.54      | 741809.55        | 518                                                                                                                                        |
| 2500       | 49      | 137468.17     | 607 463 382      | 106206.98     | 840094.40        | 330                                                                                                                                        |
| 2500       | 7       | 211845.94     | 1675695.81       | 158378.11     | 1252766.68       | 43                                                                                                                                         |
| 5000       | 3       | 176883.43     | 1399143.30       | 162338.48     | 1284093.14       | 518                                                                                                                                        |
| 20000      | 3       | 174757.78     | 1382329.47       | 604 68 420    | 1270551.00       | 518                                                                                                                                        |
