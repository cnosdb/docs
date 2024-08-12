---
sidebar_position: 12
---

# 其他函数

其他功能函数包括一些不属于以上分类的通用函数。

## arrow_cast

`arrow_cast` 的作用是将数据从一种类型转换为另一种类型。

## arrow_typeof

返回表达式的底层 [Arrow 数据类型](../data_type#支持的-arrow-类型)。

## current_user

返回当前数据库会话的用户名，通常用于确定当前用户执行操作时的身份。

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

