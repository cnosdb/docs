---
sidebar_position: 1
---

# Introduction

CnosDB is an open-source distribution time-series database of high performance, high compression and ease of use.The main application scenes are the Internet of Things, the Industrial Internet, the CarLog and IT.All code is open in [GitHub](https://github.com/cnosdb/cnosdb).

Our design takes full advantage of the chronological data characteristics, including structured data, anonymity, fewer deletions updates, writing multiple readings, etc. Therefore, CnosDB has the following features： compared to other time series databases.

- **High performance**：CnosDB solves time series expansion, theoretically supports an unlimited time series, supports aggregated queries along the timeline including interval window queries, queries by enumerating windows by a list value, and time interval by proximity time.Cache capability for the latest data and can be configured to access the latest data at a fast pace.
- **Easy to use**：CnosDB provides a clear interface, simple configuration items, support standard SQL, easy handling, seamless integration with third-party tools, and easy data access.Support schemaless ("No Mode"), history data patch (written inactively)
- **Cloud**：CnosDB has original distribution designs, data fragments and partitions, separation of deposits, Quorum mechanisms, Kubernetes deployment and full observability, and is ultimately consistent and capable of being deployed on public, private and mixed clouds.Provides multi-tenant functionality, with distribution of competencies based on role management.Supporting compute layer inactivity nodes and storage level extension increases system storage capacity.

This chapter focuses on the current basics of CnosDB, quick handling, implementation doctrine, ecological integration, and cloud-origin schemes, so that there is a full understanding of CnosDB.

## Start

This section describes the basic operations of CnosDB, which include writing data, querying data, etc.

- [开始](./start)
  - [安装](./start/install.md)
  - [快速开始](./start/quick_start.md)

## Development

This section describes the development guide for CnosDB, which contains various APIs on how to use CnosDB and how to connect to CnosDB for data writing and query.

- [开发](./development)
  - [Connect to CnosDB](./develop/api.md)
  - [数据写入](./develop/write.md)
  - [数据查询](./develop/query.md)
  - [降采样](./develop/downsampling.md)

## Deployment

This section describes how to install and run single or cluster versions of CnosDB, and CnosDB for computing storage separation structures for CnosDB.

- [部署](./employ)

## Manage

This section describes the management and monitoring of CnosDB Single and Cluster Versions.

- [管理](./manage)
  - [备份与还原](./manage/backup_restore.md)
  - [租户资源限制](./manage/resource_limit.md)
  - [分级存储](./manage/tierred_storage.md)
  - [告警管理](./manage/alarm_manage.md)
  - [监控指标](./manage/monitor.md)
  - [租户和权限](./manage/tenant.md)
  - [订阅管理](./manage/subscriptions.md)
  - [数据迁移](./manage/datax.md)
  - [节点管理](./manage/node_manage.md)
  - [V2.3到2.4升级](./manage/upgrade_v2.3_to_v2.4.md)

# Guides

This section describes the implementation principles of CnosDB, and the ecological integration of CnosDB.

- [指南](./reference)
  - [设计](/reference/concept_design)
  - [REST API](./reference/res_api.md)
  - [连接器](/reference/README.md)
  - [SQL](/reference/sql.md)
  - [配置文件](/reference/config.md)
  - [工具](/reference/tools.md)
  - [性能测试](/reference/performance.md)
