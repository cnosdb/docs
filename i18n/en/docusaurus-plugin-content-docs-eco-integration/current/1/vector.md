---
title: Vector
slug: /vector
---

> [Vector](https://github.com/vectordotdev/vector) is a high-performance observable data pipeline that enables organizations to control their observable data.Collect, convert and route all logs, metrics to any supplier currently in use, or any other supplier that may wish to use in the future.Vector can significantly reduce costs where you need it most (rather than where suppliers are the easiest), enrich data and provide data security.Vector is open source and is nearly 10 times faster than any alternative.
> ![write](/img/vector_concept.png)

#### Popup Model

![write](/img/vector_topology.png)

Vector has three main features module：Sources,Transforms,Sinks

Data entered from Source to Vector, processed with some Transforms logic and released to Sink.Vector made up a complete flow line of data via Source, Transform, Sink different types of components.

Source is an available source of data such as files, Kafka, Syslog etc.And a Sink is a terminal for receiving and consuming data, such as Clickhouse, Splank, Datadog Logs, or a log analysis platform.

Transform is used to convert, modify and filter data flows to meet specific needs.It can convert and process input data such as renaming fields, filtering data lines, adding new fields, deleting fields, etc.Using a transformer, data can be converted to the required format and routed to the correct target.Support a wide range of conversion methods, including grok, JSON, CSV, regex, lua, etc.It also supports multiple data formats and protocols such as JSON, YAML, CSV, Syslog, HTTP, TCP, etc.

Sink is a processed and converted data stream that needs to be sent to the target storage or analysis system.Vector supports multiple types of sink, including files, standard output, TCP/UDP, HTTP, Kafka, S3, Elasticsearch, Dataog, InfluxDB, etc.

Simply sum up the two main types of feature： that Vector has

• Data collection and transfer

It can fetch data from the source of the data collection and eventually transfer it to the consumer Sink.

• Data processing capacity

The collected data can be parsed, sampled, aggregated, etc. through the internal Transform Functional Modules.

### Introduction to Vector usage

As a tool, vector's ease of use is high.

It supports installing in many different ways, installing packages download, package manager, etc. to get a binary Binary, its only dependency is a configuration file.

Edit profile vector.toml

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

The configuration in the configuration file is broadly divided into three types of：sources,transforms,sinks, with the same concept as previously mentioned.

Each component has a unique id and prefix with the type of component.

The first component is sources,id generate_syslog, type Demo_logs, using syslog as a template, and 100 data.

The second component is transforms,id reap_syslog,inputs tell us that it receives data from generate_syslog,transforms type reap,remop is a powerful transformation of vector in processing data and provides a simple language called Vector Remap Language, which allows you to sold, operate, and decorate Vector event data.Using reap, static events can be converted to information data to help ask and answer questions about the state of the environment.Here is a parser_syslog function, parameters passed into message, parsing this syslog into a structured event.

The third component is sinks, id is emit_syslog. Received data from remoap_syslog, type is terminal, and output data in json.

Run this command

```bash
vector --config vector.toml
```

Some json events will be seen in the terminal, similar to these：

```bash
{"appname":"beneficiz","facility":"auth","hostname":"some.de", "message": "We're gonna need a bigger boat", "msgid":"ID191", "process":9473,"severity":"rit", "timestamp":"2021-01-20T19:38:55.329Z"}
{"appname":"meln1ks","facility":"local1", "hostname":". om","message":"Make a breath, let it go, walk away", "msgid":"ID451", "process":484,"severity": "debug", "timestamp":"2021-01-20T19:38:55.329Z"}
{"appname":"ShaneIxD", "facility":"uucp", "hostname":""""random.com":"A bug was counted" but not in Vector, which doesn't have bugs", "msgid", ":"ID428", "process":3093,"severity":"alert", "timestamp":"2021-01-20T19:38:55.329Z"}
```

### Vector integration with CnosDB

Although Vector currently does not support CnosDB Sink, because of the nosDB native support for data import to Vector, users can import data directly into CnosDB via Sink of type vector.

#### Write to Vector Log

vector configuration file below

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

Note that the tenant, database's and other parameters need to be configured into source; if not set, default configuration will be used.

Execute command

```bash
vector --config log_vector.toml
```

![write](/img/vector_log_output.png)

Can also view CnosDB log data with grafna

![write](/img/vector_grafana_log_output.png)

#### Write to Vector Metric

Sample collection of metric generated by Vector itself

vector configuration file below

```toml
[sources.example_metrics]
type = "internal_metas"

[transforms.my_transform_id]
type = "remov"
inputs = [ "example_metrics" ]
source = """
# similar to Vector Log, The same is the name of the table named metric and the name(namespace) that needs to be added to metrics. A table name
is not required. ags._tenant = "cnosdb"
.tags._database = "public"
.tags._user = "root"
.tags. password = ""
"""

[sinks.cnosdb]
type = "vector"
inputs = ["my_transform_id"]
address = "127.0.0.1:8906"
```

Note that, unlike log type configuration files, parameters such as tenant, database, etc. need to be configured in .tags.

Execute command

```bash
vector --config metric_vector.toml
```

![write](/img/vector_metric.png)

Connect to CnosDB queries with clients

![write](/img/vector_metric_output.png)
