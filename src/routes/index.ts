import { Router } from 'express';
import carRouter from './car.route';

const appRouter = Router();

appRouter.use('/cars', carRouter);
appRouter.get('/', (req, res) => {
  res.redirect('/api-docs');
});

export default appRouter;
