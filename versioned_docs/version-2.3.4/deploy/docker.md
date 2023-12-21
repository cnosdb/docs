---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker

[Docker](https://docs.docker.com/get-docker/) 可以让你在任何本地系统上安装 CnosDB 实例，这是安装 CnosDB 最简单的方法。

## 使用 Docker 启动一个单机实例

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

```shell
docker run --name cnosdb -p 8902:8902 -d cnosdb/cnosdb:community-latest cnosdb run -M singleton
```

</TabItem>

<TabItem value="Enterprise" label="企业版">

:::info
如需获取企业版的安装包，请联系我们。
:::

```shell
docker run --name cnosdb -p 8902:8902 -d <enterprise-image> cnosdb run -M singleton
```

</TabItem>
</Tabs>

## 使用 Docker 启动一个集群

为了快速启动，我们已经使用 [Docker Compose](https://docs.docker.com/compose/install/) 编写了一个示例，旨在迅速启动一个 CnosDB 集群。

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

1. 克隆仓库

```shell
git clone https://github.com/cnosdb/distributed-sandbox.git
```

2. 启动集群

```shell
cd distributed-sandbox
chmod +x ./setup.sh
./setup.sh
```

</TabItem>
<TabItem value="Enterprise" label="企业版">

:::info
 使用 sandbox 安装 CnosDB 企业版集群，请注意修改镜像名称和配置 License，你可以通过联系我们获取。
:::

1. 克隆仓库

```shell
git clone https://github.com/cnosdb/distributed-sandbox.git
```

2. 启动集群

```shell
cd distributed-sandbox
chmod +x ./setup.sh
./setup.sh
```

</TabItem>
</Tabs>

