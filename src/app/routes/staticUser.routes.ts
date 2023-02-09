import { Router } from 'express';
import authAdmin from '../middlewares/auth/authAdmin';
import StaticUserController from '../module/StaticUser/Controller';

const staticRouter = Router();

staticRouter.post('/createOneStaticUser', authAdmin, StaticUserController.createOne);
staticRouter.get('/findallpeoplesstaticUser', authAdmin, StaticUserController.findAllPeoplesInMyOrganizationstore);
staticRouter.post('/createManyPeoples', authAdmin, StaticUserController.createManyPeoples);
staticRouter.get('/createPeoplesBySheet/:sheetId/:typeOfPeoples', authAdmin, StaticUserController.createPeoplesBySheet);

export default staticRouter;
