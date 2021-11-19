import { Router } from 'express';
import carRouter from './car.route';

const appRouter = Router();

appRouter.use('/cars', carRouter);

export default appRouter;
