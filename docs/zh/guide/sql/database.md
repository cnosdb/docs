---
title: 数据库
icon: config
order: 2
---

## **创建数据库**

语法：
```sql
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options]

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
### 参数说明
1. TTL： 表示数据文件保存的时间，默认为365天，用带单位的数据表示，支持天（d），小时（h），分钟（m），如TTL 10d，TTL 50h，TTL 100m，当不带单位时，默认为天，如TTL 30
2. SHARD：表示数据分片个数，默认为1
3. VNODE_DURATION：表示数据在shard中的时间范围，默认为365天，同样使用带单位的数据来表示，数据意义与TTL的value一致
4. REPLICA： 表示数据在集群中的副本数，默认为1
5. PRECISION：数据库的时间戳精度，ms 表示毫秒，us 表示微秒，ns 表示纳秒，默认为ns纳秒

## 删除数据库
```sql
DROP DATABASE [IF EXISTS] db_name
```
## **修改数据库参数**
```sql
todo!()
```

## **查看系统中所有数据库**

## **显示一个数据库的创建语句**

## **查看数据库参数**