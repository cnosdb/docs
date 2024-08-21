---
title: Kafka
index: true
slug: /kafka
---

As more and more application architectures shift towards microservices or serverless structures, the number of applications and services is increasing every day.Users can process the ever-increasing time series data either through real-time aggregation or through calculations that output measurements or indicators.In the face of massive data generated, users can capture and observe the changes in the data in the system in various ways. In a cloud-native environment, one of the most popular ways is to use events.

Apache Kafka is a durable, high-performance messaging system, also considered a distributed streaming platform.It can be applied to many use cases, including message delivery, data integration, log aggregation, and metrics.As for the indicators, simply having a message backbone or agent is not enough.Although Apache Kafka is very durable, it is not designed for running metrics and monitoring queries.This is exactly the strength of CnosDB.

In this article, we will mainly introduce how to implement a solution for real-time acquisition and storage of streaming data using Kafka+Telegraf+CnosDB in the Ubuntu 22.04.2 LTS environment.In this operation, the CnosDB version is 2.3.0, Kafka version is 2.5.1, and Telegraf version is 1.27.1.

## Architectural design

By combining Kafka, Telegraf, and CnosDB, the complete data process can be achieved:

1. Data Generation: Using sensors, devices, or other data sources to generate data and send it to the Kafka topic.
2. Kafka message queue: Kafka receives and stores data streams, ensuring data security and reliability.
3. Telegraf Consumers: Telegraf acts as a consumer of Kafka, subscribes to Kafka topics, and retrieves data streams.
4. CnosDB data storage: Preprocessed data is sent by Telegraf to CnosDB for time series data storage.

The overall application architecture is as shown in the diagram:

![Kafka](/img/kafka_to_cnosdb.png)

## Kafka

Apache Kafka is an open-source distributed streaming platform designed for processing real-time data streams, characterized by high reliability, high throughput, and low latency, and is currently used by most companies.Its usage is very versatile, including:

- Stream processing: It provides the event backbone by storing real-time events for aggregation, enrichment, and processing.
- Indicator: Apache Kafka has become a central aggregation point for many distributed components or applications (such as microservices).These applications can send real-time metrics for use by other platforms, including CnosDB.
- Data integration: Data and event changes can be captured and sent to Apache Kafka, and any application that needs to take action on these changes can use them.
- Log aggregation: Apache Kafka can act as the backbone of a log stream platform, transforming log blocks into data streams.

### 几个核心概念

1. Instance (Broker): The Broker of Kafka is a server node in the Kafka cluster, responsible for storing and forwarding messages, providing high availability, fault tolerance, and reliability.
2. Topic: In Apache Kafka, a topic is a logical storage unit, similar to a table in a relational database.Topics are distributed through partitions via brokers, providing scalability and resilience.
3. Producer: Producers publish messages to the specified topic in Kafka.Producers can choose to send messages to a specific partition or let Kafka automatically determine the assignment strategy.
4. Consumer: A consumer reads messages from one or more partitions of a specified topic.Consumers can be organized in different ways, such as unicast, multicast, consumer groups, etc.
5. Publish-Subscribe Pattern: Refers to producers publishing messages to one or more topics, while consumers can subscribe to one or more topics to receive and process messages from them.

Simply put, when a client sends data to Apache Kafka cluster instances, it must send it to a topic.
In addition, when the client reads data from the Apache Kafka cluster, it must read from the topics.The client that sends data to Apache Kafka is called a producer, while the client that reads data from the Kafka cluster is called a consumer.The data flow diagram is as follows:

![topic](/img/kafka_topic.png)

## 部署 Kafka

### 下载并安装

1. 安装 JDK 和 Zookeeper 环境

```shell
sudo apt install openjdk-8-jdk
sudo apt install zookeeper
```

2. 下载并解压 Kafka 程序包

```shell
wget https://archive.apache.org/dist/kafka/2.5.1/kafka_2.12-2.5.1.tgz
tar -zxvf kafka_2.12-2.5.1.tgz
```

3. 进入解压后的 Kafka 目录

```
cd  kafka_2.12-2.5.1
```

4. 修改 `$KAFKA_HOME/config/server.properties` 的配置文件（可按需修改端口、日志路径等配置信息）

5. 保存并关闭编辑器。运行下面的命令来启动Kafka：

> Kafka 将在后台运行，并通过默认的 9092 端口监听连接。

```shell
bin/kafka-server-start.sh config/server.properties
```

## Telegraf

Telegraf 是一个开源的服务器代理程序，用于收集、处理和传输系统和应用程序的指标数据。Telegraf 支持多种输入插件和输出插件，并且能够与各种不同类型的系统和服务进行集成。它可以从系统统计、日志文件、API 接口、消息队列等多个来源采集指标数据，并将其发送到各种目标，如 CnosDB 、Elasticsearch、Kafka、Prometheus 等。这使得 Telegraf 非常灵活，可适应不同的监控和数据处理场景。

- 轻量级：Telegraf被设计为一个轻量级的代理程序，对系统资源的占用相对较小，可以高效运行在各种环境中。
- 插件驱动：Telegraf使用插件来支持各种输入和输出功能。它提供了丰富的插件生态系统，涵盖了众多的系统和服务。用户可以根据自己的需求选择合适的插件来进行指标数据的采集和传输。
- 数据处理和转换：Telegraf具有灵活的数据处理和转换功能，可以通过插件链（Plugin Chain）来对采集到的指标数据进行过滤、处理、转换和聚合，从而提供更加精确和高级的数据分析。

### 部署 Telegraf

1. 安装 Telegraf

```
sudo apt-get update && sudo apt-get install telegraf
```

2. 切换到 Telegraf 的默认配置文件所处目录 /etc/telegraf 下

3. 在配置文件 telegraf.config 中添加目标 OUTPUT PLUGIN

```toml
[[outputs.http]]
  url = "http://127.0.0.1:8902/api/v1/write?db=telegraf"
  timeout = "5s"
  method = "POST"
  username = "root"
  password = ""
  data_format = "influx"
  use_batch_format = true
  content_encoding = "identity"
  idle_conn_timeout = 10
```

按需修改的参数：

> 注意：其余参数可与上述配置示例中保持一致

```
url：CnosDB 地址和端口
username：连接 CnosDB 的用户名
password：连接 CnosDB 的用户名对应的密码
```

4. 在配置文件中将下面的配置注释放开，可按需修改

```
[[inputs.kafka_consumer]]
brokers = ["127.0.0.1:9092"]
topics = ["oceanic"]
data_format = "json"
```

参数：

> 注意：其余参数可与上述配置示例中保持一致

```shell
brokers：Kafka 的 broker list 
topics：指定写入 Kafka 目标的 topic
data_format：写入数据的格式
```

5. 启动 Telegraf

```toml
telegraf -config /etc/telegraf/telegraf.conf
```

## CnosDB

### 部署 CnosDB

详细操作请参考：![CnosDB 安装](https://docs.cnosdb.com/zh/latest/start/install)

## 整合

### Kafka 创建 Topic

1. 进入 kafka 的 bin 文件夹下
2. 执行命令，创建 topic

```shell
./kafka-topics.sh --create --topic oceanic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

### Python 模拟写入数据到Kakfa

1. 编写代码

```python
import time
import json
import random

from kafka import KafkaProducer

def random_pressure():
    return round(random.uniform(0, 10), 1)

def random_tempreture():
    return round(random.uniform(0, 100), 1)

def random_visibility():
    return round(random.uniform(0, 100), 1)

def get_json_data():
    data = {}

    data["pressure"] = random_pressure()
    data["temperature"] = random_temp_cels()
    data["visibility"] = random_visibility()

    return json.dumps(data) 

def main():
    producer = KafkaProducer(bootstrap_servers=['ip:9092'])

    for _ in rang(2000):
        json_data = get_json_data()
        producer.send('oceanic', bytes(f'{json_data}','UTF-8'))
        print(f"Sensor data is sent: {json_data}")
        time.sleep(5)


if __name__ == "__main__":
    main()
```

2. 运行 Python 脚本

```shell
python3 test.py
```

### 查看 Kafka topic 中的数据

1. 执行下面查看指定 topic 数据的命令

```shell
./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic oceanic --from-beginning
```

![message](/img/userlmn_188a723d58873beddee3c15e9cdb48f1.png)

### 查看同步到 CnosDB 中的数据

1. 使用工具连接到CnosDB

```shell
cnosdb-cli
```

2. 切换到指定库

```shell
\c public
```

3. 查看数据

```shell
select * from kafka_consumer;
```

![cnosdb\_result](/img/userlmn_9ced0c8b3b1b7caea323148f994d16ee.png)
