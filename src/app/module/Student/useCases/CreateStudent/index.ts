import { TStudent } from '../../../../prisma/student';
import getAllSubjects from '../../../Subject/useCases/GetAllSubjects';
import StudentRepository from '../../repositories/implementation/StudentRepository';

export default async function CreateStudent(
  classroom: string,
  userId: string,
): Promise<TStudent | null> {
  const findSubjects = await getAllSubjects();
  if (!findSubjects) return null;

  const arraySubjectsFrequency = findSubjects?.map((subject) => ({
    subjectName: subject.name,
    dates: [],
  }));
  const arraySubjectsPoints = findSubjects?.map((subject) => ({
    subjectName: subject.name,
    points: 0,
  }));

  const createdStudent = await StudentRepository.store({
    classroom,
    points: arraySubjectsPoints,
    userId,
    frequency: arraySubjectsFrequency,
  });

  return createdStudent;
}
