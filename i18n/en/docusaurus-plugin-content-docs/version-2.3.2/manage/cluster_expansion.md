---
title: 集群扩容
order: 4
---

# 集群扩容

### 集群维护

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

**检查 Group 数据一致性**

```
CHECKSUM GROUP <replication_set_id>
```
