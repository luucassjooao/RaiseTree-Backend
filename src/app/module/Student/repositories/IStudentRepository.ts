/* eslint-disable no-unused-vars */
import { TStudent } from '../../../prisma/student';

export interface IStudentReposiory {
  store(data: Omit<TStudent, 'id'>): Promise<TStudent>;
  findByFKUserId(id: string): Promise<TStudent | null>;
  addPointsInStudent(studentId: string, points: number): Promise<TStudent | null>;
  findId(id: string): Promise<TStudent | null>;
  getAllStudentsByClassroom(classroom: string): Promise<{
    id: string;
    classroom: string;
    current_points: number;
    user: { id: string; name: string; };
  }[]
  >
}
