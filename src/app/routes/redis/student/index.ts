import { Router } from 'express';
import authTeacher from '../../../middlewares/auth/authTeacher';
import CleanUpCacheRedisController from '../../../module/Student/Controller/CleanUpCacheRedisController';

const studentRedis = Router();

studentRedis.get('/of-classrooms/:classrooms', authTeacher, CleanUpCacheRedisController.studentsByClassroom);

export default studentRedis;
