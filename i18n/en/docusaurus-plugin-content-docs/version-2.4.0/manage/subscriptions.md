---
sidebar_position: 5
---

# Subscription Distribution Through Telegraf

:::tip
Enterprise only support
:::

CnosDB subscription can write local endpoint data to remote endpoints and can be used with another CnosDB instance or Telegraf.CnosDB Subscription for distribution using data copiing.

Traffic Support for Distribution：

- `/api/v1/write`

- `INSERT` in `/api/v1/sql`

> Please create tables in advance before distributing data to the CnosDB instance or cause data loss

## Create Subscription

We can use `CREATE SUBSCRIPTION` to create a subscription.

### Syntax

```sql
CREATE SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_nmae>" ["<host_name>"]
```

:::note

`DESTINATIONS`：defines the destination of the data written, `ALL` to write the data to all endpoints, `ANY` to write to multiple endpoints, `end_point` to write to the destination point (`host` for CnosDB instance and `grpc_listen_port`, example：`127.0.0.1:8903`).

`ON`：settings are subscribed to lists and columns.

`FILTER_BY`：uses conditions to filter records for distribution, example：\`FILTER_BY WHERE station = 'XiaoMaiDao'.

:::

### Example

For example, the partial configuration of the CnosDB node that accepts the distributed data is as follows:

```sql
[cluster]
meta_service_addr = ["127.0.0.1:8901"]

grpc_listen_port = 8903
```

The SQL for creating the subscription in the current CnosDB is as follows:

```sql
CREATE SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903"
```

At this time, if any data is written to the current CnosDB node, the data will be synchronized copied and forwarded to `127.0.0.1:8903`.

If filtering data is required, add the keyword `FILTER_BY`：

```sql
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

## Alter Subscription

We can use `ALTER SUBSCRIPTION` to alter the subscription.

### Syntax

```sql
ALTER SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_name>" ["<host_name>"]
```

### Example

```sql
ALTER SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913"
```

You can modify host_name in this way, and note that modifying by `ALTER SUBSCRIPTION` overwrites it directly. If you do not want to delete host_name, ALL previous host_name needs to be added after `DESTINATIONS ALL`.

## Show Subscription

We can use `SHOW SUBSCRIPTION` to show the subscription information.

### Syntax

```sql
SHOW SUBSCRIPON ON <database_name>
```

### Example

```sql
SHOW SUBSCRIPTION ON public
```

Output Result：

```sql
SUBSCRIPTION,DESTINATIONS, MODE
test,"127.0.0.1:8902,127.0.1:8903", ALL
```

## Drop Subscription

We can use `DROP SUBSCRIPTION` to drop the subscription.

### Syntax

```sql
DROP SUBSCRIPTON <subscription_name> ON <database_name>
```

### Example

```sql
DROP SUBSCRIPTION test ON public
```

## Send data to telegraf

> You can refer to [Telegraf](/eco-integration/index/telegraf#cnos-telegraf) to know how to use Telegraf and how to install Telegraf.

Change the `telegraf` configuration to add the following configuration to listen on the `8803` port

```toml
[[inputs.cnosdb]
service_address = ":8803"
```

The data can be replicated to another CnosDB cluster by subscription, and the data replication will help to improve the fault tolerance and reliability of the whole system. CnosDB supports managing subscriptions through SQL, and CnosDB supports subscribing through Telegraf or another CnosDB cluster.

> Assume that the telegraf position is on `127.0.0.1`.

```sql
Supposing that we've started CnosDB and created a subscription, set `DESTINATIONS` to `127.0.0.1:8803` :
```

Subscriptions

```sh
> SHOW SUBSCRIPTION ON public;
+--------------+----------------+-------------+
| Subscription | DESTINATIONS   | Concurrency |
+--------------+----------------+-------------+
| sub_tr_1003  | 127.0.0.1:8803 | ALL         |
+--------------+----------------+-------------+
```

You can now send data to any location using `telegram`.
