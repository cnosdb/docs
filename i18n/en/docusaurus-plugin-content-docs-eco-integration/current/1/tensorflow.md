---
title: TensorFlow
slug: /tensor flow
---

> Time series prediction using CnosDB with TensorFlow

### Time series prediction using CnosDB with TensorFlow

### Forecast changes from trunk movement to solar black

### Preface

The black sun is a solar activity taking place on the solar photovoltaic layer, which is usually occurring in crowds. The prediction of black solar changes is one of the most active areas in space meteorological research.

The solar black observation lasts for a long time. The long period of data accumulation facilitates the exhumation of black sun changes. Long-term observations indicate that changes in the black number and area of the Sun display marked periodicity and irregular cycles, with an average cycle of approximately 9\~13a, with an average cycle of approximately 11a, and a fluctuating peak of changes in the black number and area of the Sun.

The latest data show a clear downward trend in the number and area of black sun in recent years.

![](/img/Hathaway_Cycle_24_Prediction.png)

The detection of black solar activity is particularly important in view of its profound impact on Earth.Physicological models (such as power models) and statistical models (such as regression averages) have been widely used to detect black solar activity.
Machine learning methods have been introduced to capture non-linear relationships in solar black time series more efficiently.

It is worth mentioning that neurological networks in machine learning are more specialized in digging data for non-linear relationships.

**This paper will therefore describe how to store solar black changes using the time series database `CnosDB` and further uses TensorFlow to implement the `1DConv+LSTM` network to predict changes in solar black numbers.**

#### Introduction to solar black change observing data sets

The solar black data set used here is version 2.0 published by the SILSO website (WDC-SILSO, Royal Observatory of Belgium, Brussels, http\://sidc.be/silso/datafiles)

![](/img/sunspot_database.png)

We analyze and explore：1749 to 2023, changing average monthly solar black count (monthly mean sunspot number@@, MSSN).

### CnosDB Data Import

Download the `SN_m_tot_V2.0.csv` file in MSS data csv format (https\://www\.sidc.be/SILSO/INFO/snmtotcsv.php).

Here is the official CSV file description：

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

We use `pandas` to load and preview files.

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

### Storage MSSN data using time series database CnosDB

CnosDB (An Open Source Distrible Time Series Database with high performance, high expression ratio and high ability.)

- Official Website: http\://www\.cnosdb.com
- Github Repo: https\://github.com/cnosdb/cnosdb

(Note：This paper assumes that you have already had CnosDB installation deployment and basic usage capacity, see https\://docs.cnosdb.com

Start the CnosDB database service with Docker in the command line, and enter the container using the [CnosDB CLI](/docs/reference/tools) tool to access CnosDB：

```SHELL
(base) root@ecs-django-dev:~# docker run --restore=always --name cnosdb -d --env cpu=2 --env memory=4 -p 8902:8902 cnosdb/cnosdb:v2. .2.1-beta

(base) root@ecs-django-dev:~# docker exec -it cnosdb sh
# cnosdb-cli
CnosDB CLI v2. .0
Input Arguments: Args Led host: "localhost", port: 8902, user: "cnosdb", password: None, database: "public", target_partitions: None, data_path: None, file: [], rc: None, form: Table, quiet: false }
```

In order to simplify analysis, we need only store data concentrated observation time and solar black numbers.We therefore spell annual (Col 0) and month (Col 1) as observation time (date, string type) and the average monthly solar black number (Col 3) can be stored without processing.

We can use SQL to create a database table called `sunspot` in CnosDB CLI to store MSS data sets.

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

#### Connect and write CnosDB database with CnosDB Python Connector

Github Repo: https\://github.com/cnosdb/cnosdb-client-python

```python
# Install Python Connector
pip install -U cnos-connector
```

```python
From cnosdb_connector import connect

conn = connect(url="http://127.0.0.0.1:8902/", user="root", password="")
cursor = conn.cursor()
```

If it is not customary to use [CnosDB CLI](/docs/reference/tools), we can also create tables using Python Connector directly.

```python
# Create tf_demo database
conn.create_database("tf_demo")
# with tf_demo database
conn.witch_database("tf_demo")
print(conn.list_database()

cursor.execute("CREATE TABLE sunspotmot (date STRING, mssn DOUBLE,);")
print(conn.list_table()
```

The output below includes CnosDB default Database.

```python
[{'Database': 'tf_demo'}, {'Database': 'usage_schema'}, {'Database': 'public'}]
[{'Table': 'sunspot'}]
```

Write data from previous pandas to CnosDB.

```python
### df for pandas' datatrame, "sunspot" is the name of the table in CnosDB, ['date', 'mssn'] column name
### if the column written does not contain a time column, auto-generate
conn.write_dataframe (df, "sunspot", ['date', 'mssn'])
```

### CnoDB read data and uses TensorFlow to rewrite 1DConv+LSTM network to predict black sun changes

Reference paper：Program surgery, Pascoe, and gas. "Forecast solar black changes based on neurological network." (2022).


![](/img/MSN.png)

#### Read data using CnosDB

```python
df = pd.read_sql("select * from sunspot;", conn)

print(df.head() )
```

![](/img/cnosdb_dataframe.png)

#### Divide datasets into training sets and test sets

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

#### Construct training data using sliding window

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

#### Define 1DConv+LSTM neuronetwork model

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

#### Forecast MSSSN using trained models

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

#### Visualizations compared to real values

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
