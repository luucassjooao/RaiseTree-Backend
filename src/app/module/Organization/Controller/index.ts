import { Request, Response } from 'express';
import CreateOrganization from '../useCases/CreateOrganization';

class OrganizationController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, classrooms } = request.body;

    const createOrganization = await CreateOrganization(name, classrooms);

    return response.status(201).json(createOrganization);
  }
}

export default new OrganizationController();
