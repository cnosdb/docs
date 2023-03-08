---
title: Cnos-Telegraf
order: 2
---

# Cnos-Telegraf

CnosDB-Telegraf 基于 Telegraf (re1.25, commit 86cd0c0c2) 进行开发，增加了一些功能与插件。

## 相较于 Telegraf 的改动说明

### Parser Plugin

增加 Parser 插件 OpenTSDB 和 OpenTSDB-Telnet，用于采集 OpenTSDB 的写入请求。

- **OpenTSDB**

  通过使用 Input 插件 http_listener_v2 并配置 `data_format` 为 `"opentsdb"`，将能够解析 OpenTSDB 格式的写入请求。

   ```toml
   [[inputs.http_listener_v2]]
   service_address = ":8080"
   paths = ["/api/put"]
   methods = ["POST", "PUT"]
   data_format = "opentsdb"
   ```

- **OpenTSDB-Telnet**

  通过使用 Input 插件 socket_listener，并配置 `data_format` 为 `"opentsdbtelnet"`，将能够解析 OpenTSDB-Telnet 格式的写入请求。

   ```toml
   [[inputs.socket_listener]]
   service_address = "tcp://:8081"
   data_format = "opentsdbtelnet"
   ```

### Output Plugin

增加 Output 插件 CnosDB，用于将指标输出到 CnosDB。

```toml
[[outputs.cnosdb]]
url = "localhost:31006"
user = "user"
password = "pass"
database = "telegraf"
```

- **配置介绍**

| 参数       | 说明               |
|----------|------------------|
| url      | CnosDB GRpc 服务地址 |
| user     | 用户名              |
| password | 密码               |
| database | CnosDB 数据库       |

### Input Plugin

增加配置参数 high_priority_io，用于开启端到端模式。

当设置为 true 时，写入的数据将立即发送到 Output 插件，并根据 Output 插件的返回参数来决定返回值。

```toml
[[inputs.http_listener_v2]]
service_address = ":8080"
paths = ["/api/put"]
methods = ["POST", "PUT"]
data_format = "opentsdb"
high_priority_io = true
```

以上配置与在 [Output](#output) 章节中的配置相比，增加了 `high_priority_io = true` 配置项。

## 构建

1. [安装 Go](https://golang.org/doc/install) >=1.18 (推荐 1.18.0 版本)
2. 从 Github 克隆仓库:

   ```shell
   git clone https://github.com/cnosdb/cnos-telegraf.git
   ```

3. 在仓库目录下执行 `make build`

   ```shell
   cd cnos-telegraf
   make build
   ```

## 启动

执行以下指令，查看用例:

```shell
telegraf --help
```

### 生成一份标准的 telegraf 配置文件

```shell
telegraf config > telegraf.conf
```

### 生成一份 telegraf 配置文件，仅包含 cpu 指标采集 & influxdb 输出两个插件

```shell
telegraf config --section-filter agent:inputs:outputs --input-filter cpu --output-filter influxdb
```

### 运行 telegraf 但是将采集指标输出到标准输出

```shell
telegraf --config telegraf.conf --test
```

### 运行 telegraf 并通过配置文件来管理加载的插件

```shell
telegraf --config telegraf.conf
```

### 运行 telegraf，仅加载 cpu & memory 指标采集，和 influxdb 输出插件

```shell
telegraf --config telegraf.conf --input-filter cpu:mem --output-filter influxdb
```
