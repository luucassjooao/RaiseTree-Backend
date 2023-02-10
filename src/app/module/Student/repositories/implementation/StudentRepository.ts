import { Prisma } from '@prisma/client';
import prismaClient from '../../../../prisma';
import { TUser } from '../../../../prisma/infosUser';
import { TPoints, TStudent } from '../../../../prisma/student';
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

  async addPointsInStudent(
    studentId: string,
    points: number,
    subjectName: string,
  ): Promise<TStudent | null> {
    const findStudent = await this.findId(studentId);
    const guardStudent: any = findStudent?.points;
    const findSubject: TPoints = guardStudent
      .find((point: TPoints) => point.subjectName === subjectName);
    findSubject.points += points;

    const updatePoints = Prisma.validator<Prisma.StudentUpdateInput>()({
      points: guardStudent,
    });

    return prismaClient.student.update({
      where: {
        id: studentId,
      },
      data: updatePoints,
    });
  }

  async findId(id: string): Promise<TStudent & { user: TUser } | null> {
    return prismaClient.student.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async getAllStudentsByClassroom(classroom: string): Promise<{
    id: string;
    classroom: string;
    points: Prisma.JsonArray;
    user: { id: string; name: string; };
  }[]
  > {
    return prismaClient.student.findMany({
      where: {
        classroom,
      },
      select: {
        classroom: true,
        id: true,
        points: true,
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
