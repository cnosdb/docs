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
       [_limiter = <limiter_config>]];
```

| Options    | Description                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
| `_limiter` | Limit tenant resource usage, for more details please refer to [Tenant Resources](../../manage/resource_limit.md) |

<details>
  <summary>查看示例</summary>

```sql
CREATE TENANT test;
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
  <summary>查看示例</summary>

```sql
CREATE USER IF NOT EXISTS tester WITH PASSWORD='xxx', MUST_CHANGE_PASSWORD=true, COMMENT = 'test';
```

</details>

## `CREATE ROLE`

`CREATE ROLE` is used to create new roles.

By using the `CREATE ROLE` statement, administrators can define new roles and assign permissions to these roles.Roles can be used in the database for organizing users and granting a specific set of permissions to simplify the administration and control access levels.

```sql
CREATE ROLE [IF NOT EXISTS] role_name INHERIT {owner | member};
```

| Options  | Description                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `owner`  | Default role for tenants. You must inherit `owner` or `member` when creating a new role. |
| `member` | Default role for tenants. You must inherit `owner` or `member` when creating a new role. |

<details>
  <summary>查看示例</summary>

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
option: {COMMENT/_LIMITER}
```

| Options | Description                                                               |
| ------- | ------------------------------------------------------------------------- |
| `SET`   | Add or modify attributes for tenants.                     |
| `UNSET` | Revoke the configuration or properties within the tenant. |

<details>
  <summary>查看示例</summary>

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
  <summary>查看示例</summary>

```sql
ALTER USER tester SET PASSWORD = 'aaa';
```

</details>

## `DROP TENANT`

DROP TENANT is used to delete a tenant and its related data and configuration.

Through the `DROP TENANT` command, you can delete a specific tenant, including all data, configurations, users, and other content owned by the tenant.

Before executing the `DROP TENANT` operation, it is usually necessary to consider it carefully, as this operation will permanently delete the tenant and all its related data.

```sql
DROP TENANT tenant_name;
```

<details>
  <summary>查看示例</summary>

```sql
DROP TENANT test;
```

</details>

## `DROP USER`

`DROP USER` is used to delete an existing user.

By using the `DROP USER` statement, a database administrator can permanently delete specific users from the database, including the user's login credentials, permissions, and configuration information.

```sql
DROP USER [IF EXISTS] user_name;
```

<details>
  <summary>查看示例</summary>

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
  <summary>查看示例</summary>

```sql
DROP USER IF EXISTS tester;
```

</details>

## `GRANT`

`GRANT` 用于授予用户或角色权限。

通过使用 `GRANT` 命令，数据库管理员可以向用户或角色授予特定的权限，这样可以控制用户或角色对数据库对象的访问和操作权限。

权限支持的粒度如下

| Options | Description  |
| ------- | ------------ |
| `READ`  | 对数据库读的权限。    |
| `WRITE` | 对数据库读写的权限。   |
| `ALL`   | 对数据库增删改查的权限。 |

```sql
GRANT {READ | WRITE | ALL} ON DATABASE database_name TO ROLE role_name;
```

<details>
  <summary>查看示例</summary>

**创建一个名为 `rrr` 的角色。**

```sql
CREATE ROLE rrr INHERIT member;
```

**授予角色 `rrr` 读取数据库 `air` 的权限。**

```sql
GRANT READ ON DATABASE air TO ROLE rrr;
```

**授予角色 `rr r` 读写数据库 `wind` 的权限。**

```sql
GRANT WRITE ON DATABASE wind TO ROLE rrr;
```

**授予角色 `rrr` 关于数据库 `sea` 的所有权限。**

```sql
GRANT ALL ON DATABASE sea TO ROLE rrr;
```

</details>

## `REVOKE`

`REVOKE` 在数据库管理系统中用于撤销用户或角色权限。

通过使用 `REVOKE` 命令，数据库管理员可以从用户或角色中撤销之前授予的权限，以限制其对数据库对象的访问或操作权限。`REVOKE` 命令通常与 `GRANT` 命令结合使用，用于管理和调整用户或角色的权限。

```sql
REVOKE {WRITE | READ | FULL} ON DATABASE database_name FROM role_name;
```

<details>
  <summary>查看示例</summary>

**撤销 `rrr`读取数据库 `air` 的权限。**

```sql
REVOKE READ ON DATABASE air FROM rrr;
```

</details>
