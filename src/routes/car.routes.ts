import { Router } from 'express';
import { create, findAll, findOne, remove, update } from '../controllers/car.controller';

const carRouter = Router();

carRouter.post('/', create);

carRouter.get('/', findAll);

carRouter.get('/:id', findOne);

carRouter.put('/:id', update);

carRouter.delete('/:id', remove);

export default carRouter;
