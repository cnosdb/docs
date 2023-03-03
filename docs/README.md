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

CnosDB is an open source distributed time series database with high performance, high compression rate and high ease of use. The main application scenarios are IoT, Industrial Internet, Telematics, IT operations and maintenance. All the code has been open-sourced in [GitHub](https://github.com/cnosdb/cnosdb).

We design to take full advantage of the characteristics of temporal data, including structured data, no transactions, less delete updates, write more read less, etc. Therefore, compared with other temporal databases, CnosDB has the following characteristics:


- **High performance**: CnosDB solves time series inflation, theoretically supports time series without upper limit, and supports aggregation query along the time line, including query by equal interval window, query by a column enumeration value window, and window by the length of time interval of adjacent time series records. It has the ability to cache the latest data, and the cache space can be configured to get the latest data at high speed.
- **Easy to use**: CnosDB provides a clear interface, easy to configure items, supports standard SQL, easy to start, seamlessly integrated with third-party tools, and has convenient data access functions. It supports schemaless ("schemaless") writing method and historical data replenishment (including chaotic writing).
- **Cloud-native**: CnosDB has a native distributed design, data sharding and partitioning, store-and-counter separation, Quorum mechanism, Kubernetes deployment and full observability with ultimate consistency, and can be deployed on public, private and hybrid clouds. Provides multi-tenant capabilities with role-based management for privilege assignment. It supports stateless node addition and deletion in the compute layer and horizontal scaling in the storage layer to increase system storage capacity.

This chapter focuses on the current basics of CnosDB, quick start, implementation principles, ecological integration and cloud-native plans, etc., to give you a full understanding of CnosDB.

## QuickStart
This chapter introduces the basic operations of CnosDB, including writing data, querying data, etc.
 - [Quick start](./en/quick_start.html)

## Run the installation
This section describes how to install and run CnosDB using one of the following.
- [Docker](./en/install_cnosdb.md#docker)
- [Starting with the source code](./en/install_cnosdb.md#source-code-installation)

## Basics
This section introduces some basic concepts of CnosDB.
- [Basic concents](./en/concept.md)

# Application Integration
This section describes how to integrate CnosDB into your application.
- [Rust](./en/application/application.md#rust)
- [Golang](./en/application/application.md#golang)
- [Java](./en/application/application.md#java)
- [HTTP API](../en/guide/application/api.md)

## SQL Manual
This section contains the following.
- [SQL](./en/query/sql.md)
- [functions](./en/query/select_function.md)

## Eco Integration
This section contains the following.
- [grafana](./en/ecology/grafana.md)
- [telegraf](./en/ecology/telegraf.md)

## Cloud
This section contains the following.
- Cloud

## Version release
This section contains the following.
- [Release History](./en/release/changelist.md)
- [Evolutionary Route](./en/release/roadmap.md)

## Implementation Principles
This chapter introduces the implementation principles of CnosDB, including storage engine, query engine, compression algorithm, etc.
- [System Architecture](./en/design/arch.md)
- [Configuration](./en/design/config.md)
- [Compression Algorithm](./en/design/compress.md)
- [Reference]
