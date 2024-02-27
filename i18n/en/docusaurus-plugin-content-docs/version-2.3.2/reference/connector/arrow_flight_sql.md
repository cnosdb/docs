---
title: Arrow Flight SQL
order: 2
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Arrow Flight SQL

## Introduction to Arrow Flight SQL

Arrow Flight SQL is an agreement to interact with SQL databases using Arrow memory format and Flight RPC framework.

Currently we support the Arrow Flight SQL client with：

- [C++](#Usage of different clients)
- [Go](#Usage by different clients)
- [Java](#Usage by different clients)
- [Rust](#Usage by different clients)
- [JDBC]based on Arrow Flight SQL (#Use by different clients)
- [ODBC]based on Arrow Flight SQL (#Use by different clients)

## Arrow Flight SQL Advantage

1. Function is strong.Features are similar to APIs such as JDBC and ODBC and include querying and creating ready statements.
2. Security.Fight, supports the encryption and authentication functions that open boxes.
3. Performance.There is no need for data conversion in communication with the client service side of Arrow Flight for implementation while allowing further optimization, such as parallel data access.

While it can be used directly for database access, it cannot directly replace JDBC/ODBC. However, Flight SQL can be used as a specific wired protocol/driver to support the JDBC/ODBC driver and to reduce the database implementation burden.

![](/img/cnosdb_arrow_flight.png)

## Arrow Flight SQL Query Process

Client uses arrow flight sql clients to connect to the database, query data, and execute SQL processes roughly as follows.

1. Create Flash Sql Client
2. Verify Username, Password
3. Execute SQL, get Flash Info's Structures
4. Get Flash Datastream from Flash EndPoint in Flash Info’s Structures

Details about the location of the data are contained in FlowInfo, and the
client can fetch the data from the appropriate server.
Server information is encoded as a prime Flash Endpoint message in FlowInfo.
Each Endpoint represents a location with a response data subset.

A Flash Endpoint contains a list of server addresses,
Ticket and a binary token that the server uses to identify requested data.
FlightEndPoint does not define the order. If the dataset is sorted,
will only return the data in a Flash EndPoint

Flow chart below

![流程图](/img/arrow_flowt_flow.png)

## Usage of different clients

:::info Section shows how different clients are used.

<Tabs>
<TabItem value="c++" label="C++">

- #### Install Apache Arrow

  You can go to[官方文档](https://arrow.apache.org/install/) to find a detailed installation tutorial
  under Mac, using the brew command.

  ```shell
  brew install apache-arrow
  brew install apache-arrow-glib
  ```

- #### Configure CMakeLists.txt

  ```CMake
  cmake_minimum_required(VERSION 3.24)
  project(arrow_flight_cpp)

  set(CMAKE_CXX_STANDARD 20)

  find_package(Arrow REQUIRED)
  find_package(ArrowFlight REQUIRED)
  find_package(ArrowFlightSql REQUIRED)

  include_directories(${ARROW_INCLUDE_DIR})
  add_executable(arrow_flight_cpp main.cpp)
  target_link_libraries(arrow_flight_cpp PRIVATE Arrow::arrow_shared)
  target_link_libraries(arrow_flight_cpp PRIVATE ArrowFlight::arrow_flight_shared)
  target_link_libraries(arrow_flight_cpp PRIVATE ArrowFlightSql::arrow_flight_sql_shared)
  ```

- #### Usage of C++ Arrow library

  Most of the arrow's function returns the `arrow::Result<T>`, so the code needs to be written in the returns function of the type `arrow::Result<T>`, below：

  ```c++
   arrow::Result <std::unique_ptr<FlightClient>> get_location() [ROW]
       ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp ("localhost", 8904));
       ARROW_ASSIGN_OR_OR_RAISE(auto client, FlowtClient::Connect (location))
  }
  ```

  The effect of the `ARROW_ASSIGN_OR_RAISE` macro is to find an expression of the `arrow::Result<T>` type on the right side of the right and return in advance with the corresponding status value in case of an exception.

  For ease of presentation, we write the code in the `lambda` function.

  ```c++
  int main() {/
    auto fun = []() LO
      // code
    }
    fun();
    return 0;
  }
  ```

- #### Verify identity to get tokens and create a Flash SqlClient

  ```c++
  ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 8904))
  ARROW_ASSIGN_OR_RAISE(auto client, FlightClient::Connect(location))
  auto user = "root";
  auto password = "";
  //Base64加密认证
  auto auth = client->AuthenticateBasicToken({}, user, password);
  ARROW_RETURN_NOT_OK(auth); // 如果result出现异常，直接return
  FlightCallOptions call_options;
  call_options.headers.push_back(auth.ValueOrDie()); //把认证放到调用选项中
  auto sql_client = std::make_unique<FlightSqlClient>(std::move(client));
  ```

- #### Execute sql to get Flash Info

  ```c++
  ARROW_ASSIGN_OR_RAISE(auto info, sql_client->Execute(call_options, "select now();"));
  const auto endpoints = info->endpoints();
  ```

- #### Retrieving data by Flash EndPoint

  ```c++
  for (auto i = 0; i < endpoints.size(); i++) {
    auto &ticket = endpoints[i].ticket;
    // stream中包含数据
    ARROW_ASSIGN_OR_RAISE(auto stream, sql_client->DoGet(call_options, ticket));
    // 获取数据的Schema
    auto schema = stream->GetSchema();
    ARROW_RETURN_NOT_OK(schema);
    std::cout << "Schema:" << schema->get()->ToString() << std::endl;
    // 取得并打印数据
    while(true) {
      ARROW_ASSIGN_OR_RAISE(FlightStreamChunk chunk, stream->Next());
      if (chunk.data == nullptr) {
        break;
      }
      std::cout << chunk.data->ToString();
    }
  }
  ```

#### Corporate Code

```c++
#include <iostream>
#include <arrow/flight/api.h>
#include <arrow/flight/sql/api.h>
using namespace arrow::flight;
using namespace arrow::flight::sql;
using namespace arrow;

int main() {

    auto fun = []() {
        ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 8904))
        ARROW_ASSIGN_OR_RAISE(auto client, FlightClient::Connect(location))

        auto user = "root";
        auto password = "";
        auto auth = client->AuthenticateBasicToken({}, user, password);
        auto sql_client = std::make_unique<FlightSqlClient>(std::move(client));
        ARROW_RETURN_NOT_OK(auth);
        FlightCallOptions call_options;
        call_options.headers.push_back(auth.ValueOrDie());

        ARROW_ASSIGN_OR_RAISE(auto info, sql_client->Execute(call_options, "select now();"));
        const auto endpoints = info->endpoints();
        for (auto i = 0; i < endpoints.size(); i++) {
            auto &ticket = endpoints[i].ticket;

            ARROW_ASSIGN_OR_RAISE(auto stream, sql_client->DoGet(call_options, ticket));

            auto schema = stream->GetSchema();
            ARROW_RETURN_NOT_OK(schema);

            std::cout << "Schema:" << schema->get()->ToString() << std::endl;
            while(true) {
                ARROW_ASSIGN_OR_RAISE(FlightStreamChunk chunk, stream->Next());
                if (chunk.data == nullptr) {
                    break;
                }
                std::cout << chunk.data->ToString();
            }
        }
        return Status::OK();
    };

    auto status = fun();

    return 0;
}
```

</TabItem>

<TabItem value="java" label="Java">

- #### Add Dependency

  - If you build a Java project using maven to write a dependency in pom.xml

  ```xml
  <dependencies>
    <!-- https://mvnrepository.com/artifact/org.apache.arrow/arrow-flight -->
    <dependency>
      <groupId>org.apache.arrow</groupId>
      <artifactId>arrow-flight</artifactId>
      <version>10.0.1</version>
      <type>pom</type>
    </dependency>

    <!-- https://mvnrepository.com/artifact/org.apache.arrow/flight-sql -->
    <dependency>
      <groupId>org.apache.arrow</groupId>
      <artifactId>flight-sql</artifactId>
      <version>10.0.1</version>
    </dependency>

    <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-simple -->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>2.0.5</version>
    </dependency>

    <!-- https://mvnrepository.com/artifact/org.apache.arrow/flight-core -->
    <dependency>
      <groupId>org.apache.arrow</groupId>
      <artifactId>arrow-memory-netty</artifactId>
      <version>10.0.1</version>
    </dependency>

    <!-- https://mvnrepository.com/artifact/org.apache.arrow/flight-core -->
    <dependency>
      <groupId>org.apache.arrow</groupId>
      <artifactId>flight-core</artifactId>
      <version>10.0.1</version>
    </dependency>
  </dependencies>
  ```

  - Write again

  ```xml
  <build>
    <extensions>
      <extension>
        <groupId>kr.motd.maven</groupId>
        <artifactId>os-maven-plugin</artifactId>
        <version>1.7.1</version>
      </extension>
    </extensions>
  </build>
  ```

- #### Add Environment Variables

  ```shell
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
  ```

  ```shell
  java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
  # or
  env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java java.io=


  # if maven
  _JAVA_OPTIONS="--add-open=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
  ```

- #### Build Flash SqlClient

  ```java
  Buffering Allocator = new RootAllocator (Integer.MAX_VALUE);
  final location clientlocation = Location.forGrpcInsecure ("localhost", 8904);

  Flash customer = FlightClient.builder(allocator, clientLocation).build();
  FlihtSqlClient sqlClinet = new Flash SqClient(client);
  ```

- #### Configure authentication

  ```java
  Optional<CredentialCallOption> credentialCallOption = client.authorticateBasicToken ("root", "");
  final CallHeaders headers = new Flash CallHeaders();
  heads. nert("tenant", "cnosdb");
  Set<CallOption> options = new HashSet<>();

  credentialCalloption.ifPresent(options::add);
  options.add(new HeaderCallOption(headers));
  CallOptions = options.toArray(new Call[0]);
  ```

- #### Execute SQL, get Flash Info

  ```java
  try (final FlightSqlClient.PreparedStatement preparedStatement = sqlClinet.prepare("select now();", callOptions)) {
    final FlightInfo info = preparedStatement.execute();
    System.out.println(info.getSchema());

    //剩余代码在下一个步骤
  }
  ```

- #### Get data

  ```java
  final Ticket ticket = info.getEndpoints().get(0).getTicket();
  try (FlightStream stream = sqlClinet.getStream(ticket)) {
    int n = 0;
    while (stream.next()) {
      List<FieldVector> vectors = stream.getRoot().getFieldVectors();
      for (int i = 0; i < vectors.size(); i++) {
        System.out.printf("%d %d %s", n, i , vectors.get(i));
      }
      n++;
    }
  } catch (Exception e) {
    throw new RuntimeException(e);
  }
  ```

#### All Codes

```java
package org.example;

import org.apache.arrow.flight.*;
import org.apache.arrow.flight.grpc.CredentialCallOption;
import org.apache.arrow.flight.sql.FlightSqlClient;
import org.apache.arrow.memory.BufferAllocator;
import org.apache.arrow.memory.RootAllocator;
import org.apache.arrow.vector.FieldVector;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


public class Main {
  public static void main(String[] args) {
    BufferAllocator allocator = new RootAllocator(Integer.MAX_VALUE);
    final Location clientLocation = Location.forGrpcInsecure("localhost", 8904);

    FlightClient client = FlightClient.builder(allocator, clientLocation).build();
    FlightSqlClient sqlClinet = new FlightSqlClient(client);

    Optional<CredentialCallOption> credentialCallOption = client.authenticateBasicToken("root", "");
    final CallHeaders headers = new FlightCallHeaders();
    headers.insert("tenant", "cnosdb");
    Set<CallOption> options = new HashSet<>();

    credentialCallOption.ifPresent(options::add);
    options.add(new HeaderCallOption(headers));
    CallOption[] callOptions = options.toArray(new CallOption[0]);

    try (final FlightSqlClient.PreparedStatement preparedStatement = sqlClinet.prepare("select now();", callOptions)) {
      final FlightInfo info = preparedStatement.execute();
      System.out.println(info.getSchema());
      final Ticket ticket = info.getEndpoints().get(0).getTicket();
      try (FlightStream stream = sqlClinet.getStream(ticket)) {
        int n = 0;
        while (stream.next()) {
          List<FieldVector> vectors = stream.getRoot().getFieldVectors();
          for (int i = 0; i < vectors.size(); i++) {
            System.out.printf("%d %d %s", n, i , vectors.get(i));
          }
          n++;
        }
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
  }
}
```


<TabItem value="jdbc" label="JDBC">

- #### Add Dependency

  ```xml
  <dependencies>
    <dependency>
      <groupId>org.apache. rrow</groupId>
      <artifactId>arrow-jdbc</artifactId>
      <version></version>
    </dependency>
    <!-- https://mvnrepository.com/artifact.org.apache. grow/flow-sql-jdbc-driver -->
    <dependency>
      <groupId>org.apache. rrow</groupId>
      <artifactId>flight-sql-jdbc-driver</artifactId>
      <version>10. 1</version>
    </dependency>
  </dependencies>
  ```

- #### Add Environment Variables

  ```shell
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
  ```

  ```shell
  java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
  # or
  env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java java.io=


  # if maven
  _JAVA_OPTIONS="--add-open=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
  ```

- #### Set properties and query

  ```java
  package org.example;

  import java.sql.*;
  import java.util.Properties;

  public class Main {
    public static void main(String[] args) {
      final Properties properties = new Properties();
      properties.put("user", "root"); //用户名
      properties.put("password", "");  //密码
      properties.put("tenant", "cnosdb");//租户
      properties.put("useEncryption", false);
      try (
        Connection connection = DriverManager.getConnection(
          "jdbc:arrow-flight-sql://localhost:8904", properties
        );
        Statement statement = connection.createStatement())
      {
        ResultSet resultSet = statement.executeQuery("SELECT 1, 2, 3;");

        while (resultSet.next()) {
          int column1 = resultSet.getInt(1);
          int column2 = resultSet.getInt(2);
          int column3 = resultSet.getInt(3);
          System.out.printf("%d %d %d", column1, column2, column3);
        }
      } catch (SQLException e) {
        throw new RuntimeException(e);
      }
    }
  }
  ```

- #### Set attributes and execute SQL

  ```java
  package org.example;

  import java.sql.*;
  import java.util.Properties;

  public class Main {
    public static void main(String[] args) {
      final Properties properties = new Properties();
      properties.put("user", "root");
      properties.put("password", "");
      properties.put("tenant", "cnosdb");
      properties.put("useEncryption", false);
      try (
        Connection connection = DriverManager.getConnection(
          "jdbc:arrow-flight-sql://localhost:8904", properties
        );
        Statement statement = connection.createStatement())
      {
        statement.execute("CREATE TABLE IF NOT EXISTS air\n" +
                          "(\n" +
                          "    visibility  DOUBLE,\n" +
                          "    temperature DOUBLE,\n" +
                          "    pressure    DOUBLE,\n" +
                          "    TAGS(station)\n" +
                          ");");
        statement.executeUpdate("INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES\n" +
                                "    (1666165200290401000, 'XiaoMaiDao', 56, 69, 77);");
        ResultSet resultSet = statement.executeQuery("select * from air limit 1;");

        while (resultSet.next()) {
          Timestamp column1 = resultSet.getTimestamp(1);
          String column2 = resultSet.getString(2);
          Double column3 = resultSet.getDouble(3);
          Double column4 = resultSet.getDouble(4);
          Double column5 = resultSet.getDouble(5);

          System.out.printf("%s %s %f %f %f", column1, column2, column3, column4, column5);
        }
      } catch (SQLException e) {
        throw new RuntimeException(e);
      }
    }
  }

  ```


<TabItem value="rust" label="Rust">

- #### Add Dependency

  ```toml
  arrow = {version = "28.0.0", features = ["prettyprint"]}
  arrow-flight = {version = "28.0.0", features = ["flight-sql-experimental"]}
  token = "1.23. "
  futures = "0.3.2"
  prost-types = "0.11.2"
  taste = "0.8.3"
  prost = "0.11.3"
  http-auth-basic = "0.3"
  base64 = "0.1"
  ```

- #### Create Flash ServerClient

  ```rust
  let client = FightServiceClient::connect("http://localhost:8904")
  .await
  .expect("connit faile");
  ```

- #### Verify

  ```rust
  let mut req = Request::new(futures::stream::iter(iter::once(
    HandshakeRequest::default(),
  )));

  req.metadata_mut().insert(
    AUTHORIZATION.as_str(),
    AsciiMetadataValue::try_from(format!(
      "Basic {}",
      base64::encode(format!("{}:{}", "root", ""))
    ))
    .expect("metadata construct fail"),
  );

  let resp = client.handshake(req).await.expect("handshake");

  println!("handshake resp: {:?}", resp.metadata());
  ```

- #### Execute SQL

  ```rust
  let cmd = CommandStatementQuery {
    query: "select 1;".to_string(),
  };
  let pack = prost_types::Any::pack(&cmd).expect("pack");
  let fd = FlightDescriptor::new_cmd(pack.encode_to_vec());

  let mut req = Request::new(fd);
  req.metadata_mut().insert(
    AUTHORIZATION.as_str(),
    resp.metadata().get(AUTHORIZATION.as_str()).unwrap().clone(),
  );
  let resp = client.get_flight_info(req).await.expect("get_flight_info");

  let flight_info = resp.into_inner();
  let schema_ref =
  Arc::new(Schema::try_from(IpcMessage(flight_info.schema)).expect("Schema::try_from"));
  println!("{}", schema_ref);
  ```

- #### Get data and print it

  ```rust
  for ep in flight_info.endpoint {
    if let Some(ticket) = ep.ticket {
      let resp = client.do_get(ticket).await.expect("do_get");
      let mut stream = resp.into_inner();
      let mut dictionaries_by_id = HashMap::new();

      let mut record_batches = Vec::new();
      while let Some(Ok(flight_data)) = stream.next().await {
        let message =
        root_as_message(&flight_data.data_header[..]).expect("root as message");
        match message.header_type() {
          ipc::MessageHeader::Schema => {
            println!("a schema when messages are read",);
          }

          ipc::MessageHeader::RecordBatch => {
            let record_batch = flight_data_to_arrow_batch(
              &flight_data,
              schema_ref.clone(),
              &dictionaries_by_id,
            )
            .expect("record_batch_from_message");
            record_batches.push(record_batch);
          }
          ipc::MessageHeader::DictionaryBatch => {
            let ipc_batch = message.header_as_dictionary_batch().unwrap();

            reader::read_dictionary(
              &Buffer::from(flight_data.data_body),
              ipc_batch,
              &schema_ref,
              &mut dictionaries_by_id,
              &message.version(),
            )
            .unwrap();
          }
          _ => {
            panic!("Reading types other than record batches not yet supported");
          }
        }
      }

      println!(
        "{}",
        arrow::util::pretty::pretty_format_batches(&record_batches).expect("print")
      );
    }
  }
  ```

#### Full Code

```rust
use std::collections::HashMap;
use std::iter;
use std::sync::Arc;

use arrow::buffer::Buffer;
use arrow::datatypes::Schema;
use arrow::ipc;
use arrow::ipc::{reader, root_as_message};
use arrow_flight::flight_service_client::FlightServiceClient;
use arrow_flight::sql::{CommandStatementQuery, ProstAnyExt};
use arrow_flight::utils::flight_data_to_arrow_batch;
use arrow_flight::{FlightDescriptor, HandshakeRequest, IpcMessage};
use futures::StreamExt;

use prost::Message;
use tonic::codegen::http::header::AUTHORIZATION;
use tonic::metadata::AsciiMetadataValue;
use tonic::Request;

#[tokio::main]
async fn main() {

  let mut client = FlightServiceClient::connect("http://localhost:8904")
  .await
  .expect("connect");

  let mut req = Request::new(futures::stream::iter(iter::once(
    HandshakeRequest::default(),
  )));

  req.metadata_mut().insert(
    AUTHORIZATION.as_str(),
    AsciiMetadataValue::try_from(format!(
      "Basic {}",
      base64::encode(format!("{}:{}", "root", ""))
    ))
    .expect("metadata construct fail"),
  );

  let resp = client.handshake(req).await.expect("handshake");

  println!("handshake resp: {:?}", resp.metadata());

  let cmd = CommandStatementQuery {
    query: "select 1;".to_string(),
  };
  let pack = prost_types::Any::pack(&cmd).expect("pack");
  let fd = FlightDescriptor::new_cmd(pack.encode_to_vec());

  let mut req = Request::new(fd);
  req.metadata_mut().insert(
    AUTHORIZATION.as_str(),
    resp.metadata().get(AUTHORIZATION.as_str()).unwrap().clone(),
  );
  let resp = client.get_flight_info(req).await.expect("get_flight_info");

  let flight_info = resp.into_inner();
  let schema_ref =
  Arc::new(Schema::try_from(IpcMessage(flight_info.schema)).expect("Schema::try_from"));
  println!("{}", schema_ref);

  for ep in flight_info.endpoint {
    if let Some(ticket) = ep.ticket {
      let resp = client.do_get(ticket).await.expect("do_get");
      let mut stream = resp.into_inner();
      let mut dictionaries_by_id = HashMap::new();

      let mut record_batches = Vec::new();
      while let Some(Ok(flight_data)) = stream.next().await {
        let message =
        root_as_message(&flight_data.data_header[..]).expect("root as message");
        match message.header_type() {
          ipc::MessageHeader::Schema => {
            println!("a schema when messages are read",);
          }

          ipc::MessageHeader::RecordBatch => {
            let record_batch = flight_data_to_arrow_batch(
              &flight_data,
              schema_ref.clone(),
              &dictionaries_by_id,
            )
            .expect("record_batch_from_message");
            record_batches.push(record_batch);
          }
          ipc::MessageHeader::DictionaryBatch => {
            let ipc_batch = message.header_as_dictionary_batch().unwrap();

            reader::read_dictionary(
              &Buffer::from(flight_data.data_body),
              ipc_batch,
              &schema_ref,
              &mut dictionaries_by_id,
              &message.version(),
            )
            .unwrap();
          }
          _ => {
            panic!("Reading types other than record batches not yet supported");
          }
        }
      }

      println!(
        "{}",
        arrow::util::pretty::pretty_format_batches(&record_batches).expect("print")
      );
    }
  }
}
```

</TabItem>

<TabItem value="odbc" label="ODBC">

Currently only supports the x86_64 architecture, and linux only supports the centos and redhat series distributions.

For more information about Arrow Flight SQL ODBC, see[Dremio文档](https://docs.dremio.com/software/drivers/arrow-flight-sql-odbc-driver/).

The following steps are based on Centos7.

- #### Install ODBC Manager

  Install unixODBC under Linux

  ```shell
  yum install unixODBC-dedel
  ```

- #### Install arrow-flight-odbc driver

  ```shell
  wget https://download.dremio.com/arrow-flight-sql-odbc-driver/arrow-flight-sql-odbc-driver-LATESt.x86_64.rpm
  yum localinstall arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm
  ```

- #### Edit profile

  Modify configuration file in `/etc/odbc.ini`.

  ```
  [ODBC Data Sources]
  CNOSDB=Arrow Flight SQL ODBC Driver

  [CNOSDB]
  Description=ODBC DDS for Arrow Flight SQL developed by Dremio
  Driver=Arrow Flight SQL ODBC Driver
  Host=localhost
  Port=8904
  UID=root
  PWD=
  Database=public
  Tenant=nosdb
  useEncryption=false
  TrustedCerts=/arrow-flight-sql-odbc-driver/lib64/cracerts. em
  UseSystemTrustStore=true
  ```

  UID is a username, PWD is a password.

- #### Test whether to connect

  ```shell
  isql - v CNOSDB
  ```

  Indicate the success of the connection if it appears below.

  ```
  +---------------- ------ -+
  | Connected! |
  |
  | sql-statement |
  | help [tablename]                      |
  | quit |
  |
  +------+
  SQL>
  ```

  Enter code test below.

- #### write cmake

  ```cmake
  cmake_minimum_required(VERSION 3.24)
  project(arrow_flight_odbc C)

  set(CMAKE_C_STANDARD 11)
  find_package(ODBC)
  include_directories(${ODBC_INCLUDE_DIR})
  link_directories(/opt/arrow-flight-sql-odbc-driver/lib64)
  add_executable(arrow_flight_odbc main.c)
  target_link_libraries(arrow_flight_odbc ${ODBC_LIBRARY})
  ```

- #### Write cLanguage code main.c

```c
#include <stdio.h>
#include <sql.h>
#include <sqlext.h>
int main() {
  SQLHENV henv;
  SQLHDBC hdbc;
  SQLHSTMT hsmt;
  SQLRETURN ret;
  // 分配环境内存
  ret = SQLAllocEnv(&henv);
  if (ret != SQL_SUCCESS) {
    fprintf(stderr, "Unable to allocate an environment handle");
    return -1;
  }
  // 设置环境属性
  ret = SQLSetEnvAttr(henv,  SQL_ATTR_ODBC_VERSION, (void *) SQL_OV_ODBC3, 0);
  if (ret != SQL_SUCCESS) {
    fprintf(stderr, "Unable to set env attr");
    return -1;
  }
  // 分配连接内存
  ret = SQLAllocConnect(henv, &hdbc);
  if (ret != SQL_SUCCESS) {
    fprintf(stderr, "Unable to allocate connection");
  }
  //连接到driver
  ret = SQLDriverConnect(hdbc, NULL, (SQLCHAR*) "DSN=CNOSDB;UID=root;PWD=", SQL_NTS,
                         NULL, 0, NULL, SQL_DRIVER_NOPROMPT);
  if (ret != SQL_SUCCESS) {
    fprintf(stderr, "connect fail");
  }
  // 分配语句空间
  SQLAllocStmt(hdbc, &hsmt);
  SQLCHAR *sql = "CREATE TABLE IF NOT EXISTS air (\n"
    " visibility  DOUBLE,\n"
    " temperature DOUBLE,\n"
    " pressure    DOUBLE,\n"
    " TAGS(station));";
  // 执行 Create table
  ret = SQLExecDirect(hsmt, sql, SQL_NTS);
  if (ret != SQL_SUCCESS) {
    fprintf(stderr, "Execute create fail");
  }
  sql = "INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES\n"
    "    (1666165200290401000, 'XiaoMaiDao', 56, 69, 77);";
  // 执行 insert
  ret = SQLExecDirect(hsmt, sql, SQL_NTS);
  if (ret != SQL_SUCCESS) {
    fprintf(stderr, "Execute insert fail");
  }
  sql = "SELECT * FROM air LIMIT 1";
  //执行查询
  ret = SQLExecDirect(hsmt, sql ,SQL_NTS);
  if (ret != SQL_SUCCESS) {
    fprintf(stderr, "Execute query fail");
  }
  SQL_TIMESTAMP_STRUCT time;
  SQLCHAR station[50];
  SQLDOUBLE visibility, temperature, pressure;
  long time_len, station_len;
  // 获取结果集
  while (1) {
    ret = SQLFetch(hsmt);
    if (ret == SQL_ERROR || ret == SQL_SUCCESS_WITH_INFO) {
      printf("error SQLFetch");
    }
    // 获取列的数据
    if (ret == SQL_SUCCESS || ret == SQL_SUCCESS_WITH_INFO) {
      SQLGetData(hsmt, 1, SQL_C_TIMESTAMP, &time, 0, NULL);
      SQLGetData(hsmt, 2, SQL_C_CHAR, station, 50, &station_len);
      SQLGetData(hsmt, 3, SQL_C_DOUBLE, &visibility, 0, NULL);
      SQLGetData(hsmt, 4, SQL_C_DOUBLE, &temperature, 0, NULL);
      SQLGetData(hsmt, 5, SQL_C_DOUBLE, &pressure, 0, NULL);
      printf("%d-%02d-%02dT%02d:%02d:%02d, %s, %.2lf, %.2lf, %.2lf\n", time.year, time.month, time.day, time.hour, tme.minute, time.second, station, visibility, temperature, pressure);
    } else {
     break;
    }
  }
  return 0;
}
```

</TabItem>

</Tabs>
