---
sidebar_position: 1
---

# Cluster management

:::tip
Enterprise only support
:::

## View Node List

```sql
SHOW DATANODES
```

`SHOW DATANODES` returns the list of all nodes in the cluster, as shown below in：

```sql
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| NODE_ID | HOST      | ATTRIBUTE | STATUS  | DISK_FREE | DISK_TOTAL | LAST_UPDATED_TIME   |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| 1001    | localhost | HOT       | HEALTHY | 26.03 GB  | 62.67 GB   | 2023-12-26 09:15:29 |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
```

## Add Node

Add a new node only requires `meta_service_addr` in the configuration of the node [`cluster`](../reference/config#cluster) to the `meta` endpoint in the target cluster and `name` to match the target cluster \`\`name\`.

```sql
...
[cluster]
name = cluster_xxx
meta_service_addr = [127.0.0.1:8901]
...
```

## Remove Node

If the node is a store node (`tskv` or `query_tskv`), its data will be reasonably migrated to other nodes that can store the data. The offline storage node operation requires two or more of the same `ATTRIBUTE`.

```
REMOVENODE nodeid [FORCE]
```

### Example

**Remove `NODE_ID` to `1001` node**

> If a node has data in `1001`, it will be marked as read-only (`ReadOnly`), it will no longer be written to new data until the data in the node completely disappears from the `TTL` setting or from the graded storage functionality. The cluster will destroy the `1001` node completely. The removed node will not be able to rejoin the cluster.

```sql
REMOVENODE 1001
```

**Force remove notes**

```sql
REMOVENODE 1001 FORCE
```

Moves data to other nodes when attaching `FORCE` parameters, follow the following rules：

- Do not migrate to other nodes in the copy set.
- Select the maximum storage space remaining in the migable node.
- This data is discarded if there are no suitable peers to migrate.

During migration the node will be marked as `Migrationn` in the state, stop writing new data, after completion the node will be completely destroyed, the node will not be able to rejoin the cluster.

## View the `Vnode` list

```sql
SHOW VNODE
```

Show a list of all `Vnode` from the current database

```shell
+---+---+------+---+-------------- +-
| NODE_ID | BUCKET_ID | PLICATION_ID | DATABASE_NAME | START_TIME | START_NGE | START_TIME | START|STD_TATIM|STATUS |
+---------+---+------------++++-+-+-+++++-
| 3 | 1 | 2 | usage_schema | cnosb | 16714080000000| 1702944000000000000|Running
++---++-+-+-+-+-+++-+++++-
 | 01
```

CnosDB supports using SQL for `MOVE`, `COPY`, `DROP`, `COMPAT`, `CHECKSUM GROUP` etc.

### Example

\*\*Move `VNODE_ID` to the node \`1001\`\`

```sql
MOVE VNODE 5 TO NODE 1001
```

\*\*Copy `VNODE_ID` to `5` to the node \`1001\`\`

```sql
COPY VNODE 5 TO NODE 1001
```

**Delete `VNODE` to `5` node**

```sql
DROP VNODE 5
```

**Force `VNODE_ID` to `5`, `6`, `7` and `VNODE` respectively**

```sql
COMPACT VNODE 5 6 7
```

**Check the data consistency of `REPLICATION_SET_ID` for `5` \`\`Group**

```sql
CHECKSUM GROUP 5
```

## Resource management

CnosDB supports the management of resources, monitors some of the more complex, multiple-executed resources and retries when the operation fails.

Currently supported resources include：`DropTenant`, `DropDatabase`, `DropTable`, `DropColumn`, `AddColumn`, `AlterColumn`, `RenameTagName`, `UpdateTagValue`

The corresponding command is：`DROPP TENANT`, `DROP DATABSE`, `DROPP TABLE`, `DROPP COLUMN`, `ADD COLUMN`, `ALTER COLUMN`

Saved resource status： in `information_schema.resource_status`

```sql
SELECT * FROM information_schema.resource_status;
+---------------------+------------+--------------+-----------+----------+---------+
| time                | name       | action       | try_count | status   | comment |
+---------------------+------------+--------------+-----------+----------+---------+
| 2023-10-18 08:15:16 | cnosdb/db1 | DropDatabase | 0         | Schedule |         |
+---------------------+------------+--------------+-----------+----------+---------+
```

:::note

Only some features are supported for community version：

| Commands            | Enterprise Edition | Community Edition |
| ------------------- | ------------------ | ----------------- |
| `SHOW DATANODES`    | ✅                  | ❌                 |
| `REMOVENODE`        | ✅                  | ❌                 |
| `SHOW VNODE`        | ✅                  | ❌                 |
| `MOVE VNODE`        | ✅                  | ✅                 |
| `COPY VNODE`        | ✅                  | ✅                 |
| `DROP VNODE`        | ✅                  | ✅                 |
| `COMPACT VNODE`     | ✅                  | ✅                 |
| `CHECKSUM GROUP`    | ✅                  | ✅                 |
| Resource management | ✅                  | ✅                 |

:::
