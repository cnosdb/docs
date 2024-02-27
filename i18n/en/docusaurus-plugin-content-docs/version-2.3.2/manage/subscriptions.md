---
title: Subscription management
order: 9
---

:::tip
Enterprise only support
:::

Data copy to another CnosDB cluster can be copied through subscription, which will help improve the system's tolerance and reliability.CnosDB supports subscription via SQL administration, CnosDB supports subscription via Telegraf or another CnosDB cluster.

## Create subscription

Subscription can be created using the `CREATE SUBSCRIPTION`.

### Syntax

```
CREATE SUBSCRIPTON <subscription_name> ON <database_name> DESTINATIONS ALL "<host_name>" ["<host_name>"]
```

1. host_name for grpc service for CnosDB node subscribed to this node.

All data writing to the CSosDB specified database will be copied and distributed to the host node.

1. ALL indicates the pattern of data copying. Currently only ALL is supported.

### Example

Assign part of the CnosDB node that accepts distribution of data below：

```
[cluster]
meta_service_addr = ["127.0.0.1:8901"]

grpc_listen_port = 8903
```

then create a SQL subscription in current CnosDB below：

```
CREATE SUBSCRIPTON ON public DESTINATIONS ALL "127.0.0.1:8903";
```

If data are written to the current CnosDB node at this time, the data will be copied to `127.0.0.1:8903`.

## Update subscription

Subscription can be updated using `ALTER SUBSCRIPTION`.

### Syntax

```
ALTER SUBSCRIPTON <subscription_name> ON <database_name> DESTINATIONS ALL "<host_name>" ["<host_name>"]
```

### Example

```
ALTER SUBSCRIPTON ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913";
```

This method can be used to modify host_name. Note that changes made via `ALTER SUBSCRIPTION` are directly overwritten, if you don't want to delete the previous host_name, `DESTINATIONS ALL` will need to add all previous host_names.

## Show Subscription

You can use `SHOW SUBSCRIPTION` to view subscription information.

### Syntax

```
SHOW SUBSCRIPON ON <database_name>
```

### Example

```
SHOW SUBSCRIPTON public;
```

Output Result：

```
SUBSCRIPTION,DESTINATIONS, MODE
test,"127.0.0.1:8902,127.0.1:8903", ALL
```

## Delete subscription

The subscription can be deleted using `DROP SUBSCRIPTION`.

### Syntax

```
DROP SUBSCRIPTON <subscription_name> ON <database_name>
```

### Example

```
DROP SUBSCRIPTION ON public;
```

## Synchronization of isomer data via Telegraf

### Telegraf Installation

For information on Telegraf's usage methods and how to install Telegraf, see [Telegraf section](/eco-integration/telegraf#cnos-telegraf).

### Send data to InfluxDB

> InfluxDB version in this instance is 1.8.10.
>
> Telegraf is installed locally (accessible through 127.0.0.1).

Assume that we have started CnosDB and created a subscription on the database `public`, set `DESTINATIONS` to `127.0.0.1:8803`：

```sh
> SHOW SUBSCRIPON ON public;
+-------------------------+
| subdescription | destinations | mode |
+------------+
| sub_tr_1003 | 127. .0.1:8803 | ALL |
+-------- + --+
```

Add **input plugins** to Telegraf configuration file and configure the listening IP and port following：

```toml
[[inputs.cnosdb]
service_address = ":8803"
```

Configure **Output Plugins** to implement distribution messages.Assuming that the HTTP listener port number `127.0.0.1:8086` is `127.0.01:8086` and creating a database `test_db`, then we can use configuration： below

```toml
[[outputs.http]
url = "http://127.0.0. :8086/write? b=test_db"
timeout = "5"
method = "POST"
username = ""
password = ""
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
