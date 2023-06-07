---
title: CnosDB Meta配置
order: 6
---

# 配置

## 介绍

CnosDB Meta 的配置文件为 TOML 格式。

> TOML 语法参考：[https://toml.io](https://toml.io/cn/v1.0.0)



配置文件由数个 TOML 键值对与表所组成，如下所示：

**TOML 键**

- `id` Meta节点的id，要求集群内唯一
- `host` 节点的 host
- `port` 节点的 port
- `snapshot_path` Meta节点snapshot存储路径
- `journal_path` Meta节点journal存储路径
- `snapshot_per_events` Meta节点多久做一次snapshot

**TOML 表**

- `[log]` 运行日志配置
- `[meta_init]` Meta初始化相关配置信息
- `[heartbeat]` 定时检查CnosDB节点状态相关配置

详细的配置文件说明如下所示：

## \[log]

| 参数    | 说明                                  |
|-------|-------------------------------------|
| level | 日志等级（debug、info、error、warn），默认：info |
| path  | 日志存储目录，默认：`data/log`                |


## \[meta_init]

| 参数    | 说明                                  |
|-------|-------------------------------------|
| cluster_name | 集群名字 |
| admin_user  | 系统管理员用户名               |
| system_tenant  | 系统默认租户名字               |
| default_database  | 默认创建的数据库              |

## \[heartbeat]

| 参数                       | 说明                                     |
|--------------------------|----------------------------------------|
| heartbeat_recheck_interval | 多久检查一次CnosDB节点的状态 |
| heartbeat_expired_interval | CnosDB节点多久未上报心跳认定异常 |

