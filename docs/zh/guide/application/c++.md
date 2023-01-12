---
title: C++
order: 3
---

1. 安装Apache Arrow
   你可以去[官方文档](arrow.apache.org/install/)找到详细的安装教程
   在Mac系统下，使用brew命令就可以简单安装了

   ```shell
   brew install apache-arrow
   brew install apache-arrow-glib
   ```



2. 配置CMakeLists.txt

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



3. C++ Arrow库的用法
   arrow的函数大多数是返回arrow::Result\<T\>类型，因此需要把代码写在返回值为 arrow::Result\<T>的类型的函数中，如下

   ```c++
    arrow::Result <std::unique_ptr<FlightClient>> get_location() {
        ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 31004));
        ARROW_ASSIGN_OR_RAISE(auto client, FlightClient::Connect(location))
    }
   ```

   `ARROW_ASSIGN_OR_RAISE`宏的效果是，先对右边返回值为arrow::Result\<T\>类型的表达式求值，如果出现异常，则提前return，赋上相应的Status值


为了方便，示例代码均写在lambda函数中

   ```cpp
   int main() {
     auto fun = []() {
     // code
   	}
     fun();
     return 0;
   }
   ```

4. 验证身份获取令牌，并创建一个FlightSqlClient

   ```c++
   ARROW_ASSIGN_OR_RAISE(auto location, Location::ForGrpcTcp("localhost", 31004))
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

5. 执行sql取得FlightInfo

   ```c++
   ARROW_ASSIGN_OR_RAISE(auto info, sql_client->Execute(call_options, "select now();"));
   const auto endpoints = info->endpoints();
   ```

6. 通过FlightEndPoint取回数据

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

7. 整体代码

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
