---
title: Tools
order: 7
---

# CnosDB Tools

## Client CLI

Run the following command to start the CLI program in the root directory of CnosDB source code.

```
    cnosdb-cli
```

The parameters of CLI program are as follows:

```
    -h --host CnosDB            Host of the service. The default is "localhost".
    -p --port CnosDB            Port of the service. The default is 8902.
    -u --user                   Username. The default value is "CnosDB".
    -p --password               Password. None by default.
    -d --database               Connected database. The default value is "public".
    -t --target-partitions      Optional; the number of slices to execute the query, increasing which can increase concurrency. Not specified by default.
    --data-path                 Data storage location of CLI program. The default is the directory where the client is executed.
    -f --file                   Optional; it executse multiple command scripts and exits.
    --rc                        Optional; profile.
    --format                    Output format. The default is "Table" format.
    --quiet                     To run in quiet mode, output only the result, not execution time.
    --tenant                    Tenant name. The default value is "cnosdb".
 ```

After entering the program you can run the command or SQL:.

Run an SQL example:

```
    ❯ CREATE DATABASE test;
    Query took 0.050 seconds.
    ❯
```

Run a command example:

The commands for the program are as follows:
```
    \?          Command Help
    \q          Exit CLI
    \c <db>     Connect the database "db_name", db_name is case sensitive
    \d <table>  Describe the table "table"
    \quiet      Switch to quiet mode, output only the result, not execution time
    \w <path>   Read a file in Line Protocol format and write it to the database, if path is a directory, all files in the directory will be written to the database
 ```