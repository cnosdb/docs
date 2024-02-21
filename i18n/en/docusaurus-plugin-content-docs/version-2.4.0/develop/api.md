---
title: Connect to CnosDB
order: 2
---

# Connect to CnosDB

CnosDB supports several programming languages, some examples are provided below.

The HTTP API query command is as follows, which you can refer to when implementing HTTP API requests in code.

#### Syntax

```shell
curl -X POST "http://<cnosdb_url>:<cnosdb_port>/api/v1/sql?db=<database_name>&pretty=true" \
  -u "<username>:<password>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "<your SQL statement>"
```

#### Example

 ```shell
curl -X POST "http://127.0.0.1:8902/api/v1/sql?db=public&pretty=true" \
  -u "root:" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "CREATE TABLE air (
    visibility DOUBLE,
    temperature DOUBLE,
    pressure DOUBLE,
    TAGS(station)
  );"
 ```

#### Use programming languages

::: tabs#language

@tab Rust#Rust

The sample code uses [reqwest](https://crates.io/crates/reqwest) to build Http requests.

Http request needs to specify the database to be operated on, written in the url query as db=database_name.

```rust
let url = Url::parse("http://127.0.0.1:8902/api/v1/sql?db=public&pretty=true").unwrap();
let sql = r#"
CREATE TABLE air (
 visibility DOUBLE,
 temperature DOUBLE,
 pressure DOUBLE,
 TAGS(station)
);"#.to_string();
```

Set the SQL requested for execution into the body of the http.

Encode the username and password in BASIC code to the Authorization Header.

```rust
let user_name = "cnosdb";
let password = "";
let http_client = reqwest::Client::new();
let request = http_client
    .request(Method::POST, url)
    // username and password
    .basic_auth::<&str, &str>(user_name, Some(password))
    .body(sql)
    .build()
    .unwrap();
```

The status code of the response will indicate whether the SQL is executed successfully, 200 representing success.

The error messages or the result of the correct execution will be in the text() of the response.

```rust
let response = http_client.execute(request).await.unwrap();
let success = response.status().is_success();
let result = response.text().await.unwrap();
```

@tab Golang#Golang

The sample code uses [fasthttp](https://github.com/valyala/fasthttp) as a dependency.

Following are the parameters required to construct the http request.

```go
user := "cnosdb"
pwd := ""
// db means database, we use default db 'public'
url := "http://127.0.0.1:8902/" + "api/v1/sql?db=public&pretty=true"
query1 := `
CREATE TABLE air (
  visibility DOUBLE,****
  temperature DOUBLE,
  pressure DOUBLE,
  TAGS(station)
);`
```

Construct the http request:

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

Send the http request:

```go
cli := fasthttp.Client{}
resp := fasthttp.Response{}
err := cli.Do(req, &resp)
if err != nil {
   return
}
fmt.Println(resp.StatusCode())
```

The status code of the response will indicate whether the SQL is executed successfully, 200 representing success.

@tab Java#Java

Use [Apache Http Components Apache](https://hc.apache.org/) as a dependency.

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
        // set the query parameter
        builder.setParameter("db", database);
        HttpPost httpPost = new HttpPost(builder.build());
        // add basic auth
        String nameAndPwd = name + ":" + pwd;
        byte[] encodedAuth = Base64.encodeBase64(
        nameAndPwd.getBytes(StandardCharsets.ISO_8859_1));
        String auth = "Basic " + new String(encodedAuth);
        httpPost.setHeader(HttpHeaders.AUTHORIZATION, auth);
        // set request body
        StringEntity stringEntity = new StringEntity(query);
        httpPost.setEntity(stringEntity);
        CloseableHttpResponse resp = client.execute(httpPost);
        // if status code is not 200, request fail
        if (resp.getStatusLine().getStatusCode() != 200) {
        System.out.println("Request Fail");
        }
        // get the error message and return
        String res = IOUtils.toString(resp.getEntity().getContent());
        System.out.println(res);
        } catch (Exception e) {
        }
        }
```

:::