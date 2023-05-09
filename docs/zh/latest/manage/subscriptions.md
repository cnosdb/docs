---
title: 订阅管理
order: 9
---

:::tip
仅企业版支持
:::

通过订阅可以把数据复制到另一个CnosDB集群，数据复制将有助于提高整个系统的容错性和可靠性。CnosDB 支持通过 SQL 管理订阅，CnosDB支持通过Telegraf进行订阅或者另一个CnosDB集群进行订阅。

## 创建订阅

可以使用 `CREATE SUBSCRIPTION` 创建订阅。

### 语法

```
CREATE SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_name>" ["<host_name>"]
```


1. host_name 为订阅此节点的 CnosDB 节点的 grpc 服务的 host_name。

所有写入 CnosDB 指定 database 的数据，都将被复制并分发到host节点。

1. ALL 表示数据复制的模式，目前仅支持 ALL。

### 示例

若接受分发数据的 CnosDB 节点的部分配置如下：

```
[cluster]
meta_service_addr = ["127.0.0.1:8901"]

grpc_listen_port = 8903
```

则在当前 CnosDB 创建订阅的SQL如下：

```
CREATE SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903";
```

此时若有数据写入当前 CnosDB 节点，则数据将同步复制转发到`127.0.0.1:8903`。

## 更新订阅

可以使用 `ALTER SUBSCRIPTION` 更新订阅。

### 语法

```
ALTER SUBSCRIPTION <subscription_name> ON <database_name> DESTINATIONS ALL "<host_name>" ["<host_name>"]。
```

### 示例

```
ALTER SUBSCRIPTION test ON public DESTINATIONS ALL "127.0.0.1:8903" "127.0.0.1:8913";
```

可以通过这种方法来修改 host_name，需要注意的是，通过 `ALTER SUBSCRIPTION` 进行修改是直接覆盖，如果不希望删除之前的 host_name，`DESTINATIONS ALL` 后需要添加之前的所有 host_name。

## 显示订阅

可以使用 `SHOW SUBSCRIPTION` 查看订阅信息。

### 语法

```
SHOW SUBSCRIPTION ON <database_name>
```

### 示例

```
SHOW SUBSCRIPTION ON public;
```
输出结果：

    SUBSCRIPTION,DESTINATIONS,MODE
    test,"127.0.0.1:8902,127.0.0.1:8903",ALL


## 删除订阅

可以使用 `DROP SUBSCRIPTION` 删除订阅。

### 语法

```
DROP SUBSCRIPTION <subscription_name> ON <database_name>
```

### 示例

```
DROP SUBSCRIPTION test ON public;
```

## 通过 Telegraf 实现订阅分发

### Telegraf 安装

关于 Telegraf 的使用方法，以及如何安装 Telegraf，见 [Telegraf 章节](../versatility/collect/telegraf.md#cnos-telegraf)。

### Telegraf 配置

假设我们已经启动了 CnosDB，并创建了订阅，将 `DESTINATIONS` 设置为 `127.0.0.1:8803`：

```sh
> SHOW SUBSCRIPTION ON public;
+--------------+----------------+-------------+
| Subscription | DESTINATIONS   | Concurrency |
+--------------+----------------+-------------+
| sub_tr_1003  | 127.0.0.1:8803 | ALL         |
+--------------+----------------+-------------+
```

在 Telegraf 的配置文件中增加输入插件 `cnosdb`，并配置监听的地址与端口号，如下：

```toml
[[inputs.cnosdb]]
service_address = ":8803"
```

配置输出插件 `http` 来实现分发消息。如果有另一个 CnosDB 实例，其 HTTP 监听端口号为 `127.0.0.1:8912`，那么我们可以通过以下配置来将订阅消息转发到该 CnosDB 示例。

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
