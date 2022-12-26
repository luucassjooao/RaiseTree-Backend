import { Router } from 'express';
import AuthController from '../../module/Auth/Controller';

const newAuthRouter = Router();

newAuthRouter.post('/login', AuthController.login);

export default newAuthRouter;
