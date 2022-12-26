import { TActivity } from '../../../../prisma/activity';
import { TSubject } from '../../../../prisma/subject';
import ActivityRepository from '../../repositories/implementation/ActivityRepository';

export default async function GetAllActivitiesOfHome(
  classroomUser: string | string[],
  typeUser: 'teacher' | 'student',
  teacherId?: string,
): Promise<
  { nameSubject: string; activitys: (TActivity & { subject: TSubject; })[]; }[]
> {
  if (typeUser === 'student') {
    const getAllActivitiesOfHomeStudent = await ActivityRepository
      .getAllActivitiesOfHomeStudent(classroomUser as string);

    const getAllNameOfSubejcts = Array.from(new Set(getAllActivitiesOfHomeStudent
      .map(({ subject: { name } }) => name)));

    const organizatedArrayWithActivity = getAllNameOfSubejcts
      .map((verifyNameSubject) => getAllActivitiesOfHomeStudent
        .filter(({ subject: { name } }) => name === verifyNameSubject))
      .map((arrayActivity, interador) => (
        {
          nameSubject: getAllNameOfSubejcts[interador],
          activitys: arrayActivity.map((eachActivity) => eachActivity),
        }
      ));

    return organizatedArrayWithActivity;
  }

  const getAllActivitiesOfHomeTeacher = await ActivityRepository
    .getAllActivitiesOfHomeTeacher(teacherId as string);

  const getAllNameOfSubejcts = Array.from(new Set(getAllActivitiesOfHomeTeacher
    .map(({ subject: { name } }) => name)));

  const organizatedArrayWithActivity = getAllNameOfSubejcts
    .map((verifyNameSubject) => getAllActivitiesOfHomeTeacher
      .filter(({ subject: { name } }) => name === verifyNameSubject))
    .map((arrayActivity, interador) => (
      {
        nameSubject: getAllNameOfSubejcts[interador],
        activitys: arrayActivity.map((eachActivity) => eachActivity),
      }
    ));

  return organizatedArrayWithActivity;
}
