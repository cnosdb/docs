---
sidebar_position: 5
---

# Subscription management

:::tip
Enterprise only support
:::

CnosDB subscription can write local endpoint data to remote endpoints and can be used with another CnosDB instance or Telegraf.CnosDB Subscription for distribution using data copiing.

Traffic Support for Distribution：

- `/api/v1/write`

- `INSERT` in `/api/v1/sql`

> Please create tables in advance before distributing data to the CnosDB instance or cause data loss

## Create subscription

Create subscription using `CREATE SUBSCRIPTION`.

### Syntax

```sql
CREATE SUBSCRIPTON <subscription_name> 
ON <database_name> 
DESTINATIONS <ALL|ANY> "<end_point>" ["<end_point>"]
[ON <table_name>(time, <tag_name>, [tag_name, .], <field_name>, [field_name, ...]) 
[FILTER_BY <Expr>]];
```

:::note

`DESTINATIONS`：defines the destination of the data written, `ALL` to write the data to all endpoints, `ANY` to write to multiple endpoints, `end_point` to write to the destination point (`host` for CnosDB instance and `grpc_listen_port`, example：`127.0.0.1:8903`).

`ON`：settings are subscribed to lists and columns.

`FILTER_BY`：uses conditions to filter records for distribution, example：\`FILTER_BY WHERE station = 'XiaoMaiDao'.

:::

### Example

Assign part of the CnosDB node that accepts distribution of data below：

```sql
[cluster]
meta_service_addr = ["127.0.0.1:8901"]

grpc_listen_port = 8903
```

then create a SQL subscription in current CnosDB below：

```sql
CREATE SUBSCRIPTON ON public DESTINATIONS ALL "127.0.0.1:8903";
```

If data are written to the current CnosDB node at this time, the data will be copied to `127.0.0.1:8903`.

If filtering data is required, add the keyword `FILTER_BY`：

```sql
Create subdescription test 
on public
DESTINATIONS ALL "127.0.0.1:8903"
on air(time,station,pressure) 
FILTER_BY where station = 'XiaoMaiDao';
```

## Update subscription

Subscription can be updated using `ALTER SUBSCRIPTION`.

### Syntax

```sql
ALTER SUBSCRIPTON <subscription_name> 
ON <database_name> 
DESTINATIONS <ALL|ANY> "<end_point>" ["<end_point>"]
[ON <table_name>(time, <tag_name>, [tag_name, .], <field_name>, [field_name, ...]) 
[FILTER_BY <Expr>]];
```

### Example

```sql
ALTER SUBSCRIPTON ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913";
```

This method can be used to modify `end_point`. Note that the changes made by `ALTER SUBSCRIPTION` are directly overwritten, if you don't want to delete the previous `end_point`, `DESTINATIONS ALL` after adding all previous `end_point`.

## Show Subscription

You can use `SHOW SUBSCRIPTION` to view subscription information.

### Syntax

```sql
SHOW SUBSCRIPON ON <database_name>
```

### Example

```sql
SHOW SUBSCRIPTON public;
```

Output Result：

```sql
SUBSCRIPTION,DESTINATIONS, MODE
test,"127.0.0.1:8902,127.0.1:8903", ALL
```

## Delete subscription

The subscription can be deleted using `DROP SUBSCRIPTION`.

### Syntax

```sql
DROP SUBSCRIPTON <subscription_name> ON <database_name>
```

### Example

```sql
DROP SUBSCRIPTION ON public;
```

## Send data to telegraf

> See [Telegraf section](/eco-integration/index/telegraraf#cnos-telegraf) for the method of use of Telegraf and how to install Telegraf.

Change the `telegraf` configuration to add the following configuration to listen on the `8803` port

```toml
[[inputs.cnosdb]
service_address = ":8803"
```

Create subscription in CnosDB

> Assume that the telegraf position is on `127.0.0.1`.

```sql
CREATE SUBSCRIPTON sub_test ON public DESTINATIONS ALL "127.0.1:8803";
```

Query subscription

```sh
> SHOW SUBSCRIPTON public;
+--+---------+----+-
| SUBSCRIPTON | DESTINATIONS | MODE |
+---------+
| sub_test | 127. .0.1:8803 | ALL |
+-------- + --+
```

You can now send data to any location using `telegram`.
