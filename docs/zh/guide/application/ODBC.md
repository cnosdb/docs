---
title: ODBC
order: 3
---

目前仅支持x86_64架构的系统，linux仅支持centos和redhat系列发行版

更多关于Arrow Flight SQL ODBC的内容，请查看[Dremio文档](https://docs.dremio.com/software/drivers/arrow-flight-sql-odbc-driver/)

以下步骤基于Centos7

1. 安装ODBC管理器

   在Linux下安装unixODBC

   ```shell
   yum install unixODBC-devel
   ```

2. 安装arrow-flight-odbc驱动

   ```shell
   wget https://download.dremio.com/arrow-flight-sql-odbc-driver/arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm 
   yum localinstall arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm 
   ```

3. 修改配置文件
   修改位于/etc/odbc.ini的配置文件

   ```
   [ODBC Data Sources]
   CNOSDB=Arrow Flight SQL ODBC Driver
   
   [CNOSDB]
   Description=ODBC Driver DSN for Arrow Flight SQL developed by Dremio
   Driver=Arrow Flight SQL ODBC Driver
   Host=localhost
   Port=31004  
   UID=root
   PWD=
   Database=public
   Tenant=cnosdb
   useEncryption=false
   TrustedCerts=/opt/arrow-flight-sql-odbc-driver/lib64/cacerts.pem
   UseSystemTrustStore=true
   ```

   其中 UID是用户名，PWD是密码

4. 测试是否连接

   ```shell
   isql -v CNOSDB
   ```

   如果出现如下内容，说明连接成功

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

   下面进入代码测试

5. 编写cmake

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

6. 编写c语言代码 main.c

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
