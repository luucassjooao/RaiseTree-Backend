import prismaClient from '../../../../prisma';
import { TStaticUser } from '../../../../prisma/staticUser';
import { IStaticRepository } from '../IStaticRepository';

class StaticUserRepository implements IStaticRepository {
  async store(data: Omit<TStaticUser, 'id' | 'createdAt'>): Promise<TStaticUser> {
    return prismaClient.staticUser.create({
      data: {
        name: data.name,
        type: data.type,
        classroom: data.classroom,
        code: data.code,
        organizationId: data.organizationId,
      },
    });
  }

  async findAllPeoplesInMyOrganization(organizationId: string): Promise<TStaticUser[] | null> {
    return prismaClient.staticUser.findMany({
      where: {
        organizationId,
      },
    });
  }

  async findCode(code: string): Promise<TStaticUser | null> {
    return prismaClient.staticUser.findFirst({
      where: {
        code,
      },
    });
  }

  async findName(name: string): Promise<TStaticUser | null> {
    return prismaClient.staticUser.findFirst({
      where: {
        name,
      },
    });
  }

  async deleteById(id: string): Promise<TStaticUser> {
    return prismaClient.staticUser.delete({
      where: {
        id,
      },
    });
  }
}

export default new StaticUserRepository();
