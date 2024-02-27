---
title: Python
order: 1
---

# Python

With the release of a new version of the distributed version, meticulous small partners must have found that CnosDB 2.0 is fully supportive.CnosDB 2.0 connection to Python was implemented by calling the connector cnos-connector.With the release of the new version of the distribution, attentive friends will have noticed that CnosDB 2.0 has fully supported Python. cnos-connector enables the connection between CnosDB 2.0 and Python by calling the connector cnos-connector. cnos-connector encapsulates the requests to CnosDB, making it simpler and easier to use CnosDB in Python. It makes using CnosDB in Python environment more concise and easy to use. At the same time, cnos-connector provides a [PEP 249](https://peps.python.org/pep-0249/) compliant programming interface, which makes it easier to interact with SQLAlchemy and pandas.At the same time, cnos-connector provides programming interfaces that meet [PEP 249](https://peps.python.org/pep-0249/) and interact more easily with SQLAlchemy and pandas.

cnos-connector is fully open source and the source code is located on [GitHub](https://github.com/cnosdb/cnosdb-client-python).

### Install

Download and install cnos-connector using pip, which requires Python version greater than or equal to 3.6

```
pip install cnos-connector
```

### Usage Examples

#### Query example

- #### Query by SQL

  ```python
  From cnosdb_connector import connection

  conn = connect(url="http://127.0.0.0.1:8902/", user="root", password="")
  resp = conn.execute("SHOW DATABASES")
  print(rest)
  ```

- #### Query by function defined by the interface

  ```python
  From cnosdb_connector import connection

  conn = conn(url="http://127.0.0.0.1:8902/", user="root", password="")
  conn.create_database("air")
  resp = conn.list_database()
  print(reply)
  ```

- #### Search through PEP-249, for more information, please refer to [PEP-249](https://peps.python.org/pep-0249/).

  ```python
  From cnosdb_connector import connection

  conn = Connect(url="http://127.0.0.0.1:8902/", user="root", password="")
  cursor = conn.cursor()

  cursor.execute("SHOW DATABES")
  resp = cursor.fetchall()
  print()
  ```

- #### Querying via pandas, which supports the PEP-249 specification

  ```python
  import pandas pd
  from cnosdb_connector import connection

  conn = connect(url="http://127.0.0.1:8902/", user="root", password="")

  resp = pd.read_sql("SHOW DATABES", conn)
  print(reply)
  ```

#### Writing example

- #### supports the Line Protocol method for writing data.

  ```python
  from cnosdb_connector import connect

  line0 = "air,station=XiaoMaiDao temperature=56,pressure=77 1666165200290401000"
  line1 = "air,station=XiaoMaiDao temperature=72,pressure=71 1666165300290401000"
  line2 = "air,station=XiaoMaiDao temperature=46,pressure=67 1666165400290401000"

  conn = connect(url="http://127.0.0.1:8902/", user="root", password="")

  conn.create_database_with_ttl("ocean")
  conn.switch_database("ocean")

  conn.write_lines([line0, line1, line2])

  resp = conn.execute("SELECT * FROM ocean;")
  print(resp)
  ```

- #### Support SQL for writing

  ```python
  From cnosdb_connector import connect

  conn = connect(url="http://127.0.0. :8902/", user="root", password="")

  query = "INSERT INTO air (TIME, station, visibility, temperature, pressu) VALUES
                  (166616520029040100, 'XiaoMaiDao', 56, 69, 77); "

  conn. xecute(query)

  resp = conn.execute("SELECT * FROM ocean;")
  print(rest)
  ```

- #### Support for writing in CSV format

  ```python
  From cnosdb_connector import connection
  import os

  query = "CREATE TABLE air (\
               visibility DOUBLE,
               temperature DOUBLE,
               press DOUBLE,
               TAGS (staff));

  conn = connect(url="http://127. .0.1:8902/", user="root", password="")
  # table schema must be the same with csv file
  conn.execute(query)

  path = os. ath.absath("test.csv")
  conn.write_csv("air", path)

  resp = conn.execute("SELECT * FROM air;")
  print(rest)
  ```

### Interface Documentation

In order to make it easier for users to connect to CnosDB, cnosdb_connector provides a simple wrapper for some common SQL.

```python
# CREATE DATABASE database_name;
def create_database(self, database_name)

# CREATE DATABASE database_name WITH TTL ttl;
def create_database_with_ttl(self, database_name, ttl)

# CREATE USER user WITH PASSWORD = password;
def create_user(self, user, password)

# DROP DATABASE database_name;
def drop_database(self, database_name)
    
# DROP TABLE table_name;
def drop_table(self, table_name)

# DROP USER user;
def drop_user(self, user)

# SHOW DATABASES;
def list_database(self)

# SHOW TABLES;
def list_table(self)
```

If you have a better idea for an interface wrapper, feel free to submit a PR to our Python Connector [source code repository](https://github.com/cnosdb/cnosdb-client-python).
