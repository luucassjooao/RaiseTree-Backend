export type TPeoples = {
  name: string;
  type: 'student' | 'teacher';
  classroom: string[];
  cpf: string;
  email: string;
}

export interface SendMailForTeacher extends Omit<TPeoples, 'cpf' | 'type'> {
  code: string;
  organizationId: string;
}

export type TEmail = {
  to: string;
  typeTemplate: 'sendMailForFirstTime' | 'sendMailToTeacher' | 'failOnSendMailToTeachers';
  url: string;
  text: string;
  organizationName?: string;
}
