---
title: 开始
index: false
order: -6
---

# 开始

CnosDB是一款专用于收集、存储和处理时序数据的时序数据库，它是非关系型数据库，基于列式存储，支持高并发、高可用、高可靠、高可扩展、高性能、低成本的数据存储和查询。

CnosDB的设计目标是为了解决海量时序数据的存储和查询问题。时序数据的主要应用场景有运维、IOT、金融领域，从业务的特性上涵盖了联机业务和批处理业务，也就说时序数据库其实是覆盖了分析型（OLAP）和业务型（OLTP）两种业务场景。理论上讲，时序数据库应该属于 OLAP 的一个子类别，但同时由于时序数据库的读写模式足够的不同，其也经常被大家单独划分为一类。

在本章中，将向您介绍如何使用CnosDB，包括如何安装、启动、连接、创建数据库、创建表、插入数据、查询数据等基本操作，帮助您对于使用时序数据库有一个初步的了解。

本章包括以下内容：

- [安装](./install.md)
- [部署](./install.md#部署)
- [Docker安装](./install.md#docker安装)
- [下载示例数据](./install.md#下载示例数据)
- [导入数据](./install.md#导入数据)
- [数据查询](./install.md#数据查询)
- [快速开始](./quick_start.md)
- [示例数据](./quick_start.md#示例数据)
- [语法](./quick_start.md#语法)
- [SELECT子句](./quick_start.md#select-子句)
- [别名](./quick_start.md#别名)
- [LIMIT子句](./quick_start.md#limit-子句)
- [WITH子句](./quick_start.md#with-子句)
- [UNION子句](./quick_start.md#union-子句)
- [ORDER BY子句](./quick_start.md#order-by-子句)
- [IN](./quick_start.md#in)
- [EXPLAIN](./quick_start.md#explain)
- [DESCRIBE](./quick_start.md#describe)

