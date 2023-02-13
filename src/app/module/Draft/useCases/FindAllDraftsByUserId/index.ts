import AppError from '../../../../error';
import { TDraft } from '../../../../prisma/draft';
import DraftRepository from '../../repositories/implementation/DraftRepository';

export default async function FindAllDraftsByUserId(
  userId: string,
): Promise<TDraft[] | null> {
  const findDrafts = await DraftRepository.findAllDraftsByUserId(userId);
  if (!findDrafts) throw new AppError('Você não tem rascunhos!', 404);

  return findDrafts;
}
