---
title: Tools
order: 7
---

# CnosDB Tools

## Client CLI

Run the following command to start the CLI program in the root directory of CnosDB source code.

```shell
    cnosdb-cli <options>
```

### Program Parameters

```txt
-h, --host <STRING>         The host of CnosDB, default is 'localhost'
-P, --port <NUMBER>         The port of CnosDB, default is 8902
-u, --user <STRING>         The username, default is 'root'
-p, --password <STRING>     The password, default is empty
-d, --database <STRING>     The database to connect, default is 'public'
-t, --tenant <STRING>       The tenant, default is 'cnosdb'
    --precision <PRECISION> The precision of time to write data, all optional values are 'ns', 'us', 'ms', if empty CnosDB will replace it with 'ns'
    --target-partitions <NUMBER>
                            The number of partitions to execute the query, increasing the number of partitions can increase concurrency, if empty CnosDB will replace it with the number of CPU cores
-s, --stream-trigger-interval <INTERVAL>
                            The interval of Micro-Batch transmission. Optional values are 'once', or time period, such as '1m', '10s', '1m10s', etc.
    --data-path             Specify a directory as the data storage location of the cnosdb-cli program, default is the directory of the executable program
-f, --file [<PATH> ...]     Optional, specify a script file. After the program starts, execute the script and exit. Can be used multiple times to specify multiple script files, execute them in order
    --rc [<PATH> ...]       Specify a script file, default is '~/.cnosdbrc'. After the program starts, execute the script first. Can be used multiple times to specify multiple script files, execute them in order
    --format <FORMAT>       The format of the query result, optional values are 'csv', 'tsv', 'table', 'json', 'nd-json', default is 'table'
-q, --quiet                 Whether to run in quiet mode, only output the result, not the execution time, default is false
-w, --write-line-protocol <PATH>
                            Optional, specify a path to store line-protocol format files, import files into CnosDB, if the path is a directory, all files in the directory will be imported.
    --ssl                   Whether to use HTTPS to connect to CnosDB, default is false
    --unsafe-ssl            Whether to allow insecure HTTPS connections, default is false
    --cacert <PATH>         Optional, specify a PEM format certificate file to verify the HTTPS connection. Can be used multiple times to specify multiple certificate files
    --chunked               Whether to use chunked transfer to download the query result, default is false
-h, --help                  View help
-V, --version               View version
```

### Usage

If you need to know more about the startup command, you can refer to [Program Parameters](#program-parameters).

```sh
# Start the CnosDB client command line program with default parameters
cnosdb-cli

# Start the CnosDB client command line program and connect to 192.168.1.2:8912 with tenant identity ten_beta
cnosdb-cli --host 192.168.1.2 --port 8912 --tenant ten_beta

# Start the CnosDB client command line program and import the file ./data_202220808 into CnosDB
cnosdb-cli --write-line-protocol ./data_202220808
```

After the program starts, it will run in interactive mode.
You can enter SQL or instructions, and then press the Enter key to execute.

Examples of SQL:

```txt
❯ CREATE DATABASE test;
Query took 0.010 seconds.
❯ use test;
test ❯ CREATE TABLE test_table(c1 BIGINT, TAGS(t1));
Query took 0.020 seconds.
test ❯ SHOW TABLES;
+------------+
| TABLE_NAME |
+------------+
| test_table |
+------------+
Query took 0.030 seconds.
test ❯ insert into test_table(time, t1, c1) values(now(), 'a1', 1);
+------+
| rows |
+------+
| 1    |
+------+
Query took 0.040 seconds.
test ❯ select * from test_table;
+----------------------------+----+----+
| time                       | t1 | c1 |
+----------------------------+----+----+
| 2023-04-05T06:07:08.091011 | a1 | 1  |
+----------------------------+----+----+
Query took 0.050 seconds.
```

You can also use some shortcut instructions in the program:

```txt
\?                  View statement help
\h                  View statement help
\q                  Exit the cnosdb-cli program
\c <database>       Connect to the database, equivalent to the statement 'USE <database>;'
\d                  View all tables in the database, equivalent to the statement 'SHOW TABLES;'
\d <table>          Describe the table, equivalent to the statement 'DESCRIBE TABLE <table>;'
\quiet [true|false] Switch quiet mode, in quiet mode, only output the result, not the execution time
\w <path>           Read the file in line-protocol format and import it into the database. If the path is a directory, all files in the directory will be read
```

Examples of Instructions:

```txt
❯ \c test;
test ❯ d
+------------+
| TABLE_NAME |
+------------+
| test_table |
+------------+
Query took 0.010 seconds.
test ❯ \d test_table
+-------------+-----------------------+-------------+-------------------+
| COLUMN_NAME | DATA_TYPE             | COLUMN_TYPE | COMPRESSION_CODEC |
+-------------+-----------------------+-------------+-------------------+
| time        | TIMESTAMP(NANOSECOND) | TIME        | DEFAULT           |
| t1          | STRING                | TAG         | DEFAULT           |
| c1          | BIGINT                | FIELD       | DEFAULT           |
+-------------+-----------------------+-------------+-------------------+
Query took 0.020 seconds.
test ❯ \q
```