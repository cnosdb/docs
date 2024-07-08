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
      TTL duration
    | SHARD value
    | VNODE_DURATION duration
    | REPLICA value
    | PRECISION {'ms' | 'us' | 'ns'}
    | MAX_MEMCACHE_SIZE bytesnum
    | MEMCACHE_PARTITIONS value
    | WAL_MAX_FILE_SIZE bytesnum
    | WAL_SYNC bool
    | STRICT_WRITE bool 
    | MAX_CACHE_READERS value
}
```

| Options               | Description                                                                                                                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TTL`                 | Duration。Data expiration time, default is infinite `INF`.                                                                                                                                                                |
| `SHARD`               | Indicates the number of shards, default: `1`.                                                                                                                                                            |
| `VNODE_DURATION`      | Duration。The time window length of the data in SHARD, default `'1y'`.                                                                                                                                                    |
| `REPLICA`             | The number of replicas of the data in the cluster, default is `1`.(Note: The number of copies must be less than or equal to the data nodes of `tskv` in the cluster). |
| `PRECISION`           | The timestamp precision of the database, default is `ns`.Supported units: `ms`, `us`, `ns`                                                                                                               |
| `MAX_MEMCACHE_SIZE`   | 数据库的最大缓存大小，默认为 `'512MiB'`,可使用配置文件指定每次创建时的默认值。                                                                                                                                                                                            |
| `MEMCACHE_PARTITIONS` | 数据库的缓存分区数，默认为 `1`,可使用配置文件指定每次创建时的默认值。                                                                                                                                                                                                    |
| `WAL_MAX_FILE_SIZE`   | 单个 WAL 文件的最大大小，默认为 `'1GiB'`，可使用配置文件指定每次创建时的默认值。                                                                                                                                                                                          |
| `WAL_SYNC`            | WAL 是否每次写入同步，默认为 `'false'`，可使用配置文件指定每次创建时的默认值。                                                                                                                                                                                           |
| `STRICT_WRITE`        | 是否开启严格写，即写入是否需要提前创建表，默认为 `'false'`，可使用配置文件指定每次创建时的默认值。                                                                                                                                                                                   |
| `MAX_CACHE_READERS`   | vnode的最大缓存的tsm reader，默认为 `32`，可使用配置文件指定每次创建时的默认值。                                                                                                                                                                                       |

### Duration 格式

```
'inf'为无限大的 Duration, 例如 create database oceanic_station with ttl 'inf'
'nanos' | 'nsec' | 'ns' 为纳秒, 例如 with ttl '10ns'
'usec' | 'us' 为微秒, 例如 with ttl '300us'
'millis' | 'msec' | 'ms' 为毫秒, 例如 with ttl '90ms'
'seconds' | 'second' | 'secs' | 'sec' | 's' 为秒, 例如 with ttl '30s'
'minutes' | 'minute' | 'min' | 'mins' | 'm' 为分钟, 例如 with ttl '7000m'
'hours' | 'hour' | 'hr' | 'hrs' | 'h' 为小时, 例如 with ttl '5h'
'days' | 'day' | 'd' 为天, 例如 with ttl '365d'
'weeks' | 'week' | 'w' 为周, 例如 with ttl '52w'
'months' | 'month' | 'M' 为月, 例如 with ttl '12M'
'years' | 'year' | 'y' 为年, 例如 with ttl '1y'
```

### BytesNum

```
'512MiB'、'1GiB'、'1KiB'、'1TiB'、'1PiB'、'1EiB'、'1ZiB'、'1YiB', 为二进制单位, 1M = 1024K
'512MB'、'1GB'、'1KB'、'1TB'、'1PB'、'1EB'、'1ZB'、'1YB'，为十进制单位, 1M = 1000K
```

<details>
  <summary>View the <code>CREATE DATABASE</code> example</summary>

**Create a database, and retain the policy as unlimited length.**

```sql
CREATE DATABASE oceanic_station;
```

**创建一个数据库，指定参数。**

```sql
create database oceanic_station with ttl 'inf' shard 6 vnode_duration '2y1M' replica 1 precision 'us' max_memcache_size '128MiB' memcache_partitions 10 wal_max_file_size '300M' wal_sync 'true' strict_write 'true' max_cache_readers 100;
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

## `CREATE STREAM TABLE`

:::tip
Need a `source` table, STREAM table does not support `ALTER`
:::

```sql
CREATE STREAM TABLE [IF NOT EXISTS] table_name[(field_definition [, field_definition] ...)]
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

Support modifying/deleting columns of `TAG` and `FIELD` types, column types can be queried using the [`DESCRIBE TABLE`](dql.md#describe) syntax.

Do not support modifying the column name `time`.

Avoid performing write operations when renaming columns of type `TAG`, as it may cause conflicts in `series`.

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
  <summary>View the <code>ALTER TABLE</code> example</summary>

**Add a column of type `TAG`.**

```sql
ALTER TABLE air ADD TAG height;
```

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

**Rename the column name.**

```sql
ALTER TABLE air RENAME COLUMN height to height_v2;
```

</details>

## `DROP DATABASE`

```sql
DROP DATABASE [IF EXISTS] db_name [AFTER <duration>];
```

| Options | Description                                                                                                                                                                                                                                                                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AFTER` | Set the delay deletion time. When set to `AFTER`, the database will enter the disabled phase until the duration ends. The database will be removed from the disk. Before the duration ends, recovery can be done using the `RECOVER DATABASE` syntax.The default unit is `d`, supporting `d`, `h`, `m` |

<details>
  <summary>View the <code>DROP DATABASE</code> example</summary>

**Delete the database, and the database will be immediately deleted.**

```sql
DROP DATABASE oceanic_station;
```

**Delete the database and set it to be deleted after 3 days.**

```sql
DROP DATABASE oceanic_station AFTER '3';
```

**Revoke the deletion of the database**

The deletion operation can be revoked before the database is actually deleted, i.e., before the `AFTER` duration ends.

```sql
RECOVER DATABASE oceanic_station;
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
