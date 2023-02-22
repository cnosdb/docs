---
title: 租户与用户
order: 12
---

CnosDB 提供了租户系统和用户系统

- 只有拥有系统权限的用户才能添加添加用户和租户。

- 只有担任租户下owner角色的用户或拥有系统权限的用户才能添加租户下的角色，并赋予用户角色

- CnosDB实例启动的时候，会默认创建一个租户`cnosdb`和一个用户`root`。

## 租户

### 查看租户

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

**语法**:

```sql
CREATE
TENANT [IF NOT EXISTS] tenant_name [WITH comment = ''];
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

**示例**

```sql
ALTER
TENANT test SET COMMENT = 'abc';
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
CREATE
USER [IF NOT EXISTS] user_name [WITH [PASSWORD='',] [MUST_CHANGE_PASSWORD=true,] [COMMENT = '']];
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
ALTER
USER user_name SET {PASSWORD = ''| MUST_CHANGE_PASSWORD = {true | false}| COMMENT = ''} = 
```

**示例**

```sql
ALTER
USER tester SET PASSWORD = 'aaa';
ALTER
USER tester SET MUST_CHANGE_PASSWORD = false;
ALTER
USER tester SET COMMENT = 'bbb';
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

