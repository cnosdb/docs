---
title: Fluink connector
order: 3
---

# Fluink connector

This connector provides sink to send data to CnosDB.

## Dependency Requirements

More than version of CnosDB 2.1.0 is required.
Java Version 1.8 or more.

First add dependencies to your project in：

```xml
<dependency>
    <groupId>com.cnosdb</groupId>
    <artifactId>flink-connector-cnosdb</artifactId>
    <version>1.0</version>
</dependency>
```

## Code Description

Create CnosDB Configuration

```java
CnosDBConfig cnosDBConfig = CnosDBConfig.builder()
                .url("http://localhost:8902")
                .database("db_flink_test")
                .username("root")
                .password("")
                .build();
```

Create CnosDBSink and add it to Stream Sink.

```java
dataStream.addSink (new CnosDBSink (cnosDBConfig);
```

CnosDBSin accepts the CnosDBPoint class, which is in fact the code in [LineProtocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/lin_protocol_tutorial/).

```java
New CnosDBPoint (measures, timestamp, tags, fields);
```

## Example Code

Example code at[此处](https://github.com/cnosdb/flink-connector-cnosdb/blob/main/src/examples/src/main/java/org/apache/flink/streaming/examples/cnosdb/CnosDBSinkExample.java)
