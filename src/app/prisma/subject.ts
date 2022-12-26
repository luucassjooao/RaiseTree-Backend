import { PrismaClient } from '@prisma/client';

export type TSubject = {
  id: string
  name: string
}

const { subject } = new PrismaClient();

export { subject as prismaSubject };
