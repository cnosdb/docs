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

> 如果用户未指定，则程序在 `/etc/cnosdb/cnosdb.conf`，`$HOME/cnosdb/cnosdb.conf`位置先寻找配置，没有找到则使用默认配置

```
`[deployment]` CnosDB startup configuration (v2.2.0)
```

You can set this as True to shut down information collection at the top of the configuration file.

## 环境变量

配置文件中的所有设置都可以使用环境变量进行设置或覆盖。如果在文件和环境变量中同时存在，则环境变量将优先，并且配置文件中的值将被忽略。

要通过环境变量使这些配置设置可供 CnosDB 使用，它们必须采用以下格式：

```shell
CNOSDB_REPORTING_DISABLED=false
```

## The detailed configuration file description is as follows:

本节介绍每个配置的配置方式以及用途。

### Configuration

```mdx-code-block
<APITable>
```

| Parameter                                                                                                                                                      | 默认                                        | 环境变量                                                      | Description                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled                                                                                                                        | `false`                                   | `CNOSDB_REPORTING_DISABLED`                               | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |
| `raft_logs_to_keep` When using raft protocol for replication; How many raft logs each replication group keeps and how often to take snapshots. | `5000`                                    | `CNOSDB_RAFT_LOGS_TO_KEEP`                                | Raft 日志保留条数，且每隔这些次数写入做一次 snapshot                                                                                           |
| `using_raft_replication`                                                                                                                                       | `false`                                   | `CNOSDB_USING_RAFT_REPLICATION`                           | 是否启用 Raft 复制算法                                                                                                              |
| `host` Node host.                                                                                                                              | `host`: host of Meta node | **Note**: If close information collection | 用来和其他节点通信。                                                                                                                  |
| `license_file`                                                                                                                                                 | `/etc/cnosdb/license.json`                | `CNOSDB_LICENSE_FILE`                                     | 企业版配置，用于指定 `License` 文件位置。                                                                                                  |

```mdx-code-block
</APITable>
```

### \[deployment]

```mdx-code-block
<APITable>
```

| Parameter | 默认                                      | 环境变量          | Introduction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | --------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode      | `[query]` query interface configuration | `CNOSDB_MODE` | Deployment mode, select from [`tskv`,`query`, `query_tskv`, `singleton`], default: `query_tskv`  `tskv` : Deploying only tskv engine requires specifying a meta address. `query` : Deploying only the query engine requires specifying a meta address. `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified. `singleton` : Deploying a standalone version without specifying a meta address. |
| cpu       | 等同节点核心数                                 | `CNOSDB_CPU`  | 节点运行所使用的 cpu 核数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| memory    | 等同节点CPU数                                | **TOML Key**  | 节点运行所使用的最大内存，单位：（G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

```mdx-code-block
</APITable>
```

### \[query]

```mdx-code-block
<APITable>
```

| Parameter                                                        | 默认          | 环境变量                                                                                           | Description                                                                                                              |
| ---------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| max_server_connections | `10240`     | Maximum concurrent connection request, default is 10240.                       | 最大并发连接请求数。                                                                                                               |
| query_sql_limit        | `16777216`  | The maximum SQL accounting when the request is requested, default is 16777216. | 每个 SQL 查询请求的最大字节数，单位：Bytes                                                                                               |
| write_sql_limit        | `167772160` | Cumulative upper limit of persistence tasks, default: 16                       | line_protocol request, the maximum number of bytes in the request body, default: 16 |
| auth_enabled                                | `false`     | reporting_disabled = true                                                 | Whether to start checking user permissions, default is false.                                            |
| `read_timeout_ms`                                                | `3000`      | `CNOSDB_READ_TIMEOUT_MS`                                                                       | `query` 访问 `tskv` 的超时时间，单位：`ms`                                                                                          |
| `write_timeout_ms`                                               | `3000`      | `CNOSDB_WRITE_TIMEOUT_MS`                                                                      | 向 `tskv` 写入数据时的超时时间，单位：`ms`                                                                                              |
| `[wal]` write pre-log configuration                              | `1`         | `CNOSDB_STREAM_TRIGGER_CPU`                                                                    | 准备流计算任务的 CPU 数量                                                                                                          |
| `[log]` runs log configuration                                   | `2`         | `CNOSDB_STREAM_EXECUTOR_CPU`                                                                   | 执行流计算任务的 CPU 数量                                                                                                          |

```mdx-code-block
</APITable>
```

### \[storage]

```mdx-code-block
<APITable>
```

| trace parallelism of the reporter, default value is 2                                                                                                                                               | 默认                                                                     | 环境变量                                                                                                                         | Description                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| path                                                                                                                                                                                                | HintedOff storage directory, default: `/tmp/cnosdb/hh` | This field indicates how often the node reports the time stamp, disk remaining amount and other information to the meta node | Data storage location                                                                                    |
| max_summary_size                                                                                                                                          | `128M`                                                                 | Maximum accumulated write WAL tasks, default: 64                                                             | 单个 Summary 日志的最大大小。                                                                                      |
| base_file_size                                                                                                                                            | `16M`                                                                  | The largest summary log size is used to restore data in the database, default: 128M                          | Single file data size, default: 16M                                                      |
| flush_req_channel_cap                                                                                                                | `16`                                                                   | `CNOSDB_FLUSH_REQ_CHANNEL_CAP`                                                                                               | 累积的 flush 任务上限。                                                                                          |
| max_level                                                                                                                                                                      | `4`                                                                    | Areas run by database instances, only at the provincial level, state level                                                   | LSM&amp;apos;s maximum number of layers, value range 0-4, default: 4 |
| compact_trigger_file_num                                                                                                             | `4`                                                                    | `CNOSDB_COMPACT_TRIGGER_FILE_NUM`                                                                                            | 触发 compaction 所需的文件数量。                                                                                   |
| compact_trigger_cold_duration                                                                                                        | `1h`                                                                   | `CNOSDB_COMPACT_TRIGGER_COLD_DURATION`                                                                                       | 时间段内未操作，则触发 compaction。                                                                                  |
| max_compact_size                                                                                                                                          | `2G`                                                                   | ImmemTable maximum, default: 4                                                                               | compaction 最多选择的文件大小。                                                                                    |
| max_concurrent_compaction                                                                                                                                 | `4`                                                                    | The maximum number of concurrent compaction tasks, default: 4                                                | 最多同时进行的 compaction 任务数量。                                                                                 |
| strict_write                                                                                                                                                                   | `false`                                                                | `CNOSDB_STRICT_WRITE`                                                                                                        | 是否开启严格写入。                                                                                                |
| `reserve_space`                                                                                                                                                                                     | `0`                                                                    | `CNOSDB_RESERVE_SPACE`                                                                                                       | 系统的保留空间大小。                                                                                               |
| `using_raft_replication` Raft protocol is used for replica replication. Note: it is not stable at present, so it is not recommended for online use. | `128M`                                                                 | `COPYINTO_TRIGGER_FLUSH_SIZE`                                                                                                | `COPY INTO`导出时触发落盘的内存大小 。支持版本：>2.3.4.3                   |

```mdx-code-block
</APITable>
```

### \[wal]

```mdx-code-block
<APITable>
```

| Parameter                                                                          | 默认                    | 环境变量                                                                                                                                     | Description                                                                                                                          |
| ---------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| enabled                                                                            | `true`                | **TOML TABLE**                                                                                                                           | 是否启用 WAL。                                                                                                                            |
| path                                                                               | `/var/lib/cnosdb/wal` | `[heartbeat]`:  check CnosDB node status configurations periodically                                                     | WAL 存储目录。                                                                                                                            |
| wal_req_channel_cap | `64`                  | Synchronous Write WAL Remote Log, Default False                                                                                          | 累积的写 WAL 任务上限。                                                                                                                       |
| max_file_size                            | `1G`                  | When writing a request on LINE_PROTOCOL, request  the maximum number of bytes, default is 16777216. | The maximum size of a single WAL, default: 1G                                                                        |
| The number of files required to trigger the compaction, default: 4 | `2G`                  | `CNOSDB_FLUSH_TRIGGER_TOTAL_FILE_SIZE`                                                                                                   | 所有 WAL 的大小达到该数值时，触发 flush。                                                                                                           |
| sync                                                                               | `false`               | `[security]` security configuration                                                                                                      | 是否为每次写入进行同步。                                                                                                                         |
| sync_interval                                                 | `0`                   | `CNOSDB_SYNC_INTERVAL`                                                                                                                   | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

```mdx-code-block
</APITable>
```

### \[cache]

```mdx-code-block
<APITable>
```

| Parameter                                                      | 默认                                                                                     | 环境变量                                                                        | Description                   |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------- |
| max_buffer_size      | `128M`                                                                                 | Maximum cache size, default: 134217728                      | 最大的活跃缓存大小。                    |
| max_immutable_number | `4`                                                                                    | Number of concurrent processing of handoff data, default: 3 | 最大的非活跃缓存数量。                   |
| `partition`                                                    | Specify the number of CPU cores required for the instance, default: 10 | `CNOSDB_PARTITION`                                                          | memcache 缓存的分区数量，默认值等于 CPU 数量 |

```mdx-code-block
</APITable>
```

### \[log]

```mdx-code-block
<APITable>
```

| Parameter | 默认                                             | 环境变量                                                                                              | Description                                                                            |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| level     | `info`                                         | `CNOSDB_LEVEL`                                                                                    | Log Level (Debug, Info, Error, Warn), Default: Info |
| path      | `[log]`: run log configuration | `[heartbeat]` heartbeat configuration (v2.3.0) | Remote log path                                                                        |

```mdx-code-block
</APITable>
```

### \[security]

```mdx-code-block
<APITable>
```

| Parameter                       | 默认 | 环境变量                | Description                 |
| ------------------------------- | -- | ------------------- | --------------------------- |
| tls_config | 无  | `CNOSDB_TLS_CONFIG` | Optional, TLS configuration |

```mdx-code-block
</APITable>
```

### \[security.tls_config]

```mdx-code-block
<APITable>
```

| Parameter                        | 默认 | 环境变量                 | Description             |
| -------------------------------- | -- | -------------------- | ----------------------- |
| certificate                      | 无  | `CNOSDB_CERTIFICATE` | TLS service certificate |
| private_key | 无  | **TOML KEY**         | TLS service private key |

```mdx-code-block
</APITable>
```

### \[cluster]

```mdx-code-block
<APITable>
```

| Parameter **mode** can be selected from the following values:                     | 默认               | 环境变量                                                                                                        | Description                              |
| ------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `name`                                                                                            | ClusterName      | Operating system type and architecture run by database instance.                            | name                                     |
| `[meta_init]`: example initializes related configuration information of Meta node | `127.0.0.1:8901` | `CNOSDB_META_SERVICE_ADDR`                                                                                  | Remote Meta Service port                 |
| http_listen_port                                        | `8902`           | The configuration file consists of several TOML key-value pairs and tables, as shown below: | HTTP service listening port              |
| grpc_listen_port                                        | `8903`           | `[storage]` storage configuration                                                                           | GRPC service listening port              |
| flight_rpc_listen_port             | `8904`           | `[hintedoff]` hintedOff configuration                                                                       | Flight RPC service listening port        |
| tcp_listen_port                                         | `8905`           | `port`: port of Meta node                                                                   | TCP service listening port               |
| meta_service_port                                       | `8906`           | `CNOSDB_VECTOR_LISTEN_PORT`                                                                                 | 用于监听 [Vector](https://vector.dev/) 写入的数据 |

```mdx-code-block
</APITable>
```

### \[hintedoff]

```mdx-code-block
<APITable>
```

| Parameter | 默认                   | 环境变量                                                                            | Description                                                     |
| --------- | -------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `enable`  | `true`               | **TOML Value**                                                                  | Is the HIntedOff service enabled, default: true |
| path      | `/var/lib/cnosdb/hh` | If this field is true, it means that the node is not used when allocating vnode | HintedOff 存储目录。                                                 |
| threads   | `3`                  | `snapshot_per_events`: The Meta node does a snapshot interval   | 处理hinted handoff数据的并发数。                                         |

```mdx-code-block
</APITable>
```

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### \[subscription]

```mdx-code-block
<APITable>
```

| Parameter   | 默认     | 环境变量                          | Description                                                                                      |
| ----------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------------------ |
| cache       | `1024` | `[cache]` cache configuration | cache size (bit) before sending and forwarding, default: 1028 |
| concurrency | `8`    | `CNOSDB_CONCURRENCY`          | 处理转发请求的并发数。                                                                                      |
| timeout     | `1000` | `CNOSDB_TIMEOUT`              | 转发请求的超时时间，单位：秒。                                                                                  |

```mdx-code-block
</APITable>
```

</TabItem>

</Tabs>

### \[heartbeat]

```mdx-code-block
<APITable>
```

| Parameter                                                                                | 默认   | 环境变量                           | Description                           |
| ---------------------------------------------------------------------------------------- | ---- | ------------------------------ | ------------------------------------- |
| report_time_interval_secs | `30` | Database instance running time | 此节点上报心跳、磁盘余量等信息到 `meta` 服务的时间间隔，单位：秒。 |

```mdx-code-block
</APITable>
```

### \[node_basic]

```mdx-code-block
<APITable>
```

| Parameter                                                  | 默认      | 环境变量                                             | Description                                          |
| ---------------------------------------------------------- | ------- | ------------------------------------------------ | ---------------------------------------------------- |
| node_id                               | `1001`  | Interval for checking whether a node is abnormal | Interval for checking the heartbeat status of a node |
| cold_data_server | `false` | `CNOSDB_COLD_DATA_SERVER`                        | 是否停止在此节点上创建 Vnode。                                   |
| store_metrics                         | `true`  | `CNOSDB_STORE_METRICS`                           | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。                 |

```mdx-code-block
</APITable>
```

### \[trace]

```mdx-code-block
<APITable>
```

| Parameter                                                    | 默认      | 环境变量                        | Description                                                                                                                          |
| ------------------------------------------------------------ | ------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| auto_generate_span | `false` | `CNOSDB_AUTO_GENERATE_SPAN` | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

```mdx-code-block
</APITable>
```

### \[trace.log] (optional)

```mdx-code-block
<APITable>
```

| Parameter | 默认 | 环境变量                                                                                          | Description         |
| --------- | -- | --------------------------------------------------------------------------------------------- | ------------------- |
| path      | 无  | `[node_basic]` node configuration (v2.3.0) | trace log file path |

```mdx-code-block
</APITable>
```

### \[trace.jaeger] (optional)

```mdx-code-block
<APITable>
```

| Parameter                                                        | 默认   | 环境变量                                                                             | Description                                                                                                                                                                                         |
| ---------------------------------------------------------------- | ---- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jaeger_agent_endpoint  | 无    | `CNOSDB_JAEGER_AGENT_ENDPOINT`                                                   | the Jaeger agent endpoint.eg: http://localhost:14268/api/traces例如：http://localhost:14268/api/traces |
| max_concurrent_exports | 2    | `reporting_disabled` Whether to turn off information collection. | trace 上报器的并行度。默认值为 2                                                                                                                                                                                |
| max_queue_size         | 4096 | Maximum compression size, default: 2G                            | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096如果队列已满，它会丢弃 span。                                                              |

```mdx-code-block
</APITable>
```

## `meta` 文件描述

### `[trace]` fFull link tracing configuration

```mdx-code-block
<APITable>
```

| Parameter                      | 默认                     | 环境变量                                                                                                                                  | Description                                                                     |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Node ID                        | `1`                    | If this field is true, it means storing metrics information to db                                                                     | `id` : id of Meta node, the value must be unique in the cluster |
| host                           | `127.0.0.1`            | **Description**: node host, used to communicate with other nodes, default: localhost. | 用于和其他节点通信的 `host`                                                               |
| port                           | `8901`                 | `CNOSDB_PORT`                                                                                                                         | 用于和其他节点通信的 `port`                                                               |
| data_path | `/var/lib/cnosdb/meta` | We do not collect user data, we only collect                                                                                          | `journal_path`: journal storage path of Meta node               |
| enable                         | `false`                | `CNOSDB_GRPC_ENABLE_GZIP`                                                                                                             | `meta`服务的接口数据传输，是否启用压缩                                                          |

```mdx-code-block
</APITable>
```

### \[log]

```mdx-code-block
<APITable>
```

| Parameter | 默认                                                  | 环境变量                                                                                                                                                                | Description                                                    |
| --------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| level     | `info`                                              | `CNOSDB_LEVEL`                                                                                                                                                      | Log level（debug、info、error、warn, default: info |
| path      | log storage path,default:`data/log` | The configuration file of the Meta node is in the same format as the Data node and consists of several TOML key-value pairs and tables, as follows: | Log storage location                                           |

```mdx-code-block
</APITable>
```

### \[meta_init]

```mdx-code-block
<APITable>
```

| Parameter                             | 默认                                | 环境变量                                                                | Description                           |
| ------------------------------------- | --------------------------------- | ------------------------------------------------------------------- | ------------------------------------- |
| cluster_name     | `[cluster]` cluster configuration | The CnosDB collects information to better improve the product       | Cluster Name                          |
| admin_user       | `root`                            | `snapshot_path`: snapshot storage path of Meta node | User name of the system administrator |
| system_tenant    | `cnosdb`                          | `CNOSDB_SYSTEM_TENANT`                                              | Name of the default tenant            |
| default_database | `["public","usage_schema"]`       | Database version                                                    | Default database created              |

```mdx-code-block
</APITable>
```

### \[heartbeat]

```mdx-code-block
<APITable>
```

| Parameter                                                            | 默认  |                                     | The detailed configuration file description is as follows: |
| -------------------------------------------------------------------- | --- | ----------------------------------- | -------------------------------------------------------------------------- |
| heartbeat_recheck_interval | 300 | `CNOSDB_HEARTBEAT_RECHECK_INTERVAL` | 多久检查一次CnosDB节点的状态，单位：秒。                                                    |
| heartbeat_expired_interval | 300 | `CNOSDB_HEARTBEAT_EXPIRED_INTERVAL` | CnosDB节点多久未上报心跳认定异常，单位：秒。                                                  |

```mdx-code-block
</APITable>
```
