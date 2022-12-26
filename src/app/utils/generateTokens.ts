import { sign } from 'jsonwebtoken';

export function generateActiveToken(payload: object) {
  return sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: '15m',
  });
}

export function generateAccessToken(payload: object) {
  return sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: '5d',
  });
}
