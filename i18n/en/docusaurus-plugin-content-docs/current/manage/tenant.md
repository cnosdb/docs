---
sidebar_position: 8
---

# Admin Permission

本章节介绍 CnosDB 中设置和管理身份认证授权。

:::tip
若 CnosDB 在公开访问的端点上运行，强烈建议启用认证，否则数据将对任何未经身份验证的用户公开。
:::

CnosDB instance starts with a tenant `cnosdb` and a user `root` by default.

\*\*第一步：为用户 root 设置密码。**Example**

```sql
ALTER USER root SET PASSWORD='CnosDB#!';
```

\*\*第二步：修改配置文件中的 `auth_enabled=true` ，并重启实例。**Example**

Initial admin permission

- Support people who have admin permissions to grant admin permissions to others.
- Whether the is_admin field in the system table cluster_schema.users has admin permissions(both initial and granted).
- If granted_admin is set to true for user_options in the cluster_schema.users system table, the admin permission is granted.
- A person with admin permission can reclaim admin permission granted to someone else.
- The initial admin permission cannot be reclaimed (that is, the admin permission of the root user).

Admin permission granted**Example**

```sql
create user dev;
alter user dev set granted_admin = true;
```

Revoke admin Permission**Example**

```sql
alter user dev set granted_admin = false;
```

**租户**是 CnosDB 中共享相同数据库实例的独立组织或个体，每个租户拥有自己的数据和资源，与其他租户之间相互隔离。

**Example** DROP ROLE owner_role; Permission You can use `GRANT... ` To give permissions to roles under the tenant, use `REVOKE... ` Revoke permissions. Database Permission The current smallest granularity of permissions is the database. Name Content read Permission of reading from the database write Permission of writing to the database all All permission of the databaseCnosDB provides a tenant system and a user system. Only users with system permissions can add users and tenants. Only a user who holds the role of owner under a tenant or a user with system permissions can add a role under a tenant and give a user a role. Tenant

**角色**是一组命名的权限集合，可以分配给用户。通过使用角色，可以方便地为用户分配预定义的权限。角色可以简化权限管理。

关于权限的更多操作，请参考 [数据控制语言](../reference/sql/dcl.md)
