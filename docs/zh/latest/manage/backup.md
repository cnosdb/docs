---
title: 备份与还原
order: 6
---

# 备份与还原

CnosDB 可以使用 SQL `COPY INTO` 把数据导出到本地或对象存储上，也可以把数据从对象存储和本地文件系统导入。

支持的文件格式有CSV/JSON/PARQUET，目前支持的对象存储有`AWS S3`, `Google Cloud Storage`, `Microsoft Azure` 。

## 导出

### 语法

```sql
COPY INTO externalLocation
    FROM [<database>.]< table_name >
    [ CONNECTION = ( connection_options ) ]
    [ FILE_FORMAT = ( TYPE = { 'CSV' | 'NDJSON' | 'PARQUET'} [ formatTypeOptions ] ) ]
    [ COPY_OPTIONS = ( copyOptions ) ]
    
    externalLocation (for Amazon S3) ::=
    's3://<bucket>[/<path>]'
    connection_options ::=
    region = '<string>'
    , access_key_id = '<string>'
    , secret_key = '<string>'
    [, endpoint_url = '<string>' ]
    [, token = '<string>' ]
    [, virtual_hosted_style = true | false ]
    externalLocation (for Google Cloud Storage) ::=
    'gcs://<bucket>[/<path>]'
    connection_options ::=
    gcs_base_url = '<string>'
    [, disable_oauth = true | false ] -- 默认 false
    [, client_email = '<string>' ] -- 如果disable_oauth = false，此项必填
    [, private_key = '<string>' ] -- 如果disable_oauth = false，此项必填

    externalLocation (for Microsoft Azure) ::=
    'azblob://<container>[/<path>]'
    connection_options ::=
    account = '<string>'
    [, access_key = '<string>' ]
    [, bearer_token = '<string>' ]
    
    copyOptions ::=
    auto_infer_schema = true | false -- 仅适用于copy into table语句，是否自动推断文件的schema，如果为false则使用目标表的schema（copy into table中的table即为目标表
    
    formatTypeOptions ::=
    DELIMITER = '<character>' -- 仅适用于csv文件，文件分割符，为单个字符
    WITH_HEADER = true | false -- 仅适用于csv文件，是否带有表头，默认为true

```

### 示例

- #### 导出成 CSV

    ```sql
    COPY INTO 'file:///tmp/air' FROM air
        FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
    ```

- #### 导出成 PARQUET

    ```sql
    COPY INTO 'file:///tmp/air' FROM air
        FILE_FORMAT = (TYPE = 'PARQUET');
    ```

- #### 导出成 JSON

    ```sql
    COPY INTO 'file:///tmp/air' FROM air
        FILE_FORMAT = (TYPE = 'JSON');
    ```

## 导入

### 语法

```sql
COPY INTO [<database>.]< table_name >
    FROM externalLocation
    [ CONNECTION = ( connection_options ) ]
    [ FILE_FORMAT = ( TYPE = { 'CSV' | 'NDJSON' | 'PARQUET' } [ formatTypeOptions ] ) ]
    [ COPY_OPTIONS = ( copyOptions ) ]
    externalLocation (for Amazon S3) ::=
    's3://<bucket>[/<path>]'
    connection_options ::=
    region = '<string>'
    , access_key_id = '<string>'
    , secret_key = '<string>'
    [, token = '<string>' ]
    [, virtual_hosted_style = true | false ]
    externalLocation (for Google Cloud Storage) ::=
    'gcs://<bucket>[/<path>]'
    connection_options ::=
    gcs_base_url = '<string>'
    [, disable_oauth = true | false ] -- 默认 false
    [, client_email = '<string>' ] -- 如果disable_oauth = false，此项必填
    [, private_key = '<string>' ] -- 如果disable_oauth = false，此项必填

    externalLocation (for Microsoft Azure) ::=
    'azblob://<container>[/<path>]'
    connection_options ::=
    account = '<string>'
    [, access_key = '<string>' ]
    [, bearer_token = '<string>' ]

    copyOptions ::= 
    auto_infer_schema = true | false -- 仅适用于copy into table语句，是否自动推断文件的schema，如果为false则使用目标表的schema（copy into table中的table即为目标表）
    
    formatTypeOptions ::=
    DELIMITER = '<character>' -- 仅适用于csv文件，文件分割符，为单个字符
    WITH_HEADER = true | false -- 仅适用于csv文件，是否带有表头，默认为true
    
```

**注意**：导入之前，请确定目标表已经存在，并且列名和列的类型对应。

### 示例

- #### 导入 CSV

    ```sql
    COPY INTO air FROM 'file:///tmp/air/'
        FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
    ```

- #### 导入 PARQUET

    ```sql
    COPY INTO air FROM 'file:///tmp/air/'
        FILE_FORMAT = (TYPE = 'PARQUET', DELIMITER = ',');
    ```

- #### 导入 JSON

    ```sql
    COPY INTO air FROM 'file:///tmp/air/'
        FILE_FORMAT = (TYPE = 'JSON', DELIMITER = ',');
    ```

## 各对象存储示例

### AWS S3

- #### 导入

    ```sql
    COPY INTO air FROM 's3://test/air/'
        CONNECTION = (
        region = 'us‑east‑1',
        access_key_id = '****************',
        secret_key = '****************'
        )
        FILE_FORMAT = (TYPE = 'CSV');
    ```

- #### 导出

    ```sql
    COPY INTO 's3://test/air' FROM air
        CONNECTION = (
        region = 'us‑east‑1',
        access_key_id = '****************',
        secret_key = '****************'
        )
        FILE_FORMAT = (TYPE = 'CSV');
    ```

### Google Cloud Storage

连接有四个参数:

- gcs_base_url
- disable_oauth 关闭验证开关，为 `false` 时，必须指定 `client_email`, `private_key` 参数。
- client_email
- private_key

- #### 导入

    ```sql
    COPY INTO air FROM 'gcs://test/air/'
        CONNECTION = (
        gcs_base_url = 'http://localhost:4443',
        disable_oauth = true
        )
        FILE_FORMAT = (TYPE = 'CSV');
    ```

- #### 导出

    ```sql
    COPY INTO 'gcs://test/air' FROM air
        CONNECTION = (
        gcs_base_url = 'http://localhost:4443',
        disable_oauth = true
        )
        FILE_FORMAT = (TYPE = 'CSV');
    ```

### Microsoft Azure

参数有四个

- account
- access_key
- bearer_token
- use_emulator 默认为 `false`，当为 `true` 时，url使用环境变量 `AZURITE_BLOB_STORAGE_URL` 或 `http://127.0.0.1:10000` 。

- #### 导入

    ```sql
    COPY INTO air FROM 'azblob://test/air/'
        CONNECTION = (
            account = 'devstoreaccount1',
            access_key = '*****'
        )
        FILE_FORMAT = (TYPE = 'CSV'); 
    ```

- #### 导出

    ```sql
    COPY INTO 'azblob://test/air/' FROM air
        CONNECTION = (
            account = 'devstoreaccount1',
            access_key = '*****'
        )
        FILE_FORMAT = (TYPE = 'CSV'); 
    ```

## 跨集群迁移数据
CnosDB在升级版本时，可能由于重构优化等带来版本间数据格式、通信协议不兼容，导致需要跨集群迁移数据。跨集群数据迁移可以采取上面的导入、导出方式，由于CnosDB集群还包括Meta数据也需要迁移。

### 迁移meta数据

- #### 导出meta数据
    向meta发送http请求导出meta数据

```shell
   curl -XPOST http://ip:port/dump --o ./meta_dump.data  # ip:port为旧集群meta服务的地址
```

- #### 数据过滤
1. 集群自身信息、buckets相关信息等不需要迁移到目的集群，需要人工过滤。
2. 过滤方式：用文本编辑器打开上面导出的文件，删除相应key。

```txt
   需要过滤删除的key列表：
   /data_version
   /already_init_key
   /cluster_xxx/auto_incr_id
   /cluster_xxx/data_nodes/1001
   /cluster_xxx/data_nodes/111
   /cluster_xxx/data_nodes_metrics/1001
   /cluster_xxx/tenants/xxx/yyy/zzz/buckets
```
- #### 导入新集群：
  将过滤过的Meta导出数据文件恢复到新集群

```shell
   curl -XPOST http://ip:port/restore --data-binary "@./meta_dump.data"  # ip:port为新集群的meta服务的地址
```

### 迁移data数据
迁移Data数据按照上面的导入、导出过程；遍历所有表即可。

- #### 按照table导出数据

```sql
    COPY INTO 'file:///tmp/xxx' FROM table_name FILE_FORMAT = (TYPE = 'PARQUET');
```

- #### 将导出数据导入新集群

```sql
    COPY INTO table_name FROM 'file:///tmp/xxx/' FILE_FORMAT = (TYPE = 'PARQUET', DELIMITER = ',');
```
