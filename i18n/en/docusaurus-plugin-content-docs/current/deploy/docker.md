---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker

[Docker](https://docs.docker.com/get-docker/) allows you to install a CnosDB instance on any local system, which is the easiest way to install CnosDB.

## Start a standalone instance using Docker

<Tabs groupId="editions">
<TabItem value="Community" label="Community">

```shell
docker run --name cnosdb -p 8902:8902 -d cnosdb/cnosdb:community-latest cnosdb run -M singleton
```

</TabItem>

<TabItem value="Enterprise" label="Enterprise">

:::info
Please contact us to obtain the installation package for the enterprise version.
:::

```shell
docker run --name cnosdb -p 8902:8902 -d <enterprise-image> cnosdb run -M singleton
```

</TabItem>
</Tabs>

## Start a cluster using Docker

To quickly get started, we have written an example using [Docker Compose](https://docs.docker.com/compose/install/) to quickly start a CnosDB cluster.

<Tabs groupId="editions">
<TabItem value="Community" label="Community">

1. Clone Repository

```shell
git clone https://github.com/cnosdb/distributed-sandbox.git
```

2. Starting the cluster

```shell
cd distributed-sandbox
chmod +x ./setup.sh
./setup.sh
```

</TabItem>
<TabItem value="Enterprise" label="Enterprise">

:::info
When installing the CnosDB Enterprise Edition cluster using sandbox, please pay attention to modifying the image name and configuring the License. You can contact us to obtain it.
:::

1. Clone Repository

```shell
git clone https://github.com/cnosdb/distributed-sandbox.git
```

2. Starting the cluster

```shell
cd distributed-sandbox
chmod +x ./setup.sh
./setup.sh
```

</TabItem>
</Tabs>