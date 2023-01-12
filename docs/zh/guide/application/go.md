---
title: Go
order: 3
---

1. 添加依赖

   在go.mod中写入依赖

   ```go
   require (
     github.com/apache/arrow/go/v10 v10.0.1
     google.golang.org/grpc v1.51.0
   )
   ```

2. 创建Flight Sql客户端

   ```go
   var dialOpts = []grpc.DialOption{
     grpc.WithTransportCredentials(insecure.NewCredentials()),
   }
   cl, err := flightsql.NewClient("localhost:31004", nil, nil, dialOpts...)
   if err != nil {
     fmt.Print(err)
     return
   }
   ```

3. 设置连接凭证，并取得已经验证的上下文

   ```go
   ctx, err := cl.Client.AuthenticateBasicToken(context.Background(), "root", "")
   if err != nil {
     fmt.Print(err)
     return
   }
   ```

4. 在已经验证的上下文中执行SQL，取得FlightInfo

   ```go
   info, err := cl.Execute(ctx, "SELECT now();")
   if err != nil {
     fmt.Print(err)
     return
   }
   ```

5. 根据FlightInfo取得数据Reader

   ```go
   // 目前CnosDb仅实现了一个EndPoint
   rdr, err := cl.DoGet(ctx, info.GetEndpoint()[0].Ticket)
   if err != nil {
     fmt.Print(err)
     fmt.Println(35)
     return
   }
   defer rdr.Release()
   ```

6. 操作Reader打印数据

   ```go
   n := 0
   for rdr.Next() {
     record := rdr.Record()
     for i, col := range record.Columns() {
       fmt.Printf("rec[%d][%q]: %v\n", n, record.ColumnName(i), col)
     }
     column := record.Column(0)
     column.String()
     n++
   }
   ```