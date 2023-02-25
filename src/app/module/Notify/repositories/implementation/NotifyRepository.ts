import prismaClient from '../../../../prisma';
import { TNotify } from '../../../../prisma/notify';
import { INotifyRepository } from '../INotifyRepository';

class NotifyRepository implements INotifyRepository {
  async store(title: string, description: string, recipientId: string): Promise<TNotify> {
    return prismaClient.notify.create({
      data: {
        title,
        description,
        recipientId,
      },
    });
  }

  async countLenghtNotificationsByUserNotRead(userId: string): Promise<number | null> {
    return prismaClient.notify.count({
      where: {
        recipientId: userId,
        read: false,
      },
    });
  }

  async getAllNotifications(userId: string): Promise<TNotify[] | null> {
    return prismaClient.notify.findMany({
      where: {
        recipientId: userId,
      },
    });
  }

  async updateReadNotification(notificationId: string): Promise<TNotify> {
    return prismaClient.notify.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });
  }
}

export default new NotifyRepository();
