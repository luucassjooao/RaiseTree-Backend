import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { QueueData } from '../../../../../lib/Queue';
import AppError from '../../../../error';
import { EmailData, emailQueue } from '../../../../jobs/Email';
import prismaClient from '../../../../prisma';
import { TStaticUser } from '../../../../prisma/staticUser';
import { generateActiveTokenTeacher } from '../../../../utils/generateTokens';
import { SendMailForTeacher } from '../../../../utils/types';
import OrganizationRepository from '../../../Organization/repositories/implementation/OrganizationRepository';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

export default async function CreatePeoplesBySheetsStaticUser(
  sheetId: string,
  typeOfPeoples: string,
  organizationId: string,
  classroomsOfOrganization: string[],
  prefixClassroom: string,
  emailAdmin: string,
): Promise<TStaticUser[] | null> {
  const doc = new GoogleSpreadsheet(sheetId);

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL_GOOGLE_SHEETS as string,
    private_key: process.env.PRIVATE_KEY_GOOGLE_SHEETS as string,
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['ACESSO PLANILHA RAISE-TREE'];

  const rows = await sheet.getRows();

  const peoplesAdding: Prisma.Prisma__StaticUserClient<TStaticUser, never>[] = [];
  const teacherCreated: SendMailForTeacher[] = [];
  const cpfOnRow: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const acRow of rows.keys()) {
    const row = rows[acRow];

    if (typeOfPeoples === 'student' && row.CPF === undefined) throw new AppError('Na sua planilha não tem o cabeçalho CPF!');
    if (row.Nome === undefined) throw new AppError('Na sua planilha não tem o cabeçalho Nome!');
    if (row.Sala === undefined) throw new AppError('Na sua planilha não tem o cabeçalho Sala!');
    if (row.Email === undefined) throw new AppError('Na sua planilha não tem o cabeçalho Email!');

    const findCpfInStaticUser = await StaticUserRepository.findCode(row.CPF);
    if (
      (typeOfPeoples === 'student' && findCpfInStaticUser)
      && findCpfInStaticUser.organizationId !== organizationId
    ) throw new AppError(`O CPF: ${row.CPF} já está cadastrado, verifique com o estudante: ${row.Nome}!`);

    const findCpfInUser = await UserRepository.findCode(row.CPF);
    if (
      (typeOfPeoples === 'student' && findCpfInUser)
      && findCpfInUser.organizationId === organizationId
    ) throw new AppError(`O estudante ${row.Nome}, está com um CPF já cadastrado, em uma pessoa que já está dentro da sua organização!`);

    const findClassRoomOfPeople = typeOfPeoples === 'student' && classroomsOfOrganization
      .findIndex((sala) => sala === row.Sala);

    if (cpfOnRow.includes(row.CPF)) throw new AppError(`O CPF ${row.CPF}, está duplicado`);

    if (typeOfPeoples === 'student' && (findClassRoomOfPeople !== -1)) {
      cpfOnRow.push(row.CPF);
      peoplesAdding.push(
        prismaClient.staticUser.create({
          data: {
            name: row.Nome,
            classroom: [`${prefixClassroom} | ${row.Sala}`],
            code: row.CPF,
            type: 'student',
            organizationId,
          },
        }),
      );
    } else if (typeOfPeoples === 'teacher') {
      const classroomsTeachers = row.Sala.split(',').map((sala: string) => `${prefixClassroom} | ${sala}`);
      const randomUUIDForTeacher = randomUUID();

      teacherCreated.push({
        classroom: classroomsTeachers,
        name: row.Nome,
        email: row.Email,
        code: randomUUIDForTeacher,
        organizationId,
      });
      peoplesAdding.push(
        prismaClient.staticUser.create({
          data: {
            name: row.Nome,
            classroom: classroomsTeachers,
            code: randomUUIDForTeacher,
            type: 'teacher',
            organizationId,
          },
        }),
      );
    } else throw new AppError(`O ${typeOfPeoples === 'student' ? 'estudante' : 'professor'}, ${row.Nome}, está com uma sala que não existe na sua organização!`);
  }

  if (peoplesAdding.length > 0) {
    if (teacherCreated.length > 0) {
      const findNameOfOrganization = await OrganizationRepository
        .findOrganizationById(organizationId);
      if (!findNameOfOrganization) throw new AppError('Ouve algum error ao enviar o email para os professores!');

      // eslint-disable-next-line no-restricted-syntax
      for await (const infosToken of teacherCreated) {
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
    }
    return prismaClient.$transaction(peoplesAdding);
  }

  return null;
}
