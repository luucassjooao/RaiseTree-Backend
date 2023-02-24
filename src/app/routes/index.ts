import { Router } from 'express';
import redisRoutes from './redis/redis.routes';
import activityRouter from './activity.routes';
import registerRouter from './register.routes';
import staticRouter from './staticUser.routes';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import subjectRouter from './subject.routes';
import studentRouter from './student.routes';
import draftRouter from './draft.routes';
import answerActivityRouter from './answerActivity.routes';
import notifyRouter from './notify.routes';

const routes = Router();

routes.use('/api', registerRouter);
routes.use('/api', subjectRouter);
routes.use('/api', staticRouter);
routes.use('/api', authRouter);
routes.use('/api', activityRouter);
routes.use('/api', answerActivityRouter);
routes.use('/api', draftRouter);
routes.use('/api', userRouter);
routes.use('/api', studentRouter);
routes.use('/api', notifyRouter);

routes.use('/api', redisRoutes);

export default routes;
