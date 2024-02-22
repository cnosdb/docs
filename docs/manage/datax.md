---
sidebar_position: 4
---

# 数据迁移

本文介绍如何使用 DataX 将来自其他数据源的数据导入至 CnosDB 中。

## 迁移工具 DataX

DataX 是阿里巴巴开源的离线数据同步工具/平台，能够实现各种异构数据源之间高效的数据同步功能。

为了能够应对不同数据源的差异，DataX 将不同的数据源的同步抽象为从源头数据源读取数据的 Reader 插件，以及向目标端写入数据的 Writer 插件，读写插件之间类型转换、性能统计等通用功能则由 DataX 框架提供。用户只需要通过配置文件定义 Reader 插件与 Writer 插件，即可轻松实现异构数据同步。DataX 的配置文件一般如下所示：

```json
{
    "job": {
        "content": [
            {
                "reader": {
                    Reader 配置
                    ...
                },
                "writer": {
                    Writer 配置
                    ...
                }
            }
        ],
        "setting": {
            其他配置
            ...
        }
    }
}
```

我们提供了 Writer 插件 CnosDBWriter，您可以通过配置该插件，通过 DataX 将其他数据源的数据导入至 CnosDB 中。

## 插件 CnosDBWriter

插件 cnosdbwriter 通过读取 Reader 插件生成的协议数据，生成无模式的写入语句并发送到 CnosDB。

- 支持 OpenTSDB 的数据格式（通过配置 format = "opentsdb"）。
- 支持配置每批次写入的最大行数（通过配置 batchSize）与最大字节数（通过配置 bufferSize）。
- 支持配置输入数据的时间精度（毫秒、微秒、纳秒）。

### 配置参数

| 配置参数           | 描述                                                                                        | 是否必选 | 默认值                                  |
|----------------|-------------------------------------------------------------------------------------------|------|--------------------------------------|
| cnosdbWriteAPI | CnosDB 写 API 的 URL，字符串                                                                    | 否    | `http://127.0.0.1:8902/api/v1/write` |
| tenant         | 租户，字符串                                                                                    | 否    | `cnosdb`                             |
| database       | 数据库，字符串                                                                                   | 否    | `public`                             |
| username       | 用户名，字符串                                                                                   | 否    | `root`                               |
| password       | 密码，字符串                                                                                    | 否    | `root`                               |
| batchSize      | 每批次写入 CnosDB 的最大行数，无符号整数                                                                  | 否    | `1000`                               |
| bufferSize     | 每批次写入 CnosDB 的最大字节数，无符号整数                                                                 | 否    | `8388608`                            |
| format         | Reader 所使用的格式，字符串；如果 Reader 使用了特殊格式（如 opentsdbreader），那么需要提供该配置；可选值为 `datax`, `opentsdb`。 | 否    | `datax`                              |
| table          | 表，字符串；当 format 为 `opentsdb` 时不需要配置。                                                       | 是    | -                                    |
| tags           | Map 类型，Tag 名称与对应输入列的序号（无符号整数，从 0 开始）的映射；仅当 format 为 `datax` 时生效。详细格式见下方说明。                | 是    | -                                    |
| fields         | Map 类型，Field 名称与对应输入列的序号（无符号整数，从 0 开始）的映射；仅当 format 为 `datax` 时生效。详细格式见下方说明。              | 是    | -                                    |
| timeIndex      | 时间字段对应输入列的序号，无符号整数，从 0 开始；仅当 format 为 `datax` 时生效。                                        | 是    | -                                    |
| precision      | 输入数据的时间戳精度，字符串；可选值为`s`,  `ms`，`us`，`ns`，分别对应秒、毫秒、微秒、纳秒。                                   | 否    | `ms`                                 |
| tagsExtra      | Map 类型，配置额外的 Tag，作为每一行数据的额外的列，一并导入到 CnosDB 中。详细格式见下方说明。                                   | 否    | -                                    |
| fieldsExtra    | Map 类型，配置来自 reader 的某些列的数据输出至 CnosDB 的哪些表、列中。仅当 format 为 `opentsdb` 时生效。详细格式见下方说明。        | 否    | -                                    |

注意事项：

- 配置项 batchSize 与 bufferSzie 任意条件满足时，该批次数据立刻被发送至 CnosDB，同时清空缓冲区。例如当 batchSize=1000、bufferSize=1048576 时，如果缓冲区的行数达到 1000，即使数据没有达到 1MB，也会被发送；而当缓冲区达到 1MB，如果行数没有达到 1000 行，也同样会被发送。

- 配置项 format 默认值为 `datax`，此时 CnosdbWriter 会假设数据格式为表格类型，所以需要手动设置 table、tags、fields、timeIndex 三个配置项。

  - 配置项 table 指定了数据输出到那个 CnosDB table 中。

  - 配置项 tags 指定了表格类型的数据中，哪些列对应了 CnosDB tag column。假设表格的第 1、2 列为 Tag，Tag 名称分别为 "host"、"unit"，那么可以这样设置：

    ```json
    "tags": {
        "host": 1,
        "unit": 2
    }
    ```

  - 配置项 fields 指定了表格类型的数据中，哪些列对应了 CnosDB field column。假设表格的第 3、4 列为 Field，Field 名称分别为 "usage_min"、"usage_max"，那么可以这样设置：

    ```json
    "fields": {
        "usage_min": 3,
        "usage_max": 4
    }
    ```

  - 配置项 timeIndex 指定了表格类型的数据中，哪些列对应了 CnosDB time column。假设表格的第 0 列为 Time，那么可以这样设置：

    ```json
    "timeIndex": 0
    ```

- 配置项 precision 对应 Reader 插件提供的 time 精度，默认为毫秒。由于 CnosDB 默认使用纳秒进行存储，所以有时 CnosDBWriter 将会对时间进行转换。

- 配置项 tagsExtra 的格式为 `{ tag 名称: tag 值 }`，如定义的某个 Tag 在输入的数据中已存在，则被忽略，转而使用输入数据中的 Tag。以下示例表示为每一行数据增加 `host=localhost` 与 `source=datax` 两个 Tag：

  ```json
  { "host": "localhost", "source": "datax"  }
  ```

- 配置项 foramt 也可以设置为 `opentsdb`，此时 CnosDBWriter 会假设输入数据只有一列，且格式为 OpenTSDB 的 JSON 格式写入请求，此时不再需要配置 table、tags、fields、timeIndex，这些数据将从 JSON 格式的 OpenTSDB 写入请求中解析获得。

  - 配置项 fieldsExtra 在此时生效，格式为 `{ 来源列: { "table": 目标表, "field": 目标列 } }`。以下示例表示将 OpenTSDB column `cpu_usage` 的数据写入 CnosDB 的表 `table` 的 数据列 `usage` 中：

    ```json
    { "cpu_usage": { "table": "cpu", "field": "usage" } }
    ```

### 类型转换

为了规范源端和目的端类型转换操作，保证数据不失真，DataX 将 Reader 的各种类型转换为内部类型，详见 [DataX 文档 - 类型转换](https://github.com/alibaba/DataX/blob/master/dataxPluginDev.md#类型转换)。这些内部类型如下：

- `Long`：定点数(Int、Short、Long、BigInteger等)。
- `Double`：浮点数(Float、Double、BigDecimal(无限精度)等)。
- `String`：字符串类型，底层不限长，使用通用字符集(Unicode)。
- `Date`：日期类型。
- `Bool`：布尔值。
- `Bytes`：二进制，可以存放诸如MP3等非结构化数据。

CnosDBWriter 会将这些内部类型转换为 CnosDB 的内部数据类型，转换规则如下：

| DATAX 内部类型      | CNOSDB 数据类型           |
|-----------------|-----------------------|
| Date （time 列）   | TIMESTAMP(NANOSECOND) |
| Date （非 time 列） | BIGINT                |
| Long            | BIGINT                |
| Double          | DOUBLE                |
| Bytes           | 不支持                   |
| String          | STRING                |
| Bool            | BOOLEAN               |

## 示例 - 从 OpenTSDB 导入 CnosDB

### 前置条件

- 安装 Python 2 或 3、JDK 1.8 以及 DataX，详见 [DataX 文档 - 快速开始](https://github.com/alibaba/DataX/blob/master/userGuid.md#quick-start)。
- 安装 CnosDB，详见 [部署](../deploy) 章节。

我们假设 DataX 被安装到 `{YOUR_DATAX_HOME}` 路径下。

### 参数配置

#### Reader 插件 OpenTSDBReader 配置

假设我们有运行中的 OpenTSDB，并且准备导出的数据模式如下：

- 节点地址：`http://127.0.0.1:4242`
- 指标：`sys.cpu.nice`
- 开始：`2023-06-01 00:00:00`
- 结束：`2023-06-02 00:00:00`
- 时间精度：毫秒

那么，对应的 Reader 插件 OpenTSDBReader 的配置参数如下：

```json
{
    "name": "opentsdbreader",
    "parameter": {
        "endpoint": "http://localhost:4242",
        "column": [
            "cpu_usage_nice",
            "cpu_usage_idle"
        ],
        "beginDateTime": "2023-06-01 00:00:00",
        "endDateTime": "2023-06-02 00:00:00"
    }
}
```

时间精度并非写在 OpenTSDBReader 的配置中， 而需要提供给 CnosDBWriter 的配置的 precision 项。

默认情况下，配置项 column 将被用作 CnosDB 的表名称。最终在 CnosDB 中会生成 `cpu_usage_nice` 表 与 `cpu_usage_idle` 表，指标数据会固定被写入到两个表的 `value` 列中。而通过配置 fieldsExtra，可以将 `cpu_usage_nice` 与 `cpu_usage_idle` 写入 CnosDB 的同一个表中，详见下方对 fieldsExtra 的配置。

OpenTSDB 中的数据内容如下：

```sh
curl 'http://localhost:4242/api/query?start=2023/06/01-00:00:00&end=2023/06/01-01:00:00&m=none:cpu_usage_nice' ｜jq
[
    {
        "metric": "cpu_usage_nice",
        "tags": {
            "host": "myhost",
            "cpu": "cpu0"
        },
        "aggregateTags": [],
        "dps": {
            "1685548810000": 0.0,
            "1685548820000": 0.0,
            "1685548830000": 0.0,
            "1685548840000": 1.509054,
            "1685548850000": 4.885149,
            "1685548860000": 19.758805,
            "1685548870000": 27.269705,
            "1685548880000": 32.713946,
            "1685548890000": 37.621445,
            "1685548900000": 26.837964,
        }
    }
]

curl 'http://localhost:4242/api/query?start=2023/06/01-00:00:00&end=2023/06/01-01:00:00&m=none:cpu_usage_idle' ｜jq
[
    {
        "metric": "cpu_usage_nice",
        "tags": {
            "host": "myhost",
            "cpu": "cpu0"
        },
        "aggregateTags": [],
        "dps": {
            "1685548810000": 26.837964,
            "1685548820000": 37.621445,
            "1685548830000": 32.713946,
            "1685548840000": 27.269705,
            "1685548850000": 1.509054,
            "1685548860000": 19.758805,
            "1685548870000": 4.885149,
            "1685548880000": 0.0,
            "1685548890000": 0.0,
            "1685548900000": 0.0,
        }
    }
]
```

#### Writer 插件 CnosDBWriter 配置

假设我们有运行中的 CnosDB，相关参数如下：

- 接口地址： `http://127.0.0.1:8902/api/v1/write`
- 租户：`cnosdb`
- 数据库：`public`
- 用户：`root`
- 密码：`root`

> 在将 OpenTSDBReader 与 CnosDBWriter 配合使用时，需要设置 CnosdbWriter 配置项 format 为 `opentsdb`，这样 CnosdbWriter 才能够正确将数据写入到 CnosDB 中。

那么，对应的 Writer 插件 CnosdbWriter 的配置参数如下：

```json
{
    "name": "cnosdbwriter",
    "parameter": {
        "cnosdbWriteAPI": "http://127.0.0.1:8902/api/v1/write",
        "tenant": "cnosdb",
        "database": "public",
        "username": "root",
        "password": "root",
        "format": "opentsdb",
        "fieldsExtra": {
            "cpu_usage_nice": {
                "table": "cpu", "field": "usage_nice"
            },
            "cpu_usage_idle": {
                "table": "cpu", "field": "usage_idle"
            }
        }
    }
}
```

### 开始导入

1. 我们新建一个 DataX 配置文件，并且将前面的 OpenTSDBReader 和 CnosDBWriter 配置填充到 reader 和 writer 项中，保存为 `{YOUR_DATAX_HOME}/bin/opentsdb_to_cnosdb.json`：

```json
{
    "job": {
        "content": [
            {
                "reader": {
                    "name": "opentsdbreader",
                    "parameter": {
                        "endpoint": "http://localhost:4242",
                        "column": [
                            "cpu_usage_nice",
                            "cpu_usage_idle"
                        ],
                        "beginDateTime": "2023-06-01 00:00:00",
                        "endDateTime": "2023-06-02 00:00:00"
                    }
                },
                "writer": {
                    "name": "cnosdbwriter",
                    "parameter": {
                        "cnosdbWriteAPI": "http://127.0.0.1:8902/api/v1/write",
                        "tenant": "cnosdb",
                        "database": "public",
                        "username": "root",
                        "password": "root",
                        "format": "opentsdb",
                        "fieldsExtra": {
                            "cpu_usage_nice": {
                                "table": "cpu", "field": "usage_nice"
                            },
                            "cpu_usage_idle": {
                                "table": "cpu", "field": "usage_idle"
                            }
                        }
                    }
                }
            }
        ],
        "setting": {
            "speed": {
                "channel": 1
            }
        }
    }
}
```

2. 运行 datax.py，开始导入：

```sh
cd {YOUR_DATAX_HOME}/bin
python ./datax.py ./opentsdb_to_cnosdb.json
```

最终的输出如下：

```txt
...
2023-07-01 12:34:56.789 [job-0] INFO  JobContainer -
任务启动时刻                    : 2023-07-01 12:34:55
任务结束时刻                    : 2023-07-01 12:34:56
任务总计耗时                    :                  1s
任务平均流量                    :              508B/s
记录写入速度                    :             20rec/s
读出记录总数                    :                  20
读写失败总数                    :                   0
```

CnosDB 中的数据如下：

```sql
SELECT * FROM cpu ORDER BY time ASC;
+---------------------+--------+------+------------+------------+
| time                | host   | cpu  | usage_nice | usage_idle |
+---------------------+--------+------+------------+------------+
| 2023-06-01T00:00:10 | myhost | cpu0 | 0.0        | 26.837964  |
| 2023-06-01T00:00:20 | myhost | cpu0 | 0.0        | 37.621445  |
| 2023-06-01T00:00:30 | myhost | cpu0 | 0.0        | 32.713946  |
| 2023-06-01T00:00:40 | myhost | cpu0 | 1.509054   | 27.269705  |
| 2023-06-01T00:00:50 | myhost | cpu0 | 4.885149   | 1.509054   |
| 2023-06-01T00:01:00 | myhost | cpu0 | 19.758805  | 19.758805  |
| 2023-06-01T00:01:10 | myhost | cpu0 | 27.269705  | 4.885149   |
| 2023-06-01T00:01:20 | myhost | cpu0 | 32.713946  | 0.0        |
| 2023-06-01T00:01:30 | myhost | cpu0 | 37.621445  | 0.0        |
| 2023-06-01T00:01:40 | myhost | cpu0 | 26.837964  | 0.0        |
+---------------------+--------+------+------------+------------+
```

### 查看导入任务状态

DataX 的作业运行的日志文件默认位于 `{YOUR_DATAX_HOME}/log` 目录下。在这些日志文件中，我们可以查看任务的启动时间、结束时间、状态以及任何输出和错误消息。此外，可以通过在 CnosDB 中查询导出的表来获取导入进度：

```sql
SELECT COUNT(usage_idle) as c FROM "cpu";
+----+
| c  |
+----+
| 10 |
+----+
```

### 取消或停止导入任务

可以通过终止 DataX 进程来关掉导入任务:

```sh
pkill datax
```
