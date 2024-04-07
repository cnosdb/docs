---
sidebar_position: 3
---

# 数据定义语言

用来定义数据库结构和组织。

## `CREATE DATABASE`

```sql
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options];

db_options:
    db_option ...

db_option: {
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```

| 选项               | 描述                                                                     |
| ---------------- | ---------------------------------------------------------------------- |
| `TTL`            | 数据过期时间，默认无限保存，支持的单位：`d`、`h`、`m`。示例：`TTL 10d`、`TTL 180m`。               |
| `SHARD`          | 表示分片个数，默认：`1`。                                                         |
| `VNODE_DURATION` | 数据在 SHARD 中的时间窗口长度，默认 365 天，支持的单位：`d`、`h`、`m`。示例：`TTL 10d`、`TTL 180m`。 |
| `REPLICA`        | 数据在集群中的复本数，默认为 `1`。（备注：副本数必须小于且等于集群中 `tskv` 节点的数据）。                    |
| `PRECISION`      | 数据库的时间戳精度，默认为 `ns`。支持的单位：`ms`、`us`、`ns`                                |

<details>
  <summary>查看 <code>CREATE DATABASE</code> 示例</summary>

**创建一个数据库，且保留策略为无限长。**

```sql
CREATE DATABASE oceanic_station;
```

**创建一个数据库，设置过期时间为 180 天，且每个时间窗口为 7 天。**

> 数据过期策略请参考 [分片规则](../concept_design/arch#数据管理)

```sql
CREATE DATABASE oceanic_station WITH TTL '180d' SHARD 1 VNODE_DURATION '7d';
```

**设置 Vnode 复制因子数量。**

```sql
CREATE DATABASE oceanic_station WITH SHARD 2;
```

**设置时间戳精度。**

> 时间精度只允许在创建数据库时指定，且后续不能更改。

```sql
CREATE DATABASE oceanic_station WITH PRECISION 'ms';
```

</details>

## `CREATE TABLE`

`CREATE TABLE` 使用 CnosDB TSKV 存储数据，支持部分 SQL 数据类型进行存储，如下：

- `BIGINT`

- `BIGINT UNSIGNED`

- `BOOLEAN`

- `TIMESTAMP`

- `STRING`

- `DOUBLE`

此外，CnosDB 表的结构需要遵循一定的规范，请参考 [基础概念](../concept_design/basic_concent)。

```sql
CREATE TABLE [IF NOT EXISTS] tb_name
(field_definition [, field_definition ] ... [, TAGS(tg_name [, tg_name] ...)]);

field_definition:
    column_name data_type [field_codec_type]
    
field_codec_type:
    CODEC(code_type)
```

<details>
  <summary>查看 <code>CREATE TABLE</code> 示例</summary>

**创建一个表。**

创建表时 `time` 字段可以省略。

```sql
CREATE TABLE air(
	visibility DOUBLE,
	temperature DOUBLE,
	pressure DOUBLE,
	TAGS(station)
);
```

**创建一个表，并指定压缩算法。**

指定 `visibility` 的压缩算法为 `QUANTILE`，`temperature` 不压缩，`pressure` 使用默认压缩算法。

不同的数据类型可以指定不同的压缩算法，支持列表请参考 [压缩算法](../concept_design/compress)

```sql
CREATE TABLE air(
	visibility DOUBLE CODEC(QUANTILE),
	temperature DOUBLE CODEC(NULL),
	pressure DOUBLE,
	TAGS(station)
);
```

如果需要对创建之后的表进行其他操作，请参考 [`INSERT`](dml#insert)、 [`ALTER TABLE`](#alter-table)、[`DROP TABLE`](#drop-table)。

</details>

## `CREATE EXTERNAL TABLE`

> 外部表是只读的，不能执行 DML 操作。

```sql
-- Column definitions can not be specified for PARQUET files

CREATE EXTERNAL TABLE [ IF NOT EXISTS ] tb_name 
    ( field_definition [, field_definition] ... ) tb_option;

field_definition:
    column_name data_type [ NULL ]

tb_option: {
      STORED AS { PARQUET | NDJSON | CSV | AVRO }
    | [ WITH HEADER ROW ]
    | [ DELIMITER 'a_single_char' ]
    | [ PARTITIONED BY ( column_name, [, ... ] ) ]
    | LOCATION '<file>'
}
```

| 选项                | 描述                                               |
| ----------------- | ------------------------------------------------ |
| `STORED AS`       | 指定文件的格式，支持  `PARQUET`、`NDJSON`、`CSV`、`AVRO`。     |
| `WITH HEADER ROW` | 仅在 `STORED AS CSV` 时生效，用于指定 `CSV` 文件中的 `Header`。 |
| `DELIMITER`       | 仅在 `STORED AS CSV` 时生效，用于指定 `CSV` 文件中的分隔符。       |
| `PARTITIONED BY`  | 创建表时指定的列来进行分区。                                   |
| `LOCATION`        | 关联的文件的位置，支持目录。                                   |

<details>
  <summary>查看 <code>CREATE EXTERNAL TABLE</code> 示例</summary>

**创建一个外部表，并指定一个本地 `CSV` 文件。**

创建外部表可以使用所有 [数据类型](data_type) （不包括 `INTERVAL` 等一些特殊类型）中的类型，且不受 CnosDB 固有模型的约束。

```sql
CREATE EXTERNAL TABLE cpu (
     cpu_hz  DECIMAL(10,6) NOT NULL,
     temp  DOUBLE NOT NULL,
     version_num  BIGINT NOT NULL,
     is_old  BOOLEAN NOT NULL,
     weight  DECIMAL(12,7) NOT NULL
)
STORED AS CSV
WITH HEADER ROW
LOCATION 'tests/data/csv/cpu.csv';
```

</details>

## `CREATE STREAM TABLE `

:::tip
需要一个 `source` 表，STREAM 表不支持 `ALTER`
:::

```sql
CREATE STREAM TABLE [IF NOT EXISTS] table_name(field_definition [, field_definition] ...)
    WITH (db = 'db_name', table = 'table_name', event_time_column = 'time_column')
    engine = tskv;

field_definition: 
    column_name data_type
```

**相关语法：**[`DROP TABLE`](#drop-table)

## `ALTER DATABASE`

> `ALTER DATABASE` 可以修改数据库中设定的所有参数（不包含 `PRECISION`），你可以通过 [DESCRIBE DATABASE](dql#describe) 命令查询当前数据库参数设置。

```sql
ALTER DATABASE db_name [alter_db_options]

alter_db_options:
    SET db_option

db_option: {
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
}
```

<details>
  <summary>查看 <code>ALTER DATABASE</code> 示例</summary>

**修改 `TTL`。**

```sql
ALTER DATABASE oceanic_station SET TTL '30d';
```

\*\*修改 `VNODE_DURATION` \*\*。

修改 `VNODE_DURATION` 不会对已有的 Vnode 造成影响。

```
ALTER DATABASE oceanic_station SET VNODE_DURATION '7d';
```

</details>

## `ALTER TABLE`

:::tip

支持修改/删除 `TAG` 和 `FIELD` 类型的列，可以通过 [`DESCRIBE TABLE`](dql.md#describe) 语法查询列类型。

不支持修改列名 `time`。

避免在执行重命名 `TAG` 类型列的时候执行写入操作，可能会引起 `series` 冲突。

:::

```sql
ALTER TABLE tb_name alter_table_option;

alter_table_option: {
      ADD TAG col_name
    | ADD FIELD col_name [data_type] [CODEC(code_type)]
    | ALTER col_name SET CODEC(code_type)
    | DROP col_name
    | RENAME COLUMN col_name TO new_col_name
}
```

<details>
  <summary>查看 <code>ALTER TABLE</code> 示例</summary>

**添加一个 `TAG` 类型的列。**

```sql
ALTER TABLE air ADD TAG height;
```

**添加一个 `FIELD` 类型的列，并指定压缩算法。**

```sql
ALTER TABLE air ADD FIELD humidity DOUBLE CODEC(DEFAULT);
```

**修改 `humidity` 的压缩算法为 `QUANTILE`。**

```sql
ALTER TABLE air ALTER humidity SET CODEC(QUANTILE);
```

**删除 `humidity`。**

```sql
ALTER TABLE air DROP humidity;
```

**重命名列名。**

```sql
ALTER TABLE air RENAME COLUMN height to height_v2;
```

</details>

## `DROP DATABASE`

```sql
DROP DATABASE [IF EXISTS] db_name [AFTER <duration>];
```

| 选项      | 描述                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `AFTER` | 设置延迟删除时间，当设置 `AFTER` 时，数据库将进入禁用阶段，直到持续时间结束，数据库会在磁盘上移除，在持续时间结束之前，可以通过 `RECOVER DATABASE` 语法进行恢复。默认单位为 `d`，支持`d`、`h`、`m` |

<details>
  <summary>查看 <code>DROP DATABASE</code> 示例</summary>

**删除数据库，且数据库会被立即删除。**

```sql
DROP DATABASE oceanic_station;
```

**删除数据库，并设置数据库在 3 天后被删除。**

```sql
DROP DATABASE oceanic_station AFTER '3';
```

**撤回删除数据库**

在数据库没有在被真正删除之前，即在 `AFTER` 持续时间结束之前，删除操作可以撤回。

```sql
RECOVER DATABASE oceanic_station;
```

</details>

## `DROP TABLE`

```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

<details>
  <summary>查看 <code>DROP TABLE</code> 示例</summary>

```sql
DROP TABLE air;
```

</details>
