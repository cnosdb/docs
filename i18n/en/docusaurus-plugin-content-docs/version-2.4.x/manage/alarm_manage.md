---
sidebar_position: 6
---

# Alarm Management

:::tip
Only Enterprise Edition supports, Please contact [CC](../enterprise) to get the alarm plugin.
:::

## Introduction

CnosDB supports alarm management. Through CnosDB alarm management, you can view alarm information, set alarm notification methods, set alarm rules, set alarm notification groups, etc.

## Principle of Implementation

The cnos-alert component executes the sql query at regular intervals according to the configuration file submitted by the user, compares the query result with the threshold value, and sends the query result triggering the alarm to the user's specified receiving terminal.
SQL query:
Standard cnosdb-sql query statement, considering the usage scenario of alarms, generally comes with a where clause related to time.
阈值：
配置时需要指定sql查询返回值的一个字段，为这个字段设置一个触发告警的阈值，目前支持大于、小于、等于、区间内、区间外五类阈值形式。
通知接收终端：
目前支持slack、twitter两种。
历史记录：
所有触发告警的查询结果、发出的通知都将记录在cnosdb中。
用户配置的告警规则记录在用户指定位置json文件中。
![告警组件原理](/img/cnos-alert.png)

## Start

```shell
./alertserver --config=alertserver.yaml --serverport=9001
```

## Configuration（alertserver.yaml）

```yaml
query: #cnosdb configuration where the queried data resides
    nodeHost: 127.0.0.1
    nodePort: 8902
    authorization: ********* #Only supports base64 encrypted username and password
alert: #alarm configuration
    filePath: /etc/alert.json
store: #cnosdb configuration where the alarm record is stored
    nodeHost: 127.0.0.1
    nodePort: 8902
    authorization: ********* #Only supports base64 encrypted username and password
    alerttable:  alertrecord #Alarm record table name
    notitable: notirecord #Notification record table name
```

## API Description

### /api/http/ping

**Description**

Test the running status of the service

**Request Method**

- GET

**Request Example**

```shell
curl -X GET http:/127.0.0.1:30001/api/http/ping
```

**Request Succeeded**

```shell
{"message":"ok"}
```

**Request Failed**

```shell
curl: error
```

### /api/v1/alert/config/rule

**Description**

Create an alert rule.

**Request Method**

- POST

**Request Example**

```shell
curl -X POST http:/127.0.0.1:30001/api/v1/alert/config/rule
```

**Request Parameters**

```shell
{
    "tenant": "cnosdb", # 被查询数据所在cnosdb中的租户
    "data": {
        "enabled": "on", # 告警规则的初始执行状态，【“on”， “off“】
        "dbname": "public", #  被查询数据所在数据库
        "sqlType": 1, # 选择sql类型，本地推荐 1，使用sqlCmd参数中的完整sql进行查询
        "sqlCmd": "select cpu, avg(usage_user) from cpu where time >= now() - interval '20' SECOND group by cpu", # 与sqlType 1配合使用
        "period": "15s", # 查询执行周期，由数字➕ 【‘s'，’m‘，’h‘，’d‘】组成
        "thresholds": [ # 阈值设置
            {
                "checks": [ # 查询结果需要进行的检查
                    {
                        "value": "0.2", # 一个比较值
                        "operator": 1 # 一个比较运算，-2: 小于等于， -1: 小于， 0: 等于， 1: 大于， 2: 大于等于
                    }
                ],
                "period": "Automation", # 通知任务执行周期，【’Automation', 'Hourly', 'Daily','Weekly']，其中Automation为一分钟一次
                "severity": "Medium", # 告警级别
                "endtools": [ # 接收终端
                    {
                        "name": "slack", # 终端命名
                        "receiver": "https://hooks.slack.com/services/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", # slack需要用户提供webhookurl，twitter则需要用户提供校验key
                        "format": "", # 配置通知内容的格式，具体参考后续示例
                        "tool": "slack" # 终端类型
                    }
                ],
                "checkrelation": 0 # checks可以有多个，通过relation确定check之间的逻辑关系，0为或运算，1为与运算
            }
        ],
        "name": "cpu new", # rule名字
        "description": "cpu local demo", # 描述
        "field": "AVG(cpu.usage_user)", # 查询结果被用来比较的字段
    }
}
```

**Request Succeeded**

```shell
{ 
    "message":"succeed", 
    "id":"1"
}
```

**Request Failed**

```shell
{
    "code":3, 
    "message":"invalid character '}' looking for beginning of object key string", 
    "details":[]
}
```

### /api/v1/alert/config/rule

**Description**

Modify an alert rule.

**Request Method**

- PUT

**Request Example**

```shell
curl -X PUT http:/127.0.0.1:30001/api/v1/alert/config/rule
```

**Request Parameters**

```shell
{
    "id": 1, # rule id
    "tenant": "cnosdb", # tenant name where the queried data resides
    "data": {
        "enabled": "on", # initial execution status of the alert rule, ["on", "off"]
        "dbname": "public", #  database name where the queried data resides
        "sqlType": 1, # select sql type, local recommended 1, use the complete sql in sqlCmd parameter for query
        "sqlCmd": "select cpu, avg(usage_user) from cpu where time >= now() - interval '20' SECOND group by cpu", # 与sqlType 1配合使用
        "period": "15s", # query execution period, composed of numbers + ['s', 'm', 'h', 'd']
        "thresholds": [ # threshold
            {
                "checks": [ # check
                    {
                        "value": "0.2", # a comparison value
                        "operator": 1 # a comparison operator, -2: less than or equal to, -1: less than, 0: equal to, 1: greater than, 2: greater than or equal to
                    }
                ],
                "period": "Automation", # notification task execution period, ['Automation', 'Hourly', 'Daily', 'Weekly'], where Automation is once a minute
                "severity": "Medium", # alarm level
                "endtools": [ # receiving terminal
                    {
                        "name": "slack", # terminal name
                        "receiver": "https://hooks.slack.com/services/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", # slack requires users to provide webhookurl, and twitter requires users to provide verification key
                        "format": "", # format of the notification content, please refer to the following example for details
                        "tool": "slack" # terminal type
                    }
                ],
                "checkrelation": 0 # checks can have multiple, and the logical relationship between checks is determined by relation, 0 is or operation, 1 is and operation
            }
        ],
        "name": "cpu new", # rule name
        "description": "cpu local demo", # Description
        "field": "AVG(cpu.usage_user)", # field used to compare the query result
    }
}
```

**Request Succeeded**

```shell
{ "message":"succeed" }
```

**Request Failed**

```shell
{
    "code": error id, 
    "message": error string, 
    "details":[]
}
```

### api/v1/alert/config/rule/tenant/:tenant/id/:id

**Description**

Get the specified rule information.

**Request Method**

- GET

**Request Example**

```shell
curl -X GET http:/127.0.0.1:30001/api/v1/alert/config/rule/tenant/cnosdb/id/1
```

**Request Parameters**

```shell
    :tenant: tenant name 
    :id: rule id

```

**Request Succeeded**

```shell
{
    "id": "1",
    "data":{
        "enabled": "off", 
        "dbname": "public", 
        "sql": null, 
        "period": "15s", 
        "thresholds": [
            {
                "checks": [
                    {
                        "value": "0.2", 
                        "operator": 1
                    }
                ], 
                "period": "Automation", 
                "severity": "Medium", 
                "endtools":[
                    {
                        "name": "slack", 
                        "receiver": "https://hooks.slack.com/services/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", "format": "", 
                        "tool": "slack"
                        }
                    ], 
                "checkrelation": 0
            }
        ], 
        "name": "cpu new", 
        "description": "cpu local demo", 
        "field": "AVG(cpu.usage_user)", 
        "create": "2023-08-17T10:45:02+08:00", 
        "latestupdate": "2023-08-17T11:24:43+08:00", 
        "lateststatus": "0", 
        "additionalRetrospectiveTime": "", 
        "sqlType": "1", 
        "sqlCmd": "select cpu, avg(usage_user) from cpu where time >= now() - interval '20' SECOND group by cpu"
        }
    "tenant": "cnosdb"
}
```

**Request Failed**

```shell
{
    "code": error id, 
    "message": error string, 
    "details":[]
}
```

### api/v1/alert/config/rule/tenant/:tenant/id/:id

**Description**

Remove the top rule.

**Request Method**

- DELETE

**Request Example**

```shell
curl -X DELETE http:/127.0.0.1:30001/api/v1/alert/config/rule/tenant/cnosdb/id/1
```

**Request Parameters**

```shell
    :tenant: tenant name 
    :id: rule id

```

**Request Succeeded**

```shell
{
    "message": "succeed"
}
```

**Request Failed**

```shell
{
    "code": error id, 
    "message": error string, 
    "details":[]
}
```

### /api/v1/alert/config/rule/tenant/:tenant

**Description**

List all rules for the specified tenant.

**Request Method**

- GET

**Request Example**

```shell
curl -X DELETE http:/127.0.0.1:30001/api/v1/alert/config/rule/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: tenant name
    page: page number
    per_page: number of records displayed per page
```

**Request Succeeded**

```shell
{
    "data":[
        {
            "name": "cpu new", # rule name
            "severity": "Medium", # rule level
            "lastrun": "2023-08-17T11:51:04+08:00", # last execution time of sql query
            "enabled": "on",  # rule status
            "laststatus": "0", # last execution status, 0 means failure, 1 means success
            "id": 2 # rule id
            }
        ], 
    "order": "name, severity, lastrun, laststatus, enabled", # local can be ignored
    "total": "1" # total number of rules under the tenant
}
```

**Request Failed**

```shell
{
    "code": error id, 
    "message": error string, 
    "details":[]
}
```

### /api/v1/alert/config/rule/tenant/:tenant

**Description**

List all rules for the specified tenant.

**Request Method**

- GET

**Request Example**

```shell
curl -X DELETE http:/127.0.0.1:30001/api/v1/alert/config/rule/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: tenant name
    page: page number
    per_page: number of records displayed per page
```

**Request Succeeded**

```shell
{
    "data":[
        {
            "name": "cpu new", # rule name
            "severity": "Medium", # rule level
            "lastrun": "2023-08-17T11:51:04+08:00", # last execution time of sql query
            "enabled": "on",  # rule status
            "laststatus": "0", # last execution status, 0 means failure, 1 means success
            "id": 2 # rule id
            }
        ], 
    "order": "name, severity, lastrun, laststatus, enabled", # local can be ignored
    "total": "1" # total number of rules under the tenant
}
```

**Request Failed**

```shell
{
    "code": error id, 
    "message": error string, 
    "details":[]
}
```

### api/v1/alert/data/alert/tenant/:tenant

**Description**

List all alert records for the specified tenant.

**Request Method**

- GET

**Request Example**

```shell
curl -X DELETE http:/127.0.0.1:30001/api/v1/alert/data/alert/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: tenant name
    page: page number
    per_page: number of records displayed per page
```

**Request Succeeded**

```shell
{
    "data": "[{\"enabled\":1,\"name\":\"cpu new\",\"severity\":\"Medium\",\"time\":\"2023-06-27T09:49:08.441665430\",\"value\":\"{\\\"AVG(cpu.usage_user)\\\":0.2001001001000161,\\\"cpu\\\":\\\"cpu2\\\"}\"}]", # alert record in json string
    "order": "time, name, severity, value, enabled",  # local can be ignored
    "total": "628" # alert record total number
}
```

**Request Failed**

```shell
{
    "code": error id, 
    "message": error string, 
    "details":[]
}
```

### api/v1/alert/data/noti/tenant/:tenant

**Description**

Lists all notification records for the specified tenant.

**Request Method**

- GET

**Request Example**

```shell
curl -X DELETE http:/127.0.0.1:30001/api/v1/alert/data/noti/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: tenant name
    page: page number
    per_page: number of records displayed per page
```

**Request Succeeded**

```shell
{
    "data": "[{\"name\":\"cpu new\",\"send_status\":1,\"severity\":\"Medium\",\"time\":\"2023-06-27T09:27:08\",\"value\":\"{\\\"AVG(cpu.usage_user)\\\":0.20040080160339818,\\\"cpu\\\":\\\"cpu1\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.3000000000020009,\\\"cpu\\\":\\\"cpu3\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.20026912240306194,\\\"cpu\\\":\\\"cpu-total\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.3501002004075616,\\\"cpu\\\":\\\"cpu0\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.2999999999974534,\\\"cpu\\\":\\\"cpu2\\\"}\"}]", # notification record in json string
    "order": "time, name, severity, value, send_status", # local can be ignored
    "total": "35" # notification record total number
}
```

**Request Failed**

```shell
{
    "code": error id, 
    "message": error string, 
    "details":[]
}
```

## Example

Suppose we write the cpu monitoring data to cnosdb through telegraf tool. Part of the table is as follows:

```shell
public ❯ select time, cpu, usage_user from cpu order by time desc limit 5;
+---------------------+-----------+---------------------+
| time                | cpu       | usage_user          |
+---------------------+-----------+---------------------+
| 2023-07-04T08:17:50 | cpu0      | 0.0                 |
| 2023-07-04T08:17:50 | cpu1      | 0.6012024047821427  |
| 2023-07-04T08:17:50 | cpu2      | 0.0                 |
| 2023-07-04T08:17:50 | cpu3      | 0.20040080160339818 |
| 2023-07-04T08:17:50 | cpu-total | 0.2503128911078006  |
+---------------------+-----------+---------------------+
```

This table logs cpu data every 10 seconds, and we want to monitor the usage_user value for each cpu in the table and send an alert to slack when it averages greater than 0.2 over the past minute.

## Create Rule

```shell
curl --location 'http://localhost:30001/api/v1/alert/config/rule' \
--header 'Content-Type: application/json' \
--data '{
    "tenant": "cnosdb",
    "data": {
        "enabled": "on",
        "dbname": "public",
        "sqlType": 1,
        "sqlCmd": "select cpu, avg(usage_user) from cpu where time >= now() - interval '\''20'\'' SECOND group by cpu",
        "period": "15s",
        "thresholds": [
            {
                "checks": [
                    {
                        "value": "0.2",
                        "operator": 1
                    }
                ],
                "period": "Automation",
                "severity": "Medium",
                "endtools": [
                    {
                        "name": "slack",
                        "receiver": "https://hooks.slack.com/services/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",
                        "format": "{{dbname}}{{sql}}{{name}}{{period}}{{description}}{{threshold}}",
                        "tool": "slack"
                    }
                ],
                "checkrelation": 0
            }
        ],
        "name": "cpu new",
        "description": "cpu local demo",
        "field": "AVG(cpu.usage_user)",
        "additionalRetrospectiveTime": "5s"
    }
}'
```

## Check for incoming notifications in Slack

![](/img/Slack-Notification.png)
