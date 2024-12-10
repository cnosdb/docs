---
sidebar_position: 3
---

# 备份还原

CnosDB 备份和还原工具可用于导出、导入 CnosDB 集群数据的命令行工具。该工具支持备份元数据和用户数据。


### 安装

使用 cnosdb-meta 进行相关操作。你可以从官方渠道获取该工具并按照相关文档进行安装编译。

### 命令概要

`cnosdb-meta <COMMAND>`

#### 参数说明

| 名称        | 描述     |
|-----------|--------|
| `dump`  | 全量导出数据 |
| `dump-sql`  | 以Sql形式导出指定cluster数据 |
| `restore` | 恢复数据   |
| `help`    | 打印帮助信息 |

### `dump`

> 导出元数据和用户数据
>

#### 用法

```shell
cnosdb-meta dump --bind <ADDR> --file <PATH>
```

#### 选项

| 名称                  | 描述                                          |
|---------------------|---------------------------------------------|
| `--bind <ADDR>`   | （必需）源集群的地址（示例：127.0.0.1:8902） |
| `--file <PATH>` | （必需）数据存储路径   （示例：./dump_file）                               |
| `-h, --help`        | 打印帮助信息                                      |

#### 示例

##### 将数据备份至本地目录

```shell
cnosdb-meta dump --bind <ip>:<port> --file ./backup
```

### `restore`

> 导入元数据和用户数据

#### 用法

```shell
cnosdb-meta restore --bind <ADDR> --file <PATH>
```

#### 选项

| 名称                  | 描述                                           |
|---------------------|----------------------------------------------|
| `--bind <ADDR>`   | （必需）源集群的地址（示例：127.0.0.1:8902） |
| `--file <PATH>` | （必需）数据存储路径                                   |
| `-h, --help`        | 打印帮助信息                                       |

#### 示例

##### 将备份到本地的数据还原到指定集群

```shell
cnosdb-meta restore --bind <ip>:<port> --file ./backup
```


## `dump-sql`

```shell
cnosdb-meta dump-sql --bind <ADDR> --cluster <NAME> --file <PATH>
```
#### 选项

| 名称                  | 描述                                           |
|---------------------|----------------------------------------------|
| `--bind <ADDR>`   | （必需）源集群的地址（示例：127.0.0.1:8902） |
| `--cluster <NAME>`   | （必需）源集群的名字（示例：cluster_xxx） |
| `--file <PATH>` | （必需）数据存储路径                                   |
| `-h, --help`        | 打印帮助信息                                       |

#### 示例

##### 将备份到本地的数据还原到指定集群

```shell
cnosdb-meta dump-sql --bind <ip>:<port> --cluster <cluster_name> --file <path>
```

