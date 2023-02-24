/* eslint-disable no-unused-vars */
import { TActivity } from '../../../prisma/activity';
import { TUser } from '../../../prisma/infosUser';
import { TStudent } from '../../../prisma/student';
import { TSubject } from '../../../prisma/subject';

export type TRequestUser = (Pick<TUser, 'id' | 'name' | 'email' | 'organizationId' | 'type'> & {
  type_model_student: TStudent | null;
  type_model_teacher: {
    id: string;
    activities: TActivity[];
    classrooms: string[];
    subject: TSubject;
} | null;
  _count: {
      drafts: number;
  };
}) | null;

export interface IUserRepository {
  store(data: Omit<
    TUser, 'type_model_student' | 'type_model_teacher' | 'drafts' | 'id' | 'createdAt' | 'updatedAt'
  >): Promise<TUser>;
  findEmail(email: string): Promise<TUser | null>;
  findName(name: string): Promise<TUser | null>;
  findCode(code: string): Promise<TUser | null>;
  findId(id: string): Promise<TRequestUser>;
  findAdmins(organizationId: string): Promise<TUser | null>
}
