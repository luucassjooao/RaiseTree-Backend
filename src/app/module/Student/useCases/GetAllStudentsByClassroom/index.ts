import AppError from '../../../../error';
import StudentRepository from '../../repositories/implementation/StudentRepository';

export default async function GetAllStudentsByClassroom(
  classroom: string,
  teacherClassroom: string[],
) {
  if (!teacherClassroom.includes(classroom)) throw new AppError('Voce nao pode ver os alunos dessa sala!');

  const getStudents = await StudentRepository.getAllStudentsByClassroom(classroom);

  return getStudents;
}
