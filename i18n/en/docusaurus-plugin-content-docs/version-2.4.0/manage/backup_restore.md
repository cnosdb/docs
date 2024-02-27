---
sidebar_position: 3
---

# Backup Restore

The CnosDB backup and restore tool is a command line tool for exporting, importing, and migrating CnosDB cluster data.This tool supports the backup of metadata and user data, as well as data migration between different clusters.

:::tip
数据导出后会产生多个文件：`meta_data.src`，`schema_data.src` 以及 数据文件。

The `meta_data.src`, `schema_data.src` file will be exported to the node running the `cnosdb-imexport` command.

Data files will be exported to the requested node, and vice versa.
:::

## Install

Make sure you have installed CnosDB backup and restore tools on your system.You can fetch the tool from official channels and install it according to the relevant documents.

## Command Summary

\`cnosdb-imexport <COMMAND>

### Parameter Description

| Name      | Description            |
| --------- | ---------------------- |
| `export`  | Full Export Data       |
| `Import`  | Full import data       |
| `migrate` | Migration data         |
| `help`    | Print help information |

## `export`

> Export metadata and user data

### Usage

```shell
cnosdb-imexport export [OPTIONS] --src <SRC> --path <PATH>
```

### Options

| Name                | Description                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| \`-s, --src <SRC>   | Connection information for (required) source cluster (Example：root:123456\@127.0.0.1:8902) |
| \`-p, --path <PATH> | (required) data storage path                                                                                  |
| \`-c, --conn <CONN> | (optional) cloud storage connection configuration                                                             |
| `-h, --help`        | Print help information                                                                                                           |

### Example

#### Backup data to local directory

```shell
cnosdb-imexport export --src <user>:<password>@<ip>:<port> --path file:///backup
```

## `Import`

> Import metadata and user data

### Usage

```shell
cnosdb-imex import import [OPTIONS] --path <PATH> --dst <DST>
```

### Options

| Name                | Description                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| \`-p, --path <PATH> | (required) data storage path                                                                                  |
| `-d, --dst <DST>`   | Connection information for (required) target cluster (Example：root:123456\@127.0.0.1:8902) |
| \`-c, --conn <CONN> | (optional) cloud storage connection configuration                                                             |
| `-h, --help`        | Print help information                                                                                                           |

### Example

#### Restore local data to the specified cluster

```shell
cnosdb-imex import import --path ./backup --dst <user>:<password>@<ip>:<port>
```

####

## `migrate`

> Migrate data between clusters

### Usage

```shell
cnosdb-imexport migrate [OPTIONS] --src <SRC> --dst <DST> --path <PATH>
```

### Options

| Name                | Description                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| \`s, --src <SRC>    | Connection information for (required) source cluster (Example：root:123456\@127.0.0.1:8902) |
| `-d, --dst <DST>`   | Connection information for (required) target cluster (Example：root:123456\@127.0.0.1:8902) |
| \`-p, --path <PATH> | (required) Data temporary directory                                                                           |
| \`-c, --conn <CONN> | (optional) cloud storage connection configuration                                                             |
| `-h, --help`        | Print help information                                                                                                           |

### Example

#### Migrate data to other clusters

```shell
cnosdb-imexport migrate --src <user>:<passowrd>@<ip>:<port> --dst <user>:<passowrd>@<ip>:<port> --path file:///staging
```

## Backup DDL statements

dump command

```shell
cnosdb-cli dump-dl [--tenant TENANT]
```

When a tenant is specified, only dump tenant will be associated with users, roles, databases, tables

restore command

```shell
cnosdb-cli [--error-stop] restore-dump-dl DUMP_FILE
```

When --error-stop specified, a recovery error will interrupt the recovery process

cnosdb-cli supports more parameters, reference to[文档](../reference/tools.md#Client command line program) in which arguments should be placed in dump-ddl and
restore-dump-dl front

## Example

dump

```shell
cnosdb-cli --host 127.0.0.1 --port 8902 dump-dl -tenant cnosdb > dump.sql
```

Restore

```shell
cnosdb-cli --host 127.0.0.1 --port 8902 restore-dump-dl dump.sql
```
