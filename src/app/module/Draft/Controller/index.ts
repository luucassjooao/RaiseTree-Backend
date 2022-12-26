import { Request, Response } from 'express';
import CreateOneDraft from '../useCases/CreateOneDraft';
import FindAllDraftsByUserId from '../useCases/FindAllDraftsByUserId';
import FindUniqueDraftById from '../useCases/FindUniqueDraftById';

class DraftController {
  async store(request: Request, response: Response): Promise<Response> {
    const { title, description, draft } = request.body;

    await CreateOneDraft(title, description, draft, request.user?.id as string);

    return response.status(201).json({ message: 'Rascunho salvo!' });
  }

  async findAllDraftsByUserId(request: Request, response: Response): Promise<Response> {
    const findDrafts = await FindAllDraftsByUserId(request.user?.id as string);

    return response.status(200).json({ findDrafts });
  }

  async findUniqueDraftById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findDraft = await FindUniqueDraftById(request.user?.id as string, id);

    return response.status(200).json(findDraft);
  }
}

export default new DraftController();
