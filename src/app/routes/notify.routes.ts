import { Router } from 'express';
import auth from '../middlewares/auth/auth';
import NotifyController from '../module/Notify/controller';

const notifyRouter = Router();

notifyRouter.get('/getCountNotifications', auth, NotifyController.countLenghtNotificationsByUserNotRead);
notifyRouter.get('/getAllNotifications', auth, NotifyController.getAllNotifications);

export default notifyRouter;
