---
sidebar_position: 1
---

# Cluster Management

:::tip
Only Enterprise Edition supports
:::

## View node list

```sql
SHOW DATANODES
```

The `SHOW DATANODES` command will return a list of all nodes in the cluster as follows:

```sql
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| NODE_ID | HOST      | ATTRIBUTE | STATUS  | DISK_FREE | DISK_TOTAL | LAST_UPDATED_TIME   |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| 1001    | localhost | HOT       | HEALTHY | 26.03 GB  | 62.67 GB   | 2023-12-26 09:15:29 |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
```

## Add node

To add a new node, simply set the `meta_service_addr` in the [`cluster`](../reference/config#cluster) configuration to point to the `meta` endpoint in the target cluster, and ensure that the `name` matches the name of the target cluster.

```sql
... ...
[cluster]
name = cluster_xxx
meta_service_addr = [127.0.0.1:8901]
... ...
```

## Remove node

If the node is a storage node (`tskv` or `query_tskv`), its data will be reasonably migrated to other nodes that can store data. The operation of taking offline a storage node requires two or more storage nodes with the same `ATTRIBUTE`.

```
REMOVENODE nodeid [FORCE]
```

### Example

**Remove the node with `NODE_ID` as `1001`**

> If there is data in node `1001`, it will be marked as read-only (`ReadOnly`) and will no longer write new data until the data in the node disappears completely according to the `TTL` setting or the data disappears based on the tiered storage function. The cluster will completely destroy the `1001` node, and the removed node cannot rejoin the cluster.

```sql
REMOVENODE 1001
```

**Force remove node**

```sql
REMOVENODE 1001 FORCE
```

When the `FORCE` parameter is attached, the data will be actively migrated to other nodes, and the following rules will be followed during migration:

- Do not migrate to other nodes that are not part of the replica set.
- Choose the node with the largest remaining storage space that can be migrated.
- If there is no appropriate node migration, the data is discarded.

During migration the node will be marked as `Migrationn` in the state, stop writing new data, after completion the node will be completely destroyed, the node will not be able to rejoin the cluster.

## View `Vnode` list

```sql
SHOW VNODE
```

Display a list of all `Vnodes` in the current database

```shell
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| VNODE_ID | NODE_ID | BUCKET_ID | REPLICATION_SET_ID | DATABASE_NAME | TENANT_NAME | START_TIME          | END_TIME            | STATUS  |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| 3        | 1001    | 1         | 2                  | usage_schema  | cnosdb      | 1671408000000000000 | 1702944000000000000 | Running |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
```

CnosDB supports using SQL to perform operations such as `MOVE`, `COPY`, `DROP`, `COMPACT`, `CHECKSUM GROUP` on `Vnode`

### Example

**Move `VNODE` with `VNODE_ID` of `5` to node `1001`**

```sql
MOVE VNODE 5 TO NODE 1001
```

**Copy the `VNODE` with `VNODE_ID` of `5` to node `1001`**

```sql
COPY VNODE 5 TO NODE 1001
```

**Remove the `VNODE` with `5`**

```sql
DROP VNODE 5
```

**Force compress `VNODE` with `VNODE_ID` of `5`, `6`, `7` respectively**

```sql
COMPACT VNODE 5 6 7
```

**Check the data consistency of `REPLICATION_SET_ID` for `5` Group**

```sql
CHECKSUM GROUP 5
```

## Resource Management

CnosDB supports resource management, will monitor some complex and multi-step resources, and will retry when the operation fails until successful.

The currently supported resources include: `DropTenant`, `DropDatabase`, `DropTable`, `DropColumn`, `AddColumn`, `AlterColumn`, `RenameTagName`, `UpdateTagValue`

The corresponding commands are: `DROP TENANT`, `DROP DATABASE`, `DROP TABLE`, `DROP COLUMN`, `ADD COLUMN`, `ALTER COLUMN`, `REMOTE COLUMN`

The system table `information_schema.resource_status` stores the status of resources:

```sql
SELECT * FROM information_schema.resource_status;
+---------------------+------------+--------------+-----------+----------+---------+
| time                | name       | action       | try_count | status   | comment |
+---------------------+------------+--------------+-----------+----------+---------+
| 2023-10-18 08:15:16 | cnosdb/db1 | DropDatabase | 0         | Schedule |         |
+---------------------+------------+--------------+-----------+----------+---------+
```

:::note

The community edition only supports some features:

| Command             | Enterprise | Community |
| ------------------- | ---------- | --------- |
| `SHOW DATANODES`    | ✅          | ❌         |
| `REMOVENODE`        | ✅          | ❌         |
| `SHOW VNODE`        | ✅          | ❌         |
| `MOVE VNODE`        | ✅          | ✅         |
| `COPY VNODE`        | ✅          | ✅         |
| `DROP VNODE`        | ✅          | ✅         |
| `COMPACT VNODE`     | ✅          | ✅         |
| `CHECKSUM GROUP`    | ✅          | ✅         |
| Resource Management | ✅          | ✅         |

:::
