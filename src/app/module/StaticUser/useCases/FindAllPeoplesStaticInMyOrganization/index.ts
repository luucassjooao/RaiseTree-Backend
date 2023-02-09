import AppError from '../../../../error';
import { TStaticUser } from '../../../../prisma/staticUser';
import StaticUserRepository from '../../repositories/implementation/StaticUserRepository';

export default async function FindAllPeoplesInMyOrganization(
  organizationId: string,
): Promise<{ type: any; peoples: TStaticUser[]; }[]> {
  const findPeoples = await StaticUserRepository.findAllPeoplesInMyOrganization(organizationId);

  if (!findPeoples) throw new AppError('Não existe pessoas para fazerem registro na sua organização!');

  const getAllTypeOfPerson = Array.from(new Set(findPeoples
    .map(({ type }) => type)));

  const organizatedArrayWithPersons = getAllTypeOfPerson
    .map((verifyType) => findPeoples
      .filter(({ type }) => type === verifyType))
    .map((arrayActivity, interador) => (
      {
        type: getAllTypeOfPerson[interador],
        peoples: arrayActivity.map((eachActivity) => eachActivity),
      }
    ));

  return organizatedArrayWithPersons;
}
