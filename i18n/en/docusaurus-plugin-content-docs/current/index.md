---
sidebar_position: 1
---

# Introduction

CnosDB is an open-source distribution time-series database for high performance, high compression and high usability.The main application scenarios are Internet of Things, Industrial Internet, Connected Vehicles, and IT Operations and Maintenance.All code has been open sourced on [GitHub](https://github.com/cnosdb/cnosdb).

We design to take full advantage of the characteristics of temporal data, including structured data, no transactions, less delete updates, write more read less, etc. Therefore, compared with other temporal databases, CnosDB has the following characteristics:

- **High Performance**: CnosDB solves time series inflation, theoretically supports time series with no upper bound, and supports aggregated queries along the timeline, including segmentation of windows by equal intervals.With the ability to cache the latest data and configurable cache space, you can get the latest data at high speed.
- **Easy to use**: CnosDB provides a clear and concise interface, simple configuration of projects, support for standard SQL, easy to get started, seamless integration with third-party tool ecosystems, and convenient data access features.Supports schemaless ("mode-less") writing, supports historical data replacement (including chaotic writing).
- **Cloud Native**: CnosDB has a native distributed design, data slicing and partitioning, store-and-account separation, Kubernetes deployment, and full observability, can be deployed on public, private, and hybrid clouds.Provide multi-tenant functionality with role-based permission allocation.The compute layer is stateless, and horizontal scaling at the storage layer improves system storage capacity.
