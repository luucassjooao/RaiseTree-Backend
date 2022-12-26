import { PrismaClient } from '@prisma/client';

export type TOrganization = {
  id: string
  name: string
  classrooms: string[]
}

const { organization } = new PrismaClient();

export { organization as prismaOrganization };
