import { PrismaClient } from '@prisma/client';

export type TTeacher = {
  id: string
  classrooms: string[]
  subjectId: string
  userId: string
};

const { teacher } = new PrismaClient();

export { teacher as prismaTeacher };
