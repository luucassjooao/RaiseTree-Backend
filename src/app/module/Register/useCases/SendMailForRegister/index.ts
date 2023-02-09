import { hash } from 'bcrypt';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import AppError from '../../../../error';
import { generateActiveToken } from '../../../../utils/generateTokens';
import sendMail from '../../../../utils/Email/sendMail';
import isValidUUID from '../../../../utils/validUUID';
import OrganizationRepository from '../../../Organization/repositories/implementation/OrganizationRepository';
import StaticUserRepository from '../../../StaticUser/repositories/implementation/StaticUserRepository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';

export type TInfosToken = {
  organizationId: string;
  organizationName: string;
  organizationClassrooms: string[];
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'teacher' | 'student';
  personClassroom: string | string[];
  personStaticUserId: string;
  code: string;
  subjectId: string;
  firstContact: boolean;
}

export default async function SendMailForRegister(
  organizationName: string,
  organizationClassrooms: string[],
  name: string,
  email: string,
  password: string,
  type: 'admin' | 'teacher' | 'student',
  subjectId: string,
  firstContact: boolean,
  code: string,
): Promise<SMTPTransport.SentMessageInfo | null> {
  const findUserByEmail = await UserRepository.findEmail(email);
  if (findUserByEmail) throw new AppError('Este email já está em uso!');

  if (firstContact) {
    const findOrganizationByName = await OrganizationRepository
      .findOrganizationByName(organizationName);
    if (findOrganizationByName) throw new AppError('Já existe uma organização com este nome!');

    const hashedPassword = await hash(password, 10);

    const infosToken: Pick<
      TInfosToken,
      'organizationName' | 'organizationClassrooms'
      | 'name' | 'email' | 'password' | 'subjectId'
      | 'firstContact'
    > = {
      organizationName,
      organizationClassrooms,
      name,
      email,
      password: hashedPassword,
      subjectId,
      firstContact,
    };

    const activeToken = generateActiveToken({ infosToken });
    const url = `${process.env.BASE_URL}/active?token=${activeToken}`;

    const sendEmail = sendMail(
      email,
      'sendMailForFirstTime',
      url,
      'Clique aqui para ativar sua conta!',
    );

    return sendEmail;
  }

  if (type === 'teacher' && !isValidUUID(code)) throw new AppError('O formato do seu código é invalido!');

  const findUserByCode = await UserRepository.findCode(code);

  const findStaticUserByCode = await StaticUserRepository.findCode(code);
  if (!findStaticUserByCode) throw new AppError('Este codígo não está valido!', 404);

  if (!findStaticUserByCode && findUserByCode) throw new AppError('Usuario já está cadastrado!');
  if (!findStaticUserByCode && !findUserByCode) throw new AppError('Usuario não está pré-cadastrado. Verifique com seu coordenador!', 404);

  const hashedPassword = await hash(password, 10);

  const infosToken: Omit<
    TInfosToken,
    'organizationName' | 'organizationClassrooms' | 'firstContact'
  > = {
    organizationId: findStaticUserByCode.organizationId,
    name,
    email,
    password: hashedPassword,
    type,
    personClassroom: type === 'teacher' ? findStaticUserByCode.classroom : findStaticUserByCode.classroom[0],
    personStaticUserId: findStaticUserByCode.id,
    code,
    subjectId: type === 'teacher' ? subjectId : '',
  };

  const activeToken = generateActiveToken({ infosToken });
  const url = `${process.env.BASE_URL}/active?token=${activeToken}`;

  return sendMail(
    email,
    'sendMailForFirstTime',
    url,
    'Clique aqui para ativar sua conta!',
  );
}
