---
title: Python
order: 1
---

# Python

With the release of a new version of the distributed version, meticulous small partners must have found that CnosDB 2.0 is fully supportive.CnosDB 2.0 connection to Python was implemented by calling the connector cnos-connector.The cnos-connector encapsulated requests for CnosDB to make the use of CnosDB in Python environment more concise and user-friendly.At the same time, cnos-connector provides programming interfaces that meet [PEP 249](https://peps.python.org/pep-0249/) and interact more easily with SQLAlchemy and pandas.

cnos-connector has all open sources, source in [GitHub](https://github.com/cnosdb/cnosdb-client-python)

### Install

Use pip to download the cnos-connector, requires Python version greater than 3.6

```
pip install cnos-connector
```

### Use Example

#### Lookup Example

- #### Query by SQL

  ```python
  From cnosdb_connector import connection

  conn = connect(url="http://127.0.0.0.1:8902/", user="root", password="")
  resp = conn.execute("SHOW DATABASES")
  print(rest)
  ```

- #### Query by function defined by interface

  ```python
  From cnosdb_connector import connection

  conn = conn(url="http://127.0.0.0.1:8902/", user="root", password="")
  conn.create_database("air")
  resp = conn.list_database()
  print(reply)
  ```

- #### For further information, please refer to [PEP-249](https://peps.python.org/pep-0249/).

  ```python
  From cnosdb_connector import connection

  conn = Connect(url="http://127.0.0.0.1:8902/", user="root", password="")
  cursor = conn.cursor()

  cursor.execute("SHOW DATABES")
  resp = cursor.fetchall()
  print()
  ```

- #### Query by pandas, pandas supports PEP-249 norms

  ```python
  import pandas pd
  from cnosdb_connector import connection

  conn = connect(url="http://127.0.0.1:8902/", user="root", password="")

  resp = pd.read_sql("SHOW DATABES", conn)
  print(reply)
  ```

#### Write Example

- #### Data writing in support of Line Protocol

  ```python
  From cnosdb_connector import connection

  line0 = "air,station=XiaoMaiDao temperature=56,pressure=77 166616520029040100"
  line1 = "air,station=XiaoMaiDao temperature=72, Ressure=71 166616530029040100"
  line2 = "air,station=XiaoMaiDao temperature=46,pressure=67 166616540029040100"

  conn = conn(url="http://127. .0.1:8902/", user="root", password="")

  conn.create_database_with_ttl("ocean")
  conn.witch_database("ocean")

  conn.write_lines([line0, line1, line2])

  resp = conn.execute("SELECT * FROM ocean; ")
  print()
  ```

- #### Write with SQL support

  ```python
  From cnosdb_connector import connect

  conn = connect(url="http://127.0.0. :8902/", user="root", password="")

  query = "INSERT INTO air (TIME, station, visibility, temperature, pressu) VALUES
                  (166616520029040100, 'XiaoMaiDao', 56, 69, 77); "

  conn. xecute(query)

  resp = conn.execute("SELECT * FROM ocean;")
  print(rest)
  ```

- #### Support CSV for writing

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

### Interface Documents

Simple encapsulation of some commonly used SQL has been made to make it easier for users to connect to CnosDB, cnosdb_connector.

```python
# CREATE DATABASE database_name;
def create_database(self, database_name)

# CREATE DATABASE database_name TTL ttl;
def create_database_with_ttl(self, database_name, ttl)

# CREATE USER WITH PASWARD = password;
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

If you have a better idea of the interfaces envelope, please submit PRs to our Python connector[源码仓库](https://github.com/cnosdb/cnosdb-client-python).
