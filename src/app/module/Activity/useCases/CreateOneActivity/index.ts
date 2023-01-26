/* eslint-disable camelcase */
import AppError from '../../../../error';
import { TActivity } from '../../../../prisma/activity';
import TeacherRespository from '../../../Teacher/repositories/implementation/TeacherRespository';
import ActivityRepository from '../../repositories/implementation/ActivityRepository';

export default async function CreateOneActivity({
  title,
  description,
  classrooms,
  activity,
  dateExpiration,
  type,
  previous_points,
  subjectId,
  teacherId,
}: Omit<TActivity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TActivity> {
  if (
    !title
    || !description
    || !activity
    || !dateExpiration
  ) throw new AppError('Está faltando algum campo!');

  const findTeacher = await TeacherRespository.findId(teacherId as string);

  const createActivity = await ActivityRepository.store({
    title,
    description,
    classrooms: classrooms ? findTeacher?.classrooms as string[] : classrooms,
    activity,
    dateExpiration: new Date(dateExpiration),
    type,
    previous_points,
    subjectId,
    teacherId,
  });

  return createActivity;
}
