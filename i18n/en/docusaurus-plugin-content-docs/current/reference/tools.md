---
title: Tools
order: 7
---

# Tools

## Client Command Line Program

The following command can be used to start the client command line program.

```shell
cnosdb-cli <options>
```

### Program Parameters

```txt
-h, --host <STRING>         连接 CnosDB 的 host，默认为 'localhost'
-P, --port <NUMBER>         连接 CnosDB 的端口，默认为 8902
-u, --user <STRING>         用户名，默认为 'root'
-p, --password <STRING>     密码，默认为空
-d, --database <STRING>     连接的数据库，默认为 'public'
-t, --tenant <STRING>       租户，默认为 'cnosdb'
    --precision <PRECISION> 可选，写入数据的时间精度，所有可选值为 'ns'，'us'，'ms'，如果为空 CnosDB 会以 'ns' 替代
    --target-partitions <NUMBER>
                            可选，执行查询的分片数，增加分片数可以增加并发，如果为空 CnosDB 会以 CPU 核数替代
-s, --stream-trigger-interval <INTERVAL>
                            可选，Micro-Batch 的传输间隔。可选值为 'once'，或时间段，如 '1m'，'10s'，'1m10s' 等
    --data-path             指定一个目录，作为 cnosdb-cli 程序的数据存放位置，默认为执行程序的目录
-f, --file [<PATH> ...]      可选，指定一个脚本文件。程序启动后，执行脚本并退出。可多次使用来指定多个脚本文件，依次执行
    --rc [<PATH> ...]       指定一个脚本文件，默认为 '~/.cnosdbrc'。程序启动后首先执行该脚本。可多次使用来指定多个脚本文件，依次执行
    --format <FORMAT>       输出查询结果的格式，可选值为 'csv'，'tsv'，'table'，'json'，'nd-json'，默认为 'table'
-q, --quiet                 是否以安静模式运行，只输出结果，不输出执行时间，默认为 false
-w, --write-line-protocol <PATH>
                            可选，指定一个存储 line-protocol 格式文件的路径，将文件导入到 CnosDB，若路径为目录，则导入路径下的所有文件。
    --ssl                   是否使用 HTTPS 连接访问 CnosDB，默认为 false
    --unsafe-ssl            是否允许不安全的 HTTPS 连接，默认为 false
    --cacert <PATH>         可选，指定一个 PEM 格式的证书文件，用来校验 HTTPS 连接。可多次使用来指定多个证书文件
    --chunked               是否使用分段传输来下载查询结果，默认为 false
-h, --help                  查看帮助
-V, --version               查看版本
```

### Use Instructions

Reference to [程序参数](#program parameter) if you need a detailed knowledge of the launch command.

```sh
# Start CnosDB client command line with default parameter
cnosdb-cli

# Launch CnosDB client command line program and connect to 192.168.1.2:8912, Ten_beta
cnosdb-cli --host 192.168.1. --port 8912 --tenant ten_beta

# Start the CnosDB client command line program and import the file./data_202220808 CnosDB
cnosdb-cli --write-line-protocol./data_202220808
```

The program will run in interactive mode on startup. You can enter SQL or command, then press Enter to execute it.

Example of SQL：

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

Some quick instructions： can also be used in the program

```txt
\? View command help
\h view statement help
\q quit cnosdb-cli program
\c <database>       Connect database <database>, when statement 'USE <database>;
\d show all tables under the database, equivalent to 'SHOW TABLES;
\d <table>          Description table <table>, equivalent to statement 'DESCRIBE TABLE <table>;
\quiet [true|false] toggle quiet mode, only output results in quiet mode, not output execution time
\w <path>           read files in line-protocol format, import database, path will read all files in directory if they are directories
```

Example of directive：

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

Used to view file content, check and fix files.

```sh
cnosdb-tool <options> <COMMAND>
```

### Main features

Brief description of the three subcommands of the file repair tool `inspect`, `check`, `edit`, and the global parameters of the corresponding subcommand.For a description of the file format, please see：[支持的文件格式](#Supported file format).

#### View File Content

Print details of a file, or of all files in a directory.

```sh
cnosdb-tool inject [OPTIONS] <COMMAND>
```

Global parameter：

- \`\`-format <FORMAT>- Output format, optional value：`csv`,`json`,`table`,`parquet`,default value：`json`, generally using JSON to get the file to fix the file to be used by the subcommand `cnosdb-tool reply`, using TABLE to get the format more suitable for viewing in the command line.
- \--time-format \<TIME_FORMAT>- Time format, optional value：`timestamp`, `rfc3339`, default is：`timestamp`.

Supported File Format：

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tomstone)
- [TSM](#tsm)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

#### Check File

Check a file to export a possible error.

```sh
cnosdb-tool check [FILE_TYPE] [OPTIONS] [PATH]
```

Global parameter：

- `<PATH>` - File path.

Supported File Format：

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tomstone)
- [TSM](#tsm)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

#### Fix files

Fix a file automatically or manually.

```sh
cnosdb-tool repair [FILE_TYPE] <SUB-COMMAND>
```

Supported File Format：

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tomstone)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

##### Fix specified files

Delete or modify the content of the file.

```sh
cnosdb-tool repair [FILE_TYPE] edit [OPTIONS] <PATH>
```

Global parameter：

- `<PATH>` - File path to fix.
- `--from-pos <NUMBER>` - Start position of the block to be modified
- \--to-pos <NUMBER>\` - the end of the block to be modified.
- `--delete` - Remove blocks instead of replacing the contents of the block.
- `--input <FILE>` - a file used to replace the contents of the block, JSON format, which is usually obtained by viewing the subcommand `cnosdb-tool inspit-format json`, or `cnosdb-tool repair demo` subcommand.
- `--out-dir <DIR>` - the directory used to store repaired files by default is the same as the file that was repaired.

##### Get sample file content JSON

```sh
cnosdb-tool repair [FILE_TYPE] demo
```

### Supported File Format

#### Summary

Summary file format **RecordFile** is used to store metadata from storage engine.

##### View File Content

View Summary File Content in Log:

```
cnosdb-tool inject summary-log [OPTIONS] <PATH>
```

- `<PATH>` - File path.
- `--from` - the starting block number.
- `-to` - end block number.
- `-tenant` - Press Tenant to filter data blocks.
- `-db` - Filter data blocks by Database.
- `--vnode` - Press Vnode to filter data blocks.
- `--tsm-id` - Filter blocks by TSM file number.

Example:

```sh
# Output a summary of log content
cnosdb-tool input from 5 to 10

# of a summary file for output of a summary file. Database cnosdb. blic corresponding log content
cnosdb-tool input summary-log --tenant cnosdb --db public
```

View Summary File Content in Final State:

```
cnosdb-tool inspires summary-final [OPTIONS] <PATH>
```

- `<PATH>` - File path.
- `--db-data-path` - path to the data file, default to `<PATH>/../db/data/`.
- `-tenant` - Press Tenant to filter data.
- `-db` - Filter data by Database.
- `--vnode` - Press Vnode to filter data.

Examples:

```sh
# Output CnosDB instance, database cnosdb.public all data files
cnosdb-tool input summary-final --tenant cnosdb --db public
```

##### Check File

```sh
cnosdb-tool check summary [OPTIONS] <PATH>
```

##### Fix files

```sh
cnosdb-tool Repair summary edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - the starting value of the block serial number to be modified.
- `--to <NUMBER>` - the end of the serial number of the block to be modified.
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}`。

Examples:

```sh
# 删除一个 Summary 文件内第 5、第 6 个数据块
cnosdb-tool repair summary edit <PATH> --delete --from 5 --to 6

# 将一个 Summary 文件内第第 5、第 6 个数据块的内容替换为指定文件的内容，输出至 summary.bak 文件
cnosdb-tool repair summary edit <PATH> --from 5 --to 6 --input <PATH> --output summary.bak
```

#### WAL

WAL files are in the format of **RecordFile**, used to store storage for writing requests such as WriteRequest, DropTableRequest, etc. Each **Record** contains a global incremental serial number.

##### View File Content

```
cnosdb-tool inspit wal [OPTIONS] <PATH>
```

- `<PATH>` - File path.
- `--from` - the starting block number.
- `-to` - end block number.
- `--from-seq <NUMBER>` - the starting global serial number of the block.
- \--to-seq <NUMBER>\` - End of the global serial number.
- \`\`-action <ACTION>- Filter blocks by type, optional values are: `write`,`delete`,`delete-vnode`,`delete-table`,`update-series-keys`.
- `-tenant <STRING>` - Press Tenant to filter data blocks.
- `--db <STRING>` - Filter blocks by database database.
- `--vnode <NUMBER>` - Press Vnode to filter data blocks.
- \`-table <STRING>- Press Table to filter data blocks.

Examples:

```sh
# Export the contents of a WAL file, 5 to 10 blocks of data
cnosdb-tool Inspit wal — from 5 --to 10

# Output a WAL file, Content of blocks with a local serial number from 1000 to 1024
cnosdb-tool inspit wal --from-seq 1000 --to-seq
```

##### Check File

```sh
cnosdb-tool check wal [OPTIONS] <PATH>
```

##### Fix files

```sh
cnosdb-tool repair real edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - the starting value of the block serial number to be modified.
- `--to <NUMBER>` - the end of the serial number of the block to be modified.
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.wal`

Examples:

```sh
# Delete the 5 and 6 blocks of the WAL file
cnosdb-tool repair real edit <PATH> --delete --delete --from 5 --to 6

# replace the contents of blocks 5 and 6 of an WAL file with the contents of the specified file, Outgoing to wal. ak File
cnosdb-tool Repair real edit <PATH> — from 5 --to 6 --input <PATH> --output wal.bak
```

#### Tombstone

The Tombstone file is in the format of **RecordFile**, where delete markers are stored.

##### View File Content

```
cnosdb-tool Inspit tombstone [OPTIONS] <PATH>
```

- `<PATH>` - File path.
- `--from` - the starting block number.
- `-to` - end block number.

Examples:

```sh
# Output the contents of a Tombstone file, from 5 to 10 blocks
cnosdb-tool Inspit stone --from 5 --to 10
```

##### Check File

```sh
cnosdb-tool check tombstone [OPTIONS] <PATH>
```

##### Fix files

```sh
cnosdb-tool repair tombstone edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - the starting value of the block serial number to be modified.
- `-to <NUMBER>` - End value with the changed data block number.
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.tombstone`

Examples:

```sh
# Deletes the 5 and 6 blocks
cnosdb-tool repair tombstone edit <PATH> --delete --delete ---from 5 --to 6

# Replace the contents of the 5 and 6 blocks in a Tomstone file with the content of the specified file, Outgoing to tombstone. ak File
cnosdb-tool replyir tombstone edit <PATH> — from 5 --to 6 --input <PATH> --output tombstone.bak
```

#### TSM

TSM files store time series data.

##### View File Content

```sh
cnosdb-tool inject tsm [OPTIONS] <PATH>
```

- `--tomstone` - also print the contents of tombstone
- \--level` - level of output, optional value is：`fields`,`block`, default value is：`block\`.
- `fields` - output all property information.
- `block` - Output all property information and data blocks.

Examples:

```sh
# Output a TSM file, all data block information
cnosdb-tool inspit tsm --level block <PATH>
```

##### Check File

```sh
cnosdb-tool check tsm [OPTIONS] <PATH>
```

#### Hinted-Handoff

Hinted-handoff file is used for temporary storage of uncorrectly written writing requests.

##### View File Content

```sh
cnosdb-tool inspit hh [OPTIONS] <PATH>
```

Options:

- `<PATH>` - File path.
- `--from` - the starting block number.
- `-to` - end block number.
- `-tenant <STRING>` - Press Tenant to filter data blocks.
- `--vnode <NUMBER>` - Press Vnode to filter data blocks.

Examples:

```sh
# Output the contents of a Hinted-handoff file, blocks 5 to 10 in
cnosdb-tool inspit hh - from 5 - to 10
```

##### Check File

```sh
cnosdb-tool check hh [OPTIONS] <PATH>
```

##### Fix files

```
cnosdb-tool repair hah edit [OPTIONS] <PATH>
```

Options:

- `--from <NUMBER>` - the starting value of the block serial number to be modified.
- `--to <NUMBER>` - the end of the serial number of the block to be modified.
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}`

Examples:

```sh
# Delete the 5 and 6 blocks
cnosdb-tool repair heir edit <PATH> --delete - from 5 --to 6

# Replace the contents of the 5 and 6 blocks in the Hinted-handoff file with the content of the specified file, Outgoing to hh. ak File
cnosdb-tool repair hah edit <PATH> — from 5 --to 6 --input <PATH> --output h.bak
```

#### Series-Binlog

Series binlog file is used to store data models.

##### View File Content

```sh
cnosdb-tool input series-binlog [OPTIONS] <PATH>
```

Options:

- `<PATH>` - File path.
- `--from` - the starting block number.
- `-to` - end block number.
- `-database <STRING>` - Filter blocks by database database.
- \`-table <NUMBER>- Press Table to filter data blocks.

Examples:

```sh
# 输出一个 Series-binlog 文件中，第 5 至第 10 个数据块的内容
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

- `--from <NUMBER>` - the starting value of the block serial number to be modified.
- `--to <NUMBER>` - the end of the serial number of the block to be modified.
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.binlog`

Examples:

```sh
# Delete the 5 and 6 blocks
cnosdb-tool repair series-binlog edit <PATH> --delete - from 5 --to 6

# replace the 5 and 6 blocks in a Series-binlog file with the contents of the specified file, Outgoing to s_log. ak File
cnosdb-tool Repair series-binlog edit <PATH> — from 5 --to 6 --input <PATH> --outputs_log.bak
```
