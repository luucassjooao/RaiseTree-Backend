import { randomUUID } from 'crypto';
import { SentMessageInfo } from 'nodemailer';
import AppError from '../../../../error';
import { TStaticUser } from '../../../../prisma/staticUser';
import sendMail from '../../../../utils/Email/sendMail';
import { generateActiveTokenTeacher } from '../../../../utils/generateTokens';
import { SendMailForTeacher } from '../../../../utils/types';
import OrganizationRepository from '../../../Organization/repositories/implementation/OrganizationRepository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

interface TChooseOne extends Omit<TStaticUser, 'id' | 'createdAt'> {
  email: string | undefined;
}

export default async function CreateOneStaticUser({
  name,
  classroom,
  code,
  type,
  organizationId,
  email,
}: TChooseOne): Promise<TStaticUser | SentMessageInfo | null> {
  const findUserByCodeInUsers = await UserRepository.findCode(type === 'student' ? code : '');
  const findUserByNameInStaticUser = await StaticUserRepository.findName(name);

  if (type === 'student' && code && findUserByNameInStaticUser) throw new AppError('Este CPF já está em uso!');
  if (type === 'student' && findUserByCodeInUsers) throw new AppError('Estudante já registrado!');

  const codeRandomUUIDTeacher = randomUUID();

  const createUserInStaticUser = await StaticUserRepository.store({
    name,
    classroom,
    code: type === 'student' ? code : codeRandomUUIDTeacher,
    type,
    organizationId,
  });

  if (type === 'teacher') {
    const findNameOfOrganization = await OrganizationRepository
      .findOrganizationById(organizationId);
    if (!findNameOfOrganization) throw new AppError('Ouve um erro! Tente novamente!', 404);

    const infosToken: SendMailForTeacher = {
      code: codeRandomUUIDTeacher,
      name,
      email: email as string,
      organizationId,
      classroom,
    };

    const activeToken = generateActiveTokenTeacher({ infosToken });
    const url = `${process.env.BASE_URL}/activeTeacher?token=${activeToken}`;
    return sendMail(
      email as string,
      'sendMailToTeacher',
      url,
      'Clique aqui para ativar sua conta!',
      findNameOfOrganization.name,
    );
  }
  return createUserInStaticUser;
}
