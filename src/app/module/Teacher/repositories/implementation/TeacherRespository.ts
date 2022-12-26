import { prismaTeacher, TTeacher } from '../../../../prisma/teacher';
import { ITeacherRepository } from '../ITeacherRespository';

class TeacherRepository implements ITeacherRepository {
  async store(data: Omit<TTeacher, 'activities' | 'id'>): Promise<TTeacher> {
    return prismaTeacher.create({
      data: {
        userId: data.userId,
        classrooms: data.classrooms,
        subjectId: data.subjectId,
      },
    });
  }

  async findByFKUserId(id: string): Promise<TTeacher | null> {
    return prismaTeacher.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async findId(id: string): Promise<TTeacher | null> {
    return prismaTeacher.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new TeacherRepository();
