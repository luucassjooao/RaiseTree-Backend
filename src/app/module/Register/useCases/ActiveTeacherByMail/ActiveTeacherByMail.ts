import { hash } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../error';
import prismaClient from '../../../../prisma';
import { TTeacher } from '../../../../prisma/teacher';
import { TDecodedToken } from '../../../../utils/generateTokens';
import { SendMailForTeacher } from '../../../../utils/types';
import NotifyRepository from '../../../Notify/repositories/implementation/NotifyRepository';
import StaticUserRepository from '../../../StaticUser/repositories/implementation/StaticUserRepository';
import SubjectRepository from '../../../Subject/repositories/implementation/SubjectRepository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';

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

  const hashedPassword = await hash(password, 10);

  const findAdmins = await UserRepository.findAdmins(organizationId);

  return prismaClient.$transaction(async (prisma) => {
    const createUser = await prisma.infosUser.create({
      data: {
        organizationId,
        code,
        name,
        email,
        password: hashedPassword,
        type: 'teacher',
      },
    });

    const createTeacher = await prisma.teacher.create({
      data: {
        classrooms: classroom,
        subjectId,
        userId: createUser.id,
      },
    });

    await prisma.staticUser.delete({
      where: {
        id: findTeacherOnStaticUser.id,
      },
    });

    await NotifyRepository.store(
      `O professor(a) ${name}, acabou de se registrar!`,
      `Ele(a) se registrou na máteria: ${findSubjectName?.name}`,
      findAdmins?.id as string,
    );

    return createTeacher;
  });
}
