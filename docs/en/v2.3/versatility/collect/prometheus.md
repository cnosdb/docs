---
title: Prometheus
order: 3
---

## Prometheus

### Introduction

Prometheus is a cloud-native monitoring software that enables data acquisition and monitoring for a wide range of software and systems.

This article describes how to configure CnosDB as a Prometheus terminal via the Prometheus Remote Read/ Write interface.

### Precondition

Start CnosDB service, get the address of  CnosDB service.

### Remote Write

CnosDB supports the Remote Write protocol of Prometheus. To ingest data to the logging service, simply enable the Remote Write functionality in Prometheus, as shown below.

**Operation flow**

- **Edit configuration file**

```yaml
# remote_write cnosdb
remote_write:
- url: "http://{db_url}/api/v1/prom/write?db={db_name}"
basic_auth:
username: 'root'
password: ''
```
**Parameter**

```
db_url: Http Server address of CnosDB, such as 127.0.0.1:8902
db_name: Remote Write database name
username: CnosDB username
password: CnosDB user's password
```

You can get the all configuration of Prometheus Remote Write via [Prometheus](https://prometheus.io/docs/prometheus/latest/configuration/configuration/?spm=a2c4g.11186623.0.0.231f780eoLUxCY#remote_write).


### Remote Read

CnosDB supports Remote Read protocol of Prometheus. To ingest data to the logging service, simply enable the Remote Read functionality in Prometheus, as shown below.

**Operation flow**

- **Edit configure file**
```yaml
# remote_read cnosdb
remote_read:
- url: "http://{db_url}/api/v1/prom/read?db={db_name}"
basic_auth:
username: 'root'
password: ''
```
**Parameter**

**Parameter**

```
db_url: Http Server address of CnosDB, such as 127.0.0.1:8902
db_name: Remote Write database name
username: CnosDB username
password: CnosDB user's password
```

You can get the all configuration of Prometheus Remote Read via [Prometheus](https://prometheus.io/docs/prometheus/latest/configuration/configuration/?spm=a2c4g.11186623.0.0.231f780eoLUxCY#remote_read).
