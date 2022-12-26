import { Request, Response } from 'express';
import Profile from '../useCases/Profile';

class UserController {
  async profile(request: Request, response: Response): Promise<Response> {
    const findUser = await Profile(request.user?.id as string);

    return response.status(200).json({ findUser });
  }
}

export default new UserController();
