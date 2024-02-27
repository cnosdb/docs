---
title: Rating Storage
order: 5
---

:::tip
Enterprise only support
:::

在实际的业务场景中一台机器上会同时有多块数据盘，需要把这些盘的能力都充分发挥出来提高系统的吞吐，
还有一种场景是同一台或者多台机器上的多块数据盘使用的是不同存储介质，客户希望把不经常访问的冷数据淘汰到廉价的存储介质来降低企业存储的成本。
In CnosDB we solve both scenarios： by following

# Rating Storage

The basic module for data migration in the CnosDB cluster is Vnode.Enterprise version of the CnosDB cluster provides command support rating storage：

```SQL
SHOW DATANODES;                          // 查看节点信息
+---------+------------------------+-----------+---------+-----------+------------+----------------------------------+
| node_id | host                   | attribute | status  | disk_free | disk_total | location   | last_updated_time   |
+---------+------------------------+-----------+---------+-----------+------------+----------------------------------+
| 1001    | query_tskv1.cnosdb.com | hot       | healthy | 5.18 GB   | 7.37 GB    | /dc1/rack1 | 2023-06-05 02:30:22 |
| 1002    | query_tskv2.cnosdb.com | hot       | healthy | 93.71 GB  | 240.11 GB  | /dc1/rack2 | 2023-06-05 02:30:19 |
+---------+------------------------+-----------+---------+-----------+------------+----------------------------------+

ALTER NODE [node_id] ATTRIBUTE [HOT/COLD];  // 更改节点的属性 
```

```SQL
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options];

db_options:
    db_option...

db_option: LO
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | COOLING_DURATION value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```

Add `COOLING_DURATION_value` to the `CREATE DATABASE`. The `option` indicates the interval between the cooldown of the data and `COOLING_DURATION` by default is 0, indicating that the data migration is stopped.

`COOLING_DURATION` must be several times as many as `VNODE_DURATION`. The `COOLING_DURATION` field can be modified by `alter database`.

When the data is cooled, the `migrate` thread in the meta will migrate data from hot to cold node, the `migrate` thread will always detect if there is a data need to migrate_vnodes_duration`config entry in the meta config file, which is seconds, by default, indicating that tiered storage can not be enabled; a minimum test time can be set according to the actual needs, a minimum of 1800 seconds is recommended, i.e.`auto_migrate_vnotes_duration=1800\`.

**需要注意**

- Data cooldown will be migrated from hot to cold node, but the coolness of the data is defined by the user himself, who can modify the cooling of the data by modifying the cooling time of the db.

- Users modify the cooldown of db and may migrate data from cold to hot node, such as：
  start cluster by ./run_cluster.sh. In default configuration, there are two data nodes：1001 and 2001, and default is hot node.

```SQL
ALTER NODE 2001 ATTRIBUTE COLD; // Modify data node 2001 as cold node
CREATE DATABASE db1 with VNODE_DURATION '1m' COOLING_DURATION '1m'; // Create a database called db1 on 1001 node with VNODE_DURATIONs set to 1 minute and COOLING_DURATION.
```

Then build the table in the db1 database and write the data, waiting for some time, cooldown, migration from hot node 1001 to cold node 2001, executing SQL：

```SQL
ALTER DATABASE db1 SET COOLING_DURATION '1d'; // Change the cooldown of db1 database from 1 minute above to 1 day
```

At this time the cooldown time has changed and the already cooled data has been returned to heat data and the data has been moved back from cold nodes 2001 to hot node.
