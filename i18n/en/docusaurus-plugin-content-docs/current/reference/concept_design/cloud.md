---
title: Cloud Native
order: 6
---

# Cloud Native

### Basic Concepts of Cloud Native

Cloud-native time series Database is a kind of Database as a Service (DBaaS), which completes the construction, deployment and delivery of the database through the cloud platform. It is primarily a cloud platform that provides services, providing models that allow organizations, end users and respective applications to store, manage and retrieve data from the cloud. Cloud databases provide a scalable and reliable database solution. Clients have service levels specific to their cloud environment. It is deployed in a non-virtualized environment, making the full extent of the underlying hardware available for the database.

### Advantage of Cloud Native Database

For example, cloud database services provided by cloud service providers such as AWS, Microsoft Azure, Ali Cloud, Google Cloud, and CnosDB have contributed to the development of cloud-native databases. As a result, the market share of cloud databases has been growing rapidly in recent years. More and more enterprises and organizations are migrating their business from local data centers to the cloud. Cloud platforms provide high elasticity, strict service level agreements to ensure reliability and ease of management, while reducing operational costs. Cloud databases play a key role in supporting cloud-based business. It becomes the central hub connecting the underlying resources to various applications, making it a critical system for the cloud.

- Better security. A cloud-native database may seem like a very remote and invisible place to store valuable information. It is more secure than users think. With the help of proper antivirus and firewall and some rules, data can be effectively protected. In addition, keeping up to date software technologies guarantees that cloud computing can provide a higher quality of data protection for businesses dealing with sensitive information.
- More available space. This is one of the most useful aspects of cloud-native databases, which can store large amounts of data without multiple USB drives.
- Enhance collaboration. With a database accessible from anywhere in this service, cloud-native databases create the perfect collaboration tool, especially for colleagues who are geographically distributed, making it easy for all team members to collaborate without the danger of losing or duploking work.
- Cost effective. Cloud-native databases are cost-effective because paying for unlimited storage in the cloud at one time is more cost-effective than having to purchase or repair multiple hard drives in a row. If we buy relatively cheap hard drives, they are easily lost or damaged, so they are costly to maintain in the long run. So, with this cloud-native database, users can buy as much storage space as they need related to their workflow.
- Redundancy. Cloud computing provides replicas and systems that can be used in the event of failure. These replicas can be accessed by replicating the data on multiple computers within the same database. These services help users ensure that their information is always available to them, even if something unexpected happens.
- Highly scalable. The cloud native distributed database is separated from the underlying cloud computing infrastructure, so it can flexibly mobilize resources in time to expand or shrink, so as to calmly cope with the pressure brought by the surge in traffic and the waste caused by excess resources during the traffic valley. The characteristics of ecological compatibility also make the cloud native database have strong portability.
- Ease of use. The cloud-native distributed database is easy to use, and its computing nodes are deployed in the cloud and can be accessed from multiple frontends anytime and anywhere. Because the cluster is deployed on the cloud, the impact of a single point of failure on the service is very small through automated disaster recovery and high availability. When the service needs to be upgraded or replaced, the nodes can also be upgraded by rotation without interrupting the service.
- Fast iteration. Each service in the cloud-native distributed database is independent of each other, and the update of a single service will not affect other parts. In addition, cloud-native development testing and operations tools are highly automated, which allows for more agile updates and iterations.
- Cost savings. Building a data center is an independent and complete project that requires a large amount of hardware investment and professional operations personnel to manage and maintain the data center. Continuous operation and maintenance can also cause a lot of financial pressure. Cloud-native distributed databases obtain a scalable database and achieve more optimized resource allocation at a lower upfront cost.

### Shared Storage VS Shared-Nothing Storage

A shared memory architecture is a storage system that is used by multiple users/computers. It stores all files in a centralized storage pool and allows multiple users to access them simultaneously. For the upper computing nodes, the shared memory architecture provides a uniform data access interface for multiple users, and users do not need to care about the actual data distribution in the system, nor do they need to care about the load balancing problem of data distribution. In the shared storage architecture, cloud vendors can pool disk resources, let multiple users share a distributed storage cluster, and pay according to the actual use of capacity. This business model is more in line with the current market demand. The diagram is as follows:

![共享存储架构](/img/share_everything.png)

The shared-nothing storage architecture is a relatively old pattern that has recently seen a resurgence in data storage technologies, especially in the NoSQL, data warehousing, and big data domains. As the architecture evolves, it has some very interesting performance tradeoffs compared to the more common simple shared memory architecture.

Shared-nothing architecture is an architecture used for distributed computing, where each node is independent and different nodes are interconnected through a network. Each node consists of a processor, main memory, and disk. The main motivation for this architecture is to eliminate contention between nodes. The nodes here do not share memory or storage. Disks have a single node that cannot be shared. It works effectively in high volume and read/write environments. The diagram is shown below.

![无共享存储架构](/img/share_nothing.png)


##  Single Tenant Model VS Multi Tenant Model

Single tenant model means that only one cloud software solution instance is running on its supported hardware and infrastructure components. Not shared with multiple customers involved in a single-tenant environment. In a multi-tenant environment, the cloud infrastructure is shared among multiple customers or accounts. No single customer has control over how resources are allocated or consumed.

CnosDB uses a multi-tenant model. Multi-tenancy is a solution to provide Software as a Service (SaaS) in the cloud. Multi-tenancy uses a shared infrastructure to provide access to a SaaS solution to multiple customers. Multi-tenancy means that a single instance of the software and its supporting infrastructure serve multiple customers. Each customer shares the software application and also shares a database. Each tenant's data is isolated and not visible to other tenants.


#### Advantages of Multi Tenant Model

- Low cost: Multiple customers imply shared environment costs, and these savings (from SaaS providers) are often transferred into software costs.
- Integration: The cloud environment allows easier integration with other applications through the use of apis.
- Easy to maintain: The server is technically owned by the SaaS vendor, which means that some level of database maintenance is handled by the vendor rather than you maintaining the environment yourself.

The multi-tenancy model of cloud-native time series database is usually a SaaS multi-tenancy model. Compared with the previous single-tenant model, it has many advantages.

- Cost reduction through economies of scale: With multi-tenancy, scaling has a much smaller impact on the infrastructure than with single-tenant hosting solutions because new users have access to the same basic software.
- Shared infrastructure leads to cost reduction: SaaS allows companies of all sizes to share infrastructure and data center operating costs. There is no need to add applications and more hardware to their environment. There is no need to configure or manage any infrastructure or software outside of internal resources, enabling enterprises to focus on their daily tasks.
- Continuous maintenance and updates: Customers can keep their software up to date without paying expensive maintenance. Vendors roll out new features and updates. These are often included in SaaS subscriptions.
- Configuration can be done while keeping the underlying codebase unchanged: Single-tenant hosting solutions are often custom and require changes to the application's code. This customization is costly, and upgrading is time consuming because the upgrade may not be compatible with your environment.


Multi-tenant solutions are designed to be highly configurable so that enterprises can make applications run the way they want. No code or data structures need to be changed, making the upgrade process simple.

Multi-tenant architectures also allow database products to efficiently serve everyone, from small customers whose scale may not warrant dedicated infrastructure, to large enterprises that need access to virtually unlimited cloud computing resources. Software development and maintenance costs are amortized, resulting in lower expenditures, resulting in cost savings for users.

### Serverless VS Dedicate

#### Serverless Introduction

As a new cloud computing paradigm, Serverless architecture is a revolutionary architecture in the cloud native era, which subverts the traditional understanding of software application deployment and operation. Serverless is a cloud-native development model that allows developers to build and run applications without managing servers. There are still servers in Serverless, but they are abstracted from application development. Cloud providers handle the day-to-day work of configuring, maintaining, and scaling the server infrastructure. Developers can simply package their code into containers for deployment. Once deployed, the Serverless application responds to demand and automatically scales up and down as needed. Serverless offerings from public cloud providers are typically metered on demand through an event-driven execution model. Therefore, when the Serverless service is idle, it incurs no cost.

The Serverless pattern differs from other cloud computing models in that the cloud provider is responsible for managing the scaling of the cloud infrastructure and applications. Serverless applications are deployed in containers that start automatically on demand when called.

Under the standard Infrastructure as a Service (IaaS) cloud computing model, users pre-purchase units of capacity, which means that users need to pay public cloud providers for alway online server components to run their applications. It is the user's responsibility to expand the server capacity when demand is high and to shrink it when that capacity is no longer needed. The cloud infrastructure required to run the application is active even when the application is unused.

In contrast, for Serverless architectures, applications are started only when needed. When an event triggers the application code to run, the public cloud provider dynamically allocates resources for that code. When the code finishes executing, the user stops paying. In addition to cost and efficiency advantages, Serverless frees developers from routine and trivial tasks related to application scaling and server configuration.

With Serverless, everyday tasks such as managing the operating system and file system, security patching, load balancing, capacity management, scaling, logging, and monitoring are offloaded to the cloud service provider, reducing the human cost required by the user.


#### Advantage of Serverless

- Serverless can increase developer productivity and reduce operational costs. Freed from the daily tasks of configuring and managing servers, developers have more time to focus on their application development efforts.
- Serverless facilitates DevOps adoption because it reduces the need for developers to explicitly describe the infrastructure they need to operate to configure for them.
- Further simplifying application development by incorporating entire components from third-party Backend as a Service (BaaS) products.
- The operational cost of the Serverless model is reduced because the user can pay for the cloud-based computing time as needed instead of running and managing its servers all the time.

#### Disadvantage of Serverless

- Not running your own server or controlling your own server-side logic can create corresponding problems.
- Cloud providers may have strict restrictions on how their components interact, which in turn affects the flexibility and degree of customization of the user's own system. In a BaaS environment, developers may rely on services whose code is not under their control.
- Giving up control over these aspects of the IT stack also leaves users vulnerable to vendor lock-in. The decision to switch suppliers may also be accompanied by the cost of upgrading the system to conform to the new supplier specification.


#### Dedicated Introduction

Dedicate mode, that is, one client for each server, which is the service method used by traditional database vendors. Dedicate model can effectively solve the shortcomings of Serverless, but it does not have the advantages of Serverless.

### Serverless or Dedicate

Serverless and Dedicate each have their own advantages, so when making a package choice, you can refer to the following content to complete the selection.
- Serverless
    - When automatic elastic scaling is required. Automatically scale up/down and react instantly to changes in requirements. This is especially critical for businesses with dramatically increasing or unpredictable workloads.
    - When minimization is required. Your team can spend less time worrying about the database and more time building your application.
    - When testing, experimenting, or evaluating. Suitable for lightweight applications, prototyping, testing and development environments, side projects, etc., because they are self-service and fast.
    - When cost minimization is required. Charges are based on actual storage and computation usage. The resources allocated by the database automatically increase and decrease with demand.
- Dedicate
    - When hardware control is required. Severless is cloud-based and does not control the hardware. Solutions that can control hardware are needed for security or regulatory reasons.
    - When a deep feature set is needed. Serverless features are still relatively limited. Some companies need a database with multiple regional capabilities.
    - When security concerns are excluded from multi-tenancy. In the end, tenants still share the same machine. For high-security workloads, Dedicate has its advantages.
    - When providing better performance or less cost. Severless is the best choice for many use cases, but there is no "perfect" database solution that meets all possible use cases/workloads.

Based on the above references, users can choose the appropriate package type for their needs and usage situation. CnosDB can provide users with Serverless and Dedicate two package modes to meet the needs of users to the greatest extent.