---
title: Raft Replication
order: 4
---

# Basic Concept of Raft Replication

In distributed systems, Raft is a consensus algorithm used to replicate logs to ensure agreement across multiple nodes. The nodes in Raft algorithm are classified as leaders, followers, and candidates.

When a node operates as a leader, it is responsible for receiving requests from clients and copying these requests into the logs of other nodes for data replication and consistency.

### The basic process of Raft replica replication

- Leadership election
  When the system starts or the current leader node loses contact, the candidates in the remaining nodes initiate a leadership election. Candidates send messages requesting votes to other nodes and wait for replies from other nodes within a certain period of time. If the candidate gains the support of the majority of nodes, it becomes the new leader.

- Log replication
  Once the leader is elected, it can receive requests from clients and append these requests to its own log. The leader will then send these log entries to the other nodes and wait for the confirmation of the majority of the nodes. Once the majority of nodes have acknowledged receiving and replicating these logs, the leader can apply the log entries to the local state machine to achieve data consistency.

- Follower copy
  When the follower node receives the log entries sent by the leader, it appends these log entries to its own log and sends an acknowledgement message to the leader. Once the leader receives the acknowledgement message from the majority of nodes, it knows that these log entries have been replicated in the majority of nodes, ensuring consistency.

- Failure handling
  If the leader node loses contact or some other failure occurs, the remaining nodes will re-elect a new leader. The newly elected leader will continue to replicate the logs and maintain data consistency.

Through the above process, Raft algorithm realizes replica replication and consistency, and ensures data consistency and reliability in distributed system.

### Raft in CnosDB
Raft replication algorithm is introduced in CnosDB v2.4 version, each Replica Set is a Raft replication group, and the whole system runs in a Multi-Raft mode.

#### Data writing flow

- Determine which Bucket to write based on tenant, Database, and timestamp.
- Hash according to the Series Key to determine which Replica Set to write, that is, which Raft replica group.
- Check if the node receiving the request is the Leader if it is written directly, otherwise forward it to the Leader for processing.

#### Raf replica group management

- Replication group creation and destruction
- Add a copy
- Delete a copy
- Move a copy
