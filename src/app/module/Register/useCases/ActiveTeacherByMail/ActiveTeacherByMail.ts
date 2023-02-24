import { hash } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../error';
import { TTeacher } from '../../../../prisma/teacher';
import { TDecodedToken } from '../../../../utils/generateTokens';
import { SendMailForTeacher } from '../../../../utils/types';
import NotifyRepository from '../../../Notify/repositories/implementation/NotifyRepository';
import StaticUserRepository from '../../../StaticUser/repositories/implementation/StaticUserRepository';
import SubjectRepository from '../../../Subject/repositories/implementation/SubjectRepository';
import CreateTeacher from '../../../Teacher/useCases/CreateTeacher';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import CreateUser from '../../../User/useCases/CreateUser';

export default async function ActiveTeacherByMail(
  token: string,
  password: string,
  subjectId: string,
): Promise<TTeacher> {
  const decodedToken = <TDecodedToken<SendMailForTeacher>>(
    verify(token, `${process.env.ACTIVE_TEACHER_TOKEN_SECRET}`)
    );
  const { infosToken, exp }: TDecodedToken<SendMailForTeacher> = decodedToken;
  if (!infosToken) throw new AppError('Informações Inválidas. Faça o registro novamente!');

  if (Date.now() >= exp * 1000) throw new AppError('A data do email expirou! Faça o registro novamente!');

  const findSubjectName = await SubjectRepository.findSubjectById(subjectId);
  if (!findSubjectName) throw new AppError('Alguma coisa deu errado ao buscar essa máteria!');

  const {
    code,
    name,
    email,
    organizationId,
    classroom,
  } = infosToken;

  const findTeacherOnStaticUser = await StaticUserRepository.findCode(code);
  if (!findTeacherOnStaticUser) throw new AppError('Ouve algum error! Verifique com o coordenador!');
  await StaticUserRepository.deleteById(findTeacherOnStaticUser.id);

  const hashedPassword = await hash(password, 10);

  const createUser = await CreateUser({
    organizationId,
    code,
    name,
    email,
    password: hashedPassword,
    type: 'teacher',
  });

  const createdTeacher = await CreateTeacher(classroom, subjectId, createUser.id);

  const findAdmins = await UserRepository.findAdmins(organizationId);

  await NotifyRepository.store(
    `O professor(a) ${name}, acabou de se registrar!`,
    `Ele(a) se registrou na máteria: ${findSubjectName.name}`,
    findAdmins?.id as string,
  );

  return createdTeacher;
}
