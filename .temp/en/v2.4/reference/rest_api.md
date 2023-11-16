---
title: REST API
order: 3
---

# REST API

## **List of Interfaces**

::: details /api/v1/write

**Request Method**

- POST

**Request Header**

Authorization: BASIC

basic64(user_name + ":" + password)

**Request Parameter**

- db: name of database (optional, default database is public)
- tenant: name of tenant (optional, if not specified, the default tenant cnosdb will be used)
- precision: time precision (optional, `ms`/`us`/`ns` can be used)

**Request Body**

- Line agreement: The details of the line agreement can be seen [here](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/).

**Request Example**

```shell
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/write?db=example" -d 't1,foo=a,bar=b v=1'
```

**Request Succeeded**

```shell
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

**Request Failed**

> A failed request will return 4xx or 5xx.
```
HTTP/1.1 500 Internal Server Error
content-length: 0
date: Sat, 08 Oct 2022 07:03:33 GMT
... ...
```
:::

::: details /api/v1/sql

**Request Method**

- POST

**Request Header**

- Authorization: BASIC

basic64(user_name + ":" + password)

- Accept: application/csv | application/json | application/nd-json

- Accept-Encoding: identity | gzip | compress | deflate | br | *

**Request Parameter**

- db : name of database (optional, default database is public)
  Default database based on the current request context.
- tenant: name of tenant (optional, if not specified, the default tenant cnosdb will be used)
- chunked
  Whether or not stream the result data; Default is false.

**Request Example**

```shell
curl -i -u "username:password" -H "Accept: application/json" -XPOST "http://localhost:8902/api/v1/sql?db=example" -d 'SELECT * from t1'
```

**Request Succeeded**

```shell
HTTP/1.1 200 OK
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

**Request Failed**

> A failed request will return 4xx or 5xx.
> 
```shell
HTTP/1.1 500 Internal Server Error
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```
:::

::: details /api/v1/ping

**Request Method**

- GET
- HEAD

**Request Example**

```shell
curl -G 'http://localhost:8902/api/v1/ping'
```

**Request Succeeded**

```json
{
"version":"2.0.0",
"status":"healthy"
}
```
**Request Failed**

> No result will be returned.
:::

::: details /api/v1/opentsdb/write

****

- POST

**Request Head**

Authorization: BASIC

    basic64(user_name + ":" + password)

**Request Parameter**

- db: name of database (optional, default database is public)
- tenant: name of tenant (optional, if not specified, the default tenant cnosdb will be used)
- precision: time precision (optional, `ms`/`us`/`ns` can be used)

**Request Body**

```
<metric> <timestamp> <value> <tagk_1>=<tagv_1>[ <tagk_n>=<tagv_n>]
```

**Request Example**

```shell
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/opentsdb/write?db=example" -d 'sys.if.bytes.out 1666165200290401000 1 host=web01 interface=eth0'
```

**Request Succeed**

```shell
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

**Request Failed**

> A failed request will return 4xx or 5xx.
```shell
HTTP/1.1 500 Internal Server Error
content-length: 0
date: Sat, 08 Oct 2022 07:03:33 GMT
... ...
```
:::

## Status Code

| Status Code                           | Description                                                                                              |
|---------------------------------------|----------------------------------------------------------------------------------------------------------|
| 200                                   | Request succeeded.                                                                                       |
| <span style="color: grey;">204</span> | Request succeeded, the asynchronous operation is called successfully, and not return the request result. |
| 400                                   | Request failed with incorrect or missing parameters.                                                     |
| 401                                   | Request failed because of incorrect username or password or non-existent user.                           |
| 404                                   | Request failed because of wrong request path.                                                            |
| 405                                   | Request failed because the requested path does not support the corresponding request method.             |
| 413                                   | Request failed because the message body so large that exceeded the limit.                                |
| 422                                   | Request failed because the operation execution failed.                                                   |
| <span style="color: grey;">429</span> | Request failed; the database is accepting too many requests at the same time, please try again later.    |
| 500                                   | Request failure because of query timeout or exception caused by external environment.                    |
| 503                                   | Request failed; the service is unavailable.                                                              |