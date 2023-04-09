---
icon: home
title: Home
heroImage: /logo.png
heroText: CnosDB
tagline: CnosDB
actions:
- text: Docs
link: /guide/
type: primary
copyright: false
---

# Home
::: tip
This is a testing version of the document, and we are continuously optimizing and improving it. If there are any deficiencies, please let us know.
:::
CnosDB is an open source distributed time series database with high performance, high compression rate and high ease of use. The main application scenarios are IoT, Industrial Internet, Telematics, IT operations and maintenance. All the code has been open-sourced in GitHub.

We design to take full advantage of the characteristics of temporal data, including structured data, no transactions, less delete updates, write more read less, etc. Therefore, compared with other temporal databases, CnosDB has the following characteristics:


- **High performance**: CnosDB solves time series inflation, theoretically supports time series without upper limit, and supports aggregation query along the time line, including query by equal interval window, query by a column enumeration value window, and window by the length of time interval of adjacent time series records. It has the ability to cache the latest data, and the cache space can be configured to get the latest data at high speed.
- **Easy to use**: CnosDB provides a clear interface, easy to configure items, supports standard SQL, easy to start, seamlessly integrated with third-party tools, and has convenient data access functions. It supports schemaless ("schemaless") writing method and historical data replenishment (including chaotic writing).
- **Cloud-native**: CnosDB has a native distributed design, data sharding and partitioning, store-and-counter separation, Quorum mechanism, Kubernetes deployment and full observability with ultimate consistency, and can be deployed on public, private and hybrid clouds. Provides multi-tenant capabilities with role-based management for privilege assignment. It supports stateless node addition and deletion in the compute layer and horizontal scaling in the storage layer to increase system storage capacity.

This chapter focuses on the current basics of CnosDB, quick start, implementation principles, ecological integration and cloud-native plans, etc., to give you a full understanding of CnosDB.


## Get Started

This chapter introduces the basic operations of CnosDB, including writing data, querying data, etc.

- [Get Started](./en/start)
    - [Install](./en/start/install.md)
    - [Quick Start](./en/start/quick_start.md)

## Develop

This section describes how to integrate CnosDB into your application.

- [Develop](./en/develop)
    - [Connect to CnosDB](./en/develop/api.md)
    - [Write Data](./en/develop/write.md)
    - [Query Data](./en/develop/query.md)

## Deploy

This section describes how to install and run the single or cluster CnosDB, as well as the compute storage separation architecture for CnosDB.

- [Deploy](./en/deploy)
    - [Single](./en/deploy/single.md)
    - [Distributed](./en/deploy/distributed.md)
    - [Separation Mod](./en/deploy/separation_mod.md)

## Manage

This chapter describes the management and monitoring of CnosDB standalone edition and cluster edition。

- [Manage](./en/manage)
    - [Upgrade](./en/manage/upgrade.md)
    - [Node Migration](./en/manage/migration.md)
    - [Cluster Expansion](./en/manage/cluster_expansion.md)
    - [Cluster Shrink](./en/manage/cluster_shrink.md)
    - [Backup and Restore](./en/manage/backup.md)
    - [Monitor](./en/manage/monitor.md)
    - [Tenants and Permissions](./en/manage/tenant.md)

# Reference

This chapter introduces the implementation principles of CnosDB, including storage engine, query engine, compression algorithm, etc. This chapter also introduces how to use CnosQL.

- [Reference](./en/reference)
    - [Design](./en/reference/design.md)
    - [REST API](./en/reference/rest_api.md)
    - [Connector](en/reference/connector/README.md)
    - [SQL](./en/reference/sql.md)
    - [Configure](./en/reference/config.md)
    - [Tools](./en/reference/tools.md)
    - [Eco-integration](./en/reference/ecosystem.md)
    - [Benchmark](./en/reference/performance.md)

## Releases

This section describes the version release history of CnosDB.

- [Releases](./en/release)
    - [Change List](./en/release/changelist.md)
    - [Roadmap](./en/release/roadmap.md)
