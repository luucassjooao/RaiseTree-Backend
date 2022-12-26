import { Router } from 'express';
import RegisterController from '../../module/Register/Controller';

const newRegisterRouter = Router();

newRegisterRouter
  .post('/sendEmailForRegister', RegisterController.sendMailForRegister);
newRegisterRouter
  .post('/activeUserWithCode', RegisterController.registerWithCode);

export default newRegisterRouter;
