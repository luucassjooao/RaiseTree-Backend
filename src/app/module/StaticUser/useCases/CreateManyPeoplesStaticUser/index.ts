import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import AppError from '../../../../error';
import prismaClient from '../../../../prisma';
import { TStaticUser } from '../../../../prisma/staticUser';
import sendMail from '../../../../utils/Email/sendMail';
import { generateActiveTokenTeacher } from '../../../../utils/generateTokens';
import { SendMailForTeacher, TPeoples } from '../../../../utils/types';
import OrganizationRepository from '../../../Organization/repositories/implementation/OrganizationRepository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

export default async function CreateManyPeoplesStaticUser(
  { peoples, organizationId }:
  { peoples: TPeoples[]; organizationId: string; },
): Promise<TStaticUser[] | null> {
  const peoplesCreated: Prisma.Prisma__StaticUserClient<TStaticUser, never>[] = [];
  const teacherCreated: SendMailForTeacher[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const people of peoples) {
    const findCpfInStaticUser = await StaticUserRepository.findCode(people.cpf);
    if (
      (people.type === 'student'
      && findCpfInStaticUser)
      && findCpfInStaticUser.organizationId !== organizationId
    ) throw new AppError(`O CPF: ${people.cpf} já está cadastrado em uma pessoa fora da sua organização, verifique com o estudante: ${people.name}!`);

    const findCpfInUser = await UserRepository.findCode(people.cpf);
    if (
      (people.type === 'student'
        && findCpfInUser
      ) && findCpfInUser.organizationId === organizationId
    ) throw new AppError(`O estudante ${people.name}, está com um CPF já cadastrado, em uma pessoa que já está dentro da sua organização!`);
    const randomUUIDForTeacher = randomUUID();

    peoplesCreated.push(
      prismaClient.staticUser.create({
        data: {
          name: people.name,
          classroom: people.classroom,
          code: people.type === 'student' ? people.cpf : randomUUIDForTeacher,
          type: people.type,
          organizationId,
        },
      }),
    );
    if (people.type === 'teacher') {
      teacherCreated.push({
        name: people.name,
        email: people.email,
        code: randomUUIDForTeacher,
        organizationId,
        classroom: people.classroom,
      });
    }
  }

  const findNameOfOrganization = await OrganizationRepository.findOrganizationById(organizationId);
  if (!findNameOfOrganization) throw new AppError('Ouve um erro! Tente novamente!', 404);

  if (peoplesCreated.length > 0) {
    if (teacherCreated.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for await (const infosToken of teacherCreated) {
        const activeToken = generateActiveTokenTeacher({ infosToken });
        const url = `${process.env.BASE_URL}/activeTeacher?token=${activeToken}`;
        sendMail(
          infosToken.email,
          'sendMailToTeacher',
          url,
          'Clique aqui para ativar sua conta!',
          findNameOfOrganization.name,
        );
      }
    }
    return prismaClient.$transaction(peoplesCreated);
  }

  return null;
}
