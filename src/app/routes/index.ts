import { Router } from 'express';
import newAuthRouter from './auth';
import newAnswerActivityRouter from './answerActivity';
import newDraftRouter from './draft';
import organizationRouter from './organization';
import newStaticUser from './staticUser';
import subjectRouter from './subject';
import newUserRouter from './user';
import studentRouter from './student';
import redisRoutes from './redis/redis.routes';
import activityRouter from './activity.routes';
import registerRouter from './register.routes';

const routes = Router();

routes.use('/api', organizationRouter);
routes.use('/api', registerRouter);
routes.use('/api', subjectRouter);
routes.use('/api', newStaticUser);
routes.use('/api', newAuthRouter);
routes.use('/api', activityRouter);
routes.use('/api', newAnswerActivityRouter);
routes.use('/api', newDraftRouter);
routes.use('/api', newUserRouter);
routes.use('/api', studentRouter);

routes.use('/api', redisRoutes);

export default routes;
