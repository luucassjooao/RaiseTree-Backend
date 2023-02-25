import { Prisma } from '@prisma/client';
import prismaClient from '../../../../prisma';
import { TNotify } from '../../../../prisma/notify';

export default async function MarkNotificationAsRead(notifications: TNotify[]) {
  const addNotificationAsRead: Prisma.Prisma__NotifyClient<TNotify, never>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const notification of notifications) {
    addNotificationAsRead.push(
      prismaClient.notify.update({
        where: {
          id: notification.id,
        },
        data: {
          read: true,
        },
      }),
    );
  }

  return prismaClient.$transaction(addNotificationAsRead);
}
