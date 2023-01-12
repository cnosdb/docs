---
title: Rust
order: 3
---

代码运行在异步环境下

1. 添加依赖

   ```toml
   arrow = {version = "28.0.0", features = ["prettyprint"] }
   arrow-flight = {version = "28.0.0", features = ["flight-sql-experimental"]}
   tokio = "1.23.0"
   futures = "0.3.25"
   prost-types = "0.11.2"
   tonic = "0.8.3"
   prost = "0.11.3"
   http-auth-basic = "0.3.3"
   base64 = "0.13.1"
   ```

2. 创建FlightServerClient

   ```rust
   let mut client = FlightServiceClient::connect("http://localhost:31004")
   .await
   .expect("connect faile");
   ```

3. 进行验证

   ```rust
   let mut req = Request::new(futures::stream::iter(iter::once(
     HandshakeRequest::default(),
   )));
   
   req.metadata_mut().insert(
     AUTHORIZATION.as_str(),
     AsciiMetadataValue::try_from(format!(
       "Basic {}",
       base64::encode(format!("{}:{}", "root", ""))
     ))
     .expect("metadata construct fail"),
   );
   
   let resp = client.handshake(req).await.expect("handshake");
   
   println!("handshake resp: {:?}", resp.metadata());
   ```

4. 执行SQL

   ```rust
   let cmd = CommandStatementQuery {
     query: "select 1;".to_string(),
   };
   let pack = prost_types::Any::pack(&cmd).expect("pack");
   let fd = FlightDescriptor::new_cmd(pack.encode_to_vec());
   
   let mut req = Request::new(fd);
   req.metadata_mut().insert(
     AUTHORIZATION.as_str(),
     resp.metadata().get(AUTHORIZATION.as_str()).unwrap().clone(),
   );
   let resp = client.get_flight_info(req).await.expect("get_flight_info");
   
   let flight_info = resp.into_inner();
   let schema_ref =
   Arc::new(Schema::try_from(IpcMessage(flight_info.schema)).expect("Schema::try_from"));
   println!("{}", schema_ref);
   ```

5. 取得数据并打印

   ```rust
   for ep in flight_info.endpoint {
     if let Some(ticket) = ep.ticket {
       let resp = client.do_get(ticket).await.expect("do_get");
       let mut stream = resp.into_inner();
       let mut dictionaries_by_id = HashMap::new();
   
       let mut record_batches = Vec::new();
       while let Some(Ok(flight_data)) = stream.next().await {
         let message =
         root_as_message(&flight_data.data_header[..]).expect("root as message");
         match message.header_type() {
           ipc::MessageHeader::Schema => {
             println!("a schema when messages are read",);
           }
   
           ipc::MessageHeader::RecordBatch => {
             let record_batch = flight_data_to_arrow_batch(
               &flight_data,
               schema_ref.clone(),
               &dictionaries_by_id,
             )
             .expect("record_batch_from_message");
             record_batches.push(record_batch);
           }
           ipc::MessageHeader::DictionaryBatch => {
             let ipc_batch = message.header_as_dictionary_batch().unwrap();
   
             reader::read_dictionary(
               &Buffer::from(flight_data.data_body),
               ipc_batch,
               &schema_ref,
               &mut dictionaries_by_id,
               &message.version(),
             )
             .unwrap();
           }
           _ => {
             panic!("Reading types other than record batches not yet supported");
           }
         }
       }
   
       println!(
         "{}",
         arrow::util::pretty::pretty_format_batches(&record_batches).expect("print")
       );
     }
   }
   ```



6. 完整代码

   ```rust
   use std::collections::HashMap;
   use std::iter;
   use std::sync::Arc;
   
   use arrow::buffer::Buffer;
   use arrow::datatypes::Schema;
   use arrow::ipc;
   use arrow::ipc::{reader, root_as_message};
   use arrow_flight::flight_service_client::FlightServiceClient;
   use arrow_flight::sql::{CommandStatementQuery, ProstAnyExt};
   use arrow_flight::utils::flight_data_to_arrow_batch;
   use arrow_flight::{FlightDescriptor, HandshakeRequest, IpcMessage};
   use futures::StreamExt;
   
   use prost::Message;
   use tonic::codegen::http::header::AUTHORIZATION;
   use tonic::metadata::AsciiMetadataValue;
   use tonic::Request;
   
   #[tokio::main]
   async fn main() {
   
     let mut client = FlightServiceClient::connect("http://localhost:31004")
     .await
     .expect("connect");
   
     let mut req = Request::new(futures::stream::iter(iter::once(
       HandshakeRequest::default(),
     )));
   
     req.metadata_mut().insert(
       AUTHORIZATION.as_str(),
       AsciiMetadataValue::try_from(format!(
         "Basic {}",
         base64::encode(format!("{}:{}", "root", ""))
       ))
       .expect("metadata construct fail"),
     );
   
     let resp = client.handshake(req).await.expect("handshake");
   
     println!("handshake resp: {:?}", resp.metadata());
   
     let cmd = CommandStatementQuery {
       query: "select 1;".to_string(),
     };
     let pack = prost_types::Any::pack(&cmd).expect("pack");
     let fd = FlightDescriptor::new_cmd(pack.encode_to_vec());
   
     let mut req = Request::new(fd);
     req.metadata_mut().insert(
       AUTHORIZATION.as_str(),
       resp.metadata().get(AUTHORIZATION.as_str()).unwrap().clone(),
     );
     let resp = client.get_flight_info(req).await.expect("get_flight_info");
   
     let flight_info = resp.into_inner();
     let schema_ref =
     Arc::new(Schema::try_from(IpcMessage(flight_info.schema)).expect("Schema::try_from"));
     println!("{}", schema_ref);
   
     for ep in flight_info.endpoint {
       if let Some(ticket) = ep.ticket {
         let resp = client.do_get(ticket).await.expect("do_get");
         let mut stream = resp.into_inner();
         let mut dictionaries_by_id = HashMap::new();
   
         let mut record_batches = Vec::new();
         while let Some(Ok(flight_data)) = stream.next().await {
           let message =
           root_as_message(&flight_data.data_header[..]).expect("root as message");
           match message.header_type() {
             ipc::MessageHeader::Schema => {
               println!("a schema when messages are read",);
             }
   
             ipc::MessageHeader::RecordBatch => {
               let record_batch = flight_data_to_arrow_batch(
                 &flight_data,
                 schema_ref.clone(),
                 &dictionaries_by_id,
               )
               .expect("record_batch_from_message");
               record_batches.push(record_batch);
             }
             ipc::MessageHeader::DictionaryBatch => {
               let ipc_batch = message.header_as_dictionary_batch().unwrap();
   
               reader::read_dictionary(
                 &Buffer::from(flight_data.data_body),
                 ipc_batch,
                 &schema_ref,
                 &mut dictionaries_by_id,
                 &message.version(),
               )
               .unwrap();
             }
             _ => {
               panic!("Reading types other than record batches not yet supported");
             }
           }
         }
   
         println!(
           "{}",
           arrow::util::pretty::pretty_format_batches(&record_batches).expect("print")
         );
       }
     }
   }
   ```