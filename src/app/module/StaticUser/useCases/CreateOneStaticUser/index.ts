import { randomUUID } from 'crypto';
import AppError from '../../../../error';
import { TStaticUser } from '../../../../prisma/staticUser';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

export default async function CreateOneStaticUser({
  name,
  classroom,
  code,
  type,
  organizationId,
}: Omit<TStaticUser, 'id' | 'createdAt'>): Promise<TStaticUser> {
  const findUserByCodeInUsers = await UserRepository.findCode(type === 'student' ? code : '');
  const findUserByNameInStaticUser = await StaticUserRepository.findName(name);

  if (type === 'student' && code && findUserByNameInStaticUser) throw new AppError('Este CPF já está em uso!');
  if (type === 'student' && findUserByCodeInUsers) throw new AppError('Estudante já registrado!');

  const createUserInStaticUser = await StaticUserRepository.store({
    name,
    classroom,
    code: type === 'student' ? code : randomUUID(),
    type,
    organizationId,
  });
  return createUserInStaticUser;
}
