---
title: Arrow Flight
order: 3
---

Arrow Flight SQL is a protocol for interacting with SQL databases using the Arrow in-memory format and the Flight RPC framework.

Our current environments that support the Arrow Flight SQL client are

- [C++](c++.md)
- [Go](go.md)
- [Java](java.md)
- [Rust](rust.md)
-  [JDBC](JDBC.md) based on Arrow Flight SQL
-  [ODBC](ODBC.md) based on Arrow Flight SQL

## Benefits of Arrow Flight SQL

1. Powerful functionality. Functionality similar to APIs such as JDBC and ODBC, including executing queries, creating prepared statements
2. security. Flight, supporting features such as out-of-the-box encryption and authentication.
3. Performance. Communicates with client-side servers that implement Arrow Flight without data transformation, while allowing further optimizations such as parallel data access.

While it can be used directly for database access, it is not a direct replacement for JDBC/ODBC. However, Flight SQL can be used as a specific wired protocol/driver implementation that supports JDBC/ODBC drivers and reduces the implementation burden on the database.

![cnosdb_arrow_flight.png](https://github.com/cnosdb/docs/blob/main/docs/source/_static/img/cnosdb_arrow_flight.png?raw=true)



## Flow of Arrow Flight SQL queries

The client uses arrow flight sql client to connect to the database, query data, and execute SQL in the following flow.

1. create FlightSql client
2. verify the user name and password
3. Execute the SQL and get the FlightInfo structure
4. Get the FlightData data stream through the FlightEndPoint in the FlightInfo structure.


FlightInfo contains detailed information about the location of the data.
The client can get the data from the appropriate server.
The server information is encoded as a series of FlightEndpoint messages in FlightInfo. 
Each Endpoint represents a location that contains a subset of the response data.

A FlightEndpoint contains a list of server addresses.
a Ticket, a binary Token that the server uses to identify the requested data.
FlightEndPoint has no defined order, and if the data set is sorted
If the data set is sorted, the data will be returned in only one FlightEndPoint.





流程图如下

![流程图](https://github.com/cnosdb/docs/raw/main/docs/source/_static/img/arrow_flight_flow.png)
