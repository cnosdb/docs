---
sidebar_position: 12
---

# Placement Policy

:::tip
Only Enterprise Edition supports
:::

For important online production, cross-regional level disaster recovery support is required.The multi-replica feature of CnosDB, combined with a reasonable data distribution policy, can meet this goal.

## Two dimensions of data distribution

rack: Rack dimension, generally refers to the data nodes on the same rack in the same data center.

dc: Data center dimension, generally refers to a computer room, a data center.

## Policy Type

### Simple Policy

Replica data placement on the same rack
Name: simple
Parameters: dc, rack

All replicas are placed on machines in rack1 of dc1

```SQL
create placement_policy policy1 WITH rule simple dc 'dc1' rack 'rack1';
```

### Perceive Rack Policy

Replica data should be placed on different racks within the same dc as much as possible
Name: rack_aware
Parameters: dc, and list of racks

All replicas are placed on machines in different racks of rack1-4 in dc1

```SQL
create placement_policy policy2 WITH rule rack_aware dc 'dc1' rack 'rack1,rack2,rack3,rack4';
```

### Perceive DC Policy

Replica data should be placed on different dcs as much as possible
Name: dc_aware
Parameters: list of dc

All replicas should be placed on machines in dc1-4 as much as possible

```SQL
create placement_policy policy3 WITH rule dc_aware dc 'dc1,dc2,dc3,dc4';
```

**Note**

The placement policy belongs to the tenant, and within the same tenant, the policy name is unique.

## Policy Associations

When creating/modifying a Database, you can associate it with a specified placement policy name. If no placement policy is specified, the existing logic will be followed, which means it is not aware of the data center and rack.

```SQL
create database db with replica 2 placement_policy 'policy1';
alter database db set placement_policy 'policy2';
```

## View Policy

You can view the policies and usage under the current tenant through the system tables

```SQL
select * from information_schema.placement_policys;
+---------+-----------+-----------------+-------------------------+------------+
| name    | type      | dc              | rack                    | in_use_dbs |
+---------+-----------+-----------------+-------------------------+------------+
| policy1 | SIMPLE    | dc1             | rack1                   |            |
| policy2 | RACKAWARE | dc1             | rack1,rack2,rack3,rack4 |            |
| policy3 | DCAWARE   | dc1,dc2,dc3,dc4 |                         |            |
+---------+-----------+-----------------+-------------------------+------------+
```

## Modification and deletion of policies

When there is no database usage policy, drop/alter can be performed

```SQL
drop placement_policy policy1;
alter placement_policy policy2 SET rule dc_aware dc 'dc1,dc2,dc3,dc4';
```

## Node Label

When a node joins the cluster, it specifies its belonging dc and rack through the configuration file, and can be viewed by using show datanodes.

```
location = "/dc1/rack1"
show datanodes;
+---------+-----------+-----------+---------+-----------+------------+----------------------------------+
| node_id | host      | attribute | status  | disk_free | disk_total | location   | last_updated_time   |
+---------+-----------+-----------+---------+-----------+------------+----------------------------------+
| 1001    | localhost | hot       | healthy | 31.53 GB  | 240.11 GB  | /dc1/rack1 | 2023-11-07 06:20:01 |
| 2001    | localhost | hot       | healthy | 73.64 GB  | 128.34 GB  | /dc1/rack2 | 2023-11-07 06:20:01 |
+---------+-----------+-----------+---------+-----------+------------+----------------------------------+
```