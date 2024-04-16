---
sidebar_position: 7
---

# Permissions

This chapter introduces the setting and management of identity authentication authorization in CnosDB.

:::tip
If CnosDB is running on a public endpoint, it is strongly recommended to enable authentication, otherwise the data will be exposed to any unauthenticated users.
:::

CnosDB instance starts with a tenant `cnosdb` and a user `root` by default.

**Step 1: Set the password for user root.**

```sql
ALTER USER root SET PASSWORD='CnosDB#!';
```

**Step 2: Modify the `auth_enabled=true` in the configuration file and restart the instance.**

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

**Tenant** is an independent organization or individual in CnosDB that shares the same database instance. Each tenant has its own data and resources, isolated from other tenants.

**User** is an account that can connect to the database, each user has specific permissions, these permissions come from the roles under the tenant.The same account can hold different roles in different organizations, which maps to the relationship between tenants, roles, and users in CnosDB.

**Role** is a named set of permissions that can be assigned to users.By using roles, it is easy to assign predefined permissions to users.Roles can simplify permission management.

For more operations on permissions, please refer to [Data Control Language](../reference/sql/dcl.md)
