import { randomUUID } from 'crypto';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../error';
import { TUser } from '../../../../prisma/infosUser';
import CreateOrganization from '../../../Organization/useCases/CreateOrganization';
import StaticUserRepository from '../../../StaticUser/repositories/implementation/StaticUserRepository';
import StudentRepository from '../../../Student/repositories/implementation/StudentRepository';
import TeacherRespository from '../../../Teacher/repositories/implementation/TeacherRespository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import { TInfosToken } from '../SendMailForRegister';

type TDecodedToken = {
  iat: number;
  exp: number;
  infosToken: TInfosToken;
}

export default async function ActivePersonAndOrganization(token: string): Promise<TUser> {
  const decodedToken = <TDecodedToken>(
    verify(token, `${process.env.ACTIVE_TOKEN_SECRET}`)
  );
  const { infosToken, exp }: TDecodedToken = decodedToken;
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
    const createOrganization = await CreateOrganization(
      organizationName,
      organizationClassrooms,
    );

    const createAdmin = await UserRepository.store({
      organizationId: createOrganization.id,
      name,
      code: randomUUID(),
      email,
      password,
      type: 'admin',
    });

    await TeacherRespository.store({
      classrooms: createOrganization.classrooms,
      userId: createAdmin.id,
      subjectId,
    });

    return createAdmin;
  }

  const createUser = await UserRepository.store({
    organizationId,
    code,
    name,
    email,
    password,
    type,
  });

  if (type === 'teacher') {
    await TeacherRespository.store({
      classrooms: personClassroom as string[],
      subjectId,
      userId: createUser.id,
    });
  } if (type === 'student') {
    await StudentRepository.store({
      classroom: personClassroom as string,
      current_points: 0,
      points: [],
      userId: createUser.id,
    });
  }

  await StaticUserRepository.deleteById(personStaticUserId);

  return createUser;
}
