---
sidebar_position: 2
---

# Import Export

CnosDB can export data to local or object storage using SQL `COPY INTO`, or import data from object storage and local file systems.

Supported files are in `CSV', `JSON`, `PARQUET`. Currently supported objects are `AWS S3`, `Google Cloud Storage`, `Azure Blob Storage\`.

## Export data

### Export to local file

#### Syntax

```sql
COPY INTO <path>
FROM [<database><table_name>
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'}[, , ELIMITER = '<character>'] [, WTH_HEADER = true | false]

```

#### Parameter Description

| Name                             | Description                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| TYPE                             | Set file format to：`CSV`, `JSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                              |
| DELIMITER                        | Only CSV, set file format, example：`DELIMITER = ',`                                                            |
| CHAT_HEADER | Only CSV, with table headers, default to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |

#### Example

##### Export `PARQUET` file to local directory

```sql
COPY INTO 'file:// tmp/air/'
FROM "air"
FILE_FORMAT = (
     TYPE = 'PARQUET'
);
```

##### Export the `CSV` file to the local directory and set the separator to `,` without setting the header

```sql
COPY INTO 'file:/tmp/air'
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
    , secretariat_key = '<string>'
    [, token = '<string>' ]
    [, virtual_hosted_style = true | false ]
)
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [, ELIMITER = '<character>'] [,WTH_HEADER = true | false]

```

#### Parameter Description

| Name                                                    | Description                                                                                                       |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| TYPE                                                    | Set file format to：`CSV`, `JSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                                 |
| DELIMITER                                               | Only `CSV`, set file format, example：`DELIMITER = ',`                                                             |
| CHAT_HEADER                        | Only `CSV`, with table headers, defaults to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| Region                                                  | AWS Country Code                                                                                                  |
| access_key_id | Access Key ID                                                                                                     |
| secretariat_key                    | Key                                                                                                               |
| token                                                   | (optional) temporary authorization token                                                       |

#### Example

##### Export data to `CSV` storage to AWS S3, specify separator `,` and set the header

```sql
COPY INTO 's3://tmp/air' 
FROM "air"
CONNECTION = (
    region = 'useast1',
    access_key_id = '*************",
    secretariat_key = '*************
)
FILE_FORMAT = (
  TYPE = 'CSV',
  DELIMITER = ',',
  WITH_HEADER = true
);
```

##### Export data to `PARQUET` stored in AWS S3

```sql
COPY INTO 's3://tmp/air'
FROM "air"
CONNECTION = (
    region = 'useast1',
    access_key_id = '*************",
    secretariat_key = '***************
)
FILE_FORMAT = (
  	TYPE = 'PARQUET'
);
```

### Export to Google Cloud Store

#### Syntax

```sql
COPY INTO 'gcs:/<bucket>[/<path>]'
FROM [<database>.<table_name>
CONNECTION = (
    gcs_base_url = '<string>' 
  	[, disable_oauth = true | false] 
  	[, client_email = '<string>'] 
  	[, private_key = '<string>']
)
FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'}[, ELIMITER = '<character>'] [, WTH_HEADER = true | false]

```

#### Parameter Description

| Name                                                   | Description                                                                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| TYPE                                                   | Set file format to：`CSV`, `NOJSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                            |
| DELIMITER                                              | Only CSV, set file format, example：`DELIMITER = ',`                                                            |
| CHAT_HEADER                       | Only CSV, with table headers, default to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)` |
| gcs_base_url | Base URL of Google Cloud Store                                                                                 |
| disable_oauth                     | Optionally disable OAuth, default `false`                                                                      |
| client_email                      | (optional) service account email address, only required if OAuth is not disabled            |
| private key                                            | (optional) service account private key required only if OAuth is not disabled               |

#### Example

##### Export data to `NDJSON` stored in Google Cloud Storage

```shell
COPY INTO 'gcs://tmp/air'
FROM "air"
CONNECTION = (
    gcs_base_url = 'https://storage. oogleapis.com',
    disable_oauth = false,
    client_email = 'service_account@example. om',
    private_key = '--BEGIN PRIVATE KEY --\n...\n---END PRIVATE KEY ---

FILE_FORMAT = (
    TYPE = 'NDJSON'
);
```

##### Export data to `CSV` stored in Google Cloud Store

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

### Export to Azure Blob Store

#### Syntax

```sql
COPY INTO 'azblob:/<container>[/<path>]'
FROM [<database>.<table_name>
CONNECTION = (
    account = '<string>' 
  	[, access_key = '<string>'] 
  	[, bearer_token = '<string>']

FILE_FORMAT = (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'}[, ELIMITER = '<character>'] [, WITH_HEADER = true | false]

```

#### Parameter Description

> These parameters provide the information required for connection to and authentication of the Azure storage account.Depending on the circumstances, you may use access_key for authentication or bearer_token.

| Name                              | Description                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| TYPE                              | Set file format to：`CSV`, `NOJSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                                            |
| DELIMITER                         | Only CSV, set file format, example：`DELIMITER = ',`                                                                            |
| CHAT_HEADER  | Only CSV, with table headers, default to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)`                 |
| Account                           | The name of the Azure store account. Specify the store account to connect.                                                     |
| access_key   | Store account access keys for authentication and authorization.                                                                |
| bearer_token | The tokens required for authentication can be used instead of access_key for authentication.              |
| use_emulator | Default is `false`, when `true` is `url` using the environment variable `AZURITE_BLOB_STORAGE_URL` or `http://127.0.0.1:10000` |

#### Example

##### Export data to `CSV` stored in Azure Blob Storage, specify the separator to `,` and set the header

```sql
COPY INTO 'azblob:/tmp/air'
FROM "air"
CONNECTION = (
    account = '***********",
    access_key = '*************
)
FILE_FORMAT = (
    TYPE = 'CSV',
    DELIMITER = ',',
    WITH_HEADER = true
);
```

##### Export data to `PARQUET` stored in Microsoft Azure Blob Store

```sql
COPY INTO 'azblob:/tmp/air'
FROM "air"
CONNECTION = (
    account = '***********",
    access_key = '***************
)
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```

## Import Data

> Before importing, please make sure that the target table already exists and that the list and the type of the list correspond to it.

### Import data from local

#### Syntax

```sql
COPY INTO [database.]<table_name>(<time_col> <field_col> [, field_col] ...[, TAGS (<tag_col> [, tag_col]... )
FROM '<path>'
FILE_FORMAT (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [, DELIMITER = '<character>'] ITH_HEADER = true | false]
)
COPY_OPTITONS (
    auto_infer_schema = true | false
)
```

#### Parameter Description

| Name                                                        | Note                                                                                                                   |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                        | Set file format to：`CSV`, `NOJSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                                    |
| DELIMITER                                                   | Only CSV, set file format, example：`DELIMITER = ',`                                                                    |
| CHAT_HEADER                            | Only CSV, with table headers, default to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)`         |
| auto_infer_schema | Whether the `schema` of the file is automatically extrapolated and the `schema` of the target table if `false` is used |

#### Example

##### Import `PARQUET` file from local directory

```sql
COPY INTO "air"
FROM 'file:/tmp/air/'
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```

##### Import `CSV` file from local directory

> `DELIMITER=',` means a file separated by `,`.
>
> `ITH_HEADER = true` indicates that the file has a header.
>
> `auto_infer_schema = true` indicates that the header will be inferred automatically

```sql
COPY INTO "air"
FROM "file:/tmp/air/"
FILE_FORMAT = (
    TYPE = 'CSV',
  	DELIMITER=', ,
  	WITH_HEADER = true
)
COPY_OPTIONS = (
  	auto_informer_schema = false
);
```

### Import data from AWS S3

#### Syntax

```sql
COPY INTO [database.]<table_name>(<time_col> <field_col> [, field_col] ...[, TAGS (<tag_col> [, tag_col]... )
FROM 's3:/<bucket>[/<path>]'
CONNECTION = (
    region = '<string>'
    , access_key_id = '<string>'
    , secretariat_key = '<string>'
    [, token = '<string>' ]
    [, virtual_hosted_style = true | false ]
)
FILE_FORMAT (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [, ELIMITER = '<character>'] [, ITH_HEADER = true | false]
)
COPY_OPTIONS = (
  auto_infer_schema = true | false
)
```

#### Parameter Description

| Name                                                        | Description                                                                                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                        | Set file format to：`CSV`, `JSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                                      |
| DELIMITER                                                   | Only CSV, set file format, example：`DELIMITER = ',`                                                                    |
| CHAT_HEADER                            | Only CSV, with table headers, default to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)`         |
| auto_infer_schema | Whether the `schema` of the file is automatically extrapolated and the `schema` of the target table if `false` is used |
| Region                                                      | AWS Country Code                                                                                                       |
| access_key_id     | Access Key ID                                                                                                          |
| secretariat_key                        | Key                                                                                                                    |
| token                                                       | (optional) temporary authorization token                                                            |

#### Example

##### Import `CSV` data from `AWS S3`

> `DELIMITER=',` means a file separated by `,`.
>
> `ITH_HEADER = true` indicates that the file has a header.
>
> `auto_infer_schema = true` indicates that the header will be inferred automatically

```sql
COPY INTO "air" 
FROM 's3:/temp/air'
CONNECTION = (
    region = 'useast1',
    access_key_id = '*************",
    secretariat_key = '*************
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
    region = 'useast1',
    access_key_id = '*************",
    secretariat_key = '***************
)
FILE_FORMAT = (
		TYPE = 'PARQUET'
);
```

### Import data from Google Cloud Store

#### Syntax

```sql
COPY INTO [database.]<table_name>(<time_col>, <field_col> [,field_col] ...[,TAGS (<tag_col> [, tag_col] ...])
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

| Name                                                        | Description                                                                                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| TYPE                                                        | Set file format to：`CSV`, `NOJSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                                    |
| DELIMITER                                                   | Only CSV, set file format, example：`DELIMITER = ',`                                                                    |
| CHAT_HEADER                            | Only CSV, with table headers, default to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)`         |
| auto_infer_schema | Whether the `schema` of the file is automatically extrapolated and the `schema` of the target table if `false` is used |
| gcs_base_url      | Base URL of Google Cloud Store                                                                                         |
| disable_oauth                          | Optionally disable OAuth, default `false`                                                                              |
| client_email                           | (optional) service account email address, only required if OAuth is not disabled                    |
| private key                                                 | (optional) service account private key required only if OAuth is not disabled                       |

#### Example

##### Import `NDJSON` data from Google Cloud Storage\`

```sql
COPY INTO 'gcs://tmp/air'
FROM air
CONNECTION = (
    gcs_base_url = 'https://storage. oogleapis.com',
    disable_oauth = false,
    client_email = 'service_account@example. om',
    private_key = '--BEGIN PRIVATE KEY --\n...\n---END PRIVATE KEY ---

FILE_FORMAT = (
    TYPE = 'NDJSON'
);
```

##### Import `CSV` data from Google Cloud Storage\`

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

### Import data from Azure Blob Store

#### Syntax

```sql
COPY INTO [database.]<table_name>(<time_col> <field_col> [, field_col] ...[, TAGS (<tag_col> [, tag_col]... )
FROM 'azblob:/<container>[/<path>]'
CONNECTION = (
    account = '<string>' 
  	[, access_key = '<string>'] 
  	[, beareer_token = '<string>']
)
FILE_FORMAT (
    TYPE = {'CSV' | 'NDJSON' | 'PARQUET'} [, ELIMITER = '<character>'] [, ITH_HEADER = true | false]
)
COPY_OPTIONS = (
  auto_infer_schema = true | false
)
```

#### Parameter Description

| Name                              | Description                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| TYPE                              | Set file format to：`CSV`, `NOJSON`, `PARQUET`, example：`FILE_FORMAT = (TYPE='CSV')`                                            |
| DELIMITER                         | Only CSV, set file format, example：`DELIMITER = ',`                                                                            |
| CHAT_HEADER  | Only CSV, with table headers, default to `true`, example：Example：`FILE_FORMAT = (TYPE='CSV' WITH_HEADER=true)`                 |
| Account                           | The name of the Azure store account. Specify the store account to connect.                                                     |
| access_key   | Store account access keys for authentication and authorization.                                                                |
| bearer_token | The tokens required for authentication can be used instead of access_key for authentication.              |
| use_emulator | Default is `false`, when `true` is `url` using the environment variable `AZURITE_BLOB_STORAGE_URL` or `http://127.0.0.1:10000` |

#### Example

##### Import `CSV` data from Azure Blob Storage

```sql
COPY INTO "air"
FROM 'azblob:/tmp/air'
CONNECTION = (
    account = '***********",
    access_key = '*************
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
FROM 'azblob:/tmp/air'
CONNECTION = (
    account = '***********",
    access_key = '***************
)
FILE_FORMAT = (
    TYPE = 'PARQUET'
);
```
