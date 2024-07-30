---
sidebar_position: 3
---

# Helm

To install CnosDB with Helm, first you need to make sure that Helm is installed on your system.

```shell
helm repo add cnosdb https://cnosdb.github.io/helm-chart/
helm repo update cnosdb
helm install my-cnosdb cnosdb/cnosdb
```

For more information, please follow [helm-chart](https://github.com/cnosdb/helm-chart/tree/main)
