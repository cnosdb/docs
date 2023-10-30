---
title: Upgrade V2.3 to V2.4
order: 14
---
## Upgrade V2.3 to V2.4

When CnosDB is upgraded from V2.3 to V2.4, the data format and communication protocol are incompatible between versions due to reconstruction optimization, which leads to the need to migrate data across clusters. Cross-cluster data migration can take the way of importing and exporting according to Table, because CnosDB cluster also includes Meta data that also needs to be migrated.

### Migrate Meta data

- #### Export Meta data

  Send an http request to meta to export meta data.

    - Meta provides data export interface when deployed separately: http://ip:port/dump
    -CnosDB service single instance provides interface at runtime: http://ip:port/debug

  The two export data are the same, just in a slightly different format. The single-instance export data needs to be cleaned up: open it in a text editor, remove the first and last rows, and the '*' at the beginning of each row, which is ignored when Meta is deployed separately.

```shell
   # Meta deployed separately
   curl -XGET http://ip:port/dump --o ./meta_dump.data  # ip:port is the address of the old meta service

   # CnosDB service single instance
   curl -XGET http://ip:port/debug --o ./meta_dump.data  # ip:port is the address of meta service

```

- #### Data filter

1. The cluster itself information, buckets related information, etc. do not need to be transferred to the destination cluster and need to be filtered manually.
2. Filter method: Open the exported file with a text editor and remove the keys from the list below.

```txt
   the following keys need to be filtered:
   /data_version
   /already_init_key
   /cluster_xxx/auto_incr_id
   /cluster_xxx/data_nodes/1001
   /cluster_xxx/data_nodes/111
   /cluster_xxx/data_nodes_metrics/1001
   /cluster_xxx/tenants/xxx/yyy/zzz/buckets
```

3. Modify the Database schema by adding the db_is_hidden field.

```txt
eg:
/cluster_xxx/tenants/cnosdb/dbs/public: {"tenant":"cnosdb","database":"public","config":{"ttl":null,"shard_num":null,"vnode_duration":null,"replica":null,"precision":null}
modified to:
/cluster_xxx/tenants/cnosdb/dbs/public: {"tenant":"cnosdb","database":"public","config":{"ttl":null,"shard_num":null,"vnode_duration":null,"replica":null,"precision":null,"db_is_hidden":false}}
```

- #### Import to new cluster
  Import the filtered data into the new cluster.

```shell
   curl -XPOST http://ip:port/restore --data-binary "@./meta_dump.data"  # ip:port is the address of the new meta
```

### Migrate Data data

Migrate Data data according to the above import and export process; Just iterate over all the tables.

- #### Export data by table

```sql
    COPY INTO 'file:///tmp/xxx' FROM table_name FILE_FORMAT = (TYPE = 'PARQUET');
```

- #### Import the exported data to new cluster

```sql
    COPY INTO table_name FROM 'file:///tmp/xxx/' FILE_FORMAT = (TYPE = 'PARQUET', DELIMITER = ',');
```
