---
sidebar_position: 5
---

# Subscription Management

:::tip
Only Enterprise Edition supports
:::

CnosDB subscription can write data from local endpoint to remote endpoint, can be used with another CnosDB instance or Telegraf.CnosDB distributes subscriptions using traffic replication.

Supported distributed traffic:

- `/api/v1/write`

- `INSERT` in `/api/v1/sql`

> Before distributing data to the CnosDB instance, please create the table in advance, otherwise data loss will occur.

## Create Subscription

We can use `CREATE SUBSCRIPTION` to create a subscription.

### Syntax

```sql
CREATE SUBSCRIPTION <subscription_name> 
ON <database_name> 
DESTINATIONS <ALL|ANY> "<end_point>" ["<end_point>"]
[ON <table_name>(time, [tag_name, ...], <field_name>, [field_name, ..]) 
[FILTER_BY <Expr>]];
```

:::note

`DESTINATIONS`: defines the destination location where data is written, `ALL` indicates data is written to all endpoints, `ANY` indicates round-robin writing to multiple endpoints, `end_point` indicates the target endpoint for writing (the `host` of the CnosDB instance and the `grpc_listen_port` in the configuration file, for example: `127.0.0.1:8903`).

`ON`: Set the subscribed list and columns in the table.

`FILTER_BY`: Filter the records that need to be distributed using conditions, for example: `FILTER_BY WHERE station = 'XiaoMaiDao'`.

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

If you need to filter the data, you can add the keyword `FILTER_BY`:

```sql
create subscription test 
on public
DESTINATIONS ALL "127.0.0.1:8903"
on air(time,station,pressure) 
FILTER_BY where station = 'XiaoMaiDao';
```

## Alter Subscription

We can use `ALTER SUBSCRIPTION` to alter the subscription.

### Syntax

```sql
ALTER SUBSCRIPTION <subscription_name> 
ON <database_name> 
DESTINATIONS <ALL|ANY> "<end_point>" ["<end_point>"]
[ON <table_name>(time, [tag_name, ...], <field_name>, [field_name, ..]) 
[FILTER_BY <Expr>]];
```

### Example

```sql
ALTER SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913";
```

You can modify `end_point` in this way, and note that modifying by `ALTER SUBSCRIPTION` overwrites it directly. If you do not want to delete the previous `end_point`, all previous `end_point` needs to be added after `DESTINATIONS ALL`.

## Show Subscription

We can use `SHOW SUBSCRIPTION` to view subscription information.

### Syntax

```sql
SHOW SUBSCRIPTION ON <database_name>
```

### Example

```sql
SHOW SUBSCRIPTION ON public;
```

Output result:

```sql
SUBSCRIPTION,DESTINATIONS,MODE,PROJECTION,SELECTION
test,"127.0.0.1:8902,127.0.0.1:8903",ALL,,,
```

## Drop Subscription

We can use `DROP SUBSCRIPTION` to drop the subscription.

### Syntax

```sql
DROP SUBSCRIPTION <subscription_name> ON <database_name>
```

### Example

```sql
DROP SUBSCRIPTION test ON public;
```

## Send data to telegraf

> You can refer to [Telegraf](/eco-integration/telegraf#cnos-telegraf) to know how to use Telegraf and how to install Telegraf.

Modify the `telegraf` configuration file, add the following configuration to listen on port `8803`

```toml
[[inputs.cnosdb]]
service_address = ":8803"
```

Create subscription in CnosDB

> Assuming the telegraf location is at `127.0.0.1`.

```sql
CREATE SUBSCRIPTION sub_test ON public DESTINATIONS ALL "127.0.0.1:8803";
```

Query subscription

```sh
> SHOW SUBSCRIPTION ON public;
+--------------+-------------------------------+------+------------+-----------+
| subscription | destinations                  | mode | projection | selection |
+--------------+-------------------------------+------+------------+-----------+
| test         | 127.0.0.1:8913,127.0.0.1:8923 | ALL  |            |           |
+--------------+-------------------------------+------+------------+-----------+
```

Now, you can use `telegraf` to send data to any location.
