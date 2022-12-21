---
title: 快速开始
icon: launch
order: 3
---

## 快速开始
下载和安装CnosDB请查看[安装CnosDB](install_cnosdb.md)
### 下载示例数据

    如果在 cnosdb-cli 中，请输入`\q`退出

    在shell中执行以下命令将在本地生成一个名称为oceanic_station的Line Protocol格式的数据文件

```shell
wget https://fastdl.cnosdb.com/cpizkpfk/oceanic_station.txt
```

### 导入数据
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
### 数据查询
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
> [SQL](query/sql.md)
>
> [编程接口](application/api.md)