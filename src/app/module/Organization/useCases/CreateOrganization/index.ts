import AppError from '../../../../error';
import { TOrganization } from '../../../../prisma/organization';
import OrganizationRepository from '../../repositories/implementation/OrganizationRepository';

export default async function CreateOrganization(
  name: string,
  classroom: string[],
): Promise<TOrganization> {
  const findByName = await OrganizationRepository.findOrganizationByName(name);
  if (findByName) throw new AppError('Já existe uma escola com este nome');

  const classrooms = classroom.map((sala) => `${name} | ${sala}`);

  const createOrganization = await OrganizationRepository.store({ name, classrooms });

  return createOrganization;
}
