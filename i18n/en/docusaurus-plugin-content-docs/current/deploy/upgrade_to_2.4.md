---
sidebar_position: 5
---

# 迁移至企业版 2.4 最佳实践

> 前置条件：已经搭建好 CnosDB 2.4 企业版集群
>
> 本文档同样适用于社区版本单机和集群

1. 导出 2.3 集群的 DDL

> 1) 如果还有其他租户，请更换`tenant`参数租户并多次执行（可是使用 `SELECT * FROM cluster_schema.tenants;` 检查）
> 2) 如果用户没有绑定角色，则不能导出，需要手动创建（可以使用`SELECT * FROM cluster_schema.users;`和导出的文件对比检查）
> 3) 创建用户可以参考 https://docs.cnosdb.com/docs/reference/sql/dcl#create-user
> 4) 密码无法手动导出导入，需要重新修改密码，可以参考 https://docs.cnosdb.com/docs/manage/tenant

```
cnosdb-cli dump-ddl --tenant cnosdb > tenant_cnosdb.sql
```

2. 启动单机版实例，用于存放迁移期间数据

```
docker run -d -p 8902-8905:8902-8905 cnosdb/cnosdb:community-latest
```

3. 导入 DDL 到单机版实例

将第一步中导出的 .sql 文件恢复至单机版实例

如果还有其他租户，请更换`tenant`参数并多次执行

```
cnosdb-cli restore-dump-ddl -t cnosdb tenant_cnosdb.sql
```

4. 切换流量到单机版实例

根据用户环境自行操作

5. 导出 2.3 集群中的数据

这是一个同步命令，如果想在后台（nohup）执行可以使用 cnosdb-cli --file 指定sql文件，

cnosdb-cli --database benchmark --tenant cnosdb --file load.sql

⚠️ 每个表的导出路径要不同

```
COPY INTO 'file:///var/lib/backup/benchmark/diagnostics'
FROM "diagnostics"
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```

成功后，返回如下结果，请记住 rows 的值，设置导入的数据条数，用于之后导入验证数据是否完整：

```
benchmark ❯ COPY INTO 'file:///var/lib/backup/benchmark/diagnostics'
FROM "diagnostics"
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
+-----------+
| rows      |
+-----------+
| 575416055 |
+-----------+
Query took 1160.660 seconds.
```

6. 导入 DDL 至 2.4 集群

同 第三步 一样

7. 新集群导入数据

路径尾部一定要追加一个`/`，否则系统找不到路径

同 导出数据一样，也可以通过 sql 文件的方式后台导入

```
COPY INTO "diagnostics"
FROM 'file:///var/lib/backup/benchmark/diagnostics/'
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```

8. 验证数据正确性

导入导出都会提示数据条数，请对比，如下

```
benchmark ❯ COPY INTO "diagnostics"
FROM 'file:///var/lib/backup/benchmark/diagnostics/'
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
+-----------+
| rows      |
+-----------+
| 575416055 |
+-----------+
```

9. 切换流量到 2.4 集群
10. 将单机实例中的数据导出，并导入到新集群（请参照第5, 7步）

