---
sidebar_position: 4
---

# 数据控制语言

CnosDB 实例启动的时候，会默认创建一个租户 `cnosdb` 和一个用户 `root`。

只有拥有系统权限的用户才能添加用户和租户。

只有担任租户下 owner 角色的用户或拥有系统权限的用户才能添加租户下的角色，并赋予用户角色。



## `CREATE TENANT`

`CREATE TENANT` 用于在 CnosDB 中创建一个新的租户。CnosDB 许单个实例同时为多个客户（即租户）提供服务，每个客户都被视为一个独立的租户。

```sql
CREATE TENANT [IF NOT EXISTS] tenant_name
[WITH [comment = <comment>],
       [drop_after = duration],
       [_limiter = <limiter_config>]];
```

## `CREATE USER`

`CREATE USER ` 用于创建新用户。

通过使用 `CREATE USER` 语句，管理员可以在数据库中创建新用户，并为其分配相应的权限和角色。新用户可以用于访问数据库、执行查询、更新数据等操作，具体权限取决于管理员为用户分配的权限级别。

```sql
CREATE USER [IF NOT EXISTS] user_name
[WITH [PASSWORD='',]
[MUST_CHANGE_PASSWORD=true,]
[GRANTED_ADMIN=true,] [COMMENT = '']];
```

## `CREATE ROLE`

`CREATE ROLE` 用于创建新角色。

通过使用 `CREATE ROLE` 语句，管理员可以定义新的角色，并为这些角色分配相应的权限。角色在数据库中可以用于组织用户并授予一组特定的权限，从而简化权限管理和控制访问级别。





## `ALTER TENANT`

`ALTER TENANT` 用于修改租户（tenant）的属性或配置。

通过 `ALTER TENANT` 命令，可以对租户的属性进行修改，例如更改租户的配置、调整资源限制等。



## `ALTER USER`

`ALTER USER` 用于修改现有用户的语句。

通过使用 `ALTER USER` 语句，管理员可以更改用户的属性、权限和配置。这包括修改用户的密码、更改用户的角色、调整用户的权限等操作。



## `DROP TENANT`

DROP TENANT 用于删除租户（tenant）及其相关的数据和配置。

通过 `DROP TENANT` 命令，可以删除特定的租户，包括该租户拥有的所有数据、配置、用户等内容。

在执行 `DROP TENANT` 操作之前，通常需要谨慎考虑，因为该操作将永久删除租户及其所有相关数据。





## `DROP USER`

`DROP USER` 用于删除现有用户。

通过使用 `DROP USER` 语句，数据库管理员可以永久删除数据库中的特定用户，包括用户的登录凭证、权限和配置信息。

## `DROP ROLE`

`DROP ROLE` 用于删除现有角色。

通过使用 `DROP ROLE` 语句，管理员可以永久删除数据库中的特定角色，包括该角色所拥有的权限和配置信息。删除角色时，角色分配给用户的权限可能会被撤销。

## `GRANT`

`GRANT` 用于授予用户或角色权限。

通过使用 `GRANT` 命令，数据库管理员可以向用户或角色授予特定的权限，例如 `SELECT`、`INSERT`、`UPDATE`、`DELETE` 等。这样可以控制用户或角色对数据库对象的访问和操作权限。

## `RECOVER`

`RECOVER` 用于撤销删除数据库系统状态的过程。通常与 `DROP DATABASE` 一起使用。

