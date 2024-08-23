---
title: Telegraf
slug: /telegraf
---

[Telegraf](https://github.com/influxdata/telegraf) is an open-source server agent program used to collect metrics from stacks, sensors, and systems, centralize output to a database, with minimal memory usage, and support extension through plugins.Telegraf configuration is simple and easy to use, which greatly reduces the difficulty of data acquisition compared to collecting data through handwritten scripts.

**Usage Scenarios**

- **IoT Sensor Data**: Data transmitted based on protocols such as MQTT, ModBus, OPC-UA, and Kafka.
- **DevOps framework data**: Operational metrics of platforms or frameworks such as GitHub, Kubernetes, CloudWatch, Prometheus, etc.
- **System Telemetry Data**: System telemetry metrics such as iptables, Netstat, NGINX, and HAProxy.

**Plugin System**

1. **Input**: Collect metric data from system, service, or third-party API.
2. **Processing**: Process and decorate the data before sending the metric data to keep it clean.
3. **Aggregation**: Generating aggregated metrics, such as average, minimum, maximum, etc. of metric data.
4. **Output**: Write data to data storage, service, or message queue, such as CnosDB, InfluxDB, Graphite, OpenTSDB, Datadog, Kafka, MQTT, NSQ, etc.

In the following text, we will introduce how to install and configure Telegraf to collect system metrics data and store it in CnosDB.

### Telegraf Deployment

- **Download**

[Official download link](https://portal.influxdata.com/downloads)

- **Installation**

[Official Installation Tutorial (v1.23)](https://docs.influxdata.com/telegraf/v1.23/install/)

- **Start**

[Official Basic Tutorial (v1.23)](https://docs.influxdata.com/telegraf/v1.23/get_started/)

### Telegraf Configuration

- **Manually generate configuration file**

```sh
telegraf --sample-config > telegraf.conf
```

- **Default Configuration File Path**

- macOS **Homebrew**: `/usr/local/etc/telegraf.conf`

- Linux debian and RPM packages: `/etc/telegraf/telegraf.conf`

- **Edit configuration files using `vim` or other text editors**

To output index data to CnosDB, we need to configure the output plugin `http` of Telegraf to output line protocol data to the write interface of CnosDB.

Find `[[outputs.http]]` in the configuration file, and modify its content as follows:

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

In the configuration above, there are some texts that may need to be replaced:

- `CnosDB Address`
- `CnosDB Port`
- `Username`
- `Password`

Such as:

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

Next, start the Telegraf service and provide the path to the configuration file:

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

Next, use the CnosDB query interface to view the data to verify if Telegraf is running correctly:

```sh
curl -XPOST 'http://<CnosDB地址>:<CnosDB端口>/api/v1/sql?db=cnos'
  -u "<用户名>:<密码>"
  -H 'ACCEPT: application/json' \
  -d 'SELECT * from cpu limit 1'
```

In the command above, there are some texts that may need to be replaced:

- `CnosDB Address`
- `CnosDB Port`
- `Username`
- `Password`

Such as:

```sh
> curl -XPOST 'http://127.0.0.1:8902/api/v1/sql?db=cnos'
  -u "root:"
  -H 'ACCEPT: application/json' \
  -d 'SELECT * from cpu limit 1'
```

With the correct configuration, we are able to obtain the following results:

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

CnosDB-Telegraf is developed based on Telegraf (re1.25, commit 86cd0c0c2), adding some functions and plugins.

### Changes compared to Telegraf

#### Parser Plugin

Add Parser plugins OpenTSDB and OpenTSDB-Telnet for collecting OpenTSDB write requests.

- **OpenTSDB**

By using the Input plugin http_listener_v2 and configuring `data_format` to `"opentsdb"`, you will be able to parse write requests in OpenTSDB format.

```toml
[[inputs.http_listener_v2]]
service_address = ":8080"
paths = ["/api/put"]
methods = ["POST", "PUT"]
data_format = "opentsdb"
```

- **OpenTSDB-Telnet**

By using the Input plugin socket_listener and configuring `data_format` to `"opentsdbtelnet"`, you will be able to parse write requests in OpenTSDB-Telnet format.

```toml
[[inputs.socket_listener]]
service_address = "tcp://:8081"
data_format = "opentsdbtelnet"
```

#### Output Plugin

Add Output plugin CnosDB to output metrics to CnosDB.

```toml
[[outputs.cnosdb]]
url = "localhost:8902"
user = "user"
password = "pass"
database = "telegraf"
```

- **Configuration Introduction**

| Parameters | Description                 |
| ---------- | --------------------------- |
| url        | CnosDB GRpc service address |
| user       | Username                    |
| password   | Password                    |
| database   | CnosDB database             |

#### Input Plugin

Add configuration parameter high_priority_io to enable end-to-end mode.

When set to true, the written data will be immediately sent to the Output plugin and the return value will be determined based on the return parameters of the Output plugin.

```toml
[[inputs.http_listener_v2]]
service_address = ":8080"
paths = ["/api/put"]
methods = ["POST", "PUT"]
data_format = "opentsdb"
high_priority_io = true
```

The configuration above differs from the configuration in the [Output Plugin](#output-plugin) section by adding the `high_priority_io = true` configuration option.

### Build

- #### [Install Go](https://golang.org/doc/install) >=1.18 (recommended version is 1.18.0)
- #### Clone the repository from Github:

```shell
git clone https://github.com/cnosdb/cnos-telegraf.git
```

- #### Execute `make build` in the warehouse directory

```shell
cd cnos-telegraf
make build
```

### Start

- #### Execute the following command to view the test cases:

```shell
telegraf --help
```

- #### Generate a standard telegraf configuration file

```shell
telegraf config > telegraf.conf
```

- #### Generate a telegraf configuration file, containing only the cpu metric collection & influxdb output plugins

```shell
telegraf config --section-filter agent:inputs:outputs --input-filter cpu --output-filter influxdb
```

- #### Run telegraf but output collected metrics to standard output

```shell
telegraf --config telegraf.conf --test
```

- #### Run telegraf and manage loaded plugins through configuration file

```shell
telegraf --config telegraf.conf
```

- #### Run telegraf, only load cpu & memory metrics collection, and influxdb output plugin

```shell
telegraf --config telegraf.conf --input-filter cpu:mem --output-filter influxdb
```
