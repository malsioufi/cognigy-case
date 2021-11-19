import { Router } from 'express';
import carValidationMiddleware from '../middlewares/car-validation.middleware';
import { create, findAll, findOne, remove, update } from '../controllers/car.controller';

const carRouter = Router();

carRouter.post('/', carValidationMiddleware(), create);

carRouter.get('/', findAll);

carRouter.get('/:id', findOne);

carRouter.put('/:id', carValidationMiddleware([]), update);

carRouter.delete('/:id', remove);

export default carRouter;
