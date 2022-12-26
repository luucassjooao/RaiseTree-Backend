import { Router } from 'express';
import auth from '../../middlewares/auth/auth';
import DraftController from '../../module/Draft/Controller';

const newDraftRouter = Router();

newDraftRouter.post('/createDraft', auth, DraftController.store);
newDraftRouter.get('/findAllDraftsOfUser', auth, DraftController.findAllDraftsByUserId);
newDraftRouter.get('/findDraft/:id', auth, DraftController.findUniqueDraftById);

export default newDraftRouter;
