---
title: Thingsboard
slug: /thingsboard
---

在物联网（IoT）应用中，遥测数据的收集和存储至关重要。ThingsBoard 是一个开源物联网平台，支持设备管理、数据可视化和分析。而 CnosDB 是一个高性能的时序数据库，专为处理大量时间序列数据而设计。本文将介绍如何将 ThingsBoard 与 CnosDB 集成，以存储和管理遥测数据。

## **环境准备**

在开始之前，请确保您已准备好以下环境：

1. **Docker**：运行 ThingsBoard 以及 CnosDB 的容器。
2. **开发环境**：Python、Java 或其他编程语言，用来运行程序模拟 IoT 设备。

## **步骤一：启动 CnosDB**

CnosDB 的安装运行可以参考官方文档。运行如下命令，通过 Docker 启动 CnosDB：

```shell
docker network create tb-cnosdb
docker run -d --name cnosdb --network tb-cnosdb cnosdb/cnosdb:community-latest
```

执行 `SHOW DATABASES` 命令，验证 CnosDB 是否成功启动：

```shell
docker exec cnosdb curl -s -X POST -u 'root:' 'http://127.0.0.1:8902/api/v1/sql' -d 'SHOW DATABASES'
```

若输出如下数据，则说明 CnosDB 启动并初始化成功：

```shell
database_name
cluster_schema
public
usage_schema
```

## **步骤二：启动 ThingsBoard（CnosDB）**

以 ThingsBoard-v3.7 为基础开发，添加了使用 CnosDB 存储时序数据的功能，获取安装包请[联系我们](https://jsj.top/f/qrj9lq)。

通过设置配置文件中的 `database.ts.type=cnosdb` 或环境变量 `DATABASE_TS_TYPE=cnosdb` 来启动 ThingsBoard 的混合模式（实体数据存储至 PostgreSQL，时序数据存储至 CnosDB）。

在通过混合模式启动 ThingsBoard 时，需要额外配置时序数据库的部分，以下介绍时序数据库 CnosDB 的相关配置项：

- `cnosdb.host` 或环境变量 `CNOSDB_HOST` - 数据库 JDBC 服务的 IP 和端口号，默认为 `127.0.0.1:8904`。
- `cnosdb.tenant` 或环境变量 `CNOSDB_TENANT` - CnosDB 租户名称，默认为 `cnosdb`。
- `cnosdb.database` 或环境变量 `CNOSDB_DATABASE` - CnosDB 数据库名称，默认为 `thingsboard`。
- `cnosdb.user` 或环境变量 `CNOSDB_USER` - CnosDB 用户名。
- `cnosdb.password` 或环境变量 `CNOSDB_PASSWORD` - CnosDB 密码。

配置文件示例：

```
cnosdb:
  host: 'cnosdb:8904'
  tenant: 'cnosdb'
  database: 'thingsboard'
  user: 'root'
  password: 'root'
```

以下是使用 Docker 安装 ThingsBoard 的基本步骤：

导入镜像

```
docker load -i tb-postgres-cnosdb.tar
```

启动 ThingsBoard（CnosDB），暴露 HTTP 接口 9090 和 MQTT 接口 1883

```
docker run -d --name thingsboard --network test \
  -p 9090:9090 -p 1883:1883 \
  -e TB_QUEUE_TYPE=in-memory \
  -e DATABASE_TS_TYPE=cnosdb \
  -e _JAVA_OPTIONS='--add-opens=java.base/java.nio=org.apache.arrow.memory.core,ALL-UNNAMED' \
  -e CNOSDB_HOST='cnosdb:8904' \
  cnosdb/tb-postgres-cnosdb:0.0.1
```

访问 [http://127.0.0.1:9090](http://localhost:9090)，您将看到 ThingsBoard 的登录界面。

![](/img/eco/thingsboard/5fc2f2c3-5ca1-433a-b136-f7f0872b6185.png)

接下来，使用默认的租户登陆租户界面：

- 用户名：`tenant@thingsboard.org`
- 密码：`tenant`

![](/img/eco/thingsboard/7c640c9d-1180-484b-8488-4f3d1d095628.png)

## **步骤三：启动模拟设备**

在 ThingsBoard 中，您需要创建一个新的设备，并配置数据源以将数据发送到 CnosDB。

1. 登录 ThingsBoard 控制台。
2. 打开“实体/设备”界面，点击右上角“添加设备”，创建一个新设备，记录下设备的访问令牌（Access token）。

![](/img/eco/thingsboard/31626078-49fc-4048-ba00-3e2f15218ca1.png)

1. 使用 Python 或其他语言编写脚本，将遥测数据发送到 ThingsBoard。以下是一个示例：

首先安装 ThingsBoard 的 MQTT 客户端 `tb-mqtt-client` 以及依赖的组件 `paho-mqtt`：

```shell
pip3 install paho-mqtt
pip3 install tb-mqtt-client
```

编写 Python 脚本：

```python
from tb_device_mqtt import TBDeviceMqttClient, TBPublishInfo
import time
import random

# 初始化 MQTT 客户端
client = TBDeviceMqttClient(host="127.0.0.1", username="访问令牌")
# 连接 ThingsBoard
client.connect()
# 每 10 秒发送一次遥测数据，共发送 10 次
# 遥测数据包含 temperature、enabled、currentFirmwareVersion 三个属性
for _ in range(10):
    telemetry = {"temperature": random.uniform(10, 15), "enabled": True, "currentFirmwareVersion": "v1.1.0"}
    # 发送遥测数据(默认 QoS = 1)
    result = client.send_telemetry(telemetry)
    # 调用阻塞函数 get() 来取得发送结果
    is_success = result.get() == TBPublishInfo.TB_ERR_SUCCESS
    print("Telemetry was published:", is_success)
    # 等待 10 秒
    time.sleep(10)
# 断开连接
client.disconnect()
```

1. 运行 Python 脚本：

```shell
python3 ./python/mqtt.py 
```

预期输出如下：

```shell
Waiting for connection to be established before sending data to ThingsBoard!
Telemetry was published: True
Telemetry was published: True
Telemetry was published: True
Telemetry was published: True
Telemetry was published: True
Telemetry was published: True
Timeout while waiting for service configuration!, session will use default configuration.
Telemetry was published: True
Telemetry was published: True
Telemetry was published: True
Telemetry was published: True
MQTT client was disconnected with reason code 0 (The operation completed successfully.)
```

## **步骤四：验证数据存储**

1. 打开“实体/设备”界面，在列表中点击设备，在弹出页面中点击“复制设备 ID”。

![](/img/eco/thingsboard/5eecdaf48460cde582b1e03bba8d2ebc1cdf.png)

执行 SQL 验证数据存储。

```shell
docker exec cnosdb curl -s -X POST -u 'root:' 'http://127.0.0.1:8902/api/v1/sql?db=thingsboard' -d "SELECT * FROM ts_kv WHERE entity_id = '设备ID' ORDER BY time ASC"
```

正确运行的情况下，结果如下所示：

```
time,entity_type,entity_id,key,partition,bool_v,str_v,long_v,dbl_v,json_v
2024-05-09T07:08:09.466000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.466000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.466000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,12.730445863623686,
2024-05-09T07:08:09.480000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.480000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.480000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,12.730445863623686,
2024-05-09T07:08:09.493000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.493000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.493000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,14.663143608620802,
2024-05-09T07:08:09.500000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.500000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.500000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,14.663143608620802,
2024-05-09T07:08:09.532000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.532000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.532000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,14.078936704849081,
2024-05-09T07:08:09.552000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.552000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.552000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,14.078936704849081,
2024-05-09T07:08:09.566000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.566000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.566000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,14.704042825901556,
2024-05-09T07:08:09.567000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.567000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.567000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,14.704042825901556,
2024-05-09T07:08:09.577000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.577000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.577000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,13.731712874911237,
2024-05-09T07:08:09.580000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,58,,,v1.1.0,,,
2024-05-09T07:08:09.580000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,57,,true,,,,
2024-05-09T07:08:09.580000000,,4d91a170-797c-11ef-a9f4-41fb9b44b87d,39,,,,,13.731712874911237,
```

## **步骤五：展示数据**

关于仪表板的使用，详见官方文档。

创建仪表板展示数据

1. 打开“仪表板”界面，点击右上角的“创建仪表板”按钮，设置仪表板名称，点击右下角的“添加”前往仪表板布局界面。

![](/img/eco/thingsboard/d1a8fc20-351d-4c31-92ad-bdbbfab980a2.png)

1. 点击“添加部件”，弹出“选择部件包”窗口，选择“Charts”，并选择“Time series chart”，进入图表设置界面。

![](/img/eco/thingsboard/78e58247-1975-4680-ad16-3f9c73020387.png)

1. 点击“数据源”输入框，选择刚才创建的设备，点击右下角的“添加”，回到仪表板布局界面。

![](/img/eco/thingsboard/4cc26fe2-8eff-4180-9ae7-18b3ff23c8a2.png)

1. 添加的图表应该会表现为一个折线图，展示模拟设备不断推送至 ThingsBoard 的遥测数据。

![](/img/eco/thingsboard/930c5cc0-20ff-4c3a-9c5f-391e60a4c3be.png)

## **结论**

通过将 ThingsBoard 与 CnosDB 集成，您可以高效地存储和管理遥测数据。这种组合不仅提高了数据处理能力，还增强了数据的可视化和分析能力。希望本文能帮助您顺利完成集成。如果您有任何问题或建议，请随时联系。
