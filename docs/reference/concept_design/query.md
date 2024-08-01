---
title: 查询引擎
sidebar_position: 4
---

## SQL 引擎

查询引擎我们使用了 [DataFusion](https://arrow.apache.org/datafusion/)，DataFusion 是一个可扩展的查询执行框架，用 Rust 编写，使用 [Apache Arrow](https://arrow.apache.org/) 作为其内存格式。DataFusion 支持用于构建逻辑查询计划的 SQL 和 DataFrame API 以及能够使用线程对分区数据源并行执行的查询优化器和执行引擎。具有如下优点：

1. 高性能：利用 Rust 和 Arrow 的内存模型，具有较高的性能。
2. 扩展性强：允许在其设计中的几乎任何点进行扩展，可以针特定用例进行定制。
3. 高质量：DataFusion 和 Arrow 生态都经过广泛测试，可用作生产系统。
4. 融合大数据生态：作为 Apache Arrow 生态系统（Arrow、Flight、Parquet）的一部分，与大数据生态系统融合的较好。

我们通过扩展 DataFusion 的数据源并且提供自定义 SQL 语句，在分布式场景下数据的查询流程如下：

![query](/img/query_data_path.jpg)
