import { randomUUID } from 'crypto';
import AppError from '../../../../error';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

type TPeoples = {
  name: string;
  type: 'student' | 'teacher';
  classroom: string[];
  cpf: string;
}

export default async function CreateManyPeoplesStaticUser(
  { peoples, organizationId }:
  { peoples: TPeoples[]; organizationId: string; },
): Promise<TPeoples[]> {
  const peoplesCreated: TPeoples[] = [];

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

    peoplesCreated.push(people);
    await StaticUserRepository.store({
      name: people.name,
      classroom: people.classroom,
      code: people.type === 'student' ? people.cpf : randomUUID(),
      type: people.type,
      organizationId,
    });
  }

  return peoplesCreated;
}
