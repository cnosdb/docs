---
title: Python连接器
order: 8
---

随着分布式新版本的发布，细心的小伙伴们想必已经发现CnosDB 2.0已经全面支持了Python。通过调用连接器cnos-connector， 实现了CnosDB 2.0与Python 的连接。cnos-connector 封装了对 CnosDB 的请求，使在Python环境下使用CnosDB更加简洁、易用。同时，cnos-connector提供了符合 [PEP 249](https://peps.python.org/pep-0249/) 的编程接口，更易与 SQLAlchemy 以及 pandas 进行交互。

cnos-connector 已全部开源，源码位于 [GitHub](https://github.com/cnosdb/cnosdb-client-python)

## 安装

使用 pip 下载安装 cnos-connector，需要 Python 版本大于等于 3.6

```
pip install cnos-connector
```

## 使用示例

### 查询示例

#### 通过SQL进行查询

```python
from cnosdb_connector import connect

conn = connect(url="http://127.0.0.1:31001/", user="root", password="")
resp = conn.execute("SHOW DATABASES")
print(resp)
```

#### 通过接口定义的函数查询

```python
from cnosdb_connector import connect

conn = connect(url="http://127.0.0.1:31001/", user="root", password="")
conn.create_database("air")
resp = conn.list_database()
print(resp)
```

#### 通过PEP-249进行查询，详细信息请参考 [PEP-249](https://peps.python.org/pep-0249/)

```python
from cnosdb_connector import connect

conn = connect(url="http://127.0.0.1:31001/", user="root", password="")
cursor = conn.cursor()

cursor.execute("SHOW DATABASES")
resp = cursor.fetchall()
print(resp)
```

#### 通过pandas进行查询，pandas支持PEP-249的规范

```python
import pandas as pd
from cnosdb_connector import connect

conn = connect(url="http://127.0.0.1:31001/", user="root", password="")

resp = pd.read_sql("SHOW DATABASES", conn)
print(resp)
```
### 写入示例

#### 支持Line Protocol的方式进行数据的写入

```python
from cnosdb_connector import connect

line0 = "air,station=XiaoMaiDao temperature=56,pressure=77 1666165200290401000"
line1 = "air,station=XiaoMaiDao temperature=72,pressure=71 1666165300290401000"
line2 = "air,station=XiaoMaiDao temperature=46,pressure=67 1666165400290401000"

conn = connect(url="http://127.0.0.1:31001/", user="root", password="")

conn.create_database_with_ttl("ocean")
conn.switch_database("ocean")

conn.write_lines([line0, line1, line2])

resp = conn.execute("SELECT * FROM ocean;")
print(resp)
```

#### 支持SQL的方式进行写入

```python
from cnosdb_connector import connect

conn = connect(url="http://127.0.0.1:31001/", user="root", password="")

query = "INSERT INTO air (TIME, station, visibility, temperature, pressure) VALUES
                (1666165200290401000, 'XiaoMaiDao', 56, 69, 77); "

conn.execute(query)

resp = conn.execute("SELECT * FROM ocean;")
print(resp)
```

#### 支持CSV的方式进行写入

```python
from cnosdb_connector import connect
import os

query = "CREATE TABLE air (\
    		 visibility DOUBLE,\
    		 temperature DOUBLE,\
    		 pressure DOUBLE,\
    		 TAGS(station));"

conn = connect(url="http://127.0.0.1:31001/", user="root", password="")
# table schema must same with csv file
conn.execute(query)

path = os.path.abspath("test.csv")
conn.write_csv("air", path)

resp = conn.execute("SELECT * FROM air;")
print(resp)
```

## 接口文档
为了便于用户更加方便地连接使用 CnosDB，cnosdb_connector 对于一些常用的 SQL 进行了简单的封装 
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
如果您对接口封装有更好的想法，欢迎向我们 Python 连接器的[源码仓库](https://github.com/cnosdb/cnosdb-client-python)提交PR