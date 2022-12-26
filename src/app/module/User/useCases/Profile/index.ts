import AppError from '../../../../error';
import UserRepository from '../../repositories/implementation/UserRepository';
import { TRequestUser } from '../../repositories/IUserRepository';

export default async function Profile(userId: string): Promise<TRequestUser> {
  const findUser = await UserRepository.findId(userId);
  if (!findUser) throw new AppError('Usuario não encontrado!', 404);

  return findUser;
}
