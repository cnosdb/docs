---
title: Node Information
order: 13
---

# Node Information

:::tip
Only Enterprise Edition supports
:::

CnosDB can view node information by using SQL `SHOW VNODE`.

## Syntax

```tsql
SHOW VNODE
```
Displays all Vnode information for the current database.

```bash
public ❯ show vnode;
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| VNODE_ID | NODE_ID | BUCKET_ID | REPLICATION_SET_ID | DATABASE_NAME | TENANT_NAME | START_TIME          | END_TIME            | STATUS  |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| 3        | 1001    | 1         | 2                  | usage_schema  | cnosdb      | 1671408000000000000 | 1702944000000000000 | Running |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
```

