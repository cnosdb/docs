---
title: Enterprise Ui
index: true
---

## 介绍

Enterprise Web 是 CnosDB 的后台管理平台，基于 gin、gorm、Casbin, Vue, Element UI 实现；Enterprise Web 分为两个项目 go-admin 和 go-admin-ui，go-admin 是 api 服务，go-admin-ui 是 web 端服务。

> 这里需要添加一个架构图


### 下载

```
wget https://dl.cnosdb.com/ui/cnosdb-enterprise-ui.zip
```

### 解压并编译代码：

> 编译前端代码

```
unzip cnosdb-enterprise-ui.zip
cd cnosdb-enterprise-ui
npx cross-env VUE_APP_BASE_API=http://<ip>:<port> npm run build:prod
```

### 将编译好的静态页面（dist）部署到nginx或者其他web服务器上


以下为示例 `nginx` 示例配置；
```shell
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;  // 这里替换为客户的web域名

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;	// 这里配置的目录与dist文件内容存放目录要一致
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### 启动后端 API 程序

> 点击这里下载 cnosdb-enterprise-api 压缩包：

[cnosdb-enterprise-api-darwin-aarch64.tar.gz](https://dl.cnosdb.com/ui/cnosdb-enterprise-api-darwin-aarch64.tar.gz)\
[cnosdb-enterprise-api-linux-amd64.tar.gz](https://dl.cnosdb.com/ui/cnosdb-enterprise-api-linux-amd64.tar.gz)

> 解压后目录结构如下：

| name    | description |
| -------- | ------- |
| `config-enterprise-api`  | api 主程序    |
| `config` | 配置文件存放目录     |
| `mysql`    | MySQL 初始化文件存放目录    |
| `restart.sh`    | 上传至服务器之后启动 api 脚本    |
| `scpToServer.sh`    | 上传脚本    |


1、初始化 MySQL 数据

MySQL 的初始化数据在cnosdb-enterprise-api 压缩包的 mysql 文件夹下，在安装好 MySQL 后，直接导入即可
```
cd cnosdb-enterprise-api
mysql -u root -p < mysql/init.sql
```

2、执行 restart.sh 运行 api
```
chmod +x restart.sh
./restart.sh
```


3、完成! 访问 `http://<ip>:<port>` 即可

> 默认管理员账户：\
> username: admin\
> password: 123456

![image](/_static/img/enterprise-ui/c524b83353dd4d049a553475cc81d0122072.png)


登录成功后，如果是第一次登录，或者未配置 CnosDB 连接，会提示：`您尚未添加CnosDB连接地址，会使得部分功能不能使用，请移步连接模块添加地址后访问。`，如下图：


![image](/_static/img/enterprise-ui/b5cbd15b330441048fad4766952b16912072.png)

![image](/_static/img/enterprise-ui/0dfb2aa76536484e88e11b65131c63e42072.png)

![image](/_static/img/enterprise-ui/a3eb5b4c06ec4b61916644da3d6c99dc2072.png)

至此，连接成功！

## 模块

### 数据管理

#### 控制台

控制台主要分为三块功能：

1、SQL 查询

可以输入 SQL 语句，来对连接配置的 CnosDB 内的库表进行操作；带自动补全功能；可自动补全操作者自己创建的库、表：

![image](/_static/img/enterprise-ui/1ea4cf363b7f4e148e4807faa22bc60f2072.png)

2、表格展示查询数据

1、正常返回： 会展示查询 SQL 查询到的数据，title 就是表的字段名称

2、返回异常：会展示错误的原因

3、图表展示查询数据

![image](/_static/img/enterprise-ui/d75800e0ffec44999401c329c5b830d52072.png)

1、选择 chart 类型：

2、选择 x 轴的坐标:

3、选择要展示的数据，(x 轴坐标字段必须展示，不可勾选)

#### VNode管理

VNode 管理主要是根据 meta 接口分析出 VNode 及其相关信息，展示在该页面，其中 Database 和 NodeID 可以点击跳转到对应的二级页面

![image](/_static/img/enterprise-ui/974f01524b7a46fc89b93571fc44ff2a2072.png)

#### 查询管理

查询管理模块主要展示了处于运行状态的 SQL，目的是方便查看那些执行时间过长 SQL，并进行 SQL 问题定位及优化：

![image](/_static/img/enterprise-ui/c6c3e9a7c270458c9c93ac2d685b477f2072.png)

#### 用户管理

用户管理有三个模块，主要是对 CnosDB 租户、用户、角色进行操作，逻辑与 CnosDB 文档内这几个模块的操作一致，将 SQL 操作搬到了界面操作，CnosDB 文档对应地址：[租户和权限](https://docs.cnosdb.com/zh/guide/manage/tenant.html)；

只有拥有系统权限的用户才能添加用户和租户

只有担任租户下 owner 角色或拥有系统权限的用户才能添加租户下的角色，并赋予用户角色

CnosDB 实例启动的时候，会默认创建一个租户 cnosdb 和一个用户 root

##### 租户

1、租户列表

![image](/_static/img/enterprise-ui/4ac67581eecb490ba4bda87ce1dddc3a2072.png)

2、添加租户

添加、编辑租户目前支持JSON 字符串的方式 对数据进行修改；点击展开按钮，可查看每个字段的描述信息及取值区间![image](/_static/img/enterprise-ui/3561351932124d64ba66aa21759722f12072.png)

![image](/_static/img/enterprise-ui/b72e1a2db7254c7080ffa7ad5164a6d62072.png)

3、编辑租户

1、编辑租户时，租户名称作为数据的唯一标识不允许修改，其他与添加的操作方式保持一致：

![image](/_static/img/enterprise-ui/1fa3ed9ef91448399d0a3a61dce212e92072.png)

![image](/_static/img/enterprise-ui/c5ce58a7445e4387b55f081d72adff602072.png)

4、清除配置

清除配置的功能是将 tenant\_options 字段里面的 comment 和 limiter\_config 设置为 null

![image](/_static/img/enterprise-ui/ca5b98b9ba9847a8bfd5808cdd4628272072.png)

![image](/_static/img/enterprise-ui/c5f23594455f4c9a96d60430bd487fc72072.png)

5、删除

![image](/_static/img/enterprise-ui/3f836c43d3b144079994803ffd0088b82072.png)

![image](/_static/img/enterprise-ui/bc353c49a5f247978ebb69f16e518b432072.png)

##### 用户

1、用户列表

![image](/_static/img/enterprise-ui/b832f46a3eaa4e3e84b205358b3591c82072.png)

2、添加用户

![image](/_static/img/enterprise-ui/c471ffe7c49f4415926747a6d860fc722072.png)

3、编辑用户

![image](/_static/img/enterprise-ui/e870dc51497a4b549f3c7a352064fd6f2072.png)

4、删除用户

![image](/_static/img/enterprise-ui/046a0846295244f5b49811bf82fb592a2072.png)

![image](/_static/img/enterprise-ui/9f5a272231d94946a0254d637a9e86892072.png)

##### 角色

租户下的角色分为系统角色和用户自定义角色

系统角色：

owner：对租户有顶级权限，支持租户下的所有操作

member：租户成员、可以浏览租户下的各种对象

用户自定义角色：

自定义角色需要继承系统角色

可以对自定义角色赋予多种权限

1、查看角色

查看当前租户下的角色

![image](/_static/img/enterprise-ui/4f3b21d8c122460f920f5f321cb16a952072.png)

2、添加角色

只有 DBA 和 tenant 的 owner 角色可以创建角色，角色是属于 tenant 的

![image](/_static/img/enterprise-ui/d7fb44ce3fcd42439fb407fa38005f932072.png)

![image](/_static/img/enterprise-ui/e43af2654cd74588b15b95e36f65db3d2072.png)

3、删除角色

删除角色时，需要先回收掉角色的权限才可以进行删除：

![image](/_static/img/enterprise-ui/a479f15c4bb34c81a6565105f5212d562072.png)

4、查看某个角色的权限

![image](/_static/img/enterprise-ui/789e611ad472416d8f7bc49f26a0c6b92072.png)

5、赋予权限

数据库的操作权限：

目前权限的最小粒度是数据库：

read    对数据库读的权限

write    对数据库读写的权限

all      对数据库增删改查的权限

授予一个角色关于同一个数据库的权限，会覆盖之前的权限

![image](/_static/img/enterprise-ui/016324b2580445d691c42b7c37dc98212072.png)

![image](/_static/img/enterprise-ui/71e58fd864a840839067711d6794e87c2072.png)

![image](/_static/img/enterprise-ui/74846791ebf345379e1a6944049800f52072.png)

6、回收权限

![image](/_static/img/enterprise-ui/1b1b02ce260f4a20b03ab4a159a81de22072.png)

![image](/_static/img/enterprise-ui/3b619ac81a8a46069744686736c516782072.png)

![image](/_static/img/enterprise-ui/5755e3320a2540be9de16110c5cce08c2072.png)


#### 日志管理

通过 `telegraf` `[[inputs.tail]]` 获取 CnosDB

`/tmp/cnosdb/logs/data/_node.1001.log`

`/tmp/cnosdb/logs/data/_node.2001.log` 里面的日志，

通过`[[outputs.http]]` [http://127.0.0.1:8902/api/v1/write?db=](http://127.0.0.1:8902/api/v1/write?db=)xxx 来将分析好的日志数据写到 CnosDB，在 Web 中展示在日志管理模块

![image](/_static/img/enterprise-ui/842d3d7798ab483cbce833733dc04df92072.png)

### 连接

连接模块是为了配置 CnosDB 连接，支持添加多个 CnosDB 节点，只能有一个生效的节点，具体操作细节在安装模块有体现；

![image](/_static/img/enterprise-ui/a82738c91a3744618e810c9aa2c1466f2072.png)

![image](/_static/img/enterprise-ui/fbe7368db0874c50a87a4841085104d32072.png)

### 个人中心

个人中心内可以修改当前登录用户的基本信息及密码

![image](/_static/img/enterprise-ui/0fa7666666bf40009e324f839c0b91342072.png)

![image](/_static/img/enterprise-ui/be4545222a2c4576b061a3b263c97c1f2072.png)