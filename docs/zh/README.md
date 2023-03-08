---
title: 主页
icon: config
order: 1
---

CnosDB 是一款高性能、高压缩率、高易用性的开源分布式时序数据库。主要应用场景为物联网，工业互联网，车联网，IT运维。所有代码均已在 [GitHub](https://github.com/cnosdb/cnosdb) 开源。

我们在设计上充分利用了时序数据特点，包括结构化数据、无事务、较少的删除更新、写多读少等等，因此相比其它时序数据库，CnosDB 有以下特点：
* **高性能**：CnosDB 解决了时间序列膨胀，理论上支持时间序列无上限，支持沿时间线的聚合查询，包括按等间隔划分窗口的查询、按某列枚举值划分窗口的查询、按相邻时序记录的时间间隔长度划分窗口。具备对最新数据的缓存能力，并且可以配置缓存空间，能够高速获取最新数据。
* **简单易用**：CnosDB 提供清晰明了的接口，简单的配置项目，支持标准SQL，轻松上手，与第三方工具生态无缝集成，拥有便捷的数据访问功能。支持 schemaless （"无模式"）的写入方式，支持历史数据补录（含乱序写入）
* **云原生**： CnosDB 有原生的分布式设计、数据分片和分区、存算分离、Quorum 机制、Kubernetes 部署和完整的可观测性，具有最终一致性，能够部署在公有云、私有云和混合云上。提供多租户的功能，有基于角色管理的权限分配。支持计算层无状态增减节点，储存层水平扩展提高系统存储容量。


本章着重介绍目前 CnosDB 的基础知识，快速上手，实现原理，生态集成以及云原生计划等等，让大家对 CnosDB 有一个充分的认识。

## 快速开始

本章节介绍了 CnosDB 的基本操作，包含写入数据，查询数据等。

- [快速开始](./guide/get_started/index.md)
  - [启动服务](./guide/get_started/start_service.md)
  - [查询示例](./guide/get_started/sql_sample.md)

## 安装CnosDB

本章节介绍了如何使用以下其中之一安装和运行CnosDB。

- [安装CnosDB](./guide/deploy/index.md)
  - [Docker](./guide/deploy/install_cnosdb.md#docker)
  - [Kubernetes](./guide/deploy/install_cnosdb.md#Kubernetes)
  - [源码安装](./guide/deploy/install_cnosdb.md#源码安装)

## 集成

本章节介绍了CnosDB的生态集成与应用集成

- [集成](./guide/development/index.md)
  - [应用集成](./guide/development/application.md)
  - [生态集成](./guide/development/ecology.md)
  - [Arrow Flight SQL](./guide/development/flight_sql.md)
  - [REST API](./guide/development/rest_api.md)

## 管理

本章节介绍了CnosDB单机版与集群版的管理与监控

- [管理](./guide/management/index.md)
  - [配置](./guide/management/config.md)
  - [运维管理](./guide/management/operation_maintenance.md)
  - [权限管理](./guide/management/authority_management.md)
  - [集群管理](./guide/management/cluster.md)
  - [集群监控指标](./guide/management/metrics.md)

## 参考手册

本章节介绍了CnosDB的基本概念、数据类型、SQL语法、函数等，以及客户端工具和基准测试结果。

- [参考手册](./guide/reference/index.md)
  - [SQL语法参考手册](./guide/reference/sql.md)
  - [客户端CLI](./guide/reference/tools.md)
  - [性能测试](./guide/reference/benchmark.md)

## 设计原理

本章节介绍了CnosDB的架构设计、数据存储、查询引擎、计算引擎、分布式协调等。

- [设计原理](./guide/design/index.md)
  - [基本概念](./guide/design/concept.md)
  - [实现原理](./guide/design/implementation.md)
  - [云原生](./guide/design/cloud_native.md)

## 版本发布

本章节介绍了CnosDB的版本发布历史。

- [版本发布](./guide/release/index.md)
  - [版本发布历史](./guide/release/changelist.md)
  - [版本发布计划](./guide/release/roadmap.md)

