/* eslint-disable camelcase */
import { Request, Response } from 'express';
import DeleteDraftById from '../../Draft/useCases/DeleteDraftById';
import CreateOneActivity from '../useCases/CreateOneActivity';
import GetAllActivitiesOfHome from '../useCases/GetAllActivitiesOfHome';
import GetUniqueActivityById from '../useCases/GetUniqueActivityById';

class ActivityController {
  async store(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      classrooms,
      activity,
      dateExpiration,
      type,
      previous_points,
    } = request.body;

    const { idDraft } = request.params;

    await CreateOneActivity({
      title,
      description,
      classrooms,
      activity,
      dateExpiration,
      type,
      previous_points,
      subjectId: request.user?.type_model_teacher?.subjectId as string,
      teacherId: request.user?.type_model_teacher?.id as string,
    });

    if (idDraft) await DeleteDraftById(idDraft, request.user?.id as string);

    return response.status(201).json({ message: 'Atividade Criada' });
  }

  async getUniquerActivityById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const activity = await GetUniqueActivityById(
      id,
      request.user?.type_model_student?.classroom as string,
      request.user?.type as string,
    );

    return response.json(activity);
  }

  async getAllActivitiesOfHome(request: Request, response: Response) {
    const getAllActivitiesOfHome = await GetAllActivitiesOfHome(
      (
        request.user?.type === 'student'
          ? request.user?.type_model_student?.classroom as string
          : request.user?.type_model_teacher?.classrooms as string[]
      ),
      request.user?.type as 'teacher' | 'student',
      (request.user?.type === 'teacher'
        ? request.user.type_model_teacher?.id : undefined),
    );

    return response.status(200).json(getAllActivitiesOfHome);
  }
}

export default new ActivityController();
