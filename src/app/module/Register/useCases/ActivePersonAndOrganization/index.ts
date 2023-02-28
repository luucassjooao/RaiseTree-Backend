import { randomUUID } from 'crypto';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../error';
import prismaClient from '../../../../prisma';
import { TDecodedToken } from '../../../../utils/generateTokens';
import NotifyRepository from '../../../Notify/repositories/implementation/NotifyRepository';
import SubjectRepository from '../../../Subject/repositories/implementation/SubjectRepository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import { TInfosToken } from '../SendMailForRegister';

export default async function ActivePersonAndOrganization(token: string) {
  const decodedToken = <TDecodedToken<TInfosToken>>(
    verify(token, `${process.env.ACTIVE_TOKEN_SECRET}`)
    );
  const { infosToken, exp }: TDecodedToken<TInfosToken> = decodedToken;
  if (!infosToken) throw new AppError('Informações Inválidas. Faça o registro novamente!');

  if (Date.now() >= exp * 1000) throw new AppError('A data do email expirou! Faça o registro novamente!');

  const {
    organizationId,
    organizationName,
    organizationClassrooms,
    name,
    email,
    password,
    type,
    personClassroom,
    personStaticUserId,
    code,
    subjectId,
    firstContact,
  } = infosToken as TInfosToken;

  if (firstContact) {
    return prismaClient.$transaction(async (prisma) => {
      const createOrganization = await prisma.organization.create({
        data: {
          name: organizationName,
          classrooms: organizationClassrooms,
        },
      });

      const createAdmin = await prisma.infosUser.create({
        data: {
          organizationId: createOrganization.id,
          name,
          code: randomUUID(),
          email,
          password,
          type: 'admin',
        },
      });

      await prisma.teacher.create({
        data: {
          classrooms: createOrganization.classrooms,
          subjectId,
          userId: createAdmin.id,
        },
      });

      return createAdmin;
    });
  }

  const findAdmins = await UserRepository.findAdmins(organizationId);
  const findSubjectName = await SubjectRepository.findSubjectById(subjectId);

  if (type === 'teacher') {
    return prismaClient.$transaction(async (prisma) => {
      const createUser = await prisma.infosUser.create({
        data: {
          organizationId,
          code,
          name,
          email,
          password,
          type,
        },
      });

      await prisma.teacher.create({
        data: {
          classrooms: personClassroom,
          subjectId,
          userId: createUser.id,
        },
      });

      await prisma.staticUser.delete({
        where: {
          id: personStaticUserId,
        },
      });

      await NotifyRepository.store(
        `O professor(a) ${name}, acabou de se registrar!`,
        `Ele(a) se registrou na máteria: ${findSubjectName?.name}`,
        findAdmins?.id as string,
      );

      return createUser;
    });
  }
  return prismaClient.$transaction(async (prisma) => {
    const createUser = await prisma.infosUser.create({
      data: {
        organizationId,
        code,
        name,
        email,
        password,
        type,
      },
    });

    await prisma.student.create({
      data: {
        classroom: personClassroom as string,
        userId: createUser.id,
      },
    });

    await prisma.staticUser.delete({
      where: {
        id: personStaticUserId,
      },
    });

    await NotifyRepository.store(
      `O aluno(a) ${name}, acabou de se registrar!`,
      `Ele(a) se registrou, e está na sala ${personClassroom}`,
        findAdmins?.id as string,
    );
    return createUser;
  });
}
