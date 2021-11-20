import express, { Router } from 'express';
import { connect } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import errorHandlingMiddleware from './middlewares/error-handling.middleware';
import { dbURL } from './configs/db.config';
import { OAS3SpecsFilePath, port } from './configs/app.config';

const specs = YAML.load(OAS3SpecsFilePath);

class App {
  public app: express.Application;
  public port: number;

  constructor(appRouter: Router) {
    this.app = express();
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(appRouter);
    this.initializeSwagger();
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

  private initializeSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(
        `Cars app listening at http://localhost:${this.port}\nAPI documentation available at http://localhost:${this.port}/api-docs`
      );
    });
  }
}

export default App;
