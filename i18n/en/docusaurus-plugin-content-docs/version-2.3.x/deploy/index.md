---
sidebar_position: 3
---

# Deploy

您可以在 [此处](https://cn.cnosdb.com/download/)下载 CnosDB 的程序。

## CnosDB 安装要求

CnosDB 的安装可能需要 `root` 管理员权限才能成功完成

### CnosDB 网络端口

在安装集群时，请确保服务间的端口互通，默认情况下，CnosDB 使用以下网络端口：

`cnosdb` TCP 端口 `8902` 可用于使用 CnosDB API 进行客户端 - 服务器通信。

`cnosdb-meta` TCP 端口 `8901` 用于 `cnosdb-meta` 服务间通信，以及 `cnosdb` 服务的交互通信。

当 `deployment.mode` 为 `singleton` 时，`cnosdb` 服务中会嵌入一个 `cnosdb-meta`，所以在这种情况下， `8901`、`8902` 端口会同时存在于 `cnosdb` 服务中，配置文件中对应的配置为：`meta_service_addr = ["127.0.0.1:8901"]`

### 容易被忽略的注意事项

- [确保机器时间同步](#确保机器时间同步)
- [禁用 `swap`](#禁用-swap)
- [本章节中部署的架构示例](#本章节中部署的架构示例)

现在，您可以在您熟悉的环境下安装程序。

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

#### 确保机器时间同步

CnosDB 集群所在的主机需要确保时间一致，请使用网络时间协议（NTP）来同步主机之间的时间。

#### 禁用 `swap`

为了避免 CnosDB 高负载时潜在的磁盘争用，请在操作系统设置中禁用 `swap`。

#### 本章节中部署的架构示例

为了说明能够更加清晰，此章节中所部署的集群使用 3 + 2 的方式，即 `3 meta + 2 query_tskv`

在 CnosDB 中，cnosdb 程序有多种启动模式

- `singleton` meta、存储、查询服务全部在同一个实例里，不支持集群模式。
- `query_tskv`：实例提供查询和存储服务，支持集群模式。
- `query`：实例只提供查询服务，支持集群模式。
- `tskv`：实例只提供存储服务，支持集群模式。

CnosDB 是支持混合部署的，您可以自定义查询和存储服务的数量。
但是一个完整的集群至少 1 个 meta服务、1 个查询服务和 1 个存储服务。

所以在您的 CnosDB 集群中，您的搭配至少是以下这个样子：

- 1 个 meta 服务
- 1 个 query_tskv 服务

或

- 1 个 meta 服务
- 1 个 query 服务
- 1 个 tskv 服务

通常在一个集群服务中，我们会部署多个 meta 服务，这样可以保证集群的高可用性。

此文章中的集群基于一个 3 + 2 的集群分布式集群，即 3 个 meta 服务 和 2 个 query_tskv 服务。
