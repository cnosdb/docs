---
title: Backup and Restore
order: 1
---

# Backup and Restore

CnosDB can use SQL `COPY INTO` to export data to local or object stores, as well as import data from object stores and local filesystems.

Supported file formats are CSV/JSON/PARQUET, and currently supported object stores are `AWS S3`, `Google Cloud Storage`, `Microsoft Azure`.


## Export

### Syntax

```sql
COPY INTO externalLocation
    FROM [<database>.]< table_name >
    [ CONNECTION = ( connection_options ) ]
    [ FILE_FORMAT = ( TYPE = { 'CSV' | 'JSON' | 'PARQUET'} [ formatTypeOptions ] ) ]
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

### Examples

- #### Export as CSV

    ```sql
    COPY INTO 'file:///tmp/air' FROM air
        FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
    ```

- #### Export as PARQUET

    ```sql
    COPY INTO 'file:///tmp/air' FROM air
        FILE_FORMAT = (TYPE = 'PARQUET');
    ```

- #### Export as JSON

    ```sql
    COPY INTO 'file:///tmp/air' FROM air
        FILE_FORMAT = (TYPE = 'JSON');
    ```

## Import

### Syntax

```sql
COPY INTO [<database>.]< table_name >
    FROM externalLocation
    [ CONNECTION = ( connection_options ) ]
    [ FILE_FORMAT = ( TYPE = { 'CSV' | 'JSON' | 'PARQUET' } [ formatTypeOptions ] ) ]
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

**Notice**: Before importing, make sure the target table already exists and that the column names match the column types.

### Examples

- #### Import CSV

    ```sql
    COPY INTO air FROM 'file:///tmp/air/'
        FILE_FORMAT = (TYPE = 'CSV', DELIMITER = ',');
    ```

- #### Import PARQUET

    ```sql
    COPY INTO air FROM 'file:///tmp/air/'
        FILE_FORMAT = (TYPE = 'PARQUET', DELIMITER = ',');
    ```

- #### Import JSON

    ```sql
    COPY INTO air FROM 'file:///tmp/air/'
        FILE_FORMAT = (TYPE = 'JSON', DELIMITER = ',');
    ```

## Object Store Examples

### AWS S3

- #### Import

    ```sql
    COPY INTO air FROM 's3://test/air/'
        CONNECTION = (
        region = 'us‑east‑1',
        access_key_id = '****************',
        secret_key = '****************'
        )
        FILE_FORMAT = (TYPE = 'CSV');
    ```

- #### Export

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

There are four parameters in the connection options for Google Cloud Storage:

- gcs_base_url
- disable_oauth: Turn off validation switch. If `false`, `client_email`, `private_key` parameters must be specified.
- client_email
- private_key

- #### Import

    ```sql
    COPY INTO air FROM 'gcs://test/air/'
        CONNECTION = (
        gcs_base_url = 'http://localhost:4443',
        disable_oauth = true
        )
        FILE_FORMAT = (TYPE = 'CSV');
    ```

- #### Export

    ```sql
    COPY INTO 'gcs://test/air' FROM air
        CONNECTION = (
        gcs_base_url = 'http://localhost:4443',
        disable_oauth = true
        )
        FILE_FORMAT = (TYPE = 'CSV');
    ```

### Microsoft Azure

There four parameters in the connection options for Microsoft Azure:

- account
- access_key
- bearer_token
- use_emulator The default is `false`, and when `true`, the url uses the environment variable` AZURITE_BLOB_STORAGE_URL` or `http://127.0.0.1:10000` .

- #### Import

    ```sql
    COPY INTO air FROM 'azblob://test/air/'
        CONNECTION = (
            account = 'devstoreaccount1',
            access_key = '*****'
        )
        FILE_FORMAT = (TYPE = 'CSV'); 
    ```

- #### Export

    ```sql
    COPY INTO 'azblob://test/air/' FROM air
        CONNECTION = (
            account = 'devstoreaccount1',
            access_key = '*****'
        )
        FILE_FORMAT = (TYPE = 'CSV'); 
    ```
