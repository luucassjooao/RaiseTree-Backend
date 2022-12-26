import { Request, Response } from 'express';
import Login from '../useCases/Login';

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const {
      email, password,
    } = request.body;

    const login = await Login(email, password);

    return response.status(200).json(login);
  }
}

export default new AuthController();
