---
sidebar_position: 3
---

# 备份还原

CnosDB 备份和还原工具是一个用于导出、导入和迁移 CnosDB 集群数据的命令行工具。该工具支持备份元数据和用户数据，以及在不同集群之间进行数据迁移。

::: tip
数据导出后会产生多个文件：`meta_data.src`，`schema_data.src` 以及 数据文件。

`meta_data.src`，`schema_data.src` 文件会导出到 `cnosdb-imexport` 命令运行的节点。

数据文件会导出到被请求的节点上，反之亦然。

:::

### 安装

确保你已经在系统上安装了CnosDB备份和还原工具。你可以从官方渠道获取该工具并按照相关文档进行安装。

### 命令概要

`cnosdb-imexport <COMMAND>`

#### 参数说明

| 名称        | 描述     |
|-----------|--------|
| `export`  | 全量导出数据 |
| `import`  | 全量导入数据 |
| `migrate` | 迁移数据   |
| `help`    | 打印帮助信息 |

### `export`

> 导出元数据和用户数据
>

#### 用法

```shell
cnosdb-imexport export [OPTIONS] --src <SRC> --path <PATH>
```

#### 选项

| 名称                  | 描述                                          |
|---------------------|---------------------------------------------|
| `-s, --src <SRC>`   | （必需）源集群的连接信息（示例：root:123456@127.0.0.1:8902） |
| `-p, --path <PATH>` | （必需）数据存储路径                                  |
| `-c, --conn <CONN>` | （可选）云存储的连接配置                                |
| `-h, --help`        | 打印帮助信息                                      |

#### 示例

##### 将数据备份至本地目录

```shell
cnosdb-imexport export --src <user>:<password>@<ip>:<port> --path ./backup
```

### `import`

> 导入元数据和用户数据

#### 用法

```shell
cnosdb-imexport import [OPTIONS] --path <PATH> --dst <DST>
```

#### 选项

| 名称                  | 描述                                           |
|---------------------|----------------------------------------------|
| `-p, --path <PATH>` | （必需）数据存储路径                                   |
| `-d, --dst <DST>`   | （必需）目标集群的连接信息（示例：root:123456@127.0.0.1:8902） |
| `-c, --conn <CONN>` | （可选）云存储的连接配置                                 |
| `-h, --help`        | 打印帮助信息                                       |

#### 示例

##### 将备份到本地的数据还原到指定集群

```shell
cnosdb-imexport import  --path ./backup --dst <user>:<password>@<ip>:<port>
```

#####  

### `migrate`

> 在集群之间迁移数据

#### 用法

```shell
cnosdb-imexport migrate [OPTIONS] --src <SRC> --dst <DST> --path <PATH>
```

#### 选项

| 名称                  | 描述                                           |
|---------------------|----------------------------------------------|
| `s, --src <SRC>`    | （必需）源集群的连接信息（示例：root:123456@127.0.0.1:8902）  |
| `-d, --dst <DST>`   | （必需）目标集群的连接信息（示例：root:123456@127.0.0.1:8902） |
| `-p, --path <PATH>` | （必需）数据暂存目录                                   |
| `-c, --conn <CONN>` | （可选）云存储的连接配置                                 |
| `-h, --help`        | 打印帮助信息                                       |

#### 示例

##### 将数据迁移至其他集群

```shell
cnosdb-imexport migrate --src <user>:<passowrd>@<ip>:<port> --dst <user>:<passowrd>@<ip>:<port> --path ./staging
```

## 备份 DDL 语句

dump 命令

```shell
cnosdb-cli dump-ddl [--tenant TENANT]
```

当指定 tenant 时，只会dump tenant相关的用户，角色，数据库，表

restore 命令

```shell
cnosdb-cli [--error-stop] restore-dump-ddl DUMP_FILE
```

当指定 --error-stop 时，恢复中出错会中断恢复过程

cnosdb-cli 支持更多参数，参数可参考[文档](../reference/tools.md#客户端命令行程序)，其中的参数应该放在 dump-ddl 和
restore-dump-ddl 前面

## 示例

dump

```shell
cnosdb-cli --host 127.0.0.1 --port 8902 dump-ddl --tenant cnosdb > dump.sql
```

restore

```shell
cnosdb-cli --host 127.0.0.1 --port 8902 restore-dump-ddl dump.sql
```
