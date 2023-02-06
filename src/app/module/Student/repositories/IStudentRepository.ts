/* eslint-disable no-unused-vars */
import { Prisma } from '@prisma/client';
import { TPoints, TStudent } from '../../../prisma/student';

export interface IStudentReposiory {
  store(data: Omit<TStudent, 'id'>): Promise<TStudent>;
  findByFKUserId(id: string): Promise<TStudent | null>;
  addPointsInStudent(
    studentId: string,
    points: number,
    subjectName: string
    ): Promise<TStudent | null>;
  findId(id: string): Promise<TStudent | null>;
  getAllStudentsByClassroom(classroom: string): Promise<{
    id: string;
    classroom: string;
    points: Prisma.JsonValue;
    user: { id: string; name: string; };
  }[]
  >
}
