---
title: Query Data
order: 4
---

# Query Data

CnosDB supports a variety of query access methods, some examples are provided below. Contains common programming languages such as Java, Python, Rust, Golang, C++.


## HTTP API Query

### Query Data

#### Syntax

```shell
curl -i -u "<username>:<password>" -H "Accept: application/json" \
-XPOST "http://<cnosdb_url>:<cnosdb_port>/api/v1/sql?db=<database_name>&pretty=true" \
-d "<your SQL statement>"
```

#### Example

```shell
curl -i -u "cnosdb:" -H "Accept: application/json" \
-XPOST "http://127.0.0.1:8902/api/v1/sql?db=oceanic_station" \
-d "SELECT * FROM air LIMIT 10;"
```

::: tabs#language

@tab Golang#Golang

```go
package main

import (
    "fmt"
    "net/http"
    "bytes"
    "encoding/base64"
)

func main() {
    username := "<username>"
    password := "<password>"
    url := "http://<cnosdb_url>:<cnosdb_port>/api/v1/sql?db=<database_name>&pretty=true"
    sqlStatement := "<your SQL statement>"

    client := &http.Client{}
    req, err := http.NewRequest("POST", url, bytes.NewBufferString(sqlStatement))
    if err != nil {
        panic(err)
    }

    // add Authorization header
    authStr := username + ":" + password
    encodedAuth := base64.StdEncoding.EncodeToString([]byte(authStr))
    req.Header.Set("Authorization", "Basic "+encodedAuth)

    // add Accept header
    req.Header.Set("Accept", "application/json")

    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    // print response
    fmt.Println("Status Code:", resp.StatusCode)
    fmt.Println("Response Body:")
    buf := new(bytes.Buffer)
    buf.ReadFrom(resp.Body)
    fmt.Println(buf.String())
}
```

@tab Python#Python

```python
import requests

username = "<username>"
password = "<password>"
cnosdb_url = "<cnosdb_url>"
cnosdb_port = "<cnosdb_port>"
database_name = "<database_name>"
sql_statement = "<your SQL statement>"

url = f"http://{cnosdb_url}:{cnosdb_port}/api/v1/sql?db={database_name}&pretty=true"
headers = {"Accept": "application/json"}
data = {"query": sql_statement}

response = requests.post(url, auth=(username, password), headers=headers, json=data)

print(response.text)
```

@tab Java#Java

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

public class CurlToJava {

    public static void main(String[] args) throws Exception {
        String username = "<username>";
        String password = "<password>";
        String cnosdbUrl = "<cnosdb_url>";
        String cnosdbPort = "<cnosdb_port>";
        String dbName = "<database_name>";
        String sqlStatement = "<your SQL statement>";
        
        String apiUrl = "http://" + cnosdbUrl + ":" + cnosdbPort + "/api/v1/sql?db=" + dbName + "&pretty=true";
        String auth = username + ":" + password;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
        String authHeaderValue = "Basic " + new String(encodedAuth);
        
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Authorization", authHeaderValue);
        connection.setDoOutput(true);

        String requestBody = sqlStatement;
        connection.getOutputStream().write(requestBody.getBytes());

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
        }
        bufferedReader.close();
        connection.disconnect();
    }
}

@tab Rust#Rust

```rust
use reqwest::header::{Authorization, HeaderValue, ACCEPT};
use std::error::Error;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let username = "<username>";
    let password = "<password>";
    let cdb_url = "<cnosdb_url>";
    let cdb_port = "<cnosdb_port>";
    let database_name = "<database_name>";
    let sql_statement = "<your SQL statement>";

    let url = format!(
        "http://{}:{}/api/v1/sql?db={}&pretty=true",
        cdb_url, cdb_port, database_name
    );
    
    let client = reqwest::Client::new();
    let res = client
        .post(&url)
        .header(ACCEPT, "application/json")
        .header(
            Authorization(format!("Basic {}", base64::encode(format!("{}:{}", username, password))))
        )
        .body(sql_statement)
        .send()
        .await?;

    println!("{}", res.text().await?);

    Ok(())
}
```

@tab C++#C++

```cpp
#include <iostream>
#include <curl/curl.h>

int main() {
  CURL *curl;
  CURLcode res;

  std::string username = "your_username";
  std::string password = "your_password";
  std::string cnosdb_url = "your_cnosdb_url";
  int cnosdb_port = 1234;
  std::string database_name = "your_database_name";
  std::string sql_statement = "your_sql_statement";

  std::string url = "http://" + cnosdb_url + ":" + std::to_string(cnosdb_port) + "/api/v1/sql?db=" + database_name + "&pretty=true";

  curl_global_init(CURL_GLOBAL_DEFAULT);
  curl = curl_easy_init();
  if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_USERNAME, username.c_str());
    curl_easy_setopt(curl, CURLOPT_PASSWORD, password.c_str());
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, "Accept: application/json");
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, sql_statement.c_str());
    curl_easy_setopt(curl, CURLOPT_POST, 1L);
    res = curl_easy_perform(curl);

    if (res != CURLE_OK) {
      std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;
    }

    curl_easy_cleanup(curl);
  }

  curl_global_cleanup();
  return 0;
}
```

:::

Related Content: