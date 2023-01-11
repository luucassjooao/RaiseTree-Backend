import { Router } from 'express';
import auth from '../../middlewares/auth/auth';
import authAdmin from '../../middlewares/auth/authAdmin';
import authTeacher from '../../middlewares/auth/authTeacher';
import ActivityController from '../../module/Activity/Controller';

const newActivityRouter = Router();

newActivityRouter.post('/createActivity/:idDraft', authTeacher, ActivityController.store);
newActivityRouter.get('/getUniqueById/:id', auth, ActivityController.getUniquerActivityById);
newActivityRouter.get('/getHomeActivities', auth, ActivityController.getAllActivitiesOfHome);
newActivityRouter.get('/adminGetActivity', authAdmin, ActivityController.adminGetActivity);

export default newActivityRouter;
