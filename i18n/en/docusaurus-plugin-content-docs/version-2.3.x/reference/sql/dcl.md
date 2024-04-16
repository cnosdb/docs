---
sidebar_position: 6
---

# 数据控制语言

是用来控制数据库用户访问权限。

只有拥有系统权限的用户才能添加用户和租户。

只有担任租户下 owner 角色的用户或拥有系统权限的用户才能添加租户下的角色，并赋予用户角色。

## `CREATE TENANT`

`CREATE TENANT` 用于在 CnosDB 中创建一个新的租户。CnosDB 允许单个实例同时为多个客户（即租户）提供服务，每个客户都被视为一个独立的租户。

```sql
CREATE TENANT [IF NOT EXISTS] tenant_name
[WITH [comment = <comment>],
       [_limiter = <limiter_config>]];
```

| Options    | Description                                             |
| ---------- | ------------------------------------------------------- |
| `_limiter` | 限制租户资源用量，详细内容请参考 [租户资源](../../manage/resource_limit.md) |

<details>
  <summary>查看示例</summary>

```sql
CREATE TENANT test;
```

</details>

## `CREATE USER`

`CREATE USER ` 用于创建新用户。

通过使用 `CREATE USER` 语句，管理员可以在 CnosDB 中创建新用户，并为其分配相应的权限和角色。新用户可以用于访问数据库、执行查询、更新数据等操作，具体权限取决于管理员为用户分配的权限级别。

```sql
CREATE USER [IF NOT EXISTS] user_name
[WITH [PASSWORD='',]
[MUST_CHANGE_PASSWORD=true,]
[RSA_PUBLIC_KEY='']
[GRANTED_ADMIN=true,] [COMMENT = '']];
```

| Options                | Description                           |
| ---------------------- | ------------------------------------- |
| `MUST_CHANGE_PASSWORD` | 第一次登录时是否需要更改密码，默认为 `false`。           |
| `GRANTED_ADMIN`        | 用户是否为 `admin` 用户，`admin` 用于整个实例的所有权限。 |
| `RSA_PUBLIC_KEY`       | 上传用户 `RSA` 算法的公钥，用于登录验证。              |

<details>
  <summary>查看示例</summary>

```sql
CREATE USER IF NOT EXISTS tester WITH PASSWORD='xxx', MUST_CHANGE_PASSWORD=true, COMMENT = 'test';
```

</details>

## `CREATE ROLE`

`CREATE ROLE` 用于创建新角色。

通过使用 `CREATE ROLE` 语句，管理员可以定义新的角色，并为这些角色分配相应的权限。角色在数据库中可以用于组织用户并授予一组特定的权限，从而简化权限管理和控制访问级别。

```sql
CREATE ROLE [IF NOT EXISTS] role_name INHERIT {owner | member};
```

| Options  | Description                             |
| -------- | --------------------------------------- |
| `owner`  | 租户下默认的角色，创建新角色时必需继承 `owner` 或 `member`。 |
| `member` | 租户下默认的角色，创建新角色时必需继承 `owner` 或 `member`。 |

<details>
  <summary>查看示例</summary>

```sql
CREATE ROLE owner_role INHERIT owner;
```

</details>

## `ALTER TENANT`

`ALTER TENANT` 用于修改租户（tenant）的属性或配置。

通过 `ALTER TENANT` 命令，可以对租户的属性进行修改，例如更改租户的配置、调整资源限制等。

```sql
ALTER TENANT tenant_name {SET sql_option | UNSET option_name };
    
sql_option: option_name = value
option: {COMMENT/_LIMITER}
```

| Options | Description  |
| ------- | ------------ |
| `SET`   | 为租户添加或修改属性。  |
| `UNSET` | 撤销租户内的配置或属性。 |

<details>
  <summary>查看示例</summary>

```sql
ALTER TENANT test SET COMMENT = 'abc';
```

</details>

## `ALTER USER`

`ALTER USER` 用于修改现有用户的语句。

通过使用 `ALTER USER` 语句，管理员可以更改用户的属性、权限和配置。这包括修改用户的密码、更改用户的角色、调整用户的权限等操作。

```sql
ALTER USER user_name {SET sql_option};

sql_option: option_name = option_value
option_name: {COMMENT | MUST_CHANGE_PASSWORD | PASSWORD | RSA_PUBLIC_KEY}
```

| Options | Description |
| ------- | ----------- |
| `SET`   | 为租户添加或修改属性。 |

<details>
  <summary>查看示例</summary>

```sql
ALTER USER tester SET PASSWORD = 'aaa';
```

</details>

## `DROP TENANT`

DROP TENANT 用于删除租户（tenant）及其相关的数据和配置。

通过 `DROP TENANT` 命令，可以删除特定的租户，包括该租户拥有的所有数据、配置、用户等内容。

在执行 `DROP TENANT` 操作之前，通常需要谨慎考虑，因为该操作将永久删除租户及其所有相关数据。

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

`DROP USER` 用于删除现有用户。

通过使用 `DROP USER` 语句，数据库管理员可以永久删除数据库中的特定用户，包括用户的登录凭证、权限和配置信息。

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

`DROP ROLE` 用于删除现有角色。

通过使用 `DROP ROLE` 语句，管理员可以永久删除数据库中的特定角色，包括该角色所拥有的权限和配置信息。删除角色时，角色分配给用户的权限可能会被撤销。

:::tip
当删除角色时，对应角色的租户成员的权限会被同时撤销。 然而，租户成员和其角色之间的绑定关系不会同步删除（即仅角色会失效）。
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
