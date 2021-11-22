import { Router } from 'express';
import apiKeyValidationMiddleWare from '../middlewares/api-key-validation.middleware';
import carRouter from './car.route';

const appRouter = Router();

// Public routes
appRouter.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Private routes
appRouter.use(apiKeyValidationMiddleWare);
appRouter.use('/cars', carRouter);

export default appRouter;
