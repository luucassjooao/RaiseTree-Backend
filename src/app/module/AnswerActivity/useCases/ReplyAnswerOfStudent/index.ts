import AppError from '../../../../error';
import { TAnsweredActivity } from '../../../../prisma/answeredActivity';
import ActivityRepository from '../../../Activity/repositories/implementation/ActivityRepository';
import NotifyRepository from '../../../Notify/repositories/implementation/NotifyRepository';
import StudentRepository from '../../../Student/repositories/implementation/StudentRepository';
import AnswerActivityRepository from '../../repositories/implementations/AnswerActivityRepository';

export default async function ReplyAnswerOfStudent(
  activityId: string,
  answerId: string,
  studentId: string,
  // eslint-disable-next-line camelcase
  note_of_teacher: string,
  point: number,
  subjectName: string,
): Promise<TAnsweredActivity | null> {
  const findStudentById = await StudentRepository.findId(studentId);
  if (!findStudentById) throw new AppError('Não foi possivel achar este estudante!', 404);

  const findActivityById = await ActivityRepository.getUniqueActivityById(activityId);
  if (!findActivityById) throw new AppError('Não foi possivel achar está atividade!', 404);

  const findAnswerById = await AnswerActivityRepository.findId(answerId);
  if (!findAnswerById) throw new AppError('Não foi possivel achar está resposta!', 404);

  if (findAnswerById.note_of_teacher !== '') throw new AppError('Você já respondeu este aluno(a)!');

  const updateAnswer = await AnswerActivityRepository
    .replyAnswerOfStudent(note_of_teacher, answerId);
  await StudentRepository.addPointsInStudent(studentId, point, subjectName);

  const findUserByStudentId = await StudentRepository.findId(studentId);
  await NotifyRepository.store(
    `O professor(a) ${findActivityById.Teacher?.user.name}, respondeu sua resposta!`,
    `Na atividade: ${findActivityById.title}, ele te deu ${point} ponto${point > 1 && 's'}!`,
    findUserByStudentId?.userId as string,
  );

  return updateAnswer;
}
