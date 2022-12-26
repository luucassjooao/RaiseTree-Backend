import { TOrganization, prismaOrganization } from '../../../../prisma/organization';
import { IOrganiztionRepository } from '../IOrganizationRepository';

class OrganizationRepository implements IOrganiztionRepository {
  async store(data: Omit<TOrganization, 'affiliates' | 'id'>): Promise<TOrganization> {
    const name = data.name.toLowerCase();

    const create = await prismaOrganization.create({
      data: {
        name,
        classrooms: data.classrooms,
      },
    });

    return create;
  }

  async findOrganizationByName(name: string): Promise<TOrganization | null> {
    const nameFind = name.toLowerCase();

    const findOrganization = await prismaOrganization.findUnique({
      where: {
        name: nameFind,
      },
    });

    return findOrganization;
  }

  async findOrganizationById(id: string): Promise<TOrganization | null> {
    const findOrganization = await prismaOrganization.findUnique({
      where: {
        id,
      },
    });

    return findOrganization;
  }
}

export default new OrganizationRepository();
