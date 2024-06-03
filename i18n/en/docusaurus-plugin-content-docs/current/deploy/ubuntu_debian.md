---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ubuntu & Debian

Ubuntu and Debian users can install the latest stable version of CnosDB using package manager `apt-get`.

## Download

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

For Ubuntu or Debian users, use the following command to add the CnosDB repository:

```shell
curl -fsSL https://repo.cnosdb.com/repo/cnosdb.gpg-key.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/cnosdb.gpg > /dev/null
echo "deb [signed-by=/etc/apt/trusted.gpg.d/cnosdb.gpg] https://repo.cnosdb.com/repo/deb stable main" | sudo tee /etc/apt/sources.list.d/cnosdb.list > /dev/null
```

Update and download software:

```shell
sudo apt-get update & apt-get -y install cnosdb cnosdb-meta
```

</TabItem>

<TabItem value="Enterprise" label="企业版">

:::tip
Please contact us to obtain the installation package for the enterprise version.
:::

</TabItem>

</Tabs>

## Start a standalone instance

#### 1. Edit configuration

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

Change `license_file` to specify the correct file location

> Get License file, please contact us

```shell
license_file = '/etc/cnosdb/license.json'
```

</TabItem>

</Tabs>

Change `[deployment].mode` to `singleton`

```toml
[deployment]
mode = "singleton"
```

#### 2. Start

```shell
systemctl start cnosdb
```

If Ubuntu 14.04 and previous versions and Debian 9, start with the following command:

```shell
service cnosdb start
```

## Starting the cluster

:::note

Please add the following records to your DNS resolution server for communication between instances in your CnosDB cluster.Please contact your network administrator when necessary.

| Record type | Hostname                 | Host IP                                                  |
| ----------- | ------------------------ | -------------------------------------------------------- |
| A           | `meta1.cnosdb.com`       | meta1_ip                            |
| A           | `meta2.cnosdb.com`       | meta2_ip                            |
| A           | `meta3.cnosdb.com`       | meta3_ip                            |
| A           | `query_tskv1.cnosdb.com` | query_tskv1_ip |
| A           | `query_tskv2.cnosdb.com` | query_tskv2_ip |

:::

### Start the `meta` service

#### 1. Edit configuration

Default configuration file location: `/etc/cnosdb/cnosdb-meta.conf`

Add the records added in the DNS server to the configuration file, assigning different records to different `meta` services.

```toml
host = meta<n>.cnosdb.com
```

Assign a node_id to each `meta` service, the id must not be duplicated.

```toml
id = n
```

The configuration file example after configuration is completed is as follows:

```toml
id = n
host = "meta<n>.cnosdb.com"
port = 8901
... ...
```

#### Start Service

```shell
systemctl start cnosdb-meta
```

If Ubuntu 14.04 and previous versions and Debian 9, start with the following command:

```shell
service cnosdb-meta start
```

#### Initialize `meta` service

> If there are multiple `meta` services in your cluster, you only need to execute the initialization command on one of the `meta` services.

```shell
curl http://meta1.cnosdb.com:8901/init -d '{}'
```

#### Add other `meta` service instances

```shell
curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[2, "meta2.cnosdb.com:8901"]' | jq
curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[3, "meta3.cnosdb.com:8901"]' | jq
```

#### Reset cluster members to make the cluster take effect

> Executing the following command can modify the cluster members. If there are multiple `meta` services in your cluster, use the node that initially performed the initialization to execute this command.

```shell
curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
```

#### View Cluster Status

Specify different nodes separately, perform the following commands to view cluster status.

> Replace `<n>` in the command to specify a different `meta` service instance.

```shell
curl http://meta<n>.cnosdb.com:8901/metrics | jq
```

If the cluster installation is successful, the following content should be returned:

> `state` may also be `Follower`.

```json
{
  "Ok": {
  "running_state": {
    "Ok": null
  },
  "id": 1,
  ... ...
  "state": "Leader",
  ... ...
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

</TabItem>

<TabItem value="Enterprise" label="企业版">

Change `license_file` to specify the correct file location

> Get License file, please contact us

```shell
license_file = '/etc/cnosdb/license.json'
```

</TabItem>

</Tabs>

Change `[deployment].mode` to `query_tskv`.

```toml
[deployment]
mode = "query_tskv"
```

Modify `node_id`, `node_id` cannot be duplicated.

```toml
[node_basic]
 node_id = <n>
```

Change `meta` service address.
Change `meta` service address.
`[cluster].name` needs to be the same as `[meta_init].cluster_name` in the `cnosdb-meta` configuration.

```toml
 [cluster]
 name = "cluster_xxx"
 meta_service_addr = ['meta1.cnosdb.com:8901', 'meta2.cnosdb.com:8901', 'meta3.cnosdb.com:8901']
```

The configuration file example after configuration is completed is as follows:

```toml
 ... ...
 host = "query_tskv<n>.cnosdb.com"
 [deployment]
 mode = 'query_tskv'
 ... ...
 [cluster]
 name = 'cluster_xxx'
 meta_service_addr = ['meta1.cnosdb.com:8901', 'meta2.cnosdb.com:8901', 'meta3.cnosdb.com:8901']
 [node_basic]
 node_id = <n>
 ... ...
```

#### Start Service

```shell
systemctl start cnosdb
```

If Ubuntu 14.04 and previous versions and Debian 9, start with the following command:

```shell
service cnosdb start
```
