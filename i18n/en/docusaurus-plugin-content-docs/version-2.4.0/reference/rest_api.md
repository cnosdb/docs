# REST API

## Status Codes

| Status Code | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| 200         | Request successful.                                          |
| 204         | Request successful, asynchronous operation called successfully, no request result returned. |
| 400         | Request failed, parameter error or missing.                  |
| 401         | Request failed, username or password incorrect, or user does not exist. |
| 404         | Request failed, incorrect request path.                      |
| 405         | Request failed, requested path not supported for the corresponding request method. |
| 413         | Request failed, message body too large, exceeds limit.       |
| 422         | Request failed, operation execution failed.                  |
| 429         | Request failed, too many requests received by the database at the same time, please retry later. |
| 500         | Request failed, query timeout or exception caused by external environment. |
| 503         | Request failed, service unavailable.                         |

## API Endpoints

### `/api/v1/write`

#### Method

- `POST`

#### Header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- `db`: Database name (optional, default is `public`).
- `tenant`: Tenant name (optional, default is `cnosdb`).
- `precision`: Time precision (optional, acceptable values are `ms`, `us`, `ns`).

#### Body

- Line Protocol: For details on the line protocol, you can refer [here](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/).

#### Example

```curl
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/write?db=example" -d 't1,foo=a,bar=b v=1'
```

##### Successful

```sh
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

##### Failed

```sh
HTTP/1.1 500 Internal Server Error
content-length: 0
date: Sat, 08 Oct 2022 07:03:33 GMT
... ...
```

### `/api/v1/sql`

#### Method

- `POST`

#### Header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- `db`: Database name (optional, default is `public`).
- `tenant`: Tenant name (optional, default is `cnosdb`).
- `chunked`: Whether to stream the result data. Default is `false`.

#### Example

```curl
curl -i -u "username:password" -H "Accept: application/json" -XPOST "http://localhost:8902/api/v1/sql?db=example" -d 'SELECT * from t1'
```

##### Successful

```sh
HTTP/1.1 200 OK
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

##### Failed

```sh
HTTP/1.1 500 Internal Server Error
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

### `/api/v1/ping`

#### Method

- `GET`
- `HEAD`

#### Example

```curl
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

#### Method

- `POST`

#### Header

- `Authorization: Basic`

  `basic64(user_name + ":" + password)`

#### Parameters

- `db`: Database name (optional, default is `public`).
- `tenant`: Tenant name (optional, default is `cnosdb`).
- `precision`: Time precision (optional, acceptable values are `ms`, `us`, `ns`).

#### Body

```text
<metric> <timestamp> <value> <tagk_1>=<tagv_1>[ <tagk_n>=<tagv_n>]
```

#### Example

```curl
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/opentsdb/write?db=example" -d 'sys.if.bytes.out 1666165200290401000 1 host=web01 interface=eth0'
```

##### Successful

```sh
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

##### Failed

```sh
HTTP/1.1 500 Internal Server Error
content-length: 0
date: Sat, 08 Oct 2022 07:03:33 GMT
... ...
```
