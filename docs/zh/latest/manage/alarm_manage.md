---
title: 告警管理
order: 6
---

:::tip
仅企业版支持，获取告警组件请联系 [CC](../enterprise/README.md)
:::

### 介绍

CnosDB 支持告警管理，通过 CnosDB 告警管理，您可以查看告警信息、设置告警通知方式、设置告警规则、设置告警通知组等。

### 实现原理

// TODO 这里需要写的详细一点

cnos-alert组件是通过sql查询，监控cnosdb数据库写入数据，根据用户设置，如出现触发数据记录，则向用户发出告警通知，并记录的告警组件。

![告警组件原理](/_static/img/cnos-alert.png)


### 启动

```shell
./alertserver --config=alertserver.yaml --serverport=9001
```

### 配置（alertserver.yaml）

```yaml
query: #被查询数据所在cnosdb配置
    nodeHost: 127.0.0.1
    nodePort: 8902
    authorization: ********* #仅支持base64加密后的用户名密码
alert: #告警规则配置持久化配置
    filePath: /etc/alert.json
    store: #告警、通知记录保存所在cnosdb配置
    nodeHost: 127.0.0.1
    nodePort: 8902
    authorization: ********* #仅支持base64加密后的用户名密码
    alerttable:  alertrecord #告警记录表名
    notitable: notirecord #通知记录表明
```

### API 接口描述

::: details /api/http/ping

**描述**

测试服务运行状态

**请求方法**

- GET

**请求示例**

```shell
curl -X GET http:/127.0.0.1/api/http/ping
```

**请求成功**

```shell
// TODO
```

**请求失败**

```shell
TODO
... ...
```
:::



### 示例

假设我们有一个数据库，名为 `system_monitor`，其中有一个表，名为 `cpu`, 该表中有一个字段，名为 `usage_idle`,表的数据如下：
```shell
> select * from cpu;
time                host        usage_idle
----                server1     ----------
1572537600000000000 server1     10
1572537600000000000 server1     20
1572537600000000000 server1     30
1572537600000000000 server1     40
1572537600000000000 server1     50
1572537600000000000 server1     60
```

这个表每 10 秒会记录一次 host 的 usage_idle 值，我们想要监控该字段的值，当值小于 10 时，发出告警到 slack。

