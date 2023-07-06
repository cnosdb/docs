---
title: Data Migration
order: 10
---

# Data Migration

This article mainly introduces how to use DataX based on the cnosdbwriter plugin to import OpenTSDB data into CnosDB.

## Introduction to the cnosdbwriter plugin

* Supports the row protocol in JSON format for OpenTSDB and writes in a schemaless manner.

* Supports micro-batch data import with default batch size of maximum 1000 rows and buffer size of maximum 8MB.

## Practical operation

### Precondition

Before importing data using DataX, ensure that the following dependencies are installed:

* [ DataX ](https://github.com/alibaba/DataX/releases)
* [ Python ](https://www.python.org/downloads/)

### Deploy CnosDB

See detailed operation please click the link : [ Deploy CnosDB ](../start/quick_start.md)

### Download cnosdbwriter plugin

[cnosdbwriter](https://github.com/cnosdb/DataX) 

### Create Job Configuration File

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

#### Parameter ：
| Parameter | Desciption | Required | Default | Optional |
| --- | --- | --- | --- | --- |
| cnosdbWriteAPI | the API address of CnosDB write | No | http://127.0.0.1:8902/api/v1/write |  |
| precision | timestamp accuracy of input data | No | ms | ms/us/ns |
| tenant | tenant | No | cnosdb |  |
| database | database name | No | public |  |
| username | username  | No | root |  |
| password | password | No | root |  |
| format | if the input uses a special format, it needs to be specified manually (such as opentsdbreader) | No | datax | datax/opentsdb（there is no additional need to set the table tags fields timeIndex） |
| table | table | Yes |  |  |
| tags | Map Type，Tag mapping between the tag name and the sequence number of the corresponding input column | Yes |  |  |
| fields | Map Type，map of the Field name to the sequence number of the corresponding input column | Yes |  |  |
| timeIndex | the time field corresponds to the serial number of the input column | No | http://127.0.0.1:8902/api/v1/write |  |
| batchSize | the maximum number of CnosDB rows written in each batch, if modified, is based on the configured value | No | 1000 |  |
| bufferSize | the maximum number of CnosDB bytes written in each batch is an unsigned integer. If modified, the configured value prevails | No | 1024 * 1024 * 8 |  |
#### Type conversion specification
The following table lists the CnosDB data types corresponding to the internal types of DataX.
| DATAX Type    | CNOSDB Data Type        |
|-------------------|-----------------------|
| Date （time column）  | TIMESTAMP(NANOSECOND) |
| Date （ Nontime column ）| BIGINT                |
| Long              | BIGINT                |
| Double            | DOUBLE                |
| Bytes             | Not support                |
| String            | STRING                |
| Bool              | BOOLEAN               |
> Restriction: When a table is created, columns of the TIMESTAMP type are automatically created and the column name is time. Users cannot create additional columns of the TIMESTAMP type. The Datax DATE type for a non-time column is converted to the CnosDB BIGINT type.
### Start the import task：
Run the following command to start the task：
``` shell
python {datax_home}/bin/datax.py {job_json_file_path}
```
> Where `{datax_home}` is the path to your DataX installation directory and `{job_json_file_path}` is the path to your DataX job configuration file. During command execution, you will see the DataX output log information to indicate whether the task was successfully started.

### Check the status of the import task：

To check the status of a DataX task, you can examine the DataX job running log file, which is located by default in the `$HOME/.log/`datax directory. In these log files, you can view the start time, end time, status, and any output and error messages for the task. Additionally, you can query the table in CnosDB to obtain status information.

### Cancel or stop the import task：

You can shut down the import task by terminating the DataX process:
```shell
pkill datax
```



