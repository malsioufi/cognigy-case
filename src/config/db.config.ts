import { env } from './app.config';

const dbConfig = {
  development: {
    dbHost: 'localhost',
    dbPort: 27017,
    dbName: 'cars'
  },
  production: {
    dbHost: 'mongo',
    dbPort: 27017,
    dbName: 'cars'
  }
};

const dbHost = dbConfig[env].dbHost;
const dbPort = dbConfig[env].dbPort;
const dbName = dbConfig[env].dbName;
export const dbURL = `mongodb://${dbHost}:${dbPort}/${dbName}`;
