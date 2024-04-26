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
