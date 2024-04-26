---
sidebar_position: 3
---

# Deploy

You can download CnosDB programs at [here](https://www.cnosdb.com/download/).

## CnosDB Installation Requirements

CnosDB installation may require `root` administrator permission to complete successfully

### CnosDB Network Port

When installing clusters, make sure the port is interoperable between services. By default, CnosDB uses the following network port:

The `cnosdb` TCP port `8902` can be used for client - server communication using the CnosDB API.

The `cnosdb-meta` TCP port `8901` is used for communication between the `cnosdb-meta` service and the `cnosdb` service.

When `deployment.mode` is `singleton`, a `cnosdb` service is embedded in the `cnosdb` service with a `cnosdb-meta`, so in this case, ports `8901` and `8902` exist in the `cnosdb` service at the same time, and the corresponding configurations in the configuration file are as follows: `meta_service_ addr = ["127.0.0.1:8901"]`

### Note that can easily be ignored

- [Ensure machine time synchronization](#ensure-machine-time-synchronization)
- [Disable `swap`](#Disabled-swap)
- [Example of the architecture deployed in this chapter](#example-of-the-architecture-deployed-in-this-chapter)

Now you can install the program in your familiar environment.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

#### Make Machine Time Sync

Hosts in the CnosDB cluster need to ensure consistency of time. Please use the Network Time Protocol (NTP) to synchronize the time between hosts.

#### Disable `swap`

To avoid potential disk competition for CnosDB loads, Disable `swap` in OS settings.

#### Examples of structures deployed in this section

For purposes of greater clarity, the cluster that is deployed in this section uses 3 + 2 method, that is, `3 meta + 2 query_tskv`

In CnosDB, cnosdb has multiple start-up modes

- The `singleton` meta, storage, query service is all in the same instance. Cluster mode is not supported.
- `query_tskv`: The `query_tskv` instance provides query and storage services, supports cluster mode.
- The `query`: instance only provides query services, supports cluster mode.
- The `tskv`: instance only provides storage services, supports cluster mode.

CnosDB is supported for hybrid deployments where you can customize the number of queries and storage services.
But a full cluster is at least 1 meta service, 1 query service and 1 tskv service.

So in your CnosDB cluster, your mix is at least the following:

- 1 meta service
- 1 query_tskv service

or

- 1 meta service
- 1 query service
- 1 tskv service

Usually in a cluster service, we deploy multiple meta services to ensure high cluster availability.

The cluster in this article is based on a 3+2 cluster distribution cluster, i.e. 3 meta service and 2 query_tskv service.
