import { Router } from 'express';
import OrganizationController from '../../module/Organization/Controller';

const organizationRouter = Router();

organizationRouter.post('/createOrganization', OrganizationController.store);

export default organizationRouter;
