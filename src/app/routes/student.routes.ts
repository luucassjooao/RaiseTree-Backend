import { Router } from 'express';
import authTeacher from '../middlewares/auth/authTeacher';
import StudentController from '../module/Student/Controller';

const studentRouter = Router();

studentRouter.get('/getStudents/:classroom', authTeacher, StudentController.getAllStudentsByClassroom);
studentRouter.patch('/addFrequency', authTeacher, StudentController.addFrequency);

export default studentRouter;
