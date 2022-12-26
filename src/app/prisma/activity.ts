import { PrismaClient } from '@prisma/client';

export type TActivity = {
  id: string
  title: string
  description: string
  activity: string
  classrooms: string[]
  type: any;
  previous_points: number
  dateExpiration: Date
  createdAt: Date
  updatedAt: Date
  teacherId: string | null
  subjectId: string
}

const { activity } = new PrismaClient();

export { activity as prismaActivity };
