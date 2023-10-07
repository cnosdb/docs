---
icon: notice
title: Alerts
order: 7
index: false
---


CnosDB Cloud integrates the alert component. The following is a brief description of the process of using the alert function in the cloud through the monitoring case of London weather.


## Necessary preparations

1. a cnosdb cloud account.

2. cnos-telegraf tool.

3. An apikey provided by the [openweather website](https://openweathermap.org/api).

## Data Input

1. Choose Telegraf.

![](/_static/img/cloud/alert_data_input_1.png)

2. Choose a Database( If there is no database, you need to create one first ) to store data and add http-plugin.

![](/_static/img/cloud/alert_data_input_2.png)

3. According to the format of the weather data set, configure the http-plugin as follows：

```toml
[[inputs.http]]
urls = ["http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6021d6b7403a1103179abb515c9b0797"]
#The q parameter sets the city name, APPID fills in your own apikey.
method = "GET"
data_format= "json"
name_override = "weather"
#The table name used and overwritten when writing to the database
tagexclude = ["url"]
#Fields that do not need to be written
tag_keys = ["name"]
json_time_key = "dt"
#The corresponding field name specified as the time field in the json file
json_time_format = "unix"
#The format of the time field in json
```

4. After successful writing, you can find the corresponding data table in the navigator column.

![](/_static/img/cloud/alert_data_input_4.png)

## Create Alert

1. Click Create Rule in the Alerts column.

![](/_static/img/cloud/alert_1.png)

2. Configure Rule information. The query sql currently supports two modes:

2.1 When monitoring the aggregate function value, the user can select some column parameters and the cloud will form an executable SQL instead.

![](/_static/img/cloud/alert_2.1.png)

2.2 You can also write sql by yourself, and specify the field to be monitored in Field.

![](/_static/img/cloud/alert_2.2.png)

3. Set the sql query cycle and offset. Note that when using the 2.1 mode, the interval set here will automatically be used as a where clause in the SQL query. For example, when the interval is set to 1 minute, the offset is 15 seconds. Then in the executed sql, the condition of where time >= now() - interval '75' Second will be added.

![](/_static/img/cloud/alert_3.png)

4. Configure the notification period and the parameters of the tools that receive notifications.

![](/_static/img/cloud/alert_4.png)

4.1 When using twitter(X) to send notification information, you need to enable the developer mode of twitter first, and set the read and write forwarding permission. Then fill Consumer Keys-API Key, Consumer Keys-API Secret, Access Token, and Access Token Secret into the webhook-url column separated by commas.

![](/_static/img/cloud/alert_4.1.png)

When configuring the notification content format, Cloud will have a {{Time}} configurable parameter, which is the notification execution time. In addition, you can also configure the parameters obtained from the sql query into the notification content, which is {{avg_temp}} in this example. Considering the information format and content length of twitter, it is recommended to select the text format to save.

![](/_static/img/cloud/alert_4.1_down.png)

4.2 When choosing to send notifications to slack, configure the webhook-url obtained from slack.

![](/_static/img/cloud/alert_4.2.png)

According to the notification format supported by slack, the user only needs to select which Rule configuration parameters need to be written in the notification. SQL query results will be presented in slack in tabular form.

![](/_static/img/cloud/alert_4.2_down.png)

## Guide Video

<video width="640" height="360" controls>
  <source src="https://cnosdbcloudpublic.s3.us-west-2.amazonaws.com/docvideo/cloud-alert.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>