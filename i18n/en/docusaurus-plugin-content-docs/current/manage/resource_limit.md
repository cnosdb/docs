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

- **tenant_name**: Tenant name.
- **comment**: description of tenants.
- **drop_after**: specifies the useful time of the tenant, in the format \`'1d' for 1 day etc.
- **Remaining parameters**: belongs to the `_limiter` tenant resource limit, classified as:

  - **Object limits the number of `object_config`**: tenant objects and storage limits.

  - **Read and write limit `request_config`**:
    - **Coordination Layer Configuration**:
      - **coord_data_in**: Rental data input configuration, including `remote` and `local` resource restrictions.
      - **coord_data_out**: Tenant coordination level data output configuration, including `remote` and `local` resource restrictions.
      - **coord_queries**: Tenant Lookup configuration, including `remote` and `local` resource restrictions.
      - **coord_writes**: Tenant coordination layer writes into the configuration, including `remote` and `local` resource restrictions.
    - **HTTP Layer Configuration**:
      - **http_data_in**: Tenant HTTP layer data input configuration that supports `remote` and `local` limits.
      - **http_data_out**: Tenant HTTP layer data output configuration that supports `remote` and `local` limits.
      - **http_queries**: Tenant HTTP Layer Configuration supports `remote` and `local` limits.
      - **http_writes**: Tenant write configuration to support `remote` and `local` limits.

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

### request_config read and write Request limit, containing the following configuration entry:

| Parameter                                                    | Description                          | Required |
| :----------------------------------------------------------- | :----------------------------------- | :------- |
| **coord_data_in**  | Coordinate level data input limit    | Yes      |
| **coord_data_out** | Coordinating Layer Data Output Limit | Yes      |
| **coord_queries**                       | Coordinate Query Limit               | Yes      |
| **coord_writes**                        | Coordination write limit             | Yes      |
| **http_data_in**   | HTTP Layer Data Input Limit          | Yes      |
| **http_data_out**  | HTTP Layer Data Output Limit         | Yes      |
| **http_queries**                        | HTTP Layer Query Limit               | Yes      |
| **http_writes**                         | HTTP Layer Write Limit               | Yes      |

The parameter limitation is implemented through the token bucket algorithm, which consists of two parts: one is the remote token bucket on meta, specified by 'remote_max', 'remote_initial', 'remote_defill', and 'remote_initial'; the other is the local token bucket on data, specified by 'local_max', and the unit of the token is bytes.

#### Token bucket contains the following parameter:

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
