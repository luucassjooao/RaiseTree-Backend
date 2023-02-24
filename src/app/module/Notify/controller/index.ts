import { Request, Response } from 'express';
import GetAllNotifications from '../useCases/GetAllNotifications';
import GetLengthOfNotificationsNotRead from '../useCases/GetLengthOfNotificationsNotRead';

class NotifyController {
  async countLenghtNotificationsByUserNotRead(request: Request, response: Response) {
    const countNotifications = await GetLengthOfNotificationsNotRead(request.user?.id as string);

    return response.json(countNotifications);
  }

  async getAllNotifications(request: Request, response: Response) {
    const countNotifications = await GetAllNotifications(request.user?.id as string);

    return response.json(countNotifications);
  }
}

export default new NotifyController();
