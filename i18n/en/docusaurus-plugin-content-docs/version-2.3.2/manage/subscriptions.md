---
title: Subscription Distribution Through Telegraf
order: 12
---

:::tip
Enterprise only support
:::

The data can be replicated to another CnosDB cluster by subscription, and the data replication will help to improve the fault tolerance and reliability of the whole system. CnosDB supports managing subscriptions through SQL, and CnosDB supports subscribing through Telegraf or another CnosDB cluster.Subscription Distribution Through Telegraf

## Create Subscription

We can use `CREATE SUBSCRIPTION` to create a subscription.

### Syntax

```
CREATE SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_nmae>" ["<host_name>"]
```

1. Configure the output plug-in `http` to distribute messages. If there is another CnosDB instance with an HTTP listening port number of `127.0.0.1:8912`, we can forward the subscription message to that instance with the following configuration.

`host_name` indicates the `host_name` of the grpc service of the CnosDB node that subscribing to this node.
All the data written to the specified database, CnosDB, will be copied and distributed to the host node.

1. `ALL` Indicates the data replication mode. Currently, only `ALL` is supported.

### Example

For example, the partial configuration of the CnosDB node that accepts the distributed data is as follows:

```
[cluster]
meta_service_addr = ["127.0.0.1:8901"]

grpc_listen_port = 8903
```

The SQL for creating the subscription in the current CnosDB is as follows:

```
CREATE SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903"
```

At this time, if any data is written to the current CnosDB node, the data will be synchronized copied and forwarded to `127.0.0.1:8903`.

## Alter Subscription

We can use `ALTER SUBSCRIPTION` to alter the subscription.

### Syntax

```
ALTER SUBSCRIPTON <subscription_name> ON <database_name> DESTINATIONS ALL "<host_name>" ["<host_name>"]
```

### Example

```
ALTER SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913"
```

You can modify host_name in this way, and note that modifying by `ALTER SUBSCRIPTION` overwrites it directly. If you do not want to delete host_name, ALL previous host_name needs to be added after `DESTINATIONS ALL`.

## Show Subscription

We can use `SHOW SUBSCRIPTION` to show the subscription information.

### Syntax

```
SHOW SUBSCRIPON ON <database_name>
```

### Example

```
SHOW SUBSCRIPTION ON public
```

Output Result：

```
SUBSCRIPTION,DESTINATIONS, MODE
test,"127.0.0.1:8902,127.0.1:8903", ALL
```

## Drop Subscription

We can use `DROP SUBSCRIPTION` to drop the subscription.

### Syntax

```
DROP SUBSCRIPTON <subscription_name> ON <database_name>
```

### Example

```
DROP SUBSCRIPTION test ON public
```

## Synchronization of isomer data via Telegraf

### Install Telegraf

You can refer to [Telegraf](/eco-integration/index/telegraf#cnos-telegraf) to know how to use Telegraf and how to install Telegraf.

### Send data to InfluxDB

> InfluxDB version in this instance is 1.8.10.
>
> Telegraf is installed locally (accessible through 127.0.0.1).

Supposing that we've started CnosDB and created a subscription, set `DESTINATIONS` to `127.0.0.1:8803` :

```sh
> SHOW SUBSCRIPTION ON public;
+--------------+----------------+-------------+
| Subscription | DESTINATIONS   | Concurrency |
+--------------+----------------+-------------+
| sub_tr_1003  | 127.0.0.1:8803 | ALL         |
+--------------+----------------+-------------+
```

Add the input plug-in `cnosdb` in the configuration file of Telegraf, and configure the listening address and port number as follows:

```toml
[[inputs.cnosdb]
service_address = ":8803"
```

Configure **Output Plugins** to implement distribution messages.Assuming that the HTTP listener port number `127.0.0.1:8086` is `127.0.01:8086` and creating a database `test_db`, then we can use configuration： below

```toml
[[outputs.http]]
url = "http://127.0.0.1:8912/api/v1/write?db=destination"
timeout = "5s"
method = "POST"
username = "admin"
password = "admin"
data_format = "influx"
use_batch_format = true
content_encoding = "identity"
idle_conn_timeout = 10
```

Next, write on CnosDB, data will be forwarded to the InfluxDB database `test_db`.

First CnosDB command line client `cnosdb-cli` executes：

```
CREATE TABair (
    vision DOUBLE,
    temperature DOUBLE,
    pressure DOUBLE,
    TAGS(station)
;

INSERT INTO air (time, station, visibility, temperature, pressure) VALUES('2023-01-01 01:10:00', 'XiaoMaiDao', 79, 80, 63);
INSERT INTO air (time, station, visibility, temperature, pressure) VALUES('2023-01-01 01:20:00', 'XiaoMaiDao', 80, 60, 63);
INSERT INTO air (time, station, visibility, temperature, pressure) VALUES('2023-01-01 01:30:00', 'XiaoMaiDao', 81, 70, 61);
```

then execute： in InfluxDB command line client `influx`

```
use test_db;

SELECT * FROM air;
```

Get Results：

```
name: air
time                host        pressure station    temperature visibility
----                ----        -------- -------    ----------- ----------
1683643874641792000 devpc.local 63       XiaoMaiDao 80          79
1683643877346013000 devpc.local 63       XiaoMaiDao 60          80
1683643880454956000 devpc.local 61       XiaoMaiDao 70          81
```
