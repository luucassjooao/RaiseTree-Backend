import AppError from '../../../../error';
import { TDraft } from '../../../../prisma/draft';
import UserRepository from '../../../User/repositories/implementation/UserRepository';
import DraftRepository from '../../repositories/implementation/DraftRepository';

export default async function CreateOneDraft(
  title: string,
  description: string,
  draft: string,
  userId: string,
): Promise<TDraft> {
  if (
    !title
    || !description
    || !draft
  ) throw new AppError('Está faltando algum campo!');
  const findUser = await UserRepository.findId(userId);
  if (!findUser) throw new AppError('Usuário não encontrado!', 404);

  const createDraft = await DraftRepository.store(
    description,
    draft,
    title,
    userId,
  );

  return createDraft;
}
