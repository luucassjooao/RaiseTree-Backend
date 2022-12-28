import { TOrganization, prismaOrganization } from '../../../../prisma/organization';
import { IOrganiztionRepository } from '../IOrganizationRepository';

class OrganizationRepository implements IOrganiztionRepository {
  async store(data: Omit<TOrganization, 'affiliates' | 'id'>): Promise<TOrganization> {
    return prismaOrganization.create({
      data: {
        name: data.name,
        classrooms: data.classrooms,
      },
    });
  }

  async findOrganizationByName(name: string): Promise<TOrganization | null> {
    return prismaOrganization.findUnique({
      where: {
        name,
      },
    });
  }

  async findOrganizationById(id: string): Promise<TOrganization | null> {
    return prismaOrganization.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new OrganizationRepository();
