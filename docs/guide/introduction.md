---
title: 介绍
icon: home
order: 1
---

CnosDB 是一款高性能、高压缩率、高易用性的开源分布式时序数据库。主要应用场景为物联网，工业互联网，车联网，IT运维。所有代码均已在 [GitHub](https://github.com/cnosdb/cnosdb) 开源。

我们在设计上充分利用了时序数据特点，包括结构化数据、无事务、较少的删除更新、写多读少等等，因此相比其它时序数据库，CnosDB 有以下特点：
* **高性能**：CnosDB 解决了时间序列膨胀的，理论支持时间序列无上限，支持沿时间线的聚合查询，包括按等间隔划分窗口的查询、按某列枚举值划分窗口的查询、按相邻时序记录的时间间隔长度划分窗口。具备对最新数据的缓存能力，并且可以配置缓存空间，能够高速获取最新数据。
* **简单易用**：CnosDB 提供清晰明了的接口，简单的配置项目，支持标准SQL，轻松上手，与第三方工具生态无缝集成，拥有便捷的数据访问功能。支持 schemaless （"无模式"）的写入方式，支持历史数据补录（含乱序写入）
* **云原生**： CnosDB 有原生的分布式设计、数据分片和分区、存算分离、Quorum 机制、Kubernetes 部署和完整的可观测性，具有最终一致性，能够部署在公有云、私有云和混合云上。提供多租户的功能，有基于角色管理的权限分配。支持计算层无状态增减节点，储存层水平扩展提高系统存储容量。


本章着重介绍目前 CnosDB 的基础知识，快速上手，实现原理，生态集成以及云原生计划等等，让大家对 CnosDB 有一个充分的认识。

## 基础知识
本章节主要介绍 CnosDB 的一些基本概念。

- [基本概念](concept.md#基本概念)

## 运行安装
本章节介绍了如何使用以下其中之一安装和运行 CnosDB。

- [Dokcer](quick_start.md#Docker)
- [从源码开始](quick_start.md#从源码开始)

## 基本操作
本章节介绍了 CnosDB 的基本操作，包含写入数据，查询数据等。
- [基本操作](QUICK_START.md#基本操作)

## 应用集成

本章节介绍了如何把 CnosDB 集成到您的程序里。
- [Rust](application/application.md#rust)
- [Golang](application/application.md#golang)
- [Java](application/application.md#java)
- [HTTP API](application/api.md)

## SQL手册
本章节包含以下内容：
- [SQL](query/sql.md)
- [函数](query/function.md)

## 生态集成
本章节包含以下内容：
- [grafana](ecology/grafana.md)
- [telegraf](ecology/telegraf.md)
  
## Cloud
本章节包含以下内容：
- [Cloud](cloud.md)

## 版本发布

本章节包含以下内容：
- [发布历史](release/changelist.md)
- [演进路线](release/roadmap.md)

## 实现原理
本章节介绍了 CnosDB 的实现原理，包括存储引擎，查询引擎，压缩算法等。
- [系统架构](design/arch.md)
- [配置](design/config.md)
- [压缩算法](design/compress.md)
- [参考文献]
