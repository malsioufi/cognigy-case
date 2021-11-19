import { Router } from 'express';
import carRouter from './car.routes';

const appRouter = Router();

appRouter.use('/cars', carRouter);

export default appRouter;
