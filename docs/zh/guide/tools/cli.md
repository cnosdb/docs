---
title: 客户端CLI
order: 8
---

在CnosDB源码的根目录下，运行如下命令启动CLI程序

```shell
cargo run --package client --bin cnosdb-cli
```

**程序的参数如下：**

```
-h --host CnosDB            服务的host，默认为"0.0.0.0"
-p --port CnosDB            服务的端口，默认为31001
-u --user                   用户名，默认为"root"
-p --password               密码，默认没有
-d --database               连接的数据库，默认为"public"
-t --target-partitions      可选，执行查询的分片数，增加分片数可以增加并发。默认为机器CPU核数
--data-path                 CLI程序数据存放位置，默认为执行client的目录
-f --file                   可选，执行多个命令脚本，并退出
--rc                        可选，配置文件
--format                    输出格式，默认是Table格式
--quiet                     运行在安静模式，只输出结果，不输出执行时间
```

**进入程序后你可以运行指令或SQL：**

运行SQL例如：
```
❯ CREATE DATABASE test;
Query took 0.050 seconds.
❯ 
```

运行指令例如：

程序的指令如下：

```
\?          指令帮助
\q          退出CLI
\c <db>     连接数据库db_name
\d <table>  描述表table
\quiet     切换至安静模式，只输出结果，不输出执行时间
\w <path>   读取Line Protocol格式的文件，写入数据库
```

