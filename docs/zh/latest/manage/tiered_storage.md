---

title: 分级存储
order: 5

---

在实际的业务场景中一台机器上会同时有多块盘数据盘，需要把这些盘的能力都充分发挥出来提高系统的吞吐， 
还有一种场景是同一台或者多台机器上的多盘数据盘使用的是不同存储介质，客户希望把不经常访问的冷数据
淘汰到廉价的存储介质来降低企业存储的成本。
在CnosDB中我们通过如下的方案解决这两种场景

# 分级存储

在CnosDB集群中数据迁移的基本单元Vnode， 分级存储也遵循这个基本原则。
我们会在企业版CnosDB集群种提供如下的命令： 
```SQL
show datanodes;                          // 查看节点的状态信息
alter node [node_id] status [hot/cold];  // 更改节点的状态 
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

在CREATE DATABASE 的语句中增加 COOLING_DURATION value 增加一个冷却时间的字段 
option 表示数据冷却的间隔 COOLING_DURATION 默认是0 表示无限长。 

COOLING_DURATION 必须是VNODE_DURATION的整数倍 
option COOLING_DURATION  字段可以通过alter database 进行修改 

数据冷却后 meta中的migrat线程会将数据从 hot 节点迁移至 cold 节点。

**需要注意** 

- 数据冷却后数据会从hot节点迁移至cold节点，但是数据的冷热度是由用户自己定义的，用户可以通过修改db的冷却时间来修改数据的冷热度。

- 用户修改db的冷却时间修改 有可能会把数据从cold 节点迁移至 hot节点


# 多盘存储
    在一个节点上有多块磁盘的情况，CnosDB tskv实例不做任何感知。
    在CnosDB企业版中我们提供磁盘处理的脚本和部署的脚本。
1. 通过组装RAID，通过RAID来充分发挥硬件系统的能力。
2. 通过在同一个节点上部署多个cnosdb tskv实例分别指向不同的磁盘路径，来充分发挥系统的能力。