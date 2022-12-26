import { NextFunction, Request, Response } from 'express';

export default (request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', `${process.env.BASE_URL}`);
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Allow-Max-Age', '10');
  next();
};
