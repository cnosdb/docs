---
title: 快速开始
icon: launch
order: 2
---

# 快速开始

CnosDB是一款专用于收集、存储和处理时序数据的时序数据库，它是非关系型数据库，基于列式存储，支持高并发、高可用、高可靠、高可扩展、高性能、低成本的数据存储和查询。

CnosDB的设计目标是为了解决海量时序数据的存储和查询问题。时序数据的主要应用场景有运维、IOT、金融领域，从业务的特性上涵盖了联机业务和批处理业务，也就说时序数据库其实是覆盖了分析型（OLAP）和业务型（OLTP）两种业务场景。理论上讲，时序数据库应该属于 OLAP 的一个子类别，但同时由于时序数据库的读写模式足够的不同，其也经常被大家单独划分为一类。

在本章中，将向您介绍如何使用CnosDB，包括如何安装、启动、连接、创建数据库、创建表、插入数据、查询数据等基本操作，帮助您对于使用时序数据库有一个初步的了解。

本章包括以下内容：

- [启动服务](./start_service.md)
  - [快速开始](./start_service.md#快速开始)
  - [Docker安装](./start_service.md#docker安装)
  - [下载示例数据](./start_service.md#下载示例数据)
  - [导入数据](./start_service.md#导入数据)
  - [数据查询](./start_service.md#数据查询)
- [查询示例](./sql_sample.md)
  - [示例数据](./sql_sample.md#示例数据)
  - [SELECT子句](./sql_sample.md#select-子句)
  - [别名](./sql_sample.md#别名)
  - [LIMIT子句](./sql_sample.md#limit-子句)
  - [WITH子句](./sql_sample.md#with-子句)
  - [UNION子句](./sql_sample.md#union-子句)
  - [ORDER BY子句](./sql_sample.md#order-by-子句)
  - [IN](./sql_sample.md#in)
  - [EXPLAIN](./sql_sample.md#explain)
  - [DESCRIBE](./sql_sample.md#describe)


