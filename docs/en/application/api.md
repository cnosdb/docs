---
title: REST API
order: 2
---

## **List of interfaces**

::: details /api/v1/write

**Request Method**

- POST

**Request Header**

Authorization: BASIC

basic64(user_name + ":" + password)

**Request Parameter**

- db：name of database

**Request Body**

- Line agreement: The details of the line agreement can be seen[here](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/)


**Request Example**

```
curl -i -u "username:password" -XPOST ""http://localhost:31007/api/v1/write?db=example -d 't1,foo=a,bar=b v=1 3'
```

**Request succeeded**

```shell
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

**Request failed**

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

**Request parameter**

- db
Default database based on the current request context.
- chunked
Whether or not stream the result data; Default is false.

**Request Example**

```curl
curl -i -u "username:password" -H "Accept: application/json" -XPOST ""http://localhost:31007/api/v1/sql?db=example -d 'SELECT * from t1'
```

**Request succeeded**

```shell
HTTP/1.1 200 OK
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

**Request failed**

> A failed request will return 4xx or 5xx.
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

```
curl -G 'http://localhost:31007/api/v1/ping'
```

**Request succeeded**

```json
{
"version":"2.0.0",
"status":"healthy"
}
```
**Request failed**

> No result will be returned.
:::

## Status Code

| Status Code  | Description |
| ------------------- | ---- |
| 200                 | Request succeeded. |
| <span style="color: grey;">204</span> | Request succeeded, the asynchronous operation is called successfully, and not return the request result. |
| 400                 | Request failed with incorrect or missing parameters. |
| 401                 | Request failed because of incorrect username or password or non-existent user. |
| 404                 | Request failed because of wrong request path. |
| 405                 | Request failed because the requested path does not support the corresponding request method. |
| 413                 | Request failed because the message body so large that exceeded the limit. |
| 422                 | Request failed because the operation execution failed. |
| <span style="color: grey;">429</span>| Request failed; the database is accepting too many requests at the same time, please try again later.。 |
| 500                 | Request failure because of query timeout or exception caused by external environment. |
| 503                 | Request failed; the service is unavailable. |