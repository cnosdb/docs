---
title: Flink Connector
order: 3
---

# Flink Connector

This connector provides a sink that can send data to CnosDB.

## Dependency requirements

Requires CnosDB 2.1.0 or later.
Requires Java 1.8 or later.


First add the dependency to your project:
```xml
<dependency>
    <groupId>com.cnosdb</groupId>
    <artifactId>flink-connector-cnosdb</artifactId>
    <version>1.0</version>
</dependency>
```

## Code description

Create CnosDB configuration

```java
CnosDBConfig cnosDBConfig = CnosDBConfig.builder()
                .url("http://localhost:8902")
                .database("db_flink_test")
                .username("root")
                .password("")
                .build();
```

Create CnosDBSink and add it to the Sink of Stream. 

```java
dataStream.addSink(new CnosDBSink(cnosDBConfig);
```

CnosDBSink accepts CnosDBPoint, which is actually the code implementation of [LineProtocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/).

```java
new CnosDBPoint(measurement, timestamp, tags, fields);
```

## Sample code

Sample code is [here](https://github.com/cnosdb/flink-connector-cnosdb/blob/main/src/examples/src/main/java/org/apache/flink/streaming/examples/cnosdb/CnosDBSinkExample.java)

