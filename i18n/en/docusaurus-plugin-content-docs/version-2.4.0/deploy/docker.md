---
sidebar_position: 1
---

Import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker

[Docker](https://docs.docker.com/get-docker/) allows you to install CnosDB instance on any local system, which is the easiest way to install CnosDB.

## Use Docker to start a single instance

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

```shell
docker run --name cnosdb -p 8902:8902 -d cnosdb/cnosdb:community-latest cnosdb run -M singleton
```

</TabItem>

<TabItem value="Enterprise" label="企业版">

:::info
Please contact us if you want to get an installation package for the enterprise version.
:::

```shell
docker run --name cnosdb -p 8902:8902-d <enterprise-image> cnosdb run -M singleton
```




## Launch a cluster using Docker

For quick start, we have developed an example using [Docker Compose](https://docs.docker.com/compose/install/) to quickly start a CnosDB cluster.

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

1. Clone Repository

```shell
git clone https://github.com/cnosdb/distrobuted-sandbox.git
```

2. Start cluster

```shell
cd distrobuted-sandbox
chmod +x ./setup.sh
./setup.sh
```


<TabItem value="Enterprise" label="企业版">

:::info
Install the CnosDB corporate cluster using sandbox. Please note that you can access it by contacting us by modifying the image name and configuration License.
:::

1. Clone Repository

```shell
git clone https://github.com/cnosdb/distrobuted-sandbox.git
```

2. Start cluster

```shell
cd distrobuted-sandbox
chmod +x ./setup.sh
./setup.sh
```


