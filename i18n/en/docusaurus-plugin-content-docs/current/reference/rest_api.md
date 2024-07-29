---
sidebar_position: 2
---

# REST API

## Status Code

| Status Code | Description                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| 200         | Body                                                                                                             |
| 204         | Request successful, asynchronous operation called successfully, no request result returned.      |
| 400         | Request failed, parameter error or missing.                                                      |
| 401         | Request failed, username or password incorrect, or user does not exist.                          |
| 404         | Request failed, incorrect request path.                                                          |
| 405         | Request failed, requested path not supported for the corresponding request method.               |
| 413         | Request failed, message body too large, exceeds limit.                                           |
| 422         | Request failed, operation execution failed.                                                      |
| 429         | Request failed, too many requests received by the database at the same time, please retry later. |
| 500         | Request failed, query timeout or exception caused by external environment.                       |
| 503         | Request failed, service unavailable.                                                             |

## Interface List

### `/api/v1/write`

#### Request Method

- `POST`

#### Request header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- Method
- `tenant`: Tenant name (optional, default is `cnosdb`).
- `precision`: Time precision (optional, acceptable values are `ms`, `us`, `ns`).

#### Request body

- Line Protocol: For details on the line protocol, you can refer [here](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/).

#### Example

```bash
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/write?db=example" -d 't1,foo=a,bar=b v=1'
```

##### Successful

```
  HTTP/1.1 200 OK{'\n'}
  content-length: 0{'\n'}
  date: Sat, 08 Oct 2022 06:59:38 GMT{'\n'}
```

##### Failed

```
HTTP/1.1 500 Internal Server Error{'\n'}
content-length: 0{'\n'}
date: Sat, 08 Oct 2022 07:03:33 GMT{'\n'}
```

### `/api/v1/sql`

#### Request Method

- `POST`

#### Request header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- Method
- API Endpoints
- `chunked`: Whether to stream the result data. Default is `false`.Default is `false`.

#### Example

```bash
curl -i -u "username:password" -H "Accept: application/json" -XPOST "http://localhost:8902/api/v1/sql?db=example" -d 'SELECT * from t1'
```

##### Successful

```bash
HTTP/1.1 200 OK
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

##### Failed

```bash
HTTP/1.1 500 Internal Server Error
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

### `/api/v1/ping`

#### Request Method

- `GET`
- `HEAD`

#### Example

```bash
curl -G 'http://localhost:8902/api/v1/ping'
```

##### Successful

```json
{
"version":"2.x.x",
"status":"healthy"
}
```

##### Failed

> No result returned

### `/api/v1/opentsdb/write`

#### Request Method

- `POST`

#### Request header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- Method
- `tenant`: Tenant name (optional, default is `cnosdb`).
- `precision`: Time precision (optional, acceptable values are `ms`, `us`, `ns`).

#### Request body

```text
<metric> <timestamp> <value> <tagk_1>=<tagv_1>[ <tagk_n>=<tagv_n>]
```

#### Example

```bash
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/opentsdb/write?db=example" -d 'sys.if.bytes.out 1666165200290401000 1 host=web01 interface=eth0'
```

##### Successful

```bash
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

##### Failed

```
HTTP/1.1 500 Internal Server Error
content-length: 0
date: Sat, 08 Oct 2022 07:03:33 GMT
... ...
```

### `/api/v1/es/_bulk`

#### Request Method

- `POST`

#### Request header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- Method
- `tenant`: Tenant name (optional, default is `cnosdb`).
- `table`: Table Name (required)
- `log_type`: Log type, including `bulk`, `loki`, and `ndjson` (optional, default `bulk`)
- `time_column`: Specify the name of the time column in the log (optional, default is `time`). If there is no `time` column and `time_column`, the current time will be used)
- `tag_columns`: Specifies multiple tag columns in the log (optional, if not specified, all will be stored in field columns)

#### Request body

- [ES bulk format](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html)

- [Loki format](https://grafana.com/docs/loki/latest/api/#post-lokiapiv1push)

- [ndjson format](https://jsonlines.org/)

#### ES bulk request example

```bash
curl -i -u "username:password" -XPOST 'http://127.0.0.1:8902/api/v1/es/_bulk?table=t1&time_column=date&tag_columns=node_id,operator_system' -d '{"create":{}}
{"date":"2024-03-27T02:51:11.687Z", "node_id":"1001", "operator_system":"linux", "msg":"test"}
{"index":{}}
{"date":"2024-03-28T02:51:11.688Z", "node_id":"2001", "operator_system":"linux", "msg":"test"}'
```

#### loki request example

```bash
curl -i -u "username:password" -XPOST 'http://127.0.0.1:8902/api/v1/es/_bulk?table=t1&log_type=loki' -d '
{"streams": [{ "stream": { "instance": "host123", "job": "app42" }, "values": [ [ "0", "foo fizzbuzz bar" ] ] }]}'
```

#### ndjson request example

```bash
curl -i -u "username:password" -XPOST 'http://127.0.0.1:8902/api/v1/es/_bulk?table=t1&log_type=ndjson&time_column=date&tag_columns=node_id,operator_system' -d '{"date":"2024-03-27T02:51:11.687Z", "node_id":"1001", "operator_system":"linux", "msg":"test"}
{"date":"2024-03-28T02:51:11.688Z", "node_id":"2001", "operator_system":"linux", "msg":"test"}'
```

### `/api/v1/traces`

#### Request Method

- `POST`

#### Request header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

- `tenant`: Tenant name (optional, default is `cnosdb`).

- Method

- `table`: Table Name (required)

#### Usage

Use this interface to write OpenTelemetry trace data, below is a Python example:

```python
import base64
from opentelemetry.sdk.resources import SERVICE_NAME, Resource

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Service name is required for most backends
resource = Resource(attributes={
    SERVICE_NAME: "test_service"
})
traceProvider = TracerProvider(resource=resource)

# 用户名和密码
username = "root"
password = ""

# 编码用户名和密码
credentials = f"{username}:{password}"
encoded_credentials = base64.b64encode(credentials.encode("utf-8")).decode("utf-8")

# 创建包含身份验证信息的头
headers = {
    "Authorization": f"Basic {encoded_credentials}",
    "tenant": "cnosdb",
    "db": "public",
    "table": "t1",
}

processor = BatchSpanProcessor(OTLPSpanExporter(
    endpoint="http://127.0.0.1:8902/api/v1/traces",
    headers=headers
))
traceProvider.add_span_processor(processor)

trace.set_tracer_provider(traceProvider)

for trace_index in range(10):
    tracer = trace.get_tracer(f"test_trace_{trace_index}")
    with tracer.start_as_current_span(f"trace_{trace_index}_parent_span") as parent_span:        
         with tracer.start_as_current_span("child_span_1") as child_span_1:
               with tracer.start_as_current_span("child_span_2") as child_span_2:
                    tracer.start_as_current_span("child_span_3")

# 关闭TracerProvider以确保所有span都已经被导出
trace.get_tracer_provider().shutdown()
```
