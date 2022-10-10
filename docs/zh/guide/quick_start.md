---
title: 快速开始
icon: config
order: 2
---

## Docker

```shell
docker run -itd -p 31007:31007 cnosdb/cnosdb
```

## **从源码开始**

### **支持平台**

我们支持以下平台，如果发现可以在列表以外的平台上运行，请报告给我们。

- Linux x86(`x86_64-unknown-linux-gnu`)
- Darwin arm(`aarch64-apple-darwin`)

### **前置条件**

1. 按照[此页面](https://www.rust-lang.org/learn/get-started)下载和安装`Rust`
2. Cmake
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
    对于Windows，你也可以在[此页面](https://cmake.org/download/)下载和安装Cmake
3. FlatBuffers

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
    如果您的系统不在此列，需要自行编译
    ```shell
    $ git clone -b v2.0.6 --depth 1 https://github.com/google/flatbuffers.git && cd flatbuffers

    # 根据操作系统选择以下命令之一
    $ cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release
    $ cmake -G "Visual Studio 10" -DCMAKE_BUILD_TYPE=Release
    $ cmake -G "Xcode" -DCMAKE_BUILD_TYPE=Release

    $ sudo make install
    ```

### **编译**
```shell
$ git clone https://github.com/cnosdb/cnosdb.git && cd cnosdb
$ cargo build
```

### **运行**
```shell
$ cargo run -- run --cpu 4 --memory 64
```




## 基本操作
> 有关更多关于数据库的操作请参考：
>
> [SQL](reference/sql.md)
>
> [编程接口](reference/api.md)


### 创建数据库
TODO
```

```
正确的执行，会返回以下内容：
```
```

### 写入您的第一条数据
TODO
```
```
正确的执行，会返回以下内容：
```
```

### 使用SQL查询数据
TODO
```
```
正确的执行，会返回以下内容：
```
```