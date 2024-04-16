---
title: Configuration
order: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

CnosDB Meta Configuration

The configuration adopts TOML syntax.

> TOML Syntax Reference: [https://toml.io](https://toml.io/cn/v1.0.0)

You can use `cnosdb config` command to create a default config file (v2.2.0), for example:

```shell
cnosdb config > /tmp/config.toml
```

You can use `cnosdb check server-config <path>` command to check a config file (v2.2.0), for example:

```shell
cnosdb check server-config /tmp/config.toml
```

Whether to enable Wal, default: false

```
`[deployment]` CnosDB startup configuration (v2.2.0)
```

## The detailed configuration file description is as follows:

### Configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters                                                                                                                                                     | 默认                                        | Description                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled                                                                                                                        | `false`                                   | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为： 实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |
| `raft_logs_to_keep` When using raft protocol for replication; How many raft logs each replication group keeps and how often to take snapshots. | `5000`                                    | Raft 日志保留条数，且每隔这些次数写入做一次 snapshot。                                                                                           |
| `using_raft_replication`                                                                                                                                       | `false`                                   | 是否启用 Raft 复制算法                                                                                                               |
| `host` Node host.                                                                                                                              | `host`: host of Meta node | 用来和其他节点通信。                                                                                                                   |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters                                                                                                                                                     | 默认                                        | Description                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled                                                                                                                        | `false`                                   | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |
| `raft_logs_to_keep` When using raft protocol for replication; How many raft logs each replication group keeps and how often to take snapshots. | `5000`                                    |                                                                                                                             |
| `using_raft_replication`                                                                                                                                       | `false`                                   |                                                                                                                             |
| `host` Node host.                                                                                                                              | `host`: host of Meta node | 用来和其他节点通信。                                                                                                                  |
| `license_file`                                                                                                                                                 | `/etc/cnosdb/license.json`                | 用于指定 `License` 文件位置。                                                                                                        |

</TabItem>

</Tabs>

## \[deployment]

| Parameters | 默认                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode       | `[query]` query interface configuration | Deployment mode, select from [`tskv`,`query`, `query_tskv`, `singleton`], default: `query_tskv`  `tskv` : Deploying only tskv engine requires specifying a meta address. `query` : Deploying only the query engine requires specifying a meta address. `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified. `singleton` : Deploying a standalone version without specifying a meta address. |
| cpu        | `10`                                    | 节点运行所使用的 cpu 核数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| memory     | `16`                                    | 节点运行所使用的最大内存，单位：（G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

### \[query]

| Parameters                                                       | 默认          | Description                                                                                                              |
| ---------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| max_server_connections | `10240`     | 最大并发连接请求数。                                                                                                               |
| query_sql_limit        | `16777216`  | 每个 SQL 查询请求的最大字节数，单位：Bytes                                                                                               |
| write_sql_limit        | `167772160` | line_protocol request, the maximum number of bytes in the request body, default: 16 |
| auth_enabled                                | `false`     | Whether to start checking user permissions, default is false.                                            |
| `read_timeout_ms`                                                | `3000`      | `query` 访问 `tskv` 的超时时间，单位：`ms`                                                                                          |
| `write_timeout_ms`                                               | `3000`      | 向 `tskv` 写入数据时的超时时间，单位：`ms`.                                                                             |
| `[wal]` write pre-log configuration                              | `1`         | 准备流计算任务的 CPU 数量                                                                                                          |
| `[log]` runs log configuration                                   | `2`         | 执行流计算任务的 CPU 数量                                                                                                          |

### \[storage]

| Parameters                                                                                   | 默认                                                                     | Description                                                                                              |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| path                                                                                         | HintedOff storage directory, default: `/tmp/cnosdb/hh` | Data storage location                                                                                    |
| max_summary_size                                   | `128M`                                                                 | 单个 Summary 日志的最大大小。                                                                                      |
| base_file_size                                     | `16M`                                                                  | Single file data size, default: 16M                                                      |
| flush_req_channel_cap         | `16`                                                                   | 累积的 flush 任务上限。                                                                                          |
| Maximum cache size, default: 134217728                                       | `32`                                                                   | 每个 vnode 中打开的文件句柄（用于查询）的最大计数。                                                                            |
| max_level                                                               | `4`                                                                    | LSM&amp;apos;s maximum number of layers, value range 0-4, default: 4 |
| compact_trigger_file_num      | `4`                                                                    | 触发 compaction 所需的文件数量。                                                                                   |
| compact_trigger_cold_duration | `1h`                                                                   | 时间段内未操作，则触发 compaction。                                                                                  |
| max_compact_size                                   | `2G`                                                                   | compaction 最多选择的文件大小。                                                                                    |
| max_concurrent_compaction                          | `4`                                                                    | 最多同时进行的 compaction 任务数量。                                                                                 |
| strict_write                                                            | `false`                                                                | 是否开启严格写入。                                                                                                |

### \[wal]

| Parameters                                                                         | 默认                    | Description                                                                                                                          |
| ---------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| enabled                                                                            | `true`                | 是否启用 WAL。                                                                                                                            |
| path                                                                               | `/var/lib/cnosdb/wal` | WAL 存储目录。                                                                                                                            |
| wal_req_channel_cap | `64`                  | 累积的写 WAL 任务上限。                                                                                                                       |
| max_file_size                            | `1G`                  | The maximum size of a single WAL, default: 1G                                                                        |
| The number of files required to trigger the compaction, default: 4 | `2G`                  | 所有 WAL 的大小达到该数值时，触发 flush。                                                                                                           |
| sync                                                                               | `false`               | 是否为每次写入进行同步。                                                                                                                         |
| sync_interval                                                 | `0`                   | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

### \[cache]

| Parameters                                                     | 默认                                                                                     | Description                   |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------- |
| max_buffer_size      | `128M`                                                                                 | 最大的活跃缓存大小。                    |
| max_immutable_number | `4`                                                                                    | 最大的非活跃缓存数量。                   |
| `partition`                                                    | Specify the number of CPU cores required for the instance, default: 10 | memcache 缓存的分区数量，默认值等于 CPU 数量 |

### \[log]

| Parameters    | 默认                                                  | Description                                                    |
| ------------- | --------------------------------------------------- | -------------------------------------------------------------- |
| level         | `info`                                              | Log level（debug、info、error、warn, default: info |
| path          | log storage path,default:`data/log` | Remote log path                                                |
| `tokio_trace` | `{ addr = "127.0.0.1:6669" }`                       | Tokio 跟踪，默认处于关闭状态。                                             |

### \[security]

| Parameters                      | 默认 | Description                 |
| ------------------------------- | -- | --------------------------- |
| tls_config | 无  | Optional, TLS configuration |

### \[security.tls_config]

| Parameters                       | 默认 | Description             |
| -------------------------------- | -- | ----------------------- |
| certificate                      | 无  | TLS service certificate |
| private_key | 无  | TLS service private key |

### \[cluster]

| Parameters                                                                                        | 默认               | Description                              |
| ------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------- |
| `name`                                                                                            | ClusterName      | name                                     |
| `[meta_init]`: example initializes related configuration information of Meta node | `127.0.0.1:8901` | Remote Meta Service port                 |
| http_listen_port                                        | `8902`           | HTTP service listening port              |
| grpc_listen_port                                        | `8903`           | GRPC service listening port              |
| flight_rpc_listen_port             | `8904`           | Flight RPC service listening port        |
| tcp_listen_port                                         | `8905`           | TCP service listening port               |
| meta_service_port                                       | `8906`           | 用于监听 [Vector](https://vector.dev/) 写入的数据 |

### \[hintedoff]

| Parameters | 默认                   | Description                                                     |
| ---------- | -------------------- | --------------------------------------------------------------- |
| `enable`   | `true`               | Is the HIntedOff service enabled, default: true |
| path       | `/var/lib/cnosdb/hh` | HintedOff 存储目录。                                                 |
| threads    | `3`                  | 处理hinted handoff数据的并发数。                                         |

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### \[subscription]

| Parameters  | 默认     | Description                                                                                      |
| ----------- | ------ | ------------------------------------------------------------------------------------------------ |
| cache       | `1024` | cache size (bit) before sending and forwarding, default: 1028 |
| concurrency | `8`    | 处理转发请求的并发数。                                                                                      |
| timeout     | `300`  | 转发请求的超时时间，单位：`s`。                                                                                |

</TabItem>

</Tabs>

### \[heartbeat]

| Parameters                                                                               | 默认   | Description                             |
| ---------------------------------------------------------------------------------------- | ---- | --------------------------------------- |
| report_time_interval_secs | `30` | 此节点上报心跳、磁盘余量等信息到 `meta` 服务的时间间隔，单位：`s`。 |

### \[node_basic]

| Parameters                                                 | 默认      | Description                                          |
| ---------------------------------------------------------- | ------- | ---------------------------------------------------- |
| node_id                               | `1001`  | Interval for checking the heartbeat status of a node |
| cold_data_server | `false` | 是否停止在此节点上创建 Vnode。                                   |
| store_metrics                         | `true`  | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。                 |

### \[trace]

| Parameters                                                   | 默认      | Description                                                                                                                          |
| ------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| auto_generate_span | `false` | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

### \[trace.log] (optional)

| Parameters | 默认                                                  | Description         |
| ---------- | --------------------------------------------------- | ------------------- |
| path       | log storage path,default:`data/log` | trace log file path |

### \[trace.jaeger] (optional)

| Parameters                                                       | 默认                                         | Description                                                                                                                                                                                         |
| ---------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jaeger_agent_endpoint  | `[trace]` fFull link tracing configuration | the Jaeger agent endpoint.eg: http://localhost:14268/api/traces例如：http://localhost:14268/api/traces |
| max_concurrent_exports | 2                                          | trace 上报器的并行度。默认值为 2                                                                                                                                                                                |
| max_queue_size         | 4096                                       | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096如果队列已满，它会丢弃 span。                                                              |

## `meta` 文件描述

### Configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameters                     | 默认                     | Description                                                                     |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------- |
| Node ID                        | `1`                    | `id` : id of Meta node, the value must be unique in the cluster |
| host                           | `127.0.0.1`            | 用于和其他节点通信的 `host`                                                               |
| port                           | `8901`                 | 用于和其他节点通信的 `port`                                                               |
| data_path | `/var/lib/cnosdb/meta` | `journal_path`: journal storage path of Meta node               |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameters                                                  | 默认                     | Description                                                                     |
| ----------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| Node ID                                                     | `1`                    | `id` : id of Meta node, the value must be unique in the cluster |
| host                                                        | `127.0.0.1`            | 用于和其他节点通信的 `host`                                                               |
| port                                                        | `8901`                 | 用于和其他节点通信的 `port`                                                               |
| data_path                              | `/var/lib/cnosdb/meta` | `journal_path`: journal storage path of Meta node               |
| meta_service_port | `0`                    |                                                                                 |

</TabItem>

</Tabs>

### \[log]

| Parameters | 默认                                                  | Description                                                    |
| ---------- | --------------------------------------------------- | -------------------------------------------------------------- |
| level      | `info`                                              | Log level（debug、info、error、warn, default: info |
| path       | log storage path,default:`data/log` | Remote log path                                                |

### \[meta_init]

| Parameters                            | 默认                          | Description                           |
| ------------------------------------- | --------------------------- | ------------------------------------- |
| cluster_name     | ClusterName                 | Cluster Name                          |
| admin_user       | `root`                      | User name of the system administrator |
| system_tenant    | `cnosdb`                    | Name of the default tenant            |
| default_database | `["public","usage_schema"]` | Default database created              |

### \[heartbeat]

| Parameters                                                           | 默认  | Description               |
| -------------------------------------------------------------------- | --- | ------------------------- |
| heartbeat_recheck_interval | 300 | 多久检查一次CnosDB节点的状态，单位：秒。   |
| heartbeat_expired_interval | 300 | CnosDB节点多久未上报心跳认定异常，单位：秒。 |
