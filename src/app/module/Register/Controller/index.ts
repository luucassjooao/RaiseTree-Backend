import { Request, Response } from 'express';
import ActivePersonAndOrganization from '../useCases/ActivePersonAndOrganization';
import ActiveTeacherByMail from '../useCases/ActiveTeacherByMail/ActiveTeacherByMail';
import SendMailForRegister from '../useCases/SendMailForRegister';

class RegisterController {
  async sendMailForRegister(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      organizationName,
      organizationClassrooms,
      name,
      email,
      password,
      type,
      subjectId,
      firstContact,
      code,
    } = request.body;

    await SendMailForRegister(
      organizationName,
      organizationClassrooms,
      name,
      email,
      password,
      type,
      subjectId,
      firstContact,
      code,
    );

    return response.status(200).json({ message: 'Verifique seu email para ativar sua conta!' });
  }

  async registerWithCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { activeToken } = request.body;

    await ActivePersonAndOrganization(activeToken);

    return response.status(201).json({ message: 'Você agora está registrado(a)!' });
  }

  async registerTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { activeToken, password, subjectId } = request.body;

    await ActiveTeacherByMail(activeToken, password, subjectId);

    return response.status(201).json({ message: 'Professor registrado!' });
  }
}

export default new RegisterController();
