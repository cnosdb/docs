---
sidebar_position: 4
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ubuntu & Debian

Ubuntu and Debian users can install the latest stable version of CnosDB using package manager `apt-get`.

## Download

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

Add CnosDB repository： with the following command for Ubuntu or Debian users

```shell
curl -fsSL https://cnosdb-package-repository.s3.us-west-2.amazonaws.com/cnosdb.gpg-key.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/cnosdb.gpg > /dev/null
echo "deb [signed-by=/etc/apt/trusted.gpg.d/cnosdb.gpg] https://cnosdb-package-repository.s3.us-west-2.amazonaws.com/deb stable main" | sudo tee /etc/apt/sources.list.d/cnosdb.list > /dev/null
```

Update and download software：

```shell
sudo apt-get update & apt-get -y install cosdb cnosdb-meta
```


<TabItem value="Enterprise" label="企业版">

:::tip
Please contact us if you want to get an installation package for the enterprise version.
:::




## Start Solo Instance

#### 1. Modify configuration

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">


<TabItem value="Enterprise" label="企业版">

Change `license_file` to specify the correct file location

> Get License file, please contact us

```shell
license_file = '/etc/cnosdb/license.json'
```




Modify `[deployment].mode` to `singleton`

```toml
[deployment]
mode = "query_tskv"
```

#### Initiation

```shell
systemctl start cnosdb
```

Use the command below to start： if Ubuntu 14.04 and previous versions and Debina 9

```shell
Service cnosdb start
```

## Start cluster

:::note
请将以下记录添加到您的 DNS 解析服务器中，以便于 CnosDB 集群中的实例之间进行通信。必要时需要联系您的网络管理员。

| Record type | Hostname                 | Host IP                                                     |
| ----------- | ------------------------ | ----------------------------------------------------------- |
| A           | `meta1.cnosdb.com`       | \<meta1_ip>                            |
| A           | `meta2.cnosdb.com`       | \<meta2_ip>                            |
| A           | `meta3.cnosdb.com`       | \<meta3_ip>                            |
| A           | `query_tskv1.cnosdb.com` | \<query_tskv1_ip> |
| A           | `query_tskv2.cnosdb.com` | \<query_tskv2_ip> |
| :::         |                          |                                                             |

### Launch the `meta` service

#### 1. Modify configuration

Default profile position：`/etc/cnosdb/cnosdb-meta.conf`

Add entries added to the DNS server to the configuration file and assign different entries to a different `meta` service.

```toml
host = meta<n>.cnosdb.com
```

Assign node_id to each `meta` service, id cannot be repeated.

```toml
id = n
```

The following configuration file example after configuration completes the following：

```toml
id = n
host = "meta<n>.cnosdb.com"
port = 8901
...
```

#### Start service

```shell
systemctl start cnosdb-meta
```

Use the command below to start： if Ubuntu 14.04 and previous versions and Debina 9

```shell
Service nosdb-meta start
```

#### Initialize the `meta` service

> If you have multiple `meta` services in your cluster, only the initialization command needs to be executed on one of the `meta` services.

```shell
curl http://meta1.cnosdb.com:8901/init -d '{}'
```

#### Add another `meta` service instance

```shell
curl http://meta1.cnosdb.com:8901/add-learner-H "Content-Type: application/json" -d [2, "meta2.cnosdb.com:8901"]' | jq
curl http://meta 1.cnosdb.com:8901/add-learner-H "Content-Type: application/json" -d [3, "meta3.cosdb.com:8901"]' | jq
```

#### Reset cluster members to take effect

> Execute the following commands to modify cluster members if there are multiple `meta` services in your cluster, use the original initialized node to perform this command.

```shell
curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
```

#### View cluster status

Specify different nodes separately, perform the following commands to view cluster status.

> Replace `<n>` in the command to specify an invalid `meta` service instance.

```shell
curl http://meta<n>.cnosdb.com:8901/metrics | jq
```

If the cluster is installed successfully, return the following：

> The `state` may also be `Follower`.

```json
LO
  "Ok": LO
  "running_state": LO
    "Ok": null
  },
  "id": 1,
  . ...
  "state": "Leader",
  ...
}
```

### Launch the `cnosdb` service

#### Edit profile

The configuration file for the `cnosdb` service is located at `/etc/cnosdb/cnosdb.conf`.

Add entries to the DNS server to the configuration file and assign different `cnosdb` services to different records.

```toml
host = "query_tskv<n>.cnosdb.com"
```

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">


<TabItem value="Enterprise" label="企业版">

Change `license_file` to specify the correct file location

> Get License file, please contact us

```shell
license_file = '/etc/cnosdb/license.json'
```




Modify `[deployment].mode` to `query_tskv`

```toml
[deployment]
mode = "query_tskv"
```

Modify `node_id`, `node_id` cannot be repeated.

```toml
[node_basic]
 node_id = <n>
```

Modify the `meta` service address.
`[cluster].name` needs to be the same as `[meta_init].cluster_name` in the `cnosdb-meta` configuration.

```toml
 [cluster]
 name = "cluster_xxx"
 meta_service_addr = ['meta1.cnosdb.com:8901', 'meta2.cnosdb.com:8901', 'mesta3.cnosdb.com:8901']
```

The following configuration file example after configuration completes the following：

```toml
 ...
 host = "query_tskv<n>.cnosdb.com"
 [deployment]
 mode = 'query_tskv'
 . .
 [cluster]
 name = 'cluster_xxxx'
 meta_service_addr = ['meta1. nosdb.com:8901', 'meta2.cnosdb.com:8901', 'meta3.cnosdb.com:8901']
 [node_basic]
 node_id = <n>
...
```

#### Start service

```shell
systemctl start cnosdb
```

In the case of Ubuntu 14.04 and previous versions and Debina 9 before, use the following commands to start.

```shell
Service cnosdb start
```
