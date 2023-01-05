import { Router } from 'express';
import newAuthRouter from './auth';
import newActivityRouter from './activity';
import newAnswerActivityRouter from './answerActivity';
import newDraftRouter from './draft';
import organizationRouter from './organization';
import newRegisterRouter from './register';
import newStaticUser from './staticUser';
import subjectRouter from './subject';
import newUserRouter from './user';
import studentRouter from './student';
import redisRoutes from './redis/redis.routes';

const routes = Router();

routes.use('/api', organizationRouter);
routes.use('/api', newRegisterRouter);
routes.use('/api', subjectRouter);
routes.use('/api', newStaticUser);
routes.use('/api', newAuthRouter);
routes.use('/api', newActivityRouter);
routes.use('/api', newAnswerActivityRouter);
routes.use('/api', newDraftRouter);
routes.use('/api', newUserRouter);
routes.use('/api', studentRouter);

routes.use('/api', redisRoutes);

export default routes;
