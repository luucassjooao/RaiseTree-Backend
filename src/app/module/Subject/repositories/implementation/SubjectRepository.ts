import { prismaSubject, TSubject } from '../../../../prisma/subject';
import { ISubjectRepository } from '../ISubjectRepository';

class SubjectRepository implements ISubjectRepository {
  async store(name: string): Promise<TSubject> {
    return prismaSubject.create({
      data: {
        name,
      },
    });
  }

  async findSubject(name: string): Promise<TSubject | null> {
    return prismaSubject.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async getAllSubjects(): Promise<TSubject[] | null> {
    return prismaSubject.findMany({});
  }
}

export default new SubjectRepository();
