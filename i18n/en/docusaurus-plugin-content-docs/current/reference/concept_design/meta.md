---
sidebar_position: 3
---

# Metadata Cluster

Metadata cluster refers to the Meta cluster service.Meta service is one of the core components of CnosDB distributed database system, responsible for the metadata storage and management of the entire cluster.The Meta cluster is implemented through the Raft consensus protocol.Maintain a strong consistency meta cluster through RESTful API. Meta cluster api serves externally, while nodes also subscribe to updates to meta information.All metadata information updates are done through the Meta cluster.

![meta——server](/img/raft.jpg)

## Meta Cluster Function

- Metadata Storage
- Cluster Management
- Change Notification
- Backup and Restore of Metadata

### Metadata Storage

The main content of data storage includes the following points:

1. Database catalog information
2. DDL Operation Resource Management
3. Tenant, User Information and Permissions
4. Data Sharding and Distribution
5. Cluster node information

### Cluster Management

1. Node exploration
2. Node Registration
3. Distributed Lock

### Change Notification

Changes to the metadata are asynchronously notified to each CnosDB node, which is achieved through the powerful Watch mechanism provided by the Meta cluster.Each CnosDB node subscribes to changes in Metadata and stores it in its local cache; CnosDB nodes prioritize the use of local cached data when in use, and requests with high consistency requirements will be forwarded to the Meta cluster to request data once.

### Backup and Restore of Metadata

The Meta service provides backup and restore functionality for stored data

1. Data Backup

`cnosdb-cli` can export the metadata stored in Meta; The exported data is presented in DDL format.

```sql
cnosdb-cli dump-ddl
```

2. Data Restore

`cnosdb-cli` can also restore metadata to the Meta cluster.

```sql
cnosdb-cli restore-dump-ddl
```
