---
sidebar_position: 7
---

# Permissions

This chapter introduces the setting and management of identity authentication authorization in CnosDB.

:::tip
If CnosDB is running on a public endpoint, it is strongly recommended to enable authentication, otherwise the data will be exposed to any unauthenticated users.
:::

CnosDB has an initial tenant (cnosdb) and user (root) and needs to open configuration: if you need to enable authentication

**Modify `auth_enabled=true` in the configuration file and start an instance.**

At this point, login with cnosdb-cli --user root --password and enter the default password.The default password for root users is 'root', Which can be changed by meta config file.
When authenticating is enabled, ust_change_password needs to be changed for true users, root defaults to true and false.

**Set a new password for user root.**

```sql
ALTER USER root SET PASSWORD='CnosDB#!';
```

**Modify `must_change_password=true`. Require you to change your password next time you log in to perform other actions properly.**

```sql
ALTER USER user1 SET must_change_password=true;
```

admin permissions are split into original admin permissions for the original: in CnosDB, granted to admin permissions.

- Users with admin permissions can grant admin permissions to other users.
- In the system table cluster_schema.users, is_admin=true indicates having admin permissions.
- If granted_admin is set to true for user_options in the cluster_schema.users system table, the admin permission is granted.
- A person with admin permission can reclaim admin permission granted to someone else.
- The initial admin permission cannot be reclaimed (that is, the admin permission of the root user).

**Grant admin permission to user dev.**

```sql
create user dev;
alter user dev set granted_admin = true;
```

**Revoke admin permission from user dev.**

```sql
alter user dev set granted_admin = false;
```

**Assign a role to the user**

> To add permissions to a role, please refer to [`GRANT`](../reference/sql/dcl#grant)

```sql
ALTER TENANT cnosdb ADD USER user_a AS rrr;
```

At this time, the user `user_a` is assigned the `rrr` role of the `cnsodb` tenant.

**Remove roles from users**

```sql
ALTER TENANT cnosdb REMOVE USER user_a;
```

At this time, user `user_a` loses the role `rrr` under the tenant `cnosdb`, and will no longer be able to access any information in the tenant.

**Tenant** is an independent organization or individual in CnosDB that shares the same database instance. Each tenant has its own data and resources, isolated from other tenants.

**User** is an account that can connect to the database, each user has specific permissions, these permissions come from the roles under the tenant.The same account can hold different roles in different organizations, which maps to the relationship between tenants, roles, and users in CnosDB.

**Role** is a named set of permissions that can be assigned to users.By using roles, it is easy to assign predefined permissions to users.Roles can simplify permission management.

For more operations on permissions, please refer to [Data Control Language](../reference/sql/dcl.md)