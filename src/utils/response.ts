import { Response } from 'express';

/**
 * Sends error back to the client.
 * @param res The response object
 * @param errorMessage The error message
 * @param errorCode The error code. Default `400`
 */
export const sendError = (res: Response, errorMessage: string, errorCode = 400): void => {
  res.status(errorCode).send({ message: errorMessage });
};
