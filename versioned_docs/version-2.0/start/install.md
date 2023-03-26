---
sidebar_position: 1
---

# Install

CnosDB is a time-series database dedicated to the collection, storage and processing of sequential data. It is a non-relational database, based on column storage, and supports high concurrency, high availability, high reliability, high scalability, high performance, low cost data storage and query.

CnosDB was designed to solve the storage and query problems of massive temporal data. The main application scenarios of time series data include operation and maintenance, IOT, and finance fields, covering online business and batch business in terms of business characteristics. In other words, time series database actually covers two types of business scenarios: analytical (OLAP) and business (OLTP). In theory, sequential databases should belong to a subcategory of OLAP, but at the same time, sequential databases are often divided into a separate category because of their different read and write modes.

In this chapter, you will be shown how to use CnosDB, including how to install, start, connect, create a database, create a table, insert data, query data and other basic operations, to help you have a preliminary understanding of the use of timing databases.

## **Deploy**

For other installation methods, please see [Installing CnosDB](https://www.docker.com/products/docker-desktop/).

## **Docker install**

1. Installing a [Docker](https://www.docker.com/products/docker-desktop/) environment.

2. Start the container with Docker
    ```shell
    docker run --name cnosdb -d  --env cpu=2 --env memory=4 -p 31007:31007 cnosdb/cnosdb:v2.0.1
    ```

3. Enter the container
    ```shell
    docker exec -it cnosdb sh
    ```
4. Run `cnosdb-cli`
    ```shell
    cnosdb-cli
    ```
It will display the following:

```
CnosDB CLI v2.0.0
Input arguments: Args { host: "0.0.0.0", port: 31007, user: "cnosdb", password: None, database: "public", target_partitions: Some(1), data_path: None, file: [], rc: None, format: Table, quiet: false }
public ❯
```

## **Download Sample Data**

If in cnosdb-cli, type `\q` to exit.

Executing the following command in the shell will generate a data file locally in Line Protocol format with the name oceanic_station.

```shell
wget https://fastdl.cnosdb.com/cpizkpfk/oceanic_station.txt
```

## **Import Data**

- **Start the CLI**
    ```shell
    cnosdb-cli
    ```
- **Create the database**
- 
    ```shell
    create database oceanic_station;
    ```
- **Switch to the specified database**

    ```shell
    \c oceanic_station
    ```
- **Import data**

    Execute the \w command, followed by the absolute path of the data file or the working path relative to cnosdb-cli.
- 
    ```shell
    \w oceanic_station.txt
    ```

## **Data Query**

- **View all tables**
    ```shell
    SHOW TABLES;
    ```
    Successful execution returns the following results:
    
        +-------+
        | Table |
        +-------+
        | sea   |
        | wind  |
        | air   |
        +-------+
        Query took 0.002 seconds.


- **Query data**
    ```shell
    SELECT * FROM air limit 10;
    ```
    Successful execution returned the following results:
    
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


> For more information about database operations, please refer to：
>
> [SQL](../reference/sql)
>
> [Programming Interface](../develop/api) 