import { KeyRedisAllSubjects } from '../../../../../lib/cache/keys/subject';
import redis from '../../../../../lib/cache/redis';
import AppError from '../../../../error';
import { TSubject } from '../../../../prisma/subject';
import SubjectRepository from '../../repositories/implementation/SubjectRepository';

export default async function CreateSubject(name: string): Promise<TSubject> {
  const findSubject = await SubjectRepository.findSubject(name);
  if (findSubject) throw new AppError('Está materia já está registrada');

  const create = await SubjectRepository.store(name);

  const searchKeySubjectsOnRedis = await redis.get(KeyRedisAllSubjects);
  if (searchKeySubjectsOnRedis) {
    await redis.del(KeyRedisAllSubjects);
  }

  return create;
}
