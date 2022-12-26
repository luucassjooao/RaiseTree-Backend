import { prismaStaticUser, TStaticUser } from '../../../../prisma/staticUser';
import { IStaticRepository } from '../IStaticRepository';

class StaticUserRepository implements IStaticRepository {
  async store(data: Omit<TStaticUser, 'id' | 'createdAt'>): Promise<TStaticUser> {
    return prismaStaticUser.create({
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
    return prismaStaticUser.findMany({
      where: {
        organizationId,
      },
    });
  }

  async findCode(code: string): Promise<TStaticUser | null> {
    return prismaStaticUser.findFirst({
      where: {
        code,
      },
    });
  }

  async findName(name: string): Promise<TStaticUser | null> {
    return prismaStaticUser.findFirst({
      where: {
        name,
      },
    });
  }

  async deleteById(id: string): Promise<TStaticUser> {
    return prismaStaticUser.delete({
      where: {
        id,
      },
    });
  }
}

export default new StaticUserRepository();
