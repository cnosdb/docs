---
sidebar_position: 2
---

# Get Started

CnosDB is a time-series database dedicated to the collection, storage and processing of sequential data. It is a non-relational database, based on column storage, and supports high concurrency, high availability, high reliability, high scalability, high performance, low cost data storage and query.

CnosDB的设计目标是为了解决海量时序数据的存储和查询问题。时序数据的主要应用场景有运维、IOT、金融领域，从业务的特性上涵盖了联机业务和批处理业务，也就说时序数据库其实是覆盖了分析型（OLAP）和业务型（OLTP）两种业务场景。CnosDB was designed to solve the storage and query problems of massive temporal data. The main application scenarios of time series data include operation and maintenance, IOT, and finance fields, covering online business and batch business in terms of business characteristics. In other words, time series database actually covers two types of business scenarios: analytical (OLAP) and business (OLTP). In theory, sequential databases should belong to a subcategory of OLAP, but at the same time, sequential databases are often divided into a separate category because of their different read and write modes.

In this chapter, you will be shown how to use CnosDB, including how to install, start, connect, create a database, create a table, insert data, query data and other basic operations, to help you have a preliminary understanding of the use of timing databases.

This chapter includes the following:

- [Install](./install.md)
- [Deploy](./install.md#deploy)
- [Docker Install](./install.md#docker-install)
- [Download Sample Data](./install.md#download-sample-data)
- [Import Data](./install.md#import-data)
- [Data Query](./install.md#data-query)
- [Quick Start](./quick_start.md)
- [Sample Data](./quick_start.md#sample-data)
- [Syntax](./quick_start.md#syntax)
- [SELECT Clause](./quick_start.md#select-clause)
- [Alias](./quick_start.md#alias)
- [LIMIT Clause](./quick_start.md#limit-clause)
- [WITH Clause](./quick_start.md#with-clause)
- [UNION Clause](./quick_start.md#union-clause)
- [ORDER BY Clause](./quick_start.md#order-by-clause)
- [IN](./quick_start.md#in)
- [EXPLAIN](./quick_start.md#explain)
- [DESCRIBE](./quick_start.md#describe)
