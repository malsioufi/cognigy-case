import { HttpException } from '../exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import CarModel from '../models/car.model';

export const create = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
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
    .then((createdCar) => {
      res.status(201).json(createdCar);
    })
    .catch((err) => {
      const errorMessage = err.message || 'Some error occurred while creating the Car.';
      next(new HttpException(errorMessage, 500));
    });
};

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  CarModel.find()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      const errorMessage = err.message || 'Some error occurred while retrieving cars.';
      next(new HttpException(errorMessage, 500));
    });
};

export const findOne = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  CarModel.findById(id)
    .then((car) => {
      if (!car) {
        const errorMessage = `Car not found with id ${id}`;
        next(new HttpException(errorMessage, 404));
      } else {
        res.status(200).json(car);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const errorMessage = `Car not found with id ${id}`;
        next(new HttpException(errorMessage, 404));
      } else {
        const errorMessage = `Error retrieving car with id ${id}`;
        next(new HttpException(errorMessage, 500));
      }
    });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const { id } = req.params;

  const { brand, model, color, countryOfOrigin, yearOfCreation } = body;

  CarModel.findByIdAndUpdate(
    id,
    {
      brand,
      model,
      color,
      countryOfOrigin,
      yearOfCreation
    },
    { new: true }
  )
    .then((car) => {
      if (!car) {
        const errorMessage = `Car not found with id ${id}`;
        next(new HttpException(errorMessage, 404));
      } else {
        res.status(200).json(car);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const errorMessage = `Car not found with id ${id}`;
        next(new HttpException(errorMessage, 404));
      } else {
        const errorMessage = `Error updating car with id ${id}`;
        next(new HttpException(errorMessage, 500));
      }
    });
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  CarModel.findByIdAndRemove(id)
    .then((car) => {
      if (!car) {
        const errorMessage = `Car not found with id ${id}`;
        next(new HttpException(errorMessage, 404));
      } else {
        res.status(200).json({ message: 'Car deleted successfully!' });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        const errorMessage = `Car not found with id ${id}`;
        next(new HttpException(errorMessage, 404));
      } else {
        const errorMessage = `Could not delete car with id ${id}`;
        next(new HttpException(errorMessage, 500));
      }
    });
};
