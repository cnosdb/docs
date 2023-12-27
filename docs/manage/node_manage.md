---
order: 11
---

# 集群管理

:::tip
仅企业版支持
:::

## 查看节点列表

```sql
SHOW DATANODES
```

`SHOW DATANODES` 会返回集群中的所有节点的列表，如下所示：

```sql
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| NODE_ID | HOST      | ATTRIBUTE | STATUS  | DISK_FREE | DISK_TOTAL | LAST_UPDATED_TIME   |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| 1001    | localhost | HOT       | HEALTHY | 26.03 GB  | 62.67 GB   | 2023-12-26 09:15:29 |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
```



## 增加节点

新增一个节点只需要将节点配置[`cluster`](../reference/config#cluster)中的`meta_service_addr`指向目标集群中的 `meta` 端点且 `name` 需要与目标集群的 `name`一致。

```sql
... ...
[cluster]
name = cluster_xxx
meta_service_addr = [127.0.0.1:8901]
... ...
```



## 移除节点

如果节点为存储节点（`tskv` 或 `query_tskv`），则其数据会被合理地迁移到其他可以存储数据的节点，下线存储节点操作要求有两个及以上的相同`ATTRIBUTE`的存储节点。

```
REMOVENODE nodeid [FORCE]
```

### 示例

**移除 `NODE_ID` 为 `1001` 的节点 **

> 如果节点 `1001` 中存在数据，则会将其标记为只读（`ReadOnly`）状态，不再写入新数据，直到节点中的数据根据 `TTL` 设置或根据 分级存储 功能数据完全消失，集群会将 `1001` 节点彻底销毁，移除后的节点不能重新加入集群。

```sql
REMOVENODE 1001
```

**强制移除节点**

```sql
REMOVENODE 1001 FORCE
```

当附加 `FORCE` 参数时，会主动将数据迁移至其他节点，迁移时遵循如下规则：

- 不迁移到副本集的其他节点上。
- 选择可迁移节点中剩余存储空间最大的。
- 如果没有合适的节点迁移，该数据丢弃。

数据迁移过程中，节点会被标记为 `Migrating` 状态，停止新数据写入，完成后节点会被彻底销毁，移除后的节点不能重新加入集群。

## 查看 `Vnode` 列表

```sql
SHOW VNODE
```

显示当前数据库的所有 `Vnode` 的列表

```shell
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| VNODE_ID | NODE_ID | BUCKET_ID | REPLICATION_SET_ID | DATABASE_NAME | TENANT_NAME | START_TIME          | END_TIME            | STATUS  |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
| 3        | 1001    | 1         | 2                  | usage_schema  | cnosdb      | 1671408000000000000 | 1702944000000000000 | Running |
+----------+---------+-----------+--------------------+---------------+-------------+---------------------+---------------------+---------+
```

CnosDB 支持使用 SQL 对 `Vnode` 进行 `MOVE`、`COPY` 、 `DROP`、 `COMPACT`、 `CHECKSUM GROUP` 等操作

### 示例

**将 `VNODE_ID` 为 `5` 的 `VNODE` 移动到节点`1001`**

```sql
MOVE VNODE 5 TO NODE 1001
```

**将 `VNODE_ID` 为 `5` 的 `VNODE` 复制到节点`1001`**

```sql
COPY VNODE 5 TO NODE 1001
```

**删除 `VNODE` 为 `5` 的节点**

```sql
DROP VNODE 5
```

**分别将 `VNODE_ID` 为 `5`、`6`、`7` 的 `VNODE` 强制压缩**

```sql
COMPACT VNODE 5 6 7
```

**检查`REPLICATION_SET_ID`为 `5` 的 `Group` 的数据一致性**

```sql
CHECKSUM GROUP 5
```

## 资源管理

CnosDB 支持对资源进行管理，会对一些较为复杂、多步执行的资源进行监控，并且当操作失败时进行重试，直到成功。

当前支持的资源包括：`DropTenant`、`DropDatabase`、`DropTable`、`DropColumn`、`AddColumn`、`AlterColumn`、`RenameTagName`、`UpdateTagValue`

所对应的命令为：`DROP TENANT`、`DROP DATABASE`、`DROP TABLE`、`DROP COLUMN`、`ADD COLUMN`、`ALTER COLUMN`、`REMOTE COLUMN`

系统表 `information_schema.resource_status` 中存储了资源的状态：

```sql
SELECT * FROM information_schema.resource_status;
+---------------------+------------+--------------+-----------+----------+---------+
| time                | name       | action       | try_count | status   | comment |
+---------------------+------------+--------------+-----------+----------+---------+
| 2023-10-18 08:15:16 | cnosdb/db1 | DropDatabase | 0         | Schedule |         |
+---------------------+------------+--------------+-----------+----------+---------+
```

:::note

社区版仅支持部分功能：

| 命令             | 企业版 | 社区版 |
| ---------------- | ------ | ------ |
| `SHOW DATANODES` | ✅      | ❌      |
| `REMOVENODE`     | ✅      | ❌      |
| `SHOW VNODE`     | ✅      | ❌      |
| `MOVE VNODE`     | ✅      | ✅      |
| `COPY VNODE`     | ✅      | ✅      |
| `DROP VNODE`     | ✅      | ✅      |
| `COMPACT VNODE`  | ✅      | ✅      |
| `CHECKSUM GROUP` | ✅      | ✅      |
| 资源管理         | ✅      | ✅      |

:::