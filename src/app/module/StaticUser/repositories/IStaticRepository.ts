/* eslint-disable no-unused-vars */
import { TStaticUser } from '../../../prisma/staticUser';

export interface IStaticRepository {
  store(data: Omit<TStaticUser, 'id' | 'createdAt'>): Promise<TStaticUser>;
  findCode(code: string): Promise<TStaticUser | null>;
  findName(name: string): Promise<TStaticUser | null>;
  deleteById(id: string): Promise<TStaticUser>;
  findAllPeoplesInMyOrganization(organizationId: string): Promise<TStaticUser[] | null>;
}
