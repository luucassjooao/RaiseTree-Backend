import { TUser } from '../../../../prisma/infosUser';
import UserRepository from '../../repositories/implementation/UserRepository';

export default async function CreateUser({
  organizationId,
  name,
  code,
  email,
  password,
  type,
}: Omit<TUser, 'id' | 'createdAt' | 'updatedAt'>) {
  return UserRepository.store({
    organizationId,
    name,
    code,
    email,
    password,
    type,
  });
}
