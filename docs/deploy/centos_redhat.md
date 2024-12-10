---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CentOS & Redhat

Red Hat 和 CentOS 用户可以使用包管理器 `yum` 安装最新稳定版本的 CnosDB。

## 下载

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

对于 Red Hat 或 CentOS 用户，使用以下命令添加 CnosDB 存储库：

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

更新并下载软件：

```shell
sudo yum update && yum install -y cnosdb cnosdb-meta
```

</TabItem>

<TabItem value="Enterprise" label="企业版">

:::tip
如需获取企业版的安装包，请联系我们。
:::

</TabItem>

</Tabs>

## 启动单机实例

#### 1. 修改配置
<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

修改 `license_file` 指定正确的文件位置
> 获取 License 文件，请联系我们

```shell
license_file = '/etc/cnosdb/license.json'
```

</TabItem>

</Tabs>

修改 `[deployment].mode` 为 `singleton`

```toml
[deployment]
mode = "singleton"
```

#### 2. 启动

```shell
systemctl start cnosdb
```

如果是 CentOS 7 以及之前的版本 和 RHEL 7 之前的版本，使用以下命令启动：

```shell
service cnosdb start
```

## 启动集群

:::note

请将以下记录添加到您的 DNS 解析服务器中，以便于 CnosDB 集群中的实例之间进行通信。必要时需要联系您的网络管理员。

| 记录类型      | 主机名 | IP |
| ----------- | ----------- | -----------|
| A           | `meta1.cnosdb.com`       |  meta1_ip          |
| A           | `meta2.cnosdb.com`       |  meta2_ip          |
| A           | `meta3.cnosdb.com`       |  meta3_ip          |
| A           | `query_tskv1.cnosdb.com` |  query_tskv1_ip    |
| A           | `query_tskv2.cnosdb.com` |  query_tskv2_ip    |

:::

### 启动 `meta` 服务

#### 1. 修改配置

默认配置文件位置：`/etc/cnosdb/cnosdb-meta.conf`

将添加在 DNS 服务器中的记录添加到配置文件中，将不同记录分配个不同的 `meta` 服务。

```toml
host = meta<n>.cnosdb.com
```

分配 node_id 给每个 `meta` 服务，id 不能重复。

```toml
id = n
```

配置完成后的配置文件示例如下：

```toml
id = n
host = "meta<n>.cnosdb.com"
port = 8901
... ...
```

#### 启动服务

```shell
systemctl start cnosdb-meta
```

如果是 CentOS 7 以及之前的版本 和 RHEL 7 之前的版本，使用以下命令启动：

```shell
service cnosdb-meta start
```

#### 初始化 `meta` 服务

> 如果您的集群中有多个 `meta` 服务，只需要在其中一个 `meta` 服务上执行初始化命令即可。

```shell
./target/debug/cnosdb-meta init --bind meta1.cnosdb.com:8901
```

#### 添加其他 `meta` 服务实例

```shell
./target/debug/cnosdb-meta add-node --bind meta1.cnosdb.com:8901 --addr meta2.cnosdb.com:8901
./target/debug/cnosdb-meta add-node --bind meta1.cnosdb.com:8901 --addr meta3.cnosdb.com:8901
```

#### 查看集群节点状态

分别指定不同的节点，执行以下命令，查看集群中各节点的状态。

```shell
./target/debug/cnosdb-meta show-nodes --bind meta1.cnosdb.com:8901 
```

如果集群安装成功，则应该返回以下内容：
> `state` 还有可能是 `Follower`。

```
Node ID  Address         State     Term  Last_Log_index  Last_Applied  Leader  Members
1        127.0.0.1:8901  Leader    1      7                7            1       [1, 2, 3]
2        127.0.0.1:8911  Follower  1      7                7            1       [1, 2, 3]
3        127.0.0.1:8921  Follower  1      7                7            1       [1, 2, 3]
```

### 启动 `cnosdb` 服务

#### 修改配置文件

`cnosdb` 服务的配置文件位于 `/etc/cnosdb/cnosdb.conf`。

将添加在 DNS 服务器中的记录添加到配置文件中，将不同记录分配个不同的 `cnosdb` 服务。

```toml
host = "query_tskv<n>.cnosdb.com"
```

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

修改 `license_file` 指定正确的文件位置
> 获取 License 文件，请联系我们

```shell
license_file = '/etc/cnosdb/license.json'
```

</TabItem>

</Tabs>

修改 `[deployment].mode` 为 `query_tskv` 。

```toml
[deployment]
mode = "query_tskv"
```

修改 `node_id`，`node_id` 不能重复。

```toml
[node_basic]
 node_id = <n>
```

修改 `meta` 服务地址。
`[cluster].name` 需要与 `cnosdb-meta` 配置中的`[meta_init].cluster_name` 相同。

```toml
 [cluster]
 name = "cluster_xxx"
 meta_service_addr = ['meta1.cnosdb.com:8901', 'meta2.cnosdb.com:8901', 'meta3.cnosdb.com:8901']
```

配置完成后的配置文件示例如下：

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

#### 启动服务

```shell
systemctl start cnosdb
```

如果是 Centos 7 以及之前的版本 和 RHEL 7 之前的版本，使用以下命令启动。

```shell
service cnosdb start
```
