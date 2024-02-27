---
sidebar_position: 1
---

# Introduction

CnosDB is an open source distributed time series database with high performance, high compression rate and high ease of use. The main application scenarios are IoT, Industrial Internet, Telematics, IT operations and maintenance. All the code has been open-sourced in GitHub.The main application scenes are the Internet of Things, the Industrial Internet, the CarLog and IT.All code is open in [GitHub](https://github.com/cnosdb/cnosdb).

We design to take full advantage of the characteristics of temporal data, including structured data, no transactions, less delete updates, write more read less, etc. Therefore, compared with other temporal databases, CnosDB has the following characteristics:

- **High performance**: CnosDB solves time series inflation, theoretically supports time series without upper limit, and supports aggregation query along the time line, including query by equal interval window, query by a column enumeration value window, and window by the length of time interval of adjacent time series records. It has the ability to cache the latest data, and the cache space can be configured to get the latest data at high speed.Cache capability for the latest data and can be configured to access the latest data at a fast pace.
- **Easy to use**: CnosDB provides a clear interface, easy to configure items, supports standard SQL, easy to start, seamlessly integrated with third-party tools, and has convenient data access functions. It supports schemaless ("schemaless") writing method and historical data replenishment (including chaotic writing).Support schemaless ("No Mode"), history data patch (written inactively)
- **Cloud-native**: CnosDB has a native distributed design, data sharding and partitioning, store-and-counter separation, Quorum mechanism, Kubernetes deployment and full observability with ultimate consistency, and can be deployed on public, private and hybrid clouds. Provides multi-tenant capabilities with role-based management for privilege assignment. It supports stateless node addition and deletion in the compute layer and horizontal scaling in the storage layer to increase system storage capacity.Provides multi-tenant functionality, with distribution of competencies based on role management.Supporting compute layer inactivity nodes and storage level extension increases system storage capacity.

This chapter focuses on the current basics of CnosDB, quick start, implementation principles, ecological integration and cloud-native plans, etc., to give you a full understanding of CnosDB.

## Get Started

This chapter introduces the basic operations of CnosDB, including writing data, querying data, etc.

- [Get Started](./start)
  - [Install](./start/install.md)
  - [Quick Start](./start/quick_start.md)

## Develop

This section describes how to integrate CnosDB into your application.

- [Develop](./develop)
  - [Connect to CnosDB](./develop/api.md)
  - [Write Data](./develop/write.md)
  - [Query Data](./develop/query.md)
  - [Downsampling](./develop/downsampling.md)

## Deploy

This section describes how to install and run the single or cluster CnosDB, as well as the compute storage separation architecture for CnosDB.

- [Deploy](./deploy)

## Manage

This chapter describes the management and monitoring of CnosDB standalone edition and cluster edition.

- [Manage](./manage)
  - [Node Migration](./manage/migration.md)
  - [Tenant Resource Limit](./manage/resource_limit.md)
  - [Cluster Expansion](./manage/cluster_expansion.md)
  - [Tiered Storage](./manage/tiered_storage.md)
  - [Alarm Management](./manage/alarm_manage.md)
  - [Monitor](./manage/monitor.md)
  - [Tenant and Permission](./manage/tenant.md)
  - [Subscriptions](./manage/subscriptions.md)
  - [Data Migration](./manage/datax.md)
  - [Node Information](./manage/show_node.md)

# Reference

This chapter introduces the implementation principles of CnosDB, including storage engine, query engine, compression algorithm, etc. This chapter also introduces how to use CnosQL.

- [Reference](./reference)
  - [Design](./reference/concept_design)
  - [REST API](./reference/res_api.md)
  - [Connector](reference/connector/README.md)
  - [SQL](/reference/sql.md)
  - [Configure](./reference/config.md)
  - [Tools](./reference/tools.md)
  - [Benchmark](./reference/performance.md)
