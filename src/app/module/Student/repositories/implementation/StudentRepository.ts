import prismaClient from '../../../../prisma';
import { TStudent } from '../../../../prisma/student';
import { IStudentReposiory } from '../IStudentRepository';

class StudentRepository implements IStudentReposiory {
  async store(data: Omit<TStudent, 'id'>): Promise<TStudent> {
    return prismaClient.student.create({
      data,
    });
  }

  async findByFKUserId(id: string): Promise<TStudent | null> {
    return prismaClient.student.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async addPointsInStudent(studentId: string, points: number): Promise<TStudent | null> {
    return prismaClient.student.update({
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
    return prismaClient.student.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllStudentsByClassroom(classroom: string): Promise<{
    id: string;
    classroom: string;
    current_points: number;
    user: { id: string; name: string; };
  }[]
  > {
    return prismaClient.student.findMany({
      where: {
        classroom,
      },
      select: {
        classroom: true,
        current_points: true,
        id: true,
        points: false,
        reply_activities: false,
        userId: false,
        frequency: true,
        _count: {
          select: {
            reply_activities: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}

export default new StudentRepository();
