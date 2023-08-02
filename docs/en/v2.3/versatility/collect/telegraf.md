---
title: Telegraf
order: 1
---

## Telegraf

### **Telegraf Introduction**

[Telegraf](https://github.com/influxdata/telegraf) is an open source server agent program used to collect metrics from stacks, sensors, and systems to database intensively, with a minimal memory footprint and support for extensions via plug-ins.Telegraf is simple to configure, easy to get started with, and greatly reducing the difficulty of data acquisition compared to collecting data via handwritten scripts.

#### User scenarios

- **IoT sensor data:** Data transferred based on protocols such as MQTT, ModBus, OPC-UA, and Kafka.
- **DevOps framework data:** Operational metrics from platforms or frameworks such as GitHub, Kubernetes, CloudWatch, Prometheus, etc.
- **System telemetry data:** System telemetry metrics such as iptables, Netstat, NGINX and HAProxy

**Plug-in System**

1. **Input:** Collects metrics data from systems, services, or third-party APIs.
2. **Process:** Process and trim the metrics data before sending them to maintain data cleanliness.
3. **Aggregate:** Generate aggregated metrics, such as average, minimum, and maximum values of metric data.
4. **Output:** Writing data to a data store, service or message queue such as CnosDB, InfluxDB, Graphite, OpenTSDB, Datadog, Kafka, MQTT, NSQ, etc.

In the following, we will describe how to install and configure Telegraf for collecting system metrics data and storing it in CnosDB.

### **Telegraf Deployment**


- #### Download

[Official Download Link](https://portal.influxdata.com/downloads/)

- **Installation**

[Offical Installation Tutorial(v1.23)](https://docs.influxdata.com/telegraf/v1.23/install/)

- **Start**

[Offical Basic Tutorisl(v1.23)](https://docs.influxdata.com/telegraf/v1.23/get_started/)

### **Telegraf Configuration**

- #### Generate configuration files manually

```sh
telegraf --sample-config > telegraf.conf
```

- #### Default configuration file path

- macOS **Homebrew**: `/usr/local/etc/telegraf.conf`
- Linux debian and RPM packages: `/etc/telegraf/telegraf.conf`

- #### Use a text editor such as `vim` to modify the configuration file.

In order to output the metrics data to CnosDB, we need to configure Telegraf's output plug-in `http` to output line protocol data to the write interface of CnosDB.

Find [[`outputs.http`]] in the configuration file and modify it as follows:

```toml
[[outputs.http]]
url = "http://CnosDB_Addr:CnosDB_Port/api/v1/write?db=cnos"
timeout = "5s"
method = "POST"
username = "username"
password = "password"
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
url = "http://host.docker.internal:8902/api/v1/write?db=cnos"
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
curl -XPOST 'http://<CnosDB addr>:<CnosDB port>/api/v1/sql?db=cnos'
  -u "<username>:<password>"
  -H 'ACCEPT: application/json' \
  -d 'SELECT * from cpu limit 1'
```

In the above configuration, there are some texts needed to be replaced:

- `CnosDB_address`
- `CnosDB_port`
- `username`
- `password`

as, for example:

```sh
> curl -XPOST 'http://127.0.0.1:8902/api/v1/sql?db=cnos'
  -u "root:"
  -H 'ACCEPT: application/json' \
  -d 'SELECT * from cpu limit 1'
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


## Cnos-Telegraf

CnosDB-Telegraf is based on Telegraf (re1.25, commit 86cd0c0c2), with some added features and plugins.

### **Description of the changes compared to Telegraf**

#### Parser Plugin

Add Parser plug-ins OpenTSDB and OpenTSDB-Telnet to collect write requests from OpenTSDB.

- **OpenTSDB**

By using the Input plugin http_listener_v2 and configuring the `data_format` to "`opentsdb`", you will be able to parse write requests in OpenTSDB format.

```toml
[[inputs.http_listener_v2]]
service_address = ":8080"
paths = ["/api/put"]
methods = ["POST", "PUT"]
data_format = "opentsdb"
```

- **OpenTSDB-Telnet**

By using the Input plugin socket_listener and configuring the `data_format` to "`opentsdbtelnet`", you will be able to parse write requests in OpenTSDB-Telnet format.

```toml
[[inputs.socket_listener]]
service_address = "tcp://:8081"
data_format = "opentsdbtelnet"
```

#### Output Plugin

Add Output plugin CnosDB for exporting metrics to CnosDB.

```toml
[[outputs.cnosdb]]
url = "localhost:8902"
user = "user"
password = "pass"
database = "telegraf"
```

- **Configuration introduction**

| **Parameters** | **Description**             |
|----------------|-----------------------------|
| url            | CnosDB GRpc service address |
| user           | User Name                   |
| password       | Password                    |
| database       | CnosDB database             |

#### Input Plugin

Add the configuration parameter high_priority_io to enable end-to-end mode.

When set to true, the written data will be sent to the Output plug-in immediately and the return value will be determined based on the Output plug-in's return parameters.

```toml
[[inputs.http_listener_v2]]
service_address = ":8080"
paths = ["/api/put"]
methods = ["POST", "PUT"]
data_format = "opentsdb"
high_priority_io = true
```

The above configuration adds the `high_priority_io = true` configuration compared to the configuration in the [Output Plugin](#output-plugin) section.

### **Build**

- #### [Install Go](https://golang.org/doc/install) >=1.18 (1.18.0 version recommended)
- #### Clone the repository from Github:

```shell
git clone https://github.com/cnosdb/cnos-telegraf.git
```

- #### execute `make build` in the repository directory

```shell
cd cnos-telegraf
make build
```

### **Start**

- #### Execute the following command to view the use case:

```shell
telegraf --help
```

- #### **Generate a standard telegraf configuration file**

```shell
telegraf config > telegraf.conf
```

- #### **Generate a telegraf configuration file that contains only the cpu metrics collection & influxdb output plugins**

```shell
telegraf config --section-filter agent:inputs:outputs --input-filter cpu --output-filter influxdb
```

- #### **Run telegraf but output the capture metrics to the standard output**

```shell
telegraf --config telegraf.conf --test
```

- #### **Run telegraf and manage the loaded plugins through the configuration file**

```shell
telegraf --config telegraf.conf
```

- #### **Run telegraf, load only the cpu & memory metrics collection, and the influxdb output plugin**

```shell
telegraf --config telegraf.conf --input-filter cpu:mem --output-filter influxdb
```
