import DraftRepository from '../../repositories/implementation/DraftRepository';
import FindUniqueDraftById from '../FindUniqueDraftById';

export default async function DeleteDraftById(idDraft: string, idUser: string) {
  await FindUniqueDraftById(idUser, idDraft);

  return DraftRepository.deleteDraftById(idDraft);
}
