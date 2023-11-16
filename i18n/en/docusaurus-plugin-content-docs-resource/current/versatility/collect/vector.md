---
title: Vector
order: 2
---

## Vector

### Concept

#### Introduction

![write](/img/vector_concept.png)

[Vector](https://github.com/vectordotdev/vector) is a high performance observable data pipeline that enables organizations to control their observables. Collect, transform, and route all logs, metric to any vendor that is in use now, or any other vendor that you may want to use in the future. Vectors can dramatically reduce costs where you need them most (not where it's most convenient for the vendor), make your data fresh and richer, and provide data security. Vector is open source and is nearly 10x faster than any alternative.

Vector is downloaded millions of times per month and companies like T-Mobile, Comcast, Zendesk, and Discord rely on it for observability data.


#### Topology model

![write](/img/vector_topology.png)

Vector has three main modules: Sources, Transforms, Sinks.

The data goes from the Source to the Vector, where it goes through some Transforms, and then it's sent to the Sink. Vector consists of three different types of components: Source, Transform and Sink.

Source is a data source, such as a file, Kafka, Syslog, etc. A Sink is the endpoint that receives and consumes the data, such as a database such as Clickhouse, Splank, Datadog Logs, or a log analysis platform.

Transform is used to transform, modify, and filter data streams to meet specific requirements. It can perform various transformations and processing on the input data, such as renaming fields, filtering data rows, adding new fields, deleting fields, etc. Using the transform component, the data can be transformed into the desired format and routed to the correct destination. Supports multiple conversion methods, including grok, JSON, CSV, regex, lua, and more. It also supports multiple data formats and protocols such as JSON, YAML, CSV, Syslog, HTTP, TCP, etc.

The Sink is the destination storage or analysis system to which the processed and transformed data stream needs to be sent. Vector supports many types of sinks, including file, standard output, TCP/UDP, HTTP, Kafka, S3, Elasticsearch, Datadog, InfluxDB, and more

Let's summarize the two main types of functionality that vectors have:

● Data acquisition and transmission

It can obtain data from the Source of the data collection side and finally transmit it to the Sink of the data consumption side.

● Ability of data processing

The collected data can be parsed, sampled, aggregated and other different types of processing through the internal Transform function module.

### How to use Vector

As a tool, vector's ease of use is high.

It supports installation in many different ways, install package downloads, package managers, etc. Once installed, you get a Binary whose only dependency is a configuration file.

Edit the vector.toml configuration file

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
  # tenant name to write
  ._tenant = "cnosdb"
   # database name to write
  ._database = "public"
    # table name to write
  ._table = "vector_log_test"
    # username and password
  ._user = "root"
  ._password = ""
'''

[sinks.cnosdb]
type = "vector"
inputs = ["json_transform"]
address = "127.0.0.1:12006"
```

The configurations in the configuration file fall into three broad categories: sources, transforms, and sinks, and the concepts are the same as mentioned earlier.

Each component has a unique id that is prefixed with the type of the component.

The first component is sources with an id of generate_syslog, a type of demo_logs, and a syslog template with 100 entries.

The second component is transforms, which has an id of remap_syslog, inputs tells us that it receives data from generate_syslog, and the transform type is remap. remap is a powerful transform of vector for processing data, providing a simple language, called Vector Remap language, that allows you to parse, manipulate, and decorate event data that passes through a Vector. Using remap, static events can be transformed into informative data that help ask and answer questions about the state of the environment. Here, a parser_syslog function is executed with message, which parses the syslog into a structured event.

The third component is a sinks with an id of emit_syslog, which receives data from remap_syslog as a terminal and outputs it as json.

Run this command:

```bash
vector --config vector.toml
```

You can see the output of the data in the console:

```bash
{"appname":"benefritz","facility":"authpriv","hostname":"some.de","message":"We're gonna need a bigger boat","msgid":"ID191","procid":9473,"severity":"crit","timestamp":"2021-01-20T19:38:55.329Z"}
{"appname":"meln1ks","facility":"local1","hostname":"for.com","message":"Take a breath, let it go, walk away","msgid":"ID451","procid":484,"severity":"debug","timestamp":"2021-01-20T19:38:55.329Z"}
{"appname":"shaneIxD","facility":"uucp","hostname":"random.com","message":"A bug was encountered but not in Vector, which doesn't have bugs","msgid":"ID428","procid":3093,"severity":"alert","timestamp":"2021-01-20T19:38:55.329Z"}
```

### Vector and CnosDB

Although Vector does not currently have a CnosDB Sink, CnosDB has native support for Vector data import, so you can directly import data into CnosDB through a Sink of type vector.

#### Write to Vector Log

vector configuration file as follows:

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
    # tenant name to write
    ._tenant = "cnosdb"
    # database name to write
    ._database = "public"
    # table name to write
    ._table = "vector_log_test"
    # username and password
    ._user = "root"
    ._password = ""
'''

[sinks.cnosdb]
type = "vector"
inputs = ["json_transform"]
address = "127.0.0.1:8906"
```
It is important to note that parameters such as tenant, database need to be configured into the source, if not set, the default configuration will be used.

run this command:

```bash
vector --config log_vector.toml
```

![write](/img/vector_log_output.png)

You can also use grafna to view CnosDB log data:

![write](/img/vector_grafana_log_output.png)


#### Write to Vector Metric

collect Vector's own generated metric as an example

vector configuration file as follows:

```toml
[sources.example_metrics]
type = "internal_metrics"

[transforms.my_transform_id]
type = "remap"
inputs = [ "example_metrics" ]
source = """
# Similar to Vector Log, except that to be added to metric tags, the table is written with the metric name and namespace (namespace.name), so we don't need to specify the table name
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
It's important to note that unlike the log type configuration file, parameters like tenant, database, etc. need to be configured into.tags.

Run this command:

```bash
vector --config metric_vector.toml
```
![write](/img/vector_metric.png)

Use the client to connect to CnosDB to query

![write](/img/vector_metric_output.png)