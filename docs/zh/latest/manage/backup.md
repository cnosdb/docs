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

## cnosdb-imexport

cnosdb-imexport是一个集群数据的导入、导出、迁移工具。可以将整个集群数据（包括Meta、Data）导出到磁盘文件、对象存储系统（支持`AWS S3`, `Google Cloud Storage`, `Microsoft Azure`）；也可以将导出数据数据恢复到集群中；还可以在两个集群之间进行数据迁移。

### 集群数据导出

将集群所有Table数据导出到指定位置，同时在运行目录下会产生两个文件（`./meta_data.src`、`./schema_data.src`）是导出数据的元信息，跟Table导出数据一起组成一个完整的集群数据备份。

注意： 如果是备份到磁盘文件，Table备份数据是产生在接收请求的CnosDB节点。

```shell
./cnosdb-imexport export --src user:password@ip:port --path file:///tmp/migrate
# --src 待导出CnosDB集群的地址，注意其中的user、password权限
# --path 导出数据位置，用法同：导入导出
# --conn 可选参数，如果导出位置为对象存储系统需要提供，用法同：导入导出
```

### 集群数据导入

将导出数据还原到CnosDB集群中，还原之前请确保集群是空闲，否则会产生覆盖写。运行之前请确保备份元信息（`./meta_data.src`、`./schema_data.src`）与工具在同一级目录。

注意：如果待导入数据是在磁盘文件，还原之前还请确保Table备份数据已经放置到接收请求的CnosDB节点。

```shell
./cnosdb-imexport -- import --dst user:password@ip:port --path file:///tmp/migrate
# --dst 导入CnosDB集群的地址，注意其中的user、password权限
# --path 导入数据位置，用法同：导入导出
# --conn 可选参数，如果导入数据位置为对象存储系统需要提供，用法同：导入导出
```

### 集群数据迁移

数据迁移可以把整个集群的数据迁移到另一个CnosDB集群。

注意：迁移过程中数据的暂存区是在磁盘文件，请确保cnosdb-imexport与导入、导出集群在共有机器。

```shell
./cnosdb-imexport -- migrate --src user:password@ip:port --dst user:password@ip:port --path file:///tmp/migrate
# --src 待导出CnosDB集群的地址，注意其中的user、password权限
# --dst 导入CnosDB集群的地址，注意其中的user、password权限
# --path 迁移过程中数据的暂存区。
# --conn 可选参数，如果path参数为对象存储系统需要提供，用法同：导入导出
```