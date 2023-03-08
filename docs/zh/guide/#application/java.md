---
title: Java
order: 3
---

1. 添加依赖

    - 如果你使用maven构建Java项目，在pom.xml中写入依赖

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

    - 再写入

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



- 添加环境变量

  ```shell
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED"
  ```

  ```shell
  java --add-opens=java.base/java.nio=ALL-UNNAMED -jar ...
  # 或
  env _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" java -jar ...
  
  
  # 如果使用 maven 
  _JAVA_OPTIONS="--add-opens=java.base/java.nio=ALL-UNNAMED" mvn exec:java -Dexec.mainClass="YourMainCode"
  ```

2. 构建FlightSqlClient

   ```java
   BufferAllocator allocator = new RootAllocator(Integer.MAX_VALUE);
   final Location clientLocation = Location.forGrpcInsecure("localhost", 31004);
   
   FlightClient client = FlightClient.builder(allocator, clientLocation).build();
   FlightSqlClient sqlClinet = new FlightSqlClient(client);
   ```

3. 配置认证

   ```java
   Optional<CredentialCallOption> credentialCallOption = client.authenticateBasicToken("root", "");
   final CallHeaders headers = new FlightCallHeaders();
   headers.insert("tenant", "cnosdb");
   Set<CallOption> options = new HashSet<>();
   
   credentialCallOption.ifPresent(options::add);
   options.add(new HeaderCallOption(headers));
   CallOption[] callOptions = options.toArray(new CallOption[0]);
   ```

4. 执行SQL，取得FlightInfo

   ```java
   try (final FlightSqlClient.PreparedStatement preparedStatement = sqlClinet.prepare("select now();", callOptions)) {
     final FlightInfo info = preparedStatement.execute();
     System.out.println(info.getSchema());
     
     //剩余代码在下一个步骤
   } 
   ```

5. 取得数据

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

6. 全部代码

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
       final Location clientLocation = Location.forGrpcInsecure("localhost", 31004);
   
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