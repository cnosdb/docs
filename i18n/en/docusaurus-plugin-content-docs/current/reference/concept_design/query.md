---
title: Query engines
order: 2
---

## SQL Engine

We use [DataFusion](https://arrow.apache.org/datafusion/), DataFusion is an expanded query implementation framework, written with Rust and using [Apache Arrow](https://arrow.apache.org/) as its memory format.DataFusion supports SQL and DataFrame API to build logical query plans, as well as query optimizers and execution engines that use threads in parallel to partition data sources.Has the following strengths:

1. High performance: Using the memory models of Rust and Arrow, it has high performance.
2. Strong extensibility: Allows almost any point in its design to be extended and customized with a needle-specific use case.
3. High quality: DataFusion and Arrow ecology are widely tested and can be used as production systems.
4. Fusion of big data ecology: As part of the Apache Arrow ecosystem (Arrow, Flight, Parquet), it is better integrated with large data ecosystems.

By extending DataFusion data sources and providing custom SQL statements, the query process for data under distributed scenarios is as follows:

![query](/img/query_data_path.jpg)
