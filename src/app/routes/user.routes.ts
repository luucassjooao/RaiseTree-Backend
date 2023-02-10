import { Router } from 'express';
import auth from '../middlewares/auth/auth';
import UserController from '../module/User/Controller';

const userRouter = Router();

userRouter.get('/profile', auth, UserController.profile);

export default userRouter;
