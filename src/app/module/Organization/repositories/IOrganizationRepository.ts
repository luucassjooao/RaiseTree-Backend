/* eslint-disable no-unused-vars */
import { TOrganization } from '../../../prisma/organization';

export interface IOrganiztionRepository {
  store(data: Omit<TOrganization, 'affiliates' | 'id'>): Promise<TOrganization>;
  findOrganizationByName(name: string): Promise<TOrganization | null>;
  findOrganizationById(id: string): Promise<TOrganization | null>;
}
