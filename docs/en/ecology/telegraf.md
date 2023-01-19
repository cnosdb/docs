---
title: Telegraf
order: 1
---

## **Telegraf Introduction**

[Telegraf](https://github.com/influxdata/telegraf) is an open source server agent program used to collect metrics from stacks, sensors, and systems to database intensively, with a minimal memory footprint and support for extensions via plug-ins.Telegraf is simple to configure, easy to get started with, and greatly reducing the difficulty of data acquisition compared to collecting data via handwritten scripts.

### User scenarios

- **IoT sensor data:** Data transferred based on protocols such as MQTT, ModBus, OPC-UA, and Kafka.
- **DevOps framework data:** Operational metrics from platforms or frameworks such as GitHub, Kubernetes, CloudWatch, Prometheus, etc.
- **System telemetry data:** System telemetry metrics such as iptables, Netstat, NGINX and HAProxy

**Plug-in system**

1. **Input:** Collects metrics data from systems, services, or third-party APIs.
2. **Process:** Process and trim the metrics data before sending them to maintain data cleanliness.
3. **Aggregate:** Generate aggregated metrics, such as average, minimum, and maximum values of metric data.
4. **Output:** Writing data to a data store, service or message queue such as InfluxDB, Graphite, OpenTSDB, Datadog, Kafka, MQTT, NSQ, etc.

In the following, we will describe how to install and configure Telegraf for collecting system metrics data and storing it in CnosDB.

## **Telegraf Deployment**

### 1. **Installation**

Download

[Official Download Link](https://portal.influxdata.com/downloads/)

**Installation**

[Offical Installation Tutorial(v1.23)](https://docs.influxdata.com/telegraf/v1.23/install/)

### 2. **Start**

[Offical Basic Tutorisl(v1.23)](https://docs.influxdata.com/telegraf/v1.23/get_started/)

## **Telegraf Configuration**

1. Generate configuration files manually

```sh
telegraf --sample-config > telegraf.conf
```

2. Default configuration file path

- macOS **Homebrew**: `/usr/local/etc/telegraf.conf`
- Linux debian and RPM packages: `/etc/telegraf/telegraf.conf`

3. Use a text editor such as `vim` to modify the configuration file.

In order to output the metrics data to CnosDB, we need to configure Telegraf's output plug-in `http` to output line protocol data to the write interface of CnosDB.

Find [[`outputs.http`]] in the configuration file and modify it as follows:

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

In the above configuration, there are some texts needed to be replaced:

- `CnosDB_address`
- `CnosDB_port`
- `username`
- `password`

as, for example:

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

Next, start the Telegraf service and provide the configuration file path:

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

Next, use the CnosDB query interface to view the data to verify that Telegraf is running correctly:

```sh
curl -XPOST -H 'ACCEPT: application/json' -H "AUTHORIZATION: Basic $(echo '用户名:密码'|base64)" 'http://CnosDB地址:CnosDB端口/api/v1/sql?db=cnos' -d 'SELECT * from cpu limit 1'
```

In the above configuration, there are some texts needed to be replaced:

- `CnosDB_address`
- `CnosDB_port`
- `username`
- `password`

as, for example:

```sh
> curl -XPOST -H 'ACCEPT: application/json' -H "AUTHORIZATION: Basic $(echo 'admin:admin'|base64)" 'http://127.0.0.1:31007/api/v1/sql?db=cnos' -d 'SELECT * from cpu limit 1'
```

Under correct configuration, you will obtain the following results:

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
