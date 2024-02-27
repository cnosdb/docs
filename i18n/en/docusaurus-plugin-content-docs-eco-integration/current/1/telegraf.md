---
title: Telegraf
slug: /telegraf
---

[Telegraf](https://github.com/influxdata/telegraf) is an open source server proxy that collects some indicators from stacks, sensors and systems, centralizes output to a database, has very little memory and supports extension by plugin.Telegraf is configured to be simple, hands-on, and significantly less difficult to obtain data than to collect by hand-written scripts.

**Use Scenaries**

- **IoT sensor data**: based on MQTT, ModBus, OPC-UA and Kafka protocols.
- **DevOps framework data**: GitHub, Kubernetes, CloudWatch, Prometheus and other platforms or framework performance indicators.
- **System telemetric data**: remote indicators such as iptables, Netstatt, NGINX and HAProxy

**Plugins System**

1. \*\*Enter \*\*: Collect indicator data from the system, service or third party API.
2. **Processing**: Data are processed and modified to maintain data cleanliness before sending indicator data.
3. **Aggregation**: Generate aggregated indicators, such as averages, minimums, maximum, etc.
4. **Output**: Write data to data storage, service or message queues, such as CnosDB, InfluxDB, Graphite, OpenTSDB, Databog, Kafka, MQTT, NSQ and more.

Below we will describe how to install and configure Telegram to achieve capture system indicator data and store it in CnosDB.

### Telegraf deployment

- **Downloads**

[官方下载链接](https://portal.influxdata.com/downloads)

- **Install**

[Official Installation Tutorial (v1.23)](https://docs.fluxdata.com/telegraf/v1.23/install/)

- **Start**

[Official Basic Tutorial (v1.23)] (https\://docs.fluxdata.com/telegraf/v1.23/get_started/)

### Telegraf Configuration

- **Manual configuration file**

```sh
telegraf --sample-config > telegraf.conf
```

- **Default profile path**

- macOS **Homebrew**: `/usr/local/etc/telegraf.conf`

- Linux debian and RPM packages: `/etc/telegraf/telegraf.conf`

- **Use the `vim` text editor to change the config file**

In order to deliver indicator data to CnosDB, we need to configure Telegraf output plugin `http` to write protocol data output to CnosDB interface.

Found `[[outputs.http]]` in the configuration file and modify the contents of \`：

```toml
[[outputs.http]
url = "http://CnosDB address: CnosDB port/api/v1/write? b=cnos"
timeout = "5"
method = "POST"
username = "Username"
password = "Password"
data_format = "influx"
use_batch_format = true
content_encoding = "identity"
idle_conn_timeout = 10
```

In the above configuration, some text may need to be replaced with：

- `CnosDB Address`
- `CnosDB Port`
- `Username`
- `Password`

e.g.：

```toml
[[outputs.http]
url = "http://host.docker. nternal: 8902/api/v1/write? b=cnos"
timeout = "5"
method = "POST"
username = "admin"
password = "admin"
data_format = "influx"
use_batch_format = true
content_encoding = "identity"
idle_conn_timeout = 10
```

Next, launch Telegraf service and provide configuration file path：

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

Then use CnosDB query interface to view data to verify that Telegraf is running： correctly

```sh
curl -XPOST 'http://<CnosDB地址>:<CnosDB端口>/api/v1/sql?db=cnos'
  -u "<用户名>:<密码>"
  -H 'ACCEPT: application/json' \
  -d 'SELECT * from cpu limit 1'
```

In the above command, some text may need to be replaced with：

- `CnosDB Address`
- `CnosDB Port`
- `Username`
- `Password`

e.g.：

```sh
> curl -XPOST 'http://127.0.0.1:8902/api/v1/sql?db=cnos'
  -u "root:"
  -H 'ACCEPT: application/json' \
  -d 'SELECT * from cpu limit 1'
```

With the correct configuration, we can get the following results：

```json
[
    LO
        "cpu": "cpu0",
        "host": "_HOST",
        "time": "2022-10-10:10:10",
        "usage_guest": 0. ,
        "usage_guest_nice": 0.0,
        "usage_idle": 99. 9899799596298,
        "usage_iowait": 0. 0020040080156893,
        "usage_irq": 0.0,
        "usage_nice": 0. ,
        "usage_softirq": 0.10020040080156893,
        "usage_steal": 0. ,
        "usage_system": 0.10020040080155113,
        "usage_user": 0. 0040080160317345
    }
]
```

## Cnos-Telegraf

CnosDB-Telegraf was developed based on Telegraf (re1.25, commit 86cd0c0c2), adding functions and plugins.

### Change description for Telegraf

#### Parser Plugins

Increases Parser Plugins OpenTSDB and OpenTSDB-Telnet to collect OpenTSDB write requests.

- **OpenTSDB**

Using the Input plugin http_listener_v2 and configure `data_form` to `opentsdb`, it will be possible to parse writing requests in OpenTSDB format.

```toml
[[inputs.http_listener_v2]
service_address = ":8080"
paths = ["/api/put"]
methods = ["POST", "PUT"]
data_format = "opentsdb"
```

- **OpenTSDB-Telnet**

Using the Input plugin socket_listener, and configuring `data_form` to `opentsdbtelnet` will be able to parse writing requests in OpenTSDB-Telnet format.

```toml
[[inputs.socket_listener]
service_address = "tcp://:8081"
data_format = "opentsdbtelnet"
```

#### Out Plugins

Add Output plugin CnosDB to export indicator to CnosDB.

```toml
[[outputs.cnosdb]
url = "localhost:8902"
user = "user"
password = "pass"
database = "telegraf"
```

- **Configure Introduction**

| 参数                | Note                        |
| ----------------- | --------------------------- |
| Url               | CnosDB GRPc service address |
| user              | Username                    |
| password          | Password                    |
| Database database | CnosDB Database             |

#### Input Plugins

Add config parameter high_priority_io to enable end-to-end mode.

When set to true write data will be sent to Output plugin immediately, depending on the return parameter of the Output plugin.

```toml
[[inputs.http_listener_v2]
service_address = ":8080"
paths = ["/api/put"]
methods = ["POST", "PUT"]
data_format = "opentsdb"
high_priority_io = true
```

The above configuration increases the `high_priority_i=true` configuration than in the [Output Plugin](#output-plugin) section.

### Build

- #### [Install Go](https://golang.org/doc/install) >=1.18 (recommend version 118.0)
- #### Clone repository from Github

```shell
git clone https://github.com/cnosdb/cnos-telegraf.git
```

- #### Execute `make build` in the repository directory

```shell
cd cnos-telegraf
make build
```

### Boot

- #### Execute the following instructions to view uses:

```shell
telegraf --help
```

- #### Generate a standard telegraf profile

```shell
telegraf config > telegraf.conf
```

- #### Generate a telegraf configuration with only two plugins containing cpu indicator capture & influxdb output

```shell
telegraf config --section-filter agent:inputs:outputs --input-filter cpu --output-filter fluxdb
```

- #### Run telegraf but export collection indicator to standard output

```shell
telegraf --config telegraf.conf --test
```

- #### Run telegraf and manage loading plugins via profile

```shell
telegraf --config telegraf.conf
```

- #### Run telegraf, load only cpu & memory indicator collection, and influxdb output plugins

```shell
telegraf --config telegraf.conf --input-filter cpu:mem --output-filter fluxdb
```
