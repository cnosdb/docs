---
title: Prometheus
slug: /prometheus
---

Prometheus is a cloud-native monitoring software that supports data collection and monitoring for numerous software and systems.

This article describes how to configure CnosDB as a Prometheus endpoint using the Prometheus Remote Read/Write interface.

### Prerequisites

Start the CnosDB service to obtain the address of the CnosDB service.

### Remote Write

CnosDB supports the Prometheus Remote Write protocol, just need to start the Remote Write feature in Prometheus to collect data to the log service, the relevant operations are as follows.

**Operation Steps**

- **Edit configuration file**

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
db_url: Http Server address of CnosDB, such as 127.0.0.1:8902
db_name: Name of the db written by Remote Write
username: User name in CnosDB
password: User password in CnosDB
```

All configuration options for remote_write in Prometheus can be found on the [Prometheus](https://prometheus.io/docs/prometheus/latest/configuration/configuration/?spm=a2c4g.11186623.0.0.231f780eoLUxCY#remote_write) official website.

### Remote Read

CnosDB supports the Prometheus Remote Read protocol, just need to start the Remote Read feature in Prometheus to collect data to the log service, the relevant operations are as follows.

**Operation Steps**

- **Edit configuration file**

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
db_url: Http Server address of CnosDB, such as 127.0.0.1:8902
db_name: Name of the db read by Remote Write
username: User name in CnosDB
password: User password in CnosDB
```

All configuration options for remote_write in Prometheus can be found on the [Prometheus](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_read) official website.
