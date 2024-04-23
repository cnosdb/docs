---
sidebar_position: 10
---

# Other Functions

Other functional functions include some general functions that do not belong to the above categories.

## arrow_cast

The purpose of `arrow_cast` is to convert data from one type to another type.

## arrow_typeof

Return the underlying [Arrow data type](../data_type#supported-arrow-types) of the expression.

## current_user

Returns the username of the current database session, typically used to determine the identity of the current user performing operations.

```sql
SELECT current_user();
```

## current_tenant

返回当前数据库会话的租户名。

```sql
SELECT current_tenant();
```

## current_role

当前用户在当前租户下的角色(不存在会返回NULL)

```sql
SELECT current_role();
```

## current_database

返回当前操作的数据库名称。

```sql
SELECT current_database();
```

## @@cluster_name

集群名称。

```sql
SELECT @@cluster_name;
```

## @@server_version

服务器版本。

```
SELECT @@server_version;
```

## @@deployment_mode

部署模式。

```sql
SELECT @@deployment_mode;
```

## @@node_id

当前节点 ID。

```sql
SELECT @@node_id;
```
