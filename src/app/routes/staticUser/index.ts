import { Router } from 'express';
import authAdmin from '../../middlewares/auth/authAdmin';
import StaticUserController from '../../module/StaticUser/Controller';

const newStaticUser = Router();

newStaticUser.post('/newStaticUser', authAdmin, StaticUserController.createOne);
newStaticUser.get('/findallpeoplesstaticUser/:organizationId', authAdmin, StaticUserController.findAllPeoplesInMyOrganizationstore);
newStaticUser.post('/createManyPeoples', authAdmin, StaticUserController.createManyPeoples);
newStaticUser.get('/createPeoplesBySheet/:sheetId/:typeOfPeoples', authAdmin, StaticUserController.createPeoplesBySheet);

export default newStaticUser;
