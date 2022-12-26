import { PrismaClient } from '@prisma/client';

export type TDraft = {
  id: string
  title: string
  description: string
  draft: string
  createdAt: Date
  updatedAt: Date
  infosUserId: string | null
};

const { draft } = new PrismaClient();

export { draft as prismaDraft };
