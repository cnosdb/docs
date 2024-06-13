---
sidebar_position: 2
---

# CnosDB vs MySQL

## CnosDB 2.4 vs MySQL 5.6

在[CnosDB 2.4](https://github.com/cnosdb/cnosdb) 和 [MySQL 5.6](https://github.com/mysql/mysql-server) 之间做了写入、查询和压缩比性能测试的对比，下面是测试结论和测试细节信息。

### Conclusion

CnosDB is better than MySQL for writing, query and compression

### 测试前期

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
 CnosDB和MySQL均只修改了Data、Wal、Meta的存储文件夹路径，其余均保持默认，此处不做赘述。
```

#### 4. Dataset preparation

1. 数据集行数：410522759
2. 数据集文件格式：csv
3. 数据集大小：39G

测试数据schema

| Field                                                              | MySQL类型                         | CnosDB类型  |
| ------------------------------------------------------------------ | ------------------------------- | --------- |
| time                                                               | BIGINT                          | TIMESTAMP |
| device_version                                | VARCHAR(255) | TAG       |
| driver                                                             | VARCHAR(255) | TAG       |
| fleet                                                              | VARCHAR(255) | TAG       |
| model                                                              | VARCHAR(255) | TAG       |
| elevation                                                          | VARCHAR(255) | TAG       |
| fuel_capacity                                 | DOUBLE                          | DOUBLE    |
| fuel_consumption                              | DOUBLE                          | DOUBLE    |
| grade                                                              | DOUBLE                          | DOUBLE    |
| heading                                                            | DOUBLE                          | DOUBLE    |
| latitude                                                           | DOUBLE                          | DOUBLE    |
| load_capacity                                 | DOUBLE                          | DOUBLE    |
| longitude                                                          | DOUBLE                          | DOUBLE    |
| nominal_fuel_consumption | DOUBLE                          | DOUBLE    |
| velocity                                                           | DOUBLE                          | DOUBLE    |

### Test medium term

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

### 写入测试结果

|            | CnosDB 2.4 | MySQL 5.6 |
| ---------- | -------------------------- | ------------------------- |
| write time | 11 min 1 s                 | 1 hour 55 min 20 s        |

### 查询测试结果

| SQL                                                                                                                                                                      | CnosDB 2.4 | MySQL 5.6       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ------------------------------- |
| select count(\*) from readings                                                                                                                        | 1 min 41 sec               | 4 min 41 sec                    |
| select count(\*) from readings where latitude = 100                                                                                                   | 3.7 sec    | 3 min 55.75 sec |
| select count(\*), max(latitude), min(latitude), avg(latitude) from readings                  | 3.5 sec    | 5 min 46 sec                    |
| sselect count(\*), max(latitude), min(latitude), avg(latitude) from readings group by driver | 9.4 sec    | 7 min 3.47 sec  |

### 压缩比测试结果

|         | CnosDB 2.4 | MySQL 5.6 |
| ------- | -------------------------- | ------------------------- |
| 原始数据    | 39G                        | 39G                       |
| 写入后落盘数据 | 15G                        | 62G                       |
| 压缩比     | 2.6        | 0.6       |
