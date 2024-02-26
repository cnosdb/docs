---
sidebar_position: 7
---

# 租户和权限

以下所有操作都在CnosDB用户界面中进行。

## 租户与用户

CnosDB 提供了租户系统和用户系统。

- 只有拥有系统权限的用户才能添加用户和租户。

- 只有担任租户下owner角色的用户或拥有系统权限的用户才能添加租户下的角色，并赋予用户角色。

- CnosDB实例启动的时候，会默认创建一个租户`cnosdb`和一个用户`root`。

## 租户

### 查看租户

#### 示例

```sql
SELECT *
FROM cluster_schema.tenants;
```

    +-------------+---------------------------------------------------+
    | tenant_name | tenant_options                                    |
    +-------------+---------------------------------------------------+
    | cnosdb      | {"comment":"system tenant","limiter_config":null} |
    +-------------+---------------------------------------------------+

### 创建租户

**语法**

```sql
CREATE
TENANT [IF NOT EXISTS] tenant_name WITH [comment = ''];
```

**示例**

```sql
CREATE
TENANT test;
SELECT *
FROM cluster_schema.tenants;
```

    +-------------+---------------------------------------------------+
    | tenant_name | tenant_options                                    |
    +-------------+---------------------------------------------------+
    | test        | {"comment":null,"limiter_config":null}            |
    | cnosdb      | {"comment":"system tenant","limiter_config":null} |
    +-------------+---------------------------------------------------+

### 修改租户

**语法**
```sql
ALTER TENANT tenant_name {SET sql_option | UNSET option_name };
    
sql_option: option_name = value
option: {COMMENT}
```
SET 用来设置租户属性，属性只能为对应属性类型的常量

UNSET 删除租户属性

目前租户属性只有 COMMENT，对应属性类型为字符串类型，用单引号括起来


**示例**

```sql
ALTER TENANT test SET COMMENT = 'abc';
```

### 删除租户

**语法**

```sql 
DROP
TENANT tenant_name;
```

**示例**

```sql
DROP
TENANT test;
```

## 用户

### 查看用户

```sql
SELECT *
FROM cluster_schema.users;
```

    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | user_name | is_admin | user_options                                                                                    |
    +-----------+----------+-------------------------------------------------------------------------------------------------+
    | root      | true     | {"password":"*****","must_change_password":true,"rsa_public_key":null,"comment":"system admin"} |
    +-----------+----------+-------------------------------------------------------------------------------------------------+

### 创建用户

**语法**

```sql
USER [IF NOT EXISTS] user_name [WITH [PASSWORD='',] [MUST_CHANGE_PASSWORD=true,] [GRANTED_ADMIN=true,] [COMMENT = '']];
```

**示例**

```sql
CREATE
USER IF NOT EXISTS tester WITH PASSWORD='xxx', MUST_CHANGE_PASSWORD=true, COMMENT = 'test';
```

### 修改用户

#### 修改用户参数

**语法**

```sql
ALTER USER user_name {SET sql_option};

sql_option: option_name = option_value
option_name: {COMMENT | MUST_CHANGE_PASSWORD | PASSWORD}
```

option_value 只能是常量

COMMENT 的 option_value 类型为字符串
MUST_CHANGE_PASSWORD 的 option_value 类型为布尔
PASSWORD 的 option_value 类型为字符串

**示例**

```sql
ALTER USER tester SET PASSWORD = 'aaa';
ALTER USER tester SET MUST_CHANGE_PASSWORD = false;
ALTER USER tester SET COMMENT = 'bbb';
```

### 删除用户

**语法**

```sql
DROP
USER [IF EXISTS] user_name;
```

**示例**

```sql
DROP
USER IF EXISTS tester;
```

## Admin权限

- admin 权限分为两种
  * 初始的 admin 权限
  * 被授予的 admin 权限
- 支持拥有 admin 权限的人将 admin 权限授予其他人
- 系统表 cluster_schema.users 中 is_admin 字段标记是否拥有 admin 权限（包括初始的和被授予的）
- 系统表 cluster_schema.users 中的 user_options 的 granted_admin 为 true，表示被授予的 admin 权限
- 拥有 admin 权限的人可以回收其他人被赋予的 admin 权限
- 初始的 admin 权限不支持被回收（即 root 用户拥有的 admin 权限）

### 授予 admin 权限

**语法**

```sql
alter user <user_name> set granted_admin = true
```

**示例**

```sql
create user dev;
alter user dev set granted_admin = true;
```

### 撤销 admin 权限

**语法**

```sql
alter user <user_name> set granted_admin = false
```

**示例**
```sql
alter user dev set granted_admin = false;
```

### 查看 admin 权限

**示例**
```sql
select * from cluster_schema.users where user_name = 'dev';
```

    +-----------+----------+------------------------------------------------------------------------+
    | user_name | is_admin | user_options                                                           |
    +-----------+----------+------------------------------------------------------------------------+
    | dev       | true     | {"password":"*****","must_change_password":false,"granted_admin":true} |
    +-----------+----------+------------------------------------------------------------------------+

## 租户角色

租户下的角色分为系统角色和用户自定义角色。

- 系统角色：
  - Owner: 对租户有顶级权限，支持租户下的所有操作。
  - Member: 租户成员，可以浏览租户下的各种对象。

- 用户自定义角色：
  - 自定义角色需要继承系统角色。
  - 可以对自定义角色赋予多种权限。

### 查看角色

查看当前租户下的角色。

#### 示例

```sql
\c
information_schema
SELECT *
FROM roles;
```

    +------------+-----------+--------------+
    | role_name  | role_type | inherit_role |
    +------------+-----------+--------------+
    | owner      | system    |              |
    | member     | system    |              |
    +------------+-----------+--------------+

### 创建角色

只有DBA和tenant的owner角色可以创建角色，角色是属于tenant的。

**语法**

```sql
CREATE ROLE [IF NOT EXISTS] role_name INHERIT {owner | member};
```

**示例**
在当前租户下创建继承owner角色的owner_role角色。

```sql
CREATE ROLE owner_role INHERIT owner;
```

在当前租户下创建继承member角色的member_role角色。

```sql
CREATE ROLE member_role INHERIT member;
```

### 删除角色

**语法**

```sql
DROP ROLE role_name;
```

**示例**

```sql
DROP ROLE owner_role;
```

## 权限

可以使用`GRANT ...` 为租户下的角色赋予权限，使用`REVOKE ...`收回权限。

### 数据库的操作权限

目前权限的最小粒度是数据库。

| 权限名称  | 权限内容        |
|-------|-------------|
| read  | 对数据库读的权限    |
| write | 对数据库读写的权限   |
| all   | 对数据库增删改查的权限 |

### 赋予权限

**语法**

```sql
GRANT
{READ | WRITE | ALL} ON DATABASE database_name TO ROLE role_name;
```

**示例**

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

### 查看权限

#### 示例

```sql
\c
information_schema
SELECT *
FROM DATABASE_PRIVILEGES;
```

    +-------------+---------------+----------------+-----------+
    | tenant_name | database_name | privilege_type | role_name |
    +-------------+---------------+----------------+-----------+
    | cnosdb      | air           | Read           | rrr       |
    | cnosdb      | sea           | All            | rrr       |
    | cnosdb      | wind          | Write          | rrr       |
    +-------------+---------------+----------------+-----------+

**注意**

授予一个角色关于同一个数据库的权限，会覆盖之前的权限。

### 收回权限

**语法**

```sql
REVOKE {WRITE | READ | FULL} ON DATABASE database_name FROM role_name;
```

**示例**

```sql
-- 收回角色读取数据库air的权限
REVOKE READ ON DATABASE air FROM rrr;
```

### 修改权限

- ### 让用户担任某个租户下的角色

**语法**

```sql
ALTER
TENANT tenant_name ADD USER user_name AS role_name;
```

**示例**

```sql
CREATE
USER user_a;
ALTER
TENANT cnosdb ADD USER user_a AS rrr;
```

- #### 让用户不在担任租户下的角色

仅仅是用户不再担任租户的角色，角色不会被删除。

**语法**

```sql
ALTER
TENANT tenant_name REMOVE USER user_name;
```

```sql
ALTER
TENANT cnosdb REMOVE USER user_a;
```







