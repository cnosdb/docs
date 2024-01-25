---
title: 配置
order: 6

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import APITable from '@site/src/components/APITable';

本章节介绍配置 CnosDB 配置的方法。

CnosDB 的配置文件为 TOML 格式。

> TOML 语法参考：[https://toml.io](https://toml.io/cn/v1.0.0)

使用 `cnosdb config` 命令来创建默认的配置文件，如：

```shell
cnosdb run config > ./config.toml
```

使用 `cnosdb check server-config <path>` 命令来检查配置文件是否合法，如：

```shell
cnosdb check server-config ./config.toml
```

使用 `cnosdb` 命令指定配置文件启动：

```
cnosdb --config ./cnosdb.conf
```

## 文件描述

本节介绍每个配置的配置方式以及用途。

### 全局配置

| 参数                 | 默认        | 描述                                                         |
| -------------------- | ----------- | ------------------------------------------------------------ |
| `reporting_disabled` | `false`     | 是否关闭 CnosDB 自动上报遥测数据，主要跟踪 CnosDB 不同版本的使用率，这些数据有利于 CnosDB 的持续开发。每24小时上报一次数据，每条包含的字段为：实例运行时间、操作系统类型、数据库版本、实例运行的地理位置（只到省级或洲级）。 |
| `host`               | `localhost` | 用来和其他节点通信。                                         |

### `[deployment]`

| 参数     | 默认         | 说明                                                         |
| -------- | ------------ | ------------------------------------------------------------ |
| `mode`   | `query_tskv` | 部署模式，可选项为： `tskv`, `query`, `query_tskv`, `singleton`。  `tskv`: 只部署 `tskv` 引擎，需要指定 Meta 服务地址。 `query`: 只部署 `query` 引擎，需要指定 `meta` 服务地址。 `query_tskv`: `query` 和 `tskv` 引擎都部署，需要指定 `meta` 服务地址。 `singleton`: 部署单机版，无需指定 `meta` 服务地址。 |
| `cpu`    | `10`         | 节点运行所使用的 cpu 核数                                    |
| `memory` | `16`         | 节点运行所使用的最大内存，单位：（G)                         |

### `[query]`

| 参数                     | 默认        | 描述                                                 |
| ------------------------ | ----------- | ---------------------------------------------------- |
| `max_server_connections` | `10240`     | 最大并发连接请求数。                                 |
| `query_sql_limit`        | `16777216`  | 每个 SQL 查询请求的最大字节数，单位：Bytes           |
| `write_sql_limit`        | `167772160` | 每个 Line Protocol 写入请求的最大字节数，单位：Bytes |
| `auth_enabled`           | `false`     | 是否检查用户的权限。                                 |
| `read_timeout_ms`        | `3000`      | `query` 访问 `tskv` 的超时时间，单位：`ms`             |
| `write_timeout_ms`       | `3000`      | 向 `tskv` 写入数据时的超时时间，单位：`ms`.           |
| `stream_trigger_cpu`     | `1`         | 准备流计算任务的 CPU 数量                             |
| `stream_executor_cpu`    | `2`         | 执行流计算任务的 CPU 数量                              |

### `[storage]`

| 参数                            | 默认                      | 描述                                                |
| ------------------------------- | ------------------------- | --------------------------------------------------- |
| `path`                          | `/etc/cnosdb/cnosdb.conf` | 数据存储目录。                                      |
| `max_summary_size`              | `128M`                    | 单个 Summary 日志的最大大小。                       |
| `base_file_size`                | `16M`                     | 单个文件数据大小。                                  |
| `flush_req_channel_cap`         | `16`                      | 累积的 flush 任务上限。                             |
| `max_cached_readers`            | `32`                      | 每个 vnode 中打开的文件句柄（用于查询）的最大计数。 |
| `max_level`                     | `4`                       | LSM 的最大层数，取值范围 0-4。                      |
| `compact_trigger_file_num`      | `4`                       | 触发 compaction 所需的文件数量。                    |
| `compact_trigger_cold_duration` | `1h`                      | 时间段内未操作，则触发 compaction。                 |
| `max_compact_size`              | `2G`                      | compaction 最多选择的文件大小。                     |
| `max_concurrent_compaction`     | `4`                       | 最多同时进行的 compaction 任务数量。                |
| `strict_write`                  | `false`                   | 是否开启严格写入。                                  |

### `[wal]`

| 参数                            | 默认       | 描述                                      |
| ------------------------------- | ---------- | ----------------------------------------- |
| `enabled`                       | `true`     | 是否启用 WAL。                            |
| `path`                          | `data/log` | WAL 存储目录。                            |
| `wal_req_channel_cap`           | `64`       | 累积的写 WAL 任务上限。                   |
| `max_file_size`                 | `1G`       | 单个 WAL 的最大大小。                     |
| `flush_trigger_total_file_size` | `2G`       | 所有 WAL 的大小达到该数值时，触发 flush。 |
| `sync`                          | `false`    | 是否为每次写入进行同步。                  |
| `sync_interval`                 | `0`        | 同步 WAL 的时间间隔，即不主动同步，单位：h、m、s、ms、us、ns |

### `[cache]`

| 参数                   | 默认   | 描述                   |
| ---------------------- | ------ | ---------------------- |
| `max_buffer_size`      | `128M` | 最大的活跃缓存大小。   |
| `max_immutable_number` | `4`    | 最大的非活跃缓存数量。 |
| `partition`            | 等同CPU数量    | memcache 缓存的分区数量，默认值等于 CPU 数量  |

### `[log]`

| 参数          | 默认                          | 描述                                   |
| ------------- | ----------------------------- | -------------------------------------- |
| `level`       | `info`                        | 日志等级（debug、info、error、warn）。 |
| `path`        | `/var/log/cnosdb`             | 日志存储目录。                         |
| `tokio_trace` | `{ addr = "127.0.0.1:6669" }` | Tokio 跟踪，默认处于关闭状态。         |

### `[security]`

| 参数         | 默认 | 描述     |
| ------------ | ---- | -------- |
| `tls_config` | 无   | TLS 配置 |

### `[security.tls_config]`（可选）

| 参数          | 默认 | 描述           |
| ------------- | ---- | -------------- |
| `certificate` | 无   | TLS 服务的证书 |
| `private_key` | 无   | TLS 服务的私钥 |

### `[cluster]`

| 参数                     | 默认             | 描述                      |
| ------------------------ | ---------------- | ------------------------- |
| `name`                   | `cluster_xxx`    | 节点名称。                |
| `meta_service_addr`      | `127.0.0.1:8901` | 远程 `meta` 服务地址。    |
| `http_listen_port`       | `8902`           | HTTP 服务监听端口。       |
| `grpc_listen_port`       | `8903`           | GRPC 服务监听端口。       |
| `flight_rpc_listen_port` | `8904`           | Flight RPC 服务监听端口。 |
| `tcp_listen_port`        | `8905`           | TCP 服务监听端口。        |

### `[hintedoff]`

| 参数      | 默认         | 描述                             |
| --------- | ------------ | -------------------------------- |
| `enable`  | `true`       | 是否开启 HIntedOff 服务。        |
| `path`    | `/tmp/cnosdb/hh` | HintedOff 存储目录。             |
| `threads` | `3`          | 处理hinted handoff数据的并发数。 |

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

### `[subscription]`

| 参数          | 默认   | 描述                                  |
| ------------- | ------ | ------------------------------------- |
| `cache`       | `1024` | 发送转发前写入cache的大小，单位：bits |
| `concurrency` | `8`    | 处理转发请求的并发数。                |
| `timeout`     | `300`  | 转发请求的超时时间，单位：`s`。       |

</TabItem>

</Tabs>

### `[heartbeat]`

| 参数                       | 默认 | 描述                                                         |
| -------------------------- | ---- | ------------------------------------------------------------ |
| `report_time_interval_sec` | `30` | 此节点上报心跳、磁盘余量等信息到 `meta` 服务的时间间隔，单位：秒。 |

### `[node_basic]`

| 参数               | 默认    | 描述                                                     |
| ------------------ | ------- | -------------------------------------------------------- |
| `node_id`          | `1001`  | 节点 ID。                                                |
| `cold_data_server` | `false` | 是否停止在此节点上创建 Vnode。                           |
| `store_metrics`    | `true`  | 是否统计此节点的使用情况并存储到 `usage_schema` 数据库。 |

### `[trace]`

| 参数                 | 默认    | 描述                                                    |
| -------------------- | ------- | ------------------------------------------------------- |
| `auto_generate_span` | `false` | 是否自动生成root span，当客户端未携带span context时有效 |

### `[trace.log]` (可选)

| 参数   | 默认 | 描述               |
| ------ | ---- | ------------------ |
| `path` | 无   | trace 日志文件路径 |

### `[trace.jaeger]` (可选)

| 参数                     | 默认 | 描述                                                         |
| ------------------------ | ---- | ------------------------------------------------------------ |
| `jaeger_agent_endpoint`  | 无   | the Jaeger agent endpoint。例如：http://localhost:14268/api/traces |
| `max_concurrent_exports` | 2    | trace 上报器的并行度。默认值为 2                             |
| `max_queue_size`         | 4096 | span 缓冲区最大队列大小。如果队列已满，它会丢弃 span。       |

## `meta` 文件描述

### 全局配置

<Tabs groupId="editions">

<TabItem value="Community" label="社区版">

| 参数                  | 默认                            | 描述                             |
| --------------------- | ------------------------------- | -------------------------------- |
| `id`                  | `1`                             | `meta`节点的`id`，要求集群内唯一 |
| `host`                | `127.0.0.1`                     | 用于和其他节点通信的 `host`      |
| `port`                | `8901`                          | 用于和其他节点通信的 `port`      |
| `snapshot_path`       | `/var/lib/cnosdb/meta/snapshot` |                                  |
| `journal_path`        | `/var/lib/cnosdb/meta/journal`  |                                  |
| `snapshot_per_events` | `500`                           |                                  |

</TabItem>

<TabItem value="Enterprise" label="企业版">

| 参数                           | 默认                            | 描述                             |
| ------------------------------ | ------------------------------- | -------------------------------- |
| `id`                           | `1`                             | `meta`节点的`id`，要求集群内唯一 |
| `host`                         | `127.0.0.1`                     | 用于和其他节点通信的 `host`      |
| `port`                         | `8901`                          | 用于和其他节点通信的 `port`      |
| `snapshot_path`                | `/var/lib/cnosdb/meta/snapshot` |                                  |
| `journal_path`                 | `/var/lib/cnosdb/meta/journal`  |                                  |
| `snapshot_per_events`          | `500`                           |                                  |
| `auto_migrate_vnodes_duration` | `0`                             |                                  |

</TabItem>

</Tabs>

### `[log]`

| 参数    | 默认              | 描述                                   |
| ------- | ----------------- | -------------------------------------- |
| `level` | `info`            | 日志等级（debug、info、error、warn）。 |
| `path`  | `/var/log/cnosdb` | 日志存储目录。                         |

### `[meta_init]`

| 参数               | 默认                        | 描述             |
| ------------------ | --------------------------- | ---------------- |
| `cluster_name`     | `cluster_xxx`               | 集群名字         |
| `admin_user`       | `root`                      | 系统管理员用户名 |
| `system_tenant`    | `cnosdb`                    | 系统默认租户名字 |
| `default_database` | `["public","usage_schema"]` | 默认创建的数据库 |

### `[heartbeat]`

| 参数                         | 默认 | 描述                                         |
| ---------------------------- | ---- | -------------------------------------------- |
| `heartbeat_recheck_interval` | 300  | 多久检查一次CnosDB节点的状态，单位：秒。     |
| `heartbeat_expired_interval` | 300  | CnosDB节点多久未上报心跳认定异常，单位：秒。 |
