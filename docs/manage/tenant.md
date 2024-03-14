---
sidebar_position: 7
---

# 权限管理

本章节介绍 CnosDB 中设置和管理身份认证授权。

:::tip
若 CnosDB 在公开访问的端点上运行，强烈建议启用认证，否则数据将对任何未经身份验证的用户公开。
:::

CnosDB 中有初始的租户（cnosdb）和用户（root），如果需要开启身份认证，需要完成以下两步操作：

**第一步：为用户 root 设置密码。**

```sql
ALTER USER root SET PASSWORD='CnosDB#!';
```

**第二步：修改配置文件中的 `auth_enabled=true` ，并重启实例。**

admin 权限在 CnosDB 中分为两种：初始 admin 权限，被授予的 admin 权限。

- 拥有 admin 权限的用户可以将 admin 权限授予其他用户。
- 系统表 cluster_schema.users 中 is_admin=true，表示拥有 admin 权限。
- 系统表 cluster_schema.users 中的 user_options 的 granted_admin=true，表示被授予的 admin 权限
- 拥有 admin 权限的人可以回收其他人被赋予的 admin 权限
- 初始的 admin 权限不支持被回收（即 root 用户拥有的 admin 权限）



**为用户 dev 授予 admin 权限。**

```sql
alter user dev set granted_admin = true;
```

**撤销 dev 的 admin权限。**

```sql
alter user dev set granted_admin = false;
```

**租户**是 CnosDB 中共享相同数据库实例的独立组织或个体，每个租户拥有自己的数据和资源，与其他租户之间相互隔离。

**用户**是可以连接到数据库的账户，每个用户具有特定的权限，这些权限来源于租户下的角色。同一个账户可以在不同的组织下担任不同的职务，这映射的即是 CnosDB 中 租户，角色，和用户之间的关系。

**角色**是一组命名的权限集合，可以分配给用户。通过使用角色，可以方便地为用户分配预定义的权限。角色可以简化权限管理。

关于权限的更多操作，请参考 [数据控制语言](../reference/sql/dcl.md)

