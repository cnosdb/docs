---

title: Tiered Storage
order: 5

---

In the actual service scenario, there are multiple data disks on one machine at the same time. Therefore, it is necessary to give full play to the capabilities of these disks to improve the throughput of the system.
Another scenario is that multiple data disks on the same or multiple machines use different storage media, and customers want to store cold data that is not frequently accessed move to cheap storage media to reduce the cost of enterprise storage.
In CnosDB, we solve these two scenarios through the following solutions:

# Tiered Storage

In the Vnode, the basic unit of data migration in the CnosDB cluster, tiering also follows this basic principle.
We will provide the following command in the CnosDB Enterprise cluster:

```SQL
show datanodes;                          // Show all nodes in the cluster
alter node [node_id] status [hot/cold];  // Modify the status of the node
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

Add `COOLING_DURATION value` to the `CREATE DATABASE` statement to add a cooldown time field. `option` indicates the interval for data cooling, `COOLING_DURATION` defaults to 0, which means infinite length.

`COOLING_DURATION` must be a multiple of `VNODE_DURATION`. The `option COOLING_DURATION` field can be modified by `alter database`.

After data is cooled, the `migrate` thread in meta will migrate data from hot nodes to cold nodes.

**Notice** 

- After data is cooled, data is migrated from the hot node to the cold node. However, the cooling degree of data is defined by users. Users can modify the cooling period of db to change the cooling degree of data.

- Users change the db cool downtime. The change may migrate data from a cold node to a hot node.


# 多盘存储
    In the case of multiple disks on a node, the CnosDB tskv instance does not make any sense.
    In CnosDB Enterprise Edition we provide scripts for disk processing and scripts for deployment.
1. Assemble a RAID array to maximize the capabilities of the hardware system.
2. Deploy multiple cnosdb tskv instances on the same node to point at different disk paths to give full play to the capabilities of the system.