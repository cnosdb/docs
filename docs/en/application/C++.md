---
title: C++
order: 3
---

1. Installing Apache Arrow
   You can find a detailed installation tutorial in the [official  documentation](arrow.apache.org/install/)
   On Mac systems, it's easy to install with the brew command

   ```shell
   brew install apache-arrow
   brew install apache-arrow-glib
   ```



2. Configuring CMakeLists.txt

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



3. Usage of C++ Arrow library
   Most of arrow's functions return the arrow::Result\<T\> type, so you need to write the code in a function that returns a value of the type arrow::Result\<T>, as follows

   ```c++
    arrow::Result <std::unique_ptr<FlightClient>> get_location() {
        ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 31004));
        ARROW_ASSIGN_OR_RAISE(auto client, FlightClient::Connect(location))
    }
   ```

   `ARROW_ASSIGN_OR_RAISE`The effect of the macro is to first evaluate the expression with a return value of type arrow::Result\<T\> on the right, and then return it early if an exception occurs, assigning the corresponding Status value


For convenience, the sample code is written in the lambda function

   ```cpp
   int main() {
     auto fun = []() {
     // code
   	}
     fun();
     return 0;
   }
   ```

4. Verify identity to obtain a token and create a FlightSqlClient

   ```c++
   ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 31004))
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

5. Execute sql to get FlightInfo

   ```c++
   ARROW_ASSIGN_OR_RAISE(auto info, sql_client->Execute(call_options, "select now();"));
   const auto endpoints = info->endpoints();
   ```

6. Retrieve data via FlightEndPoint

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

7. Overall Code

   ```c++
   #include <iostream>
   #include <arrow/flight/api.h>
   #include <arrow/flight/sql/api.h>
   using namespace arrow::flight;
   using namespace arrow::flight::sql;
   using namespace arrow;
   
   int main() {
   
       auto fun = []() {
           ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 31004))
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