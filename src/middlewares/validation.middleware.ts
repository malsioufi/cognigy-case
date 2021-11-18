import Ajv, { ErrorObject } from 'ajv';
import { HttpException } from '../exceptions/http.exception';
import { RequestHandler } from 'express';
import { carJsonSchema } from '../schemas/car.schema';

const ajv = new Ajv();

const validate = ajv.compile(carJsonSchema);

const validationMiddleware = (): RequestHandler => {
  return (req, res, next) => {
    const { body } = req;
    const valid = validate(body);
    if (!valid) {
      const message = validate.errors.map((error: ErrorObject) => `${error.dataPath} ${error.message}`).join(', ');
      next(new HttpException(message, 400));
    } else {
      next();
    }
  };
};

export default validationMiddleware;
