---
title: Subscriptions
order: 9
---

CnosDB can manage subscriptions by SQL.

## Create Subscription

We can use `CREATE SUBSCRIPTION` to create a subscription.

### Syntax

```
CREATE SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_nmae>" ["<host_name>"]
```

Note: host_name is the host_name of the grpc service of the CnosDB node subscribed to this node.
All the data written to CnosDB will be copied and distributed to all the remote or local CnosDB nodes that are recorded.

### Example

For example, the partial configuration of the CnosDB node that accepts the distributed data is as follows:

```
[cluster]
meta_service_addr = ["127.0.0.1:8901"]

grpc_listen_port = 8903
```

The SQL for creating the subscription in the current CnosDB is as follows:

```
CREATE SUBCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903"
```

At this time, if any data is written to the current CnosDB node, the data will be synchronized copied and forwarded to `127.0.0.1:8903`.

## Alter Subscription

We can use `ALTER SUBCRIPTION` to alter the subscription.

### Syntax

```
ALTER SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_nmae>" ["<host_name>"]。
```

### Example

```
ALTER SUBCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913"
```

You can modify host_name in this way, and note that modifying by `ALTER SUBSCRIPTION` overwrites it directly. If you do not want to delete host_name, ALL previous host_name needs to be added after `DESTINATIONS ALL`.

## 显示订阅

We can use `SHOW SUBCRIPTION` to show the subscription information.

### Syntax

```
SHOW SUBCRIPTION ON <database_name>
```

### Example

```
SHOW SUBCRIPTION ON public
```

```
Subscription,DESTINATIONS,Concurrency
test,"127.0.0.1:8902,127.0.0.1:31002",ALL
```

## Drop Subscription

We can use `DROP SUBSCRIPTION` to drop the subscription.

### Syntax

```
DROP SUBSCRIPTION <subscription_name> ON <database_name>
```

### Example

```
DROP SUBSCRIPTION test ON public
```

