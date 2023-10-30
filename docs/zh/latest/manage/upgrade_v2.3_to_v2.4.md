---
title: V2.3->V2.4升级过程
order: 14
---
## 跨集群迁移数据
CnosDB在从V2.3升级到V2.4时，由于重构优化等带来版本间数据格式、通信协议不兼容，导致需要跨集群迁移数据。跨集群数据迁移可以采取按照Table进行导入导出的方式，由于CnosDB集群还包括Meta数据也需要迁移。

### 迁移meta数据

- #### 导出meta数据
    向meta发送http请求导出meta数据。

    - Meta单独部署时有提供数据导出接口：http://ip:port/dump
    - CnosDB服务单实例运行时有提供接口：http://ip:port/debug
    
    上述两者导出数据一致，只是格式略有不同。需要将单实例导出数据进行规整：用文本编辑器打开，删除第一行以及最后一行数据，以及每行开头的‘* ’，Meta单独部署时忽略此步骤。

```shell
   # Meta单独部署
   curl -XGET http://ip:port/dump -o ./meta_dump.data  # ip:port为旧集群meta服务的地址

   # CnosDB单实例运行
   curl -XGET http://ip:port/debug -o ./meta_dump.data  # ip:port为meta服务的地址

```

- #### 数据过滤
1. 集群自身信息、buckets相关信息等不需要迁移到目的集群，需要人工过滤。
2. 过滤方式：用文本编辑器打开上面导出的文件，删除下面列表中相应key。
```txt
   需要过滤删除的key列表：
   /data_version
   /already_init_key
   /cluster_xxx/auto_incr_id
   /cluster_xxx/data_nodes/1001
   /cluster_xxx/data_nodes/111
   /cluster_xxx/data_nodes_metrics/1001
   /cluster_xxx/tenants/xxx/yyy/zzz/buckets
```

3. 修改Database对应的schema：增加db_is_hidden字段
```txt
例如：
/cluster_xxx/tenants/cnosdb/dbs/public: {"tenant":"cnosdb","database":"public","config":{"ttl":null,"shard_num":null,"vnode_duration":null,"replica":null,"precision":null}
修改为：
/cluster_xxx/tenants/cnosdb/dbs/public: {"tenant":"cnosdb","database":"public","config":{"ttl":null,"shard_num":null,"vnode_duration":null,"replica":null,"precision":null,"db_is_hidden":false}}
```
4. 修改Tenant对应的schema：增加db_is_hidden字段
```txt
例如：
/cluster_xxx/tenants/cnosdb: {"id":34967873693446849787034438314352008249,"name":"cnosdb","options":{"comment":"system tenant","limiter_config":null}}
修改为：
/cluster_xxx/tenants/cnosdb: {"id":34967873693446849787034438314352008249,"name":"cnosdb","options":{"comment":"system tenant","limiter_config":null,"tenant_is_hidden":false}}
```

- #### 导入新集群：
  将过滤过的Meta导出数据文件恢复到新集群

```shell
   curl -XPOST http://ip:port/restore --data-binary "@./meta_dump.data"  # ip:port为新集群的meta服务的地址
```

### 迁移data数据
迁移Data数据按照上面的导入、导出过程；遍历所有表即可。

- #### 按照table导出数据

```sql
    COPY INTO 'file:///tmp/xxx' FROM table_name FILE_FORMAT = (TYPE = 'PARQUET');
```

- #### 将导出数据导入新集群

```sql
    COPY INTO table_name FROM 'file:///tmp/xxx/' FILE_FORMAT = (TYPE = 'PARQUET', DELIMITER = ',');
```

