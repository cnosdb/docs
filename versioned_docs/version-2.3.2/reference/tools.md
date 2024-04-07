---
title: 工具
order: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 工具

## 客户端命令行程序

可以使用下列命令启动客户端命令行程序。
```shell
cnosdb-cli <options>
```

### 程序参数

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

### 使用说明

如果需要详细了解启动命令，可以参考 [程序参数](#程序参数)。

```sh
# 使用默认参数启动 CnosDB 客户端命令行程序
cnosdb-cli

# 启动 CnosDB 客户端命令行程序，并连接至 192.168.1.2:8912，租户身份为 ten_beta
cnosdb-cli --host 192.168.1.2 --port 8912 --tenant ten_beta

# 启动 CnosDB 客户端命令行程序，将文件 ./data_202220808 导入 CnosDB
cnosdb-cli --write-line-protocol ./data_202220808
```

程序启动后将以交互式模式运行，你可以输入 SQL 或者指令，然后按回车键来执行。

SQL 的例子：

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

在程序中还可以使用一些快捷指令：

```txt
\?                  查看指令帮助
\h                  查看语句帮助
\q                  退出 cnosdb-cli 程序
\c <database>       连接数据库 <database>，相当于语句 'USE <database>;'
\d                  显示数据库下的所有表，相当于语句 'SHOW TABLES;'
\d <table>          描述表 <table>，相当于语句 'DESCRIBE TABLE <table>;'
\quiet [true|false] 切换安静模式，安静模式下只输出结果，不输出执行时间
\w <path>           读取 line-protocol 格式的文件，导入数据库，path 如果是目录，则会读取目录下所有文件
```

指令的例子：

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

<Tabs groupId="editions">
<TabItem value="Community" label="社区版">

</TabItem>

<TabItem value="Enterprise" label="企业版">

## 文件修复工具

用于查看文件内容、检查、修复文件。

```sh
cnosdb-tool <options> <COMMAND>
```

### 主要功能

简要介绍文件修复工具的三个子命令 `inspect`、`check`、`edit`，以及对应子命令的全局参数。针对具体文件格式的说明请查看：[支持的文件格式](#支持的文件格式)。

#### 查看文件内容

打印一个文件、或目录下所有文件的详细内容。

```sh
cnosdb-tool inspect [OPTIONS] <COMMAND>
```

全局参数：

- `--format <FORMAT>` - 输出格式，可选值为：`csv`，`json`，`table`，`parquet`，默认值为：`json`，一般使用 JSON 来获得文件修复子命令 `cnosdb-tool repair` 所要用到的文件，使用 TABLE 来获得更适合在命令行中查看的格式。
- `--time-format <TIME_FORMAT>` -  时间格式，可选值为：`timestamp`，`rfc3339`，默认值为：`timestamp`。

支持的文件格式：

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tombstone)
- [TSM](#tsm)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

#### 检查文件

检查一个文件，输出可能遇到的错误。

```sh
cnosdb-tool check [FILE_TYPE] [OPTIONS] [PATH]
```

全局参数：

- `<PATH>` - 文件路径。

支持的文件格式：

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tombstone)
- [TSM](#tsm)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

#### 修复文件

自动或手动地修复一个文件。

```sh
cnosdb-tool repair [FILE_TYPE] <SUB-COMMAND>
```

支持的文件格式：

- [Summary](#summary)
- [WAL](#wal)
- [Tombstone](#tombstone)
- [Hinted-Handoff](#hinted-handoff)
- [Series-Binlog](#series-binlog)

##### 修复指定文件

删除或修改文件内容。

```sh
cnosdb-tool repair [FILE_TYPE] edit [OPTIONS] <PATH>
```

全局参数：

- `<PATH>` - 待修复的文件路径。
- `--from-pos <NUMBER>` - 待修改的数据块的起始位置
- `--to-pos <NUMBER>` - 待修改的数据块的结束位置。
- `--delete` - 删除数据块，而不是替换数据块的内容。
- `--input <FILE>` - 用于替换数据块内容的文件，JSON 格式，该文件一般通过文件查看子命令 `cnosdb-tool inspect --format json` 来获得，也可以通过 `cnosdb-tool repair demo` 子命令来获得。
- `--out-dir <DIR>` - 用于存放修复后的文件的目录，默认与被修复的文件相同。

##### 获得文件内容 JSON 样例

```sh
cnosdb-tool repair [FILE_TYPE] demo
```

### 支持的文件格式

#### Summary

Summary 文件的格式为 **RecordFile** , 用于存放存储引擎的元数据。

##### 查看文件内容

以日志的形式查看 Summary 文件内容:

```
cnosdb-tool inspect summary-log [OPTIONS] <PATH>
```

- `<PATH>` - 文件路径。
- `--from` - 起始的数据块序号。
- `--to` - 结束的数据块序号。
- `--tenant` - 按 Tenant 过滤数据块。
- `--db` - 按 Database 过滤数据块。
- `--vnode` - 按 Vnode 过滤数据块。
- `--tsm-id` - 按 TSM 文件编号过滤数据块。

示例:

```sh
# 输出一个 Summary 文件中，第 5 至第 10 个数据块的日志内容
cnosdb-tool inspect summary-log --from 5 --to 10

# 输出一个 Summary 文件中，数据库 cnosdb.public 对应的日志内容
cnosdb-tool inspect summary-log --tenant cnosdb --db public
```

以最终状态的形式查看 Summary 文件内容:

```
cnosdb-tool inspect summary-final [OPTIONS] <PATH>
```

- `<PATH>` - 文件路径。
- `--db-data-path` - 数据文件路径，默认情况下为 `<PATH>/../db/data/`。
- `--tenant` - 按 Tenant 过滤数据。
- `--db` - 按 Database 过滤数据。
- `--vnode` - 按 Vnode 过滤数据。

Examples:

```sh
# 输出 CnosDB 实例下，数据库 cnosdb.public 的所有数据文件
cnosdb-tool inspect summary-final --tenant cnosdb --db public
```

##### 检查文件

```sh
cnosdb-tool check summary [OPTIONS] <PATH>
```

##### 修复文件

```sh
cnosdb-tool repair summary edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - 待修改的数据块序号的起始值。
- `--to <NUMBER>` - 待修改的数据块序号的结束值。
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}`。

Examples:

```sh
# 删除一个 Summary 文件内第 5、第 6 个数据块
cnosdb-tool repair summary edit <PATH> --delete --from 5 --to 6

# 将一个 Summary 文件内第第 5、第 6 个数据块的内容替换为指定文件的内容，输出至 summary.bak 文件
cnosdb-tool repair summary edit <PATH> --from 5 --to 6 --input <PATH> --output summary.bak
```

#### WAL

WAL 文件的格式为 **RecordFile**，用于存放存储引起的写入请求，比如 WriteRequest、DropTableRequest 等，每个 **Record** 都包含一个全局递增的序列号。

##### 查看文件内容

```
cnosdb-tool inspect wal [OPTIONS] <PATH>
```

- `<PATH>` - 文件路径。
- `--from` - 起始的数据块序号。
- `--to` - 结束的数据块序号。
- `--from-seq <NUMBER>` - 起始的数据块全局序列号。
- `--to-seq <NUMBER>` - 结束的数据块全局序列号。
- `--action <ACTION>` - 按类型过滤数据块，可选值为: `write`，`delete`，`delete-vnode`，`delete-table`，`update-series-keys`。
- `--tenant <STRING>` - 按 Tenant 过滤数据块。
- `--db <STRING>` - 按 Database 过滤数据块。
- `--vnode <NUMBER>` - 按 Vnode 过滤数据块。
- `--table <STRING>` - 按 Table 过滤数据块。

Examples:

```sh
# 输出一个 WAL 文件中，第 5 至第 10 个数据块的内容
cnosdb-tool inspect wal --from 5 --to 10

# 输出一个 WAL 文件中，全局序列号从 1000 至 1024 的数据块的内容
cnosdb-tool inspect wal --from-seq 1000 --to-seq 1024
```

##### 检查文件

```sh
cnosdb-tool check wal [OPTIONS] <PATH>
```

##### 修复文件

```sh
cnosdb-tool repair wal edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - 待修改的数据块序号的起始值。
- `--to <NUMBER>` - 待修改的数据块序号的结束值。
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.wal`

Examples:

```sh
# 删除一个 WAL 文件内第 5、第 6 个数据块
cnosdb-tool repair wal edit <PATH> --delete --from 5 --to 6

# 将一个 WAL 文件内第第 5、第 6 个数据块的内容替换为指定文件的内容，输出至 wal.bak 文件
cnosdb-tool repair wal edit <PATH> --from 5 --to 6 --input <PATH> --output wal.bak
```

#### Tombstone

Tombstone 文件的格式为 **RecordFile**，存放删除标记。

##### 查看文件内容

```
cnosdb-tool inspect tombstone [OPTIONS] <PATH>
```

- `<PATH>` - 文件路径。
- `--from` - 起始的数据块序号。
- `--to` - 结束的数据块序号。

Examples:

```sh
# 输出一个 Tombstone 文件中，第 5 至第 10 个数据块的内容
cnosdb-tool inspect tombstone --from 5 --to 10
```

##### 检查文件

```sh
cnosdb-tool check tombstone [OPTIONS] <PATH>
```

##### 修复文件

```sh
cnosdb-tool repair tombstone edit [OPTIONS] <PATH>
```

- `--from <NUMBER>` - 待修改的数据块序号的起始值。
- `--to <NUMBER>` - 带修改的数据块序号的结束值。
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.tombstone`

Examples:

```sh
# 删除一个 Tombstone 文件内第 5、第 6 个数据块
cnosdb-tool repair tombstone edit <PATH> --delete --from 5 --to 6

# 将一个 Tombstone 文件内第第 5、第 6 个数据块的内容替换为指定文件的内容，输出至 tombstone.bak 文件
cnosdb-tool repair tombstone edit <PATH> --from 5 --to 6 --input <PATH> --output tombstone.bak
```

#### TSM

TSM 文件存放时序数据。

##### 查看文件内容

```sh
cnosdb-tool inspect tsm [OPTIONS] <PATH>
```

- `--tombstone` - 同时也打印 tombstone 的内容。
- `--level` - 输出的级别，可选值为：`fields`，`block`，默认值为：`block`. 
- `fields` - 输出所有属性信息。
- `block` - 输出所有属性信息与数据块信息。

Examples:

```sh
# 输出一个 TSM 文件中，所有的数据块信息
cnosdb-tool inspect tsm --level block <PATH>
```

##### 检查文件

```sh
cnosdb-tool check tsm [OPTIONS] <PATH>
```

#### Hinted-Handoff

Hinted-handoff 文件用于临时存放未能被正确写入的写入请求。

##### 查看文件内容

```sh
cnosdb-tool inspect hh [OPTIONS] <PATH>
```

Options:

- `<PATH>` - 文件路径。
- `--from` - 起始的数据块序号。
- `--to` - 结束的数据块序号。
- `--tenant <STRING>` - 按 Tenant 过滤数据块。
- `--vnode <NUMBER>` - 按 Vnode 过滤数据块。

Examples:

```sh
# 输出一个 Hinted-handoff 文件中，第 5 至第 10 个数据块的内容
cnosdb-tool inspect hh --from 5 --to 10
```

##### 检查文件

```sh
cnosdb-tool check hh [OPTIONS] <PATH>
```

##### 修复文件

```
cnosdb-tool repair hh edit [OPTIONS] <PATH>
```

Options:

- `--from <NUMBER>` - 待修改的数据块序号的起始值。
- `--to <NUMBER>` - 待修改的数据块序号的结束值。
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}`

Examples:

```sh
# 删除一个 Hinted-handoff 文件内第 5、第 6 个数据块
cnosdb-tool repair hh edit <PATH> --delete --from 5 --to 6

# 将一个 Hinted-handoff 文件内第第 5、第 6 个数据块的内容替换为指定文件的内容，输出至 hh.bak 文件
cnosdb-tool repair hh edit <PATH> --from 5 --to 6 --input <PATH> --output hh.bak
```

#### Series-Binlog

Series binlog 文件用于存放数据模型。

##### 查看文件内容

```sh
cnosdb-tool inspect series-binlog [OPTIONS] <PATH>
```

Options:

- `<PATH>` - 文件路径。
- `--from` - 起始的数据块序号。
- `--to` - 结束的数据块序号。
- `--database <STRING>` - 按 Database 过滤数据块。
- `--table <NUMBER>` - 按 Table 过滤数据块。

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

- `--from <NUMBER>` - 待修改的数据块序号的起始值。
- `--to <NUMBER>` - 待修改的数据块序号的结束值。
- `--out` - 修复后文件的保存位置，默认为 `<out_dir>/<source_file>.{%Y%m%d_%H%M%S}.{e|d}.binlog`

Examples:

```sh
# 删除一个 Series-binlog 文件内第 5、第 6 个数据块
cnosdb-tool repair series-binlog edit <PATH> --delete --from 5 --to 6

# 将一个 Series-binlog 文件内第第 5、第 6 个数据块的内容替换为指定文件的内容，输出至 s_log.bak 文件
cnosdb-tool repair series-binlog edit <PATH> --from 5 --to 6 --input <PATH> --output s_log.bak
```

</TabItem>

</Tabs>