import { randomUUID } from 'crypto';
import { QueueData } from '../../../../../lib/Queue';
import AppError from '../../../../error';
import { EmailData, emailQueue } from '../../../../jobs/Email';
import { TStaticUser } from '../../../../prisma/staticUser';
import { generateActiveTokenTeacher } from '../../../../utils/generateTokens';
import { SendMailForTeacher } from '../../../../utils/types';
import OrganizationRepository from '../../../Organization/repositories/implementation/OrganizationRepository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

interface TChooseOne extends Omit<TStaticUser, 'id' | 'createdAt'> {
  email: string | undefined;
  emailAdmin: string;
}

export default async function CreateOneStaticUser({
  name,
  classroom,
  code,
  type,
  organizationId,
  email,
  emailAdmin,
}: TChooseOne): Promise<TStaticUser> {
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

    const emailTask: QueueData<EmailData> = {
      data: {
        emailAdmin,
        text: 'Clique aqui para ativar sua conta!',
        to: infosToken.email,
        typeTemplate: 'sendMailToTeacher',
        url,
        organizationName: findNameOfOrganization.name,
      },
      options: {
        attempts: 3,
        removeOnComplete: true,
        delay: 800,
      },
    };
    await emailQueue.add(emailTask);
  }
  return createUserInStaticUser;
}
