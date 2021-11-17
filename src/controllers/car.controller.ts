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

export const findOne = (req: Request, res: Response) => {
  const { id } = req.params;
  CarModel.findById(id)
    .then((car) => {
      if (!car) {
        const errorMessage = `Car not found with id ${id}`;
        return sendError(res, errorMessage, 404);
      }
      res.send(car);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const errorMessage = `Car not found with id ${id}`;
        return sendError(res, errorMessage, 404);
      }

      const errorMessage = `Error retrieving car with id ${id}`;
      sendError(res, errorMessage, 500);
    });
};

// Updaten single properties of a single car.
export const update = (req, res) => {};

// Delete an individual car
export const remove = (req, res) => {};
