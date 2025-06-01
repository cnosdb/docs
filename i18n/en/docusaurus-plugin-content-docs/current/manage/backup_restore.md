---
sidebar_position: 3
---

# Backup and Restore

CnosDB 备份和还原工具是一个用于导出、导入 CnosDB 集群数据的命令行工具。该工具支持备份元数据和用户数据。

### Command Overview

`cnosdb-meta <COMMAND>`

#### Parameter Description

| Name       | Description            |
| ---------- | ---------------------- |
| `dump`     | Full export data       |
| `restore`  | Full import data       |
| `dump-sql` | 以sql导出指定cluster的数据     |
| `help`     | Print help information |

### `dump`

> Export metadata and user data

#### Usage

```shell
cnosdb-meta dump --bind <ADDR> --file <PATH>
```

#### Options

| Name            | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `--bind <ADDR>` | （必需）源集群的连接信息（示例：127.0.0.1:8902） |
| `--file <PATH>` | (Required) Data storage path                                                 |
| `--help`        | Print help information                                                                          |

#### Example

##### Backup data to local directory

```shell
cnosdb-meta dump --src <user>:<password>@<ip>:<port> --file ./backup
```

### `restore`

> Import metadata and user data

#### Usage

```shell
cnosdb-meta restore --bind <ADDR> --file <PATH>
```

#### Options

| Name            | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `--bind <ADDR>` | （必需）源集群的连接信息（示例：127.0.0.1:8902） |
| `--file <PATH>` | (Required) Data storage path                                                 |
| `--help`        | Print help information                                                                          |

#### Example

##### Restore data backed up locally to the specified cluster

```shell
cnosdb-meta restore --bind <ip>:<port> --file ./backup 
```

#####

### `dump-sql`

> 以sql形式导出指定cluster内的scheme数据

#### Usage

```shell
cnosdb-meta dump-sql --bind <ADDR> --cluster <NAME> --file <PATH>
```

#### Options

| Name               | Description                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `--bind <ADDR>`    | （必需）集群的连接信息（示例：127.0.0.1:8902） |
| `--cluster <NAME>` | （必需）集群的名称                                                                                      |
| `--file <PATH>`    | (Required) Data temporary storage directory                                 |
| `-h, --help`       | Print help information                                                                         |

#### Example

##### Migrate data to other clusters

```shell
cnosdb-meta dump-sql --bind <ip>:<port> --cluster cluster_xxx --file ./dump_sql
```
