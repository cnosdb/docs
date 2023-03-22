---
sidebar_position: 1
---


# 部署

在上一章中已经介绍了CnosDB的快速上手方法，本章将根据您平台的不同，向您介绍不同平台上运行安装CnosDB的方法。

- [单机版](./single.md)
    - [Docker](./single.md#docker)
    - [Kubernetes](./single.md#Kubernetes)
    - [源码安装](./single.md#源码安装)
- [集群版](./distributed.md)
- [存算分离](./separation_mod.md)
  - [设计目标](./separation_mod.md#设计目标)
  - [数据复制与共识](./separation_mod.md#数据复制与共识)
    - [复制组](./separation_mod.md#复制组replicaset)
    - [放置规则](./separation_mod.md#放置规则-place-rule)
    - [数据分隔策略](./separation_mod.md#数据分隔策略)
    - [基于 Quorum 机制的数据共识](./separation_mod.md#基于-quorum-机制的数据共识)
    - [数据写入](./separation_mod.md#数据写入)
    - [数据读取](./separation_mod.md#数据读取)
    - [更新冲突](./separation_mod.md#更新冲突)
  - [Meta 集群](./separation_mod.md#meta-集群)
  - [SQL 引擎](./separation_mod.md#sql-引擎)
  - [TSKV 索引与数据存储](./separation_mod.md#tskv-索引与数据存储)
    - [Index Engine](./separation_mod.md#index-engine)
    - [Data Engine](./separation_mod.md#data-engine)
  - [其他系统设计](./separation_mod.md#其他系统设计)