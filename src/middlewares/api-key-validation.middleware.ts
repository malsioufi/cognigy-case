import { HttpException } from '../exceptions/http.exception';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { API_KEY, API_KEY_HEADER } from '../configs/app.config';

const apiKeyValidationMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers[API_KEY_HEADER];
  //TODO: ApiKey's should be stored and retrieved from some collection in the database.
  if (apiKey === API_KEY) {
    next();
  } else if (!apiKey) {
    const message = `${API_KEY_HEADER} is not provided`;
    next(new HttpException(message, 403));
  } else {
    const message = `${API_KEY_HEADER} is invlid`;
    next(new HttpException(message, 401));
  }
};

export default apiKeyValidationMiddleWare;
