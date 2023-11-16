---
title: Arrow Flight SQL
order: 2
---

# Arrow Flight SQL

## Arrow Flight SQL Introduction

Arrow Flight SQL is a protocol for interacting with SQL databases using the Arrow in-memory format and the Flight RPC framework.

Our current environments that support the Arrow Flight SQL client are

- [C++](#different-client-usage)
- [Go](#different-client-usage)
- [Java](#different-client-usage)
- [Rust](#different-client-usage)
- [JDBC](#different-client-usage) based on Arrow Flight SQL
- [ODBC](#different-client-usage) based on Arrow Flight SQL

### Benefits of Arrow Flight SQL

1. Powerful functionality. Functionality similar to APIs such as JDBC and ODBC, including executing queries, creating prepared statements
2. security. Flight, supporting features such as out-of-the-box encryption and authentication.
3. Performance. Communicates with client-side servers that implement Arrow Flight without data transformation, while allowing further optimizations such as parallel data access.

While it can be used directly for database access, it is not a direct replacement for JDBC/ODBC. However, Flight SQL can be used as a specific wired protocol/driver implementation that supports JDBC/ODBC drivers and reduces the implementation burden on the database.

![](/img/cnosdb_arrow_flight.png)

## Flow of Arrow Flight SQL Queries

The client uses arrow flight sql client to connect to the database, query data, and execute SQL in the following flow.

1. Create FlightSql client.
2. Verify the user name and password.
3. Execute the SQL and get the FlightInfo structure.
4. Get the FlightData data stream through the FlightEndPoint in the FlightInfo structure.

FlightInfo contains detailed information about the location of the data.
The client can get the data from the appropriate server.
The server information is encoded as a series of FlightEndpoint messages in FlightInfo.
Each Endpoint represents a location that contains a subset of the response data.

A FlightEndpoint contains a list of server addresses.
a Ticket, a binary Token that the server uses to identify the requested data.
FlightEndPoint has no defined order, and if the data set is sorted
If the data set is sorted, the data will be returned in only one FlightEndPoint.


The flow chart is as follows:

![流程图](/img/arrow_flight_flow.png)

## Different Client Usage

::: info Here's how to use the different clients:
:::

::: tabs#language

@tab C++#C++

- #### Installing Apache Arrow

   You can find a detailed installation tutorial in the [official documentation](https://arrow.apache.org/datafusion/user-guide/introduction)
   On Mac systems, it's easy to install with the brew command

   ```shell
   brew install apache-arrow
   brew install apache-arrow-glib
   ```

- #### Configuring CMakeLists.txt

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

  Most of arrow's functions return the `arrow::Result\<T\>` type, so you need to write the code in a function that returns a value of the type `arrow::Result\<T>`, as follows:

   ```c++
    arrow::Result <std::unique_ptr<FlightClient>> get_location() {
        ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 8904));
        ARROW_ASSIGN_OR_RAISE(auto client, FlightClient::Connect(location))
    }
   ```

  `ARROW_ASSIGN_OR_RAISE`The effect of the macro is to first evaluate the expression with a return value of type `arrow::Result\<T\>` on the right, and then return it early if an exception occurs, assigning the corresponding Status value.

  For convenience, the sample code is written in the `lambda` function.

   ```c++
   int main() {
     auto fun = []() {
     // code
   	}
     fun();
     return 0;
   }
   ```

- #### Verify identity to obtain a token and create a FlightSqlClient

   ```c++
   ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 8904))
   ARROW_ASSIGN_OR_RAISE(auto client, FlightClient::Connect(location))
   auto user = "root";
   auto password = "";
   //Base64 Encrypted Authentication
   auto auth = client->AuthenticateBasicToken({}, user, password); 
   ARROW_RETURN_NOT_OK(auth); // If an exception occurs in result, return directly
   FlightCallOptions call_options;
   call_options.headers.push_back(auth.ValueOrDie()); //Putting authentication in the call option
   auto sql_client = std::make_unique<FlightSqlClient>(std::move(client));
   ```

- #### Execute sql to get FlightInfo

   ```c++
   ARROW_ASSIGN_OR_RAISE(auto info, sql_client->Execute(call_options, "select now();"));
   const auto endpoints = info->endpoints();
   ```

- #### Retrieve data via FlightEndPoint

   ```c++
   for (auto i = 0; i < endpoints.size(); i++) {
     auto &ticket = endpoints[i].ticket; 
     // stream contains data
     ARROW_ASSIGN_OR_RAISE(auto stream, sql_client->DoGet(call_options, ticket));
     // Schema for obtaining data
     auto schema = stream->GetSchema();
     ARROW_RETURN_NOT_OK(schema);
     std::cout << "Schema:" << schema->get()->ToString() << std::endl;
    // Obtain and print data
     while(true) {
       ARROW_ASSIGN_OR_RAISE(FlightStreamChunk chunk, stream->Next());
       if (chunk.data == nullptr) {
         break;
       }
       std::cout << chunk.data->ToString();
     }
   }
   ```

#### Overall code

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

@tab Golang#Golang

- #### Add dependencies

  Add dependencies in `go.mod`.

   ```go
   require (
     github.com/apache/arrow/go/v10 v10.0.1
     google.golang.org/grpc v1.51.0
   )
   ```

- #### Build Flight SQL Client

   ```go
   addr := "127.0.0.1:8904"
   var dialOpts = []grpc.DialOption{
     grpc.WithTransportCredentials(insecure.NewCredentials()),
   }
   cl, err := flightsql.NewClient(addr, nil, nil, dialOpts...)
   if err != nil {
     fmt.Print(err)
     return
   }
   ```
  `addr` is the address in CnosDB configure `flight_rpc_listen_addr`.

- #### Set connection credentials and retrieve the authenticated context

   ```go
   ctx, err := cl.Client.AuthenticateBasicToken(context.Background(), "root", "")
   if err != nil {
     fmt.Print(err)
     return
   }
   ```

- #### Execute SQL in the authenticated context to get FlightInfo

   ```go
   info, err := cl.Execute(ctx, "SELECT now();")
   if err != nil {
     fmt.Print(err)
     return
   }
   ```

- #### Get the data Reader from FlightInfo

   ```go
   // CnosDB only implements one EndPoint now.
   rdr, err := cl.DoGet(ctx, info.GetEndpoint()[0].Ticket)
   if err != nil {
     fmt.Print(err)
     fmt.Println(35)
     return
   }
   defer rdr.Release()
   ```

- #### Get the data via Reader

   ```go
   n := 0
   for rdr.Next() {
     record := rdr.Record()
     for i, col := range record.Columns() {
       fmt.Printf("rec[%d][%q]: %v\n", n, record.ColumnName(i), col)
     }
     column := record.Column(0)
     column.String()
     n++
   }
   ```

@tab Java#Java

- #### Add dependencies

    - Add dependencies in `pom.xml`, if you use maven.

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

    - write again

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

- #### Add environment variable

  ```shell
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
  ```

  ```shell
  java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
  # or
  env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java -jar ...
  
  
  # if maven used 
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
  ```

- #### Build Flight SQL Client

   ```java
   BufferAllocator allocator = new RootAllocator(Integer.MAX_VALUE);
   final Location clientLocation = Location.forGrpcInsecure("localhost", 8904);
   
   FlightClient client = FlightClient.builder(allocator, clientLocation).build();
   FlightSqlClient sqlClinet = new FlightSqlClient(client);
   ```

- #### Config Authentication

   ```java
   Optional<CredentialCallOption> credentialCallOption = client.authenticateBasicToken("root", "");
   final CallHeaders headers = new FlightCallHeaders();
   headers.insert("tenant", "cnosdb");
   Set<CallOption> options = new HashSet<>();
   
   credentialCallOption.ifPresent(options::add);
   options.add(new HeaderCallOption(headers));
   CallOption[] callOptions = options.toArray(new CallOption[0]);
   ```

- #### Execute SQL in the authenticated context to get FlightInfo

   ```java
   try (final FlightSqlClient.PreparedStatement preparedStatement = sqlClinet.prepare("select now();", callOptions)) {
     final FlightInfo info = preparedStatement.execute();
     System.out.println(info.getSchema());
     
     //剩余代码在下一个步骤
   } 
   ```

- #### Get the data

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

#### Overall Code

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

@tab Rust#Rust

The code runs in an asynchronous environment.

- #### Add dependencies

   ```toml
   arrow = {version = "28.0.0", features = ["prettyprint"] }
   arrow-flight = {version = "28.0.0", features = ["flight-sql-experimental"]}
   tokio = "1.23.0"
   futures = "0.3.25"
   prost-types = "0.11.2"
   tonic = "0.8.3"
   prost = "0.11.3"
   http-auth-basic = "0.3.3"
   base64 = "0.13.1"
   ```

- #### Creative Flight ServerClient

   ```rust
   let mut client = FlightServiceClient::connect("http://localhost:8904")
   .await
   .expect("connect faile");
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

- ####  Get the data and print it

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

#### Overall Code

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

@tab JDBC#JDBC

- #### Add dependencies

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

- #### Add environment variables

   ```shell
   _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
   ```

   ```shell
   java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
   # or
   env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java -jar ...
   
   
   # if you use maven
   _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
   ```

- #### Set properties and query

   ```java
   package org.example;
   
   import java.sql.*;
   import java.util.Properties;
   
   public class Main {
     public static void main(String[] args) {
       final Properties properties = new Properties();
       properties.put("user", "root"); // username
       properties.put("password", "");  // password
       properties.put("tenant", "cnosdb");// tenant
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

- #### Set properties and execute SQL

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

@tab ODBC#ODBC

Currently only x86_64 architecture systems are supported, linux only supports centos and redhat series distributions

For more on Arrow Flight SQL ODBC, see the [Dremio documentation](https://docs.dremio.com/software/drivers/arrow-flight-sql-odbc-driver/).

The following steps are based on Centos7.

- #### Install ODBC Manager

     Install unixODBC under Linux

   ```shell
   yum install unixODBC-devel
   ```

- #### Install arrow-flight-odbc driver

   ```shell
   wget https://download.dremio.com/arrow-flight-sql-odbc-driver/arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm 
   yum localinstall arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm 
   ```

- #### Modify the configuration file

   Modify the configuration file located in `/etc/odbc.ini`.

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

   where UID is the user name and PWD is the password.

- ####  test whether the connection

   ```shell
   isql -v CNOSDB
   ```

   If the following appears, the connection is successful.

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

   Go to the code test below.

- #### Writing cmake

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

- #### Write c code main.c

   ```c
   #include <stdio.h>
   #include <sql.h>
   #include <sqlext.h>
   
   int main() {
     SQLHENV henv;
     SQLHDBC hdbc;
     SQLHSTMT hsmt;
     SQLRETURN ret;
     
     
     // Allocate environment memory
     ret = SQLAllocEnv(&henv);
     if (ret != SQL_SUCCESS) {
       fprintf(stderr, "Unable to allocate an environment handle");
       return -1;
     }
     // Setting environmental properties
     ret = SQLSetEnvAttr(henv,  SQL_ATTR_ODBC_VERSION, (void *) SQL_OV_ODBC3, 0);
     if (ret != SQL_SUCCESS) {
       fprintf(stderr, "Unable to set env attr");
       return -1;
     }
     // Allocate connection memory
     ret = SQLAllocConnect(henv, &hdbc);
     if (ret != SQL_SUCCESS) {
       fprintf(stderr, "Unable to allocate connection");
     }
     //Connect to driver
     ret = SQLDriverConnect(hdbc, NULL, (SQLCHAR*) "DSN=CNOSDB;UID=root;PWD=", SQL_NTS,
                            NULL, 0, NULL, SQL_DRIVER_NOPROMPT);
     if (ret != SQL_SUCCESS) {
       fprintf(stderr, "connect fail");
     }
     // Allocate statement space
     SQLAllocStmt(hdbc, &hsmt);
   
     SQLCHAR *sql = "CREATE TABLE IF NOT EXISTS air (\n"
       " visibility  DOUBLE,\n"
       " temperature DOUBLE,\n"
       " pressure    DOUBLE,\n"
       " TAGS(station));";
     // Execute Create table
     ret = SQLExecDirect(hsmt, sql, SQL_NTS);
     if (ret != SQL_SUCCESS) {
       fprintf(stderr, "Execute create fail");
     }
   
    
     sql = "INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES\n"
       "    (1666165200290401000, 'XiaoMaiDao', 56, 69, 77);";
     // Execute insert
     ret = SQLExecDirect(hsmt, sql, SQL_NTS);
     if (ret != SQL_SUCCESS) {
       fprintf(stderr, "Execute insert fail");
     }
   
     sql = "SELECT * FROM air LIMIT 1";
     //Execution of queries
     ret = SQLExecDirect(hsmt, sql ,SQL_NTS);
     if (ret != SQL_SUCCESS) {
       fprintf(stderr, "Execute query fail");
     }
     SQL_TIMESTAMP_STRUCT time;
     SQLCHAR station[50];
     SQLDOUBLE visibility, temperature, pressure;
     long time_len, station_len;
     
     // Get result set
     while (1) {
       ret = SQLFetch(hsmt);
       if (ret == SQL_ERROR || ret == SQL_SUCCESS_WITH_INFO) {
         printf("error SQLFetch");
       }
       // Get the data of a column
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



:::