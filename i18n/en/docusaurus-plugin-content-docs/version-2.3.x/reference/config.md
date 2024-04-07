---
title: Configuration
order: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

CnosDB Meta Configuration

The configuration adopts TOML syntax.

> TOML Syntax Reference：[https://toml.io](https://toml.io/cn/v1.0.0)

You can use `cnosdb config` command to create a default config file (v2.2.0), for example:

```shell
cnosdb config > /tmp/config.toml
```

You can use `cnosdb check server-config <path>` command to check a config file (v2.2.0), for example:

```shell
cnosdb check server-config /tmp/config.toml
```

`[deployment]` CnosDB startup configuration (v2.2.0)

```
`[heartbeat]` check CnosDB node status configurations periodically
```

## The detailed configuration file description is as follows:

### `[trace]` Full link tracing configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameter                               | 默认                             | Introduction                                                                                                                |
| --------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled | `false`                        | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |
| `host` Node host.       | Database instance running time | 用来和其他节点通信。                                                                                                                  |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| **TOML Value**                                 | 默认                                                                                                                   | Description                                                                                                                 |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| reporting_disabled = true | `false`                                                                                                              | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |
| `host`: host of Meta node      | **Description**：node host, used to communicate with other nodes, default: localhost. | 用来和其他节点通信。                                                                                                                  |
| `license_file`                                 | `/etc/cnosdb/license.json`                                                                                           | 用于指定 `License` 文件位置。                                                                                                        |

</TabItem>

</Tabs>

### \[deployment]

| Parameter | 默认           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode      | **TOML KEY** | Deployment mode, select from ['tskv ',' query ',' query_tskv ',' singleton '], defalut: `query_tskv`  `tskv` : Deploying only tskv engine requires specifying a meta address. `query` : Deploying only the query engine requires specifying a meta address. `query_tskv` : Both query and tskv engines are deployed, and a meta address needs to be specified. `singleton` : Deploying a standalone version without specifying a meta address. |
| cpu       | `10`         | 节点运行所使用的 cpu 核数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| memory    | `16`         | 节点运行所使用的最大内存，单位：（G)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### \[query]

| Parameter                                                        | 默认          | **TOML TABLE**                                                                                                           |
| ---------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| max_server_connections | `10240`     | 最大并发连接请求数。                                                                                                               |
| query_sql_limit        | `16777216`  | 每个 SQL 查询请求的最大字节数，单位：Bytes                                                                                               |
| write_sql_limit        | `167772160` | line_protocol request, the maximum number of bytes in the request body, default: 16 |
| auth_enabled                                | `false`     | Whether to start checking user permissions, default is false.                                            |
| `read_timeout_ms`                                                | `3000`      | `query` 访问 `tskv` 的超时时间，单位：`ms`                                                                                          |
| `write_timeout_ms`                                               | `3000`      | 向 `tskv` 写入数据时的超时时间，单位：`ms`.                                                                             |
| `[cache]` cache configuration                                    | `1`         | 准备流计算任务的 CPU 数量                                                                                                          |
| `[wal]` write pre-log configuration                              | `2`         | 执行流计算任务的 CPU 数量                                                                                                          |

### \[storage]

| `[security]` security configuration                                                          | 默认                                                                     | Description                                                                                              |
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
| Maximum compression size, default: 2G                                        | `128M`                                                                 | `COPY INTO`导出时触发落盘的内存大小 。                                                                                |

### \[wal]

| Parameter                                                                          | 默认                    | Description                                                                                                                          |
| ---------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| enabled                                                                            | `true`                | 是否启用 WAL。                                                                                                                            |
| path                                                                               | `/var/lib/cnosdb/wal` | WAL 存储目录。                                                                                                                            |
| wal_req_channel_cap | `64`                  | 累积的写 WAL 任务上限。                                                                                                                       |
| max_file_size                            | `1G`                  | The maximum size of a single WAL, default: 1G                                                                        |
| The number of files required to trigger the compaction, default: 4 | `2G`                  | 所有 WAL 的大小达到该数值时，触发 flush。                                                                                                           |
| sync                                                                               | `false`               | 是否为每次写入进行同步。                                                                                                                         |
| sync_interval                                                 | `0`                   | The time interval for synchronizing WAL, default: 0, i.e. not actively synchronizing |

### \[cache]

| Parameter                                                      | 默认         | Description      |
| -------------------------------------------------------------- | ---------- | ---------------- |
| max_buffer_size      | `128M`     | 最大的活跃缓存大小。       |
| max_immutable_number | `4`        | 最大的非活跃缓存数量。      |
| `partition`                                                    | 等于系统`CPU`数 | memcache 缓存的分区数量 |

### \[log]

| Parameter     | 默认                                             | Description                                                                            |
| ------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| level         | `info`                                         | Log Level (Debug, Info, Error, Warn), Default: Info |
| path          | `[log]`: run log configuration | Log storage location                                                                   |
| `tokio_trace` | `{ addr = "127.0.0.1:6669" }`                  | Tokio 跟踪，默认处于关闭状态。                                                                     |

### \[security]

| Parameter                       | 默认 | Description                 |
| ------------------------------- | -- | --------------------------- |
| tls_config | 无  | Optional, TLS configuration |

### \[security.tls_config]

| Parameter                        | 默认 | Description             |
| -------------------------------- | -- | ----------------------- |
| certificate                      | 无  | TLS service certificate |
| private_key | 无  | TLS service private key |

### \[cluster]

| `[query]` query interface configuration                                               | 默认                                | Description                               |
| ------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------------- |
| `name`                                                                                | `[cluster]` cluster configuration | name                                      |
| meta_service_port                           | `127.0.0.1:8901`                  | Remote Meta Service port                  |
| http_listen_port                            | `8902`                            | HTTP service listening port               |
| grpc_listen_port                            | `8903`                            | GRPC service listening port               |
| flight_rpc_listen_port | `8904`                            | Flight RPC service listening port         |
| tcp_listen_port                             | `8905`                            | TCP service listening port                |
| `port`: port of Meta node                                             | `8906`                            | 用于监听 [Vector](https://vector.dev/) 写入的数据。 |

### \[hintedoff]

| Parameter | 默认                   | **Note**：If close information collection                        |
| --------- | -------------------- | --------------------------------------------------------------- |
| `enable`  | `true`               | Is the HIntedOff service enabled, default: true |
| path      | `/var/lib/cnosdb/hh` | HintedOff 存储目录。                                                 |
| `threads` | `3`                  | 处理hinted handoff数据的并发数。                                         |

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### \[subscription]

| Parameter   | 默认     | Description                                                                                      |
| ----------- | ------ | ------------------------------------------------------------------------------------------------ |
| cache       | `1024` | cache size (bit) before sending and forwarding, default: 1028 |
| concurrency | `8`    | 处理转发请求的并发数。                                                                                      |
| timeout     | `1000` | 转发请求的超时时间，单位：秒。                                                                                  |

</TabItem>

</Tabs>

### \[heartbeat]

| Parameter                                                                                | 默认   | Description                           |
| ---------------------------------------------------------------------------------------- | ---- | ------------------------------------- |
| report_time_interval_secs | `30` | 此节点上报心跳、磁盘余量等信息到 `meta` 服务的时间间隔，单位：秒。 |

### \[node_basic]

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

| Parameter                                                                                     | 默认      | Description                                          |
| --------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------- |
| `[node_basic]` node configuration (v2.3.0) | `1001`  | Interval for checking the heartbeat status of a node |
| cold_data_server                                    | `false` | 是否停止在此节点上创建 Vnode。                                   |
| store_metrics                                                            | `true`  | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。                 |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameter                         | 默认        | Description                                      |
| --------------------------------- | --------- | ------------------------------------------------ |
| node_id      | `1001`    | Interval for checking whether a node is abnormal |
| Database version                  | `false`   | 是否停止在此节点上创建 Vnode。                               |
| `[storage]` storage configuration | `true`    | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。             |
| `location`                        | `default` | 定义实例部署位置。                                        |

</TabItem>

</Tabs>

### \[trace]

| Parameter                                                    | 默认      | Description                                                                                                                          |
| ------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| auto_generate_span | `false` | Whether to automatically generate a root span. This parameter is valid when the client does not carry a span context |

### \[trace.log] (optional)

| Parameter | 默认 | The detailed configuration file description is as follows: |
| --------- | -- | -------------------------------------------------------------------------- |
| path      | 无  | trace log file path                                                        |

### \[trace.jaeger] (optional)

| Configuration                                                    | 默认   | enable                                                                                                                                 |
| ---------------------------------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| jaeger_agent_endpoint  | 无    | the Jaeger agent endpoint。eg：http://localhost:14268/api/traces                                         |
| max_concurrent_exports | 2    | trace 上报器的并行度。默认值为 2                                                                                                                   |
| max_queue_size         | 4096 | span Maximum queue size of the buffer. If the queue is full, it drops the span, default value is 4096如果队列已满，它会丢弃 span。 |

## `meta` 文件描述

### `[hintedoff]` hintedOff configuration

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| Parameter **mode** can be selected from the following values: | 默认                              | Description                                                                     |
| ----------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| Node ID                                                                       | `1`                             | `id` : id of Meta node, the value must be unique in the cluster |
| host                                                                          | `127.0.0.1`                     | 用于和其他节点通信的 `host`                                                               |
| port                                                                          | `8901`                          | 用于和其他节点通信的 `port`                                                               |
| trace parallelism of the reporter, default value is 2                         | `/var/lib/cnosdb/meta/snapshot` |                                                                                 |
| Remote log path                                                               | `/var/lib/cnosdb/meta/journal`  |                                                                                 |
| snapshot_per_events                 | `500`                           |                                                                                 |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| Parameter                                                                                         | 默认                              | Description                                                                                       |
| ------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------- |
| `id`                                                                                              | `1`                             | `[meta_init]`: example  initialize related configuration information of Meta node |
| **TOML Key**                                                                                      | `127.0.0.1`                     | 用于和其他节点通信的 `host`                                                                                 |
| `port`                                                                                            | `8901`                          | 用于和其他节点通信的 `port`                                                                                 |
| `license_file`                                                                                    | `/etc/cnosdb/license.json`      | 用于指定 `License` 文件位置。                                                                              |
| `snapshot_path`: snapshot storage path of Meta node                               | `/var/lib/cnosdb/meta/snapshot` |                                                                                                   |
| `journal_path`: journal storage path of Meta node                                 | `/var/lib/cnosdb/meta/journal`  |                                                                                                   |
| `snapshot_per_events`: The Meta node does a snapshot interval                     | `500`                           |                                                                                                   |
| `[heartbeat]` heartbeat configuration (v2.3.0) | `0`                             |                                                                                                   |

</TabItem>

</Tabs>

### \[log]

| Parameter | 默认                             | Description                                   |
| --------- | ------------------------------ | --------------------------------------------- |
| level     | `info`                         | Log leverl（debug、info、error、warn），defult：info |
| path      | `[log]` runs log configuration | log storage path，default：`data/log`           |

### \[meta_init]

| Parameter                             | 默认                          | Description                           |
| ------------------------------------- | --------------------------- | ------------------------------------- |
| cluster_name     | ClusterName                 | Cluster Name                          |
| admin_user       | `root`                      | User name of the system administrator |
| system_tenant    | `cnosdb`                    | Name of the default tenant            |
| default_database | `["public","usage_schema"]` | Default database created              |

### \[heartbeat]

| Parameter                                                            | 默认  | Description               |
| -------------------------------------------------------------------- | --- | ------------------------- |
| heartbeat_recheck_interval | 300 | 多久检查一次CnosDB节点的状态，单位：秒。   |
| heartbeat_expired_interval | 300 | CnosDB节点多久未上报心跳认定异常，单位：秒。 |
