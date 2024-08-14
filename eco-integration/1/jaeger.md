---
title: Jaeger
slug: /jaeger
---

## Trace介绍

Trace，也被称为分布式链路追踪技术，是一种用于记录一个请求经过的所有系统的基本信息（如 IP、appkey、方法名）及系统间调用信息（如耗时、成功失败）的技术。在微服务架构盛行的当下，一次网络请求可能需要调用上百个微服务子系统。任何一个微服务子系统变慢，都会拖慢整个请求处理过程。有了 Trace 提供的这张有向图，我们就知道一个慢请求到底是在这张图的哪个节点上遭遇了失败或者慢响应。这对于我们分析性能问题个案有很大的帮助。

![trace_span_arch](/img/jaeger/trace_span_arch.png)

## CnosDB适配

CnosDB支持了opentelemetry-proto格式的写入和Jaeger的可视化查询，可以适配Grafana Jaeger插件

### opentelemetry-proto格式数据写入

opentelemetry提供了多种语言版本的export导出工具，可以使用这些工具很便捷的将trace数据写入到CnosDB中，以python版本的opentelemetry export工具举例：

```python
import base64
from time import sleep
from opentelemetry.sdk.resources import SERVICE_NAME, Resource

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Service name is required for most backends
resource = Resource(attributes={
    SERVICE_NAME: "test_service"
})
traceProvider = TracerProvider(resource=resource)

# 用户名和密码
username = "root"
password = ""

# 编码用户名和密码
credentials = f"{username}:{password}"
encoded_credentials = base64.b64encode(credentials.encode("utf-8")).decode("utf-8")

# 创建包含身份验证信息的头
headers = {
    "Authorization": f"Basic {encoded_credentials}",
    "tenant": "cnosdb",
    "db": "public",
    "table": "t1",
}

processor = BatchSpanProcessor(OTLPSpanExporter(
    endpoint="http://192.168.0.50:31902/api/v1/traces",
    headers=headers
))
traceProvider.add_span_processor(processor)

trace.set_tracer_provider(traceProvider)

for trace_index in range(10):
    tracer = trace.get_tracer(f"test_trace_{trace_index}")
    with tracer.start_as_current_span(f"trace_{trace_index}_parent_span") as parent_span:        
         with tracer.start_as_current_span("child_span_1") as child_span_1:
               with tracer.start_as_current_span("child_span_2") as child_span_2:
                    tracer.start_as_current_span("child_span_3")

# 关闭TracerProvider以确保所有span都已经被导出
trace.get_tracer_provider().shutdown()
```

导入成功后可以在CnosDB中查看到对应的数据表结构，表中的每一行都表示一个Span：

![trace_table_schema](/img/jaeger/trace_table_schema.png)

### Grafana可视化查询

1. 添加Jaeger插件作为数据源，在配置Jaeger插件时，修改为CnosDB地址，填写用户名密码，填写要查询的tenant、db、table

![jaeger_data_source](/img/jaeger/jaeger_data_source.png)

2. 添加好数据源后，创建dashboard，指定cnosdb为数据源，指定好Service Name就可以查询出该service下的trace。保存dashboard

![trace_dashboard](/img/jaeger/trace_dashboard.png)

3. 点击traceid链接就可以跳转到trace的span关系图

![span_relation_graph](/img/jaeger/span_relation_graph.png)

### 示例展示

部署了一个demo，通过上述步骤向CnosDB写入otlp trace数据，通过Grafana展示（用户名/密码：user1/user1）

[Grafana Jaeger plug-in](http://43.247.178.238:43000/d/8ktbGwrSG/trace-ecolog-integration-example?orgId=1&from=now-5y&to=now)