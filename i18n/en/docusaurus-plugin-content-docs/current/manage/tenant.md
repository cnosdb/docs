---
sidebar_position: 8
---

# Tenant and Permission

All the following operations are performed in the CnosDB Cli.

## Tenant and User

CnosDB provides a tenant system and a user system.

- Only users with system permissions can add users and tenants.

- Only a user who holds the role of owner under a tenant or a user with system permissions can add a role under a tenant and give a user a role.

- CnosDB instance starts with a tenant `cnosdb` and a user `root` by default.

## Tenant

### View Tenant

#### Example

```sql
SELECT *
FROM cluster_schema.tenants;
```

```
+-------------+---------------------------------------------------+
| tenant_name | tenant_options                                    |
+-------------+---------------------------------------------------+
| cnosdb      | {"comment":"system tenant","limiter_config":null} |
+-------------+---------------------------------------------------+
```

### Create Tenant

**Syntax**

```sql
CREATE
TENANT [IF NOT EXISTS] tenant_name WITH [comment = ''];
```

Drop Tenant

_limiter： limits Tenant resource usage, see[租户资源](./resource_limit.md)

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

SET is used to set tenant properties. Properties can only be constants of the corresponding attribute type.

UNSET deletes vstore attributes.

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

When not with AFTER, it will be deleted immediately.

When with AFTER, it is delayed deletion, which will be deleted after the specified time. The time supports days (d), hours (h), and minutes (m), such as 10d, 50h, 100m. When there is no unit, the default is day. The tenant is not visible and unavailable during the delayed deletion period.Tenants are not visible and unavailable during the delay in deletion.
The AFTER priority is higher than the option’s DROP_AFTER.

#### Syntax

```sql
RECOVERTN tenant_name;
```

Delay deletion is cancelled and the tenant returns to normal.

**Notice**: Only resources that are delayed deletion and during the delayed deletion period can be recovered by executing the RECOVER statement.

**Example**

```sql
DROP TENANT est AFTER '7d';

RECOVER TENANT test;

DRROP TENANT test;
```

## User

### Show User

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
CREATE
USER [IF NOT EXISTS] user_name [WITH [PASSWORD='',] [MUST_CHANGE_PASSWORD=true,] [COMMENT = '']];
```

**Example**

```sql
CREATE
USER IF NOT EXISTS tester WITH PASSWORD='xxx', MUST_CHANGE_PASSWORD=true, COMMENT = 'test';
```

### Alter User

#### Alter User Parameters

**Syntax**

```sql
ALTER
ALTER USER user_name {SET sql_option};
sql_option: option_name = option_value
option_name: {COMMENT | MUST_CHANGE_PASSWORD | PASSWORD}
```

option_value is constant.

COMMENT option_value type is string.
MUST_CHANGE_PASSWORD option_value type is boolean.
PASSWORD option_value type is string.

**Example**

```sql
ALTER USER tester SET PASSWORRD = 'aaa';
ALTER USER tester SET MUST_CHANGE_PASSWORD = false;
ALTER USER SET COMMENT = 'bbb';
```

### Drop User

**Syntax**

```sql
DROP
USER [IF EXISTS] user_name;
```

**Example**

```sql
DROP
USER IF EXISTS tester;
```

## Admin Permission

- There are two types of admin permissons:
  - Initial admin permission
  - Admin permission granted
- Support people who have admin permissions to grant admin permissions to others.
- Whether the is_admin field in the system table cluster_schema.users has admin permissions(both initial and granted).
- If granted_admin is set to true for user_options in the cluster_schema.users system table, the admin permission is granted.
- A person with admin permission can reclaim admin permission granted to someone else.
- The initial admin permission cannot be reclaimed (that is, the admin permission of the root user).

### Grant Admin Permission

**Syntax**

```sql
alter user <user_name> set granted_admin = true
```

**Example**

```sql
create user dev;
alter user dev set granted_admin = true;
```

### Revoke admin Permission

**Syntax**

```sql
alter user <user_name> set granted_admin = false
```

**Example**

```sql
alter user dev set granted_admin = false;
```

### View Admin Permission

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

The roles under the tenant are divided into system roles and user-defined roles.

- System roles:
  - Owner: This has top-level permissions on the tenant and supports all actions under the tenant.
  - Member: A tenant member that can browse various objects under a tenant.

- User-defined roles:
  - Custom roles need to inherit from system roles.
  - Multiple permissions can be given to custom roles.

### Show Role

View the roles under the current tenant.

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

Only DBA and the owner of tenant can creat a new role, the new role is belonged to tenant.

**Syntax**

```sql
CREATE ROLE [IF NOT EXISTS] role_name INHERIT {owner | member};
```

Create the owner_role under the current tenant that inherits from the owner role.

```sql
CREATE ROLE owner_role INHERIT owner;
```

Create the member_role role that inherits from the member role under the current tenant.

```sql
CREATE ROLE member_role INHERIT member;
```

### Drop Role

**Syntax**

```sql
DROLE ROLE role_name;
```

**Example**

```sql
DROLE owner_role;
```

**Note** the relationship between： tenant members and their roles is maintained by name.

Currently, the only tenant attribute is COMMENT, which is a string and enclosed in single quotation marks.
However, the binding relationship between the tenant member and his or her role will not be deleted simultaneously (i.e. only the role will lapse).

## Permission

You can use `GRANT... ` To give permissions to roles under the tenant, use `REVOKE... ` Revoke permissions.

### Database Permission

The current smallest granularity of permissions is the database.

| Name  | Content                                 |
| ----- | --------------------------------------- |
| read  | Permission of reading from the database |
| write | Permission of writing to the database   |
| all   | All permission of the database          |

### Grant Permission

**Syntax**

```sql
GRANT
{READ | WRITE | ALL} ON DATABASE database_name TO ROLE role_name;
```

**Example**

```sql
-- create a member rrr
CREATE ROLE rrr INHERIT member;

-- grant read permission of database air to rrr
GRANT
READ
ON DATABASE air TO ROLE rrr;
    
-- grant write permission of database wind to rrr
GRANT WRITE
ON DATABASE wind TO ROLE rrr;
    
-- grant all permission of database sea to rrr
GRANT ALL
ON DATABASE sea TO ROLE rrr;
```

### Show Permission

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

**Notice**

Granting permissions to a role on the same database overwrites previous permissions.

### Revoke Permission

**Syntax**

```sql
REVOKE {WRITE | READ | FULL} ON DATABASE database_name FROM role_name;
```

**Example**

```sql
-- revoke read permission of database air from rrr
REVOKE READ ON DATABASE air FROM rrr;
```

### Tenant and Permission

- ### Alter a User With a Role Under a Tenant

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

- #### Alter the User Out of the Role Under the Tenant

The role will not be removed only if the user no longer holds the role of tenant.

**Syntax**

```sql
ALTER
TENANT tenant_name REMOVE USER user_name;
```

```sql
ALTER
TENANT cnosdb REMOVE USER user_a;
```
