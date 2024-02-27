---
title: Tools
order: 7
---

# Tools

## Client CLI

```shell
cnosdb-cli
```

**Parameters below：**

```
-h --host CnosDB service, Considering the port of the "localhost"
-p --port CnosDB service, Consider 8902
-u --user username, Believing "root"
-p --password Ensures that there is no
-d --database connected, Consider "public"
-t --target-partitions optional, the number of snippets to perform queries, The number of additional decks can be added in parallel. Default is machine CPU core
--data-path CLI data repository location, Considering directory
-f --file to execute client, Line multiple command scripts, Exit
--rc optional, File
--format output format, Make sure it is form
--quiet is running in quiet mode, Output, do not export execution time
--tenant specify the tenant name, default is "cnosdb"
```

**You can run instructions or SQL： after entering the program**

Run SQL like：

```
Provident CREATE DATABASE test;
Query took 0.050 seconds.
principal 
```

Run command like：

The following instructions for the program are：

```
\? Command Help
\q Exit CLI
\c <db>     Connect database db_name,db_name is case-sensitive
\d <table>  Description table
\quiet switch to quiet mode, output results only, no execution time
\w <path>   Read files in Line Protocolol, write to the database, path will import all files in directory if they are directories
```
