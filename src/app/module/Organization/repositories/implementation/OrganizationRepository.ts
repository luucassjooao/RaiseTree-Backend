import prismaClient from '../../../../prisma';
import { TOrganization } from '../../../../prisma/organization';
import { IOrganiztionRepository } from '../IOrganizationRepository';

class OrganizationRepository implements IOrganiztionRepository {
  async store(data: Omit<TOrganization, 'affiliates' | 'id'>): Promise<TOrganization> {
    return prismaClient.organization.create({
      data: {
        name: data.name,
        classrooms: data.classrooms,
      },
    });
  }

  async findOrganizationByName(name: string): Promise<TOrganization | null> {
    return prismaClient.organization.findUnique({
      where: {
        name,
      },
    });
  }

  async findOrganizationById(id: string): Promise<TOrganization | null> {
    return prismaClient.organization.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new OrganizationRepository();
