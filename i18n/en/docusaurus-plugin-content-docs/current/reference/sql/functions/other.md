---
sidebar_position: 12
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

Returns the tenant name of the current database session.

```sql
SELECT current_tenant();
```

## current_role

The role of the current user in the current tenant (NULL will be returned if it does not exist)

```sql
SELECT current_role();
```

## current_database

Return the name of the current database operation.

```sql
SELECT current_database();
```

## @@cluster_name

Cluster name.

```sql
SELECT @@cluster_name;
```

## @@server_version

Server version.

```
SELECT @@server_version;
```

## @@deployment_mode

Deployment mode.

```sql
SELECT @@deployment_mode;
```

## @@node_id

Current node ID.

```sql
SELECT @@node_id;
```
