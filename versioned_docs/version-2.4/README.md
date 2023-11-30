---
title: 主页
icon: home
index: false
order: -9
---

# 主页

CnosDB 是一款高性能、高压缩率、高易用性的开源分布式时序数据库。主要应用场景为物联网，工业互联网，车联网，IT运维。所有代码均已在 [GitHub](https://github.com/cnosdb/cnosdb) 开源。

我们在设计上充分利用了时序数据特点，包括结构化数据、无事务、较少的删除更新、写多读少等等，因此相比其它时序数据库，CnosDB 有以下特点：
* **高性能**：CnosDB 解决了时间序列膨胀，理论上支持时间序列无上限，支持沿时间线的聚合查询，包括按等间隔划分窗口的查询、按某列枚举值划分窗口的查询、按相邻时序记录的时间间隔长度划分窗口。具备对最新数据的缓存能力，并且可以配置缓存空间，能够高速获取最新数据。
* **简单易用**：CnosDB 提供清晰明了的接口，简单的配置项目，支持标准SQL，轻松上手，与第三方工具生态无缝集成，拥有便捷的数据访问功能。支持 schemaless （"无模式"）的写入方式，支持历史数据补录（含乱序写入）
* **云原生**：CnosDB 有原生的分布式设计、数据分片和分区、存算分离、Quorum 机制、Kubernetes 部署和完整的可观测性，具有最终一致性，能够部署在公有云、私有云和混合云上。提供多租户的功能，有基于角色管理的权限分配。支持计算层无状态增减节点，储存层水平扩展提高系统存储容量。


本章着重介绍目前 CnosDB 的基础知识，快速上手，实现原理，生态集成以及云原生计划等等，让大家对 CnosDB 有一个充分的认识。

## 开始

本章节介绍了 CnosDB 的基本操作，包含写入数据，查询数据等。

- [开始](./start)
  - [安装](./start/install.md)
  - [快速开始](./start/quick_start.md)

## 开发

本章节介绍了 CnosDB 的开发指南，包含如何使用 CnosDB 的各种API，如何连接 CnosDB 进行数据的写入与查询。

- [开发](./develop)
  - [Connect to CnosDB](./develop/api.md)
  - [数据写入](./develop/write.md)
  - [数据查询](./develop/query.md)
  - [降采样](./develop/downsampling.md)

## 部署

本章节介绍了如何使用以下其中之一安装和运行单机版或集群版 CnosDB，以及 CnosDB 的计算存储分离架构。

- [部署](./deploy)

## 管理

本章节介绍了 CnosDB 单机版与集群版的管理与监控。

- [管理](./manage)
  - [备份与还原](./manage/backup.md)
  - [节点迁移](./manage/migration.md)
  - [租户资源限制](./manage/resource_limit.md)
  - [集群扩容](./manage/cluster_expansion.md)
  - [分级存储](./manage/tiered_storage.md)
  - [告警管理](./manage/alarm_manage.md)
  - [监控指标](./manage/monitor.md)
  - [租户和权限](./manage/tenant.md)
  - [订阅管理](./manage/subscriptions.md)
  - [数据迁移](./manage/datax.md)
  - [节点管理](./manage/node_manage.md)

# 指南

本章节介绍了 CnosDB 的实现原理，以及 CnosDB 的生态集成。

- [指南](./reference)
  - [设计](./reference/concept_design)
  - [REST API](./reference/rest_api.md)
  - [连接器](./reference/README.md)
  - [SQL](./reference/sql.md)
  - [配置文件](./reference/config.md)
  - [工具](./reference/tools.md)
  - [性能测试](./reference/performance.md)
