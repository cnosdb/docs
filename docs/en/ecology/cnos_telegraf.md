---
title: Cnos-Telegraf
order: 2
---

# Cnos-Telegraf

CnosDB-Telegraf is based on Telegraf (re1.25, commit 86cd0c0c2), with some added features and plugins.

# **Description of the changes compared to Telegraf**

### Parser Plugin

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

### Output Plugin

Add Output plugin CnosDB for exporting metrics to CnosDB.

```toml
[[outputs.cnosdb]]
url = "localhost:31006"
user = "user"
password = "pass"
database = "telegraf"
```

- **Configuration introduction**

| **Parameters** | **Description**             |
| -------------- | --------------------------- |
| url            | CnosDB GRpc service address |
| user           | User Name                   |
| password       | Password                    |
| database       | CnosDB database             |

### Input Plugin

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

The above configuration adds the `high_priority_io = true` configuration compared to the configuration in the [Output](#output) section.

## **Build**

1. [Install Go](https://golang.org/doc/install) >=1.18 (1.18.0 version recommended)
2. Clone the repository from Github:

   ```shell
   git clone https://github.com/cnosdb/cnos-telegraf.git
   ```

3. execute `make build` in the repository directory

   ```shell
   cd cnos-telegraf
   make build
   ```

## **Start**

Execute the following command to view the use case:

```shell
telegraf --help
```

### **Generate a standard telegraf configuration file**

```shell
telegraf config > telegraf.conf
```

### **Generate a telegraf configuration file that contains only the cpu metrics collection & influxdb output plugins**

```shell
telegraf config --section-filter agent:inputs:outputs --input-filter cpu --output-filter influxdb
```

### **Run telegraf but output the capture metrics to the standard output**

```shell
telegraf --config telegraf.conf --test
```

### **Run telegraf and manage the loaded plugins through the configuration file**

```shell
telegraf --config telegraf.conf
```

### **Run telegraf, load only the cpu & memory metrics collection, and the influxdb output plugin**

```shell
telegraf --config telegraf.conf --input-filter cpu:mem --output-filter influxdb
```