import { Router } from 'express';
import auth from '../middlewares/auth/auth';
import DraftController from '../module/Draft/Controller';

const draftRouter = Router();

draftRouter.post('/createDraft', auth, DraftController.store);
draftRouter.get('/findAllDraftsOfUser', auth, DraftController.findAllDraftsByUserId);
draftRouter.get('/findDraft/:id', auth, DraftController.findUniqueDraftById);

export default draftRouter;
