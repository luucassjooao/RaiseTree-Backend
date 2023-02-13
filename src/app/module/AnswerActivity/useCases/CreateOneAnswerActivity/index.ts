import AppError from '../../../../error';
import { TAnsweredActivity } from '../../../../prisma/answeredActivity';
import ActivityRepository from '../../../Activity/repositories/implementation/ActivityRepository';
import StudentRepository from '../../../Student/repositories/implementation/StudentRepository';
import AnswerActivityRepository from '../../repositories/implementations/AnswerActivityRepository';

export default async function CreateOneAnswerActivity(
  answer: string,
  activityId: string,
  studentId: string,
  classroomStudent: string,
  subjectName: string,
): Promise<TAnsweredActivity> {
  const findActivity = await ActivityRepository.getUniqueActivityById(activityId);
  if (!findActivity) throw new AppError('Esta atividade não está disponivel para ser respondida ou não existe!', 404);

  const findStudentOnThisActivity = await AnswerActivityRepository
    .findStudentOnActivity(activityId, studentId);
  if (findStudentOnThisActivity) throw new AppError('Você já fez está atividade!');

  const compareClassrooms = findActivity?.classrooms
    .findIndex((sala: string) => sala === classroomStudent);
  if (compareClassrooms === -1) throw new AppError('Você não pode fazer está atividade!');

  const createAnswer = await AnswerActivityRepository.store(
    answer,
    activityId,
    studentId,
  );

  if (findActivity.previous_points >= 1) {
    await StudentRepository.addPointsInStudent(
      studentId,
      findActivity.previous_points,
      subjectName,
    );
  }

  return createAnswer;
}
