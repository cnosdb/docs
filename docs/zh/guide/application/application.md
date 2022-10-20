---
title: 应用开发
icon: config
order: 1
---

## Rust

示例代码使用[reqwest](https://crates.io/crates/reqwest)构建Http请求

http请求需要指定操作的数据库，写在url query里 db=database_name

```rust
let url = Url::parse("127.0.0.1:31007/api/v1/sql?db=public&pretty=true").unwrap();
let sql = r#"
    CREATE TABLE cpu (
        power DOUBLE,
        temperature DOUBLE
        TAGS(host, machine)
    );"#.to_string();
```

请求执行的sql放在http的body中

用户名和密码需要basic编码添加到Authorization头中

```rust
let user_name = "cnosdb";
let password = "";
let http_client = reqwest::Client::new();
let request = http_client
    .request(Method::POST, url)
    //用户名和密码
    .basic_auth::<&str, &str>(user_name, Some(password))
    .body(sql)
    .build().unwrap();
```

response的status code 会指示sql是否执行成功，200为成功。

失败信息或正确执行的结果会在response的text()中

```rust
let response = http_client.execute(request).await.unwrap();
let success = response.status().is_success();
let result = response.text().await.unwrap();
```

## Golang

示例代码使用[fasthttp](https://github.com/valyala/fasthttp)作为依赖

以下为构造http request所需的参数
```go
user := "cnosdb"
pwd := ""
// db means database, we use default db 'public'
url := "http://127.0.0.1:31007/" + "api/v1/sql?db=public&pretty=true"
query1 := "CREATE TABLE cpu (" +
	"power DOUBLE," +
	"temperature DOUBLE," +
	"TAGS(host, machine));"
```
构造http request
```go
func basicAuth(username, password string) string {
    auth := username + ":" + password
    return "Basic " + base64.StdEncoding.EncodeToString([]byte(auth))
}

req := fasthttp.AcquireRequest()
req.Header.SetMethod("POST")
req.Header.Set("Authorization", basicAuth(user, pwd))
req.SetBody([]byte(query1))
req.SetRequestURI(url)
```
发送http请求
```go
cli := fasthttp.Client{}
resp := fasthttp.Response{}
err := cli.Do(req, &resp)
if err != nil {
	return
}
fmt.Println(resp.StatusCode())
```
response的status code 会指示sql是否执行成功，200为成功。

## Java

使用[Apache HttpComponentsApache](https://hc.apache.org/)作为依赖

```java
public static void main(String[] args) {
    String database = "public";
    String name = "cnosdb";
    String pwd = "";
    String query = "CREATE TABLE cpu (power DOUBLE, temperature DOUBLE, TAGS(host, machine));";
    String url = "http://127.0.0.1:31007/";

    try {
        CloseableHttpClient client = HttpClients.createDefault();
        URIBuilder builder = new URIBuilder(url + "api/v1/sql");

        // 查询的db放到url参数上
        builder.setParameter("db", database);
        HttpPost httpPost = new HttpPost(builder.build());


        //用户名密码编码到Authorization头
        String nameAndPwd = name + ":" + pwd;
        byte[] encodedAuth = Base64.encodeBase64(
        nameAndPwd.getBytes(StandardCharsets.ISO_8859_1));
        String auth = "Basic " + new String(encodedAuth);
        httpPost.setHeader(HttpHeaders.AUTHORIZATION, auth);

        // 语句放在body上
        StringEntity stringEntity = new StringEntity(query);
        httpPost.setEntity(stringEntity);

        CloseableHttpResponse resp = client.execute(httpPost);
        // 状态码不为200，执行失败
        if (resp.getStatusLine().getStatusCode() != 200) {
            System.out.println("Request Fail");
        }
        // 获取错误信息或返回结果
        String res = IOUtils.toString(resp.getEntity().getContent());
        System.out.println(res);
    } catch (Exception e) {

    }
}
```

## Python

```python
TODO
example
```
