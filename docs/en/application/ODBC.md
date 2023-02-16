---
title: ODBC
order: 3
---

Currently only x86_64 architecture systems are supported, linux only supports centos and redhat series distributions

For more on Arrow Flight SQL ODBC, see the [Dremio documentation](https://docs.dremio.com/software/drivers/arrow-flight-sql-odbc-driver/)

1. The following steps are based on Centos7

   1. Install ODBC Manager

      Install unixODBC under Linux

   ```shell
   yum install unixODBC-devel
   ```

2. Install arrow-flight-odbc driver

   ```shell
   wget https://download.dremio.com/arrow-flight-sql-odbc-driver/arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm 
   yum localinstall arrow-flight-sql-odbc-driver-LATEST.x86_64.rpm 
   ```

3. Modify the configuration file
   Modify the configuration file located in /etc/odbc.ini

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

   where UID is the user name and PWD is the password

4. test whether the connection

   ```shell
   isql -v CNOSDB
   ```

   If the following appears, the connection is successful

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

   Go to the code test below

5. Writing cmake

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

6. Write c code main.c

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