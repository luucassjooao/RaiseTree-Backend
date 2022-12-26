/* eslint-disable no-unused-vars */
import { TTeacher } from '../../../prisma/teacher';

export interface ITeacherRepository {
  store(data: Omit<TTeacher, 'activities' | 'id'>): Promise<TTeacher>;
  findByFKUserId(id: string): Promise<TTeacher | null>;
  findId(id: string): Promise<TTeacher | null>;
}
