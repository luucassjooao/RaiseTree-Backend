import prismaClient from '../../../../prisma';
import { TTeacher } from '../../../../prisma/teacher';
import { ITeacherRepository } from '../ITeacherRespository';

class TeacherRepository implements ITeacherRepository {
  async store(data: Omit<TTeacher, 'activities' | 'id'>): Promise<TTeacher> {
    return prismaClient.teacher.create({
      data: {
        userId: data.userId,
        classrooms: data.classrooms,
        subjectId: data.subjectId,
      },
    });
  }

  async findByFKUserId(id: string): Promise<TTeacher | null> {
    return prismaClient.teacher.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async findId(id: string): Promise<TTeacher | null> {
    return prismaClient.teacher.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new TeacherRepository();
