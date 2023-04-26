---
title: REST API
order: 3
---

# REST API

## 接口列表

::: details /api/v1/write

**请求方法**

- POST

**请求头**

Authorization: BASIC

    basic64(user_name + ":" + password)

**请求参数**

- db: 数据库名字。（可选，不指定参数时为默认数据库 public）
- tenant: 租户名（可选，不指定参数时为默认租户 cnosdb）

**请求体**
- 行协议：有关行协议的具体内容可以看[这里](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/)


**请求示例**

```shell
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/write?db=example" -d 't1,foo=a,bar=b v=1 3'
```

**请求成功**

```shell
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

**请求失败**
> 请求失败将返回4xx或5xx。

```shell
HTTP/1.1 500 Internal Server Error
content-length: 0
date: Sat, 08 Oct 2022 07:03:33 GMT
... ...
```
:::


::: details /api/v1/sql

**请求方法**

- POST

**请求头**

- Authorization: BASIC

       basic64(user_name + ":" + password)

- Accept: application/csv | application/json | application/nd-json

- Accept-Encoding: identity | gzip | compress | deflate | br | *

**请求参数**

- db: 数据库的名字。（可选，不指定参数时为默认数据库 public）
  根据当前请求上下文的默认数据库。
- tenant: 租户名（可选，不指定参数时为默认租户 cnosdb）
- chunked
  是否流式返回结果数据。默认为false。

**请求示例**

```curl
curl -i -u "username:password" -H "Accept: application/json" -XPOST "http://localhost:8902/api/v1/sql?db=example" -d 'SELECT * from t1'
```

**请求成功**
```shell
HTTP/1.1 200 OK
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

**请求失败**
> 请求失败将返回4xx或5xx。
```shell
HTTP/1.1 500 Internal Server Error
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```
:::

::: details /api/v1/ping

**请求方法**

- GET
- HEAD

**请求示例**
```
curl -G 'http://localhost:8902/api/v1/ping'
```

请求成功
```json
{
"version":"2.0.0",
"status":"healthy"
}
```
请求失败
> 不反回任何结果
:::

## 状态码

| 状态码                                   | 描述                                                           |
|---------------------------------------|--------------------------------------------------------------|
| 200                                   | 请求成功。                                                        |
| <span style="color: grey;">204</span> | <span style="color: grey;">请求成功，异步操作调用成功，不反回请求结果。</span>     |
| 400                                   | 请求失败，参数错误或缺失。                                                |
| 401                                   | 请求失败，用户名密码错误或用户不存在。                                          |
| 404                                   | 请求失败，错误的请求路径。                                                |
| 405                                   | 请求失败，请求的路径不支持对应的请求方式。                                        |
| 413                                   | 请求失败，消息体过大，超过限制。                                             |
| 422                                   | 请求失败，操作执行失败。                                                 |
| <span style="color: grey;">429</span> | <span style="color: grey;">请求失败，数据库同一时间接受的请求太多，请稍后重试。</span> |
| 500                                   | 请求失败，查询超时或外部环境引起的异常。                                         |
| 503                                   | 请求失败，服务不可用。                                                  |