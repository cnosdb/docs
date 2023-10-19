---
title: Install
order: 2
index: true
---

# Install

This page provides some instructions for installing, starting, and configuring CnosDB.

**CnosDB** contains two services: **CnosDB meta** and **CnosDB**, named with **cnosdb-meta** and **cnosdb**.

**CnosDB meta** is used to maintain the consistency of the cluster. It stores the metadata in the cluster, including the topology of the cluster, the distribution of replicas, the distribution of data, etc.

**CnosDB** is used to store data from a database.

**CnosDB meta** Network port:
- **TCP 8901** : The communication port used for inter-Meta services, but also responsible for receiving requests from cnosdb.

**CnosDB** Network port:
- **TCP 8902** : indicates the http listening port for receiving requests from the client.
- **TCP 8903** : Grpc listening port, used to receive GRPC requests from clients.
- **TCP 8904** : Listening port of the Flight RPC, used to receive client requests of the Flight SQL protocol.
- **TCP 8905** : Indicates the TCP listening port of CnosDB, which is used to receive TCP client requests.

## Start a CnosDB Instance

::: tabs

@tab Docker

```bash
docker run --name cnosdb -p 8902:8902 -d cnosdb/cnosdb:community-latest cnosdb run -M singleton
```

@tab Ubuntu & Debian
1. **Download**
    ```bash
   wget https://dl.cnosdb.com/packages/deb/cnosdb_2.3-community-1_amd64.deb
    ```
2. **Install CnosDB Service**
    ```bash
    dpkg -i cnosdb_2.3-community-1_amd64.deb
    ```
3. edit config file `/etc/cnosdb/cnosdb.conf`

   change `[deployment].mode` to `singleton`.

4. Start CnosDB Service

    ```bash
    systemctl start cnosdb
    ```
   
   In Ubuntu 14.04 and previous versions and before Debina 9, use the following command to start.

    ```bash
    service cnosdb start
    ```
@tab CentOS & RedHat

1. **Download**
    ```bash
    wget https://dl.cnosdb.com/packages/rpm/cnosdb-2.3_community-1.x86_64.rpm
    ```
2. **Install CnosDB Service**
    ```bash
    yum localinstall cnosdb-2.3_community-1.x86_64.rpm
    ```
3. edit config file `/etc/cnosdb/cnosdb.conf`

   change `[deployment].mode` to `singleton`.

4. Start CnosDB Service

    ```bash
    systemctl start cnosdb
    ```
   In CentOS 7 or previous version of RHEL 7, use the following command to start.

    ```bash
    service cnosdb start
    ```
@tab Helm

to be continued!

@tab Source

**Platform Supported**

We support the following platform, if can find outside the list of platforms, please [contract] (https://github.com/cnosdb/cnosdb/issues) us.

- Linux x86(`x86_64-unknown-linux-gnu`)
- Darwin arm(`aarch64-apple-darwin`)
#
**Environment**
1. Install `Rust` , you can go to the [official website](https://www.rust-lang.org/learn/get-started) to download and install.
2. Install Cmake
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
For Windows, you can also download and install Cmake from the [official website](https://cmake.org/download/).

3. Install FlatBuffers
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

If your system is not listed here, you can install FlatBuffers as follows:

```shell
$ git clone -b v22.9.29 --depth 1 https://github.com/google/flatbuffers.git && cd flatbuffers

# Select one of the following commands depending on the operating system
$ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Visual Studio 10" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Xcode" -DCMAKE_BUILD_TYPE=Release

$ sudo make install
```

**Compile**

```shell
git clone https://github.com/cnosdb/cnosdb.git && cd cnosdb
make build
```

**Run**

```shell
./target/debug/cnosdb run --deployment-mode singleton
```

#### **Run CLI**

In another terminal, run the following command in the same directory:

```shell
./target/debug/cnosdb-cli
```
**Notice**: Please refer to [cnosdb-cli](../reference/tools.md#client-cli) to view cli usage and pay attention to the IP address and port number.

:::


## Start a CnosDB Cluster

In CnosDB, the cnosdb program has a variety of startup modes
- `singleton` : meta, storage, and query services all reside in the same instance. Cluster mode is not supported.
- `query_tskv` : provides query and storage services in cluster mode.
- `query` : The instance provides only the query service and supports the cluster mode.
- `tskv` : The instance provides only storage services and supports cluster mode.

::: tip
CnosDB is hybrid deployment enabled, and you can customize the number of queries and storage services.
However, a complete cluster contains at least one meta service, one query service, and one storage service.

So in your CnosDB cluster, your collocation should look at least like this:
- 1 meta service
- One query_tskv service

or
- 1 meta service
- 1 query service
- 1 tskv service

In general, multiple meta services are deployed within a cluster service to ensure high availability of the cluster.

The cluster in this article is based on a 3 + 2 cluster distributed cluster, namely three meta services and two query_tskv services.

:::
::: tabs

@tab Docker

:::tip

The engineers are actively developing the Sandbox and it is not guaranteed to work at this stage.

1. Clone the repository
    ```shell
    git clone https://github.com/cnosdb/distributed-sandbox.git
    ```
2. Start the cluster
    ```shell
    cd distributed-sandbox
    chmod +x ./setup.sh
    ./setup.sh
    ```

@tab Ubuntu & Debian
>Please add the following records to your DNS resolution server to facilitate communication between instances in the CnosDB cluster. Contact your network administrator if necessary.

| Record type | host name                | host IP          |
|-------------|--------------------------|------------------|
| A           | `meta1.cnosdb.com`       | <meta1_ip>       |
| A           | `meta2.cnosdb.com`       | <meta2_ip>       |
| A           | `meta3.cnosdb.com`       | <meta3_ip>       |
| A           | `query_tskv1.cnosdb.com` | <query_tskv1_ip> |
| A           | `query_tskv2.cnosdb.com` | <query_tskv2_ip> |

#### **Install CnosDB Meta**

1. Download CnosDB Meta Service
    ```bash
    wget https://dl.cnosdb.com/packages/deb/cnosdb-meta_2.3-community-1_amd64.deb
    ```

2. Install CnosDB Meta 

    ```bash
    dpkg -i cnosdb-meta_2.3-community-1_amd64.deb
    ```
3. Edit  Configuration File

   > The Meta service configuration file is located `/etc/cnosdb/cnosdb-meta.conf`.

   Add the records added to the DNS server to the configuration file and assign different records to different Meta services.
    ```toml
    host = meta<n>.cnosdb.com
    ```
   Assign node_id to each Meta service. Ids must be unique.
    ```toml
    id = n
    ```
   The following is an example of the configuration file:
    ```toml
    id = n
    host = "meta<n>.cnosdb.com"
    port = 8901
    ... ...
4. Start CnosDB Meta Service
    ```bash
    systemctl start cnosdb-meta
    ```
   In Ubuntu 14.04 and previous versions and before Debina 9, use the following command to start.

    ```bash
    service cnosdb-meta start
    ```
5. Initialize Meta Service
   >If you have multiple Meta services in your cluster, you only need to execute the initialization command on one of the Meta services.
    ```bash
    curl http://meta1.cnosdb.com:8901/init -d '{}'
    ```
6. Add Other Meta Services to the Cluster
    ```bash
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[2, "meta2.cnosdb.com:8901"]' | jq
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[3, "meta3.cnosdb.com:8901"]' | jq
    ```
7. Reset cluster members to make the cluster effective
   > You can modify the cluster members by executing the following command, if you have multiple Meta services in your cluster, using the node that was initially initialized by the execution.
    ```bash
    curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
    ```
8. Inspect the cluster status
   > Specify different nodes and run the following command to view the cluster status.

   If the cluster is installed successfully, the following should be displayed:

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

#### **Install CnosDB**

1. Download CnosDB Service
    ```bash
    wget https://dl.cnosdb.com/packages/deb/cnosdb_2.3-community-1_amd64.deb
    ```

2. Install CnosDB Service

    ```bash
    dpkg -i cnosdb_2.3-community-1_amd64.deb
    ```

3. Edit Configuration File
   > CnosDB configuration is located to `/etc/cnosdb/cnosdb.conf`.

   Add the records added to the DNS server to the configuration file, and assign the different records to a different CnosDB service.
   
   ```toml
   host = "query_tskv<n>.cnosdb.com"
   ```
   change [deployment].mode to `query_tskv` .

   ```toml
    [deployment]
    mode = "query_tskv"
   ```
   
   Edit the node_id, node_id must be unique. 

   ```toml
    [node_basic]
    node_id = <n>
   ``` 
   Edit the meta cluster address.
   [cluster].name must be the same as [meta_init].cluster_name in the cnosdb-meta configuration.
   ```toml
    [cluster]
    name = "cluster_xxx"
    meta_service_addr = ['meta1.cnosdb.com:8901', 'meta2.cnosdb.com:8901', 'meta3.cnosdb.com:8901']
   ```

   The following is an example of the configuration file:
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
4. Start CnosDB Service
    ```bash
    systemctl start cnosdb
    ```
   In Ubuntu 14.04 and previous versions and before Debina 9, use the following command to start.

    ```bash
    service cnosdb start
    ```

@tab CentOS & RedHat
>Please add the following records to your DNS resolution server to facilitate communication between instances in the CnosDB cluster. Contact your network administrator if necessary.

| Record type | host name                | host IP          |
|-------------|--------------------------|------------------|
| A           | `meta1.cnosdb.com`       | <meta1_ip>       |
| A           | `meta2.cnosdb.com`       | <meta2_ip>       |
| A           | `meta3.cnosdb.com`       | <meta3_ip>       |
| A           | `query_tskv1.cnosdb.com` | <query_tskv1_ip> |
| A           | `query_tskv2.cnosdb.com` | <query_tskv2_ip> |

#### **Install CnosDB Meta**

1. Download CnosDB Meta Service

    ```bash
    wget https://dl.cnosdb.com/packages/rpm/cnosdb-meta-2.3_community-1.x86_64.rpm
    ```
2. Install CnosDB Meta Service

    ```bash
    yum localinstall cnosdb-meta-2.3_community-1.x86_64.rpm
    ```
3. Edit Configuration File

   > The Meta service configuration file is located `/etc/cnosdb/cnosdb-meta.conf`.

   Add the records added to the DNS server to the configuration file and assign different records to different Meta services.
    ```toml
    host = meta<n>.cnosdb.com
    ```
   Assign node_id to each Meta service. Ids must be unique.
    ```toml
    id = n
    ```
   The following is an example of the configuration file:
    ```toml
    id = n
    host = "meta<n>.cnosdb.com"
    port = 8901
    ... ...
4. Start CnosDB Meta Service
    ```bash
    systemctl start cnosdb-meta
    ```
   In Ubuntu 14.04 or previous version of Debina 9, use the following command to start. 

    ```bash
    service cnosdb-meta start
    ```
5. Initialize Meta Service
   >If you have multiple Meta services in your cluster, you only need to execute the initialization command on one of the Meta services.
    ```bash
    curl http://meta1.cnosdb.com:8901/init -d '{}'
    ```
6. Add Other Meta Services to the Cluster
    ```bash
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[2, "meta2.cnosdb.com:8901"]' | jq
    curl http://meta1.cnosdb.com:8901/add-learner -H "Content-Type: application/json" -d '[3, "meta3.cnosdb.com:8901"]' | jq
    ```
7. Reset cluster members to make the cluster effective
   > You can modify the cluster members by executing the following command, if you have multiple Meta services in your cluster, using the node that was initially initialized by the execution.
    ```bash
    curl http://meta1.cnosdb.com:8901/change-membership -H "Content-Type: application/json" -d '[1,2,3]' | jq
    ```
8. Inspect the cluster status
   > Specify different nodes and run the following command to view the cluster status.

   If the cluster is installed successfully, the following should be displayed:

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

#### **Install CnosDB**
1. Download CnosDB Service

   ```bash
   wget https://dl.cnosdb.com/packages/rpm/cnosdb-2.3_community-1.x86_64.rpm
   ```
2. Install CnosDB Service

    ```bash
    yum localinstall cnosdb-2.3_community-1.x86_64.rpm
    ```

3. Edit Configuration File
   > CnosDB configuration is located to `/etc/cnosdb/cnosdb.conf`.

   Add the records added to the DNS server to the configuration file, and assign the different records to a different CnosDB service.

   ```toml
   host = "query_tskv<n>.cnosdb.com"
   ```
   change [deployment].mode to `query_tskv` .

   ```toml
    [deployment]
    mode = "query_tskv"
   ```

   Edit the node_id, node_id must be unique.

   ```toml
    [node_basic]
    node_id = <n>
   ``` 
   Edit the meta cluster address.
   [cluster].name must be the same as [meta_init].cluster_name in the cnosdb-meta configuration.
   ```toml
    [cluster]
    name = "cluster_xxx"
    meta_service_addr = ['meta1.cnosdb.com:8901', 'meta2.cnosdb.com:8901', 'meta3.cnosdb.com:8901']
   ```

   The following is an example of the configuration file:
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
4. Start CnosDB Service
    ```bash
    systemctl start cnosdb
    ```
   In Ubuntu 14.04 and previous versions and before Debina 9, use the following command to start.

    ```bash
    service cnosdb start
    ```
@tab Helm
to be continued!

@tab Source

**Platform Supported**
We support the following platform, if can find outside the list of platforms, please [contract] (https://github.com/cnosdb/cnosdb/issues) us.

- Linux x86(`x86_64-unknown-linux-gnu`)
- Darwin arm(`aarch64-apple-darwin`)
#
**Compile Environment**
1. Install Rust, you can go to the [official website](https://www.rust-lang.org/learn/get-started) to download and install.
2. Install Cmake
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

For Windows, you can also download and install Cmake from the [official website](https://cmake.org/download/).

3. Install Flatbuffers
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

If your system is not listed here, you can install FlatBuffers as follows:

```shell
$ git clone -b v22.9.29 --depth 1 https://github.com/google/flatbuffers.git && cd flatbuffers

# Select one of the following commands depending on the operating system
$ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Visual Studio 10" -DCMAKE_BUILD_TYPE=Release
$ cmake -G "Xcode" -DCMAKE_BUILD_TYPE=Release

$ sudo make install
```

**Compile**

```shell
git clone https://github.com/cnosdb/cnosdb.git && cd cnosdb
make build
```

**Run CnosDB Meta**
```shell
./target/debug/cnosdb-meta --config ./meta/config/config.toml
```

**Run CnosDB**
```shell
./target/debug/cnosdb-meta --config ./meta/config/config.toml
./target/debug/cnosdb run -M <deployment>
```

:::