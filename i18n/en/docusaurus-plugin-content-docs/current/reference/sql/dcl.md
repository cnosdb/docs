---
sidebar_position: 6
---

# DCL

Is used to control the access rights of database users.

Only users with system permissions can add users and tenants.

Only a user who holds the role of owner under a tenant or a user with system permissions can add a role under a tenant and give a user a role.

## `CREATE TENANT`

`CREATE TENANT` is used to create a new tenant in CnosDB.CnosDB allows a single instance to serve multiple clients (i.e. tenants) at the same time, with each client being treated as an independent tenant.

```sql
CREATE TENANT [IF NOT EXISTS] tenant_name
[WITH [comment = <comment>],
       [drop_after = <duration>],
       [object_config = <
           max_users_number = <integer>,
           max_databases = <integer>,
           max_shard_number = <integer>,
           max_replicate_number = <integer>,
           max_retention_time = <integer>
       >],
       [coord_data_in = <
           remote_max = <integer>,
           remote_initial = <integer>,
           remote_refill = <integer>,
           remote_interval = <integer>,
           local_max = <integer>,
           local_initial = <integer>
       >],
       [coord_data_out = < ... >],
       [coord_queries = < ... >],
       [coord_writes = < ... >],
       [http_data_in = < ... >],
       [http_data_out = < ... >],
       [http_queries = < ... >],
       [http_writes = < ... >]
];
```

| Options          | Description                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `comment`        | 对租户的描述性备注，字符串格式。                                                                                                                           |
| `drop_after`     | Delete tenant delay time, default is immediate deletion, supports: `d`, `h`, `m`, when no unit is provided, default is `d` |
| `object_config`  | 租户的对象配置，包括最大用户数、最大数据库数等资源限制。                                                                                                               |
| `coord_data_in`  | 租户的协调层数据输入配置，包括 remote 和 local 两种资源限制设置。                                                                                                   |
| `coord_data_out` | 租户的协调层数据输入配置，包括 remote 和 local 两种资源限制设置。                                                                                                   |
| `coord_queries`  | 租户的协调层数据输入配置，包括 remote 和 local 两种资源限制设置。                                                                                                   |
| `coord_writes`   | 租户的协调层数据输入配置，包括 remote 和 local 两种资源限制设置。                                                                                                   |
| `http_data_in`   | 租户的 HTTP 层数据输入配置，支持 remote 和 local 限制。                                                                                                     |
| `http_data_out`  | 租户的 HTTP 层数据输入配置，支持 remote 和 local 限制。                                                                                                     |
| `http_queries`   | 租户的 HTTP 层数据输入配置，支持 remote 和 local 限制。                                                                                                     |
| `http_writes`    | 租户的 HTTP 层数据输入配置，支持 remote 和 local 限制。                                                                                                     |

<details>
  <summary>View example</summary>

```sql
create tenant t_create with comment 'create and alter tenant', drop_after ='1d',
object_config   max_users_number = 1
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
                local_initial = 0;
```

</details>

## `CREATE USER`

`CREATE USER` is used to create a new user.

By using the `CREATE USER` statement, administrators can create new users in CnosDB and assign them corresponding permissions and roles.New users can be used to access databases, execute queries, update data, etc. The specific permissions depend on the permission level assigned to the user by the administrator.

```sql
CREATE USER [IF NOT EXISTS] user_name
[WITH [PASSWORD='',]
[MUST_CHANGE_PASSWORD=true,]
[RSA_PUBLIC_KEY='']
[GRANTED_ADMIN=true,] [COMMENT = '']];
```

| Options                | Description                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `MUST_CHANGE_PASSWORD` | Whether to change the password on the first login, default is `false`.           |
| `GRANTED_ADMIN`        | Whether the user is a `admin` user, or `admin` is used for all of the instances. |
| `RSA_PUBLIC_KEY`       | Upload the public key of the user `RSA` algorithm for login authentication.      |

<details>
  <summary>View example</summary>

```sql
CREATE USER IF NOT EXISTS tester WITH PASSWORD='xxx', MUST_CHANGE_PASSWORD=true, COMMENT = 'test';
```

</details>

## `CREATE ROLE`

`CREATE ROLE` is used to create new roles.

By using the `CREATE ROLE` statement, administrators can define new roles and assign permissions to these roles.Roles can be used in the database for organizing users and granting a specific set of permissions to simplify the administration and control access levels.

```sql
CREATE ROLE [IF NOT EXISTS] role_name [INHERIT {owner | member}];
```

| Options  | Description                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `owner`  | Default role for tenants. When creating a new role, you can inherit `owner` or `member`. |
| `member` | Default role for tenants. When creating a new role, you can inherit `owner` or `member`. |

<details>
  <summary>View example</summary>

```sql
CREATE ROLE owner_role INHERIT owner;
```

</details>

## `ALTER TENANT`

The `ALTER TENANT` is used to modify the tenant properties or configuration.

With the `ALTER TENANT` command, the tenant properties can be modified, such as changing the tenant's configuration, adjusting resource limits, etc.

```sql
ALTER TENANT tenant_name {SET sql_option | UNSET option_name };
    
sql_option: option_name = value
option: {COMMENT/DROP_AFTER/_LIMITER}
```

| Options | Description                                                               |
| ------- | ------------------------------------------------------------------------- |
| `SET`   | Add or modify attributes for tenants.                     |
| `UNSET` | Revoke the configuration or properties within the tenant. |

<details>
  <summary>View example</summary>

```sql
ALTER TENANT test SET COMMENT = 'abc';
```

</details>

## `ALTER USER`

`ALTER USER` is used to modify statements for existing users.

By using the `ALTER USER` statement, administrators can change a user's properties, permissions, and configurations.This includes operations such as modifying user passwords, changing user roles, adjusting user permissions, etc.

```sql
ALTER USER user_name {SET sql_option};

sql_option: option_name = option_value
option_name: {COMMENT | MUST_CHANGE_PASSWORD | PASSWORD | RSA_PUBLIC_KEY}
```

| Options | Description                                           |
| ------- | ----------------------------------------------------- |
| `SET`   | Add or modify attributes for tenants. |

<details>
  <summary>View example</summary>

```sql
ALTER USER tester SET PASSWORD = 'aaa';
```

</details>

## `DROP TENANT`

DROP TENANT is used to delete a tenant and its related data and configuration.

Through the `DROP TENANT` command, you can delete a specific tenant, including all data, configurations, users, and other content owned by the tenant.

Before executing the `DROP TENANT` operation, it is usually necessary to consider it carefully, as this operation will permanently delete the tenant and all its related data.

```sql
DROP TENANT tenant_name [AFTER duration];
```

| Options | Description                                                                                                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ALTER` | Delete tenant delay time, default immediate deletion, support: `d`, `h`, `m`, when no unit is specified, default is `d`, during deletion period the tenant will be disabled, the priority of `ALTER` is higher than `DROP_AFTER` in `CREATE TANANT`. |

<details>
  <summary>View example</summary>

```sql
DROP TENANT test AFTER '7d';
```

</details>

## `DROP USER`

`DROP USER` is used to delete an existing user.

By using the `DROP USER` statement, a database administrator can permanently delete specific users from the database, including the user's login credentials, permissions, and configuration information.

```sql
DROP USER [IF EXISTS] user_name;
```

<details>
  <summary>View example</summary>

```sql
DROP USER IF EXISTS tester;
```

</details>

## `DROP ROLE`

`DROP ROLE` is used to delete existing roles.

By using the `DROP ROLE` statement, administrators can permanently delete specific roles from the database, including the permissions and configuration information associated with the role.When deleting a role, the permissions assigned to users may be revoked.

:::tip
When a role is deleted, the permissions of the corresponding tenant members will be revoked at the same time. However, the binding relationship between tenant members and their roles will not be synchronized deletion (only roles will become invalid).
:::

```sql
DROP ROLE role_name;
```

<details>
  <summary>View example</summary>

```sql
DROP USER IF EXISTS tester;
```

</details>

## `GRANT`

`GRANT` is used to grant permissions to users or roles.

By using the `GRANT` command, the database administrator can grant specific permissions to users or roles, thus controlling their access and operation permissions on database objects.

The granularity supported by permissions is as follows

| Options | Description                                                                           |
| ------- | ------------------------------------------------------------------------------------- |
| `READ`  | Permission of reading the database.                                   |
| `WRITE` | Permission of reading and writing the database.                       |
| `ALL`   | Permission of reading and writing and DDL operations on the database. |

```sql
GRANT {READ | WRITE | ALL} ON DATABASE database_name TO ROLE role_name;
```

<details>
  <summary>View example</summary>

**Create a character named `rrr`.**

```sql
CREATE ROLE rrr INHERIT member;
```

Grant the role `rrr` the permission to read the database `air`.\*\*

```sql
GRANT READ ON DATABASE air TO ROLE rrr;
```

Grant the role `rrr` permission to read and write the `wind` database.\*\*

```sql
GRANT WRITE ON DATABASE wind TO ROLE rrr;
```

Grant the role `rrr` all permissions regarding the database `sea`.\*\*

```sql
GRANT ALL ON DATABASE sea TO ROLE rrr;
```

</details>

## `REVOKE`

`REVOKE` is used in database management systems to revoke user or role permissions.

By using the `REVOKE` command, a database administrator can revoke previously granted permissions from users or roles to restrict their access or operation permissions on database objects.The `REVOKE` command is commonly used in conjunction with the `GRANT` command to manage and adjust the permissions of users or roles.

```sql
REVOKE {WRITE | READ | FULL} ON DATABASE database_name FROM role_name;
```

<details>
  <summary>View example</summary>

Revoke the permission to read database `air` for `rrr`.\*\*

```sql
REVOKE READ ON DATABASE air FROM rrr;
```

</details>
