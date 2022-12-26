import AppError from '../../../../error';
import { TDraft } from '../../../../prisma/draft';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import DraftRepository from '../../repositories/implementation/DraftRepository';

export default async function FindAllDraftsByUserId(
  userId: string,
): Promise<TDraft[] | null> {
  const findUser = await UserRepository.findId(userId);
  if (!findUser) throw new AppError('Usuario não encontrado!', 404);

  const findDrafts = await DraftRepository.findAllDraftsByUserId(userId);
  if (!findDrafts) throw new AppError('Você não tem rascunhos!');

  return findDrafts;
}
