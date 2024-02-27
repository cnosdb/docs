---
sidebar_position: 7
---

# Tenant and Permissions

All of the following actions are performed in the CnosDB user interface.

## Tenant and user

CnosDB provides both the Tenant System and the User System.

- Only users with system permissions can add users and tenants.

- Only users who are in the Tenant Owner role or who have system permissions can add roles under the Tenant and assign roles to the user.

- When CnosDB instance starts by default, a tenant `cnosdb` and a user `root`.

## Tenant

### View Tenant

#### Example

```sql
SELECT *
FROM cluster_schema.tenants;
```

```
+-------------+-----------------------------------------------------------------------------------------+
| tenant_name | tenant_options                                                                          |
+-------------+-----------------------------------------------------------------------------------------+
| cnosdb      | {"comment":"system tenant","limiter_config":null,"after":null,"tenant_is_hidden":false} |
+-------------+-----------------------------------------------------------------------------------------+
```

### Create Tenant

**Syntax**

```sql
CREATE TENANT [IF NOT EXISTS] tenant_name
[WITH [comment = <comment>],
       [drop_after = duration],
       [_limiter = <limiter_config>]];
```

drop_after：denotes a delay in deleting, by default and immediate, using unit data, supporting days (d), hours (h), minutes (m), such as 10d,50h,100m, when not in unit, by day such as 30.

_limiter： limits Tenant resource usage, see[租户资源](./resource_limit.md)

**Example**

```sql
CREATE
TENANT test;
SELECT *
FROM cluster_schema.tenants;
```

```
+-+
| tenant_name | tenant_options |
+------------- +
| {Comment":null, "limiter_config", "after":null, "tenant_is_hidden": false} |
+++-hidden": false} |
| cnosdb {"Comment": "system tenant", "limiter_config":null, "after": null,"
```

### Modify tenant

**Syntax**

```sql
ALTER TENANT tenant_name {SET sql_option | UNSET option_name };
    
sql_option: option_name = value
option: {Same T/DROP_AFTER/_LIMITER}
```

SET is used to set tenant properties. Attributes can only be constant of attribute type

UNTT delete tenant properties

The current tenant attribute supports：MEDT, the corresponding attribute type is STRING, with a single quote; DROP_AFTER, the corresponding attribute type is STRING, with a single quote;
_LIMITER, the corresponding attribute type is STRING, with a single quotation number, for more information about[租户资源限制](../manage/resource_limit.md).

**Example**

```sql
ALTER TENANT test SET COMMENT = 'abc';
```

### Remove Tenant

**Syntax**

```sql
DROP TENNT tenant_name [AFTER '7d'];
```

Delete without AFTER

In case of delay deletion, delete will be deleted after the specified time, supported by days (d), hours (h), minutes (m), such as 10d,50h,100m, default is day when unit is not involved.Tenants are not visible and unavailable during the delay in deletion.
The AFTER priority is higher than the option’s DROP_AFTER.

#### Syntax

```sql
RECOVERTN tenant_name;
```

Delay in deleting cancelling and returning tenants to normal status.

**NOTE**：works only if you have a resource that is deleted late and if you do a RECOVER.

**Example**

```sql
DROP TENANT est AFTER '7d';

RECOVER TENANT test;

DRROP TENANT test;
```

## User

### View User

```sql
SELECT *
FROM cluster_schema.users;
```

```
+-----------+----------+-------------------------------------------------------------------------------------------------+
| user_name | is_admin | user_options                                                                                    |
+-----------+----------+-------------------------------------------------------------------------------------------------+
| root      | true     | {"password":"*****","must_change_password":true,"rsa_public_key":null,"comment":"system admin"} |
+-----------+----------+-------------------------------------------------------------------------------------------------+
```

### Create User

**Syntax**

```sql
USER [IF NOT EXISTS] user_name [WASSWORD=',] [MUST_CHANGE_PASSORD=true,] [GRANTED_ADMIN=true,] [COMMENT = ']];
```

**Example**

```sql
CREATE
USER IF NOT EXISTS tester WITH PASSWORD='xxx', MUST_CHANGE_PASSWORD=true, COMMENT = 'test';
```

### Modify User

#### Edit User Parameter

**Syntax**

```sql
ALTER USER user_name {SET sql_option};

sql_option: option_name = option_value
option_name: {COMMENT | MUST_CHANGE_PASSWORD | PASSWORD}
```

option_value can only be constant

The COMMENT option_value type is string
MUST_CHANGE_PASSWORD option_value type is the prop
PASWARD option_value type string

**Example**

```sql
ALTER USER tester SET PASSWORRD = 'aaa';
ALTER USER tester SET MUST_CHANGE_PASSWORD = false;
ALTER USER SET COMMENT = 'bbb';
```

### Delete user

**Syntax**

```sql
DROP USER [IF EXISTS] user_name;
```

**Example**

```sql
DROP USER IF EXISTS test;
```

## Admin Permissions

- admin permissions are split to employees
  - Initial admin permissions
  - granted admin permissions
- Those who have admin permissions are supported to grant admin permissions to others
- Whether the is_admin field tag in the system cluster_schema.users has admin permissions (including initial and granted)
- The user_options in the system cluster_schema.user's are granted_admin true for admin granted
- People with admin permissions can recover admin permissions granted to others
- Initial admin permissions do not support recovery (admin permissions owned by root user)

### Grant admin permission

**Syntax**

```sql
alter user <user_name> set granted_admin = true
```

**Example**

```sql
create user dev;
alter user dev set granted_admin = true;
```

### Revoke admin permissions

**Syntax**

```sql
alter user <user_name> set granted_admin = false
```

**Example**

```sql
alter user dev set granted_admin = false;
```

### View admin permissions

**Example**

```sql
Select * from cluster_schema.users where user_name = 'dev';
```

```
+---+
| user_name | is_admin | user_user_options |
+--------------------------------------------------------------------- +
ev | {"password": "***", "must_change_password":false, "granted_admin"admin": true} |
+---------------------------------------------+ + + +
```

## Tenant role

Tenant roles are divided into system and user customized roles.

- System Role：
  - Owner: Have top level access to tenants to support all operations under the tenant.
  - Member: Tenant members, can view various objects under the tenant.

- User custom role：
  - Custom roles need to inherit system roles.
  - You can assign multiple permissions to custom roles.

### View Roles

View roles under the current tenant.

#### Example

```sql
\c
information_schema
SELECT *
FROM roles;
```

```
+----------------------------------- ----- +
| role_name | role_type | inherit_role |
+---+
| owner | system |
|
+-+--- + + + + + +
```

### Create Role

Only DBA and tenant’s owner roles can create roles, which are tenant.

**Syntax**

```sql
CREATE ROLE [IF NOT EXISTS] role_name INHERIT {owner | member};
```

**Example**
to create a owner_role role under the current tenant.

```sql
CREATE ROLE owner_role INHERIT owner;
```

Creates the member_role role of inherited member under the current tenant.

```sql
CREATE ROLE member_role INHERIT member;
```

### Delete Role

**Syntax**

```sql
DROLE ROLE role_name;
```

**Example**

```sql
DROLE owner_role;
```

**Note** the relationship between： tenant members and their roles is maintained by name.

When the role is removed, the rights of the tenant member of the corresponding role are revoked at the same time.
However, the binding relationship between the tenant member and his or her role will not be deleted simultaneously (i.e. only the role will lapse).

## Permissions

Use `GGRANT ...` to grant permissions for roles under the tenant, use `REVOKE ...` to reclaim permission.

### Database permissions

The minimum particle size of the current permissions is the database.

| Permissions Name | Permission Content                            |
| ---------------- | --------------------------------------------- |
| read             | Permission to read database                   |
| write            | Permission to read and write to database      |
| all              | Adds permission to delete changes to database |

### Grant permissions

**Syntax**

```sql
GRANT
{READ | WRITE | ALL} ON DATABASE database_name TO ROLE role_name;
```

**Example**

```sql
-- 创建一个角色rrr
CREATE ROLE rrr INHERIT member;

-- 授予角色rrr读取数据库air的权限
GRANT
READ
ON DATABASE air TO ROLE rrr;
    
-- 授予角色rrr读写数据库wind的权限
GRANT WRITE
ON DATABASE wind TO ROLE rrr;
    
-- 授予角色rrr关于数据库sea的所有权限
GRANT ALL
ON DATABASE sea TO ROLE rrr;
```

### View permissions

#### Example

```sql
\c
information_schema
SELECT *
FROM DATABASE_PRIVILEGES;
```

```
+-------------+---------------+----------------+-----------+
| tenant_name | database_name | privilege_type | role_name |
+-------------+---------------+----------------+-----------+
| cnosdb      | air           | Read           | rrr       |
| cnosdb      | sea           | All            | rrr       |
| cnosdb      | wind          | Write          | rrr       |
+-------------+---------------+----------------+-----------+
```

**Note**

Grant a role permission for the same database that will override the previous permissions.

### Retrieving permissions

**Syntax**

```sql
REVOKE {WRITE | READ | FULL} ON DATABASE database_name FROM role_name;
```

**Example**

```sql
-- 收回角色读取数据库air的权限
REVOKE READ ON DATABASE air FROM rrr;
```

### Modify permissions

- ### Ask users to play a role under a tenant

**Syntax**

```sql
ALTER
TENANT tenant_name ADD USER user_name AS role_name;
```

**Example**

```sql
CREATE
USER user_a;
ALTER
TENT cnosdb ADD USER user_a AS rrrrr;
```

- #### Do not play a role as a tenant

Only users no longer act as tenants, roles will not be deleted.

**Syntax**

```sql
ALTER
TENANT tenant_name REMOVE USER user_name;
```

```sql
ALTER
TENANT cnosdb REMOVE USER user_a;
```
