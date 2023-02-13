import { Router } from 'express';
import authStudent from '../middlewares/auth/authStudent';
import authTeacher from '../middlewares/auth/authTeacher';
import AnswerActivityController from '../module/AnswerActivity/Controller';

const answerActivityRouter = Router();

answerActivityRouter.post(
  '/registerAnswer/:activityId',
  authStudent,
  AnswerActivityController.store,
);
answerActivityRouter.patch(
  '/replyActivityOfStudent/:activityId/:answerId/:studentId',
  authTeacher,
  AnswerActivityController.replyAnswerOfStudent,
);
answerActivityRouter.get('/getAllAnswerAcitivityOfStudent/:studentId', authTeacher, AnswerActivityController.getAllAnswerActivityOfStudent);

export default answerActivityRouter;
