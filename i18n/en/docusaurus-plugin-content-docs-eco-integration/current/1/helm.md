---
title: Helm
slug: /help
---

Kubernetes (known as K8s) are an open source packaging platform for automating the deployment, extension and management of containerized applications.It provides a flexible approach to managing the life cycle of containerized applications, including automatic deployment, horizontal expansion, load equilibrium, failure recovery, etc.By using the abstract layer of the container, Kubernetes allows applications to operate in a consistent manner in different environments.

Helm is an open source Kubernetes kit management tool to simplify and manage the deployment and management processes of Kubernetes applications.It provides a standardized way to define, install, and manage the packaging format of the Kubernetes application.Helm organizes and manages deployment and configuration information for Kubernetes applications by using the Chart.Chart is a predefined directory structure that contains description files and configuration parameters for Kubernetes resources.By using Helm, deployment and configuration of applications can easily be packaged into a reusable module, simplifying the deployment and management process.

Helm Chart is a core component of the Helm Tool, a pre-defined directory structure that contains description files and configuration parameters for Kubernetes resources.Helm Chart can include definitions of Kubernetes objects such as Deemployment, Service, Ingress, ConfigMap and configuration files associated with these objects.The deployment and configuration of applications can be packaged into a reusable module using Helm Chart, and the deployment and management process of applications has been simplified.Helm Chart supports version control and dependency management. It can easily manage different versions of applications and ensure that correct dependencies are installed.

## Usage Method

Install an instance called `my-cnosdb` in the `cnosdb` names:

> Download[cnosdb-0.1.0.tgz](https://dl.cnosdb.com/sample/cnosdb-0.1.0.tgz)

```shell
help install my-cnosdb cnosdb-0.1.0.tgz -ncnosdb
```

Use `--set key=value[, key=value]` when installing helm chart. For example:

```
help install my-cnosdb \
--set image.pullPolicy=IfNotPresent
cnosdb/cnosdb -ncnosdb
```

Alternatively, use a YAML file like `values.yaml` to specify the parameters used when installing it, such as:

```
help install my-cnosdb -f values.yaml cnosdb/cnosdb -ncnosdb
```

CnosDB Helm Chart supports a single node, saves one, and stores separates three different deployment modes. Different deployment models can be selected by specifying archiecture parameters.

You can enable persistence by specifying the parameter `[queryTskv | tskv | meta].persistence.enabled=true`.Chart mounts [持久卷](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) to the `/var/lib/cnosdb` directory. `PVC` will be created dynamically by default.

The default configuration of the CnosDB can be overridden by setting an extraConf value:

```
helm install \
--set meta.extraConf.'storage\.maxsummary_size'='64M' \
--set tskv.extraConf.'storage\.max_level'=1 \
my-cnosdb cnosdb/cnosdb
```

CnosDB Helm Chart supports horizontal expansion by adjusting the number of copies:

```
helm upgrade my-cnosdb cnosdb/cnosdb -ncnosdb --reuse-values --set meta.replicaCount=3-set tskv.replicaCount=5
```

If clustering supports dynamics [extension of PVC](https://kubernetes.io/docs/concepts/storage/persist-volumes/#expanding-persists-volumes-claims), you can extend your storage vertically (without help).But it is not possible to do this at the moment, because helm cannot handle statefulset's validation errors, while statefulset currently does not support changing the pvc size of vct.So you can only extend vertically to `resources` such as `cpu` and `memory`.

```
helm upgrade my-cnosdb cnosdb/cnosdb -ncnosdb --reuse-values --set tskv.resources.limits.cpu=1
```

## Advantages

1. Simplify the deployment process：
   with CnosDB Helm Chart, you can easily deploy CnosDB to the Kubernetes cluster.The various Kubernetes objects needed to deploy CnosDB have been defined in Chart, such as StatefulSet, Service, ConfigMap, etc. You do not need to create these objects manually, greatly simplifying the deployment process.
2. Customizable configuration：
   CnosDB Helm Chart supports custom configuration parameters. You can modify the configuration in Chart based on actual needs.For example, you can specify CnosDB's volume size, number of copies, deployment mode, etc.By modifying configuration parameters, you can easily adjust CNOSDB performance and size to different application scenarios.
3. Duplicability and maintainability：
   By using CnosDB Helm Chart, you can achieve the replicability and maintenance of CnosDB deployment and management.The Chart contains all CnosDB configurations and resource definitions that allow team members to share and reuse Chart easily, thus accelerating development and deployment.In addition, when the CnosDB version is updated, you simply need to update the Chart without changing and managing each instance manually.
4. Community support and ecosystems：
   CnosDB Helm Chart is an open source project with active community support.You can get help from the community, share experiences and interact with other users.In addition, CnosDB Helm Chart provides you with a stronger monitoring and management capability in integration with other Kubernetes tools and ecosystems, such as Prometheus, Grafana, etc.
