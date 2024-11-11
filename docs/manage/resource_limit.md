---
sidebar_position: 8
---

# 租户资源限制

当前 CnosDB 的资源隔离是租户级别的，共有两类限制：一类是限制租户创建的对象；一类是限制租户读写数据的大小和次数。两类限制均可通过同一种 SQL 来进行设定，并且该 SQL 只能由最高权限用户使用。

#### 语法

```sql
alter tenant <tenant_name> set
    object_config 
         max_users_number = <num>
         max_databases = <num>
         max_shard_number = <num>
         max_replicate_number = <num>
         max_retention_time = <num>,
     coord_data_in
         remote_max = <num>
         remote_initial = <num>
         remote_refill = <num>
         remote_interval = <num>
         local_max = <num>
         local_initial = <num>,
     coord_data_out
         ...
     coord_queries
         ...
     coord_writes
         ...
     http_data_in
         ...
     http_data_out
         ...
     http_queries
         ...
     http_writes
         ...
;
```

#### 参数说明

- **tenant_name**：租户名称。
- **comment**：对租户的描述。
- **drop_after**：指定租户的有效时间，格式为 `'1d'` 表示1天等。
- **其余参数**：属于 `_limiter` 租户资源限制的内容，具体分类为：
  
  - **对象限制 `object_config`**：租户对象的数量及存储限制。
  
  - **读写限制 `request_config`**：
    - **协调层配置**：
      - **coord_data_in**：租户的协调层数据输入配置，包括 `remote` 和 `local` 两种资源限制设置。
      - **coord_data_out**：租户的协调层数据输出配置，包括 `remote` 和 `local` 两种资源限制设置。
      - **coord_queries**：租户的协调层查询配置，包括 `remote` 和 `local` 两种资源限制设置。
      - **coord_writes**：租户的协调层写入配置，包括 `remote` 和 `local` 两种资源限制设置。
    - **HTTP 层配置**：
      - **http_data_in**：租户的 HTTP 层数据输入配置，支持 `remote` 和 `local` 限制。
      - **http_data_out**：租户的 HTTP 层数据输出配置，支持 `remote` 和 `local` 限制。
      - **http_queries**：租户的 HTTP 层查询配置，支持 `remote` 和 `local` 限制。
      - **http_writes**：租户的 HTTP 层写入配置，支持 `remote` 和 `local` 限制。



#### object_config ，对象限制，包含以下参数：

| 参数名                | 描述                                      | 必选 | 单位 |
|:-------------------|:----------------------------------------|:---|:---|
| max_users_number   | 指定租户下的用户（成员）最多有多少个，设置为null时，表示无限制。      | 是  | 个  |
| max_databases      | 指定租户下的数据库最多有多少个，设置为null时，表示无限制。         | 是  | 个  |
| max_shard_number   | 指定租户下的数据库最多能创建多少shard，设置为null时，表示无限制。   | 是  | 个  |
| max_replica_number | 指定租户下的数据库最多能创建多少replica，设置为null时，表示无限制。 | 是  | 个  |
| max_retention_time | 指定租户下的数据库的TTL参数，最多可设置多大，当为null时，表示无限制。  | 是  | 天  |

#### 示例：
```
object_config
  max_users_number= 1
  max_databases= 3
  max_shard_number= 2
  max_replicate_number= 2
  max_retention_time= 30
,
```
### request_config 读写请求限制，包含以下配置项：
| 参数名           | 描述                           | 必选 |
|:---------------|:------------------------------|:---|
| **coord_data_in**  | 协调层数据输入限制                | 是  | 
| **coord_data_out** | 协调层数据输出限制               | 是  |     
| **coord_queries**  | 协调层查询限制                   | 是  |     
| **coord_writes**   | 协调层写入限制                   | 是  |     
| **http_data_in**   | HTTP 层数据输入限制               | 是  |     
| **http_data_out**  | HTTP 层数据输出限制              | 是  |     
| **http_queries**   | HTTP 层查询限制                  | 是  |     
| **http_writes**    | HTTP 层写入限制                  | 是  |     


其中参数限制是通过令牌桶算法实现的，共由两部分组成：一个是 meta 上的远程令牌桶，由 `remote_max`  `remote_initial ` `remote_refill   ` `remote_initial ` 指定，另一个是 data 上的本地令牌桶，由 `local_max`  `local_initial` 指定，令牌的单位是字节。

#### 令牌桶 包含以下参数：

| 参数名          | 描述                           | 必选 | 单位 |
|:--------------|:------------------------------|:---|:---|
| remote_max        | 远程桶最大令牌数                   | 是  | 个  |
| remote_initial    | 远程桶初始令牌数                   | 是  | 个  |
| remote_refill     | 填充令牌数量                       | 是  | 个  |
| remote_interval   | 填充间隔（毫秒）                   | 是  | ms  |
| local_max         | 本地桶最大令牌数                   | 是  | 个  |
| local_initial     | 本地桶初始令牌数                   | 是  | 个  |

下面令牌桶设置示例表示，每100毫秒允许10KB数据大小写入，每100毫秒允许10KB数据大小写出；

#### 数据写入设置示例

```
coord_data_in   remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,
coord_data_out  remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,
```


#### 整体示例

```json
create tenant test;
alter tenant test set 
object_config 
                max_users_number = 1
                max_databases = 3
                max_shard_number = 2
                max_replicate_number = 2
                max_retention_time = 30,
coord_data_in   remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,
coord_data_out  remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,
coord_queries   remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,    
coord_writes    remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,
http_data_in   remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,
http_data_out  remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,
http_queries   remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0,    
http_writes    remote_max = 10000
                remote_initial = 0
                remote_refill = 10000
                remote_interval = 100
                local_max = 10000
                local_initial = 0
;
```
