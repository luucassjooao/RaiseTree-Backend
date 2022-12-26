import { TSubject } from '../../../../prisma/subject';
import SubjectRepository from '../../repositories/implementation/SubjectRepository';

export default async function getAllSubjects(): Promise<TSubject[] | null> {
  const get = await SubjectRepository.getAllSubjects();

  return get;
}
