import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import AppError from '../../../../error';
import prismaClient from '../../../../prisma';
import { TStaticUser } from '../../../../prisma/staticUser';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

export default async function CreatePeoplesBySheetsStaticUser(
  sheetId: string,
  typeOfPeoples: string,
  organizationId: string,
  classroomsOfOrganization: string[],
  prefixClassroom: string,
): Promise<TStaticUser[] | null> {
  const doc = new GoogleSpreadsheet(sheetId);

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL_GOOGLE_SHEETS as string,
    private_key: process.env.PRIVATE_KEY_GOOGLE_SHEETS as string,
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['ACESSO PLANILHA RES-TREE'];

  const rows = await sheet.getRows();

  const peoplesAdding: Prisma.Prisma__StaticUserClient<TStaticUser, never>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const acRow of rows.keys()) {
    const row = rows[acRow];

    if (typeOfPeoples === 'student' && row.Cpf === undefined) throw new AppError('Na sua planilha não tem o cabeçalho CPF!');
    if (row.Nome === undefined) throw new AppError('Na sua planilha não tem o cabeçalho Nome!');
    if (row.Sala === undefined) throw new AppError('Na sua planilha não tem o cabeçalho Sala!');

    const findCpfInStaticUser = await StaticUserRepository.findCode(row.Cpf);
    if (
      (typeOfPeoples === 'student' && findCpfInStaticUser)
      && findCpfInStaticUser.organizationId !== organizationId
    ) throw new AppError(`O CPF: ${row.Cpf} já está cadastrado, verifique com o estudante: ${row.Nome}!`);

    const findCpfInUser = await UserRepository.findCode(row.Cpf);
    if (
      (typeOfPeoples === 'student' && findCpfInUser)
      && findCpfInUser.organizationId === organizationId
    ) throw new AppError(`O estudante ${row.Nome}, está com um CPF já cadastrado, em uma pessoa que já está dentro da sua organização!`);

    const findClassRoomOfPeople = classroomsOfOrganization
      .findIndex((sala) => sala === row.Sala);

    if (typeOfPeoples === 'student' && (findClassRoomOfPeople !== -1)) {
      peoplesAdding.push(
        prismaClient.staticUser.create({
          data: {
            name: row.Nome,
            classroom: [`${prefixClassroom} | ${row.Sala}`],
            code: row.Cpf,
            type: 'student',
            organizationId,
          },
        }),
      );
    } else if (typeOfPeoples === 'teacher') {
      const classroomsTeachers = row.Sala.split(',').map((sala: string) => `${prefixClassroom} | ${sala}`);
      peoplesAdding.push(
        prismaClient.staticUser.create({
          data: {
            name: row.Nome,
            classroom: classroomsTeachers,
            code: randomUUID(),
            type: 'teacher',
            organizationId,
          },
        }),
      );
    } else throw new AppError(`O ${typeOfPeoples === 'student' ? 'estudante' : 'professor'}, ${row.Nome}, está com uma sala que não existe na sua organização!!`);
  }

  if (peoplesAdding.length > 0) {
    return prismaClient.$transaction(peoplesAdding);
  }

  return null;
}
