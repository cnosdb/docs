---
icon: home
title: Get Started
order: 2
index: false
---

## Create Database

1. Log in to your CnosDB Cloud account and navigate to the "Databases" page.

    ![](/_static/img/cloud/sidebar_database.png)

2. Click the "Create Database" button.

    ![](/_static/img/cloud/database_create_botton.png)

3. In the "Database Name" field, enter a name for your database.

    <img src="/_static/img/cloud/database_name.png" style="width:50% "/>

4. Specify a time-to-live (TTL) value in hours or days for your database documents in the "TTL" field.

    <img src="/_static/img/cloud/ttl_unit.png" style="width:50% "/>

5. Specify the number of shards for your database in the "SHARD" field.

6. Specify the duration in seconds for each virtual node in the "VNODE_DURATION" field.

7. Specify the number of replicas for your database in the "REPLICA" field.

8. Specify the precision for timestamp values in the "PRECISION" field.

9. Click the "Create" button to create your database.
10. Guide Video
<div>
<video width="640" height="360" controls>
  <source src="https://cnosdbcloudpublic.s3.us-west-2.amazonaws.com/docvideo/create-db.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</div>
## Create Prometheus Data Source

1. Open the CnosDB web console and go to the "Data Sources" page.

    ![](/_static/img/cloud/sidebar_datasource.png)

2. Click the "Load Data" button.

    ![](/_static/img/cloud/load_data_botton.png)

3. Select "Prometheus" from the list of available data sources.

    ![](/_static/img/cloud/select_prometheus.png)

4. Select the database which you want to import the "Prometheus" data source.

    ![](/_static/img/cloud/prometheus_select_database.png)

5. Copy the generated configuration content.

    ![](/_static/img/cloud/prometheus_config.png)

6. Start Prometheus and wait for data to be written.

    ```toml
    prometheus --config.file=prometheus.yml
    ```
7. Guide Video
<div>
<video width="640" height="360" controls>
  <source src="https://cnosdbcloudpublic.s3.us-west-2.amazonaws.com/docvideo/prometheus.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</div>
## Create Telegraf Data Source

1. Open the CnosDB web console and go to the "Data Sources" page.

    ![](/_static/img/cloud/sidebar_datasource.png)

2. Click the "Load Data" button.

    ![](/_static/img/cloud/load_data_botton.png)

3. Select "Telegraf" from the list of available data sources.

    ![](/_static/img/cloud/select_telegraf.png)

4. Select the database which you want to import the "Telegraf" data source.

    ![](/_static/img/cloud/telegraf_select_database.png)

5. Choose the telegraf plugins you want to use.

    ![](/_static/img/cloud/select_telegraf_plugins.png)

6. Enter the datasource name and the description.

    ![](/_static/img/cloud/telegraf_description.png)

7. Click the next button and you can see the usage docs.

    ![](/_static/img/cloud/telegraf_usage.png)

## Import Data From CSV

1. Log in to CnosDB Cloud Console and create a new database and table to hold your data.

    ![](/_static/img/cloud/sidebar_database.png)

2. Prepare your CSV file with the data that you want to import. Make sure that the CSV file is formatted correctly and that the column headers match the table schema in CnosDB.

3. In CnosDB cloud Console, navigate to the "Data Source" page

    ![](/_static/img/cloud/sidebar_datasource.png)

4.  Select the CSV file that you want to import, Drag csv file to the input, wait the importing finish

    ![](/_static/img/cloud/csv_import.png)

5. Select the database which you want to import the csv

    ![](/_static/img/cloud/csv_select_database.png)


6. Select the table you want to use, if the table does not exist, you can create a table and design the related columns.

    ![](/_static/img/cloud/csv_select_table.png)

7.  Determine the correspondence between the fields of the data table and the fields of the csv file.

    ![](/_static/img/cloud/csv_mapping.png)

8. Click Next. Seeing Success indicates that the file was written successfully.

    ![](/_static/img/cloud/csv_success.png)