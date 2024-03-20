---
title: Arrow Flight SQL
order: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Arrow Flight SQL

## Arrow Flight SQL 简介

Arrow Flight SQL 是一种使用 Arrow 内存格式和 Flight RPC 框架与 SQL 数据库交互的协议。

目前我们支持Arrow Flight SQL 客户端的环境有：

- [C++](#不同客户端的使用方式)
- [Go](#不同客户端的使用方式)
- [Java](#不同客户端的使用方式)
- [Rust](#不同客户端的使用方式)
- 基于Arrow Flight SQL 的 [JDBC](#不同客户端的使用方式)
- 基于Arrow Flight SQL 的 [ODBC](#不同客户端的使用方式)

## Arrow Flight SQL 优势

1. 功能强大。功能与JDBC和ODBC等API类似，包括执行查询，创建准备好的语句。
2. 安全。Flight，支持开箱即用的加密和身份验证等功能。
3. 性能。与实现Arrow Flight 的客户端服务端通信，无需进行数据转化，同时允许进一步优化，如并行数据访问。

虽然它可以直接用于数据库访问，但它不能直接替代 JDBC/ODBC。 但是，Flight SQL 可以用作具体的有线协议/驱动程序实现，支持 JDBC/ODBC 驱动程序，并减少数据库的实现负担。

![](/img/cnosdb_arrow_flight.png)

## Arrow Flight SQL 查询流程

客户端使用arrow flight sql 客户端与数据库连接，查询数据，执行SQL的流程大致如下。

1. 创建FlightSql客户端
2. 验证用户名，密码
3. 执行SQL，获取FlightInfo结构体
4. 通过FlightInfo结构体中的FlightEndPoint获取到FlightData数据流

FlightInfo中包含有关数据所在位置的详细信息，
客户端可以从适当的服务器获取数据。
服务器信息被编码为 FlightInfo 中的一系列 FlightEndpoint 消息。
每个Endpoint代表包含响应数据子集的某个位置。

一个FlightEndpoint包含一个服务器地址列表，
一个Ticket, 一个服务器用来识别请求数据的二进制Token。
FlightEndPoint 没有定义顺序，如果数据集是排序的，
只会在一个FlightEndPoint中返回数据。


流程图如下

![流程图](/img/arrow_flight_flow.png)

## 不同客户端的使用方式

:::info 本章节分别介绍不同客户端的使用方式。

<Tabs>
<TabItem value="c++" label="C++">

- #### 安装Apache Arrow

  你可以去[官方文档](https://arrow.apache.org/install/)找到详细的安装教程
  在Mac系统下，使用brew命令就可以简单安装了。

   ```shell
   brew install apache-arrow
   brew install apache-arrow-glib
   ```

- #### 配置CMakeLists.txt

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

- #### C++ Arrow库的用法

  arrow的函数大多数是返回 `arrow::Result<T>` 类型，因此需要把代码写在返回值为 `arrow::Result<T>` 的类型的函数中，如下：

   ```c++
    arrow::Result <std::unique_ptr<FlightClient>> get_location() {
        ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 8904));
        ARROW_ASSIGN_OR_RAISE(auto client, FlightClient::Connect(location))
    }
   ```

  `ARROW_ASSIGN_OR_RAISE`宏的效果是，先对右边返回值为 `arrow::Result<T>` 类型的表达式求值，如果出现异常，则提前return，赋上相应的Status值。

  为了方便展示，我们把代码写在`lambda`函数中。

   ```c++
   int main() {
     auto fun = []() {
       // code
     }
     fun();
     return 0;
   }
   ```

- #### 验证身份获取令牌，并创建一个FlightSqlClient

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

- #### 执行sql取得FlightInfo

   ```c++
   ARROW_ASSIGN_OR_RAISE(auto info, sql_client->Execute(call_options, "select now();"));
   const auto endpoints = info->endpoints();
   ```

- #### 通过FlightEndPoint取回数据

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

#### 整体代码

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

- #### 添加依赖

    - 如果你使用maven构建Java项目，在pom.xml中写入依赖

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

    - 再写入

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



- #### 添加环境变量

  ```shell
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
  ```

  ```shell
  java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
  # 或
  env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java -jar ...


  # 如果使用 maven
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
  ```

- #### 构建FlightSqlClient

   ```java
   BufferAllocator allocator = new RootAllocator(Integer.MAX_VALUE);
   final Location clientLocation = Location.forGrpcInsecure("localhost", 8904);

   FlightClient client = FlightClient.builder(allocator, clientLocation).build();
   FlightSqlClient sqlClinet = new FlightSqlClient(client);
   ```

- #### 配置认证

   ```java
   Optional<CredentialCallOption> credentialCallOption = client.authenticateBasicToken("root", "");
   final CallHeaders headers = new FlightCallHeaders();
   headers.insert("tenant", "cnosdb");
   Set<CallOption> options = new HashSet<>();

   credentialCallOption.ifPresent(options::add);
   options.add(new HeaderCallOption(headers));
   CallOption[] callOptions = options.toArray(new CallOption[0]);
   ```

- #### 执行SQL，取得FlightInfo

   ```java
   try (final FlightSqlClient.PreparedStatement preparedStatement = sqlClinet.prepare("select now();", callOptions)) {
     final FlightInfo info = preparedStatement.execute();
     System.out.println(info.getSchema());

     //剩余代码在下一个步骤
   }
   ```

- #### 取得数据

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

#### 全部代码

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

</TabItem>
<TabItem value="jdbc" label="JDBC">

- #### 添加依赖

   ```xml
   <dependencies>
     <dependency>
       <groupId>org.apache.arrow</groupId>
       <artifactId>arrow-jdbc</artifactId>
       <version>10.0.1</version>
     </dependency>
     <!-- https://mvnrepository.com/artifact/org.apache.arrow/flight-sql-jdbc-driver -->
     <dependency>
       <groupId>org.apache.arrow</groupId>
       <artifactId>flight-sql-jdbc-driver</artifactId>
       <version>10.0.1</version>
     </dependency>
   </dependencies>
   ```

- #### 添加环境变量

   ```shell
   _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
   ```

   ```shell
   java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
   # 或
   env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java -jar ...


   # 如果使用 maven
   _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
   ```

- #### 设置属性并查询

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

- #### 设置属性并执行SQL

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

</TabItem>
<TabItem value="rust" label="Rust">

代码运行在异步环境下。

- #### 添加依赖

   ```toml
   arrow = { version = "42.0.0", features = ["prettyprint"] }
   arrow-flight = {version = "42.0.0", features = ["flight-sql-experimental"]}
   tokio = "1.35"
   futures = "0.3.25"
   prost-types = "0.11.9"
   tonic = "0.9.2"
   prost = "0.11.9"
   http-auth-basic = "0.3.3"
   base64 = "0.21.7"
   ```

- #### 创建FlightServerClient

   ```rust
   let mut client = FlightServiceClient::connect("http://localhost:8904")
   .await
   .expect("connect faile");
   ```

- #### 进行验证

   ```rust
   let mut req = Request::new(futures::stream::iter(iter::once(
     HandshakeRequest::default(),
   )));

   req.metadata_mut().insert(
     AUTHORIZATION.as_str(),
     AsciiMetadataValue::try_from(format!(
       "Basic {}",
       BASE64_STANDARD.encode(format!("{}:{}", "root", ""))
     ))
     .expect("metadata construct fail"),
   );

   let resp = client.handshake(req).await.expect("handshake");

   println!("handshake resp: {:?}", resp.metadata());
   ```

- #### 执行SQL

   ```rust
   let cmd = CommandStatementQuery {
     query: "select 1;".to_string(),
     transaction_id: None,
   };
   
   let fd = FlightDescriptor::new_cmd(cmd.as_any().encode_to_vec());

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

- #### 取得数据并打印

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

#### 完整代码

   ```rust
   use std::collections::HashMap;
   use std::iter;
   use std::sync::Arc;

   use arrow::buffer::Buffer;
   use arrow::datatypes::Schema;
   use arrow::ipc;
   use arrow::ipc::{reader, root_as_message};
   use arrow_flight::flight_service_client::FlightServiceClient;
   use arrow_flight::sql::{CommandStatementQuery, ProstMessageExt};
   use arrow_flight::utils::flight_data_to_arrow_batch;
   use arrow_flight::{FlightDescriptor, HandshakeRequest, IpcMessage};
   use futures::StreamExt;

   use prost::Message;
   use tonic::codegen::http::header::AUTHORIZATION;
   use tonic::metadata::AsciiMetadataValue;
   use tonic::Request;
   use base64::prelude::{Engine, BASE64_STANDARD};

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
         BASE64_STANDARD.encode(format!("{}:{}", "root", ""))
       ))
       .expect("metadata construct fail"),
     );

     let resp = client.handshake(req).await.expect("handshake");

     println!("handshake resp: {:?}", resp.metadata());

     let cmd = CommandStatementQuery {
       query: "select 1;".to_string(),
       transaction_id: None,
     };
   
     let fd = FlightDescriptor::new_cmd(cmd.as_any().encode_to_vec());

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

目前仅支持x86_64架构的系统，linux仅支持centos和redhat系列发行版。

更多关于Arrow Flight SQL ODBC的内容，请查看[Dremio文档](https://docs.dremio.com/software/drivers/arrow-flight-sql-odbc-driver/)。

以下步骤基于Centos7。
- #### 安装ODBC管理器

  在Linux下安装unixODBC

   ```shell
   yum install unixODBC-devel
   ```

- #### 安装arrow-flight-odbc驱动

   ```shell
   wget https://download.dremio.com/arrow-flight-sql-odbc-driver/arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm
   yum localinstall arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm
   ```

- #### 修改配置文件
  修改位于`/etc/odbc.ini`的配置文件。

   ```
   [ODBC Data Sources]
   CNOSDB=Arrow Flight SQL ODBC Driver

   [CNOSDB]
   Description=ODBC Driver DSN for Arrow Flight SQL developed by Dremio
   Driver=Arrow Flight SQL ODBC Driver
   Host=localhost
   Port=8904
   UID=root
   PWD=
   Database=public
   Tenant=cnosdb
   useEncryption=false
   TrustedCerts=/opt/arrow-flight-sql-odbc-driver/lib64/cacerts.pem
   UseSystemTrustStore=true
   ```

  其中 UID是用户名，PWD是密码。

- #### 测试是否连接

   ```shell
   isql -v CNOSDB
   ```

  如果出现如下内容，说明连接成功。

   ```
   +---------------------------------------+
   | Connected!                            |
   |                                       |
   | sql-statement                         |
   | help [tablename]                      |
   | quit                                  |
   |                                       |
   +---------------------------------------+
   SQL>
   ```

  下面进入代码测试。

- #### 编写cmake

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

- #### 编写c语言代码 main.c

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
       printf("%d-%02d-%02dT%02d:%02d:%02d, %s, %.2lf, %.2lf, %.2lf\n", time.year, time.month, time.day, time.hour, time.minute, time.second, station, visibility, temperature, pressure);
     } else {
      break;
     }
   }
   return 0;
 }
 ```

</TabItem>

</Tabs>