import { KeyRedisAllClassroomsOfTeacherInfosStudent } from '../../../../../../lib/cache/keys/student';
import redis from '../../../../../../lib/cache/redis';

export default async function CleanCacheStudentsClassroom(classrooms: string) {
  const mapClassrooms = classrooms.split(',');

  // eslint-disable-next-line no-restricted-syntax
  for await (const classroom of mapClassrooms) {
    const keyClassroom = KeyRedisAllClassroomsOfTeacherInfosStudent(classroom);
    const getClassroomOnRedis = await redis.get(keyClassroom);
    if (getClassroomOnRedis) {
      await redis.del(keyClassroom);
    }
  }
}
