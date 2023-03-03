---
title: JDBC
order: 3
---
1. Adding dependencies

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

   Add environment variables

   ```shell
   _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
   ```

   ```shell
   java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
   # Or
   env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java -jar ...
   
   
   # If use maven
   _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
   ```

2. Set properties and query

   ```java
   package org.example;
   
   import java.sql.*;
   import java.util.Properties;
   
   public class Main {
     public static void main(String[] args) {
       final Properties properties = new Properties();
       properties.put("user", "root"); //User Name
       properties.put("password", "");  //Password
       properties.put("tenant", "cnosdb");//Tenants
       properties.put("useEncryption", false);
       try (
         Connection connection = DriverManager.getConnection(
           "jdbc:arrow-flight-sql://localhost:31004", properties
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

3. Set properties and execute SQL

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
           "jdbc:arrow-flight-sql://localhost:31004", properties
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