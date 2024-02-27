---
title: RoadMap
order: 3
---

# CnosDB 2.0 Roadmap

![RoadMap](/img/RoadMap.png)

## The Overall Design Objectives of CnosDB 2.0

Design and develop a high performance, high compression ratio, high availability of distributed cloud native time series database to meet the following goals:

### Time series database

1. Scalability: Theoretically supports an unlimited number of time series, completely solving the problem of time series inflation, and supports horizontal/vertical scaling.
2. Computing and storage separation: Compute nodes and storage nodes can be independently scaled up or down, with sub-second scalability.
3. High-performance storage and low cost: Utilizes a high-performance I/O stack, supports tiered storage using cloud disks and object storage.
4. The query engine supports vector queries.
5. Supports multiple time series protocols to write and query, providing external component import data.

### Cloud Native

1. Support cloud native, support the full use of cloud infrastructure to integrate into cloud native ecology.
2. High availability, second-level failure recovery, support multi-cloud, cross-regional disaster preparedness.
3. Native support for multiple tenants is paid in volume.
4. CDC (Change Data Capture): Logs can be subscribed to and distributed to other nodes.
5. Provide users with more configuration items to meet multiple-scenario complex requirements for public cloud users.
6. Cloud-edge collaboration: Provides the ability to integrate edge devices with public clouds.
7. Blend the OLAP / CloudA data ecosystem on the cloud.

### The Design Objectives of CnosDB 2.4

CnosDB V version 2.4.0 will achieve: add timing functions, add lossy compression algorithms, support update and delete operations and have a master replication group, this version of CnosDB will be able to provide users with a higher performance, easier to operate, more comprehensive data processing capabilities of the open source timing database, described in detail below.

#### The Space-Time Function

Support space type and space-time function, space type will be supported in the standard WKT and WKB mode, supported space-time function including but not limited to position calculation, area calculation, moving speed calculation, etc.

#### Stream QUERY statements are persisted and are cancelled by [KILL QUERY](#kill-query).

Common functions (first, last, max, min), date conversion class, monitoring class (gauges calculation).

#### Lossy Compression

- Deadband Compression: A data compression algorithm used to reduce the frequency of sensor data updates and reduce data transmission and storage costs.
- Swinging Door Trending (SDT)  Algorithm: A real-time data stream processing algorithm that can be used to process dynamic data sets, maintaining the number of elements in the data set by constantly adjusting the size of the gate.

#### Support Schema change

Support Update、Delete operations.

#### Add Master-Slave replicaset

Implements exactly once semantics for processing stream data.
