import prismaClient from '../../../../prisma';
import { TUser } from '../../../../prisma/infosUser';
import { IUserRepository, TRequestUser } from '../IUserRepository';

class UserRepository implements IUserRepository {
  async store(data: Omit<
    TUser, 'type_model_student' | 'type_model_teacher' | 'drafts' | 'id' | 'createdAt' | 'updatedAt'
  >): Promise<TUser> {
    return prismaClient.infosUser.create({
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
    return prismaClient.infosUser.findFirst({
      where: {
        email,
      },
    });
  }

  async findName(name: string): Promise<TUser | null> {
    return prismaClient.infosUser.findFirst({
      where: {
        name,
      },
    });
  }

  async findCode(code: string): Promise<TUser | null> {
    return prismaClient.infosUser.findFirst({
      where: {
        code,
      },
    });
  }

  async findId(id: string): Promise<TRequestUser> {
    return prismaClient.infosUser.findUnique({
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
        type_model_teacher: {
          select: {
            activities: true,
            classrooms: true,
            id: true,
            subject: true,
          },
        },
        _count: {
          select: {
            drafts: true,
          },
        },
      },
    });
  }

  async findAdmins(organizationId: string): Promise<TUser | null> {
    return prismaClient.infosUser.findFirst({
      where: {
        organizationId,
        type: 'admin',
      },
    });
  }
}

export default new UserRepository();
