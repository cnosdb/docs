---
title: Telegraf
order: 1
---

## Telegraf 简介

[Telegraf](https://github.com/influxdata/telegraf) 是一个开源的服务器代理程序，用于从堆栈、传感器和系统中收集一些指标，集中输出到数据库，内存占用极小，支持通过插件进行扩展。Telegraf 配置简单，易于上手，相较于通过手写脚本采集数据，大大降低了数据获取的难度。

**使用场景**

- **IoT 传感器数据**: 基于 MQTT、ModBus、OPC-UA 和 Kafka 等协议传输的数据。
- **DevOps 框架数据**: GitHub、Kubernetes、CloudWatch、Prometheus 等平台或框架的运行指标。
- **系统遥测数据**: iptables, Netstat, NGINX 和 HAProxy 等系统遥测指标。

**插件系统**

1. **输入**: 收集来自系统、服务或第三方 API 的指标数据。
2. **处理**: 在发送指标数据前对数据进行处理、修饰，以维持数据整洁。
3. **聚合**: 生成聚合指标，如指标数据的平均值、最小值、最大值等。
4. **输出**: 将数据写入数据存储、服务或消息队列，如 InfluxDB, Graphite, OpenTSDB, Datadog, Kafka, MQTT, NSQ 等。

在下文中，我们将介绍如何安装、配置 Telegraf，以实现采集系统指标数据，并存储在 CnosDB 中。

## Telegraf 部署

### 1. 安装

**下载**

[官方下载链接](https://portal.influxdata.com/downloads)

**安装**

[官方安装教程(v1.23)](https://docs.influxdata.com/telegraf/v1.23/install/)

### 2. 启动

[官方基础教程(v1.23)](https://docs.influxdata.com/telegraf/v1.23/get_started/)

## Telegraf 配置

1. 手动生成配置文件

```sh
telegraf --sample-config > telegraf.conf
```

2. 默认配置文件路径

- macOS **Homebrew**: `/usr/local/etc/telegraf.conf`
- Linux debian and RPM packages: `/etc/telegraf/telegraf.conf`

3. 使用 `vim` 等文本编辑器修改配置文件。

为实现将指标数据输出至 CnosDB，我们需要配置 Telegraf 的输出插件 `http`，来将行协议数据输出至 CnosDB 的写如接口。

在配置文件中找到 `[[outputs.http]]`，将其内容修改如下：

```toml
[[outputs.http]]
  url = "http://CnosDB地址:CnosDB端口/api/v1/write?db=cnos"
  timeout = "5s"
  method = "POST"
  username = "用户名"
  password = "密码"
  data_format = "influx"
  use_batch_format = true
  content_encoding = "identity"
  idle_conn_timeout = 10
```

在上面的配置中，有一些文本可能需要替换：

- `CnosDB地址`
- `CnosDB端口`
- `用户名`
- `密码`

如：

```toml
[[outputs.http]]
  url = "http://host.docker.internal:31007/api/v1/write?db=cnos"
  timeout = "5s"
  method = "POST"
  username = "admin"
  password = "admin"
  data_format = "influx"
  use_batch_format = true
  content_encoding = "identity"
  idle_conn_timeout = 10
```

接下来，启动 Telegraf 服务，并提供配置文件路径：

**macOS Homebrew**

```sh
telegraf --config telegraf.conf
```

**Linux (sysvinit and upstart installations)**

```sh
sudo service telegraf start
```

**Linux (systemd installations)**

```sh
systemctl start telegraf
```

接下来使用 CnosDB 查询接口来查看数据，以验证 Telegraf 是否正确运行：

```sh
curl -XPOST -H 'ACCEPT: application/json' -H "AUTHORIZATION: Basic $(echo '用户名:密码'|base64)" 'http://CnosDB地址:CnosDB端口/api/v1/sql?db=cnos' -d 'SELECT * from cpu limit 1'
```

在上面的命令中，有一些文本可能需要替换：

- `CnosDB地址`
- `CnosDB端口`
- `用户名`
- `密码`

如：

```sh
> curl -XPOST -H 'ACCEPT: application/json' -H "AUTHORIZATION: Basic $(echo 'admin:admin'|base64)" 'http://127.0.0.1:31007/api/v1/sql?db=cnos' -d 'SELECT * from cpu limit 1'
```

在正确配置的情况下，我们能够获得以下结果：

```json
[
  {
    "cpu": "cpu0",
    "host": "_HOST",
    "time": "2022-10-10 10:10:10",
    "usage_guest": 0.0,
    "usage_guest_nice": 0.0,
    "usage_idle": 99.49899799596298,
    "usage_iowait": 0.10020040080156893,
    "usage_irq": 0.0,
    "usage_nice": 0.0,
    "usage_softirq": 0.10020040080156893,
    "usage_steal": 0.0,
    "usage_system": 0.10020040080155113,
    "usage_user": 0.20040080160317345
  }
]
```
