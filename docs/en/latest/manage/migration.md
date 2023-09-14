---
title: Node Migration
order: 2
---

# Node Migration

CnosDB can MOVE data from one node to another by using SQL `MOVE VNODE`.

### Syntax

**Move Vnode**

```
MOVE VNODE [vnode_id] TO NODE [node_id]
```

**Copy Vnode**

```
COPY VNODE [vnode_id] TO NODE [node_id]
```

**Drop Vnode**

```
DROP VNODE <vnode_id>
```

**Compact Vnode**

```
COMPACT VNODE <vnode_id>[ <vnode_id>[ ...]]
```

**Check Group Consistency** \
To be released

```
CHECKSUM GROUP <replication_set_id>
```

### Example

- #### Move Vnode
```sql
MOVE VNODE 6 TO NODE 1001; /*the specific vnode id and node id vary according to the actual environment*/
```

- #### Copy Vnode
```SQL
COPY VNODE 7 TO NODE 2001;
```

- #### Drop Vnode
```sql
DROP VNODE 13;
```

- #### Compact Vnode
```sql
COMPACT VNODE  7 10 11 12;
```