---
title: LangChain
order: 3
---

## LangChain 

In this paper, we will mainly introduce how to use LangChain to connect CnosDB database and realize the communication between natural language and database.

### Introduction

LangChain is a framework for developing applications driven by language models. It can achieve the following functions: 
- Data awareness: Connect language models to other data sources. 
- Subjectivity: allows the language model to interact with its environment.

The main value of LangChain is:

1. Componentization: Provides abstract tools for using language models, along with a set of implementations for each abstract tool. These components are modular and easy to use, whether you use other parts of the LangChain framework or not. 
2. Ready-made chain structure: a structured combination of a series of components used to accomplish a specific high-level task. 
The ready-made chain structure makes getting started easy. For more complex applications and careful use cases, components make it easy to customize existing chain structures or build new ones.

### Implementation architecture
![Implementation architecture figure](/img/LangChain_en.png)

It can be seen from the architecture figure that by using LangChain components and ready-made chains, users do not need to learn how to use SQL scripts to interact with the database in advance, saving a lot of time and energy. Using the power of LangChain, SQLDatabase, SQL Agent, and the large OpenAI language model, we have been able to create applications that allow users to communicate with CnosDB in natural language.

### Install LangChain
Execute the following command:
```shell
pip install langchain
```
### Install CnosDB dependencies
```shell
pip install cnos-connector
# cnosdb connector version needs to be greater than 0.1.8
```
### Connecting to CnosDB
1. To connect cnosdb_connector and SQLDatabase to CnosDB, you need the uri required to create the SQLDatabase:
```python
# Use the make cnosdb langchain uri to create the uri
uri = cnosdb_connector.make_cnosdb_langchain_uri()
# Create the DB using the SQLDatabase.from uri
db = SQLDatabase.from_uri(uri)
```
2. Or use the from cnosdb method of SQLDatabase:
```python
def SQLDatabase.from_cnosdb(url: str = "127.0.0.1:8902",
                              user: str = "root",
                              password: str = "",
                              tenant: str = "cnosdb",
                              database: str = "public")
```
Parameters:

| Parameter | Description                                                                                                                                       |
|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| url       | The HTTP connection host name and port number of the CnosDB service, excluding "http://" or "https://", with a default value of "127.0.0.1:8902". |
| user      | The username used to connect to the CnosDB service, with a default value of "root".                                                               |
| password  | The password of the user connecting to the CnosDB service, with a default value of "".                                                            |
| tenant    | The name of the tenant used to connect to the CnosDB service, with a default value of "cnosdb".                                                   |
| database  | The name of the database in the CnosDB tenant.                                                                                                    |

### Example

```python 
# Connect to CnosDB using SQLDatabase
from cnosdb_connector import make_cnosdb_langchain_uri
from langchain import SQLDatabase

uri = cnosdb_connector.make_cnosdb_langchain_uri()
db = SQLDatabase.from_uri(uri)

# Creating OpenAI Chat LLM
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
```
### SQL Database Chain 

This example demonstrates the use of the SQL Chain for answering a question over a CnosDB:

```python
from langchain import SQLDatabaseChain

db_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)

db_chain.run(
    "What is the average temperature of air at station XiaoMaiDao between October 19, 2022 and October 20, 2022?"
)
```
```python
> Entering new  chain...
What is the average temperature of air at station XiaoMaiDao between October 19, 2022 and Occtober 20, 2022?
SQLQuery:SELECT AVG(temperature) FROM air WHERE station = 'XiaoMaiDao' AND time >= '2022-10-19' AND time < '2022-10-20'
SQLResult: [(68.0,)]
Answer:The average temperature of air at station XiaoMaiDao between October 19, 2022 and October 20, 2022 is 68.0.
> Finished chain.
```
### SQL Database Agent
```python
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit

toolkit = SQLDatabaseToolkit(db=db, llm=llm)
agent = create_sql_agent(llm=llm, toolkit=toolkit, verbose=True)
```
```python
agent.run(
    "What is the average temperature of air at station XiaoMaiDao between October 19, 2022 and Occtober 20, 2022?"
)
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
