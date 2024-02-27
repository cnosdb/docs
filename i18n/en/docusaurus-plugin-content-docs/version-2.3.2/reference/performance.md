---
title: Performance Tests
order: 9
---

# Performance Tests

In order to render CnosDB more intuitive, we use the [tsdb-comparisons](https://github.com/cnosdb/tsdb-comparisons) test tool to compare the performance of [CnosDB 2.3.0](https://github.com/cnosdb/cnosdb) and [InfluxD1.8.10] (https\://github.com/influxdata/influxdb) below test conclusions and test details.

## Test Conclusion

With the same batch-size, increase the import and dispatch (up to 30); keep the same imported and increase the batch-size size (up to 2w); and test results show that CnosDB's import performance is slightly higher than InfluxDB.

## Testing Jérôme

### 1. Test Environment Preparedness

|                          | CnosDB                                                                                  | InfluxDB                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Version                  | 2.3.0                                                                                   | 1.8.10                                                                                  |
| Machine                  | 1                                                                                       | 1                                                                                       |
| Kernel Version           | 3.10.0-1160.81.1.el7.x86_64                                        | 3.10.0-1160.81.1.el7.x86_64                                        |
| Operating system version | CentOS Linux release 7.9.9 (Core)                                    | CentOS Linux release 7.9.9 (Core)                                    |
| CPU                      | 32 Nuclear Intel(R) Xeon(R) Gold 5218 CP@ 2.30GHz | 32 Nuclear Intel(R) Xeon(R) Gold 5218 CP@ 2.30GHz |
| Memory                   | 256G                                                                                    | 256G                                                                                    |
| Disk                     | 1 SDD (1T)                                                           | 1 SDD (1T)                                                           |

> Note：CnosDB and InfluxDB are internal to the container, the CPU number is 8, and the memory limit is 32G.

### 2. Test case preparation

1. The db environment of the corresponding machine is installed in advance, the go's environment, etc. to ensure proper connectivity.

2. Install CnosDB

   Reference deployment document：[Docker安装CnosDB](../start/install.md)

3. Install InfluxDB

   Reference network：[InfluxDB 1.8.10] (https\://github.com/influxdata/influxdb)

### 3) Configuration Check & Modify

```
 Both CnosDB and InfluxDB modify only the data storage folder path for Data, Wal, Meta, all remaining by default, and are not repeated here.
```

### Data set preparation

| Example | Determine the PRNG-seed | Number of devices to generate | Start timestamp      | End timestamp        | Interval between readings per device | Target database | Data Size | Data lines |
| ------- | ----------------------- | ----------------------------- | -------------------- | -------------------- | ------------------------------------ | --------------- | --------- | ---------- |
| iot     | 123                     | 100                           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                                  | CnosDB          | 8G        | 37,342,964 |
| iot     | 123                     | 100                           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                                  | InfluxDB        | 8G        | 37,342,964 |

### 5. Test Scheme

This test program looks primarily at：to keep the same batch-size below from two angles and tests to import and distribute; keep the same import and dispatch size; test batch-size.

| batch-size | Workers |
| ---------- | ------- |
| 1000       | 30      |
| 3000       | 30      |
| 3000       | 10      |
| 5000       | 8       |
| 20000      | 8       |

## Test medium term

1. Generate CnosDB Dataset

```shell
generate_data --use-case="iot" --seed=123 --scale=4000 --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2022-02-01T00:00:00Z" --log-interval="10s" --form="cnosdb" | gzip > /tmp/cnosdb-data.gz
```

2. Generate InfluxDB Dataset

```shell
generate_data --use-case="iot" --seed=123 --scale=4000 --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2022-02-01T00:00:00Z" --log-interval="10s" --form="influxdb" | gzip > /tmp/influxdb-data.gz
```

3. Start CnosDB

```shell
docker run --name cnosdb -p 8902:8902-d --cpus=8 --memory=32g cnosdb/cnosdb:community-latestcnosdb run -M singleton
```

4. Launch InfluxDB

```shell
docker run --name influxdb -p 8086:8086 -d --cpus=8 --memory=32g influxdb
```

5. Execute load to CnosDB：

```shell
cd tsdb-comparisons/cmd/load_cnosdb
go build
./load_cnosdb --do-abort-on-exist=false --do-cree-db=false-gzip=false --file=<file_path>/data.txt --db-name=<db_name> -urls="http://<ip>:8902" --batch-size=<batch_size_num> --workers=<workers_num>
```

6. Execute load to InfluxDB：

```shell
cd tsdb-comparisons/cmd/load_cnosdb
go build
./load_influx --do-abort-on-exist=false --do-create-db=false-gzip=false-file=<file_path>/data.txt --db-name=<db_name> -urls="http://<ip>:8086" --batch-size=<batch_size_num> --workers=<workers_num>
```

## Test results

|            |         | CnosDB        |                  | InfluxDB      |                  | Performance Multiples |
| ---------- | ------- | ------------- | ---------------- | ------------- | ---------------- | --------------------- |
| batch-size | Workers | overlay row/s | overlay metric/s | overlay row/s | overlay metric/s |                       |
| 1000       | 30      | 102089.67     | 807526.66        | 93781.54      | 741809.55        | 1.08                  |
| 3000       | 30      | 137468.17     | 1087369.62       | 106206.98     | 840094.40        | 1.29                  |
| 3000       | 10      | 211845.94     | 1675695.81       | 158378.11     | 1252766.68       | 1.33                  |
| 5000       | 8       | 176883.43     | 1399143.30       | 162338.48     | 1284093.14       | 1.08                  |
| 20000      | 8       | 174757.78     | 1382329.47       | 160626.45     | 1270551.00       | 1.08                  |
