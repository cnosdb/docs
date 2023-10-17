---
title: 资源管理
order: 12
---

# 节点管理

CnosDB新增了资源管理功能，会对一些比较复杂、多步执行的资源操作进行监控，并且当操作失败时会进行重试，直到成功。

目前支持的资源操作：

```
DropTenant,
DropDatabase,
DropTable,
DropColumn,
AddColumn,
AlterColumn,
RenameTagName,
UpdateTagValue
```

可以通过查看RESOURCE_STATUS系统表来查看资源执行信息

```sql
SELECT * FROM information_schema.resource_status;
```

    +---------------------+------------+--------------+-----------+----------+---------+
    | time                | name       | action       | try_count | status   | comment |
    +---------------------+------------+--------------+-----------+----------+---------+
    | 2023-10-18 08:15:16 | cnosdb/db1 | DropDatabase | 0         | Schedule |         |
    +---------------------+------------+--------------+-----------+----------+---------+

其中comment会保存执行信息。