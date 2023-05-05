---
icon: home
title: Get Started
order: 2
index: false
---

## Create Database

1. Log in to your CnosDB Cloud account and navigate to the "Databases" page.

2. Click the "Create Database" button.

3. In the "Database Name" field, enter a name for your database.

4. Specify a time-to-live (TTL) value in minutes, hours or days for your database documents in the "TTL" field.

5. Specify the number of shards for your database in the "SHARD" field.

6. Specify the duration in seconds for each virtual node in the "VNODE_DURATION" field.

7. Specify the number of replicas for your database in the "REPLICA" field.

8. Specify the precision for timestamp values in the "PRECISION" field.

9. Click the "Create" button to create your database.

## Create Prometheus Data Source

1. Open the CnosDB web console and go to the "Data Sources" page.

2. Click the "Load Data" button.

3. Select "Prometheus" from the list of available data sources.

4. Select the database which you want to import the "Prometheus" data source.

5. Copy the generated configuration content.

6. Start Prometheus and wait for data to be written.

## Create Telegraf Data Source

1. Open the CnosDB web console and go to the "Data Sources" page.

2. Click the "Load Data" button.

3. Select "Telegraf" from the list of available data sources.

4. Select the database which you want to import the "Telegraf" data source.

5. Choose the telegraf plugins you want to use.

6. Enter the datasource name and the description.

7. Click the next button and you can see the usage docs.

## Import Data From CSV

1. Log in to CnosDB Cloud Console and create a new database and table to hold your data.

2. Prepare your CSV file with the data that you want to import. Make sure that the CSV file is formatted correctly and that the column headers match the table schema in CnosDB.

3. In CnosDB cloud Console, navigate to the "Data Source" page

4.  Select the CSV file that you want to import, Drag csv file to the input, wait the importing finish

5. Select the database which you want to import the csv

6. Select the table you want to use, if the table does not exist, you can create a table and design the related columns.

7.  Determine the correspondence between the fields of the data table and the fields of the csv file.

8. Click Next. Seeing Success indicates that the file was written successfully.