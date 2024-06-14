---
sidebar_position: 2
---

# CnosDB vs OpenTSDB

## CnosDB 2.3.4.4 vs OpenTSDB 2.4.1

Comparisons between [CnosDB 2.3.4.4](https://github.com/cnosdb/cnosdb) and [OpenTSDB 2.4.1](https://github.com/OpenTSDB/opentsdb) are made, followed by test conclusions and test details.

### Conclusion

CnosDB is better than OpenTSDB for writing, query and compression

### Pre-test

#### 1. Test Environment Preparedness

CPU：64 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz

Memory: 256 GB

Disk: SSD NVMe Protocol

#### 2. Test case preparation

1. The db environment of the corresponding machine is installed in advance to ensure proper connectivity.

2. Install CnosDB:

   Refer to the deployment document: [Install CnosDB](../start/install.md)

3. Install OpenTSDB

   First, install HBase, refer to the official website: [HBase](https://hbase.apache.org/book.html#quickstart)

   Next, download and install [OpenTSDB 2.4.1](https://github.com/OpenTSDB/opentsdb/releases)

#### 3) Configuration Check & Modify

```
CnosDB and OpenTSDB have both modified the storage folder path, and require CPU cores to be 8, and Memory size to be 32G/64G.
```

#### 4. Dataset preparation

1. 50GB, about 110 billion data points
2. Time span: 2018/01-2018/06
3. Data distribution: average distribution

### Test medium term

[Testing Tool](https://github.com/influxdata/influxdb-comparisons)

Generate data seed: 654147269

1. Start CnosDB

```shell
nohup ./target/release/cnosdb run --config ./config/config_8902.toml -M singleton &
```

2. Start OpenTSDB

```shell
Create OpenTSDB table in HBase: env COMPRESSION=NONE /usr/share/opentsdb/tools/create_table.sh
Start OpenTSDB: /usr/shard/opentsdb/bin/tsdb tsd
```

### Write Test Results

| CPU/Memory | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 |
| ---------- | -------------------------------------------------------------- | ---------------------------------------------- |
| 8C32G      | 20K                                                            | 20K                                            |
| 8C64G      | 250K                                                           | 22K                                            |

### Query Test Results

| SQL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| Maximum usage_user value per minute for 5 months: select date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00'), max(usage_user) from cpu where hostname = 'host_0' and time >= '2018-01-01T00:00:00Z' and time <= '2018-06-01T00:00:00Z' group by date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00') limit 10; | 19ms                                                           | 1845ms                                         |
| Maximum usage_user value per minute for 2 months: select date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00'), max(usage_user) from cpu where hostname = 'host_0' and time >= '2018-01-01T00:00:00Z' and time <= '2018-03-01T00:00:00Z' group by date_bin(INTERVAL '1' MINUTE,time, TIMESTAMP '2018-01-01T00:00:00') limit 10; | 17ms                                                           | 269ms                                          |

### Compression Ratio Test Result

|                                          | CnosDB 2.3.4.4 | OpenTSDB 2.4.1 |
| ---------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| Original Data                            | 50G                                                            | 50G                                            |
| Data written to disk after being written | 4.8G                                           | 26G                                            |
| Compression ratio                        | 10.4                                           | 1.9                            |
