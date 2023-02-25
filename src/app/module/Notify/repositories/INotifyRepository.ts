/* eslint-disable no-unused-vars */
import { TNotify } from '../../../prisma/notify';

export interface INotifyRepository {
  store(
    title: string,
    description: string,
    recipientId: string
  ): Promise<TNotify>;
  countLenghtNotificationsByUserNotRead(userId: string): Promise<number | null>;
  getAllNotifications(userId: string): Promise<TNotify[] | null>;
  updateReadNotification(notificationId: string): Promise<TNotify>;
}
