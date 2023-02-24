import AppError from '../../../../error';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import NotifyRepository from '../../repositories/implementation/NotifyRepository';

export default async function GetLengthOfNotificationsNotRead(userId: string) {
  const findUser = await UserRepository.findId(userId);
  if (!findUser) throw new AppError('Usuário não encontrado!', 404);

  const findNotifications = await NotifyRepository.countLenghtNotificationsByUserNotRead(userId);
  return findNotifications;
}
