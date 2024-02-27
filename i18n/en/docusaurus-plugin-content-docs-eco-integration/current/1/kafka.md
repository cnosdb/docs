---
title: Kafka
index: true
slug: /kafka
---

The number of applications and services is increasing on a daily basis as the structure of applications moves towards microservices or no server structures.Users can process time series data that are increasing in quantities by aggregating in real time or by output to measure or indicator.In the face of the resulting volume of data, users can capture and observe changes in the system in a number of ways, the most popular of which in cloud native environments is the use of events.

Apache Kafka is a durable, high-performance message system and is also considered to be a distributed flow processing platform.It can be applied to many uses, including messenger transmission, data integration, log aggregation and indicators.In the case of indicators, it is not enough to have a backbone or proxy.While Apache Kafka is durable, it is not designed to run indicators and monitor queries.This is precisely the strength of CnosDB.

This page will focus on how to implement a real-time access to stream data and store for Kafka+Telegraf+CnosDB in Ubuntu 22.04.2 LTS environment.For this operation, CnosDB version is 2.3.0, Kafka version 2.5.1, Telegraf version 1.27.1.

## Architecture

By combining these Kafka, Telegraf and CnosDB, the complete process： of data can be achieved

1. Data generated：uses sensors, devices or other data sources to generate data and send it to the Kafka theme.
2. Kafka message queue：Kafka receives and stores data streams to ensure data security and reliability.
3. Telegraf consumer：Telegraf as a consumer of Kafka, subsists on Kafka themes and gets data streams.
4. CnosDB data storage：pre-processed data from Telegraf to CnosDB for time series data storage.

Overall application architecture like diagram：

![Kafka](/img/kafka_to_cnosdb.png)

## Kafka

Apache Kafka is an open source distribution processing platform designed to handle real-time data flows, characterized by high reliability, high throughput and low delays, and is now used by most companies.It is used in a very diverse way, including：

- Stream handling：by storing real-time events to collect, enrich and handle them.
- Indicator：Apache Kafka is a centralized point for many distributed components or applications (e.g. microservices).These applications can send real-time indicators for use by other platforms, including CnosDB.
- Data integration：can capture data and event changes and send them to Apache Kafka, and can be used by any application that needs to take action on these changes.
- Log aggregation：Apache Kafka can be used as the backbone of the message on the log platform, converting the log blocks to a data stream.

### Several core concepts

1. An instance (Broker)：Kafka Broker is a server node in the Kafka cluster, which stores and relays messages, providing high availability, tolerance and reliability.
2. Topic in theme (Topic)：Apache Kafka, is a logical storage unit, like the table of the relational database.Topics are distributed through divisions through proxies, providing outreach and flexibility.
3. Producer：Producer releases the message to the specified theme in Kafka.Producers can choose to send messages to a specific partition, or if Kafka can automatically decide on the distribution strategy.
4. Consumer (Consumer)：consumers read messages from one or more partitions of a given theme.Consumers can organize in different ways, such as one-broadcasting, multi-broadcasting, consumer groups, etc.
5. Post-Subscription Mode：means the producer sends a message to one or more themes, and consumers can subscribe to one or more themes from which to receive and process messages.

Simply put, when the client sends the data to the Apache Kafka cluster example, it must send it to a theme.
In addition, when clients read data from the Apache Kafka cluster, it must read from the theme.Clients who send data to Apache Kafka become producers, while clients who read data from the Kafka cluster become consumers.Data flow chart below：

![topic](/img/kafka_topic.png)

## Deployment Kafka

### Download and Install

1. Install JDK and Zokeeper environments

```shell
sudo apt install openjdk-8-jdk
sudo apt install zookeeper
```

2. Download and extract the Kafka package

```shell
wget https://archive.apache.org/disturb/kafka/2.5.1/kafka_2.12-2.5.1.tgz
tar -zxvf kafka_2.12-2.5.1.tgz
```

3. Enter the kafka directory after extracting

```
cd kafka_2.12-2.5.1
```

4. 修改 `$KAFKA_HOME/config/server.properties` 的配置文件（可按需修改端口、日志路径等配置信息）

5. Save and close editor.Run the following command to start Kafka：

> Kafka will run in the background and listen to connections via the default port 9092 port.

```shell
bin/kafka-server-start.sh config/server.properties
```

## Telegraf

Telegraf is an open source server proxy for the collection, processing and transmission of indicator data from systems and applications.Telegraf supports multiple input and output plugins and enables integration with different types of systems and services.It collects indicator data from multiple sources such as system statistics, log files, API interfaces and message queues and sends it to various targets such as CnosDB, Elasticsearch, Kafka, Prometheus and others.This makes Telegraf very flexible and adaptable to different surveillance and data-processing scenarios.

- Light：Telegraf is designed as a lightweight proxy, a relatively small use of system resources that can operate efficiently in various settings.
- Plugin driver：Telegraf uses plugin to support various input and output features.It provides a rich ecosystem of plugins covering a wide range of systems and services.Users can select appropriate plugins to capture and transfer indicator data according to their needs.
- Data processing and conversion of：Telegraf has flexible data processing and conversion functions that can be filled, processed, converted and aggregated through the plugin chain (Plugin Chain), thus providing more accurate and advanced data analysis.

### Deployment of Telegraf

1. Install Telegraf

```
sudo apt-get update && sudo apt-get install telegraf
```

2. Switch to the directory /etc/telegraf to the default profile of Telegraf

3. Add an OUTPUT PLUIN to the configuration file telegraf.config

```toml
[[outputs.http]
  url = "http://127.0.0. :8902/api/v1/write? b=telegraf"
  timeout = "5"
  method = "POST"
  username = "root"
  password = ""
  data_format = "influx"
  use_batch_format = true
  content_encoding = "identity"
  idle_conn_timeout = 10
```

Modify parameter： as required

> Note that the remaining：parameters can be consistent with the above configuration example

```
url：CnosDB address and port
username：username username
password：password for connection to CnosDB
```

4. Release the configuration notes below in the configuration file to change them as needed.

```
[[inputs.kafka_consumer]
brokers = ["127.0.0.1:9092"]
topics = ["oceanic"]
data_format = "json"
```

Parameter：

> Note that the remaining：parameters can be consistent with the above configuration example

```shell
brokers：ka's broker list 
topics：specify the format for writing to Kafka objects topic
data_format：
```

5. Launch Telegraf

```toml
telegraf - config /etc/telegraf/telegraf.conf
```

## CnosDB

### Deployment of CnosDB

For more information see：![CnosDB Install](https://docs.cnosdb.com/latest/start/install)

## Integration

### Kafka Create Topic

1. Go to kafka bin folder
2. Execute command, create topic

```shell
./kafka-topics.sh -create --topic oceanic --bootstrap-server localhost:9092 --partitions 1 --reply-factor 1
```

### Python mock writing data to Kakfa

1. Write Code

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

2. Run Python script

```shell
python3 test.py
```

### View data in Kafka topic

1. Execute the command below to view the specified topic data

```shell
./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic oceanic --from-beginning
```

![message](/img/userlmn_188a723d58873beddee3c15e9cdb48f1.png)

### View data synced to CnosDB

1. Connect to CnosDB with a tool

```shell
cnosdb-cli
```

2. Switch to specified library

```shell
\c Public
```

3. View Data

```shell
select* from kafka_consumer;
```

![cnosdb\_result](/img/userlmn_9ced0c8b3b1b7caea323148f994d16ee.png)
