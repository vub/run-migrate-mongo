#!/usr/bin/env node
const { database, config, up, status } = require('migrate-mongo');

const DEFAULT_CONFIG_FILE = '/.mongo_migration_env';

const HOME_DIR = require('os').homedir();
require('dotenv').config({ path: HOME_DIR + DEFAULT_CONFIG_FILE });
const { printTable } = require('console-table-printer');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const mongoDb = process.env.MONGO_DB;
const migrationDir = null || process.argv[2];

const connectionUrl = `mongodb://${username}:${password}@${host}:${port}/${mongoDb}`;

const globalConfig = {
  mongodb: {
    url: connectionUrl,
    options: { useNewUrlParser: true }
  },
  migrationsDir: migrationDir,
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js'
};

(async () => {
  try {
    console.log('Run migrate-mongo up');

    // console.log(username, password, host, port, mongoDb);
    config.set(globalConfig);

    // console.log('CONFIGURE');
    // const mongoConnectionSettings = await config.read();
    // console.log(mongoConnectionSettings);

    console.log('RUN MIGRATION');
    const { db, client } = await database.connect();
    const migrated = await up(db, client);
    migrated.forEach(fileName => console.log('Migrated:', fileName));
    console.log(`Migrated up files: ${migrated.length}`);
    console.log(migrated)

    const migrationStatus = await status(db);
    console.log('STATUS');
    printTable(migrationStatus);
    await client.close();
    // process.kill(process.pid);
  } catch (err) {
    console.error(err);
  }
})();