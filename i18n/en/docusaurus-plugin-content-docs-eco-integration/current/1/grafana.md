---
title: Grafana
order: 2
slug: /grafana
---

![](/img/grafana_overview.webp)

[Grafana](https://github.com/grafana/grafana) is an open-source data visualization tool that can easily convert any data that meets the requirements into visualized graphs and also with warning functions that can inform you when indicator data reach thresholds.Grafana defaults to multiple data sources and can also be expanded through the plugin system.

This paper will describe the process through which CnosDB data are obtained through Grafana to showcase the dashboard.

```mermaid
Paragraph LR
subgraph 1[Server]
tg1[Telegraf]
end
tg1-metrics data->CnosDB
CnosDB-data frame->Grafana
```

### Grafana Deployment

[官方安装教程](https://grafana.com/docs/grafana/latest/setup-grafana/installation/)

[官方配置文件说明](https://grafana.com/docs/gravana/latest/setup-gramana/configure-gramana/)

### Grafana Configuration

- **Connect to CnosDB**

Enter `http://localhost:3000`, when grafana works correctly, to see Grafana login interface.Initial username `admin`, initial password `admin`.

![](/img/grafana_login_page.png)

You will also be asked to enter a new password when first logged in.Then we entered the main screen of Grafana.

![](/img/grafana_main_page_1.png)

Grafana provides a common data interface, and we can read the data from the CnosDB database via the CnosDB Data Source plugin.First we enter the data source configuration interface.

![](/img/grafana_main_page_2.png)

Then click the 'Add data source\`.

![](/img/grafana_setting_add_data_source_button.png)

Search CnosDB, then tap into the configuration interface.

![](/img/grafana_setting_add_data_source_1.png)

In the configuration interface, enter the address of CnosDB, as well as the username, and then click the `Save & test`.

![](/img/grafana_setting_add_data_source_2.png)

If configured correctly, then there will be a `Data source is working`, indicating that Grafana is already able to access CnosDB data.

![](/img/grafana_setting_add_data_source_3.png)

- **Configure dashboard**

Grafana can configure dashboard via graphical interface, and configured dashboards can be exported via JSON data or can import Dashboard data in JSON format.

We then import a dashboard data.

![](/img/grafana_main_page_3.png)

Copy [JSON](https://github.com/cnosdb/docs/blob/main/assets/grafana_dashboard.json) to [`import via panel json`], then click on the `load`.

![](/img/grafana_import_dashboard_1.png)

Then select the CnosDB data source we have just configured and then click on the `import`.

![](/img/grafana_import_dashboard_2.png)

We created a dashboard.

![](/img/grafana_dashboard_1.png)
