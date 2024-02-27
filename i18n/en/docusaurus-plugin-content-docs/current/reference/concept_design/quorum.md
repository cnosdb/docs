---
title: Quorum Algorithm
order: 2
---

# Quorum Algorithm

Quorum mechanisms are commonly used in a distribution system to ensure data redundancy and eventual consistency.Quorum is used to ensure that in the event of failures on the part of some of the participants, we can still collect votes from the surviving participants and thus continue the algorithm.Quorum indicates the minimum number of votes required to perform an operation, usually a majority participant.The core idea behind Quorum is that, even if a participant fails or is about to be separated from the network, at least one participant can act as an arbiter to ensure the accuracy of the agreement.

### Quorum Algorithms

In Quorum NRW algorithm, there are three parameters：N, R, W.

Parameter N is also referred to as a reproduction factor, meaning the number of copies of the data in the entire cluster.

Parameter R is the level of read-consistency, meaning that it was successfully read from a copy of R before being considered successful in this reading.

Parameter W is the level of consistency that means successfully written from W copies to be considered successful in this operation.

N,R, and W parameters can achieve different consistency levels： under different combinations

1. When "W + R > N", use timestamps, versions etc. to determine the latest data.In other words, strong data consistency can be achieved under a combination of parameters that meet that condition.
2. When "W + R <= N", strong consistency cannot be achieved. It can only guarantee final consistency, i.e. system reading may capture old data.
3. When "W=N, R=1", the so-called WARO (Write All Read One) is the scene of the CPP model in the CAP’s theory.
4. When "W\<N, R=1" is the scene of the APs model in the CAP.

### Data consistency assurance

The data is written in Ns, the usual solutions are as follows, taking into account the fact that there may be a writing failure, the loss of a copy of the data caused by a machine failure, and multiple copies of the data that are not consistent.

1. Hinted-handoff Mechanism
   A machine receives writing requests. When remote replication fails, it will first be stored in the hinted-handoff queue of hinted-handoff queue that is regularly sent to remote nodes for final data consistency.Normally hinted-handoff queue has a capacity limit, writing over capacity will fail to respond.
2. Reading the repair mechanism
   will repair the data for final consistency based on the version, timestamp or other copy information when reading the two data incompatible; Reading fixes are usually used in the CPP model.
3. The graveyard mechanism
   in this distributive algorithm of Quorum, is a special operation to deal with problems that may cause old data to be revived.For example, three copies, two have successfully deleted one unsuccessfully and the unsuccessful data processing may be treated as valid data synchronization to the deleted node for the recovery of the deleted data. In order to address this situation, the marking removal method is usually used when deleted, before actually removing from the disk at a later date, which is often referred to as a graveyard mechanism.
4. Anti-entropy anti-entropy mechanism
   Anti-entropy mechanism is similar to a back-office reconciliation process where the data is missing and the values are not consistent and repaired.This mechanism is usually costly to the system and most systems are implemented with a configuration switch that is left to the user's decision whether or not to be turned on.

Anti-entropy mechanisms are implemented precisely because systems are costly and different systems choose to achieve different levels of particles.Some systems routinely check if there is a loss of content in a block, without concern for consistency within the block, such as casandra, while others periodically verify consistency of each item within the system, such as riak.This data structure is often supported by Merkle Tree in content-based coherence.
