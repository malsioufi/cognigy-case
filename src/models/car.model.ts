import { Schema, model } from 'mongoose';

interface Car {
  brand: string;
  model: string;
  color: string;
  countryOfOrigin: string;
  yearOfCreation: number;
}

const schama = new Schema<Car>(
  {
    brand: String,
    model: String,
    color: String,
    countryOfOrigin: String,
    yearOfCreation: Number
  },
  {
    timestamps: true
  }
);

const CarModel = model<Car>('Car', schama);

export default CarModel;
