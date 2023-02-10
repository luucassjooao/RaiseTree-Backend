import { Router } from 'express';
import newAnswerActivityRouter from './answerActivity';
import newDraftRouter from './draft';
import studentRouter from './student';
import redisRoutes from './redis/redis.routes';
import activityRouter from './activity.routes';
import registerRouter from './register.routes';
import staticRouter from './staticUser.routes';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import subjectRouter from './subject.routes';

const routes = Router();

routes.use('/api', registerRouter);
routes.use('/api', subjectRouter);
routes.use('/api', staticRouter);
routes.use('/api', authRouter);
routes.use('/api', activityRouter);
routes.use('/api', newAnswerActivityRouter);
routes.use('/api', newDraftRouter);
routes.use('/api', userRouter);
routes.use('/api', studentRouter);

routes.use('/api', redisRoutes);

export default routes;
