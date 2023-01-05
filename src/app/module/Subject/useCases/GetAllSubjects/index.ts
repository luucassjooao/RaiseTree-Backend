import { KeyRedisAllSubjects } from '../../../../../lib/cache/keys/subject';
import redis from '../../../../../lib/cache/redis';
import { TSubject } from '../../../../prisma/subject';
import SubjectRepository from '../../repositories/implementation/SubjectRepository';

export default async function getAllSubjects(): Promise<TSubject[] | null> {
  const keyAllSubjects = KeyRedisAllSubjects;

  const cachedSubjects = await redis.get(keyAllSubjects);
  if (cachedSubjects) return JSON.parse(cachedSubjects);

  const get = await SubjectRepository.getAllSubjects();
  await redis.set(keyAllSubjects, JSON.stringify(get));

  return get;
}
