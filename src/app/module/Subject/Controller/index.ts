import { Request, Response } from 'express';
import CreateSubject from '../useCases/CreateSubject';
import getAllSubjects from '../useCases/GetAllSubjects';

class SubjectController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    await CreateSubject(name);

    return response.status(201).json({ message: `${name} foi registrada!` });
  }

  async getAllSubjects(request: Request, response: Response): Promise<Response> {
    const get = await getAllSubjects();

    return response.status(201).json(get);
  }
}

export default new SubjectController();
