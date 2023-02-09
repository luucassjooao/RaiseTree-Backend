import { Router } from 'express';
import AuthController from '../module/Auth/Controller';

const authRouter = Router();

authRouter.post('/login', AuthController.login);

export default authRouter;
