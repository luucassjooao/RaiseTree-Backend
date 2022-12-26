import { Router } from 'express';
import authStudent from '../../middlewares/auth/authStudent';
import authTeacher from '../../middlewares/auth/authTeacher';
import AnswerActivityController from '../../module/AnswerActivity/Controller';

const newAnswerActivityRouter = Router();

newAnswerActivityRouter.post(
  '/registerAnswer/:activityId',
  authStudent,
  AnswerActivityController.store,
);
newAnswerActivityRouter.patch(
  '/replyActivityOfStudent/:activityId/:answerId/:studentId',
  authTeacher,
  AnswerActivityController.replyAnswerOfStudent,
);

export default newAnswerActivityRouter;
