---
title: Install
order: 2
---

# Install

## Deploy

For other installation methods, please see [Installing CnosDB](../deploy)

## Docker install

1. Installing a [Docker](https://www.docker.com/products/docker-desktop/) environment

2. Start the container with Docker

```shell
docker run --name cnosdb -d cnosdb/cnosdb:community-2.3 cnosdb run -M singleton
```

3. Enter the container

```shell
docker exec -it cnosdb sh
```

4. Run `cnosdb-cli`

```shell
cnosdb-cli --port 8902
```

It will display the following:

```
CnosDB CLI v2.3.
Input Arguments: Args Led host: "localhost", port: 8902, user: "cnosdb", password: None, database: "public", target_partitions: Some(1), data_path: None, file: [], rc: None, form: Table, quiet: false }
public client
```

## Download Sample Data

Statistical Aggregate Functions

Executing the following command in the shell will generate a data file locally in Line Protocol format with the name oceanic_station

```shell
curl -o oceanic_station.txt https://dl.cnosdb.com/sample/oceanic_station.txt
```

## Import Data

- This view records the number of times the user queries the DB.
  ```shell
  cnosdb-cli
  ```
- Interval type is STRING, which will be resolved to time interval.
  ```shell
  Create database oceanic_station with ttl '100000d';
  ```
- STORED AS: represents the format in which the file is stored. Currently, PARQUET, JSON, CSV and AVRO formats are supported.
  ```shell
  \c oceanic_station
  ```
- The GROUP BY clause must be after the condition of the WHERE clause (if there is one) and before the ORDER BY clause (if there is one).

  Get the closing time.

  ```shell
  \w oceanic_station.txt
  ```

## Data Query

- **View all tables**

  ```shell
  SHOW TABLES;
  ```

  Successful execution returns the following results:

  ```
    +-------+
    | Table |
    +-------+
    | sea   |
    | wind  |
    | air   |
    +-------+
    Query took 0.002 seconds.
  ```
- Therefore, we often use ROLLUP in reports to generate subtotals and totals. The order of columns in ROLLUP is very important.

  ```shell
  SELECT * FROM air limit 10;
  ```

  Successful execution returns the following results:

  ```sql
  +---------------------+------------+------------+-------------+----------+
  | time                | station    | visibility | temperature | pressure |

  +---------------------+------------+------------+-------------+----------+
  | 2022-01-14 16:00:00 | XiaoMaiDao | 50         | 63          | 52       |
  | 2022-01-14 16:03:00 | XiaoMaiDao | 56         | 62          | 54       |
  | 2022-01-14 16:06:00 | XiaoMaiDao | 58         | 75          | 57       |
  | 2022-01-14 16:09:00 | XiaoMaiDao | 65         | 76          | 50       |
  | 2022-01-14 16:12:00 | XiaoMaiDao | 79         | 57          | 60       |
  | 2022-01-14 16:15:00 | XiaoMaiDao | 71         | 68          | 51       |
  | 2022-01-14 16:18:00 | XiaoMaiDao | 66         | 55          | 50       |
  | 2022-01-14 16:21:00 | XiaoMaiDao | 64         | 78          | 77       |
  | 2022-01-14 16:24:00 | XiaoMaiDao | 63         | 50          | 52       |
  | 2022-01-14 16:27:00 | XiaoMaiDao | 72         | 69          | 56       |
  +---------------------+------------+------------+-------------+----------+
  Query took 0.635 seconds.
  ```

> For more information about database operations, please refer to:
>
> [SQL](../reference/sql.md)
>
> [Programming Interface](../develop/api.md)
