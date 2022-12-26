import { Router } from 'express';
import SubjectController from '../../module/Subject/Controller';

const subjectRouter = Router();

subjectRouter.post('/subject', SubjectController.store);
subjectRouter.get('/findAllMatters', SubjectController.getAllSubjects);

export default subjectRouter;
