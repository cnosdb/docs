---
title: Tools
order: 7
---

# Tools

## Client Command Line

The following command can be used to start the client command line program.

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

## File Repair Tool

Used to view file contents, check, repair files.

```sh
cnosdb-tool <options> <COMMAND>
```

### Main Function

Briefly introduce the three subcommands of the file repair tool `inspect`, `check`, `edit`, and the global parameters of the corresponding subcommands. For an explanation of each file format, see: [Supported file formats](#supported-file-formats).Run the following command to start the CLI program in the root directory of CnosDB source code.

#### Inspect file contents

Inspect the details of a file, or all files in a directory.

```sh
cnosdb-tool inspect [OPTIONS] <COMMAND>
```

Global parameters:

- `--format <FORMAT>` - output format. options: `csv`, `json`, `table`, `parquet`, default is: `json`. JSON is used to get the files used by the 'cnosdb-tool repair' subcommand, and TABLE is used to get a format more suitable for viewing on the command line.
- `--time-format <TIME_FORMAT>` -  time foramt. options: `timestamp`, `rfc3339`, default is: `timestamp`.

Supported file formats:

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tombstone)
- [TSM](#tsm)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

#### Check file

Check a file and output the possible errors.

```sh
cnosdb-tool check [FILE_TYPE] [OPTIONS] [PATH]
```

Global parameters:

- `<PATH>` - file path.

Supported file formats:

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tombstone)
- [TSM](#tsm)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

#### Repair file

Repair a file automatically or manually.

```sh
cnosdb-tool repair [FILE_TYPE] <SUB-COMMAND>
```

Supported file formats:

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tombstone)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

##### Repair specific file

Delete or modify the contents of the file.

```sh
cnosdb-tool repair [FILE_TYPE] edit [OPTIONS] <PATH>
```

Global parameters:

- `<PATH>` - file path to be repaired.
- `--from-pos <NUMBER>` - start position of the data block to be modified.
- `--to-pos <NUMBER>` - end position of the data block to be modified.
- `--delete` - delete the data block.
- `--input <FILE>` - The file used to replace the contents of the data block, in JSON format. The file is generally obtained by the file inspection subcommand `cnosdb-tool inspect --format json`, or by the `cnosdb-tool repair demo` subcommand.
- `--out-dir <DIR>` - The directory where the repaired file is saved, the default is the directory of the original file.

##### Get a sample JSON of file contents

```sh
cnosdb-tool repair [FILE_TYPE] demo
```

### Supported file formats

#### Summary

Format of Summary file is **RecordFile**, used to store metadata of storage engine.

##### Inspect file contents

Inspect the contents of the Summary file in the form of logs:

```
cnosdb-tool inspect summary-log [OPTIONS] <PATH>
```

- `<PATH>` - file path.
- `--from` - start position of the data block.
- `--to` - end position of the data block.
- `--tenant` - filter data blocks by Tenant.
- `--db` - filter data blocks by Database.
- `--vnode` - filter data blocks by Vnode.
- `--tsm-id` - filter data blocks by TSM ID.

Client CLI

```sh
# Output the contents of the 5th to 10th data blocks in a Summary file
cnosdb-tool inspect summary-log --from 5 --to 10

# Output the log contents of the cnosdb.public database in a Summary file
cnosdb-tool inspect summary-log --tenant cnosdb --db public
```

Inspect the contents of the Summary file in the form of final state:

```
cnosdb-tool inspect summary-final [OPTIONS] <PATH>
```

- `<PATH>` - file path.
- `--db-data-path` - data file path, the default is: `<PATH>/../db/data/`。
- `--tenant` - filter data by Tenant.
- `--db` - filter data by Database.
- `--vnode` - filter data by Vnode.

Examples:

```sh
# Output cnosdb instance, database cnosdb.public all data files
cnosdb-tool inspect summary-final --tenant cnosdb --db public
```

##### Check file

```sh
cnosdb-tool check summary [OPTIONS] <PATH>
```

##### Repair file

```sh
cnosdb-tool repair summary edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - the start value of the data block sequence number to be modified.
- `--to <NUMBER>` - the end value of the data block sequence number to be modified.
- `--out` - output path of the modified file, default is: `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.hh`

Examples:

```sh
# Delete the 5th and 6th data blocks in a Summary file
cnosdb-tool repair summary edit <PATH> --delete --from 5 --to 6

# Replace the contents of the 5th and 6th data blocks in a Summary file with the contents of the specified file, and output to the summary.bak file
cnosdb-tool repair summary edit <PATH> --from 5 --to 6 --input <PATH> --output summary.bak
```

#### WAL

The format of WAL file is **RecordFile**, used to store write requests caused by storage engine, such as WriteRequest, DropTableRequest, etc. Each **Record** contains a globally increasing sequence number.

##### Inspect file contents

```
cnosdb-tool inspect wal [OPTIONS] <PATH>
```

- `<PATH>` - file path.
- `--from` - start position of the data block.
- `--to` - end position of the data block.
- `--from-seq <NUMBER>` - start global sequence number of the data block.
- `--to-seq <NUMBER>` - end global sequence number of the data block.
- `--action <ACTION>` - filter data by action, options: `write`，`delete`，`delete-vnode`，`delete-table`，`update-series-keys`。
- `--tenant <STRING>` - filter data blocks by Tenant.
- `--db <STRING>` - filter data by Database.
- `--vnode <NUMBER>` - filter data blocks by Vnode.
- `--table <STRING>` - filter data by Table.

Examples:

```sh
# Output the contents of the 5th to 10th data blocks in a WAL file
cnosdb-tool inspect wal --from 5 --to 10

# Outputs the contents of data blocks with global sequence numbers from 1000 to 1024 in a WAL file
cnosdb-tool inspect wal --from-seq 1000 --to-seq 1024
```

##### Check file

```sh
cnosdb-tool check wal [OPTIONS] <PATH>
```

##### Repair file

```sh
cnosdb-tool repair wal edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - the start value of the data block sequence number to be modified.
- `--to <NUMBER>` - the end value of the data block sequence number to be modified.
- `--out` - output path of the modified file, default is: `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.wal`

Examples:

```sh
# Delete the 5th and 6th data blocks in a WAL file
cnosdb-tool repair wal edit <PATH> --delete --from 5 --to 6

# Replace the contents of the 5th and 6th data blocks in a WAL file with the contents of the specified file, and output to the wal.bak file
cnosdb-tool repair wal edit <PATH> --from 5 --to 6 --input <PATH> --output wal.bak
```

#### Tombstone

The format of Tombstone file is **RecordFile**, used to store delete marks.

##### Inspect file contents

```
cnosdb-tool inspect tombstone [OPTIONS] <PATH>
```

- `<PATH>` - file path.
- `--from` - start position of the data block.
- `--to` - end position of the data block.

Examples:

```sh
# Output the contents of the 5th to 10th data blocks in a Tombstone file
cnosdb-tool inspect tombstone --from 5 --to 10
```

##### Check file

```sh
cnosdb-tool check tombstone [OPTIONS] <PATH>
```

##### Repair file

```sh
cnosdb-tool repair tombstone edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - the start value of the data block sequence number to be modified.
- `--to <NUMBER>` - the end value of the data block sequence number to be modified.
- `--out` - output path of the modified file, default is: `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.tombstone`

Examples:

```sh
# Delete the 5th and 6th data blocks in a Tombstone file
cnosdb-tool repair tombstone edit <PATH> --delete --from 5 --to 6

# Replace the contents of the 5th and 6th data blocks in a Tombstone file with the contents of the specified file, and output to the tombstone.bak file
cnosdb-tool repair tombstone edit <PATH> --from 5 --to 6 --input <PATH> --output tombstone.bak
```

#### TSM

TSM file stores time series data.

##### Inspect file contents

```sh
cnosdb-tool inspect tsm [OPTIONS] <PATH>
```

- `--tombstone` - whether to output the contents of the Tombstone file.
- `--level` - output level, options: `fields`, `block`。
  - `fields` - output all field information.
  - `block` - output all data block information.

Examples:

```sh
# Output all the data block information in a TSM file
cnosdb-tool inspect tsm --level block <PATH>
```

##### Check file

```sh
cnosdb-tool check tsm [OPTIONS] <PATH>
```

#### Hinted-Handoff

Hinted-handoff file is used to temporarily store write requests that cannot be written correctly.

##### Inspect file contents

```sh
cnosdb-tool inspect hh [OPTIONS] <PATH>
```

Options:

- `<PATH>` - file path.
- `--from` - start position of the data block.
- `--to` - end position of the data block.
- `--tenant <STRING>` - filter data blocks by Tenant.
- `--vnode <NUMBER>` - filter data blocks by Vnode.

Examples:

```sh
# Output the contents of the 5th to 10th data blocks in a Hinted-handoff file
cnosdb-tool inspect hh --from 5 --to 10
```

##### Check file

```sh
cnosdb-tool check hh [OPTIONS] <PATH>
```

##### Repair file

```
cnosdb-tool repair hh edit [OPTIONS] <PATH>
```

Options:

- `--from <NUMBER>` - the start value of the data block sequence number to be modified.
- `--to <NUMBER>` - the end value of the data block sequence number to be modified.
- `--out` - the save location of the repaired file, the default is: `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.summary`

Examples:

```sh
# Delete the 5th and 6th data blocks in a Hinted-handoff file
cnosdb-tool repair hh edit <PATH> --delete --from 5 --to 6

# Replace the contents of the 5th and 6th data blocks in a Hinted-handoff file with the contents of the specified file, and output to the hh.bak file
cnosdb-tool repair hh edit <PATH> --from 5 --to 6 --input <PATH> --output hh.bak
```

#### Series-Binlog

Series binlog files are used to store data models.

##### Inspect file contents

```sh
cnosdb-tool inspect series-binlog [OPTIONS] <PATH>
```

Options:

- `<PATH>` - file path.
- `--from` - start position of the data block.
- `--to` - end position of the data block.
- `--database <STRING>` - filter data blocks by Database.
- `--table <NUMBER>` - filter data blocks by Table.

Examples:

```sh
# Output the contents of the 5th to 10th data blocks in a Series-binlog file
cnosdb-tool inspect series-binlog --from 5 --to 10
```

##### Check

```sh
cnosdb-tool check series-binlog [OPTIONS] <PATH>
```

##### Repair

```
cnosdb-tool repair series-binlog edit [OPTIONS] <PATH>
```

Options:

- `--from <NUMBER>` - the start value of the data block sequence number to be modified.

- `--to <NUMBER>` - the end value of the data block sequence number to be modified.

- `--out` - output path of the modified file, default is: `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.binlog`

Examples:

```sh
# Delete the 5th and 6th data blocks in a Series-binlog file
cnosdb-tool repair series-binlog edit <PATH> --delete --from 5 --to 6

# Replace the contents of the 5th and 6th data blocks in a Series-binlog file with the contents of the specified file, and output to the s_log.bak file
cnosdb-tool repair series-binlog edit <PATH> --from 5 --to 6 --input <PATH> --output s_log.bak
```
