import AppError from '../../../../error';
import { TAnsweredActivity } from '../../../../prisma/answeredActivity';
import ActivityRepository from '../../../Activity/repositories/implementation/ActivityRepository';
import StudentRepository from '../../../Student/repositories/implementation/StudentRepository';
import AnswerActivityRepository from '../../repositories/implementations/AnswerActivityRepository';

export default async function ReplyAnswerOfStudent(
  activityId: string,
  answerId: string,
  studentId: string,
  // eslint-disable-next-line camelcase
  note_of_teacher: string,
  point: number,
): Promise<TAnsweredActivity | null> {
  const findStudentById = await StudentRepository.findId(studentId);
  if (!findStudentById) throw new AppError('Não foi possivel achar este estudante!', 404);

  const findActivityById = await ActivityRepository.getUniqueActivityById(activityId);
  if (!findActivityById) throw new AppError('Não foi possivel achar está atividade!', 404);

  const findAnswerById = await AnswerActivityRepository.findId(answerId);
  if (!findAnswerById) throw new AppError('Não foi possivel achar está resposta!', 404);

  if (findAnswerById.answer !== '') throw new AppError('Você já respondeu está resposta deste aluno!');

  const updateAnswer = await AnswerActivityRepository
    .replyAnswerOfStudent(note_of_teacher, answerId);
  await StudentRepository.addPointsInStudent(studentId, point);

  return updateAnswer;
}