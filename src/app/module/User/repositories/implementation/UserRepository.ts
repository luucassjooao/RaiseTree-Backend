import { prismaUser, TUser } from '../../../../prisma/infosUser';
import { IUserRepository, TRequestUser } from '../IUserRepository';

class UserRepository implements IUserRepository {
  async store(data: Omit<
    TUser, 'type_model_student' | 'type_model_teacher' | 'drafts' | 'id' | 'createdAt' | 'updatedAt'
  >): Promise<TUser> {
    return prismaUser.create({
      data: {
        organizationId: data.organizationId,
        name: data.name,
        email: data.email,
        code: data.code,
        password: data.password,
        type: data.type,
      },
    });
  }

  async findEmail(email: string): Promise<TUser | null> {
    return prismaUser.findFirst({
      where: {
        email,
      },
    });
  }

  async findName(name: string): Promise<TUser | null> {
    return prismaUser.findFirst({
      where: {
        name,
      },
    });
  }

  async findCode(code: string): Promise<TUser | null> {
    return prismaUser.findFirst({
      where: {
        code,
      },
    });
  }

  async findId(id: string): Promise<TRequestUser> {
    return prismaUser.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        organizationId: true,
        password: false,
        code: false,
        createdAt: false,
        updatedAt: false,
        type_model_student: true,
        type_model_teacher: true,
        _count: {
          select: {
            drafts: true,
          },
        },
      },
    });
  }
}

export default new UserRepository();
