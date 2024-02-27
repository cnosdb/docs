---
title: Raft Copy
order: 4
---

# Raft Copy Algorithm Basic Concepts

In the distribution system, Raft is a consistent algorithm used to copy logs to ensure agreement among multiple nodes.The nodes in the Rafah algorithm are divided into leaders (leader), followers (follower) and candidates (candidate).

When a node operates as a leader, it receives client requests and copies them to the logs of other nodes to achieve data reproduction and consistency.

### Basic process for copying copies of Raft

- Leadership election
  Candidates from the remaining nodes will launch a leadership election when the system starts or the current leader node loses its contact.Candidates send requests for voting to other nodes and wait for responses from other nodes within a certain period of time.If the candidate enjoys the support of most nodes, it becomes a new leader.

- Log duplicates
  to receive client requests and append them to their own logs.The leader then sends these log entries to other nodes and awaits confirmation from most nodes.Once most nodes confirm receiving and copying these logs, leaders can apply log entries to local state machines, thereby achieving data consistency.

- Followers copy
  when the follower node receives log entries sent by the leader, it append these log entries to its own log and send a confirmation message to the leader.Once the leader receives confirmation messages from most nodes, it knows that these log entries have been copied to most nodes, thus ensuring consistency.

- The troubleshooter
  will restart the election and select a new leader if the leader's node has lost contact or other failures.Newly elected leaders will continue to copy logs and maintain data consistency.

Through the above processes, the Rafah algorithm achieved copying and consistency and ensured data consistency and reliability in distributed systems.

### Use by CnosDB for Rafah

Raft copy algorithm was introduced in CnosDB v2.4. Each Replica Set is a Raft Repository, the entire system is running in a multi-Raft mode.

#### Data Writing Process

- Determines which Bucket is written by tenant, Database, and timestamps.
- Hash to determine which Replica Set, or which Raft Replicate Group to write based on Series Key.
- Check if the requested node is a leader who wrote it directly, or forward it to the Leader for processing.

#### Manage Raft Copy Group

- Duplicate group creation, destruction
- Add a copy
- Delete a copy
- Move a copy
