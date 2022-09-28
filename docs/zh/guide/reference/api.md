---
title: 编程接口
icon: config
---

::: details /ping

**参数**

- xxx: description
- xxx: description

**示例**
```
```


成功
```

```
失败
```

```


:::




::: tip
以下这些都不对，上面重新列举了API接口文档的编写规范
:::

## 路径

| 路径   | 描述 |
| :-------------: |:-------------: |
|/ping|获取CnosDB实例的运行状态与版本号|
|/write|向预先存在的database中写入数据|
|/query|查询数据、管理database|


### /ping

获取CnosDB实例的运行状态与版本号。

#### 支持的请求类型
- GET
- HEAD

#### 定义
```shell
http://localhost:31007/ping
```

#### 示例

```shell
~ curl -sl -I http://localhost:31007/ping

HTTP/1.1 204 No Content
Content-Type: application/json
Request-Id: 9c353b0e-aadc-11e8-8023-000000000000
X-CnosDB-Build: OSS
X-CnosDB-Version: v1.7.11
X-Request-Id: 9c353b0e-aadc-11e8-8023-000000000000
Date: Tue, 05 Nov 2018 16:08:32 GMT
```

| 字段名   | 描述 |
| :-------------: |:-------------: |
|X-CnosDB-Build|OSS（open source）代表开源版，ENT（enterprise）代表商业版。|
|X-CnosDB-Version|CnosDB版本号|


### /query

用于执行语句以查询数据、管理database。

#### 支持的请求类型
- GET：用于普通SELECT语句和SHOW语句
- POST：CREATE语句、DELETE语句和DROP语句

#### 定义
```shell
http://<host>:<port>/ping
```
 | HTTP状态码   | Response Body | 描述 |
 | :-------------: |:-------------: |
 | 200 OK | JSON格式的结果集。|语句执行成功。 |
 | 400 Bad Request | JSON格式的语句报错信息。| 语句执行报错，比如语法错误、database和table不存在等。|
 | 401 Unautorized| 空。|身份认证失败。 |

#### 示例

```shell
$ curl -G 'http://localhost:31007/query?db=mydb&pretty=true'  \
--data-urlencode 'q=SELECT * FROM "mytable"'
{
"results": [{
"statement_id": 0,
"series": [{
"name": "mytable",
"columns": ["time", "myfield", "mytag1", "mytag2"],
"values": [
["2017-03-01T00:16:18Z", 33.1, null, null],
["2017-03-01T00:17:18Z", 12.4, "12", "14"]
]
}]
}]
}
```

### /write
#### 支持的请求类型
- POST
#### 定义
```
http://<host>:<port>/write
```
| HTTP状态码   | Response Body | 描述 |
| :-------------: |:-------------: |:-------------: |
| 200 OK | 空。|数据写入成功 |
| 400 Bad Request | JSON格式的报错信息。| 执行报错，比如语法错误、table不存在等。|
| 401 Unautorized| 空。|身份认证失败。 |
|404 Not Found|JSON格式的报错信息。|用户向不存在的database写入数据。|
|413 Request Entity Too Large|JSON格式的报错信息。|Request Body太大。|
|500 Internal Server Error||系统错误。|
#### 示例

```
$ curl -i -XPOST "http://localhost:31007/write?db=mydb&precision=s" \
--data-binary 'mymeas,mytag=1 myfield=90 1463683075'
HTTP/1.1 204 No Content
Content-Type: application/json
Request-Id: [...]
X-CnosDB-Version: 0.1.0
Date: Wed, 08 Nov 2017 17:33:23 GMT
```