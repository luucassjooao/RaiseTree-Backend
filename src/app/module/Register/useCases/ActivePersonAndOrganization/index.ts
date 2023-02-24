import { randomUUID } from 'crypto';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../error';
import { TUser } from '../../../../prisma/infosUser';
import { TDecodedToken } from '../../../../utils/generateTokens';
import NotifyRepository from '../../../Notify/repositories/implementation/NotifyRepository';
import CreateOrganization from '../../../Organization/useCases/CreateOrganization';
import StaticUserRepository from '../../../StaticUser/repositories/implementation/StaticUserRepository';
import CreateStudent from '../../../Student/useCases/CreateStudent';
import SubjectRepository from '../../../Subject/repositories/implementation/SubjectRepository';
import CreateTeacher from '../../../Teacher/useCases/CreateTeacher';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import CreateUser from '../../../User/useCases/CreateUser';
import { TInfosToken } from '../SendMailForRegister';

export default async function ActivePersonAndOrganization(token: string): Promise<TUser> {
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

  const findAdmins = await UserRepository.findAdmins(organizationId);
  const findSubjectName = await SubjectRepository.findSubjectById(subjectId);

  if (type === 'teacher') {
    await CreateTeacher(personClassroom as string[], subjectId, createUser.id);

    await NotifyRepository.store(
      `O professor(a) ${name}, acabou de se registrar!`,
      `Ele(a) se registrou na máteria: ${findSubjectName?.name}`,
      findAdmins?.id as string,
    );
  } if (type === 'student') {
    await CreateStudent(personClassroom as string, createUser.id);

    await NotifyRepository.store(
      `O aluno(a) ${name}, acabou de se registrar!`,
      `Ele(a) se registrou, e está na sala ${personClassroom}`,
      findAdmins?.id as string,
    );
  }

  await StaticUserRepository.deleteById(personStaticUserId);

  return createUser;
}
