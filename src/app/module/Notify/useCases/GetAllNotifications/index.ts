import AppError from '../../../../error';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import NotifyRepository from '../../repositories/implementation/NotifyRepository';

export default async function GetAllNotifications(userId: string) {
  const findUser = await UserRepository.findId(userId);
  if (!findUser) throw new AppError('Usuário não encontrado!', 404);

  return NotifyRepository.getAllNotifications(userId);
}
