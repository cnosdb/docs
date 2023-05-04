---

title: Cluster Expansion
order: 4

---

# Cluster Expansion

## **Installation**

Reference [Source Code Installation](../deploy/)。

## **Start**

Meta Cluster is a Raft Group composed of multiple cnos-meta via Raft protocol.

### **Single-node startup process**

```sh
./target/debug/cnosdb-meta --id 1 --http-addr 127.0.0.1:21001
curl http://127.0.0.1:21001/init -d '{}'
curl http://127.0.0.1:21001/metrics
./target/debug/cnosdb run --config ./config/config_31001.toml
```

### **Cluster Startup Process**

### **Meta Custer Startup Process**

Start meta-1

```sh
./target/debug/cnosdb-meta --id 1 --http-addr 127.0.0.1:21001
```

**Start meta-2**

```sh
./target/debug/cnosdb-meta --id 2 --http-addr 127.0.0.1:21002
```

**Start meta-3**

```sh
./target/debug/cnosdb-meta --id 3 --http-addr 127.0.0.1:21003
```

**Initialize meta**

```sh
curl http://127.0.0.1:21001/init -d '{}'
curl http://127.0.0.1:21001/add-learner -H "Content-Type: application/json" -d '[2, "127.0.0.1:21002"]'
curl http://127.0.0.1:21001/add-learner -H "Content-Type: application/json" -d '[3, "127.0.0.1:21003"]'
curl http://127.0.0.1:21001/change-membership -H "Content-Type: application/json" -d '[1, 2, 3]'
```

**View meta cluster status**

```sh
curl http://127.0.0.1:21001/metrics
curl http://127.0.0.1:21002/metrics
curl http://127.0.0.1:21003/metrics
```

#### **Data Cluster Startup Process**

**Start data-1**

```sh
./target/debug/cnosdb run --config ./config/config_31001.toml
```

**Start data-2**

```sh
./target/debug/cnosdb run --config ./config/config_32001.toml
```

## **Overview**

In the CnosDB cluster version, individual running instances are called Nodes, and each Node is divided into two roles: Meta and Data.

### Meta

Meta maintains cluster metadata, such as Table Schema, Node survival heartbeat and load data, Vnode to Node mapping relationships, etc.

Metadata is frequently accessed by each Node, and CnosDB chooses to maintain a strongly consistent Meta Node cluster, where Nodes subscribe to the Meta Node to pull information of interest, and all updates to metadata information are made through the Meta Node cluster.。

<img src="/_static/img/cluster_metas.jpg" style="width:50% "/>

### Data

Provides TCP Service to accept query and write requests distributed by Coodinator, which are similar to the standalone version.

### **Data Flow**

![](/_static/img/cluster_data_flow.jpg)

### **Configuration**

### Data

The following describes the configuration file of CnosDB Cluster Edition

```toml
#reporting_disabled = false
host = "localhost"

[deployment]
#mode = 'singleton'
#cpu = 4
#memory = 16

[query]
max_server_connections = 10240
query_sql_limit = 16777216   # 16 * 1024 * 1024
write_sql_limit = 167772160   # 160 * 1024 * 1024
auth_enabled = false

[storage]
# Directory for summary: $path/summary/
# Directory for index: $path/index/$database/
# Directory for tsm: $path/data/$database/tsm/
# Directory for delta: $path/data/$database/delta/
path = '/tmp/cnosdb/1001/db'
max_summary_size = "128M" # 134217728
base_file_size = "16M" # 16777216
flush_req_channel_cap = 16
compact_trigger_file_num = 4
compact_trigger_cold_duration = "1h"
max_compact_size = "2G" # 2147483648
max_concurrent_compaction = 4
strict_write = false

[wal]
enabled = true
path = '/tmp/cnosdb/1001/wal'
wal_req_channel_cap = 64
max_file_size = "1G" # 1073741824
flush_trigger_total_file_size = "2G" # 2147483648
sync = false
sync_interval = "0"

[cache]
max_buffer_size = "128M" # 134217728
max_immutable_number = 4

[log]
level = 'info'
path = '/tmp/cnosdb/1001/log'

[security]
# [security.tls_config]
# certificate = "./config/tls/server.crt"
# private_key = "./config/tls/server.key"

[cluster]
name = 'cluster_xxx'
meta_service_addr = ["127.0.0.1:8901"]

http_listen_port = 8902
grpc_listen_port = 8903
flight_rpc_listen_port = 8904
tcp_listen_port = 8905

[node_basic]
node_id = 1001 
cold_data_server = false
store_metrics = true

[heartbeat]
report_time_interval_secs = 30

[hinted_off]
enable = true
path = '/tmp/cnosdb/1001/hh'
```

#### **Configuration item query**

| **Configuration items** | **Default Value** | **Description**                                                                                                                                                       |
|-------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| max_server_connections  | 10240             | Maximum number of simultaneous SQL executions                                                                                                                         |
| query_sql_limit         | 16777216          | Maximum length of SQL (bytes)                                                                                                                                         |
| auth_enabled            | false             | Whether to check the identity information of each query request, when set to true, the execution of SQL will check whether the user has the corresponding permission. |

#### Configuration storage

| **Configuration items** | **Default Value** | **Description**                                                                                                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| path                    | data/db           | Database file storage path                                                                                                                                 |
| max_summary_size        | 134217728         | Maximum size (in bytes) of a single database summary file, create a new summary file when the size is reached                                              |
| max_level               | 4                 | Maximum hierarchy of database files                                                                                                                        |
| base_file_size          | 16777216          | Database file size (bytes)                                                                                                                                 |
| compact_trigger         | 4                 | When the number of files in level 0 is reached, the compression task is started and the files are merged into a higher level                               |
| max_compact_size        | 2147483648        | Total maximum selected file size per compaction job (bytes)                                                                                                |
| strict_write            | false             | Whether to ensure that each write request strictly conforms to the Table's Schema; when set to true, write requests are not checked for Schema conformance |

#### Configuration wal

| **Configuration items** | **Default Value** | **Description**                                                                                                             |
|-------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------|
| enabled                 | true              | Whether to enable WAL for disaster recovery support, when set to ture, write requests will be written to the WAL file first |
| path                    | data/wal          | WAL file directory                                                                                                          |
| sync                    | false             | Whether to ensure that every WAL write request is flushed to disk                                                           |

#### Configuration cache

| **Configuration items** | **Default Value** | **Description**                                                                                                                |
|-------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------|
| max_buffer_size         | 134217728         | Maximum writable size (in bytes) per active cache in a single Vnode                                                            |
| max_immutable_number    | 4                 | The maximum number of inactive caches in a single Vnode, and when the number is reached, the inactive cache is written to disk |

#### Configuration log

| **Configuration items** | **Default Value** | **Description**                    |
|-------------------------|-------------------|------------------------------------|
| level                   | info              | Logging level, optionally  trace \ | debug \| info \| warn \| error |
| path                    | data/log          | Log file directory                 |

#### Configuration security

**security.tls_confg**

| **Configuration items** | **Default Value**   | **Description**     |
|-------------------------|---------------------|---------------------|
| certificate             | data/tls/server.crt | data/tls/server.crt |
| private_key             | data/tls/server.key | data/tls/server.key |

#### Configuration cluster

| **Configuration items** | **Default Value** | **Description**                      |
|-------------------------|-------------------|--------------------------------------|
| name                    | cluster_xxx       | Data Node Name                       |
| meta                    | 127.0.0.1:8901   | Meta Node Address                    |
| flight_rpc_listen_port       | 8902   | Flight RPC Service Listening Port |
| http_listen_port             | 8903   | HTTP Service Listening Port       |
| grpc_listen_port             | 8904   | GRPC Service Listening Port       |
| tcp_listen_port              | 8905   | TCP Service Listening Port        |

#### Configuration node_basic

|  **Configuration items**               | **Default Value**             | **Description**                  |
|-------------------|-----------------|---------------------|
| node_id           | 100             | Data Node ID          |
| cold_data_server  | true            | Whether to use this node when allocating vnode        |
| store_metrics     | true            | Whether to store metrics in db |

#### Configuration heartbeat

|  **Configuration items**               |  **Default Value**             |   **Description**                |
|-------------------|-----------------|---------------------|
| report_time_interval_secs | 30             | The frequency at which Data nodes report information such as time stamps and disk remaining capacity         |

#### Configuration hintedoff

| **Configuration items** | **Default Value** | **Description**                                                                                                                                                          |
|-------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| enable                  | true              | Whether to enable Hinted Off for consistency support, when set to true, failed write requests will automatically enter the hinted-off queue and be retried automatically |
| path                    | data/hh           | Hinted Off persistent directory                                                                                                                                          |

## **Operations and Maintenance Guide**

### **Cluster maintenance (coming soon)**

**Transferring Vnode**

```
MOVE VNODE [vnode_id] TO NODE [node_id]
```

**Copy Vnode**

```
COPY VNODE [vnode_id] TO NODE [node_id]
```

**Delete Vnode**

```
DROP VNODE <vnode_id>
```

**Compression Vnode**

```
COMPACT VNODE <vnode_id>[, <vnode_id>[, ...]]
```

**Checking Group Data Consistency**

```
CHECKSUM GROUP <replication_set_id>
```
