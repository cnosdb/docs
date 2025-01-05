---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CentOS & Redhat

Red Hat and CentOS users can use the package manager `yum` to install the latest stable version of CnosDB.

## Download

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

For Red Hat or CentOS users, use the following command to add the CnosDB repository:

```shell
cat <<EOF | sudo tee /etc/yum.repos.d/cnosdb.repo
[cnosdb]
name = CnosDB Repository
baseurl = https://repo.cnosdb.com/repo/rpm
enabled = 1
gpgcheck = 1
gpgkey = https://repo.cnosdb.com/repo/cnosdb.gpg-key.asc
EOF
```

Update and download software:

```shell
sudo yum update && yum install -y cnosdb cnosdb-meta
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

If it is CentOS 7 and earlier versions and RHEL 7 earlier versions, use the following command to start:

```shell
service cnosdb start
```

## Starting the cluster

:::note

Please add the following records to your DNS resolution server for communication between instances in your CnosDB cluster.Please contact your network administrator when necessary.

| Record type | Hostname                 | IP                                                       |
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

If it is CentOS 7 and earlier versions and RHEL 7 earlier versions, use the following command to start:

```shell
service cnosdb-meta start
```

#### Initialize `meta` service

> If there are multiple `meta` services in your cluster, you only need to execute the initialization command on one of the `meta` services.

```shell
cnosdb-meta init --bind meta1.cnosdb.com:8901
```

#### Add other `meta` service instances

```shell
cnosdb-meta add-node --bind meta1.cnosdb.com:8901 --addr meta2.cnosdb.com:8901
cnosdb-meta add-node --bind meta1.cnosdb.com:8901 --addr meta3.cnosdb.com:8901
```

#### 查看集群节点状态

分别指定不同的节点，执行以下命令，查看集群中各节点的状态。

```shell
cnosdb-meta show-nodes --bind meta1.cnosdb.com:8901 
```

If the cluster installation is successful, the following content should be returned:

> `state` may also be `Follower`.

```
Node ID  Address                 State    Term  Last_Log_index  Last_Applied  Leader    Members
1        meta1.cnosdb.com:8901  Leader    1      7                7            1       [1, 2, 3]
2        meta2.cnosdb.com:8901  Follower  1      7                7            1       [1, 2, 3]
3        meta3.cnosdb.com:8901  Follower  1      7                7            1       [1, 2, 3]
```

#### 删除集群中的节点

```shell
cnosdb-meta remove-node --bind meta1.cnosdb.com:8901 --addr meta2.cnosdb.com:8901
```

> 若删除的是leader节点，之后集群的bind地址会变化，请参照系统提示进行输入

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

If it is CentOS 7 and earlier versions and RHEL 7 earlier versions, use the following command to start.

```shell
service cnosdb start
```
