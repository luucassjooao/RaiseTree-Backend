import { Request, Response } from 'express';
import CreateOneAnswerActivity from '../useCases/CreateOneAnswerActivity';
import GetAllAnswerActivityOfStudent from '../useCases/GetAllAnswerActivityOfStudent';
import ReplyAnswerOfStudent from '../useCases/ReplyAnswerOfStudent';

class AnswerActivityController {
  async store(request: Request, response: Response): Promise<Response> {
    const { activityId } = request.params;
    const { answer, subjectName } = request.body;

    await CreateOneAnswerActivity(
      answer,
      activityId,
      request.user?.type_model_student?.id as string,
      request.user?.type_model_student?.classroom as string,
      subjectName,
    );

    return response.status(201).json({ message: 'Resposta salva!' });
  }

  async replyAnswerOfStudent(request: Request, response: Response): Promise<Response> {
    const { activityId, answerId, studentId } = request.params;
    const { note, point } = request.body;

    await ReplyAnswerOfStudent(
      activityId,
      answerId,
      studentId,
      note,
      point,
      request.user?.type_model_teacher?.subject.name as string,
    );

    return response.status(200).json({ message: 'Nota registrada!' });
  }

  async getAllAnswerActivityOfStudent(request: Request, response: Response): Promise<Response> {
    const { studentId } = request.params;

    const getActivity = await GetAllAnswerActivityOfStudent(
      studentId,
      request.user?.type_model_teacher?.id as string,
    );

    return response.status(200).json(getActivity);
  }
}

export default new AnswerActivityController();
