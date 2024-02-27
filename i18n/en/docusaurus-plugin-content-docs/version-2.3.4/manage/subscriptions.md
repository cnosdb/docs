---
sidebar_position: 5
---

# 订阅管理

:::tip
仅企业版支持
:::

CnosDB 订阅可以将本地端点的数据写入到远程端点，可以和另一个 CnosDB 实例 或 Telegraf 一起使用。CnosDB 订阅使用流量复制的方式进行分发。

支持分发的流量：

- `/api/v1/write`

- `/api/v1/sql` 中的 `INSERT` 写入语句

> 将数据分发至 CnosDB 实例前，请提前创建表，否则将导致数据丢失

## 创建订阅

使用 `CREATE SUBSCRIPTION` 创建订阅。

### Syntax

```sql
CREATE SUBSCRIPTION <subscription_name> 
ON <database_name> 
DESTINATIONS <ALL|ANY> "<end_point>" ["<end_point>"]
[ON <table_name>(time, <tag_name>,[tag_name, ...], <field_name>, [field_name, ..]) 
[FILTER_BY <Expr>]];
```

:::note

`DESTINATIONS`：定义数据写入的目标位置，`ALL` 表示将数据写入所有的端点，`ANY` 表示轮询写入到多个端点，`end_point`表示写入的目标端点（CnosDB 实例的 `host` 以及配置文件中的`grpc_listen_port`，示例：`127.0.0.1:8903`）。

`ON`：设置被订阅列表以及表中的列。

`FILTER_BY`：使用条件过滤需要分发的记录，示例：`FILTER_BY WHERE station = 'XiaoMaiDao'`。

:::

### Example

若接受分发数据的 CnosDB 节点的部分配置如下：

```sql
[cluster]
meta_service_addr = ["127.0.0.1:8901"]

grpc_listen_port = 8903
```

则在当前 CnosDB 创建订阅的 SQL 如下：

```sql
CREATE SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903";
```

此时若有数据写入当前 CnosDB 节点，则数据将同步复制转发到`127.0.0.1:8903`。

如果需要对数据进行过滤，可以增加关键字 `FILTER_BY`：

```sql
create subscription test 
on public
DESTINATIONS ALL "127.0.0.1:8903"
on air(time,station,pressure) 
FILTER_BY where station = 'XiaoMaiDao';
```

## 更新订阅

可以使用 `ALTER SUBSCRIPTION` 更新订阅。

### Syntax

```sql
ALTER SUBSCRIPTION <subscription_name> 
ON <database_name> 
DESTINATIONS <ALL|ANY> "<end_point>" ["<end_point>"]
[ON <table_name>(time, <tag_name>,[tag_name, ...], <field_name>, [field_name, ..]) 
[FILTER_BY <Expr>]];
```

### Example

```sql
ALTER SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913";
```

可以通过这种方法来修改 `end_point`，需要注意的是，通过 `ALTER SUBSCRIPTION` 进行修改是直接覆盖，如果不希望删除之前的 `end_point`，`DESTINATIONS ALL` 后需要添加之前的所有 `end_point`。

## 显示订阅

可以使用 `SHOW SUBSCRIPTION` 查看订阅信息。

### Syntax

```sql
SHOW SUBSCRIPTION ON <database_name>
```

### Example

```sql
SHOW SUBSCRIPTION ON public;
```

输出结果：

```sql
SUBSCRIPTION,DESTINATIONS,MODE
test,"127.0.0.1:8902,127.0.0.1:8903",ALL
```

## 删除订阅

可以使用 `DROP SUBSCRIPTION` 删除订阅。

### Syntax

```sql
DROP SUBSCRIPTION <subscription_name> ON <database_name>
```

### Example

```sql
DROP SUBSCRIPTION test ON public;
```

## 将数据发送到 telegraf

> 关于 Telegraf 的使用方法，以及如何安装 Telegraf，见 [Telegraf 章节](/eco-integration/index/telegraf#cnos-telegraf)。

修改 `telegraf` 配置文件，增加如下配置，监听 `8803`端口

```toml
[[inputs.cnosdb]]
service_address = ":8803"
```

在 CnosDB 创建订阅

> 假设 telegraf 位置在 `127.0.0.1` 上。

```sql
CREATE SUBSCRIPTION sub_test ON public DESTINATIONS ALL "127.0.0.1:8803";
```

查询订阅

```sh
> SHOW SUBSCRIPTION ON public;
+--------------+----------------+------+
| SUBSCRIPTION | DESTINATIONS   | MODE |
+--------------+----------------+------+
| sub_test     | 127.0.0.1:8803 | ALL  |
+--------------+----------------+------+
```

现在，你可以使用 `telegraf` 将数据发送至任何位置。
