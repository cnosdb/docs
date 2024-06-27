---
sidebar_position: 2
---

# CnosDB vs MySQL

## CnosDB 2.4 vs MySQL 5.6

Comparative performance testing between [CnosDB 2.4](https://github.com/cnosdb/cnosdb) and [MySQL 5.6](https://github.com/mysql/mysql-server) has been conducted on write, query, and compression ratio performance, below are the test conclusions and test details information.

### Conclusion

CnosDB is better than MySQL for writing, query and compression

### Pre-test

#### 1. Test Environment Preparedness

|                          | CnosDB                                                                                                                                           | MySQL                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Version                  | 2.4                                                                                                                              | 5.6                                                                                                                              |
| Machine                  | 1                                                                                                                                                | 1                                                                                                                                                |
| Configuration            | 3.10.0-1160.81.1.el7.x86_64 | 3.10.0-1160.81.1.el7.x86_64 |
| Operating System Version | CentOS Linux release 7.9.2009 (Core)                                                          | CentOS Linux release 7.9.2009 (Core)                                                          |
| CPU                      | 32-core Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz                              | 32-core Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz                              |
| Memory                   | 256G                                                                                                                                             | 256G                                                                                                                                             |
| Disk                     | 1 SDD (1T)                                                                                                                    | 1 SDD (1T)                                                                                                                    |

#### 2. Test case preparation

1. The db environment of the corresponding machine is installed in advance to ensure proper connectivity.

2. Install CnosDB:

   Refer to the deployment document: [Install CnosDB](../start/install.md)

3. Install MySQL

   Reference network: [MySQL 5.6] (https://www.mysql.com/cn/downloads/)

#### 3) Configuration Check & Modify

```
CnosDB and MySQL only modified the storage folder paths for Data, Wal, and Meta, while keeping the rest as default. This will not be repeated here.
```

#### 4. Dataset preparation

1. Rows: 410522759
2. Format: CSV
3. Size: 39G

Test data schema

| Field                                                              | MySQL Type                      | CnosDB Type |
| ------------------------------------------------------------------ | ------------------------------- | ----------- |
| time                                                               | BIGINT                          | TIMESTAMP   |
| device_version                                | VARCHAR(255) | TAG         |
| driver                                                             | VARCHAR(255) | TAG         |
| fleet                                                              | VARCHAR(255) | TAG         |
| model                                                              | VARCHAR(255) | TAG         |
| elevation                                                          | VARCHAR(255) | TAG         |
| fuel_capacity                                 | DOUBLE                          | DOUBLE      |
| fuel_consumption                              | DOUBLE                          | DOUBLE      |
| grade                                                              | DOUBLE                          | DOUBLE      |
| heading                                                            | DOUBLE                          | DOUBLE      |
| latitude                                                           | DOUBLE                          | DOUBLE      |
| load_capacity                                 | DOUBLE                          | DOUBLE      |
| longitude                                                          | DOUBLE                          | DOUBLE      |
| nominal_fuel_consumption | DOUBLE                          | DOUBLE      |
| velocity                                                           | DOUBLE                          | DOUBLE      |

### Test medium term

1. Write data to CnosDB:

```shell
COPY INTO readings FROM '/data/data/csv/cnodb-iot-seed-123-scale-100-2017_csv/cnodb-iot-seed-123-scale-100-2017_readings_no_blank.csv' 
FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
```

2. Write data to MySQL:

```shell
load data local infile '/data/data/csv/cnodb-iot-seed-123-scale-100-2017_csv/cnodb-iot-seed-123-scale-100-2017_readings_no_blank.csv' 
into table readings character set utf8  fields terminated by ',' lines terminated by '\n' ignore 1 lines;
```

### Write Test Results

|            | CnosDB 2.4 | MySQL 5.6 |
| ---------- | -------------------------- | ------------------------- |
| write time | 11 min 1 s                 | 1 hour 55 min 20 s        |

### Query Test Results

| SQL                                                                                                                                                                      | CnosDB 2.4 | MySQL 5.6       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ------------------------------- |
| select count(\*) from readings                                                                                                                        | 1 min 41 sec               | 4 min 41 sec                    |
| select count(\*) from readings where latitude = 100                                                                                                   | 3.7 sec    | 3 min 55.75 sec |
| select count(\*), max(latitude), min(latitude), avg(latitude) from readings                  | 3.5 sec    | 5 min 46 sec                    |
| sselect count(\*), max(latitude), min(latitude), avg(latitude) from readings group by driver | 9.4 sec    | 7 min 3.47 sec  |

### Compression Ratio Test Result

|                                          | CnosDB 2.4 | MySQL 5.6 |
| ---------------------------------------- | -------------------------- | ------------------------- |
| Original Data                            | 39G                        | 39G                       |
| Data written to disk after being written | 15G                        | 62G                       |
| Compression ratio                        | 2.6        | 0.6       |