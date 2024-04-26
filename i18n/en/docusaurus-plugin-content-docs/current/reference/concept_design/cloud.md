---
title: Cloud Native
order: 6
---

# Cloud Native

### Basic Concepts of Cloud Native

Cloud-native time series Database is a kind of Database as a Service (DBaaS), which completes the construction, deployment and delivery of the database through the cloud platform. It is primarily a cloud platform that provides services, providing models that allow organizations, end users and respective applications to store, manage and retrieve data from the cloud. Cloud databases provide a scalable and reliable database solution. Clients have service levels specific to their cloud environment. It is deployed in a non-virtualized environment, making the full extent of the underlying hardware available for the database.其主要是一个提供服务的云平台，提供模型，允许组织、最终用户和各自的应用程序从云中存储、管理和检索数据。Better security. A cloud-native database may seem like a very remote and invisible place to store valuable information. It is more secure than users think. With the help of proper antivirus and firewall and some rules, data can be effectively protected. In addition, keeping up to date software technologies guarantees that cloud computing can provide a higher quality of data protection for businesses dealing with sensitive information.客户端有针对其云环境的服务级别。它部署在非虚拟化环境中，使底层硬件的全部都可以用于数据库。

### Advantage of Cloud Native Database

For example, cloud database services provided by cloud service providers such as AWS, Microsoft Azure, Ali Cloud, Google Cloud, and CnosDB have contributed to the development of cloud-native databases. As a result, the market share of cloud databases has been growing rapidly in recent years. More and more enterprises and organizations are migrating their business from local data centers to the cloud. Cloud platforms provide high elasticity, strict service level agreements to ensure reliability and ease of management, while reducing operational costs. Cloud databases play a key role in supporting cloud-based business. It becomes the central hub connecting the underlying resources to various applications, making it a critical system for the cloud.因此，近年来云数据库的市场份额一直在快速增长。越来越多的企业和组织将其业务从本地数据中心迁移到云端。云平台提供高弹性、严格的服务级别协议以确保可靠性和易于管理，同时降低运营成本。云数据库在支持基于云的业务方面发挥着关键作用。它成为将底层资源连接到各种应用程序的中心枢纽，使其成为云的关键系统。

- 更好的安全性。云原生数据库可能看起来像是一个非常遥远且无形的地方来存储有价值的信息。它比用户想象的更安全。在适当的防病毒和防火墙以及一些规则的帮助下，可以有效保护数据。此外，保持最新的软件技术保证了云计算可以为处理敏感信息的业务提供更高质量的数据保护。
- 更多可用空间。More available space. This is one of the most useful aspects of cloud-native databases, which can store large amounts of data without multiple USB drives.
- 加强协作。Enhance collaboration. With a database accessible from anywhere in this service, cloud-native databases create the perfect collaboration tool, especially for colleagues who are geographically distributed, making it easy for all team members to collaborate without the danger of losing or duploking work.
- 成本效益。Cost effective. Cloud-native databases are cost-effective because paying for unlimited storage in the cloud at one time is more cost-effective than having to purchase or repair multiple hard drives in a row. If we buy relatively cheap hard drives, they are easily lost or damaged, so they are costly to maintain in the long run. So, with this cloud-native database, users can buy as much storage space as they need related to their workflow.如果我们购买相对便宜的硬盘，它们很容易丢失或损坏，因此从长远来看，它们的维护成本很高。因此，通过此云原生数据库，用户可以购买与工作流程相关的尽可能多的存储空间。
- 冗余。云计算提供可在发生故障时使用的副本和系统。通过在同一数据库内的多台计算机上复制数据，可以访问这些副本。这些服务可帮助用户确保他们的信息始终可供他们使用，即使情况发生意外情况也是如此。
- 高扩展性。Highly scalable. The cloud native distributed database is separated from the underlying cloud computing infrastructure, so it can flexibly mobilize resources in time to expand or shrink, so as to calmly cope with the pressure brought by the surge in traffic and the waste caused by excess resources during the traffic valley. The characteristics of ecological compatibility also make the cloud native database have strong portability.Configuration can be done while keeping the underlying codebase unchanged: Single-tenant hosting solutions are often custom and require changes to the application's code. This customization is costly, and upgrading is time consuming because the upgrade may not be compatible with your environment.
- 易用性。Ease of use. The cloud-native distributed database is easy to use, and its computing nodes are deployed in the cloud and can be accessed from multiple frontends anytime and anywhere. Because the cluster is deployed on the cloud, the impact of a single point of failure on the service is very small through automated disaster recovery and high availability. When the service needs to be upgraded or replaced, the nodes can also be upgraded by rotation without interrupting the service.因其集群部署在云上，通过自动化的容灾与高可用能力，单点失败对服务的影响非常小。当需要升级或更换服务时，还可以对节点进行不中断服务的轮转升级。
- 快速迭代。Fast iteration. Each service in the cloud-native distributed database is independent of each other, and the update of a single service will not affect other parts. In addition, cloud-native development testing and operations tools are highly automated, which allows for more agile updates and iterations.此外，云原生的研发测试和运维工具高度自动化，也就可以实现更加敏捷的更新与迭代。
- 节约成本。Cost savings. Building a data center is an independent and complete project that requires a large amount of hardware investment and professional operations personnel to manage and maintain the data center. Continuous operation and maintenance can also cause a lot of financial pressure. Cloud-native distributed databases obtain a scalable database and achieve more optimized resource allocation at a lower upfront cost.Redundancy. Cloud computing provides replicas and systems that can be used in the event of failure. These replicas can be accessed by replicating the data on multiple computers within the same database. These services help users ensure that their information is always available to them, even if something unexpected happens.

### Shared Storage VS Shared-Nothing Storage

A shared memory architecture is a storage system that is used by multiple users/computers. It stores all files in a centralized storage pool and allows multiple users to access them simultaneously. For the upper computing nodes, the shared memory architecture provides a uniform data access interface for multiple users, and users do not need to care about the actual data distribution in the system, nor do they need to care about the load balancing problem of data distribution. In the shared storage architecture, cloud vendors can pool disk resources, let multiple users share a distributed storage cluster, and pay according to the actual use of capacity. This business model is more in line with the current market demand. The diagram is as follows:它将所有文件存储在一个集中的存储池中，并允许多个用户同时访问它们。对于上层计算节点，共享存储架构为多个用户提供了统一的数据访问接口，用户不需要关心数据在系统中实际分布情况，也不需要关心数据分布的负载均衡问题。在共享存储架构下，云厂商可以将磁盘资源池化，让多个用户共享一个分布式存储集群，按照实际使用的容量付费。这种商业经营模式更符合当前市场需求。其示意图如下所示：

![共享存储架构](/img/share_everything.png)

The shared-nothing storage architecture is a relatively old pattern that has recently seen a resurgence in data storage technologies, especially in the NoSQL, data warehousing, and big data domains. As the architecture evolves, it has some very interesting performance tradeoffs compared to the more common simple shared memory architecture.随着架构的发展，与更常见的简单共享存储架构相比，它有一些非常有趣的性能折衷。

Shared-nothing architecture is an architecture used for distributed computing, where each node is independent and different nodes are interconnected through a network. Each node consists of a processor, main memory, and disk. The main motivation for this architecture is to eliminate contention between nodes. The nodes here do not share memory or storage. Disks have a single node that cannot be shared. It works effectively in high volume and read/write environments. The diagram is shown below.每个节点都由处理器、主内存和磁盘组成。这种架构的主要动机是消除节点之间的争用。这里的节点不共享内存或存储。磁盘具有无法共享的单个节点。它在高容量和读写环境中有效工作。其示意图如下所示。

![无共享存储架构](/img/share_nothing.png)

### Single Tenant Model VS Multi Tenant Model

Single tenant model means that only one cloud software solution instance is running on its supported hardware and infrastructure components. Not shared with multiple customers involved in a single-tenant environment. In a multi-tenant environment, the cloud infrastructure is shared among multiple customers or accounts. No single customer has control over how resources are allocated or consumed.不会与单租户环境中涉及的多个客户共享。When security concerns are excluded from multi-tenancy. In the end, tenants still share the same machine. For high-security workloads, Dedicate has its advantages.没有任何一个客户可以控制资源的分配或消耗方式。

Advantages of Multi Tenant Model多租户是提供云软件即服务（SaaS，Software as a Service）的一种解决方案。CnosDB uses a multi-tenant model. Multi-tenancy is a solution to provide Software as a Service (SaaS) in the cloud. Multi-tenancy uses a shared infrastructure to provide access to a SaaS solution to multiple customers. Multi-tenancy means that a single instance of the software and its supporting infrastructure serve multiple customers. Each customer shares the software application and also shares a database. Each tenant's data is isolated and not visible to other tenants.多租户意味着软件的单个实例及其支持的基础设施服务于多个客户。每个客户共享软件应用程序，还共享一个数据库。每个租户的数据都是隔离的，并且对其他租户不可见。

#### 多租户的潜在好处

- Low cost: Multiple customers imply shared environment costs, and these savings (from SaaS providers) are often transferred into software costs.
- Integration: The cloud environment allows easier integration with other applications through the use of apis.
- Easy to maintain: The server is technically owned by the SaaS vendor, which means that some level of database maintenance is handled by the vendor rather than you maintaining the environment yourself.

The multi-tenancy model of cloud-native time series database is usually a SaaS multi-tenancy model. Compared with the previous single-tenant model, it has many advantages.相比以往的单租户模型，其有着诸多优势。

- Cost reduction through economies of scale: With multi-tenancy, scaling has a much smaller impact on the infrastructure than with single-tenant hosting solutions because new users have access to the same basic software.
- Shared infrastructure leads to cost reduction: SaaS allows companies of all sizes to share infrastructure and data center operating costs. There is no need to add applications and more hardware to their environment. There is no need to configure or manage any infrastructure or software outside of internal resources, enabling enterprises to focus on their daily tasks.无需向其环境添加应用程序和更多硬件。无需配置或管理内部资源之外的任何基础架构或软件，使企业能够专注于日常任务。
- Continuous maintenance and updates: Customers can keep their software up to date without paying expensive maintenance. Vendors roll out new features and updates. These are often included in SaaS subscriptions.供应商推出新功能和更新。这些通常包含在 SaaS 订阅中。
- 可以在保持底层代码库不变的情况下完成配置：单租户托管解决方案通常是定制的，需要更改应用程序的代码。这种定制的成本很高，而且升级很耗时，因为升级可能与您的环境不兼容。

多租户解决方案被设计为高度可配置的，这样企业就可以让应用程序以他们想要的方式运行。无需更改代码或数据结构，使升级过程变得简单。

Multi-tenant architectures also allow database products to efficiently serve everyone, from small customers whose scale may not warrant dedicated infrastructure, to large enterprises that need access to virtually unlimited cloud computing resources. Software development and maintenance costs are amortized, resulting in lower expenditures, resulting in cost savings for users.软件开发和维护成本是分摊的，从而降低了支出，从而为用户带来了成本的节约。

### Serverless VS Dedicate

#### Serverless Introduction

As a new cloud computing paradigm, Serverless architecture is a revolutionary architecture in the cloud native era, which subverts the traditional understanding of software application deployment and operation. Serverless is a cloud-native development model that allows developers to build and run applications without managing servers. There are still servers in Serverless, but they are abstracted from application development. Cloud providers handle the day-to-day work of configuring, maintaining, and scaling the server infrastructure. Developers can simply package their code into containers for deployment. Once deployed, the Serverless application responds to demand and automatically scales up and down as needed. Serverless offerings from public cloud providers are typically metered on demand through an event-driven execution model. Therefore, when the Serverless service is idle, it incurs no cost. Dedicate mode, that is, one client for each server, which is the service method used by traditional database vendors. Dedicate model can effectively solve the shortcomings of Serverless, but it does not have the advantages of Serverless.Serverless 中仍然有服务器，但它们是从应用程序开发中抽象出来的。云提供商处理配置、维护和扩展服务器基础设施的日常工作。开发人员可以简单地将他们的代码打包到容器中进行部署。部署后，Serverless 应用程序会响应需求并根据需要自动扩大和缩小规模。来自公共云提供商的Serverless产品通常通过事件驱动的执行模型按需计量。因此，当 Serverless 服务闲置时，它不会产生任何成本。

The Serverless pattern differs from other cloud computing models in that the cloud provider is responsible for managing the scaling of the cloud infrastructure and applications. Serverless applications are deployed in containers that start automatically on demand when called.无服务器应用程序部署在容器中，容器在调用时会按需自动启动。

Under the standard Infrastructure as a Service (IaaS) cloud computing model, users pre-purchase units of capacity, which means that users need to pay public cloud providers for alway online server components to run their applications. It is the user's responsibility to expand the server capacity when demand is high and to shrink it when that capacity is no longer needed. The cloud infrastructure required to run the application is active even when the application is unused.用户有责任在需求高时扩大服务器容量，并在不再需要该容量时缩减服务器容量。即使应用程序未被使用，运行应用程序所需的云基础设施也是活跃的。

相比之下，对于 Serverless 架构，应用程序仅在需要时启动。In contrast, for Serverless architectures, applications are started only when needed. When an event triggers the application code to run, the public cloud provider dynamically allocates resources for that code. When the code finishes executing, the user stops paying. In addition to cost and efficiency advantages, Serverless frees developers from routine and trivial tasks related to application scaling and server configuration.当代码完成执行时，用户停止支付。Serverless can increase developer productivity and reduce operational costs. Freed from the daily tasks of configuring and managing servers, developers have more time to focus on their application development efforts.

With Serverless, everyday tasks such as managing the operating system and file system, security patching, load balancing, capacity management, scaling, logging, and monitoring are offloaded to the cloud service provider, reducing the human cost required by the user.

#### Advantage of Serverless

- Serverless 可以提高开发人员的工作效率并降低运营成本。Multi-tenant solutions are designed to be highly configurable so that enterprises can make applications run the way they want. No code or data structures need to be changed, making the upgrade process simple.
- Serverless facilitates DevOps adoption because it reduces the need for developers to explicitly describe the infrastructure they need to operate to configure for them.
- Further simplifying application development by incorporating entire components from third-party Backend as a Service (BaaS) products.
- The operational cost of the Serverless model is reduced because the user can pay for the cloud-based computing time as needed instead of running and managing its servers all the time.

#### Disadvantage of Serverless

- Not running your own server or controlling your own server-side logic can create corresponding problems.
- Cloud providers may have strict restrictions on how their components interact, which in turn affects the flexibility and degree of customization of the user's own system. In a BaaS environment, developers may rely on services whose code is not under their control.在 BaaS 环境中，开发人员可能会依赖于其代码不受其控制的服务。
- 放弃对 IT 堆栈这些方面的控制也会使用户容易被供应商锁定。Giving up control over these aspects of the IT stack also leaves users vulnerable to vendor lock-in. The decision to switch suppliers may also be accompanied by the cost of upgrading the system to conform to the new supplier specification.

#### Dedicated Introduction

Dedicate模式，也就是一个客户端对应一个服务器的服务方式，这是传统数据库厂商所采用的服务方式。Dedicate 模式可以有效解决 Serverless 的缺点，但是其也不具备 Serverless 的优点。

### Serverless or Dedicate

Serverless and Dedicate each have their own advantages, so when making a package choice, you can refer to the following content to complete the selection.

- Serverless
  - 需要自动弹性扩展时。When automatic elastic scaling is required. Automatically scale up/down and react instantly to changes in requirements. This is especially critical for businesses with dramatically increasing or unpredictable workloads.对工作负荷剧增或不可预测的企业尤为关键。
  - 需要最小化操作时。When minimization is required. Your team can spend less time worrying about the database and more time building your application.
  - 测试、实验或者评估时。When testing, experimenting, or evaluating. Suitable for lightweight applications, prototyping, testing and development environments, side projects, etc., because they are self-service and fast.
  - 需要最小化成本时。根据实际存储和计算使用量收费。When cost minimization is required. Charges are based on actual storage and computation usage. The resources allocated by the database automatically increase and decrease with demand.
- Dedicate
  - 需要对硬件进行控制时。Severless是基于云的，不能控制硬件。When hardware control is required. Severless is cloud-based and does not control the hardware. Solutions that can control hardware are needed for security or regulatory reasons.
  - 需要一个深入的功能集时。Serverless的功能目前还相对较少。When a deep feature set is needed. Serverless features are still relatively limited. Some companies need a database with multiple regional capabilities.
  - 安全问题排除在多租户之外时。Severless归根结底租户仍共享同一台机器。高安全性工作负载，Dedicate 有其优势。
  - 提供更好的性能或成本更低时。When providing better performance or less cost. Severless is the best choice for many use cases, but there is no "perfect" database solution that meets all possible use cases/workloads.

根据上述参考内容，用户可以针对自己的需求和使用情况选出合适的套餐类型。Based on the above references, users can choose the appropriate package type for their needs and usage situation. CnosDB can provide users with Serverless and Dedicate two package modes to meet the needs of users to the greatest extent.
