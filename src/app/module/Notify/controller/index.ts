import { Request, Response } from 'express';
import GetAllNotifications from '../useCases/GetAllNotifications';
import GetLengthOfNotificationsNotRead from '../useCases/GetLengthOfNotificationsNotRead';
import MarkNotificationAsRead from '../useCases/MarkNotificationAsRead';

class NotifyController {
  async countLenghtNotificationsByUserNotRead(request: Request, response: Response) {
    const countNotifications = await GetLengthOfNotificationsNotRead(request.user?.id as string);

    return response.json(countNotifications);
  }

  async getAllNotifications(request: Request, response: Response) {
    const countNotifications = await GetAllNotifications(request.user?.id as string);

    return response.json(countNotifications);
  }

  async markNotificationAsRead(request: Request, response: Response) {
    const { notifications } = request.body;

    await MarkNotificationAsRead(notifications);

    return response.status(200).json('fds');
  }
}

export default new NotifyController();
