---
---

# LangChain 

本篇我们将主要介绍如何使用 LangChain 连接 CnosDB 数据库，实现使用自然语言和数据库的交流。

### 简介

LangChain 是一个用于开发由语言模型驱动的应用程序的框架。它可以实现以下功能：
- 数据感知：将语言模型与其他数据源连接起来。
- 主体性：允许语言模型与其环境进行交互。

LangChain 的主要价值在于：

1. 组件化：为使用语言模型提供抽象化的工具，同时还提供了每个抽象化工具的一系列实现。这些组件是模块化且易于使用的，无论你是否使用LangChain框架的其他部分。
2. 现成的链式结构：用于完成特定高级任务的一系列组件的结构化组合。
现成的链式结构使得入门变得容易。对于更复杂的应用程序和细致的使用情况，组件使得自定义现有链式结构或构建新的链式结构变得容易。

### 实现架构
![实现架构图](/img/Langchain.png)

通过架构图可以看出：通过利用 LangChain 的组件与现成的链，使得用户不需要提前去学习如何使用 SQL 脚本与数据库交互，节省了大量的时间与精力。利用 LangChain 、SQLDatabase、SQL Agent 以及 OpenAI 大型语言模型的强大功能，我们已经可以做到创建应用程序，实现让用户使用自然语言与 CnosDB 交流。

### 安装部署 LangChain
执行下面命令：
```shell
pip install langchain
```
### 安装 CnosDB 依赖
```shell
pip install cnos-connector
# cnosdb_connector版本需要大于0.1.8
```
### 连接CnosDB
1. 使用 cnosdb_connector 以及 SQLDatabase 连接 CnosDB，需要创建 SQLDatabase 所需的 uri：
```python
# 使用 make_cnosdb_langchain_uri 来创建uri
uri = cnosdb_connector.make_cnosdb_langchain_uri()
# 通过 SQLDatabase.from_uri 来创建 DB
db = SQLDatabase.from_uri(uri)
```
2. 或者使用 SQLDatabase 的 from_cnosdb 方法:

```python
def SQLDatabase.from_cnosdb(url: str = "127.0.0.1:8902",
                              user: str = "root",
                              password: str = "",
                              tenant: str = "cnosdb",
                              database: str = "public")
```

| 参数名      | 描述                                                                       |
|:---------|:-------------------------------------------------------------------------|
| url      | CnosDB服务的HTTP连接主机名和端口号，不包括 "http://" 或 "https://"，默认值为 "127.0.0.1:8902"。 |
| user     | 用于连接到CnosDB服务的用户名，默认值为 "root"。                                           |
| password | 连接到CnosDB服务的用户密码，默认值为空字符串 ""。                                            |
| tenant   | 用于连接到CnosDB服务的租户名称，默认值为 "cnosdb"。                                        |
| database | CnosDB租户中数据库的名称。                                                         |

### 使用示例
```python 
# 使用 SQLDatabase 连接 CnosDB
from cnosdb_connector import make_cnosdb_langchain_uri
from langchain import SQLDatabase

uri = cnosdb_connector.make_cnosdb_langchain_uri()
db = SQLDatabase.from_uri(uri)

# 创建 OpenAI Chat LLM
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
```
### SQL Database Chain 示例

下面例子演示了如何利用 SQL Chain 通过数据库来回答一个问题：

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
### SQL Database Agent 示例
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
