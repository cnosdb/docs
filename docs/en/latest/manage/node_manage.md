---
title: Node Management
order: 11
---

# Node Management

:::tip
Only Enterprise Edition supports
:::

## Node Removal

When a data node is removed, its data will be reasonably migrated to other data nodes. The removed data node operation requires that there are two or more data nodes with the same ATTRIBUTE.

### Syntax

```
REMOVENODE nodeid [FORCE]
```

"FORCE" is optional. When "FORCE" is not provided, the node to be removed is marked as "ReadOnly", and data migration is not actively carried out. At this time, the node is in a read-only state and no new data will be written.

When "FORCE" is applied, the node data will be actively migrated to other nodes, and the migration strategy is as follows:
1. Do not migrate to other nodes in the replica set.
2. Select the migratable node with the largest storage space;
3. If there is no suitable node migration, the data is discarded.

During the data migration process, the node is marked as "Migrating" and no new data will be written. After the migration is completed, the node is successfully removed.