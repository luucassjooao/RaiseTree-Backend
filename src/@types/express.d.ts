/* eslint-disable no-unused-vars */

import { TRequestUser } from '../app/module/User/repositories/IUserRepository';

declare global {
  namespace Express {
    interface Request {
      user: TRequestUser;
    }
  }
}

export {};
