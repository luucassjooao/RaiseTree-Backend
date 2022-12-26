import { prismaDraft, TDraft } from '../../../../prisma/draft';
import { IDraftRepository } from '../IDraftRepository';

class DraftRepository implements IDraftRepository {
  async store(
    description: string,
    draft: string,
    title: string,
    userId: string,
  ): Promise<TDraft> {
    return prismaDraft.create({
      data: {
        description,
        draft,
        title,
        infosUserId: userId,
      },
    });
  }

  async findAllDraftsByUserId(userId: string): Promise<TDraft[] | null> {
    return prismaDraft.findMany({
      where: {
        infosUserId: userId,
      },
    });
  }

  async findUniqueDraftById(id: string): Promise<TDraft | null> {
    return prismaDraft.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new DraftRepository();
