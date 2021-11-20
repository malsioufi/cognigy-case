import mongoose from 'mongoose';

export const MOCK_DATA = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    brand: 'test brand 1',
    color: 'test color 1',
    model: 'test model 1',
    countryOfOrigin: 'test countryOfOrigin 1',
    yearOfCreation: 2001
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    brand: 'test brand 2',
    color: 'test color 2',
    model: 'test model 2',
    countryOfOrigin: 'test countryOfOrigin 2',
    yearOfCreation: 2002
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    brand: 'test brand 3',
    color: 'test color 3',
    model: 'test model 3',
    countryOfOrigin: 'test countryOfOrigin 3',
    yearOfCreation: 2003
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    brand: 'test brand 4',
    color: 'test color 4',
    model: 'test model 4',
    countryOfOrigin: 'test countryOfOrigin 4',
    yearOfCreation: 2004
  }
];
