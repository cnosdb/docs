---
sidebar_position: 11
---

# Warning Management

:::tip
Only for enterprise version, please contact [CC](../enterprise) for warning components
:::

## Introduction

CnosDB supports warning management, management via CnosDB warning so you can view warning messages, set warning methods, set warning rules, set warning groups, and more.

## How to Implement

The cnos-alert component works on time series data stored in CnosDB, on the basis of a user submitted configuration file, executes sql queries temporarily, matches the search results against the threshold, and sends the query results that trigger a warning to the user's specified receiving terminal.
sql queried：
standard cnosdb-sql query, usually with time related to where given warning scenarios.
Threshold：
needs to specify a sql query return value, setting a threshold for triggering a warning for this field that is currently supported in five categories greater than or less and equal to, within and outside range.
Notification receiving terminal：
currently supports slack, twitter and twitter.
History history：
All queries triggering warnings and notifications will be recorded in cnosdb.
The user configured warning rule is recorded in the user locator json file.
![告警组件原理](/img/cnos-alert.png)

## Boot

```shell
./alertserver --config=alertserver.yaml --serverport=9001
```

## Configuration (alertserver.yaml)

```yaml
query: #Cnosdb configuration
    nodeHost: 127.0.0.
    nodePort: 8902
    authorization: ********* #Only supported base64 encrypted username
alert: #warning rule configuration persistent configuration
    filePath: /etc/alert. son
store: #Warning, notification saved in cnosdb configuration
    nodeHost: 127.0.0.
    nodePort: 8902
    authorization: ******** #Only supported base64 encrypted username
    alerttable: alertrecord #warning form name
    notitable: notirecord #notification indicates
```

## API interface description

### `/api/http/ping`

**Description**

Test Service Running Status

**Request Method**

- GET

**Request Example**

```shell
curl-X GET http://127.0.0.1:3001/api/http/ping
```

**Successfully requested**

```shell
{"message":"ok"}
```

**Request failed**

```shell
curl: error
```

### `/api/v1/alert/config/rule`

**Description**

Create a warning rule

**Request Method**

- POST

**Request Example**

```shell
curl-X POST http://127.0.0.0.1:30001/api/v1/alert/config/rule
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

**Successfully requested**

```shell
LO 
    "message": "suceed", 
    "id":"1"
}
```

**Request failed**

```shell
LO
    "code":3, 
    "message": "invalid character '}' looking for beginning of object key string", 
    "details":[]
}
```

### `/api/v1/alert/config/rule`

**Description**

Change a warning rule

**Request Method**

- PUT

**Request Example**

```shell
curl-X PUT http://127.0.0.0.1:30001/api/v1/alert/config/rule
```

**Request Parameters**

```shell
{
    "id": 1, # rule的id
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

**Successfully requested**

```shell
"message":"ucceed" }
```

**Request failed**

```shell
LO
    "code": error id, 
    "message": error string, 
    "details":[]
 } }
```

### `api/v1/alert/config/rule/tenant/:tenant/id/:id`

**Description**

Get information about the specified rule

**Request Method**

- GET

**Request Example**

```shell
curl-X GET http://127.0.0.1:3001/api/v1/alert/config/rule/tenant/cnosdb/id/1
```

**Request Parameters**

```shell
    :tenant: 租户
    :id: rule id

```

**Successfully requested**

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

**Request failed**

```shell
LO
    "code": error id, 
    "message": error string, 
    "details":[]
 } }
```

### `api/v1/alert/config/rule/tenant/:tenant/id/:id`

**Description**

Delete top rule

**Request Method**

- DELETE

**Request Example**

```shell
curl-X DELETE http://127.0.0.1:3001/api/v1/alert/config/rule/tenant/cnosdb/id/1
```

**Request Parameters**

```shell
    :tenant: 租户
    :id: rule id

```

**Successfully requested**

```shell
LO
    "message": "ucce"
}
```

**Request failed**

```shell
LO
    "code": error id, 
    "message": error string, 
    "details":[]
 } }
```

### `/api/v1/alert/config/rule/tenant/:tenant`

**Description**

List all rule under the specified tenant

**Request Method**

- GET

**Request Example**

```shell
curl-X DELETE http://127.0.0.0.1:3001/api/v1/alert/config/rule/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: 租户
    page: 页数
    per_page: 每页展示记录数量
```

**Successfully requested**

```shell
Flag
    "data":[
        FU
            "name": "cpu new", # rule name
            "severity": "Medium", # rule level
            "lastrun": "2023-08-17T11:51:04+08:00", # sql query last execution time 
            "enable": "on", # rulestatus
            "laststatus": "0", # Last execution,0 means failed, Represents success
            "id": 2 # rule id
            }
        ], 
    "order": "name, severity, lastrun, laststatus, enabled", # No local tatal 
    "total": "1" # total rent rule
}
```

**Request failed**

```shell
LO
    "code": error id, 
    "message": error string, 
    "details":[]
 } }
```

### `/api/v1/alert/config/rule/tenant/:tenant`

**Description**

List all rule under the specified tenant

**Request Method**

- GET

**Request Example**

```shell
curl-X DELETE http://127.0.0.0.1:3001/api/v1/alert/config/rule/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: 租户
    page: 页数
    per_page: 每页展示记录数量
```

**Successfully requested**

```shell
Flag
    "data":[
        FU
            "name": "cpu new", # rule name
            "severity": "Medium", # rule level
            "lastrun": "2023-08-17T11:51:04+08:00", # sql query last execution time 
            "enable": "on", # rulestatus
            "laststatus": "0", # Last execution,0 means failed, Represents success
            "id": 2 # rule id
            }
        ], 
    "order": "name, severity, lastrun, laststatus, enabled", # No local tatal 
    "total": "1" # total rent rule
}
```

**Request failed**

```shell
LO
    "code": error id, 
    "message": error string, 
    "details":[]
 } }
```

### `api/v1/alert/data/alert/tenant/:tenant`

**Description**

List all alerts under specified tenants

**Request Method**

- GET

**Request Example**

```shell
curl-X DELETE http://127.0.0.0.1:3001/api/v1/alert/data/alert/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: 租户
    page: 页数
    per_page: 每页展示记录数量
```

**Successfully requested**

```shell
LO
    "data": "[{\"enable\":1,\"name\":\"\"cpu new\",\"severity\":\"Medium\", \"time\":\"2023-06-27T09:49:08.441665430\", \"value\":\"{\\\"AVG(cpu.usage_user)\\":0.200100000161,\\\"cpu\\\\"\\\"}]", # alertrecord jsonstring
    "order: "time, name, severity, value, enabled", # locally available
    "total": "628" # total
}
```

**Request failed**

```shell
LO
    "code": error id, 
    "message": error string, 
    "details":[]
 } }
```

### `api/v1/alert/data/noti/tenant/:tenant`

**Description**

List all notifications under specified tenants

**Request Method**

- GET

**Request Example**

```shell
curl-X DELETE http://127.0.0.0.1:3001/api/v1/alert/data/noti/tenant/cnosdb?page=1&per_page=10
```

**Request Parameters**

```shell
    :tenant: 租户
    page: 页数
    per_page: 每页展示记录数量
```

**Successfully requested**

```shell
{
    "data": "[{\"name\":\"cpu new\",\"send_status\":1,\"severity\":\"Medium\",\"time\":\"2023-06-27T09:27:08\",\"value\":\"{\\\"AVG(cpu.usage_user)\\\":0.20040080160339818,\\\"cpu\\\":\\\"cpu1\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.3000000000020009,\\\"cpu\\\":\\\"cpu3\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.20026912240306194,\\\"cpu\\\":\\\"cpu-total\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.3501002004075616,\\\"cpu\\\":\\\"cpu0\\\"}\\n{\\\"AVG(cpu.usage_user)\\\":0.2999999999974534,\\\"cpu\\\":\\\"cpu2\\\"}\"}]", # noti记录 json字符串
    "order": "time, name, severity, value, send_status", # 本地可无视
    "total": "35" # 总量
}
```

**Request failed**

```shell
LO
    "code": error id, 
    "message": error string, 
    "details":[]
 } }
```

## Example

Assume that we have written cpu's control data to cnosdb via telegraf, some of the table data below：

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

This table records cpu data every 10 seconds. We want to monitor the usage_user value of each cpu, and warn to slack when its average value is greater than 0.2 in the last minute.

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

## View received notifications in Slack.

![](/img/Slack-Notification.png)
