---
sidebar_position: 3
---

# CnosDB vs TimeScaleDB

CnosDB supports writing Line Protocol protocol data through native HTTP interface, while TimeScaleDB does not support writing Line Protocol protocol data through native HTTP interface, so it uses different data sources

## CnosDB 2.4.1 vs TimeScaleDB 2.10.1

Comparative performance testing between [CnosDB 2.4.1](https://github.com/cnosdb/cnosdb) and [TimeScaleDB 2.10.1](https://github.com/timescale/timescaledb) has been conducted on write, query, and compression ratio performance, below are the test conclusions and test details information.

### Conclusion

CnosDB is better than TimeScaleDB for writing, query and compression

### Pre-test

#### 1. Test Environment Preparedness

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

Memory: 256 GB

Disk: SSD NVMe Protocol

#### 2. Test case preparation

1. The db environment of the corresponding machine is installed in advance to ensure proper connectivity.

2. Install CnosDB:

   Refer to the deployment document: [Install CnosDB](../../start/install.md)

3. Install TimeScaleDB

   Refer to the official website: [TimeScaleDB 2.10.1](https://docs.timescale.com/self-hosted/latest/install/installation-linux/)

#### 3) Configuration Check & Modify

```
CnosDB and TimeScaleDB only modified the storage folder paths for Data, Wal, and Meta, while keeping the rest as default. This will not be repeated here.
```

#### 4. Dataset preparation

| Usage | Determine the PRNG-seed | Number of devices to generate | Start timestamp                                      | End timestamp                                        | Interval between readings per device | Target database | Data Size | Rows        |
| ----- | ----------------------- | ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ | --------------- | --------- | ----------- |
| iot   | 123                     | 100                           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                 | CnosDB          | 201G      | 450,721,871 |
| iot   | 123                     | 100                           | 2020-01-01T00:00:00Z | 2021-01-01T00:00:00Z | 6.3s                 | TimeScaleDB     | 164G      | 450,729,188 |

### Test medium term

[TimeScaleDB Testing Tool](https://github.com/timescale/tsbs)

[CnosDB Testing Tool](https://github.com/cnosdb/tsdb-comparisons)

1. Tsdb-comparisons generate data

```shell
generate_data --use-case="iot" --seed=123 --scale=100 --timestamp-start="2020-01-01T00:00:00Z" --timestamp-end="2021-01-07T00:00:00Z" --log-interval="6.3s" --format="cnosdb" | gzip > cnosdb-iot-123-100-2021-data.gz
```

2. Generate TimeScaleDB dataset

```shell
tsbs_generate_data --use-case="iot" --seed=123 --scale=100 --timestamp-start="2020-01-01T00:00:00Z" --timestamp-end="2021-01-01T00:00:00Z" --log-interval="6.3s" --format="timescaledb" | gzip > timescaledb-iot-123-100-2021-data.gz
```

3. Start CnosDB

```shell
nohup ./target/release/cnosdb run --config ./config/config_8902.toml -M singleton &
```

4. Start TimeScaleDB

```shell
systemctl start postgresql-14
```

5. The configuration of the CosDB is as follows:

```shell
./load_cnosdb --do-abort-on-exist=false --do-create-db=false --gzip=false --file=cnodb-iot-seed-123-scale-100-2021 --db-name=<db_name> --urls="http://<ip>:8902" --batch-size=<batch_size_num> --workers=<workers_num>
```

6. Execute load to TimeScaleDB:

```shell
./bin/tsbs_load_timescaledb --postgres="sslmode=disable" --host="localhost" --port=5432 --pass="password" --user="postgres" --file="./timescaledb-iot-123-100-2021-data" --db-name="benchmark" --batch-size=<batch_size_num> --workers=<workers_num>
```

### Write Test Results

| CnosDB 2.4.1 | TimeScaleDB 2.10.1 | Performance Multiples |
| -------------------------------------------- | -------------------------------------------------- | --------------------- |
| 110w~150w row/s              | 60~63w row/s                       | 2                     |

### Query Test Results

| SQL                                                                                                                                                                                                                                                                                                                                                  | CnosDB 2.4.1 | TimeScaleDB 2.10.1 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| select count (\*) from readings                                                                                                                                                                                                                                                                                                   | 1.221s                       | 6.902 s                            |
| 1天时间聚合查询（select count(\*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2021-01-01 00:00:00.000000' and ts <= '2021-01-02 00:00:00.000000';）   | 0.166s                       | 0.085 s                            |
| 10天时间聚合查询（select count(\*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2021-01-01 00:00:00.000000' and ts <= '2021-01-10 00:00:00.000000';）  | 0.176s                       | 0.707 s                            |
| 90天时间聚合查询（select count(\*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2020-01-01 00:00:00.000000' and ts <= '2021-01-01 00:00:00.000000';）  | 1.352s                       | 6.831 s                            |
| 180天时间聚合查询（select count(\*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2020-01-01 00:00:00.000000' and ts <= '2021-01-01 00:00:00.000000';） | 2.313s                       | 13.827 s                           |
| 1年时间聚合查询（select count(\*), max(latitude), min(latitude), avg(latitude) from readings where ts >= '2020-01-01 00:00:00.000000' and ts <= '2021-01-01 00:00:00.000000';）   | 3.564s                       | 28.063 s                           |

### Compression Ratio Test Result

|                                          | CnosDB 2.4.1 | TimeScaleDB 2.10.1 |
| ---------------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| Original Data                            | 201G                                         | 164G                                               |
| Data written to disk after being written | 26G                                          | 22G                                                |
| Compression ratio                        | 7.7307                       | 7.45                               |
