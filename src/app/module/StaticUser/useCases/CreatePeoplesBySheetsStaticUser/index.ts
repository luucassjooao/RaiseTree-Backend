import { randomUUID } from 'crypto';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../../../../../credentialsGoogleSheets.json';
import AppError from '../../../../error';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

export default async function CreatePeoplesBySheetsStaticUser(
  sheetId: string,
  typeOfPeoples: string,
  organizationId: string,
  classroomsOfOrganization: string[],
  prefixClassroom: string,
): Promise<string[]> {
  const doc = new GoogleSpreadsheet(sheetId);

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['ACESSO PLANILHA RES-TREE'];

  const rows = await sheet.getRows();

  const peoplesAdding: string[] = [];

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
      peoplesAdding.push(row.Nome);
      await StaticUserRepository.store({
        name: row.Nome,
        classroom: [`${prefixClassroom} | ${row.Sala}`],
        code: row.Cpf,
        type: 'student',
        organizationId,
      });
    } else if (typeOfPeoples === 'teacher') {
      peoplesAdding.push(row.Nome);
      const classroomsTeachers = row.Sala.split(',').map((sala: string) => `${prefixClassroom} | ${sala}`);

      await StaticUserRepository.store({
        name: row.Nome,
        classroom: classroomsTeachers,
        code: randomUUID(),
        type: 'teacher',
        organizationId,
      });
    } else throw new AppError(`O ${typeOfPeoples === 'student' ? 'estudante' : 'professor'}, ${row.Nome}, está com uma sala que não existe na sua organização!!`);
  }

  return peoplesAdding;
}
