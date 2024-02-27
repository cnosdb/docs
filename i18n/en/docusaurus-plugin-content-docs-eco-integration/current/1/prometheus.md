---
title: Prometheus
slug: /prometheus
---

Prometheus is a cloud based monitoring software that supports a wide range of software, systems data collection and monitoring.

This paper describes how to configure CnosDB as the Prometheus Terminal through the Prometheus Remote Read/Write interface.

### Precondition

Start the CnosDB service and get the address of the CnosDB service.

### Remote Write

CnosDB supports Prometheus's Remote Writ protocol and can collect data to log service only by starting the Remote Write feature in Prometheus as follows.

**Action Steps**

- **Edit profile**

```yaml
# remote_write cnosdb
remote_write:
- url: "http://{db_url}/api/v1/prom/write?db={db_name}"
basic_auth:
username: 'root'
password: ''
```

**Parameter description**:

```
db_url: Http Server address of CnosDB, e.g. 127.0.0.0.1:8902
db_name: Remote Write db name
username: Username
password: User password in CnosDB
```

All Prometheus's remote_writing configuration items can be obtained from the web site[Prometheus](https\://prometheus.io/docs/prometheus/ latest/configuration/configuration/?spm=a2c4g.11186623.0.0.231f780eLUxCY#remote_write)

### Remote Read

CnosDB supports Prometheus's Remote Read protocol and collects data to the log service only by starting the Remote Read function in Prometheus as follows.

**Action Steps**

- **Edit profile**

```yaml
# remote_read cnosdb
remote_read:
- url: "http://{db_url}/api/v1/prom/read?db={db_name}"
basic_auth:
username: 'root'
password: ''
```

**Parameter description**:

```
db_url: Http Server for CnosDB, e.g. 127.0.0.1:8902
db_name: Remote Read db name
username: Username
password: User password for CnosDB users
```

All of Prometheus's remote_write's configuration items are available from
[Prometheus](https\://prometheus.io/docs/prometheus/ latest/configuration/configuration/#remote_read)
