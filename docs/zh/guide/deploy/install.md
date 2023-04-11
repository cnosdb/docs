---
title: 安装
order: 2
index: true
---

# 安装

此页面提供了安装、启动和配置 CnosDB 的一些指导。

**CnosDB** 中包含了两个软件程序 **CnosDB meta** 和 **CnosDB**，分别对应的程序命名是 **cnosdb-meta** 和 **cnosdb**。

**CnosDB meta** 的作用是维护集群的一致性，存储了集群中的元数据，包括集群的拓扑结构、副本的分布、数据的分布等。

**CnosDB** 的作用是存储数据库中的数据。

**CnosDB meta** 的网络端口：
- **TCP 8901**：用于 meta 之间服务的通信端口，同时也负责接收来自 cnosdb 的请求。

**CnosDB** 的网络端口：
- **TCP 8902**：CnosDB 的 http 监听端口，用于接收来自客户端的请求。
- **TCP 8903**：Grpc 监听端口，用于接收来自客户端的 GRPC 协议的请求。
- **TCP 8904**：Flight RPC 的监听端口，用于接收 Flight SQL 协议的客户端请求。
- **TCP 8905**：CnosDB 的 TCP 监听端口，用于接收 TCP 协议的客户端请求。

## 使用一个实例启动 CnosDB

::: tabs

@tab Docker

```bash
docker run -d -p 8091-8095:8091-8095 cnosdb/cnosdb:latest
```

@tab Ubuntu & Debian
1. **在[下载页](https://cn.cnosdb.com/download/)下载安装包**
2. **安装 CnosDB 程序**
    ```bash
    dpkg -i cnosdb_latest-1_amd64.deb
    ```
3. 启动 CnosDB 服务

    ```bash
    systemctl start cnosdb
    ```
   在 Ubuntu 14.04 以及之前的版本 和 Debina 9 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb start
    ```
@tab CentOS & RedHat

1. **在[下载页](https://cn.cnosdb.com/download/)下载安装包**
2. **安装 CnosDB 程序**
    ```bash
    yum localinstall cnosdb-latest-1.x86_64.rpm
    ```
3. 启动 CnosDB 服务

    ```bash
    systemctl start cnosdb
    ```
    在 CentOS 7 或 RHEL 7 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb start
    ```
@tab Helm

敬请期待！

:::


## 以集群的方式启动 CnosDB

在 CnosDB 中，cnosdb 程序有多种启动模式
- `singleton` meta、存储、查询服务全部在同一个实例里，不支持集群模式。
- `query_tskv`：实例提供查询和存储服务，支持集群模式。
- `query`：实例只提供查询服务，支持集群模式。
- `tskv`：实例只提供存储服务，支持集群模式。

::: tip
CnosDB 是支持混合部署的，您可以自定义查询和存储服务的数量。
但是一个完整的集群至少 1 个 meta服务、1 个查询服务和 1 个存储服务。

所以在您的 CnosDB 集群中，您的搭配至少是以下这个样子：
- 1 个 meta 服务
- 1 个 query_tskv 服务

或
- 1 个 meta 服务
- 1 个 query 服务
- 1 个 tskv 服务

通常在一个集群服务中，我们会部署多个 meta 服务，这样可以保证集群的高可用性。

此文章中的集群基于一个 3 + 2 的集群分布式集群，即 3 个 meta 服务 和 2 个 query_tskv 服务。

:::
::: tabs

@tab Docker

:::danger
这个文件还没有。

我们提供了一个Docker Compose的配置文件，可以使用以下命令下载和启动一个集群。

1. 下载配置文件

    ```bash
    curl -o docker-compose.yml -sL https://raw.githubusercontent.com/cnosdb/cnosdb/docker/docker-compose.yml
    ```
2. 启动集群
    ```bash
    docker-compose up -d
    ```
通过指定环境变量，可以修改集群的配置。
例如：\
    可以通过修改 `docker-compose.yml` 文件中的 `DEPLOYMENT_MODE` 为 `tskv` 让实例
以存储模式启动。


@tab Ubuntu & Debian
>请将以下记录添加到您的 DNS 解析服务器中，以便于CnosDB集群中的实例之间进行通信。必要时需要联系您的网络管理员。

| 记录类型      | 主机名 | 主机IP |
| ----------- | ----------- | -----------|
| A           | `meta1.cnosdb.com`       |  <meta1_ip>          |
| A           | `meta2.cnosdb.com`       |  <meta2_ip>          |
| A           | `meta3.cnosdb.com`       |  <meta3_ip>          |
| A           | `query_tskv1.cnosdb.com` |  <query_tskv1_ip>    |
| A           | `query_tskv2.cnosdb.com` |  <query_tskv2_ip>    |

#### **安装 CnosDB Meta**

1. 安装 CnosDB Meta 程序

    ```bash
    dpkg -i cnosdb-meta_latest-1_amd64.deb
    ```
2. 修改配置文件
    > Meta 服务的配置文件位于 `/etc/cnosdb-meta/cnosdb-meta.conf`。

    将添加在 DNS 服务器中的记录添加到配置文件中，将不同记录分配个不同的 Meta 服务。
    ```toml
    http_addr = meta<n>.cnosdb.com:8901
    ```
    分配 node_id 给每个 Meta 服务，id 不能重复。
    ```toml
    id = n
    ```
    配置完成后的配置文件示例如下：
    ```toml
    id = n
    http_addr = meta<n>.cnosdb.com:8901"
    ... ...
3. 启动 CnosDB Meta 服务
    ```bash
    systemctl start cnosdb-meta
    ```
    在 Ubuntu 14.04 以及之前的版本 和 Debina 9 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb-meta start
    ```
4. 初始化 Meta 服务
   >如果您的集群中有多个 Meta 服务，只需要在其中一个 Meta 服务上执行初始化命令即可。
    ```bash
    curl http://meta1.cnosdb.com:8901/init -d '{}'
    ```
5. 添加其他 Meta 服务
    ```bash
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[2, "meta2.cnosdb.com:8901"]' | jq
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[3, "meta3.cnosdb.com:8901"]' | jq
    ```
6. 重置集群成员以使集群生效
   > 执行以下命令可以修改集群成员，如果您的集群中有多个 Meta 服务，使用最初执行初始化的节点执行此命令 。
    ```bash
    curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
    ```
7. 查看集群状态
   > 分别指定不同的节点，执行以下命令，查看集群状态。

    如果集群安装成功，则应该返回以下内容：

    `curl http://meta1.cnosdb.com:8901/metrics | jq`
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
    
    `curl http://meta2.cnosdb.com:8901/metrics | jq`
    ```json
    {
      "Ok": {
      "running_state": {
        "Ok": null
      },
      "id": 2,
      ... ...
      "state": "Follower",
      ... ...
    }
    ```

    `curl http://meta3.cnosdb.com:8901/metrics | jq`
    ```json
    {
      "Ok": {
      "running_state": {
        "Ok": null
      },
      "id": 3,
      ... ...
      "state": "Follower",
      ... ...
    }
    ```

#### **安装 CnosDB**

1. 安装 CnosDB 程序

    ```bash
    dpkg -i cnosdb_latest-1_amd64.deb
    ```

2. 修改配置文件
    > CnosDB 服务的配置文件位于 `/etc/cnosdb/cnosdb.conf`。
   修改 [deployment].mode 为 query_tskv 。
   ```toml
    [deployment]
    mode = "query_tskv"
   ```
   修改 meta 节点地址。\
   修改 node_id，node_id 不能重复。\
   [cluster].name 需要与 cnosdb-meta 配置中的[meta_init].cluster_name 相同
   ```toml
    [cluster]
    node_id = n
    name = "cluster_xxx"
    http_addr = "meta<n>.cnosdb.com:8901" # 指向任意一个 meta 地址
   ```
   将添加在 DNS 服务器中的记录添加到配置文件中，将不同记录分配个不同的 CnosDB 服务。
   ```toml
    [cluster]
    http_listen_addr = 'query_tskv<n>.cnosdb.com:8902'
    grpc_listen_addr = 'query_tskv<n>.cnosdb.com:8903'
    flight_rpc_listen_addr = 'query_tskv<n>.cnosdb.com:8904'
    tcp_listen_addr = 'query_tskv<n>.cnosdb.com:8905'
   ```
   配置完成后的配置文件示例如下：
   ```toml
    ... ...
    [cluster]
    node_id = n
    name = "cluster_xxx"
    meta_service_addr = 'meta<n>.cnosdb.com:8901'

    http_listen_addr = 'query_tskv<n>.cnosdb.com:8902'
    grpc_listen_addr = 'query_tskv<n>.cnosdb.com:8903'
    flight_rpc_listen_addr = 'query_tskv<n>.cnosdb.com:8904'
    tcp_listen_addr = 'query_tskv<n>.cnosdb.com:8905'
    ... ...
   ```
3. 启动 CnosDB 服务
    ```bash
    systemctl start cnosdb
    ```
    在 Ubuntu 14.04 以及之前的版本 和 Debina 9 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb start
    ```

@tab CentOS & RedHat
>请将以下记录添加到您的 DNS 解析服务器中，以便于CnosDB集群中的实例之间进行通信。必要时需要联系您的网络管理员。

| 记录类型      | 主机名 | 主机IP |
| ----------- | ----------- | -----------|
| A           | `meta1.cnosdb.com`       |  <meta1_ip>          |
| A           | `meta2.cnosdb.com`       |  <meta2_ip>          |
| A           | `meta3.cnosdb.com`       |  <meta3_ip>          |
| A           | `query_tskv1.cnosdb.com` |  <query_tskv1_ip>    |
| A           | `query_tskv2.cnosdb.com` |  <query_tskv2_ip>    |

#### **安装 CnosDB Meta**

1. 安装 CnosDB Meta 程序

    ```bash
    yum localinstall cnosdb-meta_latest-1_amd64.deb
    ```
2. 修改配置文件
    > Meta 服务的配置文件位于 `/etc/cnosdb-meta/cnosdb-meta.conf`。

    将添加在 DNS 服务器中的记录添加到配置文件中，将不同记录分配个不同的 Meta 服务。
    ```toml
    http_addr = meta<n>.cnosdb.com:8901
    ```
    分配 node_id 给每个 Meta 服务，id 不能重复。
    ```toml
    id = n
    ```
    配置完成后的配置文件示例如下：
    ```toml
    id = n
    http_addr = meta<n>.cnosdb.com:8901"
    ... ...
3. 启动 CnosDB Meta 服务
    ```bash
    systemctl start cnosdb-meta
    ```
    在 CentOS 7 或 RHEL 7 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb-meta start
    ```
4. 初始化 Meta 服务
   >如果您的集群中有多个 Meta 服务，只需要在其中一个 Meta 服务上执行初始化命令即可。
    ```bash
    curl http://meta1.cnosdb.com:8901/init -d '{}'
    ```
5. 添加其他 Meta 服务
    ```bash
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[2, "meta2.cnosdb.com:8901"]' | jq
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[3, "meta3.cnosdb.com:8901"]' | jq
    ```
6. 重置集群成员以使集群生效
   > 执行以下命令可以修改集群成员，如果您的集群中有多个 Meta 服务，使用最初执行初始化的节点执行此命令 。
    ```bash
    curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
    ```
7. 查看集群状态
   > 分别指定不同的节点，执行以下命令，查看集群状态。

    如果集群安装成功，则应该返回以下内容：

    `curl http://meta1.cnosdb.com:8901/metrics | jq`
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
    
    `curl http://meta2.cnosdb.com:8901/metrics | jq`
    ```json
    {
      "Ok": {
      "running_state": {
        "Ok": null
      },
      "id": 2,
      ... ...
      "state": "Follower",
      ... ...
    }
    ```

    `curl http://meta3.cnosdb.com:8901/metrics | jq`
    ```json
    {
      "Ok": {
      "running_state": {
        "Ok": null
      },
      "id": 3,
      ... ...
      "state": "Follower",
      ... ...
    }
    ```

#### **安装 CnosDB**

1. 安装 CnosDB 程序

    ```bash
    dpkg -i cnosdb_latest-1_amd64.deb
    ```

2. 修改配置文件
    > CnosDB 服务的配置文件位于 `/etc/cnosdb/cnosdb.conf`。
   修改 [deployment].mode 为 query_tskv 。
   ```toml
    [deployment]
    mode = "query_tskv"
   ```
   修改 meta 节点地址。\
   修改 node_id，node_id 不能重复。\
   [cluster].name 需要与 cnosdb-meta 配置中的[meta_init].cluster_name 相同
   ```toml
    [cluster]
    node_id = n
    name = "cluster_xxx"
    http_addr = "meta<n>.cnosdb.com:8901" # 指向任意一个 meta 地址
   ```
   将添加在 DNS 服务器中的记录添加到配置文件中，将不同记录分配个不同的 CnosDB 服务。
   ```toml
    [cluster]
    http_listen_addr = 'query_tskv<n>.cnosdb.com:8902'
    grpc_listen_addr = 'query_tskv<n>.cnosdb.com:8903'
    flight_rpc_listen_addr = 'query_tskv<n>.cnosdb.com:8904'
    tcp_listen_addr = 'query_tskv<n>.cnosdb.com:8905'
   ```
   配置完成后的配置文件示例如下：
   ```toml
    ... ...
    [cluster]
    node_id = n
    name = "cluster_xxx"
    meta_service_addr = 'meta<n>.cnosdb.com:8901'

    http_listen_addr = 'query_tskv<n>.cnosdb.com:8902'
    grpc_listen_addr = 'query_tskv<n>.cnosdb.com:8903'
    flight_rpc_listen_addr = 'query_tskv<n>.cnosdb.com:8904'
    tcp_listen_addr = 'query_tskv<n>.cnosdb.com:8905'
    ... ...
   ```
3. 启动 CnosDB 服务
    ```bash
    systemctl start cnosdb
    ```
    在 Ubuntu 14.04 以及之前的版本 和 Debina 9 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb start
    ```
@tab Helm
敬请期待！

:::