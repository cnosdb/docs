---
title: 系统视图
order: 12
---

CnosDB 提供了系统视图用来查看集群状态和集群Schema信息

有两个特殊的数据库存放这些视图

- CLUSTER_SCHEMA 关于数据库集群
- INFORMATION_SCHEMA 关于租户信息

## CLUSTER_SCHEMA

该数据库属于整个集群，只有管理员可以访问

数据库中包含有关集群的元数据信息，例如租户信息，用户信息

### TENANTS

该视图可用于查询整个集群的所有租户信息

#### 视图定义

| 字段             | 数据类型   | 描述              |
|----------------|--------|-----------------|
| TENANT_NAME    | STRING | 租户名称            |
| TENANT_OPTIONS | STRING | 租户配置，json形式的字符串 |

**示例**

```sql
SELECT * FROM cluster_schema.tenants;
```

    +-------------+---------------------------------------------------+
    | tenant_name | tenant_options                                    |
    +-------------+---------------------------------------------------+
    | cnosdb      | {"comment":"system tenant","limiter_config":null} |
    +-------------+---------------------------------------------------+

### USERS

#### 视图定义

该视图可以查询整个集群的所有用户信息

| 字段           | 数据类型    | 描述              |
|--------------|---------|-----------------|
| USER_NAME    | STRING  | 用户名称            |
| IS_ADMIN     | BOOLEAN | 是否为系统管理员        |
| USER_OPTIONS | STRING  | 用户配置，JSON形式的字符串 |

**示例**

```sql
SELECT * FROM cluster_schema.users;
```

    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | user_name | is_admin | user_options                                                                                    |
    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | root      | true     | {"password":"*****","must_change_password":true,"rsa_public_key":null,"comment":"system admin"} |
    +-----------+----------+-------------------------------------------------------------------------------------------------+

## INFORMATION_SCHEMA

该数据库属于某个租户，在创建Tenant时，自动创建该DB，对租户下的所有成员可见

### DATABASES

该视图存放租户下数据库的信息

#### 视图定义

| 字段名称           | 数据类型            | 描述               |
|----------------|-----------------|------------------|
| TENANT_NAME    | STRING          | 数据库所属的租户名        |
| DATABASE_NAME  | STRING          | 数据库名称            |
| TTL            | STRING          | 表示数据文件保存的时间      |
| SHARD          | BIGINT UNSIGNED | 表示数据分片个数         |
| VNODE_DURATION | STRING          | 表示数据在SHARD中的时间范围 |
| PREPLICA       | BIGINT UNSIGNED | 表示数据在集群中的副本数     |
| PERCISION      | STRING          | 表示数据库的时间精度       |

**示例**

```sql
SELECT * FROM information_schema.databases;
```

    +-------------+---------------+----------+-------+----------------+---------+-----------+
    | tenant_name | database_name | ttl      | shard | vnode_duration | replica | percision |
    +-------------+---------------+----------+-------+----------------+---------+-----------+
    | cnosdb      | public        | 365 Days | 1     | 365 Days       | 1       | NS        |
    +-------------+---------------+----------+-------+----------------+---------+-----------+

### TABLES

该视图存放租户下所有表的信息

#### 视图定义

| 字段名称           | 数据类型   | 描述                    |
|----------------|--------|-----------------------|
| TABLE_TENANT   | STRING | 表所属的租户                |
| TABLE_DATABASE | STRING | 表所属的数据库               |
| TABLE_NAME     | STRING | 表名                    |
| TABLE_TYPE     | STRING | 表是基础表，还是视图            |
| TABLE_ENGINE   | STRING | 表存储引擎，目前支持外部表和内部tskv表 |
| TABLE_OPTION   | STRING | 内容为JSON字符串，记录表的所有参数   |
|                ||||

**示例**

```sql
SELECT * FROM information_schema.tables;
```

    +--------------+----------------+------------+------------+--------------+---------------+
    | table_tenant | table_database | table_name | table_type | table_engine | table_options |
    +--------------+----------------+------------+------------+--------------+---------------+
    | cnosdb       | public         | wind       | BASE TABLE | TSKV         | TODO          |
    | cnosdb       | public         | air        | BASE TABLE | TSKV         | TODO          |
    | cnosdb       | public         | sea        | BASE TABLE | TSKV         | TODO          |
    +--------------+----------------+------------+------------+--------------+---------------+

### COLUMNS

该视图存放租户下所有列的定义

#### 视图定义

| 字段名称              | 数据类型   | 描述                                           |
|-------------------|--------|----------------------------------------------|
| TABLE_TENANT      | STRING | 表所属的租户                                       |
| TABLE_DATABASE    | STRING | 表所属的数据库                                      |
| TABLE_NAME        | STRING | 表所属的表名                                       |
| COLUMN_NAME       | STRING | 列名                                           |
| ORDINAL_POSITION  | STRING | 列在表中的顺序位置                                    |
| COLUMN_TYPE       | STRING | 列的类型，tskv表独有的，支持 TIME、TAG、FIELD，通常字段为FIELD类型 |
| IS_NULLABLE       | STRING | 如果列可能包含NULL，则为"YES"，否则为"NO"                  |
| DATA_TYPE         | STRING | 列的数据类型                                       |
| COMPRESSION_CODEC | STRING | 列使用的压缩算法                                     |

**示例**

```sql
SELECT * FROM information_schema.columns;
```

    +-------------+---------------+------------+-------------+-------------+------------------+----------------+-------------+-----------+-------------------+
    | tenant_name | database_name | table_name | column_name | column_type | ordinal_position | column_default | is_nullable | data_type | compression_codec |
    +-------------+---------------+------------+-------------+-------------+------------------+----------------+-------------+-----------+-------------------+
    | cnosdb      | public        | wind       | time        | TIME        | 0                | NULL           | false       | TIMESTAMP | DEFAULT           |
    | cnosdb      | public        | wind       | station     | TAG         | 1                | NULL           | true        | STRING    | DEFAULT           |
    | cnosdb      | public        | wind       | speed       | FIELD       | 2                | NULL           | true        | DOUBLE    | DEFAULT           |
    | cnosdb      | public        | wind       | direction   | FIELD       | 3                | NULL           | true        | DOUBLE    | DEFAULT           |
    | cnosdb      | public        | air        | time        | TIME        | 0                | NULL           | false       | TIMESTAMP | DEFAULT           |
    | cnosdb      | public        | air        | station     | TAG         | 1                | NULL           | true        | STRING    | DEFAULT           |
    | cnosdb      | public        | air        | visibility  | FIELD       | 2                | NULL           | true        | DOUBLE    | DEFAULT           |
    | cnosdb      | public        | air        | temperature | FIELD       | 3                | NULL           | true        | DOUBLE    | DEFAULT           |
    | cnosdb      | public        | air        | pressure    | FIELD       | 4                | NULL           | true        | DOUBLE    | DEFAULT           |
    | cnosdb      | public        | sea        | time        | TIME        | 0                | NULL           | false       | TIMESTAMP | DEFAULT           |
    | cnosdb      | public        | sea        | station     | TAG         | 1                | NULL           | true        | STRING    | DEFAULT           |
    | cnosdb      | public        | sea        | temperature | FIELD       | 2                | NULL           | true        | DOUBLE    | DEFAULT           |
    +-------------+---------------+------------+-------------+-------------+------------------+----------------+-------------+-----------+-------------------+

### ENABLED_ROLES

此视图展示当前用户在当前租户下的角色信息

#### 视图定义

| 字段        | 数据类型   | 描述   |
|-----------|--------|------|
| ROLE_NAME | STRING | 角色名称 |

```sql
SELECT * FROM information_schema.enabled_roles;
```

    +-----------+
    | role_name |
    +-----------+
    | owner     |
    +-----------+

### ROLES

此视图展示当前租户下所有可用的角色（包含系统角色和自定义角色）
此视图只对当前租户的Owner可见

#### 视图定义

| 字段           | 数据类型   | 描述                           |
|--------------|--------|------------------------------|
| ROLE_NAME    | STRING | 租户下的角色名称                     |
| ROLE_TYPE    | STRING | 角色类型，自定义角色或系统角色              |
| INHERIT_ROLE | STRING | 自定义角色继承的系统角色名称，如果是系统角色则为NULL |

**示例**

```sql
SELECT * FROM information_schema.roles;
```

    +-----------+-----------+--------------+
    | role_name | role_type | inherit_role |
    +-----------+-----------+--------------+
    | owner     | system    |              |
    | member    | system    |              |
    +-----------+-----------+--------------+

### DATABASE_PRIVILEGES

#### 视图定义

此视图展示所在租户下所有已被授予给指定角色的作用在db上的权限。
此视图的所有记录对当前租户的Owner可见。
对于非Owner成员，只展示对应角色的记录。

| 字段             | 数据类型   | 描述                      |
|----------------|--------|-------------------------|
| TENANT_NAME    | STRING | 被授予权限的数据库所属的租户名称        |
| DATABASE_NAME  | STRING | 被授予权限的数据库名称             |
| PRIVILEGE_TYPE | STRING | 被授予的权限类型，READ/WRITE/ALL |
| ROLE_NAME      | STRING | 被授予权限的角色名称              |

**示例**

```sql
CREATE ROLE rrr INHERIT member;
GRANT READ ON DATABASE air TO ROLE rrr;
SELECT * FROM information_schema.database_privileges;
```

    +-------------+---------------+----------------+-----------+
    | tenant_name | database_name | privilege_type | role_name |
    +-------------+---------------+----------------+-----------+
    | cnosdb      | air           | Read           | rrr       |
    +-------------+---------------+----------------+-----------+

### MEMBERS

此视图展示所在租户下的成员信息

此视图的所有记录对当前租户的所有成员可见

#### 视图定义

| 字段        | 数据类型   | 描述         |
|-----------|--------|------------|
| USER_NAME | STRING | 租户下的用户成员名称 |
| ROLE_NAME | STRING | 成员的角色名称    |

**示例**

```sql
SELECT * FROM information_schema.members;
```

    +-----------+-----------+
    | user_name | role_name |
    +-----------+-----------+
    | root      | owner     |
    +-----------+-----------+

### QUERIES(INFORMATION_SCHEMA)

此视图展示SQL语句实时快照，用于实时监控SQL作业

此视图的所有记录对当前租户的owner可见

对于非Owner成员，只展示当前成员提交的SQL

#### 视图定义

| 字段          | 数据类型            | 描述                                                             |
|-------------|-----------------|----------------------------------------------------------------|
| QUERY_ID    | STRING          | SQL语句的ID                                                       |
| QUERY_TEXT  | STRING          | SQL语句的内容                                                       |
| USER_ID     | STRING          | 提交SQL的用户ID                                                     |
| USER_NAME   | STRING          | 提交SQL的用户名称                                                     |
| TENANT_ID   | STRING          | 租户ID                                                           |
| TENANT_NAME | STRING          | 租户名称                                                           |
| STATE       | STRING          | 语句的运行状态，分为ACCEPTING，DISPATCHING，ANALYZING，OPTMIZING，SCHEDULING |
| DURATION    | BIGINT UNSIGNED | 语句持续运行的时间                                                      |

**示例**

```sql
SELECT * FROM information_schema.queries;
```

    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+

#### SHOW QUERIES
你还可以使用`SHOW QUERIES`语句来查看正在执行的SQL语句, 该语句这是对QUERIES视图的包装

**示例**
```sql
SHOW QUERIES;
```

    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | query_id | query_text                                                       | user_id                                 | user_name | tenant_id                              | tenant_name | state      | duration     |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+
    | 36       | select * FROM air join sea ON air.temperature = sea.temperature; | 108709109615072923019194003831375742761 | root      | 13215126763611749424716665303609634152 | cnosdb      | SCHEDULING | 12.693345666 |
    +----------+------------------------------------------------------------------+-----------------------------------------+-----------+----------------------------------------+-------------+------------+--------------+

## USAGE_SCHEMA
该数据库，属于某个租户，在创建Tenant时，自动创建该DB，对租户下的所有成员可见。

对于普通用户，只能看到 USAGE_SCHEMA 中的表中属于当前用户租户的一部分，

对于系统管理员，能看到 USAGE_SCHEMA 中表的全部

### DISK_STORAGE

该视图记录集群中各个 vnode 所占磁盘空间大小，单位Byte


#### 视图定义
管理员看到的视图定义

| 字段       | 数据类型            | 描述                |
|----------|-----------------|-------------------|
| TIME     | TIMESTAMP       | 统计disk_storage的时间 |
| DATABASE | STRING          | vnode 所属的数据库      |
| NODE_ID  | STRING          | data节点的ID         |
| TENANT   | STRING          | vnode 所属的租户名称     |
| VNODE_ID | STRING          | vnode 的 ID        |
| VALUE    | BIGINT UNSIGNED | vnode 所占磁盘大小      |


普通用户看到的视图定义，只能访问当前会话所在的租户信息

| 字段       | 数据类型            | 描述                |
|----------|-----------------|-------------------|
| TIME     | TIMESTAMP       | 统计disk_storage的时间 |
| DATABASE | STRING          | vnode 所属的数据库      |
| NODE_ID  | STRING          | data节点的ID         |
| TENANT   | STRING          | vnode 所属的租户名称     |
| VNODE_ID | STRING          | vnode 的 ID        |
| VALUE    | BIGINT UNSIGNED | vnode 所占磁盘大小      |


#### 示例
管理员用户
```sql
select * from usage_schmea.disk_storage order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+----------+-------+
    | time                       | database     | node_id | tenant | vnode_id | value |
    +----------------------------+--------------+---------+--------+----------+-------+
    | 2023-02-23T03:57:52.566487 | usage_schema | 1001    | cnosdb | 3        | 0     |
    | 2023-02-23T03:57:42.566642 | usage_schema | 1001    | cnosdb | 3        | 0     |
    +----------------------------+--------------+---------+--------+----------+-------+
普通用户
```sql
select * from usage_schema.disk_storage order by time desc limit 2;
```
    +----------------------------+--------------+---------+----------+-------+
    | time                       | database     | node_id | vnode_id | value |
    +----------------------------+--------------+---------+----------+-------+
    | 2023-02-23T06:34:36.578458 | usage_schema | 1001    | 3        | 0     |
    | 2023-02-23T06:34:26.577871 | usage_schema | 1001    | 3        | 0     |
    +----------------------------+--------------+---------+----------+-------+

### DATA_IN

该视图记录数据写入到DB时，写入流量的总大小

#### 视图定义
管理员看到的视图定义

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计data_in的时间     |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| VALUE    | BIGINT UNSIGNED | 写入流量的总大小         |

普通用户看到的视图定义，只能访问当前会话所在的租户信息

| 字段       | 数据类型            | 描述           |
|----------|-----------------|--------------|
| TIME     | TIMESTAMP       | 统计data_in的时间 |
| DATABASE | STRING          | Database名称   |
| NODE_ID  | STRING          | Data节点的 ID   |
| VALUE    | BIGINT UNSIGNED | 写入流量的总大小     |


#### 示例
管理员用户
```sql
select * from usage_schema.data_in order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+--------+
    | time                       | database     | node_id | tenant | value  |
    +----------------------------+--------------+---------+--------+--------+
    | 2023-02-23T06:50:36.578641 | usage_schema | 1001    | cnosdb | 741552 |
    | 2023-02-23T06:50:26.577544 | usage_schema | 1001    | cnosdb | 739612 |
    +----------------------------+--------------+---------+--------+--------+

普通用户
```sql
select * from usage_schema.data_in order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+
    | time                       | database     | node_id | value  |
    +----------------------------+--------------+---------+--------+
    | 2023-02-23T06:43:46.587023 | usage_schema | 1001    | 662012 |
    | 2023-02-23T06:43:36.586154 | usage_schema | 1001    | 660072 |
    +----------------------------+--------------+---------+--------+

### DATA_OUT

该视图记录数据从DB中查询出来时，读取流量的大致总大小
#### 视图定义
管理员看到的视图定义

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计data_out的时间    |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| VALUE    | BIGINT UNSIGNED | 读取流量的总大小         |

普通用户看到的视图定义，只能访问当前会话所在的租户信息

| 字段       | 数据类型            | 描述            |
|----------|-----------------|---------------|
| TIME     | TIMESTAMP       | 统计data_out的时间 |
| DATABASE | STRING          | Database名称    |
| NODE_ID  | STRING          | Data节点的 ID    |
| VALUE    | BIGINT UNSIGNED | 读取流量的总大小      |

#### 示例
```sql
select * from usage_schema.data_out order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+----------+
    | time                       | database     | node_id | tenant | value    |
    +----------------------------+--------------+---------+--------+----------+
    | 2023-02-23T06:51:16.577110 | usage_schema | 1001    | cnosdb | 15156112 |
    | 2023-02-23T06:51:06.577132 | usage_schema | 1001    | cnosdb | 15156112 |
    +----------------------------+--------------+---------+--------+----------+
```sql
select * from usage_schema.data_out order by time desc limit 2;
```
    +----------------------------+--------------+---------+----------+
    | time                       | database     | node_id | value    |
    +----------------------------+--------------+---------+----------+
    | 2023-02-23T06:51:46.576451 | usage_schema | 1001    | 16173128 |
    | 2023-02-23T06:51:36.576904 | usage_schema | 1001    | 16173128 |
    +----------------------------+--------------+---------+----------+
### QUERIES (USAGE_SCHEMA) 

该视图记录用户查询DB的次数

#### 视图定义
管理员看到的视图定义

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计queries的时间     |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| USER     | STRING          | 用户名称             |
| VALUE    | BIGINT UNSIGNED | 用户查询次数           |


普通用户看到的视图定义，只能访问当前会话所在的租户信息

| 字段       | 数据类型            | 描述           |
|----------|-----------------|--------------|
| TIME     | TIMESTAMP       | 统计queries的时间 |
| DATABASE | STRING          | Database名称   |
| NODE_ID  | STRING          | Data节点的 ID   |
| USER     | STRING          | 用户名称             |
| VALUE    | BIGINT UNSIGNED | 用户查询次数       |

#### 示例
```sql
select * from usage_schema.queries order by time desc limit 2;
```
    +----------------------------+--------------+---------+--------+-------+-------+
    | time                       | database     | node_id | tenant | user  | value |
    +----------------------------+--------------+---------+--------+-------+-------+
    | 2023-02-23T06:53:16.575193 | usage_schema | 1001    | cnosdb | usage | 9     |
    | 2023-02-23T06:53:16.575193 | usage_schema | 1001    | cnosdb | root  | 17    |
    +----------------------------+--------------+---------+--------+-------+-------+

```sql
select * from usage_schema.queries order by time desc limit 2;
```
    +----------------------------+--------------+---------+-------+-------+
    | time                       | database     | node_id | user  | value |
    +----------------------------+--------------+---------+-------+-------+
    | 2023-02-23T06:52:36.576098 | usage_schema | 1001    | usage | 9     |
    | 2023-02-23T06:52:36.576097 | usage_schema | 1001    | root  | 17    |
    +----------------------------+--------------+---------+-------+-------+

### WRITES

该视图记录用户写入DB的次数

注意，该视图目前只会在通过[lineprotocol](../%23application/api.md#接口列表)/[prometheus remote write](../%23ecology/prometheus.md#remote-write) 接口写入成功时创建
#### 视图定义
管理员看到的视图定义

| 字段       | 数据类型            | 描述               |
|----------|-----------------|------------------|
| TIME     | TIMESTAMP       | 统计writes的时间      |
| DATABASE | STRING          | Database名称       |
| NODE_ID  | STRING          | Data节点的 ID       |
| TENANT   | STRING          | Database 所属的租户名称 |
| USER     | STRING          | 用户名称             |
| VALUE    | BIGINT UNSIGNED | 用户写入次数           |


普通用户看到的视图定义，只能访问当前会话所在的租户信息

| 字段       | 数据类型            | 描述          |
|----------|-----------------|-------------|
| TIME     | TIMESTAMP       | 统计writes的时间 |
| DATABASE | STRING          | Database名称  |
| NODE_ID  | STRING          | Data节点的 ID  |
| USER     | STRING          | 用户名称        |
| VALUE    | BIGINT UNSIGNED | 用户写入次数      |

#### 示例

管理员用户
```sql
select * from usage_schema.writes order by time desc limit 2;
```
    +----------------------------+----------+---------+--------+------+-------+
    | time                       | database | node_id | tenant | user | value |
    +----------------------------+----------+---------+--------+------+-------+
    | 2023-02-23T07:05:56.549282 | public   | 1001    | cnosdb | root | 2     |
    | 2023-02-23T07:05:46.549188 | public   | 1001    | cnosdb | root | 2     |
    +----------------------------+----------+---------+--------+------+-------+

普通用户
```sql
select * from usage_schema.writes order by time desc limit 2;
```
    +----------------------------+----------+---------+------+-------+
    | time                       | database | node_id | user | value |
    +----------------------------+----------+---------+------+-------+
    | 2023-02-23T07:06:56.547905 | public   | 1001    | root | 2     |
    | 2023-02-23T07:06:46.547673 | public   | 1001    | root | 2     |
    +----------------------------+----------+---------+------+-------+
