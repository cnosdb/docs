# REST API

## Status Code

| Status Code | Description                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| 200         | Request Succeeded.                                                                               |
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

- `db`: Database name (optional, default is `public`).
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

- `db`: Database name (optional, default is `public`).
- API Endpoints
- `chunked`: Whether to stream the result data.Default is `false`.

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

- `db`: Database name (optional, default is `public`).
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

### `/apv/v1/es/write`

#### Request Method

- `POST`

#### Request header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- `db`: Database name (optional, default is `public`).
- `tenant`: Tenant name (optional, default is `cnosdb`).
- `table`: Table Name (required)
- `msg_field`: Enter the message column in the log (optional, default `_msg`. If `_msg` and `msg_field` are not available at the same time
- `time_field`: Enter the time column in the log (optional, default`_time`. If current time is not used)

#### Request body

- ES bulk format currently supports only indexes and creates, in which create forms will form and write if they exist and subsequent instructions are not executed; indexes are written without a tabul, and are written directly to
  reference:[bulk](https://www.elastic.co/guidelin/en/elasticsearch/reference/current/docs-bulk.html).

#### Example

```bash
echo '{"create":{}}
{"msg":"test", "time":"2024-03-27T02:51:11.687Z"}
{"index":{}}
{"msg":"test", "time":"2024-03-27T02:51:11.688Z"}
' | curl -X POST -u "username:password" --data-binary @- 'http://127.0.0.1:8902/api/v1/es/write?table=test&msg_field=msg&time_field=time'
```

#### Successful

```
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT

or

The 2th command fails because the table tablename already exists and cannot be created repeatedly
```

#### Failed

```
{"error_code":"0100XX","error_message":"XXXXXXXXXXXXXXXXXXXXXXX"}
```
