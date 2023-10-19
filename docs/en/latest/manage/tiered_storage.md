---

title: Tiered Storage
order: 5

---

:::tip
Only Enterprise Edition supports
:::

In the actual service scenario, there are multiple data disks on one machine at the same time. Therefore, it is necessary to give full play to the capabilities of these disks to improve the throughput of the system.
Another scenario is that multiple data disks on the same or multiple machines use different storage media, and customers want to store cold data that is not frequently accessed move to cheap storage media to reduce the cost of enterprise storage.
In CnosDB, we solve these two scenarios through the following solutions:

# Tiered Storage

The basic unit of data migration in a CnosDB cluster is Vnode. The enterprise edition of CnosDB cluster provides the following commands to support tiered storage:

```SQL
SHOW DATANODES;                          // Show all nodes in the cluster
+---------+------------------------+-----------+---------+-----------+------------+---------------------+
| NODE_ID | HOST                   | ATTRIBUTE | STATUS  | DISK_FREE | DISK_TOTAL | LAST_UPDATED_TIME   |
+---------+------------------------+-----------+---------+-----------+------------+---------------------+
| 1001    | query_tskv1.cnosdb.com | HOT       | HEALTHY | 5.18 GB   | 7.37 GB    | 2023-06-05 02:30:22 |
| 1002    | query_tskv2.cnosdb.com | HOT       | HEALTHY | 93.71 GB  | 240.11 GB  | 2023-06-05 02:30:19 |
+---------+------------------------+-----------+---------+-----------+------------+---------------------+

ALTER NODE [node_id] ATTRIBUTE [HOT/COLD];  // Modify the attribute of the node
```

```SQL
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options];

db_options:
    db_option ...

db_option: {
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | COOLING_DURATION value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```

Add `COOLING_DURATION value` to the `CREATE DATABASE` statement to add a cooldown time field. `option` indicates the interval for data cooling, `COOLING_DURATION` defaults to 0, which means stopping data migration.

`COOLING_DURATION` must be a multiple of `VNODE_DURATION`. The `COOLING_DURATION` field can be modified by `alter database`.

After data is cooled, the `migrate` thread in meta will migrate data from hot nodes to cold nodes. The `migrate` thread periodically checks whether there is data to be migrated. The timing can be modified using the `auto_migrate_vnodes_duration` configuration item in the meta configuration file. The unit of this configuration item is seconds, and the default value is 0, which means that tiered storage is not enabled. The timing for periodic checks can be set according to practical needs. It is recommended to set the minimum check time to 1800 seconds, which is `auto_migrate_vnodes_duration = 1800`.

**Notice** 

- After data is cooled, data is migrated from the hot node to the cold node. However, the cooling degree of data is defined by users. Users can modify the cooling period of db to change the cooling degree of data.

- Users change the db cool downtime. The change may migrate data from a cold node to a hot node, for example:
When starting the cluster through ./run_cluster.sh with default configuration, there are two data nodes in the cluster: 1001 and 2001, and both are hot nodes by default.
```SQL
ALTER NODE 2001 ATTRIBUTE COLD;  // Change data node 2001 to a cold node
CREATE DATABASE db1 with VNODE_DURATION '1m' COOLING_DURATION '1m';  // Create a database named "db1" on node 1001 with VNODE_DURATION and COOLING_DURATION both set to 1 minute
```
Then create a table and write data in the "db1" database, wait for a period of time until the data is cooled and migrated from hot node 1001 to cold node 2001. At this point, execute the SQL statement:
```SQL
ALTER DATABASE db1 SET COOLING_DURATION '1d'; // Change the cooldown time of database "db1" from 1 minute to 1 day
```
At this point, as the cool downtime becomes larger, the cooled data above becomes hot data again, so the data is moved from cold node 2001 to hot node 1001.