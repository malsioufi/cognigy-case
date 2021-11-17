import express from 'express';
import mongoose from 'mongoose';

import { dbURL } from './config/db.config';
import appRouter from './routes';

const PORT = 3000;

const app = express();
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
