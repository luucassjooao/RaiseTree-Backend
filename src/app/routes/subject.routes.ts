import { Router } from 'express';
import authAdmin from '../middlewares/auth/authAdmin';
import SubjectController from '../module/Subject/Controller';

const subjectRouter = Router();

subjectRouter.post('/subject', authAdmin, SubjectController.store);
subjectRouter.get('/subject', SubjectController.getAllSubjects);

export default subjectRouter;
