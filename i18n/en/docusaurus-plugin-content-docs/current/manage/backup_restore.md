---
sidebar_position: 3
---

# Backup and Restore

The CnosDB backup and restore tool is a command line tool for exporting, importing, and migrating CnosDB cluster data.This tool supports the backup of metadata and user data, as well as data migration between clusters.

:::tip

Data export produces more than one file: `meta_data.src`, `schema_data.src` and data files.

The `meta_data.src`, `schema_data.src` file will be exported to the node running the `cnosdb-imexport` command.

The data file is exported to the requested node and vice versa.

:::

### Install

Make sure you have installed CnosDB backup and restore tools on your system.You can get this tool from official channels and install it according to the relevant documents.

### Command Overview

`cnosdb-imexport <COMMAND>`

#### Parameter Description

| Name      | Description            |
| --------- | ---------------------- |
| `export`  | Full export data       |
| `import`  | Full import data       |
| `migrate` | Migrating data         |
| `help`    | Print help information |

### `export`

> Export metadata and user data

#### Usage

```shell
cnosdb-imexport export [OPTIONS] --src <SRC> --path <PATH>
```

#### Options

| Name                | Description                                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-s, --src <SRC>`   | (Required) Connection information of the source cluster (example: root:123456@127.0.0.1:8902) |
| `-p, --path <PATH>` | (Required) Data storage path                                                                                                                                                                                                  |
| `-c, --conn <CONN>` | (Optional) Connection configuration for cloud storage                                                                                                                                                                         |
| `-h, --help`        | Print help information                                                                                                                                                                                                                           |

#### Example

##### Backup data to local directory

```shell
cnosdb-imexport export --src <user>:<password>@<ip>:<port> --path ./backup
```

### `import`

> Import metadata and user data

#### Usage

```shell
cnosdb-imexport import [OPTIONS] --path <PATH> --dst <DST>
```

#### Options

| Name                | Description                                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-p, --path <PATH>` | (Required) Data storage path                                                                                                                                                                                                  |
| `-d, --dst <DST>`   | (Required) Connection information of the source cluster (example: root:123456@127.0.0.1:8902) |
| `-c, --conn <CONN>` | (Optional) Connection configuration for cloud storage                                                                                                                                                                         |
| `-h, --help`        | Print help information                                                                                                                                                                                                                           |

#### Example

##### Restore data backed up locally to the specified cluster

```shell
cnosdb-imexport import  --path ./backup --dst <user>:<password>@<ip>:<port>
```

#####

### `migrate`

> Migrate data between clusters

#### Usage

```shell
cnosdb-imexport migrate [OPTIONS] --src <SRC> --dst <DST> --path <PATH>
```

#### Options

| Name                | Description                                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `s, --src <SRC>`    | (Required) Connection information of the source cluster (example: root:123456@127.0.0.1:8902) |
| `-d, --dst <DST>`   | (Required) Connection information of the source cluster (example: root:123456@127.0.0.1:8902) |
| `-p, --path <PATH>` | (Required) Data temporary storage directory                                                                                                                                                                                   |
| `-c, --conn <CONN>` | (Optional) Connection configuration for cloud storage                                                                                                                                                                         |
| `-h, --help`        | Print help information                                                                                                                                                                                                                           |

#### Example

##### Migrate data to other clusters

```shell
cnosdb-imexport migrate --src <user>:<passowrd>@<ip>:<port> --dst <user>:<passowrd>@<ip>:<port> --path ./staging
```

## Backup DDL statements

dump command

```shell
cnosdb-cli dump-ddl [--tenant TENANT]
```

When a tenant is specified, only users, roles, databases, and tables related to the tenant will be dumped.

restore command

```shell
cnosdb-cli [--error-stop] restore-dump-ddl DUMP_FILE
```

When --error-stop is specified, recovery will be interrupted in case of errors during recovery process

cnosdb-cli supports more parameters, the parameters can be referred to in the [documentation](../reference/tools.md#client-command-line-program), where the parameters should be placed before dump-ddl and restore-dump-ddl

## Example

dump

```shell
cnosdb-cli --host 127.0.0.1 --port 8902 dump-ddl --tenant cnosdb > dump.sql
```

restore

```shell
cnosdb-cli --host 127.0.0.1 --port 8902 restore-dump-ddl dump.sql
```