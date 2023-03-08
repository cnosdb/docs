---
title: 导入导出
order: 15
---
CnosDB 可以使用 SQL`COPY INTO`把数据导出到本地或对象存储上，也可以把数据从对象存储和本地文件系统导入。

支持的文件格式有CSV/JSON/PARQUET，目前支持的对象存储有`AWS S3`, `Google Cloud
Storage`, `Microsoft Azure`

## 导出

**语法**

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

**示例**

导出成 CSV

```sql
COPY INTO 'file:///tmp/air' FROM air
    FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
```

导出成 PARQUET

```sql
COPY INTO 'file:///tmp/air' FROM air
    FILE_FORMAT = (TYPE = 'PARQUET');
```

导出成 JSON

```sql
COPY INTO 'file:///tmp/air' FROM air
    FILE_FORMAT = (TYPE = 'JSON');
```

## 导入

**语法**

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

**注意**：导入之前，请确定目标表已经存在，并且列名和列的类型对应

**示例**：

导入 CSV

```sql
COPY INTO air FROM 'file:///tmp/air/'
    FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
```

导入 PARQUET

```sql
COPY INTO air FROM 'file:///tmp/air/'
    FILE_FORMAT = (TYPE = 'PARQUET', DELIMITER = ',');
```

导入 JSON

```sql
COPY INTO air FROM 'file:///tmp/air/'
    FILE_FORMAT = (TYPE = 'JSON', DELIMITER = ',');
```

## 各对象存储示例

### AWS S3

#### 导入

```sql
COPY INTO air FROM 's3://test/air/'
    CONNECTION = (
    region = 'us‑east‑1',
    access_key_id = '****************',
    secret_key = '****************'
    )
    FILE_FORMAT = (TYPE = 'CSV');
```

#### 导出

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

连接有四个参数

- gcs_base_url
- disable_oauth 关闭验证开关，为false时，必须指定 client_email, private_key 参数
- client_email
- private_key

#### 导入

```sql
COPY INTO air FROM 'gcs://test/air/'
    CONNECTION = (
    gcs_base_url = 'http://localhost:4443',
    disable_oauth = true
    )
    FILE_FORMAT = (TYPE = 'CSV');
```

#### 导出

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
- use_emulator 默认为false，当为true的时，url使用环境变量AZURITE_BLOB_STORAGE_URL或http://127.0.0.1:10000

#### 导入

```sql
COPY INTO air FROM 'azblob://test/air/'
    CONNECTION = (
        account = 'devstoreaccount1',
        access_key = '*****'
    )
    FILE_FORMAT = (TYPE = 'CSV'); 
```

#### 导出

```sql
COPY INTO 'azblob://test/air/' FROM air
    CONNECTION = (
        account = 'devstoreaccount1',
        access_key = '*****'
    )
    FILE_FORMAT = (TYPE = 'CSV'); 
```
