import { Prisma } from '@prisma/client';

export type TFrequency = {
  dates: string[];
  subjectName: string;
}

export type TPoints = {
  points: number;
  subjectName: string;
}

export type TStudent = {
  id: string
  classroom: string
  points: Prisma.JsonArray;
  userId: string
  frequency: Prisma.JsonArray;
}
