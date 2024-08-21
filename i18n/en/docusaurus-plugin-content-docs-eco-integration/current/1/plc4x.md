---
title: PLC4X
slug: /plc4x
---

In contemporary industrial automation systems, real-time monitoring and data analysis have become crucial.This article will introduce how to efficiently collect and store data from PLC devices in industrial control systems by integrating Apache PLC4X with CnosDB, providing engineers with more powerful data analysis and monitoring tools.

## **Definition of PLC**

PLC is the abbreviation of Programmable Logic Controller, which is an industrial computer used for automation control.It is widely used in the industrial field for monitoring and controlling mechanical equipment and processes in the production process.It took the traditional relay logical control system and performed various control tasks in a programmed manner.

## **PLC's main features and functions**

1. **Programmable:** implements different control logic and adapts different industrial processes through programming.
2. \*\*Real-time: \*\* monitors and responds to changes in the production process in real time.
3. **Reliability:** is durable, stable and able to work in harsh environments.
4. **Generic:** applies to different types of control tasks such as logical control, motion control, process control, etc.

## **PLC4X Introduction**

PLC4X (Apache PLC4X) is an open source project designed to provide a flexible and extensible set of tools for industrial automation for communication with various programmable logical controllers (PLC).It simplifies the complexity of interacting with PLC of different brands and models and makes it easier for developers to integrate PLC data into their applications.

The project was supported by the Apache Software Foundation, Using Java and providing multilingual API, including Java, Python and JavaScript.PLC4X supports a variety of communications protocols such as Modbus, OPPC UA, Siemens S7, etc., enabling them to communicate with a variety of PLC equipment.

In general, PLC4X is designed to provide an open, standardized interface for industrial automation systems to facilitate the integration and management of different types of PLC.

## **CnosDB Introduction**

CnosDB is an open-source database focused on time-series data storage.Its high-performance and flexible query language makes it an ideal data storage solution in industrial control systems, especially in situations where real-time monitoring and data analysis are needed.

Below is an example of PLC4X integration of CnosDB in Java language.In an example, we will use the PLC4X library to read data from a virtual PLC device, and then write to CnosDB.

First configure connection: to write to CnosDB

```java
// Configure the connection to CnosDB
String cnosDBUrl = "http://127.0.0.1:8902";
String tenant = "cnosdb";
String databaseName = "public";
String username = "root";
String password = "";
String measurement = "plc4x";

String apiUrl = cnosDBUrl + "/api/v1/write?db=" + databaseName + "&tenant=" + tenant + "&pretty=true";
String auth = username + ":" + password;
byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
String authHeaderValue = "Basic " + new String(encodedAuth);


URL url = new URL(apiUrl);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
connection.setRequestMethod("POST");
connection.setRequestProperty("Authorization", authHeaderValue);
connection.setDoOutput(true);
```

Then select the connection address of Plc devices to read, in example with the virtual address provided by Plc4X library.

```java
String plcConnectionString = "simulated://127.0.0.1";
```

Reads random data from a virtual address. The actual project needs to be replaced with the real PLC device.

Read a random integer from that address using Read Request and write to the CnosDB database:

```java
try (PlcConnection plcConnection = PlcDriverManager.getDefault().getConnectionManager().getConnection(plcConnectionString)) {
    String field = "foo";

    PlcReadRequest readRequest =  plcConnection.readRequestBuilder()
            .addTagAddress(field, "RANDOM/foo:INT") // Replace with your PLC address
            .build();

    PlcReadResponse response = readRequest
            .execute()
            .get();

    int fieldValue = response.getInteger(field);

    String line = String.format("%s %s=%di",measurement, field, fieldValue);

    System.out.println(line);
    connection.getOutputStream().write(line.getBytes());

    System.out.println(connection.getResponseMessage());

    connection.disconnect();
} catch (Exception e) {
    e.printStackTrace();
}
```

After running the sample code, you can query the CnosDB database to confirm that the data has been successfully written.

```sql
public ❯ show tables;
+------------+
| table_name |
+------------+
| plc4x      |
+------------+
Query took 0.089 seconds.
public ❯ select * from plc4x;
+----------------------------+------+
| time                       | foo  |
+----------------------------+------+
| 2024-01-04T08:27:23.566444 | 3625 |
+----------------------------+------+
Query took 0.024 seconds.
public ❯
```

By using PlC4X integration with CnosDB, engineers can easily establish efficient real-time industrial control systems.This integration not only makes data collection more convenient, but also provides users with a powerful time series database, laying a solid foundation for the next step of industrial automation development.

The examples of code and integration steps provided in this paper are intended to help community members make it easier to use PLC4X and CnosDB and to promote wider use of open source tools in the field of industrial automation.Through this integration, we believe that we can drive innovation in industrial control systems, improve production efficiency, and enhance data analysis capabilities.
