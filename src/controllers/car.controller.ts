import { Request, Response } from 'express';
import CarModel from '../models/car.model';
import { sendError } from '../utils';

export const create = (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return sendError(res, 'Car content can not be empty');
  }

  const { brand, model, color, countryOfOrigin, yearOfCreation } = body;

  const car = new CarModel({
    brand,
    model,
    color,
    countryOfOrigin,
    yearOfCreation
  });

  car
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      const errorMessage = err.message || 'Some error occurred while creating the Car.';
      sendError(res, errorMessage, 500);
    });
};

export const findAll = (req: Request, res: Response) => {
  CarModel.find()
    .then((cars) => {
      res.send(cars);
    })
    .catch((err) => {
      const errorMessage = err.message || 'Some error occurred while retrieving cars.';
      sendError(res, errorMessage, 500);
    });
};

// Read the full data of an individual car.
export const findOne = (req, res) => {};

// Updaten single properties of a single car.
export const update = (req, res) => {};

// Delete an individual car
export const remove = (req, res) => {};
