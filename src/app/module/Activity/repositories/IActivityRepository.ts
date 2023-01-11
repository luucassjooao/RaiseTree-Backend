/* eslint-disable no-unused-vars */
import { TActivity } from '../../../prisma/activity';
import { TUser } from '../../../prisma/infosUser';
import { TSubject } from '../../../prisma/subject';
import { TTeacher } from '../../../prisma/teacher';

export type TReturnUniqueActivity = (TActivity & {
  Teacher: TTeacher | null;
  subject: TSubject;
}) | null;

export interface IActivityRepository {
  store(data: Omit<TActivity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TActivity>;
  getUniqueActivityById(
    id: string
  ): Promise<(TActivity & { subject: TSubject; Teacher: { user: TUser; } | null; }) | null>;
  getAllActivitiesOfHomeStudent(
    classroomUser: string,
  ): Promise<(TActivity & { subject: TSubject; })[]>;
  getAllActivitiesOfHomeTeacher(
    teacherId: string
  ): Promise<(TActivity & { subject: TSubject; })[]>;
  getAllActivitysByOrganizationId(organizationId: string): Promise<TActivity[]>
}
