import { HttpException } from 'exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';

const errorHandlingMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(error.code).json({ message: error.message });
  } catch (error) {
    next(error);
  }
};

export default errorHandlingMiddleware;
