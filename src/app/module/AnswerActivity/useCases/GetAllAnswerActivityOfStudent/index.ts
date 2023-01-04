import { TActivity } from '../../../../prisma/activity';
import { TAnsweredActivity } from '../../../../prisma/answeredActivity';
import AnswerActivityRepository from '../../repositories/implementations/AnswerActivityRepository';

export default async function GetAllAnswerActivityOfStudent(
  studentId: string,
  teacherId: string,
): Promise<(TAnsweredActivity & { Activity: TActivity | null; })[]> {
  const getActivity = await AnswerActivityRepository
    .getAllAnswerActivityOfStudent(studentId, teacherId);

  return getActivity;
}
