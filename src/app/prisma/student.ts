import { Prisma } from '@prisma/client';

export type TFrequency = {
  dates: string[];
  subjectName: string;
}

export type TStudent = {
  id: string
  classroom: string
  current_points: number
  points: number[]
  userId: string
  frequency: Prisma.JsonArray;
}
