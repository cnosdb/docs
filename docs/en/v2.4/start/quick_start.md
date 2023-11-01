---
title: Quick start
order: 3
---

# Quick Start

CnosDBSQL is inspired by [DataFusion](https://arrow.apache.org/datafusion/user-guide/introduction.html), We support most of the SQL syntax of DataFusion.

**Note**: In order to query more efficiently, the order of each row may not be the same for queries without specified sorting

## Sample Data

To further study CnosDB, this section will provide sample data for you to download and teach you how to import data into the database. The data sources referenced in the following chapters are all from this sample data.

### Download Data

If in cnosdb cli, enter`\q`to exit.

Executing the following command in the shell will generate a local data file named oceanic_station in Line Protocol format.

```shell
curl -o oceanic_station.txt https://dl.cnosdb.com/sample/oceanic_station.txt
```

### Import Data

- **Start the CLI**
    ```shell
    cnosdb-cli
    ```
- **Create the database**

  ```shell
  create database oceanic_station;
  ```
  
- **Switch to the specified database**

    ```shell
    \c oceanic_station
    ```
- **Import data**

  Execute the \w command, followed by the absolute path of the data file or the working path relative to cnosdb-cli.

  ```shell
  \w oceanic_station.txt
  ```

## **Syntax**

```sql
[ WITH with_query [, ...] ]
SELECT [ ALL | DISTINCT ] select_expression [, ...]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC ] [, ...] ]
    [ OFFSET count ]
    [ LIMIT { count | ALL } ];

-- from_item
-- 1.
    tb_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
-- 2.
    from_item join_type from_item
    { ON join_condition | USING ( join_column [, ...] ) }

-- join_type
    [ INNER ] JOIN
    LEFT [ OUTER ] JOIN
    RIGHT [ OUTER ] JOIN
    FULL [ OUTER ] JOIN
    CROSS JOIN

-- grouping_element
    ()
```

## **SELECT Clause**

### SELECT \*
The wildcard * can be used to refer to all columns.

**Example**

```sql
SELECT * FROM air;
```

    +---------------------+-------------+------------+-------------+----------+
    | time                | station     | visibility | temperature | pressure |
    +---------------------+-------------+------------+-------------+----------+
    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
    +---------------------+-------------+------------+-------------+----------+

### ALL/DISTINCT

**Syntax**
```sql
SELECT [ ALL | DISTINCT ] select_expression [, ...];
```
After the keyword `SELECT`, you can use `DISTINCT` to remove duplicate fields and return only the values after duplicate removal. Using ALL returns all duplicate values in the field. When this option is not specified, the default value is `ALL`.

**Example**

```sql
SELECT DISTINCT station, visibility FROM air;
```

    +-------------+------------+
    | station     | visibility |
    +-------------+------------+
    | XiaoMaiDao  | 56         |
    | XiaoMaiDao  | 50         |
    | XiaoMaiDao  | 67         |
    | XiaoMaiDao  | 65         |
    | XiaoMaiDao  | 53         |
    | XiaoMaiDao  | 74         |
    | XiaoMaiDao  | 71         |
    | LianYunGang | 78         |
    | LianYunGang | 79         |
    | LianYunGang | 59         |
    | LianYunGang | 67         |
    | LianYunGang | 80         |
    +-------------+------------+

```sql
SELECT station, visibility FROM air;
```

    +-------------+------------+
    | station     | visibility |
    +-------------+------------+
    | XiaoMaiDao  | 56         |
    | XiaoMaiDao  | 50         |
    | XiaoMaiDao  | 67         |
    | XiaoMaiDao  | 65         |
    | XiaoMaiDao  | 53         |
    | XiaoMaiDao  | 74         |
    | XiaoMaiDao  | 71         |
    | LianYunGang | 78         |
    | LianYunGang | 79         |
    | LianYunGang | 59         |
    | LianYunGang | 67         |
    | LianYunGang | 80         |
    | LianYunGang | 59         |
    +-------------+------------+


## Alias

You can use the keyword `AS` to alias a column expression or table.

### Alias Column Expression

**Syntax**

```sql
expression [ [ AS ] column_alias ]
```

**Example**

```sql
SELECT station s, visibility AS v FROM air;
```
    +-------------+----+
    | s           | v  |
    +-------------+----+
    | XiaoMaiDao  | 56 |
    | XiaoMaiDao  | 50 |
    | XiaoMaiDao  | 67 |
    | XiaoMaiDao  | 65 |
    | XiaoMaiDao  | 53 |
    | XiaoMaiDao  | 74 |
    | XiaoMaiDao  | 71 |
    | LianYunGang | 78 |
    | LianYunGang | 79 |
    | LianYunGang | 59 |
    | LianYunGang | 67 |
    | LianYunGang | 80 |
    | LianYunGang | 59 |
    +-------------+----+

### Alias Table

You can also use the keyword AS to alias the table.

**Syntax**

```sql
FROM tb_name [AS] alias_name
```

**Example**

```sql
SELECT a.visibility, s.temperature
FROM air AS a JOIN sea s ON a.temperature = s.temperature limit 10;
```

    +------------+-------------+
    | visibility | temperature |
    +------------+-------------+
    | 67         | 62          |
    | 50         | 78          |
    | 50         | 78          |
    | 65         | 79          |
    +------------+-------------+

### SELECT Limitation

- If the SELECT clause contains only the Tag column, it is equivalent to the SELECT DISTINCT Tag column.
  
  **Example**

  ```sql
  -- station is a Tag column,temperature is a Field column.
  SELECT station, temperature FROM air;
  ```
  
      +-------------+-------------+
      | station     | temperature |
      +-------------+-------------+
      | XiaoMaiDao  | 69          |
      | XiaoMaiDao  | 78          |
      | XiaoMaiDao  | 62          |
      | XiaoMaiDao  | 79          |
      | XiaoMaiDao  | 53          |
      | XiaoMaiDao  | 72          |
      | XiaoMaiDao  | 71          |
      | LianYunGang | 69          |
      | LianYunGang | 80          |
      | LianYunGang | 74          |
      | LianYunGang | 70          |
      | LianYunGang | 70          |
      | LianYunGang | 70          |
      +-------------+-------------+

  ```sql
  -- station is a Tag column
  SELECT station FROM air;
  ``` 
  
      +-------------+
      | station     |
      +-------------+
      | XiaoMaiDao  |
      | LianYunGang |
      +-------------+ 

##  LIMIT Clause

**Syntax**

```sql
LIMIT n
```
Limit the number of rows returned from the result set to n, and n must be non-negative.

**Example**

```sql
SELECT *
FROM air LIMIT 10;
```

    +---------------------+-------------+------------+-------------+----------+
    | time                | station     | visibility | temperature | pressure |
    +---------------------+-------------+------------+-------------+----------+
    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
    +---------------------+-------------+------------+-------------+----------+

## **OFFSET Clause**

**Syntax**

```sql
OFFSET m
```

The returned result set skips m records. default m=0.

**Example**

```sql
SELECT *
FROM air OFFSET 10;
```

    +---------------------+-------------+------------+-------------+----------+
    | time                | station     | visibility | temperature | pressure |
    +---------------------+-------------+------------+-------------+----------+
    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
    +---------------------+-------------+------------+-------------+----------+

`OFFSET` can be used with the `LIMIT` statement to specify the number of lines to skip. The format is `LIMIT n OFFSET m`, or it can be abbreviated as LIMIT n, m. LIMIT n controls the output of n rows of data, and OFFSET m indicates the number of rows skipped before starting to return data. OFFSET 0 has the same effect as omitting the OFFSET clause.

**Example**

```sql
SELECT *
FROM air LIMIT 3 OFFSET 3;
```

    +---------------------+------------+------------+-------------+----------+
    | time                | station    | visibility | temperature | pressure |
    +---------------------+------------+------------+-------------+----------+
    | 2022-01-28 13:30:00 | XiaoMaiDao | 65         | 79          | 77       |
    | 2022-01-28 13:33:00 | XiaoMaiDao | 53         | 53          | 68       |
    | 2022-01-28 13:36:00 | XiaoMaiDao | 74         | 72          | 68       |
    +---------------------+------------+------------+-------------+----------+

## **WITH Clause**

**Syntax**

```sql
WITH cte AS cte_query_definiton [, ...] query
```

Optional. The WITH clause contains one or more commonly used expressions CTE (Common Table Expression). CTE acts as a temporary table in the current running environment, which you can refer to in subsequent queries.The rules for using CTE are as follows:
- CTE in the same WITH clause must have a unique name.
- The CTE defined in the WITH clause can only be used for other CTEs in the same WITH clause defined later. Suppose A is the first CTE in the clause and B is the second CTE in the clause:

**Example**

```sql
SELECT station, avg 
FROM (  SELECT station, AVG(visibility) AS avg 
        FROM air 
        GROUP BY station) AS x;
```

    +-------------+--------------------+
    | station     | avg                |
    +-------------+--------------------+
    | XiaoMaiDao  | 62.285714285714285 |
    | LianYunGang | 70.33333333333333  |
    +-------------+--------------------+

```sql
WITH x AS 
    (SELECT station, AVG(visibility) AS avg FROM air GROUP BY station)
SELECT station, avg
FROM x;
```

    +-------------+--------------------+
    | station     | avg                |
    +-------------+--------------------+
    | XiaoMaiDao  | 62.285714285714285 |
    | LianYunGang | 70.33333333333333  |
    +-------------+--------------------+


## **UNION Clause**

The UNION clause is used to combine the analysis results of multiple SELECT statements.

**Syntax**

```
select_clause_set_left
[ UNION | UNION ALL| EXCEPT | INTERSECT]
select_clause_set_right
[sort_list_columns] [limit_clause]
```

`UNION` will de-duplicate the merged result set.
`UNION ALL` will retain the same data in the merged result set.
`EXCEPT` will make the difference between the two result sets, return all non-duplicate values not found in the right query from the left query.
`INTERSECT` returns the intersection of the two result sets (that means, all non-duplicate values are returned by both queries).

**Note**

Each SELECT clause in the UNION must have the same number of columns, and the corresponding columns have the same data type.

**Examples**

- **UNION ALL**
  ```sql
  SELECT visibility FROM air WHERE temperature < 60
  UNION ALL
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```
  
      +------------+
      | visibility |
      +------------+
      | 53         |
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 53         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      +------------+

- **UNION**

  ```sql
  SELECT visibility FROM air WHERE temperature < 60
  UNION
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```
  
      +------------+
      | visibility |
      +------------+
      | 53         |
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      | 59         |
      +------------+

- **EXCEPT**

  ```sql
  SELECT visibility FROM air
  EXCEPT
  SELECT visibility FROM air WHERE temperature < 50 LIMIT 10;
  ```
  
      +------------+
      | visibility |
      +------------+
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 53         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      | 59         |
      +------------+

- **INTERSECT**

  ```sql
  SELECT visibility FROM air
  INTERSECT
  SELECT visibility FROM air WHERE temperature > 50 LIMIT 10;
  ```
  
      +------------+
      | visibility |
      +------------+
      | 56         |
      | 50         |
      | 67         |
      | 65         |
      | 53         |
      | 74         |
      | 71         |
      | 78         |
      | 79         |
      | 59         |
      +------------+

## ORDER BY Clause

Sort the results by the referenced expression. Ascending (ASC) is used by default. Sort in descending order by adding DESC after the expression of ORDER BY.

**Example**

```sql
SELECT * FROM air ORDER BY temperature;
```

    +---------------------+-------------+------------+-------------+----------+
    | time                | station     | visibility | temperature | pressure |
    +---------------------+-------------+------------+-------------+----------+
    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
    +---------------------+-------------+------------+-------------+----------+

```sql
SELECT * FROM air ORDER BY temperature DESC;
```

    +---------------------+-------------+------------+-------------+----------+
    | time                | station     | visibility | temperature | pressure |
    +---------------------+-------------+------------+-------------+----------+
    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
    +---------------------+-------------+------------+-------------+----------+

```sql
SELECT * FROM air ORDER BY station, temperature;
```

    +---------------------+-------------+------------+-------------+----------+
    | time                | station     | visibility | temperature | pressure |
    +---------------------+-------------+------------+-------------+----------+
    | 2022-01-28 13:21:00 | LianYunGang | 78         | 69          | 71       |
    | 2022-01-28 13:30:00 | LianYunGang | 67         | 70          | 72       |
    | 2022-01-28 13:33:00 | LianYunGang | 80         | 70          | 68       |
    | 2022-01-28 13:36:00 | LianYunGang | 59         | 70          | 54       |
    | 2022-01-28 13:27:00 | LianYunGang | 59         | 74          | 59       |
    | 2022-01-28 13:24:00 | LianYunGang | 79         | 80          | 51       |
    | 2022-01-28 13:33:00 | XiaoMaiDao  | 53         | 53          | 68       |
    | 2022-01-28 13:27:00 | XiaoMaiDao  | 67         | 62          | 59       |
    | 2022-01-28 13:21:00 | XiaoMaiDao  | 56         | 69          | 77       |
    | 2022-01-28 13:39:00 | XiaoMaiDao  | 71         | 71          | 80       |
    | 2022-01-28 13:36:00 | XiaoMaiDao  | 74         | 72          | 68       |
    | 2022-01-28 13:24:00 | XiaoMaiDao  | 50         | 78          | 66       |
    | 2022-01-28 13:30:00 | XiaoMaiDao  | 65         | 79          | 77       |
    +---------------------+-------------+------------+-------------+----------+

## **IN**

The IN operator allows you to specify multiple values in the WHERE clause.

**Example**

```sql
SELECT station, temperature, visibility FROM air WHERE temperature  IN (68, 69);
```

    +-------------+-------------+------------+
    | station     | temperature | visibility |
    +-------------+-------------+------------+
    | XiaoMaiDao  | 69          | 56         |
    | LianYunGang | 69          | 78         |
    +-------------+-------------+------------+

**Note**

The IN list does not support expressions currently, but only constants.


## **SHOW**

**Syntax**

```sql
SHOW {DATABASES | TABLES}
```
Show all databases or all tables.

**Example**

```sql
SHOW DATABASES;
```

    +----------+
    | Database |
    +----------+
    | public   |
    +----------+

```sql
SHOW TABLES;
```

    +-------+
    | Table |
    +-------+
    | sea   |
    | air   |
    | wind  |
    +-------+

## **EXPLAIN**

**Syntax**

```sql
EXPLAIN [ ANALYZE ] [ VERBOSE ] <statement>;
```
**Explanation**

`EXPLAIN` is only used to display the execution plan of a query, and does not execute the query.

`EXPLAIN ANALYZE` executes the query and displays the execution plan of the query.

`EXPLAIN ANALYZE VERBOSE` executes the query and displays a more detailed execution plan, including the number of rows read.

**Example**

```sql
EXPLAIN SELECT station, temperature, visibility FROM air;
```

    +---------------+-----------------------------------------------------------------------------------------------------------------------------+
    | plan_type     | plan                                                                                                                        |
    +---------------+-----------------------------------------------------------------------------------------------------------------------------+
    | logical_plan  | Projection: #air.station, #air.temperature, #air.visibility                                                                 |
    |               |   TableScan: air projection=[station, visibility, temperature]                                                              |
    | physical_plan | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility]                       |
    |               |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature] |
    |               |                                                                                                                             |
    +---------------+-----------------------------------------------------------------------------------------------------------------------------+

```sql
EXPLAIN ANALYZE SELECT station, temperature, visibility FROM air;
```

    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | plan_type         | plan                                                                                                                                                                                                                                                                                                                                    |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Plan with Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=20.375µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                   |
    |                   |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=15.929624ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_series_scan=1.698791ms, elapsed_point_to_record_batch=4.572954ms, elapsed_field_scan=5.119076ms] |
    |                   |                                                                                                                                                                                                                                                                                                                                         |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

```sql
EXPLAIN ANALYZE SELECT station, temperature, visibility FROM air;
```

    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | plan_type         | plan                                                                                                                                                                                                                                                                                                                                    |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Plan with Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=20.375µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                   |
    |                   |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=15.929624ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_series_scan=1.698791ms, elapsed_point_to_record_batch=4.572954ms, elapsed_field_scan=5.119076ms] |
    |                   |                                                                                                                                                                                                                                                                                                                                         |
    +-------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

```sql
EXPLAIN ANALYZE VERBOSE SELECT station, temperature, visibility FROM air;
```

    +------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | plan_type              | plan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
    +------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
    | Plan with Metrics      | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[output_rows=13, elapsed_compute=26.75µs, spill_count=0, spilled_bytes=0, mem_used=0]                                                                                                                                                                                                                                                                                                                                                                    |
    |                        |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[output_rows=13, elapsed_compute=13.225875ms, spill_count=0, spilled_bytes=0, mem_used=0, elapsed_point_to_record_batch=3.918163ms, elapsed_field_scan=3.992161ms, elapsed_series_scan=1.657416ms]                                                                                                                                                                                                                                 |
    |                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
    | Plan with Full Metrics | ProjectionExec: expr=[station@0 as station, temperature@2 as temperature, visibility@1 as visibility], metrics=[start_timestamp{partition=0}=2022-10-25 03:00:14.865034 UTC, end_timestamp{partition=0}=2022-10-25 03:00:14.879596 UTC, elapsed_compute{partition=0}=26.75µs, spill_count{partition=0}=0, spilled_bytes{partition=0}=0, mem_used{partition=0}=0, output_rows{partition=0}=13]                                                                                                                                                                           |
    |                        |   TskvExec: limit=None, predicate=ColumnDomains { column_to_domain: Some({}) }, projection=[station,visibility,temperature], metrics=[start_timestamp{partition=0}=2022-10-25 03:00:14.864225 UTC, end_timestamp{partition=0}=2022-10-25 03:00:14.879596 UTC, elapsed_compute{partition=0}=13.225875ms, spill_count{partition=0}=0, spilled_bytes{partition=0}=0, mem_used{partition=0}=0, output_rows{partition=0}=13, elapsed_point_to_record_batch{partition=0}=3.918163ms, elapsed_field_scan{partition=0}=3.992161ms, elapsed_series_scan{partition=0}=1.657416ms] |
    |                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
    | Output Rows            | 13                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
    | Duration               | 13.307708ms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
    +------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

## **DESCRIBE**

**Syntax**

```sql
DESCRIBE {DATABASE db_name | TABLE tb_name};
```

Describe the parameters of the database and the pattern of the table.

**Example**

```sql
DESCRIBE TABLE air;
```

    +-------------+-----------+-------+-------------+
    | FIELDNAME   | TYPE      | ISTAG | COMPRESSION |
    +-------------+-----------+-------+-------------+
    | time        | TIMESTAMP | false | Default     |
    | station     | STRING    | true  | Default     |
    | visibility  | DOUBLE    | false | Default     |
    | temperature | DOUBLE    | false | Default     |
    | pressure    | DOUBLE    | false | Default     |
    +-------------+-----------+-------+-------------+

```sql
DESCRIBE DATABASE public;
```

    +----------+-------+----------------+---------+-----------+
    | TTL      | SHARD | VNODE_DURATION | REPLICA | PRECISION |
    +----------+-------+----------------+---------+-----------+
    | 365 Days | 1     | 365 Days       | 1       | NS        |
    +----------+-------+----------------+---------+-----------+

[//]: # (## **EXISTS**)
[//]: # (EXISTS 条件测试子查询中是否存在行，并在子查询返回至少一个行时返回 true。如果指定 NOT，此条件将在子查询未返回任何行时返回 true。)
[//]: # (示例:)
[//]: # (```sql)
[//]: # (SELECT id  FROM date)
[//]: # (WHERE EXISTS &#40;SELECT 1 FROM shop)
[//]: # (WHERE date.id = shop.id&#41;)
[//]: # (ORDER BY id;)
[//]: # (```)
[//]: # (# **DCL &#40;无&#41;**)
[//]: # (```sql)
[//]: # (DESCRIBE table_name)
[//]: # (```)
[//]: # (TODO SHOW)
[//]: # (# **SHOW**)
[//]: # (## **SHOW VARIABLE**)
[//]: # (```sql)
[//]: # (-- only support show tables)
[//]: # (-- SHOW TABLES is not supported unless information_schema is enabled)
[//]: # (SHOW TABLES)
[//]: # (```)
[//]: # (## **SHOW COLUMNS**)
[//]: # ()
[//]: # (```sql)
[//]: # (-- SHOW COLUMNS with WHERE or LIKE is not supported)
[//]: # (-- SHOW COLUMNS is not supported unless information_schema is enabled)
[//]: # (-- treat both FULL and EXTENDED as the same)
[//]: # (SHOW [ EXTENDED ] [ FULL ])
[//]: # ({ COLUMNS | FIELDS })
[//]: # ({ FROM | IN })
[//]: # (table_name)
[//]: # (```)
[//]: # (## **SHOW CREATE TABLE**)
[//]: # (```sql)
[//]: # (SHOW CREATE TABLE table_name)
[//]: # (```)
