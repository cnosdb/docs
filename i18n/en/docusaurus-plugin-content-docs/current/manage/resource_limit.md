---
sidebar_position: 8
---

# 租户资源限制

当前 CnosDB 的资源隔离是租户级别的，共有两类限制：一类是限制租户创建的对象；一类是限制租户读写数据的大小和次数。两类限制均可通过同一种 SQL 来进行设定，并且该 SQL 只能由最高权限用户使用。

#### Syntax

```sql
alter tenant <tenant_name> set _limiter '<limiter_json>';
```

#### 参数说明

- tenant_name：租户名称。
- limiter_json：租户资源限制的内容，具体分类为：对象限制 `object_config` 和 读写限制 `request_config`，内容格式必须为 json 格式。

#### object_config ，对象限制，包含以下参数：

| 参数名                                                          | 描述                                      | 必选 | 单位 |
| :----------------------------------------------------------- | :-------------------------------------- | :- | :- |
| max_users_number   | 指定租户下的用户（成员）最多有多少个，设置为null时，表示无限制。      | 是  | 个  |
| max_databases                           | 指定租户下的数据库最多有多少个，设置为null时，表示无限制。         | 是  | 个  |
| max_shard_number   | 指定租户下的数据库最多能创建多少shard，设置为null时，表示无限制。   | 是  | 个  |
| max_replica_number | 指定租户下的数据库最多能创建多少replica，设置为null时，表示无限制。 | 是  | 个  |
| max_retention_time | 指定租户下的数据库的TTL参数，最多可设置多大，当为null时，表示无限制。  | 是  | 天  |

#### 示例：

```json
"object_config": {
  "max_users_number": 1,
  "max_databases": 3,
  "max_shard_number": 2,
  "max_replicate_number": 2,
  "max_retention_time": 30
},
```

#### request_config ，限制读写请求，包含以下参数：

| 参数名                           | 描述                            | 必选 | 单位   |
| :---------------------------- | :---------------------------- | :- | :--- |
| data_in  | 限制一段时间内写请求的大小，设置为null时，表示无限制。 | 是  | Byte |
| data_out | 限制一段时间内读请求的大小，设置为null时，表示无限制。 | 是  | Byte |
| queries                       | 限制一段时间内读请求次数，设置为null时，表示无限制。  | 是  | 次    |
| writes                        | 限制一段时间内写请求次数，设置为null时，表示无限制。  | 是  | 次    |

其中 `data_in` 和 `data_out` 限制是通过令牌桶算法实现的，共由两部分组成：一个是 meta 上的远程令牌桶，由 `remote_bucket` 指定，另一个是 data 上的本地令牌桶，由 `local_bucket` 指定，令牌的单位是字节。

#### remote_bucket 包含以下参数：

| 参数名      | 描述         | 单位 |
| :------- | :--------- | :- |
| max      | 限制桶最大令牌个数  | 个  |
| initial  | 限制桶初始时令牌个数 | 个  |
| refill   | 限制每次填充令牌个数 | 个  |
| interval | 填充令牌的时间间隔  | ms |

#### local_bucket 包含以下参数：

| 参数      | 描述         | 单位 |
| :------ | :--------- | :- |
| max     | 限制桶最大令牌个数  | 个  |
| initial | 限制桶初始时令牌个数 | 个  |

下面令牌桶设置示例表示，每100毫秒允许10KB数据大小写入，每100毫秒允许10KB数据大小写出；

#### 数据写入设置示例

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

#### 限制租户读写数据大小和次数示例如下：

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

#### 整体示例

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
