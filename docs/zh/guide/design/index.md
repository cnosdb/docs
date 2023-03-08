---
title: 设计原理
icon: creative
order: 6
---

# 设计原理

本章将介绍 CnosDB 的设计原理以及云原生的相关知识。

- [设计原理](./index.md)
    - [基本概念](./concept.md)
      - [前言](./concept.md#前言)
      - [时间序列(Time Series)](./concept.md#时间序列--time-series-)
      - [数据模型](./concept.md#数据模型)
    - [实现原理](./implementation.md)
      - [设计目标](./implementation.md#设计目标)
      - [数据复制与共识](./implementation.md#数据复制与共识)
      - [Meta 集群](./implementation.md#meta-集群)
      - [SQL 引擎](./implementation.md#sql-引擎)
      - [tskv 索引与数据存储](./implementation.md#tskv-索引与数据存储)
      - [其他系统设计](./implementation.md#其他系统设计)
      - [压缩算法](./implementation.md#压缩算法)
      - [DELTA](./implementation.md#delta)
      - [GORILLA](./implementation.md#gorilla)
      - [QUANTILE](./implementation.md#quantile)
      - [BITPACK](./implementation.md#bitpack)
      - [字符串压缩算法](./implementation.md#字符串压缩算法)
      - [Quorum算法](./implementation.md#quorum算法)
    - [云原生](./cloud_native.md)
      - [云原生基本概念](./cloud_native.md#云原生基本概念)
      - [云原生数据库的优势](./cloud_native.md#云原生数据库的优势)
      - [共享存储架构 VS 无共享存储架构](./cloud_native.md#共享存储架构-vs-无共享存储架构)
      - [多租户模型 VS 单租户模型](./cloud_native.md#多租户模型-vs-单租户模型)
      - [Serverless VS Dedicate](./cloud_native.md#serverless-vs-dedicate)