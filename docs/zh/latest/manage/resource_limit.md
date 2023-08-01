# 租户资源限制

目前CnosDB的资源隔离是租户级别的。

有两类限制，一是限制租户创建的对象，二是限制租户的读写大小和次数。

两类限制都通过同一种SQL设定，并且该SQL只能由最高权限用户使用。

语法：
```sql
alter tenant <tenant_name> set _limiter '<limiter_json>';
```

示例：
```sql
alter tenant cnosdb set _limiter = '{"object_config":{"max_users_number":1,"max_databases":3,"max_shard_number":2,"max_replicate_number":2,"max_retention_time":30},"request_config":{"data_in":{"remote_bucket":{"max":100000,"initial":0,"refill":100000,"interval":100},"local_bucket":{"max":100000,"initial":0}},"data_out":{"remote_bucket":{"max":100,"initial":0,"refill":100,"interval":100},"local_bucket":{"max":100,"initial":0}},"queries":null,"writes":null}}';
```

其中的json如下：
```json
{
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
}
```

## 限制创建对象
其中 object_config 是对象限制，并有以下限制。
1. max_users_number,
2. max_databases
3. max_shard_number
4. max_replicate_number
5. max_retention_time 

max_users_number 指定租户下的用户（成员）最多有多少个，为null时，代表无限制。

max_databases 指定租户下最多能创建多少数据库，为null时，代表无限制。

max_shard_number 指定租户下的数据库最多能创建多少shard，为null时，代表无限制。

max_replicate_number 指定租户下的数据库最多能指定多少副本，为null时，代表无限制。

max_retention_time 指定租户下的数据库的TTL参数，最多能多大，为null时，代表无限制。

## 限制读写

request_config 限制读写请求。

提供了4种设置。
1. data_in
2. data_out
3. queries
4. writes

data_in 限制一段时间内写请求的大小，为null时不限制。

data_out 限制一段时间内读请求的大小，为null时不限制。

writes 限制一段时间内写请求次数，为null时不限制。

queries 限制一段时间内读请求次数，为null时不限制。


这些限制都通过令牌桶算法实现。
由两部分组成，一个是meta上的远程令牌桶，由remote_bucket指定，另一个是data上的本地令牌桶，由local_bucket指定。

其中 data_in/data_out 的令牌单位是字节，writes/queries 的令牌单位是次。

remote_bucket 由以下字段组成
```
max 限制桶最大有多少令牌
initial 限制桶初始时有多少令牌
refill 限制每次填充多少令牌
interval 隔多少毫秒填充
```

local_bucket 由以下字段组成
```
max 限制桶最大有多少令牌
initial 限制桶初始有多少令牌
```


下面令牌桶设置表示，每100毫秒允许10000B数据大小写入
```
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
```