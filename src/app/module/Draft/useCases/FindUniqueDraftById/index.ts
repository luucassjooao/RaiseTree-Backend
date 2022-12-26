import AppError from '../../../../error';
import { TDraft } from '../../../../prisma/draft';
import DraftRepository from '../../repositories/implementation/DraftRepository';

export default async function FindUniqueDraftById(
  userId: string,
  draftId: string,
): Promise<TDraft | null> {
  const findDraft = await DraftRepository.findUniqueDraftById(draftId);
  if (!findDraft) throw new AppError('Rascunho não encontrado!', 404);

  if (findDraft.infosUserId !== userId) throw new AppError('Você não pode ver este rascunho!');

  return findDraft;
}
