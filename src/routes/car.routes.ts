import { create, findAll, findOne, remove, update } from '../controllers/car.controller';

const routers = (app) => {
  app.post('/cars', create);

  app.get('/cars', findAll);

  app.get('/cars/:CarId', findOne);

  app.put('/cars/:CarId', update);

  app.delete('/cars/:CarId', remove);
};
export default routers;
