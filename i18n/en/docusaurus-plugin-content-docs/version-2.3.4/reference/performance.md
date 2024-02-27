---
title: Performance Tests
order: 9
---

# Performance Tests

In order to render CnosDB performance more intuitively, we used [tsdb-comparisons](https://github.com/cnosdb/tsdb-comparisons) for [CnosDB](https://github.com/cnosdb/cnosdb/cnosdb) and [InfluxDB](https://github.com/influxdata/influxdb) for the same time sequence database.

## Basic Information

|                  |      CnosDB     |           InfluxDB           |
| ---------------- | :-------------: | :--------------------------: |
| Version          |      2.0.1      |            1.8.10            |
| Achieve Language |       rust      |              go              |
| Web site         | www\.cnosdb.com | https\://www\.influxdata.com |

## Test Environment

In order to avoid being affected by network bandwidth and to better simulate multi-tenant scenarios, our server has a virtual machine that can be used as a server machine, and two benchmark clients are enabled simultaneously to write data to different databases of the server Virtual Machine CnosDB or InfluxDB.

All tests run on our servers, configuration：

1. Server：32 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz (memory：255.65 GB)

   Virtual Machine CPU assigned 16 nucleus.

   A total of two blocks on disk, one mounted to Virtual Machine / opt-sdc1, performance bench below：

   ![](/img/nvme_bench.png)

   Virtual Machine other directory diskperformance bench below：

   ![](/img/other_bench.png)

2. Client server：32 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz (memory 256)

   Disk performance bench below：

   ![](/img/19bench.png)

## Configuration

CSDB configuration below：

```
[storage]
# Directory for summary: $path/summary/
# Directory for index: $path/index/$database/
# Directory for tsm: $path/data/$database/tsm/
# Directory for delta: $path/data/$database/delta/
path = '/opt/data/db'
max_summary_size = 134217728 # 128 * 1024 * 1024
max_level = 4
base_file_size = 16777216 # 16 * 1024 * 1024
compact_trigger = 4
max_compact_size = 2147483648 # 2 * 1024 * 1024 * 1024
dio_max_resident = 1024
dio_max_non_resident = 1024
dio_page_len_scale = 10
strict_write = false

[wal]
enabled = true
path = '/opt-sdc1/data/wal'
sync = false

[cache]
max_buffer_size = 10485760 # 10 * 1024 * 1024
max_immutable_number = 4

[log]
level = 'info'
path = 'data/log'

[security]
# [security.tls_config]
# certificate = "./config/tls/server.crt"
# private_key = "./config/tls/server.key"
```

InfluxDB is a default configuration except [data] and [meta].

```
[meta]
  # Where the metapa/draft database is stalled
  dir = "/opt-sdc1/var/lib/influxdb/meta"
[data]
  # The directory where the TSM store engine stores TSM files.
  dir = "/opt/var/lib/influxdb/data"

  # The directory where the TSM story engine stores WAL files.
  wal-dir = "/opt-sdc1/var/lib/influxdb/wal"
```

## Split

1. The db environment of the corresponding machine is installed in advance, the go's environment, etc. to ensure proper connectivity.

2. Install CnosDB.

   Pull code： from GitHub

   ```
   git clone https://github.com/cnosdb/cnosdb.git
   ```

   Modify the part assigned in `config/config.toml` to run：

   ```
   cargo run --release run --cpu 64
   ```

   Download InfluxDB, modify the configuration in `etc/influxdb/influxdb.conf` to run：

   ```
   wget https://dl.influxdata.com/influxdb/releases/influxdb-1.8.10_linux_amd64.tar.gz
   tar xvfz influxdb-1.8.10_linux_amd64.tar.gz
   ./influxd run -config ..//influxdb/influxdb.conf
   ```

3. tsdb-comparisons generate data.

   Pull code： from GitHub

   ```
   git clone https://github.com/cnosdb/tsdb-comparisons.git
   ```

   Build Run Data：

   cd tsdb-comparisons/cmd/generate_data
   go build
   ./generate_data --use-case="iot" --seed=123 --scale=100 --timestamp-start="2022-01-01T00:00:00:00Z" --timestamp-end="2023-01-01T00:00:00Z" -log-interval="50s" --form="influx" > \<file_path>/data.txt

4. Test CnosDB writing.

   ```
   cd tsdb-comparisons/cmd/load_cnosdb
   go build
   ./load_cnosdb --do-abort-on-exist=false --do-cree-db=false-gzip=false --file=<file_path>/data.txt --db-name=<db_name> -urls="http://<ip>:8902" --batch-size=<batch_size_num> --workers=<workers_num>
   ```

5. Test InfluxDB writing.

   ```
   cd tsdb-comparisons/cmd/load_influx
   go build
   ./load_influx --do-abort-on-exist=false --do-create-db=true --gzip=false-file=<file_path>/data.txt --db-name=<db_name> --urls="http://<ip>:8086" ---batch-size=<batch_size_num> --workers=<workers_num>
   ```

## Test results

In our test scenario, InfluxDB can only do wrokers = 100, i.e. 100 concurrent sprints, the results of which are as follows (row and metric units：,000)：

|            | CnosDB        |                  | InfluxDB      |                  |
| ---------- | ------------- | ---------------- | ------------- | ---------------- |
| batch-size | overlay row/s | overlay metric/s | overlay row/s | overlay metric/s |
| 20000      | 75            | 604              |               |                  |
| 10000      | 68            | 538              | 54            | 420              |
| 5000       | 66            | 512              | 61            | 480              |
| 2500       | 53            | 420              | 57            | 450              |
| 1000       | 43            | 330              | 49            | 389              |
| 1          | 6             | 48               | 2.5           | 15               |

We have a value of the sum of two clients when we write stable data in the database in benchmark

InfluxDB on client report： when batch-size is set to 20000

`{"error":"engine: cache-max-memory-size: (1074767264/1073741824)"}`,

So we have not tested the performance of InfluxDB in this case, but it can be seen that, in most scenarios, the performance of CnosDB is that of the fluxDB.

In addition to this, CnosDB supports higher conjunctions and we also tested CnosDB performance at worker=200, i.e. 200, conjunction, as follows (row and metric units：,000)：

|            | CnosDB        |                  |
| ---------- | ------------- | ---------------- |
| batch-size | overlay row/s | overlay metric/s |
| 20000      | 75            | 601              |
| 10000      | 75            | 607              |
| 5000       | 67            | 518              |
| 2500       | 60            | 463              |
| 1000       | 49            | 382              |
| 1          | 6             | 47               |

As the number of parallel events increases, performance in some scenarios will improve, and CnosDB will have a higher ceiling.

## Conclusion

1. CnosDB compares with InfluxDB, with higher performance in most cases.
2. CnosDB compares with InfluxDB. Can support higher parallel occurrences, higher batch-size.
3. We do not compare with other time-series databases that do not support Line Protocol or convert Line Protocol to clients, which is not fair to CnosDB and InfluxDB directly writing to Line Protocol.
