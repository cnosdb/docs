---
title: Node Information
order: 13
---

# Node Information

:::tip
Enterprise only support
:::

CnosDB can view node information using SQL `SHOW VNODE`.

## Syntax

```tsql
SHOW VNODE
```

Show all Vnode information in the current database.

```bash
public ❯ show vnode;
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| vnode_id | node_id | bucket_id | replication_set_id | database_name | tenant_name | start_time          | end_time            | status  |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| 3        | 1001    | 1         | 2                  | usage_schema  | cnosdb      | 1671408000000000000 | 1702944000000000000 | Running |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
```
