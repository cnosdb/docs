---
sidebar_position: 3
---

# 备份还原

CnosDB 备份和还原工具是一个用于导出、导入 CnosDB 集群数据的命令行工具。该工具支持备份元数据和用户数据。


### 命令概要

`cnosdb-meta <COMMAND>`

#### 参数说明

| 名称        | 描述     |
|-----------|--------|
| `dump`  | 全量导出数据 |
| `restore`  | 全量导入数据 |
| `dump-sql` | 以sql导出指定cluster的数据   |
| `help`    | 打印帮助信息 |

### `dump`

> 导出元数据和用户数据


#### 用法

```shell
cnosdb-meta dump --bind <ADDR> --file <PATH>
```

#### 选项

| 名称                  | 描述                                          |
|---------------------|---------------------------------------------|
| `--bind <ADDR>`   | （必需）源集群的连接信息（示例：127.0.0.1:8902） |
| `--file <PATH>` | （必需）数据存储路径                                  |
| `--help`        | 打印帮助信息                                      |

#### 示例

##### 将数据备份至本地目录

```shell
cnosdb-meta dump --src <user>:<password>@<ip>:<port> --file ./backup
```

### `restore`

> 导入元数据和用户数据

#### 用法

```shell
cnosdb-meta restore --bind <ADDR> --file <PATH>
```

#### 选项

| 名称                  | 描述                                          |
|---------------------|---------------------------------------------|
| `--bind <ADDR>`   | （必需）源集群的连接信息（示例：127.0.0.1:8902） |
| `--file <PATH>` | （必需）数据存储路径                                  |
| `--help`        | 打印帮助信息                                      |

#### 示例

##### 将备份到本地的数据还原到指定集群

```shell
cnosdb-meta restore --bind <ip>:<port> --file ./backup 
```

#####  

### `dump-sql`

> 以sql形式导出指定cluster内的scheme数据

#### 用法

```shell
cnosdb-meta dump-sql --bind <ADDR> --cluster <NAME> --file <PATH>
```

#### 选项

| 名称                  | 描述                                           |
|---------------------|----------------------------------------------|
| `--bind <ADDR>`    | （必需）集群的连接信息（示例：127.0.0.1:8902）  |
| `--cluster <NAME>`   | （必需）集群的名称 |
| `--file <PATH>` | （必需）数据暂存目录                                   |
| `-h, --help`        | 打印帮助信息                                       |

#### 示例

##### 将数据迁移至其他集群

```shell
cnosdb-meta dump-sql --bind <ip>:<port> --cluster cluster_xxx --file ./dump_sql
```

