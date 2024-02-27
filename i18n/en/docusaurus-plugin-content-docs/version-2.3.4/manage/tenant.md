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
+----- +
| tenant_name | tenant_options |
+------------------+
| cnosdb | {"comment": "system tenant", "limiter_config":n} |
+---+ + +
```

### Create Tenant

**Syntax**

```sql
CREATE
TENANT [IF NOT EXISTS] tenant_name WITH [comment = '];
```

**Example**

```sql
CREATE
TENANT test;
SELECT *
FROM cluster_schema.tenants;
```

```
+-------------+---------------------------------------------------+
| tenant_name | tenant_options                                    |
+-------------+---------------------------------------------------+
| test        | {"comment":null,"limiter_config":null}            |
| cnosdb      | {"comment":"system tenant","limiter_config":null} |
+-------------+---------------------------------------------------+
```

### Modify tenant

**Syntax**

```sql
ALTER TENANT tenant_name {SET sql_option | UNSET option_name };
    
sql_option: option_name = value
option: {COMMENT}
```

SET is used to set tenant properties. Attributes can only be constant of attribute type

UNTT delete tenant properties

Current Tenant Attribute is only contingent and the corresponding attribute type is a string type, with a single quotation mark

**Example**

```sql
ALTER TENANT test SET COMMENT = 'abc';
```

### Remove Tenant

**Syntax**

```sql
DROP
TENANT tenant_name;
```

**Example**

```sql
DROP
TENANT test;
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
DROP
USER [IF EXISTS] user_name;
```

**Example**

```sql
DROP
USER IF EXISTS test;
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
