import { Router } from 'express';
import RegisterController from '../module/Register/Controller';

const registerRouter = Router();

registerRouter
  .post('/sendEmailForRegister', RegisterController.sendMailForRegister);
registerRouter
  .post('/activeUserWithCode', RegisterController.registerWithCode);
registerRouter
  .post('/activeTeacher', RegisterController.registerTeacher);

export default registerRouter;
