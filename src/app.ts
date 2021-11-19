import express, { Router } from 'express';
import errorHandlingMiddleware from './middlewares/errorHandling.middleware';
import { connect } from 'mongoose';
import { dbURL } from './config/db.config';
import { port } from './config/app.config';

class App {
  public app: express.Application;
  public port: number;

  constructor(appRouter: Router) {
    this.app = express();
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(appRouter);
    this.initializeErrorHandling();
  }

  private connectToDatabase() {
    connect(dbURL)
      .then(() => {
        console.log('Successfully connected to the database');
      })
      .catch((err) => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
      });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes(appRouter: Router) {
    this.app.use(appRouter);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlingMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

export default App;
