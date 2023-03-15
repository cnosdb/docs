---
title: 安装
icon: launch
order: 2
---

# 安装

## 部署

其他安装方式请查看[安装CnosDB](../deploy/install_cnosdb.md)

## Docker安装

1. 安装 [Docker](https://www.docker.com/products/docker-desktop/) 环境

2. 使用 Docker 启动容器
```shell
docker run --name cnosdb -d  --env cpu=2 --env memory=4 -p 31007:31007 cnosdb/cnosdb:v2.0.1
```

3. 进入容器
```shell
docker exec -it cnosdb sh
```
4. 运行`cnosdb-cli`
```shell
cnosdb-cli
```
会显示如下
```
CnosDB CLI v2.0.0
Input arguments: Args { host: "0.0.0.0", port: 31007, user: "cnosdb", password: None, database: "public", target_partitions: Some(1), data_path: None, file: [], rc: None, format: Table, quiet: false }
public ❯
```

## 下载示例数据

    如果在 cnosdb-cli 中，请输入`\q`退出

    在shell中执行以下命令将在本地生成一个名称为oceanic_station的Line Protocol格式的数据文件

```shell
wget https://fastdl.cnosdb.com/cpizkpfk/oceanic_station.txt
```

## 导入数据
- 启动CLI
    ```shell
    cnosdb-cli
    ```
- 创建数据库
    ```shell
    create database oceanic_station;
    ```
- 切换到指定数据库
    ```shell
    \c oceanic_station
    ```
- 导入数据

  执行\w指令，\w后面为数据文件的绝对路径或相对cnosdb-cli的工作路径
    ```shell
    \w oceanic_station.txt
    ```
## 数据查询
- 查看所有表
    ```shell
    SHOW TABLES;
    ```
执行成功返回以下结果：

    +-------+
    | Table |
    +-------+
    | sea   |
    | wind  |
    | air   |
    +-------+
    Query took 0.002 seconds.
- 查询数据
    ```shell
    SELECT * FROM air limit 10;
    ```
执行成功返回以下结果：

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

> 有关更多关于数据库的操作请查看：
>
> [SQL](../reference/sql.md)
>
> [编程接口](../development/application.md)