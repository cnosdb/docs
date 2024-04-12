---
sidebar_position: 2
---

# 导入导出

CnosDB 可以使用 SQL `COPY INTO` 把数据导出到本地或对象存储上，也可以把数据从对象存储和本地文件系统导入。

支持的文件格式有`CSV`、`JSON`、`PARQUET`，目前支持的对象存储有`AWS S3`, `Google Cloud Storage`, `Azure Blob Storage` 。

## 导出数据

### 导出到本地文件

#### Syntax

```sql
COPY INTO <path>
FROM [<database>.]<table_name>
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'}[,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
```

#### Parameter Description

| Name                             | Description                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------- |
| TYPE                             | 设置文件格式，分别为：`CSV`、`JSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`            |
| DELIMITER                        | 仅支持CSV，设置文件格式，示例：`DELIMITER = ','`                                           |
| WITH_HEADER | 仅支持CSV，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |

#### Example

##### 导出`PARQUET`文件到本地目录

```sql
COPY INTO 'file:///tmp/air/'
FROM "air"
FILE_FORMAT = (
     TYPE = 'PARQUET'
);
```

##### 导出`CSV`文件到本地目录，并且设置分隔符为`,`，且不设置表头

```sql
COPY INTO 'file:///tmp/air'
FROM "air"
FILE_FORMAT = (
    TYPE = 'CSV',
  	DELIMITER=',',
  	WITH_HEADER=false
);
```

### 导出到 AWS S3

#### Syntax

```sql
COPY INTO <s3://<bucket>[/<path>]>
FROM [database.]<table_name>
CONNECTION = (
    region = '<string>'
    , access_key_id = '<string>'
    , secret_key = '<string>'
    [, token = '<string>' ]
    [, virtual_hosted_style = true | false ]
)
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
```

#### Parameter Description

| Name                                                    | Description                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| TYPE                                                    | 设置文件格式，分别为：`CSV`、`JSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`              |
| DELIMITER                                               | 仅支持`CSV`，设置文件格式，示例：`DELIMITER = ','`                                           |
| WITH_HEADER                        | 仅支持`CSV`，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| region                                                  | AWS 地区代码                                                                       |
| access_key_id | 访问密钥 ID                                                                        |
| secret_key                         | 密钥                                                                             |
| token                                                   | （可选）临时授权令牌                                                                     |

#### Example

##### 将数据导出成`CSV`存储到 AWS S3，指定分隔符为`,`，并设置表头

```sql
COPY INTO 's3://tmp/air' 
FROM "air"
CONNECTION = (
    region = 'us‑east‑1',
    access_key_id = '****************',
    secret_key = '****************'
)
FILE_FORMAT = (
  TYPE = 'CSV',
  DELIMITER = ',',
  WITH_HEADER = true
);
```

##### 将数据导出成`PARQUET`存储到 AWS S3

```sql
COPY INTO 's3://tmp/air'
FROM "air"
CONNECTION = (
    region = 'us‑east‑1',
    access_key_id = '****************',
    secret_key = '****************'
)
FILE_FORMAT = (
  	TYPE = 'PARQUET'
);
```

### 导出到 Google Cloud Storage

#### Syntax

```sql
COPY INTO 'gcs://<bucket>[/<path>]'
FROM [<database>.]<table_name>
CONNECTION = (
    gcs_base_url = '<string>' 
  	[, disable_oauth = true | false] 
  	[, client_email = '<string>'] 
  	[, private_key = '<string>']
)
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'}[,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
```

#### Parameter Description

| Name                                                   | Description                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| TYPE                                                   | 设置文件格式，分别为：`CSV`、`NOJSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`          |
| DELIMITER                                              | 仅支持CSV，设置文件格式，示例：`DELIMITER = ','`                                           |
| WITH_HEADER                       | 仅支持CSV，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| gcs_base_url | Google Cloud Storage 的基础 URL                                                 |
| disable_oauth                     | （可选）是否禁用 OAuth，默认为 `false`                                                   |
| client_email                      | （可选）服务账号的电子邮件地址，仅在不禁用 OAuth 时需要                                              |
| private_key                       | （可选）服务账号的私钥，仅在不禁用 OAuth 时需要                                                  |

#### Example

##### 将数据导出成 `NDJSON` 存储到 Google Cloud Storage

```shell
COPY INTO 'gcs://tmp/air'
FROM "air"
CONNECTION = (
    gcs_base_url = 'https://storage.googleapis.com',
    disable_oauth = false,
    client_email = 'service_account@example.com',
    private_key = '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----'
)
FILE_FORMAT = (
    TYPE = 'NDJSON'
);
```

##### 将数据导出成 `CSV` 存储到 Google Cloud Storage

```sql
COPY INTO 'gcs://tmp/air'
FROM air
CONNECTION = (
    gcs_base_url = 'https://storage.googleapis.com',
    disable_oauth = false,
    client_email = 'service_account@example.com',
    private_key = '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----'
)
FILE_FORMAT = (
    TYPE = 'CSV',
    DELIMITER = ',',
    WITH_HEADER = true
);
```

### 导出到 Azure Blob Storage

#### Syntax

```sql
COPY INTO 'azblob://<container>[/<path>]'
FROM [<database>.]<table_name>
CONNECTION = (
    account = '<string>' 
  	[, access_key = '<string>'] 
  	[, bearer_token = '<string>']
)
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'}[,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
```

#### Parameter Description

> 这些参数提供了与Azure存储账户的连接和身份验证所需的信息。根据具体情况，你可能会使用access_key进行身份验证，或者使用bearer_token来进行身份验证。

| Name                              | Description                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| TYPE                              | 设置文件格式，分别为：`CSV`、`NOJSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`                      |
| DELIMITER                         | 仅支持CSV，设置文件格式，示例：`DELIMITER = ','`                                                       |
| WITH_HEADER  | 仅支持CSV，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)`             |
| account                           | Azure存储账户的名称，指定要连接的存储账户。                                                                 |
| access_key   | 存储账户的访问密钥，用于进行身份验证和授权。                                                                   |
| bearer_token | 身份验证所需的令牌，可以替代access_key进行身份验证。                                     |
| use_emulator | 默认为`false`，当为 `true` 时，`url`使用环境变量 `AZURITE_BLOB_STORAGE_URL` 或 `http://127.0.0.1:10000` |

#### Example

##### 将数据导出成 `CSV` 存储到 Azure Blob Storage，指定分隔符为`,`，并设置表头

```sql
COPY INTO 'azblob://tmp/air'
FROM "air"
CONNECTION = (
    account = '***********',
    access_key = '****************'
)
FILE_FORMAT = (
    TYPE = 'CSV',
    DELIMITER = ',',
    WITH_HEADER = true
);
```

##### 将数据导出成 `PARQUET` 存储到 Microsoft Azure Blob Storage

```sql
COPY INTO 'azblob://tmp/air'
FROM "air"
CONNECTION = (
    account = '***********',
    access_key = '****************'
)
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```

## 导入数据

> 导入之前，请确定目标表已经存在，并且列名和列的类型对应。

### 从本地导入数据

#### Syntax

```sql
COPY INTO [database.]<table_name>[(<time_col>, <field_col> [,field_col] ...[,TAGS (<tag_col> [, tag_col] ...])]
FROM '<path>'
FILE_FORMAT (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
COPY_OPTIONS (
    auto_infer_schema = true | false
)
```

#### Parameter Description

| Name                                                        | 说明                                                                           |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| TYPE                                                        | 设置文件格式，分别为：`CSV`、`NOJSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`          |
| DELIMITER                                                   | 仅支持CSV，设置文件格式，示例：`DELIMITER = ','`                                           |
| WITH_HEADER                            | 仅支持CSV，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| auto_infer_schema | 是否自动推断文件的 `schema`，如果为`false`则使用目标表的`schema`                                 |

#### Example

##### 从本地目录导入`PARQUET`文件

```sql
COPY INTO "air"
FROM 'file:///tmp/air/'
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```

##### 从本地目录导入`CSV`文件

> `DELIMITER=','` 表示文件以`,`分隔。
>
> `WITH_HEADER = true` 表示文件有表头。
>
> `auto_infer_schema = true` 表示会自动推断表头

```sql
COPY INTO "air"
FROM "file:///tmp/air/"
FILE_FORMAT = (
    TYPE = 'CSV',
  	DELIMITER=',',
  	WITH_HEADER = true
)
COPY_OPTIONS = (
  	auto_infer_schema = false
);
```

### 从 AWS S3 导入数据

#### Syntax

```sql
COPY INTO [database.]<table_name>[(<time_col>, <field_col> [,field_col] ...[,TAGS (<tag_col> [, tag_col] ...])]
FROM 's3://<bucket>[/<path>]'
CONNECTION = (
    region = '<string>'
    , access_key_id = '<string>'
    , secret_key = '<string>'
    [, token = '<string>' ]
    [, virtual_hosted_style = true | false ]
)
FILE_FORMAT (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
COPY_OPTIONS = (
  auto_infer_schema = true | false
)
```

#### Parameter Description

| Name                                                        | Description                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| TYPE                                                        | 设置文件格式，分别为：`CSV`、`JSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`            |
| DELIMITER                                                   | 仅支持CSV，设置文件格式，示例：`DELIMITER = ','`                                           |
| WITH_HEADER                            | 仅支持CSV，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| auto_infer_schema | 是否自动推断文件的 `schema`，如果为`false`则使用目标表的`schema`                                 |
| region                                                      | AWS 地区代码                                                                     |
| access_key_id     | 访问密钥 ID                                                                      |
| secret_key                             | 密钥                                                                           |
| token                                                       | （可选）临时授权令牌                                                                   |

#### Example

##### 将 `AWS S3` 上的`CSV`数据导入

> `DELIMITER=','` 表示文件以`,`分隔。
>
> `WITH_HEADER = true` 表示文件有表头。
>
> `auto_infer_schema = true` 表示会自动推断表头

```sql
COPY INTO "air" 
FROM 's3://temp/air'
CONNECTION = (
    region = 'us‑east‑1',
    access_key_id = '****************',
    secret_key = '****************'
)
FILE_FORMAT = (
		TYPE = 'CSV',
		DELIMITER = ',',
		WITH_HEADER = true
);
```

##### 将  `AWS S3` 上的 `PARQUET`  数据导入

```sql
COPY INTO "air"
FROM 's3://tmp/air'
CONNECTION = (
    region = 'us‑east‑1',
    access_key_id = '****************',
    secret_key = '****************'
)
FILE_FORMAT = (
		TYPE = 'PARQUET'
);
```

### 从  Google Cloud Storage 导入数据

#### Syntax

```sql
COPY INTO [database.]<table_name>[(<time_col>, <field_col> [,field_col] ...[,TAGS (<tag_col> [, tag_col] ...])]
FROM 'gcs://<bucket>[/<path>]'
CONNECTION = (
    gcs_base_url = '<string>' 
  	[, disable_oauth = true | false] 
  	[, client_email = '<string>'] 
  	[, private_key = '<string>']
)
FILE_FORMAT (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
COPY_OPTIONS = (
  auto_infer_schema = true | false
)
```

#### Parameter Description

| Name                                                        | Description                                                                  |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| TYPE                                                        | 设置文件格式，分别为：`CSV`、`NOJSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`          |
| DELIMITER                                                   | 仅支持CSV，设置文件格式，示例：`DELIMITER = ','`                                           |
| WITH_HEADER                            | 仅支持CSV，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| auto_infer_schema | 是否自动推断文件的 `schema`，如果为`false`则使用目标表的`schema`                                 |
| gcs_base_url      | Google Cloud Storage 的基础 URL                                                 |
| disable_oauth                          | （可选）是否禁用 OAuth，默认为 `false`                                                   |
| client_email                           | （可选）服务账号的电子邮件地址，仅在不禁用 OAuth 时需要                                              |
| private_key                            | （可选）服务账号的私钥，仅在不禁用 OAuth 时需要                                                  |

#### Example

##### 将 ` Google Cloud Storage` 上的 `NDJSON` 数据导入

```sql
COPY INTO 'gcs://tmp/air'
FROM air
CONNECTION = (
    gcs_base_url = 'https://storage.googleapis.com',
    disable_oauth = false,
    client_email = 'service_account@example.com',
    private_key = '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----'
)
FILE_FORMAT = (
    TYPE = 'NDJSON'
);
```

##### 将 ` Google Cloud Storage` 上的 `CSV` 数据导入

```sql
COPY INTO 'gcs://tmp/air'
FROM air
CONNECTION = (
    gcs_base_url = 'https://storage.googleapis.com',
    disable_oauth = false,
    client_email = 'service_account@example.com',
    private_key = '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----'
)
FILE_FORMAT = (
    TYPE = 'CSV',
    DELIMITER = ',',
    WITH_HEADER = true
);
```

### 从 Azure Blob Storage 导入数据

#### Syntax

```sql
COPY INTO [database.]<table_name>[(<time_col>, <field_col> [,field_col] ...[,TAGS (<tag_col> [, tag_col] ...])]
FROM 'azblob://<container>[/<path>]'
CONNECTION = (
    account = '<string>' 
  	[, access_key = '<string>'] 
  	[, bearer_token = '<string>']
)
FILE_FORMAT (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
COPY_OPTIONS = (
  auto_infer_schema = true | false
)
```

#### Parameter Description

| Name                              | Description                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| TYPE                              | 设置文件格式，分别为：`CSV`、`NOJSON`、`PARQUET`，示例：`FILE_FORMAT = (TYPE='CSV')`                      |
| DELIMITER                         | 仅支持CSV，设置文件格式，示例：`DELIMITER = ','`                                                       |
| WITH_HEADER  | 仅支持CSV，是否带有表头，默认为 `true`，示例：示例：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)`             |
| account                           | Azure存储账户的名称，指定要连接的存储账户。                                                                 |
| access_key   | 存储账户的访问密钥，用于进行身份验证和授权。                                                                   |
| bearer_token | 身份验证所需的令牌，可以替代access_key进行身份验证。                                     |
| use_emulator | 默认为`false`，当为 `true` 时，`url`使用环境变量 `AZURITE_BLOB_STORAGE_URL` 或 `http://127.0.0.1:10000` |

#### Example

##### 将 Azure Blob Storage 上的 `CSV` 数据导入

```sql
COPY INTO "air"
FROM 'azblob://tmp/air'
CONNECTION = (
    account = '***********',
    access_key = '****************'
)
FILE_FORMAT = (
    TYPE = 'CSV',
    DELIMITER = ',',
    WITH_HEADER = true
);
```

##### 将 Azure Blob Storage 上的 `PARQUET` 数据导入

```sql
COPY INTO "air"
FROM 'azblob://tmp/air'
CONNECTION = (
    account = '***********',
    access_key = '****************'
)
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```
