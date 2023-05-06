---
title: 节点迁移
order: 3
---

# 节点迁移

CnosDB 可以通过使用 SQL `MOVE VNODE` 把数据从一个节点转移到另一个节点。

### 语法

**转移 Vnode**

```
MOVE VNODE [vnode_id] TO NODE [node_id]
```

**复制 Vnode**

```
COPY VNODE [vnode_id] TO NODE [node_id]
```

**删除 Vnode**

```
DROP VNODE <vnode_id>
```

**压缩 Vnode**

```
COMPACT VNODE <vnode_id>[ <vnode_id>[ ...]]
```

**检查 Group 数据一致性** \
该功能待上线

```
CHECKSUM GROUP <replication_set_id>
```

### 示例

- #### 转移Vnode
```sql
MOVE VNODE 6 TO NODE 1001; /*具体vnode id与node id 根据实际环境而定*/
```

- #### 复制Vnode
```SQL
COPY VNODE 7 TO NODE 2001;
```

- #### 删除Vnode
```sql
DROP VNODE 13;
```

- #### 压缩Vnode
```sql
COMPACT VNODE  7 10 11 12;
```

