---
title: Node Migration
order: 2
---

# Node Migration

CnosDB can move data from one node to another using SQL `MOVE VNODE`.

### Syntax

**Transfer Vnode**

```
MOVE VNODE [vnode_id] TO NODE [node_id]
```

**Copy Vnode**

```
COPY VNODE [vnode_id] TO NODE [node_id]
```

**Delete Vnode**

```
DROP VNODE <vnode_id>
```

**Compress Vnode**

```
COMPACT VNODE <vnode_id>[ <vnode_id>[ ..]]
```

**Check Group data consistency** \
for this feature to be online

```
CHECKSUM GROUP <replication_set_id>
```

### Example

- #### Move Vnode

```sql
MOVE VNODE 6 TO NODE 1001; /* specific vnode id and node id depending on the physical environment*/
```

- #### Copy Vnode

```SQL
COPY VNODE 7 TO NODE 2001;
```

- #### Delete Vnode

```sql
DROP VNODE 13;
```

- #### Compress Vnode

```sql
COMPACT VNODE 7 10 11 12;
```
