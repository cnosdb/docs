---
sidebar_position: 1
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect to CnosDB

CnosDB supports multiple programming languages. Some examples are provided below.

The HTTP API query command is referred to below when implementing HTTP API requests with code.

#### Syntax

```shell
curl -X POST "http://<cnosdb_url>:<cnosdb_port>/api/v1/sql? b=<database_name>&pretty=true" \
  -u "<username>:<password>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "<your SQL statement>"
```

#### Example

```shell
curl-X POST "http://127.0.0. :8902/api/v1/sql? b=public&pretty=true" \
  -u "root:" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "CREATE TABLE air (
    visibility DOUBLE,
    temperature DOUBLE,
    press DOUBLE,
    TAGS(station
);"
```

#### Use programming language

<Tabs>
<TabItem value="rust" label="Rust">

Example code builds Http's request using[reqwest](https://crates.io/crates/reqwest).

http's request requires a specified operation database written in url query=database_name.

```rust
let url = Url:::parse ("http://127.0.0.1:8902/api/v1/sql?db=public&pretty=true"). nwrap();
let sql = r#"
CREATE TABLE air (
 visibility DOUBLE,
 temperature DOUBLE,
 pressure DOUBLE,
 TAGS(station
);"#. o_string();
```

The requested SQL is placed in http's body.

Username and password need to be added to the Authorization header.

```rust
let user_name = "cnosdb";
let password = "";
let http_client = reqwest::Client::new();
let request = http_client
    .request(Method::POST, url)
    //用户名和密码
    .basic_auth::<&str, &str>(user_name, Some(password))
    .body(sql)
    .build()
    .unwrap();
```

The response status code will indicate whether SQL is executed successfully, 200 is successful.

The result of the failure or proper execution is in the text() of the response.

```rust
let response = http_client.execute(request).await.unwrap();
let success = response.status().is_success ();
let result = response.text().await.unwrap();
```


<TabItem value="go" label="Golang">

Example code uses[fasthttp](https://github.com/valyala/fasthttp) as dependent.

The following parameters are required to construct an HTML request.

```go
User := "cnosdb"
pwd := ""
// db means database, we use default db 'public'
url := "http://127.0.0. :8902/" + "api/v1/sql? b=public&pretty=true"
query1 := `
CREATE TABLE air (
  visible DOUBLE, ***
  temperature DOUBLE,
  press DOUBLE,
  TAGS(station)
);`
```

Construct HTML request：

```go
func basicAuth(username, password string) string. string Flux
    auth := username + ":" + password
    return "Basic " + base64. tdEncoding.EncodeToString([]byte(author))
}

req := fasthttp. cquireRequest()
req.Header.SetMethod("POST")
req.Header.Set("Authorization", basicAuth(user, pwd))
req.SetBody([]byte(query1))
req.SetRequestURI(url)
```

Send http's request：

```go
cli := fasthttp.Client{}
resp := fasthttp.Response{}
err := cli.Do(req, &rest)
if err != nil {
    return
}
fmt.Println(res.StatusCode() )
```

The response status code will indicate whether SQL is executed successfully, 200 is successful.
Example code uses[fasthttp](https://github.com/valyala/fasthttp) as dependent.

The following parameters are required to construct an HTML request.

```go
User := "cnosdb"
pwd := ""
// db means database, we use default db 'public'
url := "http://127.0.0. :8902/" + "api/v1/sql? b=public&pretty=true"
query1 := `
CREATE TABLE air (
  visible DOUBLE, ***
  temperature DOUBLE,
  press DOUBLE,
  TAGS(station)
);`
```

Construct HTML request：

```go
func basicAuth(username, password string) string. string Flux
    auth := username + ":" + password
    return "Basic " + base64. tdEncoding.EncodeToString([]byte(author))
}

req := fasthttp. cquireRequest()
req.Header.SetMethod("POST")
req.Header.Set("Authorization", basicAuth(user, pwd))
req.SetBody([]byte(query1))
req.SetRequestURI(url)
```

Send http's request：

```go
cli := fasthttp.Client{}
resp := fasthttp.Response{}
err := cli.Do(req, &rest)
if err != nil {
    return
}
fmt.Println(res.StatusCode() )
```

The response status code will indicate whether SQL is executed successfully, 200 is successful.


<TabItem value="java" label="Java">

Use [Apache Http Components Apache](https://hc.apache.org/) as dependency.

```java
public static void main(String[] args) {
    String database = "public";
    String name = "cnosdb";
    String pwd = "";
    String query = "CREATE TABLE air (" +
            "visibility DOUBLE," +
            "temperature DOUBLE," +
            "pressure DOUBLE," +
            "TAGS(station)" +
            ");";
    String url = "http://127.0.0.1:8902/";

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


