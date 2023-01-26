import prismaClient from '../../../../prisma';
import { TDraft } from '../../../../prisma/draft';
import { IDraftRepository } from '../IDraftRepository';

class DraftRepository implements IDraftRepository {
  async store(
    description: string,
    draft: string,
    title: string,
    userId: string,
  ): Promise<TDraft> {
    return prismaClient.draft.create({
      data: {
        description,
        draft,
        title,
        infosUserId: userId,
      },
    });
  }

  async findAllDraftsByUserId(userId: string): Promise<TDraft[] | null> {
    return prismaClient.draft.findMany({
      where: {
        infosUserId: userId,
      },
    });
  }

  async findUniqueDraftById(id: string): Promise<TDraft | null> {
    return prismaClient.draft.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteDraftById(id: string): Promise<TDraft> {
    return prismaClient.draft.delete({
      where: {
        id,
      },
    });
  }
}

export default new DraftRepository();
