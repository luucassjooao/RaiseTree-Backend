import AppError from '../../../../error';
import { TStaticUser } from '../../../../prisma/staticUser';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

export default async function FindAllPeoplesInMyOrganization(
  organizationId: string,
  userOrganizationId: string,
): Promise<TStaticUser[] | null> {
  if (userOrganizationId !== organizationId) throw new AppError('Ouve um error ao buscar as pessoas!');

  const findPeoples = await StaticUserRepository.findAllPeoplesInMyOrganization(organizationId);

  if (!findPeoples) throw new AppError('Não existe pessoas para fazerem registro na sua organização!');

  return findPeoples;
}
