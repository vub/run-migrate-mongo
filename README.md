# A simple global migrate-mongo runner
This command help developer able to config once and run migrate-mongo every where

## Install
npm install -g run-migrate-mongo

touch ~/.mongo_migration_env

Paste config:

```
MONGO_HOST=
MONGO_PORT=
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_DB=
```

## Usage
run-migrate-mongo path/to/migarete/folder