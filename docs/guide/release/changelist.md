---
title: 发布历史
order: 1
---

## V2.0.1

2022年11月08日，CnosDB 发布 V2.0.1 版。该版本修复了CnosDB部分重点错误，并且更新了一些必要的新功能，更新细节如下：

**Bug修复：**

- 修复表和数据库对象名称错误的问题。
- 修复WAL中断时文件损坏的错误。
- 修复TableWriteExec只能写入一个分区。
- 修复Schema使用错误，当将数据刷新到磁盘导致查询混乱。
- 增加TskvScan的投影有效性检查并优化列修剪。
- 修复写入的行协议中field可以为空的问题。
- 修复解析包含逗号或等号的请求字符串时失败的问题。
- 增加对写入point进行field和tag异常检查。
- 修复compaction时导致的写入挂起的问题。
- 修复SELECT语句中仅包含tag列时不返回数据的Bug。
- 在全局上下文添加tsfid。
- 禁用cross join。

**新功能：**

- 限制查询连接数和查询内容的大小。

**其他：**
- 使用HashMap的Key更清晰。
- 升级DataFusion版本到13.0.0。
- 解决依赖冲突的问题。
- 添加log_err macro。
- 检查输入的point格式。
- 性能优化。
- 添加收集信息。
- 结构体命名修改，将Point::table改为tab，将Points::database 改为 db.

## V2.0.0

2022年10月24日，CnosDB 发布 V2.0.0 版本。
这次的版本发布是一个新的开始，我们基于Rust重新构建了CnosDB时序数据库，提升了CnosDB的性能，增强了CnosDB的易用性，也使CnosDB更加适应云生态的要求。

**特色功能：**
- 专为时序数据设计的存储引擎，优化写操作，支持删除和更新操作；
- 压缩算法由用户灵活指定，压缩比可调；
- 基于Apache Arrow及Datafusion 实现了查询引擎；
- 支持标准SQL，支持Schemaless 写入；
- 多索引优化了查询效率；
- 生态友好，支持RESTful接口，支持Telegraf、Grafana等通用第三方生态组件。