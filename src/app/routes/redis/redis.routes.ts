import { Router } from 'express';
import studentRedis from './student';

const redisRoutes = Router();

redisRoutes.use('/clean-cache', studentRedis);

export default redisRoutes;
