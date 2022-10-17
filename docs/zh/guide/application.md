---
title: 应用开发
icon: config
order: 3
---

::: code-tabs#language

@tab Rust

```rust
TODO example
```

@tab Golang

```golang
TODO example
```

@tab Java
使用[Apache HttpComponentsApache](https://hc.apache.org/) 和 [Apache Commons CSV](https://commons.apache.org/proper/commons-csv/)作为依赖

```java
public static void main(String[] args) {
    String database = "public";
    String name = "cnosdb";
    String pwd = "";
    String query = "SELECT 'Hello, CnosDB!';";
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
        String res = IOUtils.toString(resp.getEntity().getContent());
        System.out.println(res);
    } catch (Exception e) {

    }
}
```

@tab Python

```python
TODO example
```
:::