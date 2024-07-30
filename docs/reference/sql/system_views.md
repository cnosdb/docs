---
sidebar_position: 8
---

# 系统视图

CnosDB 提供了系统视图用来查看集群状态和集群 Schema 信息。

- `cluster_schema` ：用于存放集群信息。
- `information_schema`：用于存放租户信息。
- `usage_schema`：用户存放用量信息。

## cluster_schema

### tenants

```sql
SELECT * FROM cluster_schema.tenants;
+-------------+----------------------------------------------------------------------------------------------+
| tenant_name | tenant_options                                                                               |
+-------------+----------------------------------------------------------------------------------------------+
| cnosdb      | {"comment":"system tenant","limiter_config":null,"drop_after":null,"tenant_is_hidden":false} |
+-------------+----------------------------------------------------------------------------------------------+
```

### users

```sql
SELECT * FROM cluster_schema.users;
+-----------+----------+--------------------------------------------------------------------------------+
| user_name | is_admin | user_options                                                                   |
+-----------+----------+--------------------------------------------------------------------------------+
| root      | true     | {"hash_password":"*****","must_change_password":true,"comment":"system admin"} |
+-----------+----------+--------------------------------------------------------------------------------+
```

### sql_history

```sql
DESC TABLE cluster_schema.sql_history;
+-----------------+-----------------------+-------------+-------------------+
| column_name     | data_type             | column_type | compression_codec |
+-----------------+-----------------------+-------------+-------------------+
| time            | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| tenant_id       | STRING                | TAG         | DEFAULT           |
| tenant_name     | STRING                | TAG         | DEFAULT           |
| user_id         | STRING                | TAG         | DEFAULT           |
| user_name       | STRING                | TAG         | DEFAULT           |
| duration        | DOUBLE                | FIELD       | DEFAULT           |
| error_count     | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
| processed_count | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
| query_id        | STRING                | FIELD       | DEFAULT           |
| query_text      | STRING                | FIELD       | DEFAULT           |
| query_type      | STRING                | FIELD       | DEFAULT           |
| state           | STRING                | FIELD       | DEFAULT           |
+-----------------+-----------------------+-------------+-------------------+
```

## information_schema

### databases

```sql
+-------------+---------------+-----+-------+----------------+---------+-----------+
| tenant_name | database_name | ttl | shard | vnode_duration | replica | precision |
+-------------+---------------+-----+-------+----------------+---------+-----------+
| cnosdb      | usage_schema  | INF | 1     | 365 Days       | 1       | NS        |
| cnosdb      | public        | INF | 1     | 365 Days       | 1       | NS        |
+-------------+---------------+-----+-------+----------------+---------+-----------+
```

### tables

```sql
SELECT * FROM information_schema.tables;
+--------------+----------------+---------------------+------------+--------------+---------------+
| table_tenant | table_database | table_name          | table_type | table_engine | table_options |
+--------------+----------------+---------------------+------------+--------------+---------------+
| cnosdb       | usage_schema   | http_writes         | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | vnode_cache_size    | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | coord_data_in       | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | http_data_out       | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | http_write_duration | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | coord_data_out      | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | http_queries        | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | http_data_in        | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | http_query_duration | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | vnode_disk_storage  | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | coord_queries       | TABLE      | TSKV         | TODO          |
| cnosdb       | usage_schema   | coord_writes        | TABLE      | TSKV         | TODO          |
+--------------+----------------+---------------------+------------+--------------+---------------+
```

### columns

```sql
SELECT * FROM information_schema.columns;
+-------------+---------------+---------------------+-------------+-------------+------------------+----------------+-------------+-----------------------+-------------------+
| tenant_name | database_name | table_name          | column_name | column_type | ordinal_position | column_default | is_nullable | data_type             | compression_codec |
+-------------+---------------+---------------------+-------------+-------------+------------------+----------------+-------------+-----------------------+-------------------+
| cnosdb      | usage_schema  | http_writes         | time        | TIME        | 0                | NULL           | false       | TIMESTAMP(NANOSECOND) | DEFAULT           |
| cnosdb      | usage_schema  | http_writes         | api         | TAG         | 1                | NULL           | true        | STRING                | DEFAULT           |
| cnosdb      | usage_schema  | http_writes         | database    | TAG         | 2                | NULL           | true        | STRING                | DEFAULT           |
| cnosdb      | usage_schema  | http_writes         | host        | TAG         | 3                | NULL           | true        | STRING                | DEFAULT           |
| cnosdb      | usage_schema  | http_writes         | node_id     | TAG         | 4                | NULL           | true        | STRING                | DEFAULT           |
| cnosdb      | usage_schema  | http_writes         | tenant      | TAG         | 5                | NULL           | true        | STRING                | DEFAULT           |
| cnosdb      | usage_schema  | http_writes         | user        | TAG         | 6                | NULL           | true        | STRING                | DEFAULT           |
| ... ...                                                                                                                                                                     |
```

### enabled_roles

```sql
SELECT * FROM information_schema.enabled_roles;
+-----------+
| role_name |
+-----------+
+-----------+
```

### roles

```sql
SELECT * FROM information_schema.roles;
+-----------+-----------+--------------+
| role_name | role_type | inherit_role |
+-----------+-----------+--------------+
| owner     | system    |              |
| member    | system    |              |
+-----------+-----------+--------------+
```

### database_privileges

```sql
SELECT * FROM information_schema.database_privileges;
+-------------+---------------+----------------+-----------+
| tenant_name | database_name | privilege_type | role_name |
+-------------+---------------+----------------+-----------+
+-------------+---------------+----------------+-----------+
```

### members

```sql
SELECT * FROM information_schema.members;
+-----------+-----------+
| user_name | role_name |
+-----------+-----------+
+-----------+-----------+
```

### queries

```sql
SELECT * FROM information_schema.queries;
+----------------------+------------+-------------------------------------------+----------------------------------------+-----------+----------------------------------------+-------------+---------------+-----------+-------------+-----------------+-------------+
| query_id             | query_type | query_text                                | user_id                                | user_name | tenant_id                              | tenant_name | database_name | state     | duration    | processed_count | error_count |
+----------------------+------------+-------------------------------------------+----------------------------------------+-----------+----------------------------------------+-------------+---------------+-----------+-------------+-----------------+-------------+
| 12520424353521222863 | batch      | SELECT * FROM information_schema.queries; | 78322384368497284380257291774744000002 | root      | 78322384368497284380257291774744000001 | cnosdb      | public        | OPTMIZING | 0.006734875 | 0               | 0           |
+----------------------+------------+-------------------------------------------+----------------------------------------+-----------+----------------------------------------+-------------+---------------+-----------+-------------+-----------------+-------------+
```

## usage_schema

### coord_data_in

```sql
DESCRIBE TABLE usage_schema.coord_data_in;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### coord_data_out

```sql
DESCRIBE TABLE usage_schema.coord_data_out;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### coord_queries

```sql
DESCRIBE TABLE usage_schema.coord_queries;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### coord_writes

```sql
DESCRIBE TABLE usage_schema.coord_writes;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### http_data_in

```sql
DESCRIBE TABLE usage_schema.http_data_in;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| api         | STRING                | TAG         | DEFAULT           |
| host        | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| user        | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### http_data_out

```sql
DESCRIBE TABLE usage_schema.http_data_out;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| api         | STRING                | TAG         | DEFAULT           |
| host        | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| user        | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### http_queries

```sql
DESCRIBE TABLE usage_schema.http_queries;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| api         | STRING                | TAG         | DEFAULT           |
| host        | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| user        | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### http_query_duration

```sql
DESCRIBE TABLE usage_schema.http_query_duration;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| api         | STRING                | TAG         | DEFAULT           |
| host        | STRING                | TAG         | DEFAULT           |
| le          | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| user        | STRING                | TAG         | DEFAULT           |
| value       | DOUBLE                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### sql_data_in

```sql
DESCRIBE TABLE usage_schema.sql_data_in;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### vnode_cache_size

```sql
DESCRIBE TABLE usage_schema.vnode_cache_size;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### vnode_disk_storage

```sql
DESCRIBE TABLE usage_schema.vnode_disk_storage;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### http_flow

```sql
DESCRIBE TABLE usage_schema.http_flow;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| api         | STRING                | TAG         | DEFAULT           |
| host        | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### http_response_time

```sql
DESCRIBE TABLE usage_schema.http_response_time;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| api         | STRING                | TAG         | DEFAULT           |
| host        | STRING                | TAG         | DEFAULT           |
| le          | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | DOUBLE                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### read_meta_count

```sql
DESCRIBE TABLE usage_schema.read_meta_count;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| addr        | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### read_meta_response_time

```sql
DESCRIBE TABLE usage_schema.read_meta_response_time;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| addr        | STRING                | TAG         | DEFAULT           |
| le          | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | DOUBLE                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### write_meta_count

```sql
DESCRIBE TABLE usage_schema.write_meta_count;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| addr        | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### write_meta_response_time

```sql
DESCRIBE TABLE usage_schema.write_meta_response_time;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| addr        | STRING                | TAG         | DEFAULT           |
| le          | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | DOUBLE                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### watch_meta_count

```sql
DESCRIBE TABLE usage_schema.watch_meta_count;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| addr        | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### watch_meta_response_time

```sql
DESCRIBE TABLE usage_schema.watch_meta_response_time;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| addr        | STRING                | TAG         | DEFAULT           |
| le          | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| value       | DOUBLE                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```


### raft_applied_index

```sql
DESCRIBE TABLE usage_schema.raft_applied_index;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| replica_id  | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### raft_applied_index

```sql
DESCRIBE TABLE usage_schema.raft_flushed_index;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| replica_id  | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### raft_replication_delay

```sql
DESCRIBE TABLE usage_schema.raft_replication_delay;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| replica_id  | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### raft_snapshot_index

```sql
DESCRIBE TABLE usage_schema.raft_snapshot_index;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| replica_id  | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### raft_wal_index_max

```sql
DESCRIBE TABLE usage_schema.raft_wal_index_max;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| replica_id  | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```

### raft_wal_index_min

```sql
DESCRIBE TABLE usage_schema.raft_wal_index_min;
+-------------+-----------------------+-------------+-------------------+
| column_name | data_type             | column_type | compression_codec |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| database    | STRING                | TAG         | DEFAULT           |
| node_id     | STRING                | TAG         | DEFAULT           |
| replica_id  | STRING                | TAG         | DEFAULT           |
| tenant      | STRING                | TAG         | DEFAULT           |
| vnode_id    | STRING                | TAG         | DEFAULT           |
| value       | BIGINT UNSIGNED       | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
```