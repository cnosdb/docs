# 发行说明

## 2.4.2.1

发布日期：2024年08月28日

### 新增特性

- 客户端适配 stream [#2217](https://github.com/cnosdb/cnosdb/pull/2217)
- 添加 HTTP OTLP 写接口和 Jaeger 可视化接口 [#2214](https://github.com/cnosdb/cnosdb/pull/2214)
- 优雅关闭 [#2229](https://github.com/cnosdb/cnosdb/pull/2229)
- 为 http_metrics 案例添加请求类型：HTTP[#2231](https://github.com/cnosdb/cnosdb/pull/2231)
- 为 cnosdb-cli 添加参数 --proxy-url [#2216](https://github.com/cnosdb/cnosdb/pull/2216)
- 过程宏 ErrorCoder 生成额外的常量方法 [#2238](https://github.com/cnosdb/cnosdb/pull/2238)
- 预创建桶 [#2244](https://github.com/cnosdb/cnosdb/pull/2244)

### 功能优化

- byte_num 和 duration [#2223](https://github.com/cnosdb/cnosdb/pull/2223)

- 防止 IDE 代码检查更改 common/protos 的代码 [#2199](https://github.com/cnosdb/cnosdb/pull/2199)

- 将 v1/traces 更改为 api/v1/traces，表参数更改为必需条目 [#2237](https://github.com/cnosdb/cnosdb/pull/2237)

- 优化日志相关代码 [#2241](https://github.com/cnosdb/cnosdb/pull/2241)

- 增强移除 leader 副本 [#2236](https://github.com/cnosdb/cnosdb/pull/2236)

- 用 recordbatch 替换 datablock [#2234](https://github.com/cnosdb/cnosdb/pull/2234)

- 添加配置项索引缓存容量和 WAL 压缩类型 [#2249](https://github.com/cnosdb/cnosdb/pull/2249)

- 当节点失效时，持久化 SQL 迁移到其他节点 [#2245](https://github.com/cnosdb/cnosdb/pull/2245)

- 添加系统数据库副本配置 [#2273](https://github.com/cnosdb/cnosdb/pull/2273)

- 字符串函数和窗口函数 [#2269](https://github.com/cnosdb/cnosdb/pull/2269)

- 将 ArrayBuilderPtr 移动到 array_builder.rs [#2262](https://github.com/cnosdb/cnosdb/pull/2262)

- 撤销 "重构：用 (S...) 替换租户.database 的字符串类型" [#2276](https://github.com/cnosdb/cnosdb/pull/2276)

- 测试数学、时间条件函数和 approx_agg [#2277](https://github.com/cnosdb/cnosdb/pull/2277)

- 修改系统数据库副本的交付模式 [#2278](https://github.com/cnosdb/cnosdb/pull/2278)

- 将 openssl 从 0.10.62 升级到 0.10.66 [#2282](https://github.com/cnosdb/cnosdb/pull/2282)

### 问题修复

- 提前构造 unwrap_or [#2233](https://github.com/cnosdb/cnosdb/pull/2233)

- 合理化语句的 TSM 部分执行 [#2235](https://github.com/cnosdb/cnosdb/pull/2235)

- 添加日志以恢复 && 修复写入结果不准确 [#2232](https://github.com/cnosdb/cnosdb/pull/2232)

- 修复 ES 日志写入错误 [#2242](https://github.com/cnosdb/cnosdb/pull/2242)

- 修复eslog 接口批量格式缺少返回值问题 [#2243](https://github.com/cnosdb/cnosdb/pull/2243)

- 修复多次 memcache 刷新 [#2240](https://github.com/cnosdb/cnosdb/pull/2240)

- 修复未创建内存配置文件 [#2246](https://github.com/cnosdb/cnosdb/pull/2246)

- 修复编译错误 [#2260](https://github.com/cnosdb/cnosdb/pull/2260)

- 修复选择器函数表达式深度嵌套问题 [#2252](https://github.com/cnosdb/cnosdb/pull/2252)

- 修复节点失败时流计算任务无法迁移 [#2264](https://github.com/cnosdb/cnosdb/pull/2264)

- 修复预创建桶拼写错误 [#2267](https://github.com/cnosdb/cnosdb/pull/2267)

- 修复压缩时数据丢失 [#2272](https://github.com/cnosdb/cnosdb/pull/2272)

## 2.4.2 Ara

发布日期：2024年07月04日

### 新增特性

- 新增 提升Follower节点为leader功能 [#2104](https://github.com/cnosdb/cnosdb/pull/2104)
- 添加 value_fill()、value_repair() 和 timestamp_repair() 函数 [#2088](https://github.com/cnosdb/cnosdb/pull/2088)
- 新增副本管理的 SQL 命令 [#2114](https://github.com/cnosdb/cnosdb/pull/2114)
- 添加对 HTTP 的 Snappy 和 LZ4 压缩编码支持 [#2121](https://github.com/cnosdb/cnosdb/pull/2121)
- 新增复制(raft)指标 [#2144](https://github.com/cnosdb/cnosdb/pull/2144)
- 添加 http_flow 表和 http_response_time 表 [#2159](https://github.com/cnosdb/cnosdb/pull/2159)
- 添加 sql_history 表 [#2164](https://github.com/cnosdb/cnosdb/pull/2164)
- 添加关于 meta http api 的指标 [#2173](https://github.com/cnosdb/cnosdb/pull/2173)
- 创建Bucket时探测服务状况，只在正常服务节点创建 [#2179](https://github.com/cnosdb/cnosdb/pull/2179)
- 支持写入组件适配：promtail、logstash、filebeat [#2189](https://github.com/cnosdb/cnosdb/pull/2189)

### 功能优化

- 将 q_compress更新为 pco [#2019](https://github.com/cnosdb/cnosdb/pull/2019)
- 将 http 的 body 大小修改为 100M [#2107](https://github.com/cnosdb/cnosdb/pull/2107)
- 添加一些复制模型单元测试 [#2091](https://github.com/cnosdb/cnosdb/pull/2091)
- 当识别到 gauge agg 时，应用 SortExec 计划 [#2124](https://github.com/cnosdb/cnosdb/pull/2124)
- 改进缓存刷新时机 [#2122](https://github.com/cnosdb/cnosdb/pull/2122)
- 删除 PhysicalDType 中未使用的 From 实现 [#2131](https://github.com/cnosdb/cnosdb/pull/2131)
- 修复错误的单词拼写 [#2126](https://github.com/cnosdb/cnosdb/pull/2126)
- 重构文件系统接口,支持扩展对象存储和异步写入模式 [#2135](https://github.com/cnosdb/cnosdb/pull/2135)
- 重构了trace和log模块,优化了环境变量配置加载 [#1942](https://github.com/cnosdb/cnosdb/pull/1942)
- 为 flush 操作加入锁保护以提高并发性能 [#2138](https://github.com/cnosdb/cnosdb/pull/2138)
- 为 tsm 文件添加版本支持 [#2141](https://github.com/cnosdb/cnosdb/pull/2141)
- 优化了错误码处理逻辑，增加详细信息并添加单元测试 [#2118](https://github.com/cnosdb/cnosdb/pull/2118)
- 移除索引中 binlog 的功能 [#2140](https://github.com/cnosdb/cnosdb/pull/2140)
- 为 CnosDB CLI 命令添加加载文件时的进度条显示 [#2128](https://github.com/cnosdb/cnosdb/pull/2128)
- 为 sqllogicaltest 增加 shard 和 replication 作为参数 [#2137](https://github.com/cnosdb/cnosdb/pull/2137)
- 使用新的 Timeranges算法对代码结构进行重构 [#2151](https://github.com/cnosdb/cnosdb/pull/2151)
- 简化环境变量配置 [#2160](https://github.com/cnosdb/cnosdb/pull/2160)
- 将 rustls 从 0.21.10 升级到 0.21.12 [#2170](https://github.com/cnosdb/cnosdb/pull/2170)
- 移除 wal 中的枚举 Block; 修复拼写错误 [#2167](https://github.com/cnosdb/cnosdb/pull/2167)
- 将持久化 SQL 从本地迁移到元数据,并将水印存储在系统表中 [#2149](https://github.com/cnosdb/cnosdb/pull/2149)
- 添加 sqllogic 支持可替换参数, 修复 copyinto 路径匹配模式 [#2172](https://github.com/cnosdb/cnosdb/pull/2172)
- 重构: 移除无用的指标代码 [#2177](https://github.com/cnosdb/cnosdb/pull/2177)
- 移除 meta 配置中的一些配置项 [#2181](https://github.com/cnosdb/cnosdb/pull/2181)
- 优化查询读取缓存的效率 [#2195](https://github.com/cnosdb/cnosdb/pull/2195)
- 重构压缩监控指标 [#2193](https://github.com/cnosdb/cnosdb/pull/2193)
- 重构配置，将一部分配置与数据库对象关联 [#2197](https://github.com/cnosdb/cnosdb/pull/2197)
- 为缓存添加可选依赖 async-backtrace，可通过特性 backtrace 激活 [#2204](https://github.com/cnosdb/cnosdb/pull/2204)
- 更改名称以更好地区分所有者和数据库 [#2202](https://github.com/cnosdb/cnosdb/pull/2202)
- 为 queries表添加database_name字段 [#2208](https://github.com/cnosdb/cnosdb/pull/2208)
- 删除无用的 tseries_family.rs 文件 [#2219](https://github.com/cnosdb/cnosdb/pull/2219)
- 改善 data 和 meta 实例的可定制性 [#2211](https://github.com/cnosdb/cnosdb/pull/2211)
- 修复错误和删除未使用的条目 [#2221](https://github.com/cnosdb/cnosdb/pull/2221)
- 将tenant.database类型从string改为tuple [#2220](https://github.com/cnosdb/cnosdb/pull/2220)
- 补充测试文件缺失的内容 [#2218](https://github.com/cnosdb/cnosdb/pull/2218)

### 问题修复

- 修复 meta 解码请求失败导致 openraft 崩溃 的问题 [#2112](https://github.com/cnosdb/cnosdb/pull/2112)
- 修复了复制和分片不能设置为 0 的问题 [#2110](https://github.com/cnosdb/cnosdb/pull/2110)
- 修复了拼写错误并优化了代码性能 [#2106](https://github.com/cnosdb/cnosdb/pull/2106)
- 修复了 get_disk_info 不支持 WinXP 的问题 [#2116](https://github.com/cnosdb/cnosdb/pull/2116)
- 修复了gauge_agg 函数的排序问题 [#2113](https://github.com/cnosdb/cnosdb/pull/2113)
- 修复角色无继承时手动添加权限的问题，并优化\c 和 describe database/show tables 的权限判断 [#2115](https://github.com/cnosdb/cnosdb/pull/2115)
- 修复了只读权限用户不可以读取resource_status表里drop database的问题 [#2100](https://github.com/cnosdb/cnosdb/pull/2100)
- 修复数据无序导致的函数结果不一致问题 [#2130](https://github.com/cnosdb/cnosdb/pull/2130)
- 修复频繁的冗余刷新请求 [#2136](https://github.com/cnosdb/cnosdb/pull/2136)
- 修复了在使用 pread() 和 write_all()/read_all() 函数后释放内存导致的问题 [#2146](https://github.com/cnosdb/cnosdb/pull/2146)
- 修复了删除数据时的不一致性问题 [#2162](https://github.com/cnosdb/cnosdb/pull/2162)
- 修复WAL截断错误 [#2176](https://github.com/cnosdb/cnosdb/pull/2176)
- 修复外部表关联的文件可是使用任何扩展名 [#2175](https://github.com/cnosdb/cnosdb/pull/2175)
- 修复从空字符串创建minivec时的问题 [#2184](https://github.com/cnosdb/cnosdb/pull/2184)
- 修复 sqllogic 在 Windows 上的新功能支持 [#2166](https://github.com/cnosdb/cnosdb/pull/2166)
- 修复 wal 读取器中的一些错误,并删除最小/最大序 [#2188](https://github.com/cnosdb/cnosdb/pull/2188)
- 修复更新复制组副本指标导致死锁的问题 [#2207](https://github.com/cnosdb/cnosdb/pull/2207)
- 修复了只有 admin 权限用户可以读取 DropTenant 的错误 [#2196](https://github.com/cnosdb/cnosdb/pull/2196)
- 定期更新vnode_cache_size以保持指标正确  [#2182](https://github.com/cnosdb/cnosdb/pull/2182)
- 修复重启实例导致数据丢失的问题 [#2224](https://github.com/cnosdb/cnosdb/pull/2224)

## 2.3.5.3

发布日期：2024年06月17日

### 新增特性

- 增加配置项目 compact_file_cacha_size来配置缓存大小 [#2132](https://github.com/cnosdb/cnosdb/pull/2132)
- 增加指令 SHOW COMPACTION ON NODE <node_id>[#2312](https://github.com/cnosdb/cnosdb/pull/2312)

### 功能优化

- 将 flatbuffers 从 v22.9.29 升级到 v24.3.25 [#2087](https://github.com/cnosdb/cnosdb/pull/2087)
- 优化追加 summary 的写入性能 [#2187](https://github.com/cnosdb/cnosdb/pull/2187)

### 问题修复

- 修复在 cnosdb-cli 中插入使用;分隔的语句失败的问题 [#2063](https://github.com/cnosdb/cnosdb/pull/2063)
- 将 meta 的 http请求 playload 大小从 256K 提升为 100M [#2108](https://github.com/cnosdb/cnosdb/pull/2108)
- 在 gaugeagg 中添加 ORDER BY表达时 [#2117](https://github.com/cnosdb/cnosdb/pull/2117)
- 当使用高级函数gauge_agg时，对提供给gauge_agg的数据提前排好序 [#2125](https://github.com/cnosdb/cnosdb/pull/2125)
- 修复查询数据无序导致数据结果不一致的问题 [#2133](https://github.com/cnosdb/cnosdb/pull/2133)
- 修复 line protocol 解析失败的问题 [#2143](https://github.com/cnosdb/cnosdb/pull/2143)
- 修复在持有写锁的情况下向有界通道发送消息会导致死锁或其他一些问题的 [#2155](https://github.com/cnosdb/cnosdb/pull/2155)
- 修复在数据写入过程中，内存持续增长，并发生OOM的问题[#2174](https://github.com/cnosdb/cnosdb/pull/2174)

## v2.4.1

发布日期：2024年04月26日

### 新增特性

- 实现添加系统变量的框架并添加 @@server_version [#1673](https://github.com/cnosdb/cnosdb/pull/1673)
- 支持 data node 感知 meta node 状态变化 [#1705](https://github.com/cnosdb/cnosdb/pull/1705)
- 支持 Dump DDL [#1710](https://github.com/cnosdb/cnosdb/pull/1710)
- 将 write 请求和 SQL 请求都路由到 query 服务器 [#1759](https://github.com/cnosdb/cnosdb/pull/1759)
- 添加 ToDDLSql 接口 [#1749](https://github.com/cnosdb/cnosdb/pull/1749)
- 添加 HTTP 压缩 [#1684](https://github.com/cnosdb/cnosdb/pull/1684)
- 为租户添加延迟删除参数 [#1652](https://github.com/cnosdb/cnosdb/pull/1652)
- 添加一些GIS类型的函数 [#1765](https://github.com/cnosdb/cnosdb/pull/1765)
- 实现了 DDL Raft Write [#1802](https://github.com/cnosdb/cnosdb/pull/1802)
- 重构 TSM 文件格式 [#1827](https://github.com/cnosdb/cnosdb/pull/1827)
- 默认启用 Raft 复制模式 [#1898](https://github.com/cnosdb/cnosdb/pull/1898)
- 新增会话和系统函数 [#1883](https://github.com/cnosdb/cnosdb/pull/1883)
- 实现复制配置的配置文件支持 [#1899](https://github.com/cnosdb/cnosdb/pull/1899)
- 将 Raft apply 过程产生的错误发送给用户 [#1908](https://github.com/cnosdb/cnosdb/pull/1908)
- 添加 copyinto 落盘大小配置和导出文件名中包含查询 ID 信息 [#1959](https://github.com/cnosdb/cnosdb/pull/1959)
- sqloption 支持空格和等号 [#1968](https://github.com/cnosdb/cnosdb/pull/1968)
- 支持 rebuild index 功能 [#1991](https://github.com/cnosdb/cnosdb/pull/1991)
- 支持多次添加 --tenant 选项 [#1987](https://github.com/cnosdb/cnosdb/pull/1987)
- 新增质量函数 [#1996](https://github.com/cnosdb/cnosdb/pull/1996)
- 为 TSM 页文件添加 CRC32 校验 [#2022](https://github.com/cnosdb/cnosdb/pull/2022)
- 支持以 ES 格式写入日志 [#2028](https://github.com/cnosdb/cnosdb/pull/2028)
- 支持带有分号的字符串值 [#2031](https://github.com/cnosdb/cnosdb/pull/2031)
- 支持 must_change_password 字段 [#2056](https://github.com/cnosdb/cnosdb/pull/2056)
- 增加 root 用户默认密码 [#2044](https://github.com/cnosdb/cnosdb/pull/2044)
- 添加二阶段聚合函数 gauge_agg、first_time、first_val、last_time、last_val、idelta 等 [#2093](https://github.com/cnosdb/cnosdb/pull/2093)
- 为 ES API 添加 have_es_command 参数 [#2098](https://github.com/cnosdb/cnosdb/pull/2098)

### 功能优化

- 在 crate main 的 Cargo.toml 中添加 default-run=cnosdb [#1647](https://github.com/cnosdb/cnosdb/pull/1647)
- 重构写入逻辑 [#1653](https://github.com/cnosdb/cnosdb/pull/1653)
- 重构并优化 ResourceManager [#1656](https://github.com/cnosdb/cnosdb/pull/1656)
- 优化 gRPC 传输的内容大小 [#1717](https://github.com/cnosdb/cnosdb/pull/1717)
- 重构 meta 数据接收 ctrl-c 信号 [#1723](https://github.com/cnosdb/cnosdb/pull/1723)
- 使用 TagId 替换 TagName [#1697](https://github.com/cnosdb/cnosdb/pull/1697)
- 重构 get_series_key 模块 [#1737](https://github.com/cnosdb/cnosdb/pull/1737)
- 增加对流表参数 event_time_column 的检查 [#1744](https://github.com/cnosdb/cnosdb/pull/1744)
- 重构 GIS 函数实现 [#1727](https://github.com/cnosdb/cnosdb/pull/1727)
- 标准化 information_schema.queries 和 show queries 中返回的信息 [#1731](https://github.com/cnosdb/cnosdb/pull/1731)
- 支持通过配置选择开放的端口 [#1685](https://github.com/cnosdb/cnosdb/pull/1685)
- 改进 Raft 模式下的写入过程 [#1726](https://github.com/cnosdb/cnosdb/pull/1726)
- 禁止创建和列名相同的 stream 表 [#1733](https://github.com/cnosdb/cnosdb/pull/1733)
- 统一 drop_after 名称，添加未设置的 drop after [#1784](https://github.com/cnosdb/cnosdb/pull/1784)
- 为客户端 chunk 添加描述 [#1785](https://github.com/cnosdb/cnosdb/pull/1785)
- 重构 kvcore [#1796](https://github.com/cnosdb/cnosdb/pull/1796)
- 添加一个配置项来配置预留空间 [#1798](https://github.com/cnosdb/cnosdb/pull/1798)
- 重构单元测试使其运行效率更高 [#1806](https://github.com/cnosdb/cnosdb/pull/1806)
- 重构配置文件 [#1812](https://github.com/cnosdb/cnosdb/pull/1812)
- 添加配置 service.grpc_enable_gzip [#1823](https://github.com/cnosdb/cnosdb/pull/1823)
- 移除社区版中的 cold_data_server 配置 [#1852](https://github.com/cnosdb/cnosdb/pull/1852)
- Raft 模式下的 Raft WAL 重构和性能优化 [#1832](https://github.com/cnosdb/cnosdb/pull/1832)
- 优化直接 select 流表时的错误信息 [#1732](https://github.com/cnosdb/cnosdb/pull/1732)
- 使计数任务的最大并行度等于最大 CPU 数 [#1809](https://github.com/cnosdb/cnosdb/pull/1809)
- 隐藏租户/数据库 [#1884](https://github.com/cnosdb/cnosdb/pull/1884)
- 数据查询先查询主节点 [#1893](https://github.com/cnosdb/cnosdb/pull/1893)
- 检查数据合法性，防止批量写入部分成功和部分失败 [#1892](https://github.com/cnosdb/cnosdb/pull/1892)
- 修改显示语法错误信息 [#1909](https://github.com/cnosdb/cnosdb/pull/1909)
- 更新 Rust 工具链到 nightly-2024-01-07 [#1910](https://github.com/cnosdb/cnosdb/pull/1910)
- 删除 Quorum 复制模式 [#1921](https://github.com/cnosdb/cnosdb/pull/1921)
- 禁止添加系统角色 [#1949](https://github.com/cnosdb/cnosdb/pull/1949)
- 修改 ResourceManager 为 watch 和 event 机制 [#1903](https://github.com/cnosdb/cnosdb/pull/1903)
- 优化 client cmd 命令 [#1872](https://github.com/cnosdb/cnosdb/pull/1872)
- 兼容 Windows 路径和使用规则的配置文件 [#1915](https://github.com/cnosdb/cnosdb/pull/1915)
- 重构 summary 文件写入过程 [#2003](https://github.com/cnosdb/cnosdb/pull/2003)
- 增强创建/应用快照并使用 tsm 重建索引 [#2009](https://github.com/cnosdb/cnosdb/pull/2009)
- 升级 Rust crates [#1997](https://github.com/cnosdb/cnosdb/pull/1997)
- 改进压缩算法中的无意义零值处理 [#2014](https://github.com/cnosdb/cnosdb/pull/2014)
- 消除 tsm 和 tsm2 及 FieldVal / ColumnType 逻辑类型重构中的同步冲突 [#2020](https://github.com/cnosdb/cnosdb/pull/2020)
- 重用列数据代码 [#2026](https://github.com/cnosdb/cnosdb/pull/2026)
- 优化 CSV 特定的分隔符和 with_header 字段 [#1983](https://github.com/cnosdb/cnosdb/pull/1983)
- 优化 TSKV GRPC 消息 [#2030](https://github.com/cnosdb/cnosdb/pull/2030)
- 在 VersionEdit 中将 del_tsf 和 add_tsf 改为枚举 [#2035](https://github.com/cnosdb/cnosdb/pull/2035)
- 改进快照实现，使用 Version 持有 TSM 文件 [#2023](https://github.com/cnosdb/cnosdb/pull/2023)
- 增强 Raft 复制和混沌测试 [#2059](https://github.com/cnosdb/cnosdb/pull/2059)
- 更新 OpenRaft 到 v0.9.5 [#2067](https://github.com/cnosdb/cnosdb/pull/2067)
- 删除和注释掉 TSKV 目录中无用的代码 [#2065](https://github.com/cnosdb/cnosdb/pull/2065)
- 添加数据块大小配置 [#2076](https://github.com/cnosdb/cnosdb/pull/2076)
- 增强 2.4 BloomFilter [#2078](https://github.com/cnosdb/cnosdb/pull/2078)
- 获取/创建快照，使用 OpenRaft v0.9.5 [#2081](https://github.com/cnosdb/cnosdb/pull/2081)
- 将 build_version_edit 拆分为 build_version_edit 和 column_files_bloom_filter [#2089](https://github.com/cnosdb/cnosdb/pull/2089)
- 改进 WAL 多线程恢复 [#2094](https://github.com/cnosdb/cnosdb/pull/2094)

### 问题修复

- 修复 get_sys_mem 单元错误 [#1644](https://github.com/cnosdb/cnosdb/pull/1644)
- 修复 CLI 写行协议未显示错误信息的问题 [#1651](https://github.com/cnosdb/cnosdb/pull/1651)
- 修复 TSKV 文件系统不使用 append 标志；当写入器滚动到旧版本时调用 WalWriter::close() [#1637](https://github.com/cnosdb/cnosdb/pull/1637)
- 修复当删除用户时不删除租户成员的问题 [#1694](https://github.com/cnosdb/cnosdb/pull/1694)
- 修复 “Tenant not found”返回 HTTP 状态码 500 的问题 [#1704](https://github.com/cnosdb/cnosdb/pull/1704)
- 修复 alter stream table 时出现的错误信息 [#1724](https://github.com/cnosdb/cnosdb/pull/1724)
- 修复重启异常情况下 WAL 读取失败，以及数据丢失问题 [#1719](https://github.com/cnosdb/cnosdb/pull/1719)
- 修复 stream job 在重启时丢失数据库信息的问题 [#1734](https://github.com/cnosdb/cnosdb/pull/1734)
- 修复日志显示用户密码的问题 [#1770](https://github.com/cnosdb/cnosdb/pull/1770)
- 修复无法为带有别名的插值函数生成计划的问题 [#1777](https://github.com/cnosdb/cnosdb/pull/1777)
- 改进删除角色信息 [#1772](https://github.com/cnosdb/cnosdb/pull/1772)
- 修复 WAL 不清除且从未清理过的问题 [#1771](https://github.com/cnosdb/cnosdb/pull/1771)
- 修复运行 test_kvcore_interface::test_kvcore_recover 时的错误 [#1791](https://github.com/cnosdb/cnosdb/pull/1791)
- 修复重启 CNOSDB 程序会崩溃的问题 [#1650](https://github.com/cnosdb/cnosdb/pull/1650)
- 修复集群初始化顺序不正确的问题 [#1800](https://github.com/cnosdb/cnosdb/pull/1800)
- 修复压缩模块的部分错误 [#1807](https://github.com/cnosdb/cnosdb/pull/1807)
- 为 HTTP 内容编解码器添加线程池 [#1808](https://github.com/cnosdb/cnosdb/pull/1808)
- 丢弃 dedup_by_front 中错误元素的问题 [#1816](https://github.com/cnosdb/cnosdb/pull/1816)
- 修复没有 tag 时 /api/v1/write 失败的问题 [#1830](https://github.com/cnosdb/cnosdb/pull/1830)
- 修复写入无效 line protocol 返回错误的问题 [#1817](https://github.com/cnosdb/cnosdb/pull/1817)
- 修复外部表 parser 错误的问题 [#1687](https://github.com/cnosdb/cnosdb/pull/1687)
- 修复错误信息不清楚的问题 [#1708](https://github.com/cnosdb/cnosdb/pull/1708)
- 修复 resource_manager 在 drop/recover tenant、restart 场景下的问题 [#1716](https://github.com/cnosdb/cnosdb/pull/1716)
- 修复一些操作错误地修改了未指定的用户配置 [#1764](https://github.com/cnosdb/cnosdb/pull/1764)
- 修复根用户不允许更改授予的管理员 [#1911](https://github.com/cnosdb/cnosdb/pull/1911)
- 修复 'cnosdb' 和其他租户需要检查系统数据库不同的错误 [#1918](https://github.com/cnosdb/cnosdb/pull/1918)
- 重构和修复创建/应用快照中的错误 [#1969](https://github.com/cnosdb/cnosdb/pull/1969)
- 修复 DBschemas 使用错误的元数据客户端的错误 [#1985](https://github.com/cnosdb/cnosdb/pull/1985)
- 修复备份 drop_after 和 codec 在 dump-ddl 中的问题 [#1986](https://github.com/cnosdb/cnosdb/pull/1986)
- 解决同一度量标准在配置文件中单位不一致的问题 [#2006](https://github.com/cnosdb/cnosdb/pull/2006)
- 刷新或压缩时更新 Version 中的序列号 [#2018](https://github.com/cnosdb/cnosdb/pull/2018)
- 修复 CnosDB 在 Windows 上重启失败的问题 [#2027](https://github.com/cnosdb/cnosdb/pull/2027)
- 更新随 Docker 和其他平台打包的过时配置文件 [#2037](https://github.com/cnosdb/cnosdb/pull/2037)
- 更新客户端帮助信息 [#2043](https://github.com/cnosdb/cnosdb/pull/2043)
- 修复数据库不存在时角色无法被分配权限的问题 [#2038](https://github.com/cnosdb/cnosdb/pull/2038)
- 允许指标删除 VNode [#2042](https://github.com/cnosdb/cnosdb/pull/2042)
- 禁止其他用户修改 root 用户信息 [#2052](https://github.com/cnosdb/cnosdb/pull/2052)
- 调整刷新执行顺序，将 usize 更改为 u64，合理化 TSM 部分的执行 [#2036](https://github.com/cnosdb/cnosdb/pull/2036)
- 修复 memcache 删除错误导致读取过时数据的问题 [#2061](https://github.com/cnosdb/cnosdb/pull/2061)
- 处理安全问题 [#2066](https://github.com/cnosdb/cnosdb/pull/2066)
- 修复写入数据未找到复制集时请求元数据的问题 [#2071](https://github.com/cnosdb/cnosdb/pull/2071)
- 恢复数据时标记 WAL 条目使用错误的读取器 [#2086](https://github.com/cnosdb/cnosdb/pull/2086)
- 修复页面切片越界问题 [#2090](https://github.com/cnosdb/cnosdb/pull/2090)
- 修复 binlog 下一个块 panic 问题 [#2097](https://github.com/cnosdb/cnosdb/pull/2097)

## v2.3.5.2

发布日期：2034年04月17日

### 错误修复

- 修复了dependbot安全问题 [#2069](https://github.com/cnosdb/cnosdb/pull/2069)
- 修复了禁止其他用户修改根用户信息的问题 [#2070](https://github.com/cnosdb/cnosdb/pull/2070)
- 修复了指标可以删除 vnode 信息的问题 [#2048](https://github.com/cnosdb/cnosdb/pull/2048)
- 修复了串行构建倒排索引问题 [#2072](https://github.com/cnosdb/cnosdb/pull/2072)
- 修复了加载布隆过滤器死锁的问题 [#2073](https://github.com/cnosdb/cnosdb/pull/2073)

## v2.3.5.1

发布日期：2024年04月10日

### 功能优化

- limit 下推到 RecordBatch 进行读取 [#2040](https://github.com/cnosdb/cnosdb/pull/2040)
- 添加了 BloomFillter [#2039](https://github.com/cnosdb/cnosdb/pull/2039)
- 改进了 delta_compactions [#2046](https://github.com/cnosdb/cnosdb/pull/2046)
- 添加了 delta_compactions 的指标和一些改进 [#2055](https://github.com/cnosdb/cnosdb/pull/2055)

### 错误修复

- 修复了 count(tag) 在分布式中的问题 [#2011](https://github.com/cnosdb/cnosdb/pull/2011)
- 修复了 cnosdb 在 Windows 上重启失败的问题 [#2029](https://github.com/cnosdb/cnosdb/pull/2029)
- 修复了 pread 和 pwrite [#2041](https://github.com/cnosdb/cnosdb/pull/2041)
- 修复了可以为角色分配不存在数据库的读写权限的问题 [#2047](https://github.com/cnosdb/cnosdb/pull/2047)
- 修复了多线程写入时索引丢失数据的问题 [#2057](https://github.com/cnosdb/cnosdb/pull/2057)

## v2.3.5 Aquarius

发布日期：2024年03月06日

### 功能优化

- 增加增量文件的压缩任务。[#1945](https://github.com/cnosdb/cnosdb/pull/1945)
- 同一个 Vnode 的压实操作改为单线程运行。[#2002](https://github.com/cnosdb/cnosdb/pull/2002)

### 错误修复

- 修复涉及大量文件的查询导致的LRU缓存击穿问题。[#1965](https://github.com/cnosdb/cnosdb/pull/1965)
- 修复增量压实导致数据丢失的问题。[#1982](https://github.com/cnosdb/cnosdb/pull/1982)
- 修复 pread 函数可能会写野指针的问题[#1981](https://github.com/cnosdb/cnosdb/pull/1981)
- 修复压实操作导致数据丢失的问题。合并多个数据块时，未按预期排除墓碑数据。[#1988](https://github.com/cnosdb/cnosdb/pull/1988)
- 将 async_file sync_data() 改为sync_all() 。[#1994](https://github.com/cnosdb/cnosdb/pull/1994)
- 修复增量压实选取增量文件的一些错误逻辑，提升增量文件数量降低的效率 [#1998](https://github.com/cnosdb/cnosdb/pull/1998)
- 修复TsmWriter::size 没有添加 index_size [#1999](https://github.com/cnosdb/cnosdb/pull/1999)
- 修复添加 count tag 的功能 [#1989](https://github.com/cnosdb/cnosdb/pull/1989)
- 提取函数 update_max_ts_of_levels [#2004](https://github.com/cnosdb/cnosdb/pull/2004)

## v2.3.4.4

发布日期：2024年01月27日

### 功能优化

- 为 `FileCursor` 添加内存缓冲区。[#1927](https://github.com/cnosdb/cnosdb/pull/1927)
- 添加配置文件项目 `file_buffer_size`。[#1960](https://github.com/cnosdb/cnosdb/pull/1960)
- 添加配置文件项目 `copyinto_trigger_flush_size`。[#1944](https://github.com/cnosdb/cnosdb/pull/1944)

### 错误修复

- 修复宽表导致的 `COPY INTO` 错误。[#1924](https://github.com/cnosdb/cnosdb/pull/1924)
- 在刷新前更新 `version_set` 版本。[#1926](https://github.com/cnosdb/cnosdb/pull/1926)
- 修复删除 `ScalarValueForkDF`。[#1938](https://github.com/cnosdb/cnosdb/pull/1938)
- 当表没有数据时，不执行底层的删除列数据操作。[#1950](https://github.com/cnosdb/cnosdb/pull/1950)
- 修复重新启动时，反序列化流语句失败的问题。[#1953](https://github.com/cnosdb/cnosdb/pull/1953)
- 不允许更改 root 用户的`grant_admin` 参数。[#1954](https://github.com/cnosdb/cnosdb/pull/1954)

## v2.3.4.3

发布日期：2024年01月09日

### 问题修复

- 修复 tskv 迭代器有时会反回比预期更多的数据。[#1895](https://github.com/cnosdb/cnosdb/pull/1895)

## v2.3.4.2

发布日期：2024年01月03日

### 功能优化

- 重构 e2e_test 中的实用程序和不相关内容。[#1882](https://github.com/cnosdb/cnosdb/pull/1882)

### 问题修复

- 修复有关合并的错误。[#1889](https://github.com/cnosdb/cnosdb/pull/1889)

## v2.3.4.1

发布日期：2024年12月29日

### 功能优化

- 删除 `cold_data_server` 和 `NodeAttribute` 模块。[#1859](https://github.com/cnosdb/cnosdb/pull/1859)
- 在 `meta` 服务中添加 `setkv` 和 `delete` 的 http 接口。[#1835](https://github.com/cnosdb/cnosdb/pull/1835)
- 客户端启动时隐藏密码。[#1881](https://github.com/cnosdb/cnosdb/pull/1881)

### 问题修复

- 修复`dedup_by_front` 删除了错误元素的错误。 [#1815](https://github.com/cnosdb/cnosdb/pull/1815)
- 修复异步 LruCache 导致的错误。 [#1820](https://github.com/cnosdb/cnosdb/pull/1820)
- 修复 `meta` 服务创建的快照为空的问题。 [#1835](https://github.com/cnosdb/cnosdb/pull/1835)

## v2.3.4 Apus

发布日期：2023年11月24日

### 新增特性

- 适配 [Vector](https://vector.dev/) [#1628](https://github.com/cnosdb/cnosdb/pull/1628)
- 添加 increase 函数，http_limiter 和 metrics [#1629](https://github.com/cnosdb/cnosdb/pull/1629)
- 将写请求和SQL请求都路由到查询服务器 [#1760](https://github.com/cnosdb/cnosdb/pull/1760)
- 支持HTTP压缩 [#1762](https://github.com/cnosdb/cnosdb/pull/1762)
- 支持导出DDL [#1782](https://github.com/cnosdb/cnosdb/pull/1782)
- 通过配置启动服务 [#1789](https://github.com/cnosdb/cnosdb/pull/1789)

### 功能优化

- 通过读取系统表实现 desc table/database，并修复一些单词错误 [#1692](https://github.com/cnosdb/cnosdb/pull/1692)
- 移除调试日志 [#1793](https://github.com/cnosdb/cnosdb/pull/1793)

### 问题修复

- 删除租户不删除成员的错误 [#1632](https://github.com/cnosdb/cnosdb/pull/1632)
- 生成带别名的插值函数计划失败的问题 [#1777](https://github.com/cnosdb/cnosdb/pull/1777)
- 添加对 `stream table` 的参数 `event_time_column` 的检查 [#1744](https://github.com/cnosdb/cnosdb/pull/1744)
- 在重新启动时流作业丢失数据库信息的问题 [#1734](https://github.com/cnosdb/cnosdb/pull/1734)
- 禁止创建具有相同名称列的流表 [#1733](https://github.com/cnosdb/cnosdb/pull/1733)
- 优化直接选择流表的错误消息 [#1732](https://github.com/cnosdb/cnosdb/pull/1732)
- 获取系统内存单位错误 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- CLI 写入行协议时没有显示错误消息 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 删除用户时不删除租户成员的问题 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 未找到租户返回HTTP状态码500 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 修复 gRPC 大小限制 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 创建外部表时的表名错误 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)

## v2.3.4 Apus

发布日期：2023年11月24日

### 新增特性

 - 适配 [Vector](https://vector.dev/) [#1628](https://github.com/cnosdb/cnosdb/pull/1628)
 - 添加 increase 函数，http_limiter 和 metrics [#1629](https://github.com/cnosdb/cnosdb/pull/1629)
 - 将写请求和SQL请求都路由到查询服务器 [#1760](https://github.com/cnosdb/cnosdb/pull/1760)
 - 支持HTTP压缩 [#1762](https://github.com/cnosdb/cnosdb/pull/1762)
 - 支持导出DDL [#1782](https://github.com/cnosdb/cnosdb/pull/1782)
 - 通过配置启动服务 [#1789](https://github.com/cnosdb/cnosdb/pull/1789)

### 功能优化

- 通过读取系统表实现 desc table/database，并修复一些单词错误 [#1692](https://github.com/cnosdb/cnosdb/pull/1692)
- 移除调试日志 [#1793](https://github.com/cnosdb/cnosdb/pull/1793)

### 问题修复

- 删除租户不删除成员的错误 [#1632](https://github.com/cnosdb/cnosdb/pull/1632)
- 生成带别名的插值函数计划失败的问题 [#1777](https://github.com/cnosdb/cnosdb/pull/1777)
- 添加对 `stream table` 的参数 `event_time_column` 的检查 [#1744](https://github.com/cnosdb/cnosdb/pull/1744)
- 在重新启动时流作业丢失数据库信息的问题 [#1734](https://github.com/cnosdb/cnosdb/pull/1734)
- 禁止创建具有相同名称列的流表 [#1733](https://github.com/cnosdb/cnosdb/pull/1733)
- 优化直接选择流表的错误消息 [#1732](https://github.com/cnosdb/cnosdb/pull/1732)
- 获取系统内存单位错误 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- CLI 写入行协议时没有显示错误消息 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 删除用户时不删除租户成员的问题 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 未找到租户返回HTTP状态码500 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 修复 gRPC 大小限制 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)
- 创建外部表时的表名错误 [#1739](https://github.com/cnosdb/cnosdb/pull/1739)

## v2.4.0 Milky Way

发布日期：2023年10月24日

### 新增特性

📈 数据汇总不再单调，新的聚合函数登场！

- compact_state_agg [#1359](https://github.com/cnosdb/cnosdb/pull/1359)
- gauge_agg [#1370](https://github.com/cnosdb/cnosdb/pull/1370)
- first [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- last [#1413](https://github.com/cnosdb/cnosdb/pull/1413)
- mode [#1440](https://github.com/cnosdb/cnosdb/pull/1440)
- increase [#1476](https://github.com/cnosdb/cnosdb/pull/1476)
- delta [#1395](https://github.com/cnosdb/cnosdb/pull/1395)
- time_delta [#1405](https://github.com/cnosdb/cnosdb/pull/1405)
- rate [#1405](https://github.com/cnosdb/cnosdb/pull/1405)

🌐 GIS函数集锦 [#1465](https://github.com/cnosdb/cnosdb/pull/1465)

- ST_AsBinary
- ST_GeomFromWKB
- ST_Distanc
- ST_Area

💼 系统表大改造 [#1461](https://github.com/cnosdb/cnosdb/pull/1461)

- 全都小写，系统字段名规范化，一切都走心。

🔄 修改数据炸裂更新，修改数据变得so easy，你想改就改！[#1484](https://github.com/cnosdb/cnosdb/pull/1484) [#1517](https://github.com/cnosdb/cnosdb/pull/1517) [#1623](https://github.com/cnosdb/cnosdb/pull/1623) [#1590](https://github.com/cnosdb/cnosdb/pull/1590)

```sql
UPDATE table_name SET ( assignment_clause [, ...] ) where_clause
assignment clause :
    tag_name = value_expression
```

```sql
UPDATE table_name SET ( assignment_clause [, ...] ) where_clause
assignment clause :
    field_name = value_expression
ALTER TABLE tb_name alter_table_option;
```

```sql
alter_table_option: {
      ADD TAG col_name
    | ADD FIELD col_name [CODEC(code_type)]
    | ALTER col_name SET CODEC(code_type)
    | DROP col_name
    | RENAME COLUMN col_name TO new_col_name
}
```

```sql
DELETE FROM table_name where_clause
```

其他重磅功能如下：

- 适配 Vector。[#1380](https://github.com/cnosdb/cnosdb/pull/1380)
- 新增 Geometry 类型。[#1463](https://github.com/cnosdb/cnosdb/pull/1463)
- 添加直方图导出。[#1472](https://github.com/cnosdb/cnosdb/pull/1472)
- 支持 duration_in 函数 [#1423](https://github.com/cnosdb/cnosdb/pull/1423) [#1408](https://github.com/cnosdb/cnosdb/pull/1408)
- 新增对 grpc 压缩的支持 [#1631](https://github.com/cnosdb/cnosdb/pull/1631)
- 新增集群数据导入导出工具 [#1635](https://github.com/cnosdb/cnosdb/pull/1635)
- 新增数据库延迟删除。[#1510](https://github.com/cnosdb/cnosdb/pull/1510)

```sql
DROP DATABASE [IF EXISTS] <db_name> [AFTER <time_interval>]
```

### 功能优化

内存使用得到有效减少，TSKV经过优化更加高效，而Flatbuffers、构建索引等方面也得到了明显的提升。除此之外，缓存重构和减少克隆操作等细致优化，让整体性能更上一层楼。

- 支持下推 <!=> 比较运算符到数据源。[#1469](https://github.com/cnosdb/cnosdb/pull/1469)
- 按 vnode 拆分 WAL。[#1454](https://github.com/cnosdb/cnosdb/pull/1454)
- 优化 TSKV  以减少内存使用。 [#1199](https://github.com/cnosdb/cnosdb/pull/1199)
- 重构 DESC TABLES / DESC DATABASES。[#1397](https://github.com/cnosdb/cnosdb/pull/1397)
- 新增资源管理功能，数据删改动作进行监控和失败重试。[#1616](https://github.com/cnosdb/cnosdb/pull/1616)
- 改进 Meta Watch 模型。[#1586](https://github.com/cnosdb/cnosdb/pull/1586)
- 重构迭代器并优化性能。[#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 将大依赖 'models' 更改为小依赖 'error_code'。[#1470](https://github.com/cnosdb/cnosdb/pull/1470)
- 优化构建索引。[#1468](https://github.com/cnosdb/cnosdb/pull/1468)
- 优化 Flatbuffers。[#1435](https://github.com/cnosdb/cnosdb/pull/1435)
- 重构 TSKV 中的 record_file 和 codec。[#1439](https://github.com/cnosdb/cnosdb/pull/1439)
- Vector类型数组映射成字符串。[#1450](https://github.com/cnosdb/cnosdb/pull/1450)
- 重构 usage_schema。[#1479](https://github.com/cnosdb/cnosdb/pull/1479)
- 重命名 coordinator limiter。[#1482](https://github.com/cnosdb/cnosdb/pull/1482)
- 添加 limiter manager。[#1494](https://github.com/cnosdb/cnosdb/pull/1494)
- 清理无用代码 VnodeStatusListener。[#1487](https://github.com/cnosdb/cnosdb/pull/1487)
- 减少克隆操作。[#1582](https://github.com/cnosdb/cnosdb/pull/1582)
- 修复标量函数参数数量未见检查的BUG。[#1597](https://github.com/cnosdb/cnosdb/pull/1597)
- 在索引读取之前寻找位置。[#1618](https://github.com/cnosdb/cnosdb/pull/1618)
- 扩展 Raft 写接口。[#1620](https://github.com/cnosdb/cnosdb/pull/1620)
- 重构缓存。[#1560](https://github.com/cnosdb/cnosdb/pull/1560)
- 删除表时，相关数据将被删除。[#1553](https://github.com/cnosdb/cnosdb/pull/1553)
- 禁用对 tenant cnosdb 的限制。[#1617](https://github.com/cnosdb/cnosdb/pull/1617)
- Leader 复制，多 Raft 复制组。[#1534](https://github.com/cnosdb/cnosdb/pull/1534)
- 添加关于函数、DDL、DML 的测试用例。[#1588](https://github.com/cnosdb/cnosdb/pull/1588)
- 重构 tag plan 中扫描数据的方式 [#1634](https://github.com/cnosdb/cnosdb/pull/1634)

### 问题修复

- 修复 check_writes 错误。 [#1383](https://github.com/cnosdb/cnosdb/pull/1383)
- 修复行协议解析器 '\n' 错误。[#1426](https://github.com/cnosdb/cnosdb/pull/1426)
- 修改案例以实现可重复性。[#1451](https://github.com/cnosdb/cnosdb/pull/1451)
- 修复 HTTP 指标字段顺序错误。[#1506](https://github.com/cnosdb/cnosdb/pull/1506)
- 修复 TSM 损坏，但查询不尝试读取的问题。[#1453](https://github.com/cnosdb/cnosdb/pull/1453)
- 修复流计划未执行过滤推送的问题。[#1515](https://github.com/cnosdb/cnosdb/pull/1515)
- 修复 CLI 数组越界访问。[#1531](https://github.com/cnosdb/cnosdb/pull/1531)
- 修复重新启动时数据丢失的问题。[#1471](https://github.com/cnosdb/cnosdb/pull/1471)
- 在 Raft 复制模式中删除数据库。[#1556](https://github.com/cnosdb/cnosdb/pull/1556)
- 修复意外删除了 WAL 测试目录的问题。[#1558](https://github.com/cnosdb/cnosdb/pull/1558)
- 修复密码验证失败问题。[#1583](https://github.com/cnosdb/cnosdb/pull/1583)
- 修复 time_window 函数无法处理常量转换表达式。[#1578](https://github.com/cnosdb/cnosdb/pull/1578)
- 修复桶的填充率。[#1563](https://github.com/cnosdb/cnosdb/pull/1563)
- 修复混淆的错误消息。[#1595](https://github.com/cnosdb/cnosdb/pull/1595)
- 修复重新启动时恢复无效数据的问题。[#1570](https://github.com/cnosdb/cnosdb/pull/1570)
- 禁止删除 root 用户。[#1598](https://github.com/cnosdb/cnosdb/pull/1598)
- 修复在 TSKV 中删除列导致获取空数据库的问题。[#1581](https://github.com/cnosdb/cnosdb/pull/1581)
- 修复 /cluster/users/user 变更不通知服务器的问题。[#1599](https://github.com/cnosdb/cnosdb/pull/1599)
- 修复Meta 创建重复数据版本的问题。[#1605](https://github.com/cnosdb/cnosdb/pull/1605)
- 增加标量函数参数检查。[#1615](https://github.com/cnosdb/cnosdb/pull/1615)
- 修复创建系统数据库 usage_schema 的问题。[#1606](https://github.com/cnosdb/cnosdb/pull/1606)
- 修复删除租户时不删除成员的错误。[#1626](https://github.com/cnosdb/cnosdb/pull/1626)
- 修复 tskv 迭代器有时返回超出预期数据的问题。 [#1638](https://github.com/cnosdb/cnosdb/pull/1638)
- 使 tskv 节点重启不受资源隐藏影响。 [#1636](https://github.com/cnosdb/cnosdb/pull/1636)
- 执行删除时停止后台的数据文件 compaction 任务。 [#1643](https://github.com/cnosdb/cnosdb/pull/1643)

## v2.3.3 Antlia

发布日期：2023年9月28日

### 功能优化
- 优化了读取性能 [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 优化了 DataType 的 Ord 实现 [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 添加了  data block reader [#1467](https://github.com/cnosdb/cnosdb/pull/1467)
- 移除了字段扫描定时器 [#1467](https://github.com/cnosdb/cnosdb/pull/1467)

### 问题修复：
- 修复了允许修改 usage_schema 数据库的问题 [1421](https://github.com/cnosdb/cnosdb/pull/1421)
- 修复了多个元数据节点上用户和租户的不一致性问题  [1417](https://github.com/cnosdb/cnosdb/pull/1417)
- 修复了删除租户时不删除数据的问题 [1418](https://github.com/cnosdb/cnosdb/pull/1418)
- 修复了生成没有选项的 TLS lv-2 证书的问题  [1441](https://github.com/cnosdb/cnosdb/pull/1441)
- 修复了创建 TSF 时数据丢失的问题  [1478](https://github.com/cnosdb/cnosdb/pull/1478)
- 修复了在 Tskv 上取消查询任务 [1488](https://github.com/cnosdb/cnosdb/pull/1488)
- 修复了在更新表冲突后重试  [1503](https://github.com/cnosdb/cnosdb/pull/1503)
- 修复了更改数据库的问题  [1504](https://github.com/cnosdb/cnosdb/pull/1504)
- 修复了 Arrow Flight SQL JDBC API 的 getCatalogs、getSchemas 和 getTables 的问题 [1520](https://github.com/cnosdb/cnosdb/pull/1520)
- 修复了 Arrow Flight SQL 的 getTables API    [1528](https://github.com/cnosdb/cnosdb/pull/1528)
- 修复了未及时报告 NodeMetrics 的问题    [1541](https://github.com/cnosdb/cnosdb/pull/1541)
- 更新表格导致数据丢失的问题    [1542](https://github.com/cnosdb/cnosdb/pull/1542)
- 修复了解析 Line Protocol 时出现的错误    [1539](https://github.com/cnosdb/cnosdb/pull/1539)

## v2.3.2

发布日期：2023年8月2日

### 新增特性
- 增加监控指标 'http_data_out' [#1304](https://github.com/cnosdb/cnosdb/pull/1304)
- client 中添加 chunked 模式 [#1357](https://github.com/cnosdb/cnosdb/pull/1357)
- WAL 增加日志种类：DROP VNODE 和 DROP TABLE [#1340](https://github.com/cnosdb/cnosdb/pull/1340)
### 功能优化
- 改进 flight-sql 实现, 增加其中 do_put_prepared_statement_update 接口的实现 [#1329](https://github.com/cnosdb/cnosdb/pull/1329)
- 改进 meta watch 并且优化查询之间的交互过程 [#1314](https://github.com/cnosdb/cnosdb/pull/1314)
- 升级 datafusion 版本到 27.0.0 [#1323](https://github.com/cnosdb/cnosdb/pull/1323)
- 为 flatbuffers  模型添加一些额外的方法 [#1361](https://github.com/cnosdb/cnosdb/pull/1361)
### 问题修复
- 修复生成重复 series id 的问题 [#1301](https://github.com/cnosdb/cnosdb/pull/1301)
- 修复 sample 函数返回错误的问题 [#1296](https://github.com/cnosdb/cnosdb/pull/1296)
- 修复写入 binlog 时出现 panic 的问题 [#1309](https://github.com/cnosdb/cnosdb/pull/1309)
- 修复逻辑计划错误的 schema [#1332](https://github.com/cnosdb/cnosdb/pull/1332)
- 修复 CREATE TABLE 解析错误的问题 [#1318](https://github.com/cnosdb/cnosdb/pull/1318)
- 修复 raft_bucket json 反序列化问题 [#1347](https://github.com/cnosdb/cnosdb/pull/1347)
- 修复 arrow-flight-sql odbc 握手失败的问题 [#1336](https://github.com/cnosdb/cnosdb/pull/1336)
- 修复导入 Line Prototol 数据时提示内存不足的问题  [#1319](https://github.com/cnosdb/cnosdb/pull/1319)
- 修复 data 节点健康检查有错误的问题 [#1352](https://github.com/cnosdb/cnosdb/pull/1352)
- 修复删除表时意外删除无关列的问题 [#1363](https://github.com/cnosdb/cnosdb/pull/1363)
- 修复 client 不能通过 ca.crt 连接到 server 的问题 [#1369](https://github.com/cnosdb/cnosdb/pull/1369)
- 修复 tokio trace 过滤 [#1372](https://github.com/cnosdb/cnosdb/pull/1372)
- 修复插入 line protocol 的错误 [#1366](https://github.com/cnosdb/cnosdb/pull/1366)
### 行为变更
- 配置变更 [#1372](https://github.com/cnosdb/cnosdb/pull/1372)
- 创建数据库时默认 TTL 设置为无限长 [#1354](https://github.com/cnosdb/cnosdb/pull/1354)

## v2.3.1

发布日期：2023年6月21日

### 新增特性
- 新增trace [#1272](https://github.com/cnosdb/cnosdb/issues/1272)
- 支持滑动窗口的gap fill [#1171](https://github.com/cnosdb/cnosdb/pull/1171)
- 支持flight sql的元数据api [#1173](https://github.com/cnosdb/cnosdb/pull/1173)
- 支持授予admin权限 [#1929](https://github.com/cnosdb/cnosdb/pull/1219)
- 实现了sample函数 [#1228](https://github.com/cnosdb/cnosdb/pull/1228)
- client端支持https链接 [#1225](https://github.com/cnosdb/cnosdb/pull/1225)
### 功能优化
- 提前释放缓存分区的rwlock [#1181](https://github.com/cnosdb/cnosdb/pull/1181)
- 系统表实现查看库表功能 [#1212](https://github.com/cnosdb/cnosdb/pull/1212)
- grpc server端去掉TLS协议链接的支持 [#1216](https://github.com/cnosdb/cnosdb/pull/1216)
- 修改bucket起始时间精度为ms [#1215](https://github.com/cnosdb/cnosdb/pull/1215)
- 支持多线程写hinted handoff [#1230](https://github.com/cnosdb/cnosdb/pull/1230)
- TskvExec分区读取策略 [#1200](https://github.com/cnosdb/cnosdb/pull/1200)
- 新增修复损坏的索引文件工具 [#1238](https://github.com/cnosdb/cnosdb/pull/1238)
- Compaction消耗过多内存 [#1237](https://github.com/cnosdb/cnosdb/pull/1237)
- 在查询metrics加入host信息 [#1202](https://github.com/cnosdb/cnosdb/pull/1202)
- 添加write_data_in和sql_data_in的metrics信息 [#1241](https://github.com/cnosdb/cnosdb/pull/1241)
- 过期的WAL文件有时不会被自动删除 [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- 当某些Vnode较“冷”(很少进行写入)时，过期的WAL文件不会被自动删除 [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- 当Cache刷入磁盘时，检查WAL是否过期并删除过期的WAL [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- 优化FileManager中的一些方法 [#1268](https://github.com/cnosdb/cnosdb/pull/1268)
### 问题修复
- 迁移Vnode时复制目标Vnode导致数据丢失 [#1151](https://github.com/cnosdb/cnosdb/issues/1151)
- 元数据验证失败导致写数据失败 [#1184](https://github.com/cnosdb/cnosdb/issues/1184)
- 删除不存在的表返回状态不符合预期 [#1218](https://github.com/cnosdb/cnosdb/issues/1218)
- VNODE_DISK_STORAGE和VNODE_CACHE_SIZE监控指标统计不准确 [#1197](https://github.com/cnosdb/cnosdb/issues/1197)
- 系统表查询不到正在执行的sql [#1188](https://github.com/cnosdb/cnosdb/issues/1188)
- 导出数据时生成许多只有列名信息的空文件 [#1211](https://github.com/cnosdb/cnosdb/issues/1211)
- 更新表时未检查列编码 [#1148](https://github.com/cnosdb/cnosdb/issues/1148)
- Vnode损坏导致数据查询结果不一致 [#1192](https://github.com/cnosdb/cnosdb/issues/1192)
- 数据写入失败返回结果为success [#1084](https://github.com/cnosdb/cnosdb/issues/1084)
- 写数据时，大量标记为已删除的文件句柄，导致磁盘空间持续增长 [#1242](https://github.com/cnosdb/cnosdb/issues/1242)
- 写数据时，连接建立过多 [#1251](https://github.com/cnosdb/cnosdb/issues/1251)
- 在Docker环境中编译CnosDB元组件时发生错误 [#1266](https://github.com/cnosdb/cnosdb/issues/1266)
- 修复prom remote_read 没有返回数据的问题 [#1273](https://github.com/cnosdb/cnosdb/issues/1273)
- 导出数据时内存耗尽 [#955](https://github.com/cnosdb/cnosdb/issues/955)
- 查询数据结果不一致、结果不准确 [#1283](https://github.com/cnosdb/cnosdb/pull/1283)
- 升级版本后，DB recovery非常慢 [#1180](https://github.com/cnosdb/cnosdb/issues/1180)
- describle tables/databases 语法解析错误 [#1160](https://github.com/cnosdb/cnosdb/issues/1160)
- 数据导入内存占用过高导致OOM，最终数据写入失败 [#1141](https://github.com/cnosdb/cnosdb/issues/1141)
- 移动Vnode时，设置了错误的seq_no参数 [#1175](https://github.com/cnosdb/cnosdb/pull/1175)
- sql执行报"Not a field name" [#1033](https://github.com/cnosdb/cnosdb/issues/1033)
- 外部表数据导入进来会覆盖原表数据 [#1131](https://github.com/cnosdb/cnosdb/issues/1131)
### 行为变更
- show tables结果显示的Table变更为table_name [#1212](https://github.com/cnosdb/cnosdb/pull/1212)
## v2.3.0

2023年05月09日，CnosDB 发布 V2.3.0 版。该版本主要增加了流计算能力以及一些企业版功能。这个版本的主要修改还包括：

- 增强了查询功能，现在支持滚动窗口、滑动窗口以及流式计算。
- 对查询迭代器进行了并行化处理，从而极大提升了查询性能。
- 新增了一些问题定位的工具，包括使用 CPU/Memory pprof和异步调用堆栈打印。
- 进一步完善了测试用例系统，包括完善门禁测试用例和增加对SQLLogicTest 的支持。
- 支持 OpenTSDB 写入协议。
- HTTP请求现在支持流式处理方式，有效减少了数据库的内存占用。
- 在企业版本中，增加了订阅和分级存储的支持。欢迎与我们联系。

此外，还修复了一些 bug。

## v2.2.0

2023年03月01日，CnosDB 发布 V2.2.0 版。该版本主要增加了存算分离模式并对分布式的性能和稳定性进一步增强，并继续保持开源。这个版本的主要修改还包括：

- 支持Prometheus Remote Read/Write API。
- 提高性能：增加索引和文件索引的缓存。
- 重构coodinator和watch的代码，提高性能并增强稳定性。
- 支持多种启动模式： 存算一体、分离和单机模式启动。
- 完善监控metric并增加内存限制以防止oom。
- 完善运维功能，增加copy/move/drop vnode的功能。
- 增加count下推，优化count(*)，大幅提升了count的性能。
- 增加多线程flush，减少写入时内存copy，优化一些锁的使用，提高了写入性能。

此外，还有一系列bug修复。


## v2.1.0

2023年01月10日，CnosDB 发布 V2.1.0 版。该版本发布了CnosDB2.0分布式集群版本，并继续保持开源。这个版本的主要修改还包括：

- 新增了支持分布式集群的元数据服务和协调者服务。
- 引入了RBAC权限系统，通过SQL支持用户管理、角色管理和权限管理。
- 重构了倒排索引，解决了索引放大的问题。
- 查询上新增了展示正在执行的query和停掉正在执行的query的功能。
- 统一了对用户的错误码返回，使其更加清晰、简洁。
- 新增了针对多租户场景下的quota支持。

此外，还包括一系列metric指标和性能优化，以及bug修复等。

## V2.0.1

2022年11月08日，CnosDB 发布 V2.0.1 版。该版本修复了CnosDB部分重点错误，并且更新了一些必要的新功能，更新细节如下：

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

2022年10月24日，CnosDB 发布 V2.0.0 版本。
这次的版本发布是一个新的开始，我们基于Rust重新构建了CnosDB时序数据库，提升了CnosDB的性能，增强了CnosDB的易用性，也使CnosDB更加适应云生态的要求。

**特色功能：**
- 专为时序数据设计的存储引擎，优化写操作，支持删除和更新操作；
- 压缩算法由用户灵活指定，压缩比可调；
- 基于Apache Arrow及Datafusion 实现了查询引擎；
- 支持标准SQL，支持Schemaless 写入；
- 多索引优化了查询效率；
- 生态友好，支持RESTful接口，支持Telegraf、Grafana等通用第三方生态组件。