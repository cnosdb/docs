---
sidebar_position: 12
---

# 数据分布策略

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

### 感知DC策略

副本数据尽可能放置在不同dc上
名称：dc_aware
参数：dc列表

所有副本尽可能放置在dc1-4的机器上

```SQL
create placement_policy policy3 WITH rule dc_aware dc 'dc1,dc2,dc3,dc4';
```

**需要注意**

副本放置策略隶属于租户，同一个租户下，策略名字唯一。

## 策略关联

创建/修改Database时可以指定放置策略的名字进行关联，如果不指定放置策略按照现有逻辑处理，就是不感知dc与rack。

```SQL
create database db with replica 2 placement_policy 'policy1';
2.3.4版本: alter database db with placement_policy 'policy2';
2.3.5版本: alter database db set placement_policy 'policy2';
```

## 策略查看

可以通过系统表来查看当前租户下的策略和使用情况

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

## 策略的修改和删除

当没有database使用策略时，可以进行drop/alter

```SQL
drop placement_policy policy1;
alter placement_policy policy2 SET rule dc_aware dc 'dc1,dc2,dc3,dc4';
```

## Node标签

节点在加入集群的时候通过配置文件指定所属的dc和rack，并且可以通过show datanodes进行查看

```
location = "/dc1/rack1"
show datanodes;
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| NODE_ID | HOST      | ATTRIBUTE | STATUS  | DISK_FREE | LOCATION   | LAST_UPDATED_TIME   |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
| 1001    | localhost | HOT       | HEALTHY | 31.53 GB  | /dc1/rack1 | 2023-11-07 06:20:01 |
| 2001    | localhost | HOT       | HEALTHY | 73.64 GB  | /dc1/rack2 | 2023-11-07 06:20:01 |
+---------+-----------+-----------+---------+-----------+------------+---------------------+
```
