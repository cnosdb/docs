---
title: PLC4X
slug: /plc4x
---

In contemporary industrial automation systems, real-time monitoring and data analysis have become critical.This paper will describe how to achieve efficient data collection and storage of PLC equipment in the industrial control system by integrating Apache PLC4X with CnosDB, providing engineers with stronger data analysis and monitoring tools.

## **PLC's definitions**

PLC is an abbreviated version of the programmable logical controller and an industrial computer for automated control.It is widely used in the industrial field to monitor and control mechanical equipment and processes in the production process.It took the traditional relay logical control system and performed various control tasks in a programmed manner.

## **PLC's main features and functions**

1. **Programmable:** implements different control logic and adapts different industrial processes through programming.
2. **Real-time:** monitors and responds to changes in the production process in real time.
3. **Reliability:** is durable, stable and able to work in harsh environments.
4. **Generic:** applies to different types of control tasks such as logical control, motion control, process control, etc.

## **PLC4X Introduction**

PLC4X (Apache PLC4X) is an open source project designed to provide a flexible and extensible set of tools for industrial automation for communication with various programmable logical controllers (PLC).It simplifies the complexity of interacting with PLC of different brands and models and makes it easier for developers to integrate PLC data into their applications.

The project was supported by the Apache Software Foundation, using Java and providing multilingual API, including Java, Python and JavaScript.PLC4X supports a variety of communications protocols such as Modbus, OPC UA, Siemens S7, etc., enabling them to communicate with a variety of PLC equipment.

In general, PLC4X is designed to provide an open, standardized interface for industrial automation systems to facilitate the integration and management of different types of PLC.

## **CnosDB Introduction**

CnosDB is an open-source database focused on time-series data storage.Its high-performance and flexible query language makes it an ideal data storage solution in industrial control systems, especially in situations where real-time monitoring and data analysis are needed.

Below is an example of PLC4X integration of CnosDB in Java language.In an example, we will use the PLC4X library to read data from a virtual PLC device, and then write to CnosDB.

First configure the connection to write to CnosDB:

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

Then select the connection address of the PLC device to be read, the example uses the virtual address provided by the PLC4X library:

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

After running the sample code, you can check the CnosDB database and confirm that the data has been successfully written.

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

By using PLC4X integrated with CnosDB, engineers can more easily build efficient real-time industrial control systems. This integration not only makes data collection easier, but also provides users with a strong time-series database that provides a solid basis for the next development of industrial automation.

The examples of code and integration steps provided in this paper are intended to help community members make it easier to use PLC4X and CnosDB and to promote wider use of open source tools in the field of industrial automation.Through this integration, we are confident that it will be possible to promote innovation in industrial control systems and improve productivity and data analysis capabilities.
