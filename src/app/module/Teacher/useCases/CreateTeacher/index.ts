import { TTeacher } from '../../../../prisma/teacher';
import TeacherRespository from '../../repositories/implementation/TeacherRespository';

export default async function CreateTeacher(
  classrooms: string[],
  subjectId: string,
  userId: string,
): Promise<TTeacher> {
  return TeacherRespository.store({
    classrooms,
    subjectId,
    userId,
  });
}
