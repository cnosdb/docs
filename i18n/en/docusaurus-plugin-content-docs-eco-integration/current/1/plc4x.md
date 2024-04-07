---
title: PLC4X
slug: /plc4x
---

在当代工业自动化系统中，实时监测和数据分析变得至关重要。本文将介绍如何通过集成Apache PLC4X与CnosDB，实现对工业控制系统中的PLC设备进行高效数据采集和存储，为工程师们提供更强大的数据分析和监测工具。

## **PLC的定义**

PLC是可编程逻辑控制器的缩写，是一种用于自动化控制的工业计算机。它广泛应用于工业领域，用于监控和控制生产过程中的机械设备和工艺。它取了传统的继电器逻辑控制系统，以编程方式执行各种控制任务。

## **PLC的主要特点和功能**

1. **可编程性：** 通过编程实现不同的控制逻辑，适应不同的工业过程。
2. **实时性：** 实时监测和响应生产过程中的变化。
3. **可靠性：** 耐用、稳定，并能在恶劣环境中工作。
4. **通用性：** 适用于逻辑控制、运动控制、过程控制等不同类型的控制任务。

## **PLC4X简介：**

PLC4X（Apache PLC4X）是一个开源项目，旨在为工业自动化领域提供灵活、可扩展的工具集，用于与各种可编程逻辑控制器（PLC）通信。它能简化与不同品牌和型号的PLC交互的复杂性，使开发人员更轻松地集成PLC数据到他们的应用程序中。

该项目由Apache软件基金会支持，使用Java编写，并提供了多种语言的API，包括Java、Python和JavaScript等。PLC4X支持多种通信协议，如Modbus、OPC UA、Siemens S7等，使其能够与各种PLC设备进行通信。

总体而言，PLC4X旨在为工业自动化系统提供开放、标准化的接口，以便更容易地集成和管理不同类型的PLC。

## **CnosDB简介：**

CnosDB是一款专注于时序数据存储的开源数据库。其高性能和灵活的查询语言使其成为工业控制系统中理想的数据存储解决方案，特别是在需要实时监测和数据分析的场景下。

下面是用Java语言实现PLC4X集成CnosDB的示例。在示例中，我们将使用PLC4X库从虚拟PLC设备中读取数据，然后写入到CnosDB。

首先配置好写入 CnosDB 的连接：

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

然后选择要读取的PLC设备的连接地址，示例中使用PLC4X库提供的虚拟地址：

```java
String plcConnectionString = "simulated://127.0.0.1";
```

从虚拟地址中读取随机数据，实际项目中需要替换成真实PLC设备的地址。

使用Read请求从该地址中读取一个随机整数，然后写入CnosDB数据库：

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

运行示例代码后，可以查询CnosDB数据库，确认数据已成功写入。

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

通过使用PLC4X与CnosDB的集成，工程师们可以更轻松地建立高效的实时工业控制系统。这种集成不仅使数据采集更加简便，还为用户提供了强大的时序数据库，为工业自动化的下一步发展提供了坚实的基础。

本文提供的代码示例和集成步骤旨在帮助社区成员更容易地使用PLC4X和CnosDB，促进开源工具在工业自动化领域的广泛应用。通过这种集成，我们相信能够推动工业控制系统的创新，提高生产效率和数据分析能力。
