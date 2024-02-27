---
title: Road map
order: 3
---

# CnosDB 2.0 Roadmap

![RoadMap](/img/RoadMap.png)

## CnosDB 2.0 Overall Design Target

Design and develop a high-performance, high-compression and high-availability distribution cloud native time series database that meets the following goal：

### Time series database

1. Extensively, theoretically supported time series is unlimited and time-series expansion is thoroughly addressed and horizontal/vertically extended.
2. Compute storage separation, compute nodes and store nodes, allow independent scaling,seconds.
3. High performance storage and low cost, use high performance iostack to support graded storage using cloud and object storage.
4. The query engine supports vector queries.
5. Support multiple time series protocols for writing and query, providing external component import data.

### Cloud Native

1. Support for clouds and the integration of cloud infrastructure into their native ecology.
2. High availability, second level failure recovery, support clouds, and cross-zone disaster preparedness.
3. Native support for multiple tenants is paid in volume.
4. CDC, logs can be subscribed and distributed to other nodes.
5. More configurable items are provided to users to meet the complex demands of many public cloud users.
6. Synergies in the cloud to provide capacity to merge edges with public clouds
7. Integrate OLAP/CloudAI data ecosystem on clouds.

### CnosDB V 2.4.0 Design Target

CnosDB V 2.4.0 will implement：for adding time sequence, adding depressed algorithms, supporting updates and deletions and having primary copy groups, and CnosDB will provide an open source sequence database that can provide users with a higher performance, easier to operate, and more comprehensive data processing capability, with detailed features described below.

#### Empty function

Space types and space functions are supported by standard WKT and WKB patterns. Supported time and space functions include, but are not limited to, location calculations, area calculations, movement speed, etc.

#### Advanced Functions

Frequently used functions (first, last, max, min), date conversion class, monitoring class (gauges).

#### Damaged compression

- Deadband Compression ：is a data compression algorithm that reduces the frequency of sensor data updates, and reduces data transmission and storage costs.
- Swing Door Trending (SDT) Algorithm ：is a real-time data flow algorithm that can be used to process dynamic data sets and maintain data concentration elements by constantly resizing gates.

#### Support Schema change

Support Update, Delete, etc.

#### Add Primary Copy Group

Implement the exactly once word for processing stream data.
