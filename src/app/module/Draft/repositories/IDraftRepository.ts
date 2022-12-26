/* eslint-disable no-unused-vars */
import { TDraft } from '../../../prisma/draft';

export interface IDraftRepository {
  store(
    description: string,
    draft: string,
    title: string,
    userId: string,
  ): Promise<TDraft>;
  findAllDraftsByUserId(userId: string): Promise<TDraft[] | null>;
  findUniqueDraftById(id: string): Promise<TDraft | null>;
}
