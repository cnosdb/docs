---
sidebar_position: 12
---

# Resource management

CnosDB has added resource management function, which will monitor some complex and multistep resource operations, and will retry when the operation fails until it succeeds.

Resource operations currently supported:

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
