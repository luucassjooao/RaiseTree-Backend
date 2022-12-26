import { Request, Response } from 'express';
import ActivePersonAndOrganization from '../useCases/ActivePersonAndOrganization';
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

    const token = await SendMailForRegister(
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

    console.log(token);

    return response.status(200).json({ message: 'Verifique seu email para ativar sua conta!', token });
  }

  async registerWithCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { activeToken } = request.body;

    const create = await ActivePersonAndOrganization(activeToken);

    return response.status(201).json({ message: 'Você agora está registrado(a)!', create });
  }
}

export default new RegisterController();
