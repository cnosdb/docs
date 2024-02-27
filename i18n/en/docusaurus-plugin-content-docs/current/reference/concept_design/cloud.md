---
title: Cloud Native
order: 6
---

# Cloud Native

### Cloud Native Concepts

The cloud time series database is a database service (Datdatabase as a Service, DBaaS) that completes the construction, deployment and delivery of the database through the cloud platform.It is primarily a service cloud platform that provides models that allow organizations, end-users and their respective applications to store, manage and retrieve data from the cloud.The cloud database provides extensive, reliable database solutions.Clients have a service level for their cloud environment.It is deployed in a non-virtualized environment so that all bottom hardware can be used in databases.

### Advantages of cloud native databases

For example, cloud database services provided by cloud service providers such as AWS, Microsoft Azure, Aliyun, Google Cloud, and CnosDB have contributed to the development of the cloud-origin database.As a result, the market share of the cloud database has been growing rapidly in recent years.An increasing number of businesses and organizations have migrated their operations from local data centres to clouds.The cloud platform provides high-element, rigorous service-level agreements to ensure reliability and ease of management, while reducing operating costs.Cloud databases play a key role in supporting cloud-based operations.It serves as a central hub for connecting underlying resources to various applications, making them a key system for clouds.

- Better security.The cloud database may look like a very distant and intangible place to store valuable information.It is safer than users imagine.Data can be effectively protected with the help of appropriate anti-virus and firewalls and some rules.In addition, maintaining up-to-date software technology ensures that cloud computing provides better quality data protection for operations processing sensitive information.
- More free space.This is one of the most useful aspects of the cloud native database that can store large amounts of data without multiple USB drives.
- Strengthen collaboration.Through this service, the database can be accessed from anywhere and the native database has created perfect collaboration tools, especially among colleagues located in various locations, allowing all team members to work easily without the risk of loss or duplication of work.
- Cost-effectiveness.The cloud origin database is cost-effective, as it is more cost-effective to store indefinitely in the clouds than to have to purchase or maintain multiple hard drives on a continuous basis.If we buy relatively cheap hard drives, they can easily be lost or damaged, and therefore their maintenance costs are high in the long run.Thus, through this cloud database users can purchase as many storage space associated with the workflow.
- Redundation.Cloud calculation provides copies and systems that can be used in case of failure.These copies can be accessed by copying data on multiple computers in the same database.These services can help users to ensure that their information is always available to them, even in unforeseen circumstances.
- High extension.The separation of the cloud distribution database from the base cloud infrastructure allows the flexible and timely mobilization of resources for scaling-up in order to respond to the pressures of surge flows and the wastage of excessive resources during the lower valleys.Ecological compatibility features also provide a strong portability to the cloud native database.
- Accessibility.The cloud native distribution database is easy to use, its computing nodes are deployed in the cloud and can be accessed from multiple frontends anytime and anywhere.With its cluster deployed in clouds, the impact of single-point failures on services has been minimal, through automatic resilience and high-availability capabilities.When an upgrade or a replacement service is required, a non-interruptible service rotation upgrade can also be made for node.
- Quick iteration.The services in the cloud distribution database are independent of each other, and the updating of individual services does not affect the others.In addition, more agile updates and iterations can be achieved by highly automated research and development testing and delivery tools.
- Cost savings.The establishment of the data centre is an independent and complete project that requires significant investment in hardware and professional transport personnel to manage and maintain the data centre, and the continued movement of Vienna poses considerable financial stress.The cloud native distribution database has a more optimized resource allocation at lower upfront cost to obtain an expanded database.

### Shared Architecture VS has no shared storage architecture

The shared storage architecture is a storage system for multiple users/computers.It stores all files in a centralized repository and allows multiple users to access them simultaneously.For upper computing nodes, the shared storage architecture provides a unified data access interface for multiple users, and users need not be concerned about the actual distribution of data in the system or about the load balance of data distribution.Under the shared storage architecture, cloud manufacturers can pool disk resources, allowing multiple users to share a distributed storage cluster to pay for the capacity actually used.This business model is more in line with current market demand.The diagram is shown below in：

![共享存储架构](/img/share_everything.png)

The unshared storage architecture is a relatively old model that has recently reemerged in data storage technology, especially in the NoSQL, data warehouses and large data areas.As the architecture evolves, it has some very interesting performance compromises compared to the more common simple shared storage architecture.

The unshared architecture is a structure used for distributive calculations, in which each node is independent and different nodes are interconnected.Each node consists of processors, primary memory and disk.The main motive for this structure is to eliminate competition among nodes.Nodes here do not share memory or storage.Disk has a single node that cannot be shared.It works effectively in a high-capacity and literate environment.The diagram is shown below.

![无共享存储架构](/img/share_nothing.png)

### Multi-Tenant Model VS Single Tenant Model

A single tenant means that there is only one example of cloud software solution that runs on the hardware and infrastructure components that it supports.It will not be shared with multiple clients involved in a single tenant environment.In a multi-tenant environment, the cloud infrastructure is shared among multiple customers or accounts.No customer can control how resources are allocated or consumed.

CnosDB uses multi-tenant models.Many tenants are a solution to the provision of cloud software, namely, services (SaaS, Software as a Service).Many tenants use the shared infrastructure to provide multiple clients with access to SaaS solutions.More renters mean that individual examples of software and the infrastructure they support serve multiple clients.Each customer shares the software application and also shares a database.Data for each tenant are segregated and not visible to other tenants.

#### Potential benefits of multiple tenants

- More than：customers mean shared environmental costs, and these savings (from SaaS suppliers) are usually transferred to software costs.
- Integrate：cloud environments that allow easier integration with other applications using the API.
- Easy maintenance of the：server is technically a SaaS provider, which means that some degree of database maintenance is handled by the vendor rather than by you yourself.

The multi-tenant model of the cloud time series database is usually a SaaS multi-tenant.There are many advantages over previous single-tenant models.

- Expansion of infrastructure through economies of scale reduction：will have a much smaller impact on infrastructure than single-tenants hosting solutions, as new users will have access to the same basic software.
- Shared infrastructure results in a cost reduction of：SaaS allowing all sizes of shared infrastructure and data center operating costs.There is no need to add applications and more hardware to its environment.There is no need to configure or manage any infrastructure or software other than internal resources to enable businesses to focus on their daily tasks.
- Sustained maintenance and updating of：customers will keep the software up to date without paying a high maintenance fee.Vendors introduce new features and updates.These are usually included in SaaS subscriptions.
- You can complete the configuration of：single Tenant Hosting solution while keeping the base library intact. Changes to the application code are required.This customization is costly and is time-consuming, as it may not be compatible with your environment.

The multi-tenant solution is designed to be highly configured, so that enterprises can allow applications to run in the manner they want.There is no need to change the code or data structure to make the upgrade process simple.

The Multi-Tenant Structure also allows database products to serve everyone efficiently, ranging from small customers whose size may not guarantee a dedicated infrastructure to large enterprises that require access to almost unlimited cloud computing resources.The costs of software development and maintenance are shared, thereby reducing expenditures, thereby resulting in cost savings for users.

### Serverless VS Dedicate

#### Serverless Introduction

Serverless structures, as a new cloud calculation paradigm, are revolutionary structures of cloud origin that upset the traditional understanding of the deployment and operation of software applications. Serverless is a cloud development model that allows developers to build and run applications without managing servers.Serverless servers still exist, but they are abstracted from application development.The cloud provider handles the day-to-day work of configuring and maintaining and expanding the server infrastructure.Developers can simply pack their code into containers for deployment.When deployed, Serverless applications respond to needs and are automatically scaled up and scaled down as needed.Serveress products from public cloud providers are usually measured on a demand-driven basis through an event-driven implementation model.Therefore, it does not incur any costs when the Serverless service is inactive.

The difference between Serverless modes and other cloud computing models is that cloud providers are responsible for managing cloud infrastructure and application extensions.No server application is deployed in the container, the container will start automatically when called on.

Under the standard infrastructure - infrastructure as a Service, IaaS cloud computing model, the user pre-purchase capacity units means that the user will need to pay the public cloud provider for a permanent online server component to run its application.Users are responsible for expanding server capacity when demand is high and reducing server capacity when it is no longer needed.The cloud infrastructure required to run the application is active even if the application is not used.

By contrast, for Serverless structures, applications only start when needed.The public cloud provider will allocate resources for the dynamic of the code when the party triggers the application code.The user stopped paying when the contemporary code was executed.In addition to cost and efficiency advantages, Serverless also frees developers from routine and frivolous tasks associated with application extension and server configuration.

Using Serverlessness, managing operating systems and filesystems, security patches, load balances, capacity management, extension, log recording and surveillance are handed over to cloud service providers, reducing users' human costs.

#### Serverless strengths

- Serverless increases the efficiency of developers and reduces transaction costs.Moving away from the daily tasks of configuring and managing servers, developers have more time to focus on their application development.
- Serverless to promote the adoption of DevOps because it reduces the need for developers to clearly describe the infrastructure they need to do to configure them.
- The development of applications can be further simplified by merging the entire component from the third-party backend service (Backend as a Service, BaaS) product.
- Operating costs of the Serveress model have been reduced because users can pay for cloud-based computing time as required, rather than running and managing their servers along.

#### Serverless Disadvantages

- The logic of not running their own server or controlling their own server side may cause corresponding problems.
- Cloud providers may have severe restrictions on how their components interact, thereby affecting the flexibility and customization of the user's own systems.In BaaS environment, developers may rely on services whose code is not under their control.
- Discard control over these aspects of the IT Stack will also be easy to lock users from suppliers.A decision to replace a supplier may also be accompanied by the cost of upgrading the system to meet new vendor specifications.

#### Dedicate Overview

The Dedicate model, which is the service mode used by a client for a server, is the service mode used by a traditional database provider.Dedicate models can effectively address Serverless disadvantages, but they do not have Serverless advantages.

### Serverless or Dedicate

Serverless and Dedicate each have thousands of autumns, so that in doing the package selection, the selection can be completed by reference to the following.

- Serverless
  - When automatic elasticity extension is required.Automatically scale/scale to respond to changes in demand.This is particularly critical for enterprises with a surge or unpredictable workload.
  - When minimized action is required.Team can take less time to worry about the database and spend more time building your application.
  - When tested, experimented or evaluated.For lightweight applications, prototypes, testing and development environments, support projects, etc. as they are self-help and fast.
  - When minimum cost is required.Charges based on actual storage and calculation of usage.The resources allocated to the database will automatically increase and decrease as needs arise.
- Dedicate
  - Hardware control is required.Severless is cloud-based and cannot control hardware.Hardware solutions need to be controlled for safety or regulatory reasons.
  - When a deep set of features is required.Serveress features are currently relatively few\.Some companies need a multi-regional database.
  - Security issues are excluded from multiple tenants.Severless ultimately still shares the same machine.High-security work loads, Dedicate has its advantages.
  - Provide better performance or lower cost.Severless is the best option for many cases, but there is no "perfect" database solution that meets all possible uses/work loads.

Based on the above references, users can select appropriate package types for their needs and usage.CnosDB can provide both Serverless and Dedicate modes for users to maximize user needs.
