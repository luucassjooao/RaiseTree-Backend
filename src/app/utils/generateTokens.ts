import { sign } from 'jsonwebtoken';

export function generateActiveToken(payload: object) {
  return sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: '15m',
  });
}

export function generateActiveTokenTeacher(payload: object) {
  return sign(payload, `${process.env.ACTIVE_TEACHER_TOKEN_SECRET}`, {
    expiresIn: '30d',
  });
}

export function generateAccessToken(payload: object) {
  return sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: '5d',
  });
}

export type TDecodedToken<T> = {
  id: string;
  iat: number;
  exp: number;
  infosToken: T;
}
