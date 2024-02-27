---
title: Install
order: 2
---

# Install

## Deployment

For other installations, please see[安装CnosDB](../employ)

## Docker Installation

1. Install [Docker](https://www.docker.com/products/docker-desktop/) environment

2. Launch container using Docker

```shell
  docker run --name cnosdb -p 8902:8902-d cnosdb/cnosdb:community-2.3 cnosdb run -M singleton
```

3. Enter Container

```shell
  docker exec -it cnosdb sh
```

4. Run `cnosdb-cli`

```shell
  cnosdb-cli -port 8902
```

Will show the following：

```
CnosDB CLI v2.3.
Input Arguments: Args Led host: "localhost", port: 8902, user: "cnosdb", password: None, database: "public", target_partitions: Some(1), data_path: None, file: [], rc: None, form: Table, quiet: false }
public client
```

## Download Sample Data

If in cnosdb-cli, type `\q` to exit

Executing the following command in shell will generate data files in the form of Line Protocol named `oceanic_station` locally.

```shell
curl -o oceanic_station.txt https://dl.cnosdb.com/sample/oceanic_station.txt
```

## Import Data

- **Launch CLI**
  ```shell
  cnosdb-cli
  ```
- **Create Database**
  ```shell
  Create database oceanic_station with ttl '100000d';
  ```
- **Switch to specified database**
  ```shell
  \c oceanic_station
  ```
- **Import Data**

  Execute the \w instruction,\w after the data file is an absolute path or work path relative to cnosdb-cli.

  ```shell
  \w oceanic_station.txt
  ```

## Data Query

- **View all tables**

  ```shell
  SHOW TABLES;
  ```

  Execute successfully returned the following results：

  ```
  +--+
  | Table |
  +---+
  |
  | wind |
  | air |
  +--+
  Query took 0. 02 seconds.
  ```
- **Query data**

  ```shell
  SELECT * FROM air limit 10;
  ```

  Execute successfully returned the following results：

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

> See： for more about database operations
>
> [SQL](../reference/sql.md)
>
> [编程接口](../develop/api.md)
