import AppError from '../../../../error';
import { TAnsweredActivity } from '../../../../prisma/answeredActivity';
import ActivityRepository from '../../../Activity/repositories/implementation/ActivityRepository';
import NotifyRepository from '../../../Notify/repositories/implementation/NotifyRepository';
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

  const lengthAnsweredOnActivity = findActivity.answered_activities.length;

  if ((lengthAnsweredOnActivity + 1) % 10 === 0) {
    // eslint-disable-next-line camelcase
    const findUnansweredAnswers = findActivity.answered_activities.map(({ note_of_teacher }) => note_of_teacher === '');

    NotifyRepository.store(
      `A atividade ${findActivity.title}, atingiu ${lengthAnsweredOnActivity} respostas!`,
      `A atividade contém ${findUnansweredAnswers.length} respostas dos alunos não respondidas`,
      findActivity.Teacher?.user.id as string,
    );
  }

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
