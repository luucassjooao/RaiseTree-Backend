import { randomUUID } from 'crypto';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../error';
import { TUser } from '../../../../prisma/infosUser';
import CreateOrganization from '../../../Organization/useCases/CreateOrganization';
import StaticUserRepository from '../../../StaticUser/repositories/implementation/StaticUserRepository';
import CreateStudent from '../../../Student/useCases/CreateStudent';
import CreateTeacher from '../../../Teacher/useCases/CreateTeacher';
import CreateUser from '../../../User/useCases/CreateUser';
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

    const createAdmin = await CreateUser({
      organizationId: createOrganization.id,
      name,
      code: randomUUID(),
      email,
      password,
      type: 'admin',
    });

    await CreateTeacher(createOrganization.classrooms, subjectId, createAdmin.id);

    return createAdmin;
  }

  const createUser = await CreateUser({
    organizationId,
    code,
    name,
    email,
    password,
    type,
  });

  if (type === 'teacher') {
    await CreateTeacher(personClassroom as string[], subjectId, createUser.id);
  } if (type === 'student') {
    await CreateStudent(personClassroom as string, createUser.id);
  }

  await StaticUserRepository.deleteById(personStaticUserId);

  return createUser;
}
