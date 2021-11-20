import { env } from './app.config';

const dbConfig = {
  test: {
    dbHost: 'localhost',
    dbPort: 55555,
    dbName: 'cars'
  },
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

export const dbHost = dbConfig[env].dbHost; // Exported for tests
export const dbPort = dbConfig[env].dbPort; // Exported for tests
export const dbName = dbConfig[env].dbName; // Exported for tests

export const dbURL = `mongodb://${dbHost}:${dbPort}/${dbName}`;
