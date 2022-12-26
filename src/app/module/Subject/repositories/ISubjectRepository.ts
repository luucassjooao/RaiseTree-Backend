/* eslint-disable no-unused-vars */
import { TSubject } from '../../../prisma/subject';

export interface ISubjectRepository {
  store(name: string): Promise<TSubject>;
  findSubject(name: string): Promise<TSubject | null>;
  getAllSubjects(): Promise<TSubject[] | null>
}
