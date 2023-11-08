---
title: Helm
order: 2
---

Kubernetes（简称K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用程序。它提供了一种灵活的方式来管理容器化应用程序的生命周期，包括自动化部署、水平扩展、负载均衡、故障恢复等。Kubernetes通过使用容器的抽象层，使得应用程序可以在不同的环境中以一致的方式运行。

Helm是一个开源的Kubernetes包管理工具，用于简化和管理Kubernetes应用程序的部署和管理过程。它提供了一种标准化的方式来定义、安装和管理Kubernetes应用程序的包装格式。Helm通过使用Chart来组织和管理Kubernetes应用程序的部署和配置信息。Chart是一个预定义的目录结构，包含了Kubernetes资源的描述文件和配置参数。通过使用Helm，可以轻松地将应用程序的部署和配置打包为一个可重用的单元，简化了应用程序的部署和管理过程。

Helm Chart是Helm工具的核心组件，它是一个预定义的目录结构，包含了Kubernetes资源的描述文件和配置参数。Helm Chart可以包含Deployment、Service、Ingress、ConfigMap等Kubernetes对象的定义，以及与这些对象相关的配置文件。通过使用Helm Chart，可以将应用程序的部署和配置打包为一个可重用的单元，简化了应用程序的部署和管理过程。Helm Chart支持版本控制和依赖管理，可以方便地管理不同版本的应用程序，并确保正确的依赖被安装。

## 使用方法

以在`cnosdb`命名空间中安装一个叫`my-cnosdb`的实例:
> 下载[cnosdb-0.1.0.tgz](https://dl.cnosdb.com/sample/cnosdb-0.1.0.tgz)

```shell
helm install my-cnosdb cnosdb-0.1.0.tgz -ncnosdb
```

在安装helm chart的时候可以使用 `--set key=value[,key=value]`指定任意的参数. 例如:

```
helm install my-cnosdb \
--set image.pullPolicy=IfNotPresent \
cnosdb/cnosdb -ncnosdb
```

或者,使用一个`values.yaml`这样的YAML文件来指定安装的时候所使用的参数,例如:

```
helm install my-cnosdb -f values.yaml cnosdb/cnosdb -ncnosdb
```

CnosDB Helm Chart支持单节点、存算一体、存算分离3种不同的部署模式，可以通过指定architecture参数选择不同的部署模式。

您可以通过指定参数`[queryTskv | tskv | meta].persistence.enabled=true`开启持久化。chart 会挂载 [持久卷](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) 到`/var/lib/cnosdb` 目录。 默认情况下会动态创建`PVC`。

可以通过设置extraConf的值来覆盖CnosDB的默认配置:

```
helm install \
--set meta.extraConf.'storage\.maxsummary_size'='64M' \
--set tskv.extraConf.'storage\.max_level'=1 \
my-cnosdb cnosdb/cnosdb
```

CnosDB Helm Chart支持通过调整副本的数量进行水平扩容:

```
helm upgrade my-cnosdb cnosdb/cnosdb -ncnosdb --reuse-values --set meta.replicaCount=3 --set tskv.replicaCount=5
```

如果集群支持动态 [扩展 PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#expanding-persistent-volumes-claims), 你可以对存储进行垂直扩容（不借助helm）。但是目前helm做不到，因为helm无法处理statefulset的验证错误，而目前statefulset不支持修改vct中的pvc的大小。所以你只能对 `resources` 例如 `cpu` 和 `memory`进行垂直扩容。

```
helm upgrade my-cnosdb cnosdb/cnosdb -ncnosdb --reuse-values --set tskv.resources.limits.cpu=1
```

## 优势

1. 简化部署流程：
   使用CnosDB Helm Chart，您可以轻松地将CnosDB部署到Kubernetes集群中。Chart中已经定义了部署CnosDB所需的各种Kubernetes对象，如StatefulSet、Service、ConfigMap等，您无需手动创建这些对象，大大简化了部署流程。
2. 可定制化配置：
   CnosDB Helm Chart支持自定义配置参数，您可以根据实际需求修改Chart中的配置。例如，您可以指定CnosDB的存储卷大小、副本数、部署模式等。通过修改配置参数，您可以轻松地调整CNOSDB的性能和规模，以适应不同的应用场景。
3. 可重复性和可维护性：
   通过使用CnosDB Helm Chart，您可以实现CnosDB部署和管理的可重复性和可维护性。Chart中包含了CnosDB的所有配置和资源定义，团队成员可以轻松地共享和重用Chart，从而加快开发和部署速度。此外，当CnosDB版本更新时，您只需更新Chart即可，无需手动修改和管理每个实例。
4. 社区支持和生态系统：
   CnosDB Helm Chart是一个开源项目，拥有活跃的社区支持。您可以从社区中获取帮助、分享经验，并与其他用户交流。此外，CnosDB Helm Chart还与其他Kubernetes工具和生态系统集成，如Prometheus、Grafana等，为您提供更强大的监控和管理能力。
