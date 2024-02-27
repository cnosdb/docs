---
sidebar_position: 12
---

# Data Distribution Strategy

:::tip
Enterprise only support
:::

For important online production, there is a need to support disaster preparedness at the cross-regional level.A sound data distribution strategy for CnosDB’s multi-copy properties can meet this goal.

## Two dimensions of data distribution

rack：frame dimensions that typically refer to data nodes on the same racket in the same room.

dc：  data centre dimension generally refers to a room and a data centre.

## Policy type

### Simple Policy

Copy data is placed on
with the same rack name：Simple
parameter：dc and rack

```SQL
create placement_policy policy_name WITH rule simple dc 'dc1' rack 'rack1' -- all copies are placed on a rack1 machine in dc1
```

### Know Rack Policy

To the extent possible, copy data is placed on
name：rack_aware
parameter：dc and rack list on different rack of the same dc

```SQL
create placement_policy policy_name WITH rule back_aware dc 'dc1' rack 'rack1,rack2,rack3,rack4' -- all copies are placed on different rack1-4 shelves of dc1
```

### Know DC Policy

Copy data is placed on
name：dc_aware
parameter：dc list

```SQL
create placement_policy policy_name WITH rule dc_aware dc 'dc1,dc2,dc3,dc4' -- all copies will be placed on dc1-4 machines to the extent possible
```

**Attention Needs**

A copy of the strategy is attached to the tenant and is unique under the same tenant.

## Policy association

The name of the placement policy can be associated when created/modifying the Database. If you do not specify the placement strategy according to existing logic, you don't know dc and rack.

```SQL
create database db with replica 2 placement_policy policy_name
alter database db set placement_policy policy_name
```

## Policy View

A system table can be used to view current tenant strategies and usage

```SQL
select * from information_schema.placement_policys;
+---------+-----------+-----+-------------------------+------------+
| name    | type      | dc  | rack                    | in_use_dbs |
+---------+-----------+-----+-------------------------+------------+
| policy1 | RACKAWARE | dc1 | rack1,rack2,rack3,rack4 | db         |
+---------+-----------+-----+-------------------------+------------+
```

## Policy modification and deletion

Drop/alter can be used when no data usage policy is available

```SQL
Drop placement_policy 1
alter placement_policy policy 1 SET rule dc_aware dc 'dc1,dc2,dc3,dc4,'
```

## Node Label

The node specifies the dc and rack when joining the cluster and can be viewed through show datanodes.

```
location = "/dc1/rack1"
show datanodes;
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| node_id | host      | attribute | status  | disk_free | location   | last_updated_time   |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| 1001    | localhost | hot       | healthy | 31.53 GB  | /dc1/rack1 | 2023-11-07 06:20:01 |
| 2001    | localhost | hot       | healthy | 73.64 GB  | /dc1/rack2 | 2023-11-07 06:20:01 |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
```
