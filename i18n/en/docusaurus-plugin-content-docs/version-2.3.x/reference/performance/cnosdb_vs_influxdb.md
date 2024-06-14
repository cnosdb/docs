---
sidebar_position: 3
---

# CnosDB vs InfluxDB

We use [tsdb-comparisons](https://github.com/cnosdb/tsdb-comparisons) test tool to test two products.

## CnosDB 2.3.0 vs InfluxDB 1.8.10

A comparison of written performance tests was made between [CnosDB 2.3.0](https://github.com/cnosdb/cnosdb) and [InfluxDB 1.8.10] (https://github.com/influxdata/influxdb) followed by the test conclusions and test details.

### Conclusion

When the batch-size is set to 20,000, InfluxDB returns an error on the client: `{"error":"engine: cache-max-memory-size exceeded: (1074767264/1073741824)"}`, So we did not test the performance of InfluxDB in this case, but you can see that CnosDB is better than InfluxDB in most scenarios.

### Pre-test

#### 1. Test Environment Preparedness

|                          | CnosDB                                                                                                                                           | InfluxDB                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Version                  | 2.3.0                                                                                                            | 1.8.10                                                                                                           |
| Machine                  | 1                                                                                                                                                | 1                                                                                                                                                |
| Configuration            | 3.10.0-1160.81.1.el7.x86_64 | 3.10.0-1160.81.1.el7.x86_64 |
| Operating System Version | CentOS Linux release 7.9.2009 (Core)                                                          | CentOS Linux release 7.9.2009 (Core)                                                          |
| CPU                      | 32-core Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz                              | 32-core Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz                              |
| Memory                   | 256G                                                                                                                                             | 256G                                                                                                                                             |
| Disk                     | 1 SDD (1T)                                                                                                                    | 1 SDD (1T)                                                                                                                    |

> Note: CnosDB and InfluxDB are internal to the container, the CPU number is 8, and the memory limit is 32G.

#### 2. Test case preparation

1. Install the corresponding machine's db environment, go environment, etc. in advance to ensure that you can connect properly.

2. Install CnosDB:

   Refer to the deployment document: [Docker Install CnosDB] (../start/install. md)

3. Test InfluxDB writes

   Reference: [InfluxDB 1.8.10] (https://github.com/influxdata/influxdb)

#### 3) Configuration Check & Modify

```
CnosDB and InfluxDB only modified the storage folder paths for Data, Wal, and Meta, while keeping the rest as default. This will not be repeated here.
```

#### 4. Dataset preparation

| Usage | Determine the PRNG-seed | Number of devices to generate | Start timestamp                                      | End timestamp                                        | Interval between readings per device | Target database | Data Size | Rows       |
| ----- | ----------------------- | ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ | --------------- | --------- | ---------- |
| iot   | 123                     | 100                           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                                  | CnosDB          | 8G        | 37,342,964 |
| iot   | 123                     | 100                           | 2023-01-01T00:00:00Z | 2023-05-01T00:00:00Z | 50s                                  | InfluxDB        | 8G        | 37,342,964 |

#### 5. Test Scheme

This test program looks primarily at: to keep the same batch-size below from two angles and tests to import and distribute; keep the same import and dispatch size; test batch-size.

| batch-size | workers |
| ---------- | ------- |
| 1000       | 30      |
| 3000       | 30      |
| 3000       | 10      |
| 5000       | 8       |
| 20000      | 8       |

### Test medium term

1. Tsdb-comparisons generate data

```shell
git clone https://github.com/cnosdb/cnosdb.git
```

2. Generate InfluxDB Dataset

```shell
generate_data --use-case="iot" --seed=123 --scale=4000 --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2022-02-01T00:00:00Z" --log-interval="10s" --format="influxdb" ｜ gzip > /tmp/influxdb-data.gz
```

3. Start CnosDB

```shell
docker run --name cnosdb -p 8902:8902 -d --cpus=8 --memory=32g cnosdb/cnosdb:community-latest
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
cd tsdb-comparisons/cmd/load_cnosdb
go build
./load_influx --do-abort-on-exist=false --do-create-db=false --gzip=false        --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:8086"   --batch-size=<batch_size_num> --workers=<workers_num>
```

### Test Results

|            |         | CnosDB                    |                            | InfluxDB                  |                            | Performance Multiples |
| ---------- | ------- | ------------------------- | -------------------------- | ------------------------- | -------------------------- | --------------------- |
| batch-size | workers | overall row/s             | overall metric/s           | overall row/s             | overall metric/s           |                       |
| 1000       | 30      | 102089.67 | 807526.66  | 93781.54  | 741809.55  | 1.08  |
| 3000       | 30      | 137468.17 | 1087369.62 | 106206.98 | 840094.40  | 1.29  |
| 3000       | 10      | 211845.94 | 1675695.81 | 158378.11 | 1252766.68 | 1.33  |
| 5000       | 8       | 176883.43 | 1399143.30 | 162338.48 | 1284093.14 | 1.08  |
| 20000      | 8       | 174757.78 | 1382329.47 | 160626.45 | 1270551.00 | 1.08  |
