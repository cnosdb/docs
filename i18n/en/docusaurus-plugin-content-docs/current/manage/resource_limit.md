---
sidebar_position: 8
---

# Tenant Resource Limitation

Currently, the resource isolation of CnosDB is tenant-level. There are two types of restrictions: one is to limit the objects created by tenants; One is to limit the size and number of times tenants can read and write data.Both types of restrictions can be set using the same SQL, and this SQL can only be used by the superuser.

#### Syntax

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

#### Parameter Description

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

#### object_config, object limit, the parameters included are as follows:

| Parameter name                                               | Description                                                                                                                                          | Required | Units |
| :----------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---- |
| max_users_number   | Specifies the maximum number of users (members) to be a tenant; when set to null, it is unbounded.                | Yes      | Count |
| max_databases                           | Specifies the maximum number of databases for each tenant; when set to null, it is unlimited.                                        | Yes      | Count |
| max_shard_number   | Specifies the maximum number of shards that can be created in a tenant's database; when set to null, this is unlimited.              | Yes      | Count |
| max_replica_number | Specifies the maximum number of replicas that can be created for the database under the tenant; when set to null, this is unlimited. | Yes      | Count |
| max_retention_time | Specifies the maximum TTL parameter of the database under the tenant. When null, it is unlimited.                    | Yes      | Day   |

#### Example:

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

| Parameter name                                               | Description  | Required |
| :----------------------------------------------------------- | :----------- | :------- |
| **coord_data_in**  | 协调层数据输入限制    | Yes      |
| **coord_data_out** | 协调层数据输出限制    | Yes      |
| **coord_queries**                       | 协调层查询限制      | Yes      |
| **coord_writes**                        | 协调层写入限制      | Yes      |
| **http_data_in**   | HTTP 层数据输入限制 | Yes      |
| **http_data_out**  | HTTP 层数据输出限制 | Yes      |
| **http_queries**                        | HTTP 层查询限制   | Yes      |
| **http_writes**                         | HTTP 层写入限制   | Yes      |

The parameter limitation is implemented through the token bucket algorithm, which consists of two parts: one is the remote token bucket on meta, specified by 'remote_max', 'remote_initial', 'remote_defill', and 'remote_initial'; the other is the local token bucket on data, specified by 'local_max', and the unit of the token is bytes.

#### 令牌桶 包含以下参数：

| Parameter name                       | Description                                     | Required | Units |
| :----------------------------------- | :---------------------------------------------- | :------- | :---- |
| remote_max      | Maximum number of tokens for remote bucket      | Yes      | Count |
| remote_initial  | Initial tokens for remote bucket                | Yes      | Count |
| remote_refill   | Number of tokens to fill                        | Yes      | Count |
| remote_interval | Fill interval (milliseconds) | Yes      | ms    |
| local_max       | Maximum number of tokens in local bucket        | Yes      | Count |
| local_initial   | Number of initial tokens for local bucket       | Yes      | Count |

The following example bucket setup allows 10KB of data to be written every 100ms and 10KB of data to be cased every 100ms;

#### Example data writing settings

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

#### Overall Example

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
