---

title: 分级存储
order: 5

---

:::tip
仅企业版支持
:::

在实际的业务场景中一台机器上会同时有多块数据盘，需要把这些盘的能力都充分发挥出来提高系统的吞吐， 
还有一种场景是同一台或者多台机器上的多块数据盘使用的是不同存储介质，客户希望把不经常访问的冷数据淘汰到廉价的存储介质来降低企业存储的成本。
在CnosDB中我们通过如下的方案解决这两种场景：

# 分级存储

在CnosDB集群中数据迁移的基本单元是Vnode。企业版CnosDB集群提供如下的命令支持分级存储： 

```SQL
SHOW DATANODES;                          // 查看节点信息
+---------+------------------------+-----------+---------+-----------+------------+---------------------+
| NODE_ID | HOST                   | ATTRIBUTE | STATUS  | DISK_FREE | DISK_TOTAL | LAST_UPDATED_TIME   |
+---------+------------------------+-----------+---------+-----------+------------+---------------------+
| 1001    | query_tskv1.cnosdb.com | HOT       | HEALTHY | 5.18 GB   | 7.37 GB    | 2023-06-05 02:30:22 |
| 1002    | query_tskv2.cnosdb.com | HOT       | HEALTHY | 93.71 GB  | 240.11 GB  | 2023-06-05 02:30:19 |
+---------+------------------------+-----------+---------+-----------+------------+---------------------+

ALTER NODE [node_id] ATTRIBUTE [HOT/COLD];  // 更改节点的属性 
```

```SQL
CREATE DATABASE [IF NOT EXISTS] db_name [WITH db_options];

db_options:
    db_option ...

db_option: {
      TTL value
    | SHARD value
    | VNODE_DURATION value
    | REPLICA value
    | COOLING_DURATION value
    | PRECISION {'ms' | 'us' | 'ns'}
}
```

在 `CREATE DATABASE` 的语句中增加 `COOLING_DURATION value` 增加一个冷却时间的字段。 `option` 表示数据冷却的间隔， `COOLING_DURATION` 默认是0， 表示停止数据迁移。 

`COOLING_DURATION` 必须是 `VNODE_DURATION` 的整数倍。 `COOLING_DURATION` 字段可以通过 `alter database` 进行修改。

数据冷却后，meta中的 `migrate` 线程会将数据从热节点迁移至冷节点，`migrate` 线程会定时检测是否有数据需要迁移，定时时间可以通过meta配置文件中的 `auto_migrate_vnodes_duration` 配置项来修改，该配置项单位是秒，默认为0，表示不开启分级存储功能；可以根据实际需要设置定时检测的时间，建议最小检测时间为1800秒，即 `auto_migrate_vnodes_duration = 1800`。

**需要注意** 

- 数据冷却后数据会从热节点迁移至冷节点，但是数据的冷热度是由用户自己定义的，用户可以通过修改db的冷却时间来修改数据的冷热度。

- 用户修改db的冷却时间，有可能会把数据从冷节点迁移至热节点，例如：
通过./run_cluster.sh启动集群，在默认配置情况下，集群中有两个data节点：1001和2001，且默认都为热节点。
```SQL
ALTER NODE 2001 ATTRIBUTE COLD;  // 修改data节点2001为冷节点
CREATE DATABASE db1 with VNODE_DURATION '1m' COOLING_DURATION '1m';  // 在1001节点上创建一个名为db1的数据库，它的VNODE_DURATION和COOLING_DURATION都设置为1分钟
```
然后在db1数据库中建表，并写入数据，等待一段时间后，数据冷却，由热节点1001迁移至冷节点2001，此时执行SQL：
```SQL
ALTER DATABASE db1 SET COOLING_DURATION '1d'; // 将数据库db1的冷却时间由上面的1分钟，改为1天
```
此时由于冷却时间变大，上面已经冷却的数据又变回了热数据，因此数据由冷节点2001迁回到热节点1001。
