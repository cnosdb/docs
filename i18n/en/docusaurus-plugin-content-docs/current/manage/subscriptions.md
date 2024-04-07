---
sidebar_position: 9
---

# Subscription Distribution Through Telegraf

:::tip
Only Enterprise Edition supports
:::

CnosDB 订阅可以将本地端点的数据写入到远程端点，可以和另一个 CnosDB 实例 或 Telegraf 一起使用。CnosDB 订阅使用流量复制的方式进行分发。

支持分发的流量：

- `/api/v1/write`

- `/api/v1/sql` 中的 `INSERT` 写入语句

> 将数据分发至 CnosDB 实例前，请提前创建表，否则将导致数据丢失

## Create Subscription

We can use `CREATE SUBSCRIPTION` to create a subscription.

### Syntax

```sql
CREATE SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_nmae>" ["<host_name>"]
```

:::note

`DESTINATIONS`：定义数据写入的目标位置，`ALL` 表示将数据写入所有的端点，`ANY` 表示轮询写入到多个端点，`end_point`表示写入的目标端点（CnosDB 实例的 `host` 以及配置文件中的`grpc_listen_port`，示例：`127.0.0.1:8903`）。

`ON`：设置被订阅列表以及表中的列。

`FILTER_BY`：使用条件过滤需要分发的记录，示例：`FILTER_BY WHERE station = 'XiaoMaiDao'`。

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

如果需要对数据进行过滤，可以增加关键字 `FILTER_BY`：

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
SHOW SUBSCRIPTION ON <database_name>
```

### Example

```sql
SHOW SUBSCRIPTION ON public
```

输出结果：

```sql
SUBSCRIPTION,DESTINATIONS,MODE
test,"127.0.0.1:8902,127.0.0.1:8903",ALL
```

## Drop Subscription

We can use `DROP SUBSCRIPTION` to drop the subscription.

### Syntax

```sql
DROP SUBSCRIPTION <subscription_name> ON <database_name>
```

### Example

```sql
DROP SUBSCRIPTION test ON public
```

## 将数据发送到 telegraf

> You can refer to [Telegraf](/eco-integration/index/telegraf#cnos-telegraf) to know how to use Telegraf and how to install Telegraf.

修改 `telegraf` 配置文件，增加如下配置，监听 `8803`端口

```toml
[[inputs.cnosdb]]
service_address = ":8803"
```

The data can be replicated to another CnosDB cluster by subscription, and the data replication will help to improve the fault tolerance and reliability of the whole system. CnosDB supports managing subscriptions through SQL, and CnosDB supports subscribing through Telegraf or another CnosDB cluster.

> 假设 telegraf 位置在 `127.0.0.1` 上。

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

现在，你可以使用 `telegraf` 将数据发送至任何位置。
