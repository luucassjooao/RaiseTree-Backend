import { PrismaClient } from '@prisma/client';

export type TStaticUser = {
  id: string
  name: string
  code: string
  classroom: string[]
  type: any
  organizationId: string
  createdAt: Date
}

const { staticUser } = new PrismaClient();

export { staticUser as prismaStaticUser };
