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

**community-latest**

```bash
docker run --name cnosdb -d cnosdb/cnosdb:community-latest cnosdb run -M singleton
```

**v2.0.1**

```bash
docker run -d -p 8902:8902 cnosdb/cnosdb:2.0.1
```

**v2.2.0**

```bash
## 如果你想把端口映射到宿主机上，
## 可以修改 `/etc/cnosdb/cnosdb.conf` 中的配置 `http_listen_addr` 为 `0.0.0.0:8902`。
## 并且将 `docker run` 命令中的 加上 `-p 8902:8902` 参数。
docker run --name cnosdb -d cnosdb/cnosdb:v2.2.0 cnosdb run -M singleton --config /etc/cnosdb/cnosdb.conf
```

@tab Ubuntu & Debian
1. **下载**
    ```bash
    wget https://dl.cnosdb.com/packages/deb/cnosdb_latest-1_amd64.deb
    ```
2. **安装 CnosDB 程序**
    ```bash
    dpkg -i cnosdb_latest-1_amd64.deb
    ```
3. 修改配置文件`/etc/cnosdb/cnosdb.conf`

    修改`[deployment].mode` 为 `singleton`。\
    修改`[cluster].*listen_addr` 为您自己的 IP 地址。

4. 启动 CnosDB 服务

    ```bash
    systemctl start cnosdb
    ```
   在 Ubuntu 14.04 以及之前的版本 和 Debina 9 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb start
    ```
@tab CentOS & RedHat

1. **下载**
    ```bash
    wget https://dl.cnosdb.com/packages/rpm/cnosdb-latest-1.x86_64.rpm
    ```
2. **安装 CnosDB 程序**
    ```bash
    yum localinstall cnosdb-latest-1.x86_64.rpm
    ```
3. 修改配置文件`/etc/cnosdb/cnosdb.conf`

    修改`[deployment].mode` 为 `singleton`。\
    修改`[cluster].*listen_addr` 为您自己的 IP 地址。

4. 启动 CnosDB 服务

    ```bash
    systemctl start cnosdb
    ```
    在 CentOS 7 或 RHEL 7 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb start
    ```
@tab Helm

敬请期待！

@tab Source

**支持平台**
我们支持以下平台，如果发现可以在列表以外的平台上运行， 请[报告](https://github.com/cnosdb/cnosdb/issues)给我们。

- Linux x86(`x86_64-unknown-linux-gnu`)
- Darwin arm(`aarch64-apple-darwin`)
#
**编译环境**
1. 安装`Rust`，可前往[官网](https://www.rust-lang.org/learn/get-started)下载安装
2. 安装Cmake
```shell
# Debian or Ubuntu
apt-get install cmake
# Arch Linux
pacman -S cmake
# CentOS
yum install cmake
# Fedora
dnf install cmake
# macOS
brew install cmake
```
对于 Windows，你也可以在[Cmake官网](https://cmake.org/download/)下载和安装 Cmake

3. 安装FlatBuffers
```shell
# Arch Linux
pacman -S flatbuffers
# Fedora
dnf install flatbuffers
# Ubuntu
snap install flatbuffers
# macOS
brew install flatbuffers
```
如果您的系统不在此列，可按照如下方法安装FlatBuffers

```shell
$ git clone -b v22.9.29 --depth 1 https://github.com/google/flatbuffers.git && cd flatbuffers

# 根据操作系统选择以下命令之一
$ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Visual Studio 10" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Xcode" -DCMAKE_BUILD_TYPE=Release

$ sudo make install
```

**编译**

```shell
git clone https://github.com/cnosdb/cnosdb.git && cd cnosdb
make build
```

**运行**

v2.1
```shell
./target/debug/cnosdb singleton --cpu 4 --memory 64
```
v2.2
```shell
./target/debug/cnosdb run --deployment-mode singleton --cpu 4 --memory 64
```

#### **运行CLI**
在另一个终端，相同目录下运行如下命令

```shell
cargo run --package client --bin client
```
**注意**：请参考[cnosdb-cli手册](../reference/tools.md#客户端cli) 查看cli用法，并注意IP地址端口号

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

:::tip

工程师正在积极开发这个 Sandbox ，现阶段不能保证可以运行。

1. 克隆仓库
    ```bash
    git clone https://github.com/cnosdb/distributed-sandbox.git
    ```
2. 启动集群
    ```bash
    docker-compose up -d
    ```

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

1. 下载 CnosDB Meta 程序
    ```bash
    wget https://dl.cnosdb.com/packages/deb/cnosdb-meta_latest-1_amd64.deb
    ```

2. 安装 CnosDB Meta 程序

    ```bash
    dpkg -i cnosdb-meta_latest-1_amd64.deb
    ```
3. 修改配置文件
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
4. 启动 CnosDB Meta 服务
    ```bash
    systemctl start cnosdb-meta
    ```
    在 Ubuntu 14.04 以及之前的版本 和 Debina 9 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb-meta start
    ```
5. 初始化 Meta 服务
   >如果您的集群中有多个 Meta 服务，只需要在其中一个 Meta 服务上执行初始化命令即可。
    ```bash
    curl http://meta1.cnosdb.com:8901/init -d '{}'
    ```
6. 添加其他 Meta 服务
    ```bash
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[2, "meta2.cnosdb.com:8901"]' | jq
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[3, "meta3.cnosdb.com:8901"]' | jq
    ```
7. 重置集群成员以使集群生效
   > 执行以下命令可以修改集群成员，如果您的集群中有多个 Meta 服务，使用最初执行初始化的节点执行此命令 。
    ```bash
    curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
    ```
8. 查看集群状态
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

1. 下载 CnosDB 程序
    ```bash
    wget https://dl.cnosdb.com/packages/deb/cnosdb_latest-1_amd64.deb
    ```

2. 安装 CnosDB 程序

    ```bash
    dpkg -i cnosdb_latest-1_amd64.deb
    ```

3. 修改配置文件
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
4. 启动 CnosDB 服务
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

1. 下载

    ```bash
    wget https://dl.cnosdb.com/packages/rpm/cnosdb-meta-latest-1.x86_64.rpm
    ```
2. 安装 CnosDB Meta 程序

    ```bash
    yum localinstall cnosdb-meta_latest-1_amd64.deb
    ```
3. 修改配置文件
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
4. 启动 CnosDB Meta 服务
    ```bash
    systemctl start cnosdb-meta
    ```
    在 CentOS 7 或 RHEL 7 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb-meta start
    ```
5. 初始化 Meta 服务
   >如果您的集群中有多个 Meta 服务，只需要在其中一个 Meta 服务上执行初始化命令即可。
    ```bash
    curl http://meta1.cnosdb.com:8901/init -d '{}'
    ```
6. 添加其他 Meta 服务
    ```bash
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[2, "meta2.cnosdb.com:8901"]' | jq
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[3, "meta3.cnosdb.com:8901"]' | jq
    ```
7. 重置集群成员以使集群生效
   > 执行以下命令可以修改集群成员，如果您的集群中有多个 Meta 服务，使用最初执行初始化的节点执行此命令 。
    ```bash
    curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
    ```
8. 查看集群状态
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
1. 下载

   ```bash
   wget https://dl.cnosdb.com/packages/rpm/cnosdb-2.2.0-1.x86_64.rpm
   ```
2. 安装 CnosDB 程序

    ```bash
    dpkg -i cnosdb_latest-1_amd64.deb
    ```

3. 修改配置文件
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
4. 启动 CnosDB 服务
    ```bash
    systemctl start cnosdb
    ```
    在 Ubuntu 14.04 以及之前的版本 和 Debina 9 之前的版本，使用以下命令启动。

    ```bash
    service cnosdb start
    ```
@tab Helm
敬请期待！

@tab Source

**支持平台**
我们支持以下平台，如果发现可以在列表以外的平台上运行， 请[报告](https://github.com/cnosdb/cnosdb/issues)给我们。

- Linux x86(`x86_64-unknown-linux-gnu`)
- Darwin arm(`aarch64-apple-darwin`)
#
**编译环境**
1. 安装`Rust`，可前往[官网](https://www.rust-lang.org/learn/get-started)下载安装
2. 安装Cmake
```shell
# Debian or Ubuntu
apt-get install cmake
# Arch Linux
pacman -S cmake
# CentOS
yum install cmake
# Fedora
dnf install cmake
# macOS
brew install cmake
```
对于 Windows，你也可以在[Cmake官网](https://cmake.org/download/)下载和安装 Cmake

3. 安装FlatBuffers
```shell
# Arch Linux
pacman -S flatbuffers
# Fedora
dnf install flatbuffers
# Ubuntu
snap install flatbuffers
# macOS
brew install flatbuffers
```
如果您的系统不在此列，可按照如下方法安装FlatBuffers

```shell
$ git clone -b v22.9.29 --depth 1 https://github.com/google/flatbuffers.git && cd flatbuffers

# 根据操作系统选择以下命令之一
$ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Visual Studio 10" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Xcode" -DCMAKE_BUILD_TYPE=Release

$ sudo make install
```

**编译**

```shell
git clone https://github.com/cnosdb/cnosdb.git && cd cnosdb
make build
```

**运行分布式存算分离数据库服务**

v2.1
```shell
## 单meta，data，query节点
./target/debug/cnosdb-meta --config ./meta/config/config_21001.toml
./target/debug/cnosdb tskv --cpu 4 --memory 64
./target/debug/cnosdb query --cpu 4 --memory 64
```
v2.2
```shell
./target/debug/cnosdb-meta --config ./meta/config/config_21001.toml
./target/debug/cnosdb run --deployment-mode tskv --cpu 4 --memory 64
./target/debug/cnosdb run --deployment-mode query --cpu 4 --memory 64
```

**运行分布式存算一体数据库服务**
```shell
## 单meta，cnosdb节点
./target/debug/cnosdb-meta --config ./meta/config/config_21001.toml
./target/debug/cnosdb run --cpu 4 --memory 64
```

:::