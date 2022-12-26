import { Router } from 'express';
import auth from '../../middlewares/auth/auth';
import UserController from '../../module/User/Controller';

const newUserRouter = Router();

newUserRouter.get('/profile', auth, UserController.profile);

export default newUserRouter;
