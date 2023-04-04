---
title: 配置
order: 6
---

# 配置

## 介绍

配置采用TOML语法

- deployment CnosDB启动配置(v2.2.0)
- query 查询接口配置
- storage 存储配置
- wal 写前日志配置
- cache 缓存配置
- log 运行日志配置
- security 安全配置
- cluster 集群配置
- hintedoff HintedOff配置

## [deployment] (v2.2.0)

| 参数           | 说明                                                    |
|--------------|-------------------------------------------------------|
| mode         | 部署模式，从['tskv', 'query', 'query_tskv', 'singleton']中选择 |
| cpu          | 指定实例需要的cpu核数                                          |
| memory       | line_protocol 写入请求时，请求体最大字节数                          |

### [deployment.mode]
- tskv: 只部署tskv引擎，需要指定meta地址
- query: 只部署query引擎，需要指定meta地址
- query_tskv: query和tskv引擎都部署，需要指定meta地址
- singleton: 部署单机版，无需指定meta地址


## [query]

| 参数                     | 说明                           |
|------------------------|------------------------------|
| max_server_connections | 最大并发连接请求数                    |
| query_sql_limit        | 查询请求时的最大SQL所占字节              |
| write_sql_limit        | line_protocol 写入请求时，请求体最大字节数 |
| auth_enabled           | 是否检查用户的权限                    |

## [storage]

| 参数                            | 说明                                |
|-------------------------------|-----------------------------------|
| path                          | 数据存储目录                            |
| max_summary_size              | 最大Summary日志大小，用于恢复数据库中的数据，默认：128M |
| base_file_size                | 单个文件数据大小，默认：16M                   |
| flush_req_channel_cap         | 累积的持久化任务上限，默认：16                  |
| max_level                     | LSM的最大层数，取值范围0-4，默认：4             |
| compact_trigger_file_num      | 触发compaction所需的文件数量, 默认：4         |
| compact_trigger_cold_duration | 时间段内未操作，则触发compaction，默认：1h       |
| max_compact_size              | compaction最多选择的文件大小，默认：2G         |
| max_concurrent_compaction     | 最多同时进行的compaction任务数量，默认：4        |
| strict_write                  | 是否开启严格写入，默认：false                 |

## [wal]

| 参数                  | 说明                     |
|---------------------|------------------------|
| wal_req_channel_cap | 累积的写WAL任务上限，默认：64      |
| enabled             | 是否启用WAL，默认：false       |
| path                | WAL存储目录                |
| max_file_size       | 单个WAL的最大大小，默认：1G       |
| sync                | 是否为每次写入进行同步，默认：false   |
| sync_interval       | 同步WAL的时间间隔，默认：0，即不主动同步 |

## [cache]

| 参数                   | 说明                |
|----------------------|-------------------|
| max_buffer_size      | 最大的活跃缓存大小，默认：128M |
| max_immutable_number | 最大的非活跃缓存数量, 默认：4  |

## [log]

| 参数    | 说明                                  |
|-------|-------------------------------------|
| level | 日志等级（debug、info、error、warn），默认：info |
| path  | 日志存储目录                              |

## [security]
| 参数         | 说明       |
|------------|----------|
| tls_config | 可选，TLS配置 |

### [security.tls_config]
| 参数          | 说明       |
|-------------|----------|
| certificate | TLS服务的证书 |
| private_key | TLS服务的私钥 |

## [cluster]

| 参数                     | 说明               |
|------------------------|------------------|
| node_id                | 节点ID             |
| name                   | 节点名称             |
| meta_service_addr      | 远程Meta服务地址       |
| http_listen_addr       | HTTP服务监听地址       |
| grpc_listen_addr       | GRPC服务监听地址       |
| tcp_listen_addr        | TCP服务监听地址        |
| flight_rpc_listen_addr | Flight RPC服务监听地址 |

## [hintedoff]

| 参数     | 说明              |
|--------|-----------------|
| enable | 是否开启HIntedOff服务 |
| path   | HintedOff存储目录   |

## reporting_disabled

**说明**：是否关闭信息收集

CnosDB会收集一些信息，使社区更好地改进产品

我们不会收集用户的数据，只会收集

- 数据库实例运行时间
- 数据库实例运行的操作系统类型和架构
- 数据库版本
- 数据库实例运行的区域，只到省级，州级

你可以在配置文件顶部设置此项为true关闭信息收集
```
reporting_disabled = true
```