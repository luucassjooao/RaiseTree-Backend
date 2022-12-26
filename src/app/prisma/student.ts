import { PrismaClient } from '@prisma/client';

export type TStudent = {
  id: string
  classroom: string
  current_points: number
  points: number[]
  userId: string
}

const { student } = new PrismaClient();

export { student as prismaStudent };
