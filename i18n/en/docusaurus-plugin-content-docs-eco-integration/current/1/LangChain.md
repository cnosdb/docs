---
slug: /langchain
---

# LangChain

We will focus on how to use LangChain to connect to the CnosDB database for communication in natural languages and databases.

### Introduction

LangChain is a framework for developing applications driven by language models.It can perform the following features：

- Data result：links language models to other data sources.
- Subject：allows language models to interact with their environment.

The main value of LangChain is：

1. Component：provides abstract tools for using language models and also provides a series of implementations for each abstract tool.These components are modular and easy to use, regardless of whether you use other parts of the LangChain framework.
2. The ready-made chain structure：is structured in a series of components that perform specific advanced tasks.
   The ready-made chain structure makes entry easier.For more complex applications and meticulous uses, components make it easier to customize existing or build new chain structures.

### Implementing Architecture

![实现架构图](/img/Langchain.png)

By using LangChain components with ready-made chains,：is allowed through the schema to move ahead to learn how to interact with the database using SQL scripts, saving a lot of time and energy.Using the powerful features of LangChain, SQL Database, SQL Agent and OpenAI Large Language Model, we can already create an application that allows users to communicate with CnosDB in natural languages.

### Install LangChain

Execute the command： below

```shell
pip install langchain
```

### Install CnosDB Dependencies

```shell
pip install cnos-connector
# cnosdb_connector version needs more than 0.1.8
```

### Connect to CnosDB

1. Connect to CnosDB using cnosdb_connector and SQL Database, requires uri： to create SQL database

```python
# Use make_cnosdb_langchain_uri to create uri
uri = cnosdb_connector.make_cnosdb_langchain_uri()
# Create DB
db = SQLDatabase.from_uri(ur)
```

2. Or the from_cnosdb method using SQL Database:

```python
def SQL Database.from_cnosdb(url: str = "127.0.0.1:8902",
                              user: str = "root",
                              password: str = "",
                              tenant: str = "cnosdb",
                              database: str = "public")
```

| 参数名               | Description                                                                                                                         |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| Url               | HTTP connection hostname and port number for CnosDB service, excluding "http\:/" or "https\://", default value is "127.0.0.1:8902". |
| user              | Username used to connect to the CnosDB service, default is "root".                                                                  |
| password          | The user password to connect to the CnosDB service, default value is empty string "".                                               |
| tenant            | Name of the tenant used to connect to the CnosDB service, default is "cnosdb".                                                      |
| Database database | Name of the database among the tenants of CnosDB.                                                                                   |

### Use Example

```python
# Connect CnosDB
from cnosdb_connector import make_cnosdb_langchain_uri
from langchain import SQLDatabase

uri = cnosdb_connector.make_cnosdb_langchain_uri()
db = SQLDatabase. rom_uri(ur)

# Create OpenAI Chat LLM
from langchain.chat_models import ChatOpenAI

lm = ChatOpenAI (temperature=0, model_name="gpt-3.5-turbo")
```

### Example SQL Database Chain

The following example shows how to use SQL Chain to answer a question： through a database

```python
From langchain import SQLDatabaseChain

db_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)

db_chain. un(
    "What is the average temperature of air at station XiaoMaiDao between October 19, 2022 and October 20, 2022?

```

```python
> Entering new chain...
What is the average temperature of air at station XiaoMaiDao between October 19, 2022 and Occasional 20, 2022?
SQLQuery: SELECT AVG (temperature) FROM air WHERE station = 'XiaoMaiDao' and time >= '2022-10' and time < '2022-10-20'
SQLResult: [(68. ()]
Answer: The average temperature of air at station XiaoMaiDao between October 19, 2022 and October 20, 2022 is 68.0.
> Finished chain.
```

### SQL Database Agent Example

```python
From langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit

toolkit = SQLDatabaseToolkit(db=db, llm=llm)
agent = create_sql_agent(llm=lm, toolkit=toolkit, verbese=True)
```

```python
agent.run(
    "What is the average temperature of air at station XiaoMaiDao between October 19, 2022 and Occasion 20, 2022?"

```

```python
> Entering new  chain...
Action: sql_db_list_tables
Action Input: ""
Observation: air
Thought:The "air" table seems relevant to the question. I should query the schema of the "air" table to see what columns are available.
Action: sql_db_schema
Action Input: "air"
Observation: 
CREATE TABLE air (
	pressure FLOAT, 
	station STRING, 
	temperature FLOAT, 
	time TIMESTAMP, 
	visibility FLOAT
)

/*
3 rows from air table:
pressure	station	temperature	time	visibility
75.0	XiaoMaiDao	67.0	2022-10-19T03:40:00	54.0
77.0	XiaoMaiDao	69.0	2022-10-19T04:40:00	56.0
76.0	XiaoMaiDao	68.0	2022-10-19T05:40:00	55.0
*/
Thought:The "temperature" column in the "air" table is relevant to the question. I can query the average temperature between the specified dates.
Action: sql_db_query
Action Input: "SELECT AVG(temperature) FROM air WHERE station = 'XiaoMaiDao' AND time >= '2022-10-19' AND time <= '2022-10-20'"
Observation: [(68.0,)]
Thought:The average temperature of air at station XiaoMaiDao between October 19, 2022 and October 20, 2022 is 68.0. 
Final Answer: 68.0

> Finished chain.
```
