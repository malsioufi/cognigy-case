import { model } from 'mongoose';
import carMongooseSchema from '../schemas/car.schema';
import { Car } from '../schemas/types';

const CarModel = model<Car>('Car', carMongooseSchema);

export default CarModel;
