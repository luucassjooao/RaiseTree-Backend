import { prismaStudent, TStudent } from '../../../../prisma/student';
import { IStudentReposiory } from '../IStudentRepository';

class StudentRepository implements IStudentReposiory {
  async store(data: Omit<TStudent, 'id'>): Promise<TStudent> {
    return prismaStudent.create({
      data,
    });
  }

  async findByFKUserId(id: string): Promise<TStudent | null> {
    return prismaStudent.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async addPointsInStudent(studentId: string, points: number): Promise<TStudent | null> {
    return prismaStudent.update({
      where: {
        id: studentId,
      },
      data: {
        current_points: {
          increment: Number(points),
        },
      },
    });
  }

  async findId(id: string): Promise<TStudent | null> {
    return prismaStudent.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new StudentRepository();
