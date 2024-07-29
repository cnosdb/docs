---
sidebar_position: 13
---

# Shard Replica Management

:::tip
Only Enterprise Edition supports
:::

Replica management is crucial for online services, CnosDB provides the following replica management related commands:

- View Replica Distribution
- Increase Replica
- Delete Replica
- Elevate Node to Master
- Destroy Replica Group

For concepts related to replicas and sharding, please refer to [Data Sharding and Replication](../reference/concept_design/replica.md)

## 查看副本分布

```sql
show replicas
```

`show replicas` 返回复制组相关信息，包括分布在哪些节点、开始结束时间、所属的数据库名字等，如下所示：

```SQL
my_db ❯ show replicas;
+------------+----------+--------------+-------------------------+-------------------------+
| replica_id | location | database     | start_time              | end_time                |
+------------+----------+--------------+-------------------------+-------------------------+
| 2          | 1001*    | usage_schema | 2023-12-19 00:00:00 UTC | 2024-12-18 00:00:00 UTC |
| 5          | 1001*    | my_db        | 2022-11-02 23:00:00 UTC | 2022-11-03 07:20:00 UTC |
+------------+----------+--------------+-------------------------+-------------------------+
```

> `*` 标识复制组的主节点所位于的节点ID

## Increase Replica

```sql
replica add
```

`replica add` 复制组在指定节点增加一个副本，如下所示：

```SQL
my_db ❯ replica add replica_id 5 node_id 2001;
Query took 0.058 seconds.

my_db ❯ show replicas;
+------------+------------+--------------+-------------------------+-------------------------+
| replica_id | location   | database     | start_time              | end_time                |
+------------+------------+--------------+-------------------------+-------------------------+
| 2          | 1001*      | usage_schema | 2023-12-19 00:00:00 UTC | 2024-12-18 00:00:00 UTC |
| 5          | 1001*,2001 | my_db        | 2022-11-02 23:00:00 UTC | 2022-11-03 07:20:00 UTC |
+------------+------------+--------------+-------------------------+-------------------------+
```

> 复制组5在2001节点增加了一个副本；主节点是1001，从节点是2001

## Elevate Node to Master

```sql
replica promote
```

`replica promote` 提升一个从节点为主节点，这在更换机器等运维过程中可能会用到，如下所示：

```SQL
my_db ❯ replica promote replica_id 5 node_id 2001;
Query took 0.854 seconds.

my_db ❯ show replicas;
+------------+------------+--------------+-------------------------+-------------------------+
| replica_id | location   | database     | start_time              | end_time                |
+------------+------------+--------------+-------------------------+-------------------------+
| 2          | 1001*      | usage_schema | 2023-12-19 00:00:00 UTC | 2024-12-18 00:00:00 UTC |
| 5          | 1001,2001* | my_db        | 2022-11-02 23:00:00 UTC | 2022-11-03 07:20:00 UTC |
+------------+------------+--------------+-------------------------+-------------------------+
Query took 0.010 seconds.
```

> 提升复制组5在2001节点为主节点；主节点变成2001，1001降为从节点

## Delete Replica

```sql
replica remove
```

`replica remove` 删除一个副本，主从副本都支持删除；如果删除的是主节点则会从剩余节点随机挑选一个为新的主，如下所示：

```SQL
my_db ❯ replica remove replica_id 5 node_id 2001;
Query took 0.036 seconds.

my_db ❯ show replicas;
+------------+----------+--------------+-------------------------+-------------------------+
| replica_id | location | database     | start_time              | end_time                |
+------------+----------+--------------+-------------------------+-------------------------+
| 2          | 1001*    | usage_schema | 2023-12-19 00:00:00 UTC | 2024-12-18 00:00:00 UTC |
| 5          | 1001*    | my_db        | 2022-11-02 23:00:00 UTC | 2022-11-03 07:20:00 UTC |
+------------+----------+--------------+-------------------------+-------------------------+
Query took 0.011 seconds.
```

> 删除复制组5在2001副本，剩余的副本自动变为主节点

**`【如果只有一个副本不允许删除，可以通过下面的销毁复制组达到删除目的】`**

## Destroy Replica Group

```sql
replica destory
```

`replica destory` 销毁整个复制组，如下所示：

```SQL
my_db ❯ replica destory replica_id 5;
Query took 0.027 seconds.

my_db ❯ show replicas;
+------------+----------+--------------+-------------------------+-------------------------+
| replica_id | location | database     | start_time              | end_time                |
+------------+----------+--------------+-------------------------+-------------------------+
| 2          | 1001*    | usage_schema | 2023-12-19 00:00:00 UTC | 2024-12-18 00:00:00 UTC |
+------------+----------+--------------+-------------------------+-------------------------+
```

> 销毁复制组5，如果是只有一个副本的复制可以通过销毁方式达到删除目的
