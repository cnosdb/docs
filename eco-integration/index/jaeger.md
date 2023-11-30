---
title: Jaeger
order: 1
---


## 在 CnosDB 中启用 Jaeger 支持

取消 [trace]配置注释开启 Jaeger 跟踪功能。
> 提示：如需使配置生效需要重启服务。

```toml
[trace]
  auto_generate_span = false
[trace.log]
  path = '/tmp/cnosdb'
[trace.jaeger]
  jaeger_agent_endpoint = 'http://127.0.0.1:14268/api/traces'
  max_concurrent_exports = 2
  max_queue_size = 4096
```

## 安装并启动 Jaeger
> 其他部署方式，请参考 [Jaeger 部署文档](https://www.jaegertracing.io/docs/deployment/)。

```bash
docker run -d --name jaeger \
-p 6831:6831/udp \
-p 6832:6832/udp \
-p 16686:16686 \
-p 14268:14268 \
jaegertracing/all-in-one:latest
```

成功启动后，使用浏览器访问 [http://127.0.0.1:16686](http://127.0.0.1:16686)。

![jaeger](/img/jaeger_setup.png)

## 跟踪 CnosDB 中的事件

1. 在请求中添加 `span context`。

> 可以设置配置文件中的 `auto_generate_span = true` 自动生成，如果需要分析特定的语句，请在请求中自定义 `uber-trace-id` 值，格式如下所示（详细格式说明请参考：[Propagation Format](https://www.jaegertracing.io/docs/1.46/client-libraries/#propagation-format)。

```bash
uber-trace-id: 3a3a43:432e345:0:1
```

示例：

> 示例中的数据来源请参考：https://docs.cnosdb.com/zh/latest/start/quick_start \
> 查询数据库 `oceanic_station` 中 `air` 表中的数据，并且按时间倒序排序，返回前 5 条数据 。

```bash
curl -i -u "root:" -H "Accept: application/json" -H "uber-trace-id: 3a3a43:432e345:0:1" -XPOST "http://127.0.0.1:8902/api/v1/sql?db=oceanic_station&pretty=true" -d "select * from air order by time desc limit 5;"
```

## 使用仪表盘进行分析

![jaeger_dashboard](/img/jaeger_dashboard.png)

1. 记录 Span：

当客户端应用程序发送查询或写入请求到 CnosDB 数据库时，CnosDB 会将产生的 Span 记录发送给Jaeger 。每个 span 表示了请求的一个阶段，包括了处理时间、操作名称和其他相关信息。

2. 选择 Service：

在 Jaeger 用户界面的 Service 下拉框中，选择与 CnosDB 相关的服务（例如：cnosdb_singleton_1001）。

3. 查找 Traces：

在界面上，点击 "Find Traces" 按钮，系统将检索与选择的服务相关的所有 traces（追踪）。这将显示一系列的请求和对应的 spans。

4. 分析 Trace 详情：

点击所感兴趣的 trace，进入详细视图。在这个视图中，你将看到整个请求的流程，以及每个 span 执行的时间。这些时间信息将帮助你了解查询的每个步骤在处理时所花费的时间。

5. 优化查询和系统：

利用详细的时间记录，你可以精确地分析查询语句的性能。在正式的生产环境中，这将成为优化查询语句和改进系统性能的宝贵工具。通过分析每个 span 的执行时间，你可以找到可能导致延迟的步骤，从而采取针对性的优化措施。

除此之外，Jaeger 还可以跟踪 CnosDB 的其他事件，请查看：[ISSUE 1272](https://github.com/cnosdb/cnosdb/issues/1272)