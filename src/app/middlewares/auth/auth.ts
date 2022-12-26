/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../error';
import UserRepository from '../../module/User/repositories/implementation/UserRepository';
import { TUser } from '../../prisma/infosUser';
import { TStudent } from '../../prisma/student';
import { TTeacher } from '../../prisma/teacher';

type TDecodedAccess = {
  id: string;
  infosUser: {
    findUser: TUser;
    findInformationOfUser: TTeacher | TStudent;
  }
}

export default async function auth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;
  if (!authorization) throw new AppError('Invalid Authentication', 401);

  const token = authorization.replace('Bearer', '').trim();

  try {
    const decoded = <TDecodedAccess>(
      verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    );
    if (!decoded) throw new AppError('Invalid Authentication', 401);

    const user = await UserRepository.findId(decoded.id);
    if (!user) throw new AppError('Usuario não existe!');

    request.user = { ...user, password: '', code: '' };

    return next();
  } catch (error) {
    return response.status(500).json(error);
  }
}
