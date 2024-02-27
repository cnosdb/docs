---
title: TensorFlow
slug: /tensor flow
---

> Introduction

### Introduction

### From three-body motion to Sunspot Change prediction

### Preface

The black sun is a solar activity taking place on the solar photovoltaic layer, which is usually occurring in crowds. Sunspots are solar activity that occurs in the photosphere of the sun and usually appear in groups. Predicting sunspot changes is one of the most active areas of space weather research.

The solar black observation lasts for a long time. The long period of data accumulation facilitates the exhumation of black sun changes. Sunspot observations last for a long time. Long-term data accumulation is conducive to mining the law of sunspot variation. The long-term observation shows that the sunspot number and area change show obvious periodicity, and the period is irregular, roughly ranging from 9 to 13 years, the average period is about 11 years, and the peak value of the sunspot number and area change is not constant.

The latest data show that the number and area of sunspots have declined significantly in recent years.

![](/img/Hathaway_Cycle_24_Prediction.png)

The detection of black solar activity is particularly important in view of its profound impact on Earth.Physicological models (such as power models) and statistical models (such as regression averages) have been widely used to detect black solar activity.
Machine learning methods have been introduced to capture non-linear relationships in solar black time series more efficiently.

It is worth mentioning that neural networks in machine learning are better at mining nonlinear relationships in data.

\*\* Therefore, this article will introduce how to use the time series database 'CnosDB' to store the sunspot change data and further use TensorFlow to implement the '1DConv+LSTM' network to predict the sunspot number change. \*\*\*\*

#### Introduction to the Sunspot Change Observation dataset

The sunspot dataset used in this paper was released by the SILSO website version 2.0. (WDC-SILSO, Royal Observatory of Belgium, Brussels,http\://sidc.be/silso/datafiles)

![](/img/sunspot_database.png)

We mainly analyze and explore the changes of the monthly mean sunspot number (MSSN) from 1749 to 2023.

### Import Data to CnosDB

Download MSSN data `SN_m_tot_V2.0.csv`（https\://www\.sidc.be/SILSO/INFO/snmtotcsv.php）.

Here is the official description of the CSV file:

```
Filename: SN_m_tot_V2.0.csv
Format: Comma Separated values (adapted for import in spreadsheets)
The separator is the semicolon ';'.

Contents:
Column 1-2: Gregorian calendar date
- Year
- Month
Column 3: Date in fraction of year.
Column 4: Monthly mean total sunspot number@@0.
Column 5: Monthly mean standard Deviation of the input sunspot numbers.
Column 6: Number of observations used to prosecute the monthly total sunspot number.
Column 7: Definitive/provisional marker. '1' indicates that the value is definitive. '0' indicates that the value is still provisional.
```

We use `pandas` for file loading and previewing.

```python
import pandas as pd

df = pd.read_csv("SN_m_tot_V2.0.csv", sep=";", header=None)
df. olums = ["year", "month", "date_fraction", "mssn", "standard_deviation", "observations", "marker"]

# convert year and month to strings
df["year"] = df["year"]. stype(str)
df["month"] = df["month"].astype(str)

# conciliate year and month
df["date"]= df["year"] + "-" + df["month"]

df.head()
```

![](/img/pandas_dataframe.png)

```python
import materiplotlib.pyplot as plt

df["Date"] = pd.to_datetime(df["date"], format@@="%Y-%m")
plt.plot(df["Date"], df["mssn"]])
plt.xlabel("Date")
plt.ylbel("MSSN")
plt.title("Suns" Activity Over Time")
plt.show()
```

![](/img/plt_show.png)

### Use TSDB CnosDB to store MSSN data

CnosDB (An Open Source Distrible Time Series Database with high performance, high expression ratio and high ability.)

- Official Website: http\://www\.cnosdb.com
- Github Repo: https\://github.com/cnosdb/cnosdb

Notice: We suppose the you have the ability to deploy and use CnosDB. You can get more information through https\://docs.cnosdb.com/）

Use Docker to start CnosDB service in command line, enter the container and use the [CnosDB CLI](/docs/reference/tools) to use CnosDB:

```SHELL
(base) root@ecs-django-dev:~# docker run --restore=always --name cnosdb -d --env cpu=2 --env memory=4 -p 8902:8902 cnosdb/cnosdb:v2. .2.1-beta

(base) root@ecs-django-dev:~# docker exec -it cnosdb sh
# cnosdb-cli
CnosDB CLI v2. .0
Input Arguments: Args Led host: "localhost", port: 8902, user: "cnosdb", password: None, database: "public", target_partitions: None, data_path: None, file: [], rc: None, form: Table, quiet: false }
```

Since the intensity of sunspot activity has a profound impact on Earth, it is particularly important to detect sunspot activity. Physics-based models, such as dynamical models, and statistical models, such as autoregressive moving averages, have been widely used to detect sunspot activity.
In order to capture the nonlinear relationship in sunspot time series more efficiently, machine learning methods are introduced.To simplify the analysis, we only need to store the observation time and the number of sunspots in the dataset. Therefore, we concatenate the year (Col 0) and month (Col 1) as the observation time (date, string type), and the monthly mean sunspot number (Col 3) can be stored directly without processing.

We can create a 'sunspot' table in CnosDB CLI using SQL to store the MSSN dataset.

```SQL
public ❯ CREATE TABLE sunspot (
date STRING,
mssn DOUBLE,
);
Query took 0.002 seconds.

public ❯ SHOW TABLES;
+---------+
| Table   |
+---------+
| sunspot |
+---------+
Query took 0.001 seconds.

public ❯ SELECT * FROM sunspot;
+------+------+------+
| time | date | mssn |
+------+------+------+
+------+------+------+
Query took 0.002 seconds.
```

#### Use CnosDB Python Connector to Connect and Use CnosDB Database

Github Repo: https\://github.com/cnosdb/cnosdb-client-python

```python
# install Python Connector
pip install -U cnos-connector
```

```python
From cnosdb_connector import connect

conn = connect(url="http://127.0.0.0.1:8902/", user="root", password="")
cursor = conn.cursor()
```

If you are not familiar with [CnosDB CLI](/docs/reference/tools), We can use Python Connector to create a data table.

```python

# create tf_demo database
conn.create_database("tf_demo")
# 使用 tf_demo database
conn.switch_database("tf_demo")
print(conn.list_database())

cursor.execute("CREATE TABLE sunspot (date STRING, mssn DOUBLE,);")
print(conn.list_table())
```

Outputs are as follows, the default database of CnosDB included.

```python
[{'Database': 'tf_demo'}, {'Database': 'usage_schema'}, {'Database': 'public'}]
[{'Table': 'sunspot'}]
```

Write the dataframe of pandas to CnosDB.

```python
### df is the dataframe of pandas, "sunspot" is the table name of CnosDB, ['date', 'mssn'] are the name of columns to be written.
### If you write a column that does not contain a time column, it will be automatically generated based on the current time
conn.write_dataframe(df, "sunspot", ['date', 'mssn'])
```

### CnoDB reads the data and uses TensorFlow to reproduce the 1DConv+LSTM network to predict sunspot changes

References: 程术, 石耀霖, and 张怀. "基于神经网络预测太阳黑子变化." (2022).


![](/img/MSN.png)

#### Use CnosDB to Read Data

```python
df = pd.read_sql("select * from sunspot;", conn)

print(df.head() )
```

![](/img/cnosdb_dataframe.png)

#### Divide the data into training set and test set

```python
Import sum as np
# Data values to sum for better and disaster processing
time_index = np. ray(df['date'])
data = np.array(df['mssn'])

# ratio to split the data
SPLIT_RATO = 0.

# Dividing into train-test flit
split_index = int(SPLIT_RATO *data). hape[0])

# Train-Test Split
train_data = data[:split_index]
train_time = time_index[:split_index]
test_data = data[split_index:]
test_time = time_index[plit_index:]
```

#### Use the Sliding Window Method to Construct the Training Data

![](/img/sliding_window_method.png)

```python
import sensorflow as tf

## required parameters
WINDOW_SIZE = 60
BATCH_SIZE = 32
SHUFLE_BUFER = 1000

## function to create the input features
def ts_data_generator(data, window_size, batch_size, shuffle_buffer):
'''
Utility function for time series data generation in batches
''
ts_data = tf. ata.Dataet.from_tensor_slices(data)
ts_data = ts_data.window(window_size + 1, shift=1, drop_remainder=True)
ts_data = ts_data.flat_map(lambda window: window.batch (window_size + 1))
ts_data = ts_data.shuffle(shuffle_buffer). ap(lambda window: (window[:-1], windowow[-1]))
ts_data = ts_data.batch(batch_size). refetch(1)
return ts_data# Expanding data into tens


# Expanding data into tens
tensor_train_data = tf.expand_dims(train_data, axis=1)
tensor_test_data = tf. xpand_dims(test_data, axis=-1)

## generate input and output features for training and testing set
tensor_train_dataet = ts_data_generator(tensor_train_data, WINDOW_SIZE, BATCH_SIZE, SHOFLE_BUFER)
tensor_test_dataet = ts_data_generator (tensor_test_data, WINDOW_SIZE, BATCH_SIZE, SHOFLE_BUFER)
```

#### Use the tf.keras module to Define the 1DConv+LSTM Neural Network Model

```python
model s.Sequential ([
tf.keras.layers.Conv1D(filters=128, kernel_size=3, strides=1, input_shape=[None, 1]),
tf.keras.layers.MaxPool1D(Pool_size=2, strrides=1),
tf.keryers.LSTM(128, return_sequences=Trace),
tf.keras.layers.LSTM(64, return_sequences=Trace),
tf.keras.layers.Dense(132, activation="),
tf.keras.layers.Dense(1)])


```

```python
## compile neural model
optimizer = tf.keras.optimizers. Adam (learning_rate=1e-3)
model. ompile(loss="mse",
optimizer=optimizer,
metrics=["mae"])
## training neural model
history = model.fit(tensor_train_database, epochs=20, validation_data=tensor_test_dataet)
```

![](/img/tensorflow.png)

```python
# summarize history for loss
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoc')
plt.legend([['train', 'test'test'], loc='upper left')
plt.show()
```

![](/img/model_result.png)

#### Predict the MSSN using the trained model

```python
def model_forest(model, data, window_size):
ds = tf.data.Dataet.from_tensor_slices(data)
ds = ds. indow(window_size, shift=1, drop_reader=True)
ds = ds.flat_map(lambda w: w.batch (window_size))
ds = ds.batch(32). prefetch(1)
foresast = model. redict(ds)
return foreecast

rnnn_foresast = model_forestation(model, data[.., np. ewaxis], WINDOW_SIZE)
rnn_foresast = rnn_forest_index - WINDOW_SIZE:-1, -0]
# Overall Error
error = tf.keras.metrics.mean_solute_error(test_data, rnn_foreecast).numpy()
print(error)
```

```python
101/101 [================================2s 18ms/stap
24.676455
```

#### Visualization of the results compared to the ground truth

```python
plt.plot(test_data)
plt.plot(rn_forest)
plt.title('MSN Foecast')
plt.ybel('MSSN')
plt.xlabel('Month')
plt.legend(['Ground Trust', 'Predictions'], loc='upper right')
plt.show()
```

![](/img/model_result_compare.png)
