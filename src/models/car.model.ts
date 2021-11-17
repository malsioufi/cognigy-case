import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema(
  {
    id: Number,
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

const Car = mongoose.model('Car', CarSchema);
export default Car;
