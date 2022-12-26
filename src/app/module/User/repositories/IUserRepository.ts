/* eslint-disable no-unused-vars */
import { TUser } from '../../../prisma/infosUser';
import { TStudent } from '../../../prisma/student';
import { TTeacher } from '../../../prisma/teacher';

export type TRequestUser = (TUser & {
  type_model_student: TStudent | null;
  type_model_teacher: TTeacher | null;
}) | null;

export interface IUserRepository {
  store(data: Omit<
    TUser, 'type_model_student' | 'type_model_teacher' | 'drafts' | 'id' | 'createdAt' | 'updatedAt'
  >): Promise<TUser>;
  findEmail(email: string): Promise<TUser | null>;
  findName(name: string): Promise<TUser | null>;
  findCode(code: string): Promise<TUser | null>;
  findId(id: string): Promise<TRequestUser | null>;
}
