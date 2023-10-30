---
title: Backup and Restore
order: 6
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

## cnosdb-imexport

cnosdb-imexport is a tool for importing, exporting and migrating cluster data. Ability to export entire cluster Data (Meta, Data) to disk files, object Storage systems (`AWS S3`, `Google Cloud Storage`, `Microsoft Azure` supported); It is also possible to restore the exported data to the cluster; It is also possible to migrate data between two clusters.

### Cluster Data Export

Exporting all the cluster Table data to the specified location will generate two files (`./meta_data.src`, `./schema_data.src`) in the running directory with the metadata of the exported data, together with the Table export data to form a complete backup of the cluster data.

Note: If the backup is to a disk file, the Table backup data is generated at the CnosDB node receiving the request.

```shell
./cnosdb-imexport export --src user:password@ip:port --path file:///tmp/migrate
# --src the address of the CnosDB cluster to export
# --path export data location, same usage: import export
# --conn optional, if the export location is required for the object storage system, use the same as: import and export
```

### Cluster Data Import

Restore the exported data to the CnosDB cluster. Make sure the cluster is free before restoring, otherwise an overwrite write will occur. Make sure the backup meta information (`./meta_data.src`, `./schema_data.src`) is on the same level as the tools before running.

Note: If the data to be imported is a disk file, also make sure that the Table backup data is placed on the CnosDB node receiving the request before restoring.

```shell
./cnosdb-imexport -- import --dst user:password@ip:port --path file:///tmp/migrate
# --dst imports the address of the CnosDB cluster, note the user, password permissions
# --path Import data location, same usage as: import export
# --conn optional parameter, if the import data location is required for the object storage system, use the same as: import and export
```

### Cluster Data Migration

Data migration can be used to migrate the data of an entire cluster to another CnosDB cluster.

Note: During the migration process, the staging area of data is in the disk file. Please ensure that cnosdb-imexport and the import and export cluster are on the same machine.

```shell
./cnosdb-imexport -- migrate --src user:password@ip:port --dst user:password@ip:port --path file:///tmp/migrate
# --src the address of the CnosDB cluster to export
# --dst imports the address of the CnosDB cluster, note the user, password permissions
# -- Staging area for data during path migration.
# --conn optional argument, if the path argument is required for the object storage system, use the same as: import export
```