---
title: 数据分布策略
order: 11
---

:::tip
仅企业版支持
:::

对于重要的线上生产，需要支持跨区域级别的容灾。CnosDB的多副本特性搭配合理的数据分布策略可以满足这个目标。

## 数据分布的两个维度
rack：机架维度，一般指同一个机房的同一个机架上的数据节点。

dc：  数据中心维度，一般指一个机房、一个数据中心。

## 策略类型

### 简单策略
副本数据放置同一个rack上
名称：simple
参数：dc、rack
```SQL
create placement_policy policy_name WITH rule simple dc 'dc1' rack 'rack1'  -- 所有副本都放置在dc1的rack1的机器上
```

### 感知Rack策略
副本数据尽可能放置在同一个dc的不同rack上
名称：rack_aware 
参数：dc、以及rack列表
```SQL
create placement_policy policy_name WITH rule rack_aware dc 'dc1' rack 'rack1,rack2,rack3,rack4' -- 所有副本都放置在dc1的rack1-4的不同机架上
```

### 感知DC策略
副本数据尽可能放置在不同dc上
名称：dc_aware 
参数：dc列表
```SQL
create placement_policy policy_name WITH rule dc_aware dc 'dc1,dc2,dc3,dc4' -- 所有副本尽可能放置在dc1-4的机器上
```

**需要注意**

副本放置策略隶属于租户，同一个租户下，策略名字唯一。

## 策略关联
创建/修改Database时可以指定放置策略的名字进行关联，如果不指定放置策略按照现有逻辑处理，就是不感知dc与rack。
```SQL
create database db with replica 2 placement_policy policy_name
alter database db set placement_policy policy_name
```

## 策略查看
可以通过系统表来查看当前租户下的策略和使用情况
```SQL
select * from information_schema.placement_policys;
+---------+-----------+-----+-------------------------+------------+
| name    | type      | dc  | rack                    | in_use_dbs |
+---------+-----------+-----+-------------------------+------------+
| policy1 | RACKAWARE | dc1 | rack1,rack2,rack3,rack4 | db         |
+---------+-----------+-----+-------------------------+------------+
```

## 策略的修改和删除
当没有database使用策略时，可以进行drop/alter
```SQL
drop placement_policy policy1
alter placement_policy policy1 WITH rule dc_aware dc 'dc1,dc2,dc3,dc4'
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
