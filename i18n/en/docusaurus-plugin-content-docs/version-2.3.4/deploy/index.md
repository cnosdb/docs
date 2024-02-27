---
sidebar_position: 3
---

# Deployment

You can download CnosDB programs at [此处](https://cn.cnosdb.com/download/).

## CnosDB Installation Requirements

CnosDB installation may require `root` administrator permission to complete successfully

### CnosDB Network Port

When installing clusters, make sure the port is interoperable between services. By default, CnosDB uses the following network port：

The `cnosdb` TCP port `8902` can be used for client - server communication using the CnosDB API.

The `cnosdb-meta` TCP port `8901` is used for communication between the `cnosdb-meta` service and the `cnosdb` service.

当 `deployment.mode` 为 `singleton` 时，`cnosdb` 服务中会嵌入一个 `cnosdb-meta`，所以在这种情况下， `8901`、`8902` 端口会同时存在于 `cnosdb` 服务中，配置文件中对应的配置为：`meta_service_addr = ["127.0.0.1:8901"]`

### Note that can easily be ignored

- [确保机器时间同步](#ensure machine time synchronization)
- [Disable `swap`](#Disabled-swap)
- [本章节中部署的架构示例](#examples of structures deployed in this chapter)

Now you can install the program in your familiar environment.

```mdx-code-block
Import DocdList from '@theme/DocCardList';

<DocCardList />
```

#### Make Machine Time Sync

Hosts in the CSDB cluster need to ensure consistency of time. Please use the Network Time Protocol (NTP) to synchronize the time between hosts.

#### Disable `swap`

To avoid potential disk competition for CnosDB loads, disable `swap` in OS settings.

#### Examples of structures deployed in this section

For purposes of greater clarity, the cluster that is deployed in this section uses 3 + 2 method, that is, `3 meta + 2 query_tskv`

In CnosDB, cnosdb has multiple start-up modes

- The `singleton` meta, storage, query service is all in the same instance. Cluster mode is not supported.
- The `query_tskv`：instance provides query_query_tskv\` service and supports cluster mode.
- The `query`：instance only provides query services, supports cluster mode.
- The `tskv`：instance only provides storage services, supports cluster mode.

CnosDB is a hybrid deployment. You can customize the number of queries and storage services.
But a full cluster is at least 1 meta service, 1 query service and 1 storage service.

So in your CnosDB cluster, your mix is at least the following：

- 1 meta service
- 1 query_tskv service

or

- 1 meta service
- 1 query service
- 1 tskv service

Usually in a cluster service, we deploy multiple meta services to ensure high cluster availability.

The cluster in this article is based on a 3+2 cluster distribution cluster, i.e. 3 meta service and 2 query_tskv service.
