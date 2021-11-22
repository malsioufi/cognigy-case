import Ajv, { ErrorObject } from 'ajv';
import { RequestHandler, NextFunction, Request, Response } from 'express';

import { HttpException } from '../exceptions/http.exception';
import { getCarJsonSchema } from '../schemas/car.schema';
import { RquiredCarValidationFields } from '../schemas/types';

const ajv = new Ajv({ allErrors: true });

const carValidationMiddleware = (
  requiredFields: RquiredCarValidationFields = ['brand', 'model', 'color']
): RequestHandler => {
  const carJsonSchema = getCarJsonSchema(requiredFields);
  const validate = ajv.compile(carJsonSchema);

  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const valid = validate(body);
    if (!valid) {
      const message = validate.errors.map((error: ErrorObject) => `${error.message}`).join(', ');
      next(new HttpException(message, 400));
    } else {
      next();
    }
  };
};

export default carValidationMiddleware;
