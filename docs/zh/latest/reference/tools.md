---
title: 工具
order: 7
---

# 工具

## 客户端命令行程序

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