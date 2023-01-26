import TeacherRespository from '../../repositories/implementation/TeacherRespository';

export default async function CreateTeacher(
  classrooms: string[],
  subjectId: string,
  userId: string,
) {
  await TeacherRespository.store({
    classrooms,
    subjectId,
    userId,
  });
}
