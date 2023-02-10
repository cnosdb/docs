---
title: Database
order: 2
---

## **Create Database**

**Syntax**：
```sql
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options];

db_options:
    db_option ...

db_option: {
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```

#### Parameters Description

1. TTL： represents the saving time of the data file, defaults to 365 days, expressed in data with units. It supports day（d），hour（h），minute（m），such as TTL 10d，TTL 50h，TTL 100m.When no unit, the default is day, such as TTL 30.
2. SHARD：represents the number of data partitions，defaults to 1.
3. VNODE_DURATION：represents the time range of data in the shard，defaults to 365 days，and also expressed by data with units.Its data meaning is consistent with the value of TTL.
4. REPLICA：represents the number of replicas of data in the cluster，defaults to 1
5. PRECISION：The timestamp accuracy of the database. ms represents milliseconds, us represents microseconds, ns represents nanoseconds,defaults to ns.

**Example**：
```
> CREATE DATABASE oceanic_station;
Query took 0.062 seconds.
```

## Show All Databases
**Example**：

```sql
SHOW DATABASES;
```
    +-----------------+
    | Database        |
    +-----------------+
    | oceanic_station |
    | public          |
    +-----------------+
## **Use Database**
If you use the database through HTTP API, you can specify the parameter db=database_ name in the url to use the database.


If you use the database through HTTP API, you can specify the parameter db=database_ name in the url to use the database.
```sql
\c dbname
```
    public ❯ \c oceanic_station
    oceanic_station ❯

##  Drop Database
**Syntax**：
```sql
DROP DATABASE [IF EXISTS] db_name;
```
If dropping database, all table data and metadata of the specified database will be removed.

**Example**：
```sql
DROP DATABASE oceanic_station;
```
    Query took 0.030 seconds.

## **Alter Database Parameters**
```sql
ALTER DATABASE db_name [alter_db_options]

alter_db_options:
    SET db_option

db_option: {
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```
**Example**：
```sql
ALTER DATABASE oceanic_station SET TTL '30d';
```
## **Describe Database Parameters**
```sql
DESCRIBE DATABASE dbname;
```
**Example**：
```sql
DESCRIBE DATABASE oceanic_station;
```

    TTL,SHARD,VNODE_DURATION,REPLICA,PRECISION
    365 Days,1,365 Days,1,NS
