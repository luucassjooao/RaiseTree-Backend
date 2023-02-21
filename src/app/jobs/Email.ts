import { BullQueue } from '../../lib/Queue';
import sendMail from '../utils/Email/sendMail';
import { TEmail } from '../utils/types';

export interface EmailData extends TEmail {
  emailAdmin: string;
}

class EmailQueue extends BullQueue<EmailData> {
  // eslint-disable-next-line no-useless-constructor
  constructor(queueName: string) {
    super(queueName);
  }

  protected async process(): Promise<void> {
    this.queue.process(async (job) => {
      const {
        to, typeTemplate, url, text, organizationName,
      } = job.data;
      await sendMail({
        to, typeTemplate, url, text, organizationName,
      });
    });

    this.queue.on('failed', async (job, error) => {
      console.log(`A tarefa ${job.id} falhou com o seguinte erro: ${error.message}`);

      const {
        emailAdmin, url, typeTemplate, text, organizationName,
      } = job.data;

      if (typeTemplate === 'sendMailToTeacher') {
        await sendMail({
          to: emailAdmin, typeTemplate: 'failOnSendMailToTeachers', url, text, organizationName,
        });
      }
    });
  }
}

export const emailQueue = new EmailQueue('sendMail');
