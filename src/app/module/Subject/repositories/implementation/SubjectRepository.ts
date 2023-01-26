import prismaClient from '../../../../prisma';
import { TSubject } from '../../../../prisma/subject';
import { ISubjectRepository } from '../ISubjectRepository';

class SubjectRepository implements ISubjectRepository {
  async store(name: string): Promise<TSubject> {
    return prismaClient.subject.create({
      data: {
        name,
      },
    });
  }

  async findSubject(name: string): Promise<TSubject | null> {
    return prismaClient.subject.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async getAllSubjects(): Promise<TSubject[] | null> {
    return prismaClient.subject.findMany({});
  }
}

export default new SubjectRepository();
