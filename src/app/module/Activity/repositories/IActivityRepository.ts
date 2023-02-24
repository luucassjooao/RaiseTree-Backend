/* eslint-disable no-unused-vars */
import { Prisma } from '@prisma/client';
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
  ): Promise<(TActivity & {
    subject: TSubject;
    Teacher: {
        subject: TSubject;
        user: {
            id: string;
            name: string;
        };
    } | null;
    answered_activities: {
        id: string;
        createdAt: Date;
        answer: string;
        note_of_teacher: string;
        Student: {
          id: string;
          points: Prisma.JsonValue[];
          classroom: string;
          user: TUser;
        } | null;
    }[];
}) | null>;
        getAllActivitiesOfHomeStudentAndAdmin(
    classroomUser: string,
    type: 'student' | 'admin'
  ): Promise<(TActivity & { subject: TSubject; })[]>;
  getAllActivitiesOfHomeTeacher(
    teacherId: string
  ): Promise<(TActivity & { subject: TSubject; })[]>;
  getAllActivitysByOrganizationId(organizationId: string): Promise<TActivity[]>;
  // getLenghtAnswerOnActivity(activityId: string): Promise<number | null>;
}
