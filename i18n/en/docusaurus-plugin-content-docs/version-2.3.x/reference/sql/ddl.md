---
sidebar_position: 3
---

# DDL

Used to define the structure and organization of the database.

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

| Options          | Description                                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TTL`            | Data expiration time, default unlimited storage, supported units: `d`, `h`, `m`.Example: `TTL 10d`, `TTL 180m`.                                                          |
| `SHARD`          | Indicates the number of shards, default: `1`.                                                                                                                                                            |
| `VNODE_DURATION` | The time window length of the data in SHARD, default 365 days, supported units: `d`, `h`, `m`.Example: `TTL 10d`, `TTL 180m`.                                            |
| `REPLICA`        | The number of replicas of the data in the cluster, default is `1`.(Note: The number of copies must be less than or equal to the data nodes of `tskv` in the cluster). |
| `PRECISION`      | The timestamp precision of the database, default is `ns`.Supported units: `ms`, `us`, `ns`                                                                                                               |

<details>
  <summary>View the <code>CREATE DATABASE</code> example</summary>

**Create a database, and retain the policy as unlimited length.**

```sql
CREATE DATABASE oceanic_station;
```

**Create a database, set the expiration time to 180 days, and each time window to 7 days.**

> For data expiration policy, please refer to [Sharding Rules](../concept_design/arch#data_management)

```sql
CREATE DATABASE oceanic_station WITH TTL '180d' SHARD 1 VNODE_DURATION '7d';
```

**Set the Vnode replication factor quantity.**

```sql
CREATE DATABASE oceanic_station WITH SHARD 2;
```

**Set the timestamp precision.**

> The time precision can only be specified when creating the database and cannot be changed afterwards.

```sql
CREATE DATABASE oceanic_station WITH PRECISION 'ms';
```

</details>

## `CREATE TABLE`

`CREATE TABLE` uses CnosDB TSKV to store data, supporting storage of some SQL data types as follows:

- `BIGINT`

- `BIGINT UNSIGNED`

- `BOOLEAN`

- `TIMESTAMP`

- `STRING`

- `DOUBLE`

In addition, the structure of the CnosDB table needs to follow certain specifications, please refer to [Basic Concepts](../concept_design/basic_concent).

```sql
CREATE TABLE [IF NOT EXISTS] tb_name
(field_definition [, field_definition ] ... [, TAGS(tg_name [, tg_name] ...)]);

field_definition:
    column_name data_type [field_codec_type]
    
field_codec_type:
    CODEC(code_type)
```

<details>
  <summary>View the <code>CREATE TABLE</code> example</summary>

**Create a table.**

The `time` field can be omitted when creating a table.

```sql
CREATE TABLE air(
	visibility DOUBLE,
	temperature DOUBLE,
	pressure DOUBLE,
	TAGS(station)
);
```

**Create a table and specify the compression algorithm.**

Specify the compression algorithm of `visibility` as `QUANTILE`, do not compress `temperature`, and use the default compression algorithm for `pressure`.

Different data types can specify different compression algorithms, for supported list please refer to [Compression Algorithm](../concept_design/compress).

```sql
CREATE TABLE air(
	visibility DOUBLE CODEC(QUANTILE),
	temperature DOUBLE CODEC(NULL),
	pressure DOUBLE,
	TAGS(station)
);
```

If you need to perform other operations on the table created, please refer to [`INSERT`](dml#insert), [`ALTER TABLE`](#alter-table), [`DROP TABLE`](#drop-table).

</details>

## `CREATE EXTERNAL TABLE`

> The external table is read-only and cannot perform DML operations.

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

| Options           | Description                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `STORED AS`       | Specify the format of the file, supporting `PARQUET`, `NDJSON`, `CSV`, `AVRO`.        |
| `WITH HEADER ROW` | Only effective when `STORED AS CSV`, used to specify the `Header` in the `CSV` file.  |
| `DELIMITER`       | Only effective when `STORED AS CSV`, used to specify the delimiter in the `CSV` file. |
| `PARTITIONED BY`  | Partitioning by the columns specified when creating the table.                        |
| `LOCATION`        | Location of the associated file, supports directories.                                |

<details>
  <summary>View the <code>CREATE EXTERNAL TABLE</code> example</summary>

**Create an external table and specify a local `CSV` file.**

External tables can use all [data types](data_type) (excluding `INTERVAL` and some other special types) and are not constrained by the CnosDB native model.

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
Need a `source` table, STREAM table does not support `ALTER`
:::

```sql
CREATE STREAM TABLE [IF NOT EXISTS] table_name(field_definition [, field_definition] ...)
    WITH (db = 'db_name', table = 'table_name', event_time_column = 'time_column')
    engine = tskv;

field_definition: 
    column_name data_type
```

**Syntax:**[`DROP TABLE`](#drop-table)

## `ALTER DATABASE`

> `ALTER DATABASE` can modify all parameters set in the database (excluding `PRECISION`), you can query the current database parameter settings using the [DESCRIBE DATABASE](dql#describe) command.

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
  <summary>View the <code>ALTER DATABASE</code> example</summary>

**Modify `TTL`.**

```sql
ALTER DATABASE oceanic_station SET TTL '30d';
```

\*\*Modify `VNODE_DURATION` \*\*.

Modifying `VNODE_DURATION` will not affect existing Vnodes.

```
ALTER DATABASE oceanic_station SET VNODE_DURATION '7d';
```

</details>

## `ALTER TABLE`

:::tip

Support modifying/deleting columns of `FIELD` types, column types can be queried using the [`DESCRIBE TABLE`](dql#describe) syntax.

Do not support modifying the column name `time`.

:::

```sql
ALTER TABLE tb_name alter_table_option;

alter_table_option: {
      ADD FIELD col_name [data_type] [CODEC(code_type)]
    | ALTER col_name SET CODEC(code_type)
    | DROP col_name
    | RENAME COLUMN col_name TO new_col_name
}
```

<details>
  <summary>View the <code>ALTER TABLE</code> example</summary>

**Add a column of type `FIELD` and specify the compression algorithm.**

```sql
ALTER TABLE air ADD FIELD humidity DOUBLE CODEC(DEFAULT);
```

**Modify the compression algorithm of `humidity` to `QUANTILE`.**

```sql
ALTER TABLE air ALTER humidity SET CODEC(QUANTILE);
```

**Delete `humidity`.**

```sql
ALTER TABLE air DROP humidity;
```

</details>

## `DROP DATABASE`

```sql
DROP DATABASE [IF EXISTS] db_name;
```

<details>
  <summary>View the <code>DROP DATABASE</code> example</summary>

**Delete the database, and the database will be immediately deleted.**

```sql
DROP DATABASE oceanic_station;
```

</details>

## `DROP TABLE`

```sql
DROP TABLE [ IF EXISTS ] tb_name;
```

<details>
  <summary>View the <code>DROP TABLE</code> example</summary>

```sql
DROP TABLE air;
```

</details>
