---
sidebar_position: 9
---

# Resource management

CnosDB adds resource management features to monitor some more complex and multi-step resource operations and retries when the operation fails.

Currently supported resource action：

```
DropTenant,
DropDatabase,
Droptable,
DropColumn,
AddColumn,
Alternate,
RenameTagName,
UpdateTagValue
```

Can view resource execution by viewing RESOURCE_STATUS tables

```sql
SELECT * FROM information_schema.resource_status;
+---------------------+------------+--------------+-----------+----------+---------+
| time                | name       | action       | try_count | status   | comment |
+---------------------+------------+--------------+-----------+----------+---------+
| 2023-10-18 08:15:16 | cnosdb/db1 | DropDatabase | 0         | Schedule |         |
+---------------------+------------+--------------+-----------+----------+---------+
```

This comment will save the implementation information.
