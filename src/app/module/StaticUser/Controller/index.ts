import { Request, Response } from 'express';
import CreateManyPeoplesStaticUser from '../useCases/CreateManyPeoplesStaticUser';
import CreateOneStaticUser from '../useCases/CreateOneStaticUser';
import CreatePeoplesBySheetsStaticUser from '../useCases/CreatePeoplesBySheetsStaticUser';
import FindAllPeoplesInMyOrganization from '../useCases/FindAllPeoplesStaticInMyOrganization';

class StaticUserController {
  async createOne(request: Request, response: Response): Promise<Response> {
    const {
      name,
      classroom,
      code,
      type,
    } = request.body;

    const createUser = await CreateOneStaticUser({
      name,
      classroom,
      code,
      type,
      organizationId: request.user?.organizationId as string,
    });

    return response.status(201).json({ message: `${name} adicionado com sucesso!`, createUser });
  }

  async findAllPeoplesInMyOrganizationstore(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { organizationId } = request.params;

    const findPeoples = await FindAllPeoplesInMyOrganization(
      organizationId,
      request.user?.organizationId as string,
    );

    return response.status(200).json(findPeoples);
  }

  async createManyPeoples(
    request: Request,
    response: Response,
  ): Promise<Response> {
    await CreateManyPeoplesStaticUser(
      {
        peoples: request.body.peoples,
        organizationId: request.user?.organizationId as string,
      },
    );

    return response.status(201).json({ message: 'Pessoas criadas' });
  }

  async createPeoplesBySheet(request: Request, response: Response): Promise<Response> {
    const { sheetId, typeOfPeoples } = request.params;

    const arrayClassroom = request.user?.type_model_teacher?.classrooms.map((sala: string) => sala.split(' | ')[1]) as string[];

    const create = await CreatePeoplesBySheetsStaticUser(
      sheetId,
      typeOfPeoples,
      request.user?.organizationId as string,
      arrayClassroom,
      request.user?.type_model_teacher?.classrooms[0].split(' | ')[0] as string,
    );

    return response.status(200).json(create);
  }
}

export default new StaticUserController();
