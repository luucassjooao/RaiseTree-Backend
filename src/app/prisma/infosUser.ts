import { PrismaClient } from '@prisma/client';

export type TUser = {
  id: string
  name: string
  code: string
  email: string
  password: string
  type: any
  createdAt: Date
  updatedAt: Date
  organizationId: string | null
}

const { infosUser } = new PrismaClient();

export { infosUser as prismaUser };
