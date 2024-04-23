# REST API

## 状态码

| 状态码 | 描述                                                 |
| ------ | ---------------------------------------------------- |
| 200    | 请求成功。                                           |
| 204    | 请求成功，异步操作调用成功，不反回请求结果。         |
| 400    | 请求失败，参数错误或缺失。                           |
| 401    | 请求失败，用户名密码错误或用户不存在。               |
| 404    | 请求失败，错误的请求路径。                           |
| 405    | 请求失败，请求的路径不支持对应的请求方式。           |
| 413    | 请求失败，消息体过大，超过限制。                     |
| 422    | 请求失败，操作执行失败。                             |
| 429    | 请求失败，数据库同一时间接受的请求太多，请稍后重试。 |
| 500    | 请求失败，查询超时或外部环境引起的异常。             |
| 503    | 请求失败，服务不可用。                               |

## 接口列表

### `/api/v1/write`

#### 请求方法

- `POST`

#### 请求头

- `Authorizaton: Basic`

    `basic64(user_name + ":" + password)`

#### 请求参数

- `db`：数据库名称（可选，默认 `public`）
- `tanent`：租户名称（可选，默认`cnosdb`）
- `precision`：时间精度（可选，可用值为 `ms`、`us`、`ns`）

#### 请求体

- 行协议：有关行协议的具体内容可以看[这里](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/)

#### 请求示例

```bash
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/write?db=example" -d 't1,foo=a,bar=b v=1'
```

##### 请求成功

```
  HTTP/1.1 200 OK{'\n'}
  content-length: 0{'\n'}
  date: Sat, 08 Oct 2022 06:59:38 GMT{'\n'}
```

##### 请求失败

```
HTTP/1.1 500 Internal Server Error{'\n'}
content-length: 0{'\n'}
date: Sat, 08 Oct 2022 07:03:33 GMT{'\n'}
```

### `/api/v1/sql`

#### 请求方法

- `POST`

#### 请求头

- `Authorizaton: Basic`

  `basic64(user_name + ":" + password)`

#### 请求参数

- `db`：数据库名称（可选，默认 `public`）
- `tenant`：租户名称（可选，默认`cnosdb`）
- `chunked` ：是否流式返回结果数据。默认为`false`。

#### 请求示例

```bash
curl -i -u "username:password" -H "Accept: application/json" -XPOST "http://localhost:8902/api/v1/sql?db=example" -d 'SELECT * from t1'
```

##### 请求成功

```bash
HTTP/1.1 200 OK
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

##### 请求失败

```bash
HTTP/1.1 500 Internal Server Error
content-type: application/json
content-length: 139
date: Sat, 08 Oct 2022 07:17:06 GMT
... ...
```

### `/api/v1/ping`

#### 请求方法

- `GET`
- `HEAD`

#### 请求示例

```bash
curl -G 'http://localhost:8902/api/v1/ping'
```

##### 请求成功

```json
{
"version":"2.x.x",
"status":"healthy"
}
```

##### 请求失败

> 不返回任何结果



### `/api/v1/opentsdb/write`

#### 请求方法

- `POST`

#### 请求头

- `Authorizaton: Basic`

  `basic64(user_name + ":" + password)`

#### 请求参数

- `db`：数据库名称（可选，默认 `public`）
- `tanent`：租户名称（可选，默认`cnosdb`）
- `precision`：时间精度（可选，可用值为 `ms`、`us`、`ns`）

#### 请求体

```text
<metric> <timestamp> <value> <tagk_1>=<tagv_1>[ <tagk_n>=<tagv_n>]
```

#### 请求示例

```bash
curl -i -u "username:password" -XPOST "http://localhost:8902/api/v1/opentsdb/write?db=example" -d 'sys.if.bytes.out 1666165200290401000 1 host=web01 interface=eth0'
```

##### 请求成功

```bash
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

##### 请求失败

```
HTTP/1.1 500 Internal Server Error
content-length: 0
date: Sat, 08 Oct 2022 07:03:33 GMT
... ...
```

### `/api/v1/es/write`

#### 请求方法

- `POST`

#### 请求头

- `Authorizaton: Basic`

  `basic64(user_name + ":" + password)`

#### 请求参数

- `db`：数据库名称（可选，默认 `public`）
- `tanent`：租户名称（可选，默认`cnosdb`）
- `table`: 表名称 (必填)
- `time_column`: 指定日志中时间列名称 (可选, 默认`time`。 如果同时没有`time`列和`time_column`会使用当前时间)
- `tag_columns`: 指定日志中多个tag列 (可选，如果没有指定则全部按field列存储)

#### 请求体

- ES bulk格式，目前仅支持index和create，其中create会建表，如果表存在会报错并且后续指令不再执行；index则是无表就创建写入，有表就直接写入
参考:[bulk](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html)

#### 请求示例

```bash
curl -i -u "username:password" -XPOST 'http://127.0.0.1:8902/api/v1/es/write?table=table1&time_column=date&tag_columns=node_id,operator_system' -d '{"create":{}}
{"date":"2024-03-27T02:51:11.687Z", "node_id":"1001", "operator_system":"linux", "msg":"test"}
{"index":{}}
{"date":"2024-03-28T02:51:11.688Z", "node_id":"2001", "operator_system":"linux", "msg":"test"}'
```

#### 请求成功
```
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
```

```bash
curl -i -u "username:password" -XPOST 'http://127.0.0.1:8902/api/v1/es/write?table=table2&time_column=date&tag_columns=node_id,operator_system' -d '{"create":{}}
{"date":"2024-03-27T02:51:11.687Z", "node_id":"1001", "operator_system":"linux", "msg":"test"}
{"create":{}}
{"date":"2024-03-28T02:51:11.688Z", "node_id":"2001", "operator_system":"linux", "msg":"test"}'
```
第二个create指令执行时发现表存在，因此第一个指令执行成功，第二个指令执行失败

```
HTTP/1.1 200 OK
content-length: 0
date: Sat, 08 Oct 2022 06:59:38 GMT
The 2th command fails because the table tablename already exists and cannot be created repeatedly
```

#### 请求失败
```
{"error_code":"0100XX","error_message":"XXXXXXXXXXXXXXXXXXXXXXX"}
```

