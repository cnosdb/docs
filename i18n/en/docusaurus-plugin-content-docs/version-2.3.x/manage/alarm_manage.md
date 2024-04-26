---
sidebar_position: 11
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
Threshold:
When configuring, you need to specify a field that the SQL query returns, and set a threshold for triggering an alarm on this field. Currently, five types of threshold forms are supported: greater than, less than, equal to, within range, and outside range.
Notification receiving terminal：
Currently, slack and twitter are supported.
History:
All queries triggering a warning and notifications will be recorded in cnosdb.
User configured warning rules are recorded in the user locator json file.
![Principle of Alarm Component](/img/cnos-alert.png)

## Start

```shell
./alertserver --config=alertserver.yaml --serverport=9001
```

## Configuration（alertserver.yaml）

```yaml
query: #被查询数据所在cnosdb配置
    nodeHost: 127.0.0.1
    nodePort: 8902
    authorization: ********* #仅支持base64加密后的用户名密码
alert: #告警规则配置持久化配置
    filePath: /etc/alert.json
store: #告警、通知记录保存所在cnosdb配置
    nodeHost: 127.0.0.1
    nodePort: 8902
    authorization: ********* #仅支持base64加密后的用户名密码
    alerttable:  alertrecord #告警记录表名
    notitable: notirecord #通知记录表明
```

## API Description

### `/api/http/ping`

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

### `/api/v1/alert/config/rule`

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
    “tenant”: “cnosdb”, # the tenant in cnosdb where the queried data resides
    “data”: {
        “enabled”: “on”, # Initial execution status of the alert rule, [“on”, “off”
        “dbname”: “public”, # Database of the queried data
        “sqlType”: 1, # Select the sql type, locally 1 is recommended, use the full sql in the sqlCmd parameter to query.
        “sqlCmd”: “select cpu, avg(usage_user) from cpu where time >= now() - interval ‘20’ SECOND group by cpu”, # work with sqlType 1
        “period”: “15s”, # Query execution period, composed of ➕ ['s', 'm', 'h', 'd'].
        “thresholds”: [ # Threshold setting
            {
                “checks”: [ # Checks to be performed on the query result.
                    {
                        “value”: “0.2”, # a comparison value
                        “operator”: 1 # A comparison operator, -2: less than, -1: less than, 0: equal to, 1: greater than, 2: greater than
                    }
                ], “period”: “Automation”.
                “period”: “Automation”, # Notify the task execution period, ['Automation', 'Hourly', 'Daily', 'Weekly'], where Automation is once a minute.
                “severity”: “Medium”, # alert level
                “endtools”: [ # receiving endpoints
                    {
                        “name”: “slack”, # Terminal name
                        “receiver”: “https://hooks.slack.com/services/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”, # slack requires a webhook url from the user, twitter requires a checksum key from the user Twitter requires the user to provide a verification key
                        “format”: “”, # Configure the format of the notification content, refer to the following example
                        “tool”: “slack” # Terminal type.
                    }
                ], # Configure the format of the notification content, refer to the following example.
                “checkrelation”: 0 # Checks can be multiple, the logical relationship between checks is determined by the relation, 0 is an or operation, 1 is an and operation.
            }
        ],
        “name”: “cpu new”, # rule name
        “description”: “cpu local demo”, # description
        “field”: “AVG(cpu.usage_user)”, # Field that the query results are compared against
    }
}

Translated with DeepL.com (free version)
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

### `/api/v1/alert/config/rule`

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

### `api/v1/alert/config/rule/tenant/:tenant/id/:id`

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

### `api/v1/alert/config/rule/tenant/:tenant/id/:id`

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

### `/api/v1/alert/config/rule/tenant/:tenant`

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

### `/api/v1/alert/config/rule/tenant/:tenant`

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

### `api/v1/alert/data/alert/tenant/:tenant`

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
    "data": "[{\"enabled\":1,\"name\":\"cpu new\",\"severity\":\"Medium\",\"time\":\"2023-06-27T09:49:08.441665430\",\"value\":\"{\\\"AVG(cpu.usage_user)\\\":0.2001001001000161,\\\"cpu\\\":\\\"cpu2\\\"}\"}]", # alert记录 json字符串
    "order": "time, name, severity, value, enabled",  # 本地可无视
    "total": "628" # alert总量
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

### `api/v1/alert/data/noti/tenant/:tenant`

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
                        "format": "{{dbname}}{{sql}}{{name}}{{period}}{{description}}{{threshold}}",# 添加要展示在通知中的参数值，目前支持这六个参数
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
