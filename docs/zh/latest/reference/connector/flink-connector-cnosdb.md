# Flink 连接器

该连接器提供了 sink ，可以把数据发送到CnosDB。

## 依赖需求

需要 CnosDB 2.1.0 以上版本。
需要 Java 1.8 以上版本。


首先添加依赖到您的项目中
```xml
<dependency>
    <groupId>com.cnosdb</groupId>
    <artifactId>flink-connector-cnosdb</artifactId>
    <version>1.0</version>
</dependency>
```

## 代码说明

创建 CnosDB 配置
```java
CnosDBConfig cnosDBConfig = CnosDBConfig.builder()
                .url("http://localhost:8902")
                .database("db_flink_test")
                .username("root")
                .password("")
                .build();
```

创建 CnosDBSink 并添加到 Stream 的 Sink 中

```java
dataStream.addSink(new CnosDBSink(cnosDBConfig);
```

CnosDBSink 接受的是 CnosDBPoint 类，该类其实就是 [LineProtocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) 格式的代码实现。

```java
new CnosDBPoint(measurement, timestamp, tags, fields);
```

## 示例代码

示例代码在[此处](https://github.com/cnosdb/flink-connector-cnosdb/blob/main/src/examples/src/main/java/org/apache/flink/streaming/examples/cnosdb/CnosDBSinkExample.java)

