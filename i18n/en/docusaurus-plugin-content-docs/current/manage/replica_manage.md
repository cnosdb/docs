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
- Promote Node to Master
- Destroy Replica Group

For concepts related to replicas and sharding, please refer to [Data Sharding and Replication](../reference/concept_design/replica.md)

## View Replica Distribution

```sql
show replicas
```

`show replicas` returns information related to replication groups, including which nodes they are distributed on, start and end times, the name of the associated database, etc., as shown below:

```SQL
my_db ❯ show replicas;
+------------+----------+--------------+-------------------------+-------------------------+
| replica_id | location | database     | start_time              | end_time                |
+------------+----------+--------------+-------------------------+-------------------------+
| 2          | 1001*    | usage_schema | 2023-12-19 00:00:00 UTC | 2024-12-18 00:00:00 UTC |
| 5          | 1001*    | my_db        | 2022-11-02 23:00:00 UTC | 2022-11-03 07:20:00 UTC |
+------------+----------+--------------+-------------------------+-------------------------+
```

> The node ID where the main node of the replica group is located is identified by `*`.

## Increase Replica

```sql
replica add
```

`replica add` Add a replica to the specified node in the replication group as shown below:

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

> A replica was added to Group 5 at node 2001; the primary node is 1001, and the secondary node is 2001

## Promote Node to Master

```sql
replica promote
```

Promote a replica to be a master node with `replica promote` command, which may be useful during machine replacement or other operation and maintenance processes, as shown below:

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

> Promote Replica group 5 to be the primary node in node 2001; the primary node becomes 2001, and 1001 becomes the secondary node

## Delete Replica

```sql
replica remove
```

`replica remove` remove a replica, both master and slave replicas support deletion; if the deleted node is the master node, a new master will be randomly selected from the remaining nodes as shown below:

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

> Delete replica group 5 in 2001 backup, remaining replica automatically become master nodes

**`[If only one copy is not allowed to be deleted, you can achieve the deletion purpose by destroying the replication group below]`**

## Destroy Replica Group

```sql
replica destory
```

`replica destory` destroys the entire replica set as follows:

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

> Destroy Replica Group 5, if it is a replica with only one copy, deletion can be achieved by destruction
