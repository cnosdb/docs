---
title: Jaeger
slug: /jaeger
---

## Enable Jaeger support in CnosDB

Cancel [trace]configuration comment on Jaeger tracking.

> Hint：to restart the service if you want configuration to take effect.

```toml
[trace]
  auto_generate_span = false
[trace.log]
  path = '/tmp/cnosdb'
[trace.jaeger]
  jaeger_agent_endpoint = 'http://127.0.0.1:14268/api/traces'
  max_concilirent_exports = 2
  max_queue_size = 4096
```

## Install and start Jaeger

> For other deployments, see [Jaeger deployment documents] (https\://www\.jaegertracing.io/docs/employment/).

```bash
docker run -d --name jaeger \
-p 6831:6831/udp \
-p 6832:6832/udp \
-p 16686:16686 \
-p 14268:14268 \
jaegertracing/all-in-one:latest
```

Upon successful launch, access to the browser [http\://127.0.0.1:16686] (http\:///127.0.0.1:16686).

![jaeger](/img/jaeger_setup.png)

## Tracking events in CnosDB

1. Add `san context` to the request.

> You can set `auto_generate_spa=true` in the configuration file and customize `uber-trace-id` values in the request if you need to analyze specific statements, as shown below (refer to：[Propagation Format](https://www.jaegertracing.io/docs/1.46/client-libraries/#propagation-formation).

```bash
uber-trace-id: 3a3a43:432e345:0:1
```

示例：

> Data sources in the sample refer to：https\://docs.cnosdb.com/en/latest/start/quick_start\\
> for data from the `air` table in the `oceanic_station` database, sorted in descending order and returned the first 5 data.

```bash
curl -i -u "root:" -H "Accept : application/json" -H "uber-trace-id: 3a3a43:432e345:0:1" -XPOST "http:///127.0.0.1:8902/api/v1/sql?db=oceanic_station&pretty=true" -d "select* from air order by time desc limit 5;"
```

## Use Dashboard for analysis

![jaeger\_dashboard](/img/jaeger_dashboard.png)

1. Log Span：

When the client application sends a query or writes a request to the CnosDB database, CnosDB will send the generated Span record to Jaege.Each span represents a stage of the request, including processing time, operating name and other relevant information.

2. Select Service：

Select the service associated with CnosDB in the service drop-down box for the Jaeger user interface (e.g.：cnosdb_singleton_1001).

3. Find Traces：

On the interface, click on the Find Traces button. The system will retrieve all traces (tracking) associated with the selected service.This will show a series of requests and corresponding spans.

4. Analyze Trace Details：

Tap on interested trace, enter the detailed view\.In this view, you will see the entire request process and the time every span executes.These time information will help you understand the time spent on each step of the query.

5. Optimize query and system：

With detailed time records, you can accurately analyze the performance of query statements.In the formal production environment, this will be a valuable tool for optimizing queries and improving system performance.By analysing the implementation time of each span, you can identify steps that may lead to delays, and thus take targeted optimization.

In addition to this, Jaeger can track other events in CnosDB, see：[ISSUE 1272](https://github.com/cnosdb/cnosdb/issues/1272)
