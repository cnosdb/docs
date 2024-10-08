---
sidebar_position: 8
---

# 云原生

云原生技术有利于各组织在公有云、私有云和混合云等新型动态环境中，构建和运行可弹性扩展的应用。云原生的代表技术包括容器、服务网格、微服务、不可变基础设施和声明式API。
这些技术能够构建容错性好、易于管理和便于观察的松耦合系统。结合可靠的自动化手段，云原生技术使工程师能够轻松地对系统作出频繁和可预测的重大变更。 From CNCF

## 数据库云原生的优势

### 高扩展性

高扩展性即更加灵活的数据库扩容与缩容能力，云原生数据库采用资源解耦方式，将数据进行分布式存储并与云计算设施相分离，当流量增加时进行扩容以满足需求，流量减小时进行缩容以避免资源浪费。分布式存储、资源解耦、生态兼容等特点也增加了云原生数据库的可迁移性。

### 易用性与稳定性

易用性体现在云原生数据库计算节点的云部署上，因为功能被集成在了云端，用户只需要通过前端的接口便可以访问使用；稳定性则更多体现在数据的分布式存储上，分布式存储大大减少了单点失败对服务器的影响，数据也更加安全。

### 节约成本

传统数据库存储与计算的耦合需要大量单独成套的硬件设备，这意味着在硬件上将花费大量的投资且需要由专人负责维护。除此之外，维护、扩展服务器所花费的支出也是相当巨大的。而云原生数据库不仅投资成本低，在数据库维护与扩展等方面也更加节约成本。



## CnosDB的云原生化

CnosDB 本身开发经历了单体到分布式的发展历程，支持 singleton， 存算一体，存算分离的架构。

### Operator

#### 架构

CnosDB-Operator 架构基于 Kubernetes Operator 模式，包括以下核心组件：

- CRD（Custom Resource Definition）：定义了 CnosDB 资源的规范和模式.
  - CnosdbCluster：用于描述用户期望的CnosDB集群。
  - CnosdbBackup：用于描述用户期望的备份工作。
  - CnosdbBackupRecover：用于描述用户期望的备份恢复工作。
- 控制器（Controller）：负责监视和管理 CnosDB 资源。它根据资源的状态和规范，执行创建、更新和删除操作，以确保 CnosDB 集群的一致性和配置的正确性。
- 架构图如下：

- ![img](/img/reference_concept_design_cloud_1.png)

#### 工作原理

流程图如下：

![img](/img/reference_concept_design_cloud_2.png)

如图所示，operator以用户定义的cr为最终目标，通过监控集群资源的变化，不断与k8s的api交互，最终使集群内的资源达到用户期望的运行状态。

### 功能

- 部署

当用户创建一个 CnosdbCluster 的 CR 后，Operator 会根据CR的配置创建集群实例。支持单体，存算一体，存算分离等部署模式。

- 扩容/缩容

扩容/缩容支持水平和垂直两种模式。水平扩缩容通过修改CR中的replicas数值。垂直扩缩容则是修改 CR 中节点所需资源的数量。基于CnosDB自带的功能，可以更便捷的实现安全缩容，保证数据完整性。

- 故障自动迁移

Operator 启动后会一直监听已部署的 CnosDB 集群。当 operator 观测到 pod 的变化时会根据 pod 的类型触发对应类型 pod 的调谐。pod的调谐可以细分为 meta，query，tskv 的调谐。

- 备份/恢复

通过创建 BackupTask 和 Restore两种CR可以分别实现备份和恢复功能。备份策略支持手动触发和定时备份。备份和恢复支持本地和远端（比如s3）两种情况。

- 监控告警

开启监控告警功能后，会通过 prometheus 采集和监控包括 CnosDB 集群中健康的pod数量、集群的运行时间、集群发生故障迁移的次数、集群相关的 cpu、memory、disk 等参数指标。

### cnosdb-cloud

helm和operator都是 CnosDB 支持的云原生部署方式，适合用户自己做私有化部署，可以是自己搭建的k8s集群或者私有云。同时，针对感兴趣的用户，CnosDB 也开发了部署在 aws 公有云上的cloud项目。为用户提供 CnosDB 项目 DBaaS 使用环境：https://cnosdb.cloud。

优势：

1、提供用户试用 CnosDB 的机会，避免环境配置的困扰。

2、对于数据量需求偏小的用户，提供更低成本的 CnosDB 方案。
