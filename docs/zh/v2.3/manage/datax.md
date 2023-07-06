---
title: 数据迁移
order: 10
---

# 数据迁移

本文将主要介绍如何利用 DataX 基于 cnosdbwriter 插件将 OpenTSDB 数据导入至 CnosDB 中。

## cnosdbwriter 插件功能介绍

* 支持 OpenTSDB 的 json 格式的行协议 ，以 schemaless 方式写入
* 支持 batchSize 默认 1000 行、bufferSize  默认 8M 批量数据导入

## 实操

### 前提条件

使用 DataX 导入数据前，请确保已安装以下依赖：
* [ DataX ](https://github.com/alibaba/DataX/releases)
* [ Python ](https://www.python.org/downloads/)

### 安装部署CnosDB

详细操作请见[ 部署 CnosDB ](../start/quick_start.md)

### 下载cnosdbwriter插件

[cnosdbwriter](https://github.com/cnosdb/DataX) 

### 创建 Job 配置文件

```shell
{
    "job": {
        "content": [
            {
                "reader": {
                    "name": "opentsdbreader",
                    "parameter": {
                        "column": [
                            "sys.cpu.nice"
                        ],
                        "endDateTime": "2023-06-02 00:00:00",
                        "endpoint": "http://localhost:4242",
                        "beginDateTime": "2023-06-01 00:00:00"
                    }
                },
                "writer": {
                    "name": "cnosdbwriter",
                    "parameter": {
                        "cnosdbWriteAPI": "http://127.0.0.1:8902/api/v1/write",
                        "database": "public",
                        "password": "root",
                        "table": "sys.cpu.nice",
                        "precision": "ms"
                        "tenant": "cnosdb",
                        "format": "opentsdb",
                        "username": "root"
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

#### 参数说明：
| 参数 | 描述 | 必选 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| cnosdbWriteAPI | CnosDB写入API地址 | 否 | http://127.0.0.1:8902/api/v1/write | 无 |
| precision | 输入数据的时间戳精度 | 否 | ms | ms/us/ns |
| tenant | 租户 | 否 | cnosdb | 无 |
| database | 数据库 | 否 | public | 无 |
| username | 用户名 | 否 | root | 无 |
| password | 密码 | 否 | root | 无 |
| format | 如果输入使用了特殊格式，需要通过手动进行指定（如opentsdbreader） | 否 | datax | datax/opentsdb（不需要额外设置table、tags、fields、timeIndex） |
| table | 表 | 是 | 无 | 无 |
| tags | Map 类型，Tag 名称与对应输入列的序号的映射 | 是 | 无 | 无 |
| fields | Map 类型，Field 名称与对应输入列的序号的映射 | 是 | 无 | 无 |
| timeIndex | 时间字段对应输入列的序号 | 否 | http://127.0.0.1:8902/api/v1/write | 无 |
| batchSize | 每批次写入 CnosDB的最大行数，若修改则以配置后的值为准 | 否 | 1000 | 无 |
| bufferSize | 每批次写入 CnosDB 的最大字节数，无符号整数，若修改则以配置后的值为准 | 否 | 1024 * 1024 * 8 | 无 |
#### 类型转换说明
下表列出 DataX 的内部类型对应的 CnosDB 数据类型。
| DATAX 内部类型    | CNOSDB 数据类型        |
|-------------------|-----------------------|
| Date （time 列）  | TIMESTAMP(NANOSECOND) |
| Date （非 time 列）| BIGINT                |
| Long              | BIGINT                |
| Double            | DOUBLE                |
| Bytes             | 不支持                |
| String            | STRING                |
| Bool              | BOOLEAN               |
> 约束限制：创建表时，TIMESTAMP 类型的列会被自动创建，列名为 time，用户无法创建额外的 TIMESTAMP 类型的列。非 time 列的 Datax DATE 类型会被转换为 CnosDB BIGINT 类型。

### 启动导入任务：
执行以下命令启动任务：
``` shell
python {datax_home}/bin/datax.py {job_json_file_path}
```
> 其中，`{datax_home}`是您的 DataX 安装目录的路径，`{job_json_file_path}`是您的 DataX 作业配置文件的路径。在命令执行期间，您将看到 DataX 输出日志信息以指示任务是否成功启动。

### 查看导入任务状态：

查看 DataX 任务状态，您可以检查 DataX 作业运行日志文件，该文件默认位于 `$HOME/.log/datax` 目录下。在这些日志文件中，您可以查看任务的启动时间、结束时间、状态以及任何输出和错误消息。此外，您可以在 CnosDB 中查询该表以获取状态信息。

### 取消或停止导入任务：

可以通过终止 DataX 进程来关掉导入任务:
```shell
pkill datax
```



