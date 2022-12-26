import { Request, Response } from 'express';
import CreateOneAnswerActivity from '../useCases/CreateOneAnswerActivity';
import ReplyAnswerOfStudent from '../useCases/ReplyAnswerOfStudent';

class AnswerActivityController {
  async store(request: Request, response: Response): Promise<Response> {
    const { activityId } = request.params;
    const { answer } = request.body;

    const createAnswer = await CreateOneAnswerActivity(
      answer,
      activityId,
      request.user?.type_model_student?.id as string,
      request.user?.type_model_student?.classroom as string,
    );

    return response.status(201).json(createAnswer);
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
    );

    return response.status(200).json({ message: 'Nota registrada!' });
  }
}

export default new AnswerActivityController();
