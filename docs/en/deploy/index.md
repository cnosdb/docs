---
title: Index
icon: note
order: 1
---


# Deploy

This section describes how to deploy CnosDB.

- [Single](./single.md)
    - [Docker](./single.md#docker)
    - [Kubernetes](./single.md#Kubernetes)
    - [Source Code Installation](./single.md#source-code-installation)
- [Distributed](./distributed.md)
- [Separation Mode](./separation_mod.md)
  - [Design Objectives](./separation_mod.md#design-objectives)
  - [Data Replication and Consensus](./separation_mod.md#data-replication-and-consensus)
    - [Replicaset](./separation_mod.md#replicaset)
    - [Place Rule](./separation_mod.md#place-rule)
    - [Data Separation Strategy](./separation_mod.md#data-separation-strategy)
    - [Data Consensus Based on Quorum Mechanism](./separation_mod.md#data-consensus-based-on-quorum-mechanism)
    - [Writer Process](./separation_mod.md#writer-process)
    - [Data Reading](./separation_mod.md#data-reading)
    - [Update of Conflicts](./separation_mod.md#update-of-conflicts)
  - [Meta Cluster](./separation_mod.md#meta-cluster)
  - [SQL Engine](./separation_mod.md#sql-engine)
  - [TSKV Index and Data Storage](./separation_mod#tskv-index-and-data-storage)
    - [Index Engine](./separation_mod.md#index-engine)
    - [Data Engine](./separation_mod.md#data-engine)
  -[Other System Design](./separation_mod.md#other-system-design)