---
sidebar_position: 2
---

# Import and Export

CnosDB can export data to local or object storage using SQL `COPY INTO`, or import data from object storage and local file systems.

Supported file formats include `CSV`, `JSON`, `PARQUET`, currently supported object storage includes `AWS S3`, `Google Cloud Storage`, `Azure Blob Storage`.

## Export data

### Export to local file

#### Syntax

```sql
COPY INTO <path>
FROM [<database>.]<table_name>
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'}[,DELIMITER = '<character>'] [,WITH_HEADER = true | false]
)
```

#### Parameter Description

| Name                             | Description                                                                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                             | Set the file format to: `CSV`, `JSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                    |
| DELIMITER                        | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                              |
| WITH_HEADER | Only supports CSV, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |

#### Example

##### Export `PARQUET` files to local directory

```sql
COPY INTO 'file:///tmp/air/'
FROM "air"
FILE_FORMAT = (
     TYPE = 'PARQUET'
);
```

##### Export the `CSV` file to the local directory, and set the delimiter to `, ` without setting the header

```sql
COPY INTO 'file:///tmp/air'
FROM "air"
FILE_FORMAT = (
    TYPE = 'CSV',
  	DELIMITER=',',
  	WITH_HEADER=false
);
```

### Export to AWS S3

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

| Name                                                    | Description                                                                                                                                                      |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                    | Set the file format to: `CSV`, `JSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                      |
| DELIMITER                                               | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                                |
| WITH_HEADER                        | Only supports `CSV`, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| region                                                  | AWS Region Code                                                                                                                                                  |
| access_key_id | Access key ID                                                                                                                                                    |
| secret_key                         | Secret Key                                                                                                                                                       |
| token                                                   | (Optional) Temporary Authorization Token                                                                                                      |

#### Example

##### Export data to `CSV` and store it in AWS S3, specify delimiter as `, `, and set table header

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

##### Export data to `PARQUET` and store it in AWS S3

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

### Export to Google Cloud Storage

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

| Name                                                   | Description                                                                                                                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                   | Set the file format to: `CSV`, `NOJSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                  |
| DELIMITER                                              | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                              |
| WITH_HEADER                       | Only supports CSV, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| gcs_base_url | Base URL of Google Cloud Store                                                                                                                                 |
| disable_oauth                     | (Optional) Whether to disable OAuth, default is `false`                                                                                     |
| client_email                      | (Optional) The email address of the service account, only required when OAuth is not disabled                                               |
| private_key                       | (Optional) The private key of the service account, only required when OAuth is not disabled                                                 |

#### Example

##### Export data as `NDJSON` to Google Cloud Storage

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

##### Export data as `CSV` to Google Cloud Storage

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

### Export to Azure Blob Storage

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

> These parameters provide the information needed to connect to and authenticate with Azure storage accounts.Depending on the specific situation, you may authenticate using access_key, or authenticate using bearer_token.

| Name                              | Description                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                              | Set the file format to: `CSV`, `NOJSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                  |
| DELIMITER                         | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                              |
| WITH_HEADER  | Only supports CSV, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| account                           | The name of the Azure storage account, specifying the storage account to connect to.                                                           |
| access_key   | Access key for storing accounts, used for authentication and authorization.                                                                    |
| bearer_token | The token required for authentication, which can be used in place of the access_key for authentication purposes.          |
| use_emulator | Defaults to `false`, when set to `true`, `url` uses environment variable `AZURITE_BLOB_STORAGE_URL` or `http://127.0.0.1:10000`                                |

#### Example

##### Export data to `CSV` and store it in Azure Blob Storage, specify delimiter as `, `, and set table header

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

##### Export data as `PARQUET` to Microsoft Azure Blob Storage

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

## Import data

> Before importing, please make sure the target table already exists and that the column names and types correspond.

### Import Data Locally

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

| Name                                                        | Description                                                                                                                                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                        | Set the file format to: `CSV`, `NOJSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                  |
| DELIMITER                                                   | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                              |
| WITH_HEADER                            | Only supports CSV, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| auto_infer_schema | Whether to automatically infer the `schema` of the file, if set to `false`, the `schema` of the target table will be used                                      |

#### Example

##### Import `PARQUET` files from local directory

```sql
COPY INTO "air"
FROM 'file:///tmp/air/'
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```

##### Import `CSV` file from local directory

> `DELIMITER=','` indicates that the file is delimited by ','.
>
> `WITH_HEADER = true` indicates that the file has a header.
>
> `auto_infer_schema = true` indicates that the header will be automatically inferred

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

### Import data from AWS S3

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

| Name                                                        | Description                                                                                                                                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                        | Set the file format to: `CSV`, `JSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                    |
| DELIMITER                                                   | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                              |
| WITH_HEADER                            | Only supports CSV, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| auto_infer_schema | Whether to automatically infer the `schema` of the file, if set to `false`, the `schema` of the target table will be used                                      |
| region                                                      | AWS Region Code                                                                                                                                                |
| access_key_id     | Access key ID                                                                                                                                                  |
| secret_key                             | Secret Key                                                                                                                                                     |
| token                                                       | (Optional) Temporary Authorization Token                                                                                                    |

#### Example

##### Import CSV data from `AWS S3`

> `DELIMITER=','` indicates that the file is delimited by ','.
>
> `WITH_HEADER = true` indicates that the file has a header.
>
> `auto_infer_schema = true` indicates that the header will be automatically inferred

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

##### Import `PARQUET` data from `AWS S3`

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

### Import data from Google Cloud Storage

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

| Name                                                        | Description                                                                                                                                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                        | Set the file format to: `CSV`, `NOJSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                  |
| DELIMITER                                                   | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                              |
| WITH_HEADER                            | Only supports CSV, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| auto_infer_schema | Whether to automatically infer the `schema` of the file, if set to `false`, the `schema` of the target table will be used                                      |
| gcs_base_url      | Base URL of Google Cloud Store                                                                                                                                 |
| disable_oauth                          | (Optional) Whether to disable OAuth, default is `false`                                                                                     |
| client_email                           | (Optional) The email address of the service account, only required when OAuth is not disabled                                               |
| private_key                            | (Optional) The private key of the service account, only required when OAuth is not disabled                                                 |

#### Example

##### Import `NDJSON` data from Google Cloud Storage\`

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

##### Import data from `Google Cloud Storage` with `CSV` data

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

### Import data from Azure Blob Storage

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

| Name                              | Description                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE                              | Set the file format to: `CSV`, `NOJSON`, `PARQUET`, for example: `FILE_FORMAT = (TYPE='CSV')`                                  |
| DELIMITER                         | Only support CSV, set file format, for example: `DELIMITER = ','`                                                                              |
| WITH_HEADER  | Only supports CSV, whether it has a header, default is `true`, example: example: `FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| account                           | The name of the Azure storage account, specifying the storage account to connect to.                                                           |
| access_key   | Access key for storing accounts, used for authentication and authorization.                                                                    |
| bearer_token | The token required for authentication, which can be used in place of the access_key for authentication purposes.          |
| use_emulator | Defaults to `false`, when set to `true`, `url` uses environment variable `AZURITE_BLOB_STORAGE_URL` or `http://127.0.0.1:10000`                                |

#### Example

##### Import `CSV` data from Azure Blob Storage

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

##### Import `PARQUET` data from Azure Blob Storage

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