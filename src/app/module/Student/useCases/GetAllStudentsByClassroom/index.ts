import AppError from '../../../../error';
import StudentRepository from '../../repositories/implementation/StudentRepository';

export default async function GetAllStudentsByClassroom(
  classroom: string,
  teacherClassroom: string[],
) {
  if (!teacherClassroom.includes(classroom)) throw new AppError('Voce nao pode ver os alunos dessa sala!');
  // const keyClassroom = KeyRedisAllClassroomsOfTeacherInfosStudent(classroom);

  // const cachedClassroom = await redis.get(keyClassroom);
  // if (cachedClassroom) {
  //   return JSON.parse(cachedClassroom);
  // }

  const getStudents = await StudentRepository.getAllStudentsByClassroom(classroom);
  // await redis.set(keyClassroom, JSON.stringify(getStudents), 'EX', 600);

  return getStudents;
}
