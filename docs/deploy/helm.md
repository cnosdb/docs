---
sidebar_position: 3
---

# Helm

要使用 Helm 安装 CnosDB，首先你需要确保你的系统上已经安装了 Helm。

```shell
helm repo add cnosdb https://cnosdb.github.io/helm-chart/
helm repo update cnosdb
helm install my-cnosdb cnosdb/cnosdb
```

关于更多 CnosDB Helm Chart 请关注 [helm-chart](https://github.com/cnosdb/helm-chart/tree/main)