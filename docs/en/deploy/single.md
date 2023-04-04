---
title: Single
order: 2
---

# Single

## Docker

1.  Install [Docker](https://www.docker.com/products/docker-desktop/)

2.  Start containers with Docker

   ```
   docker run --name cnosdb -d  --env cpu=2 --env memory=4 -p 31007:31007 cnosdb/cnosdb:v2.0.1
   ```

3.  Enter the container

   ```
    docker exec -it cnosdb sh
   ```

4.  Run cnosdb-cli

   ```
    cnosdb-cli
   ```

   The following will be displayed:

   ```
    CnosDB CLI v2.0.0
    Input arguments: Args { host: "0.0.0.0", port: 31007, user: "cnosdb", password: None, database: "public", target_partitions: Some(1), data_path: None, file: [], rc: None, format: Table, quiet: false }
    public ❯
   ```

   ::: tip
   Please enter \q to exit
   
   To view help please enter \\?
   
   :::

## Kubernetes

### Helm

1.  Prepare the Kubernetes environment

2.  Execute the following command:

   ```
    git clone https://github.com/cnosdb/cloud-deploy.git
    cd helm-chart
    helm install cnosdb .
   ```

### Terraform

1.  Clone Deployment Warehouse

   ```
    git clone https://github.com/cnosdb/cloud-deploy.git
    cd terraform
   ```

2.  Create

   ```
    terraform init
   ```

3.  Deploy

   ```
    terraform apply
   ```

4.  Login; The third step will give you the public IP of CnosDB

5.
   ```shell
    chmod 400 /root/.ssh/id_rsa
    ssh ubuntu@<cnosdb-public-ip>
   ```

Ports 22 and 31007 are open, you could add IP whitelist in main.tf file.

## Source Code Installation

### Supported Platforms

We support the following platforms, please [report](https://github.com/cnosdb/cnosdb/issues) to us if you find it works on platforms other than those listed.

*   Linux x86(`x86_64-unknown-linux-gnu`)

*   Darwin arm(`aarch64-apple-darwin`)


### Compilation Environment

i. Install Rust, you can go to the [official website](https://www.rust-lang.org/learn/get-started) to download and install.

ii. Install Cmake

```
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

iii. Install Flatbuffers

```
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

```
    $ git clone -b v22.9.29 --depth 1 https://github.com/google/flatbuffers.git && cd flatbuffers
    
    # Select one of the following commands depending on the operating system
    $ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release
    $ cmake -G "Visual Studio 10" -DCMAKE_BUILD_TYPE=Release
    $ cmake -G "Xcode" -DCMAKE_BUILD_TYPE=Release
    
    $ sudo make install
```

### Compile

```shell
git clone https://github.com/cnosdb/cnosdb.git && cd cnosdb
make build
```

### **Run**

#### **Run a distributed memory/compute split database service**

##### v2.1
```shell
## 单meta，data，query节点
./target/debug/cnosdb-meta --config ./meta/config/config_21001.toml
./target/debug/cnosdb tskv --cpu 4 --memory 64
./target/debug/cnosdb query --cpu 4 --memory 64
```

##### v2.2
    ```shell
    ./target/debug/cnosdb-meta --config ./meta/config/config_21001.toml
    ./target/debug/cnosdb run --deployment-mode tskv --cpu 4 --memory 64
    ./target/debug/cnosdb run --deployment-mode query --cpu 4 --memory 64
    ```

#### **Running distributed memory and computing integrated database services**

```shell
## 单meta，cnosdb节点
./target/debug/cnosdb-meta --config ./meta/config/config_21001.toml
./target/debug/cnosdb run --cpu 4 --memory 64
```
#### **Run single database instance**

##### v2.1
```shell
./target/debug/cnosdb singleton --cpu 4 --memory 64
```
##### v2.2
```shell
./target/debug/cnosdb run --deployment-mode singleton --cpu 4 --memory 64
```

#### **Run CLI**
On another terminal, run the following command in the same directory:

```shell
cargo run --package client --bin client
```
**Attention**: Please refer to the [cnosdb-cli manual](../reference/tools.md#client-cli) to view cli usage and pay attention to the IP address and port number.

