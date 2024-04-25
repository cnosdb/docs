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
