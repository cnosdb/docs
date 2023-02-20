---
title: Prometheus Remote Write
order: 4
---

# Prometheus
Prometheus 是一款面向云原生的监控软件，支持众多软件、系统的数据采集与监控。本文介绍如何把 Prometheus 监控数据存储到 CnosDB 上

## 前置条件

启动 CnosDB服务，获取 CnosDB 服务的地址

## 操作步骤
CnosDB 支持Prometheus的Remote Write协议，只需要在 Prometheus 中启动 Remote Write 功能即可采集数据到日志服务，相关操作如下所示。

修改配置文件
```yaml
# remote_write cnosdb
remote_write:
- url: "http://{db_url}/api/v1/prom/write?db={db_name}"
  basic_auth:
  username: 'root'
  password: ''
```
**参数说明**:

```
db_url: CnosDB 的Http Server地址，如 127.0.0.1:31001
db_name: Remote Write 写入的db名字
username: CnosDB 中用户的用户名
password: CnosDB 中用户的用户密码
```


Prometheus的remote_write的所有配置项可以从[Prometheus](https://prometheus.io/docs/prometheus/latest/configuration/configuration/?spm=a2c4g.11186623.0.0.231f780eoLUxCY#remote_write)
官网得到。


## 后续步骤

