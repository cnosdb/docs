---
sidebar_position: 9
---

# Resource Management

CnosDB has added resource management functionality, which will monitor some complex and multi-step resource operations, and will retry when the operation fails until successful.

Resource operations currently supported:

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

You can view the resource execution information by viewing the RESOURCE_STATUS system table:

```sql
SELECT * FROM information_schema.resource_status;
+---------------------+------------+--------------+-----------+----------+---------+
| time                | name       | action       | try_count | status   | comment |
+---------------------+------------+--------------+-----------+----------+---------+
| 2023-10-18 08:15:16 | cnosdb/db1 | DropDatabase | 0         | Schedule |         |
+---------------------+------------+--------------+-----------+----------+---------+
```

Comment will save the execution information.
