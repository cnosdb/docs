---
title: Tenant Resource Limit
order: 3
---

# Tenant Resource Limitation

Currently, the resource isolation of CnosDB is tenant-level. There are two types of restrictions: one is to limit the objects created by tenants; One is to limit the size and number of times tenants can read and write data. Both types of restrictions can be set using the same SQL that can be used only by the most privileged users.

#### Syntax

```sql
alter tenant <tenant_name> set _limiter '<limiter_json>';
```

#### Parameters

- tenant_name: The name of the tenant to be set.
- limiter_json: The content of tenant resource limit, specifically classified as: object limit `object_config` and read and write limit `request_config`, content format must be json format.


#### object_config, object limit, the parameters included are as follows:

| Parameter name     | Description                                                                                                                          | Required | Metric |
|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------|:---------|:-------|
| max_users_number   | Specifies the maximum number of users (members) to be a tenant; when set to null, it is unbounded.                                   | Yes      | one    |
| max_databases      | Specifies the maximum number of databases for each tenant; when set to null, it is unlimited.                                        | Yes      | one    |
| max_shard_number   | Specifies the maximum number of shards that can be created in a tenant's database; when set to null, this is unlimited.              | Yes      | one    |
| max_replica_number | Specifies the maximum number of replicas that can be created for the database under the tenant; when set to null, this is unlimited. | Yes      | one    |
| max_retention_time | Specifies the maximum TTL parameter of the database under the tenant. When null, it is unlimited.                                    | Yes      | Day    |



#### Example:

```json
"object_config": {
  "max_users_number": 1,
  "max_databases": 3,
  "max_shard_number": 2,
  "max_replicate_number": 2,
  "max_retention_time": 30
},
```

#### request_config, read and write limit, the parameters included are as follows:

| Parameter name | Description                                                                                | Required | Metric |
|:---------------|:-------------------------------------------------------------------------------------------|:---------|:-------|
| data_in        | Limit the size of write requests over a period of time; when set to null, it is unbounded. | Yes      | Byte   |
| data_out       | Limit the size of read requests over a period of time; when set to null, it is unbounded.  | Yes      | Byte   |
| queries        | Limit the number of read requests in a time.Set to null indicates no limit.                | Yes      | Time   |
| writes         | Limit the number of write requests in a time.When set to null, it is unlimited.            | Yes      | Time   |

The `data_in` and `data_out` limits are implemented by the token bucket algorithm and consist of two parts: One is a remote token bucket on meta, specified by `remote_bucket`, and the other is a local token bucket on data, specified by `local_bucket`, where tokens are measured in bytes.

#### Parameters of remote_bucket are as follows:

| Parameter name | Description                                      | Metric |
|:---------------|:-------------------------------------------------|:-------|
| max            | Limit the maximum number of tokens in a bucket   | one    |
| initial        | Limit the number of tokens in the initial bucket | one    |
| refill         | Limit the number of tokens populated at a time   | one    |
| interval       | Time interval to fill the token                  | ms     |

#### Parameters of local_bucket are as follows:

| Parameter name | Description                                      | Metric |
|:---------------|:-------------------------------------------------|:-------|
| max            | Limit the maximum number of tokens in a bucket   | one    |
| initial        | Limit the number of tokens in the initial bucket | one    |

The following example bucket setup allows 10KB of data to be written every 100ms and 10KB of data to be cased every 100ms;

#### Example data writing settings

```json
"data_in": {
  "remote_bucket": {
    "max": 10000,
    "initial": 0,
    "refill": 10000,
    "interval": 100
  },
  "local_bucket": {
    "max": 10000,
    "initial": 0
  }
  },
  "data_out": {
  "remote_bucket": {
    "max": 10000,
    "initial": 0,
    "refill": 10000,
    "interval": 100
  },
  "local_bucket": {
    "max": 100,
    "initial": 0
  }
}
```

#### An example of limiting the size and number of reads and writes to a tenant is as follows:

```json
"request_config": {
  "data_in": {
    "remote_bucket": {
      "max": 10000,
      "initial": 0,
      "refill": 10000,
      "interval": 100
    },
    "local_bucket": {
      "max": 10000,
      "initial": 0
    }
  },
  "data_out": {
    "remote_bucket": {
      "max": 100,
      "initial": 0,
      "refill": 100,
      "interval": 100
     },
    "local_bucket": {
      "max": 100,
      "initial": 0
    }
  },
  "queries": null,
  "writes": null
}
```

#### Overall Example

```json
alter tenant cnosdb set _limiter = '{
  "object_config": {
    "max_users_number": 1,
    "max_databases": 3,
    "max_shard_number": 2,
    "max_replicate_number": 2,
    "max_retention_time": 30
  },
  "request_config": {
    "data_in": {
      "remote_bucket": {
        "max": 10000,
        "initial": 0,
        "refill": 10000,
        "interval": 100
      },
      "local_bucket": {
        "max": 10000,
        "initial": 0
     }
    },
     "data_out": {
       "remote_bucket": {
       "max": 100,
       "initial": 0,
        "refill": 100,
        "interval": 100
  },
  "local_bucket": {
    "max": 100,
    "initial": 0
  }
  },
  "queries": null,
  "writes": null
  }
}';
```