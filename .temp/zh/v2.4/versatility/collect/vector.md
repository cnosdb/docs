---
title: Vector
order: 1
---

## Vector

### 概念

#### 简介
![write](../../../../.vuepress/public/_static/img/vector_concept.png)

[Vector](https://github.com/vectordotdev/vector)是一个高性能的可观测数据管道，使组织能够控制其可观测数据。收集、转换并将所有log、metric路由到现在正在使用的任何供应商，或者未来可能想要使用的任何其他供应商。Vector可以在你最需要的地方（而不是供应商最方便的地方）大幅降低成本，使数据更加新颖丰富，并提供数据安全性。Vector是开源的，并且比任何替代方案快接近10倍。

Vector每月被下载数百万次，T-Mobile、Comcast、Zendesk和Discord等公司都依赖它来获得可观察性数据。


#### 拓扑模型
![write](../../../../.vuepress/public/_static/img/vector_topology.png)

Vector 主要有三大功能模块：Sources，Transforms，Sinks

数据从 Source 进入到 Vector，经过一些 Transforms 逻辑进行数据加工，最后发往 Sink。Vector 通过 Source、 Transform 、Sink 三种不同类型的组件组成了一个完整的数据流水线。

Source 就是一个可供采集的数据源，例如文件、Kafka、Syslog 等。而一个 Sink 则是接收、消费数据的终端，比如Clickhouse、Splank、Datadog Logs 这类的数据库，或者日志分析平台。

Transform 用于对数据流进行转换、修改和过滤，以满足特定的需求。它可以对输入数据进行多种转换和处理，例如重命名字段、过滤数据行、添加新字段、删除字段等。使用transform组件，可以将数据转换为所需的格式，并将其路由到正确的目标。支持多种转换方法，包括grok、JSON、CSV、regex、lua等。它还支持多种数据格式和协议，例如JSON、YAML、CSV、Syslog、HTTP、TCP等。

Sink 是经过处理和转换的数据流需要被发送到的目标存储或分析系统。Vector支持多种类型的sink，包括文件、标准输出、TCP/UDP、HTTP、Kafka、S3、Elasticsearch、Datadog、InfluxDB等

简单归纳一下 Vector 具备的两种主要类型的功能：

● 数据采集与传输

它可以从数据采集端的 Source 获取数据，并最终传输到数据的消费端 Sink。

● 数据加工的能力

可以通过内部的 Transform 的功能模块对收集到的数据进行解析、采样、聚合等不同类型的加工处理。

### Vector 用法介绍
作为一个工具，vector的易用性很高。

它支持通过很多不同的方式安装，安装包下载、包管理器等等，安装完成以后，得到一个二进制的 Binary，它唯一的依赖就是一个配置文件。

编辑配置文件 vector.toml

```toml
[sources.generate_syslog]
type = "demo_logs"
format = "syslog"
count = 100

[transforms.remap_syslog]
inputs = [ "generate_syslog"]
type = "remap"
source = '''
  structured = parse_syslog!(.message)
'''

[sinks.emit_syslog]
inputs = ["remap_syslog"]
type = "console"
encoding.codec = "json"

[sources.generate_syslog]
type = "demo_logs"
format = "syslog"
count = 100

[transforms.remap_syslog]
inputs = [ "generate_syslog"]
type = "remap"
source = '''
  structured = parse_syslog!(.message)
  # 写入的租户名
  ._tenant = "cnosdb"
   # 写入的数据库名
  ._database = "public"
    # 写入的表名
  ._table = "vector_log_test"
    # 用户及密码
  ._user = "root"
  ._password = ""
'''

[sinks.cnosdb]
type = "vector"
inputs = ["json_transform"]
address = "127.0.0.1:12006"
```

配置文件中的配置大体上分三种类型：sources，transforms，sinks，概念与之前提到的相同。

每个组件都有一个唯一的id，并以组件的类型作为前缀。

第一个组件为sources，id为generate_syslog，类型是demo_logs，以syslog为模板，100条数据。

第二个组件为transforms，id为remap_syslog，inputs告诉我们它接收的数据来源为generate_syslog，transform类型为remap，remap是vector在处理数据方面的一个强大的transform，提供了一种简单的语言，称为Vector Remap language，它允许你解析、操作和装饰经过Vector的事件数据。使用remap，可以将静态事件转换为信息数据，帮助询问和回答有关环境状态的问题。这里执行了一个parser_syslog函数，参数传入了message，将这个syslog解析成结构化事件。

第三个组件为sinks，id为emit_syslog，接收的数据来自于remap_syslog，类型为终端，将数据以json形式输出。

运行这个命令

```bash
vector --config vector.toml
```

将会在终端看到一些json形式的events，类似这些：
```bash
{"appname":"benefritz","facility":"authpriv","hostname":"some.de","message":"We're gonna need a bigger boat","msgid":"ID191","procid":9473,"severity":"crit","timestamp":"2021-01-20T19:38:55.329Z"}
{"appname":"meln1ks","facility":"local1","hostname":"for.com","message":"Take a breath, let it go, walk away","msgid":"ID451","procid":484,"severity":"debug","timestamp":"2021-01-20T19:38:55.329Z"}
{"appname":"shaneIxD","facility":"uucp","hostname":"random.com","message":"A bug was encountered but not in Vector, which doesn't have bugs","msgid":"ID428","procid":3093,"severity":"alert","timestamp":"2021-01-20T19:38:55.329Z"}
```

### Vector 与 CnosDB 集成

尽管目前Vector还没有支持CnosDB的Sink，但是由于CnosDB针对Vector做了数据导入的原生支持，用户可以通过类型为vector的Sink 直接把数据导入到CnosDB。

#### 写入Vector Log
vector配置文件如下

```toml
data_dir = "/tmp/vector"

[sources.in]
type = "file"
include = ["/tmp/MOCK_DATA.json"]

[transforms.json_transform]
type = "remap"
inputs = ["in"]
source = '''
    . = parse_json!(.message)
    # 写入的租户名
    ._tenant = "cnosdb"
    # 写入的数据库名
    ._database = "public"
    # 写入的表名
    ._table = "vector_log_test"
    # 用户及密码
    ._user = "root"
    ._password = ""
'''

[sinks.cnosdb]
type = "vector"
inputs = ["json_transform"]
address = "127.0.0.1:8906"
```
需要注意的是，需要将tenant，database等参数配置到source中，如果不设置，会使用默认配置。

执行命令
```bash
vector --config log_vector.toml
```
![write](../../../../.vuepress/public/_static/img/vector_log_output.png)

也可以使用grafna查看CnosDB log数据

![write](../../../../.vuepress/public/_static/img/vector_grafana_log_output.png)


#### 写入Vector Metric
示例收集Vector本身产生的metric

vector配置文件如下

```toml
[sources.example_metrics]
type = "internal_metrics"

[transforms.my_transform_id]
type = "remap"
inputs = [ "example_metrics" ]
source = """
# 与 Vector Log 类似，不同的是需要添加到 metric 的 tags 中，写入的 table 名为 metric 的 name 和 namespace（namespace.name），所以不需要指定 table 名
.tags._tenant = "cnosdb"
.tags._database = "public"
.tags._user = "root"
.tags._password = ""
"""

[sinks.cnosdb]
type = "vector"
inputs = ["my_transform_id"]
address = "127.0.0.1:8906"
```
需要注意的是，与日志类型配置文件不同，需要将参数如tenant，database等配置到.tags中。

执行命令
```bash
vector --config metric_vector.toml
```
![write](../../../../.vuepress/public/_static/img/vector_metric.png)

使用client连接CnosDB查询

![write](../../../../.vuepress/public/_static/img/vector_metric_output.png)
