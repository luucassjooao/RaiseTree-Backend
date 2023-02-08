import { Router } from 'express';
import auth from '../middlewares/auth/auth';
import authTeacher from '../middlewares/auth/authTeacher';
import ActivityController from '../module/Activity/Controller';

const activityRouter = Router();

activityRouter.post('/createActivity', authTeacher, ActivityController.store);
activityRouter.post('/createActivitywithDraft/:idDraft', authTeacher, ActivityController.createActivityWithDraft);
activityRouter.get('/getUniqueById/:id', auth, ActivityController.getUniquerActivityById);
activityRouter.get('/getHomeActivities', auth, ActivityController.getAllActivitiesOfHome);

export default activityRouter;
