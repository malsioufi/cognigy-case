import { Router } from 'express';
import carRouter from './car.routes';

const appRouter = Router();

appRouter.use('/car', carRouter);

export default appRouter;
