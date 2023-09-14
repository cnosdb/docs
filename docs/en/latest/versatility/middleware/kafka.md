---
title: Kafka
index: true
order: 1
---

As more and more application architectures move to microservice or serverless architectures, the number of applications and services is increasing every day. Users can process an increasing amount of time series data either through real-time aggregation or through computations whose outputs are measurements or metrics. Faced with the massive data generated, users can capture and observe the changes of the data in the system in a variety of ways. In the cloud-native environment, the most popular one is to use events.

Apache Kafka is a durable, high-performance messaging system that is also considered a distributed stream processing platform. It can be applied to many use cases including messaging, data integration, log aggregation, and metrics. As far as metrics are concerned, message trunks or proxies are not enough. While Apache Kafka is durable, it is not designed for running metrics and monitoring queries. This is precisely the strength of CnosDB.

In this article, we will mainly introduce how to implement a Kafka+Telegraf+CnosDB synchronous real-time streaming data acquisition and storage scheme in Ubuntu 22.04.2 LTS environment. In this operation, the CnosDB version is 2.3.0, the Kafka version is 2.5.1, and the Telegraf version is 1.27.1.

## Architecture Solution

By combining Kafka, Telegraf and CnosDB, a complete flow of data can be achieved:
1. Data Generation: Generate data using sensors, devices, or other data sources and send it to Kafka topics. 
2. Kafka Message Queue: Kafka receives and stores data streams to ensure data security and reliability. 
3. Telegraf Consumer: Telegraf, as a consumer of Kafka, subscribs to Kafka topics and fetches data streams.
4. CnosDB Data Storage: The preprocessed data is sent to CnosDB by Telegraf for time series data storage.

The overall application architecture looks like this:

![Kafka](/_static/img/kafka_to_cnosdb.png)

## Kafka

Apache Kafka is an open source distributed stream processing platform. It is designed for processing real-time data streams with high reliability, high throughput and low latency, and has been used by most companies. It can be used in a variety of ways, including:
- Stream Processing: It provides the event backbone by storing real-time events for aggregation, enrichment and processing.
- Metrics:  Apache Kafka becomes a centralized aggregation point for many distributed components or applications, such as microservices. These applications can send real-time metrics for use by other platforms, including CnosDB.
- Data Integration: Data and event changes can be captured and sent to Apache Kafka, which can be used by any application that needs to act on these changes.
- Log Aggregation:  Apache Kafka can act as the message backbone of a log-streaming platform to transform log blocks into data streams.

### Several Core Concepts

1. Broker: A Broker in Kafka is a server node in a Kafka cluster that stores and forwards messages, providing high availability, fault tolerance, and reliability.
2. Topics: A topic in Apache Kafka is a logical unit of storage, much like a table in a relational database. Topics are distributed through agents through partitions, providing scalability and elasticity.
3. Producers: A Producer publishes messages to a specific topic in Kafka. The producer can choose to send messages to a specific partition or let Kafka automatically determine the allocation policy.
4. Consumers: Consumers read messages from one or more partitions of a given topic. Consumers can be organized in different ways, such as unicast, multicast, consumer groups, etc.
5. Publish/Subscribe Pattern: A producer publishes messages to one or more topics, and a consumer can subscribe to one or more topics to receive and process messages from.

In simple words, when a client sends data to an Apache Kafka cluster instance, it has to send it to a certain topic.
In addition, when a client reads from the Apache Kafka cluster, it must read from the topic. The clients that send data to Apache Kafka become producers, and the clients that read data from the Kafka cluster become consumers. The data flow diagram is as follows:

![topic](/_static/img/kafka_topic.png)

##  Deploy Kafka

### Download and Install

1. Install JDK and Zookeeper environment

```shell
sudo apt install openjdk-8-jdk
sudo apt install zookeeper
```

2. Download and unzip the Kafka package

```shell
wget https://archive.apache.org/dist/kafka/2.5.1/kafka_2.12-2.5.1.tgz
tar -zxvf kafka_2.12-2.5.1.tgz
```

3. Enter the unzipped Kafka directory

```
cd  kafka_2.12-2.5.1
```

4. Modify the configuration file `$KAFKA_HOME/config/server.properties` (you can modify the port, log path and other configuration information as needed).


5. Save and close the editor. Run the following command to start Kafka:

> Kafka will run in the background and listen for connections through the default port 9092.
```shell
bin/kafka-server-start.sh config/server.properties
```

## Telegraf

Telegraf is an open source server agent for collecting, processing, and transmitting metric data for systems and applications. Telegraf supports a variety of input plug-ins and output plug-ins, and is able to integrate with a variety of different types of systems and services. It can collect metrics data from multiple sources such as system statistics, log files, API interfaces, message queues, and send it to various targets such as CnosDB, Elasticsearch, Kafka, Prometheus, etc. This makes Telegraf very flexible and adaptable to different monitoring and data processing scenarios.
- Lightweight: Telegraf is designed as a lightweight agent program with a relatively small footprint on system resources and can run efficiently in a variety of environments.
- Plug-in driver: Telegraf uses plug-ins to support various input and output functions. It provides a rich plugin ecosystem that covers a wide range of systems and services. Users can choose appropriate plug-ins to collect and transmit indicator data according to their own needs.
- Data processing and transformation: Telegraf has flexible data processing and transformation capabilities, which can filter, process, transform and aggregate the collected metrics data through a Plugin Chain to provide more accurate and advanced data analysis.

### Deploy Telegraf

1. Install Telegraf

```
sudo apt-get update && sudo apt-get install telegraf
```

2. Switch to the directory where the default configuration file of Telegraf is located `/etc/telegraf`

3. Modify the configuration file `telegraf.conf` (you can modify the configuration information as needed).

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

Parameters:
> Note: Other parameters can be kept consistent with the configuration example above.
```
url：CnosDB address and port
username：username for connecting to CnosDB
password：password for connecting to CnosDB
```

4. Uncomment the following configuration in the configuration file and modify it as needed

```toml
[[inputs.kafka_consumer]]
brokers = ["127.0.0.1:9092"]
topics = ["oceanic"]
data_format = "json"
```

Parameters:
> Note: Other parameters can be kept consistent with the configuration example above.
```shell
brokers：broker list of Kafka
topics：specify the topic to write to Kafka
data_format：format of the written data
```

5. Start Telegraf

```toml
telegraf -config /etc/telegraf/telegraf.conf
```

## CnosDB

### Deploy CnosDB

You can refer to ![CnosDB 安装](https://docs.cnosdb.com/en/latest/start/install.html).

## Integration

### Create Kafka Topic

1. Enter the bin folder of Kafka.
2. Run the following command to create a topic.

```shell
./kafka-topics.sh --create --topic oceanic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

### Python Simulates Writing Data to Kakfa

1. Write code

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

2. Run the code

```shell
python3 test.py
```

### View Data in Kafka

1. Run the following command to view the data of the specified topic.

```shell
./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic oceanic --from-beginning
```

![message](/_static/img/userlmn_188a723d58873beddee3c15e9cdb48f1.png)

### View Data in CnosDB

1. Use `cnosdb-cli` to connect to the database.

```shell
cnosdb-cli
```
2. Switch to the public database.

```shell
\c public
```

3. View data.

```shell
select * from kafka_consumer;
```

![cnosdb_result](/_static/img/userlmn_9ced0c8b3b1b7caea323148f994d16ee.png)