import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import AppError from '../../error';

// eslint-disable-next-line no-unused-vars
export default (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  if (err instanceof TokenExpiredError) {
    return response.status(400).json({ message1: 'Ocorreu um error!', message2: 'Faça o registro novamente!' });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
