import { Schema } from 'mongoose';
import { Car, RquiredCarValidationFields } from './types';

const carMongooseSchema = new Schema<Car>(
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

export const getCarJsonSchema = (required: RquiredCarValidationFields) => ({
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  required,
  properties: {
    brand: {
      type: 'string',
      minLength: 3,
      maxLength: 50
    },
    model: {
      type: 'string',
      minLength: 3,
      maxLength: 50
    },
    color: {
      type: 'string',
      minLength: 3,
      maxLength: 50
    },
    countryOfOrigin: {
      type: 'string',
      minLength: 2,
      maxLength: 50
    },
    yearOfCreation: {
      type: 'number',
      minimum: 1886
    }
  },
  additionalProperties: false
});

export default carMongooseSchema;
